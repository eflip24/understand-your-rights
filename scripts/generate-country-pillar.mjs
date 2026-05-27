#!/usr/bin/env node
/**
 * Generate or refresh a CountryPillar entry for src/data/eu/countryPillars.ts.
 *
 * Supports multiple OpenAI-compatible providers. Use Lovable AI by default;
 * fall back to a free tier if Lovable AI credits are exhausted.
 *
 *   node scripts/generate-country-pillar.mjs --country fr --locale fr [--provider lovable|gemini|groq|mistral]
 *
 * Env vars by provider:
 *   lovable  → LOVABLE_API_KEY      (auto-provisioned, no setup)
 *   gemini   → GEMINI_API_KEY       (https://aistudio.google.com/apikey, free tier)
 *   groq     → GROQ_API_KEY         (https://console.groq.com, free tier)
 *   mistral  → MISTRAL_API_KEY      (https://console.mistral.ai, free experimental tier)
 *
 * Output: JSON printed to stdout. Hand-merge into src/data/eu/countryPillars.ts.
 */

import { argv, env, exit } from "node:process";

const PROVIDERS = {
  lovable: {
    url: "https://ai.gateway.lovable.dev/v1/chat/completions",
    keyEnv: "LOVABLE_API_KEY",
    model: "google/gemini-3-flash-preview",
    authHeader: (k) => ({ Authorization: `Bearer ${k}` }),
  },
  gemini: {
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    keyEnv: "GEMINI_API_KEY",
    model: "gemini-2.5-flash",
    authHeader: (k) => ({ Authorization: `Bearer ${k}` }),
  },
  groq: {
    url: "https://api.groq.com/openai/v1/chat/completions",
    keyEnv: "GROQ_API_KEY",
    model: "llama-3.3-70b-versatile",
    authHeader: (k) => ({ Authorization: `Bearer ${k}` }),
  },
  mistral: {
    url: "https://api.mistral.ai/v1/chat/completions",
    keyEnv: "MISTRAL_API_KEY",
    model: "mistral-small-latest",
    authHeader: (k) => ({ Authorization: `Bearer ${k}` }),
  },
};

const COUNTRIES = {
  fr: { name: "France", bar: "Conseil National des Barreaux (CNB)", barUrl: "https://www.cnb.avocat.fr" },
  de: { name: "Germany", bar: "Bundesrechtsanwaltskammer (BRAK)", barUrl: "https://www.rechtsanwaltsregister.org" },
  es: { name: "Spain", bar: "Consejo General de la Abogacía Española", barUrl: "https://www.abogacia.es" },
  it: { name: "Italy", bar: "Consiglio Nazionale Forense (CNF)", barUrl: "https://www.consiglionazionaleforense.it" },
  pt: { name: "Portugal", bar: "Ordem dos Advogados", barUrl: "https://portal.oa.pt" },
};

function arg(flag, def) {
  const i = argv.indexOf(flag);
  return i > -1 ? argv[i + 1] : def;
}

const country = arg("--country");
const locale = arg("--locale", country);
const providerName = arg("--provider", "lovable");

if (!country || !COUNTRIES[country]) {
  console.error("Usage: --country <fr|de|es|it|pt> [--locale <code>] [--provider lovable|gemini|groq|mistral]");
  exit(1);
}

const provider = PROVIDERS[providerName];
if (!provider) {
  console.error(`Unknown provider '${providerName}'. Options: ${Object.keys(PROVIDERS).join(", ")}`);
  exit(1);
}

const key = env[provider.keyEnv];
if (!key) {
  console.error(`Missing ${provider.keyEnv}. Set it in your shell or add as a Supabase secret.`);
  exit(1);
}

const c = COUNTRIES[country];
const systemPrompt = `You are a legal content writer for LegallySpoken.com. Produce a country-pillar guide for finding a lawyer in ${c.name}. Write in locale "${locale}". Cite real statutes, courts, fee rules, and the national bar (${c.bar}, ${c.barUrl}). Plain language, accurate, no legal advice. Return STRICT JSON matching the schema — no markdown, no prose outside the JSON.`;

const userPrompt = `Generate a CountryPillar JSON object with these fields (each long-form field 120-220 words, plain text, paragraphs separated by \\n):
{
  "hero": { "tagline": "<single sentence>", "lede": "<200 words intro>" },
  "legalSystem": "<200 words on courts & codes>",
  "howToFindLawyer": "<200 words practical steps>",
  "feesAndAid": "<200 words on fee rules + legal aid>",
  "barAssociation": { "name": "${c.bar}", "verifyUrl": "${c.barUrl}", "membershipRules": "<160 words>" },
  "crossBorderEU": "<160 words on Dir. 98/5/EC + 77/249/EEC>",
  "faqs": [ { "q": "...", "a": "..." } ]   // exactly 6
}`;

const body = {
  model: provider.model,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ],
  response_format: { type: "json_object" },
  temperature: 0.4,
};

console.error(`→ ${providerName} :: ${provider.model} :: ${country}/${locale}`);

const res = await fetch(provider.url, {
  method: "POST",
  headers: { "Content-Type": "application/json", ...provider.authHeader(key) },
  body: JSON.stringify(body),
});

if (!res.ok) {
  const txt = await res.text();
  console.error(`HTTP ${res.status}: ${txt}`);
  if (res.status === 402) console.error("Credits exhausted — retry with --provider gemini (free tier).");
  if (res.status === 429) console.error("Rate limited — wait or switch provider.");
  exit(1);
}

const json = await res.json();
const content = json.choices?.[0]?.message?.content;
if (!content) {
  console.error("Empty response:", JSON.stringify(json));
  exit(1);
}

let parsed;
try {
  parsed = JSON.parse(content);
} catch {
  // Some providers wrap in markdown fences despite response_format
  const stripped = content.replace(/^```(?:json)?\s*|```\s*$/g, "");
  parsed = JSON.parse(stripped);
}

// Wrap into PillarLocalized shape so it can be merged directly
const wrap = (s) => ({ en: s, [locale]: s });
const out = {
  hero: { tagline: wrap(parsed.hero.tagline), lede: wrap(parsed.hero.lede) },
  legalSystem: wrap(parsed.legalSystem),
  howToFindLawyer: wrap(parsed.howToFindLawyer),
  feesAndAid: wrap(parsed.feesAndAid),
  barAssociation: {
    name: wrap(parsed.barAssociation.name),
    verifyUrl: parsed.barAssociation.verifyUrl,
    membershipRules: wrap(parsed.barAssociation.membershipRules),
  },
  crossBorderEU: wrap(parsed.crossBorderEU),
  faqs: parsed.faqs.map((f) => ({ q: wrap(f.q), a: wrap(f.a) })),
  lastReviewed: new Date().toISOString().slice(0, 10),
  aiAssisted: true,
};

console.log(JSON.stringify(out, null, 2));
