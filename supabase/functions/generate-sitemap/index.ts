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

function wrapUrlset(entries: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`;
}

function u(loc: string, freq: string, pri: string, lastmod?: string): string {
  return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;
}

function sitemapIndex(): string {
  const BASE = "https://fpdfibyywvlcqjrkuuhz.supabase.co/functions/v1/generate-sitemap";
  const types = ["core","tools","legal-terms","guides","lawyers","blog","state-guides"];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${types.map(t => `  <sitemap>\n    <loc>${BASE}?type=${t}</loc>\n  </sitemap>`).join("\n")}\n</sitemapindex>`;
}

function buildCore(): string {
  return wrapUrlset([
    u(`${SITE}/`,"weekly","1.0"), u(`${SITE}/tools`,"weekly","0.9"),
    u(`${SITE}/legal-terms`,"monthly","0.8"), u(`${SITE}/legal-clauses`,"monthly","0.8"),
    u(`${SITE}/contract-types`,"monthly","0.8"), u(`${SITE}/blog`,"daily","0.8"),
    u(`${SITE}/auto-accident-law`,"weekly","0.8"), u(`${SITE}/personal-injury-law`,"weekly","0.8"),
    u(`${SITE}/insurance-law`,"weekly","0.8"), u(`${SITE}/employment-law`,"weekly","0.8"),
    u(`${SITE}/criminal-law`,"weekly","0.8"), u(`${SITE}/landlord-tenant-law`,"weekly","0.8"),
    u(`${SITE}/ai-tech-law`,"weekly","0.8"),
    u(`${SITE}/local-lawyers`,"weekly","0.8"),
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
  for (const a of lawyerAreaSlugs) e.push(u(`${SITE}/local-lawyers/${a}`,"monthly","0.6"));
  for (const a of lawyerAreaSlugs) for (const st of stateSlugs) e.push(u(`${SITE}/local-lawyers/${a}/${st}`,"monthly","0.5"));
  for (const a of lawyerAreaSlugs) for (const [st,cities] of Object.entries(citySlugsMap)) for (const c of cities) e.push(u(`${SITE}/local-lawyers/${a}/${st}/${c}`,"monthly","0.5"));
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
  if (type === "blog") {
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    return new Response(await buildBlog(sb), { headers: h });
  }
  return new Response(sitemapIndex(), { headers: h });
});
