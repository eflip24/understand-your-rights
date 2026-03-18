

# Scale Local Lawyers to 1,000+ City Pages with Maps & State-Specific Legal Data

## Scope

Add a dynamic `/local-lawyers/:area/:state/:city` route system with:
- State-specific legal data (statutes of limitations, negligence rules, courthouse info)
- City data with coordinates and courthouse addresses for 80+ high-value cities
- OpenStreetMap integration via React-Leaflet (lazy-loaded)
- Dynamic content templates that avoid duplicate content
- LocalBusiness JSON-LD and breadcrumb structured data
- Sitemap expansion

## Architecture

### 1. Data Layer — `src/data/locations/`

**`src/data/locations/stateData.ts`** — Legal variables per state:
```typescript
interface StateLegalData {
  name: string;
  slug: string;
  abbreviation: string;
  personalInjurySOL: string;  // e.g. "2 years"
  propertyDamageSOL: string;
  negligenceRule: "pure comparative" | "modified comparative (50%)" | "modified comparative (51%)" | "contributory";
  minAutoInsurance: string;
  noFault: boolean;
}
```
All 50 states with accurate legal data.

**`src/data/locations/cityData.ts`** — Top ~80 cities with coordinates and courthouse:
```typescript
interface CityData {
  name: string;
  slug: string;
  state: string;        // state slug
  lat: number;
  lng: number;
  courthouse: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  population?: number;
}
```
Priority cities: those from the geo-targeting strategy (Baton Rouge, Corpus Christi, St. Louis, Provo, etc.) plus top-50 US cities by population.

### 2. New Pages

**`src/pages/LocalLawyersCityPage.tsx`** — The city-level page with 3 content sections:

- **Section 1 — Local Context**: "Filing a {practice-area} claim in {City} requires understanding {State} law. The statute of limitations is {SOL}. {State} follows {negligenceRule} negligence rules."
- **Section 2 — Local Legal Directory**: Courthouse name, address, and lazy-loaded OpenStreetMap centered on courthouse coordinates with a marker.
- **Section 3 — Interactive**: Embedded `SettlementEstimator` component (the existing one doesn't have a state dropdown to pre-set, so we'll add an optional `defaultState` prop).

**Update `src/pages/LocalLawyersAreaPage.tsx`** — Make state cards link to `/local-lawyers/:area/:state` which lists available cities for that state.

**`src/pages/LocalLawyersStatePage.tsx`** — State-level page listing cities for a practice area in that state, with state-specific legal summary.

### 3. Map Component

**`src/components/maps/LocalMap.tsx`** — React-Leaflet component:
- Install `react-leaflet` and `leaflet` packages
- Centers on courthouse coordinates
- Single marker with popup showing courthouse name/address
- Lazy-loaded via `React.lazy()` to protect LCP

### 4. Routes (add to App.tsx)

```
/local-lawyers/:area/:state       → LocalLawyersStatePage
/local-lawyers/:area/:state/:city → LocalLawyersCityPage
```

### 5. SEO & Schema

- `LocalBusiness` JSON-LD on city pages (courthouse as the local entity)
- `BreadcrumbList`: Home > Local Lawyers > {Practice Area} > {State} > {City}
- `Head` component with title template: `{Practice Area} Lawyers in {City}, {State} | LegallySpoken`
- Meta description: `Find {practice area} lawyers in {City}, {State}. {State} statute of limitations: {SOL}. Free local courthouse info and settlement calculator.`

### 6. Sitemap Update

Add state and city permutations to the edge function. For 12 practice areas × 50 states = 600 state pages, plus 12 × 80 cities = ~960 city pages. We'll generate these from hardcoded arrays in the edge function.

### 7. Performance

- `LocalMap` loaded via `React.lazy` + `Suspense` with a skeleton placeholder
- Leaflet CSS loaded only when map renders
- City data file is a flat array (~80 entries), not heavy

## Files to Create
| File | Purpose |
|---|---|
| `src/data/locations/stateData.ts` | 50-state legal variables |
| `src/data/locations/cityData.ts` | ~80 cities with coords + courthouses |
| `src/components/maps/LocalMap.tsx` | React-Leaflet map component |
| `src/pages/LocalLawyersStatePage.tsx` | State-level practice area page |
| `src/pages/LocalLawyersCityPage.tsx` | City-level page with map + calculator |

## Files to Edit
| File | Change |
|---|---|
| `package.json` | Add `react-leaflet`, `leaflet`, `@types/leaflet` |
| `src/App.tsx` | Add 2 new routes |
| `src/pages/LocalLawyersAreaPage.tsx` | Make state cards link to state sub-pages |
| `src/components/seo/JsonLd.tsx` | Add `localBusinessSchema` helper |
| `supabase/functions/generate-sitemap/index.ts` | Add state/city URL permutations |

