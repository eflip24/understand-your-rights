# Plan: Forms Batch — 6 forms via 3 new builds + 3 slug aliases

Three of the six requested forms were shipped in the previous batch under slightly different slugs (`power-of-attorney`, `residential-lease`, `bill-of-sale`). Rather than duplicate them, alias those routes to the new SEO-friendly URLs the prompt specifies, and build the three genuinely new forms.

## Slug aliasing (3 existing forms)

Update these entries in `src/data/forms.ts` so they live at the new canonical URLs:

| Current slug | New canonical slug |
|---|---|
| `power-of-attorney` | `power-of-attorney-financial` |
| `residential-lease` | `residential-lease-agreement` |
| `bill-of-sale` | `vehicle-bill-of-sale` |

In `FormWizardPage.tsx`, add a small `SLUG_ALIASES` map and 301-style client redirect (`<Navigate replace>`) from each old slug to the new one so existing links, dashboard rows, and any indexed URLs keep working. Titles/descriptions get a light SEO polish to include the new slug words ("Vehicle Bill of Sale", "Residential Lease Agreement", "Financial Power of Attorney").

Bill of Sale is currently multi-type (vehicle / boat / general). Keep the existing conditional step 2 but rename the page + hero to "Vehicle Bill of Sale (also works for boats & general property)" so we win the higher-CPC "vehicle bill of sale" query without losing the other variants.

Homepage `FeaturedFormsSection` and any hard-coded internal links updated to the new slugs.

## Three new forms

