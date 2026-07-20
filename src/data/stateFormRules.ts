/**
 * Central state-specific rules for state-aware forms.
 * Priority coverage: CA, NY, TX, FL, IL, PA, OH.
 * All other states fall back to conservative defaults; the wizard and PDF
 * both surface a "verify with local counsel" note when defaults are used.
 */

export const US_STATES: { code: string; name: string }[] = [
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

export interface LeaseRules {
  maxSecurityDeposit: string; // e.g. "2 months' rent (unfurnished)" or "No statutory cap"
  depositReturnDays: number;
  lateFeeCap: string;
  mandatoryDisclosures: string[]; // short bullet strings inserted into the lease PDF
  earlyTerminationNote?: string;
}

export interface NoticeToVacateRules {
  monthToMonthDays: number;
  yearlyLeaseDays: number;
  fixedTermNote: string;
}

export interface PoaRules {
  notarizationRequired: boolean;
  witnessesRequired: number; // 0-2
  statutoryFormNote?: string;
}

export interface WillRules {
  witnessesRequired: number;
  selfProvingAffidavitAvailable: boolean;
  holographicRecognized: boolean;
}

export interface BillOfSaleRules {
  notarizationRequired: boolean;
  odometerDisclosureRequired: boolean;
}

export interface StateRules {
  code: string;
  name: string;
  lease: LeaseRules;
  noticeToVacate: NoticeToVacateRules;
  poa: PoaRules;
  will: WillRules;
  billOfSale: BillOfSaleRules;
  isDefault?: boolean;
}

const DEFAULT_LEASE: LeaseRules = {
  maxSecurityDeposit: "Varies — check state statute",
  depositReturnDays: 30,
  lateFeeCap: "Must be reasonable; verify state cap",
  mandatoryDisclosures: [
    "Lead-Based Paint Disclosure (federal, pre-1978 buildings)",
  ],
};
const DEFAULT_N2V: NoticeToVacateRules = {
  monthToMonthDays: 30,
  yearlyLeaseDays: 60,
  fixedTermNote: "For fixed-term leases, notice generally only ends month-to-month tenancies. Fixed terms expire on their own date unless the lease provides otherwise.",
};
const DEFAULT_POA: PoaRules = { notarizationRequired: true, witnessesRequired: 2 };
const DEFAULT_WILL: WillRules = { witnessesRequired: 2, selfProvingAffidavitAvailable: true, holographicRecognized: false };
const DEFAULT_BOS: BillOfSaleRules = { notarizationRequired: false, odometerDisclosureRequired: true };

const RULES: Record<string, Partial<StateRules>> = {
  CA: {
    lease: {
      maxSecurityDeposit: "1 month's rent (2 for landlords owning ≤2 properties/≤4 units) — Cal. Civ. Code §1950.5 (as amended 2024)",
      depositReturnDays: 21,
      lateFeeCap: "Must be a reasonable estimate of actual damages",
      mandatoryDisclosures: [
        "Lead-Based Paint Disclosure (pre-1978)",
        "Megan's Law database notice",
        "Bedbug information (Cal. Civ. Code §1954.603)",
        "Mold disclosure if known",
        "Proposition 65 warning if applicable",
        "Flood hazard disclosure (AB 1747, effective 2022)",
      ],
      earlyTerminationNote: "Victims of domestic violence may terminate early with 14 days' notice (Cal. Civ. Code §1946.7).",
    },
    noticeToVacate: { monthToMonthDays: 30, yearlyLeaseDays: 60, fixedTermNote: "AB 1482 rent cap and just-cause rules may apply for tenancies of 12+ months." },
    poa: { notarizationRequired: true, witnessesRequired: 2, statutoryFormNote: "California Uniform Statutory Form (Cal. Prob. Code §4401) is recommended." },
    will: { witnessesRequired: 2, selfProvingAffidavitAvailable: true, holographicRecognized: true },
    billOfSale: { notarizationRequired: false, odometerDisclosureRequired: true },
  },
  NY: {
    lease: {
      maxSecurityDeposit: "1 month's rent — N.Y. Gen. Oblig. Law §7-108",
      depositReturnDays: 14,
      lateFeeCap: "Capped at $50 or 5% of monthly rent, whichever is less",
      mandatoryDisclosures: [
        "Lead-Based Paint Disclosure (pre-1978)",
        "Window Guard notice (NYC)",
        "Sprinkler system notice",
        "Bedbug infestation history (NYC)",
        "Indoor allergen hazards (NYC Local Law 55)",
      ],
      earlyTerminationNote: "Domestic violence victims and servicemembers have statutory early-termination rights.",
    },
    noticeToVacate: { monthToMonthDays: 30, yearlyLeaseDays: 90, fixedTermNote: "For tenancies ≥2 years, 90 days' notice is required (RPL §226-c)." },
    poa: { notarizationRequired: true, witnessesRequired: 2, statutoryFormNote: "Use the NY Statutory Short Form (GOL §5-1513, as amended 2021)." },
    will: { witnessesRequired: 2, selfProvingAffidavitAvailable: true, holographicRecognized: false },
    billOfSale: { notarizationRequired: false, odometerDisclosureRequired: true },
  },
  TX: {
    lease: {
      maxSecurityDeposit: "No statutory cap",
      depositReturnDays: 30,
      lateFeeCap: "Must be reasonable (Tex. Prop. Code §92.019) — often 12% of rent for ≤4 units, 10% for larger properties",
      mandatoryDisclosures: [
        "Lead-Based Paint Disclosure (pre-1978)",
        "Parking / towing policy (Tex. Prop. Code §92.0131)",
        "Special conditions to cancel agreement (§92.056 repair notice)",
        "Tenant remedies for repair (§92.056)",
      ],
    },
    noticeToVacate: { monthToMonthDays: 30, yearlyLeaseDays: 30, fixedTermNote: "Texas defaults to 30 days for month-to-month; fixed terms end on their expiration date." },
    poa: { notarizationRequired: true, witnessesRequired: 0, statutoryFormNote: "Texas Statutory Durable POA form recommended (Tex. Est. Code §752.051)." },
    will: { witnessesRequired: 2, selfProvingAffidavitAvailable: true, holographicRecognized: true },
    billOfSale: { notarizationRequired: false, odometerDisclosureRequired: true },
  },
  FL: {
    lease: {
      maxSecurityDeposit: "No statutory cap",
      depositReturnDays: 15,
      lateFeeCap: "Must be reasonable — no statutory cap",
      mandatoryDisclosures: [
        "Lead-Based Paint Disclosure (pre-1978)",
        "Radon Gas Disclosure (Fla. Stat. §404.056)",
        "Security Deposit disclosure (§83.49 — location & interest)",
        "Landlord identity & address (§83.50)",
        "Fire protection notice for buildings > 3 stories",
      ],
    },
    noticeToVacate: { monthToMonthDays: 30, yearlyLeaseDays: 60, fixedTermNote: "Florida requires 30 days for month-to-month (§83.57)." },
    poa: { notarizationRequired: true, witnessesRequired: 2, statutoryFormNote: "Fla. Stat. §709.2105 requires notarization AND two witnesses for a durable POA." },
    will: { witnessesRequired: 2, selfProvingAffidavitAvailable: true, holographicRecognized: false },
    billOfSale: { notarizationRequired: false, odometerDisclosureRequired: true },
  },
  IL: {
    lease: {
      maxSecurityDeposit: "No statutory statewide cap; Chicago RLTO limits certain fees",
      depositReturnDays: 30,
      lateFeeCap: "Chicago RLTO: $10 for first $500 + 5% of excess over $500; other jurisdictions vary",
      mandatoryDisclosures: [
        "Lead-Based Paint Disclosure (pre-1978)",
        "Radon disclosure (Illinois Radon Awareness Act)",
        "Chicago RLTO summary attached (Chicago properties)",
        "Utility disclosure for shared-meter buildings",
      ],
    },
    noticeToVacate: { monthToMonthDays: 30, yearlyLeaseDays: 60, fixedTermNote: "Chicago RLTO adds additional notice requirements for rent increases." },
    poa: { notarizationRequired: true, witnessesRequired: 1, statutoryFormNote: "Illinois Statutory Short Form Power of Attorney (755 ILCS 45/3-3) recommended." },
    will: { witnessesRequired: 2, selfProvingAffidavitAvailable: true, holographicRecognized: false },
    billOfSale: { notarizationRequired: false, odometerDisclosureRequired: true },
  },
  PA: {
    lease: {
      maxSecurityDeposit: "2 months' rent (first year); 1 month's rent thereafter — 68 P.S. §250.511a",
      depositReturnDays: 30,
      lateFeeCap: "Must be reasonable — no statutory cap",
      mandatoryDisclosures: [
        "Lead-Based Paint Disclosure (pre-1978)",
        "Notice of prior flooding (if known)",
        "Utility responsibility",
      ],
    },
    noticeToVacate: { monthToMonthDays: 15, yearlyLeaseDays: 30, fixedTermNote: "PA defaults are shorter than most states — 15 days for month-to-month under 68 P.S. §250.501." },
    poa: { notarizationRequired: true, witnessesRequired: 2, statutoryFormNote: "PA requires notice-and-acknowledgment language (20 Pa.C.S. §5601)." },
    will: { witnessesRequired: 2, selfProvingAffidavitAvailable: true, holographicRecognized: false },
    billOfSale: { notarizationRequired: true, odometerDisclosureRequired: true },
  },
  OH: {
    lease: {
      maxSecurityDeposit: "No statutory cap; deposits over $50 or 1 month's rent (whichever is greater) held >6 months must earn 5% interest — R.C. §5321.16",
      depositReturnDays: 30,
      lateFeeCap: "Must be reasonable — no statutory cap",
      mandatoryDisclosures: [
        "Lead-Based Paint Disclosure (pre-1978)",
        "Landlord identity & address (R.C. §5321.18)",
      ],
    },
    noticeToVacate: { monthToMonthDays: 30, yearlyLeaseDays: 30, fixedTermNote: "Ohio requires 30 days for month-to-month (R.C. §5321.17)." },
    poa: { notarizationRequired: true, witnessesRequired: 0, statutoryFormNote: "Ohio adopted the Uniform Power of Attorney Act (R.C. §1337.21 et seq.)." },
    will: { witnessesRequired: 2, selfProvingAffidavitAvailable: true, holographicRecognized: false },
    billOfSale: { notarizationRequired: false, odometerDisclosureRequired: true },
  },
};

export function getStateRules(code?: string | null): StateRules {
  const stateEntry = US_STATES.find((s) => s.code === code);
  if (!stateEntry) {
    return {
      code: "US",
      name: "United States (general)",
      lease: DEFAULT_LEASE,
      noticeToVacate: DEFAULT_N2V,
      poa: DEFAULT_POA,
      will: DEFAULT_WILL,
      billOfSale: DEFAULT_BOS,
      isDefault: true,
    };
  }
  const override = RULES[stateEntry.code];
  const isCovered = Boolean(override);
  return {
    code: stateEntry.code,
    name: stateEntry.name,
    lease: override?.lease ?? DEFAULT_LEASE,
    noticeToVacate: override?.noticeToVacate ?? DEFAULT_N2V,
    poa: override?.poa ?? DEFAULT_POA,
    will: override?.will ?? DEFAULT_WILL,
    billOfSale: override?.billOfSale ?? DEFAULT_BOS,
    isDefault: !isCovered,
  };
}

/** Priority state codes we cover in-depth. */
export const PRIORITY_STATES = ["CA", "NY", "TX", "FL", "IL", "PA", "OH"] as const;
