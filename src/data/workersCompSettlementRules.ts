/**
 * Workers' compensation settlement rules by jurisdiction (50 states + DC).
 *
 * Three variables decide what a comp claim is actually worth:
 *  1. the weekly benefit cap — your comp rate is 2/3 of the average weekly
 *     wage but never more than the state maximum, so high earners are capped;
 *  2. how the state pays permanent partial disability (PPD) — a scheduled
 *     number of weeks per body part, a whole-person impairment rating, or
 *     actual wage loss; and
 *  3. the attorney fee the state allows a judge to approve, which comes out
 *     of the settlement.
 *
 * Weekly maximums track each state's average weekly wage and are re-set
 * every year (most on 1 January or 1 July). Treat every figure here as an
 * indicative benchmark for estimating, not as the operative number in your
 * claim. Educational information only — not legal advice.
 */

export type PpdSystem = "Scheduled weeks" | "Whole-person impairment" | "Wage loss";

export interface WorkersCompSettlementRule {
  state: string;
  abbr: string;
  /** Maximum weekly indemnity benefit (approximate, most recent published year). */
  maxWeekly: number;
  /** Wage-replacement rate for temporary total disability. */
  ttdRate: string;
  /** How permanent partial disability is measured. */
  ppdSystem: PpdSystem;
  /** Typical claimant attorney fee a judge will approve, as a rate used for estimating. */
  feeRate: number;
  /** Human-readable description of the fee rule. */
  feeNote: string;
  /** Governing statute. */
  statute: string;
  note?: string;
}

