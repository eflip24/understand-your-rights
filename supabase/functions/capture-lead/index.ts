import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

/**
 * Public capture endpoint for two visitor-intent surfaces:
 *
 *  - kind: "estimate"  → email capture under a calculator result
 *  - kind: "lead"      → free case-review request (attorney lead-gen)
 *
 * Anonymous callers are expected, so this function does all validation
 * itself and writes with the service role. The tables have no anon
 * grants, which keeps the lead data unreadable from the browser.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const str = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (!s) return null;
  return s.slice(0, max);
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

/**
 * Lead quality score (0-100). Drives the price tier we can charge a firm.
 * Weighted the way legal lead buyers actually value a lead: claim
 * economics first, then whether it can still be filed, then contactability.
 */
const CLAIM_WEIGHTS: Record<string, number> = {
  mesothelioma: 45,
  "truck-accident": 40,
  "nursing-home-abuse": 38,
  "medical-malpractice": 38,
  "wrongful-death": 38,
  "mass-tort": 35,
  "personal-injury": 30,
  "car-accident": 30,
  "motorcycle-accident": 30,
  "slip-and-fall": 26,
  "workers-comp": 26,
  "insurance-denial": 25,
  "long-term-disability": 25,
  "employment": 22,
  "wrongful-termination": 22,
  "dog-bite": 20,
  ssdi: 18,
  "debt-bankruptcy": 15,
  family: 12,
  other: 10,
};

function scoreLead(input: {
  claimType: string;
  solOpen: boolean | null;
  estimatedValueCents: number | null;
  phone: string | null;
  description: string | null;
  incidentDate: string | null;
}): { score: number; tier: string } {
  let score = CLAIM_WEIGHTS[input.claimType] ?? CLAIM_WEIGHTS.other;

  if (input.solOpen === true) score += 20;
  else if (input.solOpen === false) score -= 15;

  const value = input.estimatedValueCents ?? 0;
  if (value >= 25_000_000) score += 20;
  else if (value >= 5_000_000) score += 14;
  else if (value >= 1_000_000) score += 8;
  else if (value > 0) score += 3;

  if (input.phone) score += 8;
  if ((input.description?.length ?? 0) >= 120) score += 7;

  // Very old incidents are usually unfileable even when SOL is unknown.
  if (input.incidentDate) {
    const years = (Date.now() - Date.parse(input.incidentDate)) / (365.25 * 864e5);
    if (years > 4) score -= 10;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  const tier = score >= 70 ? "premium" : score >= 45 ? "standard" : "basic";
  return { score, tier };
}

async function sendEmail(templateName: string, recipientEmail: string, templateData: Record<string, unknown>) {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-transactional-email`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ templateName, recipientEmail, templateData }),
    });
    if (!res.ok) {
      console.error(`send-transactional-email failed [${res.status}]: ${await res.text()}`);
    }
  } catch (e) {
    console.error("send-transactional-email threw:", e);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const kind = str(body.kind, 20);
  if (kind !== "estimate" && kind !== "lead") {
    return json({ error: "kind must be 'estimate' or 'lead'" }, 400);
  }

  const email = str(body.email, 254);
  if (!email || !isEmail(email)) return json({ error: "A valid email is required" }, 400);
  if (body.consent !== true) return json({ error: "Consent is required" }, 400);

  // Honeypot: bots fill hidden fields, humans never do.
  if (str(body.website, 200)) return json({ ok: true });

  const sourcePath = str(body.sourcePath, 300);
  const toolId = str(body.toolId, 100);
  const claimType = str(body.claimType, 60) ?? "other";
  const stateCode = str(body.stateCode, 2)?.toUpperCase() ?? null;

  // Suppressed addresses never get written or mailed.
  const { data: suppressed } = await supabase
    .from("suppressed_emails")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (kind === "estimate") {
    const rawDeadline = str(body.deadlineDate, 10);
    const deadlineDate = rawDeadline && isDate(rawDeadline) ? rawDeadline : null;
    const estimate =
      body.estimate && typeof body.estimate === "object" && !Array.isArray(body.estimate)
        ? (body.estimate as Record<string, unknown>)
        : null;

    if (!suppressed) {
      const { error } = await supabase.from("subscribers").insert({
        email: email.toLowerCase(),
        source_path: sourcePath,
        tool_id: toolId,
        claim_type: claimType,
        state_code: stateCode,
        estimate,
        deadline_date: deadlineDate,
        consent: true,
        locale: str(body.locale, 5) ?? "en",
      });
      if (error) {
        console.error("subscriber insert failed:", error);
        return json({ error: "Could not save your request" }, 500);
      }

      await sendEmail("estimate-result", email, {
        toolName: str(body.toolName, 120) ?? "your estimate",
        summary: str(body.summary, 400) ?? "",
        lines: Array.isArray(body.lines)
          ? (body.lines as unknown[]).slice(0, 12).map((l) => ({
              label: str((l as any)?.label, 80) ?? "",
              value: str((l as any)?.value, 80) ?? "",
            }))
          : [],
        deadlineDate,
        stateCode,
        pageUrl: sourcePath ? `https://legallyspoken.com${sourcePath}` : "https://legallyspoken.com",
      });
    }

    return json({ ok: true });
  }

  // ---- kind === "lead" ----
  const fullName = str(body.fullName, 120);
  if (!fullName) return json({ error: "Your name is required" }, 400);

  const phone = str(body.phone, 40);
  const description = str(body.description, 2000);
  const rawIncident = str(body.incidentDate, 10);
  const incidentDate = rawIncident && isDate(rawIncident) ? rawIncident : null;
  const solOpen = typeof body.solOpen === "boolean" ? body.solOpen : null;
  const estimatedValueCents =
    typeof body.estimatedValueCents === "number" && Number.isFinite(body.estimatedValueCents)
      ? Math.max(0, Math.min(1_000_000_000_00, Math.round(body.estimatedValueCents)))
      : null;

  const { score, tier } = scoreLead({
    claimType,
    solOpen,
    estimatedValueCents,
    phone,
    description,
    incidentDate,
  });

  const { data: inserted, error } = await supabase
    .from("case_leads")
    .insert({
      full_name: fullName,
      email: email.toLowerCase(),
      phone,
      state_code: stateCode,
      city: str(body.city, 80),
      claim_type: claimType,
      incident_date: incidentDate,
      description,
      estimated_value_cents: estimatedValueCents,
      sol_open: solOpen,
      quality_score: score,
      tier,
      source_path: sourcePath,
      tool_id: toolId,
      consent: true,
    })
    .select("id")
    .single();

  if (error) {
    console.error("case lead insert failed:", error);
    return json({ error: "Could not submit your request" }, 500);
  }

  if (!suppressed) {
    await sendEmail("case-review-received", email, {
      fullName,
      claimType,
      stateCode,
      referenceId: inserted.id,
    });
  }

  return json({ ok: true, id: inserted.id });
});
