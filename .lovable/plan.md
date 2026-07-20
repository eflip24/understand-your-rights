## Goal
Create dedicated SEO landing pages for the highest-CPC / highest-volume legal forms so we capture long-tail search intent (e.g. "w-9 online free", "eviction notice california") separate from the interactive wizard pages.

## Target forms (based on Semrush CPC + volume + our current inventory)

| Priority | Form | Landing slug | Primary keyword cluster |
|---|---|---|---|
| 1 | W-9 (Rev. Mar 2024) | `/forms/w-9-online-free` | "fillable w-9", "w9 form 2024 pdf" |
| 2 | W-4 (2026) | `/forms/w-4-online-free` | "w4 form 2026", "fillable w4" |
| 3 | I-9 (01/20/25) | `/forms/i-9-online-free` | "i-9 form 2025", "employment eligibility form" |
| 4 | Eviction Notice | `/forms/eviction-notice/{state}` × 6 states (CA, NY, TX, FL, IL, PA) | "3 day eviction notice california", etc. |
| 5 | Residential Lease | `/forms/lease-agreement/{state}` × 6 states | "california lease agreement pdf" |
| 6 | Financial Power of Attorney | `/forms/power-of-attorney/{state}` × 6 states | "poa form texas" |
| 7 | Simple NDA | `/forms/nda-online-free` | "free nda template" |
| 8 | Bill of Sale (Vehicle) | `/forms/vehicle-bill-of-sale/{state}` × 6 states | "dmv bill of sale florida" |
| 9 | Demand Letter | `/forms/demand-letter-online-free` | "demand letter for payment" |
| 10 | Promissory Note | `/forms/promissory-note-online-free` | "promissory note template free" |

Total: 4 standalone + 4 state-fanned forms × 6 states = **28 new landing pages**.

## Page structure (reusable template)
Each landing page shares one component `FormSeoLandingPage.tsx` that renders:
1. H1 with primary keyword + "Free • Fillable Online • Instant PDF"
2. Above-the-fold CTA → deep-links to the wizard with state pre-selected
3. "What is this form?" (150–250 words, entity-rich)
4. "Who needs it / when to use it"
5. State-specific rules block (only on state-fanned pages, pulled from existing state data)
6. Step-by-step "How to fill it out" (HowTo schema)
7. FAQ block (FAQPage schema, 5–7 Qs pulled from PAA)
8. Related forms strip (RelatedIntentStrip)
9. Trust signals (e-signature, secure library, no login required for free forms)
10. Second CTA

## Technical approach

**New files**
- `src/data/formSeoLandings.ts` — content map: `{ slug, formId, h1, metaTitle, metaDescription, intro, useCases, howToSteps[], faqs[], keywords[] }`
- `src/data/formStateFanout.ts` — state × form matrix with state-specific timing/legal rules (reuse existing eviction/lease state data where present)
- `src/components/forms/FormSeoLandingPage.tsx` — reusable template
- `src/pages/forms/FormSeoLanding.tsx` — route handler resolving slug → data
- `src/pages/forms/FormStateSeoLanding.tsx` — resolves `/forms/{form}/{state}` → data

**Modified**
- `src/AppRoutes.tsx` — add routes (lazy-loaded); keep existing wizard routes intact and untouched
- `supabase/functions/generate-sitemap/index.ts` — extend `forms` sitemap with the 28 new URLs
- `src/data/formPacks.ts` — no change; landings link into wizards

**SEO essentials per page**
- Unique `<title>` ≤60 chars, meta description ≤160
- Canonical self-reference
- OG/Twitter tags
- JSON-LD `@graph`: `WebPage` + `HowTo` + `FAQPage` + `BreadcrumbList` (+ `GovernmentService` for W-9/W-4/I-9)
- Internal links from `/forms` hub and from the wizard page (small "Learn more" link)

## Non-goals
- No changes to wizard logic, pricing, checkout, or PDF generation
- No new forms; landings point at existing wizards
- No content-farm duplication — each state page carries genuinely different rules (notice periods, statutes cited)

## Rollout
1. Ship template + data layer + 4 standalone landings (W-9, W-4, I-9, NDA)
2. Ship state fan-out for eviction notice (highest state-CPC)
3. Ship remaining state fan-outs (lease, POA, bill of sale)
4. Ship demand letter + promissory note
5. Regenerate sitemap, verify all 28 URLs resolve and are in sitemap
6. Add cross-links from `/forms` hub grid

Want me to proceed with all 28 in one build, or ship in the 5 phases above so you can review after each?
