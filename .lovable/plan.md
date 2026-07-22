
## EU Form Packs — 4 bundled wizards

Build four EU-region packs using the existing `formPacks.ts` foundation and the existing `FormPackWizardPage.tsx` flow (which already handles shared fields, country selectors via per-form `__euCountry`, watermarked vs. clean ZIP, Stripe checkout, dashboard save).

### Packs

**1. GDPR & Data Protection Pack** — `/eu-forms/gdpr-pack` — **$44**
- GDPR DPA *(existing)*
- GDPR Consent Form *(existing)*
- Right to be Forgotten Request *(existing)*
- **NEW:** Data Subject Access Request (DSAR) Letter — GDPR Art. 15
- **NEW:** Data Breach Notification Template — GDPR Art. 33/34
- **NEW:** Privacy Policy Template (basic) — Art. 13/14 disclosures

**2. EU Employment & Freelance Pack** — `/eu-forms/employment-pack` — **$39**
- EU Employment Contract *(existing)*
- EU NDA *(existing, with GDPR clauses noted)*
- **NEW:** Freelance / Self-Employed Service Contract
- **NEW:** Independent Contractor Agreement (EU version, IR35/false self-employment safe wording)
- **NEW:** Director Appointment Letter

**3. EU Business Starter Pack** — `/eu-forms/business-starter-pack` — **$44**
- EU VAT Invoice *(existing)*
- Director Appointment *(reused from Employment pack)*
- **NEW:** Simple Service / Consulting Agreement
- **NEW:** IP Assignment Agreement
- **NEW:** Basic Shareholder Agreement (simple)
- **NEW:** Demand / Collection Letter (EU)

**4. EU Personal & Consumer Pack** — `/eu-forms/personal-pack` — **$34**
- EU Power of Attorney *(existing)*
- 14-Day Consumer Withdrawal Form *(existing)*
- **NEW:** Consumer Complaint Letter
- **NEW:** EU Rental / Tenancy Agreement (basic)
- **NEW:** Simple Will (basic EU version)

### Implementation

**Step 1 — Extend types**
- `formPacks.ts`: add `"gdpr"` to `FormPack.category` union (and any pack rendering that keys off it, e.g. `FormPackCard`), plus optional `region?: "us" | "eu"` so the US Forms Hub can filter EU packs out and the EU Hub can list them.
- `AppRoutes.tsx`: mount `FormPackWizardPage` under `/eu-forms/:slug` in addition to the existing `/forms/:slug`. `FormPackWizardPage` already resolves purely by slug, so no page-level changes needed beyond breadcrumb copy.

**Step 2 — Add 12 new EU forms to `src/data/euForms.ts`**
All use `pdfTemplate: "generic"` (same renderer that ships the existing 8 EU forms). Each includes the shared `countryField` in step 1 so the pack's country auto-fills. Statute references go in `note` blocks so they land in both the wizard UI and the PDF:
- DSAR — Art. 15 GDPR
- Data Breach Notification — Art. 33 (supervisory authority) / Art. 34 (data subject); 72-hour trigger
- Privacy Policy — Art. 13/14 disclosures + lawful basis + rights list
- Freelance Contract — deliverables, milestones, ownership, VAT status
- EU Independent Contractor — genuine self-employment factors, no employment relationship, IP assignment
- Director Appointment Letter — role, powers, remuneration, D&O
- Simple Service / Consulting Agreement — SOW, fees, VAT, limitation of liability
- IP Assignment — full assignment of copyright + moral rights waiver where permitted
- Basic Shareholder Agreement — share split, transfer restrictions, tag/drag light
- EU Demand Letter — statutory late-payment interest (Directive 2011/7/EU) for B2B
- Consumer Complaint Letter — Consumer Rights Directive references, ADR/ODR pointer
- EU Rental Agreement — parties, property, rent, deposit, term, notice
- Simple Will — testator, executor, beneficiaries, notarisation warning per country

**Step 3 — Register 4 packs in `formPacks.ts`**
Each pack: `region: "eu"`, appropriate `category`, `sharedFields` grouped as steps. Shared fields for the GDPR pack: controller name/address, DPO contact, country. Employment pack: employer, employee/freelancer name+address, start date, role, pay. Business pack: business name/address, VAT ID, formation country, signer. Personal pack: your name, address, DOB, country, agent name/address.

Each pack `disclaimer` reminds that EU rules (notarisation, will formalities, employment carve-outs, VAT rates) vary by member state.

**Step 4 — Surface on EU Forms Hub**
- `EuFormsHubPage.tsx`: add a "Form Packs" section above the individual forms grid, listing the 4 packs with `FormPackCard` (already used on the US hub). Filter `formPacks` to `region === "eu"`.

**Step 5 — Sitemap + navigation**
- `generate-sitemap/index.ts`: add the 4 pack URLs and the 12 new EU form slugs.
- Deploy the sitemap edge function.

### Technical details

- Wizard: reuse `FormPackWizardPage.tsx` verbatim. It already reads `slug` from `useParams` and calls `getPackBySlug`, so routing under `/eu-forms/:slug` requires no wizard changes; only the breadcrumb "Forms" label conditionally becomes "EU Forms" when `region === "eu"`.
- PDFs: all 12 new forms use the generic renderer (label/value + `note` blocks), matching the existing 8 EU forms.
- Pricing: pack rows in the `form_prices` table are consulted server-side by `create-form-checkout`. After deploy, seed the 4 pack slugs into `form_prices` (USD amounts above) via the admin `/admin/prices` page or a one-off insert — pack checkout otherwise falls back to the client `priceUsd` for display only.
- Dashboard: existing `MyFormsSection.tsx` lists any document with `kind: "pack"` — no change needed.
- Cross-linking / SEO: covered by follow-up prompts; scope of this plan is the 4 packs + 12 forms only.

### Out of scope (do next, per user's roadmap)
- Blog posts supporting each pack
- Country-specific pack fan-outs (Germany, France, Spain, Italy)
- Cross-links between matching US ↔ EU packs (e.g. New Hire ↔ EU Employment)
