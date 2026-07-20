/**
 * Eviction-notice timing rules per state, keyed by USPS abbreviation.
 * Notice periods reflect general statutory defaults — local ordinances,
 * rent control, and lease terms can extend them. The PDF and wizard both
 * surface a "verify with counsel" callout.
 *
 * Reason keys mirror the wizard radio options.
 */
export type EvictionReason =
  | "nonpayment"
  | "curableViolation"
  | "nonCurable"
  | "endOfTenancy"
  | "illegal";

export interface EvictionRuleEntry {
  days: number;
  unit: "calendar" | "business";
  noticeName: string;
}

export interface EvictionStateRule {
  nonpayment: EvictionRuleEntry;
  curableViolation: EvictionRuleEntry;
  nonCurable: EvictionRuleEntry;
  endOfTenancy: EvictionRuleEntry;
  illegal: EvictionRuleEntry;
  statuteRef?: string;
}

const DEFAULT: EvictionStateRule = {
  nonpayment: { days: 5, unit: "calendar", noticeName: "Notice to Pay Rent or Quit" },
  curableViolation: { days: 10, unit: "calendar", noticeName: "Notice to Cure or Quit" },
  nonCurable: { days: 7, unit: "calendar", noticeName: "Notice to Quit" },
  endOfTenancy: { days: 30, unit: "calendar", noticeName: "Notice of Termination of Tenancy" },
  illegal: { days: 3, unit: "calendar", noticeName: "Unconditional Notice to Quit" },
  statuteRef: "State landlord-tenant statute",
};

