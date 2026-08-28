import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

/**
 * Scheduled job: emails a single filing-deadline reminder to anyone whose
 * statute of limitations closes within the reminder window.
 *
 * Invoked by pg_cron with the CRON_SECRET header, or manually by an admin.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CRON_SECRET = Deno.env.get("CRON_SECRET");
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// Send once, this many days before the deadline.
const WINDOW_DAYS = 60;
const BATCH = 100;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function isAdmin(authHeader: string | null): Promise<boolean> {
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return false;
  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .eq("role", "admin")
    .maybeSingle();
  return !!role;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const cronHeader = req.headers.get("x-cron-secret");
  const authHeader = req.headers.get("Authorization");
  const authorized =
    (CRON_SECRET && cronHeader === CRON_SECRET) ||
    // pg_cron calls in with the service role key held in the vault.
    authHeader === `Bearer ${SERVICE_KEY}` ||
    (await isAdmin(authHeader));
  if (!authorized) return json({ error: "Unauthorized" }, 401);

  const today = new Date();
  const horizon = new Date(today.getTime() + WINDOW_DAYS * 864e5)
    .toISOString()
    .slice(0, 10);
  const todayIso = today.toISOString().slice(0, 10);

  const { data: rows, error } = await supabase
    .from("subscribers")
    .select("id, email, claim_type, state_code, deadline_date, source_path")
    .is("reminder_sent_at", null)
    .is("unsubscribed_at", null)
    .not("deadline_date", "is", null)
    .gte("deadline_date", todayIso)
    .lte("deadline_date", horizon)
    .limit(BATCH);

  if (error) {
    console.error("subscriber query failed:", error);
    return json({ error: "Query failed" }, 500);
  }

  let sent = 0;
  for (const row of rows ?? []) {
    const daysLeft = Math.max(
      0,
      Math.round((Date.parse(row.deadline_date as string) - today.getTime()) / 864e5),
    );

    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-transactional-email`, {
      method: "POST",
      headers: { Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        templateName: "deadline-reminder",
        recipientEmail: row.email,
        templateData: {
          claimType: row.claim_type,
          stateCode: row.state_code,
          deadlineDate: row.deadline_date,
          daysLeft,
          pageUrl: row.source_path
            ? `https://legallyspoken.com${row.source_path}`
            : "https://legallyspoken.com/statute-of-limitations-by-state",
        },
      }),
    });

    if (!res.ok) {
      console.error(`reminder send failed for ${row.id} [${res.status}]: ${await res.text()}`);
      continue;
    }

    await supabase
      .from("subscribers")
      .update({ reminder_sent_at: new Date().toISOString() })
      .eq("id", row.id);
    sent++;
  }

  return json({ ok: true, considered: rows?.length ?? 0, sent });
});
