#!/usr/bin/env node
// Translate tools.internals per-tool into ES/FR/DE/IT/PT via Lovable AI Gateway.
// Chunked to keep each request small and reliable. Preserves existing per-tool
// translations (only re-translates tools whose EN blob changed vs. locale).
import fs from "node:fs/promises";
import path from "node:path";

const LOCALES = ["es", "fr", "de", "it", "pt"];
const LANG_NAMES = { es: "Spanish", fr: "French", de: "German", it: "Italian", pt: "Portuguese" };
const ROOT = "src/i18n/locales";
const KEY = process.env.LOVABLE_API_KEY;
if (!KEY) { console.error("Missing LOVABLE_API_KEY"); process.exit(1); }

const enTools = JSON.parse(await fs.readFile(path.join(ROOT, "en/tools.json"), "utf8"));
const enInternals = enTools.internals || {};

async function translateOne(locale, toolId, subtree) {
  const langName = LANG_NAMES[locale];
  const prompt = `Translate this JSON object of UI strings for a legal utility tool from English into ${langName}.
Rules:
- Preserve JSON structure EXACTLY (same keys, same types).
- Keep placeholders like {{state}}, {{amount}}, {{n}}, {{months}}, {{contrib}}, {{pct}}, {{weeks}}, {{window}} unchanged.
- Keep symbols/icons like ✓ ⚠ ✗ ⚠️ • / $ % intact.
- Keep US state names, statute citations, and legal proper nouns in English.
- Use natural, concise ${langName} appropriate for form labels and button captions.
- Return ONLY valid JSON, no explanations, no code fences.

JSON:
${JSON.stringify(subtree, null, 2)}`;

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
    console.error(`  [${locale}/${toolId}] HTTP ${res.status}: ${(await res.text()).slice(0,200)}`);
    return null;
  }
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content ?? "";
  try { return JSON.parse(raw); }
  catch { console.error(`  [${locale}/${toolId}] JSON parse failed:`, raw.slice(0, 200)); return null; }
}

// concurrency limiter
async function pMap(items, worker, concurrency = 6) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
  return results;
}

for (const loc of LOCALES) {
  const p = path.join(ROOT, loc, "tools.json");
  const data = JSON.parse(await fs.readFile(p, "utf8"));
  data.internals = data.internals || {};
  const existing = data.internals;

  // Only translate tools whose EN JSON differs from the locale's current version.
  const todo = Object.keys(enInternals).filter(id => {
    const curEnStr = JSON.stringify(enInternals[id]);
    // If locale doesn't have this tool yet, definitely translate.
    if (!existing[id]) return true;
    // If existing has fewer keys or different structure, retranslate.
    const enKeys = flatKeys(enInternals[id]).sort().join("|");
    const locKeys = flatKeys(existing[id]).sort().join("|");
    return enKeys !== locKeys;
  });
  console.log(`[${loc}] ${todo.length} tools to translate (of ${Object.keys(enInternals).length})`);

  await pMap(todo, async (toolId) => {
    const translated = await translateOne(loc, toolId, enInternals[toolId]);
    if (translated) {
      existing[toolId] = translated;
      console.log(`  ✓ ${loc}/${toolId}`);
    } else {
      console.log(`  ✗ ${loc}/${toolId}`);
    }
  }, 6);

  // sort keys
  const sorted = {};
  for (const k of Object.keys(existing).sort()) sorted[k] = existing[k];
  data.internals = sorted;

  await fs.writeFile(p, JSON.stringify(data, null, 2) + "\n");
  console.log(`[${loc}] wrote ${p}`);
}
console.log("done.");

function flatKeys(obj, prefix = "") {
  const keys = [];
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      const p = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object" && !Array.isArray(v)) keys.push(...flatKeys(v, p));
      else keys.push(p);
    }
  }
  return keys;
}
