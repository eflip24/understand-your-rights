## Batch 7: Country-Specific Deep-Dive Forms

Move beyond generic EU templates into country-native forms — the language, statutory references, and structure users actually search for in DE/FR/ES/IT/NL/PL. These target long-tail, high-intent, low-competition keywords ("Arbeitsvertrag Vorlage", "modèle CDI", "contrato de arrendamiento").

## Forms in this batch (8)

| # | Form | Country | URL | Primary keyword |
|---|---|---|---|---|
| 1 | Arbeitsvertrag (unbefristet) | 🇩🇪 DE | `/eu-forms/de/arbeitsvertrag` | Arbeitsvertrag Vorlage |
| 2 | Kündigung Arbeitsvertrag | 🇩🇪 DE | `/eu-forms/de/kuendigung-arbeitsvertrag` | Kündigung Vorlage |
| 3 | Contrat CDI (Contrat à durée indéterminée) | 🇫🇷 FR | `/eu-forms/fr/contrat-cdi` | modèle contrat CDI |
| 4 | Contrat de bail d'habitation (loi ALUR) | 🇫🇷 FR | `/eu-forms/fr/contrat-bail` | contrat de bail gratuit |
| 5 | Contrato de arrendamiento de vivienda (LAU) | 🇪🇸 ES | `/eu-forms/es/contrato-arrendamiento` | contrato arrendamiento vivienda |
| 6 | Contratto di locazione ad uso abitativo | 🇮🇹 IT | `/eu-forms/it/contratto-locazione` | contratto di locazione |
| 7 | Arbeidsovereenkomst (bepaalde tijd) | 🇳🇱 NL | `/eu-forms/nl/arbeidsovereenkomst` | arbeidsovereenkomst voorbeeld |
| 8 | Umowa o pracę | 🇵🇱 PL | `/eu-forms/pl/umowa-o-prace` | umowa o pracę wzór |

Each form uses native-language field labels, statutory references (BGB, Code du travail, Estatuto de los Trabajadores, Legge 431/98, BW 7:610, Kodeks pracy), and country-correct defaults (notice periods, deposit caps, trial periods).

## Approach

**Reuse, don't rebuild.** The existing `FormWizardPage` + `useFormDraft` + `generateFormPdf` foundation handles multi-step wizards, autosave, dashboard integration, watermarked free PDF, Stripe clean PDF, and disclaimers. This batch just adds data + light routing.

**New country-scoped subroute.** Add `/eu-forms/:country/:slug` alongside the existing `/eu-forms/:slug`. Country is one of `de|fr|es|it|nl|pl`. `FormWizardPage` resolves by (country, slug) when both are present.

## Files to create/change

- **`src/data/euCountryForms.ts`** (new) — the 8 form defs. Each carries `country`, `nativeLanguage`, statutory references, and native-language step + field labels. Reuses the existing `LegalFormDef` shape.
- **`src/data/euForms.ts`** — export a merged `allEuForms` array so the hub and lookup helpers see both generic + country forms.
- **`src/pages/FormWizardPage.tsx`** — accept optional `:country` param; look up in `allEuForms`; render `Home > EU Forms > {Country} > {Form}` breadcrumb.
- **`src/AppRoutes.tsx`** — add `<Route path="/eu-forms/:country/:slug" element={<FormWizardPage />} />`.
- **`src/pages/EuFormsHubPage.tsx`** — add a "By country" section below the existing grid, with 6 country tiles (flag + count) linking to anchored sections; render country forms grouped by flag.
- **`src/data/formRelationships.ts`** — cross-link each country form to its generic EU equivalent (e.g. `de/arbeitsvertrag` ↔ `eu-employment-contract`) so the existing `RelatedForms` component surfaces a "Generic EU version" chip.
- **`src/components/forms/PdfActionBar.tsx`** / **`generateFormPdf.ts`** — no changes; already generic.
- **`supabase/functions/generate-sitemap/index.ts`** — emit the 8 new `/eu-forms/{country}/{slug}` URLs. Redeploy.
- **SEO** — per-form title/description in native language + English subtitle (e.g. "Arbeitsvertrag Vorlage kostenlos (2026) — Free German Employment Contract Template"). JSON-LD HowTo/FAQ inherited from `FormWizardPage`.

## Country-specific logic examples

- **DE Arbeitsvertrag** — Probezeit (0/1/3/6 months), Kündigungsfrist calc from BGB §622, tarifgebunden yes/no branch.
- **FR Contrat de bail** — dépôt de garantie cap (1 month unfurnished, 2 furnished), loi Pinel/ALUR notice, préavis 1 vs 3 mois branch.
- **ES Contrato de arrendamiento** — fianza (1 month vivienda, 2 uso distinto), duración mínima 5/7 años per LAU 2019.
- **IT Contratto di locazione** — 4+4 libero vs 3+2 concordato branch, cedolare secca opt-in.
- **PL Umowa o pracę** — okres próbny/określony/nieokreślony branch, wynagrodzenie minimalne default.

## Pricing

Reuse existing `form_prices` table default ($14.99 clean PDF). You can override per-form in `/admin/prices` after ship.

## Out of scope (name the batch to trigger)

- Country company-formation docs (GmbH, SARL, SRL) — Batch 8 candidate
- VAT/tax filing helpers — Batch 9 candidate
- Privacy Policy / Cookie Consent generators — separate tool, not a form

Approve and I'll ship all 8.