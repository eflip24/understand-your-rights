/**
 * State estate-tax and inheritance-tax rules used by the Estate & Inheritance
 * Tax Estimator. Figures reflect published 2025–2026 thresholds; state
 * legislatures adjust exemptions annually, so treat output as an estimate.
 */

export interface EstateTaxState {
  code: string;
  name: string;
  /** State estate tax exemption in dollars; 0 = no state estate tax. */
  estateExemption: number;
  /** Approximate top marginal state estate tax rate (as a decimal). */
  estateTopRate: number;
  /** "cliff" = whole estate taxed once over the threshold (e.g. NY 105% cliff). */
  estateCliff?: boolean;
  /** Inheritance tax on beneficiaries, by relationship. 0 = none. */
  inheritance?: {
    spouse: number;
    child: number;
    sibling: number;
    other: number;
    note: string;
  };
}

export const FEDERAL_ESTATE_EXEMPTION_2026 = 15_000_000;
export const FEDERAL_ESTATE_TOP_RATE = 0.4;

export const estateTaxStates: EstateTaxState[] = [
  { code: "CT", name: "Connecticut", estateExemption: 13_990_000, estateTopRate: 0.12 },
  { code: "DC", name: "District of Columbia", estateExemption: 4_873_200, estateTopRate: 0.16 },
  { code: "HI", name: "Hawaii", estateExemption: 5_490_000, estateTopRate: 0.2 },
  { code: "IL", name: "Illinois", estateExemption: 4_000_000, estateTopRate: 0.16 },
  { code: "ME", name: "Maine", estateExemption: 7_000_000, estateTopRate: 0.12 },
  { code: "MD", name: "Maryland", estateExemption: 5_000_000, estateTopRate: 0.16, inheritance: { spouse: 0, child: 0, sibling: 0.1, other: 0.1, note: "10% inheritance tax on collateral heirs; spouses, children, parents and siblings are exempt." } },
  { code: "MA", name: "Massachusetts", estateExemption: 2_000_000, estateTopRate: 0.16 },
  { code: "MN", name: "Minnesota", estateExemption: 3_000_000, estateTopRate: 0.16 },
  { code: "NY", name: "New York", estateExemption: 7_160_000, estateTopRate: 0.16, estateCliff: true },
  { code: "OR", name: "Oregon", estateExemption: 1_000_000, estateTopRate: 0.16 },
  { code: "RI", name: "Rhode Island", estateExemption: 1_802_431, estateTopRate: 0.16 },
  { code: "VT", name: "Vermont", estateExemption: 5_000_000, estateTopRate: 0.16 },
  { code: "WA", name: "Washington", estateExemption: 3_000_000, estateTopRate: 0.35 },
  { code: "IA", name: "Iowa", estateExemption: 0, estateTopRate: 0 },
  { code: "KY", name: "Kentucky", estateExemption: 0, estateTopRate: 0, inheritance: { spouse: 0, child: 0, sibling: 0.16, other: 0.16, note: "Class A heirs (spouse, children, parents, siblings) are exempt; Class B up to 16%, Class C up to 16%." } },
  { code: "NE", name: "Nebraska", estateExemption: 0, estateTopRate: 0, inheritance: { spouse: 0, child: 0.01, sibling: 0.11, other: 0.15, note: "County-level inheritance tax: 1% for immediate relatives over $100,000, 11% for remote relatives, 15% for others." } },
  { code: "NJ", name: "New Jersey", estateExemption: 0, estateTopRate: 0, inheritance: { spouse: 0, child: 0, sibling: 0.16, other: 0.16, note: "Class A (spouse, children, grandchildren, parents) exempt; siblings and others taxed 11–16%." } },
  { code: "PA", name: "Pennsylvania", estateExemption: 0, estateTopRate: 0, inheritance: { spouse: 0, child: 0.045, sibling: 0.12, other: 0.15, note: "0% spouse, 4.5% lineal descendants, 12% siblings, 15% all others — payable on the full share with no exemption." } },
];

/** Every other US jurisdiction imposes neither an estate nor an inheritance tax. */
export const NO_STATE_DEATH_TAX_NOTE =
  "This state imposes no estate tax and no inheritance tax. Only the federal estate tax can apply.";

export function getEstateTaxState(code: string): EstateTaxState | undefined {
  return estateTaxStates.find((s) => s.code === code);
}

export const ALL_STATE_CODES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];
