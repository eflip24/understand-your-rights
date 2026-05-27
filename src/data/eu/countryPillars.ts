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
/* FR / ES / IT / PT — fully authored below in their native locale +  */
/* English. Other locales fall back to English via pickPillarLocale.  */
/* ------------------------------------------------------------------ */



/* ------------------------------------------------------------------ */
/* FRANCE — fully authored (FR + EN).                                 */
/* ------------------------------------------------------------------ */

const FR: CountryPillar = {
  hero: {
    tagline: {
      en: "Find a registered avocat across France — verified against the CNB national roll.",
      fr: "Trouvez un avocat inscrit en France — vérifié auprès de l'annuaire national du CNB.",
    },
    lede: {
      en: "France has roughly 75,000 avocats, all members of one of the 164 local bars (barreaux) and represented nationally by the Conseil National des Barreaux (CNB). This guide explains how the French legal system is structured, how to instruct an avocat, what fees and legal aid (aide juridictionnelle) you can expect, and how EU-admitted lawyers may practise in France.",
      fr: "La France compte environ 75 000 avocats, tous inscrits à l'un des 164 barreaux locaux et représentés au niveau national par le Conseil National des Barreaux (CNB). Ce guide présente l'organisation judiciaire française, la manière de mandater un avocat, le régime des honoraires et de l'aide juridictionnelle, ainsi que la pratique transfrontalière des avocats européens.",
    },
  },
  legalSystem: {
    en: "France is a civil law jurisdiction structured around codified texts — the Code civil, Code de commerce, Code pénal and Code du travail being the most cited in everyday practice. The judicial order (ordre judiciaire) handles civil and criminal cases through the Tribunal judiciaire → Cour d'appel → Cour de cassation. A parallel administrative order (ordre administratif) hears disputes against the State via Tribunal administratif → Cour administrative d'appel → Conseil d'État. The Conseil constitutionnel reviews constitutional questions, and the Tribunal des conflits resolves jurisdictional clashes between the two orders. Avocats may plead before every first-instance and appellate court, but a separate cohort — avocats au Conseil d'État et à la Cour de cassation — holds the monopoly on representation before those two apex courts.",
    fr: "La France est une juridiction de droit civil organisée autour de codes — Code civil, Code de commerce, Code pénal et Code du travail au premier rang. L'ordre judiciaire traite le contentieux civil et pénal du Tribunal judiciaire à la Cour de cassation, en passant par la Cour d'appel. L'ordre administratif statue sur les litiges contre l'Administration, du Tribunal administratif au Conseil d'État via la Cour administrative d'appel. Le Conseil constitutionnel contrôle la constitutionnalité des lois et le Tribunal des conflits tranche les conflits de compétence. L'avocat peut plaider devant toutes les juridictions du fond et d'appel ; seuls les avocats au Conseil d'État et à la Cour de cassation peuvent représenter les parties devant ces deux juridictions suprêmes.",
  },
  howToFindLawyer: {
    en: "Begin by identifying the practice area and, where possible, choose an avocat holding a recognised mention de spécialisation (e.g. droit du travail, droit de la famille, droit fiscal) — these specialisations are awarded by the CNB after four years of practice and a specialist exam. Verify any candidate via the CNB's online annuaire at https://www.cnb.avocat.fr/fr/annuaire-des-avocats-de-france. A first consultation (consultation initiale) is typically priced between €80 and €250 and must be the subject of a written fee agreement (convention d'honoraires), now mandatory under article 10 of the Loi du 31 décembre 1971. The avocat will normally request a power of attorney (mandat ad litem) and either a fixed fee, an hourly rate, or a partial success fee (honoraire de résultat), which is permitted in France as a complement to a base fee but not as the sole compensation.",
    fr: "Commencez par identifier la matière concernée et, si possible, retenez un avocat titulaire d'une mention de spécialisation reconnue (droit du travail, droit de la famille, droit fiscal, etc.) — ces spécialisations sont délivrées par le CNB après quatre années de pratique et un examen spécifique. Vérifiez chaque candidat dans l'annuaire officiel du CNB à l'adresse https://www.cnb.avocat.fr/fr/annuaire-des-avocats-de-france. Une consultation initiale coûte généralement entre 80 € et 250 € et doit faire l'objet d'une convention d'honoraires écrite, désormais obligatoire en vertu de l'article 10 de la loi du 31 décembre 1971. L'avocat demande habituellement un mandat ad litem et propose une rémunération forfaitaire, horaire, ou assortie d'un honoraire de résultat, autorisé en complément d'un honoraire de base mais jamais à titre exclusif.",
  },
  feesAndAid: {
    en: "Avocat fees in France are freely negotiated but must appear in a written convention d'honoraires. Hourly rates typically range from €150 in regional firms to €600+ in Paris business firms. Pure contingency (pacte de quota litis) is prohibited; partial result fees are allowed. Aide juridictionnelle is the means-tested legal aid scheme: as of 2026, full coverage applies up to a reference income of around €1,074 per month for a single adult, with partial coverage on a sliding scale up to roughly €1,612. The application (formulaire Cerfa 16146) is filed at the bureau d'aide juridictionnelle of the competent tribunal judiciaire. Protection juridique policies — frequently bundled with home or car insurance — also fund many employment, consumer and neighbour disputes.",
    fr: "Les honoraires sont librement fixés mais doivent figurer dans une convention d'honoraires écrite. Les taux horaires vont d'environ 150 € en région à plus de 600 € dans les cabinets d'affaires parisiens. Le pacte de quota litis (honoraire exclusivement de résultat) est interdit ; l'honoraire de résultat complémentaire est admis. L'aide juridictionnelle est l'aide légale sous condition de ressources : en 2026, la prise en charge totale s'applique jusqu'à environ 1 074 € de revenu de référence pour une personne seule, avec une prise en charge partielle dégressive jusqu'à environ 1 612 €. La demande (formulaire Cerfa 16146) se dépose au bureau d'aide juridictionnelle du tribunal judiciaire compétent. La protection juridique, souvent adossée à une assurance habitation ou automobile, finance également de nombreux litiges du travail, de la consommation ou de voisinage.",
  },
  barAssociation: {
    name: {
      en: "Conseil National des Barreaux (CNB)",
      fr: "Conseil National des Barreaux (CNB)",
    },
    verifyUrl: "https://www.cnb.avocat.fr",
    membershipRules: {
      en: "Every practising avocat must be enrolled with one of the 164 barreaux and carry mandatory professional indemnity insurance (RC professionnelle) plus a financial guarantee for client funds (garantie de représentation des fonds). The Règlement Intérieur National (RIN) governs ethics, conflicts of interest, advertising, and the strict professional secret (secret professionnel) which under article 226-13 of the Code pénal is criminally protected. Advertising is permitted under article 10.2 of the RIN provided it is dignified, accurate, and does not include client testimonials.",
      fr: "Tout avocat en exercice est inscrit à l'un des 164 barreaux et doit justifier d'une assurance responsabilité civile professionnelle ainsi que d'une garantie de représentation des fonds clients. Le Règlement Intérieur National (RIN) régit la déontologie, les conflits d'intérêts, la publicité et le secret professionnel, pénalement protégé par l'article 226-13 du Code pénal. La publicité est autorisée par l'article 10.2 du RIN sous réserve de dignité, d'exactitude et d'absence de témoignages de clients.",
    },
  },
  crossBorderEU: {
    en: "Under the Establishment Directive 98/5/EC, transposed by the Loi du 31 décembre 1971 (art. 83 et seq.), EU-admitted lawyers may practise in France under their home-country title (e.g. Rechtsanwalt, abogado, avvocato) after registering with a French barreau. After three years of effective and regular practice in French law they may apply for full admission as avocat without re-sitting the CAPA. Short-term cross-border services are covered by Directive 77/249/EEC: a foreign EU lawyer may, for instance, plead a single hearing in France under their home title, in coordination with a locally inscribed avocat where mandatory representation applies.",
    fr: "En application de la directive 98/5/CE, transposée par la loi du 31 décembre 1971 (art. 83 et s.), tout avocat admis dans un autre État membre peut exercer en France sous son titre d'origine (Rechtsanwalt, abogado, avvocato, etc.) après inscription auprès d'un barreau français. Après trois années d'activité effective et régulière en droit français, il peut demander son intégration pleine et entière dans la profession d'avocat sans repasser le CAPA. Les prestations transfrontalières temporaires sont régies par la directive 77/249/CEE : un avocat européen peut plaider une audience ponctuelle en France sous son titre d'origine, en lien avec un avocat localement inscrit lorsque la postulation est obligatoire.",
  },
  faqs: [
    { q: { en: "How do I verify that a French lawyer is genuinely an avocat?", fr: "Comment vérifier qu'un professionnel est réellement avocat en France ?" }, a: { en: "Search the CNB's national annuaire at cnb.avocat.fr. Every practising avocat is listed with their barreau and any specialisations.", fr: "Consultez l'annuaire national du CNB sur cnb.avocat.fr. Tout avocat en exercice y figure avec son barreau et ses éventuelles mentions de spécialisation." } },
    { q: { en: "Is a written fee agreement mandatory?", fr: "La convention d'honoraires est-elle obligatoire ?" }, a: { en: "Yes. Since 2015 article 10 of the Loi du 31 décembre 1971 requires a written convention d'honoraires for every retainer, save for urgent matters.", fr: "Oui. Depuis 2015, l'article 10 de la loi du 31 décembre 1971 impose une convention d'honoraires écrite pour tout mandat, sauf urgence avérée." } },
    { q: { en: "Who qualifies for aide juridictionnelle?", fr: "Qui peut bénéficier de l'aide juridictionnelle ?" }, a: { en: "Households below the statutory revenu fiscal de référence threshold — around €1,074/month for a single adult in 2026 — qualify for full aid, with partial aid on a sliding scale.", fr: "Les foyers dont le revenu fiscal de référence est inférieur au seuil légal — environ 1 074 € par mois pour une personne seule en 2026 — bénéficient de l'aide totale ; au-delà, une prise en charge partielle dégressive s'applique." } },
    { q: { en: "Can I instruct a lawyer admitted in another EU country?", fr: "Puis-je mandater un avocat admis dans un autre pays de l'UE ?" }, a: { en: "Yes. EU rules (Directives 77/249/EEC and 98/5/EC) allow cross-border services and, after registration with a French barreau, permanent practice.", fr: "Oui. Les directives 77/249/CEE et 98/5/CE autorisent les prestations transfrontalières et, après inscription auprès d'un barreau français, l'établissement permanent." } },
    { q: { en: "Do I need an avocat for every court?", fr: "L'avocat est-il obligatoire devant toutes les juridictions ?" }, a: { en: "No. Representation is optional before the conseil de prud'hommes, tribunaux de proximité (under €10,000) and some commercial matters, but mandatory before the tribunal judiciaire above €10,000 and before all appellate courts.", fr: "Non. La représentation est facultative devant le conseil de prud'hommes, les tribunaux de proximité (sous 10 000 €) et certaines instances commerciales, mais obligatoire devant le tribunal judiciaire au-delà de 10 000 € et devant toutes les cours d'appel." } },
    { q: { en: "Can avocats charge a success fee?", fr: "L'avocat peut-il pratiquer un honoraire de résultat ?" }, a: { en: "Yes, but only as a complement to a base fee. A purely contingency-based agreement (pacte de quota litis) is prohibited by article 10 of the 1971 law.", fr: "Oui, uniquement en complément d'un honoraire de base. Le pacte de quota litis (honoraire exclusivement de résultat) est prohibé par l'article 10 de la loi de 1971." } },
  ],
  lastReviewed: "2026-05-27",
  aiAssisted: true,
};

