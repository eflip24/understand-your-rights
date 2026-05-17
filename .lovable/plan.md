# Phase A4 — Content Translation (Completed)

## What shipped

Translated **page content** into 4 EU languages (ES, FR, DE, IT) with English fallback for anything not yet translated. Portuguese kept in locale list (scaffold only).

### New i18n namespaces

```text
src/i18n/locales/{en,es,fr,de,pt,it}/
  common.json    (chrome — extended with `page` block: tools, FAQ, related, etc.)
  seo.json       (per-route meta)
  home.json      NEW — hero, stats, categories, guides, blog, CTA, meta
  quiz.json      NEW — questions, options, results screen, navigation
  legal.json     NEW — disclaimer copy (reusable)
  tools.json     NEW — per-tool name/description/shortDescription, keyed by id (empty for now; EN-fallback)
  terms.json     NEW — per-term term/definition/explanation/exampleClause, keyed by slug (empty for now; EN-fallback)
```

### Translation pipeline

- One-off Python script (`/tmp/translate_ns.py`) calls Lovable AI Gateway via the `ai-gateway` skill with `google/gemini-2.5-flash`.
- System prompt enforces: preserve JSON keys, preserve `{{var}}` placeholders, keep US-specific legal terms-of-art untranslated, never invent statutes.
- Output committed to repo. No runtime translation cost.

### Frontend wiring

- **`src/i18n/config.ts`** — registered new namespaces.
- **`src/components/home/HeroBanner.tsx`** — fully translated.
- **`src/pages/HomePage.tsx`** — stats, categories, guides, blog, CTA, meta all translated.
- **`src/components/quiz/LegalHealthCheckQuiz.tsx`** — questions, options, results, nav all translated.
- **`src/components/layout/ToolPageLayout.tsx`** — uses `t(\`tools:${tool.id}.name\`, { defaultValue: tool.name })` fallback pattern; missing translations silently render English.
- **`src/pages/LegalTermPage.tsx`** — same fallback pattern for `terms:` namespace.

### Fallback strategy

```ts
const localizedName = t(`tools:${tool.id}.name`, { defaultValue: tool.name });
```

When a tool/term key isn't present in the locale JSON, i18next returns the source-data English value. No 404s, no empty strings, no warnings.

## Out of scope (deferred)

- Bulk per-tool / per-term translation of `tools.json` / `terms.json`. Infrastructure is in place; future runs of the translation script can populate these incrementally from `src/data/tools.ts` and `src/data/legalTermPages.ts`.
- Blog posts (WP-sourced, English).
- State-level US guides (US-only audience).
- Lawyer directory listings (US-only data — Track B handles EU directory).
- Human QA pass (pure AI per user direction).
- Portuguese active translation.

## Acceptance

- `/es/`, `/fr/`, `/de/`, `/it/` home renders translated hero, stats, categories, guides, blog, CTA.
- `/fr/legal-health-check` quiz renders in French end-to-end.
- `/de/tools/contract/word-counter` chrome (breadcrumb, FAQ heading, "Related Tools") renders German; tool name/description fall back to English (until tools.json populated).
- Bundle: all locale JSON inlined via static imports; impact ~50 KB total.

## Next phase

- **Phase A5** (optional): bulk-populate `tools.json` and `terms.json` for top-traffic tools/terms.
- **Track B**: EU lawyer directory.
