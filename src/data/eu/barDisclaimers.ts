/**
 * Per-country bar association disclaimers for the EU lawyer directory.
 *
 * Each country's bar regulates how non-lawyers may publish attorney info.
 * Notable refs:
 * - DE: BRAO §43b (Werbung) + RIN
 * - AT: §45 RL-BA 2015
 * - FR: RIN art. 10 (CNB)
 * - IT: Codice Deontologico Forense art. 35
 * - ES: Código Deontológico de la Abogacía Española
 * - PT: Estatuto da Ordem dos Advogados
 */

import type { EuCountryCode } from "./countries";
import type { SupportedLocale } from "@/i18n/config";

export interface BarDisclaimer {
  /** National bar association URL for credential verification. */
  verifyUrl: string;
  /** Short label for the bar (used in "Verify at {label}" sentence). */
  barLabel: Record<SupportedLocale, string>;
  /** Localized disclaimer paragraph rendered above directory listings. */
  body: Record<SupportedLocale, string>;
}

const COMMON_NOTICE = {
  en: (label: string) =>
    `LegallySpoken is not a law firm and does not provide legal advice. Listings are compiled from publicly available information and do not constitute a recommendation. Verify any lawyer's credentials with the ${label} before engaging counsel.`,
  es: (label: string) =>
    `LegallySpoken no es un bufete de abogados y no presta asesoramiento jurídico. Los listados se han elaborado a partir de información pública y no constituyen una recomendación. Verifique las credenciales de cualquier abogado en el ${label} antes de contratar sus servicios.`,
  fr: (label: string) =>
    `LegallySpoken n'est pas un cabinet d'avocats et ne fournit pas de conseil juridique. Les annonces sont compilées à partir d'informations publiques et ne constituent pas une recommandation. Vérifiez les références de tout avocat auprès du ${label} avant de l'engager.`,
  de: (label: string) =>
    `LegallySpoken ist keine Anwaltskanzlei und erbringt keine Rechtsberatung. Die Einträge basieren auf öffentlich zugänglichen Informationen und stellen keine Empfehlung dar. Überprüfen Sie die Zulassung jedes Anwalts bei der ${label}, bevor Sie ein Mandat erteilen.`,
  pt: (label: string) =>
    `O LegallySpoken não é uma sociedade de advogados e não presta aconselhamento jurídico. Os anúncios são compilados a partir de informação publicamente disponível e não constituem uma recomendação. Verifique as credenciais de qualquer advogado junto da ${label} antes de o contratar.`,
  it: (label: string) =>
    `LegallySpoken non è uno studio legale e non fornisce consulenza legale. Gli annunci sono compilati da informazioni pubblicamente disponibili e non costituiscono una raccomandazione. Verificare le credenziali di qualsiasi avvocato presso il ${label} prima di conferire un incarico.`,
};

const DE_ADDENDUM: Record<SupportedLocale, string> = {
  en: " Lawyer advertising in Germany is regulated by BRAO §43b — only objective and professional information is permitted.",
  de: " Anwaltswerbung in Deutschland unterliegt § 43b BRAO; zulässig ist ausschließlich sachliche und berufsbezogene Information.",
  fr: " La publicité des avocats en Allemagne est régie par § 43b BRAO et limitée à des informations objectives et professionnelles.",
  es: " La publicidad de la abogacía en Alemania se rige por el § 43b BRAO y se limita a información objetiva y profesional.",
  pt: " A publicidade da advocacia na Alemanha rege-se pelo § 43b BRAO, limitando-se a informação objectiva e profissional.",
  it: " La pubblicità forense in Germania è disciplinata dal § 43b BRAO ed è limitata a informazioni oggettive e professionali.",
};

const FR_ADDENDUM: Record<SupportedLocale, string> = {
  en: " This is an unofficial directory — consult the CNB roll for the authoritative list of attorneys admitted in France.",
  fr: " Annuaire non officiel — consultez l'annuaire du CNB pour la liste officielle des avocats inscrits en France.",
  de: " Inoffizielles Verzeichnis — die offizielle Liste der in Frankreich zugelassenen Anwälte führt das CNB.",
  es: " Directorio no oficial — consulte el censo del CNB para la lista oficial de abogados inscritos en Francia.",
  pt: " Directório não oficial — consulte o registo do CNB para a lista oficial dos advogados inscritos em França.",
  it: " Elenco non ufficiale — consultare l'albo del CNB per l'elenco ufficiale degli avvocati iscritti in Francia.",
};

function disclaimer(
  verifyUrl: string,
  label: Partial<Record<SupportedLocale, string>> & { en: string },
  addendum?: Record<SupportedLocale, string>,
): BarDisclaimer {
  const allLocales: SupportedLocale[] = ["en", "es", "fr", "de", "pt", "it"];
  const barLabel: Record<SupportedLocale, string> = {} as Record<SupportedLocale, string>;
  const body: Record<SupportedLocale, string> = {} as Record<SupportedLocale, string>;
  for (const l of allLocales) {
    const lbl = label[l] ?? label.en;
    barLabel[l] = lbl;
    body[l] = COMMON_NOTICE[l](lbl) + (addendum ? addendum[l] : "");
  }
  return { verifyUrl, barLabel, body };
}

export const BAR_DISCLAIMERS: Record<EuCountryCode, BarDisclaimer> = {
  de: disclaimer(
    "https://www.brak.de",
    {
      en: "German Federal Bar (BRAK)",
      de: "Bundesrechtsanwaltskammer (BRAK)",
      fr: "Chambre fédérale des avocats allemande (BRAK)",
      es: "Cámara Federal de Abogados de Alemania (BRAK)",
      pt: "Câmara Federal Alemã dos Advogados (BRAK)",
      it: "Camera Federale degli Avvocati Tedeschi (BRAK)",
    },
    DE_ADDENDUM,
  ),
  fr: disclaimer(
    "https://www.cnb.avocat.fr",
    {
      en: "Conseil National des Barreaux (CNB)",
      fr: "Conseil National des Barreaux (CNB)",
      de: "Conseil National des Barreaux (CNB)",
      es: "Conseil National des Barreaux (CNB)",
      pt: "Conseil National des Barreaux (CNB)",
      it: "Conseil National des Barreaux (CNB)",
    },
    FR_ADDENDUM,
  ),
  es: disclaimer("https://www.abogacia.es", {
    en: "Consejo General de la Abogacía Española",
    es: "Consejo General de la Abogacía Española",
    fr: "Conseil général de l'avocature espagnole",
    de: "Spanischer Anwaltsverband (CGAE)",
    pt: "Conselho Geral da Advocacia Espanhola",
    it: "Consiglio Generale dell'Avvocatura Spagnola",
  }),
  it: disclaimer("https://www.consiglionazionaleforense.it", {
    en: "Consiglio Nazionale Forense (CNF)",
    it: "Consiglio Nazionale Forense (CNF)",
    en_fallback: "Consiglio Nazionale Forense (CNF)",
    fr: "Consiglio Nazionale Forense (CNF)",
    de: "Consiglio Nazionale Forense (CNF)",
    es: "Consiglio Nazionale Forense (CNF)",
    pt: "Consiglio Nazionale Forense (CNF)",
  } as Partial<Record<SupportedLocale, string>> & { en: string }),
  pt: disclaimer("https://portal.oa.pt", {
    en: "Ordem dos Advogados",
    pt: "Ordem dos Advogados",
    fr: "Ordre des avocats portugais",
    de: "Portugiesische Anwaltskammer",
    es: "Colegio de Abogados de Portugal",
    it: "Ordine degli Avvocati portoghese",
  }),
};
