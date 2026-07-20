
# Plan: Forms Batch 3 — POA, Residential Lease, Bill of Sale, Eviction Notice

Build on the existing foundation (`FormWizardPage`, `useFormDraft`, `MyFormsSection`, `PdfActionBar`, `generateFormPdf`, `form_drafts` / `form_purchases`, and the `showWhen` conditional-field pattern used by W-9 / I-9 / W-4 / NDA). No routing, DB, or Stripe changes needed — all four forms are new entries in `legalForms` plus new PDF renderers.

## 1. Data layer — `src/data/forms.ts`

Append four `LegalFormDef` entries and extend `PdfTemplate` union with `poa`, `lease`, `billOfSale`, `evictionNotice`.

### Power of Attorney (Financial) — `/forms/power-of-attorney`
- **Title:** "Free Power of Attorney Form Online — Financial POA Generator"
- **Steps (6):**
  1. **Principal** — full legal name, address, DOB, phone.
  2. **Agent (attorney-in-fact)** — name, address, phone, relationship; optional "Add successor/alternate agent" toggle → alt-agent name/address/phone.
  3. **Powers granted** — multi-select checkboxes (Real estate, Banking/finances, Business operations, Insurance & annuities, Estate/trust, Claims & litigation, Personal & family maintenance, Benefits from govt programs, Retirement plans, Tax matters, Gift-giving) + a free-text "Custom powers" box + optional "Grant all listed powers" master toggle.
  4. **Effective date & duration** — radio: *Effective immediately (Durable)* vs *Springing on physician-certified incapacity*. Optional termination date. Durability acknowledgment note.
  5. **Governing law & special instructions** — US state (governing law), optional textarea for limitations/instructions.
  6. **Signatures & notary** — principal typed signature + date; two witness fields (name + address); notary acknowledgment block (placeholder — signer must sign in wet ink before a notary).

### Simple Residential Lease Agreement — `/forms/residential-lease`
- **Title:** "Free Residential Lease Agreement Template — Landlord & Tenant"
- **Steps (7):**
  1. **Parties** — landlord name/entity + address; tenant(s) — repeatable list (2 slots by default, "Add tenant" up to 4).
  2. **Property** — full address, unit #, description (bedrooms/baths/parking/furnished radio).
  3. **Term & rent** — start date, end date (or month-to-month radio → auto-hide end date), monthly rent, due day of month, first-payment date; late fee (flat $ or % + grace days). *Auto-computed:* total base rent for the term, prorated first-month if start date ≠ 1st.
  4. **Security deposit** — amount, held-in-trust jurisdiction note; optional last-month rent field.
  5. **Utilities & maintenance** — checklist of who pays what (electricity, gas, water, trash, internet, lawn/snow) with radio landlord/tenant/split; appliances included checklist.
  6. **Rules & restrictions** — pets (none/allowed with deposit/allowed no deposit → pet deposit $), smoking, guests, subletting, quiet hours textarea.
  7. **Termination, default & signatures** — notice period (days), default cure period, governing state; landlord + tenant signature blocks + dates.

