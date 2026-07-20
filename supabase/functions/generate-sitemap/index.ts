import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://legallyspoken.com";

const toolPages: [string, string][] = [
  ["contract", "reading-time-calculator"],["contract", "word-counter"],["contract", "jargon-translator"],
  ["contract", "clause-finder"],["contract", "contract-expiration-tracker"],["contract", "signature-block-generator"],
  ["contract", "contract-checklist-generator"],["contract", "amendment-drafter"],["contract", "contract-value-calculator"],
  ["consumer", "cancellation-deadline-calculator"],["consumer", "notice-period-calculator"],["consumer", "late-fee-calculator"],
  ["consumer", "refund-eligibility-checker"],["consumer", "warranty-expiration-calculator"],["consumer", "statute-of-limitations-lookup"],
  ["consumer", "small-claims-limit-checker"],["consumer", "consumer-rights-quiz"],["consumer", "dispute-letter-generator"],
  ["employment", "non-compete-checker"],["employment", "freelance-rate-calculator"],["employment", "invoice-interest-calculator"],
  ["employment", "salary-to-hourly-converter"],["employment", "pto-calculator"],["employment", "wrongful-termination-checklist"],
  ["employment", "minimum-wage-lookup"],["employment", "employment-contract-checklist"],["employment", "overtime-calculator"],
  ["employment", "severance-pay-calculator"],["employment", "contractor-vs-employee-checker"],["employment", "paycheck-calculator"],
  ["generators", "nda-generator"],["generators", "privacy-policy-generator"],["generators", "complaint-letter-generator"],
  ["generators", "terms-of-service-generator"],["generators", "cease-and-desist-generator"],["generators", "power-of-attorney-generator"],
  ["generators", "independent-contractor-agreement-generator"],["generators", "promissory-note-generator"],["generators", "rental-agreement-generator"],
  ["ai", "red-flag-scanner"],["ai", "nda-fairness-score"],["ai", "lease-analyzer"],
  ["ai", "terms-summarizer"],["ai", "contract-comparison"],["ai", "clause-explainer"],
  ["realestate", "security-deposit-calculator"],["realestate", "rent-increase-calculator"],["realestate", "lease-term-comparison"],
  ["realestate", "move-out-checklist-generator"],
  ["business", "business-name-checker"],["business", "partnership-split-calculator"],["business", "business-expense-tracker"],
  ["finance", "crypto-tax-calculator"],["finance", "dca-calculator"],["finance", "position-size-calculator"],
  ["finance", "profit-loss-calculator"],["finance", "compound-interest-calculator"],["finance", "margin-call-calculator"],
  ["finance", "breakeven-calculator"],["finance", "risk-reward-calculator"],["finance", "crypto-converter"],
  ["finance", "loan-payment-calculator"],["finance", "grant-budget-calculator"],["finance", "grant-deadline-tracker"],
  ["finance", "grant-compliance-checklist"],["finance", "vesting-schedule-calculator"],["finance", "stock-option-tax-calculator"],
  ["finance", "equity-dilution-calculator"],["finance", "income-tax-estimator"],["finance", "auto-loan-calculator"],
  ["finance", "debt-payoff-calculator"],["finance", "net-worth-calculator"],
  ["energy", "solar-panel-roi-calculator"],["energy", "solar-incentive-tax-credit-estimator"],["energy", "energy-savings-calculator"],
  ["energy", "carbon-footprint-offset-calculator"],["energy", "green-lease-clause-checker"],["energy", "ev-vs-gas-cost-comparison"],
  ["energy", "home-energy-audit-checklist"],["energy", "power-purchase-agreement-calculator"],
  ["consumer", "settlement-estimator"],["consumer", "insurance-quote-comparison"],["consumer", "accident-damage-calculator"],
  ["consumer", "attorney-fee-calculator"],["consumer", "insurance-premium-estimator"],
];

const toolCategories = ["contract","consumer","employment","generators","ai","realestate","business","finance","energy"];

const legalTermSlugs = [
  "indemnification","arbitration","force-majeure","liability","non-compete","non-disclosure","severability","waiver","breach","consideration",
  "jurisdiction","statute-of-limitations","due-diligence","fiduciary","negligence","tort","damages","escrow","lien","power-of-attorney",
  "affidavit","addendum","amendment","boilerplate","cease-and-desist","covenant","default","discovery","good-faith","injunction",
  "intellectual-property","material-breach","mediation","termination","warranty","collateral","contingency","estoppel","guarantor",
  "liquidated-damages","plaintiff","defendant","deposition","subpoena","hold-harmless","void-voidable","mutual-assent","remedy","rescission",
  "notarization","precedent","privity","duress","encumbrance","perjury","surety","title","deed","fraud","contempt",
  "stare-decisis","indemnity","retainer","standing","subrogation","usury","tort-reform","unconscionable","venue","quitclaim-deed",
  "pro-bono","capacity","class-action","comparative-negligence","consequential-damages","constructive-notice","counterpart","cross-default","de-facto","forum-selection",
];

