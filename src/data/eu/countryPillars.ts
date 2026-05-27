/**
 * Phase B6 — Country pillar content for /lawyer-eu/{country} pages.
 *
 * Each country is authored in its native locale + English. Other locales
 * fall back to English via `pickPillarLocale`. Full 6-locale fan-out is
 * deferred to Phase B8.
 *
 * Generated/edited content should set `aiAssisted: true` so the page
 * surfaces the EU AI Act art. 50 disclosure badge.
 */

import type { EuCountryCode, LocaleCode } from "./countries";

export type PillarLocalized = Partial<Record<LocaleCode, string>> & { en: string };

export interface PillarFaq {
  q: PillarLocalized;
  a: PillarLocalized;
}

export interface CountryPillar {
  hero: {
    tagline: PillarLocalized;
    lede: PillarLocalized;
  };
  legalSystem: PillarLocalized;
  howToFindLawyer: PillarLocalized;
  feesAndAid: PillarLocalized;
  barAssociation: {
    name: PillarLocalized;
    verifyUrl: string;
    membershipRules: PillarLocalized;
  };
  crossBorderEU: PillarLocalized;
  faqs: PillarFaq[];
  /** ISO date — drives JSON-LD `dateModified`. */
  lastReviewed: string;
  /** Marks the long-form sections as AI-assisted; surfaces an editor badge. */
  aiAssisted: boolean;
}

export function pickPillarLocale<T extends PillarLocalized>(field: T, locale: LocaleCode): string {
  return field[locale] ?? field.en;
}

/* ------------------------------------------------------------------ */
/* GERMANY — fully authored (DE + EN). Other locales fall back to EN. */
/* ------------------------------------------------------------------ */

