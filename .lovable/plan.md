## Goal
Replace the current placeholder W-9 entry in `src/data/forms.ts` with a 100%-accurate multi-step version of IRS Form W-9 (Rev. March 2024), and give it a dedicated PDF renderer. Reuses the existing Forms foundation (wizard, auto-save, dashboard, watermark/clean PDF, related forms, disclaimer).

## What needs to change

### 1. Extend form-field primitives (`src/data/forms.ts` + `FormField.tsx`)
Add three new field types so the schema-driven wizard can render W-9 accurately without hand-rolling a bespoke component:

- `radio` — used for Line 3a (7 mutually exclusive tax-classification boxes) and for the SSN-vs-EIN choice in Part I.
- `conditionalText` — a text input that only renders when a parent field equals a given value (LLC tax-code entry, "Other" description).
- `usState` — a US state dropdown (50 + DC) for Line 6.

Each new type gets one small block in `FormField.tsx`; existing `ssn` / `ein` types already exist and stay.

Also add optional `showWhen?: { fieldId: string; equals: string | string[] | true }` to `FormFieldDef` so Line 3b and the LLC code field render only when their trigger is set. `FormWizardPage` already reads `data`, so it just needs to filter `current.fields` through a `shouldShow(field, data)` helper before rendering and before required-field validation.

### 2. Rewrite the `w-9` entry with the exact IRS structure
Four wizard steps mapped to the official lines:

**Step 1 — Name & tax classification**
- Line 1: `name` (text, required) with official help text about sole proprietors / disregarded entities.
- Line 2: `businessName` (text, optional).
- Line 3a: `classification` (radio, required) with the 7 official options in order: Individual/sole proprietor, C corporation, S corporation, Partnership, Trust/estate, LLC, Other.
- LLC code: `llcTaxCode` (conditionalText, required when `classification === "llc"`) — label "Enter the tax classification (C = C corporation, S = S corporation, P = Partnership)".
- Other description: `otherDescription` (conditionalText, required when `classification === "other"`).
- Rendered note under Line 3a with the exact IRS "Check the LLC box…" text (added as a `description` on a hidden info field or as step-level `note` — see technical notes).
- Line 3b: `foreignPartners` (checkbox, `showWhen` `classification ∈ {partnership, trust, llc-with-P}` — handled via a small computed trigger field).

**Step 2 — Exemptions & address**
- Line 4a: `exemptPayeeCode` (text, optional).
- Line 4b: `fatcaCode` (text, optional) with the "accounts outside the United States" note as help text.
- Line 5: `streetAddress` (text, required).
- Line 6: `city` (text, required), `state` (usState, required), `zip` (text, required, pattern 5 or 9 digits).
- Requester name/address: `requesterInfo` (textarea, optional).
- Line 7: `accountNumbers` (text, optional).

**Step 3 — Part I: Taxpayer identification number**
- Instruction paragraph rendered as step `description` (exact IRS wording).
- `tinType` (radio, required): "Social Security Number" | "Employer Identification Number".
- `ssn` (ssn, `showWhen` tinType === "ssn", required).
- `ein` (ein, `showWhen` tinType === "ein", required).

**Step 4 — Part II: Certification**
- Full 4-item certification text rendered as step `description` (verbatim).
- Cross-out-item-2 instructions rendered as a secondary note.
- `signatureName` (text, required) — "Signature of U.S. person (typed name)".
- `certifyChecked` (checkbox, required) — "I agree this typed name is my electronic signature."
- `signatureDate` (date, required, defaults to today via wizard prefill).

Add step-level optional `note?: string` to `FormStepDef` so the rendered wizard can show the exact IRS blocks (LLC note, Part I instructions, Part II certification + cross-out note) in the right place. `FormWizardPage` renders `step.note` under `step.description`.

Update `relatedForms` to `["w-4", "i-9", "nda"]` and set `relatedBlogSlugs` to any existing 1099/independent-contractor posts (safe to leave empty if none match).

