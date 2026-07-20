
# Forms Hub Redesign — Friendlier, Faster, More Trustworthy

## Goals
Turn `/forms` from a plain grid into a page that instantly tells a visitor: *what this is, who it's for, and how to find their form in under 5 seconds.*

## What's weak today (from the screenshot)
1. No hero — page starts cold with a small header, then jumps straight into a pack grid, then a search bar mid-page. No clear "you're in the right place" moment.
2. Every card ends in the same generic gold "Start pack →" / "Fill Free →" — nothing draws the eye to the *right* option.
3. Pack card chips show raw slugs (`w 4`, `i 9`, `offer letter`) — looks like debug output, not a product.
4. Search bar sits below the packs instead of at the top where it's expected.
5. No "Popular right now", "By life event", or trust strip — no social proof, no scent trail for indecisive users.
6. Category filter is a row of identical outlined buttons — no icons, no counts, easy to skim past.
7. Form cards, pack cards, and state-fanout cards all look different and compete for attention.

## Proposed redesign

### 1. New hero band (top of page, above everything)
- Left: big serif H1 "Free fillable legal forms — done in minutes", one-line subtitle, 3 trust chips (`Free draft PDF · No signup to fill · Clean PDF from $4.99`).
- Right: **prominent search box** with placeholder *"Search: W-9, lease, eviction, POA…"* that filters both forms and packs live. Below it, 5–6 popular-form pill shortcuts (W-9, W-4, Eviction Notice, Lease, NDA, POA).
- Soft navy → transparent gradient background, gold accent underline on the H1 — matches the site's navy/gold system.

### 2. "Find by life event" quick-pick row (new)
Six visual tiles with icon + label, each scrolling/filtering to the matching pack or category:
- Hiring an employee → New Hire Pack
- Renting out property → Landlord Pack
- Starting a business → Small Business Pack
- Life planning → Personal Planning Pack
- Getting paid / owed money → Demand Letter + Promissory Note
- Selling something → Bill of Sale

This is the "1st impression" navigation — most users know their *situation*, not the form name.

### 3. Form Packs section — polished card
Keep the 4 packs but upgrade the card:
- Replace slug chips (`w 4`, `i 9`) with proper titles pulled from `legalForms` (`W-4`, `I-9`, `Offer Letter`) — small fix, big trust win.
- Add a "Includes N documents · Save $X vs individual" line computed from `sharedFields`/prices.
- Add a subtle numbered stack icon or count badge in the corner.
- Ribbon "Most popular" on Small Business Pack.

### 4. Category tabs — with icons and counts
Convert the outlined-button row into a proper tab strip with a Lucide icon per category and a count:
`All (23) · Employment (6) · Tax (3) · Business (5) · Real Estate (4) · Personal (5)`
Sticky under the hero on scroll so navigation is always one click away.

### 5. Form card — clearer hierarchy
- Move the free/paid dual-price into a single line at top-right: `Free draft · $4.99 clean PDF`.
- Big primary CTA button `Fill for free →` (full-width at bottom), not a ghost link — this is the moment of conversion.
- Show 2–3 quick meta chips: est. time (`~5 min`), state-aware (`50 states`), e-signature icon if supported.
- Consistent icon color from the semantic accent token, no hard-coded green.

### 6. "Popular state-specific forms" section — visual upgrade
Instead of 4 bordered boxes with bullet lists, use a compact 2-column layout: form title + a horizontal chip row of state abbreviations (CA · NY · TX · FL · IL · PA) — feels like a real product, not a link farm. Same URLs, better UX.

### 7. Trust strip near the fold
Small horizontal band: `27 forms · IRS/USCIS latest revisions · 6 priority states covered · Autosave · Free PDF option`. Reinforces credibility before the user commits to filling anything.

### 8. Sticky mini-CTA (mobile)
On small screens, a slim bottom bar: `Can't find a form?` → jumps to search. Keeps the "easy to find" promise on the smallest viewport.

## Design tokens (no hardcoded colors)
All colors from `index.css` semantic tokens: `--background`, `--accent` (gold), `--primary` (navy), `--muted`. Reuse the existing glassmorphism card style so it feels native to the rest of the site, not a bolt-on section.

## Scope — what I will NOT change
- No route changes, no data model changes, no wizard changes.
- Sitemap, JSON-LD, SEO landing pages untouched.
- All 28 SEO landings still link in via the "Popular state-specific" and "Free fillable — most searched" sections (kept, restyled).

## Files that will change
- `src/pages/FormsHubPage.tsx` — new hero, life-event row, restructured sections.
- `src/components/forms/FormCard.tsx` — new pricing line, primary CTA, meta chips.
- `src/components/forms/FormPackCard.tsx` — real titles instead of slugs, savings line, "Most popular" ribbon on one card.
- New: `src/components/forms/LifeEventTiles.tsx`, `src/components/forms/FormsHero.tsx`, `src/components/forms/FormsCategoryTabs.tsx`.

## First-impression check
When a stranger lands on `/forms` after the change, in ~3 seconds they see: a clear headline, a search box, six situations they might be in, and a trust strip. That's the bar.

---

### Options before I build
Before I implement, want me to:
- **A. Go build the redesign directly** as described above, or
- **B. First generate 3 rendered design directions** (locked to the site's navy/gold palette + typography, varying only in composition/density/hierarchy) so you can pick a direction visually, or
- **C. Ship in phases** — Phase 1 hero + search + life-event tiles today, Phase 2 card polish, Phase 3 category tabs & state section.

Reply with A, B, or C.
