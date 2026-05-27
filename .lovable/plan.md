# Phase B9 — Region-Tier Pages

Insert a regional hub between country and city: `/{locale?}/lawyer-eu/{country}/region/{region}`. Each page covers one Bundesland / région / comunidad autónoma / regione / distrito, lists the cities inside it, links to the country's practice areas with regional context, and surfaces the regional bar chamber + court of appeal where applicable.

## URL shape

```
/lawyer-eu/{country}/region/{region}                # new
/lawyer-eu/{country}/region/{region}/{city}         # optional — new
```

Use the `region/` namespace segment to avoid collision with the existing `/{country}/{area}` route (`area` and `region` slugs would otherwise be ambiguous). The namespace segment is the literal string `"region"` in English; localised to `region`/`région`/`regione`/`região` per locale.

The existing `/{country}/{area}/{city}` city route stays untouched. The new `/{country}/region/{region}/{city}` route is an **optional** second URL for the same listings — defer if scope creeps. Recommended: ship just the region hub in B9, push the region-city URL to B9.5.

## Scope

```text
DE  16 Bundesländer       (Baden-Württemberg, Bayern, … Thüringen)
FR  18 régions            (Auvergne-Rhône-Alpes, … Mayotte; or 13 metropolitan only)
ES  17 comunidades autónomas (Andalucía, … La Rioja)
IT  20 regioni            (Abruzzo, … Veneto)
PT   7 regiões NUTS-II    (Norte, Centro, Lisboa, Alentejo, Algarve, Açores, Madeira)
                          ── 78 region pages × 6 locales = 468 indexable URLs ──
```

Recommendation: PT uses the 7 NUTS-II regiões (matches how Portuguese users navigate), not the 18 distritos.

## Data layer

1. **New `src/data/eu/regions.ts`** with `EuRegion` entries:
   ```ts
   interface EuRegion {
     canonical: string;              // ascii english slug, unique within country
     country: EuCountryCode;
     name: Record<LocaleCode, string>;
     slug: Record<LocaleCode, string>;
     capital: string;                // city canonical, for "regional capital" link
     barChamber?: { name: string; url: string };  // e.g. Rechtsanwaltskammer München
     courtOfAppeal?: string;         // e.g. "Cour d'appel de Paris"
   }
   ```
   Helpers: `euRegionsForCountry(code)`, `getEuRegion(country, canonical)`, `euRegionForCity(country, cityCanonical)`.

2. **Extend `EuCity`** with `region?: string` (canonical region slug). Populate for every existing city in `cities.ts` so region pages have content from day one.

3. **Region intro copy** lives in `src/data/eu/regionIntros.ts` — 2-3 sentence localised blurb per region (capital, courts, headline industries). Authored in English + the country's native language; uses the **same B8 translation pipeline** to fan out to the 4 remaining locales. Generator runs as `bun scripts/translate-regions.mjs` (sibling of `translate-country-pillars.mjs`, sharing the Lovable→Gemini fallback wrapper).

## Routing

1. `slugRegistry.ts` — `EuRouteCanonical` gains an optional `region?: string`. `resolveEuRoute` accepts a `region` URL param and returns `null` if the route shape is country+region but no match; `buildEuPath` emits `/{country-slug}/{region-namespace}/{region-slug}` when `canonical.region` is set. Per-locale namespace map: `{ en: "region", fr: "region", de: "region", es: "region", it: "regione", pt: "regiao" }`.

2. `AppRoutes.tsx` adds:
   ```tsx
   <Route path="/lawyer-eu/:country/region/:region" element={<EuLawyersRegionPage />} />
   ```
   (and the i18n-prefixed variant the existing routes use). The literal `region` segment is matched in code by trying English first, then falling back to the locale-specific word — same pattern the locale resolver already uses.

3. Backward compat: existing area URLs (`/lawyer-eu/de/arbeitsrecht`) are unaffected because the second segment is namespaced.

## New page: `EuLawyersRegionPage.tsx`

