import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE = "https://legallyspoken.com";
const admin = createClient(SUPABASE_URL, SERVICE_KEY);

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

async function send(recipientEmail: string, idempotencyKey: string, templateData: Record<string, string>) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/send-transactional-email`, {
    method: "POST",
    headers: { Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ templateName: "review-update", recipientEmail, idempotencyKey, templateData }),
  });
  if (!res.ok) console.error(`send failed [${res.status}]: ${await res.text()}`);
  return res.ok;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    const { data: u } = await admin.auth.getUser(token);
    const user = u?.user;
    if (!user) return json({ error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const requestId = String(body.requestId ?? "");
    const event = String(body.event ?? "");
    if (!/^[0-9a-f-]{36}$/.test(requestId) || !["assigned", "delivered", "declined", "lawyer_applied"].includes(event)) {
      return json({ error: "Invalid input" }, 400);
    }

    const { data: isAdmin } = await admin.from("user_roles").select("id").eq("user_id", user.id).eq("role", "admin").maybeSingle();

    // New panel application -> notify admins (requestId = lawyer row id)
    if (event === "lawyer_applied") {
      const { data: l } = await admin.from("review_lawyers").select("id, user_id, full_name, jurisdiction").eq("id", requestId).maybeSingle();
      if (!l || l.user_id !== user.id) return json({ error: "Forbidden" }, 403);
      const { data: admins } = await admin.from("user_roles").select("user_id").eq("role", "admin");
      for (const a of admins ?? []) {
        const { data: p } = await admin.from("profiles").select("email").eq("id", a.user_id).maybeSingle();
        if (p?.email) await send(p.email, `lawyer-applied-${l.id}-${a.user_id}`, {
          name: "admin", heading: "New review panel application",
          message: `${l.full_name} (${l.jurisdiction === "ie" ? "Ireland" : "US"}) has applied to join the panel. Please verify their credentials before approving.`,
          buttonUrl: `${SITE}/admin/lawyers`, buttonLabel: "Review application",
        });
      }
      return json({ ok: true });
    }

    const { data: r } = await admin.from("review_requests")
      .select("id, client_id, client_name, client_email, region, jurisdiction, lawyer_id, review_lawyers(user_id, full_name, email)")
      .eq("id", requestId).maybeSingle();
    if (!r) return json({ error: "Not found" }, 404);
    const lawyer = r.review_lawyers as unknown as { user_id: string; full_name: string; email: string } | null;
    const isClient = r.client_id === user.id;
    const isLawyer = lawyer?.user_id === user.id;
    if (!isClient && !isLawyer && !isAdmin) return json({ error: "Forbidden" }, 403);

    const word = r.jurisdiction === "ie" ? "solicitor" : "lawyer";
    if (event === "assigned") {
      if (!lawyer) return json({ error: "No lawyer assigned" }, 400);
      await send(lawyer.email, `review-assigned-${r.id}-${r.lawyer_id}`, {
        name: lawyer.full_name, heading: "New review request assigned to you",
        message: `A client${r.region ? ` in ${r.region}` : ""} has asked you to review their severance or settlement agreement. Please accept or decline in the portal within 24 hours.`,
        buttonUrl: `${SITE}/lawyer-portal`, buttonLabel: "Open lawyer portal",
      });
    } else if (event === "delivered" && (isLawyer || isAdmin)) {
      await send(r.client_email, `review-delivered-${r.id}`, {
        name: r.client_name, heading: "Your agreement review is ready",
        message: `Your ${word} has delivered their signed review. You can download it from your account.`,
        buttonUrl: `${SITE}/my-reviews`, buttonLabel: "View my review",
      });
    } else if (event === "declined" && (isLawyer || isAdmin)) {
      await send(r.client_email, `review-declined-${r.id}-${r.lawyer_id}`, {
        name: r.client_name, heading: `Your ${word} couldn't take this review`,
        message: `The ${word} you chose isn't able to take your review. We'll help you choose another — no payment has been taken by LegallySpoken.`,
        buttonUrl: `${SITE}/my-reviews`, buttonLabel: "View my review",
      });
    }
    return json({ ok: true });
  } catch (e) {
    console.error("notify-review error", e);
    return json({ error: String((e as Error).message ?? e) }, 500);
  }
});
