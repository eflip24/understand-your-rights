# 6-Form Batch — Status & Remaining Work

This batch overlaps with the previous one. Three forms already exist and just need slug renames; three are net-new. All six will share the same reusable wizard, autosave, dashboard, free-watermarked/paid-clean PDF, and disclaimer system.

## Status per form

| # | Form | URL | Status |
|---|---|---|---|
| 1 | Financial Power of Attorney | `/forms/power-of-attorney-financial` | Exists as `/forms/power-of-attorney` → **rename + alias redirect** |
| 2 | Residential Lease Agreement | `/forms/residential-lease-agreement` | Exists as `/forms/residential-lease` → **rename + alias redirect** |
| 3 | Vehicle Bill of Sale | `/forms/vehicle-bill-of-sale` | Exists as `/forms/bill-of-sale` (vehicle/boat/general) → **rename + alias redirect, keep vehicle as default** |
| 4 | Demand / Collection Letter | `/forms/demand-letter` | **Build new** |
| 5 | Promissory Note | `/forms/promissory-note` | **Build new** |
| 6 | Release of Liability / Waiver | `/forms/release-of-liability` | **Build new** |

## Implementation

### 1. `src/data/forms.ts`
- Rename slugs for the three existing forms; update SEO titles/descriptions to match the requested phrasing ("Free Financial Power of Attorney Form Online", etc.).
- Append three new `LegalFormDef` entries:
  - **Demand Letter** — 5 steps: sender, recipient, dispute type (unpaid invoice / breach / security deposit / property damage), amount + deadline, consequences (suit, attorney's fees, collections, credit report). FDCPA acknowledgment auto-surfaces for consumer-debt collectors.
  - **Promissory Note** — 6 steps: parties, principal, interest (simple/compound, APR with usury warning >10%), repayment (lump / installments / on-demand), secured/unsecured with UCC-1 filing, optional co-signer, optional notary block.
  - **Release of Liability** — 5 steps: releasor/releasee, activity, waiver type (5 variants), minor branch (parent/guardian consent), 5 required acknowledgment checkboxes, state-restriction disclaimer (LA/VA/MT).
- Wire `relatedForms` so the 6 cross-link (Demand ↔ Promissory ↔ Release; NDA/Eviction → Demand).
- Set `isFeatured` on all six.

### 2. `src/lib/pdf/generateFormPdf.ts`
Add three renderers using the existing `buildDoc` helper:
- `renderDemandLetter` — business-letter layout, conditional FDCPA block.
- `renderPromissoryNote` — clauses with interest math and optional signature/notary sections.
- `renderReleaseOfLiability` — numbered acknowledgment clauses, parent/guardian block when minor.

Add three cases to the `generateFormPdf` switch.

### 3. `src/pages/FormWizardPage.tsx`
Add `SLUG_ALIASES` map + `<Navigate replace>` so `/forms/power-of-attorney`, `/forms/residential-lease`, `/forms/bill-of-sale` forward to the new URLs. Preserves existing drafts and purchases (they key on the new canonical slug via the alias).

### 4. `src/components/home/FeaturedFormsSection.tsx`
Data-driven from `isFeatured`; verify the six surface in the intended order on the homepage.

## Guardrails
- No DB migration — `form_drafts` and `form_purchases` continue to key on `form_slug`; aliases redirect before the wizard mounts.
- Every page renders the existing legal disclaimer + `officialLink` note where applicable.
- Free PDFs keep the watermark; paid clean PDFs flow through the existing Stripe path.
- Final step: `tsgo --noEmit` type-check.

## Deliverable summary at the end
Table of the 6 forms with URL, wizard step count, notable conditional logic, and cross-link map.
