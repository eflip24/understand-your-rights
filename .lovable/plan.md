# Build Legal Resources + How It Works Section

Create a self-contained homepage component named `LegalResourcesAndHowItWorks` that replaces the current separate Legal Resources and How It Works blocks with a cleaner, more premium section.

## What will change

### 1. New reusable component
Add `src/components/home/LegalResourcesAndHowItWorks.tsx` with:

- Clean light/off-white background using the existing design tokens
- Dark navy headings
- Warm gold accents for icons, badges, and step numbers
- Subtle teal highlights for hover states and dividers
- Generous spacing and mobile-first responsive layout

### 2. Legal Resources section
Add heading and subheading exactly as requested:

- Heading: `Legal Resources`
- Subheading: `Browse our library of plain-English legal guides and references.`

Then render three linked shadcn `Card` components:

1. Legal Terms Dictionary
   - Book/Open Book icon in a soft gold circle
   - Badge: `50+ TERMS`
   - Description: `50+ legal terms explained in plain English with example clauses.`
   - Link: `/legal-terms`

2. Contract Clauses Guide
   - Paperclip/Link icon in a soft gold circle
   - Badge: `20+ CLAUSES`
   - Description: `Understand common clauses, enforceability, and red flags.`
   - Link: `/legal-clauses`

3. Contract Types Explained
   - Scale/Balance icon in a soft gold circle
   - Badge: `20+ TYPES`
   - Description: `Different contract types, key clauses, and common risks.`
   - Link: `/contract-types`

Grid behavior:

```text
Mobile:  1 column
Tablet:  2 columns
Desktop: 3 columns
```

Cards will include lift, subtle scale, stronger shadow, and accent-border hover effects.

### 3. Soft divider / transition
Add a subtle divider between Legal Resources and How It Works using a light gradient line or glow, keeping the section cohesive without looking heavy.

### 4. How It Works section
Add heading and subheading exactly as requested:

- Heading: `How It Works`
- Subheading: `Get answers in three simple steps.`

Render three centered steps:

1. Choose a Tool
   - `Browse our collection of 100+ free legal tools.`
2. Enter Your Details
   - `Paste text, fill in numbers, or answer questions.`
3. Get Results
   - `Instant analysis, calculations, or generated documents.`

Each step will use:

- Large gold circle with white number
- Bold title
- Short muted description
- Horizontal layout on desktop, stacked on mobile

### 5. Homepage integration
Update `src/pages/HomePage.tsx` to:

- Import `<LegalResourcesAndHowItWorks />`
- Remove the old inline `legalResources` array
- Remove the old inline Legal Resources section
- Remove the old inline How It Works section
- Keep all other homepage sections unchanged

## Technical details

- Use `Card` and `Badge` from shadcn/ui
- Use lucide-react icons: `BookOpen`, `Link` or `Paperclip`, and `Scale`
- Use existing semantic Tailwind tokens: `background`, `card`, `navy`, `gold`, `accent`, `teal`, `muted-foreground`, `border`
- No backend, database, or route changes required

## Validation

After implementation, run a production build to confirm TypeScript compiles and no unused imports remain.