const legalClauseSlugs = [
  "non-compete-clause","confidentiality-clause","indemnification-clause","limitation-of-liability","termination-clause","force-majeure-clause",
  "arbitration-clause","governing-law-clause","intellectual-property-clause","payment-terms-clause","entire-agreement-clause","assignment-clause",
  "warranty-clause","notice-clause","severability-clause","dispute-resolution-clause","non-solicitation-clause","data-protection-clause",
  "insurance-clause","representations-warranties-clause","waiver-of-jury-trial","acceleration-clause","anti-dilution-clause","automatic-renewal-clause",
  "best-efforts-clause","choice-of-forum-clause","clawback-clause","change-of-control-clause","compliance-clause","cross-default-clause",
  "cure-period-clause","drag-along-clause","exclusivity-clause","first-right-of-refusal-clause","holdback-clause","indemnity-cap-clause",
  "integration-clause","key-person-clause","material-adverse-change-clause","most-favored-nation-clause","no-shop-clause","non-disparagement-clause",
  "penalty-clause","price-adjustment-clause","right-to-audit-clause","right-of-first-offer-clause","survival-clause","tag-along-clause",
  "time-is-of-the-essence-clause","tolling-clause","venue-clause",
];

const contractTypeSlugs = [
  "nda","employment-contract","freelance-agreement","lease-agreement","saas-agreement","consulting-agreement","partnership-agreement",
  "purchase-agreement","service-agreement","licensing-agreement","terms-of-service","privacy-policy","joint-venture-agreement",
  "real-estate-purchase","loan-agreement","non-solicitation-agreement","shareholder-agreement","commercial-lease","website-terms",
];

const autoAccidentSlugs = [
  "what-to-do-after-car-accident","how-fault-is-determined","no-fault-vs-at-fault-states","filing-insurance-claim","statute-of-limitations",
  "comparative-negligence","uninsured-motorist-claims","car-accident-case-value","rideshare-accident-claims","hit-and-run-legal-steps",
  "truck-accident-lawyer","motorcycle-accident-lawyer","truck-accident-injuries","motorcycle-accident-laws","diminished-value-claim",
];

const personalInjurySlugs = [
  "types-of-cases","how-settlements-work","pain-and-suffering-calculator","medical-malpractice","slip-and-fall-liability","dog-bite-laws",
  "workers-comp-vs-pi","product-liability","wrongful-death-claims","contingency-fees","case-timeline","average-settlement-amounts",
  "whiplash-claims","nursing-home-abuse","construction-accidents","brain-injury-claims","spinal-cord-injuries","burn-injury-claims",
  "pedestrian-accidents","bicycle-accidents","pool-accident-liability","premises-liability","mesothelioma-claims","birth-injury-claims",
];

const insuranceLawSlugs = [
  "appeal-denied-claim","bad-faith-insurance","homeowners-policy-guide","health-insurance-denial","life-insurance-disputes","auto-coverage-types",
  "subrogation-explained","file-complaint-against-insurer","umbrella-insurance","insurance-fraud","compare-car-insurance-companies",
  "car-insurance-cost-per-month","renters-insurance-cost","liability-insurance-explained","get-car-insurance-quotes","compare-insurance-quotes",
  "car-insurance-massachusetts","how-to-shop-car-insurance","kin-insurance-review","florida-car-insurance-cost","cheapest-car-insurance-florida",
  "sharing-health-insurance","fdic-insurance-explained","lemon-law-guide",
];

const employmentLawSlugs = [
  "wrongful-termination","at-will-employment","workplace-discrimination","contractor-vs-employee","overtime-rights",
  "workplace-harassment","severance-agreements","non-compete-agreements","whistleblower-protections","wage-theft",
  "family-medical-leave","unemployment-benefits",
];

const criminalLawSlugs = [
  "dui-consequences","felony-vs-misdemeanor","arrest-process","bail-and-bond","plea-bargaining",
  "expungement","drug-charges","domestic-violence-charges","traffic-violations","juvenile-law",
];

const landlordTenantLawSlugs = [
  "eviction-process","security-deposits","lease-breaking","tenant-rights","landlord-responsibilities",
  "rent-increase-laws","habitability-standards","subletting-rules","fair-housing","repair-obligations",
];

const lawyerAreaSlugs = ["personal-injury","car-accident","workers-compensation","employment","insurance-dispute","real-estate","family-law","bankruptcy","criminal-defense","immigration","truck-accident","medical-malpractice"];

const stateSlugs = [
  "alabama","alaska","arizona","arkansas","california","colorado","connecticut","delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa",
  "kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan","minnesota","mississippi","missouri","montana","nebraska","nevada","new-hampshire",
  "new-jersey","new-mexico","new-york","north-carolina","north-dakota","ohio","oklahoma","oregon","pennsylvania","rhode-island","south-carolina","south-dakota",
  "tennessee","texas","utah","vermont","virginia","washington","west-virginia","wisconsin","wyoming",
];