### 1. Demand Letter / Collection Letter — `/forms/demand-letter`
- **Title:** "Free Demand Letter Template — Pre-Litigation Collection Letter"
- **Description:** Formal written demand for payment or performance before filing suit. Widely used for unpaid invoices, security-deposit disputes, breach of contract.
- **Steps (5):**
  1. **Letter type:** Radio — Unpaid invoice / debt · Breach of contract · Security deposit return · Property damage · Other. Drives copy in later steps via `showWhen`.
  2. **Sender (you):** Name, address, phone, email, whether sending as individual or business (entity name + role).
  3. **Recipient (debtor):** Name, address, optional attorney-of-record.
  4. **The dispute:** Amount owed ($), original due date, description of goods/services or contract breached, list of prior attempts to collect (dates + method), interest rate if any, itemized damages textarea.
  5. **Demand & deadline:** Days to respond (7 / 10 / 14 / 30), payment method(s) accepted, consequences if ignored (checkboxes: file suit, report to credit bureau where lawful, refer to collections, seek attorney's fees where contract allows), FDCPA acknowledgment checkbox (auto-shown only for consumer-debt collectors), state governing law, sign-and-date.
- **Renderer:** Professional business-letter layout — sender block top-left, date, recipient block, RE line, body with numbered paragraphs, signature block. Footer disclaimer.

### 2. Promissory Note (Loan Agreement) — `/forms/promissory-note`
- **Title:** "Free Promissory Note Template — Loan Agreement Between Individuals"
- **Description:** Binding written promise from a borrower to repay a fixed sum. Covers secured/unsecured, installment/lump-sum, with/without interest.
- **Steps (6):**
  1. **Parties:** Lender name + address + entity type · Borrower name + address + entity type.
  2. **Loan basics:** Principal ($), disbursement date, purpose (optional), governing state.
  3. **Interest:** Interest type radio (None / Simple / Compound), APR%, compounding frequency (`showWhen` compound), state usury-limit note rendered informationally when APR > 10%.
  4. **Repayment terms:** Structure radio — (a) Lump sum on date, (b) Installments (frequency dropdown: weekly / bi-weekly / monthly / quarterly · payment amount · first payment date · number of payments), (c) On demand. Auto-compute total interest + total to be repaid + amortization summary rendered as help text.
  5. **Default & security:** Grace period (days), late fee (flat $ or % — same pattern as Lease), acceleration-on-default checkbox (default checked), prepayment allowed without penalty (checkbox), collateral radio — Unsecured / Secured (secured branch: collateral description, UCC-1 filing acknowledgment).
  6. **Signatures:** Borrower signature/date, Lender signature/date, optional co-signer block (name + address + signature + date), notary block (optional toggle).
- **Renderer:** Formal "PROMISSORY NOTE" heading, numbered sections (Principal & Interest, Repayment, Default, Acceleration, Prepayment, Governing Law, Waiver of Presentment, Severability, Entire Agreement), signature blocks. Footer disclaimer with usury-law warning.

### 3. Release of Liability / Waiver — `/forms/release-of-liability`
- **Title:** "Free Release of Liability Waiver — General & Activity-Specific"
- **Description:** Pre-activity or post-incident waiver in which one party releases another from claims arising out of specified activities or an incident.
- **Steps (5):**
  1. **Waiver type:** Radio — General activity waiver (pre-event) · Event/venue waiver · Vehicle/equipment use · Post-incident settlement release · Fitness/sports/recreation.
  2. **Releasee (the party being released):** Name, address, entity type, description of business/activity.
  3. **Releasor (the person waiving claims):** Name, address, DOB, phone, emergency contact name + phone. If under 18 → conditional parent/guardian fields (`showWhen`).
  4. **Activity / incident details:** Activity description (or incident date + description for post-incident), location, date(s), known risks textarea (pre-filled with reasonable defaults keyed to waiver type), consideration paid ($), governing state.
  5. **Acknowledgments & signature:** Required checkboxes (each renders as a numbered acknowledgment in the PDF):
     - I have read and understand this Release.
     - I voluntarily assume all risks.
     - I release, waive, and discharge the Releasee from all claims.
     - I agree to indemnify and hold harmless the Releasee.
     - Governed by the laws of [state].
     Typed signature + date, optional witness name + signature + date, minor-signatory block auto-shown when Releasor DOB < 18.
- **Renderer:** Bold ALL-CAPS "RELEASE OF LIABILITY, WAIVER OF CLAIMS, AND ASSUMPTION OF RISK" header, recitals, numbered clauses matching the acknowledgment checkboxes, signature blocks. Heavy disclaimer — some states (LA, VA, MT) restrict pre-injury waivers; recommend attorney review.

## Reusable infrastructure — small upgrades

- **Slug alias map + client redirect** in `FormWizardPage.tsx` — 5-line addition, benefits any future rename.
- **`renderBusinessLetter` helper** inside `generateFormPdf.ts` (letterhead-style layout) for Demand Letter; reusable by any future letter-format form.
- **`renderNumberedAgreement` helper** for Promissory Note + Release of Liability — both are numbered-clause legal agreements and can share a lightweight section renderer sitting on top of the existing `buildDoc`.

No new tables. No route file changes beyond the alias map. Dashboard "My Forms" and `form_drafts` / `form_purchases` continue to key off `form_slug` — existing draft rows for the three renamed forms will still resolve because the alias map runs before the wizard mounts.

## Technical section

**Files to edit:**
- `src/data/forms.ts` — rename 3 slugs, polish 3 titles/descriptions, append 3 new `LegalFormDef`s, extend `PdfTemplate` with `demandLetter` · `promissoryNote` · `releaseOfLiability`, wire `relatedForms` cross-links (Demand Letter ↔ Promissory Note ↔ Release; Lease ↔ POA ↔ Bill of Sale; Release ↔ NDA).
- `src/lib/pdf/generateFormPdf.ts` — add `SLUG_ALIASES` awareness isn't needed here; add `renderDemandLetter`, `renderPromissoryNote`, `renderReleaseOfLiability`, plus `renderBusinessLetter` and `renderNumberedAgreement` helpers; add switch cases.
- `src/pages/FormWizardPage.tsx` — add `SLUG_ALIASES` map + `<Navigate replace>` when the URL matches an old slug.
- `src/components/home/FeaturedFormsSection.tsx` — surface the 3 new forms and update any hard-coded slugs.

**No DB changes. No new routes.** All 9 forms in the system remain served by the existing `/forms/:slug` route.

**QA before wrap-up:** type-check, walk each new wizard (conditional logic for minors in Release; installment math in Promissory Note; FDCPA branch in Demand Letter), generate watermarked + clean PDFs for each, and confirm the 3 aliased URLs redirect cleanly.

**Deliverable at the end:** summary of the 6 forms as they appear on the hub, plus which existing forms were renamed to the new slugs.

Ready to build on approval.
