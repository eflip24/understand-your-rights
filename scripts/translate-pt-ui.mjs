#!/usr/bin/env node
/**
 * One-shot: translate empty PT i18n namespace files from their EN counterparts.
 * Preserves keys and {{interpolations}}; writes back to src/i18n/locales/pt/.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { callAiJson, hasAnyKey } from "./_aiTranslate.mjs";

const NAMESPACES = ["clauses", "contracts", "home", "legal", "quiz", "terms", "tools"];
const EN_DIR = resolve("src/i18n/locales/en");
const PT_DIR = resolve("src/i18n/locales/pt");

function leafCount(obj) {
  let n = 0;
  for (const v of Object.values(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v)) n += leafCount(v);
    else n += 1;
  }
  return n;
}

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

// Split large objects into shards by top-level key, max ~12KB each
function shardByTopKeys(obj, maxBytes = 12000) {
  const entries = Object.entries(obj);
  const shards = [];
  let cur = {};
  let curSize = 2;
  for (const [k, v] of entries) {
    const s = JSON.stringify({ [k]: v }).length;
    if (curSize + s > maxBytes && Object.keys(cur).length) {
      shards.push(cur);
      cur = {};
      curSize = 2;
    }
    cur[k] = v;
    curSize += s;
  }
  if (Object.keys(cur).length) shards.push(cur);
  return shards;
}

async function translateShard(shard, ns) {
  const system =
    "You are a professional legal-tech UI translator. Translate the JSON VALUES from English to European Portuguese (pt-PT). " +
    "Preserve ALL keys exactly. Preserve placeholders like {{name}}, {count}, %s, HTML tags, markdown, URLs, and line breaks. " +
    "Keep legal terminology accurate and natural for a Portuguese user. " +
    "Return ONLY a JSON object with the EXACT same structure and keys.";
  const user =
    `Namespace: ${ns}\n\nTranslate the values in this JSON to European Portuguese. Return same shape:\n\n` +
    JSON.stringify(shard);
  return await callAiJson({ system, user, temperature: 0.2 });
}

async function main() {
  if (!hasAnyKey()) {
    console.error("Missing LOVABLE_API_KEY or GEMINI_API_KEY");
    process.exit(1);
  }
  for (const ns of NAMESPACES) {
    const enPath = `${EN_DIR}/${ns}.json`;
    const ptPath = `${PT_DIR}/${ns}.json`;
    if (!existsSync(enPath)) {
      console.warn(`skip ${ns}: no EN source`);
      continue;
    }
    const en = JSON.parse(readFileSync(enPath, "utf8"));
    const existing = existsSync(ptPath) ? JSON.parse(readFileSync(ptPath, "utf8")) : {};
    if (leafCount(existing) > 0 && shapeEqual(en, existing)) {
      console.log(`✓ ${ns}: already populated (${leafCount(existing)} leaves)`);
      continue;
    }
    const shards = shardByTopKeys(en);
    console.log(`→ ${ns}: ${leafCount(en)} leaves, ${shards.length} shard(s)`);
    const merged = {};
    for (let i = 0; i < shards.length; i++) {
      const shard = shards[i];
      let attempt = 0;
      let out;
      while (attempt < 3) {
        try {
          out = await translateShard(shard, ns);
          if (!shapeEqual(shard, out)) {
            throw new Error(`shape mismatch in shard ${i + 1}`);
          }
          break;
        } catch (err) {
          attempt++;
          console.log(`  shard ${i + 1}/${shards.length} attempt ${attempt} failed: ${err.message.slice(0, 200)}`);
          if (attempt >= 3) throw err;
          await new Promise((r) => setTimeout(r, 2000 * attempt));
        }
      }
      Object.assign(merged, out);
      console.log(`  shard ${i + 1}/${shards.length} ok (${Object.keys(shard).length} top keys)`);
    }
    if (!shapeEqual(en, merged)) {
      console.error(`✗ ${ns}: final shape mismatch — not writing`);
      continue;
    }
    writeFileSync(ptPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
    console.log(`✓ ${ns}: wrote ${ptPath}`);
  }
  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