const citySlugsMap: Record<string, string[]> = {
  "louisiana":["baton-rouge","lafayette","new-orleans"],"texas":["corpus-christi","houston","san-antonio","dallas","austin","fort-worth","el-paso"],
  "missouri":["st-louis","kansas-city"],"rhode-island":["providence"],"utah":["provo","salt-lake-city"],"new-york":["new-york-city"],
  "california":["los-angeles","san-diego","san-jose","san-francisco","fresno","mesa","sacramento"],"illinois":["chicago"],
  "arizona":["phoenix","tucson"],"pennsylvania":["philadelphia","pittsburgh"],"florida":["jacksonville","miami","tampa","orlando"],
  "ohio":["columbus","cleveland"],"north-carolina":["charlotte","raleigh"],"indiana":["indianapolis"],"washington":["seattle"],
  "colorado":["denver"],"tennessee":["nashville","memphis"],"oklahoma":["oklahoma-city","tulsa"],"massachusetts":["boston"],
  "oregon":["portland"],"nevada":["las-vegas","reno"],"kentucky":["louisville"],"maryland":["baltimore"],
  "wisconsin":["milwaukee","madison"],"new-mexico":["albuquerque"],"georgia":["atlanta"],"nebraska":["omaha","lincoln"],
  "michigan":["detroit"],"minnesota":["minneapolis"],"alabama":["birmingham"],"virginia":["richmond","virginia-beach"],
  "connecticut":["hartford"],"iowa":["des-moines"],"arkansas":["little-rock"],"mississippi":["jackson"],
  "delaware":["wilmington"],"hawaii":["honolulu"],"alaska":["anchorage"],"idaho":["boise"],"montana":["billings"],
  "kansas":["wichita"],"south-dakota":["sioux-falls"],"north-dakota":["fargo"],"vermont":["burlington"],
  "west-virginia":["charleston"],"new-hampshire":["manchester"],"maine":["portland-me"],"wyoming":["cheyenne"],"south-carolina":["charleston-sc"],
};

const aiTechLawSlugs = [
  "ai-generated-content-legality","ai-art-ownership","deepfake-laws","data-privacy-rights","social-media-legal-issues",
  "online-defamation","crypto-nft-legal-status","terms-of-service-enforceability","right-to-repair","algorithmic-discrimination",
];

// All pillar slugs with their article slugs for state variant pages
const pillarArticleMap: Record<string, string[]> = {
  "auto-accident-law": autoAccidentSlugs,
  "personal-injury-law": personalInjurySlugs,
  "insurance-law": insuranceLawSlugs,
  "employment-law": employmentLawSlugs,
  "criminal-law": criminalLawSlugs,
  "landlord-tenant-law": landlordTenantLawSlugs,
  "ai-tech-law": aiTechLawSlugs,
};

// === Helpers ===

const LOCALES = ["en", "es", "fr", "de", "pt", "it"] as const;
const DEFAULT_LOCALE = "en";

function localeUrl(locale: string, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? `${SITE}${p}` : `${SITE}/${locale}${p === "/" ? "" : p}`;
}

function alternatesFor(path: string): string {
  const links = LOCALES.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(l, path)}"/>`,
  );
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(DEFAULT_LOCALE, path)}"/>`);
  return links.join("\n");
}

function wrapUrlset(entries: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>`;
}

function u(loc: string, freq: string, pri: string, lastmod?: string): string {
  return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;
}

/** Emit one <url> per locale, each carrying the full hreflang alternates set. */
function uL(path: string, freq: string, pri: string): string {
  const alts = alternatesFor(path);
  return LOCALES.map(
    (l) =>
      `  <url>\n    <loc>${localeUrl(l, path)}</loc>\n${alts}\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`,
  ).join("\n");
}

function sitemapIndex(): string {
  const BASE = "https://fpdfibyywvlcqjrkuuhz.supabase.co/functions/v1/generate-sitemap";
  const types = [
    "core","tools","legal-terms","guides","lawyers","blog","state-guides","statutes",
    "core-i18n","tools-i18n","legal-terms-i18n","guides-i18n","lawyers-eu-i18n",
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${types.map(t => `  <sitemap>\n    <loc>${BASE}?type=${t}</loc>\n  </sitemap>`).join("\n")}\n</sitemapindex>`;
}

// === i18n shards: one <url> per (path × locale), each with full hreflang alternates ===