### 3. Dedicated W-9 PDF renderer (`src/lib/pdf/generateFormPdf.ts`)
The current renderer prints "label / value" for every field, which won't reproduce the IRS layout well. Add a `w9`-specific branch inside `generateFormPdf`:

- Header: "Form W-9 (Rev. March 2024) — Request for Taxpayer Identification Number and Certification".
- Section blocks that mirror the IRS 1-page layout (Name / Business name / Classification with the selected box marked, LLC code and Other description inline; Exemptions row; Address block; TIN box showing whichever of SSN/EIN was chosen with the correct hyphenation; Part II certification text verbatim; signature line with typed name + date).
- Footer disclaimer: "This is a free fillable helper tool created by legallyspoken.com. Not an official IRS form. Verify at irs.gov before submitting." — same watermark logic reused for the free version.

Generic renderer stays as the fallback for other slugs (w-4, i-9, nda, lease, poa).

### 4. Disclaimer copy
Add a W-9-specific compact disclaimer above the download bar on the final step (only when `slug === "w-9"`), using the exact wording from the prompt. `FormDisclaimer` stays generic; a small inline paragraph handles the W-9 line.

### 5. Stripe checkout
Out of scope for this build — `FormWizardPage.handleCheckout` already shows a "coming soon" toast, and the prompt's Stripe/paid-PDF wiring is deferred to its own turn (a payments-eligibility check + webhook function). Free watermarked PDF, auto-save, dashboard resume, and purchase-gated clean PDF plumbing all remain wired via the existing `form_purchases` table.

## Files touched
- `src/data/forms.ts` — extend types (`radio`, `conditionalText`, `usState`, `showWhen`, step `note`); rewrite the `w-9` entry.
- `src/components/forms/FormField.tsx` — render the three new field types.
- `src/pages/FormWizardPage.tsx` — apply `showWhen` filtering to rendering + validation; render `step.note`; W-9-specific inline disclaimer on the last step.
- `src/lib/pdf/generateFormPdf.ts` — add `renderW9(pdfDoc, data, watermark)` branch selected via `form.pdfTemplate === "w9"`.

No DB migration, no new routes, no new components.

## Technical notes
- `showWhen` for Line 3b treats `classification === "partnership" || classification === "trust" || (classification === "llc" && llcTaxCode?.toUpperCase() === "P")`. Simplest implementation: encode that as `showWhen: { fieldId: "__line3bTrigger", equals: true }` where `__line3bTrigger` is a computed derived value inserted by `FormWizardPage` before filtering (kept out of persisted data).
- Zip validation: allow `^\d{5}(-?\d{4})?$` — soft validate only (warning, not blocking) to stay consistent with the existing wizard's UX.
- SSN / EIN inputs already exist and use `inputMode="numeric"`; add lightweight formatting (`###-##-####` and `##-#######`) in `FormField.tsx` on blur so PDF output is clean.
- PDF renderer uses `pdf-lib` (already a dep) and standard Helvetica; no new fonts needed. Long certification text is wrapped via the existing `wrapText` helper.

## Out of scope (flagged for a follow-up turn)
- Live Stripe checkout for the $4.99 clean PDF (needs `payments--recommend_payment_provider` → `enable_stripe_payments` → products + webhook).
- Electronic signature pad — using typed-name + confirmation checkbox is legally equivalent for a W-9 helper and matches the rest of the Forms suite.
- Related blog posts: none of the current published posts are 1099/independent-contractor specific, so `relatedBlogSlugs` stays empty until we ship those.

## Acceptance
- All 7 tax-classification boxes render as radios in the IRS order; only one selectable.
- LLC code field appears only when LLC is selected; "Other" description appears only when Other is selected.
- Line 3b checkbox appears only under the three qualifying conditions.
- Part I shows the exact instruction paragraph and gates SSN vs EIN by radio.
- Part II renders the full 4-item certification and cross-out note verbatim.
- Free download produces a W-9-layout PDF with watermark; clean download works for users with a `form_purchases` row.
- Resume from `/dashboard` "My Forms" reopens on the last edited step with all values (including radios / conditional fields).
- Typecheck clean.