## Phase B1 — Information Architecture: European Lawyer Directory

Lay down the **structural foundation** for a European lawyer directory in EU5 (FR, DE, ES, IT, PT). No listing data, no live pages yet — this phase defines URL shape, data schema, slug registries, routing, and sitemap integration so subsequent phases (B2 data seed, B3 page templates, B4 listings) can plug in cleanly.

### 1. URL shape (locale-prefixed parallel tree)

```text
/{locale}/lawyer/{country}/                       directory landing for country
/{locale}/lawyer/{country}/{area}/                area within country
/{locale}/lawyer/{country}/{area}/{city}/         city × area listing page
/{locale}/lawyer/                                 EU directory hub
```

- `locale` ∈ `fr | de | es | it | pt` (plus `en` un-prefixed as canonical).
- `country` slug is **localized per locale** (`france` / `frankreich` / `francia` / `francia` / `frança`). A registry maps canonical country code → per-locale slug.
- `area` and `city` slugs are also localized per locale. Canonical English slug stored alongside as the join key for hreflang.
- English canonical (`en`) lives at `/lawyer-eu/...` (separate from existing US `/lawyer-near-me/...` tree) to avoid namespace collisions and keep US Tier-3 untouched.

### 2. Data model (TypeScript, hand-curated under `src/data/eu/`)

```text
src/data/eu/
  countries.ts           Country[] — code, default locale, currency, bar-association URL, slug map
  practiceAreas.ts       EuPracticeArea[] — canonical English slug + i18n key + per-country availability flags
  cities.ts              CityRecord[] — country code, canonical slug, lat/lng, population tier
  slugRegistry.ts        Per-locale slug ↔ canonical resolver (used by router + sitemap)
  lawyerListings.eu.ts   Record<"{countryCode}-{citySlug}", EuLawyerListing[]> (empty in B1)
```

**Shared practice-area taxonomy** (canonical English keys, ~12 entries):
`employment`, `family`, `criminal-defense`, `personal-injury`, `immigration`, `tax`, `real-estate`, `contract`, `consumer`, `intellectual-property`, `data-protection-gdpr`, `business`.

Each entry carries `availableIn: CountryCode[]` so a country can opt out of an area that doesn't translate (e.g. exclude US-style `workers-compensation`).

Translations for area names/descriptions live in a new namespace `src/i18n/locales/{locale}/eu-lawyer.json` (added empty in B1 with English defaults; AI-translated in B2).

### 3. Routing (`src/AppRoutes.tsx`)

Four new lazy-loaded routes, gated on the locale segment via the existing `LocaleSync` machinery:

```text
/:locale/lawyer                              -> EuLawyersHub
/:locale/lawyer/:country                     -> EuLawyersCountryPage
/:locale/lawyer/:country/:area               -> EuLawyersAreaPage
/:locale/lawyer/:country/:area/:city         -> EuLawyersCityPage
```

Plus English canonicals without prefix:
```text
/lawyer-eu, /lawyer-eu/:country, /lawyer-eu/:country/:area, /lawyer-eu/:country/:area/:city
```

In B1 these route to **stub page components** that render `<Tier3Head>`+`<EnglishOnlyBanner>`-style scaffolding and a "Coming soon" body. Real templates land in B3.

A small `resolveEuRoute(locale, params)` helper in `src/lib/eu/resolveRoute.ts` translates localized slugs → canonical keys for data lookup and emits the correct cross-locale alternates.

### 4. Slug & locale rules

- Canonical slug source of truth = English (`countries.ts`, `practiceAreas.ts`, `cities.ts`).
- Per-locale slugs declared inline on each record (`slug: { en, fr, de, es, it, pt }`).
- 404 if a `(locale, country, area, city)` tuple doesn't resolve.
- 301 from any legacy/mis-cased path to the canonical lowercase slug.
- Hreflang alternates emitted only between the 6 locale variants of the **same canonical tuple** (Tier-1 behavior, matching existing core-i18n shard).

### 5. Sitemap integration (`supabase/functions/generate-sitemap/index.ts`)

Add a new shard **`lawyers-eu-i18n`** that emits, for each `(country, area, city)` tuple in the registry, all 6 locale URLs with `<xhtml:link rel="alternate" hreflang="...">` cross-references. Register `"lawyers-eu-i18n"` in `sitemapIndex()` `types`. Do **not** touch existing `lawyers` (US) shard.

Country/area/hub pages also added, with the same hreflang treatment.

### 6. Cross-linking & nav

- Footer gets a new "Find a Lawyer (Europe)" link → `/{locale}/lawyer`.
- Existing `SmartLocalLink` stays US-only; a sibling `SmartEuLawyerLink` is scaffolded (no usages wired in B1).
- Locale switcher already handled by `buildLocaleUrl` — verify it round-trips localized country/area/city slugs via `resolveEuRoute`.

### 7. Out of scope for B1

- Actual listings data (empty maps shipped, populated in B4).
- Page UI/content (stubs only; full templates in B3).
- AI translations of area names (B2).
- Country-specific extensions to taxonomy (deferred; B1 ships shared core only).
- Reviews, claims, admin CRUD.

### Files touched

**Create:**
- `src/data/eu/countries.ts`, `practiceAreas.ts`, `cities.ts`, `slugRegistry.ts`, `lawyerListings.eu.ts`
- `src/lib/eu/resolveRoute.ts`
- `src/pages/eu/EuLawyersHub.tsx`, `EuLawyersCountryPage.tsx`, `EuLawyersAreaPage.tsx`, `EuLawyersCityPage.tsx` (stubs)
- `src/components/seo/SmartEuLawyerLink.tsx` (scaffold)
- `src/i18n/locales/{en,es,fr,de,it,pt}/eu-lawyer.json` (English defaults in B1)

**Edit:**
- `src/AppRoutes.tsx` — register 8 new routes (4 prefixed + 4 EN-canonical)
- `src/i18n/config.ts` — add `eu-lawyer` namespace
- `src/components/layout/Footer.tsx` — EU directory link
- `supabase/functions/generate-sitemap/index.ts` — add `buildLawyersEuI18n` + index entry
- `.lovable/plan.md`

### Acceptance criteria

- Navigating to `/fr/lawyer/france/droit-du-travail/paris` renders the stub page with correct breadcrumbs, hreflang `<link>`s to the 5 sibling locales, and a canonical pointing at the FR URL.
- `resolveEuRoute("de", { country: "frankreich", area: "arbeitsrecht", city: "paris" })` returns canonical `{ country: "fr", area: "employment", city: "paris" }`.
- `curl …/generate-sitemap?type=lawyers-eu-i18n` returns a valid `<urlset>` with `<xhtml:link>` alternates per tuple.
- Existing US `/lawyer-near-me/*` routes and `lawyers` sitemap shard are byte-identical to before B1.
- TypeScript build passes; no runtime errors on any of the 8 new routes.
