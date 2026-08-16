/**
 * Wrongful death damages data layer.
 *
 * Captures the three variables that actually move a wrongful death valuation:
 * (1) whether the state allows non-economic "loss of society" damages,
 * (2) whether punitive damages are available and capped,
 * (3) the filing deadline and comparative-fault rule.
 *
 * Sources: state wrongful death acts and damages-cap statutes
 * (e.g. CA CCP § 377.60, TX Civ. Prac. & Rem. Code ch. 71, FL Stat. § 768.21,
 * NY EPTL § 5-4.3, IL 740 ILCS 180, CO Rev. Stat. § 13-21-203).
 */

export type FaultRule = "pure-comparative" | "modified-50" | "modified-51" | "contributory";

export interface WrongfulDeathState {
  code: string;
  name: string;
  /** Statute of limitations in years from the date of death. */
  solYears: number;
  /** Are grief / loss-of-companionship damages recoverable by survivors? */
  nonEconomicAllowed: boolean;
  /** Statutory cap on non-economic damages ($) — null = uncapped. */
  nonEconomicCap: number | null;
  /** Punitive damages available in a wrongful death action? */
  punitiveAllowed: boolean;
  faultRule: FaultRule;
  /** Who may bring the claim. */
  claimants: string;
  note: string;
}

