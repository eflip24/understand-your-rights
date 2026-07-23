/**
 * Batch 7 — Country-native EU forms (DE, FR, ES, IT, NL, PL).
 *
 * These reuse the shared `LegalFormDef` shape but carry a `country` code
 * so they route under `/eu-forms/:country/:slug`. Field labels and step
 * titles are in the native language with a short English tooltip in `help`
 * so both native searchers and English speakers can complete them.
 *
 * All entries use the generic PDF renderer — legally-binding template text
 * is embedded in each step's `note` block, matching the pattern used by
 * the Batch 5 EU starter pack.
 */
import type { LegalFormDef, FormFieldDef } from "@/data/forms";

export type EuCountryFormCode = "de" | "fr" | "es" | "it" | "nl" | "pl";

export const EU_COUNTRY_META: Record<
  EuCountryFormCode,
  { flag: string; name: string; nativeName: string }
> = {
  de: { flag: "🇩🇪", name: "Germany", nativeName: "Deutschland" },
  fr: { flag: "🇫🇷", name: "France", nativeName: "France" },
  es: { flag: "🇪🇸", name: "Spain", nativeName: "España" },
  it: { flag: "🇮🇹", name: "Italy", nativeName: "Italia" },
  nl: { flag: "🇳🇱", name: "Netherlands", nativeName: "Nederland" },
  pl: { flag: "🇵🇱", name: "Poland", nativeName: "Polska" },
};

const today = "2026-07-23";

/** Shared signature block used by every country form. */
const signatureStep = (labels: { title: string; place: string; date: string; sig1: string; sig2: string }) => ({
  id: "signature",
  title: labels.title,
  fields: [
    { id: "signPlace", label: labels.place, type: "text" as const, required: true },
    { id: "signDate", label: labels.date, type: "date" as const, required: true },
    { id: "sigParty1", label: labels.sig1, type: "text" as const, required: true },
    { id: "sigParty2", label: labels.sig2, type: "text" as const, required: true },
  ],
});

