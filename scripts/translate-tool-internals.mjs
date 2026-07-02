#!/usr/bin/env node
// Translate the new tools.internals subtree into ES/FR/DE/IT/PT via Lovable AI Gateway.
import fs from "node:fs/promises";
import path from "node:path";

const LOCALES = ["es", "fr", "de", "it", "pt"];
const LANG_NAMES = { es: "Spanish", fr: "French", de: "German", it: "Italian", pt: "Portuguese" };
const ROOT = "src/i18n/locales";
const KEY = process.env.LOVABLE_API_KEY;
if (!KEY) { console.error("Missing LOVABLE_API_KEY"); process.exit(1); }

const enTools = JSON.parse(await fs.readFile(path.join(ROOT, "en/tools.json"), "utf8"));
const source = enTools.internals;

async function translate(locale) {
  const langName = LANG_NAMES[locale];
  const prompt = `Translate the following JSON object of UI strings for legal utility tools from English into ${langName}. Rules:
- Preserve JSON structure EXACTLY (same keys, same types).
- Keep placeholders like {{state}}, {{amount}}, {{n}}, {{months}}, {{contrib}}, {{pct}}, {{weeks}}, {{window}} unchanged.
- Keep icons/symbols like ✓ ⚠ ✗ ⚠️ intact.
- Keep punctuation such as $, %, / and short abbreviations natural for ${langName}.
- Do not translate legal statute citations that appear inside placeholder text (there shouldn't be any in this batch, but if present, keep them verbatim).
- Return ONLY valid JSON, no explanations, no markdown code fences.

JSON:
${JSON.stringify(source, null, 2)}`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": KEY },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    console.error(`[${locale}] HTTP ${res.status}: ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content ?? "";
  try { return JSON.parse(raw); }
  catch { console.error(`[${locale}] JSON parse failed:`, raw.slice(0, 400)); return null; }
}

for (const loc of LOCALES) {
  console.log(`Translating tools.internals -> ${loc}...`);
  const translated = await translate(loc);
  if (!translated) { console.error(`  ✗ Failed ${loc}`); continue; }
  const p = path.join(ROOT, loc, "tools.json");
  const data = JSON.parse(await fs.readFile(p, "utf8"));
  data.internals = translated;
  await fs.writeFile(p, JSON.stringify(data, null, 2) + "\n");
  console.log(`  ✓ wrote ${p}`);
}
console.log("done.");
