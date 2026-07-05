/**
 * EU Track A rollout: rewrite seoContext for the 8 Tier-A tools in DE/FR/IT
 * with locale-native legal terminology, EU statute anchors, and CPC-focused
 * keywords. Replaces the generic translations that were merged earlier.
 *
 * Usage: node scripts/eu-track-a-rewrite.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { callAiJson, hasAnyKey } from "./_aiTranslate.mjs";

if (!hasAnyKey()) {
  console.error("Need LOVABLE_API_KEY or GEMINI_API_KEY");
  process.exit(1);
}

const TOOLS = [
  { id: "settlement-estimator",     en: "Personal Injury Settlement Calculator",   theme: "personal injury settlement / bodily injury damages" },
  { id: "wrongful-term-value",      en: "Wrongful Termination Settlement Calculator", theme: "wrongful/unfair dismissal severance and damages" },
  { id: "divorce-cost",             en: "Divorce Cost Estimator",                  theme: "divorce lawyer fees and total procedure cost" },
  { id: "slip-and-fall-settlement", en: "Slip and Fall Settlement Estimator",      theme: "premises liability / occupier duty of care" },
  { id: "workers-comp-settlement",  en: "Workers Comp Settlement Calculator",      theme: "workplace injury / statutory accident insurance payout" },
  { id: "dui-cost-estimator",       en: "DUI Cost Estimator",                      theme: "drink-driving / drug-driving total cost incl. lawyer, fines, insurance" },
  { id: "divorce-buyout",           en: "Divorce Buyout Calculator",               theme: "marital home equity buyout on divorce" },
  { id: "eeoc-settlement",          en: "EEOC Settlement Calculator",              theme: "workplace discrimination compensation / equal treatment claims" },
];

const LOCALES = {
  de: {
    country: "Germany",
    language: "German",
    codes: "BGB (§§ 823, 253 BGB Schmerzensgeld), StVG, KSchG (Kündigungsschutzgesetz), § 1a KSchG Abfindung, SGB VII (gesetzliche Unfallversicherung), StGB § 316 (Trunkenheit im Verkehr), FamFG, § 1378 BGB Zugewinnausgleich, AGG (Allgemeines Gleichbehandlungsgesetz)",
    hints: "Use terms like Schmerzensgeld, Abfindung, Kündigungsschutzklage, Verdienstausfall, Zugewinnausgleich, MPU, Bußgeld, Fahrverbot, gesetzliche Unfallversicherung, Berufsgenossenschaft, AGG-Entschädigung.",
  },
  fr: {
    country: "France",
    language: "French",
    codes: "Code civil (art. 1240 responsabilité délictuelle), nomenclature Dintilhac, Code du travail (L1235-3 licenciement sans cause réelle et sérieuse, barème Macron), Code de la sécurité sociale (accidents du travail), Code de la route (art. L234-1 conduite en état d'ivresse), Code civil art. 1751 prestation compensatoire, Code du travail L1132-1 discrimination",
    hints: "Use terms like indemnisation du préjudice corporel, barème Dintilhac, indemnité de licenciement, barème Macron, IPP, rente accident du travail, retrait de permis, alcoolémie, prestation compensatoire, soulte, discrimination au travail, défenseur des droits.",
  },
  it: {
    country: "Italy",
    language: "Italian",
    codes: "Codice Civile art. 2043 (fatto illecito), art. 2059 (danno non patrimoniale), tabelle di Milano, art. 2087 c.c. (sicurezza sul lavoro), INAIL (assicurazione infortuni), art. 18 Statuto dei Lavoratori / Jobs Act d.lgs. 23/2015 tutele crescenti, art. 186 Codice della Strada (guida in stato di ebbrezza), art. 337-ter c.c. (assegnazione casa coniugale), d.lgs. 216/2003 (parità di trattamento)",
    hints: "Use terms like risarcimento danni, tabelle di Milano, danno biologico, licenziamento illegittimo, indennità risarcitoria, INAIL, invalidità permanente, ritiro patente, alcoltest, assegnazione casa coniugale, liquidazione della quota, discriminazione sul lavoro.",
  },
};

const SYSTEM = `You are a legal SEO copywriter fluent in EU civil-law systems. You produce keyword-rich, factually accurate explainer blocks that pass Google AdSense "Low Value Content" review and drive high-CPC display ads (legal / injury / insurance).

Hard rules:
- Native, idiomatic {LANGUAGE} — do NOT translate from English or use anglicisms.
- Anchor each explainer to actual {COUNTRY} statutes and terminology from the reference list.
- Never claim to give legal advice; describe how the amount / process typically works.
- Exactly ONE H2-style heading (60-90 chars) and EXACTLY 3 paragraphs of 3-5 sentences each (each 350-600 chars).
- No headings, lists, or markdown inside paragraphs. No emojis. No first-person plural marketing.
- Weave in 4-6 high-intent search phrases per tool naturally.

Output STRICT JSON: {"items":[{"id":"<tool-id>","heading":"...","paragraphs":["p1","p2","p3"]}, ...]} — one item per requested tool, ids preserved.`;

const OUT_ROOT = path.join(process.cwd(), "src/i18n/locales");

for (const [locale, meta] of Object.entries(LOCALES)) {
  console.log(`\n=== ${locale.toUpperCase()} (${meta.country}) ===`);
  const toolList = TOOLS.map(
    (t) => `- id: ${t.id}\n  english_name: ${t.en}\n  topic: ${t.theme}`,
  ).join("\n");
  const userMsg = `Country: ${meta.country}\nLanguage: ${meta.language}\nReference statutes & terminology (use them, spelled correctly): ${meta.codes}\nStyle hints: ${meta.hints}\n\nProduce a seoContext entry for each of these 8 tools:\n${toolList}\n\nReturn strict JSON per the schema.`;
  const system = SYSTEM.replaceAll("{LANGUAGE}", meta.language).replaceAll("{COUNTRY}", meta.country);

  const json = await callAiJson({ system, user: userMsg, temperature: 0.4 });
  const items = json.items || [];
  if (items.length !== TOOLS.length) {
    console.warn(`  ! expected ${TOOLS.length} items, got ${items.length}`);
  }

  const filePath = path.join(OUT_ROOT, locale, "tools.json");
  const doc = JSON.parse(fs.readFileSync(filePath, "utf8"));
  doc.seoContext ||= {};
  let n = 0;
  for (const item of items) {
    if (!item?.id || !item.heading || !Array.isArray(item.paragraphs)) continue;
    doc.seoContext[item.id] = {
      heading: item.heading,
      paragraphs: item.paragraphs.slice(0, 3),
    };
    n++;
  }
  fs.writeFileSync(filePath, JSON.stringify(doc, null, 2) + "\n");
  console.log(`  ✓ wrote ${n} entries to ${filePath}`);
}

console.log("\nDone.");