const DE: CountryPillar = {
  hero: {
    tagline: {
      en: "Find a qualified Rechtsanwalt across Germany — verified against the federal bar roll.",
      de: "Qualifizierte Rechtsanwältinnen und Rechtsanwälte in Deutschland — verifiziert über das bundesweite Anwaltsverzeichnis.",
    },
    lede: {
      en: "Germany has roughly 165,000 admitted lawyers (Rechtsanwälte), all regulated by the Bundesrechtsanwaltsordnung (BRAO) and organised into 27 regional bar chambers under the federal Bundesrechtsanwaltskammer (BRAK). This guide explains how the German legal system is structured, how to find and instruct a lawyer, what fees to expect under the RVG, and how EU-admitted lawyers may practise across the border.",
      de: "In Deutschland sind rund 165.000 Rechtsanwältinnen und Rechtsanwälte zugelassen. Sie unterliegen der Bundesrechtsanwaltsordnung (BRAO) und sind in 27 regionalen Rechtsanwaltskammern unter dem Dach der Bundesrechtsanwaltskammer (BRAK) organisiert. Dieser Überblick erklärt die Struktur der deutschen Justiz, die Beauftragung eines Anwalts, die Vergütung nach dem RVG sowie die grenzüberschreitende Tätigkeit von EU-Anwälten.",
    },
  },
  legalSystem: {
    en: "Germany is a civil law jurisdiction with codified statutes such as the Bürgerliches Gesetzbuch (BGB) for civil matters, the Strafgesetzbuch (StGB) for criminal matters, and the Handelsgesetzbuch (HGB) for commercial matters. The court hierarchy is split by subject: ordinary civil and criminal cases run through Amtsgericht → Landgericht → Oberlandesgericht → Bundesgerichtshof (BGH). Specialist branches include the Arbeitsgericht (labour), Verwaltungsgericht (administrative), Sozialgericht (social), and Finanzgericht (tax) trees, each with their own federal apex court. Constitutional questions go to the Bundesverfassungsgericht in Karlsruhe. Lawyers admitted in Germany may appear before all courts except the BGH in civil matters, which requires a separate Singularzulassung.",
    de: "Deutschland ist eine kodifizierte Rechtsordnung. Zentrale Gesetze sind das Bürgerliche Gesetzbuch (BGB), das Strafgesetzbuch (StGB) und das Handelsgesetzbuch (HGB). Der ordentliche Gerichtsweg führt vom Amtsgericht über das Landgericht und das Oberlandesgericht bis zum Bundesgerichtshof (BGH). Daneben bestehen die Fachgerichtsbarkeiten Arbeits-, Verwaltungs-, Sozial- und Finanzgerichtsbarkeit mit jeweils eigenen Bundesgerichten. Verfassungsfragen entscheidet das Bundesverfassungsgericht in Karlsruhe. Zugelassene Rechtsanwältinnen und Rechtsanwälte dürfen vor allen Gerichten auftreten; vor dem BGH in Zivilsachen ist jedoch eine gesonderte Singularzulassung erforderlich.",
  },
  howToFindLawyer: {
    en: "Start by identifying the relevant practice area — German bar law allows lawyers to advertise specialisations (Fachanwalt) only after passing a separate examination and demonstrating case experience, so a 'Fachanwalt für Familienrecht' or 'Fachanwalt für Arbeitsrecht' designation is a strong signal. Cross-check any candidate against the official Bundesweites Amtliches Anwaltsverzeichnis at https://www.rechtsanwaltsregister.org. Most German firms offer a paid Erstberatung (initial consultation) capped at €190 plus VAT by §34 RVG, although many waive or reduce the fee for clear-cut matters. Bring written documents and a chronological timeline. After the meeting you will normally receive a Vollmacht (power of attorney) and a fee agreement (Vergütungsvereinbarung) to sign before work begins.",
    de: "Beginnen Sie mit der einschlägigen Fachrichtung. Eine Fachanwaltsbezeichnung — etwa „Fachanwalt für Familienrecht“ oder „Fachanwalt für Arbeitsrecht“ — setzt eine zusätzliche Prüfung sowie nachgewiesene Fallpraxis voraus und ist ein verlässliches Qualitätsmerkmal. Prüfen Sie jede Kandidatin und jeden Kandidaten im Bundesweiten Amtlichen Anwaltsverzeichnis unter https://www.rechtsanwaltsregister.org. Die Erstberatung ist nach § 34 RVG auf 190 € zzgl. USt. begrenzt; viele Kanzleien rechnen sie bei einer späteren Mandatierung an. Bringen Sie alle Unterlagen sowie eine chronologische Sachverhaltsschilderung mit. Vor Mandatsbeginn unterschreiben Sie üblicherweise eine Vollmacht sowie eine Vergütungsvereinbarung.",
  },
  feesAndAid: {
    en: "Lawyer fees in Germany are governed by the Rechtsanwaltsvergütungsgesetz (RVG). Statutory fees scale with the matter value (Gegenstandswert) and are predictable — useful for litigation budgeting. Lawyers may agree higher fees in writing (Vergütungsvereinbarung), but in court they cannot fall below the RVG rate. Contingency fees are largely prohibited and only allowed in narrow cases where the client could not otherwise enforce a claim. Two means-tested aid programs exist: Beratungshilfe covers out-of-court advice for low-income clients with a Berechtigungsschein from the Amtsgericht, and Prozesskostenhilfe (PKH) covers court costs and lawyer fees once a lawsuit is filed. Legal expense insurance (Rechtsschutzversicherung) is common in Germany and many policies cover labour, traffic, and tenancy disputes.",
    de: "Die Vergütung richtet sich nach dem Rechtsanwaltsvergütungsgesetz (RVG). Die gesetzlichen Gebühren orientieren sich am Gegenstandswert und sind damit gut planbar. Vergütungsvereinbarungen oberhalb der RVG-Sätze sind schriftlich möglich, vor Gericht aber nicht darunter. Erfolgshonorare sind nur in engen Ausnahmefällen zulässig. Für einkommensschwache Mandantinnen und Mandanten bestehen zwei Programme: Beratungshilfe für die außergerichtliche Beratung mit Berechtigungsschein des Amtsgerichts sowie Prozesskostenhilfe (PKH) für Gerichts- und Anwaltskosten im laufenden Verfahren. Eine private Rechtsschutzversicherung deckt häufig Arbeits-, Verkehrs- und Mietsachen ab.",
  },
  barAssociation: {
    name: {
      en: "Bundesrechtsanwaltskammer (BRAK)",
      de: "Bundesrechtsanwaltskammer (BRAK)",
    },
    verifyUrl: "https://www.rechtsanwaltsregister.org",
    membershipRules: {
      en: "Every German lawyer must belong to one of the 27 regional Rechtsanwaltskammern, which in turn make up the BRAK. Admission requires the First and Second State Examinations in law (or an equivalent recognised foreign qualification) plus proof of mandatory professional indemnity insurance of at least €250,000. The Berufsordnung (BORA) and §43b BRAO restrict advertising to objective, profession-related information — sensationalist or comparative advertising is unlawful.",
      de: "Jede Rechtsanwältin und jeder Rechtsanwalt gehört einer der 27 regionalen Rechtsanwaltskammern an, die gemeinsam die BRAK bilden. Voraussetzung sind die Erste und Zweite Juristische Staatsprüfung (oder eine anerkannte ausländische Qualifikation) sowie eine Berufshaftpflichtversicherung mit einer Deckungssumme von mindestens 250.000 €. Die Berufsordnung (BORA) und § 43b BRAO beschränken die Werbung auf sachliche, berufsbezogene Information; reißerische oder vergleichende Werbung ist unzulässig.",
    },
  },
  crossBorderEU: {
    en: "Under the Establishment Directive 98/5/EC, lawyers admitted in any EU member state may practise in Germany under their home-country professional title (e.g. 'avocat' or 'abogado') after registering with a regional Rechtsanwaltskammer. After three years of effective and regular practice in German law they may apply for full admission as a Rechtsanwalt without re-sitting the German state exam. Short-term cross-border services are covered by the Services Directive 77/249/EEC — a French avocat may, for instance, appear in a single German hearing under their home title without registering, provided they work alongside a locally admitted Einvernehmensanwalt where required by procedural law.",
    de: "Nach der Niederlassungsrichtlinie 98/5/EG dürfen in einem anderen EU-Mitgliedstaat zugelassene Anwältinnen und Anwälte in Deutschland unter ihrer Heimatberufsbezeichnung (etwa „avocat“ oder „abogado“) tätig sein, sobald sie sich bei einer regionalen Rechtsanwaltskammer registriert haben. Nach drei Jahren effektiver und regelmäßiger Tätigkeit im deutschen Recht ist die Vollzulassung als Rechtsanwalt ohne erneutes Staatsexamen möglich. Kurzfristige grenzüberschreitende Dienstleistungen regelt die Dienstleistungsrichtlinie 77/249/EWG; eine französische avocate kann etwa unter ihrer Heimatbezeichnung an einer einzelnen deutschen Verhandlung teilnehmen, ggf. in Einvernehmen mit einem lokal zugelassenen Einvernehmensanwalt.",
  },
  faqs: [
    {
      q: { en: "How do I check whether a German lawyer is genuinely admitted?", de: "Wie prüfe ich, ob ein deutscher Anwalt tatsächlich zugelassen ist?" },
      a: {
        en: "Search the official Bundesweites Amtliches Anwaltsverzeichnis at rechtsanwaltsregister.org. Every admitted Rechtsanwalt is listed there with their Kammer membership and admitted court(s).",
        de: "Nutzen Sie das Bundesweite Amtliche Anwaltsverzeichnis unter rechtsanwaltsregister.org. Jede zugelassene Rechtsanwältin und jeder zugelassene Rechtsanwalt ist dort mit Kammerzugehörigkeit und Zulassungsgericht verzeichnet.",
      },
    },
    {
      q: { en: "What does an initial consultation typically cost?", de: "Was kostet eine Erstberatung üblicherweise?" },
      a: {
        en: "By §34 RVG the statutory cap for an initial consultation with a consumer is €190 plus VAT. Many firms charge less or credit the fee against later work.",
        de: "§ 34 RVG begrenzt die Erstberatung gegenüber Verbrauchern auf 190 € zzgl. USt. Viele Kanzleien berechnen weniger oder rechnen die Gebühr bei späterer Mandatierung an.",
      },
    },
    {
      q: { en: "Can I hire a lawyer admitted in another EU country?", de: "Kann ich eine in einem anderen EU-Land zugelassene Anwältin beauftragen?" },
      a: {
        en: "Yes. EU-admitted lawyers may provide cross-border services in Germany under their home title (Dir. 77/249/EEC). For ongoing establishment they register with a German Rechtsanwaltskammer under Dir. 98/5/EC.",
        de: "Ja. EU-zugelassene Anwälte dürfen unter Niederlassungs- und Dienstleistungsrichtlinie in Deutschland tätig werden — vorübergehend unter Heimatbezeichnung, dauerhaft nach Registrierung bei einer Rechtsanwaltskammer.",
      },
    },
    {
      q: { en: "What is a Fachanwalt and is it worth choosing one?", de: "Was ist ein Fachanwalt und lohnt es sich, einen zu wählen?" },
      a: {
        en: "A Fachanwalt is a specialist title regulated by the FAO. It requires additional training, a written exam, and proof of substantial case practice in the field — a strong signal of subject-matter depth.",
        de: "Ein Fachanwaltstitel nach der FAO setzt zusätzliche Fortbildung, eine schriftliche Prüfung und den Nachweis erheblicher Fallpraxis voraus — ein deutliches Qualitätsmerkmal in der jeweiligen Fachrichtung.",
      },
    },
    {
      q: { en: "Will my legal expense insurance pay the lawyer directly?", de: "Übernimmt meine Rechtsschutzversicherung die Anwaltskosten direkt?" },
      a: {
        en: "Most German Rechtsschutz policies issue a Deckungszusage (coverage confirmation) on request and pay the lawyer's RVG fees directly within the agreed scope, subject to the policy's deductible.",
        de: "Die meisten Rechtsschutzversicherungen erteilen auf Anfrage eine Deckungszusage und rechnen die RVG-Gebühren — abzüglich einer etwaigen Selbstbeteiligung — direkt mit der Kanzlei ab.",
      },
    },
    {
      q: { en: "Do I need a lawyer for small civil claims?", de: "Brauche ich für kleine Zivilsachen einen Anwalt?" },
      a: {
        en: "No. Before the Amtsgericht (claims up to €5,000) parties may appear without a lawyer. Before the Landgericht and higher courts representation by an admitted Rechtsanwalt is mandatory (Anwaltszwang).",
        de: "Nein. Vor dem Amtsgericht (Streitwert bis 5.000 €) besteht kein Anwaltszwang. Vor dem Landgericht und höheren Instanzen müssen sich Parteien durch einen zugelassenen Rechtsanwalt vertreten lassen.",
      },
    },
  ],
  lastReviewed: "2026-05-27",
  aiAssisted: true,
};