const corePaths: [string, string, string][] = [
  ["/","weekly","1.0"], ["/tools","weekly","0.9"],
  ["/legal-terms","monthly","0.8"], ["/legal-clauses","monthly","0.8"],
  ["/contract-types","monthly","0.8"], ["/blog","daily","0.8"],
  ["/legal-health-check","monthly","0.7"],
  ["/laws","weekly","0.9"],
  ["/auto-accident-law","weekly","0.8"], ["/personal-injury-law","weekly","0.8"],
  ["/insurance-law","weekly","0.8"], ["/employment-law","weekly","0.8"],
  ["/criminal-law","weekly","0.8"], ["/landlord-tenant-law","weekly","0.8"],
  ["/ai-tech-law","weekly","0.8"],
];

function buildCoreI18n(): string {
  return wrapUrlset(corePaths.map(([p, f, pr]) => uL(p, f, pr)));
}
function buildToolsI18n(): string {
  const e: string[] = [];
  for (const cat of toolCategories) e.push(uL(`/tools/${cat}`, "weekly", "0.7"));
  for (const [cat, slug] of toolPages) e.push(uL(`/tools/${cat}/${slug}`, "monthly", "0.6"));
  return wrapUrlset(e);
}
function buildLegalTermsI18n(): string {
  const e: string[] = [];
  for (const s of legalTermSlugs) e.push(uL(`/legal-terms/${s}`, "monthly", "0.6"));
  for (const s of legalClauseSlugs) e.push(uL(`/legal-clauses/${s}`, "monthly", "0.6"));
  for (const s of contractTypeSlugs) e.push(uL(`/contract-types/${s}`, "monthly", "0.6"));
  return wrapUrlset(e);
}
function buildGuidesI18n(): string {
  const e: string[] = [];
  for (const s of autoAccidentSlugs) e.push(uL(`/auto-accident-law/${s}`, "monthly", "0.7"));
  for (const s of personalInjurySlugs) e.push(uL(`/personal-injury-law/${s}`, "monthly", "0.7"));
  for (const s of insuranceLawSlugs) e.push(uL(`/insurance-law/${s}`, "monthly", "0.7"));
  for (const s of employmentLawSlugs) e.push(uL(`/employment-law/${s}`, "monthly", "0.7"));
  for (const s of criminalLawSlugs) e.push(uL(`/criminal-law/${s}`, "monthly", "0.7"));
  for (const s of landlordTenantLawSlugs) e.push(uL(`/landlord-tenant-law/${s}`, "monthly", "0.7"));
  for (const s of aiTechLawSlugs) e.push(uL(`/ai-tech-law/${s}`, "monthly", "0.7"));
  return wrapUrlset(e);
}
// Lawyer routes are Tier-3 (English-only) — see buildLawyers() for the EN-only emission.

// === EU lawyer directory (Phase B1) — localized slugs per locale ===
// Mirrors src/data/eu/* registry. Keep in sync if those files change.
type EuLoc = "en" | "es" | "fr" | "de" | "pt" | "it";
const EU_BASE = "lawyer-eu";

const EU_COUNTRY_SLUGS: Record<string, Record<EuLoc, string>> = {
  fr: { en: "france", es: "francia", fr: "france", de: "frankreich", pt: "franca", it: "francia" },
  de: { en: "germany", es: "alemania", fr: "allemagne", de: "deutschland", pt: "alemanha", it: "germania" },
  es: { en: "spain", es: "espana", fr: "espagne", de: "spanien", pt: "espanha", it: "spagna" },
  it: { en: "italy", es: "italia", fr: "italie", de: "italien", pt: "italia", it: "italia" },
  pt: { en: "portugal", es: "portugal", fr: "portugal", de: "portugal", pt: "portugal", it: "portogallo" },
};

const EU_AREA_SLUGS: Record<string, Record<EuLoc, string>> = {
  "employment": { en: "employment", es: "derecho-laboral", fr: "droit-du-travail", de: "arbeitsrecht", pt: "direito-do-trabalho", it: "diritto-del-lavoro" },
  "family": { en: "family", es: "derecho-de-familia", fr: "droit-de-la-famille", de: "familienrecht", pt: "direito-da-familia", it: "diritto-di-famiglia" },
  "criminal-defense": { en: "criminal-defense", es: "defensa-penal", fr: "droit-penal", de: "strafrecht", pt: "direito-penal", it: "diritto-penale" },
  "personal-injury": { en: "personal-injury", es: "danos-personales", fr: "dommages-corporels", de: "personenschaeden", pt: "danos-pessoais", it: "danni-alla-persona" },
  "immigration": { en: "immigration", es: "inmigracion", fr: "droit-des-etrangers", de: "auslaenderrecht", pt: "direito-de-imigracao", it: "diritto-immigrazione" },
  "tax": { en: "tax", es: "derecho-fiscal", fr: "droit-fiscal", de: "steuerrecht", pt: "direito-fiscal", it: "diritto-tributario" },
  "real-estate": { en: "real-estate", es: "derecho-inmobiliario", fr: "droit-immobilier", de: "immobilienrecht", pt: "direito-imobiliario", it: "diritto-immobiliare" },
  "contract": { en: "contract", es: "derecho-contractual", fr: "droit-des-contrats", de: "vertragsrecht", pt: "direito-dos-contratos", it: "diritto-contrattuale" },
  "consumer": { en: "consumer", es: "derecho-del-consumidor", fr: "droit-de-la-consommation", de: "verbraucherrecht", pt: "direito-do-consumidor", it: "diritto-dei-consumatori" },
  "intellectual-property": { en: "intellectual-property", es: "propiedad-intelectual", fr: "propriete-intellectuelle", de: "geistiges-eigentum", pt: "propriedade-intelectual", it: "proprieta-intellettuale" },
  "data-protection-gdpr": { en: "data-protection-gdpr", es: "proteccion-de-datos-rgpd", fr: "protection-des-donnees-rgpd", de: "datenschutz-dsgvo", pt: "protecao-de-dados-rgpd", it: "protezione-dati-gdpr" },
  "business": { en: "business", es: "derecho-mercantil", fr: "droit-des-affaires", de: "wirtschaftsrecht", pt: "direito-comercial", it: "diritto-commerciale" },
};

