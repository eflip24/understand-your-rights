// Cron worker that fills missing tool translations into the `tool_translations` table.
// Lovable AI Gateway first → falls back to Gemini free tier on 402/429.
// Stops cleanly on quota errors so progress survives across days.
//
// State row: public.translation_cron_state where id = 'tools'.
//   next_country  → repurposed as next locale ('es'|'fr'|'de'|'pt'|'it')
//   last_run_status → 'ok' | 'quota_hit' | 'done' | 'error' | 'noop'
//   last_filled_count → tools written this run

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
const BATCH_SIZE = 5; // tools per AI call inside one cron tick
const MAX_BATCHES_PER_RUN = 4; // soft cap so a single invocation stays fast

type Tool = { id: string; name: string; description: string; shortDescription: string; faqs: { question: string; answer: string }[] };
type Category = { id: string; label: string; description: string };
type Snapshot = { tools: Tool[]; categories: Category[] };
const SRC = source as Snapshot;

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
  if (res.status === 402 || res.status === 429) {
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
    const err = new Error(`gemini_429`);
    (err as { code?: number }).code = 429;
    throw err;
  }
  if (!res.ok) throw new Error(`gemini_${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const txt: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  return JSON.parse(txt);
}

async function callAi(system: string, user: string): Promise<unknown> {
  try {
    return await callLovable(system, user);
  } catch (err) {
    const c = (err as { code?: number }).code;
    if (c === 402 || c === 429) return await callGemini(system, user);
    if (String(err).includes("no_lovable_key")) return await callGemini(system, user);
    throw err;
  }
}

function isQuota(err: unknown) {
  const c = (err as { code?: number })?.code;
  if (c === 402 || c === 429) return true;
  const m = String((err as Error)?.message ?? err);
  return m.includes("402") || m.includes("429");
}

async function translateCategories(locale: string) {
  const system =
    "You are a professional legal-tech translator. Translate the category labels and descriptions into "
    + LOCALE_NAMES[locale] + ". Return ONLY a JSON object with the same keys.";
  const payload = Object.fromEntries(SRC.categories.map((c) => [c.id, { label: c.label, description: c.description }]));
  const out = (await callAi(system, "Translate values. Same shape:\n\n" + JSON.stringify(payload))) as Record<string, { label: string; description: string }>;
  for (const c of SRC.categories) {
    if (!out[c.id] || typeof out[c.id].label !== "string" || typeof out[c.id].description !== "string") {
      throw new Error(`category_shape_mismatch:${c.id}`);
    }
  }
  return out;
}

async function translateToolBatch(batch: Tool[], locale: string) {
  const system =
    "You are a professional legal-tech translator. Translate each tool's user-facing strings into "
    + LOCALE_NAMES[locale] + ". Preserve placeholders, URLs, proper nouns. Return ONLY a JSON object "
    + "with the same keys (tool ids) and same shape per entry, with the same number of faq items.";
  const payload = Object.fromEntries(batch.map((t) => [t.id, {
    name: t.name, description: t.description, shortDescription: t.shortDescription, faqs: t.faqs,
  }]));
  const out = (await callAi(system, "Translate values. Same shape:\n\n" + JSON.stringify(payload))) as Record<string, {
    name: string; description: string; shortDescription: string; faqs: { question: string; answer: string }[];
  }>;
  for (const t of batch) {
    const e = out[t.id];
    if (!e || typeof e.name !== "string" || typeof e.description !== "string"
      || typeof e.shortDescription !== "string"
      || !Array.isArray(e.faqs) || e.faqs.length !== t.faqs.length
      || e.faqs.some((f) => !f || typeof f.question !== "string" || typeof f.answer !== "string")) {
      throw new Error(`tool_shape_mismatch:${t.id}`);
    }
  }
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const url = new URL(req.url);
    const overrideLocale = url.searchParams.get("locale");

    // Read state pointer
    const { data: state } = await supabase
      .from("translation_cron_state")
      .select("next_country")
      .eq("id", "tools").maybeSingle();
    let locale = overrideLocale ?? state?.next_country ?? "es";
    if (!LOCALES.includes(locale as typeof LOCALES[number])) locale = "es";

    // Determine what's missing for this locale.
    const { data: existing, error: exErr } = await supabase
      .from("tool_translations")
      .select("tool_id, data")
      .eq("locale", locale);
    if (exErr) throw exErr;
    const existingMap = new Map<string, { faqs?: unknown[]; name?: string; description?: string; shortDescription?: string }>(
      (existing ?? []).map((r) => [r.tool_id as string, r.data as Record<string, unknown>]),
    );

    const missingTools = SRC.tools.filter((t) => {
      const e = existingMap.get(t.id);
      if (!e) return true;
      if (!Array.isArray(e.faqs) || e.faqs.length !== t.faqs.length) return true;
      if (typeof e.name !== "string" || typeof e.description !== "string" || typeof e.shortDescription !== "string") return true;
      return false;
    });

    const hasCategories = existingMap.has("__categories__");
    let filled = 0;
    let status: "ok" | "done" | "quota_hit" | "noop" | "error" = "noop";

    // Translate categories first (lightweight) if missing
    if (!hasCategories) {
      try {
        const cats = await translateCategories(locale);
        await supabase.from("tool_translations").upsert({
          tool_id: "__categories__", locale, data: cats, updated_at: new Date().toISOString(),
        });
        filled += 1;
        status = "ok";
      } catch (err) {
        if (isQuota(err)) {
          await supabase.from("translation_cron_state").update({
            last_run_at: new Date().toISOString(), last_run_status: "quota_hit", last_filled_count: filled, updated_at: new Date().toISOString(),
          }).eq("id", "tools");
          return new Response(JSON.stringify({ locale, status: "quota_hit", filled }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        console.error("category error:", err);
      }
    }

    // Translate tool batches
    let batches = 0;
    for (let i = 0; i < missingTools.length && batches < MAX_BATCHES_PER_RUN; i += BATCH_SIZE, batches++) {
      const batch = missingTools.slice(i, i + BATCH_SIZE);
      try {
        const out = await translateToolBatch(batch, locale);
        const rows = batch.map((t) => ({
          tool_id: t.id, locale, data: out[t.id], updated_at: new Date().toISOString(),
        }));
        const { error } = await supabase.from("tool_translations").upsert(rows);
        if (error) throw error;
        filled += rows.length;
        status = "ok";
      } catch (err) {
        if (isQuota(err)) {
          await supabase.from("translation_cron_state").update({
            last_run_at: new Date().toISOString(), last_run_status: "quota_hit", last_filled_count: filled, updated_at: new Date().toISOString(),
          }).eq("id", "tools");
          return new Response(JSON.stringify({ locale, status: "quota_hit", filled }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        console.error("batch error:", err);
      }
    }

    // If everything is filled for this locale, advance pointer to next locale.
    const stillMissing = missingTools.length - filled;
    let nextLocale = locale;
    if (stillMissing <= 0 && hasCategories) {
      const idx = LOCALES.indexOf(locale as typeof LOCALES[number]);
      nextLocale = LOCALES[(idx + 1) % LOCALES.length];
      if (filled === 0) status = "done";
    }

    await supabase.from("translation_cron_state").update({
      next_country: nextLocale,
      last_run_at: new Date().toISOString(),
      last_run_status: status,
      last_filled_count: filled,
      updated_at: new Date().toISOString(),
    }).eq("id", "tools");

    return new Response(JSON.stringify({ locale, status, filled, nextLocale }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("translate-tools-cron error:", err);
    await supabase.from("translation_cron_state").update({
      last_run_at: new Date().toISOString(), last_run_status: "error", updated_at: new Date().toISOString(),
    }).eq("id", "tools");
    return new Response(JSON.stringify({ error: String((err as Error).message ?? err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