/* ------------------------------------------------------------------ */
/* Stubs for FR / ES / IT / PT — taglines only, full content via       */
/* scripts/generate-country-pillar.mjs.                                */
/* ------------------------------------------------------------------ */

function stub(opts: {
  taglineEn: string;
  taglineNative?: { locale: LocaleCode; text: string };
  ledeEn: string;
  ledeNative?: { locale: LocaleCode; text: string };
  bar: { en: string; verifyUrl: string };
}): CountryPillar {
  const tagline: PillarLocalized = { en: opts.taglineEn };
  const lede: PillarLocalized = { en: opts.ledeEn };
  if (opts.taglineNative) tagline[opts.taglineNative.locale] = opts.taglineNative.text;
  if (opts.ledeNative) lede[opts.ledeNative.locale] = opts.ledeNative.text;
  return {
    hero: { tagline, lede },
    legalSystem: { en: `${opts.ledeEn} Detailed legal-system primer coming soon — see the practice areas and cities below in the meantime.` },
    howToFindLawyer: { en: "Identify the practice area, verify the lawyer with the national bar register, and request a written fee estimate before instructing the firm. Many EU jurisdictions cap initial consultation fees by statute." },
    feesAndAid: { en: "Most EU countries operate statutory fee schedules for litigation and means-tested legal aid for low-income clients. Confirm fees in writing before engaging counsel." },
    barAssociation: {
      name: { en: opts.bar.en },
      verifyUrl: opts.bar.verifyUrl,
      membershipRules: { en: "All practising lawyers must be admitted to the national bar and carry mandatory professional indemnity insurance. Advertising rules are set by the national deontological code." },
    },
    crossBorderEU: { en: "Under the Establishment Directive 98/5/EC and the Services Directive 77/249/EEC, lawyers admitted in any EU member state may provide cross-border services and, after registration, establish a permanent practice." },
    faqs: [
      {
        q: { en: "How do I verify a lawyer's admission?" },
        a: { en: `Use the official registry at ${opts.bar.verifyUrl}. Every admitted lawyer is listed there.` },
      },
      {
        q: { en: "Can I hire a lawyer admitted in another EU country?" },
        a: { en: "Yes — EU rules allow cross-border services. For permanent establishment, the lawyer must register with the national bar." },
      },
    ],
    lastReviewed: "2026-05-27",
    aiAssisted: false,
  };
}

