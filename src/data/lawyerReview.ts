/**
 * Lawyer-review marketplace config. LegallySpoken is a directory + preparation
 * tool, never a law firm: clients pay lawyers directly, lawyers pay a flat
 * listing fee (no fee sharing — Solicitors (Amendment) Act 1994 s.71; ABA Model Rule 5.4 / 7.2).
 */
export type ReviewJurisdiction = "us" | "ie";

export const REVIEW_JURISDICTIONS: Record<ReviewJurisdiction, {
  label: string;
  lawyerWord: string;
  currency: "usd" | "eur";
  symbol: string;
  credentialLabel: string;
  regionLabel: string;
  path: string;
  typicalPrice: string;
  facts: { text: string; source: string; url: string }[];
}> = {
  us: {
    label: "United States",
    lawyerWord: "lawyer",
    currency: "usd",
    symbol: "$",
    credentialLabel: "State bar number",
    regionLabel: "State(s) you are licensed in",
    path: "/lawyer-review/severance",
    typicalPrice: "$150–$500 fixed fee",
    facts: [
      { text: "If you are 40 or older, federal law gives you at least 21 days to consider a severance release and 7 days to revoke it after signing (45 days for group layoffs).", source: "EEOC – Understanding Waivers of Discrimination Claims", url: "https://www.eeoc.gov/laws/guidance/qa-understanding-waivers-discrimination-claims-employee-severance-agreements" },
      { text: "The NLRB has ruled that broad confidentiality and non-disparagement clauses in severance agreements can be unlawful for many non-supervisory employees (McLaren Macomb, 2023).", source: "NLRB", url: "https://www.nlrb.gov/news-outreach/news-story/board-rules-that-employers-may-not-offer-severance-agreements-with" },
    ],
  },
  ie: {
    label: "Ireland",
    lawyerWord: "solicitor",
    currency: "eur",
    symbol: "€",
    credentialLabel: "Law Society roll number / practising certificate number",
    regionLabel: "County",
    path: "/lawyer-review/severance-ireland",
    typicalPrice: "€150–€500 fixed fee",
    facts: [
      { text: "Statutory redundancy is two weeks' pay per year of service plus one extra week, with weekly pay capped at €600, after 104 weeks' continuous service.", source: "Citizens Information", url: "https://www.citizensinformation.ie/en/employment/unemployment-and-redundancy/redundancy/redundancy-payments/" },
      { text: "Disputes about redundancy or dismissal go to the Workplace Relations Commission (WRC).", source: "Workplace Relations Commission", url: "https://www.workplacerelations.ie/en/what_you_should_know/ending%20the%20employment%20relationship/redundancy/" },
      { text: "Statutory redundancy is tax-free; ex-gratia top-ups may qualify for separate Revenue reliefs, so how payments are labelled matters.", source: "Citizens Information", url: "https://www.citizensinformation.ie/en/employment/unemployment-and-redundancy/redundancy/redundancy-payments/" },
    ],
  },
};

export const IE_REDUNDANCY_WEEKLY_CAP = 600;

/** Irish statutory redundancy: 2 weeks per year + 1 bonus week, weekly pay capped at €600, needs 2+ years. */
export function irishStatutoryRedundancy(weeklyPay: number, yearsService: number): number {
  if (yearsService < 2 || weeklyPay <= 0) return 0;
  const pay = Math.min(weeklyPay, IE_REDUNDANCY_WEEKLY_CAP);
  return Math.round((yearsService * 2 + 1) * pay * 100) / 100;
}

export const REVIEW_STATUS_STEPS = [
  { key: "received", label: "Received" },
  { key: "ai_ready", label: "AI summary ready" },
  { key: "with_lawyer", label: "With your lawyer" },
  { key: "delivered", label: "Delivered" },
] as const;

export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat(currency === "eur" ? "en-IE" : "en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}
