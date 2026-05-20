## Finish Phase A6 — translation wiring + sitemap hreflang cleanup

Two leftovers from Phase A6: (1) make `ContractTypePage`, `LegalClausePage`, and their two directory pages actually *consume* the AI-translated `contracts.json` / `clauses.json` values, and (2) stop the sitemap from advertising localized alternates for English-only (Tier-3) routes.

### 1. Translation wiring (contracts + clauses)

Pattern: keep the existing English data in `src/data/*` as the source of truth (slugs, categories, FAQs, structural fields), and use `t()` with `defaultValue` to overlay translated `name` / `summary` / `description` / `explanation` per locale, falling back to English when a key is missing.

**`ContractTypePage.tsx`**
- Add `useTranslation("contracts")`.
- Resolve `title = t(`${slug}.name`, { defaultValue: contractType.title })`.
- Resolve `description = t(`${slug}.description`, { defaultValue: contractType.description })` (long form) and `summary = t(`${slug}.summary`, { defaultValue: contractType.description.slice(0, 155) })`.
- Use `title` / `description` in the `<h2>Overview</h2>` body, breadcrumbs, `ContentPageLayout` `title`, `metaTitle`, `metaDescription`, and `articleSchema(...)`.
- Heading "Key Clauses Typically Found" / "Common Risks" → move strings into `common.json` under `contractTypePage.*` and translate the 6 locales (short labels only; risk items stay English data).

**`LegalClausePage.tsx`**
- Add `useTranslation("clauses")`.
- Resolve `title = t(`${slug}.name`, { defaultValue: clause.title })` and `explanation = t(`${slug}.explanation`, { defaultValue: clause.explanation })`.
- Wire into `ContentPageLayout`, breadcrumbs, JSON-LD, "What is a {title}?" heading, body paragraph, `metaTitle`, `metaDescription`.
- Section headings ("Example Clause Language", "Red Flags to Watch For", "Enforceability Notes") → `common.json` under `legalClausePage.*`, 6 locales.

**`ContractTypesDirectory.tsx`**
- Add `useTranslation(["contracts","common"])`.
- In the `filtered` `useMemo`, replace `ct.title` / `ct.description` reads with `t(`${ct.slug}.name`, { defaultValue: ct.title })` etc., so search matches the visible (translated) values.
- Card `<h3>` shows translated `name`; `<p>` shows translated `summary` (falls back to `description`).
- Page `<h1>`, intro text, "All", search placeholder, "X key clauses • Y risks", empty-state copy → `common.json` `contractTypesDirectory.*`.

**`LegalClausesDirectory.tsx`** — mirror of the above using `clauses` namespace and `legalClausesDirectory.*` in `common.json`.

**Locale JSON additions (6 files × ~10 keys):** add `contractTypePage`, `legalClausePage`, `contractTypesDirectory`, `legalClausesDirectory` sub-objects to each `common.json`. The bulk-translated item bodies are already present in `contracts.json` / `clauses.json` from the previous phase, so no new translation calls are required.

### 2. Sitemap: drop hreflang alternates for Tier-3 routes

In `supabase/functions/generate-sitemap/index.ts`:

- **Remove `/lawyer-near-me` from `corePaths`** (line 207). Lawyer directory is Tier-3 — it's already emitted with `u()` (no alternates) by `buildCore` and `buildLawyers`.
- **Delete the `buildLawyersI18n` shard entirely** (lines 237–242). Area-level lawyer pages are Tier-3; the English versions are already covered by `buildLawyers`.
- **Remove `"lawyers-i18n"` from the `sitemapIndex()` `types` array** (line 192) so the index stops pointing at a now-empty shard.
- Leave `buildBlog`, `buildStateGuides`, `buildStatutes`, `buildLawyers` untouched — they already use `u()` and emit only English URLs without `<xhtml:link>` alternates, which is the desired Tier-3 behavior.

Net effect: only Tier-1 (`core-i18n`) and Tier-2 (`tools-i18n`, `legal-terms-i18n`, `guides-i18n`) shards carry hreflang alternates. Tier-3 URLs appear once, English-only.

### Acceptance criteria

- `/fr/contract-types/nda` renders the French `name` + `summary` from `fr/contracts.json` in the title bar, breadcrumb, `<h2>Overview</h2>` body, and `<meta description>`; English used only when a key is missing.
- `/de/legal-clauses/non-compete-clause` shows German `name` + `explanation` similarly.
- `/es/contract-types` directory cards display Spanish titles/descriptions; search matches against Spanish text.
- `curl …/generate-sitemap?type=core-i18n` no longer contains `<loc>…/lawyer-near-me</loc>` with `<xhtml:link>` alternates.
- `curl …/generate-sitemap` (index) no longer references `lawyers-i18n`.
- `curl …/generate-sitemap?type=lawyers` still lists `/lawyer-near-me/{area}` as a single English URL with no hreflang alternates.

### Files touched

- **Edit:** `src/pages/ContractTypePage.tsx`, `src/pages/LegalClausePage.tsx`, `src/pages/ContractTypesDirectory.tsx`, `src/pages/LegalClausesDirectory.tsx`, all six `src/i18n/locales/{en,es,fr,de,it,pt}/common.json`, `supabase/functions/generate-sitemap/index.ts`, `.lovable/plan.md`.
- **No new files.** No new AI translation calls (item-level translations already exist from Phase A6).