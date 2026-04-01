

# Add Phone Numbers and Website URLs to Courthouse Data

## Overview

Add phone number and website fields to every courthouse entry across all 82 cities in the lawyer directory. Display them as clickable links on the city pages.

## Data Changes

### `src/data/locations/cityData.ts`

- Extend the `courthouse` interface with two optional fields:
  ```typescript
  courthouse: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    phone?: string;    // e.g. "(602) 506-3204"
    website?: string;  // e.g. "https://superiorcourt.maricopa.gov"
  }
  ```
- Populate `phone` and `website` for all 82 city entries using publicly available courthouse contact information (official government websites and public records)

## UI Changes

### `src/pages/LocalLawyersCityPage.tsx`

In the "Local Courthouse" section (the card that shows courthouse name and address), add:
- **Phone**: Displayed as a clickable `tel:` link with a `Phone` Lucide icon
- **Website**: Displayed as a clickable external link (opens new tab) with a `Globe` Lucide icon
- Only rendered when the data exists (graceful fallback for any entries without info)

## Scope

| File | Change |
|---|---|
| `src/data/locations/cityData.ts` | Add `phone?` and `website?` to interface + populate all 82 entries |
| `src/pages/LocalLawyersCityPage.tsx` | Render phone and website links in courthouse card |

## Data sourcing

Phone numbers and websites will be sourced from official state/county court websites. All courthouses in the dataset are real government buildings with publicly listed contact information. Any entries where reliable data cannot be confirmed will have the fields omitted (the UI handles missing data gracefully).