/* ------------------------------------------------------------------ */
/* SPAIN — fully authored (ES + EN).                                  */
/* ------------------------------------------------------------------ */

const ES: CountryPillar = {
  hero: {
    tagline: {
      en: "Find a registered abogado across Spain — verified through the General Council of Spanish Lawyers.",
      es: "Encuentre un abogado colegiado en España — verificado a través del Consejo General de la Abogacía Española.",
    },
    lede: {
      en: "Spain has more than 150,000 practising abogados, organised in 83 provincial Colegios de la Abogacía under the Consejo General de la Abogacía Española (CGAE). This guide covers the structure of the Spanish judicial system, how to instruct an abogado, the rules on fees and legal aid (justicia gratuita), and the cross-border practice of EU lawyers.",
      es: "España cuenta con más de 150 000 abogados en ejercicio, organizados en 83 Colegios de la Abogacía provinciales bajo el Consejo General de la Abogacía Española (CGAE). Esta guía describe la estructura del sistema judicial español, cómo contratar un abogado, el régimen de honorarios y de justicia gratuita, y la práctica transfronteriza de los abogados europeos.",
    },
  },
  legalSystem: {
    en: "Spain is a civil law jurisdiction whose principal codes are the Código Civil, the Código Penal, the Ley de Enjuiciamiento Civil and the Ley de Enjuiciamiento Criminal. The judiciary is split by subject matter into four orders — civil, criminal, contencioso-administrativo and social (labour) — each rising through Juzgado → Audiencia Provincial (or equivalent) → Tribunal Superior de Justicia of the autonomous community → Tribunal Supremo. The Tribunal Constitucional reviews constitutional rights via the recurso de amparo. Procedural representation typically requires both an abogado (legal advocacy) and a procurador (court agent) before higher courts, although a single abogado suffices for many first-instance matters since the 2009 reform.",
    es: "España es un ordenamiento de Derecho civil cuyos códigos principales son el Código Civil, el Código Penal, la Ley de Enjuiciamiento Civil y la Ley de Enjuiciamiento Criminal. La jurisdicción se divide en cuatro órdenes — civil, penal, contencioso-administrativo y social — que ascienden del Juzgado a la Audiencia Provincial (o equivalente), al Tribunal Superior de Justicia de la comunidad autónoma y al Tribunal Supremo. El Tribunal Constitucional tutela los derechos fundamentales mediante el recurso de amparo. La representación procesal exige normalmente abogado y procurador ante las instancias superiores, aunque tras la reforma de 2009 basta el abogado en muchas actuaciones de primera instancia.",
  },
  howToFindLawyer: {
    en: "Start by identifying the practice area and check the abogado's registration in the Censo de Letrados of their Colegio (e.g. ICAM for Madrid, ICAB for Barcelona). Most colegios publish a free online lookup; the CGAE consolidates listings at https://www.abogacia.es. Initial consultations are commonly priced between €60 and €200 and the abogado must give you a presupuesto (written fee estimate) and an hoja de encargo (engagement letter) under article 13 of the Estatuto General de la Abogacía Española (Real Decreto 135/2021). Many colegios run a Servicio de Orientación Jurídica (SOJ) where citizens can obtain free preliminary guidance before applying for justicia gratuita.",
    es: "Identifique la materia y verifique la colegiación del abogado en el Censo de Letrados de su Colegio (por ejemplo, ICAM en Madrid o ICAB en Barcelona). La mayoría de los colegios ofrece un buscador en línea gratuito y el CGAE consolida los datos en https://www.abogacia.es. La consulta inicial cuesta normalmente entre 60 € y 200 €; el abogado debe entregar un presupuesto y una hoja de encargo conforme al artículo 13 del Estatuto General de la Abogacía Española (Real Decreto 135/2021). Numerosos colegios cuentan con un Servicio de Orientación Jurídica (SOJ) donde se ofrece una primera orientación gratuita antes de tramitar la justicia gratuita.",
  },
  feesAndAid: {
    en: "Fees are freely agreed in Spain since the Ley Ómnibus 25/2009 abolished mandatory bar scales; only orientative criteria (criterios orientadores) remain, used mainly for taxation of costs (tasación de costas). Hourly rates run from €100 in regional firms to €450+ in Madrid and Barcelona business firms. Justicia gratuita (Ley 1/1996) provides means-tested legal aid covering abogado, procurador and court fees: as of 2026 the threshold is roughly twice the IPREM (around €1,200 per month for a single adult), with higher ceilings for larger families or victims of gender violence, terrorism or human trafficking, who qualify regardless of income. Applications are filed with the local Comisión de Asistencia Jurídica Gratuita through the colegio.",
    es: "Los honorarios se pactan libremente desde la Ley Ómnibus 25/2009, que suprimió los baremos colegiales obligatorios; sólo subsisten los criterios orientadores, utilizados sobre todo en la tasación de costas. Las tarifas horarias oscilan entre 100 € en despachos regionales y más de 450 € en grandes despachos de Madrid o Barcelona. La justicia gratuita (Ley 1/1996) cubre, con criterio de renta, los honorarios de abogado y procurador y las tasas judiciales: en 2026 el umbral se sitúa en torno al doble del IPREM (unos 1 200 € mensuales para una persona sola), con límites superiores para familias numerosas o víctimas de violencia de género, terrorismo o trata, beneficiarias con independencia de su renta. La solicitud se presenta ante la Comisión de Asistencia Jurídica Gratuita a través del colegio.",
  },
  barAssociation: {
    name: { en: "Consejo General de la Abogacía Española (CGAE)", es: "Consejo General de la Abogacía Española (CGAE)" },
    verifyUrl: "https://www.abogacia.es",
    membershipRules: {
      en: "Every practising abogado must hold the Máster Universitario de Acceso a la Abogacía, pass the state Examen de Acceso, swear in at a Colegio, and carry mandatory professional indemnity insurance. The Estatuto General de la Abogacía Española (RD 135/2021) and the Código Deontológico govern ethics, conflicts and advertising. Advertising is permitted but must be truthful and respect the dignity of the profession; comparative or sensationalist advertising remains prohibited.",
      es: "Todo abogado en ejercicio debe haber cursado el Máster Universitario de Acceso a la Abogacía, superar el Examen de Acceso, jurar o prometer ante un Colegio y contar con seguro obligatorio de responsabilidad civil profesional. El Estatuto General de la Abogacía Española (RD 135/2021) y el Código Deontológico regulan la deontología, los conflictos y la publicidad. Se admite la publicidad veraz y digna; la publicidad comparativa o sensacionalista permanece prohibida.",
    },
  },
  crossBorderEU: {
    en: "Under the Establishment Directive 98/5/EC, transposed by Real Decreto 936/2001 (now consolidated in RD 135/2021), EU-admitted lawyers may practise in Spain under their home-country title after registering with a Spanish Colegio. After three years of effective and regular practice in Spanish law they may apply for full integration as abogado without sitting the state access exam. Short-term cross-border services are governed by Directive 77/249/EEC and the corresponding Spanish rules: a Portuguese advogado or French avocat may, for instance, appear in a single Spanish hearing under their home title, working with a local colegiado where mandatory.",
    es: "En virtud de la Directiva 98/5/CE, transpuesta por el Real Decreto 936/2001 (hoy consolidado en el RD 135/2021), los abogados admitidos en otro Estado miembro pueden ejercer en España bajo su título de origen tras inscribirse en un Colegio español. Tras tres años de actividad efectiva y regular en Derecho español, pueden solicitar la integración plena como abogado sin necesidad de superar el examen de acceso. Las prestaciones transfronterizas puntuales se rigen por la Directiva 77/249/CEE y la normativa española: un advogado portugués o un avocat francés puede actuar puntualmente en España bajo su título de origen, en colaboración con un colegiado local cuando sea preceptivo.",
  },
  faqs: [
    { q: { en: "How do I confirm that an abogado is genuinely registered?", es: "¿Cómo confirmo que un abogado está realmente colegiado?" }, a: { en: "Search the CGAE consolidated census at abogacia.es or the censo of the relevant Colegio (ICAM, ICAB, etc.). All practising abogados must be colegiados ejercientes.", es: "Consulte el censo consolidado del CGAE en abogacia.es o el censo del Colegio correspondiente (ICAM, ICAB, etc.). Todo abogado en ejercicio debe figurar como colegiado ejerciente." } },
    { q: { en: "Is a written engagement letter required?", es: "¿Es obligatoria la hoja de encargo?" }, a: { en: "Yes. Article 13 of the Estatuto General de la Abogacía Española (RD 135/2021) requires a written hoja de encargo and presupuesto for any retainer with a consumer.", es: "Sí. El artículo 13 del Estatuto General de la Abogacía Española (RD 135/2021) exige hoja de encargo escrita y presupuesto previo en todo encargo con un consumidor." } },
    { q: { en: "Who qualifies for justicia gratuita?", es: "¿Quién tiene derecho a la justicia gratuita?" }, a: { en: "Households below roughly twice the IPREM (~€1,200/month for a single adult in 2026) qualify; victims of gender violence, terrorism or trafficking qualify regardless of income.", es: "Los hogares con ingresos inferiores aproximadamente al doble del IPREM (~1 200 € mensuales para una persona sola en 2026) tienen derecho; las víctimas de violencia de género, terrorismo o trata acceden con independencia de su renta." } },
    { q: { en: "Do I need both an abogado and a procurador?", es: "¿Necesito abogado y procurador a la vez?" }, a: { en: "For most appellate and constitutional proceedings, yes. For many first-instance civil and labour cases a single abogado is enough since the 2009 procedural reform.", es: "Para la mayoría de los procedimientos de apelación y constitucionales, sí. En muchas actuaciones civiles y laborales de primera instancia basta con el abogado desde la reforma procesal de 2009." } },
    { q: { en: "Can I hire a lawyer admitted in another EU country?", es: "¿Puedo contratar a un abogado admitido en otro país de la UE?" }, a: { en: "Yes. The Establishment and Services Directives allow cross-border practice. For permanent establishment the lawyer must register with a Spanish Colegio.", es: "Sí. Las directivas de establecimiento y de servicios permiten la práctica transfronteriza. Para el establecimiento permanente el abogado debe inscribirse en un Colegio español." } },
    { q: { en: "Are contingency fees allowed in Spain?", es: "¿Se admiten los honorarios pactados sólo a éxito en España?" }, a: { en: "Yes. After the 2008 ruling of the Tribunal Supremo (sentencia 4 nov. 2008) the cuota litis is permitted, provided it is freely agreed in writing and respects the principles of the Código Deontológico.", es: "Sí. Tras la sentencia del Tribunal Supremo de 4 de noviembre de 2008, la cuota litis está permitida siempre que se pacte libremente por escrito y se respeten los principios del Código Deontológico." } },
  ],
  lastReviewed: "2026-05-27",
  aiAssisted: true,
};

