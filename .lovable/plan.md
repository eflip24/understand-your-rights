
# Multilingual + European Expansion Plan

Two parallel tracks. Track A makes the site indexable in many languages worldwide. Track B builds a Europe-focused lawyer directory and EU-specific legal content. Both share the same i18n foundation, so Track A's Phase 1–2 must land before Track B's content scales.

---

## Track A — Multilingual SEO Site

### Languages (proposed launch set)
Tier 1 (highest ROI): English (default), Spanish, French, German, Portuguese, Italian.
Tier 2 (next wave): Dutch, Polish, Romanian, Swedish, Greek, Czech.
Tier 3 (global): Japanese, Korean, Arabic (RTL), Hindi, Indonesian, Turkish.

We launch Tier 1 first, validate, then expand.

### URL strategy: subdirectory with locale prefix
`legallyspoken.com/{lang}/...`, e.g. `/es/tools/family/child-support`.
English stays at root (`/tools/...`) **or** moves to `/en/...` with a 301. Recommend keeping English at root to preserve existing rankings, and adding 301s only for non-English bots that hit a path without a prefix.

Why subdirectory (not subdomain or ccTLD): consolidates domain authority, simplest hosting, avoids per-country SSL/DNS sprawl, fits Lovable infra.

### Phase A1 — i18n foundation (no visible change yet)
- Add `react-i18next` + `i18next-browser-languagedetector`.
- Create `src/i18n/` with namespaces: `common`, `nav`, `tools`, `legal`, `seo`.
- Wrap app in `I18nextProvider`; add `<html lang>` updater hook.
- Add `LocaleRoute` wrapper around `<Routes>`: route prefix `/:lang(en|es|fr|de|pt|it)?/...` resolves locale, falls back to English.
- Persist user choice in `localStorage`; auto-detect on first visit via `Accept-Language`, never override an explicit choice.
- Build a `<LangSwitcher />` in `Navbar` and `Footer`.

### Phase A2 — SEO plumbing per locale
- Extend `src/components/seo/Head.tsx`:
  - Emit `hreflang` alternates for every supported locale + `x-default`.
  - Localized `<title>`, `<meta description>`, `og:locale`, `og:locale:alternate`.
  - Canonical points to the current locale URL (not the English one).
- Update sitemap edge function `supabase/functions/generate-sitemap/index.ts`:
  - One `<url>` per (route × locale) with `<xhtml:link rel="alternate" hreflang="...">` blocks.
  - Add a per-language sitemap shard: `?type=tools&lang=es` etc., listed in `sitemap.xml` index.
- `public/robots.txt`: keep allow-all; add `Sitemap:` lines for each language shard if we shard.
- `index.html`: leave the static head minimal; locale-specific tags are injected by `Head.tsx` on every route.
- JSON-LD: pass `inLanguage` on Article/FAQ/HowTo schemas in `JsonLd.tsx`.

### Phase A3 — UI string translation (chrome only)
- Extract all hard-coded English UI strings from layout, navbar, footer, buttons, form labels into `common.json` per locale.
- Translate Tier 1 chrome with a professional translator or DeepL/GPT-5 + human QA. Never ship raw machine translation for a legal site without review.
- Add RTL-ready CSS hooks (`dir="rtl"` on `<html>` for Arabic in Tier 3).

### Phase A4 — Content translation strategy
Three content classes, each with its own pipeline:

1. **Tools (calculators / generators)** — UI labels + FAQs translated; calculation logic stays. State-specific tools stay US-only and are *hidden* from non-en locales (or shown with a banner: "US-specific tool").
2. **Legal terms / clauses / contract types** (`src/data/legalTerms.ts`, etc.) — translate definitions; add `translations: { es: {...}, fr: {...} }` field per entry. Keep English as source of truth.
3. **Blog + pillar/cluster articles** — high effort. Two options:
   - **Manual**: human translators for top 20 articles per locale.
   - **AI-assisted**: extend `supabase/functions/generate-blog-article` to produce a localized version using Gemini 2.5 Pro, stored as a sibling row keyed by `(slug, locale)`. Always include a "Translated with AI, reviewed by editor" disclosure for E-E-A-T.

Database change: add `locale TEXT NOT NULL DEFAULT 'en'` to blog post tables; unique key on `(slug, locale)`.

### Phase A5 — Search Console + analytics
- Submit each language sitemap shard to Google Search Console as a separate property or via the index.
- Add hreflang validation pass (Screaming Frog or Ahrefs) before announcing.
- Track per-locale CTR / impressions; prune locales that don't gain traction after 90 days.

### Phase A6 — Tier 2/3 rollout
Repeat A3–A5 per language. RTL audit for Arabic. Locale-aware date / currency formatting via `Intl`.

---

## Track B — European Lawyer Directory

The current `/lawyer-near-me` directory is US-only (states + cities in `src/data/locations/`). Europe needs a parallel structure because legal systems, bar associations, and language differ per country.

### Phase B1 — Information architecture
New route tree, mounted alongside the US one:

```
/eu/lawyers                                  → European directory home
/eu/lawyers/:practice                        → e.g. /eu/lawyers/personal-injury
/eu/lawyers/:practice/:country               → /eu/lawyers/personal-injury/de
/eu/lawyers/:practice/:country/:region       → /eu/lawyers/personal-injury/de/bayern
/eu/lawyers/:practice/:country/:region/:city → .../de/bayern/munich
```

Localized variants resolve via the same `/:lang` prefix from Track A:
`/de/eu/lawyers/personal-injury/de/bayern/munich`.

