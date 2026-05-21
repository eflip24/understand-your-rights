/**
 * EU lawyer-directory country registry (Phase B1).
 * Canonical key is the ISO-3166-1 alpha-2 lowercase code.
 * Each country carries per-locale slug variants used in URLs.
 */

export type EuCountryCode = "fr" | "de" | "es" | "it" | "pt";

export type LocaleCode = "en" | "es" | "fr" | "de" | "pt" | "it";

export interface EuCountry {
  code: EuCountryCode;
  defaultLocale: LocaleCode;
  currency: "EUR";
  /** National bar association reference URL (informational only). */
  barAssociationUrl: string;
  /** Country name per locale, used in headings + metadata. */
  name: Record<LocaleCode, string>;
  /** URL slug per locale. Lowercase, hyphenated, ASCII-only. */
  slug: Record<LocaleCode, string>;
}

export const euCountries: EuCountry[] = [
  {
    code: "fr",
    defaultLocale: "fr",
    currency: "EUR",
    barAssociationUrl: "https://www.cnb.avocat.fr",
    name: {
      en: "France", es: "Francia", fr: "France", de: "Frankreich", pt: "França", it: "Francia",
    },
    slug: {
      en: "france", es: "francia", fr: "france", de: "frankreich", pt: "franca", it: "francia",
    },
  },
  {
    code: "de",
    defaultLocale: "de",
    currency: "EUR",
    barAssociationUrl: "https://www.brak.de",
    name: {
      en: "Germany", es: "Alemania", fr: "Allemagne", de: "Deutschland", pt: "Alemanha", it: "Germania",
    },
    slug: {
      en: "germany", es: "alemania", fr: "allemagne", de: "deutschland", pt: "alemanha", it: "germania",
    },
  },
  {
    code: "es",
    defaultLocale: "es",
    currency: "EUR",
    barAssociationUrl: "https://www.abogacia.es",
    name: {
      en: "Spain", es: "España", fr: "Espagne", de: "Spanien", pt: "Espanha", it: "Spagna",
    },
    slug: {
      en: "spain", es: "espana", fr: "espagne", de: "spanien", pt: "espanha", it: "spagna",
    },
  },
  {
    code: "it",
    defaultLocale: "it",
    currency: "EUR",
    barAssociationUrl: "https://www.consiglionazionaleforense.it",
    name: {
      en: "Italy", es: "Italia", fr: "Italie", de: "Italien", pt: "Itália", it: "Italia",
    },
    slug: {
      en: "italy", es: "italia", fr: "italie", de: "italien", pt: "italia", it: "italia",
    },
  },
  {
    code: "pt",
    defaultLocale: "pt",
    currency: "EUR",
    barAssociationUrl: "https://portal.oa.pt",
    name: {
      en: "Portugal", es: "Portugal", fr: "Portugal", de: "Portugal", pt: "Portugal", it: "Portogallo",
    },
    slug: {
      en: "portugal", es: "portugal", fr: "portugal", de: "portugal", pt: "portugal", it: "portogallo",
    },
  },
];

export const EU_COUNTRY_CODES: EuCountryCode[] = euCountries.map((c) => c.code);

export function getEuCountry(code: EuCountryCode): EuCountry | undefined {
  return euCountries.find((c) => c.code === code);
}