const EU_CITY_SLUGS: Record<string, Record<string, Record<EuLoc, string>>> = {
  fr: {
    paris: { en: "paris", es: "paris", fr: "paris", de: "paris", pt: "paris", it: "parigi" },
    lyon: { en: "lyon", es: "lyon", fr: "lyon", de: "lyon", pt: "lyon", it: "lione" },
    marseille: { en: "marseille", es: "marsella", fr: "marseille", de: "marseille", pt: "marselha", it: "marsiglia" },
  },
  de: {
    berlin: { en: "berlin", es: "berlin", fr: "berlin", de: "berlin", pt: "berlim", it: "berlino" },
    munich: { en: "munich", es: "munich", fr: "munich", de: "muenchen", pt: "munique", it: "monaco-di-baviera" },
    hamburg: { en: "hamburg", es: "hamburgo", fr: "hambourg", de: "hamburg", pt: "hamburgo", it: "amburgo" },
  },
  es: {
    madrid: { en: "madrid", es: "madrid", fr: "madrid", de: "madrid", pt: "madrid", it: "madrid" },
    barcelona: { en: "barcelona", es: "barcelona", fr: "barcelone", de: "barcelona", pt: "barcelona", it: "barcellona" },
    valencia: { en: "valencia", es: "valencia", fr: "valence", de: "valencia", pt: "valencia", it: "valencia" },
  },
  it: {
    rome: { en: "rome", es: "roma", fr: "rome", de: "rom", pt: "roma", it: "roma" },
    milan: { en: "milan", es: "milan", fr: "milan", de: "mailand", pt: "milao", it: "milano" },
    naples: { en: "naples", es: "napoles", fr: "naples", de: "neapel", pt: "napoles", it: "napoli" },
  },
  pt: {
    lisbon: { en: "lisbon", es: "lisboa", fr: "lisbonne", de: "lissabon", pt: "lisboa", it: "lisbona" },
    porto: { en: "porto", es: "oporto", fr: "porto", de: "porto", pt: "porto", it: "porto" },
    braga: { en: "braga", es: "braga", fr: "braga", de: "braga", pt: "braga", it: "braga" },
  },
};

