// Daily region-intro translator. Processes one country per run (DE → ES → IT → PT round-robin).
// Stops cleanly on Gemini 429 free-tier quota so progress survives across days.

import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import sources from "./sources.json" with { type: "json" };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOCALES = ["en", "de", "fr", "es", "it", "pt"] as const;
const NATIVE: Record<string, string> = { de: "de", fr: "fr", es: "es", it: "it", pt: "pt" };
const LOCALE_NAME: Record<string, string> = {
  en: "English", de: "German", fr: "French", es: "Spanish", it: "Italian", pt: "Portuguese",
};
const COUNTRY_NAME: Record<string, string> = {
  de: "Germany", fr: "France", es: "Spain", it: "Italy", pt: "Portugal",
};
const COUNTRY_ORDER = ["de", "es", "it", "pt"];

type Source = {
  country: string;
  canonical: string;
  source: string;
  names: Record<string, string>;
};

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(apiKey: string, system: string, user: string): Promise<string> {
  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
    }),
  });
  if (res.status === 429) {
    const body = await res.text();
    const err = new Error(`gemini_429: ${body.slice(0, 200)}`);
    (err as any).code = 429;
    throw err;
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`gemini_${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const parsed = JSON.parse(text);
  return String(parsed?.text ?? "").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // Auth: shared cron secret OR admin JWT
  const cronSecret = Deno.env.get("CRON_SECRET");
  const providedCron = req.headers.get("x-cron-secret");
  const authHeader = req.headers.get("Authorization") ?? "";
  let authorized = !!(cronSecret && providedCron && providedCron === cronSecret);
  if (!authorized) {
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const sbAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.slice("Bearer ".length);
    const { data: claimsData, error: claimsErr } = await sbAuth.auth.getClaims(token);
    const uid = claimsData?.claims?.sub;
    if (claimsErr || !uid) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const adminCheck = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: roleRow } = await adminCheck
      .from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  if (!geminiKey) {
    return new Response(JSON.stringify({ error: "GEMINI_API_KEY missing" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Optional ?country=de override; otherwise read state pointer
  const url = new URL(req.url);
  let country = url.searchParams.get("country");
  if (!country) {
    const { data: state } = await supabase
      .from("translation_cron_state").select("next_country").eq("id", "singleton").maybeSingle();
    country = state?.next_country ?? "de";
  }
  if (!COUNTRY_ORDER.includes(country)) country = "de";

  // Existing rows for this country
  const { data: existing } = await supabase
    .from("region_intros_runtime").select("region_canonical, locale").eq("country", country);
  const have = new Set((existing ?? []).map((r) => `${r.region_canonical}:${r.locale}`));

  const native = NATIVE[country];
  const regions = (sources as Source[]).filter((s) => s.country === country);

  const log: string[] = [];
  let filled = 0;
  let quotaHit = false;
  let allDone = true;

  outer: for (const r of regions) {
    for (const locale of LOCALES) {
      if (locale === "en" || locale === native) continue;
      const key = `${r.canonical}:${locale}`;
      if (have.has(key)) continue;
      allDone = false;

      const regionName = r.names[locale] || r.names.en;
      const system = [
        `You translate concise editorial overviews of legal infrastructure in EU regions from English into ${LOCALE_NAME[locale]}.`,
        "Rules:",
        "- Preserve all proper nouns (court names, bar chamber names, statute names, place names) in their official form for the target language. Where the official name in the target language exists, use it; otherwise keep the original.",
        "- Preserve URLs, numeric figures and statute abbreviations verbatim.",
        "- Keep tone editorial and concise. Match source length within ±15%.",
        '- Output ONLY valid JSON: { "text": "…" }. No prose, no markdown.',
      ].join("\n");
      const user = JSON.stringify({
        targetLanguage: LOCALE_NAME[locale],
        region: regionName,
        country: COUNTRY_NAME[country],
        source: r.source,
      });

      try {
        const text = await callGemini(geminiKey, system, user);
        if (!text) throw new Error("empty translation");
        const { error: upErr } = await supabase
          .from("region_intros_runtime")
          .upsert(
            { country, region_canonical: r.canonical, locale, text, updated_at: new Date().toISOString() },
            { onConflict: "country,region_canonical,locale" },
          );
        if (upErr) throw upErr;
        filled += 1;
        log.push(`✓ ${country}/${r.canonical}/${locale}`);
      } catch (e: any) {
        if (e?.code === 429) {
          quotaHit = true;
          log.push(`⏸ quota hit at ${country}/${r.canonical}/${locale}`);
          break outer;
        }
        log.push(`✗ ${country}/${r.canonical}/${locale}: ${e?.message || e}`);
      }
    }
  }

  // Advance pointer only if we fully finished this country
  let nextCountry = country;
  if (allDone || (!quotaHit && filled === 0)) {
    const idx = COUNTRY_ORDER.indexOf(country);
    nextCountry = COUNTRY_ORDER[(idx + 1) % COUNTRY_ORDER.length];
  }

  await supabase.from("translation_cron_state").upsert({
    id: "singleton",
    next_country: nextCountry,
    last_run_at: new Date().toISOString(),
    last_run_status: quotaHit ? "quota_hit" : allDone ? "country_complete" : "partial",
    last_filled_count: filled,
    updated_at: new Date().toISOString(),
  });

  return new Response(
    JSON.stringify({ country, filled, quotaHit, allDone, nextCountry, log }, null, 2),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
