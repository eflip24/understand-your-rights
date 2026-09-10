/**
 * Removes noindexed fan-out URLs from the generated sitemap shards.
 *
 * `StateClusterArticlePage` decides at render time whether a
 * /{pillar}/{state}/{slug} page is thin (see `src/lib/contentDepth.ts`) and
 * emits `noindex` when it is. The sitemap shard produced by the
 * `generate-sitemap` edge function does not know about that gate, so it was
 * listing every combination — telling Google to crawl thousands of pages we
 * simultaneously ask it not to index. This script applies the same depth rule
 * at build time and rewrites `public/sitemaps/state-guides.xml` with only the
 * indexable URLs.
 *
 * Run: node scripts/prune-thin-sitemap-urls.mjs  (wired to `prebuild`)
 */
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from "node:fs";
import { resolve, join } from "node:path";
import { tmpdir } from "node:os";
import { build } from "esbuild";

const SHARD = resolve("public/sitemaps/state-guides.xml");
if (!existsSync(SHARD)) {
  console.warn("  state-guides.xml missing — nothing to prune");
  process.exit(0);
}

// Bundle the data modules (they use the `@/` alias and TS syntax) into a
// plain ESM file we can import from node.
const dir = mkdtempSync(join(tmpdir(), "sitemap-prune-"));
const entry = join(dir, "entry.ts");
const outfile = join(dir, "bundle.mjs");

writeFileSync(
  entry,
  `export { getAllStateVariantPaths, getStateVariant } from "@/data/stateVariants";
export { getNearMissDepth, nearMissDepthText } from "@/data/nearMissDepth";
export { isThinFanoutPage } from "@/lib/contentDepth";
`,
);

await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: "esm",
  platform: "node",
  logLevel: "silent",
  alias: { "@": resolve("src") },
});

const {
  getAllStateVariantPaths,
  getStateVariant,
  getNearMissDepth,
  nearMissDepthText,
  isThinFanoutPage,
} = await import(`file://${outfile}`);

// Same threshold the page component uses.
const STATE_GUIDE_MIN_CHARS = 1800;

const indexable = new Set();
let thin = 0;
for (const { pillar, state, slug } of getAllStateVariantPaths()) {
  const variant = getStateVariant(pillar, state, slug);
  if (!variant) continue;
  const { article } = variant;
  const isThin = isThinFanoutPage(
    [
      article.content.replace(/<[^>]+>/g, " "),
      ...article.faqs.map((f) => `${f.question} ${f.answer}`),
      nearMissDepthText(getNearMissDepth(pillar, state, slug)),
    ],
    STATE_GUIDE_MIN_CHARS,
  );
  if (isThin) thin++;
  else indexable.add(`/${pillar}/${state}/${slug}`);
}

const xml = readFileSync(SHARD, "utf8");
const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
const kept = blocks.filter((b) => {
  const loc = b.match(/<loc>([^<]+)<\/loc>/);
  if (!loc) return false;
  try {
    return indexable.has(new URL(loc[1]).pathname.replace(/\/$/, ""));
  } catch {
    return false;
  }
});

const out = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...kept,
  "</urlset>",
].join("\n");

writeFileSync(SHARD, `${out}\n`);
console.log(
  `  state-guides.xml pruned — ${kept.length} indexable urls kept, ${blocks.length - kept.length} noindexed urls dropped (${thin} thin variants)`,
);
