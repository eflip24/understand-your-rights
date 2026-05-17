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
import enHome from "./locales/en/home.json";
import esHome from "./locales/es/home.json";
import frHome from "./locales/fr/home.json";
import deHome from "./locales/de/home.json";
import ptHome from "./locales/pt/home.json";
import itHome from "./locales/it/home.json";
import enQuiz from "./locales/en/quiz.json";
import esQuiz from "./locales/es/quiz.json";
import frQuiz from "./locales/fr/quiz.json";
import deQuiz from "./locales/de/quiz.json";
import ptQuiz from "./locales/pt/quiz.json";
import itQuiz from "./locales/it/quiz.json";
import enLegal from "./locales/en/legal.json";
import esLegal from "./locales/es/legal.json";
import frLegal from "./locales/fr/legal.json";
import deLegal from "./locales/de/legal.json";
import ptLegal from "./locales/pt/legal.json";
import itLegal from "./locales/it/legal.json";
import enTools from "./locales/en/tools.json";
import esTools from "./locales/es/tools.json";
import frTools from "./locales/fr/tools.json";
import deTools from "./locales/de/tools.json";
import ptTools from "./locales/pt/tools.json";
import itTools from "./locales/it/tools.json";
import enTerms from "./locales/en/terms.json";
import esTerms from "./locales/es/terms.json";
import frTerms from "./locales/fr/terms.json";
import deTerms from "./locales/de/terms.json";
import ptTerms from "./locales/pt/terms.json";
import itTerms from "./locales/it/terms.json";

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
      en: { common: en, seo: enSeo, home: enHome, quiz: enQuiz, legal: enLegal, tools: enTools, terms: enTerms },
      es: { common: es, seo: esSeo, home: esHome, quiz: esQuiz, legal: esLegal, tools: esTools, terms: esTerms },
      fr: { common: fr, seo: frSeo, home: frHome, quiz: frQuiz, legal: frLegal, tools: frTools, terms: frTerms },
      de: { common: de, seo: deSeo, home: deHome, quiz: deQuiz, legal: deLegal, tools: deTools, terms: deTerms },
      pt: { common: pt, seo: ptSeo, home: ptHome, quiz: ptQuiz, legal: ptLegal, tools: ptTools, terms: ptTerms },
      it: { common: it, seo: itSeo, home: itHome, quiz: itQuiz, legal: itLegal, tools: itTools, terms: itTerms },
    },
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    defaultNS: "common",
    ns: ["common", "seo", "home", "quiz", "legal", "tools", "terms"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "ls.locale",
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

export default i18n;
