/**
 * EU employment termination rules — severance / dismissal compensation and
 * statutory notice periods for DE, FR, ES, IT, PT.
 *
 * Pure data + pure functions so the maths stays unit-testable and the pages
 * stay presentational. Figures are statutory baselines: collective agreements
 * (Tarifvertrag / convention collective / convenio / CCNL / IRCT) and
 * individual contracts can only improve on them.
 *
 * Nothing here is legal advice — every page rendering this data must show the
 * estimate disclaimer and link to the matching /lawyer-eu country pillar.
 */

import type { EuCountryCode, LocaleCode } from "./countries";

/** Localized string with a guaranteed English source. */
export type EuText = { en: string } & Partial<Record<LocaleCode, string>>;

export function pickText(text: EuText, locale: LocaleCode): string {
  return text[locale] ?? text.en;
}

export type DismissalReason =
  | "economic"      // redundancy / objective / economic grounds
  | "personal"      // conduct or capability
  | "mutual"        // settlement or mutual termination
  | "unfair";       // found unlawful by a court/tribunal

export interface SeveranceInput {
  country: EuCountryCode;
  /** Gross monthly salary in EUR (including regular allowances). */
  monthlySalary: number;
  /** Completed years of service (decimals allowed). */
  years: number;
  reason: DismissalReason;
  contractType: "permanent" | "fixed-term";
}

export interface SeveranceResult {
  /** Conservative statutory floor, EUR. */
  low: number;
  /** Realistic upper bound (statutory cap or customary settlement), EUR. */
  high: number;
  /** Human-readable formula actually applied. */
  formula: string;
  /** Statute or instrument the figure comes from. */
  statute: string;
  notes: string[];
  /** True when nothing is owed by statute for this combination. */
  zeroByDefault?: boolean;
}

export interface NoticeInput {
  country: EuCountryCode;
  years: number;
  byEmployer: boolean;
  /** Optional collective-agreement notice override, in days. */
  overrideDays?: number;
}

export interface NoticeResult {
  days: number;
  label: string;
  statute: string;
  notes: string[];
  /** Pay-in-lieu equivalent for a given monthly salary. */
  payInLieu?: number;
}

export interface EuEmploymentCountry {
  code: EuCountryCode;
  /** Locale whose native copy we author first. */
  nativeLocale: LocaleCode;
  severanceStatute: string;
  noticeStatute: string;
  /** Short country intro shown above the calculator. */
  intro: EuText;
  /** Country-specific FAQ pairs. */
  faqs: { q: EuText; a: EuText }[];
  /** Official reference links (bar/ministry/labour code). */
  sources: { label: string; url: string }[];
}

const round = (n: number) => Math.max(0, Math.round(n));

/* ------------------------------------------------------------------ */
/* Severance                                                           */
/* ------------------------------------------------------------------ */

