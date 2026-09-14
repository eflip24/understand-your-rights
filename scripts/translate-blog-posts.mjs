/**
 * Translates published blog articles into the site's five non-English locales
 * and stores them in blog_translations. Idempotent: skips (post, locale) pairs
 * that already exist.
 *
 * Usage: node scripts/translate-blog-posts.mjs <slug> [slug ...]
 */
import { astraJson } from "./_aiAstra.mjs";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import crypto from "node:crypto";

const LOCALES = {
  es: "Spanish (Spain)",
  fr: "French (France)",
  de: "German (Germany)",
  it: "Italian (Italy)",
  pt: "Portuguese (Portugal)",
};

const SYSTEM = `You are a professional legal translator localising US/EU legal explainers for LegallySpoken.com.

Rules:
- Translate the HTML body into the target language, preserving every HTML tag, attribute, table structure and internal link href exactly as given. Translate only human-readable text (including anchor text and table cells).
- Keep statute names, agency names and act titles in the original language, adding a short parenthetical gloss in the target language on first use.
- Keep all figures, currencies and dates unchanged.
- Natural, professional register — never machine-literal.
- Translate the title and the meta description too (description max 160 characters).

Output STRICT JSON only: {"title": "...", "excerpt": "...", "content": "<translated HTML>"}`;

function q(v) {
  const tag = `x_${crypto.randomBytes(4).toString("hex")}`;
  return `$${tag}$${v}$${tag}$`;
}

function psql(sql) {
  const file = `/tmp/bt_${crypto.randomBytes(4).toString("hex")}.sql`;
  fs.writeFileSync(file, sql);
  return execFileSync("psql", ["-v", "ON_ERROR_STOP=1", "-f", file], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error("usage: node scripts/translate-blog-posts.mjs <slug> [slug ...]");
  process.exit(1);
}

const rowsJson = psql(
  `\\t on
SELECT json_agg(row_to_json(p)) FROM (
  SELECT b.id, b.slug, b.title, b.excerpt, b.content,
    COALESCE((SELECT array_agg(locale) FROM blog_translations t WHERE t.post_id = b.id), '{}') AS done
  FROM blog_posts b WHERE b.slug IN (${slugs.map(q).join(",")})
) p;`,
).trim();
const posts = JSON.parse(rowsJson || "[]");

for (const post of posts) {
  for (const [loc, label] of Object.entries(LOCALES)) {
    if ((post.done || []).includes(loc)) {
      console.log(`· ${post.slug} [${loc}] already translated`);
      continue;
    }
    console.log(`→ ${post.slug} [${loc}]`);
    let j;
    try {
      j = await astraJson({
        system: SYSTEM,
        user: `Target language: ${label}.

TITLE: ${post.title}

META DESCRIPTION: ${post.excerpt}

HTML BODY:
${post.content}`,
      });
    } catch (e) {
      console.error(`  ! ${String(e.message).slice(0, 180)}`);
      continue;
    }
    if (!j?.title || !j?.content) {
      console.error("  ! incomplete translation");
      continue;
    }
    psql(`\\set ON_ERROR_STOP 1
INSERT INTO blog_translations (post_id, locale, title, excerpt, content, status)
VALUES ('${post.id}', ${q(loc)}, ${q(j.title)}, ${q(String(j.excerpt || "").slice(0, 300))}, ${q(j.content)}, 'published')
ON CONFLICT (post_id, locale) DO NOTHING;`);
    console.log("  ✓ saved");
  }
}
console.log("\nDone.");
