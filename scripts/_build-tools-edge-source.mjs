#!/usr/bin/env node
/**
 * Builds the edge-function snapshot of source tool data so the cron
 * worker can translate without needing repo access. Mirrors
 * scripts/_build-edge-source for region intros.
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

execSync("node scripts/_extract-tools.mjs", { stdio: "inherit" });
const src = JSON.parse(readFileSync("/tmp/tools-source.json", "utf8"));
const out = {
  categories: src.categories.map((c) => ({ id: c.id, label: c.label, description: c.description })),
  tools: src.tools.map((t) => ({
    id: t.id,
    category: t.category,
    name: t.name,
    description: t.description,
    shortDescription: t.shortDescription,
    faqs: t.faqs,
  })),
};
mkdirSync("supabase/functions/translate-tools-cron", { recursive: true });
writeFileSync(
  "supabase/functions/translate-tools-cron/source.json",
  JSON.stringify(out, null, 2),
);
console.log(`wrote source.json: ${out.tools.length} tools, ${out.categories.length} categories`);
