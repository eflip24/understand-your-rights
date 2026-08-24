/**
 * Materialises every sitemap shard onto the site's own host.
 *
 * The `generate-sitemap` edge function stays the single source of truth for the
 * URL lists, but search engines discount sitemaps served from a different
 * hostname than the URLs they contain. This script fetches each shard at build
 * time and writes it to `public/sitemaps/{type}.xml`, plus a same-host
 * `public/sitemap.xml` index, so everything lives under legallyspoken.com.
 *
 * Run: node scripts/generate-sitemap-shards.mjs
 * Wired to `prebuild` so published builds always ship fresh shards. If the
 * function is unreachable the previously generated files are left untouched.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const FN =
  "https://fpdfibyywvlcqjrkuuhz.supabase.co/functions/v1/generate-sitemap";
const SITE = "https://legallyspoken.com";

const TYPES = [
  "core",
  "tools",
  "legal-terms",
  "guides",
  "state-guides",
  "lawyers",
  "forms",
  "statutes",
  "blog",
  "core-i18n",
  "tools-i18n",
  "legal-terms-i18n",
  "guides-i18n",
  "lawyers-i18n",
  "lawyers-eu-i18n",
  "forms-eu-i18n",
  "eu-tools-i18n",
];

const outDir = resolve("public/sitemaps");
mkdirSync(outDir, { recursive: true });

const written = [];

for (const type of TYPES) {
  const target = resolve(outDir, `${type}.xml`);
  try {
    const res = await fetch(`${FN}?type=${type}`, {
      headers: { accept: "application/xml" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = (await res.text()).trim();
    if (!xml.includes("<urlset")) throw new Error("no <urlset> in response");
    writeFileSync(target, `${xml}\n`);
    const count = (xml.match(/<loc>/g) || []).length;
    written.push(type);
    console.log(`  ${type}.xml — ${count} urls`);
  } catch (err) {
    if (existsSync(target)) {
      written.push(type);
      console.warn(`  ${type}.xml — fetch failed (${err.message}), keeping existing file`);
    } else {
      console.warn(`  ${type}.xml — skipped (${err.message})`);
    }
  }
}

const index = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...written.map(
    (t) => `  <sitemap>\n    <loc>${SITE}/sitemaps/${t}.xml</loc>\n  </sitemap>`,
  ),
  "</sitemapindex>",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), `${index}\n`);
console.log(`sitemap.xml index written (${written.length} shards, same-host)`);