/* ------------------------------------------------------------------ */
/* ITALY — fully authored (IT + EN).                                  */
/* ------------------------------------------------------------------ */

const IT: CountryPillar = {
  hero: {
    tagline: {
      en: "Find a registered avvocato across Italy — verified through the Consiglio Nazionale Forense.",
      it: "Trova un avvocato iscritto in Italia — verificato tramite il Consiglio Nazionale Forense.",
    },
    lede: {
      en: "Italy has approximately 240,000 avvocati admitted to one of the 140 Ordini circondariali under the Consiglio Nazionale Forense (CNF). This guide explains the structure of the Italian legal system, how to instruct an avvocato, the rules on fees (parametri forensi) and patrocinio a spese dello Stato (state-funded legal aid), and the cross-border practice of EU lawyers.",
      it: "L'Italia conta circa 240 000 avvocati iscritti a uno dei 140 Ordini circondariali sotto il Consiglio Nazionale Forense (CNF). Questa guida illustra l'organizzazione della giustizia italiana, come conferire l'incarico a un avvocato, il regime dei compensi (parametri forensi) e del patrocinio a spese dello Stato, nonché l'esercizio transfrontaliero degli avvocati europei.",
    },
  },
  legalSystem: {
    en: "Italy is a civil law jurisdiction whose principal codes are the Codice civile, the Codice penale, the Codice di procedura civile and the Codice di procedura penale. Ordinary civil and criminal disputes proceed through Giudice di Pace or Tribunale → Corte d'Appello → Corte di Cassazione. Administrative disputes are heard by the Tribunale Amministrativo Regionale (TAR) and the Consiglio di Stato. Tax matters go to the Corti di Giustizia Tributaria (di primo e secondo grado) and on to the Corte di Cassazione. Constitutional review is reserved to the Corte Costituzionale. Representation before the Cassazione requires an avvocato cassazionista — a separate roll requiring 12 years of practice or a specific exam.",
    it: "L'Italia è una giurisdizione di civil law con codici principali — Codice civile, Codice penale, Codice di procedura civile e Codice di procedura penale. Le controversie civili e penali ordinarie procedono dal Giudice di Pace o Tribunale alla Corte d'Appello e alla Corte di Cassazione. Il contenzioso amministrativo è di competenza del Tribunale Amministrativo Regionale (TAR) e del Consiglio di Stato. Le liti tributarie sono trattate dalle Corti di Giustizia Tributaria (di primo e secondo grado) e poi dalla Corte di Cassazione. Il controllo di costituzionalità spetta alla Corte Costituzionale. La rappresentanza davanti alla Cassazione richiede l'iscrizione all'albo speciale dei cassazionisti — abilitazione che presuppone dodici anni di esercizio o un esame specifico.",
  },
  howToFindLawyer: {
    en: "Identify the practice area and verify the avvocato in the Albo Unico Nazionale maintained by the CNF at https://www.consiglionazionaleforense.it. Italy recognises formal specialisations (specializzazioni forensi) under DM 144/2015 — for instance diritto del lavoro, diritto di famiglia, diritto tributario — awarded after a two-year course or proven experience plus an evaluation. Initial consultations typically cost €70–€200 and the avvocato must give you a written preventivo (cost estimate) under article 13 of Law 247/2012. Engagement is formalised through a procura alle liti (power of attorney) and a mandato professionale; fee agreements are free in form but the parametri forensi (DM 55/2014, updated by DM 147/2022) provide reference values for both negotiation and judicial liquidation of costs.",
    it: "Individuata la materia, verifica l'avvocato nell'Albo Unico Nazionale del CNF all'indirizzo https://www.consiglionazionaleforense.it. L'Italia riconosce specializzazioni forensi formali ai sensi del DM 144/2015 (diritto del lavoro, diritto di famiglia, diritto tributario, ecc.), conseguibili con corso biennale o comprovata esperienza ed esame. La consulenza iniziale costa di norma tra 70 € e 200 € e l'avvocato deve consegnare un preventivo scritto ai sensi dell'art. 13 della Legge 247/2012. L'incarico si formalizza con la procura alle liti e con un mandato professionale; il compenso è liberamente pattuito, ma i parametri forensi (DM 55/2014, aggiornati dal DM 147/2022) costituiscono il riferimento sia per la trattativa sia per la liquidazione giudiziale delle spese.",
  },
  feesAndAid: {
    en: "Fees are freely agreed since the 2006 Bersani liberalisation, but every retainer requires a written preventivo. Pattuizioni a quota lite (pure contingency) are prohibited by article 13 of Law 247/2012; result-based supplements on top of a base fee are allowed. The parametri forensi (DM 55/2014, last updated 2022) provide reference values used by judges when liquidating costs. Patrocinio a spese dello Stato (DPR 115/2002) covers civil, criminal and administrative proceedings for individuals with a taxable income below the statutory threshold — €12,838.01 in 2026, raised by €1,032.91 per additional household member in civil cases. Applications are filed with the competent Consiglio dell'Ordine, which issues a provisional admission within 10 days.",
    it: "I compensi sono liberamente pattuiti dalla liberalizzazione Bersani del 2006, ma ogni incarico richiede un preventivo scritto. Sono vietati i patti di quota lite ai sensi dell'art. 13 della Legge 247/2012; sono ammessi compensi parametrati al risultato in aggiunta a un compenso base. I parametri forensi (DM 55/2014, ultimo aggiornamento 2022) costituiscono il riferimento per la liquidazione giudiziale. Il patrocinio a spese dello Stato (DPR 115/2002) copre i procedimenti civili, penali e amministrativi per chi abbia un reddito imponibile inferiore alla soglia di legge — 12 838,01 € nel 2026, aumentata di 1 032,91 € per ciascun convivente nelle cause civili. La domanda si presenta al Consiglio dell'Ordine competente, che decide in via anticipata entro dieci giorni.",
  },
  barAssociation: {
    name: { en: "Consiglio Nazionale Forense (CNF)", it: "Consiglio Nazionale Forense (CNF)" },
    verifyUrl: "https://www.consiglionazionaleforense.it",
    membershipRules: {
      en: "Every practising avvocato must hold a Laurea Magistrale in Giurisprudenza, complete an 18-month tirocinio (apprenticeship), pass the Esame di Stato, swear in before the local Corte d'Appello and enrol in an Ordine. Mandatory continuous professional development (CPD) and professional indemnity insurance under article 12 of Law 247/2012 are required. The Codice Deontologico Forense regulates ethics, conflicts and advertising; informative advertising is permitted, but comparative or laudatory advertising remains forbidden.",
      it: "Ogni avvocato in esercizio deve aver conseguito la Laurea Magistrale in Giurisprudenza, completato un tirocinio di 18 mesi, superato l'Esame di Stato, prestato giuramento davanti alla Corte d'Appello e iscritto un Ordine territoriale. Sono obbligatorie la formazione continua e l'assicurazione professionale ai sensi dell'art. 12 della Legge 247/2012. Il Codice Deontologico Forense disciplina deontologia, conflitti e pubblicità; la pubblicità informativa è ammessa, mentre quella comparativa o elogiativa resta vietata.",
    },
  },
  crossBorderEU: {
    en: "Under the Establishment Directive 98/5/EC, transposed by Legislative Decree 96/2001, EU-admitted lawyers may practise in Italy under their home-country title after registering in the sezione speciale of an Ordine. After three years of effective and regular practice in Italian law they may apply for full integration as avvocato without sitting the Esame di Stato. Short-term cross-border services follow Directive 77/249/EEC and Law 31/1982: an EU lawyer may, for instance, plead a single Italian hearing under their home title, in coordination with an Italian avvocato where mandatory representation applies.",
    it: "Ai sensi della Direttiva 98/5/CE, recepita dal D.lgs. 96/2001, gli avvocati ammessi in un altro Stato membro possono esercitare in Italia sotto il titolo di origine dopo l'iscrizione nella sezione speciale di un Ordine. Dopo tre anni di attività effettiva e regolare nel diritto italiano possono chiedere l'integrazione piena come avvocato senza sostenere l'Esame di Stato. Le prestazioni transfrontaliere occasionali sono regolate dalla Direttiva 77/249/CEE e dalla Legge 31/1982: un avvocato europeo può, per esempio, discutere una singola udienza in Italia sotto il proprio titolo, in collaborazione con un avvocato italiano quando la rappresentanza è obbligatoria.",
  },
  faqs: [
    { q: { en: "How do I check that an Italian lawyer is genuinely an avvocato?", it: "Come verifico che un professionista sia realmente avvocato in Italia?" }, a: { en: "Use the Albo Unico Nazionale on the CNF site (consiglionazionaleforense.it). Every practising avvocato is listed with their Ordine of enrolment.", it: "Utilizza l'Albo Unico Nazionale sul sito del CNF (consiglionazionaleforense.it). Ogni avvocato in esercizio è iscritto con il proprio Ordine di appartenenza." } },
    { q: { en: "Is a written cost estimate mandatory?", it: "Il preventivo scritto è obbligatorio?" }, a: { en: "Yes. Article 13 of Law 247/2012 requires the avvocato to provide a written preventivo to the client at the time of engagement.", it: "Sì. L'art. 13 della Legge 247/2012 impone all'avvocato la consegna di un preventivo scritto al momento del conferimento dell'incarico." } },
    { q: { en: "Who qualifies for patrocinio a spese dello Stato?", it: "Chi ha diritto al patrocinio a spese dello Stato?" }, a: { en: "Individuals with a taxable income below €12,838.01 (2026 threshold), increased by €1,032.91 per cohabitant in civil cases. Higher thresholds apply in criminal matters.", it: "I cittadini con reddito imponibile inferiore a 12 838,01 € (soglia 2026), aumentato di 1 032,91 € per ogni convivente nelle cause civili. Soglie più elevate valgono per il penale." } },
    { q: { en: "Can avvocati charge a contingency fee?", it: "L'avvocato può pattuire la quota lite?" }, a: { en: "No. The patto di quota lite is forbidden by article 13 of Law 247/2012. Result-based supplements added to a base fee are admitted.", it: "No. Il patto di quota lite è vietato dall'art. 13 della Legge 247/2012. È ammesso un compenso aggiuntivo parametrato al risultato in aggiunta a un compenso base." } },
    { q: { en: "Do I need an avvocato cassazionista to appeal to the Court of Cassation?", it: "Serve un avvocato cassazionista per ricorrere in Cassazione?" }, a: { en: "Yes. Only lawyers enrolled in the Albo Speciale dei Cassazionisti may represent parties before the Corte di Cassazione, the Consiglio di Stato and the higher constitutional courts.", it: "Sì. Solo gli iscritti all'Albo Speciale dei Cassazionisti possono rappresentare le parti davanti alla Corte di Cassazione, al Consiglio di Stato e alle giurisdizioni superiori." } },
    { q: { en: "Can I hire a lawyer admitted in another EU country?", it: "Posso conferire l'incarico a un avvocato ammesso in un altro Paese UE?" }, a: { en: "Yes. The Establishment and Services Directives allow cross-border practice; for permanent establishment the lawyer must register in the sezione speciale of an Italian Ordine.", it: "Sì. Le direttive europee consentono l'esercizio transfrontaliero; per lo stabilimento permanente è necessaria l'iscrizione nella sezione speciale di un Ordine italiano." } },
  ],
  lastReviewed: "2026-05-27",
  aiAssisted: true,
};