// === EU regions (B9) — slug per locale per region ===
// Mirrors src/data/eu/regions.ts. Same-as-canonical slugs are written explicitly
// so the per-locale URL builder stays uniform with cities/areas.
const sameForAll = (slug: string): Record<EuLoc, string> => ({
  en: slug, es: slug, fr: slug, de: slug, pt: slug, it: slug,
});
const EU_REGION_SLUGS: Record<string, Record<string, Record<EuLoc, string>>> = {
  fr: {
    "ile-de-france": sameForAll("ile-de-france"),
    "auvergne-rhone-alpes": sameForAll("auvergne-rhone-alpes"),
    "provence-alpes-cote-dazur": sameForAll("provence-alpes-cote-dazur"),
    "occitanie": sameForAll("occitanie"),
    "nouvelle-aquitaine": sameForAll("nouvelle-aquitaine"),
    "hauts-de-france": sameForAll("hauts-de-france"),
    "grand-est": sameForAll("grand-est"),
    "pays-de-la-loire": sameForAll("pays-de-la-loire"),
    "bretagne": sameForAll("bretagne"),
    "normandie": sameForAll("normandie"),
    "bourgogne-franche-comte": sameForAll("bourgogne-franche-comte"),
    "centre-val-de-loire": sameForAll("centre-val-de-loire"),
    "corse": sameForAll("corse"),
  },
  de: {
    "baden-wuerttemberg": sameForAll("baden-wuerttemberg"),
    "bayern": sameForAll("bayern"),
    "berlin-region": sameForAll("berlin-region"),
    "brandenburg": sameForAll("brandenburg"),
    "bremen-region": sameForAll("bremen-region"),
    "hamburg-region": sameForAll("hamburg-region"),
    "hessen": sameForAll("hessen"),
    "mecklenburg-vorpommern": sameForAll("mecklenburg-vorpommern"),
    "niedersachsen": sameForAll("niedersachsen"),
    "nordrhein-westfalen": sameForAll("nordrhein-westfalen"),
    "rheinland-pfalz": sameForAll("rheinland-pfalz"),
    "saarland": sameForAll("saarland"),
    "sachsen": sameForAll("sachsen"),
    "sachsen-anhalt": sameForAll("sachsen-anhalt"),
    "schleswig-holstein": sameForAll("schleswig-holstein"),
    "thueringen": sameForAll("thueringen"),
  },
  es: {
    "andalucia": sameForAll("andalucia"),
    "aragon": sameForAll("aragon"),
    "asturias": sameForAll("asturias"),
    "baleares": sameForAll("baleares"),
    "canarias": sameForAll("canarias"),
    "cantabria": sameForAll("cantabria"),
    "castilla-la-mancha": sameForAll("castilla-la-mancha"),
    "castilla-y-leon": sameForAll("castilla-y-leon"),
    "cataluna": sameForAll("cataluna"),
    "extremadura": sameForAll("extremadura"),
    "galicia": sameForAll("galicia"),
    "la-rioja": sameForAll("la-rioja"),
    "madrid-region": sameForAll("madrid-region"),
    "murcia-region": sameForAll("murcia-region"),
    "navarra": sameForAll("navarra"),
    "pais-vasco": sameForAll("pais-vasco"),
    "comunidad-valenciana": sameForAll("comunidad-valenciana"),
  },
  it: {
    "abruzzo": sameForAll("abruzzo"),
    "basilicata": sameForAll("basilicata"),
    "calabria": sameForAll("calabria"),
    "campania": sameForAll("campania"),
    "emilia-romagna": sameForAll("emilia-romagna"),
    "friuli-venezia-giulia": sameForAll("friuli-venezia-giulia"),
    "lazio": sameForAll("lazio"),
    "liguria": sameForAll("liguria"),
    "lombardia": sameForAll("lombardia"),
    "marche": sameForAll("marche"),
    "molise": sameForAll("molise"),
    "piemonte": sameForAll("piemonte"),
    "puglia": sameForAll("puglia"),
    "sardegna": sameForAll("sardegna"),
    "sicilia": sameForAll("sicilia"),
    "toscana": sameForAll("toscana"),
    "trentino-alto-adige": sameForAll("trentino-alto-adige"),
    "umbria": sameForAll("umbria"),
    "valle-daosta": sameForAll("valle-daosta"),
    "veneto": sameForAll("veneto"),
  },
  pt: {
    "norte": sameForAll("norte"),
    "centro": sameForAll("centro"),
    "lisboa-region": sameForAll("lisboa-region"),
    "alentejo": sameForAll("alentejo"),
    "algarve": sameForAll("algarve"),
    "acores": sameForAll("acores"),
    "madeira": sameForAll("madeira"),
  },
};

function euLocaleUrl(loc: EuLoc, path: string): string {
  return loc === DEFAULT_LOCALE ? `${SITE}${path}` : `${SITE}/${loc}${path}`;
}

/** Emit 6 <url> entries (one per locale) for the same canonical EU tuple,
 *  each carrying full cross-locale hreflang alternates with LOCALIZED paths. */
function uLEu(
  pathsByLocale: Record<EuLoc, string>, freq: string, pri: string,
): string {
  const altLinks = (LOCALES as readonly string[]).map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${euLocaleUrl(l as EuLoc, pathsByLocale[l as EuLoc])}"/>`,
  );
  altLinks.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${euLocaleUrl(DEFAULT_LOCALE as EuLoc, pathsByLocale[DEFAULT_LOCALE as EuLoc])}"/>`);
  const alts = altLinks.join("\n");
  return (LOCALES as readonly string[]).map((l) =>
    `  <url>\n    <loc>${euLocaleUrl(l as EuLoc, pathsByLocale[l as EuLoc])}</loc>\n${alts}\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`,
  ).join("\n");
}

