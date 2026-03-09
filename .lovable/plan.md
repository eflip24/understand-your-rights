

# SEO Audit & Fix: Titles, Meta Descriptions, and Sitemap

## Current Status

| Page Type | SEO Title | Meta Description | OG/Canonical | In Sitemap |
|-----------|-----------|-----------------|--------------|------------|
| Tool pages | ✅ via `Head` | ✅ | ✅ | ❌ |
| Category pages | ✅ via `Head` | ✅ | ✅ | ❌ |
| Legal Term pages | ⚠️ `document.title` only | ⚠️ manual, no OG | ❌ | ❌ |
| Legal Clause pages | ⚠️ `document.title` only | ⚠️ manual, no OG | ❌ | ❌ |
| Contract Type pages | ⚠️ `document.title` only | ⚠️ manual, no OG | ❌ | ❌ |
| LegalTermsDirectory | ⚠️ `document.title` only | ❌ missing | ❌ | ✅ |
| LegalClausesDirectory | ⚠️ `document.title` only | ❌ missing | ❌ | ✅ |
| ContractTypesDirectory | ⚠️ `document.title` only | ❌ missing | ❌ | ✅ |

**Three problems to fix:**
1. Directory pages missing meta descriptions, canonical URLs, and OG tags
2. `ContentPageLayout` uses manual DOM manipulation instead of the `Head` component — missing canonical, OG tags, twitter cards
3. Sitemap only has 6 static URLs + blog posts — missing all individual tool, term, clause, and contract type pages

## Changes

### 1. Fix `ContentPageLayout` — use `Head` component
Replace the manual `document.title` / `meta` manipulation with the existing `Head` component so all content pages get canonical URLs, OG tags, and twitter cards automatically.

### 2. Fix 3 directory pages — add `Head` component
- **LegalTermsDirectory**: Replace `useEffect` title with `<Head>` including description
- **LegalClausesDirectory**: Same
- **ContractTypesDirectory**: Same

### 3. Expand sitemap edge function
Add all individual pages by importing tool/term/clause/contract data as hardcoded URL arrays in the edge function:
- ~75 tool pages (`/tools/{category}/{slug}`)
- 9 category pages (`/tools/{category}`)
- All legal term pages (`/legal-terms/{slug}`)
- All legal clause pages (`/legal-clauses/{slug}`)
- All contract type pages (`/contract-types/{slug}`)

Since the edge function can't import frontend data files, we'll build the URLs from the data files and embed them as static arrays, or better: fetch slugs from the data files at build time. The pragmatic approach is to hardcode the known slugs in the edge function (they're static data, not DB-driven).

**Alternative (cleaner):** Move the slug lists into a shared config, or generate the tool/term/clause URLs dynamically in the edge function by reading from the data. Since these are all static frontend data arrays, the simplest approach is to enumerate them directly in the sitemap function.

### Files to edit
- `src/components/layout/ContentPageLayout.tsx` — replace manual meta with `Head`
- `src/pages/LegalTermsDirectory.tsx` — add `Head`
- `src/pages/LegalClausesDirectory.tsx` — add `Head`
- `src/pages/ContractTypesDirectory.tsx` — add `Head`
- `supabase/functions/generate-sitemap/index.ts` — add all page URLs

