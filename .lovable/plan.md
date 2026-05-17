# Phase A4 — Content Translation Strategy

Phase A3 finished UI chrome (navbar, footer, buttons). Phase A4 translates **page content** — tool descriptions, legal definitions, pillar/cluster copy, home hero, FAQs — into the 4 EU target languages (DE, FR, ES, IT), with English fallback for anything not yet translated. Portuguese stays opt-in (kept in locale list but not actively translated this phase).

## Strategy

### Tiered content translation

```text
Tier 1 — High-traffic, fully translate now (manual review)
  • Home hero, value props, "How it works"
  • Legal Health Check quiz (questions + results)
  • Top 20 tools (titles, descriptions, instructions)
  • Top 10 legal terms (most-searched)
  • Pillar landing pages (3–5)
  • About, Disclaimer, Privacy summary

Tier 2 — Long-tail, AI-translated with English fallback
  • Remaining ~80 tools (metadata only: title, slug, short blurb)
  • Remaining legal terms
  • Cluster articles
  • Contract types directory
  • Statute snippets

Tier 3 — Stay English for now
  • Blog posts (WP-sourced, retranslating breaks editorial flow)
  • State-level US guides (US-only audience)
  • Lawyer directory listings (US-only data)
```

English fallback: when a key is missing in the target locale, i18next already returns the EN value. No 404s, no empty strings.

### Translation source

- **Pure AI** (per Phase A1 decision): single Supabase Edge Function `translate-content` calls Lovable AI Gateway with `google/gemini-2.5-pro` for Tier 1 (higher fidelity) and `google/gemini-2.5-flash` for Tier 2 (cheaper bulk).
- Prompt enforces: keep legal terms-of-art untranslated when no equivalent exists, preserve markdown, never invent jurisdictions, append `[AI-translated]` marker in JSON metadata (not visible to users).
- Output written to JSON files in `src/i18n/locales/{lang}/{namespace}.json`. Committed to repo — no runtime translation, no per-request cost.

### New i18n namespaces

```text
src/i18n/locales/{en,es,fr,de,it}/
  common.json       (exists — chrome)
  seo.json          (exists — meta)
  home.json         (NEW — hero, sections)
  tools.json        (NEW — tool titles + descriptions, keyed by slug)
  terms.json        (NEW — legal term definitions, keyed by slug)
  pillars.json      (NEW — pillar page copy, keyed by slug)
  quiz.json         (NEW — health check questions + results)
  legal.json        (NEW — disclaimer, privacy summary, about)
```

## Files to change

### Translation tooling (one-time)

- **`supabase/functions/translate-content/index.ts`** (NEW)
  - POST `{ sourceNamespace, targetLocales, mode: "tier1" | "tier2" }`.
  - Reads `src/i18n/locales/en/{namespace}.json` (passed in body — function is stateless).
  - Streams Lovable AI, returns translated JSON per locale.
  - Admin-only: `verify_jwt` enforced + `has_role(uid, 'admin')` check.

- **`scripts/translate-namespace.ts`** (NEW, run locally/CI)
  - Calls the edge function for each EN namespace × each target locale.
  - Writes results to `src/i18n/locales/{lang}/{ns}.json`.
  - Diff-aware: skips keys already translated unless `--force`.

### Frontend wiring

- **`src/i18n/config.ts`** — register new namespaces (`home`, `tools`, `terms`, `pillars`, `quiz`, `legal`).
- **`src/pages/HomePage.tsx`** + `src/components/home/*` — replace hardcoded copy with `t("home:...")` keys.
- **`src/pages/ToolPage.tsx`** + `src/data/tools.ts` consumers — look up `t(\`tools:${slug}.title\`, { defaultValue: tool.title })` so missing translations fall back to source data.
- **`src/pages/LegalTermPage.tsx`** + `LegalTermsDirectory.tsx` — same pattern with `terms:` namespace.
- **`src/pages/PillarPage.tsx`** — `pillars:` namespace.
- **`src/components/quiz/LegalHealthCheckQuiz.tsx`** + `quizData.ts` — `quiz:` namespace.
- **`src/pages/AboutPage.tsx`**, **`DisclaimerPage.tsx`**, **`PrivacyPolicyPage.tsx`** — `legal:` namespace.

### SEO follow-through

- **`src/i18n/locales/{lang}/seo.json`** — extend with per-tool and per-term title/description keys for Tier 1 entries (auto-generated from translated content).
- **Sitemap** already emits i18n shards (Phase A2). No change needed.

## Technical notes

```ts
// Fallback pattern used everywhere content is rendered
const { t } = useTranslation(["tools"]);
const title = t(`tools:${tool.slug}.title`, { defaultValue: tool.title });
const description = t(`tools:${tool.slug}.description`, { defaultValue: tool.description });
```

```ts
// Edge function translation prompt (core)
const SYSTEM = `You are a legal-domain translator. Translate the provided JSON
values from English to ${targetLang}. Rules:
- Preserve all JSON keys exactly.
- Preserve markdown, placeholders ({{var}}), and HTML.
- Keep US-specific legal terms-of-art (e.g. "1099", "EEOC") in English when no
  local equivalent exists; add a parenthetical gloss on first use.
- Never invent statutes, agencies, or case law for the target jurisdiction.
- Output valid JSON only.`;
```

```text
Rollout order (each step shippable independently)
  1. Edge function + script + EN source extraction → translate common namespaces
  2. Home + quiz (highest visible impact)
  3. Tier 1 tools (top 20) + Tier 1 terms (top 10)
  4. Pillar pages
  5. Tier 2 bulk translation (tools/terms metadata)
  6. Legal pages (about/disclaimer/privacy)
```

## Out of scope

- Translating blog posts, state guides, lawyer listings (Tier 3).
- Human QA pass — per user direction "pure AI". A `[NEEDS REVIEW]` marker can be added later if desired.
- Portuguese active translation (stays scaffolded only).
- EU lawyer directory (Track B).
- Cookie banner / CMP (deferred per user).

## Acceptance

- `/es/`, `/fr/`, `/de/`, `/it/` home page renders translated hero + sections.
- `/de/tools/word-counter` shows German title + description; missing keys silently fall back to English.
- Quiz on `/fr/legal-health-check` renders in French end-to-end.
- No console warnings about missing i18n keys in target locales (fallbacks suppress them).
- Bundle size impact < 100 KB gzipped (JSON namespaces are code-split per locale).
