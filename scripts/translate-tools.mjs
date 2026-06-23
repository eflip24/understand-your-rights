#!/usr/bin/env node
/**
 * Phase A — Tools translation.
 * Adds `faqs` per tool and a top-level `_categories` block to
 * src/i18n/locales/<locale>/tools.json, using EN source from tools.ts.
 *
 * - EN: copy verbatim (no AI).
 * - ES/FR/DE/PT/IT: AI-translate via Lovable AI Gateway with Gemini free-tier fallback.
 * - Idempotent: only fills missing keys; safe to re-run.
 * - On Lovable 402 / Gemini 429 free-tier quota: exits cleanly leaving partial work.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";
import { callAiJson, hasAnyKey } from "./_aiTranslate.mjs";

const SOURCE_PATH = "/tmp/tools-source.json";
const LOCALES = ["es", "fr", "de", "pt", "it"];
const LOCALE_NAMES = {
  es: "European Spanish (es-ES)",
  fr: "French (fr-FR)",
  de: "German (de-DE)",
  pt: "European Portuguese (pt-PT)",
  it: "Italian (it-IT)",
};
const BATCH_SIZE = 8;

function refreshSource() {
  if (!existsSync(SOURCE_PATH)) {
    console.log("Extracting tools source...");
    execSync("node scripts/_extract-tools.mjs", { stdio: "inherit" });
  }
}

function loadLocale(loc) {
  const p = resolve(`src/i18n/locales/${loc}/tools.json`);
  return { path: p, data: JSON.parse(readFileSync(p, "utf8")) };
}

function saveLocale(loc, data) {
  const p = resolve(`src/i18n/locales/${loc}/tools.json`);
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

function shapeFaqsOk(src, out) {
  return Array.isArray(out) && out.length === src.length
    && out.every((q, i) =>
      q && typeof q.question === "string" && typeof q.answer === "string"
      && q.question.trim() && q.answer.trim()
    );
}

async function translateFaqsBatch(items, loc) {
  // items: [{ id, faqs: [{question, answer}] }]
  const system =
    "You are a professional legal-tech translator. Translate English FAQ question/answer pairs into "
    + LOCALE_NAMES[loc] + ". Keep meaning, legal accuracy, and tone. Preserve placeholders, URLs, "
    + "and proper nouns. Return ONLY a JSON object of the exact same shape — same tool ids, same "
    + "number of faqs per tool, same field names.";
  const payload = Object.fromEntries(items.map((it) => [it.id, it.faqs]));
  const user = "Translate the FAQ values in this JSON. Return the same shape:\n\n" + JSON.stringify(payload);
  const out = await callAiJson({ system, user, temperature: 0.2 });
  for (const it of items) {
    if (!out[it.id] || !shapeFaqsOk(it.faqs, out[it.id])) {
      throw new Error(`shape mismatch for tool ${it.id} in ${loc}`);
    }
  }
  return out; // { toolId: [{question, answer}] }
}

async function translateCategories(categories, loc) {
  const system =
    "You are a professional legal-tech translator. Translate the category labels and descriptions "
    + "into " + LOCALE_NAMES[loc] + ". Keep concise, natural, and consistent with software UI "
    + "terminology. Return ONLY a JSON object of the same shape and keys.";
  const payload = Object.fromEntries(
    categories.map((c) => [c.id, { label: c.label, description: c.description }])
  );
  const user = "Translate the values. Return same shape:\n\n" + JSON.stringify(payload);
  const out = await callAiJson({ system, user, temperature: 0.2 });
  for (const c of categories) {
    if (!out[c.id] || typeof out[c.id].label !== "string" || typeof out[c.id].description !== "string") {
      throw new Error(`category translation missing/invalid: ${c.id} in ${loc}`);
    }
  }
  return out;
}

function categoriesComplete(catBlock, srcCategories) {
  if (!catBlock || typeof catBlock !== "object") return false;
  return srcCategories.every((c) =>
    catBlock[c.id] && typeof catBlock[c.id].label === "string" && typeof catBlock[c.id].description === "string"
  );
}

function toolNeedsFaqs(entry, srcTool) {
  if (!srcTool.faqs || srcTool.faqs.length === 0) return false;
  if (!entry || !Array.isArray(entry.faqs)) return true;
  return entry.faqs.length !== srcTool.faqs.length
    || entry.faqs.some((f) => !f || typeof f.question !== "string" || typeof f.answer !== "string");
}

function ensureToolEntry(data, srcTool, baseFromEn) {
  // baseFromEn: fall back to EN translation if locale lacks the tool entry (shouldn't happen, but safe)
  if (!data[srcTool.id]) data[srcTool.id] = { ...baseFromEn };
  return data[srcTool.id];
}

function isQuotaError(err) {
  const m = String(err?.message || err);
  return m.includes("402") || m.includes("429") || /quota|rate/i.test(m);
}

async function main() {
  refreshSource();
  const source = JSON.parse(readFileSync(SOURCE_PATH, "utf8"));
  // Inject EN baseline directly (no AI)
  {
    const { path, data } = loadLocale("en");
    // categories block
    if (!categoriesComplete(data._categories, source.categories)) {
      data._categories = Object.fromEntries(
        source.categories.map((c) => [c.id, { label: c.label, description: c.description }])
      );
    }
    // tools: ensure name/desc/short + faqs from source
    for (const t of source.tools) {
      const e = data[t.id] ??= {};
      if (typeof e.name !== "string") e.name = t.name;
      if (typeof e.description !== "string") e.description = t.description;
      if (typeof e.shortDescription !== "string") e.shortDescription = t.shortDescription;
      if (toolNeedsFaqs(e, t)) e.faqs = t.faqs;
    }
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
    console.log(`✓ en: baseline ready`);
  }

  if (!hasAnyKey()) {
    console.warn("No AI key — EN-only baseline written. Skipping other locales.");
    return;
  }

  const enData = loadLocale("en").data;

  for (const loc of LOCALES) {
    const { data } = loadLocale(loc);
    let changed = false;

    // Ensure baseline tool entries exist (copy name/desc from EN if missing — extremely rare since all locales already have them)
    for (const t of source.tools) {
      if (!data[t.id]) {
        data[t.id] = enData[t.id] ? { ...enData[t.id], faqs: undefined } : {};
        changed = true;
      }
    }

    // 1) Categories block
    if (!categoriesComplete(data._categories, source.categories)) {
      try {
        console.log(`→ ${loc}: translating categories`);
        const cats = await translateCategories(source.categories, loc);
        data._categories = cats;
        changed = true;
        saveLocale(loc, data);
        console.log(`  ✓ categories saved`);
      } catch (err) {
        console.log(`  ✗ categories: ${String(err.message || err).slice(0, 200)}`);
        if (isQuotaError(err)) { console.log("QUOTA HIT — stopping."); return; }
      }
    } else {
      console.log(`✓ ${loc}: categories already present`);
    }

    // 2) FAQs per tool (batched)
    const needFaqs = source.tools.filter((t) => toolNeedsFaqs(data[t.id], t));
    if (needFaqs.length === 0) {
      console.log(`✓ ${loc}: all faqs present (${source.tools.length} tools)`);
      continue;
    }
    console.log(`→ ${loc}: translating faqs for ${needFaqs.length} tools (batch=${BATCH_SIZE})`);

    for (let i = 0; i < needFaqs.length; i += BATCH_SIZE) {
      const batch = needFaqs.slice(i, i + BATCH_SIZE);
      try {
        const out = await translateFaqsBatch(batch, loc);
        for (const it of batch) {
          data[it.id].faqs = out[it.id];
        }
        changed = true;
        saveLocale(loc, data);
        console.log(`  batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(needFaqs.length / BATCH_SIZE)} ok (+${batch.length} tools)`);
      } catch (err) {
        console.log(`  ✗ batch failed: ${String(err.message || err).slice(0, 200)}`);
        if (isQuotaError(err)) { console.log("QUOTA HIT — stopping (partial progress saved)."); return; }
        // skip this batch and continue (e.g., shape mismatch on a single batch)
      }
    }

    if (changed) saveLocale(loc, data);
    console.log(`✓ ${loc}: done`);
  }
  console.log("all locales done");
}

main().catch((e) => { console.error(e); process.exit(1); });