const FR = stub({
  taglineEn: "Find a registered avocat across France — verified against the CNB national roll.",
  taglineNative: { locale: "fr", text: "Trouvez un avocat inscrit en France — vérifié auprès de l'annuaire national du CNB." },
  ledeEn: "France has roughly 75,000 avocats, all members of one of the 164 local bars (barreaux) and represented nationally by the Conseil National des Barreaux (CNB). Fees, ethics and advertising follow the RIN (Règlement Intérieur National).",
  ledeNative: { locale: "fr", text: "La France compte environ 75 000 avocats, tous inscrits à l'un des 164 barreaux locaux et représentés au niveau national par le Conseil National des Barreaux (CNB). Honoraires, déontologie et publicité relèvent du RIN." },
  bar: { en: "Conseil National des Barreaux (CNB)", verifyUrl: "https://www.cnb.avocat.fr" },
});

const ES = stub({
  taglineEn: "Find a registered abogado across Spain — verified through the General Council of Spanish Lawyers.",
  taglineNative: { locale: "es", text: "Encuentre un abogado colegiado en España — verificado a través del Consejo General de la Abogacía Española." },
  ledeEn: "Spain has more than 150,000 practising abogados, organised in 83 provincial colegios under the Consejo General de la Abogacía Española (CGAE). Ethics and fees follow the Código Deontológico and Ley de Servicios Profesionales.",
  ledeNative: { locale: "es", text: "España cuenta con más de 150 000 abogados en ejercicio, organizados en 83 colegios provinciales bajo el Consejo General de la Abogacía Española (CGAE). Deontología y honorarios se rigen por el Código Deontológico y la Ley de Servicios Profesionales." },
  bar: { en: "Consejo General de la Abogacía Española", verifyUrl: "https://www.abogacia.es" },
});