export const wrongfulDeathStates: WrongfulDeathState[] = [
  { code: "CA", name: "California", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: false, faultRule: "pure-comparative", claimants: "Spouse, domestic partner, children, or those entitled to intestate succession", note: "Punitive damages are not recoverable in a pure wrongful death claim, but a survival action (CCP § 377.34) can now recover the decedent's pre-death pain and suffering." },
  { code: "TX", name: "Texas", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "modified-51", claimants: "Surviving spouse, children, and parents", note: "Medical malpractice deaths are capped at $500,000 (indexed) for non-economic damages under Civ. Prac. & Rem. Code § 74.303." },
  { code: "FL", name: "Florida", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "modified-51", claimants: "Personal representative on behalf of survivors", note: "Fla. Stat. § 768.21 lists recoverable categories including loss of parental companionship for minor children. 2023 tort reform moved Florida to modified comparative fault." },
  { code: "NY", name: "New York", solYears: 2, nonEconomicAllowed: false, nonEconomicCap: null, punitiveAllowed: true, faultRule: "pure-comparative", claimants: "Personal representative for distributees", note: "EPTL § 5-4.3 limits recovery to pecuniary loss — grief is not compensable, which suppresses New York verdicts relative to neighboring states." },
  { code: "IL", name: "Illinois", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "modified-51", claimants: "Personal representative for spouse and next of kin", note: "740 ILCS 180 expressly allows grief, sorrow and mental suffering damages. Punitives became available in wrongful death claims in 2023." },
  { code: "PA", name: "Pennsylvania", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "modified-51", claimants: "Spouse, children, or parents; otherwise the personal representative", note: "Wrongful death and survival actions are typically filed together; the survival action captures the decedent's own lost earnings and pain." },
  { code: "OH", name: "Ohio", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "modified-51", claimants: "Personal representative for spouse, children, parents", note: "Ohio's general non-economic cap (R.C. 2315.18) does not apply to wrongful death claims." },
  { code: "GA", name: "Georgia", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "modified-50", claimants: "Spouse (and children); otherwise parents or the estate", note: "Georgia measures the 'full value of the life of the decedent' from the decedent's perspective, which supports larger awards." },
  { code: "NC", name: "North Carolina", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "contributory", claimants: "Personal representative", note: "Pure contributory negligence: even 1% fault by the decedent can bar recovery entirely. Punitives are capped at the greater of 3x compensatory or $250,000." },
  { code: "MI", name: "Michigan", solYears: 3, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: false, faultRule: "modified-51", claimants: "Personal representative", note: "No punitive damages, but 'exemplary' damages for the decedent's conscious pain and suffering are recoverable." },
  { code: "NJ", name: "New Jersey", solYears: 2, nonEconomicAllowed: false, nonEconomicCap: null, punitiveAllowed: true, faultRule: "modified-51", claimants: "Personal representative for heirs", note: "The Wrongful Death Act limits damages to pecuniary loss, including the monetary value of lost advice, guidance and companionship." },
  { code: "VA", name: "Virginia", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "contributory", claimants: "Statutory beneficiaries under § 8.01-53", note: "Sorrow and mental anguish are expressly compensable, but pure contributory negligence remains a complete bar. Medical malpractice is capped (~$2.65M and rising annually)." },
  { code: "WA", name: "Washington", solYears: 3, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: false, faultRule: "pure-comparative", claimants: "Personal representative for spouse, children, parents, siblings", note: "2019 reforms removed the requirement that parents and siblings be financially dependent." },
  { code: "AZ", name: "Arizona", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "pure-comparative", claimants: "Spouse, child, parent or guardian, or the estate", note: "The Arizona constitution forbids caps on damages, making it one of the more plaintiff-favorable jurisdictions." },
  { code: "MA", name: "Massachusetts", solYears: 3, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "modified-51", claimants: "Executor or administrator", note: "G.L. c. 229 § 2 sets a statutory minimum award of $5,000 and expressly allows punitive damages of at least $5,000 for gross negligence." },
  { code: "CO", name: "Colorado", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: 2_125_000, punitiveAllowed: true, faultRule: "modified-50", claimants: "Spouse in year one; spouse and/or children in year two", note: "Non-economic damages are capped unless felonious killing is proven; the cap is adjusted for inflation by the Secretary of State." },
  { code: "MD", name: "Maryland", solYears: 3, nonEconomicAllowed: true, nonEconomicCap: 950_000, punitiveAllowed: false, faultRule: "contributory", claimants: "Spouse, parent, child; otherwise dependent relatives", note: "Cts. & Jud. Proc. § 3-2A-09 caps non-economic damages with an annual $15,000 escalator; the cap rises ~25% when two or more beneficiaries claim." },
  { code: "TN", name: "Tennessee", solYears: 1, nonEconomicAllowed: true, nonEconomicCap: 750_000, punitiveAllowed: true, faultRule: "modified-50", claimants: "Surviving spouse, children, next of kin", note: "One-year deadline is among the shortest in the country. The non-economic cap rises to $1M for catastrophic loss." },
  { code: "MO", name: "Missouri", solYears: 3, nonEconomicAllowed: true, nonEconomicCap: null, punitiveAllowed: true, faultRule: "pure-comparative", claimants: "Class-based: spouse/children first, then parents, then siblings", note: "Medical malpractice deaths are subject to a separate inflation-adjusted cap (~$918,000)." },
  { code: "IN", name: "Indiana", solYears: 2, nonEconomicAllowed: true, nonEconomicCap: 300_000, punitiveAllowed: false, faultRule: "modified-51", claimants: "Personal representative", note: "Adult wrongful death claims (no spouse or dependents) are capped at $300,000 for loss of love and companionship." },
];

export function getWrongfulDeathState(code: string): WrongfulDeathState | undefined {
  return wrongfulDeathStates.find((s) => s.code === code);
}

/**
 * Present-value factor for a stream of future support payments.
 * Uses a real discount rate (nominal discount minus wage growth).
 */
export function presentValueFactor(years: number, discountRate = 0.03, growthRate = 0.02): number {
  const real = (1 + discountRate) / (1 + growthRate) - 1;
  if (Math.abs(real) < 0.0001) return years;
  return (1 - Math.pow(1 + real, -years)) / real;
}

/** Rough personal-consumption offset — the share of income the decedent spent on themselves. */
export function consumptionOffset(householdSize: number): number {
  if (householdSize <= 1) return 1;
  if (householdSize === 2) return 0.4;
  if (householdSize === 3) return 0.3;
  if (householdSize === 4) return 0.25;
  return 0.2;
}
