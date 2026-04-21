

# Redesign "Popular Tools" Section

Refresh the homepage's Popular Tools section with a modern legaltech look — deep navy + teal accents, category-colored icon cards, filter tabs, and a stronger CTA. **Only this section changes.** Hero, stats, categories, guides, and other sections are untouched.

## Design Tokens (added to `src/index.css`)

Add a teal accent alongside the existing navy/gold palette (used only inside this section so the rest of the site is unaffected):

```text
--teal:        180 65% 38%   /* primary teal accent */
--teal-light:  180 55% 92%   /* badge / icon tile background */
--teal-dark:   180 70% 28%   /* hover */
```

## Section Layout

```text
┌────────────────────────────────────────────────────┐
│              Popular Tools                          │  centered title
│   The most used legal tools on our platform.       │  subtitle
│                                                     │
│  [ All ] [Contract] [Consumer] [Employment] ...    │  pill filter tabs
│                                                     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │
│  │card│ │card│ │card│ │card│   4-col desktop       │
│  └────┘ └────┘ └────┘ └────┘   2-col mobile        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │
│  │card│ │card│ │card│ │card│                       │
│  └────┘ └────┘ └────┘ └────┘                       │
│                                                     │
│           [  Browse All Tools  →  ]                 │  primary CTA
└────────────────────────────────────────────────────┘
```

- Background: subtle navy-tinted gradient (`from-background to-secondary/40`) for premium feel
- Generous vertical padding (`py-20 md:py-24`)
- Filter tabs: rounded-full pills, navy text, teal active state. Tabs: **All | Contract | Consumer | Employment | AI | Document Generators**
- Filtering is client-side; switching tab swaps the displayed tools (smooth fade). If a category has fewer than 8, fill remaining slots from other featured tools.

## Card Design

```text
┌─────────────────────────────┐
│  ┌───┐                       │
│  │ 🛈 │   ← large 56px tile, │
│  └───┘     category color    │
│                              │
│  [ Contract ]   ← pill badge │
│                              │
│  Contract Reading Time       │  bold, navy, font-serif
│  Calculator                  │
│                              │
│  Know exactly how long       │  benefit-focused
│  your contract takes to read.│  2-line copy
│                              │
│  ────────────────────────    │  divider
│  [   Use Tool   →   ]        │  full-width teal button
└─────────────────────────────┘
```

- `rounded-2xl`, `border border-border/60`, white card background
- `shadow-sm` resting → `shadow-xl` + `-translate-y-1` on hover (300ms ease)
- Icon tile: 56×56, rounded-xl, tinted with the category's color (e.g. blue-50 bg + blue-600 icon for Contract; teal for Real Estate; rose for AI; amber for Generators; green for Consumer; purple for Employment)
- Category badge: `rounded-full`, small, color-matched soft background
- Tool name: `font-serif font-bold text-lg`, navy
- Description: `text-sm text-muted-foreground leading-relaxed`, line-clamp-2
- Button: full-width, teal background, white text, `Use Tool →`. On AI tools the label becomes `Try for Free →`.

## 8 Featured Tools

Resolved from `src/data/tools.ts` (slugs verified against existing IDs):

| # | Tool | Category | Slug |
|---|---|---|---|
| 1 | Contract Reading Time Calculator | Contract | `reading-time-calculator` |
| 2 | Contract Word Counter | Contract | `word-counter` |
| 3 | Legal Jargon Translator | Contract | `jargon-translator` |
| 4 | NDA Generator | Generators | `nda-generator` |
| 5 | Cancellation Deadline Calculator | Consumer | `cancellation-deadline` |
| 6 | Late Fee Calculator | Consumer | `late-fee-calculator` |
| 7 | Contract Red Flag Scanner | AI | `contract-red-flag-scanner` |
| 8 | Terms & Conditions Summarizer | AI | `terms-summarizer` |

A small `FEATURED_TOOL_IDS` array drives the section so swaps stay simple. If a slug doesn't resolve, it's skipped silently.

## Browse All CTA

Below the grid, centered:
- Primary navy button, large, `rounded-xl`: **Browse All Tools →**
- Links to `/tools`
- Subtle helper line under it: *Explore 100+ free legal tools*

## Files Changed

| File | Change |
|---|---|
| `src/index.css` | Add `--teal`, `--teal-light`, `--teal-dark` HSL tokens |
| `tailwind.config.ts` | Map `teal`, `teal-light`, `teal-dark` to the new HSL vars |
| `src/pages/HomePage.tsx` | Replace only the `{/* Popular Tools */}` section (lines 175–210) with the new design + filter state |

No other sections, routes, or files are touched.

## Accessibility & Responsiveness

- Filter tabs are real `<button>`s with `aria-pressed` for the active state
- Cards remain wrapped in `<Link>` so the entire card is clickable; the inner "Use Tool" button is visual (the parent link handles navigation) — no nested `<a>` issue
- Grid: `grid-cols-2 lg:grid-cols-4`, `gap-5 md:gap-6`
- Mobile: filter tabs scroll horizontally (`overflow-x-auto`, no scrollbar) with snap

