#!/usr/bin/env node
/**
 * Phase B8 — Country pillar translator.
 *
 * Reads hand-authored pillars from src/data/eu/countryPillars.ts (via bun's
 * TS import), finds any (country × locale) field that has no value yet, and
 * fills the gap by calling Lovable AI Gateway with the English source as
 * the translation seed.
 *
 * Writes results back into src/data/eu/countryPillarsGenerated.ts.
 *
 * Run with bun (preinstalled in the Lovable sandbox):
 *   bun scripts/translate-country-pillars.mjs
 *   bun scripts/translate-country-pillars.mjs --country=fr --locale=es
 *   bun scripts/translate-country-pillars.mjs --dry
 *
 * Requires LOVABLE_API_KEY in the environment.
 */

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname ?? ".", "..");
const GENERATED_PATH = resolve(ROOT, "src/data/eu/countryPillarsGenerated.ts");
const PILLARS_MODULE = resolve(ROOT, "src/data/eu/countryPillars.ts");

const COUNTRIES = ["de", "fr", "es", "it", "pt"];
const LOCALES = ["en", "de", "fr", "es", "it", "pt"];

const NATIVE = { de: "de", fr: "fr", es: "es", it: "it", pt: "pt" };
const LOCALE_NAME = {
  en: "English", de: "German", fr: "French", es: "Spanish", it: "Italian", pt: "Portuguese",
};
const COUNTRY_NAME = {
  de: "Germany", fr: "France", es: "Spain", it: "Italy", pt: "Portugal",
};

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const ONLY_COUNTRY = args.country;
const ONLY_LOCALE = args.locale;
const DRY = !!args.dry;
const FORCE_PROVIDER = args.provider; // "lovable" | "gemini" | undefined (auto)

const API_KEY = process.env.LOVABLE_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY && !GEMINI_KEY) {
  console.error("Need LOVABLE_API_KEY or GEMINI_API_KEY in the environment.");
  process.exit(1);
}

async function main() {
  // Dynamically import the authored pillars. Bun handles TS natively.
  const { COUNTRY_PILLARS } = await import(PILLARS_MODULE);
  const { GENERATED_PILLAR_TRANSLATIONS } = await import(GENERATED_PATH);

  // Start from any existing generated map so reruns top up only missing keys.
  const generated = structuredClone(GENERATED_PILLAR_TRANSLATIONS);

  const totals = { calls: 0, tokensIn: 0, tokensOut: 0, skipped: 0 };

  for (const country of COUNTRIES) {
    if (ONLY_COUNTRY && country !== ONLY_COUNTRY) continue;
    const pillar = COUNTRY_PILLARS[country];
    const native = NATIVE[country];

    for (const locale of LOCALES) {
      if (locale === "en" || locale === native) continue;
      if (ONLY_LOCALE && locale !== ONLY_LOCALE) continue;

      const source = extractEnglishSource(pillar);
      const existing = generated[country] ?? {};
      const missing = filterMissing(source, pillar, existing, locale);

      if (Object.keys(missing.fields).length === 0 && missing.faqs.every((f) => !f)) {
        totals.skipped += 1;
        console.log(`✓ ${country}/${locale} already complete`);
        continue;
      }

      console.log(`→ Translating ${country}/${locale} (${countFields(missing)} fields)…`);
      if (DRY) continue;

      const translated = await translate(missing, country, locale);
      generated[country] = mergeInto(existing, translated);
      totals.calls += 1;

      // Persist after every call so a mid-run crash doesn't lose work.
      writeGenerated(generated);
    }
  }

  console.log(
    `\nDone. calls=${totals.calls} skipped=${totals.skipped} dry=${DRY}`,
  );
}

function extractEnglishSource(pillar) {
  return {
    fields: {
      "hero.tagline": pillar.hero.tagline.en,
      "hero.lede": pillar.hero.lede.en,
      legalSystem: pillar.legalSystem.en,
      howToFindLawyer: pillar.howToFindLawyer.en,
      feesAndAid: pillar.feesAndAid.en,
      "barAssociation.membershipRules": pillar.barAssociation.membershipRules.en,
      crossBorderEU: pillar.crossBorderEU.en,
    },
    faqs: pillar.faqs.map((f) => ({ q: f.q.en, a: f.a.en })),
  };
}

