
# Multilingual completion plan

Three workstreams. The first is fast, the second is verification, the third is the heavy lift and needs phasing to control AI credit spend.

---

## 1. Portuguese UI — fill the 7 empty namespace files

Today PT has 7 of 10 namespace JSON files as `{}` (3 bytes each), so Portuguese visitors see English fallbacks for almost every label, button, tool name, etc.

**Files to populate (matched 1:1 with the English source):**
- `src/i18n/locales/pt/clauses.json`
- `src/i18n/locales/pt/contracts.json`
- `src/i18n/locales/pt/home.json`
- `src/i18n/locales/pt/legal.json`
- `src/i18n/locales/pt/quiz.json`
- `src/i18n/locales/pt/terms.json`
- `src/i18n/locales/pt/tools.json`

**Method:** reuse the existing `scripts/_aiTranslate.mjs` helper (already used for ES/FR/DE/IT) via the Lovable AI Gateway with `google/gemini-3-flash-preview`. For each empty PT namespace, load the EN JSON, translate every leaf string, preserve keys/placeholders (`{{var}}`), write back to `pt/`. Run once, commit results.

**Validation:** automated diff — every PT file must have the same key structure as its EN counterpart; no missing/extra keys. Spot-check 3 random strings per namespace.

---

## 2. Sitemap hreflang — audit + minor fix pass

Current state (already in place — no rebuild needed):
- `Head.tsx` emits per-page `hreflang` + `x-default` + per-locale canonicals.
- `supabase/functions/generate-sitemap/index.ts` emits `<xhtml:link rel="alternate" hreflang="…">` per URL, including a dedicated `core-i18n` shard, and EU lawyer URLs use localized paths.

**What I'll check & fix:**
- Curl each shard URL and confirm `xhtml:link` tags render for every locale, including `x-default`.
- Confirm `og:locale:alternate` tags are present per page (smoke-test home + a tool page + an EU lawyer page via the live preview).
- Verify the `core-i18n` shard covers all static routes the SPA exposes (`/tools`, `/legal-terms`, `/contracts`, `/clauses`, `/blog`, `/health-check`, etc.). Add any missing paths.
- Fix any locale-prefix double-slash or trailing-slash inconsistencies between `Head.tsx` and the sitemap (must match exactly or Google ignores the alternates).

**No new infra** — this is verify, patch small gaps.

---

## 3. Data-driven content translation (tools, terms, clauses, statutes, blog)

This is the largest piece. Today, even when a user visits `/es/tools/contract-analyzer`, the chrome is Spanish but the tool definition (name, description, fields, output labels) is English because it lives in `src/data/*.ts`.

### Scope (volumes)

| Source | Items | Where |
|---|---|---|
| Tools | ~100 | `src/data/tools.ts` (1.8k lines) |
| Legal terms | ~120 entries | `src/data/legalTerms.ts` |
| Legal clauses | ~80 entries | `src/data/legalClauses.ts` |
| Statutes | ~50 entries | `src/data/statutes.ts` |
| Blog posts | 48 published | `blog_posts` table |
| State/city guides | static data | `src/data/locations/*` |

Multiplied by 5 target locales (ES, FR, DE, PT, IT) → roughly **2,000+ translation units**. This is real AI credit spend; we phase it.

### Architecture (one approach — confirm before I implement)

**For static `src/data/*.ts` entries:**
- Add a sibling `src/data/i18n/<locale>/<source>.ts` per locale containing only the translated text fields (slug stays canonical English so URLs and routing don't fork).
- Each data-consuming component reads via a `useLocalizedEntry(entry)` hook that merges the English base with the active-locale overlay; missing locale = English fallback with a small banner ("This page is shown in English — translation in progress").
- Translation is generated offline by a new `scripts/translateData.mjs` that mirrors `_aiTranslate.mjs`: per locale, per source file, leaf-string translation with key preservation, written to `src/data/i18n/<locale>/`. Re-runnable; skips already-translated keys.

**For `blog_posts` (DB):**
- New table `blog_post_translations` (`post_id`, `locale`, `title`, `excerpt`, `content_html`, `created_at`) with RLS mirroring `blog_posts`.
- `useBlogPosts` resolves to the locale row when present, English row otherwise.
- One-shot script: for each post × locale, translate `title` + `excerpt` + `content_html` via the AI Gateway and insert. Re-runnable per (post_id, locale) idempotency key.
- Admin blog editor gets a tab per locale so future edits can override AI output.

### Phasing (credit-aware)

I'll execute in this order, pausing after each phase so you can review quality before approving the next:

1. **Phase A** — Tools only (highest user value). 100 entries × 5 locales.
2. **Phase B** — Legal terms + clauses + statutes. ~250 entries × 5 locales.
3. **Phase C** — Blog posts (DB-backed). 48 posts × 5 locales.
4. **Phase D** — State/city guide static data (large, lowest priority).

### Out of scope (this plan)
- Translating lawyer listings (geographic data, mostly proper nouns).
- Translating dynamically AI-generated content at request time (already locale-aware via prompt language).
- SSR for social-preview crawlers (existing client-side Helmet limit; called out in `head-meta` knowledge).

---

## Execution order I'll follow once you approve

1. Workstream 1 (PT UI) — one shot, ~1 turn.
2. Workstream 2 (sitemap audit) — one shot, ~1 turn.
3. Workstream 3 Phase A (Tools) — schema/loader/hook + translation script + first run, ~2–3 turns. Stop for your review.
4. Phases B → D on your go-ahead.

## Technical details

- AI model: `google/gemini-3-flash-preview` via Lovable AI Gateway. JSON-mode output for structural safety.
- Translation script reuses `scripts/_aiTranslate.mjs` patterns; adds a manifest file per locale to make runs idempotent.
- Per-locale data overlays loaded with dynamic `import()` so non-active locales don't bloat the main bundle.
- `blog_post_translations` migration includes GRANTs (`SELECT` to anon, full to service_role/authenticated) and RLS policies matching `blog_posts`.
- No changes to routing, locale detection, or the existing `hreflang` machinery.
