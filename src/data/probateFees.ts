/**
 * Probate cost data layer.
 *
 * Statutory-fee states publish an explicit sliding scale for executor and
 * attorney compensation. "Reasonable fee" states leave it to the court, so we
 * model an observed percentage band instead.
 *
 * Sources: state probate codes (CA Prob. Code §§ 10800/10810, FL Stat.
 * § 733.6171 & § 733.617, NY SCPA § 2307, MO Rev. Stat. § 473.153,
 * WY Stat. § 2-7-803, MT Code § 72-3-631, AR Code § 28-48-108,
 * IA Code § 633.197) plus published county filing-fee schedules.
 */

export type FeeBasis = "statutory-scale" | "reasonable-percent";

export interface ProbateTier {
  /** Upper bound of the tier in dollars (Infinity for the final tier). */
  upTo: number;
  /** Percentage applied to the portion of the estate inside this tier. */
  percent: number;
}

export interface ProbateState {
  code: string;
  name: string;
  basis: FeeBasis;
  /** Statutory sliding scale (attorney and executor each earn this in scale states). */
  scale?: ProbateTier[];
  /** Observed total professional-fee band as a % of estate value. */
  reasonableBand?: [number, number];
  /** Typical superior/surrogate court filing fee to open probate. */
  filingFee: number;
  /** Typical months from petition to final distribution for an uncontested estate. */
  typicalMonths: [number, number];
  /** Simplified / small-estate affidavit ceiling. */
  smallEstateLimit: number;
  notes: string;
}

const CA_SCALE: ProbateTier[] = [
  { upTo: 100_000, percent: 4 },
  { upTo: 200_000, percent: 3 },
  { upTo: 1_000_000, percent: 2 },
  { upTo: 10_000_000, percent: 1 },
  { upTo: 25_000_000, percent: 0.5 },
  { upTo: Infinity, percent: 0.25 },
];

const FL_SCALE: ProbateTier[] = [
  { upTo: 100_000, percent: 3 },
  { upTo: 1_000_000, percent: 3 },
  { upTo: 3_000_000, percent: 2.5 },
  { upTo: 5_000_000, percent: 2 },
  { upTo: Infinity, percent: 1.5 },
];

const NY_SCALE: ProbateTier[] = [
  { upTo: 100_000, percent: 5 },
  { upTo: 300_000, percent: 4 },
  { upTo: 1_000_000, percent: 3 },
  { upTo: 5_000_000, percent: 2.5 },
  { upTo: Infinity, percent: 2 },
];

const MO_SCALE: ProbateTier[] = [
  { upTo: 5_000, percent: 5 },
  { upTo: 25_000, percent: 4 },
  { upTo: 100_000, percent: 3 },
  { upTo: 400_000, percent: 2.75 },
  { upTo: 1_000_000, percent: 2.5 },
  { upTo: Infinity, percent: 2 },
];

const WY_SCALE: ProbateTier[] = [
  { upTo: 1_000, percent: 10 },
  { upTo: 5_000, percent: 5 },
  { upTo: 20_000, percent: 3 },
  { upTo: Infinity, percent: 2 },
];

const MT_SCALE: ProbateTier[] = [
  { upTo: 40_000, percent: 3 },
  { upTo: Infinity, percent: 2 },
];

const AR_SCALE: ProbateTier[] = [
  { upTo: 1_000, percent: 10 },
  { upTo: 5_000, percent: 5 },
  { upTo: Infinity, percent: 3 },
];

const IA_SCALE: ProbateTier[] = [
  { upTo: 1_000, percent: 6 },
  { upTo: 5_000, percent: 4 },
  { upTo: Infinity, percent: 2 },
];

