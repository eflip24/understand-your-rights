# EU Forms + Internal Linking & SEO Plan

Two-phase build: ship the cross-cutting linking/SEO layer first (benefits all existing US forms immediately), then launch the EU Forms section with Batch 5.

## Phase 1 — Internal Linking + SEO Foundation

**Related Forms component**
- `src/components/forms/RelatedForms.tsx` — reusable card grid with title, blurb, price chip, CTA. Accepts explicit slugs OR auto-derives from category/tags.
- `src/data/formRelationships.ts` — map of `formSlug → related[]` (curated where it matters, fallback to same-category).
- Mount on: `FormWizardPage`, `FormSeoLandingPage`, `FormsHubPage`, EU hub, and blog post template (via existing related-content slot).

**SEO polish across form routes**
- Extend `formSeoLandings.ts` / wizard metadata with: keyword-rich `<title>` (≤60), `<meta description>` (≤160), H1 alignment, `lastUpdated` timestamp shown in UI and in JSON-LD `dateModified`.
- Ensure every form/landing emits Breadcrumb JSON-LD + visible breadcrumbs (reuse existing `Breadcrumbs` component; add where missing).
- Add strong bottom CTA block ("Start free → pay only to download clean PDF") on all form pages.
- Sitemap: confirm all form + landing + EU routes emitted with `lastmod`.

**Keyword targets** (applied to titles/descriptions/H2s, informed by search intent — e.g. "free GDPR consent form EU template", "EU employment contract template PDF", "14 day withdrawal form EU", "VAT invoice template Europe").

## Phase 2 — European Forms Section

**Navigation & routing**
- Navbar: add "EU Forms" top-level link (desktop + mobile).
- Footer: EU Forms column.
- Routes: `/eu-forms` (hub), `/eu-forms/:slug` (wizards), `/eu-forms/:slug/:country` (country fan-out later).

**Data layer**
- `src/data/euForms.ts` — categories: Employment & HR, Data Protection & GDPR, Consumer Rights & Contracts, Company & Business Formation, Real Estate & Rental, Personal & Family, Tax & VAT.
- Country selector component (`EUCountrySelector.tsx`) with DE, FR, ES, IT, NL, IE, BE, PT, PL, SE + generic EU fallback. Drives locale-aware defaults (currency €, date format, jurisdiction clause).

**EU Hub page (`/eu-forms`)**
- Distinct EU hero (subtle EU-blue accent, not a flag), search, category tiles, country chooser strip, trust strip ("GDPR-aware templates, plain-English"), disclaimer that these are templates not legal advice for any specific member state.
- Featured: Batch 5 forms + "New" badges.

**Batch 5 — 8 EU starter forms** (wizard + free preview PDF + paid clean PDF; priced via existing `form_prices` admin):
1. GDPR Data Processing Agreement (Controller ↔ Processor, Art. 28 clauses)
2. GDPR Consent Form (purposes, withdrawal, data categories)
3. EU Employment Contract Template (Directive 2019/1152 transparent working conditions fields)
4. Right to be Forgotten Request Letter (Art. 17)
5. EU Power of Attorney (general/financial, generic EU)
6. Consumer Withdrawal Form (14-day cooling-off, Directive 2011/83/EU Annex I)
7. Simple VAT Invoice (multi-country, VAT number, reverse-charge toggle)
8. NDA — EU version with GDPR clauses

Each form gets:
- Wizard using existing `FormWizard` infra + autosave + e-signature.
- Country selector where meaningful (Employment, POA, Invoice, NDA).
- SEO landing entry in `formSeoLandings` style with FAQ + HowTo JSON-LD.
- `RelatedForms` block linking to sibling EU forms and, where useful, US analogs (e.g. EU NDA ↔ US NDA) with a clear "US equivalent" label so jurisdictions don't blur.

**Separation guardrails (SEO + UX)**
- No mixing of US and EU forms in the same category grid.
- EU pages use `/eu-forms/*` slugs only; canonical + og:url self-reference.
- Cross-links between US and EU only via explicit "US equivalent / EU equivalent" callouts, not in default related lists.

**Sitemap + cross-linking**
- `generate-sitemap` edge function: add EU hub + 8 EU form routes.
- FormsHubPage: add a "Working with EU parties? See EU Forms →" strip (single entry point, not merged).
- Blog: linkify GDPR / EU employment / VAT mentions to matching EU forms via existing `linkifyLegalContent`.

## Delivery order
1. Phase 1 (RelatedForms component, relationships map, SEO polish, breadcrumbs, lastUpdated).
2. EU navigation + `/eu-forms` hub + `euForms.ts` + country selector.
3. Batch 5 forms in two sub-batches of 4 (GDPR set first, then Employment/Commerce set).
4. Sitemap + cross-links + QA pass.

## Out of scope (later batches, confirmed)
Country-specific rental agreements, company formation documents, data breach notification templates, per-country deep fan-out (DE/FR/ES/IT/NL).

**Confirm to proceed and I'll start with Phase 1 (linking + SEO), then ship the EU hub and GDPR set of Batch 5 first.**