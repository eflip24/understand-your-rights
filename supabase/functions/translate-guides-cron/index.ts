// Cron worker that fills missing guide (Phase-8 pillar) translations into
// public.guide_translations. Lovable AI Gateway first → Gemini free tier on 402/429.
// Resumable: stops cleanly on quota errors so progress survives across runs.
//
// State row: public.translation_cron_state where id = 'guides'.
//   next_country      → repurposed as next locale ('es'|'fr'|'de'|'pt'|'it')
//   last_run_status   → 'ok' | 'quota_hit' | 'done' | 'error' | 'noop'
//   last_filled_count → guides written this run

import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import source from "./source.json" with { type: "json" };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOCALES = ["es", "fr", "de", "pt", "it"] as const;
const LOCALE_NAMES: Record<string, string> = {
  es: "European Spanish (es-ES)",
  fr: "French (fr-FR)",
  de: "German (de-DE)",
  pt: "European Portuguese (pt-PT)",
  it: "Italian (it-IT)",
};
// One guide per AI call — each pillar is a long document.
const MAX_GUIDES_PER_RUN = 3;

type Guide = Record<string, unknown> & { slug: string };
const SRC = source as { guides: Guide[] };

const LOVABLE_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callLovable(system: string, user: string): Promise<unknown> {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new Error("no_lovable_key");
  const res = await fetch(LOVABLE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  // 403 = workspace credit limit reached → treat like a quota error so we
  // fall back to the free Gemini tier instead of failing the run.
  if (res.status === 402 || res.status === 403 || res.status === 429) {
    const err = new Error(`lovable_${res.status}`);
    (err as { code?: number }).code = res.status;
    throw err;
  }
  if (!res.ok) throw new Error(`lovable_${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return JSON.parse(data?.choices?.[0]?.message?.content ?? "{}");
}

async function callGemini(system: string, user: string): Promise<unknown> {
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) throw new Error("no_gemini_key");
  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
    }),
  });
  if (res.status === 429) {
    const err = new Error("gemini_429");
    (err as { code?: number }).code = 429;
    throw err;
  }
  if (!res.ok) throw new Error(`gemini_${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}");
}

async function callAi(system: string, user: string): Promise<unknown> {
  try {
    return await callLovable(system, user);
  } catch (err) {
    const c = (err as { code?: number }).code;
    if (c === 402 || c === 403 || c === 429 || String(err).includes("no_lovable_key")) {
      return await callGemini(system, user);
    }
    throw err;
  }
}

function isQuota(err: unknown) {
  const c = (err as { code?: number })?.code;
  if (c === 402 || c === 429) return true;
  const m = String((err as Error)?.message ?? err);
  return m.includes("402") || m.includes("429");
}

/** Structural equality check: same keys, same array lengths, all leaves strings. */
function sameShape(a: unknown, b: unknown): boolean {
  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every((x, i) => sameShape(x, b[i]));
  }
  if (a && typeof a === "object") {
    if (!b || typeof b !== "object" || Array.isArray(b)) return false;
    const ak = Object.keys(a as object);
    return ak.every((k) => sameShape((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
  }
  return typeof b === "string";
}

async function translateGuide(guide: Guide, locale: string) {
  const { slug: _slug, ...payload } = guide;
  const system =
    "You are a professional legal-content translator localizing US legal guides into " +
    LOCALE_NAMES[locale] +
    ". Translate every string value naturally and accurately. " +
    "Keep US statute citations (49 CFR § 387, ERISA, FMCSA, IRS, SSA), agency names, insurance " +
    "carrier names, dollar amounts and brand names untranslated. Preserve JSON keys EXACTLY, " +
    "preserve array lengths and order, and keep all values as strings. " +
    "Return ONLY a JSON object with the identical structure.";
  const out = await callAi(
    system,
    "Translate all values. Return the same shape:\n\n" + JSON.stringify(payload),
  );
  if (!sameShape(payload, out)) throw new Error(`guide_shape_mismatch:${guide.slug}`);
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const url = new URL(req.url);
    const overrideLocale = url.searchParams.get("locale");

    const { data: state } = await supabase
      .from("translation_cron_state")
      .select("next_country")
      .eq("id", "guides")
      .maybeSingle();

    let locale = overrideLocale ?? state?.next_country ?? "es";
    if (!LOCALES.includes(locale as typeof LOCALES[number])) locale = "es";

    const { data: existing, error: exErr } = await supabase
      .from("guide_translations")
      .select("guide_slug")
      .eq("locale", locale);
    if (exErr) throw exErr;
    const have = new Set((existing ?? []).map((r) => r.guide_slug as string));
    const missing = SRC.guides.filter((g) => !have.has(g.slug));

    let filled = 0;
    let status: "ok" | "done" | "quota_hit" | "noop" | "error" = "noop";

    for (const guide of missing.slice(0, MAX_GUIDES_PER_RUN)) {
      try {
        const data = await translateGuide(guide, locale);
        const { error } = await supabase.from("guide_translations").upsert({
          guide_slug: guide.slug,
          locale,
          data,
          updated_at: new Date().toISOString(),
        });
        if (error) throw error;
        filled += 1;
        status = "ok";
      } catch (err) {
        if (isQuota(err)) {
          await supabase
            .from("translation_cron_state")
            .update({
              last_run_at: new Date().toISOString(),
              last_run_status: "quota_hit",
              last_filled_count: filled,
              updated_at: new Date().toISOString(),
            })
            .eq("id", "guides");
          return json({ locale, status: "quota_hit", filled });
        }
        console.error("guide error", guide.slug, err);
      }
    }

    // Advance the locale pointer once this locale is fully translated.
    let nextLocale = locale;
    if (missing.length - filled <= 0) {
      const idx = LOCALES.indexOf(locale as typeof LOCALES[number]);
      nextLocale = LOCALES[(idx + 1) % LOCALES.length];
      if (status === "noop") status = "done";
    }

    await supabase
      .from("translation_cron_state")
      .update({
        next_country: nextLocale,
        last_run_at: new Date().toISOString(),
        last_run_status: status,
        last_filled_count: filled,
        updated_at: new Date().toISOString(),
      })
      .eq("id", "guides");

    return json({
      locale,
      nextLocale,
      status,
      filled,
      remaining: Math.max(0, missing.length - filled),
      total: SRC.guides.length,
    });
  } catch (err) {
    console.error(err);
    await supabase
      .from("translation_cron_state")
      .update({
        last_run_at: new Date().toISOString(),
        last_run_status: "error",
        updated_at: new Date().toISOString(),
      })
      .eq("id", "guides");
    return json({ status: "error", message: String(err) }, 500);
  }
});
