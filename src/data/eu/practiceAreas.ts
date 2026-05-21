/**
 * Shared EU practice-area taxonomy (Phase B1).
 * Canonical slug = English. Per-locale slugs are stored inline.
 * `availableIn` lets a country opt out of an area that doesn't translate.
 */

import type { EuCountryCode, LocaleCode } from "./countries";
import { EU_COUNTRY_CODES } from "./countries";

export type EuAreaCanonicalSlug =
  | "employment"
  | "family"
  | "criminal-defense"
  | "personal-injury"
  | "immigration"
  | "tax"
  | "real-estate"
  | "contract"
  | "consumer"
  | "intellectual-property"
  | "data-protection-gdpr"
  | "business";

export interface EuPracticeArea {
  /** Canonical English slug — used as i18n key and DB join key. */
  canonical: EuAreaCanonicalSlug;
  /** Display name per locale. */
  name: Record<LocaleCode, string>;
  /** URL slug per locale. */
  slug: Record<LocaleCode, string>;
  /** Countries where this area is offered. */
  availableIn: EuCountryCode[];
}

const ALL: EuCountryCode[] = EU_COUNTRY_CODES;

export const euPracticeAreas: EuPracticeArea[] = [
  {
    canonical: "employment",
    name: { en: "Employment Law", es: "Derecho Laboral", fr: "Droit du travail", de: "Arbeitsrecht", pt: "Direito do Trabalho", it: "Diritto del lavoro" },
    slug: { en: "employment", es: "derecho-laboral", fr: "droit-du-travail", de: "arbeitsrecht", pt: "direito-do-trabalho", it: "diritto-del-lavoro" },
    availableIn: ALL,
  },
  {
    canonical: "family",
    name: { en: "Family Law", es: "Derecho de Familia", fr: "Droit de la famille", de: "Familienrecht", pt: "Direito da Família", it: "Diritto di famiglia" },
    slug: { en: "family", es: "derecho-de-familia", fr: "droit-de-la-famille", de: "familienrecht", pt: "direito-da-familia", it: "diritto-di-famiglia" },
    availableIn: ALL,
  },
  {
    canonical: "criminal-defense",
    name: { en: "Criminal Defense", es: "Defensa Penal", fr: "Droit pénal", de: "Strafrecht", pt: "Direito Penal", it: "Diritto penale" },
    slug: { en: "criminal-defense", es: "defensa-penal", fr: "droit-penal", de: "strafrecht", pt: "direito-penal", it: "diritto-penale" },
    availableIn: ALL,
  },
  {
    canonical: "personal-injury",
    name: { en: "Personal Injury", es: "Daños Personales", fr: "Dommages corporels", de: "Personenschäden", pt: "Danos Pessoais", it: "Danni alla persona" },
    slug: { en: "personal-injury", es: "danos-personales", fr: "dommages-corporels", de: "personenschaeden", pt: "danos-pessoais", it: "danni-alla-persona" },
    availableIn: ALL,
  },
  {
    canonical: "immigration",
    name: { en: "Immigration", es: "Inmigración", fr: "Droit des étrangers", de: "Ausländerrecht", pt: "Direito de Imigração", it: "Diritto dell'immigrazione" },
    slug: { en: "immigration", es: "inmigracion", fr: "droit-des-etrangers", de: "auslaenderrecht", pt: "direito-de-imigracao", it: "diritto-immigrazione" },
    availableIn: ALL,
  },
  {
    canonical: "tax",
    name: { en: "Tax Law", es: "Derecho Fiscal", fr: "Droit fiscal", de: "Steuerrecht", pt: "Direito Fiscal", it: "Diritto tributario" },
    slug: { en: "tax", es: "derecho-fiscal", fr: "droit-fiscal", de: "steuerrecht", pt: "direito-fiscal", it: "diritto-tributario" },
    availableIn: ALL,
  },
  {
    canonical: "real-estate",
    name: { en: "Real Estate", es: "Derecho Inmobiliario", fr: "Droit immobilier", de: "Immobilienrecht", pt: "Direito Imobiliário", it: "Diritto immobiliare" },
    slug: { en: "real-estate", es: "derecho-inmobiliario", fr: "droit-immobilier", de: "immobilienrecht", pt: "direito-imobiliario", it: "diritto-immobiliare" },
    availableIn: ALL,
  },
  {
    canonical: "contract",
    name: { en: "Contract Law", es: "Derecho Contractual", fr: "Droit des contrats", de: "Vertragsrecht", pt: "Direito dos Contratos", it: "Diritto contrattuale" },
    slug: { en: "contract", es: "derecho-contractual", fr: "droit-des-contrats", de: "vertragsrecht", pt: "direito-dos-contratos", it: "diritto-contrattuale" },
    availableIn: ALL,
  },
  {
    canonical: "consumer",
    name: { en: "Consumer Law", es: "Derecho del Consumidor", fr: "Droit de la consommation", de: "Verbraucherrecht", pt: "Direito do Consumidor", it: "Diritto dei consumatori" },
    slug: { en: "consumer", es: "derecho-del-consumidor", fr: "droit-de-la-consommation", de: "verbraucherrecht", pt: "direito-do-consumidor", it: "diritto-dei-consumatori" },
    availableIn: ALL,
  },
  {
    canonical: "intellectual-property",
    name: { en: "Intellectual Property", es: "Propiedad Intelectual", fr: "Propriété intellectuelle", de: "Geistiges Eigentum", pt: "Propriedade Intelectual", it: "Proprietà intellettuale" },
    slug: { en: "intellectual-property", es: "propiedad-intelectual", fr: "propriete-intellectuelle", de: "geistiges-eigentum", pt: "propriedade-intelectual", it: "proprieta-intellettuale" },
    availableIn: ALL,
  },
  {
    canonical: "data-protection-gdpr",
    name: { en: "Data Protection (GDPR)", es: "Protección de Datos (RGPD)", fr: "Protection des données (RGPD)", de: "Datenschutz (DSGVO)", pt: "Proteção de Dados (RGPD)", it: "Protezione dei dati (GDPR)" },
    slug: { en: "data-protection-gdpr", es: "proteccion-de-datos-rgpd", fr: "protection-des-donnees-rgpd", de: "datenschutz-dsgvo", pt: "protecao-de-dados-rgpd", it: "protezione-dati-gdpr" },
    availableIn: ALL,
  },
  {
    canonical: "business",
    name: { en: "Business Law", es: "Derecho Mercantil", fr: "Droit des affaires", de: "Wirtschaftsrecht", pt: "Direito Comercial", it: "Diritto commerciale" },
    slug: { en: "business", es: "derecho-mercantil", fr: "droit-des-affaires", de: "wirtschaftsrecht", pt: "direito-comercial", it: "diritto-commerciale" },
    availableIn: ALL,
  },
];

export function getEuAreaByCanonical(canonical: EuAreaCanonicalSlug): EuPracticeArea | undefined {
  return euPracticeAreas.find((a) => a.canonical === canonical);
}

export function euAreasForCountry(country: EuCountryCode): EuPracticeArea[] {
  return euPracticeAreas.filter((a) => a.availableIn.includes(country));
}
