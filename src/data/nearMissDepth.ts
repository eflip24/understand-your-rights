/**
 * Rescue depth for state fan-out pages that already rank on page 4–7.
 *
 * These URLs prove the template can rank; they just lack jurisdiction-specific
 * substance. Each entry adds real filing venues, deadlines, agencies and
 * statutory citations for one `/{pillar}/{state}/{slug}` page. The added text
 * also counts toward the content-depth gate, so a rescued page becomes
 * indexable while its sparse siblings stay noindexed.
 *
 * Key format: `${pillar}/${state}/${slug}`
 */

export interface DepthFact {
  label: string;
  value: string;
}

export interface DepthSection {
  heading: string;
  intro?: string;
  facts?: DepthFact[];
  bullets?: string[];
  /** Optional simple table: header row + body rows. */
  table?: { columns: string[]; rows: string[][] };
}

export interface NearMissDepth {
  /** Short editorial standfirst shown above the added sections. */
  summary: string;
  sections: DepthSection[];
  /** Official sources for the citation block. */
  sources: { label: string; url: string }[];
}

export const nearMissDepth: Record<string, NearMissDepth> = {
  "personal-injury-law/wyoming/nursing-home-abuse": {
    summary:
      "Wyoming nursing-home abuse claims run on short deadlines and an unusual pre-suit step: most claims against a licensed health-care provider must first go through the Wyoming Medical Review Panel before a district court complaint can proceed. Below are the filing venues, deadlines, damage rules and reporting agencies that apply to a Wyoming facility claim.",
    sections: [
      {
        heading: "Deadlines that decide the case",
        facts: [
          { label: "Personal injury (general)", value: "4 years from the injury — Wyo. Stat. §1-3-105(a)(iv)(C)" },
          { label: "Medical malpractice / licensed provider", value: "2 years from the act or from reasonable discovery — Wyo. Stat. §1-3-107" },
          { label: "Wrongful death", value: "2 years from the date of death — Wyo. Stat. §1-38-102(d)" },
          { label: "Claim against a government-run facility", value: "Governmental Claims Act notice within 2 years, suit within 1 year of filing the notice — Wyo. Stat. §1-39-113" },
          { label: "Minor or legally incapacitated resident", value: "Tolling is narrow; do not assume the clock is paused without a court ruling" },
        ],
      },
      {
        heading: "Where the case is actually filed",
        intro:
          "Wyoming has no intermediate appellate court. Nursing-home claims are filed in the district court for the county where the facility sits or where the defendant resides; small monetary disputes (unpaid refunds, personal-property loss) can go to circuit court.",
        table: {
          columns: ["Court", "Handles", "Monetary limit"],
          rows: [
            ["District Court (9 judicial districts)", "Abuse, neglect, wrongful death, punitive damages", "No limit"],
            ["Circuit Court", "Contract and property disputes with the facility", "Up to $50,000"],
            ["Circuit Court — small claims", "Deposit, billing and personal-property claims", "Up to $6,000"],
            ["Wyoming Supreme Court", "Direct appeal from district court", "—"],
          ],
        },
      },
      {
        heading: "The Medical Review Panel step",
        bullets: [
          "Claims alleging negligence by a licensed health-care provider are reviewed by the Wyoming Medical Review Panel before litigation proceeds (Wyo. Stat. §9-2-1513 et seq.).",
          "Filing with the panel tolls the statute of limitations while the review is pending.",
          "The panel's opinion is advisory — it does not bind the district court, and it is generally not admissible at trial.",
          "Pure custodial-neglect claims (understaffing, failure to reposition, fall protocols) can sometimes be pleaded as ordinary negligence, which avoids the panel and uses the 4-year deadline. That characterisation is contested and worth a lawyer's read before filing.",
        ],
      },
      {
        heading: "Damages rules unique to Wyoming",
        facts: [
          { label: "Damage caps", value: "None. Article 10, §4 of the Wyoming Constitution prohibits caps on recovery for injury or death." },
          { label: "Negligence rule", value: "Modified comparative fault — recovery barred at 51% or more of the fault (Wyo. Stat. §1-1-109)." },
          { label: "Punitive damages", value: "Available for wilful and wanton misconduct; no statutory cap." },
          { label: "Wrongful death distribution", value: "Recovery goes to statutory beneficiaries through a court-appointed personal representative, not through the estate." },
        ],
      },
      {
        heading: "Who to report to before you sue",
        intro:
          "A regulatory complaint creates a documented, dated record of the conduct — usually the strongest early evidence in a facility claim.",
        bullets: [
          "Wyoming Department of Health, Healthcare Licensing and Surveys — licensing complaints and federal survey deficiencies for every certified facility.",
          "Wyoming Long-Term Care Ombudsman — free advocacy, resident-rights complaints, and facility inspection history.",
          "Adult Protective Services (Wyoming Department of Family Services) — mandatory reporting of abuse, neglect, exploitation or abandonment of a vulnerable adult under Wyo. Stat. §35-20-103.",
          "Local law enforcement — for suspected assault, sexual abuse, or financial exploitation.",
          "CMS Care Compare — star ratings, staffing hours per resident day, and the facility's inspection deficiency history, all admissible-adjacent background for a demand letter.",
        ],
      },
      {
        heading: "Evidence to secure in the first 30 days",
        bullets: [
          "Written request for the complete medical and nursing chart — Wyoming providers must respond to a records request; put the request in writing and keep the postmark.",
          "The care plan and every revision, plus the MDS assessments filed with CMS.",
          "Staffing schedules and daily assignment sheets for the shifts in question.",
          "Incident and fall reports, wound-care logs, and weight records.",
          "Photographs of pressure injuries with a date stamp and a scale reference.",
          "Names of roommates, visiting family and departing staff — turnover in rural Wyoming facilities is high and witnesses disappear quickly.",
        ],
      },
    ],
    sources: [
      { label: "Wyoming Statutes (LSO)", url: "https://wyoleg.gov/statutes/statutes.aspx" },
      { label: "Wyoming Judicial Branch — district courts", url: "https://www.courts.state.wy.us/" },
      { label: "Wyoming Department of Health — Healthcare Licensing and Surveys", url: "https://health.wyo.gov/aging/hls/" },
      { label: "Medicare Care Compare — nursing homes", url: "https://www.medicare.gov/care-compare/" },
    ],
  },

  "criminal-law/maine/drug-charges": {
    summary:
      "Maine classifies drug offences by schedule and quantity into lettered crime classes, and applies presumptions that convert simple possession into trafficking at set weights. Maine also has no jury trial at the initial stage for Class E offences and runs a statewide unified criminal docket. Here is how a Maine drug charge actually proceeds.",
    sections: [
      {
        heading: "Maine crime classes and exposure",
        table: {
          columns: ["Class", "Maximum prison", "Maximum fine", "Typical drug offence"],
          rows: [
            ["Class A", "30 years", "$50,000", "Aggravated trafficking; trafficking near a school with priors"],
            ["Class B", "10 years", "$20,000", "Trafficking in schedule W drugs; large-quantity furnishing"],
            ["Class C", "5 years", "$5,000", "Unlawful trafficking (base); furnishing schedule W"],
            ["Class D", "364 days", "$2,000", "Possession of schedule W drugs; furnishing schedule Z"],
            ["Class E", "6 months", "$1,000", "Possession of schedule Z drugs; drug paraphernalia offences"],
          ],
        },
      },
      {
        heading: "Quantity presumptions that upgrade a possession charge",
        intro:
          "Under 17-A M.R.S. §1103(3), possession of at least a threshold quantity permits a permissible inference of trafficking. These thresholds do the heavy lifting in most Maine drug prosecutions.",
        facts: [
          { label: "Heroin / fentanyl powder", value: "Inference of trafficking at statutory threshold weight; aggravated tiers apply above larger weights" },
          { label: "Cocaine (powder)", value: "Trafficking inference at the statutory threshold; separate, lower threshold for cocaine base" },
          { label: "Methamphetamine", value: "Trafficking inference at the statutory threshold weight" },
          { label: "Prescription pills", value: "Counted by dosage unit, not by weight — pill counts escalate charges fast" },
          { label: "Cannabis", value: "Adult possession up to 2.5 oz is lawful; unlicensed sale remains a criminal offence" },
        ],
        bullets: [
          "The inference is rebuttable — evidence of personal use, tolerance, and absence of scales, packaging or ledgers directly attacks it.",
          "Aggravated trafficking (17-A M.R.S. §1105-A) adds a class bump for prior drug convictions, possession of a firearm, trafficking to a minor, or trafficking within 1,000 feet of a school zone.",
        ],
      },
      {
        heading: "How a case moves through the Maine courts",
        table: {
          columns: ["Stage", "Where", "Timing"],
          rows: [
            ["Initial appearance / arraignment", "Unified Criminal Docket (county Superior Court)", "Within 48 hours if held; otherwise by summons date"],
            ["Bail hearing", "Same court; bail commissioner if after hours", "At or before arraignment"],
            ["Discovery under M.R.U. Crim. P. 16", "Prosecution disclosure", "Typically within 21 days of the plea of not guilty"],
            ["Motion to suppress", "Unified Criminal Docket", "Filed before the dispositional conference"],
            ["Dispositional conference", "Judge-facilitated plea discussion", "Usually 60–120 days in"],
            ["Jury trial", "Superior Court", "Class A–D; Class E has no jury trial right in most cases"],
          ],
        },
      },
      {
        heading: "Diversion and alternatives to conviction",
        bullets: [
          "Deferred disposition (17-A M.R.S. §1902): plead guilty, complete conditions over a set period, and the charge is dismissed or reduced on successful completion. This is the most common favourable outcome in Maine drug cases.",
          "Adult Drug Treatment Courts operate in several counties (including Cumberland, Androscoggin, Penobscot, Washington and York) with treatment-based supervision in place of incarceration.",
          "Maine's Good Samaritan law (17-A M.R.S. §1111-B) grants protection from arrest, prosecution and probation revocation for people seeking medical help during an overdose.",
          "Filing agreements and conditional dismissals are available for first-time low-level possession, most often at the district-attorney level rather than by statute.",
        ],
      },
      {
        heading: "Collateral consequences and record relief",
        bullets: [
          "Maine does not have broad expungement. Class E convictions may be sealed in limited circumstances (15 M.R.S. §2261) for offences committed at ages 18–20.",
          "A drug conviction can trigger federal student-aid, public-housing and immigration consequences independent of the state sentence.",
          "Maine license suspension for drug offences applies mainly where a motor vehicle was involved; there is no automatic across-the-board suspension for simple possession.",
          "Dismissed and not-guilty outcomes remain visible in court records unless sealed — ask counsel about a sealing motion at disposition, not years later.",
        ],
      },
      {
        heading: "First 72 hours: what actually changes the outcome",
        bullets: [
          "Say nothing beyond identifying information; Maine officers routinely note statements made during search-consent conversations.",
          "Document exactly how the search happened — vehicle stop, consent, plain view, or warrant. Suppression wins in Maine cluster around the scope of consent and prolonged stops.",
          "Preserve phone data before it is wiped or handed over; text history often refutes an intent-to-distribute theory.",
          "Start treatment or an assessment immediately — Maine judges weigh documented treatment heavily at the dispositional conference.",
        ],
      },
    ],
    sources: [
      { label: "Maine Revised Statutes Title 17-A, Chapter 45 (drug offences)", url: "https://legislature.maine.gov/statutes/17-A/title17-Ach45sec0.html" },
      { label: "Maine Judicial Branch — Unified Criminal Docket", url: "https://www.courts.maine.gov/courts/criminal/" },
      { label: "Maine Rules of Unified Criminal Procedure", url: "https://www.courts.maine.gov/rules/" },
      { label: "Maine Office of Behavioral Health — treatment locator", url: "https://www.maine.gov/dhhs/obh" },
    ],
  },
};

export function getNearMissDepth(pillar: string, state: string, slug: string): NearMissDepth | undefined {
  return nearMissDepth[`${pillar}/${state}/${slug}`];
}

/** Flattened text of a depth entry — feeds the content-depth gate. */
export function nearMissDepthText(depth: NearMissDepth | undefined): string {
  if (!depth) return "";
  const parts: string[] = [depth.summary];
  for (const s of depth.sections) {
    parts.push(s.heading, s.intro ?? "");
    s.facts?.forEach((f) => parts.push(f.label, f.value));
    s.bullets?.forEach((b) => parts.push(b));
    s.table?.rows.forEach((r) => parts.push(r.join(" ")));
  }
  return parts.join(" ");
}
