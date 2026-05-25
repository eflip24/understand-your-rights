#!/usr/bin/env node
/**
 * Axe-core accessibility audit (Phase B5.5).
 *
 * Crawls a representative sample of routes against a running preview/prod
 * URL and writes violations to .lovable/axe-baseline.json.
 *
 * Usage:
 *   BASE_URL=https://legallyspoken.com node scripts/axe-audit.mjs
 *   BASE_URL=http://localhost:8080 node scripts/axe-audit.mjs
 *
 * Requires devDependencies: puppeteer, @axe-core/puppeteer
 *   npm i -D puppeteer @axe-core/puppeteer
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:8080";

const ROUTES = [
  "/",
  "/tools",
  "/legal-health-check",
  "/blog",
  "/lawyer-near-me",
  "/lawyer-eu",
  "/lawyer-eu/germany",
  "/lawyer-eu/germany/employment",
  "/lawyer-eu/germany/employment/berlin",
  "/de/lawyer-eu/deutschland",
  "/de/impressum",
  "/fr/mentions-legales",
  "/es/aviso-legal",
  "/it/note-legali",
  "/pt/informacao-legal",
  "/legal-notice",
  "/privacy-policy",
  "/terms-of-service",
];

async function main() {
  const [{ default: puppeteer }, { AxePuppeteer }] = await Promise.all([
    import("puppeteer"),
    import("@axe-core/puppeteer"),
  ]);

  const browser = await puppeteer.launch({ headless: "new" });
  const results = [];

  for (const route of ROUTES) {
    const url = BASE + route;
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      const report = await new AxePuppeteer(page)
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const counts = report.violations.reduce(
        (acc, v) => {
          acc[v.impact || "minor"] = (acc[v.impact || "minor"] || 0) + 1;
          return acc;
        },
        { critical: 0, serious: 0, moderate: 0, minor: 0 },
      );
      console.log(
        `${route}  critical=${counts.critical} serious=${counts.serious} moderate=${counts.moderate} minor=${counts.minor}`,
      );
      results.push({
        url,
        counts,
        violations: report.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.length,
          target: v.nodes[0]?.target,
        })),
      });
    } catch (e) {
      console.error(`FAIL ${url}:`, e.message);
      results.push({ url, error: e.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const out = ".lovable/axe-baseline.json";
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE, results }, null, 2));
  console.log(`\nWrote ${out}`);

  const totals = results.reduce(
    (acc, r) => {
      if (!r.counts) return acc;
      acc.critical += r.counts.critical;
      acc.serious += r.counts.serious;
      return acc;
    },
    { critical: 0, serious: 0 },
  );
  console.log(`Totals — critical: ${totals.critical}, serious: ${totals.serious}`);
  if (totals.critical > 0 || totals.serious > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