const IT = stub({
  taglineEn: "Find a registered avvocato across Italy — verified through the Consiglio Nazionale Forense.",
  taglineNative: { locale: "it", text: "Trova un avvocato iscritto in Italia — verificato tramite il Consiglio Nazionale Forense." },
  ledeEn: "Italy has approximately 240,000 avvocati admitted to one of the 140 Ordini circondariali under the Consiglio Nazionale Forense (CNF). Conduct is governed by the Codice Deontologico Forense and Law 247/2012.",
  ledeNative: { locale: "it", text: "L'Italia conta circa 240 000 avvocati iscritti a uno dei 140 Ordini circondariali sotto il Consiglio Nazionale Forense (CNF). La condotta è disciplinata dal Codice Deontologico Forense e dalla Legge 247/2012." },
  bar: { en: "Consiglio Nazionale Forense (CNF)", verifyUrl: "https://www.consiglionazionaleforense.it" },
});

const PT = stub({
  taglineEn: "Find a registered advogado across Portugal — verified through the Ordem dos Advogados.",
  taglineNative: { locale: "pt", text: "Encontre um advogado inscrito em Portugal — verificado através da Ordem dos Advogados." },
  ledeEn: "Portugal has around 33,000 advogados admitted to the Ordem dos Advogados under the Estatuto da Ordem (Law 145/2015). Lisbon, Porto and Coimbra concentrate the largest concentration of firms.",
  ledeNative: { locale: "pt", text: "Portugal conta com cerca de 33 000 advogados inscritos na Ordem dos Advogados ao abrigo do Estatuto da Ordem (Lei 145/2015). Lisboa, Porto e Coimbra concentram o maior número de sociedades." },
  bar: { en: "Ordem dos Advogados", verifyUrl: "https://portal.oa.pt" },
});

export const COUNTRY_PILLARS: Record<EuCountryCode, CountryPillar> = {
  de: DE,
  fr: FR,
  es: ES,
  it: IT,
  pt: PT,
};
