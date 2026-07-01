#!/usr/bin/env node
/**
 * Translate src/i18n/locales/en/pages.json into es/fr/de/it/pt.
 * Idempotent: skips locales whose pages.json differs from EN (already translated).
 * Uses shared _aiTranslate helper (Lovable AI Gateway → Gemini free tier).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { callAiJson, hasAnyKey } from "./_aiTranslate.mjs";

const LOCALE_NAMES = {
  es: "Spanish (es-ES, Spain)",
  fr: "French (fr-FR, France)",
  de: "German (de-DE, Germany)",
  it: "Italian (it-IT, Italy)",
  pt: "European Portuguese (pt-PT, Portugal)",
};

function shapeEqual(a, b) {
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((_, i) => shapeEqual(a[i], b[i]));
  if (typeof a === "object") {
    const ak = Object.keys(a).sort();
    const bk = Object.keys(b).sort();
    if (ak.length !== bk.length || ak.some((k, i) => k !== bk[i])) return false;
    return ak.every((k) => shapeEqual(a[k], b[k]));
  }
  return true;
}

// Split object into shards by TOP-LEVEL SECTION keys (about, disclaimer, etc.)
function shardBySection(obj) {
  return Object.entries(obj).map(([k, v]) => ({ [k]: v }));
}

async function translateShard(shard, localeLabel) {
  const system =
    `You are a professional legal-tech UI translator. Translate the JSON VALUES from English to ${localeLabel}. ` +
    "Preserve ALL keys EXACTLY, including nested object keys and array positions. " +
    "Preserve placeholders like {{name}}, {count}, %s, HTML tags, URLs, email addresses, brand names (LegallySpoken, Google Gemini, OpenAI, Google AdSense, DoubleClick, CCPA), and line breaks (\\n). " +
    "Keep legal terminology accurate and natural. Do NOT translate email addresses, URLs, or brand names. " +
    "Return ONLY a JSON object with the EXACT same structure and keys as input.";
  const user =
    `Translate all values in this JSON to ${localeLabel}. Return same shape:\n\n` + JSON.stringify(shard);
  return await callAiJson({ system, user, temperature: 0.2 });
}

async function main() {
  if (!hasAnyKey()) {
    console.error("Missing LOVABLE_API_KEY or GEMINI_API_KEY");
    process.exit(1);
  }
  const en = JSON.parse(readFileSync(resolve("src/i18n/locales/en/pages.json"), "utf8"));
  const only = process.argv.find((a) => a.startsWith("--locale="))?.split("=")[1];
  const locales = only ? [only] : Object.keys(LOCALE_NAMES);

  for (const loc of locales) {
    const target = resolve(`src/i18n/locales/${loc}/pages.json`);
    let existing;
    try {
      existing = JSON.parse(readFileSync(target, "utf8"));
    } catch {
      existing = {};
    }
    // Check if already translated (shape same but VALUES differ from EN)
    const sameShape = shapeEqual(en, existing);
    const isSeedCopy = JSON.stringify(existing) === JSON.stringify(en);
    if (sameShape && !isSeedCopy) {
      console.log(`✓ ${loc}: already translated`);
      continue;
    }
    console.log(`→ ${loc}: translating (${Object.keys(en).length} sections)`);
    const shards = shardBySection(en);
    const merged = {};
    for (let i = 0; i < shards.length; i++) {
      const shard = shards[i];
      const key = Object.keys(shard)[0];
      let attempt = 0;
      let out;
      while (attempt < 4) {
        try {
          out = await translateShard(shard, LOCALE_NAMES[loc]);
          if (!shapeEqual(shard, out)) throw new Error(`shape mismatch for section '${key}'`);
          break;
        } catch (err) {
          attempt++;
          console.log(`  ${loc} '${key}' attempt ${attempt} failed: ${String(err.message).slice(0, 200)}`);
          if (attempt >= 4) throw err;
          await new Promise((r) => setTimeout(r, 3000 * attempt));
        }
      }
      Object.assign(merged, out);
      console.log(`  ${loc} '${key}' ok`);
    }
    if (!shapeEqual(en, merged)) {
      console.error(`✗ ${loc}: final shape mismatch — skipping write`);
      continue;
    }
    writeFileSync(target, JSON.stringify(merged, null, 2) + "\n", "utf8");
    console.log(`✓ ${loc}: wrote ${target}`);
  }
  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
