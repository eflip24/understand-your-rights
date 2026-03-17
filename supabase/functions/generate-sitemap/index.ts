import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://legallyspoken.com";

// Tool pages: category/slug pairs
const toolPages: [string, string][] = [
  ["contract", "reading-time-calculator"],
  ["contract", "word-counter"],
  ["contract", "jargon-translator"],
  ["contract", "clause-finder"],
  ["contract", "contract-expiration-tracker"],
  ["contract", "signature-block-generator"],
  ["contract", "contract-checklist-generator"],
  ["contract", "amendment-drafter"],
  ["contract", "contract-value-calculator"],
  ["consumer", "cancellation-deadline-calculator"],
  ["consumer", "notice-period-calculator"],
  ["consumer", "late-fee-calculator"],
  ["consumer", "refund-eligibility-checker"],
  ["consumer", "warranty-expiration-calculator"],
  ["consumer", "statute-of-limitations-lookup"],
  ["consumer", "small-claims-limit-checker"],
  ["consumer", "consumer-rights-quiz"],
  ["consumer", "dispute-letter-generator"],
  ["employment", "non-compete-checker"],
  ["employment", "freelance-rate-calculator"],
  ["employment", "invoice-interest-calculator"],
  ["employment", "salary-to-hourly-converter"],
  ["employment", "pto-calculator"],
  ["employment", "wrongful-termination-checklist"],
  ["employment", "minimum-wage-lookup"],
  ["employment", "employment-contract-checklist"],
  ["employment", "overtime-calculator"],
  ["employment", "severance-pay-calculator"],
  ["employment", "contractor-vs-employee-checker"],
  ["employment", "paycheck-calculator"],
  ["generators", "nda-generator"],
  ["generators", "privacy-policy-generator"],
  ["generators", "complaint-letter-generator"],
  ["generators", "terms-of-service-generator"],
  ["generators", "cease-and-desist-generator"],
  ["generators", "power-of-attorney-generator"],
  ["generators", "independent-contractor-agreement-generator"],
  ["generators", "promissory-note-generator"],
  ["generators", "rental-agreement-generator"],
  ["ai", "red-flag-scanner"],
  ["ai", "nda-fairness-score"],
  ["ai", "lease-analyzer"],
  ["ai", "terms-summarizer"],
  ["ai", "contract-comparison"],
  ["ai", "clause-explainer"],
  ["realestate", "security-deposit-calculator"],
  ["realestate", "rent-increase-calculator"],
  ["realestate", "lease-term-comparison"],
  ["realestate", "move-out-checklist-generator"],
  ["business", "business-name-checker"],
  ["business", "partnership-split-calculator"],
  ["business", "business-expense-tracker"],
  ["finance", "crypto-tax-calculator"],
  ["finance", "dca-calculator"],
  ["finance", "position-size-calculator"],
  ["finance", "profit-loss-calculator"],
  ["finance", "compound-interest-calculator"],
  ["finance", "margin-call-calculator"],
  ["finance", "breakeven-calculator"],
  ["finance", "risk-reward-calculator"],
  ["finance", "crypto-converter"],
  ["finance", "loan-payment-calculator"],
  ["finance", "grant-budget-calculator"],
  ["finance", "grant-deadline-tracker"],
  ["finance", "grant-compliance-checklist"],
  ["finance", "vesting-schedule-calculator"],
  ["finance", "stock-option-tax-calculator"],
  ["finance", "equity-dilution-calculator"],
  ["finance", "income-tax-estimator"],
  ["finance", "auto-loan-calculator"],
  ["finance", "debt-payoff-calculator"],
  ["finance", "net-worth-calculator"],
  ["energy", "solar-panel-roi-calculator"],
  ["energy", "solar-incentive-tax-credit-estimator"],
  ["energy", "energy-savings-calculator"],
  ["energy", "carbon-footprint-offset-calculator"],
  ["energy", "green-lease-clause-checker"],
  ["energy", "ev-vs-gas-cost-comparison"],
  ["energy", "home-energy-audit-checklist"],
  ["energy", "power-purchase-agreement-calculator"],
];

const toolCategories = [
  "contract", "consumer", "employment", "generators", "ai",
  "realestate", "business", "finance", "energy",
];

const legalTermSlugs = [
  "indemnification", "arbitration", "force-majeure", "liability", "non-compete",
  "non-disclosure", "severability", "waiver", "breach", "consideration",
  "jurisdiction", "statute-of-limitations", "due-diligence", "fiduciary",
  "negligence", "tort", "damages", "escrow", "lien", "power-of-attorney",
  "affidavit", "addendum", "amendment", "boilerplate", "cease-and-desist",
  "covenant", "default", "discovery", "good-faith", "injunction",
  "intellectual-property", "material-breach", "mediation", "termination",
  "warranty", "collateral", "contingency", "estoppel", "guarantor",
  "liquidated-damages", "plaintiff", "defendant", "deposition", "subpoena",
  "hold-harmless", "void-voidable", "mutual-assent", "remedy", "rescission",
  "notarization", "precedent", "privity", "duress", "encumbrance",
  "perjury", "surety", "title", "deed", "fraud", "contempt",
  "stare-decisis", "indemnity", "retainer", "standing", "subrogation",
  "usury", "tort-reform", "unconscionable", "venue", "quitclaim-deed",
  "pro-bono", "capacity", "class-action", "comparative-negligence",
  "consequential-damages", "constructive-notice", "counterpart",
  "cross-default", "de-facto", "forum-selection",
];

