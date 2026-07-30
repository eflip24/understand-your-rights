#!/usr/bin/env node
/**
 * Builds supabase/functions/translate-guides-cron/source.json — the
 * translatable slice of every Phase-8 pillar guide.
 *
 * Run with:  npx tsx scripts/_build-guides-edge-source.mjs
 * (or `bun scripts/_build-guides-edge-source.mjs`, since bun reads TS directly)
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { phase8Pillars } from "../src/data/phase8Pillars.ts";

const guides = phase8Pillars.map((p) => ({
  slug: p.slug,
  h1: p.h1,
  metaTitle: p.metaTitle,
  metaDescription: p.metaDescription,
  tagline: p.tagline,
  intro: p.intro,
  entityBlock: { category: p.entityBlock.category, intro: p.entityBlock.intro },
  keyFacts: p.keyFacts.map((f) => ({ label: f.label, value: f.value })),
  sections: p.sections.map((s) => ({
    heading: s.heading,
    paragraphs: s.paragraphs ?? [],
    bullets: s.bullets ?? [],
  })),
  howTo: p.howTo.map((s) => ({ name: s.name, text: s.text })),
  faqs: p.faqs.map((f) => ({ question: f.question, answer: f.answer })),
  primaryCta: { label: p.primaryCta.label, description: p.primaryCta.description },
  lawyerCta: { label: p.lawyerCta.label, description: p.lawyerCta.description },
  related: p.related.map((r) => ({ label: r.label, blurb: r.blurb ?? "" })),
}));

const out = resolve("supabase/functions/translate-guides-cron");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "source.json"), JSON.stringify({ guides }, null, 0) + "\n");
console.log(`wrote ${guides.length} guides to ${out}/source.json`);
