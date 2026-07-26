# Phase 8 — High-CPC Content Expansion (US)

Ship 10 new money pages in the same house style as the existing guides (`AutoInsuranceClaimGuide`, `SsdiDeniedWhatNext`, `MesotheliomaSettlementGuide`): entity-dense intro, `InMarketEntityBlock`, HowTo + FAQ + Article + Breadcrumb JSON-LD, `RelatedIntentStrip`, `ToolRecommender`, AdSlots, and a direct tie-in to the matching calculator and `/lawyer-near-me/{practice-area}`.

## Pages

| # | Route | Cluster | Calculator tie-in | Lawyer tie-in |
|---|---|---|---|---|
| 1 | /truck-accident-settlements | PI (FMCSA, 49 CFR 395 HOS, ELD, Prime/Werner/Swift, MCS-90) | Settlement Estimator | /lawyer-near-me/personal-injury |
| 2 | /uber-lyft-accident-claims | Rideshare PI (James River, Period 1/2/3, $1M contingent) | Settlement Estimator | /lawyer-near-me/car-accident |
| 3 | /nursing-home-abuse-claims | Elder law + PI (CMS 42 CFR 483, Five-Star, state ombudsman) | Pain & Suffering / Settlement Estimator | /lawyer-near-me/personal-injury |
| 4 | /workers-comp-denied-what-next | Workers comp (state WCB appeal, IME, C-3, utilization review) | Workers' Comp Settlement Calc | /lawyer-near-me/employment |
| 5 | /car-insurance-claim-denied | Auto insurance (bad faith, DOI complaint, Colossus/ClaimIQ) | Settlement Estimator | /lawyer-near-me/insurance-dispute |
| 6 | /homeowners-insurance-claim-denied | Property (HO-3, ACV vs RCV, hurricane deductible, FL/TX/LA, public adjuster, appraisal clause) | Settlement Estimator | /lawyer-near-me/insurance-dispute |
| 7 | /dui-first-offense-guide + /dui-first-offense-guide/:state | Criminal (BAC .08, implied consent, IID, ALR/DMV hearing, SR-22) | — (penalty/cost table) | /lawyer-near-me/criminal-defense/{state} |
| 8 | /chapter-7-vs-chapter-13 | Bankruptcy (means test, 341 meeting, exemptions, trustee) | Debt Settlement Calculator | /lawyer-near-me/… debt/bankruptcy |
| 9 | /wrongful-termination-settlements | Employment (EEOC, Title VII, FMLA, at-will exceptions) | EEOC Settlement Calculator | /lawyer-near-me/employment |
| 10 | /roundup-camp-lejeune-updates | Mass tort (Monsanto/Bayer MDL 2741, CLJA, PACT Act, EDNC) | Settlement Estimator | /lawyer-near-me/personal-injury |

## DUI state fan-out (page 7)

New `src/data/duiStates.ts` covering all 51 jurisdictions: BAC limits, first-offense jail/fine range, license suspension length, IID requirement, lookback period, SR-22 requirement, statute citation. The hub lists all states in a scannable grid; `/dui-first-offense-guide/:state` renders a state template pre-populated from that data, with self-referential canonical + breadcrumb per state.

## Technical notes

- Content lives in data files (`src/data/phase8Pillars.ts` style per-page constants) so copy is editable without touching JSX; DUI uses a shared template component.
- All pages are Tier-3 (English-only) → use `Tier3Head` so non-English locales are noindexed, consistent with existing guides.
- JSON-LD via the existing `JsonLdGraph` + `articleSchema`/`faqSchema`/`breadcrumbSchema` helpers, plus a HowTo graph node per page.
- Routes registered lazily in `AppRoutes.tsx`, matching the current lazy-import pattern.
- `RelatedIntentStrip` links each page into its existing cluster (PI hub, auto-insurance guide, debt hub, mass-tort hub, SSDI/LTD guides) and existing pages get reciprocal links added where the cluster already has a strip.
- `generate-sitemap` edge function: add the 10 routes + 51 DUI state URLs to the guides shard, then redeploy.
- Legal disclaimer block on every page (site standard).

## Out of scope

No new calculators — pages link to existing tools. No multilingual translation for these routes in this phase.
