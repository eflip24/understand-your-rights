# Create Premium Hero Banner for LegallySpoken

Build a standalone reusable `HeroBanner` component for the homepage hero, matching the requested premium legaltech style and preserving the existing search behavior.

## What Will Change

- Replace the current inline hero markup in `src/pages/HomePage.tsx` with a new reusable component:
  - `src/components/home/HeroBanner.tsx`
- Keep the rest of the homepage unchanged, including Stats, Legal Health Check, Popular Tools, Categories, Guides, Blog, and CTA sections.
- Keep the existing search flow: submitting a query sends users to `/tools?q=...`.

## Hero Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Dark navy premium hero background                            │
│                                                             │
│  [100+ Free Legal Tools — No Signup Required]                │
│                                                             │
│  Legal clarity, simplified                                  │
│                 simplified = warm gold                      │
│                                                             │
│  Understand contracts, check risks, calculate deadlines,     │
│  and generate documents — instantly, for free.               │
│                                                             │
│  ┌───────────────────────────────────────────────┐ [Search] │
│  │ Search for a legal tool...                    │          │
│  └───────────────────────────────────────────────┘          │
│                                                             │
│  ✓ No signup required   ✓ Free forever   ✓ Instant results  │
│                                                             │
│                      subtle legal illustration on desktop    │
└─────────────────────────────────────────────────────────────┘
```

## Visual Direction

- Background: deep navy close to `#0a0f2c`, with subtle radial gradients and a faint document/grid pattern for depth.
- Accent: warm gold/yellow for the badge detail, the word `simplified`, search button, and checkmarks.
- Typography: modern sans-serif for the hero (`font-sans`) to satisfy the requested Inter/system feel, even though the rest of the site uses serif headings.
- Search bar: large centered glass-style search container with strong focus state and gold button.
- Trust signals: animated hover lift/glow, high-contrast but understated.
- Illustration: CSS/SVG-style composition on the right side for desktop/tablet:
  - stylized contract document cards
  - shield/check icon
  - scale/legal symbol accent
  - calendar/deadline tile
  - soft gold and blue glows
  - hidden or simplified on small mobile to keep the CTA focused.

## Mobile Behavior

- Mobile-first layout with centered content.
- Headline scales from strong mobile sizing to large desktop sizing.
- Search bar stacks cleanly if needed: input remains prominent, button stays easy to tap.
- Trust signals wrap neatly under the search.
- Illustration becomes a subtle background accent or is hidden on narrow screens to avoid clutter.

## Technical Details

| File | Change |
|---|---|
| `src/components/home/HeroBanner.tsx` | New reusable React component containing hero UI, local search state, submit handler, shadcn `Input` and `Button`, and the decorative legal illustration. |
| `src/pages/HomePage.tsx` | Import `<HeroBanner />`, remove inline hero section and search state/handler if no longer needed. |

Implementation notes:

- Use existing Tailwind tokens where possible: `navy`, `gold`, `accent`, and existing animation utilities.
- Use `useNavigate` inside `HeroBanner` so the component is self-contained.
- Use `lucide-react` icons such as `Search`, `CheckCircle2`, `ShieldCheck`, `Scale`, `FileText`, and `CalendarDays`.
- Keep accessibility intact:
  - Search form has a proper submit button.
  - Input includes an accessible label via `aria-label`.
  - Decorative illustration uses `aria-hidden="true"`.
- No backend or database changes needed.

## Expected Result

The homepage opens with a dark, polished, high-converting hero that clearly communicates:

- 100+ free tools
- no signup required
- instant legal utility
- search-first discovery

The section should feel premium and trustworthy while staying fast, responsive, and consistent with the LegallySpoken brand.