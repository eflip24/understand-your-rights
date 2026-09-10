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

  "employment-law/south-carolina/severance-agreements": {
    summary:
      "South Carolina is an at-will, no-severance-mandate state: nothing in the SC Code requires an employer to pay severance unless a contract, handbook promise or written policy creates the obligation. What makes a South Carolina severance agreement worth negotiating is the payment-of-wages statute, the state's unusually employer-friendly non-compete case law, and the federal release rules that apply to anyone 40 or older.",
    sections: [
      {
        heading: "The rules that actually apply in South Carolina",
        facts: [
          { label: "Severance requirement", value: "None by statute. Enforceable only through a contract, offer letter, handbook policy or established practice." },
          { label: "Final wages", value: "Due within 48 hours of separation or on the next regular payday, not more than 30 days later — S.C. Code §41-10-50." },
          { label: "Penalty for unpaid wages", value: "Up to three times the unpaid wages plus costs and attorney's fees — S.C. Code §41-10-80(C)." },
          { label: "Accrued vacation", value: "Payable only if company policy or practice treats it as earned wages; SC does not force payout by statute." },
          { label: "Handbook disclaimers", value: "A handbook can create a contract unless it carries a conspicuous disclaimer signed by the employee — S.C. Code §41-1-110." },
          { label: "Wage-claim deadline", value: "3 years from the date wages were due — S.C. Code §41-10-80(C)." },
        ],
      },
      {
        heading: "What signing costs you, clause by clause",
        table: {
          columns: ["Clause", "What it gives up", "Negotiable in SC?"],
          rows: [
            ["General release", "All claims that exist at signing — discrimination, wage, tort", "Usually yes, in scope and carve-outs"],
            ["Non-compete", "Competing work by geography and time", "Yes — SC courts will not rewrite (blue-pencil) an overbroad term, they void it"],
            ["Non-solicitation", "Contacting customers and colleagues", "Yes — narrow it to accounts you actually served"],
            ["Non-disparagement", "Public comment about the employer", "Ask for mutuality; one-way clauses are common and avoidable"],
            ["Confidentiality of terms", "Discussing the payment amount", "Carve out spouse, tax adviser, lawyer and legally required disclosure"],
            ["Cooperation clause", "Unpaid future time in litigation", "Add an hourly rate and expense reimbursement"],
          ],
        },
      },
      {
        heading: "Age 40 and over: the OWBPA timing rules",
        bullets: [
          "An individual release of federal age-discrimination claims must give at least 21 days to consider it, plus 7 days to revoke after signing (29 U.S.C. §626(f)).",
          "A group layoff (an exit incentive offered to two or more employees) raises the consideration period to 45 days and requires a disclosure list of the job titles and ages of everyone selected and not selected.",
          "The 7-day revocation window cannot be waived or shortened, and payment normally cannot be made until it expires.",
          "A material change to the offer restarts the clock. Ask for the revised draft in writing rather than accepting a verbal amendment.",
        ],
      },
      {
        heading: "Non-competes: why South Carolina drafting matters",
        bullets: [
          "SC courts enforce a restrictive covenant only if it is supported by valuable consideration, necessary to protect a legitimate interest, reasonably limited in time and territory, not unduly harsh, and not against public policy.",
          "South Carolina does not blue-pencil. An overbroad geographic scope generally voids the entire covenant rather than shrinking it — which is leverage when the employer wants a clean release.",
          "Continued at-will employment alone is generally not sufficient consideration for a covenant signed after hire; the severance payment itself often is.",
          "Customer non-solicitation limited to accounts you personally serviced in the last 12–24 months is the version most likely to survive review.",
        ],
      },
      {
        heading: "Claims a release does not (and cannot) waive",
        bullets: [
          "Unemployment insurance eligibility — severance does not automatically disqualify you, but SC DEW may allocate lump-sum wages to weeks after separation. Report the payment when you file.",
          "Workers' compensation benefits, which are waived only through a Commission-approved clincher agreement, not a severance release.",
          "The right to file a charge with the EEOC or the South Carolina Human Affairs Commission, or to cooperate in an investigation — though a valid release can bar you from recovering money through it.",
          "Vested retirement benefits under ERISA, and future claims that do not yet exist at signing.",
          "SCHAC and EEOC charge deadline: 300 days from the discriminatory act in South Carolina; SCHAC's own filing window is 180 days.",
        ],
      },
      {
        heading: "A practical counter-offer sequence",
        bullets: [
          "Ask for the reason for selection in writing before signing anything — it fixes the employer's stated rationale.",
          "Push the payment from weeks to months of pay, then ask for COBRA premium subsidy for the same number of months (often cheaper for the employer than more cash).",
          "Request a neutral reference commitment naming a specific contact, plus confirmation the departure will be described as a position elimination if that is accurate.",
          "Trade the non-compete for a longer non-solicit — employers frequently accept, and the non-compete is the clause that blocks your next job.",
          "Confirm the treatment of unvested equity, bonus and commission earned before separation; SC treats earned commission as wages under §41-10-10(2).",
        ],
      },
    ],
    sources: [
      { label: "S.C. Code Title 41, Chapter 10 — Payment of Wages", url: "https://www.scstatehouse.gov/code/t41c010.php" },
      { label: "South Carolina Department of Employment and Workforce", url: "https://dew.sc.gov/" },
      { label: "South Carolina Human Affairs Commission", url: "https://schac.sc.gov/" },
      { label: "EEOC — Understanding Waivers of Discrimination Claims in Employee Severance Agreements", url: "https://www.eeoc.gov/laws/guidance/understanding-waivers-discrimination-claims-employee-severance-agreements" },
    ],
  },

  "criminal-law/ohio/domestic-violence-charges": {
    summary:
      "Ohio domestic violence is charged under R.C. 2919.25 and it moves faster than most misdemeanours: an arrest usually triggers a mandatory next-business-day arraignment, a temporary protection order, and an immediate firearms prohibition. The prior-conviction ladder — misdemeanour to felony on the second offence — is what turns a first case into a life-changing one.",
    sections: [
      {
        heading: "Charge levels under R.C. 2919.25",
        table: {
          columns: ["Situation", "Degree", "Maximum penalty"],
          rows: [
            ["Threat of force only (no injury)", "M4", "30 days jail, $250 fine"],
            ["Knowingly causing physical harm — first offence", "M1", "180 days jail, $1,000 fine"],
            ["One prior DV or specified offence", "F4", "6–18 months prison, $5,000 fine"],
            ["Two or more priors", "F3", "9–36 months prison, $10,000 fine"],
            ["Victim known to be pregnant", "Elevated degree", "Enhanced under R.C. 2919.25(D)(3)–(6)"],
            ["Violating a protection order", "R.C. 2919.27", "Separate charge, M1 or higher on repeat"],
          ],
        },
      },
      {
        heading: "The first 72 hours",
        facts: [
          { label: "Preferred-arrest policy", value: "R.C. 2935.032 directs agencies to adopt a policy favouring arrest of the primary physical aggressor." },
          { label: "Arraignment", value: "Next business day after arrest in most municipal courts; a temporary protection order is typically issued at that hearing." },
          { label: "Temporary protection order", value: "R.C. 2919.26 — lasts through the criminal case; violation is a separate crime." },
          { label: "Firearms", value: "A DV conviction, including a misdemeanour, triggers the federal ban under 18 U.S.C. §922(g)(9); the TPO can bar possession before conviction." },
          { label: "No-contact reality", value: "The order binds the defendant, not the complainant. Returning home 'because they invited me' is still a violation." },
        ],
      },
      {
        heading: "Why dropped charges are not really dropped",
        bullets: [
          "The complainant does not control the case in Ohio; the city prosecutor or county prosecutor decides whether to proceed.",
          "Prosecutors routinely proceed on 911 audio, body-worn camera footage, photographs, and excited-utterance statements even after a recantation.",
          "An affidavit of non-prosecution is evidence for the prosecutor to weigh, not an instruction — and a coached one can create witness-tampering exposure (R.C. 2921.12, 2921.04).",
          "Jail calls are recorded and are the most common source of tampering and order-violation charges added after arraignment.",
        ],
      },
      {
        heading: "Diversion, records and long-term consequences",
        bullets: [
          "Many Ohio counties run pretrial diversion or intervention-in-lieu programmes; availability is county-specific and often excludes cases with documented injury.",
          "A DV conviction is not sealable under R.C. 2953.36 exclusions for offences of violence in most circumstances — this is the single biggest reason to fight rather than plead quickly.",
          "A reduction to disorderly conduct (R.C. 2917.11) is the traditional negotiated outcome and usually preserves firearm rights and sealing eligibility.",
          "Civil protection orders under R.C. 3113.31 run on a separate track in domestic relations court, last up to five years, and are decided on a lower standard of proof than the criminal case.",
          "Immigration consequences are severe: a DV conviction is a deportable offence under 8 U.S.C. §1227(a)(2)(E) regardless of sentence length.",
        ],
      },
      {
        heading: "Evidence that changes Ohio outcomes",
        bullets: [
          "Body-worn camera footage from every responding officer, requested in writing before routine deletion cycles run.",
          "The full 911 audio and CAD dispatch log, which frequently contradict the narrative in the incident report.",
          "Medical records for both parties — defensive injuries support a self-defence claim under Ohio's post-2019 burden-shifting rule, where the state must disprove self-defence beyond a reasonable doubt (R.C. 2901.05(B)).",
          "Contemporaneous texts and location data showing who initiated contact and where each person was.",
        ],
      },
    ],
    sources: [
      { label: "Ohio Revised Code §2919.25 — Domestic violence", url: "https://codes.ohio.gov/ohio-revised-code/section-2919.25" },
      { label: "Ohio Revised Code §2919.26 — Temporary protection order", url: "https://codes.ohio.gov/ohio-revised-code/section-2919.26" },
      { label: "Ohio Revised Code §2901.05 — Burden of proof, self-defence", url: "https://codes.ohio.gov/ohio-revised-code/section-2901.05" },
      { label: "Supreme Court of Ohio — Domestic Violence Program", url: "https://www.supremecourt.ohio.gov/courts/services-to-courts/domestic-violence/" },
    ],
  },

  "criminal-law/new-york/domestic-violence-charges": {
    summary:
      "New York has no single offence called 'domestic violence'. It is a designation applied to an underlying charge — most often assault in the third degree, criminal contempt, harassment or strangulation — when the parties are members of the same family or household under CPL §530.11. That designation routes the case to a specialised part, triggers a mandatory order of protection at arraignment, and adds firearm surrender obligations.",
    sections: [
      {
        heading: "The charges that carry the DV designation",
        table: {
          columns: ["Offence", "Penal Law", "Level", "Maximum"],
          rows: [
            ["Harassment 2nd", "§240.26", "Violation", "15 days jail"],
            ["Assault 3rd", "§120.00", "Class A misdemeanour", "1 year jail"],
            ["Criminal obstruction of breathing", "§121.11", "Class A misdemeanour", "1 year jail"],
            ["Strangulation 2nd", "§121.12", "Class D felony", "7 years prison"],
            ["Criminal contempt 2nd (order violation)", "§215.50", "Class A misdemeanour", "1 year jail"],
            ["Criminal contempt 1st", "§215.51", "Class E felony", "4 years prison"],
            ["Aggravated family offence", "§240.75", "Class E felony", "4 years prison"],
          ],
        },
      },
      {
        heading: "Orders of protection and firearm surrender",
        facts: [
          { label: "Issued at", value: "Arraignment, almost always, under CPL §530.12 — full (stay-away) or limited (no offensive conduct)." },
          { label: "Full order effect", value: "Excludes you from a shared home, workplace and school regardless of whose name is on the lease." },
          { label: "Firearms", value: "Surrender is mandatory on a full order and on conviction of a qualifying offence — CPL §530.14 and Penal Law §400.00." },
          { label: "Violation", value: "Charged as criminal contempt; a new arrest even for an invited visit." },
          { label: "Modification", value: "Only a judge can change or lift the order; the complainant cannot consent it away." },
          { label: "Family Court parallel track", value: "A family offence petition under FCA Art. 8 can run simultaneously with the criminal case." },
        ],
      },
      {
        heading: "Discovery and speedy-trial clocks after the 2020 reform",
        bullets: [
          "CPL §245.20 requires automatic prosecution disclosure — body-worn camera, 911 audio, police paperwork, and impeachment material — within statutory timeframes after arraignment.",
          "The prosecution's certificate of compliance is a precondition to a valid statement of readiness, so discovery failures directly drive CPL §30.30 dismissal motions.",
          "Most DV misdemeanours are non-qualifying offences for bail, so release on recognisance or non-monetary conditions is the norm; conditions can still include supervision and an electronic monitor.",
          "Desk appearance tickets are common for lower-level charges but the order of protection still issues at the first appearance.",
        ],
      },
      {
        heading: "Programmes and dispositions",
        bullets: [
          "Adjournment in contemplation of dismissal (CPL §170.55) dismisses and seals the case after six months — but a DV-designated ACD runs for up to one year under §170.55(2).",
          "Integrated Domestic Violence (IDV) Parts hear the criminal case, the family offence petition and any custody or divorce matter before one judge in most counties.",
          "Batterer's intervention or abusive-partner intervention programmes are typically required as part of a plea or conditional discharge; completion is verified before dismissal.",
          "A conviction for a qualifying misdemeanour triggers the federal firearms ban under 18 U.S.C. §922(g)(9), which no state sealing remedy reverses.",
        ],
      },
      {
        heading: "Sealing and immigration exposure",
        bullets: [
          "CPL §160.59 sealing is discretionary, available ten years after sentence for most convictions, and excludes violent felonies and sex offences.",
          "Dismissals and ACDs are sealed automatically under CPL §160.50/§160.55 — one of the strongest arguments for holding out for an ACD rather than pleading to a violation.",
          "Non-citizens should assume any DV conviction, including a violation-level plea coupled with an order of protection finding, creates removal exposure under 8 U.S.C. §1227(a)(2)(E).",
          "New York City Housing Authority tenancy, professional licensing and gun licences are each affected before any sentence is served.",
        ],
      },
    ],
    sources: [
      { label: "NY Criminal Procedure Law §530.12 — Protection for family offences", url: "https://www.nysenate.gov/legislation/laws/CPL/530.12" },
      { label: "NY Penal Law Article 120 — Assault and related offences", url: "https://www.nysenate.gov/legislation/laws/PEN/P3TIH" },
      { label: "NY Courts — Integrated Domestic Violence Parts", url: "https://ww2.nycourts.gov/courts/problem_solving/idv/home.shtml" },
      { label: "NY Office for the Prevention of Domestic Violence", url: "https://opdv.ny.gov/" },
    ],
  },

  "insurance-law/colorado/subrogation-explained": {
    summary:
      "Colorado is one of the strongest anti-subrogation states in the country. C.R.S. §10-1-135 bars most health insurers, plans and providers from taking a share of your personal-injury recovery until you have been fully compensated, and it forces any lien that does survive to carry its share of your attorney's fees and costs. Knowing which of your liens is state-regulated and which is federal or ERISA-governed decides how much of a settlement you actually keep.",
    sections: [
      {
        heading: "The Colorado rule in one table",
        table: {
          columns: ["Payer type", "Can it subrogate?", "Governing rule"],
          rows: [
            ["Colorado-regulated health plan", "Only after you are made whole", "C.R.S. §10-1-135(3)"],
            ["Hospital or provider lien", "Limited; cannot bypass the made-whole rule", "C.R.S. §10-1-135, §38-27-101"],
            ["Self-funded ERISA plan", "Often yes — federal preemption", "29 U.S.C. §1132(a)(3); US Airways v. McCutchen"],
            ["Medicare", "Yes — statutory right of recovery", "42 U.S.C. §1395y(b)(2)"],
            ["Colorado Medicaid (HCPF)", "Yes, with statutory allocation limits", "C.R.S. §25.5-4-301"],
            ["Med-pay under your auto policy", "Reimbursement restricted", "C.R.S. §10-4-635 and §10-1-135"],
            ["Workers' compensation carrier", "Yes — statutory subrogation", "C.R.S. §8-41-203"],
          ],
        },
      },
      {
        heading: "Made whole and the common-fund reduction",
        bullets: [
          "'Made whole' means fully compensated for all elements of the loss — medical bills, lost income, pain and suffering, future care — not merely reimbursed for the bills the plan paid.",
          "Because most injury cases settle for policy limits well below full value, the made-whole doctrine defeats a large share of Colorado liens outright.",
          "Where a lien is valid, the common-fund doctrine requires the lienholder to bear a pro-rata share of the fees and costs that created the recovery, typically reducing it by roughly a third plus costs.",
          "C.R.S. §10-1-135(10) also bars a payer from reducing your benefits or refusing future coverage because you would not sign a subrogation agreement.",
        ],
      },
      {
        heading: "Federal liens that Colorado law does not touch",
        facts: [
          { label: "Medicare conditional payments", value: "Report the claim to the Benefits Coordination and Recovery Center; a final demand must be resolved before disbursement." },
          { label: "Medicare appeal window", value: "120 days from the demand letter to request redetermination; waiver and compromise requests are separate remedies." },
          { label: "Self-funded ERISA plans", value: "Enforce plan terms as written; equitable defences such as made-whole apply only if the plan document does not disclaim them." },
          { label: "Insured (fully funded) ERISA plans", value: "Generally subject to Colorado insurance law under the savings clause — request the plan document and Form 5500 to tell which you have." },
          { label: "TRICARE / VA / FEHB", value: "Federal recovery rights under the Federal Medical Care Recovery Act; negotiate through the agency, not the plan administrator." },
        ],
      },
      {
        heading: "Colorado auto rules that interact with liens",
        bullets: [
          "Colorado is an at-fault state with minimum liability limits of 25/50/15; med-pay of at least $5,000 must be offered and applies regardless of fault unless rejected in writing (C.R.S. §10-4-635).",
          "UM/UIM must be offered in an amount equal to liability limits and can be stacked in some policy structures; UIM in Colorado is not reduced by the at-fault driver's payment (C.R.S. §10-4-609).",
          "The collateral-source rule (C.R.S. §13-21-111.6) keeps most insurance payments out of evidence, but its contract exception is what allows a valid subrogation claim to be repaid.",
          "Personal-injury suits must be filed within 2 years; motor-vehicle claims get 3 years under C.R.S. §13-80-101(1)(n).",
        ],
      },
      {
        heading: "How to reduce a lien in practice",
        bullets: [
          "Demand the plan document and summary plan description in writing — self-funded status is asserted far more often than it is documented.",
          "Itemise the ledger and strike charges unrelated to the crash; duplicate and post-treatment billing is common on large hospital liens.",
          "Apply the common-fund reduction in your first response letter rather than after the payer states a number.",
          "For Medicaid, request the statutory allocation limited to the medical portion of the recovery; for Medicare, ask for a pre-settlement conditional payment letter early so disbursement is not delayed for months.",
          "Get every reduction confirmed in writing before funds leave the trust account — verbal agreements are routinely disavowed on audit.",
        ],
      },
    ],
    sources: [
      { label: "C.R.S. §10-1-135 — Payment of benefits; subrogation limits", url: "https://law.justia.com/codes/colorado/title-10/insurance-general-provisions/article-1/part-1/section-10-1-135/" },
      { label: "Colorado Division of Insurance", url: "https://doi.colorado.gov/" },
      { label: "CMS — Medicare Secondary Payer recovery process", url: "https://www.cms.gov/medicare/coordination-benefits-recovery/overview" },
      { label: "Colorado Department of Health Care Policy and Financing — third-party liability", url: "https://hcpf.colorado.gov/" },
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
