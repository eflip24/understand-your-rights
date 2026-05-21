/**
 * EU lawyer listings (Phase B1).
 * Keyed by `"{countryCode}-{citySlugCanonical}"`. Empty in B1 — populated in B4.
 */

import type { EuCountryCode } from "./countries";
import type { EuAreaCanonicalSlug } from "./practiceAreas";

export interface EuLawyerListing {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  /** Canonical area slugs the firm handles. */
  practiceAreas: EuAreaCanonicalSlug[];
  description?: string;
  /** Bar registration number for verification. */
  barNumber?: string;
}

export const euLawyerListings: Record<string, EuLawyerListing[]> = {};

export function listingsForCity(country: EuCountryCode, citySlug: string): EuLawyerListing[] {
  return euLawyerListings[`${country}-${citySlug}`] ?? [];
}