export function computeSeverance(input: SeveranceInput): SeveranceResult {
  const { country, monthlySalary: s, years: y, reason, contractType } = input;
  const dayRate = (s * 12) / 365;
  const notes: string[] = [];

  if (contractType === "fixed-term") {
    notes.push(
      "Fixed-term contracts usually run to their end date. Early termination normally triggers damages equal to the remaining salary rather than ordinary severance.",
    );
  }

  switch (country) {
    case "de": {
      // §1a KSchG offers 0.5 monthly salary per year where the employer waives
      // a challenge; most Kündigungsschutzklage settlements land 0.5–1.0.
      const base = 0.5 * y * s;
      const high = (reason === "unfair" ? 1.5 : 1.0) * y * s;
      notes.push(
        "Germany has no general right to severance. The figure below reflects §1a KSchG and what labour courts (Arbeitsgericht) typically broker in a settlement (Abfindung).",
        "The Regelabfindung benchmark is 0.5 gross monthly salaries per year of service; strong unfair-dismissal facts push it toward 1.0–1.5.",
      );
      return {
        low: round(base),
        high: round(high),
        formula: `0.5 – ${reason === "unfair" ? "1.5" : "1.0"} × ${y.toFixed(1)} years × €${Math.round(s).toLocaleString()}`,
        statute: "§1a Kündigungsschutzgesetz (KSchG); §9–10 KSchG",
        notes,
      };
    }

    case "fr": {
      // Indemnité légale de licenciement: 1/4 month per year up to 10, 1/3 after.
      const capped = Math.max(0, y);
      const first = Math.min(capped, 10) * 0.25 * s;
      const rest = Math.max(0, capped - 10) * (1 / 3) * s;
      const legal = first + rest;
      if (y < 8 / 12) {
        notes.push("Under 8 months' continuous service there is no statutory redundancy pay (indemnité légale).");
      }
      let high = legal;
      if (reason === "unfair") {
        const band = macronCeilingMonths(y);
        high = Math.max(legal, legal + band * s);
        notes.push(
          `A dismissal held to be "sans cause réelle et sérieuse" adds damages under the barème Macron — up to about ${band} months' salary at ${y.toFixed(1)} years of service.`,
        );
      }
      if (reason === "mutual") {
        notes.push("A rupture conventionnelle cannot pay less than the indemnité légale, and is frequently negotiated above it.");
      }
      notes.push("Many conventions collectives set a higher conventional indemnity — always compare both and take the better one.");
      return {
        low: round(y < 8 / 12 ? 0 : legal),
        high: round(high),
        formula: "1/4 month per year (first 10 years) + 1/3 month per year beyond",
        statute: "Art. L1234-9 & R1234-2 Code du travail; barème L1235-3",
        notes,
        zeroByDefault: y < 8 / 12,
      };
    }

    case "es": {
      // 20 days/year (cap 12 months) objective; 33 days/year (cap 24) unfair.
      const objective = Math.min(20 * y * dayRate, 12 * s);
      const unfair = Math.min(33 * y * dayRate, 24 * s);
      const isUnfair = reason === "unfair";
      notes.push(
        "Despido objetivo (economic, technical or organisational grounds) pays 20 days of salary per year worked, capped at 12 monthly payments.",
        "Despido improcedente (unfair) pays 33 days per year, capped at 24 monthly payments.",
        "Service before 12 February 2012 accrues at the old 45-days-per-year rate — long-tenured employees should have the calculation split at that date.",
      );
      if (reason === "personal") {
        notes.push("A disciplinary dismissal held to be procedente pays no severance; challenging it within 20 working days is what converts it to improcedente.");
      }
      return {
        low: round(reason === "personal" ? 0 : objective),
        high: round(isUnfair || reason === "personal" ? unfair : objective),
        formula: isUnfair ? "33 days' salary per year (cap 24 months)" : "20 days' salary per year (cap 12 months)",
        statute: "Arts. 52–53 & 56 Estatuto de los Trabajadores",
        notes,
        zeroByDefault: reason === "personal",
      };
    }

    case "it": {
      // TFR accrues on every termination; unlawful dismissal adds an indemnity.
      const tfr = ((s * 12) / 13.5) * y;
      let high = tfr;
      if (reason === "unfair") {
        const months = Math.min(36, Math.max(6, 2 * y));
        high = tfr + months * s;
        notes.push(
          `An unlawful dismissal (licenziamento illegittimo) adds an indemnity of roughly ${months.toFixed(0)} months' salary under the tutele crescenti regime.`,
        );
      }
      notes.push(
        "TFR (trattamento di fine rapporto) is payable on every termination, including resignation, and accrues at annual pay ÷ 13.5 plus annual revaluation.",
        "The revaluation index (1.5% + 75% of ISTAT inflation) is not included here, so real TFR is usually a little higher.",
      );
      return {
        low: round(tfr),
        high: round(high),
        formula: "TFR = annual salary ÷ 13.5 × years of service",
        statute: "Art. 2120 Codice civile; D.Lgs. 23/2015",
        notes,
      };
    }

    case "pt": {
      // 12 days of base pay per full year of service.
      const dailyBase = s / 30;
      const legal = 12 * dailyBase * Math.floor(Math.max(0, y)) + 12 * dailyBase * (y % 1);
      let high = legal;
      if (reason === "unfair") {
        const months = Math.min(12, Math.max(3, 1.5 * y));
        high = legal + months * s;
        notes.push(
          "An unlawful dismissal (despedimento ilícito) entitles you to salary owed from the dismissal to the court ruling, plus reinstatement or compensation of 15–45 days' pay per year of service.",
        );
      }
      notes.push(
        "Compensation is 12 days of base pay plus seniority allowances per full year of service (Art. 366 Código do Trabalho).",
        "Base pay used in the calculation is capped at 20× the national minimum wage, and total compensation at 12 months' pay.",
      );
      return {
        low: round(legal),
        high: round(Math.min(high, 12 * s + (reason === "unfair" ? 12 * s : 0))),
        formula: "12 days of base pay × years of service",
        statute: "Arts. 366 & 381–392 Código do Trabalho",
        notes,
      };
    }
  }
}