Country list (launch): DE, FR, ES, IT, NL, PL, PT, BE, AT, IE, SE, DK, FI, GR, CZ, RO. Add UK as a separate non-EU group (`/uk/lawyers/...`) because of post-Brexit divergence.

### Phase B2 — Country & region data
Create `src/data/locations/eu/`:
- `countryData.ts` — ISO code, name in English + native, official languages, legal system family (civil law / common law / mixed), bar association URL, regulator, court structure summary.
- `regionData.ts` — NUTS-2 regions (Bundesländer, régions, comunidades autónomas, etc.).
- `cityData.ts` — top 20 cities per country by population.
- `lawyerListings.ts` — start with curated/aggregated listings (same static pattern as US). Source from public bar registries where licensing permits.

Practice areas adapted for EU: personal injury, employment, immigration, GDPR/data protection, consumer rights, family, real estate, criminal defense, tax. (Some US categories like "lemon law" don't exist in EU; replace with EU equivalents.)

### Phase B3 — Country-level legal content (E-E-A-T moat)
For each country, build pillar pages mirroring the US pillar pattern (`src/data/autoAccidentLaw.ts` etc.):
- "Personal injury claims in Germany" — limitation periods, fault rules, typical compensation, court process.
- "GDPR rights for consumers" (pan-EU pillar at `/eu/gdpr-rights`).
- "Employment rights in France" — notice periods, severance (indemnités), unfair dismissal.

Reuse the existing `PillarPage` / `ClusterArticlePage` components; new data files in `src/data/eu/`.

Each country pillar gets translated into that country's primary language(s) via Track A's pipeline.

### Phase B4 — Schema & SEO per listing
- `LocalBusinessAttorney` JSON-LD per listing with `address`, `areaServed` (country code), `availableLanguage`.
- `BreadcrumbList` reflects EU hierarchy (Country → Region → City).
- hreflang on every directory page across all supported languages of that country (e.g. Belgium gets `nl-BE`, `fr-BE`, `de-BE`, plus `en` and `x-default`).
- Add country to sitemap shards: `?type=eu-lawyers&country=de`.

### Phase B5 — Compliance (critical for EU)
This is non-negotiable for a legal site operating in the EU:
- **GDPR**: existing cookie consent (`CookieConsent.tsx`) must block AdSense + analytics until opt-in for EU IPs. Verify it's compliant with TCF v2.2 if we keep AdSense — Google requires a certified CMP for EU traffic. Cookiebot / Didomi / Osano are common drop-ins.
- **Lawyer directory disclaimers per country**: many bar associations restrict how lawyers can be listed/advertised (e.g. Germany's BRAO, France's RIN). Add a per-country disclaimer block and an opt-out / claim-listing flow.
- **Imprint / Impressum**: Germany and Austria legally require an `/impressum` page. Add per-country legal pages route: `/eu/:country/impressum`, `/eu/:country/legal-notice`.
- **AI disclosures**: EU AI Act transparency — label AI-generated content clearly (already partially done; extend to translations and chat).
- **Accessibility**: EU Accessibility Act (June 2025) — run an axe-core audit and fix WCAG 2.1 AA violations.

### Phase B6 — Lawyer claim & verification flow
- New table `lawyer_listings` (id, country, region, city, practice, name, firm, bar_id, languages[], verified, claimed_by_user_id, contact, ...).
- Edge function for "Claim this listing" with email verification to a domain matching the firm.
- Admin moderation UI in `/admin/listings`.
- This unlocks future monetization (sponsored placement, lead gen) without changing routes.

---

## Cross-cutting technical notes

- **Routing**: prefix `/:lang?` at the top of `App.tsx` Routes; every existing route remains valid at root for English and at `/{lang}/...` for others.
- **No SSR**: react-helmet-async + client-rendered hreflang is enough for Googlebot (it executes JS), but social preview crawlers (LinkedIn, Slack) only see the static `index.html`. Per-locale OG previews on social will be approximate. Acceptable trade-off; SSR migration is out of scope.
- **Sitemap**: keep the existing edge-function sitemap-index pattern; add `lang` query param to each shard generator.
- **AdSense**: AdSense is allowed in all Tier 1/2 languages. Re-verify compliance after launch — Google may re-review when traffic shifts to new locales.
- **Database**: only two schema changes needed (blog `locale` column, new `lawyer_listings` table). Everything else is static data files.
- **Performance**: lazy-load locale JSON bundles via `i18next` http backend so we don't ship all languages to every visitor.

---

## Suggested sequencing

```
Month 1:  A1, A2                      (i18n + SEO plumbing, English only still visible)
Month 2:  A3 + A4 for Tier 1 chrome   (6 languages of UI live)
Month 3:  B1, B2                      (EU directory skeleton, English content)
Month 4:  B3 (top 4 countries) + A4 translations of those pillars
Month 5:  B4, B5 (schema + GDPR/Impressum compliance)
Month 6:  B6 (claim flow) + A6 Tier 2 languages
```

## Open questions before we start

1. Keep English at `/` or move to `/en/`? (Recommend keep at `/`.)
2. Translation budget: human translators, AI-assisted with editor review, or pure AI? This drives A3/A4 timeline more than anything else.
3. Launch country priority for B3 — recommend DE, FR, ES, IT first (largest legal markets).
4. Are we okay swapping the current cookie banner for a Google-certified CMP (Cookiebot / Didomi) to keep AdSense compliant in EU? Required for B5.
