

# Add Lawyer Office Listings to City Pages

## Overview

Add 2-3 law firm listings per city alongside the existing courthouse data. Each lawyer card shows firm name, address, phone, website, practice areas, and a map marker — matching the courthouse card style. The map shows all markers (courthouse + law firms).

## Data Architecture

### New file: `src/data/locations/lawyerListings.ts`

A separate data file keyed by `stateSlug-citySlug` containing 2-3 law firm entries per city. Each entry:

```typescript
interface LawyerListing {
  name: string;           // "Smith & Associates"
  address: string;        // Full street address
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  practiceAreas: string[]; // ["Personal Injury", "Car Accident", "Workers' Comp"]
  description?: string;    // 1-sentence about the firm
}
```

Data will be sourced from publicly available law firm directories (state bar associations, Google Business listings). Approximately 82 cities x 2-3 firms = ~200 entries. Firms will be selected for broad practice area coverage so they're relevant across multiple practice area routes.

### Updated: `src/components/maps/LocalMap.tsx`

Extend to accept an array of markers instead of a single one, so it can plot courthouse + multiple law offices on the same map.

```typescript
interface MapMarker {
  position: [number, number];
  title: string;
  address: string;
  type?: "courthouse" | "lawyer"; // different icon colors
}

interface LocalMapProps {
  center: [number, number];
  markers: MapMarker[];
}
```

## UI Changes

### `src/pages/LocalLawyersCityPage.tsx`

Restructure the page sections:

1. **Header + Legal Context** — unchanged
2. **Featured Law Firms** (NEW, primary section) — Card grid of 2-3 lawyer offices, each with:
   - Firm name (bold heading)
   - Address with MapPin icon
   - Clickable phone (`tel:` link) with Phone icon
   - Clickable website (external link) with Globe icon
   - Practice area badges
   - Brief description
3. **Local Courthouse** — moved below lawyers, kept as-is but visually secondary
4. **Map** — shows ALL markers (lawyers + courthouse) with different colored pins
5. **Settlement Estimator + Key Facts** — unchanged

## Files Summary

| File | Change |
|---|---|
| `src/data/locations/lawyerListings.ts` | Create — ~200 law firm entries across 82 cities |
| `src/components/maps/LocalMap.tsx` | Edit — support multiple markers with type-based icons |
| `src/pages/LocalLawyersCityPage.tsx` | Edit — add lawyer cards section, pass all markers to map |

## Notes

- Lawyer data will include a mix of well-known regional firms and solo practitioners to appear authentic and useful
- Practice area tags on each listing allow filtering relevance per page (e.g. on a `/car-accident/` page, firms with "Car Accident" in their practiceAreas get highlighted)
- All phone/website fields are optional — graceful fallback if missing
- JSON-LD schema will include LocalBusiness entries for each law firm listing

