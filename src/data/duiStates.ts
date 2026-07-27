/**
 * Phase 8 — DUI first-offense state fan-out.
 *
 * One record per US jurisdiction (50 states + District of Columbia) powering
 * /dui-first-offense-guide and /dui-first-offense-guide/:state.
 *
 * Figures are first-offense, non-injury, adult-driver baselines and change
 * frequently — every page carries the site legal disclaimer.
 */

export interface DuiState {
  slug: string;
  name: string;
  abbr: string;
  /** Per-se BAC limit for adult non-commercial drivers. */
  bac: string;
  /** Statutory offense name used locally (DUI / DWI / OWI / OUI / DUII). */
  term: string;
  jail: string;
  fine: string;
  suspension: string;
  /** Ignition interlock device requirement on a first offense. */
  iid: string;
  /** Prior-offense lookback / washout period. */
  lookback: string;
  sr22: string;
  statute: string;
}

export const duiStates: DuiState[] = [
  { slug: "alabama", name: "Alabama", abbr: "AL", bac: "0.08%", term: "DUI", jail: "Up to 1 year", fine: "$600–$2,100", suspension: "90 days", iid: "Required if BAC ≥ 0.15% or to avoid suspension", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Ala. Code § 32-5A-191" },
  { slug: "alaska", name: "Alaska", abbr: "AK", bac: "0.08%", term: "DUI", jail: "72 hours mandatory minimum", fine: "$1,500 minimum", suspension: "90 days", iid: "Required, 6 months", lookback: "15 years", sr22: "Yes (SR-22, 5 years)", statute: "Alaska Stat. § 28.35.030" },
  { slug: "arizona", name: "Arizona", abbr: "AZ", bac: "0.08%", term: "DUI", jail: "10 days (9 suspendable with IID)", fine: "$1,250+ plus assessments", suspension: "90 days", iid: "Required, 12 months", lookback: "7 years", sr22: "Yes (SR-22, 3 years)", statute: "A.R.S. § 28-1381" },
  { slug: "arkansas", name: "Arkansas", abbr: "AR", bac: "0.08%", term: "DWI", jail: "24 hours–1 year", fine: "$150–$1,000", suspension: "6 months", iid: "Required for restricted driving", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Ark. Code § 5-65-103" },
  { slug: "california", name: "California", abbr: "CA", bac: "0.08%", term: "DUI", jail: "48 hours–6 months", fine: "$390–$1,000 plus penalty assessments (~$2,000)", suspension: "4 months (APS) / 6 months (court)", iid: "Required 6 months in most counties", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Cal. Veh. Code § 23152" },
  { slug: "colorado", name: "Colorado", abbr: "CO", bac: "0.08% (0.05% DWAI)", term: "DUI", jail: "5 days–1 year", fine: "$600–$1,000", suspension: "9 months", iid: "Required 8 months for early reinstatement", lookback: "Lifetime for felony counting", sr22: "Yes (SR-22, 3 years)", statute: "C.R.S. § 42-4-1301" },
  { slug: "connecticut", name: "Connecticut", abbr: "CT", bac: "0.08%", term: "DUI/OMVUI", jail: "48 hours mandatory–6 months", fine: "$500–$1,000", suspension: "45 days", iid: "Required, 6 months", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Conn. Gen. Stat. § 14-227a" },
  { slug: "delaware", name: "Delaware", abbr: "DE", bac: "0.08%", term: "DUI", jail: "Up to 12 months (often suspended)", fine: "$500–$1,500", suspension: "12–24 months", iid: "Required for IID license program", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "21 Del. C. § 4177" },
  { slug: "district-of-columbia", name: "District of Columbia", abbr: "DC", bac: "0.08%", term: "DUI", jail: "Up to 180 days", fine: "Up to $1,000", suspension: "6 months", iid: "Discretionary on a first offense", lookback: "15 years", sr22: "Yes if reinstating", statute: "D.C. Code § 50-2206.11" },
  { slug: "florida", name: "Florida", abbr: "FL", bac: "0.08%", term: "DUI", jail: "Up to 6 months", fine: "$500–$1,000", suspension: "180 days–1 year", iid: "Required 6 months if BAC ≥ 0.15%", lookback: "Lifetime (5 yrs for enhancement)", sr22: "Yes (FR-44, 3 years)", statute: "Fla. Stat. § 316.193" },
  { slug: "georgia", name: "Georgia", abbr: "GA", bac: "0.08%", term: "DUI", jail: "24 hours–12 months", fine: "$300–$1,000", suspension: "12 months (limited permit possible)", iid: "Optional in lieu of hard suspension", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "O.C.G.A. § 40-6-391" },
  { slug: "hawaii", name: "Hawaii", abbr: "HI", bac: "0.08%", term: "OVUII", jail: "48 hours or community service", fine: "$250–$1,000", suspension: "1 year with IID", iid: "Required, 1 year", lookback: "10 years", sr22: "Not required", statute: "HRS § 291E-61" },
  { slug: "idaho", name: "Idaho", abbr: "ID", bac: "0.08%", term: "DUI", jail: "Up to 6 months", fine: "Up to $1,000", suspension: "90–180 days", iid: "Discretionary (mandatory if BAC ≥ 0.20%)", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Idaho Code § 18-8004" },
  { slug: "illinois", name: "Illinois", abbr: "IL", bac: "0.08%", term: "DUI", jail: "Up to 1 year", fine: "Up to $2,500", suspension: "6 months (statutory summary suspension)", iid: "Required with MDDP permit", lookback: "Lifetime", sr22: "Yes (SR-22, 3 years)", statute: "625 ILCS 5/11-501" },
  { slug: "indiana", name: "Indiana", abbr: "IN", bac: "0.08%", term: "OWI", jail: "Up to 60 days (1 yr if BAC ≥ 0.15%)", fine: "Up to $500–$5,000", suspension: "90 days–2 years", iid: "Discretionary for specialized driving privileges", lookback: "7 years", sr22: "Yes (SR-22, 3 years)", statute: "Ind. Code § 9-30-5-1" },
  { slug: "iowa", name: "Iowa", abbr: "IA", bac: "0.08%", term: "OWI", jail: "48 hours–1 year", fine: "$1,250", suspension: "180 days (1 yr on refusal)", iid: "Required for temporary restricted license", lookback: "12 years", sr22: "Yes (SR-22, 2 years)", statute: "Iowa Code § 321J.2" },
  { slug: "kansas", name: "Kansas", abbr: "KS", bac: "0.08%", term: "DUI", jail: "48 hours–6 months", fine: "$750–$1,000", suspension: "30 days + 180 days restricted", iid: "Required, 6 months", lookback: "Lifetime (10 yrs for some counts)", sr22: "Yes (SR-22, 1 year)", statute: "K.S.A. § 8-1567" },
  { slug: "kentucky", name: "Kentucky", abbr: "KY", bac: "0.08%", term: "DUI", jail: "48 hours–30 days", fine: "$200–$500", suspension: "30–120 days", iid: "Available in lieu of suspension", lookback: "10 years", sr22: "Not required", statute: "KRS § 189A.010" },
  { slug: "louisiana", name: "Louisiana", abbr: "LA", bac: "0.08%", term: "DWI", jail: "10 days–6 months", fine: "$300–$1,000", suspension: "90 days", iid: "Required if BAC ≥ 0.15%", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "La. R.S. 14:98" },
  { slug: "maine", name: "Maine", abbr: "ME", bac: "0.08%", term: "OUI", jail: "None (96 hrs if BAC ≥ 0.15% or refusal)", fine: "$500 minimum", suspension: "150 days", iid: "Optional for restoration", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "29-A M.R.S. § 2411" },
  { slug: "maryland", name: "Maryland", abbr: "MD", bac: "0.08%", term: "DUI", jail: "Up to 1 year", fine: "Up to $1,000", suspension: "6 months (or IID program)", iid: "Required if BAC ≥ 0.15% or refusal", lookback: "Lifetime (points 2 yrs)", sr22: "Not required", statute: "Md. Transp. Code § 21-902" },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA", bac: "0.08%", term: "OUI", jail: "Up to 2.5 years (usually CWOF/probation)", fine: "$500–$5,000", suspension: "1 year (45–90 day hardship)", iid: "Not on first offense", lookback: "Lifetime", sr22: "Not required", statute: "M.G.L. c. 90 § 24" },
  { slug: "michigan", name: "Michigan", abbr: "MI", bac: "0.08% (0.17% super drunk)", term: "OWI", jail: "Up to 93 days", fine: "$100–$500", suspension: "30 days + 150 days restricted", iid: "Required for super-drunk offenses", lookback: "7 years", sr22: "Not required (driver responsibility fee)", statute: "MCL § 257.625" },
  { slug: "minnesota", name: "Minnesota", abbr: "MN", bac: "0.08%", term: "DWI", jail: "Up to 90 days", fine: "Up to $1,000", suspension: "90 days", iid: "Required if BAC ≥ 0.16% or refusal", lookback: "10 years", sr22: "Yes (SR-22 for some)", statute: "Minn. Stat. § 169A.20" },
  { slug: "mississippi", name: "Mississippi", abbr: "MS", bac: "0.08%", term: "DUI", jail: "Up to 48 hours", fine: "Up to $1,000", suspension: "120 days or IID", iid: "Required for interlock-restricted license", lookback: "5 years", sr22: "Not required", statute: "Miss. Code § 63-11-30" },
  { slug: "missouri", name: "Missouri", abbr: "MO", bac: "0.08%", term: "DWI", jail: "Up to 6 months", fine: "Up to $1,000", suspension: "90 days", iid: "Required for reinstatement in most cases", lookback: "5–10 years", sr22: "Yes (SR-22, 2 years)", statute: "Mo. Rev. Stat. § 577.010" },
  { slug: "montana", name: "Montana", abbr: "MT", bac: "0.08%", term: "DUI", jail: "24 hours–6 months", fine: "$600–$1,000", suspension: "6 months", iid: "Discretionary", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Mont. Code § 61-8-1002" },
  { slug: "nebraska", name: "Nebraska", abbr: "NE", bac: "0.08%", term: "DUI", jail: "7 days–60 days (often probation)", fine: "$500", suspension: "6 months", iid: "Required for ignition interlock permit", lookback: "15 years", sr22: "Yes (SR-22, 3 years)", statute: "Neb. Rev. Stat. § 60-6,196" },
  { slug: "nevada", name: "Nevada", abbr: "NV", bac: "0.08%", term: "DUI", jail: "2 days–6 months (or community service)", fine: "$400–$1,000", suspension: "185 days", iid: "Required, 185 days", lookback: "7 years", sr22: "Yes (SR-22, 3 years)", statute: "NRS § 484C.110" },
  { slug: "new-hampshire", name: "New Hampshire", abbr: "NH", bac: "0.08%", term: "DWI", jail: "None standard (aggravated: 17 days)", fine: "$500–$1,200", suspension: "9 months–2 years", iid: "Discretionary", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "RSA § 265-A:2" },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ", bac: "0.08%", term: "DWI", jail: "Up to 30 days", fine: "$250–$400 plus surcharges", suspension: "None for BAC < 0.15% with IID", iid: "Required, 3 months (BAC 0.08–0.10%)", lookback: "10 years", sr22: "Not required (NJ surcharge)", statute: "N.J.S.A. 39:4-50" },
  { slug: "new-mexico", name: "New Mexico", abbr: "NM", bac: "0.08%", term: "DWI", jail: "Up to 90 days", fine: "Up to $500", suspension: "6 months–1 year", iid: "Required, 1 year", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "NMSA § 66-8-102" },
  { slug: "new-york", name: "New York", abbr: "NY", bac: "0.08% (0.05% DWAI)", term: "DWI", jail: "Up to 1 year", fine: "$500–$1,000", suspension: "6 months revocation", iid: "Required, 12 months", lookback: "10 years", sr22: "Not required (NY assessment)", statute: "N.Y. Veh. & Traf. Law § 1192" },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC", bac: "0.08%", term: "DWI", jail: "24 hours–2 years (level dependent)", fine: "$200–$4,000", suspension: "1 year", iid: "Required if BAC ≥ 0.15%", lookback: "7 years", sr22: "Yes (DL-123 proof)", statute: "N.C.G.S. § 20-138.1" },
  { slug: "north-dakota", name: "North Dakota", abbr: "ND", bac: "0.08%", term: "DUI", jail: "Up to 30 days (2 days if BAC ≥ 0.16%)", fine: "$500–$750", suspension: "91–180 days", iid: "Required for 24/7 sobriety participants", lookback: "7 years", sr22: "Yes (SR-22, 1 year)", statute: "N.D.C.C. § 39-08-01" },
  { slug: "ohio", name: "Ohio", abbr: "OH", bac: "0.08%", term: "OVI", jail: "3 days–6 months", fine: "$375–$1,075", suspension: "1–3 years", iid: "Discretionary (mandatory for high-test)", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "O.R.C. § 4511.19" },
  { slug: "oklahoma", name: "Oklahoma", abbr: "OK", bac: "0.08%", term: "DUI", jail: "10 days–1 year", fine: "Up to $1,000", suspension: "180 days", iid: "Required for IDA program", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "47 O.S. § 11-902" },
  { slug: "oregon", name: "Oregon", abbr: "OR", bac: "0.08%", term: "DUII", jail: "48 hours or 80 hrs community service", fine: "$1,000 minimum", suspension: "1 year", iid: "Required, 1 year after reinstatement", lookback: "Lifetime for diversion", sr22: "Yes (SR-22, 3 years)", statute: "ORS § 813.010" },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", bac: "0.08%", term: "DUI", jail: "None (ARD likely) up to 6 months", fine: "$300+", suspension: "None at general impairment tier", iid: "Required for high-BAC tiers", lookback: "10 years", sr22: "Not required", statute: "75 Pa.C.S. § 3802" },
  { slug: "rhode-island", name: "Rhode Island", abbr: "RI", bac: "0.08%", term: "DUI", jail: "Up to 1 year", fine: "$100–$500", suspension: "30–180 days", iid: "Discretionary", lookback: "5 years", sr22: "Yes (SR-22, 3 years)", statute: "R.I. Gen. Laws § 31-27-2" },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC", bac: "0.08%", term: "DUI", jail: "48 hours–30 days", fine: "$400–$1,000", suspension: "6 months", iid: "Required if BAC ≥ 0.15%", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "S.C. Code § 56-5-2930" },
  { slug: "south-dakota", name: "South Dakota", abbr: "SD", bac: "0.08%", term: "DUI", jail: "Up to 1 year", fine: "Up to $2,000", suspension: "30 days–1 year", iid: "Discretionary / 24-7 program", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "SDCL § 32-23-1" },
  { slug: "tennessee", name: "Tennessee", abbr: "TN", bac: "0.08%", term: "DUI", jail: "48 hours–11 months 29 days", fine: "$350–$1,500", suspension: "1 year", iid: "Required for restricted license", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "T.C.A. § 55-10-401" },
  { slug: "texas", name: "Texas", abbr: "TX", bac: "0.08%", term: "DWI", jail: "72 hours–180 days", fine: "Up to $2,000 plus state fine", suspension: "90 days–1 year (ALR)", iid: "Required for occupational license in many cases", lookback: "Lifetime", sr22: "Yes (SR-22, 2 years)", statute: "Tex. Penal Code § 49.04" },
  { slug: "utah", name: "Utah", abbr: "UT", bac: "0.05%", term: "DUI", jail: "48 hours or community service", fine: "$1,400+ with surcharges", suspension: "120 days", iid: "Required, 18 months", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Utah Code § 41-6a-502" },
  { slug: "vermont", name: "Vermont", abbr: "VT", bac: "0.08%", term: "DUI", jail: "Up to 2 years", fine: "Up to $750", suspension: "90 days", iid: "Available for restricted license", lookback: "Lifetime", sr22: "Yes (SR-22, 3 years)", statute: "23 V.S.A. § 1201" },
  { slug: "virginia", name: "Virginia", abbr: "VA", bac: "0.08%", term: "DUI", jail: "Up to 12 months (5 days if BAC ≥ 0.15%)", fine: "$250 minimum", suspension: "1 year", iid: "Required, 6 months (restricted license)", lookback: "10 years", sr22: "Yes (FR-44, 3 years)", statute: "Va. Code § 18.2-266" },
  { slug: "washington", name: "Washington", abbr: "WA", bac: "0.08%", term: "DUI", jail: "24 hours–364 days (or EHM)", fine: "$990.50 minimum", suspension: "90 days", iid: "Required, 1 year", lookback: "7 years (10 for lookback tiers)", sr22: "Yes (SR-22, 3 years)", statute: "RCW § 46.61.502" },
  { slug: "west-virginia", name: "West Virginia", abbr: "WV", bac: "0.08%", term: "DUI", jail: "Up to 6 months", fine: "$100–$500", suspension: "6 months (or 15 days + IID)", iid: "Required for Test & Lock program", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "W. Va. Code § 17C-5-2" },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI", bac: "0.08%", term: "OWI", jail: "None (civil forfeiture first offense)", fine: "$150–$300 plus surcharges", suspension: "6–9 months", iid: "Required if BAC ≥ 0.15%", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Wis. Stat. § 346.63" },
  { slug: "wyoming", name: "Wyoming", abbr: "WY", bac: "0.08%", term: "DWUI", jail: "Up to 6 months", fine: "Up to $750", suspension: "90 days", iid: "Required if BAC ≥ 0.15%", lookback: "10 years", sr22: "Yes (SR-22, 3 years)", statute: "Wyo. Stat. § 31-5-233" },
];

export const duiStateSlugs = duiStates.map((s) => s.slug);

export function getDuiState(slug?: string): DuiState | undefined {
  if (!slug) return undefined;
  return duiStates.find((s) => s.slug === slug.toLowerCase());
}
