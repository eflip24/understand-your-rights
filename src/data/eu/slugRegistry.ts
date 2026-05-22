/**
 * Slug registry — translates localized URL slugs ↔ canonical keys for
 * the EU lawyer directory, and emits localized paths for hreflang.
 *
 * URL shape: /[locale/]lawyer-eu/{countrySlug}/{areaSlug}/{citySlug}
 */

import {
  euCountries, getEuCountry, type EuCountryCode, type LocaleCode,
} from "./countries";
import {
  euPracticeAreas, getEuAreaByCanonical, type EuAreaCanonicalSlug, type EuPracticeArea,
} from "./practiceAreas";
import {
  euCities, getEuCityByCanonical, type EuCity,
} from "./cities";

export const EU_LAWYER_BASE = "lawyer-eu";

export interface EuRouteCanonical {
  /** Omit for the hub page (/{locale?}/lawyer-eu). */
  country?: EuCountryCode;
  area?: EuAreaCanonicalSlug;
  city?: string; // canonical city slug
}

/** Resolve a (locale, params) tuple to canonical keys. Returns null on miss. */
export function resolveEuRoute(
  locale: LocaleCode,
  params: { country?: string; area?: string; city?: string },
): EuRouteCanonical | null {
  if (!params.country) return {}; // hub

  const country = euCountries.find((c) => c.slug[locale] === params.country);
  if (!country) return null;

  const out: EuRouteCanonical = { country: country.code };

  if (params.area) {
    const area = euPracticeAreas.find(
      (a) => a.slug[locale] === params.area && a.availableIn.includes(country.code),
    );
    if (!area) return null;
    out.area = area.canonical;
  }

  if (params.city) {
    const city = euCities.find(
      (c) => c.country === country.code && c.slug[locale] === params.city,
    );
    if (!city) return null;
    out.city = city.canonical;
  }

  return out;
}

/** Build a localized URL path for the given canonical tuple. */
export function buildEuPath(
  locale: LocaleCode,
  canonical: EuRouteCanonical,
): string {
  const base = locale === "en" ? `/${EU_LAWYER_BASE}` : `/${locale}/${EU_LAWYER_BASE}`;
  if (!canonical.country) return base;

  const country = getEuCountry(canonical.country);
  if (!country) return base;

  const parts = [country.slug[locale]];

  if (canonical.area) {
    const area = getEuAreaByCanonical(canonical.area);
    if (area) parts.push(area.slug[locale]);
  }

  if (canonical.city) {
    const city = getEuCityByCanonical(canonical.country, canonical.city);
    if (city) parts.push(city.slug[locale]);
  }

  return `${base}/${parts.join("/")}`;
}

/** Build the localized path map (one entry per supported locale). */
export function buildEuPathsByLocale(
  canonical: EuRouteCanonical,
): Record<LocaleCode, string> {
  const locales: LocaleCode[] = ["en", "es", "fr", "de", "pt", "it"];
  return Object.fromEntries(
    locales.map((l) => [l, buildEuPath(l, canonical)]),
  ) as Record<LocaleCode, string>;
}

/** Helpers exported for consumers. */
export { euCountries, euPracticeAreas, euCities };
export type { EuCity, EuPracticeArea };
