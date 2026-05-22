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

## Phase B2 — Translations & national city coverage ✅

- **Translations**: `eu-lawyer.json` translated into es/fr/de/pt/it (hub title,
  intro, browse, comingSoon, practiceAreas, cities, disclaimer). English file
  unchanged.
- **Cities**: `cities.ts` expanded from 15 seed entries → **145 cities**
  (FR 30, DE 30, ES 30, IT 30, PT 25) via a `city()` constructor that defaults
  all locales to the canonical English name + ASCII slug, with per-locale
  overrides only where the name materially differs (Munich/München, Naples/
  Napoli, Seville/Sevilla, Cologne/Köln, etc.). Population tier set per city.
- All entries flow through existing `resolveEuRoute` / `buildEuPath` and the
  `lawyers-eu-i18n` sitemap shard with no further changes — sitemap URL count
  grows automatically.

## Phase B3 — Templates, JSON-LD, FAQ, map ✅

- **i18n schema expanded** in `eu-lawyer.json` (hub/country/area/city sections,
  metaTitle/metaDescription, FAQ entries with {{country}}/{{area}}/{{city}}
  Mustache placeholders). EN authored, AI-translated to es/fr/de/pt/it via the
  AI gateway with JSON validation + fence stripping.
- **slugRegistry**: `EuRouteCanonical.country` now optional → hub canonical
  builds to `/{locale?}/lawyer-eu` cleanly; `resolveEuRoute` returns `{}` for
  the hub.
- **Hub**: BreadcrumbList + ItemList(countries) JSON-LD, i18n strings, indexable.
- **Country**: BreadcrumbList + ItemList(areas) JSON-LD, areas linked, cities
  shown with primary-tier badge, indexable.
- **Area**: BreadcrumbList + ItemList(cities) + FAQPage JSON-LD with 3 Q/A
  using Accordion UI, cities linked, indexable.
- **City**: BreadcrumbList + per-listing LegalService JSON-LD + FAQPage,
  lazy-loaded LocalMap centered on city coords with markers per listing,
  empty-state card when listings absent, bar-association reference.

### Next phase

- **B4**: Populate `lawyerListings.eu.ts` per city (hand-curated, mirroring US
  listings shape); seed a handful per major metro to validate the LocalBusiness
  JSON-LD chain end-to-end.