export const STATE_EVICTION_RULES: Record<string, EvictionStateRule> = {
  CA: {
    nonpayment: { days: 3, unit: "business", noticeName: "3-Day Notice to Pay Rent or Quit" },
    curableViolation: { days: 3, unit: "business", noticeName: "3-Day Notice to Perform Covenant or Quit" },
    nonCurable: { days: 3, unit: "business", noticeName: "3-Day Notice to Quit" },
    endOfTenancy: { days: 30, unit: "calendar", noticeName: "30/60-Day Notice of Termination" },
    illegal: { days: 3, unit: "business", noticeName: "3-Day Unconditional Notice to Quit" },
    statuteRef: "Cal. Code Civ. Proc. § 1161",
  },
  NY: {
    nonpayment: { days: 14, unit: "calendar", noticeName: "14-Day Rent Demand" },
    curableViolation: { days: 10, unit: "calendar", noticeName: "10-Day Notice to Cure" },
    nonCurable: { days: 10, unit: "calendar", noticeName: "10-Day Notice of Termination" },
    endOfTenancy: { days: 30, unit: "calendar", noticeName: "30/60/90-Day Termination Notice" },
    illegal: { days: 10, unit: "calendar", noticeName: "10-Day Notice to Quit" },
    statuteRef: "N.Y. Real Prop. Acts. Law §§ 711, 753",
  },
  TX: {
    nonpayment: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Vacate" },
    curableViolation: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Vacate" },
    nonCurable: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Vacate" },
    endOfTenancy: { days: 30, unit: "calendar", noticeName: "30-Day Notice of Non-Renewal" },
    illegal: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Vacate" },
    statuteRef: "Tex. Prop. Code § 24.005",
  },
  FL: {
    nonpayment: { days: 3, unit: "business", noticeName: "3-Day Notice to Pay Rent or Quit" },
    curableViolation: { days: 7, unit: "calendar", noticeName: "7-Day Notice to Cure" },
    nonCurable: { days: 7, unit: "calendar", noticeName: "7-Day Unconditional Notice to Quit" },
    endOfTenancy: { days: 15, unit: "calendar", noticeName: "15-Day Notice of Termination" },
    illegal: { days: 7, unit: "calendar", noticeName: "7-Day Unconditional Notice to Quit" },
    statuteRef: "Fla. Stat. §§ 83.56, 83.57",
  },
  IL: {
    nonpayment: { days: 5, unit: "calendar", noticeName: "5-Day Notice to Pay Rent" },
    curableViolation: { days: 10, unit: "calendar", noticeName: "10-Day Notice of Lease Violation" },
    nonCurable: { days: 10, unit: "calendar", noticeName: "10-Day Notice to Quit" },
    endOfTenancy: { days: 30, unit: "calendar", noticeName: "30-Day Termination Notice" },
    illegal: { days: 5, unit: "calendar", noticeName: "5-Day Notice to Quit" },
    statuteRef: "735 ILCS 5/9-209, 5/9-210",
  },
  WA: {
    nonpayment: { days: 14, unit: "calendar", noticeName: "14-Day Notice to Pay or Vacate" },
    curableViolation: { days: 10, unit: "calendar", noticeName: "10-Day Notice to Comply or Vacate" },
    nonCurable: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Quit (nuisance/waste)" },
    endOfTenancy: { days: 60, unit: "calendar", noticeName: "60-Day Just-Cause Termination Notice" },
    illegal: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Quit" },
    statuteRef: "RCW 59.12.030, 59.18.650",
  },
  MA: {
    nonpayment: { days: 14, unit: "calendar", noticeName: "14-Day Notice to Quit for Nonpayment" },
    curableViolation: { days: 7, unit: "calendar", noticeName: "Notice to Cure (per lease)" },
    nonCurable: { days: 7, unit: "calendar", noticeName: "7-Day Notice to Quit" },
    endOfTenancy: { days: 30, unit: "calendar", noticeName: "30-Day / Full Rental Period Notice" },
    illegal: { days: 7, unit: "calendar", noticeName: "7-Day Notice to Quit" },
    statuteRef: "Mass. Gen. Laws ch. 186, § 11–12",
  },
  GA: {
    nonpayment: { days: 0, unit: "calendar", noticeName: "Immediate Demand for Possession" },
    curableViolation: { days: 0, unit: "calendar", noticeName: "Demand for Possession (per lease)" },
    nonCurable: { days: 0, unit: "calendar", noticeName: "Demand for Possession" },
    endOfTenancy: { days: 60, unit: "calendar", noticeName: "60-Day Notice of Termination" },
    illegal: { days: 0, unit: "calendar", noticeName: "Immediate Demand for Possession" },
    statuteRef: "O.C.G.A. §§ 44-7-50, 44-7-7",
  },
  PA: {
    nonpayment: { days: 10, unit: "calendar", noticeName: "10-Day Notice to Quit for Nonpayment" },
    curableViolation: { days: 15, unit: "calendar", noticeName: "15-Day Notice to Quit (≤1 yr lease)" },
    nonCurable: { days: 15, unit: "calendar", noticeName: "15-Day Notice to Quit" },
    endOfTenancy: { days: 30, unit: "calendar", noticeName: "30-Day Notice of Termination (>1 yr lease)" },
    illegal: { days: 10, unit: "calendar", noticeName: "10-Day Notice to Quit" },
    statuteRef: "68 Pa. Stat. § 250.501",
  },
  OH: {
    nonpayment: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Leave" },
    curableViolation: { days: 30, unit: "calendar", noticeName: "30-Day Notice to Remedy" },
    nonCurable: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Leave" },
    endOfTenancy: { days: 30, unit: "calendar", noticeName: "30-Day Termination Notice" },
    illegal: { days: 3, unit: "calendar", noticeName: "3-Day Notice to Leave" },
    statuteRef: "Ohio Rev. Code §§ 1923.04, 5321.17",
  },
};

export function getEvictionRule(stateAbbrev: string): EvictionStateRule {
  return STATE_EVICTION_RULES[stateAbbrev?.toUpperCase()] ?? DEFAULT;
}

export function getEvictionRuleEntry(
  stateAbbrev: string,
  reason: EvictionReason
): EvictionRuleEntry {
  return getEvictionRule(stateAbbrev)[reason];
}

/**
 * Adds calendar or business days to a base date and returns an ISO date
 * string (YYYY-MM-DD). Business days skip Sat/Sun (holidays not tracked).
 */
export function computeVacateBy(
  noticeDateIso: string,
  entry: EvictionRuleEntry
): string {
  if (!noticeDateIso) return "";
  const base = new Date(noticeDateIso);
  if (Number.isNaN(base.getTime())) return "";
  const out = new Date(base);
  let remaining = entry.days;
  if (entry.unit === "calendar") {
    out.setDate(out.getDate() + remaining);
  } else {
    while (remaining > 0) {
      out.setDate(out.getDate() + 1);
      const dow = out.getDay();
      if (dow !== 0 && dow !== 6) remaining -= 1;
    }
  }
  return out.toISOString().slice(0, 10);
}

export const STATES_WITH_RULES = Object.keys(STATE_EVICTION_RULES);