/** Approximate barème Macron ceiling in months, by completed years of service. */
function macronCeilingMonths(years: number): number {
  const y = Math.floor(years);
  const table: Record<number, number> = {
    0: 1, 1: 2, 2: 3.5, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 8, 9: 9, 10: 10,
    11: 10.5, 12: 11, 13: 11.5, 14: 12, 15: 13, 16: 13.5, 17: 14, 18: 14.5,
    19: 15, 20: 15.5, 21: 16, 22: 16.5, 23: 17, 24: 17.5, 25: 18, 26: 18.5,
    27: 19, 28: 19.5, 29: 20,
  };
  return table[Math.min(y, 29)] ?? 20;
}

/* ------------------------------------------------------------------ */
/* Notice periods                                                      */
/* ------------------------------------------------------------------ */

export function computeNotice(input: NoticeInput, monthlySalary?: number): NoticeResult {
  const { country, years: y, byEmployer, overrideDays } = input;
  const notes: string[] = [];
  let days = 0;
  let label = "";
  let statute = "";

  switch (country) {
    case "de": {
      statute = "§622 BGB";
      if (!byEmployer) {
        days = 28;
        label = "4 weeks to the 15th or the end of a calendar month";
        notes.push("Employees always keep the basic 4-week notice unless the contract or Tarifvertrag agrees otherwise.");
      } else {
        const bands: [number, number, string][] = [
          [20, 210, "7 months to the end of a calendar month"],
          [15, 180, "6 months to the end of a calendar month"],
          [12, 150, "5 months to the end of a calendar month"],
          [10, 120, "4 months to the end of a calendar month"],
          [8, 90, "3 months to the end of a calendar month"],
          [5, 60, "2 months to the end of a calendar month"],
          [2, 30, "1 month to the end of a calendar month"],
        ];
        const hit = bands.find(([min]) => y >= min);
        days = hit ? hit[1] : 28;
        label = hit ? hit[2] : "4 weeks to the 15th or the end of a calendar month";
        notes.push("Probation (Probezeit) shortens notice to 2 weeks for up to the first 6 months.");
      }
      break;
    }

    case "fr": {
      statute = "Art. L1234-1 Code du travail";
      if (y < 0.5) { days = 0; label = "Set by the convention collective or local practice"; }
      else if (y < 2) { days = 30; label = "1 month"; }
      else { days = 60; label = "2 months"; }
      notes.push(
        byEmployer
          ? "This is the statutory floor. Conventions collectives routinely give cadres 3 months."
          : "Resigning employees usually owe the notice set by the convention collective — 1 month for non-cadres, up to 3 months for cadres.",
      );
      break;
    }

    case "es": {
      statute = "Arts. 49 & 53 Estatuto de los Trabajadores";
      days = 15;
      label = "15 calendar days";
      notes.push(
        byEmployer
          ? "Objective dismissals require 15 days' written notice or payment in lieu, alongside the severance payment."
          : "Employees give the notice set by their convenio colectivo — commonly 15 days.",
        "Disciplinary dismissals (despido disciplinario) take effect immediately with no notice.",
      );
      break;
    }

    case "it": {
      statute = "CCNL applicabile; art. 2118 Codice civile";
      const base = y < 5 ? 30 : y < 10 ? 45 : 60;
      days = byEmployer ? base : Math.round(base / 2);
      label = `${days} days (indicative — set by the CCNL)`;
      notes.push(
        "Italy sets notice in the national collective agreement (CCNL) for your sector and grade, not in statute — check your CCNL table.",
        "Employee notice on resignation is usually about half the employer's notice.",
      );
      break;
    }

    case "pt": {
      statute = "Arts. 363 & 400 Código do Trabalho";
      if (byEmployer) {
        days = y < 1 ? 15 : y < 5 ? 30 : y < 10 ? 60 : 75;
        label = `${days} days`;
        notes.push("Notice runs from written communication of the dismissal and can be paid in lieu.");
      } else {
        days = y < 2 ? 30 : 60;
        label = `${days} days`;
        notes.push("Employees resigning owe 30 days (under 2 years' service) or 60 days.");
      }
      break;
    }
  }

  if (typeof overrideDays === "number" && overrideDays > 0) {
    notes.push(`Collective-agreement override applied: ${overrideDays} days instead of the statutory ${days}.`);
    days = overrideDays;
    label = `${overrideDays} days (collective agreement)`;
  }

  return {
    days,
    label,
    statute,
    notes,
    payInLieu: monthlySalary ? round((monthlySalary / 30) * days) : undefined,
  };
}

