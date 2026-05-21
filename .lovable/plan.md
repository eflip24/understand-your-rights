## Phase B1 — Information Architecture: European Lawyer Directory ✅

Foundation for EU5 lawyer directory (FR, DE, ES, IT, PT) — URL shape, data
registries, routing, and sitemap shard. Page templates and listings come in B2+.

### Implementation deviations from plan

- **URL base**: shipped as `/lawyer-eu/...` for all locales (locale-prefixed as
  `/{locale}/lawyer-eu/...`) instead of `/{locale}/lawyer/...`. Reason: the
  React Router dual-mount in `App.tsx` requires a single shared route tree, so
  the base segment must be identical across locales. **Country, area, and
  city segments ARE localized per locale** as planned — only the base
  ("lawyer-eu") is fixed.
- **Stub pages are noindex** in B1 (banner suppressed since UI shell is
  translated). Will be flipped to index in B3 once templates and content land.

### Shipped

**Data (`src/data/eu/`)**
- `countries.ts` — EU5 with per-locale name + slug + bar-association URL
- `practiceAreas.ts` — 12 shared canonical areas with per-locale slug + `availableIn` flags
- `cities.ts` — 3 cities per country (15 total) with per-locale slugs + lat/lng
- `slugRegistry.ts` — `resolveEuRoute()`, `buildEuPath()`, `buildEuPathsByLocale()`
- `lawyerListings.eu.ts` — empty `Record<string, EuLawyerListing[]>` keyed by `{country}-{citySlug}`

**Routing & pages**
- `src/AppRoutes.tsx` — 4 new routes: `/lawyer-eu`, `/:country`, `/:country/:area`, `/:country/:area/:city`
- `src/pages/eu/EuLawyersHub.tsx`, `EuLawyersCountryPage.tsx`, `EuLawyersAreaPage.tsx`, `EuLawyersCityPage.tsx` (stubs)
- `src/components/seo/EuLawyerHead.tsx` — Head with localized-path hreflang
- `src/components/seo/SmartEuLawyerLink.tsx` — cross-link card scaffold

**i18n**
- `src/i18n/locales/{en,es,fr,de,pt,it}/eu-lawyer.json` (English defaults; AI translations in B2)
- `src/i18n/config.ts` — `eu-lawyer` namespace registered

**Sitemap (`supabase/functions/generate-sitemap/index.ts`)**
- New `buildLawyersEuI18n()` shard emitting 6 locale URLs per tuple with localized hreflang alternates
- Registered as `"lawyers-eu-i18n"` in sitemap index and dispatch
- US `lawyers` shard untouched

**Footer**: added "Find a Lawyer (Europe)" link under Resources.

### Verified

- `/lawyer-eu` and `/fr/lawyer-eu/france/droit-du-travail/paris` resolve via
  `resolveEuRoute("fr", { country: "france", area: "droit-du-travail", city: "paris" })`
  → canonical `{ country: "fr", area: "employment", city: "paris" }`.
- `curl …/generate-sitemap?type=lawyers-eu-i18n` returns valid `<urlset>` with
  localized `<xhtml:link>` alternates for every `(hub | country | area | city)` tuple.
- Sitemap index now references `lawyers-eu-i18n` alongside existing shards.
- US `/lawyer-near-me/*` routes and `lawyers` shard unchanged.

### Next phases

- **B2**: AI-translate `eu-lawyer.json` strings; expand `cities.ts` to full national coverage.
- **B3**: Replace page stubs with real templates (country directory, area pages with FAQ schema, city pages with LocalBusiness JSON-LD, map embed).
- **B4**: Populate `lawyerListings.eu.ts` per city; flip noindex off.