export const probateStates: ProbateState[] = [
  { code: "CA", name: "California", basis: "statutory-scale", scale: CA_SCALE, filingFee: 435, typicalMonths: [9, 18], smallEstateLimit: 184_500, notes: "Both the attorney and the personal representative are each entitled to the same statutory fee (Prob. Code §§ 10800, 10810). Extraordinary services are billed on top with court approval." },
  { code: "FL", name: "Florida", basis: "statutory-scale", scale: FL_SCALE, filingFee: 400, typicalMonths: [6, 12], smallEstateLimit: 75_000, notes: "Fla. Stat. § 733.6171 sets a presumptively reasonable attorney fee; § 733.617 sets personal-representative compensation on a similar scale." },
  { code: "NY", name: "New York", basis: "statutory-scale", scale: NY_SCALE, filingFee: 1_250, typicalMonths: [9, 18], smallEstateLimit: 50_000, notes: "SCPA § 2307 fixes executor commissions on a sliding scale. Attorney fees are 'reasonable' and reviewed by the Surrogate. Filing fee is tied to estate value (max $1,250)." },
  { code: "MO", name: "Missouri", basis: "statutory-scale", scale: MO_SCALE, filingFee: 200, typicalMonths: [8, 14], smallEstateLimit: 40_000, notes: "Rev. Stat. § 473.153 sets minimum compensation for both the executor and the attorney on the same schedule." },
  { code: "WY", name: "Wyoming", basis: "statutory-scale", scale: WY_SCALE, filingFee: 100, typicalMonths: [6, 12], smallEstateLimit: 200_000, notes: "Wyo. Stat. § 2-7-803 sets both executor and attorney fees on the same percentage scale." },
  { code: "MT", name: "Montana", basis: "statutory-scale", scale: MT_SCALE, filingFee: 90, typicalMonths: [6, 12], smallEstateLimit: 50_000, notes: "Mont. Code § 72-3-631 permits reasonable compensation; the 3%/2% schedule is the customary benchmark." },
  { code: "AR", name: "Arkansas", basis: "statutory-scale", scale: AR_SCALE, filingFee: 165, typicalMonths: [6, 14], smallEstateLimit: 100_000, notes: "Ark. Code § 28-48-108 caps personal-representative compensation on a declining scale." },
  { code: "IA", name: "Iowa", basis: "statutory-scale", scale: IA_SCALE, filingFee: 185, typicalMonths: [9, 18], smallEstateLimit: 200_000, notes: "Iowa Code § 633.197 caps ordinary executor fees; attorney fees under § 633.198 mirror the schedule." },

  { code: "TX", name: "Texas", basis: "reasonable-percent", reasonableBand: [2, 5], filingFee: 300, typicalMonths: [4, 9], smallEstateLimit: 75_000, notes: "Independent administration keeps costs low. Executor commission is capped at 5% of cash received and paid out (Est. Code § 352.002); attorneys usually bill hourly or a flat fee." },
  { code: "IL", name: "Illinois", basis: "reasonable-percent", reasonableBand: [3, 6], filingFee: 380, typicalMonths: [9, 15], smallEstateLimit: 100_000, notes: "755 ILCS 5/27-1 allows 'reasonable' compensation; Cook County attorney fees are usually hourly and court-reviewed." },
  { code: "PA", name: "Pennsylvania", basis: "reasonable-percent", reasonableBand: [3, 6], filingFee: 250, typicalMonths: [9, 18], smallEstateLimit: 50_000, notes: "The informal Johnson estate fee schedule is still used as a benchmark. Pennsylvania also charges inheritance tax (4.5% lineal, 12% sibling, 15% other)." },
  { code: "OH", name: "Ohio", basis: "reasonable-percent", reasonableBand: [2, 5], filingFee: 200, typicalMonths: [6, 12], smallEstateLimit: 100_000, notes: "R.C. 2113.35 sets executor commissions at 4%/3%/2% of personalty tiers plus 1% of real estate not sold." },
  { code: "GA", name: "Georgia", basis: "reasonable-percent", reasonableBand: [2.5, 5], filingFee: 175, typicalMonths: [8, 14], smallEstateLimit: 10_000, notes: "O.C.G.A. § 53-6-60 gives executors 2.5% of money received and 2.5% of money paid out unless the will says otherwise." },
  { code: "NC", name: "North Carolina", basis: "reasonable-percent", reasonableBand: [2, 5], filingFee: 120, typicalMonths: [8, 14], smallEstateLimit: 20_000, notes: "Clerk of Superior Court may allow commissions up to 5% of receipts and disbursements (G.S. § 28A-23-3). Court costs are 0.4% of receipts, capped at $6,000." },
  { code: "MI", name: "Michigan", basis: "reasonable-percent", reasonableBand: [2, 5], filingFee: 175, typicalMonths: [7, 13], smallEstateLimit: 27_000, notes: "MCL 700.3719 allows reasonable compensation; an inventory fee scaled to estate value is also owed to the probate court." },
  { code: "NJ", name: "New Jersey", basis: "reasonable-percent", reasonableBand: [3, 6], filingFee: 175, typicalMonths: [9, 16], smallEstateLimit: 50_000, notes: "N.J.S.A. 3B:18-14 sets corpus commissions at 5% of the first $200,000, 3.5% to $1M, 2% above." },
  { code: "WA", name: "Washington", basis: "reasonable-percent", reasonableBand: [2, 4], filingFee: 240, typicalMonths: [6, 12], smallEstateLimit: 100_000, notes: "Non-intervention powers make Washington one of the cheapest probate states; RCW 11.48.210 allows reasonable fees." },
  { code: "AZ", name: "Arizona", basis: "reasonable-percent", reasonableBand: [2, 4], filingFee: 230, typicalMonths: [6, 12], smallEstateLimit: 75_000, notes: "Informal probate handled by a registrar; A.R.S. § 14-3719 allows reasonable compensation." },
  { code: "MA", name: "Massachusetts", basis: "reasonable-percent", reasonableBand: [3, 6], filingFee: 375, typicalMonths: [9, 16], smallEstateLimit: 25_000, notes: "MUPC informal probate is fastest; fees are reasonable-and-necessary, reviewed on objection." },
  { code: "VA", name: "Virginia", basis: "reasonable-percent", reasonableBand: [2.5, 5], filingFee: 100, typicalMonths: [8, 15], smallEstateLimit: 50_000, notes: "Commissioner of Accounts guidelines allow roughly 5% of receipts. A probate tax of $1 per $1,000 of estate value also applies." },
  { code: "CO", name: "Colorado", basis: "reasonable-percent", reasonableBand: [2, 4], filingFee: 199, typicalMonths: [6, 12], smallEstateLimit: 82_000, notes: "Informal probate under the Uniform Probate Code keeps most estates out of hearings entirely." },
];