function filterMissing(source, pillar, existing, locale) {
  const has = (path, defaultGet) => {
    const fromAuthored = defaultGet();
    if (typeof fromAuthored === "string" && fromAuthored.length > 0) return true;
    const parts = path.split(".");
    let cur = existing;
    for (const p of parts) {
      if (cur == null) return false;
      cur = cur[p];
    }
    return typeof cur?.[locale] === "string" && cur[locale].length > 0;
  };

  const fields = {};
  const pairs = [
    ["hero.tagline", () => pillar.hero.tagline[locale]],
    ["hero.lede", () => pillar.hero.lede[locale]],
    ["legalSystem", () => pillar.legalSystem[locale]],
    ["howToFindLawyer", () => pillar.howToFindLawyer[locale]],
    ["feesAndAid", () => pillar.feesAndAid[locale]],
    ["barAssociation.membershipRules", () => pillar.barAssociation.membershipRules[locale]],
    ["crossBorderEU", () => pillar.crossBorderEU[locale]],
  ];
  for (const [path, get] of pairs) {
    if (!has(path, get)) fields[path] = source.fields[path];
  }

  const faqs = pillar.faqs.map((f, i) => {
    const qHas = typeof f.q[locale] === "string" || typeof existing.faqs?.[i]?.q?.[locale] === "string";
    const aHas = typeof f.a[locale] === "string" || typeof existing.faqs?.[i]?.a?.[locale] === "string";
    if (qHas && aHas) return null;
    return { q: qHas ? null : source.faqs[i].q, a: aHas ? null : source.faqs[i].a };
  });

  return { fields, faqs };
}

function countFields(missing) {
  return Object.keys(missing.fields).length + missing.faqs.filter((f) => f).length * 2;
}

async function translate(missing, country, locale) {
  const targetLanguage = LOCALE_NAME[locale];
  const countryName = COUNTRY_NAME[country];

  const fieldsPayload = missing.fields;
  const faqsPayload = missing.faqs.map((f) =>
    f ? { q: f.q ?? null, a: f.a ?? null } : null,
  );

  const system = [
    `You are a senior legal translator translating English source copy about the legal profession in ${countryName} into ${targetLanguage}.`,
    "Rules:",
    "- Preserve every statute name, abbreviation, court name, URL, and numeric figure verbatim (e.g. BRAO, RVG, CNB, LOPJ, Ordem dos Advogados, €190, https://...).",
    "- Use the natural legal register of the target language. Do not invent statute numbers or facts.",
    "- Keep paragraph breaks. Match the source length within ±15%.",
    "- Output ONLY valid JSON matching the requested schema. No prose, no markdown, no comments.",
  ].join("\n");

  const userPayload = {
    targetLanguage,
    instructions: `Translate every string value in 'fields' and in non-null 'faqs[*].q'/'faqs[*].a' into ${targetLanguage}. Return the same JSON shape with translated string values. Keep null entries as null. Do not add or remove keys.`,
    fields: fieldsPayload,
    faqs: faqsPayload,
  };
  const user = JSON.stringify(userPayload);

  const wantLovable = FORCE_PROVIDER !== "gemini" && !!API_KEY;
  const wantGemini = FORCE_PROVIDER !== "lovable" && !!GEMINI_KEY;

  let parsed;
  let lastErr;
  if (wantLovable) {
    try {
      parsed = await callLovable(system, user);
    } catch (err) {
      lastErr = err;
      const msg = String(err.message || err);
      // 402 = no credits, 429 = rate; both warrant Gemini fallback.
      const fallbackable = msg.includes("402") || msg.includes("429");
      if (!fallbackable || !wantGemini) throw err;
      console.log(`  ↪ Lovable AI ${msg.match(/\d{3}/)?.[0] ?? "error"} — falling back to Gemini`);
    }
  }
  if (!parsed && wantGemini) {
    parsed = await callGemini(system, user);
  }
  if (!parsed) throw lastErr ?? new Error("No provider available");
  return { parsed, locale };
}