### Bill of Sale (General) — `/forms/bill-of-sale`
- **Title:** "Free Bill of Sale Form — Vehicle & General Property"
- **Steps (5):**
  1. **Sale type** — radio: *Vehicle* / *Boat* / *General personal property*. Drives conditional fields below.
  2. **Seller** — name, address, phone, driver's license # (optional).
  3. **Buyer** — name, address, phone, driver's license # (optional).
  4. **Item description** — conditional via `showWhen` on sale type:
     - Vehicle → Year, Make, Model, Body/Trim, VIN, Odometer reading, Odometer disclosure radio (Actual / Exceeds mechanical limits / Not the actual mileage), Title #, License plate.
     - Boat → Make, Model, Year, HIN, Length, Registration #.
     - General → free-text description + serial # (optional).
  5. **Sale terms & signatures** — sale price, payment method (cash/check/cashier's check/other), date of sale, warranty radio (*As-is, no warranty* / *Limited warranty* → textarea), place of sale (city/state); seller + buyer signatures + dates; optional notary block.

### Eviction Notice — `/forms/eviction-notice`
- **Title:** "Free Eviction Notice Generator — State-Specific"
- **Steps (5):**
  1. **State selector** — US state dropdown (all 50 + DC). Auto-detect focused-state rule pack for the top 10: CA, NY, TX, FL, IL, WA, MA, GA, PA, OH. For other states, use a documented generic fallback with a callout: "We don't yet have state-specific timing for {state}. Verify local statute before serving."
  2. **Landlord & Tenant** — landlord name, business (optional), address, phone; tenant name(s), current rental address.
  3. **Reason for eviction** — radio: *Non-payment of rent* / *Lease violation (curable)* / *Lease violation (non-curable/material)* / *End of tenancy / No-fault termination* / *Illegal activity or nuisance*. Conditional fields:
     - Non-payment → amount past due, period covered, late fees itemized, total demanded.
     - Lease violation → description of violation, lease clause referenced, cure action required.
     - End of tenancy → tenancy type (month-to-month / fixed-term ending).
  4. **Notice period & deadline** — **Auto-computed** from state × reason using a `STATE_EVICTION_RULES` map keyed by state (mirrors `EvictionNoticeLookup`'s data, expanded to 10 states + generic default). Fields: date of notice, computed vacate-by date (calendar vs business days per state), editable override + "manual override" flag captured in PDF.
  5. **Delivery, signature & certificate of service** — method of service (personal / posting + mail / certified mail / substituted), server name, server signature, date; jurat/certificate-of-service block.

Include a plain callout at the top of the wizard: **"State laws vary — timelines below reflect general rules as of {form.lastUpdated}. Verify with a landlord-tenant attorney before serving."**

## 2. Small template enhancements (optional)

Everything already exists. Two tiny touch-ups only if needed:
- Add `officialLink` where meaningful (e.g. state landlord-tenant statute portal for eviction if a canonical link is easy — otherwise omit).
- The current wizard already handles `showWhen` for fields, conditional visibility, autosave, and step counter — no changes required.

## 3. PDF renderers — `src/lib/pdf/generateFormPdf.ts`

Add four template-specific renderers alongside `renderW9` / `renderI9` / `renderW4` / `renderNda`:

- **`renderPoa`** — professional agreement layout: title "GENERAL DURABLE POWER OF ATTORNEY (FINANCIAL)", recitals identifying principal + agent + successor, numbered sections (1. Appointment, 2. Powers Granted — bulleted list of selected powers + custom, 3. Effective Date & Durability, 4. Governing Law, 5. Special Instructions, 6. Revocation), signature block, witness blocks, notary acknowledgment.
- **`renderLease`** — heading "RESIDENTIAL LEASE AGREEMENT", numbered sections (Parties, Premises, Term, Rent, Security Deposit, Utilities, Maintenance, Rules, Default, Notices, Governing Law, Entire Agreement), computed totals table, signature blocks (2 columns landlord/tenant, repeat per tenant).
- **`renderBillOfSale`** — heading "BILL OF SALE", "WHEREAS" recitals naming buyer + seller, item description block (vehicle table when applicable with odometer disclosure per federal 49 CFR § 580), consideration paragraph, warranty paragraph (as-is vs limited), signature blocks + optional notary.
- **`renderEvictionNotice`** — top-of-page notice title driven by reason (e.g., "NOTICE TO PAY RENT OR QUIT" / "NOTICE TO CURE OR QUIT" / "NOTICE OF TERMINATION OF TENANCY"), state + statute reference line ("Served pursuant to {state} landlord-tenant law"), tenant address block, body paragraph (auto-generated from reason + amounts), vacate-by date in bold, certificate-of-service block at bottom.

All four reuse existing helpers (`wrapText`, `drawWatermark`, `formatDate`, `str()`).

## 4. Data helpers — new file `src/data/evictionStateRules.ts`

Small typed lookup used by both the wizard (to preview / compute the deadline) and the PDF renderer:

```ts
export interface EvictionStateRule {
  nonpayment: { days: number; unit: "calendar" | "business"; noticeName: string };
  curableViolation: { days: number; unit: "calendar" | "business"; noticeName: string };
  nonCurable: { days: number; unit: "calendar" | "business"; noticeName: string };
  endOfTenancy: { days: number; unit: "calendar" | "business"; noticeName: string };
  illegal: { days: number; unit: "calendar" | "business"; noticeName: string };
  statuteRef?: string;
}
export const STATE_EVICTION_RULES: Record<string, EvictionStateRule> = { /* CA, NY, TX, FL, IL, WA, MA, GA, PA, OH + DEFAULT */ };
```

## 5. Homepage + Forms Hub

`/forms` already renders everything in `legalForms` automatically. Featured cards on the home page will be updated to include Lease + POA (both broadly searched).

## 6. QA before wrap-up

- Automatic type-check on build.
- Walk each wizard: autosave, resume, conditional logic (Bill of Sale sale-type; Eviction reason-branching; Lease month-to-month toggle hides end-date).
- Generate watermarked + clean PDFs for each and eyeball layout.

## Technical section

**Files to create**
- `src/data/evictionStateRules.ts` — state rule lookup + computed deadline helper.

**Files to edit**
- `src/data/forms.ts` — 4 new `LegalFormDef` entries; extend `PdfTemplate` union.
- `src/lib/pdf/generateFormPdf.ts` — 4 new renderers + template switch cases.
- `src/components/home/FeaturedFormsSection.tsx` — surface POA + Lease.

**No changes needed**
- Routing (`FormWizardPage` already handles any slug), auth, `form_drafts` / `form_purchases`, Stripe wiring, `FormField`, or `PdfActionBar`.

**Stripe status:** unchanged — free watermarked PDFs work today for all 4 new forms; clean PDFs unlock automatically once Stripe is enabled (separate approval).

**Deliverable at end:** short summary of the four forms + a "how to add form #N" recipe (append to `legalForms`, add renderer branch, cross-link).

Ready to build on approval.
