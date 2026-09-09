/**
 * Depth content for foreign residents, second-home owners and cross-border
 * clients looking for a lawyer in an EU country. English-language, written for
 * the non-national reader (the dominant search intent on these pages).
 *
 * Figures are indicative market ranges collected from published bar association
 * fee guidance and public professional tariffs; always confirm in writing.
 */

export interface ExpatFeeRow {
  matter: string;
  typicalCost: string;
  note: string;
}

export interface ExpatCheck {
  label: string;
  body: string;
}

export interface CountryExpatDepth {
  heading: string;
  intro: string;
  titles: { term: string; meaning: string }[];
  verify: ExpatCheck[];
  fees: ExpatFeeRow[];
  languageNote: string;
  pitfalls: ExpatCheck[];
  lastReviewed: string;
}

export const COUNTRY_EXPAT_DEPTH: Record<string, CountryExpatDepth> = {
  es: {
    heading: "Hiring a lawyer in Spain as a foreign resident or property owner",
    intro:
      "Most people searching for a lawyer in Spain from abroad are dealing with one of four things: buying or selling property, an inheritance involving Spanish assets, a residency or NIE application, or a dispute with a developer, bank or insurer. Spanish practice differs from northern European practice in ways that cost money if you learn them late — the notary does not act for you, the estate agent is not neutral, and the person handling your paperwork may not be a lawyer at all.",
    titles: [
      {
        term: "Abogado",
        meaning:
          "A qualified lawyer, admitted to a provincial bar (Colegio de Abogados) and holding a colegiado number. Only an abogado can advise you on law and represent you in court.",
      },
      {
        term: "Procurador",
        meaning:
          "A separate court agent who files documents and handles procedure. Most litigation requires both an abogado and a procurador, so budget for two fees.",
      },
      {
        term: "Gestor / gestoría",
        meaning:
          "An administrative agent. Legitimate and useful for tax filings, vehicle transfers and paperwork — but not a lawyer, not insured as one, and not permitted to give legal advice.",
      },
      {
        term: "Notario",
        meaning:
          "A public official who certifies the deed. The notary is neutral, acts for neither side, and will not tell you whether the price, the charges or the licence position are in your interest.",
      },
      {
        term: "Asesor fiscal",
        meaning:
          "A tax adviser. Often needed alongside an abogado for non-resident income tax, wealth tax and inheritance tax questions.",
      },
    ],
    verify: [
      {
        label: "Ask for the colegiado number and the bar",
        body:
          "Every practising abogado has a registration number and a specific provincial bar — for example the Ilustre Colegio de la Abogacía de Madrid or the Il·lustre Col·legi de l'Advocacia de Barcelona. The bar's public register (censo) confirms whether the registration is current.",
      },
      {
        label: "Confirm professional indemnity insurance",
        body:
          "Bar membership carries compulsory insurance. A gestoría or an unregistered 'legal consultant' may carry none, which matters most in exactly the situations where things go wrong.",
      },
      {
        label: "Insist on a written hoja de encargo",
        body:
          "The engagement letter. It should state the scope, the fee basis, whether IVA (21% VAT) is included, who pays the procurador and notary, and what happens if the matter settles early.",
      },
      {
        label: "Never use the seller's or developer's recommended lawyer",
        body:
          "A conflict of interest is the single most common cause of loss in Spanish property transactions involving foreign buyers. Instruct independently, before you sign any reservation contract or pay any deposit.",
      },
    ],
    fees: [
      {
        matter: "Property purchase (conveyancing)",
        typicalCost: "0.8%–1.5% of price, or a fixed EUR 1,200–3,000",
        note: "Separate from notary, land registry and transfer tax. Should include title, charges, licence and community-debt checks.",
      },
      {
        matter: "NIE / residency application support",
        typicalCost: "EUR 150–600",
        note: "Often handled by a gestoría at the lower end; use an abogado where a refusal or an appeal is in play.",
      },
      {
        matter: "Spanish inheritance (herencia) with foreign heirs",
        typicalCost: "EUR 1,500–5,000+",
        note: "Depends on assets and number of heirs. Inheritance tax deadlines run 6 months from death, extendable to 12 on request.",
      },
      {
        matter: "Civil claim (first instance)",
        typicalCost: "Bar orientation scales, commonly EUR 2,000–8,000+",
        note: "Add the procurador (typically a few hundred euros) and expect a costs order against the losing party in many cases.",
      },
      {
        matter: "Initial consultation",
        typicalCost: "EUR 0–150",
        note: "Many firms serving foreign clients offer a free first call; a paid written opinion is usually better value than free advice by phone.",
      },
    ],
    languageNote:
      "English-language service is standard in Madrid, Barcelona, Málaga, Alicante, the Balearics and the Canaries. Scandinavian, Dutch and German-speaking practices cluster on the Costa del Sol, the Costa Blanca and Mallorca — the Nordic and Dutch consulates in those provinces publish lists of lawyers who work in those languages, and the local bar can confirm registration. Ask specifically whether the lawyer or a translator will be speaking: a firm that advertises a language but delivers it through an assistant is a common source of misunderstanding in litigation.",
    pitfalls: [
      {
        label: "Paying a deposit before due diligence",
        body:
          "Reservation and arras contracts are binding. Money paid before charges, planning status and community debts are checked is very hard to recover.",
      },
      {
        label: "Signing a broad power of attorney",
        body:
          "A poder general lets someone act on almost anything in your name. Limit the power to the specific transaction and the specific acts required.",
      },
      {
        label: "Assuming your home-country will covers Spanish assets",
        body:
          "EU Succession Regulation 650/2012 lets you elect the law of your nationality, but the election has to be made expressly. Without it, Spanish forced-heirship rules can apply.",
      },
      {
        label: "Missing the non-resident tax filings",
        body:
          "Owning Spanish property creates annual non-resident obligations even when the property is not let. Penalties accumulate quietly for years.",
      },
    ],
    lastReviewed: "2026-09",
  },
};

export function getCountryExpatDepth(slug: string): CountryExpatDepth | undefined {
  return COUNTRY_EXPAT_DEPTH[slug];
}
