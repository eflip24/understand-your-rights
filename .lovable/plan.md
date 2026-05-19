## Phase A6 — Tier 2/3 Rollout

Bulk-populate AI translations for the long-tail content namespaces scaffolded in Phase A4, and lock in Tier 3 (English-only) handling so nothing renders as broken/empty in non-English locales.

### Tier 2 — bulk AI translation (4 EU locales: ES, FR, DE, IT)

Translate the following from English source data into `src/i18n/locales/{es,fr,de,it}/<ns>.json`. Keys = English source slug/id.

| Namespace | Source | Items | Fields translated |
|---|---|---|---|
| `tools.json` | `src/data/tools.ts` | ~100 tools | `name`, `description`, `shortDescription` |
| `terms.json` | `src/data/legalTerms.ts` + `src/data/legalTermPages.ts` | ~80 terms | `term`, `definition`, `explanation`, `exampleClause` |
| `contracts.json` (NEW) | `src/data/contractTypes.ts` | ~25 contract types | `name`, `summary`, `whenToUse` |
| `clauses.json` (NEW) | `src/data/legalClauses.ts` | ~40 clauses | `name`, `plainEnglish`, `whenItMatters` |

**Pipeline**: One-off Python via the `ai-gateway` skill (`/tmp/lovable_ai.py`), model `google/gemini-3-flash-preview`, batched by namespace × locale (16 runs). System prompt enforces:
- preserve JSON keys exactly
- preserve `{{var}}` placeholders and inline HTML
- keep US-specific terms-of-art untranslated (e.g. "Miranda rights", "1099", "LLC")
- never invent statutes or citations
- output valid JSON only

Output committed straight to repo. No runtime cost.

### Tier 3 — English-only content (4 EU locales)

Content that stays English even on `/es/`, `/fr/`, `/de/`, `/it/` routes:
- Blog posts (WP-sourced)
- US state legal guides (`stateData.ts`, state cluster articles)
- Lawyer directory (city/state/area pages, listings)
- Statutes (`statutes.ts`) — US code only

**Wiring for Tier 3**:
1. **`<Head>` noindex on non-EN locales** for these route patterns so Google doesn't index thin/duplicate English content under `/es/blog/*` etc. Add `noindex` prop driven by `locale !== "en"` in:
   - `BlogPage`, `BlogPostPage`, `BlogCategoryPage`
   - `LocalLawyersDirectory`, `LocalLawyersStatePage`, `LocalLawyersCityPage`, `LocalLawyersAreaPage`
   - `StatePillarPage`, `StateClusterArticlePage`
   - `StatutePage`, `StatuteLibraryDirectory`
2. **Sitemap**: update `supabase/functions/generate-sitemap` so these Tier-3 routes only emit the `en` URL (drop hreflang alternates for them) — prevents Google from being told 4 alt languages exist when the content is English.
3. **Locale banner**: small dismissible callout at top of Tier-3 pages when `locale !== "en"`: "This guide is currently available in English only." Translated string lives in `common.json` → `page.englishOnlyNotice`.

### Wiring updates (consume new namespaces)

| Component | Change |
|---|---|
| `src/i18n/config.ts` | Register `contracts`, `clauses` namespaces |
| `ContractTypePage.tsx` | `t(\`contracts:${slug}.name\`, { defaultValue: ct.name })` pattern |
| `ContractTypesDirectory.tsx` | Same fallback for list items |
| `LegalClausePage.tsx` | `t(\`clauses:${slug}.name\`, { defaultValue: cl.name })` pattern |
| `LegalClausesDirectory.tsx` | Same |
| `ToolsDirectory.tsx` | Already wired via `tools:` namespace — verify list view uses `t()` |
| `LegalTermsDirectory.tsx` | Same for `terms:` namespace |

### QA pass

- Spot-check 5 random tools per locale on `/de/tools/contract/<slug>` etc.
- Verify Tier-3 pages render with English content + locale banner + `noindex` on `/fr/blog/*`, `/es/lawyer-near-me/*`.
- Confirm no missing-key console warnings.
- Confirm sitemap output for a Tier-3 URL has no `<xhtml:link>` alternates.

### Out of scope

- Human review of AI translations (per user: pure AI).
- Portuguese — locale stays scaffold-only.
- Translating blog posts, state guides, lawyer listings (Tier 3 by design).
- Cookie banner copy (deferred until all phases complete, per user).

### Acceptance

- `/de/tools/contract/word-counter` shows German `name` + `description`, no English fallback.
- `/fr/legal-terms/force-majeure` shows French `term` + `definition` + `explanation`.
- `/es/contract-types/nda` shows Spanish `name` + `summary`.
- `/fr/blog/*` returns English content with `<meta name="robots" content="noindex, nofollow">` and a dismissible banner.
- Sitemap `/sitemap.xml` for `/blog/*` URLs contains only the EN entry.

### Files to touch

- **Edit**: `src/i18n/config.ts`, `src/components/seo/Head.tsx` (no changes needed — already supports `noindex`), `ContractTypePage.tsx`, `ContractTypesDirectory.tsx`, `LegalClausePage.tsx`, `LegalClausesDirectory.tsx`, `BlogPage.tsx`, `BlogPostPage.tsx`, `BlogCategoryPage.tsx`, `LocalLawyers*.tsx` (4 files), `StateClusterArticlePage.tsx`, `PillarPage.tsx` (state variant), `StatutePage.tsx`, `StatuteLibraryDirectory.tsx`, all 6 `common.json` (add `page.englishOnlyNotice`), `supabase/functions/generate-sitemap/index.ts`
- **Create**: `src/i18n/locales/{en,es,fr,de,it,pt}/contracts.json` (en + pt empty scaffolds)
- **Create**: `src/i18n/locales/{en,es,fr,de,it,pt}/clauses.json` (en + pt empty scaffolds)
- **Populate via AI**: `tools.json`, `terms.json`, `contracts.json`, `clauses.json` for ES/FR/DE/IT (16 files)
- **Edit**: `.lovable/plan.md`