const legalClauseSlugs = [
  "non-compete-clause", "confidentiality-clause", "indemnification-clause",
  "limitation-of-liability", "termination-clause", "force-majeure-clause",
  "arbitration-clause", "governing-law-clause", "intellectual-property-clause",
  "payment-terms-clause", "entire-agreement-clause", "assignment-clause",
  "warranty-clause", "notice-clause", "severability-clause",
  "dispute-resolution-clause", "non-solicitation-clause", "data-protection-clause",
  "insurance-clause", "representations-warranties-clause", "waiver-of-jury-trial",
  "acceleration-clause", "anti-dilution-clause", "automatic-renewal-clause",
  "best-efforts-clause", "choice-of-forum-clause", "clawback-clause",
  "change-of-control-clause", "compliance-clause", "cross-default-clause",
  "cure-period-clause", "drag-along-clause", "exclusivity-clause",
  "first-right-of-refusal-clause", "holdback-clause", "indemnity-cap-clause",
  "integration-clause", "key-person-clause", "material-adverse-change-clause",
  "most-favored-nation-clause", "no-shop-clause", "non-disparagement-clause",
  "penalty-clause", "price-adjustment-clause", "right-to-audit-clause",
  "right-of-first-offer-clause", "survival-clause", "tag-along-clause",
  "time-is-of-the-essence-clause", "tolling-clause", "venue-clause",
];

const contractTypeSlugs = [
  "nda", "employment-contract", "freelance-agreement", "lease-agreement",
  "saas-agreement", "consulting-agreement", "partnership-agreement",
  "purchase-agreement", "service-agreement", "licensing-agreement",
  "terms-of-service", "privacy-policy", "joint-venture-agreement",
  "real-estate-purchase", "loan-agreement", "non-solicitation-agreement",
  "shareholder-agreement", "commercial-lease", "website-terms",
];

const autoAccidentSlugs = [
  "what-to-do-after-car-accident", "how-fault-is-determined", "no-fault-vs-at-fault-states",
  "filing-insurance-claim", "statute-of-limitations", "comparative-negligence",
  "uninsured-motorist-claims", "car-accident-case-value", "rideshare-accident-claims",
  "hit-and-run-legal-steps",
];

const personalInjurySlugs = [
  "types-of-cases", "how-settlements-work", "pain-and-suffering-calculator",
  "medical-malpractice", "slip-and-fall-liability", "dog-bite-laws",
  "workers-comp-vs-pi", "product-liability", "wrongful-death-claims", "contingency-fees",
];

const insuranceLawSlugs = [
  "appeal-denied-claim", "bad-faith-insurance", "homeowners-policy-guide",
  "health-insurance-denial", "life-insurance-disputes", "auto-coverage-types",
  "subrogation-explained", "file-complaint-against-insurer", "umbrella-insurance",
  "insurance-fraud",
];

const lawyerAreaSlugs = [
  "personal-injury", "car-accident", "workers-compensation", "employment",
  "insurance-dispute", "real-estate", "family-law", "bankruptcy",
  "criminal-defense", "immigration",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  // Fetch published blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // Fetch blog categories
  const { data: categories } = await supabase
    .from("blog_categories")
    .select("slug");

  const staticUrls = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/tools", priority: "0.9", changefreq: "weekly" },
    { loc: "/legal-terms", priority: "0.8", changefreq: "monthly" },
    { loc: "/legal-clauses", priority: "0.8", changefreq: "monthly" },
    { loc: "/contract-types", priority: "0.8", changefreq: "monthly" },
    { loc: "/blog", priority: "0.8", changefreq: "daily" },
  ];

  const urlEntries = staticUrls.map(
    (u) =>
      `  <url>
    <loc>${SITE}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  );

  // Tool category pages
  for (const cat of toolCategories) {
    urlEntries.push(
      `  <url>
    <loc>${SITE}/tools/${cat}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    );
  }

  // Individual tool pages
  for (const [cat, slug] of toolPages) {
    urlEntries.push(
      `  <url>
    <loc>${SITE}/tools/${cat}/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    );
  }

  // Legal term pages
  for (const slug of legalTermSlugs) {
    urlEntries.push(
      `  <url>
    <loc>${SITE}/legal-terms/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    );
  }

  // Legal clause pages
  for (const slug of legalClauseSlugs) {
    urlEntries.push(
      `  <url>
    <loc>${SITE}/legal-clauses/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    );
  }

  // Contract type pages
  for (const slug of contractTypeSlugs) {
    urlEntries.push(
      `  <url>
    <loc>${SITE}/contract-types/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    );
  }

  // Pillar pages
  const pillarPages = [
    { loc: "/auto-accident-law", priority: "0.8" },
    { loc: "/personal-injury-law", priority: "0.8" },
    { loc: "/insurance-law", priority: "0.8" },
    { loc: "/local-lawyers", priority: "0.8" },
  ];
  for (const p of pillarPages) {
    urlEntries.push(`  <url>\n    <loc>${SITE}${p.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`);
  }

  // Cluster articles
  for (const slug of autoAccidentSlugs) {
    urlEntries.push(`  <url>\n    <loc>${SITE}/auto-accident-law/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }
  for (const slug of personalInjurySlugs) {
    urlEntries.push(`  <url>\n    <loc>${SITE}/personal-injury-law/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }
  for (const slug of insuranceLawSlugs) {
    urlEntries.push(`  <url>\n    <loc>${SITE}/insurance-law/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }
  for (const slug of lawyerAreaSlugs) {
    urlEntries.push(`  <url>\n    <loc>${SITE}/local-lawyers/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
  }


  if (posts) {
    for (const post of posts) {
      const lastmod = post.published_at
        ? new Date(post.published_at).toISOString().split("T")[0]
        : "";
      urlEntries.push(
        `  <url>
    <loc>${SITE}/blog/${post.slug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
      );
    }
  }

  // Blog categories
  if (categories) {
    for (const cat of categories) {
      urlEntries.push(
        `  <url>
    <loc>${SITE}/blog/category/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