function buildLawyersEuI18n(): string {
  const entries: string[] = [];

  // Hub
  const hubPaths = Object.fromEntries(
    (LOCALES as readonly string[]).map((l) => [l, `/${EU_BASE}`]),
  ) as Record<EuLoc, string>;
  entries.push(uLEu(hubPaths, "weekly", "0.8"));

  for (const [countryCode, countrySlugs] of Object.entries(EU_COUNTRY_SLUGS)) {
    // Country page
    const countryPaths = Object.fromEntries(
      (LOCALES as readonly string[]).map((l) => [l, `/${EU_BASE}/${countrySlugs[l as EuLoc]}`]),
    ) as Record<EuLoc, string>;
    entries.push(uLEu(countryPaths, "weekly", "0.7"));

    // Region pages (B9) — /{country}/region/{region}
    const regions = EU_REGION_SLUGS[countryCode] ?? {};
    for (const [regionCanonical, regionSlugs] of Object.entries(regions)) {
      const regionPaths = Object.fromEntries(
        (LOCALES as readonly string[]).map((l) => [l, `/${EU_BASE}/${countrySlugs[l as EuLoc]}/region/${regionSlugs[l as EuLoc]}`]),
      ) as Record<EuLoc, string>;
      entries.push(uLEu(regionPaths, "monthly", "0.6"));
      void regionCanonical;
    }


    for (const [areaCanonical, areaSlugs] of Object.entries(EU_AREA_SLUGS)) {
      // Area-in-country page
      const areaPaths = Object.fromEntries(
        (LOCALES as readonly string[]).map((l) => [l, `/${EU_BASE}/${countrySlugs[l as EuLoc]}/${areaSlugs[l as EuLoc]}`]),
      ) as Record<EuLoc, string>;
      entries.push(uLEu(areaPaths, "monthly", "0.6"));

      const cities = EU_CITY_SLUGS[countryCode] ?? {};
      for (const [cityCanonical, citySlugs] of Object.entries(cities)) {
        const cityPaths = Object.fromEntries(
          (LOCALES as readonly string[]).map((l) => [l, `/${EU_BASE}/${countrySlugs[l as EuLoc]}/${areaSlugs[l as EuLoc]}/${citySlugs[l as EuLoc]}`]),
        ) as Record<EuLoc, string>;
        entries.push(uLEu(cityPaths, "monthly", "0.5"));
        void cityCanonical;
      }
      void areaCanonical;
    }
  }

  return wrapUrlset(entries);
}

const statuteTopicSlugs = ["security-deposit-limits", "eviction-notice-period", "minimum-wage"];

function buildStatutes(): string {
  const e: string[] = [u(`${SITE}/laws`, "weekly", "0.8")];
  for (const st of stateSlugs) for (const topic of statuteTopicSlugs) {
    e.push(u(`${SITE}/laws/${st}/${topic}`, "monthly", "0.6"));
  }
  return wrapUrlset(e);
}

function buildCore(): string {
  return wrapUrlset([
    u(`${SITE}/`,"weekly","1.0"), u(`${SITE}/tools`,"weekly","0.9"),
    u(`${SITE}/legal-terms`,"monthly","0.8"), u(`${SITE}/legal-clauses`,"monthly","0.8"),
    u(`${SITE}/contract-types`,"monthly","0.8"), u(`${SITE}/blog`,"daily","0.8"),
    u(`${SITE}/laws`,"weekly","0.9"),
    u(`${SITE}/auto-accident-law`,"weekly","0.8"), u(`${SITE}/personal-injury-law`,"weekly","0.8"),
    u(`${SITE}/insurance-law`,"weekly","0.8"), u(`${SITE}/employment-law`,"weekly","0.8"),
    u(`${SITE}/criminal-law`,"weekly","0.8"), u(`${SITE}/landlord-tenant-law`,"weekly","0.8"),
    u(`${SITE}/ai-tech-law`,"weekly","0.8"),
    u(`${SITE}/lawyer-near-me`,"weekly","0.8"),
  ]);
}

function buildTools(): string {
  const e: string[] = [];
  for (const cat of toolCategories) e.push(u(`${SITE}/tools/${cat}`,"weekly","0.7"));
  for (const [cat,slug] of toolPages) e.push(u(`${SITE}/tools/${cat}/${slug}`,"monthly","0.6"));
  return wrapUrlset(e);
}

function buildLegalTerms(): string {
  const e: string[] = [];
  for (const s of legalTermSlugs) e.push(u(`${SITE}/legal-terms/${s}`,"monthly","0.6"));
  for (const s of legalClauseSlugs) e.push(u(`${SITE}/legal-clauses/${s}`,"monthly","0.6"));
  for (const s of contractTypeSlugs) e.push(u(`${SITE}/contract-types/${s}`,"monthly","0.6"));
  return wrapUrlset(e);
}

function buildGuides(): string {
  const e: string[] = [];
  for (const s of autoAccidentSlugs) e.push(u(`${SITE}/auto-accident-law/${s}`,"monthly","0.7"));
  for (const s of personalInjurySlugs) e.push(u(`${SITE}/personal-injury-law/${s}`,"monthly","0.7"));
  for (const s of insuranceLawSlugs) e.push(u(`${SITE}/insurance-law/${s}`,"monthly","0.7"));
  for (const s of employmentLawSlugs) e.push(u(`${SITE}/employment-law/${s}`,"monthly","0.7"));
  for (const s of criminalLawSlugs) e.push(u(`${SITE}/criminal-law/${s}`,"monthly","0.7"));
  for (const s of landlordTenantLawSlugs) e.push(u(`${SITE}/landlord-tenant-law/${s}`,"monthly","0.7"));
  for (const s of aiTechLawSlugs) e.push(u(`${SITE}/ai-tech-law/${s}`,"monthly","0.7"));
  return wrapUrlset(e);
}

