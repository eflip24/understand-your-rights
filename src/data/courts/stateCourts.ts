/**
 * State court systems dataset.
 *
 * One record per US jurisdiction (50 states + District of Columbia).
 *
 * Small-claims dollar limits, filing-fee ranges, governing statute and the
 * official judiciary website are sourced from published statutory surveys and
 * each state's own judiciary site. Court names describe the standard structure
 * for civil matters; several states use different names for specialised
 * dockets, and a handful of counties run their own limited-jurisdiction courts.
 *
 * Fees and dollar limits change by legislative session — every rendered page
 * links to the official source and carries a verification date.
 *
 * Educational reference. NOT legal advice.
 */

export interface StateCourtSystem {
  slug: string;
  name: string;
  abbr: string;
  /** Court of last resort. */
  highestCourt: string;
  /** Intermediate appellate court, where one exists. */
  appellateCourt?: string;
  /** General-jurisdiction trial court (most civil lawsuits start here). */
  trialCourt: string;
  /** Limited-jurisdiction court that normally hears small claims. */
  limitedCourt: string;
  /** Maximum amount recoverable in small claims. */
  smallClaimsLimit: string;
  /** Published filing-fee range for a small claims case. */
  smallClaimsFee: string;
  /** Statute setting the limit or the fee schedule. */
  statute: string;
  /** Official statewide judiciary website. */
  courtWebsite: string;
  /** Statewide e-filing platform, where one is used for civil filings. */
  eFiling?: string;
  /** Extra jurisdiction-specific note worth surfacing. */
  note?: string;
}

export const COURTS_LAST_VERIFIED = "2026-08-12";

export const COURT_SOURCES: { label: string; url: string }[] = [
  {
    label: "Super Lawyers — Small claims limits, fees and statutes by state",
    url: "https://www.superlawyers.com/resources/general-litigation/small-claims-court-amounts-fees/",
  },
  {
    label: "National Center for State Courts — State court structure charts",
    url: "https://www.ncsc.org/information-and-resources/state-court-structure-charts",
  },
];

