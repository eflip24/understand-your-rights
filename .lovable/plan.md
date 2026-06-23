# Multilingual Audit — What's broken and what to fix

## Diagnosis

The locale-switcher and the route table are both correct: `/es`, `/fr`, `/de`, `/pt`, `/it` already mount every route the English site has. The reason you keep "falling back to English" is downstream:

1. **~50 `<Link to="…">` / `<Navigate to="…">` calls across 19 files hardcode bare paths** (`/tools/…`, `/blog/…`, `/legal-terms/…`, `/lawyer-near-me/…`, `/laws/…`, pillar pages). Clicking any of them strips the `/es` (or other) prefix and re-renders in English. Only 6 files currently use the `useLocalizedPath()` helper.
2. **All 113 tool components** under `src/components/tools/*` have hardcoded English labels (no `useTranslation`). Even when the URL keeps the locale, the tool body still reads English.
3. **Two shared layouts** (`ContentPageLayout`, `PopularToolsSection`) and several full pages (`AboutPage`, `DisclaimerPage`, `PrivacyPolicyPage`, blog pages, lawyer directory pages, pillar pages, statute pages) have hardcoded English headings, buttons, breadcrumbs, and disclaimers.

Routing, the language switcher, and `useLocalizedPath` itself are fine — they don't need to change.

## Scope decision

This is a big surface. I'll split it into three workstreams and ship them in order so the user-visible "drops back to English" symptom disappears first, then content gaps close.

---

## Workstream 1 — Stop dropping locale on clicks (highest impact, do first)

Convert every internal `<Link to=…>` and `<Navigate to=…>` to go through `useLocalizedPath()` (or its sibling `localizedPath()` helper for static arrays).

**Files to edit (link rewrites only — no copy changes):**

- `src/components/layout/ContentPageLayout.tsx` (3 links — shared by every term/clause page)
- `src/components/home/PopularToolsSection.tsx` (2 links)
- `src/pages/BlogPage.tsx`, `BlogCategoryPage.tsx`, `BlogPostPage.tsx` (10 links)
- `src/pages/CategoryPage.tsx`, `ToolsDirectory.tsx` (2 links)
- `src/pages/ClusterArticlePage.tsx`, `StateClusterArticlePage.tsx` (4 links)
- `src/pages/ContractTypePage.tsx`, `ContractTypesDirectory.tsx` (2 links)
- `src/pages/LegalTermsDirectory.tsx`, `LegalClausesDirectory.tsx` (2 links)
- `src/pages/LocalLawyersDirectory.tsx`, `LocalLawyersAreaPage.tsx`, `LocalLawyersStatePage.tsx`, `LocalLawyersCityPage.tsx` (11 links + `<Navigate>` fallbacks)
- `src/pages/PillarPage.tsx` (PILLAR_PAGES array + tool link)
- `src/pages/StatuteLibraryDirectory.tsx`, `StatutePage.tsx` (7 links + `<Navigate>` fallback)
- `src/pages/AboutPage.tsx`, `DashboardPage.tsx` (3 links)

**Sanity check after this workstream:** click any tool / blog post / term / lawyer page in `/es`, `/fr`, `/de`, `/pt`, `/it` and confirm the URL keeps its prefix and all in-page links keep it too. This alone fixes the symptom you reported.

---

## Workstream 2 — Translate shared layouts + top-traffic page chrome

The page *chrome* (headings, buttons, breadcrumbs, disclaimers) is what users notice. Wire `useTranslation` into:

- `src/components/layout/ContentPageLayout.tsx` — "Related Terms", "Related Clauses", "Related Tools"
- `src/components/home/PopularToolsSection.tsx` — "View All Tools", section title
- `src/pages/BlogPage.tsx`, `BlogPostPage.tsx`, `BlogCategoryPage.tsx` — "Back to Blog", "More Articles", "Related Tools", "Post not found"
- `src/pages/LocalLawyers*.tsx` (4 files) — "Find a Lawyer Near You", "Attorney Directory", "Disclaimer:" banner, breadcrumb labels
- `src/pages/PillarPage.tsx` — "In This Guide", "Popular Tools", "Related Guides", "Read the complete guide", "Disclaimer:"
- `src/pages/StatuteLibraryDirectory.tsx`, `StatutePage.tsx` — "Statute Library", "All 50 States", "View all", "Disclaimer:"
- `src/pages/ToolsDirectory.tsx`, `CategoryPage.tsx` — directory heading/intro labels
- `src/pages/ClusterArticlePage.tsx`, `StateClusterArticlePage.tsx` — section headings, disclaimer
- `src/pages/AboutPage.tsx`, `DisclaimerPage.tsx`, `PrivacyPolicyPage.tsx`, `LegalHealthCheckPage.tsx` — body copy (full-page translation, biggest line count)

New i18n keys land in the appropriate existing namespaces (`common`, `home`, `legal`, `tools`, `quiz`, `terms`, `contracts`, `clauses`) plus a small new `directory` namespace for lawyer/statute pages. Keys are added to all 6 locale JSONs in the same edit; ES/FR/DE/PT/IT are filled via the existing `scripts/translate-pt-ui.mjs`-style AI translation pipeline (extended to run all 5 target locales in one pass).

---

## Workstream 3 — Translate the 113 tool component bodies

This is the largest chunk of remaining English. Strategy:

1. Introduce a per-tool i18n namespace convention: `tools.<toolId>.ui.<key>` for in-component strings (input labels, result labels, button text, FAQ titles inside the tool, disclaimer footer). The existing `tools` namespace already carries `name`/`description`/`shortDescription`/`faqs`, so we extend the same files.
2. Build a one-time codemod script (`scripts/extract-tool-ui-strings.mjs`) that walks `src/components/tools/*.tsx`, extracts string literals from JSX text, JSX attributes (`label`, `placeholder`, `aria-label`, `title`), and known label props, writes them to `src/i18n/locales/en/tools.json` under `<toolId>.ui.*`, and rewrites the component to call `t("tools:<toolId>.ui.<key>")`.
3. Run the existing translation pipeline (`scripts/translate-tools.mjs`, already wired through Lovable AI Gateway + Gemini free-tier fallback) over the new `ui` subtree for ES/FR/DE/PT/IT.
4. Manual review of 5–10 sample tools per locale before committing — codemods on JSX are imperfect; some strings (state names, regulatory codes like "AB 1482") should stay English and get a `// i18n-keep` marker.

This workstream is large enough that I'd recommend doing it in two batches: top-30 most-trafficked tools first (so the symptom mostly disappears for popular flows), then the long tail.

---

## Execution order and milestones

```text
Milestone A  — Workstream 1 only            (link locale-drop fixed end-to-end)
Milestone B  — Workstream 2                 (shared chrome + page bodies translated)
Milestone C1 — Workstream 3 top 30 tools    (popular tool bodies translated)
Milestone C2 — Workstream 3 remaining 83    (full tool coverage)
```

Each milestone is independently shippable and independently testable in `/es`, `/fr`, `/de`, `/pt`, `/it`.

## Out of scope

- LangSwitcher behavior (already correct).
- Route table (already symmetric across locales).
- Sitemap hreflang (audited and fixed in a prior pass).
- Blog post *content* translation (Phase C of the earlier roadmap — not part of this audit).
- State/city guide *content* translation (Phase D).
- Legal terms/clauses/statutes *content* translation (Phase B).

## Confirm before I start

Shall I proceed Milestone A → B → C1 → C2 in that order, or do you want a different ordering (e.g. C1 before B because tool bodies bother you more than page chrome)?
