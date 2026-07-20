# Tools Hub Redesign (/tools)

Mirror the successful Forms Hub redesign pattern on the Legal Tools directory, using the same navy/gold tokens so both hubs feel like one product.

## Problems with current page
- Flat, generic header with no hero, no trust, no search prominence.
- Category chips wrap awkwardly; no icons, no counts, no sticky behavior on scroll.
- No "by situation / by life event" entry point — users must know the category name.
- Cards are uniform but lack signals users actually scan for: time-to-use, popularity, "new", free badge, related form link.
- No popular / featured shortcuts above the fold.
- Search icon is orphaned to the left of the chip row.

## What we'll build

### 1. New `ToolsHero.tsx`
- Big H1 + one-line value prop ("Free legal calculators, generators & analyzers — no signup").
- Prominent centered search with icon inside; live filters cards as user types.
- Trust chips row: "70+ tools", "Always free", "No signup", "Attorney-reviewed content".
- Popular tool shortcut pills (6): Legal Jargon Translator, Contract Reading Time, NDA Generator, Non-Compete Checker, Late Fee Calculator, Alimony Calculator.

### 2. New `ToolsBySituationTiles.tsx`
"Find a tool by situation" — 6 large tiles with icon + label + count:
- Signing a contract
- Facing a fee, refund, or debt
- Starting or leaving a job
- Renting or buying property
- Family & divorce
- Running a small business

Each tile filters the grid below (writes to same `activeCategory`/tag state, scrolls to results).

### 3. New `ToolsCategoryTabs.tsx`
Replaces the current button row.
- Sticky on scroll (top-16, backdrop-blur, subtle border-bottom).
- Icon + label + live count per tab (All, Contract, Consumer, Employment, Document Generators, AI Analysis, Real Estate, Business, Finance & Trading, Green Energy & Solar, Family Law).
- Horizontal scroll on mobile, wraps on desktop.

### 4. Polished `ToolCard`
Update the inline card in `ToolsDirectory.tsx` (no new file needed):
- Larger icon tile with gold ring on hover.
- Category eyebrow + bold title + description.
- Meta row at bottom: "~2 min", "Free", optional "New" or "Popular" badge (from a small allowlist in `src/data/tools.ts` featured/popular flags — additive optional fields, no data migration required).
- Whole card is the link with clear focus ring; arrow icon on hover.

### 5. Trust strip (below results)
Reuse the Forms Hub trust strip style: 4 columns — Always free, Plain-English results, Attorney-reviewed, Save results as PDF where supported.

### 6. Empty state
Friendlier empty state with 3 suggested popular tools when a search returns nothing.

## File plan
- New: `src/components/tools/ToolsHero.tsx`
- New: `src/components/tools/ToolsBySituationTiles.tsx`
- New: `src/components/tools/ToolsCategoryTabs.tsx`
- Edit: `src/pages/ToolsDirectory.tsx` — compose the new sections, keep existing search/filter state, keep i18n hooks (`useLocalizedTools`, `useLocalizedPath`), keep the current route unchanged.
- Optional additive fields in `src/data/tools.ts` type: `popular?: boolean`, `estMinutes?: number`. Flag ~10 popular tools; leave the rest untouched.

## Scope guardrails
- Frontend/presentation only. No routing changes, no data model changes beyond additive optional fields.
- Uses existing navy/gold semantic tokens — no hardcoded colors.
- Preserves current query-string behavior (`?q=`) and category state.
- No changes to individual tool pages or i18n data.

**Highest-impact single change if we do nothing else:** the Hero + sticky category tabs + situation tiles — that alone transforms the first impression and navigation.
