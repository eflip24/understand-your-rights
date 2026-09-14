/**
 * September 2026 editorial batch: eight demand-verified legal explainers.
 * Drafts each article through the Lovable AI Gateway and inserts it into
 * blog_posts (status=published, ai_generated=true). Idempotent on slug.
 *
 * Usage: node scripts/publish-blog-2026-09.mjs [slug ...]
 */
import { astraJson } from "./_aiAstra.mjs";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import crypto from "node:crypto";

export const POSTS = [
  {
    slug: "how-data-breach-settlement-payouts-are-calculated",
    title: "How Data Breach Settlement Payouts Are Calculated",
    keyword: "data breach settlement",
    links: [
      ["/data-breach-compensation", "Data Breach Compensation Guide"],
      ["/tools/consumer/settlement-estimator", "Settlement Estimator"],
      ["/tools/consumer/statute-of-limitations-lookup", "Statute of Limitations Lookup"],
    ],
  },
  {
    slug: "are-deepfakes-illegal-take-it-down-act-state-laws",
    title: "Are Deepfakes Illegal? The TAKE IT DOWN Act and State Laws",
    keyword: "deepfake laws",
    links: [
      ["/ai-tech-law", "AI & Tech Law Guide"],
      ["/legal-terms", "Legal Terms Directory"],
      ["/lawyer-near-me", "Find a Lawyer Near You"],
    ],
  },
  {
    slug: "how-to-dispute-an-insurance-claim-denial",
    title: "How to Dispute an Insurance Claim Denial (Step-by-Step)",
    keyword: "how to dispute insurance claims",
    links: [
      ["/insurance-law", "Insurance Law Guide"],
      ["/tools/consumer/settlement-estimator", "Settlement Estimator"],
      ["/tools/consumer/accident-damage-calculator", "Accident Damage Calculator"],
    ],
  },
  {
    slug: "health-insurance-appeal-deadlines-by-state",
    title: "Health Insurance Appeal Deadlines: Internal and External Review",
    keyword: "how to successfully appeal an insurance denial",
    links: [
      ["/health-insurance-denials", "Health Insurance Denials Guide"],
      ["/insurance-law", "Insurance Law Guide"],
      ["/lawyer-near-me", "Find a Lawyer Near You"],
    ],
  },
  {
    slug: "how-to-negotiate-a-severance-package",
    title: "How to Negotiate a Severance Package (What Actually Moves the Number)",
    keyword: "how to negotiate a severance package",
    links: [
      ["/tools/employment/severance-pay-calculator", "Severance Pay Calculator"],
      ["/employment-law", "Employment Law Guide"],
      ["/tools/employment/wrongful-termination-checklist", "Wrongful Termination Checklist"],
    ],
  },
  {
    slug: "subrogation-when-your-insurer-takes-part-of-your-settlement",
    title: "Subrogation: When Your Insurer Takes Part of Your Settlement",
    keyword: "insurance subrogation settlement",
    links: [
      ["/insurance-law", "Insurance Law Guide"],
      ["/tools/consumer/settlement-estimator", "Settlement Estimator"],
      ["/personal-injury-law", "Personal Injury Law Guide"],
    ],
  },
  {
    slug: "hiring-an-english-speaking-lawyer-in-spain",
    title: "Hiring an English-Speaking Lawyer in Spain: Fees, Checks and Deadlines",
    keyword: "english speaking lawyer in spain",
    extra:
      "Include a short H2 with one-paragraph summaries for Danish, Swedish, Norwegian and Dutch readers (written in those languages, each 2-3 sentences, each under its own <h3>).",
    links: [
      ["/english-speaking-lawyer-in-spain", "English-Speaking Lawyer in Spain Guide"],
      ["/eu-tools", "European Legal Calculators"],
      ["/international", "International Legal Guides"],
    ],
  },
  {
    slug: "small-claims-court-costs-and-deadlines-by-country",
    title: "Small Claims Court Costs and Deadlines: US, UK, Ireland, Canada, Australia",
    keyword: "small claims court cost",
    links: [
      ["/data/court-filing-fees", "Court Filing Fee Dataset"],
      ["/courts", "Court Information Hub"],
      ["/international", "International Legal Guides"],
    ],
  },
];

