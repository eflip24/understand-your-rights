

# Expand City Coverage to All 50 States

## Current State

- 50 states defined in `stateData.ts`
- 78 cities across 49 states in `cityData.ts` (New Jersey is the only state with zero cities)
- 30 states have only 1 city each — these need 1-2 more cities for better coverage
- `lawyerListings.ts` has entries for existing cities and needs entries for all new cities

## What Changes

### 1. `src/data/locations/cityData.ts`
- Add New Jersey cities (Newark, Jersey City)
- Add 1-2 additional cities to each of the ~30 states that currently only have 1 city
- Target: ~50 new city entries, bringing the total from 78 to ~130
- Each entry includes: name, slug, state, lat/lng, courthouse (name, address, coordinates, phone, website), population

### 2. `src/data/locations/lawyerListings.ts`
- Add 2-3 law firm listings for each new city (~100-150 new entries)
- Each entry includes: name, address, lat/lng, phone, website, practiceAreas array, description

## Scope Summary

| File | Change |
|---|---|
| `src/data/locations/cityData.ts` | Add ~50 new city entries |
| `src/data/locations/lawyerListings.ts` | Add ~100-150 new lawyer listings for new cities |

No UI or routing changes needed — the existing dynamic routing and components already handle new data automatically.

## Priority Cities to Add

States getting their first city: New Jersey (Newark, Jersey City)

States getting additional cities (currently 1 each): e.g. Alaska (+Fairbanks), Alabama (+Huntsville), Colorado (+Colorado Springs), Connecticut (+Hartford), Georgia (+Savannah), Illinois (+Springfield), Indiana (+Fort Wayne), Massachusetts (+Worcester), Michigan (+Grand Rapids), etc.