export function getProbateState(code: string): ProbateState | undefined {
  return probateStates.find((s) => s.code === code);
}

/** Apply a statutory sliding scale to an estate value. */
export function applyScale(scale: ProbateTier[], estateValue: number): number {
  let remaining = estateValue;
  let previousCeiling = 0;
  let total = 0;
  for (const tier of scale) {
    if (remaining <= 0) break;
    const width = tier.upTo === Infinity ? remaining : Math.max(0, tier.upTo - previousCeiling);
    const slice = Math.min(remaining, width);
    total += slice * (tier.percent / 100);
    remaining -= slice;
    previousCeiling = tier.upTo;
  }
  return total;
}

export interface ProbateCostBreakdown {
  attorneyFee: number;
  executorFee: number;
  filingFee: number;
  appraisalAndBond: number;
  publicationAndCertified: number;
  accountingAndTax: number;
  total: number;
  netToHeirs: number;
  percentOfEstate: number;
  basis: FeeBasis;
}

/**
 * Estimate total probate cost.
 * @param grossEstate value of probate assets (non-probate assets excluded by caller)
 * @param waiveExecutorFee family executors often waive the commission
 */
export function estimateProbateCost(
  state: ProbateState,
  grossEstate: number,
  opts: { waiveExecutorFee?: boolean; contested?: boolean; realEstateParcels?: number } = {},
): ProbateCostBreakdown {
  const { waiveExecutorFee = false, contested = false, realEstateParcels = 0 } = opts;

  let attorneyFee: number;
  let executorFee: number;

  if (state.basis === "statutory-scale" && state.scale) {
    attorneyFee = applyScale(state.scale, grossEstate);
    executorFee = waiveExecutorFee ? 0 : applyScale(state.scale, grossEstate);
  } else {
    const [low, high] = state.reasonableBand ?? [2, 5];
    const mid = (low + high) / 2;
    // In reasonable-fee states the band already covers attorney + executor.
    attorneyFee = grossEstate * (mid / 100) * (waiveExecutorFee ? 1 : 0.65);
    executorFee = waiveExecutorFee ? 0 : grossEstate * (mid / 100) * 0.35;
  }

  const appraisalAndBond = realEstateParcels * 450 + Math.min(grossEstate * 0.002, 2_500);
  const publicationAndCertified = 350;
  const accountingAndTax = grossEstate > 500_000 ? 2_400 : 900;

  const contestMultiplier = contested ? 1.85 : 1;
  const subtotal =
    (attorneyFee + executorFee) * contestMultiplier +
    state.filingFee +
    appraisalAndBond +
    publicationAndCertified +
    accountingAndTax;

  return {
    attorneyFee: attorneyFee * contestMultiplier,
    executorFee: executorFee * contestMultiplier,
    filingFee: state.filingFee,
    appraisalAndBond,
    publicationAndCertified,
    accountingAndTax,
    total: subtotal,
    netToHeirs: Math.max(0, grossEstate - subtotal),
    percentOfEstate: grossEstate > 0 ? (subtotal / grossEstate) * 100 : 0,
    basis: state.basis,
  };
}
