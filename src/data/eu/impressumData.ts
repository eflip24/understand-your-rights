/**
 * Impressum / Mentions légales / Aviso legal operator identity.
 * Single source of truth — DO NOT inline these values elsewhere.
 *
 * Compliance basis:
 * - DE (TMG §5, RStV §55)        → /impressum
 * - AT (ECG §5, MedienG §25)     → /impressum
 * - FR (LCEN art. 6-III)         → /mentions-legales
 * - ES (LSSI-CE art. 10)         → /aviso-legal
 * - IT (D.Lgs. 70/2003 art. 7)   → /note-legali
 * - PT (DL 7/2004 art. 10)       → /informacao-legal
 */

export const OPERATOR = {
  entityName: "Legally Spoken",
  address: "18EC, Gorey Business Park, Gorey, Co. Wexford, Ireland",
  email: "info@legallyspoken.com",
  jurisdiction: "Ireland",
  euOdrUrl: "https://ec.europa.eu/consumers/odr/",
  /** Hosting provider for LCEN art. 6 (FR) and TMG §5 (DE) disclosure. */
  hostingProvider: "Lovable AB, Skånegatan 87, 116 35 Stockholm, Sweden",
} as const;

export type ImpressumLocale = "en" | "de" | "fr" | "es" | "it" | "pt";

export const IMPRESSUM_ROUTES: Record<ImpressumLocale, string> = {
  en: "/legal-notice",
  de: "/impressum",
  fr: "/mentions-legales",
  es: "/aviso-legal",
  it: "/note-legali",
  pt: "/informacao-legal",
};

interface ImpressumCopy {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  operatorHeading: string;
  contactHeading: string;
  responsibleHeading: string;
  responsibleBody: string;
  hostingHeading: string;
  hostingBody: string;
  odrHeading: string;
  odrBody: string;
  odrLinkLabel: string;
  disputeHeading: string;
  disputeBody: string;
  liabilityHeading: string;
  liabilityBody: string;
}

