
# Plan: Add Form I-9, Form W-4 (2026), and Simple NDA

Build on the existing foundation (`FormWizardPage`, `useFormDraft`, `MyFormsSection`, `PdfActionBar`, `generateFormPdf`, `form_drafts` / `form_purchases` tables). The W-9 pattern is our reference — same conditional field logic (`showWhen`), same per-form PDF renderer switch.

## 1. Extend the data layer — `src/data/forms.ts`

Add three new `LegalFormDef` entries plus supporting constants. No breaking changes to existing types beyond extending `PdfTemplate` (already includes `i9`, `w4`, `nda`).

### Form I-9 (`/forms/i-9`)
- **Title:** "Free Fillable Form I-9 Online – Employment Eligibility Verification"
- **Edition badge:** 01/20/25 (valid through 05/31/2027). Rendered in header + PDF.
- **Steps (5):**
  1. **Section 1 — Employee info & attestation:** Last, First, MI, Other last names, Street, Apt, City, State, ZIP, DOB, SSN, email, phone, attestation radio (4 options).
     - Conditional fields via `showWhen`:
       - Option 3 (LPR) → USCIS/A-Number.
       - Option 4 (alien authorized) → Work-until date + one-of: USCIS/A-Number, Form I-94 admission number, or Foreign passport number + country of issuance.
  2. **Section 1 signature:** Typed signature + date; "Did a preparer/translator help?" checkbox.
  3. **Preparer/Translator certification** (`showWhen` step-gate via first field): preparer name, address, signature, date. Rendered only if flagged.
  4. **Section 2 — Employer review:** Doc path radio ("List A" | "List B + C"); then either 1 List-A block or 2 blocks (B + C). Each block: Document Title, Issuing Authority, Document Number, Expiration Date. Plus first-day-of-employment date.
  5. **Section 2 certification:** Employer signature name, title, date, business name, business address. Optional Section 3 (reverification) toggle → new name, rehire date, reverification doc fields.
- **Disclaimer:** Prominent block — this is a self-help worksheet; the official Form I-9 must be signed on the USCIS PDF. Link to `uscis.gov/i-9`.

### Form W-4 (`/forms/w-4`)
- **Title:** "Free Fillable Form W-4 2026 – Employee's Withholding Certificate"
- **Steps (5, mirroring the IRS 5-step layout):**
  1. **Step 1 — Personal info:** First, MI, Last, SSN, Address, City, State, ZIP, Filing status radio (Single/MFS, MFJ or QSS, HoH).
  2. **Step 2 — Multiple jobs / spouse works:** Radio (a) Use IRS estimator, (b) Use Multiple Jobs Worksheet, (c) Check box 2(c) if two jobs with similar pay. Simple built-in estimator: second-job annual wages input → computed extra withholding suggestion (rendered as help text, written back to Step 4c only on user confirm).
  3. **Step 3 — Dependents:** Qualifying children under 17 × $2,000; other dependents × $500. Auto-total.
  4. **Step 4 — Other adjustments:** 4(a) other income, 4(b) deductions, 4(c) extra withholding per pay period.
  5. **Step 5 — Sign & date:** Typed signature, date. Optional employer section (name/address, first date of employment, EIN) marked "employer completes."
- **Disclaimer:** Not tax advice; verify against latest W-4 at irs.gov.

### Simple NDA (`/forms/nda`)
- **Title:** "Free NDA Template – Non-Disclosure Agreement Generator"
- **Steps (6):**
  1. **Parties:** Agreement type radio (Mutual / One-way); Disclosing party name + address + entity type; Receiving party name + address + entity type; Effective date.
  2. **Purpose & Confidential Information:** Purpose textarea; scope description; select "Broad standard definition" vs "Limited to marked/identified information."
  3. **Obligations & Exclusions:** Term of confidentiality (years, dropdown 1/2/3/5/7/Indefinite); permitted-representatives checkbox; exclusions displayed as standard clauses (read-only informational).
  4. **Return of materials & remedies:** Return-vs-destroy select; injunctive relief acknowledgment (checkbox — standard).
  5. **Governing law & venue:** US state (governing law); county/venue optional.
  6. **Signatures:** Disclosing signer name + title + date; Receiving signer name + title + date.