/** Add `days` calendar days to an ISO date string, returning ISO. */
export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return "";
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

/* ------------------------------------------------------------------ */
/* Country copy                                                        */
/* ------------------------------------------------------------------ */

export const EU_EMPLOYMENT_COUNTRIES: Record<EuCountryCode, EuEmploymentCountry> = {
  de: {
    code: "de",
    nativeLocale: "de",
    severanceStatute: "§1a KSchG",
    noticeStatute: "§622 BGB",
    intro: {
      en: "German law gives no automatic right to severance. In practice, an Abfindung is paid to settle an unfair-dismissal claim (Kündigungsschutzklage) filed within three weeks of the termination letter — the customary benchmark is half a gross monthly salary per year of service.",
      de: "Das deutsche Recht kennt keinen allgemeinen Abfindungsanspruch. In der Praxis wird eine Abfindung gezahlt, um eine innerhalb von drei Wochen erhobene Kündigungsschutzklage zu erledigen — üblich ist ein halbes Bruttomonatsgehalt pro Beschäftigungsjahr.",
    },
    faqs: [
      {
        q: { en: "Do I always get severance in Germany?", de: "Bekomme ich in Deutschland immer eine Abfindung?" },
        a: {
          en: "No. Severance is either offered under §1a KSchG when the employer wants to avoid litigation, agreed in a settlement, or awarded by the labour court when reinstatement is unreasonable.",
          de: "Nein. Eine Abfindung ergibt sich aus §1a KSchG, aus einem Vergleich oder aus einer Auflösung des Arbeitsverhältnisses durch das Arbeitsgericht.",
        },
      },
      {
        q: { en: "How long do I have to challenge a dismissal?", de: "Wie lange kann ich gegen eine Kündigung klagen?" },
        a: {
          en: "Three weeks from receiving the written notice. Miss it and the dismissal becomes legally effective regardless of its merits.",
          de: "Drei Wochen ab Zugang der schriftlichen Kündigung. Danach gilt die Kündigung als wirksam.",
        },
      },
    ],
    sources: [
      { label: "Kündigungsschutzgesetz (gesetze-im-internet.de)", url: "https://www.gesetze-im-internet.de/kschg/" },
      { label: "§622 BGB — Kündigungsfristen", url: "https://www.gesetze-im-internet.de/bgb/__622.html" },
    ],
  },
  fr: {
    code: "fr",
    nativeLocale: "fr",
    severanceStatute: "Art. L1234-9 Code du travail",
    noticeStatute: "Art. L1234-1 Code du travail",
    intro: {
      en: "France pays a statutory redundancy indemnity after eight months' service: one quarter of a month's salary per year for the first ten years, one third per year after that. A dismissal without real and serious cause adds damages capped by the barème Macron.",
      fr: "En France, l'indemnité légale de licenciement est due après huit mois d'ancienneté : un quart de mois de salaire par année jusqu'à dix ans, puis un tiers de mois par année. Un licenciement sans cause réelle et sérieuse ouvre droit à des dommages-intérêts encadrés par le barème Macron.",
    },
    faqs: [
      {
        q: { en: "Is a rupture conventionnelle better than resigning?", fr: "La rupture conventionnelle est-elle préférable à la démission ?" },
        a: {
          en: "Usually yes — it pays at least the statutory indemnity and preserves unemployment benefit rights, which a resignation normally does not.",
          fr: "Le plus souvent oui : elle garantit au moins l'indemnité légale et ouvre droit à l'allocation chômage, contrairement à la démission.",
        },
      },
    ],
    sources: [
      { label: "Service-Public — indemnité de licenciement", url: "https://www.service-public.fr/particuliers/vosdroits/F987" },
    ],
  },
  es: {
    code: "es",
    nativeLocale: "es",
    severanceStatute: "Arts. 52–56 Estatuto de los Trabajadores",
    noticeStatute: "Art. 53 Estatuto de los Trabajadores",
    intro: {
      en: "Spanish severance depends entirely on how the dismissal is classified: 20 days' salary per year for an objective dismissal, 33 days per year if it is declared unfair (improcedente), and nothing at all if a disciplinary dismissal is upheld.",
      es: "En España la indemnización depende de la calificación del despido: 20 días de salario por año en el despido objetivo, 33 días por año si se declara improcedente, y ninguna indemnización si el despido disciplinario se declara procedente.",
    },
    faqs: [
      {
        q: { en: "How long do I have to challenge a dismissal in Spain?", es: "¿Cuánto tiempo tengo para impugnar un despido?" },
        a: {
          en: "20 working days from the effective date of dismissal. The clock is short and it is not extended by negotiations.",
          es: "20 días hábiles desde la fecha de efectos del despido. El plazo es de caducidad y no se amplía por negociar.",
        },
      },
    ],
    sources: [
      { label: "Estatuto de los Trabajadores (BOE)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430" },
    ],
  },
  it: {
    code: "it",
    nativeLocale: "it",
    severanceStatute: "Art. 2120 Codice civile (TFR)",
    noticeStatute: "CCNL di settore; art. 2118 c.c.",
    intro: {
      en: "Every Italian employee accrues TFR — deferred pay of roughly one month's salary for every 13.5 months worked — payable on any termination. On top of that, an unlawful dismissal triggers an indemnity of two months' pay per year of service under the tutele crescenti regime.",
      it: "Ogni lavoratore italiano matura il TFR, una retribuzione differita pari a circa una mensilità ogni 13,5 mesi lavorati, dovuta a qualsiasi cessazione. In caso di licenziamento illegittimo si aggiunge un'indennità di due mensilità per anno di servizio nel regime delle tutele crescenti.",
    },
    faqs: [
      {
        q: { en: "Do I get TFR if I resign?", it: "Il TFR spetta anche in caso di dimissioni?" },
        a: {
          en: "Yes. TFR is deferred pay you have already earned and is due on any termination, including resignation and retirement.",
          it: "Sì. Il TFR è retribuzione differita già maturata ed è dovuto in ogni caso di cessazione, comprese dimissioni e pensionamento.",
        },
      },
    ],
    sources: [
      { label: "INPS — TFR", url: "https://www.inps.it" },
    ],
  },
  pt: {
    code: "pt",
    nativeLocale: "pt",
    severanceStatute: "Art. 366 Código do Trabalho",
    noticeStatute: "Arts. 363 & 400 Código do Trabalho",
    intro: {
      en: "Portuguese compensation for redundancy or the extinction of a post is 12 days of base pay per full year of service, with the base pay capped at 20× the national minimum wage and total compensation capped at 12 months' pay.",
      pt: "Em Portugal, a compensação por despedimento coletivo ou extinção do posto de trabalho é de 12 dias de retribuição base por cada ano completo de antiguidade, com a retribuição base limitada a 20× o salário mínimo nacional e a compensação total limitada a 12 meses.",
    },
    faqs: [
      {
        q: { en: "What if the dismissal is unlawful?", pt: "E se o despedimento for ilícito?" },
        a: {
          en: "You are entitled to the salary lost between dismissal and the court ruling, plus either reinstatement or compensation of 15 to 45 days' pay per year of service.",
          pt: "Tem direito às retribuições vencidas entre o despedimento e a decisão judicial e, em alternativa à reintegração, a uma indemnização de 15 a 45 dias de retribuição por cada ano de antiguidade.",
        },
      },
    ],
    sources: [
      { label: "Código do Trabalho (DRE)", url: "https://diariodarepublica.pt" },
    ],
  },
};

/** Stable, locale-invariant URL slugs for the country deep links. */
export const EU_TOOL_COUNTRY_SLUGS: Record<EuCountryCode, string> = {
  de: "germany",
  fr: "france",
  es: "spain",
  it: "italy",
  pt: "portugal",
};

export function countryFromToolSlug(slug?: string): EuCountryCode | undefined {
  const entry = Object.entries(EU_TOOL_COUNTRY_SLUGS).find(([, s]) => s === slug);
  return entry?.[0] as EuCountryCode | undefined;
}

export const EU_TOOL_COUNTRY_ORDER: EuCountryCode[] = ["de", "fr", "es", "it", "pt"];