const SYSTEM = `You are a senior legal editor for LegallySpoken.com writing plain-English explainers that satisfy Google's helpful-content standards and rank for high-CPC legal queries.

Hard rules:
- 1400-1800 words of substantive HTML using only <h2>, <h3>, <p>, <ul>, <li>, <ol>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <strong>, <em>, <a>. No <html>, <body>, <h1>, <img>, <script>, <style>.
- Open with a 2-3 sentence direct answer to the target keyword, then expand.
- Include: an <h2> explaining how it works; an <h2> containing ONE original comparison <table> with concrete figures, deadlines or ranges (at least 5 rows, with a header row); an <h2> FAQ with 4 <h3> questions and answers; an <h2> "When to talk to a lawyer".
- Use real statutes, agencies, deadlines and dollar/euro ranges. Never invent case citations or fake court names. Where a figure varies, say so and give the typical range.
- Weave the target keyword and 3-4 close variants naturally.
- Include every internal link provided, each once, with natural anchor text inside a sentence.
- End with: <p><em>Reviewed by the LegallySpoken editorial team, September 2026. This article is general information, not legal advice. Consult a qualified attorney about your situation.</em></p>

Output STRICT JSON only: {"excerpt": "150-160 character meta description", "content": "<full HTML body>"}. Escape all quotes and newlines correctly inside JSON strings.`;

function shellInsert(row) {
  const tag = (n) => `${n}_${crypto.randomBytes(4).toString("hex")}`;
  const [tT, tS, tB, tE] = [tag("t"), tag("s"), tag("b"), tag("e")];
  const sql = `\\set ON_ERROR_STOP 1
INSERT INTO blog_posts (wp_id, title, slug, content, excerpt, author_name, published_at, status, ai_generated)
VALUES (
  ${row.wp_id},
  $${tT}$${row.title}$${tT}$,
  $${tS}$${row.slug}$${tS}$,
  $${tB}$${row.content}$${tB}$,
  $${tE}$${row.excerpt}$${tE}$,
  'LegallySpoken Editorial', now(), 'published', true
)
ON CONFLICT (slug) DO NOTHING
RETURNING id, slug;
`;
  const file = `/tmp/blog_${row.wp_id}.sql`;
  fs.writeFileSync(file, sql);
  return execFileSync("psql", ["-v", "ON_ERROR_STOP=1", "-f", file], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

const only = process.argv.slice(2);
const queue = only.length ? POSTS.filter((p) => only.includes(p.slug)) : POSTS;
const wpBase = 920001;

for (const p of queue) {
  const idx = POSTS.indexOf(p);
  console.log(`\n[${idx + 1}/${POSTS.length}] ${p.title}`);
  const user = `Target keyword: ${p.keyword}
Working title: ${p.title}
Internal links to include (path — anchor idea):
${p.links.map(([u, l]) => `- ${u} — ${l}`).join("\n")}
${p.extra ?? ""}

Write the article per the schema.`;

  let j;
  try {
    j = await astraJson({ system: SYSTEM, user });
  } catch (e) {
    console.error("  ! failed:", String(e.message).slice(0, 200));
    continue;
  }
  if (!j?.content || !j?.excerpt) {
    console.error("  ! incomplete output");
    continue;
  }
  const out = shellInsert({
    wp_id: wpBase + idx,
    title: p.title,
    slug: p.slug,
    content: j.content,
    excerpt: String(j.excerpt).slice(0, 300),
  });
  console.log("  ✓", out.trim().split("\n").slice(-2)[0]);
}
console.log("\nDone.");