export const IMPRESSUM_COPY: Record<ImpressumLocale, ImpressumCopy> = {
  en: {
    metaTitle: "Legal Notice | LegallySpoken",
    metaDescription: "Operator identity, contact, hosting, and EU online dispute resolution information for LegallySpoken.",
    heading: "Legal Notice",
    intro: "Information provided in accordance with EU e-commerce and information-society service rules.",
    operatorHeading: "Operator",
    contactHeading: "Contact",
    responsibleHeading: "Responsible for content",
    responsibleBody: "The operator named above is responsible for the content of this website within the meaning of applicable EU and Irish law.",
    hostingHeading: "Hosting provider",
    hostingBody: "This site is hosted by the provider named below.",
    odrHeading: "EU online dispute resolution",
    odrBody: "The European Commission provides a platform for online dispute resolution (ODR):",
    odrLinkLabel: "ec.europa.eu/consumers/odr",
    disputeHeading: "Consumer dispute resolution",
    disputeBody: "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
    liabilityHeading: "Liability for content and links",
    liabilityBody: "Content on this site is general legal information, not legal advice. We make no warranty as to the accuracy, completeness, or timeliness of the information. External links are provided for convenience; we are not responsible for content on third-party sites.",
  },
  de: {
    metaTitle: "Impressum | LegallySpoken",
    metaDescription: "Anbieterkennzeichnung, Kontakt, Hosting und EU-Online-Streitbeilegung für LegallySpoken gemäß § 5 TMG und § 55 RStV.",
    heading: "Impressum",
    intro: "Angaben gemäß § 5 TMG.",
    operatorHeading: "Diensteanbieter",
    contactHeading: "Kontakt",
    responsibleHeading: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
    responsibleBody: "Der oben genannte Diensteanbieter ist für die Inhalte dieser Website verantwortlich.",
    hostingHeading: "Hosting-Anbieter",
    hostingBody: "Diese Website wird von folgendem Anbieter gehostet:",
    odrHeading: "EU-Streitbeilegung",
    odrBody: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:",
    odrLinkLabel: "ec.europa.eu/consumers/odr",
    disputeHeading: "Verbraucherstreitbeilegung",
    disputeBody: "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    liabilityHeading: "Haftung für Inhalte und Links",
    liabilityBody: "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt, sind jedoch allgemeine Rechtsinformationen und keine Rechtsberatung. Eine Gewähr für Richtigkeit, Vollständigkeit und Aktualität wird nicht übernommen. Für die Inhalte verlinkter externer Seiten sind ausschließlich deren Betreiber verantwortlich.",
  },
  fr: {
    metaTitle: "Mentions légales | LegallySpoken",
    metaDescription: "Éditeur, hébergeur, contact et règlement en ligne des litiges pour LegallySpoken, conformément à la LCEN art. 6.",
    heading: "Mentions légales",
    intro: "Informations fournies conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).",
    operatorHeading: "Éditeur du site",
    contactHeading: "Contact",
    responsibleHeading: "Directeur de la publication",
    responsibleBody: "L'éditeur mentionné ci-dessus est responsable des contenus publiés sur ce site.",
    hostingHeading: "Hébergeur",
    hostingBody: "Ce site est hébergé par :",
    odrHeading: "Règlement en ligne des litiges (RLL)",
    odrBody: "La Commission européenne met à disposition une plateforme de règlement en ligne des litiges :",
    odrLinkLabel: "ec.europa.eu/consumers/odr",
    disputeHeading: "Médiation de la consommation",
    disputeBody: "Nous ne sommes ni disposés ni tenus à participer à une procédure de règlement des litiges devant un organisme de médiation de la consommation.",
    liabilityHeading: "Responsabilité du contenu et des liens",
    liabilityBody: "Le contenu de ce site constitue une information juridique générale et non un conseil juridique. Aucune garantie n'est donnée quant à son exactitude, son exhaustivité ou son actualité. Les liens externes sont fournis à titre indicatif ; nous ne sommes pas responsables des contenus tiers.",
  },
  es: {
    metaTitle: "Aviso legal | LegallySpoken",
    metaDescription: "Titular, contacto, alojamiento y resolución de litigios en línea para LegallySpoken según la LSSI-CE art. 10.",
    heading: "Aviso legal",
    intro: "Información facilitada conforme al artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE).",
    operatorHeading: "Titular",
    contactHeading: "Contacto",
    responsibleHeading: "Responsable de los contenidos",
    responsibleBody: "El titular indicado anteriormente es responsable de los contenidos publicados en este sitio web.",
    hostingHeading: "Proveedor de alojamiento",
    hostingBody: "Este sitio está alojado por:",
    odrHeading: "Resolución de litigios en línea",
    odrBody: "La Comisión Europea facilita una plataforma de resolución de litigios en línea:",
    odrLinkLabel: "ec.europa.eu/consumers/odr",
    disputeHeading: "Resolución de conflictos de consumo",
    disputeBody: "No estamos obligados ni dispuestos a participar en procedimientos de resolución de conflictos ante una junta arbitral de consumo.",
    liabilityHeading: "Responsabilidad por contenidos y enlaces",
    liabilityBody: "Los contenidos de este sitio constituyen información jurídica general y no asesoramiento legal. No garantizamos su exactitud, integridad ni actualidad. Los enlaces externos se ofrecen como cortesía; no somos responsables del contenido de terceros.",
  },
  it: {
    metaTitle: "Note legali | LegallySpoken",
    metaDescription: "Operatore, contatto, hosting e risoluzione online delle controversie per LegallySpoken ai sensi del D.Lgs. 70/2003 art. 7.",
    heading: "Note legali",
    intro: "Informazioni rese ai sensi del Decreto Legislativo 9 aprile 2003, n. 70, art. 7.",
    operatorHeading: "Titolare",
    contactHeading: "Contatti",
    responsibleHeading: "Responsabile dei contenuti",
    responsibleBody: "Il titolare sopra indicato è responsabile dei contenuti pubblicati su questo sito.",
    hostingHeading: "Fornitore di hosting",
    hostingBody: "Questo sito è ospitato da:",
    odrHeading: "Risoluzione online delle controversie (ODR)",
    odrBody: "La Commissione europea mette a disposizione una piattaforma per la risoluzione online delle controversie:",
    odrLinkLabel: "ec.europa.eu/consumers/odr",
    disputeHeading: "Risoluzione delle controversie con i consumatori",
    disputeBody: "Non siamo né disposti né obbligati a partecipare a procedure di risoluzione delle controversie davanti a un organismo di conciliazione per i consumatori.",
    liabilityHeading: "Responsabilità per contenuti e link",
    liabilityBody: "I contenuti di questo sito costituiscono informazioni giuridiche generali e non consulenza legale. Non garantiamo accuratezza, completezza o attualità. I link esterni sono forniti per comodità; non siamo responsabili dei contenuti di terzi.",
  },
  pt: {
    metaTitle: "Informação legal | LegallySpoken",
    metaDescription: "Operador, contacto, alojamento e resolução de litígios online para o LegallySpoken nos termos do DL 7/2004 art. 10.",
    heading: "Informação legal",
    intro: "Informações prestadas nos termos do Decreto-Lei n.º 7/2004, art. 10.",
    operatorHeading: "Operador",
    contactHeading: "Contacto",
    responsibleHeading: "Responsável pelos conteúdos",
    responsibleBody: "O operador acima indicado é responsável pelos conteúdos publicados neste sítio.",
    hostingHeading: "Fornecedor de alojamento",
    hostingBody: "Este sítio é alojado por:",
    odrHeading: "Resolução de litígios em linha",
    odrBody: "A Comissão Europeia disponibiliza uma plataforma de resolução de litígios em linha:",
    odrLinkLabel: "ec.europa.eu/consumers/odr",
    disputeHeading: "Resolução alternativa de litígios de consumo",
    disputeBody: "Não estamos obrigados nem disponíveis para participar em procedimentos de resolução de litígios perante uma entidade de resolução alternativa de litígios de consumo.",
    liabilityHeading: "Responsabilidade pelos conteúdos e ligações",
    liabilityBody: "Os conteúdos deste sítio constituem informação jurídica geral e não aconselhamento jurídico. Não garantimos exactidão, integridade ou actualidade. As ligações externas são fornecidas por conveniência; não somos responsáveis pelo conteúdo de terceiros.",
  },
};
