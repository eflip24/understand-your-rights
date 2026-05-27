/**
 * Slug registry — translates localized URL slugs ↔ canonical keys for
 * the EU lawyer directory, and emits localized paths for hreflang.
 *
 * URL shapes:
 *   /[locale/]lawyer-eu                                  (hub)
 *   /[locale/]lawyer-eu/{countrySlug}                    (country)
 *   /[locale/]lawyer-eu/{countrySlug}/{areaSlug}         (country+area)
 *   /[locale/]lawyer-eu/{countrySlug}/{areaSlug}/{citySlug}
 *   /[locale/]lawyer-eu/{countrySlug}/region/{regionSlug} (Phase B9)
 *
 * The literal "region" segment namespaces region URLs to avoid colliding
 * with the existing `{country}/{area}` shape (area and region slugs would
 * otherwise overlap).
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
import {
  euRegions, getEuRegion, type EuRegion,
} from "./regions";

export const EU_LAWYER_BASE = "lawyer-eu";
/** Literal URL segment that namespaces region pages. Locale-invariant for now. */
export const EU_REGION_SEGMENT = "region";

export interface EuRouteCanonical {
  /** Omit for the hub page (/{locale?}/lawyer-eu). */
  country?: EuCountryCode;
  area?: EuAreaCanonicalSlug;
  city?: string; // canonical city slug
  /** Canonical region slug (mutually exclusive with `area`/`city` in URLs). */
  region?: string;
}

/** Resolve a (locale, params) tuple to canonical keys. Returns null on miss. */
export function resolveEuRoute(
  locale: LocaleCode,
  params: { country?: string; area?: string; city?: string; region?: string },
): EuRouteCanonical | null {
  if (!params.country) return {}; // hub

  const country = euCountries.find((c) => c.slug[locale] === params.country);
  if (!country) return null;

  const out: EuRouteCanonical = { country: country.code };

  if (params.region) {
    const region = euRegions.find(
      (r) => r.country === country.code && r.slug[locale] === params.region,
    );
    if (!region) return null;
    out.region = region.canonical;
    return out;
  }

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

  if (canonical.region) {
    const region = getEuRegion(canonical.country, canonical.region);
    if (region) {
      parts.push(EU_REGION_SEGMENT, region.slug[locale]);
      return `${base}/${parts.join("/")}`;
    }
  }

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
export { euCountries, euPracticeAreas, euCities, euRegions };
export type { EuCity, EuPracticeArea, EuRegion };