Sections:
- **Breadcrumbs** Home › Find a Lawyer › {Country} › {Region}.
- **`EuLawyerHead`** with localised title `Lawyers in {Region}, {Country}` and meta description from `regionIntros`.
- **Bar disclaimer** via existing `BarDisclaimerNotice`.
- **Hero intro** (2-3 sentences from `regionIntros`), capital + court of appeal + bar chamber chip.
- **Cities grid** — every `euCity` whose `region` matches, grouped by tier (reusing the B7 tier grouping from `EuLawyersCountryPage`). City cards link to the existing `/{country}/{area}/{city}` URL using the country's most-common practice area as the default deep link (we already have `euAreasForCountry`).
- **Practice areas** — same area grid as country page, but each link carries `?region={canonical}` for analytics; no separate area-by-region route in B9.
- **Back to country** link.

JSON-LD:
- `BreadcrumbList` (4 levels)
- `Place` schema for the region (parent of country, contains city `Place` items)
- `ItemList` of cities

## Country page wiring

- Add a **"Regions"** section above the existing cities grid on `EuLawyersCountryPage`, listing the region cards 2-up. Cities grid below stays as-is for users who want the flat list.
- Footer's `European Legal Guides` column stays at country level — no per-region links.

## Sitemap

- `supabase/functions/generate-sitemap/index.ts` — add `EU_REGION_SLUGS` table mirroring the data file, emit one localised tuple per (country, region) via the existing `uLEu` helper. ~78 × 6 = 468 new `<url>` entries; fits in the existing EU sitemap shard.
- Keep changefreq `monthly`, priority `0.6` (between country `0.8` and city `0.7`).

## i18n

Add to `src/i18n/locales/{en,de,fr,es,it,pt}/eu-lawyer.json`:
- `region.metaTitle`, `region.metaDescription`
- `region.heading`, `region.capital`, `region.barChamber`, `region.courtOfAppeal`
- `region.citiesIn`, `region.backToCountry`
- `country.regions` heading for the new country-page section
- `breadcrumbs.region` (unused in chain but kept for consistency)

## Files

**New**
- `src/data/eu/regions.ts`
- `src/data/eu/regionIntros.ts`
- `src/pages/eu/EuLawyersRegionPage.tsx`
- `scripts/translate-regions.mjs` (thin wrapper that imports the gateway+gemini helper from `translate-country-pillars.mjs`)

**Edited**
- `src/data/eu/cities.ts` (add `region` to every entry)
- `src/data/eu/slugRegistry.ts` (region param, namespace map)
- `src/AppRoutes.tsx` (region route)
- `src/pages/eu/EuLawyersCountryPage.tsx` (regions section)
- `src/components/eu/CountryPillarSections.tsx` (no change unless we want a region mention)
- `supabase/functions/generate-sitemap/index.ts` (region slugs + emission)
- `src/i18n/locales/*/eu-lawyer.json` (region strings, 6 files)
- `.lovable/plan.md`

## Out of scope (deferred)

- `/{country}/region/{region}/{city}` — second URL for cities through region path. Skip unless the SEO data shows duplicate-content risk is worth it.
- `/{country}/{area}/region/{region}` area-within-region pages.
- Per-region lawyer listings beyond what cities already carry.

## Risk

- Region slugs collide with future content if not namespaced — solved by literal `region/` segment.
- 78 regions × ~120 words each ≈ 10K English tokens, 40K translated tokens — well within the Gemini free-tier daily quota now that the pipeline supports it.
- Existing area routes must keep working; verify with a smoke test that `/lawyer-eu/de/arbeitsrecht` still resolves after adding the region route.

---

## B9 — Shipped

- 73 regions across FR (13), DE (16), ES (17), IT (20), PT (7) with name+slug per 6 locales, capital, court of appeal, and (where relevant) bar chamber.
- New route `/lawyer-eu/{country}/region/{region}` (literal `region` segment, ordered before the area route).
- `EuLawyersRegionPage` with breadcrumbs, region intro (English baseline + a few native-language drafts; falls back to English with a notice), capital/court/bar chamber cards, cities grid linking back through the default practice area, practice-area grid with `?region=` analytics tag.
- Country page now lists Regions above the cities grid.
- Sitemap edge function emits 73 region URLs × 6 locales (~438 new entries) with full hreflang alternates.
- i18n strings added to all 6 `eu-lawyer.json` files.
- Type-check passes.

Deferred (B9.5+): `/region/{region}/{city}` second URL for cities; Gemini fan-out of `regionIntros` to the remaining 5 locales using the B8 pipeline.