- **Disclaimer:** Plain-English template, not legal advice; state-specific enforceability varies.

## 2. Reusable template enhancements — `FormWizardPage.tsx` + related

Small, non-breaking upgrades that benefit all forms:
- **Step-level `showWhen`** in `FormStepDef` (currently only fields have it) so the I-9 preparer step can be skipped entirely when not needed. Update the "step X of N" counter to reflect visible steps.
- **Tooltip help:** promote `field.help` to also accept an optional `tooltip` (icon-triggered popover) — rendered as an info icon next to the label using shadcn `Tooltip`. Backwards compatible.
- **Optional per-form `officialLink`** (e.g., `irs.gov/w4`, `uscis.gov/i-9`) rendered in the top-of-page disclaimer callout — same treatment currently hard-coded for W-9 becomes data-driven.
- **Related forms:** wire cross-links (W-9 ↔ W-4 ↔ I-9; NDA ↔ existing NDA-adjacent forms).

## 3. PDF renderers — `src/lib/pdf/generateFormPdf.ts`

Add three template-specific renderers (following `renderW9`):
- **`renderI9`:** Two-page layout mimicking Section 1 + Section 2 structure (labeled boxes, checked attestation, document tables). "Edition 01/20/25 — Expires 05/31/2027" in header. Footer disclaimer: not an official USCIS form; sign the official PDF from uscis.gov.
- **`renderW4`:** 2026 layout — heading "Form W-4 (2026) — Employee's Withholding Certificate," 5 numbered step blocks, computed dependent-credit total, footer disclaimer.
- **`renderNda`:** Professional agreement layout — title, party recitals, numbered sections (Definitions, Obligations, Exclusions, Term, Return, Remedies, Governing Law, Miscellaneous), signature blocks (2 columns).

All three reuse `wrapText`, `drawWatermark`, `formatDate`, `formatSsn`, and the `str()` helper.

## 4. Homepage + navigation

- Add I-9, W-4, NDA to the featured cards on `FeaturedFormsSection` (currently W-9-heavy).
- Forms Hub `/forms` already lists everything from `legalForms` — new forms show automatically once added to the array.

## 5. Stripe checkout — status note

Stripe is **not yet enabled** (per Sprint foundation prompt; `handleCheckout` currently toasts "coming soon"). This build keeps that behavior: free watermarked PDFs work end-to-end for all three forms today. Paid clean PDFs are wired through the same `PdfActionBar` → when Stripe is enabled and a `form_purchases` row exists, the clean PDF unlocks — no code changes needed here. If you want the Stripe flow live now, I'll surface the built-in Stripe Payments enable step as a follow-up (separate approval).

## 6. QA before wrap-up

- Type-check via automatic build.
- Manually walk each wizard: draft autosave, resume from LocalStorage, conditional field logic (I-9 attestation option 3/4; W-4 Step 2 branches; NDA mutual vs one-way).
- Generate both watermarked and clean PDFs for each form and eyeball layout.

## Technical section

**Files to create:** none — all three forms live in existing files.

**Files to edit:**
- `src/data/forms.ts` — append three `LegalFormDef` entries, extend `FormStepDef` with optional `showWhen`, extend `LegalFormDef` with optional `officialLink`.
- `src/lib/pdf/generateFormPdf.ts` — three new `renderI9`, `renderW4`, `renderNda` functions + template switch.
- `src/pages/FormWizardPage.tsx` — read `officialLink` for the disclaimer callout; skip hidden steps in progress counter.
- `src/components/forms/FormField.tsx` — optional tooltip icon.
- `src/components/home/FeaturedFormsSection.tsx` — ensure the three new forms surface.

**No DB or route changes:** `FormWizardPage` already handles any slug in `legalForms`; `form_drafts` / `form_purchases` already keyed by `form_slug`.

**Deliverable at end:** summary of the three forms plus a short "how to add form #N" recipe (append to `legalForms`, add renderer branch, add cross-links).

Ready to build on approval.
