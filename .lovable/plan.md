# Next Sprint: New Tools, New Forms, Deeper Blog

Four workstreams, all grounded in Semrush demand checks (used indirectly — to pick targets, not as page facts).

## 1. New high-CPC calculators (3 tools)

| Tool | Route | Why (Semrush, US) |
|---|---|---|
| Wrongful Death Settlement Estimator | `/tools/wrongful-death-settlement-calculator` | 480/mo, CPC $4.50, difficulty 4/100 — near-zero competition, feeder terms at $15–25 CPC |
| Probate Cost & Executor Fee Calculator | `/tools/probate-cost-calculator` | Head term easy (KD 17); the "probate lawyer cost/fees" cluster is ~5,000/mo combined at $3+ CPC |
| Lost Wages & Future Earnings Calculator | `/tools/lost-wages-calculator` | Direct feeder into the existing settlement estimators and PI hub |

Each tool ships with: state-aware defaults where relevant (probate fee schedules for CA/FL/NY/TX/IL/PA, wrongful-death damage categories by state), scenario comparison, methodology block, FAQ + SoftwareApplication JSON-LD, author byline, related-intent strip, and registration in the tool inventory, guides index and sitemap.

## 2. New forms (4)

- Last Will and Testament (simple, state-aware witness/notary rules)
- Living Will / Advance Healthcare Directive
- Small Claims Demand & Filing Prep Packet (uses existing court filing-fee data)
- Independent Contractor Agreement

Plus a new **Estate Planning Starter Pack** bundling Will + Living Will + Financial POA + Release, using the existing shared-fields and ZIP bundling logic. Priced through the existing `form_prices` admin table.

## 3. Page-depth upgrades (5 existing pages)

Apply the proven rebuild recipe (original data table, worked example, entity-dense carrier/agency block, FAQ schema, byline) to the next tier of pages: Pain & Suffering, Auto Insurance Claim Guide, Long-Term Disability Guide, Contingency Fees, Mass-Tort hub. Each gains a comparison table it currently lacks and internal links into the new calculators.

## 4. Better blog posts

- Upgrade the AI blog generation prompt to the rebuild recipe: minimum data table, source citations, byline from the editorial team, internal links to matching tools/forms, FAQ schema.
- Add an editor-side quality checklist and a "linked tools" field so every post points at a calculator or form.
- Publish 6 seeded posts on cluster gaps found in the keyword checks (wrongful death payouts, probate fees by state, lost-wage documentation, small claims limits, contractor vs employee, will vs living trust).

## Technical notes

- New tools follow `ToolPageLayout` + existing calculator patterns; data layers in `src/data/` (`probateFees.ts`, `wrongfulDeathStates.ts`).
- Forms extend `src/data/forms.ts` definitions and the existing wizard/PDF renderer; pack added to `src/data/formPacks.ts`.
- Routes registered in `AppRoutes.tsx`, entries added to `guideIndex.ts`, and the `generate-sitemap` edge function updated.
- Blog changes touch the generation edge function, admin editor, and `BlogPostPage` schema.

## Order

Tools → forms → blog pipeline → depth upgrades, verifying each batch in the preview.
