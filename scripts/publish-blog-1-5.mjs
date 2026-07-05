/**
/**
 * Sprint post batch #1-5: high-CPC editorial calendar rollout.
 * Drafts each post via Lovable AI Gateway and inserts into blog_posts
 * (status=published, ai_generated=true). Idempotent on slug.
 */
import { callAiJson } from "./_aiTranslate.mjs";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import crypto from "node:crypto";

const POSTS = [
  {
    slug: "how-slip-and-fall-settlements-are-calculated",
    title: "How Slip and Fall Settlements Are Calculated (With Examples)",
    keyword: "how are slip and fall settlements calculated",
    tool: "/tools/consumer/slip-and-fall-settlement",
    tool_label: "Slip & Fall Settlement Estimator",
  },
  {
    slug: "average-slip-and-fall-settlement-without-surgery-2026",
    title: "Average Slip and Fall Settlement Without Surgery — 2026 Data",
    keyword: "slip and fall settlements without surgery",
    tool: "/tools/consumer/slip-and-fall-settlement",
    tool_label: "Slip & Fall Settlement Estimator",
  },
  {
    slug: "do-i-need-a-lawyer-for-a-minor-car-accident",
    title: "Do I Need a Lawyer for a Minor Car Accident?",
    keyword: "should i get a lawyer for a minor car accident",
    tool: "/tools/consumer/accident-damage-calculator",
    tool_label: "Accident Damage Calculator",
  },
  {
    slug: "how-much-does-a-dui-lawyer-cost-state-guide",
    title: "How Much Does a DUI Lawyer Cost? State-by-State Guide",
    keyword: "how much does a dui lawyer cost",
    tool: "/tools/consumer/dui-cost-estimator",
    tool_label: "DUI Cost Estimator",
  },
  {
    slug: "wrongful-termination-settlement-amounts-california",
    title: "Wrongful Termination Settlement Amounts in California",
    keyword: "wrongful termination california average settlement",
    tool: "/tools/employment/wrongful-term-value",
    tool_label: "Wrongful Termination Settlement Calculator",
  },
];

const SYSTEM = `You are a senior legal editor writing US-focused explainers for LegallySpoken.com. You produce factually accurate, plain-English articles that pass Google AdSense "Helpful Content" review and rank for high-CPC legal queries.

Hard rules:
- ~1200-1600 words of substantive HTML (use <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em> only — NO <html>, <body>, <h1>, <script>, <style>, <img>).
- Open with a 2-3 sentence direct answer to the target keyword (featured-snippet style), then expand.
- Include at least: one <h2> "How it works", one <h2> with a real-dollar example or worked scenario, one <h2> FAQ with 3-4 <h3> questions, and one <h2> "When to talk to a lawyer".
- Cite typical dollar ranges, statutes, and process steps. Do NOT fabricate case citations.
- Naturally weave the target keyword and 3-4 close variants; no keyword stuffing.
- Include exactly ONE contextual call-to-action linking to the paired tool, phrased as: <p><a href="{TOOL_URL}">Try the {TOOL_LABEL} →</a></p>
- Always end with a short disclaimer <p><em>This article is general information, not legal advice...</em></p>

Output STRICT JSON: {"excerpt": "150-160 char meta description", "content": "<full HTML body>"}`;

function shellInsert(row) {
  const args = [
    "-v", "ON_ERROR_STOP=1",
    "-c",
    `INSERT INTO blog_posts (wp_id, title, slug, content, excerpt, author_name, published_at, status, ai_generated)
     VALUES ($1, $2, $3, $4, $5, $6, now(), 'published', true)
     ON CONFLICT (slug) DO UPDATE SET
       title = EXCLUDED.title,
       content = EXCLUDED.content,
       excerpt = EXCLUDED.excerpt,
       published_at = COALESCE(blog_posts.published_at, now())
     RETURNING id, slug;`,
    "-v", `1=${row.wp_id}`,
  ];
  // psql -v can't take arbitrary text safely; use a heredoc via stdin instead.
  const sql = `
INSERT INTO blog_posts (wp_id, title, slug, content, excerpt, author_name, published_at, status, ai_generated)
VALUES (${row.wp_id}, $tag$${row.title}$tag$, $tag$${row.slug}$tag$, $body$${row.content}$body$, $tag$${row.excerpt}$tag$, 'LegallySpoken Editorial', now(), 'published', true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  excerpt = EXCLUDED.excerpt,
  published_at = COALESCE(blog_posts.published_at, now())
RETURNING id, slug;`;
  const out = execFileSync("psql", ["-v", "ON_ERROR_STOP=1", "-c", sql], { encoding: "utf8" });
  return out;
}

let wpBase = 900001;
for (const [i, p] of POSTS.entries()) {
  console.log(`\n[${i + 1}/${POSTS.length}] ${p.title}`);
  const user = `Target keyword: ${p.keyword}
Working title: ${p.title}
Paired tool URL: ${p.tool}
Paired tool label: ${p.tool_label}

Write the article per the schema. Substitute {TOOL_URL} and {TOOL_LABEL} in the CTA with the values above.`;
  const j = await callAiJson({ system: SYSTEM, user, temperature: 0.5 });
  if (!j?.content || !j?.excerpt) {
    console.error("  ! bad AI response", JSON.stringify(j).slice(0, 200));
    continue;
  }
  const row = {
    wp_id: wpBase + i,
    title: p.title,
    slug: p.slug,
    content: j.content,
    excerpt: j.excerpt.slice(0, 300),
  };
  const res = shellInsert(row);
  console.log("  ✓", res.trim().split("\n").slice(-2)[0]);
}
console.log("\nDone.");