export const workersCompSettlementRules: WorkersCompSettlementRule[] = [
  { state: "Alabama", abbr: "AL", maxWeekly: 1050, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.15, feeNote: "15% of the award, court approved", statute: "Ala. Code § 25-5-1 et seq." },
  { state: "Alaska", abbr: "AK", maxWeekly: 1348, ttdRate: "80% of spendable weekly wage", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "Board-approved statutory minimum fee schedule", statute: "Alaska Stat. § 23.30" },
  { state: "Arizona", abbr: "AZ", maxWeekly: 1173, ttdRate: "66⅔% of average monthly wage", ppdSystem: "Scheduled weeks", feeRate: 0.25, feeNote: "Up to 25%, ICA approved", statute: "A.R.S. § 23-901 et seq." },
  { state: "Arkansas", abbr: "AR", maxWeekly: 811, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.25, feeNote: "25% split between claimant and carrier", statute: "Ark. Code § 11-9-101 et seq." },
  { state: "California", abbr: "CA", maxWeekly: 1620, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.15, feeNote: "9–15% of the award, WCAB approved", statute: "Cal. Lab. Code § 3200 et seq.", note: "PD is rated under the 2005 PDRS with an FEC/occupation adjustment; C&R settlements dominate." },
  { state: "Colorado", abbr: "CO", maxWeekly: 1382, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "20% of contested benefits", statute: "C.R.S. § 8-40-101 et seq." },
  { state: "Connecticut", abbr: "CT", maxWeekly: 1651, ttdRate: "75% of after-tax AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "20% of the award, commissioner approved", statute: "Conn. Gen. Stat. § 31-275 et seq." },
  { state: "Delaware", abbr: "DE", maxWeekly: 872, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.30, feeNote: "Statutory cap: 30% of the award or 10× the state AWW, whichever is less", statute: "19 Del. C. § 2301 et seq." },
  { state: "District of Columbia", abbr: "DC", maxWeekly: 1622, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "20%, approval required", statute: "D.C. Code § 32-1501 et seq." },
  { state: "Florida", abbr: "FL", maxWeekly: 1260, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "Sliding scale: 20% of the first $5,000, 15% of the next $5,000, 10% after", statute: "Fla. Stat. ch. 440", note: "Impairment income benefits are paid by rating percentage, not scheduled member weeks." },
  { state: "Georgia", abbr: "GA", maxWeekly: 800, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.25, feeNote: "25%, State Board approved", statute: "O.C.G.A. § 34-9-1 et seq." },
  { state: "Hawaii", abbr: "HI", maxWeekly: 1188, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "Director-approved fee based on hours and result", statute: "HRS ch. 386" },
  { state: "Idaho", abbr: "ID", maxWeekly: 928, ttdRate: "67% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "25–30% depending on stage, Commission approved", statute: "Idaho Code § 72-101 et seq." },
  { state: "Illinois", abbr: "IL", maxWeekly: 1849, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "20% statutory cap", statute: "820 ILCS 305", note: "PPD uses the AMA rating plus five statutory factors under § 8.1b." },
  { state: "Indiana", abbr: "IN", maxWeekly: 833, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "20% of the first $50,000, 15% above", statute: "Ind. Code § 22-3" },
  { state: "Iowa", abbr: "IA", maxWeekly: 2130, ttdRate: "80% of spendable weekly earnings", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "Contingency fee, commissioner approved", statute: "Iowa Code ch. 85", note: "One of the highest weekly caps in the country." },
  { state: "Kansas", abbr: "KS", maxWeekly: 804, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "25% of the amount recovered", statute: "K.S.A. § 44-501 et seq." },
  { state: "Kentucky", abbr: "KY", maxWeekly: 1118, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "20% up to a statutory dollar cap", statute: "KRS ch. 342" },
  { state: "Louisiana", abbr: "LA", maxWeekly: 816, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "20% statutory maximum", statute: "La. R.S. 23:1021 et seq." },
  { state: "Maine", abbr: "ME", maxWeekly: 1128, ttdRate: "66⅔% of after-tax AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "Board-approved fee", statute: "39-A M.R.S." },
  { state: "Maryland", abbr: "MD", maxWeekly: 1231, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "Commission fee schedule tied to the award tier", statute: "Md. Lab. & Empl. § 9-101 et seq." },
  { state: "Massachusetts", abbr: "MA", maxWeekly: 1829, ttdRate: "60% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "20% of a lump sum settlement", statute: "M.G.L. ch. 152" },
  { state: "Michigan", abbr: "MI", maxWeekly: 1163, ttdRate: "80% of after-tax AWW", ppdSystem: "Wage loss", feeRate: 0.30, feeNote: "30% of accrued and redemption amounts, magistrate approved", statute: "MCL 418.101 et seq.", note: "Michigan pays wage loss rather than scheduled PPD, so redemption value turns on residual earning capacity." },
  { state: "Minnesota", abbr: "MN", maxWeekly: 1284, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "20% of the first $130,000 in dispute", statute: "Minn. Stat. ch. 176" },
  { state: "Mississippi", abbr: "MS", maxWeekly: 604, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.25, feeNote: "25% of the award", statute: "Miss. Code § 71-3-1 et seq.", note: "Lowest weekly maximum in the country, and total benefits are capped at 450 weeks." },
  { state: "Missouri", abbr: "MO", maxWeekly: 1179, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.25, feeNote: "25%, Division approved", statute: "Mo. Rev. Stat. ch. 287" },
  { state: "Montana", abbr: "MT", maxWeekly: 894, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "25% of disputed benefits", statute: "Mont. Code Ann. Title 39, ch. 71" },
  { state: "Nebraska", abbr: "NE", maxWeekly: 1029, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.25, feeNote: "Court-approved reasonable fee", statute: "Neb. Rev. Stat. § 48-101 et seq." },
  { state: "Nevada", abbr: "NV", maxWeekly: 1183, ttdRate: "66⅔% of average monthly wage", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "Contingency fee, appeals officer approved", statute: "NRS ch. 616A–D" },
  { state: "New Hampshire", abbr: "NH", maxWeekly: 1875, ttdRate: "60% of after-tax AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "Department-approved fee", statute: "RSA 281-A" },
  { state: "New Jersey", abbr: "NJ", maxWeekly: 1131, ttdRate: "70% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "20% statutory maximum, split between the parties", statute: "N.J.S.A. 34:15-1 et seq." },
  { state: "New Mexico", abbr: "NM", maxWeekly: 951, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "Statutory fee cap, split 50/50 with the employer", statute: "NMSA ch. 52" },
  { state: "New York", abbr: "NY", maxWeekly: 1145, ttdRate: "66⅔% of AWW × loss of wage-earning capacity", ppdSystem: "Scheduled weeks", feeRate: 0.15, feeNote: "Board-approved fee, commonly 15%", statute: "N.Y. Work. Comp. Law", note: "Non-schedule permanent partial awards are capped in weeks by the loss-of-wage-earning-capacity percentage." },
  { state: "North Carolina", abbr: "NC", maxWeekly: 1240, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.25, feeNote: "25% of the award, Industrial Commission approved", statute: "N.C. Gen. Stat. ch. 97" },
  { state: "North Dakota", abbr: "ND", maxWeekly: 1191, ttdRate: "66⅔% of gross weekly wage", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "WSI-funded legal assistance program", statute: "N.D.C.C. Title 65" },
  { state: "Ohio", abbr: "OH", maxWeekly: 1132, ttdRate: "72% of AWW for 12 weeks, then 66⅔%", ppdSystem: "Whole-person impairment", feeRate: 0.33, feeNote: "Up to 33⅓% of contested amounts", statute: "Ohio Rev. Code ch. 4123", note: "State-fund system administered by the BWC; %PP awards are paid in weeks per percentage point." },
  { state: "Oklahoma", abbr: "OK", maxWeekly: 984, ttdRate: "70% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "20% of the award", statute: "85A O.S. § 1 et seq." },
  { state: "Oregon", abbr: "OR", maxWeekly: 1616, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "Fee schedule set by the Workers' Compensation Board", statute: "ORS ch. 656" },
  { state: "Pennsylvania", abbr: "PA", maxWeekly: 1325, ttdRate: "66⅔% of AWW", ppdSystem: "Wage loss", feeRate: 0.20, feeNote: "20% of the award, judge approved", statute: "77 P.S. § 1 et seq.", note: "Pennsylvania pays wage loss; an IRE can convert total to partial status after 104 weeks." },
  { state: "Rhode Island", abbr: "RI", maxWeekly: 1567, ttdRate: "75% of spendable AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "Court-approved fee", statute: "R.I. Gen. Laws § 28-29 et seq." },
  { state: "South Carolina", abbr: "SC", maxWeekly: 1063, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.33, feeNote: "Up to 33⅓%, Commission approved", statute: "S.C. Code § 42-1-10 et seq." },
  { state: "South Dakota", abbr: "SD", maxWeekly: 895, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "Department-approved contingency fee", statute: "SDCL ch. 62" },
  { state: "Tennessee", abbr: "TN", maxWeekly: 1108, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "20% statutory cap", statute: "Tenn. Code § 50-6-101 et seq." },
  { state: "Texas", abbr: "TX", maxWeekly: 1105, ttdRate: "70% of AWW (75% for low earners)", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "25% of income benefits, hourly guidelines apply", statute: "Tex. Lab. Code Title 5", note: "Impairment income benefits pay 3 weeks per percentage point of whole-body impairment." },
  { state: "Utah", abbr: "UT", maxWeekly: 1030, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "Commission fee schedule", statute: "Utah Code Title 34A" },
  { state: "Vermont", abbr: "VT", maxWeekly: 1584, ttdRate: "66⅔% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "20% of the award up to a statutory cap", statute: "21 V.S.A. ch. 9" },
  { state: "Virginia", abbr: "VA", maxWeekly: 1338, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "Commission-approved reasonable fee", statute: "Va. Code § 65.2-100 et seq." },
  { state: "Washington", abbr: "WA", maxWeekly: 2081, ttdRate: "60–75% of wages depending on dependents", ppdSystem: "Whole-person impairment", feeRate: 0.30, feeNote: "Up to 30% of increased benefits on appeal", statute: "RCW Title 51", note: "State-fund monopoly system; structured pension awards replace many lump sums." },
  { state: "West Virginia", abbr: "WV", maxWeekly: 1029, ttdRate: "70% of AWW", ppdSystem: "Whole-person impairment", feeRate: 0.20, feeNote: "20% of the award, capped by statute", statute: "W. Va. Code ch. 23" },
  { state: "Wisconsin", abbr: "WI", maxWeekly: 1200, ttdRate: "66⅔% of AWW", ppdSystem: "Scheduled weeks", feeRate: 0.20, feeNote: "20% statutory maximum", statute: "Wis. Stat. ch. 102" },
  { state: "Wyoming", abbr: "WY", maxWeekly: 985, ttdRate: "66⅔% of actual monthly earnings", ppdSystem: "Whole-person impairment", feeRate: 0.25, feeNote: "Hourly fees paid from the state fund", statute: "Wyo. Stat. Title 27, ch. 14" },
];

export const WC_NATIONAL_AVERAGE: WorkersCompSettlementRule = {
  state: "National average",
  abbr: "US",
  maxWeekly: 1200,
  ttdRate: "66⅔% of AWW",
  ppdSystem: "Scheduled weeks",
  feeRate: 0.2,
  feeNote: "20% is the most common approved claimant fee",
  statute: "Varies by jurisdiction",
};

export const WC_RULES_BY_STATE: Record<string, WorkersCompSettlementRule> = Object.fromEntries(
  [WC_NATIONAL_AVERAGE, ...workersCompSettlementRules].map((r) => [r.state, r]),
);

export function getWcRule(state: string): WorkersCompSettlementRule {
  return WC_RULES_BY_STATE[state] ?? WC_NATIONAL_AVERAGE;
}
