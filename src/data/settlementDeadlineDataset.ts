/**
 * Workstream 2 — Linkable Dataset #1.
 *
 * A single canonical, citable table that merges every state-level legal
 * deadline and payout rule we already maintain into one row per jurisdiction:
 *
 *  - Civil filing deadlines (personal injury, med-mal, wrongful death)
 *  - Comparative-negligence rule and minimum auto liability limits
 *  - Workers' compensation notice / claim / appeal windows and TTD rate
 *  - Wrongful-termination charge deadlines (state FEPA + EEOC)
 *  - Insurance prompt-pay deadlines and bad-faith remedy
 *
 * The dataset is DERIVED — never hand-maintained. Update the source files and
 * this table updates with them.
 */

import { stateData } from "@/data/locations/stateData";
import { SOL_STATES, type SolClaimType } from "@/data/solData";
import { workersCompStates } from "@/data/workersCompStates";
import { wrongfulTerminationStates } from "@/data/wrongfulTerminationStates";
import { carInsuranceDenialStates } from "@/data/carInsuranceDenialStates";

export interface SettlementDeadlineRow {
  slug: string;
  state: string;
  abbr: string;
  /** Civil filing deadlines, in years. */
  personalInjurySol: number | null;
  medMalSol: number | null;
  wrongfulDeathSol: number | null;
  solCitation: string;
  negligenceRule: string;
  minAutoLimits: string;
  faultSystem: string;
  /** Workers' compensation. */
  wcNotice: string;
  wcClaim: string;
  wcAppeal: string;
  wcTtdRate: string;
  /** Employment. */
  fepaAgency: string;
  fepaDeadline: string;
  eeocDeadline: string;
  /** Insurance. */
  insurancePromptPay: string;
  insuranceBadFaith: string;
}

function solYears(stateName: string, claim: SolClaimType) {
  const rec = SOL_STATES.find((s) => s.state === stateName);
  return rec?.entries[claim] ?? null;
}

function build(): SettlementDeadlineRow[] {
  const wcBySlug = new Map(workersCompStates.map((s) => [s.slug, s]));
  const wtBySlug = new Map(wrongfulTerminationStates.map((s) => [s.slug, s]));
  const ciBySlug = new Map(carInsuranceDenialStates.map((s) => [s.slug, s]));

  // stateData covers the 50 states; the fan-outs add District of Columbia.
  const base = [
    ...stateData.map((s) => ({ slug: s.slug, name: s.name, abbr: s.abbreviation, legal: s })),
    ...(stateData.some((s) => s.slug === "district-of-columbia")
      ? []
      : [{ slug: "district-of-columbia", name: "District of Columbia", abbr: "DC", legal: undefined }]),
  ];

  return base
    .map(({ slug, name, abbr, legal }) => {
      const wc = wcBySlug.get(slug);
      const wt = wtBySlug.get(slug);
      const ci = ciBySlug.get(slug);
      const pi = solYears(name, "personal_injury");
      const mm = solYears(name, "medical_malpractice");
      const wd = solYears(name, "wrongful_death");

      return {
        slug,
        state: name,
        abbr,
        personalInjurySol: pi?.years ?? null,
        medMalSol: mm?.years ?? null,
        wrongfulDeathSol: wd?.years ?? null,
        solCitation: pi?.citation ?? ci?.statute ?? "—",
        negligenceRule: legal?.negligenceRule ?? "modified comparative (51%)",
        minAutoLimits: ci?.minLimits ?? legal?.minAutoInsurance ?? "—",
        faultSystem: ci?.faultSystem ?? (legal?.noFault ? "No-fault (PIP)" : "At-fault (tort)"),
        wcNotice: wc?.noticeDeadline ?? "—",
        wcClaim: wc?.claimDeadline ?? "—",
        wcAppeal: wc?.appealDeadline ?? "—",
        wcTtdRate: wc?.ttdRate ?? "—",
        fepaAgency: wt?.agency ?? "—",
        fepaDeadline: wt?.stateDeadline ?? "—",
        eeocDeadline: wt?.eeocDeadline ?? "180–300 days",
        insurancePromptPay: ci?.promptPay ?? "—",
        insuranceBadFaith: ci?.badFaith ?? "—",
      } satisfies SettlementDeadlineRow;
    })
    .sort((a, b) => a.state.localeCompare(b.state));
}

export const settlementDeadlineDataset: SettlementDeadlineRow[] = build();

export interface DatasetColumn {
  id: keyof SettlementDeadlineRow;
  label: string;
  group: "civil" | "workers-comp" | "employment" | "insurance";
  /** Shown in the compact default view. */
  primary?: boolean;
}

export const DATASET_COLUMNS: DatasetColumn[] = [
  { id: "personalInjurySol", label: "Personal injury SOL (yrs)", group: "civil", primary: true },
  { id: "medMalSol", label: "Medical malpractice SOL (yrs)", group: "civil" },
  { id: "wrongfulDeathSol", label: "Wrongful death SOL (yrs)", group: "civil" },
  { id: "negligenceRule", label: "Comparative negligence rule", group: "civil", primary: true },
  { id: "solCitation", label: "Statutory citation", group: "civil" },
  { id: "wcNotice", label: "WC notice to employer", group: "workers-comp" },
  { id: "wcClaim", label: "WC claim deadline", group: "workers-comp", primary: true },
  { id: "wcAppeal", label: "WC denial appeal window", group: "workers-comp", primary: true },
  { id: "wcTtdRate", label: "WC temporary total disability rate", group: "workers-comp" },
  { id: "fepaAgency", label: "State fair-employment agency", group: "employment" },
  { id: "fepaDeadline", label: "State discrimination charge deadline", group: "employment", primary: true },
  { id: "eeocDeadline", label: "EEOC charge deadline", group: "employment" },
  { id: "faultSystem", label: "Auto fault system", group: "insurance" },
  { id: "minAutoLimits", label: "Minimum auto liability limits", group: "insurance" },
  { id: "insurancePromptPay", label: "Insurer prompt-pay deadline", group: "insurance", primary: true },
  { id: "insuranceBadFaith", label: "First-party bad-faith remedy", group: "insurance" },
];

export const DATASET_GROUPS: { id: DatasetColumn["group"]; label: string }[] = [
  { id: "civil", label: "Civil filing deadlines" },
  { id: "workers-comp", label: "Workers' compensation" },
  { id: "employment", label: "Employment / wrongful termination" },
  { id: "insurance", label: "Auto insurance claims" },
];

/** RFC-4180 CSV of the full dataset. */
export function datasetToCsv(rows: SettlementDeadlineRow[] = settlementDeadlineDataset): string {
  const cols: (keyof SettlementDeadlineRow)[] = [
    "state",
    "abbr",
    ...DATASET_COLUMNS.map((c) => c.id),
  ];
  const header = ["State", "Abbr", ...DATASET_COLUMNS.map((c) => c.label)];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [header.map(esc).join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\r\n");
}

export const DATASET_META = {
  name: "US State Legal Deadlines & Settlement Rules Dataset",
  version: "1.0",
  jurisdictions: settlementDeadlineDataset.length,
  fields: DATASET_COLUMNS.length + 2,
  updated: "2026-08-11",
  license: "CC BY 4.0 — free to reuse with attribution to LegallySpoken.",
};
