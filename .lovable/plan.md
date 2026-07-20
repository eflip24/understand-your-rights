# 4 Form Packs — Bundled Multi-Form Wizards

Ship four pack pages that reuse the existing wizard/autosave/dashboard/PDF/Stripe foundation. A "pack" is a single wizard that (a) collects shared info once, (b) lets the user toggle which documents to include, (c) generates each selected form's PDF, and (d) offers a free watermarked bundle or a paid clean bundle delivered as a single ZIP.

## Missing forms to build first

Several pack members don't exist yet. Ship them as full `LegalFormDef` entries in `src/data/forms.ts` with `renderX` functions in `generateFormPdf.ts` — same pattern as the last two batches.

**New Hire Pack (2 new):** Employment Offer Letter, Direct Deposit Authorization.
**Landlord Pack (4 new):** Notice to Vacate, Move-In/Move-Out Inspection Checklist, Security Deposit Receipt, Late Rent Notice.
**Small Business Pack (1 new):** Basic LLC Operating Agreement (single-member + multi-member toggle).
**Personal Planning Pack (4 new):** Healthcare POA, Simple Will, Living Will / Advance Directive, HIPAA Authorization.

Total: **11 new standalone forms** (each also usable individually at `/forms/{slug}`) plus 4 pack wrappers.

## Pack architecture

### New data layer: `src/data/formPacks.ts`
```ts
export interface FormPack {
  slug: string;                    // e.g. "new-hire-pack"
  title: string;
  seoDescription: string;
  priceUsd: number;                // 34, 29, 39, 34
  members: Array<{
    formSlug: string;              // links to existing LegalFormDef
    defaultSelected: boolean;
    optional?: boolean;            // e.g. Independent Contractor toggle
  }>;
  sharedFieldMap: Record<string, string[]>;
  // e.g. { fullName: ["w4.employeeName","i9.lastName+firstName","offer.employeeName"] }
  stateSelector?: boolean;         // Landlord pack
}
```
Define four packs with the composition, pricing, and shared-field maps listed in the user prompts.

### Wizard: `src/pages/FormPackWizardPage.tsx`
Reuses existing wizard primitives. Flow:
1. **Select documents** — checklist of pack members (respects `optional`).
2. **Shared info** — one consolidated step group (name, address, SSN/EIN, dates, property, etc. — driven by union of member fields via `sharedFieldMap`).
3. **Per-form deltas** — only the fields NOT covered by shared info, grouped by form with clear headers.
4. **Review** — per-form summary + preview.
5. **Generate** — free (watermarked ZIP) or paid (clean ZIP via existing Stripe flow, pack-level `form_slug`).

Autosave into `form_drafts` under a single row keyed by pack slug (JSONB `data` holds `{ selected: string[], shared: {...}, perForm: {...} }`). Dashboard "My Forms" already lists rows by slug — packs appear alongside individual forms with pack title.

### ZIP generation: `src/lib/pdf/generatePackZip.ts`
Add `jszip` (~30kB gz). For each selected member, call the existing `generateFormPdf(form, mergedData, { watermark })` — merging shared + per-form data — and add the returned Uint8Array to a JSZip instance. Emit `pack-slug.zip`. Include a `README.txt` with disclaimer and per-form official-source links.

### Stripe integration
Extend the existing `create-form-checkout` edge function (or add a thin wrapper) to accept a pack slug and pack price. Success returns to `/forms/{pack-slug}?paid=1`, which unlocks the clean ZIP the same way individual paid PDFs unlock today. `form_purchases.form_slug` stores the pack slug so re-downloads persist.

### Routing
Add route `/forms/:packSlug` handled by `FormPackWizardPage` when the slug matches a `FormPack`; falls through to existing `FormWizardPage` otherwise (via a lookup in `AppRoutes.tsx`).

### SEO / disclaimers
Each pack page ships Helmet `<title>` and meta description exactly as specified. Strong disclaimer on the pack landing intro + inside the ZIP README. Personal Planning pack shows a stronger notice ("not a substitute for an attorney; witness/notary requirements vary by state").

## Pack definitions (final)

| Pack | URL | Price | Members |
|---|---|---|---|
| New Hire | `/forms/new-hire-pack` | **$34** | W-4, I-9, Offer Letter, Independent Contractor (opt), NDA, Direct Deposit |
| Landlord Starter | `/forms/landlord-starter-pack` | **$29** | Lease, Eviction Notice, Notice to Vacate, Inspection Checklist, Deposit Receipt, Late Rent Notice |
| Small Business Basics | `/forms/small-business-pack` | **$39** | IC Agreement, NDA, Bill of Sale, Promissory Note, LLC Operating Agreement, Demand Letter |
| Personal Planning | `/forms/personal-planning-pack` | **$34** | Financial POA, Healthcare POA, Simple Will, Living Will, HIPAA Auth |

## Homepage / hub integration
- Add a **"Form Packs — Save with Bundles"** section to `/forms` above the individual-forms grid.
- Update `FeaturedFormsSection.tsx` to lead with the four packs.

## Guardrails
- No schema migration — `form_drafts` and `form_purchases` reuse slugs.
- Every new individual form remains independently accessible at `/forms/{slug}`.
- Existing paid-PDF Stripe flow is extended, not replaced.
- Final: `tsgo --noEmit` clean.

## Order of build
1. 11 new individual forms (`forms.ts` + renderers) — biggest chunk.
2. `formPacks.ts` definitions.
3. `FormPackWizardPage.tsx` + ZIP builder + Stripe pack pricing.
4. Route wiring + `/forms` hub bundle section.
5. Type-check + smoke-test each pack path.

## Deliverable
Summary table with the 4 pack URLs, member counts, prices, and any state-conditional logic.