async function callLovable(system, user) {
  const body = {
    model: "google/gemini-2.5-flash",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  };
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": API_KEY,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gateway ${res.status}: ${text.slice(0, 400)}`);
  }
  const json = await res.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("Lovable: empty content");
  return JSON.parse(content);
}

async function callGemini(system, user) {
  // Google AI Studio free tier.
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts: [{ text: user }] }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  };
  const maxAttempts = 5;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const json = await res.json();
      const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error("Gemini: empty content " + JSON.stringify(json).slice(0, 300));
      return JSON.parse(content);
    }
    const text = await res.text();
    const retryable = res.status === 429 || res.status === 503 || res.status === 500;
    if (!retryable || attempt === maxAttempts) {
      throw new Error(`Gemini ${res.status}: ${text.slice(0, 400)}`);
    }
    const wait = Math.min(30, 4 * attempt) * 1000;
    console.log(`  ↪ Gemini ${res.status} — retry ${attempt}/${maxAttempts - 1} in ${wait / 1000}s`);
    await new Promise((r) => setTimeout(r, wait));
  }
  throw new Error("Gemini: exhausted retries");
}

function mergeInto(existing, { parsed, locale }) {
  const out = structuredClone(existing) ?? {};
  const setField = (path, value) => {
    if (typeof value !== "string" || !value) return;
    const parts = path.split(".");
    let cur = out;
    for (let i = 0; i < parts.length - 1; i++) {
      cur[parts[i]] = cur[parts[i]] ?? {};
      cur = cur[parts[i]];
    }
    const leaf = parts[parts.length - 1];
    cur[leaf] = cur[leaf] ?? {};
    cur[leaf][locale] = value;
  };

  for (const [path, value] of Object.entries(parsed.fields ?? {})) {
    setField(path, value);
  }

  if (Array.isArray(parsed.faqs)) {
    out.faqs = out.faqs ?? [];
    parsed.faqs.forEach((f, i) => {
      if (!f) return;
      out.faqs[i] = out.faqs[i] ?? {};
      if (typeof f.q === "string" && f.q) {
        out.faqs[i].q = out.faqs[i].q ?? {};
        out.faqs[i].q[locale] = f.q;
      }
      if (typeof f.a === "string" && f.a) {
        out.faqs[i].a = out.faqs[i].a ?? {};
        out.faqs[i].a[locale] = f.a;
      }
    });
  }

  return out;
}

function writeGenerated(generated) {
  const header = `/**
 * AUTO-GENERATED by scripts/translate-country-pillars.mjs — do not edit by hand.
 *
 * Phase B8 — Full 6-locale fan-out. Holds AI-translated copies of every
 * PillarLocalized field for the 4 non-native, non-English locales per country.
 * Merged into COUNTRY_PILLARS at module load via mergePillar() in countryPillars.ts.
 *
 * Reruns of the generator only fill missing keys; native + English copy in
 * countryPillars.ts always wins.
 */

import type { EuCountryCode, LocaleCode } from "./countries";

export type GeneratedLocalized = Partial<Record<LocaleCode, string>>;

export interface GeneratedPillar {
  hero?: {
    tagline?: GeneratedLocalized;
    lede?: GeneratedLocalized;
  };
  legalSystem?: GeneratedLocalized;
  howToFindLawyer?: GeneratedLocalized;
  feesAndAid?: GeneratedLocalized;
  barAssociation?: {
    membershipRules?: GeneratedLocalized;
  };
  crossBorderEU?: GeneratedLocalized;
  faqs?: Array<{ q?: GeneratedLocalized; a?: GeneratedLocalized }>;
}

export const GENERATED_PILLAR_TRANSLATIONS: Record<EuCountryCode, GeneratedPillar> = `;

  const body = JSON.stringify(generated, null, 2);
  writeFileSync(GENERATED_PATH, header + body + ";\n", "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