export const euCountryForms: LegalFormDef[] = [
  // -------------------------------------------------------------- 1. DE Arbeitsvertrag
  {
    slug: "arbeitsvertrag",
    country: "de",
    title:
      "Arbeitsvertrag Vorlage (unbefristet, 2026) — Free German Employment Contract Template",
    shortDescription:
      "Unbefristeter Arbeitsvertrag nach deutschem Recht (BGB §611a ff., NachwG). Enthält Probezeit, Kündigungsfrist gemäß BGB §622 und Datenschutzklausel.",
    category: "employment",
    region: "eu",
    euCategory: "employment",
    price: 14.99,
    lastUpdated: today,
    isFeatured: true,
    pdfTemplate: "generic",
    edition: "Nach BGB §§ 611a–630 · NachwG 2022",
    officialLink: {
      label: "gesetze-im-internet.de (BGB § 622 Kündigungsfristen)",
      href: "https://www.gesetze-im-internet.de/bgb/__622.html",
    },
    steps: [
      {
        id: "parteien",
        title: "Vertragsparteien",
        description: "Arbeitgeber und Arbeitnehmer eindeutig identifizieren.",
        fields: [
          { id: "arbeitgeberName", label: "Arbeitgeber (Firma)", type: "text", required: true, help: "Employer's legal company name." },
          { id: "arbeitgeberAdresse", label: "Anschrift des Arbeitgebers", type: "textarea", required: true },
          { id: "arbeitgeberVertreter", label: "Vertretungsberechtigte Person", type: "text", required: true },
          { id: "arbeitnehmerName", label: "Arbeitnehmer/in (voller Name)", type: "text", required: true },
          { id: "arbeitnehmerAdresse", label: "Anschrift des Arbeitnehmers", type: "textarea", required: true },
          { id: "arbeitnehmerGebDatum", label: "Geburtsdatum", type: "date", required: true },
        ],
      },
      {
        id: "taetigkeit",
        title: "Tätigkeit, Beginn & Arbeitsort",
        note:
          "Nach dem Nachweisgesetz (NachwG 2022) müssen die wesentlichen Vertragsbedingungen spätestens am ersten Arbeitstag schriftlich vorliegen.",
        fields: [
          { id: "stellenbezeichnung", label: "Stellenbezeichnung", type: "text", required: true, placeholder: "z. B. Softwareentwickler/in" },
          { id: "aufgaben", label: "Wesentliche Aufgaben", type: "textarea", required: true },
          { id: "arbeitsort", label: "Arbeitsort", type: "text", required: true, placeholder: "z. B. München oder Remote (Homeoffice DE)" },
          { id: "beginnDatum", label: "Beginn des Arbeitsverhältnisses", type: "date", required: true },
        ],
      },
      {
        id: "verguetung",
        title: "Vergütung & Arbeitszeit",
        fields: [
          { id: "bruttojahreslohn", label: "Bruttojahresgehalt (EUR)", type: "number", required: true, placeholder: "60000" },
          { id: "zahlungsweise", label: "Zahlungsweise", type: "select", required: true, options: [
            { value: "monatlich", label: "Monatlich zum Letzten des Monats" },
            { value: "monatlich-15", label: "Monatlich zum 15. des Folgemonats" },
          ] },
          { id: "wochenstunden", label: "Wöchentliche Arbeitszeit (Stunden)", type: "number", required: true, placeholder: "40" },
          { id: "urlaubstage", label: "Urlaubstage pro Jahr", type: "number", required: true, placeholder: "28", help: "Mindestens 20 Werktage (BUrlG § 3) bei 5-Tage-Woche." },
        ],
      },
      {
        id: "probezeit",
        title: "Probezeit & Kündigung",
        note:
          "BGB § 622 (2): Nach der Probezeit verlängert sich die Kündigungsfrist des Arbeitgebers nach Betriebszugehörigkeit (2–7 Monate nach 2–20 Jahren).",
        fields: [
          { id: "probezeitMonate", label: "Probezeit", type: "select", required: true, options: [
            { value: "0", label: "Keine Probezeit" },
            { value: "1", label: "1 Monat" },
            { value: "3", label: "3 Monate" },
            { value: "6", label: "6 Monate (gesetzliches Maximum)" },
          ] },
          { id: "kuendigungsfristProbe", label: "Kündigungsfrist während der Probezeit", type: "select", required: true, options: [
            { value: "2wochen", label: "2 Wochen (BGB § 622 (3))" },
            { value: "4wochen", label: "4 Wochen" },
          ] },
          { id: "tarifgebunden", label: "Ist der Arbeitgeber tarifgebunden?", type: "select", required: true, options: [
            { value: "nein", label: "Nein" },
            { value: "ja", label: "Ja — Tarifvertrag hat Vorrang" },
          ] },
          { id: "tarifName", label: "Anwendbarer Tarifvertrag", type: "text", showWhen: (d) => d.tarifgebunden === "ja" },
        ],
      },
      signatureStep({
        title: "Ort, Datum & Unterschriften",
        place: "Ort der Unterzeichnung",
        date: "Datum",
        sig1: "Unterschrift Arbeitgeber (Name in Druckbuchstaben)",
        sig2: "Unterschrift Arbeitnehmer (Name in Druckbuchstaben)",
      }),
    ],
  },

  // -------------------------------------------------------------- 2. DE Kündigung
  {
    slug: "kuendigung-arbeitsvertrag",
    country: "de",
    title:
      "Kündigung Arbeitsvertrag Vorlage (2026) — Free German Employment Termination Letter",
    shortDescription:
      "Ordentliche Kündigung eines Arbeitsverhältnisses mit korrekter Fristberechnung nach BGB § 622. Für Arbeitnehmer- und Arbeitgeberkündigungen.",
    category: "employment",
    region: "eu",
    euCategory: "employment",
    price: 9.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "BGB § 622 · KSchG",
    steps: [
      {
        id: "richtung",
        title: "Wer kündigt?",
        fields: [
          { id: "kuendigungsart", label: "Kündigung durch", type: "select", required: true, options: [
            { value: "arbeitnehmer", label: "Arbeitnehmer/in" },
            { value: "arbeitgeber", label: "Arbeitgeber" },
          ] },
        ],
      },
      {
        id: "absender",
        title: "Absender & Empfänger",
        fields: [
          { id: "absenderName", label: "Absender (voller Name)", type: "text", required: true },
          { id: "absenderAdresse", label: "Anschrift Absender", type: "textarea", required: true },
          { id: "empfaengerName", label: "Empfänger (Firma/Person)", type: "text", required: true },
          { id: "empfaengerAdresse", label: "Anschrift Empfänger", type: "textarea", required: true },
        ],
      },
      {
        id: "frist",
        title: "Beendigungsdatum & Frist",
        note:
          "Nach BGB § 622 (2) beträgt die Frist für den Arbeitgeber je nach Betriebszugehörigkeit: 1 Monat (nach 2 J.), 2 Monate (5 J.), 3 Monate (8 J.) bis 7 Monate (20 J.), jeweils zum Monatsende. Arbeitnehmer haben eine feste 4-Wochen-Frist zum 15. oder Monatsende.",
        fields: [
          { id: "beschaeftigtSeit", label: "Beschäftigt seit", type: "date", required: true },
          { id: "beendigungDatum", label: "Beendigung des Arbeitsverhältnisses zum", type: "date", required: true },
          { id: "hilfsweiseFrist", label: "Hilfsweise Kündigung zum nächstmöglichen Termin einschließen?", type: "checkbox" },
        ],
      },
      signatureStep({
        title: "Ort, Datum & Unterschrift",
        place: "Ort",
        date: "Datum",
        sig1: "Unterschrift des Kündigenden",
        sig2: "Empfangsbestätigung (optional)",
      }),
    ],
  },

  // -------------------------------------------------------------- 3. FR CDI
  {
    slug: "contrat-cdi",
    country: "fr",
    title:
      "Modèle de Contrat CDI (2026) — Free French Permanent Employment Contract",
    shortDescription:
      "Contrat de travail à durée indéterminée conforme au Code du travail français. Période d'essai, rémunération, congés payés et clause RGPD.",
    category: "employment",
    region: "eu",
    euCategory: "employment",
    price: 14.99,
    lastUpdated: today,
    isFeatured: true,
    pdfTemplate: "generic",
    edition: "Code du travail · Directive (UE) 2019/1152",
    officialLink: {
      label: "legifrance.gouv.fr (Code du travail)",
      href: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/",
    },
    steps: [
      {
        id: "parties",
        title: "Les parties",
        fields: [
          { id: "employeurNom", label: "Employeur — raison sociale", type: "text", required: true, help: "Employer's registered name." },
          { id: "employeurSiret", label: "N° SIRET de l'employeur", type: "text", required: true },
          { id: "employeurAdresse", label: "Siège social", type: "textarea", required: true },
          { id: "salarieNom", label: "Salarié(e) — nom complet", type: "text", required: true },
          { id: "salarieAdresse", label: "Adresse du salarié", type: "textarea", required: true },
          { id: "salarieSecu", label: "Numéro de sécurité sociale", type: "text", required: true },
        ],
      },
      {
        id: "poste",
        title: "Poste, lieu & date d'embauche",
        fields: [
          { id: "posteIntitule", label: "Intitulé du poste", type: "text", required: true },
          { id: "posteQualification", label: "Qualification / classification conventionnelle", type: "text", required: true, placeholder: "ex. Cadre position 2.2 — Syntec" },
          { id: "conventionCollective", label: "Convention collective applicable", type: "text", required: true, placeholder: "ex. Syntec (IDCC 1486)" },
          { id: "lieuTravail", label: "Lieu de travail", type: "text", required: true },
          { id: "dateEmbauche", label: "Date d'embauche", type: "date", required: true },
        ],
      },
      {
        id: "remuneration",
        title: "Rémunération, durée & congés",
        fields: [
          { id: "salaireBrutMensuel", label: "Salaire brut mensuel (EUR)", type: "number", required: true, placeholder: "3500" },
          { id: "dureeHebdomadaire", label: "Durée hebdomadaire (heures)", type: "number", required: true, placeholder: "35" },
          { id: "cadreForfait", label: "Statut cadre au forfait-jours ?", type: "select", required: true, options: [
            { value: "non", label: "Non — 35h hebdomadaires" },
            { value: "oui", label: "Oui — forfait jours (nombre à préciser)" },
          ] },
          { id: "forfaitJours", label: "Nombre de jours travaillés / an", type: "number", showWhen: (d) => d.cadreForfait === "oui", placeholder: "218" },
          { id: "congesPayes", label: "Congés payés (jours ouvrables / an)", type: "number", required: true, placeholder: "30", help: "5 semaines minimum (art. L3141-3)." },
        ],
      },
      {
        id: "essai",
        title: "Période d'essai & préavis",
        note:
          "Art. L1221-19 : période d'essai maximale — 2 mois (ouvrier/employé), 3 mois (agent de maîtrise/technicien), 4 mois (cadre). Renouvelable une fois si prévue par accord de branche.",
        fields: [
          { id: "essaiDuree", label: "Durée de la période d'essai", type: "select", required: true, options: [
            { value: "2m", label: "2 mois (employé)" },
            { value: "3m", label: "3 mois (technicien)" },
            { value: "4m", label: "4 mois (cadre)" },
          ] },
          { id: "essaiRenouvelable", label: "Période d'essai renouvelable ?", type: "checkbox" },
          { id: "preavis", label: "Préavis de rupture (hors faute)", type: "select", required: true, options: [
            { value: "conventionnel", label: "Selon la convention collective" },
            { value: "1m", label: "1 mois" },
            { value: "3m", label: "3 mois" },
          ] },
        ],
      },
      signatureStep({
        title: "Fait à, le… & Signatures",
        place: "Fait à",
        date: "Le (date)",
        sig1: "Signature de l'employeur (précédée de « Lu et approuvé »)",
        sig2: "Signature du salarié (précédée de « Lu et approuvé »)",
      }),
    ],
  },

  // -------------------------------------------------------------- 4. FR Contrat de bail
  {
    slug: "contrat-bail",
    country: "fr",
    title:
      "Contrat de Bail d'Habitation Gratuit (Loi ALUR 2026) — Free French Residential Lease",
    shortDescription:
      "Bail d'habitation vide ou meublé conforme à la loi n° 89-462 et à la loi ALUR. Dépôt de garantie, préavis, DPE et clauses obligatoires.",
    category: "realestate",
    region: "eu",
    euCategory: "realestate",
    price: 14.99,
    lastUpdated: today,
    isFeatured: true,
    pdfTemplate: "generic",
    edition: "Loi n° 89-462 · Loi ALUR · Décret n° 2015-587",
    officialLink: {
      label: "service-public.fr (Modèle-type de bail)",
      href: "https://www.service-public.fr/particuliers/vosdroits/F31269",
    },
    steps: [
      {
        id: "parties",
        title: "Bailleur & locataire",
        fields: [
          { id: "bailleurNom", label: "Bailleur — nom complet ou raison sociale", type: "text", required: true },
          { id: "bailleurAdresse", label: "Adresse du bailleur", type: "textarea", required: true },
          { id: "locataireNom", label: "Locataire — nom complet", type: "text", required: true },
          { id: "locataireAdresse", label: "Adresse actuelle du locataire", type: "textarea", required: true },
        ],
      },
      {
        id: "logement",
        title: "Le logement",
        fields: [
          { id: "typeBail", label: "Type de location", type: "select", required: true, options: [
            { value: "vide", label: "Location vide (bail 3 ans / 6 ans si personne morale)" },
            { value: "meuble", label: "Location meublée (bail 1 an / 9 mois étudiant)" },
          ] },
          { id: "logementAdresse", label: "Adresse du logement loué", type: "textarea", required: true },
          { id: "surfaceLoi", label: "Surface habitable (m²) — loi Boutin", type: "number", required: true, placeholder: "45" },
          { id: "nbPieces", label: "Nombre de pièces principales", type: "number", required: true, placeholder: "2" },
          { id: "dpe", label: "Classe DPE", type: "select", required: true, options: [
            { value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" },
            { value: "D", label: "D" }, { value: "E", label: "E" }, { value: "F", label: "F (interdiction location progressive)" },
            { value: "G", label: "G (logement énergivore — restrictions)" },
          ] },
        ],
      },
      {
        id: "loyer",
        title: "Loyer, charges & dépôt de garantie",
        note:
          "Le dépôt de garantie est plafonné : 1 mois de loyer hors charges pour un logement vide, 2 mois pour un meublé (loi ALUR).",
        fields: [
          { id: "loyerMensuel", label: "Loyer mensuel hors charges (EUR)", type: "number", required: true, placeholder: "850" },
          { id: "chargesMensuelles", label: "Provision sur charges mensuelles (EUR)", type: "number", required: true, placeholder: "60" },
          { id: "modaliteCharges", label: "Modalité des charges", type: "select", required: true, options: [
            { value: "provision", label: "Provision avec régularisation annuelle" },
            { value: "forfait", label: "Forfait (uniquement meublé)" },
          ] },
          { id: "depotGarantie", label: "Dépôt de garantie (EUR)", type: "number", required: true, help: "1 mois de loyer hors charges (vide) ou 2 mois (meublé)." },
          { id: "dateEntree", label: "Date d'entrée dans les lieux", type: "date", required: true },
        ],
      },
      {
        id: "duree",
        title: "Durée & préavis",
        note:
          "Préavis de résiliation par le locataire : 3 mois en principe, réduit à 1 mois en zone tendue, mutation, perte d'emploi, obtention d'un premier emploi ou raisons de santé.",
        fields: [
          { id: "dureeBail", label: "Durée du bail (mois)", type: "number", required: true, placeholder: "36", help: "36 pour un logement vide, 12 pour un meublé." },
          { id: "zoneTendue", label: "Logement en zone tendue ?", type: "select", required: true, options: [
            { value: "non", label: "Non — préavis locataire de 3 mois" },
            { value: "oui", label: "Oui — préavis locataire réduit à 1 mois" },
          ] },
        ],
      },
      signatureStep({
        title: "Signature du bail",
        place: "Fait à",
        date: "Le (date)",
        sig1: "Signature du bailleur",
        sig2: "Signature du locataire (précédée de « Lu et approuvé »)",
      }),
    ],
  },

  // -------------------------------------------------------------- 5. ES Contrato de arrendamiento
  {
    slug: "contrato-arrendamiento",
    country: "es",
    title:
      "Contrato de Arrendamiento de Vivienda Gratis (LAU 2026) — Free Spanish Residential Lease",
    shortDescription:
      "Contrato de arrendamiento de vivienda habitual conforme a la Ley 29/1994 (LAU) actualizada. Fianza, prórroga obligatoria y actualización de renta.",
    category: "realestate",
    region: "eu",
    euCategory: "realestate",
    price: 14.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "Ley 29/1994 (LAU) · RDL 7/2019",
    officialLink: {
      label: "boe.es (Ley de Arrendamientos Urbanos)",
      href: "https://www.boe.es/eli/es/l/1994/11/24/29/con",
    },
    steps: [
      {
        id: "partes",
        title: "Partes contratantes",
        fields: [
          { id: "arrendadorNombre", label: "Arrendador — nombre completo / razón social", type: "text", required: true },
          { id: "arrendadorNif", label: "DNI / NIF / CIF del arrendador", type: "text", required: true },
          { id: "arrendadorDireccion", label: "Domicilio del arrendador", type: "textarea", required: true },
          { id: "arrendatarioNombre", label: "Arrendatario — nombre completo", type: "text", required: true },
          { id: "arrendatarioNif", label: "DNI / NIE del arrendatario", type: "text", required: true },
        ],
      },
      {
        id: "vivienda",
        title: "La vivienda",
        fields: [
          { id: "viviendaDireccion", label: "Dirección completa de la vivienda", type: "textarea", required: true },
          { id: "viviendaReferencia", label: "Referencia catastral", type: "text", required: true, help: "20-digit cadastral reference from catastro.meh.es." },
          { id: "viviendaSuperficie", label: "Superficie útil (m²)", type: "number", required: true },
          { id: "certificadoEnergetico", label: "Certificado de eficiencia energética", type: "select", required: true, options: [
            { value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" },
            { value: "D", label: "D" }, { value: "E", label: "E" }, { value: "F", label: "F" }, { value: "G", label: "G" },
          ] },
        ],
      },
      {
        id: "renta",
        title: "Renta, fianza & duración",
        note:
          "LAU art. 36: fianza obligatoria de 1 mensualidad (vivienda) o 2 (uso distinto). LAU art. 9: duración mínima 5 años (persona física) o 7 años (persona jurídica) por prórrogas obligatorias.",
        fields: [
          { id: "rentaMensual", label: "Renta mensual (EUR)", type: "number", required: true, placeholder: "900" },
          { id: "diaPago", label: "Día de pago (1–10 del mes)", type: "number", required: true, placeholder: "5" },
          { id: "fianza", label: "Fianza (una mensualidad)", type: "number", required: true },
          { id: "arrendadorTipo", label: "Tipo de arrendador", type: "select", required: true, options: [
            { value: "fisica", label: "Persona física — duración mínima 5 años" },
            { value: "juridica", label: "Persona jurídica — duración mínima 7 años" },
          ] },
          { id: "duracionAnios", label: "Duración pactada (años)", type: "number", required: true, placeholder: "5" },
          { id: "actualizacionRenta", label: "Índice de actualización anual", type: "select", required: true, options: [
            { value: "igc", label: "Índice de Garantía de Competitividad (topado)" },
            { value: "sin", label: "Sin actualización" },
          ] },
          { id: "fechaInicio", label: "Fecha de inicio", type: "date", required: true },
        ],
      },
      signatureStep({
        title: "Lugar, fecha y firmas",
        place: "Lugar",
        date: "Fecha",
        sig1: "Firma del arrendador",
        sig2: "Firma del arrendatario",
      }),
    ],
  },

  // -------------------------------------------------------------- 6. IT Contratto di locazione
  {
    slug: "contratto-locazione",
    country: "it",
    title:
      "Contratto di Locazione ad Uso Abitativo Gratis (2026) — Free Italian Residential Lease",
    shortDescription:
      "Contratto di locazione a canone libero (4+4) o concordato (3+2) ai sensi della Legge 431/1998. Con opzione cedolare secca e registrazione.",
    category: "realestate",
    region: "eu",
    euCategory: "realestate",
    price: 14.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "Legge 9 dicembre 1998, n. 431",
    officialLink: {
      label: "agenziaentrate.gov.it (Registrazione locazioni)",
      href: "https://www.agenziaentrate.gov.it/portale/registrazione-contratto-di-locazione",
    },
    steps: [
      {
        id: "parti",
        title: "Le parti",
        fields: [
          { id: "locatoreNome", label: "Locatore — nome e cognome / ragione sociale", type: "text", required: true },
          { id: "locatoreCf", label: "Codice fiscale del locatore", type: "text", required: true },
          { id: "locatoreIndirizzo", label: "Residenza del locatore", type: "textarea", required: true },
          { id: "conduttoreNome", label: "Conduttore — nome e cognome", type: "text", required: true },
          { id: "conduttoreCf", label: "Codice fiscale del conduttore", type: "text", required: true },
        ],
      },
      {
        id: "immobile",
        title: "L'immobile",
        fields: [
          { id: "immobileIndirizzo", label: "Indirizzo dell'immobile", type: "textarea", required: true },
          { id: "immobileCatasto", label: "Dati catastali (foglio, particella, subalterno)", type: "text", required: true },
          { id: "immobileCategoria", label: "Categoria catastale", type: "text", required: true, placeholder: "es. A/3" },
          { id: "immobileApe", label: "Classe APE", type: "select", required: true, options: [
            { value: "A4", label: "A4" }, { value: "A3", label: "A3" }, { value: "A2", label: "A2" }, { value: "A1", label: "A1" },
            { value: "B", label: "B" }, { value: "C", label: "C" }, { value: "D", label: "D" },
            { value: "E", label: "E" }, { value: "F", label: "F" }, { value: "G", label: "G" },
          ] },
        ],
      },
      {
        id: "regime",
        title: "Regime contrattuale",
        note:
          "L. 431/98 art. 2: il canone libero ha durata 4+4 anni; il canone concordato 3+2. La cedolare secca (art. 3 D.Lgs. 23/2011) sostituisce IRPEF, addizionali, imposta di registro e di bollo.",
        fields: [
          { id: "tipoContratto", label: "Tipo di contratto", type: "select", required: true, options: [
            { value: "libero", label: "Canone libero — 4 + 4 anni" },
            { value: "concordato", label: "Canone concordato — 3 + 2 anni" },
          ] },
          { id: "canoneMensile", label: "Canone mensile (EUR)", type: "number", required: true, placeholder: "700" },
          { id: "depositoCauzionale", label: "Deposito cauzionale (max 3 mensilità)", type: "number", required: true },
          { id: "cedolareSecca", label: "Opzione per la cedolare secca?", type: "select", required: true, options: [
            { value: "si", label: "Sì — aliquota 21% (10% se concordato)" },
            { value: "no", label: "No — regime IRPEF ordinario" },
          ] },
          { id: "dataInizio", label: "Data di decorrenza", type: "date", required: true },
        ],
      },
      signatureStep({
        title: "Luogo, data e firme",
        place: "Luogo",
        date: "Data",
        sig1: "Firma del locatore",
        sig2: "Firma del conduttore",
      }),
    ],
  },

  // -------------------------------------------------------------- 7. NL Arbeidsovereenkomst
  {
    slug: "arbeidsovereenkomst",
    country: "nl",
    title:
      "Arbeidsovereenkomst Voorbeeld (bepaalde tijd, 2026) — Free Dutch Employment Contract",
    shortDescription:
      "Arbeidsovereenkomst voor bepaalde tijd volgens BW 7:610 e.v. en de Wet werk en zekerheid. Inclusief proeftijd, opzegtermijn en concurrentiebeding.",
    category: "employment",
    region: "eu",
    euCategory: "employment",
    price: 14.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "BW Boek 7 titel 10 · WWZ",
    officialLink: {
      label: "wetten.overheid.nl (BW Boek 7)",
      href: "https://wetten.overheid.nl/BWBR0005290",
    },
    steps: [
      {
        id: "partijen",
        title: "Partijen",
        fields: [
          { id: "werkgeverNaam", label: "Werkgever (bedrijfsnaam)", type: "text", required: true, help: "Employer's registered company name." },
          { id: "werkgeverKvk", label: "KvK-nummer", type: "text", required: true },
          { id: "werkgeverAdres", label: "Adres werkgever", type: "textarea", required: true },
          { id: "werknemerNaam", label: "Werknemer (volledige naam)", type: "text", required: true },
          { id: "werknemerBsn", label: "BSN", type: "text", required: true, help: "Burgerservicenummer — required for payroll registration." },
          { id: "werknemerGeb", label: "Geboortedatum", type: "date", required: true },
        ],
      },
      {
        id: "functie",
        title: "Functie & aanvang",
        fields: [
          { id: "functie", label: "Functietitel", type: "text", required: true },
          { id: "cao", label: "Toepasselijke cao", type: "text", placeholder: "bv. Metalektro of geen cao" },
          { id: "startDatum", label: "Datum indiensttreding", type: "date", required: true },
          { id: "eindDatum", label: "Einddatum contract", type: "date", required: true, help: "Voor bepaalde tijd. Laat leeg voor onbepaalde tijd." },
        ],
      },
      {
        id: "loon",
        title: "Loon, uren & vakantie",
        fields: [
          { id: "brutoMaandloon", label: "Bruto maandloon (EUR)", type: "number", required: true, placeholder: "3200" },
          { id: "urenPerWeek", label: "Uren per week", type: "number", required: true, placeholder: "40" },
          { id: "vakantiedagen", label: "Vakantiedagen per jaar", type: "number", required: true, placeholder: "25", help: "Minimum wettelijk: 4× wekelijkse arbeidsduur (art. 7:634 BW)." },
          { id: "vakantiegeld", label: "Vakantiegeld", type: "select", required: true, options: [
            { value: "8", label: "8% (wettelijk minimum)" },
            { value: "meer", label: "Meer dan 8% (specificeer in salarisstrook)" },
          ] },
        ],
      },
      {
        id: "proeftijd",
        title: "Proeftijd & opzegging",
        note:
          "BW 7:652: proeftijd max. 1 maand bij contract van 6 t/m 24 maanden; max. 2 maanden bij contract van 2 jaar of langer of onbepaalde tijd. Geen proeftijd toegestaan bij contracten van 6 maanden of korter.",
        fields: [
          { id: "proeftijd", label: "Proeftijd", type: "select", required: true, options: [
            { value: "geen", label: "Geen proeftijd" },
            { value: "1", label: "1 maand" },
            { value: "2", label: "2 maanden (alleen bij contract ≥ 2 jaar of onbepaalde tijd)" },
          ] },
          { id: "concurrentiebeding", label: "Concurrentiebeding opnemen?", type: "select", required: true, options: [
            { value: "geen", label: "Geen concurrentiebeding" },
            { value: "gemotiveerd", label: "Ja — met schriftelijke motivering (verplicht bij bepaalde tijd)" },
          ] },
        ],
      },
      signatureStep({
        title: "Ondertekening",
        place: "Plaats",
        date: "Datum",
        sig1: "Handtekening werkgever",
        sig2: "Handtekening werknemer",
      }),
    ],
  },

  // -------------------------------------------------------------- 8. PL Umowa o pracę
  {
    slug: "umowa-o-prace",
    country: "pl",
    title:
      "Umowa o Pracę Wzór (2026) — Free Polish Employment Contract Template",
    shortDescription:
      "Umowa o pracę zgodna z Kodeksem pracy — okres próbny, czas określony lub czas nieokreślony. Zawiera wynagrodzenie, urlop i okres wypowiedzenia.",
    category: "employment",
    region: "eu",
    euCategory: "employment",
    price: 14.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "Kodeks pracy (Dz.U. 1974 nr 24 poz. 141)",
    officialLink: {
      label: "isap.sejm.gov.pl (Kodeks pracy)",
      href: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19740240141",
    },
    steps: [
      {
        id: "strony",
        title: "Strony umowy",
        fields: [
          { id: "pracodawcaNazwa", label: "Pracodawca — nazwa firmy", type: "text", required: true, help: "Employer's registered company name." },
          { id: "pracodawcaNip", label: "NIP pracodawcy", type: "text", required: true },
          { id: "pracodawcaAdres", label: "Adres pracodawcy", type: "textarea", required: true },
          { id: "pracownikImie", label: "Pracownik — imię i nazwisko", type: "text", required: true },
          { id: "pracownikPesel", label: "PESEL pracownika", type: "text", required: true },
          { id: "pracownikAdres", label: "Adres pracownika", type: "textarea", required: true },
        ],
      },
      {
        id: "rodzaj",
        title: "Rodzaj i czas trwania umowy",
        note:
          "Art. 25 § 1 K.p.: umowa o pracę może być zawarta na okres próbny (max 3 miesiące), na czas określony (max 33 miesiące łącznie, 3 umowy) lub na czas nieokreślony.",
        fields: [
          { id: "rodzajUmowy", label: "Rodzaj umowy", type: "select", required: true, options: [
            { value: "probny", label: "Umowa na okres próbny (max 3 miesiące)" },
            { value: "okreslony", label: "Umowa na czas określony" },
            { value: "nieokreslony", label: "Umowa na czas nieokreślony" },
          ] },
          { id: "dataRozpoczecia", label: "Data rozpoczęcia pracy", type: "date", required: true },
          { id: "dataZakonczenia", label: "Data zakończenia (dla umów terminowych)", type: "date", showWhen: (d) => d.rodzajUmowy !== "nieokreslony" },
        ],
      },
      {
        id: "stanowisko",
        title: "Stanowisko, miejsce & wymiar",
        fields: [
          { id: "stanowisko", label: "Stanowisko", type: "text", required: true },
          { id: "miejscePracy", label: "Miejsce wykonywania pracy", type: "text", required: true },
          { id: "wymiarEtatu", label: "Wymiar czasu pracy", type: "select", required: true, options: [
            { value: "1", label: "Pełny etat (1/1)" },
            { value: "0.75", label: "3/4 etatu" },
            { value: "0.5", label: "1/2 etatu" },
            { value: "0.25", label: "1/4 etatu" },
          ] },
        ],
      },
      {
        id: "wynagrodzenie",
        title: "Wynagrodzenie & urlop",
        note:
          "Minimalne wynagrodzenie krajowe 2026 — sprawdź aktualną kwotę na gov.pl. Urlop wypoczynkowy: 20 dni (staż < 10 lat) lub 26 dni (staż ≥ 10 lat) — art. 154 K.p.",
        fields: [
          { id: "wynagrodzenieBrutto", label: "Wynagrodzenie zasadnicze brutto (PLN)", type: "number", required: true, placeholder: "6000" },
          { id: "terminWyplaty", label: "Termin wypłaty", type: "select", required: true, options: [
            { value: "10", label: "Do 10. dnia następnego miesiąca" },
            { value: "5", label: "Do 5. dnia następnego miesiąca" },
          ] },
          { id: "dniUrlopu", label: "Dni urlopu wypoczynkowego / rok", type: "number", required: true, placeholder: "20" },
        ],
      },
      signatureStep({
        title: "Miejsce, data i podpisy",
        place: "Miejscowość",
        date: "Data",
        sig1: "Podpis pracodawcy",
        sig2: "Podpis pracownika",
      }),
    ],
  },
];

/** Slug list for sitemap generation. */
export const euCountryFormSlugs: [EuCountryFormCode, string][] = euCountryForms.map(
  (f) => [f.country as EuCountryFormCode, f.slug],
);
