# Build Quiz + Popular Tools Section

Create a polished, self-contained homepage section named `QuizAndPopularToolsSection` that combines the Legal Health Check teaser and a streamlined Popular Tools grid exactly as requested.

## What will change

### 1. New reusable component
Add `src/components/home/QuizAndPopularToolsSection.tsx` with:

- Overall clean off-white/light gradient background
- Top Legal Health Check card:
  - Light cream/white rounded card with subtle gradient
  - “60-Second Quiz” badge with sparkle icon and warm gold/orange accent
  - Headline: “Not sure which legal tool you need?”
  - Subtitle exactly as provided
  - Dark navy CTA button: “Start Legal Health Check →” linking to `/legal-health-check`
- Popular Tools area below:
  - Heading: “Popular Tools”
  - Subheading: “The most used legal tools on our platform.”
  - Mobile-scrollable filter tabs: All, Contract, Consumer, Employment, AI, Document Generators
  - 4 cards only, responsive as `1 column mobile / 2 tablet / 4 desktop`

### 2. Exact 4 featured cards
Use the existing tool routes/data where possible, but lock the displayed cards to:

1. Contract Reading Time Calculator
2. Contract Word Counter
3. Legal Jargon Translator
4. NDA Template Generator

Card styling will include:

- Rounded white cards with generous padding
- Soft border and shadow
- Hover lift + stronger shadow
- Teal action button with arrow micro-interaction
- Clock, Calculator/Grid, Search, and FileText icons from `lucide-react`
- Contract cards with light blue icon circles and teal “CONTRACT” pills
- NDA card with warm icon circle and orange “DOCUMENT GENERATORS” pill

### 3. Use shadcn/ui components
Use existing UI primitives:

- `Card` for the quiz card and tool cards
- `Button` for CTAs
- `Badge` for pills
- `Tabs`, `TabsList`, `TabsTrigger` for filters

The tabs will be functional: selecting a category filters the four-card set, while “All” shows all four.

### 4. Homepage integration
Update `src/pages/HomePage.tsx` to replace the current separate “Legal Health Check Teaser” section and existing `<PopularToolsSection />` with the new combined `<QuizAndPopularToolsSection />`.

This keeps the rest of the homepage untouched: hero, stats, categories, guides, blog, resources, how-it-works, and footer CTA remain as-is.

## Technical details

- Create `QuizAndPopularToolsSection.tsx` under `src/components/home/`
- Import it into `HomePage.tsx`
- Remove the now-unused `PopularToolsSection` import from `HomePage.tsx`
- Remove any imports from `HomePage.tsx` that become unused after deleting the old inline quiz teaser block, such as the local `ArrowRight` usage if no longer needed there
- No backend or database changes required
- No global theme changes required

## Responsive behavior

```text
Mobile:     Quiz card full width, CTA full width, tabs horizontally scroll, cards 1 column
Tablet:     Cards 2 columns
Desktop:    Cards 4 columns, centered premium spacing
```

## Validation

After implementation, run the project build/type check to confirm the new component compiles cleanly and no unused imports remain.