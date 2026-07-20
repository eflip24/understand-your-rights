## Homepage Redesign Plan

Bring the homepage up to the same premium standard as the Forms, Tools, and Find-a-Lawyer hubs. The current page has strong content but reads as a long stack of similar-weight sections (hero → stats → intro paragraphs → forms → quiz → categories → guides → blog → resources → CTA). First impression feels dense and undifferentiated, and users don't get a clear "what do I do next?" moment above the fold.

### Goals
1. Instant clarity in the hero: who it's for + one prominent search.
2. Three obvious paths ("I need a tool", "I need a form", "I need a lawyer") within the first screen.
3. Reduce vertical noise — merge/trim redundant sections.
4. Reinforce trust signals higher on the page.
5. Keep everything on-brand (navy/gold, glassmorphism, serif headings, 120% root).

---

### 1. New Hero (`HeroBanner` refresh)
- Navy gradient with subtle gold accent glow.
- H1 (serif): "Plain-English legal help — free."
- Sub: one line naming the three product surfaces (tools, forms, lawyers).
- **Universal search bar** that queries tools + forms + guides in one dropdown (grouped results).
- 3 shortcut chips under the search: "Popular: Alimony Calculator · W-9 Form · Personal Injury Lawyer".
- Trust row: "100+ tools · 23 forms · 50-state coverage · No signup".

### 2. Three-Path Picker (new component `HomePathTiles`)
Directly under hero, three large tiles:
- **Free Legal Tools** → `/tools` (calculators, checkers, translators)
- **Fillable Legal Forms** → `/forms` (W-9, NDA, Lease, POA…)
- **Find a Lawyer** → `/lawyer-near-me` (by state & practice area)

Each tile: icon, title, one-line value prop, count badge, hover lift.

### 3. "By Situation" Strip (new component `HomeSituationStrip`)
Horizontal scroll / grid of intent tiles reusing existing situation taxonomy:
- I was in an accident · I'm getting divorced · I'm hiring someone · I'm renting a place · I'm starting a business · I'm dealing with debt · I got fired · I need to sign a contract

Each links directly to the most relevant hub or filtered view.

### 4. Featured Forms + Popular Tools (merged)
Replace two separate sections (`FeaturedFormsSection` + `QuizAndPopularToolsSection`) with a **single 2-column "Most used this week" block**:
- Left: Top 4 forms (W-9, NDA, Lease, POA)
- Right: Top 4 tools (Alimony, Child Support, Settlement, Jargon Translator)
- Keep the Legal Health Check quiz but move it to a slim CTA card at the end of this section rather than sharing top billing.

### 5. Trust & Editorial Strip
Compact horizontal band (replaces the long 4-paragraph intro):
- 4 icons: Attorney-reviewed · Updated to latest revisions · No signup required · 50-state + EU coverage
- One-sentence editorial pledge with links to `/editorial-standards` and `/about`.

The full 4-paragraph SEO intro moves lower on the page (before the CTA) so Google still reads it, but users aren't wall-of-text on entry.

### 6. Practice-Area Guides
Keep the existing 8-guide grid but move it right after the Situation Strip since it directly maps to intent. Add subtle icon backgrounds matching the lawyer-directory redesign for visual consistency.

### 7. Categories Section
Keep — it's visually strong with the illustrated icons. Tighten heading copy and reduce top/bottom padding by ~30%.

### 8. Latest from the Blog
Keep as-is (already well-designed). No changes.

### 9. Stats Bar
Remove the standalone stats bar under the hero (stats are already encoded as trust chips inside the new hero and path tiles). Reclaims ~90px of above-the-fold real estate.

### 10. Final CTA
Keep the navy CTA band but change copy to a softer prompt: "Not sure where to start? Take the 60-second Legal Health Check" → routes to `/legal-health-check`. This makes the quiz the finishing moment instead of competing with the hero.

---

### Section Order (final)
```text
1.  Hero (with universal search)
2.  Three-Path Picker (Tools / Forms / Lawyers)
3.  Situation Strip
4.  Practice-Area Guides
5.  Most Used This Week (forms + tools merged)
6.  Categories (illustrated)
7.  Trust & Editorial strip
8.  Latest from the Blog
9.  Long-form SEO intro paragraphs (moved down)
10. LegalResourcesAndHowItWorks (existing)
11. Final CTA → Legal Health Check
```

---

### Files to create
- `src/components/home/HomePathTiles.tsx`
- `src/components/home/HomeSituationStrip.tsx`
- `src/components/home/HomeUniversalSearch.tsx` (used inside HeroBanner)
- `src/components/home/HomeTrustStrip.tsx`
- `src/components/home/MostUsedThisWeek.tsx` (replaces FeaturedFormsSection + popular-tools half of QuizAndPopularToolsSection on the homepage)

### Files to update
- `src/components/home/HeroBanner.tsx` — new copy + integrated search + trust chips
- `src/pages/HomePage.tsx` — new section order, remove stats bar, move SEO intro
- Reuse existing `sitePracticeAreas`, `formsSeoLandings`, `tools` data — no new data layer.

### Design tokens
All colors from existing `--primary`, `--accent`, `--secondary` tokens. No hardcoded hex. Same glassmorphism card treatment used on Forms/Tools/Lawyer hubs. Serif for section H2s, sans for body.

### Out of scope
- No routing changes, no backend changes, no i18n key removals (new keys added; old keys left in place so translations still work).
- Blog section untouched.
- No changes to Navbar/Footer.

---

**Highest-impact single change if we had to ship only one thing:** the hero + three-path picker + situation strip together — because they solve the "where do I go?" problem in the first screen, which is the #1 blocker to Ad-relevant page depth.
