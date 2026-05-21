/**
 * EU city registry (Phase B1).
 * Minimal seed — top metros per EU5 country to exercise the IA end-to-end.
 * Expanded with full coverage in Phase B2.
 *
 * Canonical city slug == English ASCII slug. Per-locale slugs allow
 * the URL segment to read natively in each locale.
 */

import type { EuCountryCode, LocaleCode } from "./countries";

export type PopulationTier = "primary" | "secondary" | "tertiary";

export interface EuCity {
  /** Canonical English slug. Globally unique when prefixed with country code. */
  canonical: string;
  country: EuCountryCode;
  /** Display name per locale. */
  name: Record<LocaleCode, string>;
  /** URL slug per locale. */
  slug: Record<LocaleCode, string>;
  lat: number;
  lng: number;
  tier: PopulationTier;
}

/**
 * Minimal seed: 3 cities per country. Phase B2 expands to full coverage.
 */
export const euCities: EuCity[] = [
  // France
  {
    canonical: "paris", country: "fr",
    name: { en: "Paris", es: "París", fr: "Paris", de: "Paris", pt: "Paris", it: "Parigi" },
    slug: { en: "paris", es: "paris", fr: "paris", de: "paris", pt: "paris", it: "parigi" },
    lat: 48.8566, lng: 2.3522, tier: "primary",
  },
  {
    canonical: "lyon", country: "fr",
    name: { en: "Lyon", es: "Lyon", fr: "Lyon", de: "Lyon", pt: "Lyon", it: "Lione" },
    slug: { en: "lyon", es: "lyon", fr: "lyon", de: "lyon", pt: "lyon", it: "lione" },
    lat: 45.7640, lng: 4.8357, tier: "secondary",
  },
  {
    canonical: "marseille", country: "fr",
    name: { en: "Marseille", es: "Marsella", fr: "Marseille", de: "Marseille", pt: "Marselha", it: "Marsiglia" },
    slug: { en: "marseille", es: "marsella", fr: "marseille", de: "marseille", pt: "marselha", it: "marsiglia" },
    lat: 43.2965, lng: 5.3698, tier: "secondary",
  },

  // Germany
  {
    canonical: "berlin", country: "de",
    name: { en: "Berlin", es: "Berlín", fr: "Berlin", de: "Berlin", pt: "Berlim", it: "Berlino" },
    slug: { en: "berlin", es: "berlin", fr: "berlin", de: "berlin", pt: "berlim", it: "berlino" },
    lat: 52.5200, lng: 13.4050, tier: "primary",
  },
  {
    canonical: "munich", country: "de",
    name: { en: "Munich", es: "Múnich", fr: "Munich", de: "München", pt: "Munique", it: "Monaco di Baviera" },
    slug: { en: "munich", es: "munich", fr: "munich", de: "muenchen", pt: "munique", it: "monaco-di-baviera" },
    lat: 48.1351, lng: 11.5820, tier: "secondary",
  },
  {
    canonical: "hamburg", country: "de",
    name: { en: "Hamburg", es: "Hamburgo", fr: "Hambourg", de: "Hamburg", pt: "Hamburgo", it: "Amburgo" },
    slug: { en: "hamburg", es: "hamburgo", fr: "hambourg", de: "hamburg", pt: "hamburgo", it: "amburgo" },
    lat: 53.5511, lng: 9.9937, tier: "secondary",
  },

  // Spain
  {
    canonical: "madrid", country: "es",
    name: { en: "Madrid", es: "Madrid", fr: "Madrid", de: "Madrid", pt: "Madrid", it: "Madrid" },
    slug: { en: "madrid", es: "madrid", fr: "madrid", de: "madrid", pt: "madrid", it: "madrid" },
    lat: 40.4168, lng: -3.7038, tier: "primary",
  },
  {
    canonical: "barcelona", country: "es",
    name: { en: "Barcelona", es: "Barcelona", fr: "Barcelone", de: "Barcelona", pt: "Barcelona", it: "Barcellona" },
    slug: { en: "barcelona", es: "barcelona", fr: "barcelone", de: "barcelona", pt: "barcelona", it: "barcellona" },
    lat: 41.3851, lng: 2.1734, tier: "secondary",
  },
  {
    canonical: "valencia", country: "es",
    name: { en: "Valencia", es: "Valencia", fr: "Valence", de: "Valencia", pt: "Valência", it: "Valencia" },
    slug: { en: "valencia", es: "valencia", fr: "valence", de: "valencia", pt: "valencia", it: "valencia" },
    lat: 39.4699, lng: -0.3763, tier: "secondary",
  },

  // Italy
  {
    canonical: "rome", country: "it",
    name: { en: "Rome", es: "Roma", fr: "Rome", de: "Rom", pt: "Roma", it: "Roma" },
    slug: { en: "rome", es: "roma", fr: "rome", de: "rom", pt: "roma", it: "roma" },
    lat: 41.9028, lng: 12.4964, tier: "primary",
  },
  {
    canonical: "milan", country: "it",
    name: { en: "Milan", es: "Milán", fr: "Milan", de: "Mailand", pt: "Milão", it: "Milano" },
    slug: { en: "milan", es: "milan", fr: "milan", de: "mailand", pt: "milao", it: "milano" },
    lat: 45.4642, lng: 9.1900, tier: "secondary",
  },
  {
    canonical: "naples", country: "it",
    name: { en: "Naples", es: "Nápoles", fr: "Naples", de: "Neapel", pt: "Nápoles", it: "Napoli" },
    slug: { en: "naples", es: "napoles", fr: "naples", de: "neapel", pt: "napoles", it: "napoli" },
    lat: 40.8518, lng: 14.2681, tier: "secondary",
  },

  // Portugal
  {
    canonical: "lisbon", country: "pt",
    name: { en: "Lisbon", es: "Lisboa", fr: "Lisbonne", de: "Lissabon", pt: "Lisboa", it: "Lisbona" },
    slug: { en: "lisbon", es: "lisboa", fr: "lisbonne", de: "lissabon", pt: "lisboa", it: "lisbona" },
    lat: 38.7223, lng: -9.1393, tier: "primary",
  },
  {
    canonical: "porto", country: "pt",
    name: { en: "Porto", es: "Oporto", fr: "Porto", de: "Porto", pt: "Porto", it: "Porto" },
    slug: { en: "porto", es: "oporto", fr: "porto", de: "porto", pt: "porto", it: "porto" },
    lat: 41.1579, lng: -8.6291, tier: "secondary",
  },
  {
    canonical: "braga", country: "pt",
    name: { en: "Braga", es: "Braga", fr: "Braga", de: "Braga", pt: "Braga", it: "Braga" },
    slug: { en: "braga", es: "braga", fr: "braga", de: "braga", pt: "braga", it: "braga" },
    lat: 41.5454, lng: -8.4265, tier: "tertiary",
  },
];

export function euCitiesForCountry(country: EuCountryCode): EuCity[] {
  return euCities.filter((c) => c.country === country);
}

export function getEuCityByCanonical(country: EuCountryCode, canonical: string): EuCity | undefined {
  return euCities.find((c) => c.country === country && c.canonical === canonical);
}