/* ------------------------------------------------------------------ */
/* PORTUGAL — fully authored (PT + EN).                               */
/* ------------------------------------------------------------------ */

const PT: CountryPillar = {
  hero: {
    tagline: {
      en: "Find a registered advogado across Portugal — verified through the Ordem dos Advogados.",
      pt: "Encontre um advogado inscrito em Portugal — verificado através da Ordem dos Advogados.",
    },
    lede: {
      en: "Portugal has around 33,000 advogados admitted to the Ordem dos Advogados under the Estatuto da Ordem dos Advogados (Law 145/2015). This guide explains how the Portuguese legal system is organised, how to instruct an advogado, the rules on fees and protecção jurídica (legal aid under Law 34/2004), and the cross-border practice of EU lawyers.",
      pt: "Portugal conta com cerca de 33 000 advogados inscritos na Ordem dos Advogados ao abrigo do Estatuto da Ordem dos Advogados (Lei 145/2015). Este guia explica a organização do sistema judicial português, como mandatar um advogado, o regime dos honorários e da protecção jurídica (Lei 34/2004), e a prática transfronteiriça dos advogados europeus.",
    },
  },
  legalSystem: {
    en: "Portugal is a civil law jurisdiction whose principal codes are the Código Civil, the Código Penal, the Código de Processo Civil and the Código de Processo Penal. The ordinary courts proceed from the Tribunal de Comarca → Tribunal da Relação (Lisbon, Porto, Coimbra, Évora, Guimarães) → Supremo Tribunal de Justiça. Administrative and tax matters run through the Tribunais Administrativos e Fiscais → Tribunais Centrais Administrativos → Supremo Tribunal Administrativo. Constitutional review is reserved to the Tribunal Constitucional. Representation by an advogado is mandatory for civil claims above €5,000 and for all appellate and supreme-court proceedings.",
    pt: "Portugal é uma jurisdição de civil law cujos códigos fundamentais são o Código Civil, o Código Penal, o Código de Processo Civil e o Código de Processo Penal. Os tribunais comuns evoluem do Tribunal de Comarca para o Tribunal da Relação (Lisboa, Porto, Coimbra, Évora, Guimarães) e o Supremo Tribunal de Justiça. As matérias administrativas e tributárias seguem os Tribunais Administrativos e Fiscais, os Tribunais Centrais Administrativos e o Supremo Tribunal Administrativo. O controlo de constitucionalidade compete ao Tribunal Constitucional. A representação por advogado é obrigatória em acções cíveis de valor superior a 5 000 € e em todos os recursos perante os tribunais superiores.",
  },
  howToFindLawyer: {
    en: "Identify the practice area and verify the advogado in the Ordem dos Advogados register at https://portal.oa.pt. Each member has a unique cédula profissional which the firm should display. Portugal recognises formal specialisations (especialidades) including direito do trabalho, direito da família e menores, direito fiscal and direito administrativo, awarded by the Ordem after specific training and assessment. Initial consultations usually cost €60–€180. The advogado must agree fees in writing (article 105 of the Estatuto da Ordem dos Advogados) and issue a recibo for every payment. Mandate is formalised by a procuração forense filed with the court.",
    pt: "Identifique a matéria e verifique o advogado no portal da Ordem dos Advogados em https://portal.oa.pt. Cada inscrito tem uma cédula profissional única que a sociedade deve exibir. Portugal reconhece especialidades formais — direito do trabalho, direito da família e menores, direito fiscal e direito administrativo, entre outras — atribuídas pela Ordem após formação e avaliação específicas. A consulta inicial custa habitualmente entre 60 € e 180 €. Os honorários devem ser acordados por escrito (artigo 105.º do Estatuto da Ordem dos Advogados) e o advogado deve emitir recibo por cada pagamento. O mandato é formalizado por procuração forense junta aos autos.",
  },
  feesAndAid: {
    en: "Lawyer fees are freely negotiated. Article 105 of the Estatuto requires fairness and proportionality having regard to the time spent, complexity, urgency, value at stake and outcome. Pure contingency (quota litis) is prohibited; success-based supplements on top of a base fee are allowed. Protecção jurídica (Law 34/2004) is administered by the Instituto da Segurança Social and covers consultation, judicial representation and dispensation of court fees. Eligibility uses the rendimento relevante for the household; as a rough guide, applicants whose household income is at or below the IAS (€522.50 in 2025, with annual updates) qualify for full aid, with sliding-scale partial aid up to higher thresholds.",
    pt: "Os honorários são livremente negociados. O artigo 105.º do Estatuto exige adequação e proporcionalidade ao tempo despendido, à complexidade, à urgência, ao valor em causa e ao resultado. É proibido o pacto de quota litis; admite-se um suplemento dependente do resultado em complemento de um honorário base. A protecção jurídica (Lei 34/2004) é gerida pelo Instituto da Segurança Social e abrange consulta, representação judicial e dispensa de taxas de justiça. A elegibilidade utiliza o rendimento relevante do agregado; a título indicativo, os candidatos cujo rendimento se situe no IAS (522,50 € em 2025, com actualizações anuais) beneficiam de apoio total, com apoio parcial degressivo até limites superiores.",
  },
  barAssociation: {
    name: { en: "Ordem dos Advogados", pt: "Ordem dos Advogados" },
    verifyUrl: "https://portal.oa.pt",
    membershipRules: {
      en: "Every practising advogado must hold a law degree (licenciatura or mestrado em Direito), complete an 18-month estágio (apprenticeship) supervised by a patrono, pass the Exame Nacional de Acesso, and enrol in the Ordem with a cédula profissional. Mandatory professional indemnity insurance and continuous training apply. The Estatuto da Ordem dos Advogados (Law 145/2015) and the Código Deontológico govern ethics, conflicts and advertising; objective and truthful advertising is allowed, while comparative, sensationalist or testimonial advertising remains prohibited.",
      pt: "Todo advogado em exercício deve possuir licenciatura ou mestrado em Direito, completar um estágio de 18 meses sob orientação de um patrono, ser aprovado no Exame Nacional de Acesso e inscrever-se na Ordem com cédula profissional. São obrigatórios o seguro profissional e a formação contínua. O Estatuto da Ordem dos Advogados (Lei 145/2015) e o Código Deontológico regulam deontologia, conflitos e publicidade; admite-se publicidade objectiva e verdadeira, mantendo-se proibida a publicidade comparativa, sensacionalista ou com testemunhos de clientes.",
    },
  },
  crossBorderEU: {
    en: "Under the Establishment Directive 98/5/EC, transposed by Law 9/2009, EU-admitted lawyers may practise in Portugal under their home-country title after registering with the Ordem dos Advogados. After three years of effective and regular practice in Portuguese law they may apply for full integration as advogado without sitting the Exame Nacional de Acesso. Short-term cross-border services follow Directive 77/249/EEC: a Spanish abogado or French avocat may, for instance, plead a single Portuguese hearing under their home title, in coordination with a locally inscribed advogado where mandatory representation applies.",
    pt: "Ao abrigo da Directiva 98/5/CE, transposta pela Lei 9/2009, os advogados admitidos noutro Estado-Membro podem exercer em Portugal sob o título de origem após inscrição na Ordem dos Advogados. Após três anos de actividade efectiva e regular em Direito português, podem requerer a integração plena como advogado sem realizar o Exame Nacional de Acesso. As prestações transfronteiriças pontuais regem-se pela Directiva 77/249/CEE: um abogado espanhol ou um avocat francês pode, por exemplo, intervir numa audiência pontual em Portugal sob o seu título de origem, em articulação com um advogado localmente inscrito sempre que a representação seja obrigatória.",
  },
  faqs: [
    { q: { en: "How do I verify that a Portuguese lawyer is genuinely registered?", pt: "Como confirmo que um advogado português está realmente inscrito?" }, a: { en: "Use the Ordem dos Advogados portal at portal.oa.pt. Every practising advogado has a unique cédula profissional listed there.", pt: "Utilize o portal da Ordem dos Advogados em portal.oa.pt. Cada advogado em exercício tem uma cédula profissional única aí registada." } },
    { q: { en: "Is a written fee agreement mandatory?", pt: "É obrigatório um acordo escrito sobre honorários?" }, a: { en: "Article 105 of the Estatuto da Ordem requires honorários to be agreed and capable of justification in writing, with a receipt issued for every payment.", pt: "O artigo 105.º do Estatuto da Ordem exige que os honorários sejam acordados e justificáveis por escrito, com emissão de recibo em cada pagamento." } },
    { q: { en: "Who qualifies for protecção jurídica?", pt: "Quem tem direito a protecção jurídica?" }, a: { en: "Households below the rendimento relevante threshold set by Law 34/2004 (broadly indexed to the IAS) qualify, with full or partial aid covering consultation, representation and court fees.", pt: "Os agregados com rendimento relevante inferior ao limite fixado pela Lei 34/2004 (genericamente indexado ao IAS) têm direito, com apoio total ou parcial para consulta, representação e taxas de justiça." } },
    { q: { en: "Do I need an advogado for every claim?", pt: "Preciso de advogado para qualquer acção?" }, a: { en: "Representation by an advogado is mandatory for civil claims above €5,000 and for all appellate and supreme-court proceedings. Below that, parties may act in person.", pt: "A representação por advogado é obrigatória em acções cíveis de valor superior a 5 000 € e em todos os recursos perante tribunais superiores. Abaixo desse valor, as partes podem actuar em causa própria." } },
    { q: { en: "Can I instruct a lawyer admitted in another EU country?", pt: "Posso mandatar um advogado admitido noutro país da UE?" }, a: { en: "Yes. EU rules (Directives 77/249/EEC and 98/5/EC, transposed by Law 9/2009) allow cross-border services and, after registration with the Ordem, permanent practice.", pt: "Sim. As directivas europeias (77/249/CEE e 98/5/CE, transpostas pela Lei 9/2009) permitem prestações transfronteiriças e, após inscrição na Ordem, o estabelecimento permanente." } },
    { q: { en: "Are contingency fees allowed in Portugal?", pt: "Os honorários exclusivamente de êxito são admitidos em Portugal?" }, a: { en: "No. The quota litis is prohibited by the Código Deontológico. A success-based supplement may be agreed only in addition to a base fee.", pt: "Não. O pacto de quota litis é proibido pelo Código Deontológico. Apenas se admite um suplemento de êxito em complemento de um honorário base." } },
  ],
  lastReviewed: "2026-05-27",
  aiAssisted: true,
};

export const COUNTRY_PILLARS: Record<EuCountryCode, CountryPillar> = {
  de: DE,
  fr: FR,
  es: ES,
  it: IT,
  pt: PT,
};