function buildStateGuides(): string {
  const e: string[] = [];
  for (const [pillar, slugs] of Object.entries(pillarArticleMap)) {
    for (const st of stateSlugs) {
      for (const slug of slugs) {
        e.push(u(`${SITE}/${pillar}/${st}/${slug}`,"monthly","0.5"));
      }
    }
  }
  return wrapUrlset(e);
}

function buildLawyers(): string {
  const e: string[] = [];
  for (const a of lawyerAreaSlugs) e.push(u(`${SITE}/lawyer-near-me/${a}`,"monthly","0.6"));
  for (const a of lawyerAreaSlugs) for (const st of stateSlugs) e.push(u(`${SITE}/lawyer-near-me/${a}/${st}`,"monthly","0.5"));
  for (const a of lawyerAreaSlugs) for (const [st,cities] of Object.entries(citySlugsMap)) for (const c of cities) e.push(u(`${SITE}/lawyer-near-me/${a}/${st}/${c}`,"monthly","0.5"));
  return wrapUrlset(e);
}

const formSlugs = [
  "w-9","w-4","i-9","nda","residential-lease-agreement","power-of-attorney-financial",
  "vehicle-bill-of-sale","eviction-notice","demand-letter","promissory-note","release-of-liability",
  "offer-letter","independent-contractor-agreement","direct-deposit-authorization",
  "notice-to-vacate","move-in-move-out-checklist","security-deposit-receipt","late-rent-notice",
  "llc-operating-agreement","healthcare-power-of-attorney","simple-will","living-will","hipaa-authorization",
];
const formPackSlugs = ["new-hire-pack","landlord-starter-pack","small-business-pack","personal-planning-pack"];

const formSeoLandingSlugs = [
  "w-9-online-free","w-4-online-free","i-9-online-free","nda-online-free",
  "demand-letter-online-free","promissory-note-online-free",
];
const formStateFanoutPrefixes = ["eviction-notice","lease-agreement","power-of-attorney","vehicle-bill-of-sale"];
const formFanoutStates = ["california","new-york","texas","florida","illinois","pennsylvania"];

function buildForms(): string {
  const e: string[] = [u(`${SITE}/forms`,"weekly","0.9")];
  for (const s of formSlugs) e.push(u(`${SITE}/forms/${s}`,"monthly","0.7"));
  for (const s of formPackSlugs) e.push(u(`${SITE}/forms/${s}`,"monthly","0.7"));
  for (const s of formSeoLandingSlugs) e.push(u(`${SITE}/forms/${s}`,"monthly","0.8"));
  for (const p of formStateFanoutPrefixes) for (const st of formFanoutStates) e.push(u(`${SITE}/forms/${p}/${st}`,"monthly","0.7"));
  return wrapUrlset(e);
}



async function buildBlog(supabase: ReturnType<typeof createClient>): Promise<string> {
  const e: string[] = [];
  const { data: posts } = await supabase.from("blog_posts").select("slug, published_at").eq("status","published").order("published_at",{ascending:false});
  if (posts) for (const p of posts) e.push(u(`${SITE}/blog/${p.slug}`,"monthly","0.6", p.published_at ? new Date(p.published_at).toISOString().split("T")[0] : undefined));
  const { data: cats } = await supabase.from("blog_categories").select("slug");
  if (cats) for (const c of cats) e.push(u(`${SITE}/blog/category/${c.slug}`,"weekly","0.5"));
  return wrapUrlset(e);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const type = new URL(req.url).searchParams.get("type") || "index";
  const h = { ...corsHeaders, "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" };

  if (type === "core") return new Response(buildCore(), { headers: h });
  if (type === "tools") return new Response(buildTools(), { headers: h });
  if (type === "legal-terms") return new Response(buildLegalTerms(), { headers: h });
  if (type === "guides") return new Response(buildGuides(), { headers: h });
  if (type === "state-guides") return new Response(buildStateGuides(), { headers: h });
  if (type === "lawyers") return new Response(buildLawyers(), { headers: h });
  if (type === "forms") return new Response(buildForms(), { headers: h });
  if (type === "statutes") return new Response(buildStatutes(), { headers: h });
  if (type === "core-i18n") return new Response(buildCoreI18n(), { headers: h });
  if (type === "tools-i18n") return new Response(buildToolsI18n(), { headers: h });
  if (type === "legal-terms-i18n") return new Response(buildLegalTermsI18n(), { headers: h });
  if (type === "guides-i18n") return new Response(buildGuidesI18n(), { headers: h });
  if (type === "lawyers-eu-i18n") return new Response(buildLawyersEuI18n(), { headers: h });
  
  
  if (type === "blog") {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    return new Response(await buildBlog(sb), { headers: h });
  }
  return new Response(sitemapIndex(), { headers: h });
});