export const stateCourts: StateCourtSystem[] = [
  { slug: "alabama", name: "Alabama", abbr: "AL", highestCourt: "Supreme Court of Alabama", appellateCourt: "Alabama Court of Civil Appeals", trialCourt: "Circuit Court", limitedCourt: "District Court (Small Claims Division)", smallClaimsLimit: "$6,000", smallClaimsFee: "$35 – $256", statute: "Ala. Code § 12-19-71", courtWebsite: "https://www.alacourt.gov", eFiling: "Alacourt eFiling" },
  { slug: "alaska", name: "Alaska", abbr: "AK", highestCourt: "Alaska Supreme Court", appellateCourt: "Alaska Court of Appeals (criminal)", trialCourt: "Superior Court", limitedCourt: "District Court (Small Claims)", smallClaimsLimit: "$10,000", smallClaimsFee: "$50 – $100", statute: "Alaska Stat. § 09.60.010", courtWebsite: "https://public.courts.alaska.gov" },
  { slug: "arizona", name: "Arizona", abbr: "AZ", highestCourt: "Arizona Supreme Court", appellateCourt: "Arizona Court of Appeals", trialCourt: "Superior Court", limitedCourt: "Justice Court (Small Claims Division)", smallClaimsLimit: "$5,000", smallClaimsFee: "$30 – $60", statute: "Ariz. Rev. Stat. § 22-281", courtWebsite: "https://www.azcourts.gov", eFiling: "AZTurboCourt", note: "Lawyers may not appear in the small claims division unless both parties agree." },
  { slug: "arkansas", name: "Arkansas", abbr: "AR", highestCourt: "Arkansas Supreme Court", appellateCourt: "Arkansas Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "District Court (Small Claims Division)", smallClaimsLimit: "$5,000", smallClaimsFee: "$67.50", statute: "Ark. Code Ann. § 21-6-403", courtWebsite: "https://www.arcourts.gov", eFiling: "eFlex" },
  { slug: "california", name: "California", abbr: "CA", highestCourt: "Supreme Court of California", appellateCourt: "California Courts of Appeal", trialCourt: "Superior Court", limitedCourt: "Superior Court — Small Claims Division", smallClaimsLimit: "$12,500 (individuals) / $6,250 (businesses and public entities)", smallClaimsFee: "$30 – $100", statute: "Cal. Code Civ. Proc. § 116.230", courtWebsite: "https://selfhelp.courts.ca.gov/", note: "Attorneys cannot represent either side at the small claims hearing. Individuals may not file more than two claims over $2,500 in a year." },
  { slug: "colorado", name: "Colorado", abbr: "CO", highestCourt: "Colorado Supreme Court", appellateCourt: "Colorado Court of Appeals", trialCourt: "District Court", limitedCourt: "County Court (Small Claims Division)", smallClaimsLimit: "$7,500", smallClaimsFee: "$31 – $55", statute: "Colo. Rev. Stat. § 13-32-101", courtWebsite: "https://www.courts.state.co.us", eFiling: "Colorado Courts E-Filing" },
  { slug: "connecticut", name: "Connecticut", abbr: "CT", highestCourt: "Connecticut Supreme Court", appellateCourt: "Connecticut Appellate Court", trialCourt: "Superior Court", limitedCourt: "Superior Court — Small Claims", smallClaimsLimit: "$5,000 ($15,000 for home-improvement contracts)", smallClaimsFee: "$95", statute: "Conn. Gen. Stat. § 52-259", courtWebsite: "https://www.jud.ct.gov", eFiling: "Connecticut E-Services" },
  { slug: "delaware", name: "Delaware", abbr: "DE", highestCourt: "Delaware Supreme Court", trialCourt: "Superior Court", limitedCourt: "Justice of the Peace Court", smallClaimsLimit: "$25,000", smallClaimsFee: "$30 – $45", statute: "Del. Code tit. 10, § 9301", courtWebsite: "https://courts.delaware.gov/jpcourt", eFiling: "File & Serve Delaware", note: "Delaware has no intermediate appellate court; appeals go straight to the Supreme Court." },
  { slug: "district-of-columbia", name: "District of Columbia", abbr: "DC", highestCourt: "D.C. Court of Appeals", trialCourt: "Superior Court of the District of Columbia", limitedCourt: "Small Claims and Conciliation Branch", smallClaimsLimit: "$10,000", smallClaimsFee: "$5 – $45", statute: "D.C. Code § 15-701", courtWebsite: "https://www.dccourts.gov", eFiling: "C-Track / File & Serve" },
  { slug: "florida", name: "Florida", abbr: "FL", highestCourt: "Supreme Court of Florida", appellateCourt: "Florida District Courts of Appeal", trialCourt: "Circuit Court", limitedCourt: "County Court (Small Claims)", smallClaimsLimit: "$8,000", smallClaimsFee: "$55 – $300", statute: "Fla. Stat. § 34.041", courtWebsite: "https://www.flcourts.gov", eFiling: "Florida Courts E-Filing Portal" },
  { slug: "georgia", name: "Georgia", abbr: "GA", highestCourt: "Supreme Court of Georgia", appellateCourt: "Court of Appeals of Georgia", trialCourt: "Superior Court", limitedCourt: "Magistrate Court", smallClaimsLimit: "$15,000 (no cap in eviction cases)", smallClaimsFee: "$54", statute: "O.C.G.A. § 15-10-80", courtWebsite: "https://georgiacourts.gov", eFiling: "PeachCourt" },
  { slug: "hawaii", name: "Hawaii", abbr: "HI", highestCourt: "Supreme Court of Hawaii", appellateCourt: "Hawaii Intermediate Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "District Court (Small Claims Division)", smallClaimsLimit: "$5,000 (no cap on residential security-deposit claims)", smallClaimsFee: "$35", statute: "Haw. Rev. Stat. § 607-4", courtWebsite: "https://www.courts.state.hi.us", eFiling: "JEFS" },
  { slug: "idaho", name: "Idaho", abbr: "ID", highestCourt: "Idaho Supreme Court", appellateCourt: "Idaho Court of Appeals", trialCourt: "District Court", limitedCourt: "Magistrate Division (Small Claims)", smallClaimsLimit: "$5,000 ($15,000 from July 1, 2026)", smallClaimsFee: "$69", statute: "Idaho Code § 31-3201", courtWebsite: "https://isc.idaho.gov", eFiling: "Odyssey File & Serve", note: "Attorneys may not appear for either side in small claims." },
  { slug: "illinois", name: "Illinois", abbr: "IL", highestCourt: "Illinois Supreme Court", appellateCourt: "Illinois Appellate Court", trialCourt: "Circuit Court", limitedCourt: "Circuit Court — Small Claims", smallClaimsLimit: "$10,000", smallClaimsFee: "$89 – $379", statute: "705 ILCS 105/27.1a", courtWebsite: "https://www.illinoiscourts.gov", eFiling: "eFileIL (Odyssey)" },
  { slug: "indiana", name: "Indiana", abbr: "IN", highestCourt: "Indiana Supreme Court", appellateCourt: "Indiana Court of Appeals", trialCourt: "Circuit and Superior Courts", limitedCourt: "Small Claims Court / Small Claims Division", smallClaimsLimit: "$10,000", smallClaimsFee: "$97 – $130", statute: "Ind. Code § 33-37-4-2", courtWebsite: "https://www.in.gov/courts", eFiling: "Indiana E-Filing System (IEFS)" },
  { slug: "iowa", name: "Iowa", abbr: "IA", highestCourt: "Iowa Supreme Court", appellateCourt: "Iowa Court of Appeals", trialCourt: "District Court", limitedCourt: "District Court — Small Claims", smallClaimsLimit: "$6,500", smallClaimsFee: "$95", statute: "Iowa Code § 602.8105", courtWebsite: "https://www.iowacourts.gov", eFiling: "Iowa EDMS" },
  { slug: "kansas", name: "Kansas", abbr: "KS", highestCourt: "Kansas Supreme Court", appellateCourt: "Kansas Court of Appeals", trialCourt: "District Court", limitedCourt: "District Court — Small Claims", smallClaimsLimit: "$10,000", smallClaimsFee: "$49 – $69", statute: "Kan. Stat. Ann. § 61-4001", courtWebsite: "https://www.kscourts.org", note: "Lawyers may not represent a party at the small claims hearing." },
  { slug: "kentucky", name: "Kentucky", abbr: "KY", highestCourt: "Supreme Court of Kentucky", appellateCourt: "Kentucky Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "District Court (Small Claims Division)", smallClaimsLimit: "$2,500", smallClaimsFee: "$30 – $40", statute: "Ky. Rev. Stat. § 24A.170", courtWebsite: "https://kycourts.gov" },
  { slug: "louisiana", name: "Louisiana", abbr: "LA", highestCourt: "Louisiana Supreme Court", appellateCourt: "Louisiana Courts of Appeal", trialCourt: "District Court", limitedCourt: "City and Parish Courts (Small Claims)", smallClaimsLimit: "$5,000", smallClaimsFee: "$75 – $111.50", statute: "La. Rev. Stat. § 13:2589", courtWebsite: "https://www.lasc.org" },
  { slug: "maine", name: "Maine", abbr: "ME", highestCourt: "Maine Supreme Judicial Court", trialCourt: "Superior Court", limitedCourt: "District Court (Small Claims)", smallClaimsLimit: "$10,000", smallClaimsFee: "$70", statute: "14 Me. Rev. Stat. § 7482", courtWebsite: "https://www.courts.maine.gov", note: "No intermediate appellate court — appeals go to the Law Court." },
  { slug: "maryland", name: "Maryland", abbr: "MD", highestCourt: "Supreme Court of Maryland", appellateCourt: "Appellate Court of Maryland", trialCourt: "Circuit Court", limitedCourt: "District Court of Maryland (Small Claims)", smallClaimsLimit: "$5,000", smallClaimsFee: "$44", statute: "Md. Code, Cts. & Jud. Proc. § 7-202", courtWebsite: "https://www.mdcourts.gov", eFiling: "MDEC" },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA", highestCourt: "Massachusetts Supreme Judicial Court", appellateCourt: "Massachusetts Appeals Court", trialCourt: "Superior Court", limitedCourt: "District Court / Boston Municipal Court (Small Claims)", smallClaimsLimit: "$7,000", smallClaimsFee: "$40 – $150", statute: "Mass. Gen. Laws ch. 218, § 22", courtWebsite: "https://www.mass.gov/courts", eFiling: "eFileMA" },
  { slug: "michigan", name: "Michigan", abbr: "MI", highestCourt: "Michigan Supreme Court", appellateCourt: "Michigan Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "District Court (Small Claims Division)", smallClaimsLimit: "$7,000", smallClaimsFee: "$30 – $70", statute: "Mich. Comp. Laws § 600.8420", courtWebsite: "https://www.courts.michigan.gov", eFiling: "MiFILE" },
  { slug: "minnesota", name: "Minnesota", abbr: "MN", highestCourt: "Minnesota Supreme Court", appellateCourt: "Minnesota Court of Appeals", trialCourt: "District Court", limitedCourt: "Conciliation Court", smallClaimsLimit: "$20,000 ($4,000 for consumer-credit claims)", smallClaimsFee: "$65 – $80", statute: "Minn. Stat. § 357.022", courtWebsite: "https://www.mncourts.gov", eFiling: "eFS (Odyssey)" },
  { slug: "mississippi", name: "Mississippi", abbr: "MS", highestCourt: "Supreme Court of Mississippi", appellateCourt: "Mississippi Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "Justice Court", smallClaimsLimit: "$3,500", smallClaimsFee: "$75 – $85", statute: "Miss. Code Ann. § 9-11-9", courtWebsite: "https://courts.ms.gov" },
  { slug: "missouri", name: "Missouri", abbr: "MO", highestCourt: "Supreme Court of Missouri", appellateCourt: "Missouri Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "Associate Circuit Court (Small Claims)", smallClaimsLimit: "$5,000", smallClaimsFee: "$20.50 – $35.50", statute: "Mo. Rev. Stat. § 488.012", courtWebsite: "https://www.courts.mo.gov", eFiling: "Missouri eFiling" },
  { slug: "montana", name: "Montana", abbr: "MT", highestCourt: "Montana Supreme Court", trialCourt: "District Court", limitedCourt: "Justice Court (Small Claims)", smallClaimsLimit: "$7,000", smallClaimsFee: "$30 – $50", statute: "Mont. Code Ann. § 25-35-608", courtWebsite: "https://courts.mt.gov", note: "A lawyer may appear only if both sides are represented." },
  { slug: "nebraska", name: "Nebraska", abbr: "NE", highestCourt: "Nebraska Supreme Court", appellateCourt: "Nebraska Court of Appeals", trialCourt: "District Court", limitedCourt: "County Court (Small Claims)", smallClaimsLimit: "$7,500", smallClaimsFee: "$32", statute: "Neb. Rev. Stat. § 25-2802", courtWebsite: "https://supremecourt.nebraska.gov", note: "Attorneys may not represent parties in small claims." },
  { slug: "nevada", name: "Nevada", abbr: "NV", highestCourt: "Nevada Supreme Court", appellateCourt: "Nevada Court of Appeals", trialCourt: "District Court", limitedCourt: "Justice Court (Small Claims)", smallClaimsLimit: "$10,000", smallClaimsFee: "$66 – $196", statute: "Nev. Rev. Stat. § 73.010", courtWebsite: "https://nvcourts.gov" },
  { slug: "new-hampshire", name: "New Hampshire", abbr: "NH", highestCourt: "New Hampshire Supreme Court", trialCourt: "Superior Court", limitedCourt: "Circuit Court — District Division (Small Claims)", smallClaimsLimit: "$10,000", smallClaimsFee: "$125 – $180", statute: "N.H. Rev. Stat. § 490:26-a", courtWebsite: "https://www.courts.nh.gov", eFiling: "NH e-Court" },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ", highestCourt: "New Jersey Supreme Court", appellateCourt: "Appellate Division of the Superior Court", trialCourt: "Superior Court, Law Division", limitedCourt: "Special Civil Part — Small Claims", smallClaimsLimit: "$5,000", smallClaimsFee: "$35", statute: "N.J. Stat. Ann. § 22A:2-37", courtWebsite: "https://www.njcourts.gov", eFiling: "eCourts" },
  { slug: "new-mexico", name: "New Mexico", abbr: "NM", highestCourt: "New Mexico Supreme Court", appellateCourt: "New Mexico Court of Appeals", trialCourt: "District Court", limitedCourt: "Magistrate and Metropolitan Courts", smallClaimsLimit: "$10,000", smallClaimsFee: "$77", statute: "N.M. Stat. Ann. § 35-6-1", courtWebsite: "https://nmcourts.gov", eFiling: "Odyssey File & Serve" },
  { slug: "new-york", name: "New York", abbr: "NY", highestCourt: "New York Court of Appeals", appellateCourt: "Appellate Division of the Supreme Court", trialCourt: "Supreme Court", limitedCourt: "City, Town, Village and NYC Civil Courts (Small Claims Part)", smallClaimsLimit: "$10,000 (NYC); lower caps in some town and village courts", smallClaimsFee: "$15 – $20", statute: "N.Y. Uniform City Ct. Act § 1803", courtWebsite: "https://www.nycourts.gov", eFiling: "NYSCEF", note: "Corporations and other entities cannot sue in the small claims part; they use the commercial claims part instead." },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC", highestCourt: "Supreme Court of North Carolina", appellateCourt: "North Carolina Court of Appeals", trialCourt: "Superior Court", limitedCourt: "District Court — Small Claims (magistrate)", smallClaimsLimit: "$10,000", smallClaimsFee: "$96", statute: "N.C. Gen. Stat. § 7A-305", courtWebsite: "https://www.nccourts.gov", eFiling: "eCourts (Odyssey)" },
  { slug: "north-dakota", name: "North Dakota", abbr: "ND", highestCourt: "North Dakota Supreme Court", appellateCourt: "North Dakota Court of Appeals", trialCourt: "District Court", limitedCourt: "District Court — Small Claims", smallClaimsLimit: "$15,000", smallClaimsFee: "$20", statute: "N.D. Cent. Code § 27-08.1-03", courtWebsite: "https://www.ndcourts.gov", eFiling: "Odyssey File & Serve" },
  { slug: "ohio", name: "Ohio", abbr: "OH", highestCourt: "Supreme Court of Ohio", appellateCourt: "Ohio Courts of Appeals", trialCourt: "Court of Common Pleas", limitedCourt: "Municipal and County Courts (Small Claims Division)", smallClaimsLimit: "$6,000", smallClaimsFee: "$80 – $105", statute: "Ohio Rev. Code § 1925.04", courtWebsite: "https://www.supremecourt.ohio.gov" },
  { slug: "oklahoma", name: "Oklahoma", abbr: "OK", highestCourt: "Oklahoma Supreme Court (civil) / Court of Criminal Appeals", appellateCourt: "Oklahoma Court of Civil Appeals", trialCourt: "District Court", limitedCourt: "District Court — Small Claims Docket", smallClaimsLimit: "$10,000", smallClaimsFee: "$58 – $219.14", statute: "Okla. Stat. tit. 28, § 151", courtWebsite: "https://www.oscn.net" },
  { slug: "oregon", name: "Oregon", abbr: "OR", highestCourt: "Oregon Supreme Court", appellateCourt: "Oregon Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "Circuit Court — Small Claims", smallClaimsLimit: "$10,000", smallClaimsFee: "$37 – $57", statute: "Or. Rev. Stat. § 46.445", courtWebsite: "https://www.courts.oregon.gov", eFiling: "Oregon eCourt (File & Serve)" },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", highestCourt: "Supreme Court of Pennsylvania", appellateCourt: "Superior Court / Commonwealth Court", trialCourt: "Court of Common Pleas", limitedCourt: "Magisterial District Court", smallClaimsLimit: "$12,000", smallClaimsFee: "$15 – $150", statute: "42 Pa. Cons. Stat. § 1725", courtWebsite: "https://www.pacourts.us", eFiling: "PACFile" },
  { slug: "rhode-island", name: "Rhode Island", abbr: "RI", highestCourt: "Rhode Island Supreme Court", trialCourt: "Superior Court", limitedCourt: "District Court — Small Claims", smallClaimsLimit: "$5,000", smallClaimsFee: "$75.75", statute: "R.I. Gen. Laws § 8-8-15", courtWebsite: "https://www.courts.ri.gov", eFiling: "RI Judiciary eFiling" },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC", highestCourt: "Supreme Court of South Carolina", appellateCourt: "South Carolina Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "Magistrate Court", smallClaimsLimit: "$7,500", smallClaimsFee: "$80", statute: "S.C. Code Ann. § 8-21-1010", courtWebsite: "https://www.sccourts.org" },
  { slug: "south-dakota", name: "South Dakota", abbr: "SD", highestCourt: "South Dakota Supreme Court", trialCourt: "Circuit Court", limitedCourt: "Magistrate Court (Small Claims)", smallClaimsLimit: "$12,000", smallClaimsFee: "$4 – $20", statute: "S.D. Codified Laws § 16-2-29", courtWebsite: "https://ujs.sd.gov" },
  { slug: "tennessee", name: "Tennessee", abbr: "TN", highestCourt: "Tennessee Supreme Court", appellateCourt: "Tennessee Court of Appeals", trialCourt: "Circuit and Chancery Courts", limitedCourt: "General Sessions Court", smallClaimsLimit: "$25,000", smallClaimsFee: "$49 – $250", statute: "Tenn. Code Ann. § 8-21-401", courtWebsite: "https://www.tncourts.gov" },
  { slug: "texas", name: "Texas", abbr: "TX", highestCourt: "Supreme Court of Texas (civil) / Court of Criminal Appeals", appellateCourt: "Texas Courts of Appeals", trialCourt: "District Court", limitedCourt: "Justice of the Peace Court (Small Claims)", smallClaimsLimit: "$20,000", smallClaimsFee: "$54", statute: "Tex. Gov't Code § 27.031", courtWebsite: "https://www.txcourts.gov", eFiling: "eFileTexas" },
  { slug: "utah", name: "Utah", abbr: "UT", highestCourt: "Utah Supreme Court", appellateCourt: "Utah Court of Appeals", trialCourt: "District Court", limitedCourt: "Justice Court — Small Claims", smallClaimsLimit: "$20,000", smallClaimsFee: "$60 – $185", statute: "Utah Code Ann. § 78A-2-301", courtWebsite: "https://www.utcourts.gov", eFiling: "Utah MyCase / Greenfiling" },
  { slug: "vermont", name: "Vermont", abbr: "VT", highestCourt: "Vermont Supreme Court", trialCourt: "Superior Court, Civil Division", limitedCourt: "Superior Court — Small Claims", smallClaimsLimit: "$10,000 ($5,000 for consumer-debt claims)", smallClaimsFee: "$65 – $90", statute: "32 Vt. Stat. Ann. § 1431", courtWebsite: "https://www.vermontjudiciary.org", eFiling: "Odyssey File & Serve" },
  { slug: "virginia", name: "Virginia", abbr: "VA", highestCourt: "Supreme Court of Virginia", appellateCourt: "Court of Appeals of Virginia", trialCourt: "Circuit Court", limitedCourt: "General District Court (Small Claims Division)", smallClaimsLimit: "$5,000", smallClaimsFee: "$36 – $52", statute: "Va. Code Ann. § 16.1-69.48:2", courtWebsite: "https://www.vacourts.gov" },
  { slug: "washington", name: "Washington", abbr: "WA", highestCourt: "Washington Supreme Court", appellateCourt: "Washington Court of Appeals", trialCourt: "Superior Court", limitedCourt: "District Court — Small Claims", smallClaimsLimit: "$10,000 (individuals); lower cap for entities", smallClaimsFee: "$35 – $50", statute: "Wash. Rev. Code § 3.62.060", courtWebsite: "https://www.courts.wa.gov" },
  { slug: "west-virginia", name: "West Virginia", abbr: "WV", highestCourt: "Supreme Court of Appeals of West Virginia", appellateCourt: "Intermediate Court of Appeals of West Virginia", trialCourt: "Circuit Court", limitedCourt: "Magistrate Court", smallClaimsLimit: "$20,000", smallClaimsFee: "$30 – $70", statute: "W. Va. Code § 50-2-1", courtWebsite: "https://www.courtswv.gov" },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI", highestCourt: "Wisconsin Supreme Court", appellateCourt: "Wisconsin Court of Appeals", trialCourt: "Circuit Court", limitedCourt: "Circuit Court — Small Claims", smallClaimsLimit: "$10,000 ($5,000 for third-party consumer-debt claims)", smallClaimsFee: "$94.50 – $98", statute: "Wis. Stat. § 814.61", courtWebsite: "https://www.wicourts.gov", eFiling: "Wisconsin eFiling" },
  { slug: "wyoming", name: "Wyoming", abbr: "WY", highestCourt: "Wyoming Supreme Court", trialCourt: "District Court", limitedCourt: "Circuit Court (Small Claims)", smallClaimsLimit: "$6,000", smallClaimsFee: "$10", statute: "Wyo. Stat. Ann. § 5-9-135", courtWebsite: "https://www.courts.state.wy.us" },
];

export function getStateCourts(slug: string): StateCourtSystem | undefined {
  return stateCourts.find((s) => s.slug === slug);
}

export function getStateCourtsByAbbr(abbr: string): StateCourtSystem | undefined {
  return stateCourts.find((s) => s.abbr === abbr.toUpperCase());
}

export function getAllCourtStateSlugs(): string[] {
  return stateCourts.map((s) => s.slug);
}

/** Parses the leading dollar figure out of a small-claims limit string. */
export function smallClaimsCap(entry: StateCourtSystem): number | undefined {
  const m = entry.smallClaimsLimit.match(/\$([\d,]+)/);
  return m ? Number(m[1].replace(/,/g, "")) : undefined;
}
