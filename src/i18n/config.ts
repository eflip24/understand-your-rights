import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import es from "./locales/es/common.json";
import fr from "./locales/fr/common.json";
import de from "./locales/de/common.json";
import pt from "./locales/pt/common.json";
import it from "./locales/it/common.json";
import enSeo from "./locales/en/seo.json";
import esSeo from "./locales/es/seo.json";
import frSeo from "./locales/fr/seo.json";
import deSeo from "./locales/de/seo.json";
import ptSeo from "./locales/pt/seo.json";
import itSeo from "./locales/it/seo.json";

export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "pt", "it"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "en";

export const LOCALE_LABELS: Record<SupportedLocale, { native: string; english: string; flag: string }> = {
  en: { native: "English", english: "English", flag: "🇬🇧" },
  es: { native: "Español", english: "Spanish", flag: "🇪🇸" },
  fr: { native: "Français", english: "French", flag: "🇫🇷" },
  de: { native: "Deutsch", english: "German", flag: "🇩🇪" },
  pt: { native: "Português", english: "Portuguese", flag: "🇵🇹" },
  it: { native: "Italiano", english: "Italian", flag: "🇮🇹" },
};

export function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en, seo: enSeo },
      es: { common: es, seo: esSeo },
      fr: { common: fr, seo: frSeo },
      de: { common: de, seo: deSeo },
      pt: { common: pt, seo: ptSeo },
      it: { common: it, seo: itSeo },
    },
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    defaultNS: "common",
    ns: ["common", "seo"],
    interpolation: { escapeValue: false },
    detection: {
      // URL is the source of truth (handled by LocaleSync); this is only for the very first visit.
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "ls.locale",
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

export default i18n;
