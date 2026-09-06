/**
 * English-language common-law jurisdictions outside the US.
 *
 * Powers /international (hub) and /international/:slug (country pages).
 * Figures are compiled from the statutes and government guidance cited in
 * each `sources` list. Keep `lastVerified` in sync when values change.
 */

export interface DeadlineRow {
  claim: string;
  limit: string;
  authority: string;
}

export interface TopicBlock {
  id: string;
  heading: string;
  /** 2–4 substantial paragraphs of plain-English explanation. */
  body: string[];
  /** Practical next steps a reader can act on today. */
  steps?: string[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface InternationalJurisdiction {
  slug: string;
  country: string;
  /** ISO 3166-1 alpha-2, used for schema areaServed. */
  code: string;
  currency: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  /** Headline stats shown as a strip near the top. */
  quickFacts: { label: string; value: string; note?: string }[];
  deadlines: DeadlineRow[];
  topics: TopicBlock[];
  /** Small-claims / low-value civil track summary. */
  smallClaims: { limit: string; court: string; fee: string; note: string };
  faqs: Faq[];
  /** Official regulators and free-advice bodies. */
  helpBodies: { name: string; role: string; url: string }[];
  sources: { name: string; url: string }[];
  /** US pages that answer the equivalent question, for cross-linking. */
  relatedUsPaths: { path: string; label: string }[];
  lastVerified: string;
}

export const INTERNATIONAL_LAST_VERIFIED = "2026-09-02";

export const internationalJurisdictions: InternationalJurisdiction[] = [
  {
    slug: "united-kingdom",
    country: "United Kingdom",
    code: "GB",
    currency: "GBP",
    tagline: "Employment tribunals, injury limitation periods and the small claims track",
    metaTitle: "UK Legal Guide — Claim Deadlines, Employment Tribunals & Small Claims",
    metaDescription:
      "Plain-English UK legal reference: limitation periods for injury and contract claims, employment tribunal time limits and awards, small claims track limits and fees, and where to get free advice.",
    intro: [
      "England and Wales, Scotland and Northern Ireland run separate court systems, so the same dispute can carry different deadlines depending on where it arises. The figures below are for England and Wales unless a row says otherwise, with Scottish differences flagged because they are the ones people miss most often.",
      "Two numbers decide almost every UK claim before the merits are ever argued: the limitation period (how long you have to start a claim) and the value threshold (which track or tribunal hears it). Get those wrong and a strong case is dismissed without a hearing.",
    ],
    quickFacts: [
      { label: "Personal injury limitation", value: "3 years", note: "From the injury or date of knowledge" },
      { label: "Employment tribunal", value: "3 months less 1 day", note: "Most unfair dismissal and discrimination claims" },
      { label: "Small claims track", value: "£10,000", note: "£1,000 for most personal injury" },
      { label: "Breach of contract", value: "6 years", note: "5 years in Scotland" },
    ],
    deadlines: [
      { claim: "Personal injury (negligence)", limit: "3 years", authority: "Limitation Act 1980 s.11" },
      { claim: "Breach of contract", limit: "6 years (5 in Scotland)", authority: "Limitation Act 1980 s.5" },
      { claim: "Unfair dismissal", limit: "3 months less one day", authority: "Employment Rights Act 1996 s.111" },
      { claim: "Discrimination (employment)", limit: "3 months less one day", authority: "Equality Act 2010 s.123" },
      { claim: "Redundancy pay claim", limit: "6 months", authority: "Employment Rights Act 1996 s.164" },
      { claim: "Fatal accident claim", limit: "3 years from death", authority: "Limitation Act 1980 s.12" },
      { claim: "Defamation", limit: "1 year", authority: "Limitation Act 1980 s.4A" },
      { claim: "Judicial review", limit: "3 months, promptly", authority: "CPR 54.5" },
    ],
    topics: [
      {
        id: "employment",
        heading: "Employment claims: the three-month trap and what a tribunal pays",
        body: [
          "Nearly every employment tribunal claim in Great Britain must be started within three months less one day of the act complained of — the dismissal date for unfair dismissal, the discriminatory act for Equality Act claims. This is far shorter than most civil deadlines, and tribunals only extend it where it was 'not reasonably practicable' to file in time (unfair dismissal) or where it is 'just and equitable' (discrimination).",
          "Before you can lodge, you must notify Acas for Early Conciliation. That step pauses the clock: the days between notification and the Acas certificate do not count, and you get at least one month from the certificate date. People lose valid claims by treating conciliation as optional or by waiting for an internal appeal outcome, which does not extend the deadline.",
          "Compensation has two parts. A basic award mirrors statutory redundancy pay (up to 1.5 weeks' pay per year of service, subject to a statutory weekly cap). A compensatory award covers lost earnings and is capped at the lower of 52 weeks' pay or the statutory maximum — except in discrimination, whistleblowing and health-and-safety dismissals, where there is no cap and injury-to-feelings awards apply under the Vento bands.",
        ],
        steps: [
          "Diarise the deadline as dismissal date minus one day, three months on — not 'about three months'.",
          "Notify Acas Early Conciliation immediately; it is free and stops the clock.",
          "Keep the written reason for dismissal (you can request one after two years' service).",
          "Calculate your loss weekly: net pay, pension, benefits, and mitigation from job applications.",
        ],
      },
      {
        id: "injury",
        heading: "Personal injury: limitation, whiplash tariffs and the fixed-costs regime",
        body: [
          "The general personal injury limitation period is three years from the injury, or from the 'date of knowledge' where harm surfaces later — the standard route for disease and exposure claims. For children the clock does not start until their eighteenth birthday, and for people who lack capacity it may not run at all.",
          "Low-value road traffic injuries in England and Wales are handled through the Official Injury Claim portal, with whiplash damages set by a fixed tariff rather than judicial discretion. That tariff pays materially less than pre-2021 awards, so the value of a claim now turns on proving additional injuries and financial losses rather than on negotiating the whiplash element.",
          "Costs shifting matters as much as damages. Qualified one-way costs shifting means a losing claimant usually does not pay the defendant's costs, but that protection can be lost for fundamental dishonesty. Extended fixed recoverable costs now apply to most claims up to £100,000, which shapes what solicitors will take on.",
        ],
      },
      {
        id: "consumer-housing",
        heading: "Consumer rights and renting: the remedies people forget they have",
        body: [
          "Under the Consumer Rights Act 2015 goods must be of satisfactory quality, fit for purpose and as described. You have a short-term right to reject within 30 days for a full refund; after that the retailer gets one chance to repair or replace before you can reject or claim a price reduction. The claim is against the retailer, not the manufacturer, and a credit-card purchase over £100 also gives a parallel claim against the card issuer under s.75 of the Consumer Credit Act 1974.",
          "For renters in England, deposits must sit in a government-approved protection scheme within 30 days, with prescribed information served on the tenant. Failure exposes the landlord to a penalty of one to three times the deposit and can block a s.21 possession notice entirely. Tenants can also pursue a rent repayment order where a landlord commits certain offences, such as letting an unlicensed HMO.",
        ],
      },
    ],
    smallClaims: {
      limit: "£10,000 (£1,000 most personal injury, £5,000 RTA whiplash)",
      court: "County Court small claims track (Sheriff Court simple procedure in Scotland, up to £5,000)",
      fee: "£35–£455 depending on claim value, issued online via Money Claim Online",
      note: "Winners recover the court fee and limited fixed costs, but not solicitor fees — which is why the track is designed for litigants in person.",
    },
    faqs: [
      {
        question: "How long do I have to bring a UK employment claim?",
        answer:
          "Three months less one day from the dismissal or the act you are complaining about, for both unfair dismissal and discrimination. You must first notify Acas for Early Conciliation, which pauses the clock and guarantees you at least one month from the date of the Acas certificate.",
      },
      {
        question: "What is the small claims limit in the UK?",
        answer:
          "£10,000 in the County Court small claims track in England and Wales, but only £1,000 for most personal injury claims and £5,000 for road traffic whiplash. Scotland uses simple procedure in the Sheriff Court with a £5,000 limit.",
      },
      {
        question: "Do I need a solicitor for a small claim?",
        answer:
          "No. The small claims track is built for people representing themselves, and you generally cannot recover solicitor fees even if you win — so paying for representation rarely makes economic sense below a few thousand pounds.",
      },
      {
        question: "Is the UK limitation period ever extended?",
        answer:
          "Yes. Time runs from the date of knowledge in disease and latent-damage claims, does not start for children until age 18, and can be disapplied for personal injury under s.33 of the Limitation Act where it is equitable. None of these should be relied on as a plan.",
      },
    ],
    helpBodies: [
      { name: "Acas", role: "Free employment conciliation and advice", url: "https://www.acas.org.uk" },
      { name: "Citizens Advice", role: "Free consumer, housing and benefits advice", url: "https://www.citizensadvice.org.uk" },
      { name: "Financial Ombudsman Service", role: "Free complaints about banks and insurers", url: "https://www.financial-ombudsman.org.uk" },
      { name: "Legal Ombudsman", role: "Complaints about solicitors", url: "https://www.legalombudsman.org.uk" },
    ],
    sources: [
      { name: "Limitation Act 1980", url: "https://www.legislation.gov.uk/ukpga/1980/58" },
      { name: "Employment Rights Act 1996", url: "https://www.legislation.gov.uk/ukpga/1996/18" },
      { name: "Equality Act 2010", url: "https://www.legislation.gov.uk/ukpga/2010/15" },
      { name: "Consumer Rights Act 2015", url: "https://www.legislation.gov.uk/ukpga/2015/15" },
      { name: "HMCTS civil court fees (EX50)", url: "https://www.gov.uk/government/publications/fees-in-the-civil-and-family-courts-main-fees-ex50" },
    ],
    relatedUsPaths: [
      { path: "/statute-of-limitations-by-state", label: "US statute of limitations by state" },
      { path: "/wrongful-termination-settlements", label: "US wrongful termination settlements" },
      { path: "/tools/employment/severance-pay-calculator", label: "Severance pay calculator" },
    ],
    lastVerified: INTERNATIONAL_LAST_VERIFIED,
  },
  {
    slug: "ireland",
    country: "Ireland",
    code: "IE",
    currency: "EUR",
    tagline: "Injuries Resolution Board, WRC claims and the District Court small claims procedure",
    metaTitle: "Ireland Legal Guide — Injury Claim Deadlines, WRC Cases & Small Claims",
    metaDescription:
      "Irish legal reference in plain English: two-year injury limitation, the Injuries Resolution Board process, Workplace Relations Commission time limits and awards, small claims procedure and fees.",
    intro: [
      "Ireland pairs a short limitation clock with a compulsory assessment step, which catches people out in both directions. Personal injury claims must be started within two years, and almost all of them must first go through the Injuries Resolution Board rather than straight to court.",
      "Employment disputes run through the Workplace Relations Commission on a six-month clock, extendable to twelve months for reasonable cause. Consumer and small-value disputes have their own low-cost route with a fixed €25 fee.",
    ],
    quickFacts: [
      { label: "Personal injury limitation", value: "2 years", note: "From injury or date of knowledge" },
      { label: "WRC complaint", value: "6 months", note: "Extendable to 12 for reasonable cause" },
      { label: "Small claims limit", value: "€2,000", note: "€25 application fee" },
      { label: "Contract claims", value: "6 years", note: "Statute of Limitations 1957" },
    ],
    deadlines: [
      { claim: "Personal injury", limit: "2 years", authority: "Civil Liability and Courts Act 2004 s.7" },
      { claim: "Breach of contract", limit: "6 years", authority: "Statute of Limitations 1957 s.11" },
      { claim: "Unfair dismissal", limit: "6 months (12 for reasonable cause)", authority: "Unfair Dismissals Acts 1977–2015" },
      { claim: "Employment equality", limit: "6 months (12 for reasonable cause)", authority: "Employment Equality Acts 1998–2021" },
      { claim: "Payment of wages", limit: "6 months", authority: "Payment of Wages Act 1991" },
      { claim: "Defamation", limit: "1 year (extendable to 2)", authority: "Defamation Act 2009 s.38" },
    ],
    topics: [
      {
        id: "injuries-board",
        heading: "The Injuries Resolution Board: the step you cannot skip",
        body: [
          "Except for medical negligence, personal injury claims in Ireland must be submitted to the Injuries Resolution Board before proceedings can be issued. The Board assesses the claim on paper using the Personal Injuries Guidelines, and the limitation clock is paused from the date your application is acknowledged until the authorisation issues.",
          "Either side can reject the assessment, and the Board then issues an authorisation letting you go to court. Rejecting is not free: if you refuse an assessment and later recover no more in court, you can face adverse cost consequences. That risk is what makes the Board's figure the practical anchor for settlement.",
          "The Personal Injuries Guidelines replaced the old Book of Quantum and reduced awards for minor injuries substantially, while keeping higher awards for serious harm. Damages are assessed by reference to the dominant injury, with an uplift for additional injuries rather than a simple sum of each.",
        ],
        steps: [
          "Get a medical report early — the Board cannot assess without one.",
          "Apply to the Injuries Resolution Board within two years of the accident.",
          "Track special damages: lost earnings, medical expenses, travel and care.",
          "Only reject an assessment after weighing the cost risk of doing worse in court.",
        ],
      },
      {
        id: "wrc",
        heading: "Workplace Relations Commission: unfair dismissal, wages and equality",
        body: [
          "The WRC hears most Irish employment complaints. The standard deadline is six months from the contravention, extendable to twelve months only where you show reasonable cause — ignorance of the deadline is not reasonable cause.",
          "Unfair dismissal normally requires twelve months' continuous service, but that requirement falls away for dismissals connected to trade union membership, pregnancy, protected disclosures and statutory rights. Remedies are reinstatement, re-engagement or compensation of up to two years' remuneration for financial loss; where there is no financial loss, awards are capped at four weeks' pay.",
          "Equality claims under the Employment Equality Acts carry a separate maximum of two years' pay, and for non-employees or where no loss is shown the WRC can award compensation for the effects of discrimination. Hearings are largely in public and decisions are published, which matters for reputational strategy on both sides.",
        ],
      },
      {
        id: "consumer",
        heading: "Consumer protection and the small claims procedure",
        body: [
          "The Consumer Rights Act 2022 modernised Irish consumer law: goods must be of the required quality, and for the first six months a defect is presumed to have existed at delivery, shifting the burden to the trader. Digital content and services now carry their own conformity rules, including a right to updates.",
          "The small claims procedure handles consumer claims up to €2,000 for a €25 fee, filed online. It also covers business-to-business claims of the same value. A registrar first tries to settle the case; only unresolved claims go before a District Court judge, which keeps the process fast and largely paperwork-driven.",
        ],
      },
    ],
    smallClaims: {
      limit: "€2,000",
      court: "District Court small claims procedure",
      fee: "€25",
      note: "Filed online through the Courts Service; a registrar attempts settlement before any hearing, and legal representation is unusual.",
    },
    faqs: [
      {
        question: "How long do I have to make a personal injury claim in Ireland?",
        answer:
          "Two years from the date of the accident or the date you first knew you were injured. You must apply to the Injuries Resolution Board within that window; the clock pauses while the Board holds the claim.",
      },
      {
        question: "What is the maximum WRC unfair dismissal award?",
        answer:
          "Up to two years' remuneration for financial loss. If you suffered no financial loss, the maximum is four weeks' pay, so evidencing lost earnings and job-search effort drives the value.",
      },
      {
        question: "Can I skip the Injuries Resolution Board?",
        answer:
          "Only for medical negligence claims and a narrow set of exceptions. For everything else, issuing court proceedings without a Board authorisation means the case can be struck out.",
      },
    ],
    helpBodies: [
      { name: "Injuries Resolution Board", role: "Statutory assessment of injury claims", url: "https://www.irb.ie" },
      { name: "Workplace Relations Commission", role: "Employment complaints and mediation", url: "https://www.workplacerelations.ie" },
      { name: "Citizens Information", role: "Free plain-English legal information", url: "https://www.citizensinformation.ie" },
      { name: "Competition and Consumer Protection Commission", role: "Consumer rights enforcement", url: "https://www.ccpc.ie" },
    ],
    sources: [
      { name: "Statute of Limitations 1957", url: "https://www.irishstatutebook.ie/eli/1957/act/6/enacted/en/html" },
      { name: "Civil Liability and Courts Act 2004", url: "https://www.irishstatutebook.ie/eli/2004/act/31/enacted/en/html" },
      { name: "Consumer Rights Act 2022", url: "https://www.irishstatutebook.ie/eli/2022/act/37/enacted/en/html" },
      { name: "Courts Service — small claims", url: "https://www.courts.ie/small-claims" },
    ],
    relatedUsPaths: [
      { path: "/personal-injury-settlements", label: "US personal injury settlement values" },
      { path: "/eu-forms", label: "EU legal forms & GDPR packs" },
      { path: "/eu-tools", label: "European employment calculators" },
    ],
    lastVerified: INTERNATIONAL_LAST_VERIFIED,
  },
  {
    slug: "canada",
    country: "Canada",
    code: "CA",
    currency: "CAD",
    tagline: "Provincial limitation periods, wrongful dismissal notice and small claims limits",
    metaTitle: "Canada Legal Guide — Limitation Periods, Wrongful Dismissal & Small Claims",
    metaDescription:
      "Canadian legal reference by province: basic limitation periods, wrongful dismissal common-law notice versus statutory minimums, small claims court limits and fees, and free advice bodies.",
    intro: [
      "Canadian civil law is provincial, so the answer to 'how long do I have?' and 'which court?' changes at every border. Most common-law provinces have converged on a two-year basic limitation period running from discovery, with Quebec's Civil Code taking a different structure and a three-year prescription for most personal actions.",
      "The single biggest money question for Canadian employees is dismissal. Employment standards legislation sets a floor of notice and severance; the common law usually sets a far higher ceiling, and the gap between the two is where most negotiated settlements land.",
    ],
    quickFacts: [
      { label: "Basic limitation", value: "2 years", note: "From discovery, most common-law provinces" },
      { label: "Quebec prescription", value: "3 years", note: "Civil Code of Québec art. 2925" },
      { label: "Common-law notice", value: "Up to 24 months", note: "Rarely exceeded absent special factors" },
      { label: "Small claims (ON)", value: "$35,000", note: "Varies widely by province" },
    ],
    deadlines: [
      { claim: "Most civil claims (ON, AB, BC, SK, NS)", limit: "2 years from discovery", authority: "Provincial Limitations Acts" },
      { claim: "Most personal actions (QC)", limit: "3 years", authority: "Civil Code of Québec art. 2925" },
      { claim: "Ultimate limitation", limit: "15 years (ON) / 10 years (AB)", authority: "Limitations Act, 2002 s.15" },
      { claim: "Human rights complaint (ON)", limit: "1 year", authority: "Human Rights Code s.34" },
      { claim: "Unjust dismissal (federal)", limit: "90 days", authority: "Canada Labour Code s.240" },
      { claim: "Claim against a municipality (ON)", limit: "10-day notice for ice/snow", authority: "Municipal Act, 2001 s.44" },
    ],
    topics: [
      {
        id: "dismissal",
        heading: "Wrongful dismissal: statutory minimums versus common-law notice",
        body: [
          "Every province sets statutory minimum notice or pay in lieu — typically one week per year of service up to a low ceiling, with Ontario adding statutory severance for longer-service employees at larger employers. Employers often present this minimum as 'your entitlement'. It is only the floor.",
          "Unless a valid enforceable termination clause limits it, the common law implies reasonable notice assessed on the Bardal factors: length of service, character of employment, age, and availability of similar work. Awards commonly land between three and twenty-four months, and courts have repeatedly struck down termination clauses that could, in any scenario, pay less than the statutory minimum — which revives the full common-law entitlement.",
          "Notice damages cover total compensation, not just base salary: bonus, commissions, pension contributions and benefits over the notice period. Employees must mitigate by looking for comparable work, and earnings during the notice period are usually deducted — but a signed release given for the statutory minimum can end the claim entirely, which is why the release is the document to slow down on.",
        ],
        steps: [
          "Do not sign the release on the day you are terminated.",
          "Check whether the termination clause is enforceable — many are not.",
          "Value total compensation over the notice period, not just salary.",
          "Keep a documented job-search record; mitigation evidence protects the claim.",
        ],
      },
      {
        id: "injury",
        heading: "Injury claims, auto insurance and the provincial patchwork",
        body: [
          "Auto injury compensation differs sharply by province. British Columbia, Manitoba, Saskatchewan and Quebec run public insurers with substantial no-fault benefits and restricted tort rights; Ontario blends statutory accident benefits with a tort claim subject to a verbal threshold and a statutory deductible on pain-and-suffering awards; Alberta caps damages for minor injuries under its Minor Injury Regulation.",
          "For non-motor injuries, the two-year discovery clock applies in most provinces, and notice requirements can be far shorter — municipal slip-and-fall claims in Ontario require written notice of an ice or snow claim within ten days, a trap that eliminates otherwise valid claims every winter.",
          "Non-pecuniary damages across Canada remain subject to the Supreme Court's rough upper limit from the 1978 trilogy, indexed for inflation. That ceiling means catastrophic-injury value in Canada is driven by future care costs and lost earning capacity rather than by pain-and-suffering awards.",
        ],
      },
      {
        id: "small-claims",
        heading: "Small claims court: the limits that decide your venue",
        body: [
          "Small claims limits vary more than any other Canadian civil number: Ontario hears claims up to $35,000, Alberta up to $100,000, British Columbia up to $35,000 in Provincial Court with a Civil Resolution Tribunal handling claims up to $5,000 online, and Quebec's small claims division handles up to $15,000 with lawyers barred from appearing.",
          "Filing fees are modest — typically under a few hundred dollars — and procedures are simplified, with settlement conferences built into the process in several provinces. Suing for slightly less than your true loss to stay inside the limit is a common and legitimate tactic, because you abandon only the excess.",
        ],
      },
    ],
    smallClaims: {
      limit: "$5,000–$100,000 depending on province (ON $35,000; AB $100,000; BC $35,000; QC $15,000)",
      court: "Provincial small claims court or civil resolution tribunal",
      fee: "Typically $75–$350 to file and set down for trial",
      note: "Quebec bars lawyers from small claims hearings; British Columbia routes many low-value disputes through an online tribunal first.",
    },
    faqs: [
      {
        question: "How much severance am I owed in Canada?",
        answer:
          "Statutory minimums are roughly one week per year of service, but unless your contract validly limits it, common-law reasonable notice applies and commonly ranges from three to twenty-four months based on service, age, role and job market.",
      },
      {
        question: "What is the limitation period in Canada?",
        answer:
          "Two years from discovery in most common-law provinces, with an ultimate long-stop of ten to fifteen years. Quebec applies a three-year prescription for most personal actions under the Civil Code.",
      },
      {
        question: "Which small claims court do I use?",
        answer:
          "The one for the province where the defendant lives or where the events happened. Limits range from $15,000 in Quebec to $100,000 in Alberta, so the venue depends on both location and claim value.",
      },
    ],
    helpBodies: [
      { name: "Canadian Human Rights Commission", role: "Federal discrimination complaints", url: "https://www.chrc-ccdp.gc.ca" },
      { name: "Employment and Social Development Canada — Labour", role: "Federal labour standards", url: "https://www.canada.ca/en/employment-social-development.html" },
      { name: "Provincial legal aid and law societies", role: "Referral and low-cost advice", url: "https://flsc.ca" },
    ],
    sources: [
      { name: "Limitations Act, 2002 (Ontario)", url: "https://www.ontario.ca/laws/statute/02l24" },
      { name: "Civil Code of Québec", url: "https://www.legisquebec.gouv.qc.ca/en/document/cs/ccq-1991" },
      { name: "Canada Labour Code", url: "https://laws-lois.justice.gc.ca/eng/acts/l-2/" },
      { name: "Ontario Small Claims Court", url: "https://www.ontario.ca/page/suing-small-claims-court" },
    ],
    relatedUsPaths: [
      { path: "/tools/employment/severance-pay-calculator", label: "Severance pay calculator" },
      { path: "/wrongful-termination-settlements", label: "US wrongful termination settlements" },
      { path: "/statute-of-limitations-by-state", label: "US statute of limitations by state" },
    ],
    lastVerified: INTERNATIONAL_LAST_VERIFIED,
  },
  {
    slug: "australia",
    country: "Australia",
    code: "AU",
    currency: "AUD",
    tagline: "Fair Work deadlines, state limitation periods and Australian Consumer Law remedies",
    metaTitle: "Australia Legal Guide — Fair Work Claims, Limitation Periods & Consumer Law",
    metaDescription:
      "Australian legal reference in plain English: 21-day unfair dismissal deadline, general protections claims, state limitation periods, Australian Consumer Law guarantees, and tribunal small claims limits.",
    intro: [
      "Australia splits legal questions between a national workplace and consumer system and eight state and territory civil systems. That means employment and consumer answers are broadly uniform nationwide, while limitation periods, tribunals and injury schemes change at each state line.",
      "The most unforgiving deadline in Australian law is the 21-day window for unfair dismissal and general protections dismissal claims in the Fair Work Commission. It is measured from the day after the dismissal takes effect, and extensions are granted only in exceptional circumstances.",
    ],
    quickFacts: [
      { label: "Unfair dismissal", value: "21 days", note: "From the day after dismissal takes effect" },
      { label: "Personal injury limitation", value: "3 years", note: "Most states, from discoverability" },
      { label: "Contract claims", value: "6 years", note: "All states and territories" },
      { label: "ACL guarantees", value: "No fixed expiry", note: "Based on reasonable durability" },
    ],
    deadlines: [
      { claim: "Unfair dismissal", limit: "21 days", authority: "Fair Work Act 2009 s.394(2)" },
      { claim: "General protections (dismissal)", limit: "21 days", authority: "Fair Work Act 2009 s.366" },
      { claim: "Unpaid wages / underpayment", limit: "6 years", authority: "Fair Work Act 2009 s.544" },
      { claim: "Personal injury (NSW, VIC, QLD)", limit: "3 years from discoverability", authority: "State Limitation Acts" },
      { claim: "Breach of contract", limit: "6 years", authority: "State Limitation Acts" },
      { claim: "Defamation", limit: "1 year", authority: "Uniform Defamation Acts" },
      { claim: "Workers compensation notice", limit: "As soon as practicable; claim within 6 months", authority: "State workers comp schemes" },
    ],
    topics: [
      {
        id: "fair-work",
        heading: "Fair Work claims: 21 days, and which claim you choose matters",
        body: [
          "Unfair dismissal applies to employees who have served the minimum employment period — six months, or twelve months with a small business employer — and who fall under the high income threshold or are covered by an award or agreement. Remedies are reinstatement first, with compensation capped at the lesser of six months' pay or half the high income threshold, and no compensation for hurt feelings.",
          "A general protections claim is different and often more valuable. It alleges adverse action because of a workplace right, a protected attribute or union activity. There is no compensation cap, uncapped damages plus civil penalties are available, and the reverse onus means the employer must prove the real reason was lawful. The same 21-day deadline applies where the claim involves dismissal.",
          "You generally cannot run both for the same dismissal, so the choice is strategic: unfair dismissal is faster and simpler with a capped outcome; general protections is broader, uncapped, and can proceed to the Federal Circuit and Family Court if conciliation fails.",
        ],
        steps: [
          "Count 21 days from the day after your last day, not from the notice letter.",
          "Decide unfair dismissal versus general protections before lodging.",
          "Collect the paper trail showing the complaint or right that preceded the action.",
          "Check for underpayments separately — those carry a six-year window.",
        ],
      },
      {
        id: "consumer",
        heading: "Australian Consumer Law: guarantees that outlive the warranty",
        body: [
          "The ACL gives every consumer statutory guarantees that cannot be excluded: goods must be of acceptable quality, fit for purpose, match their description and be supported by spare parts and repair facilities for a reasonable time. These guarantees are independent of any manufacturer warranty, so a refusal on the grounds that 'the warranty expired' is not the end of the analysis.",
          "The remedy depends on whether the failure is major. For a major failure — one a reasonable consumer would not have accepted if known, or that is unsafe or substantially unfit — the consumer chooses a refund, replacement or compensation for the drop in value. For minor failures, the supplier may choose to repair within a reasonable time, and if it fails to do so the consumer can escalate to major-failure remedies.",
          "Claims run against the supplier, with a separate route against the manufacturer for damages. Most states then provide a cheap civil tribunal — NCAT, VCAT, QCAT and their equivalents — where filing fees are modest and lawyers usually need leave to appear.",
        ],
      },
      {
        id: "injury",
        heading: "Injury and workers compensation: state schemes with hard notice rules",
        body: [
          "Each state runs its own workers compensation scheme with its own notice obligations, impairment thresholds and access to common-law damages. Common-law damages generally require crossing a whole person impairment threshold, and thresholds differ enough between states that identical injuries produce very different outcomes.",
          "Motor accident schemes are similarly state-based, mixing statutory benefits with restricted common-law claims and, in several states, a minor-injury category that limits damages. Time limits for the statutory benefit application are far shorter than the general limitation period — often 28 days to preserve full weekly benefits — so the practical deadline is the scheme's, not the court's.",
        ],
      },
    ],
    smallClaims: {
      limit: "Typically A$10,000–A$100,000 depending on tribunal and dispute type",
      court: "State civil and administrative tribunals (NCAT, VCAT, QCAT, SACAT, SAT) and Magistrates Court minor claims",
      fee: "Usually A$50–A$250 to lodge",
      note: "Legal representation generally requires the tribunal's leave, keeping costs low and hearings informal.",
    },
    faqs: [
      {
        question: "How long do I have to lodge an unfair dismissal claim in Australia?",
        answer:
          "21 days, starting the day after the dismissal takes effect. The Fair Work Commission extends this only in exceptional circumstances, so lodging late usually ends the claim regardless of merit.",
      },
      {
        question: "What is the difference between unfair dismissal and general protections?",
        answer:
          "Unfair dismissal targets a harsh, unjust or unreasonable dismissal and caps compensation at six months' pay. General protections targets adverse action taken because of a workplace right or protected attribute, has no compensation cap, and puts the onus on the employer to prove its reason.",
      },
      {
        question: "Does an expired warranty end my consumer rights?",
        answer:
          "No. Australian Consumer Law guarantees apply for a reasonable period based on the price and nature of the product, which can extend well beyond a manufacturer's warranty period.",
      },
    ],
    helpBodies: [
      { name: "Fair Work Ombudsman", role: "Free workplace rights advice and underpayment help", url: "https://www.fairwork.gov.au" },
      { name: "Fair Work Commission", role: "Unfair dismissal and general protections claims", url: "https://www.fwc.gov.au" },
      { name: "ACCC", role: "Australian Consumer Law regulator", url: "https://www.accc.gov.au" },
      { name: "Australian Financial Complaints Authority", role: "Free insurance and banking dispute resolution", url: "https://www.afca.org.au" },
    ],
    sources: [
      { name: "Fair Work Act 2009", url: "https://www.legislation.gov.au/C2009A00028/latest/text" },
      { name: "Competition and Consumer Act 2010 (Schedule 2 — ACL)", url: "https://www.legislation.gov.au/C2004A00109/latest/text" },
      { name: "Limitation Act 1969 (NSW)", url: "https://legislation.nsw.gov.au/view/html/inforce/current/act-1969-031" },
      { name: "Fair Work Commission — unfair dismissal", url: "https://www.fwc.gov.au/job-loss-dismissal" },
    ],
    relatedUsPaths: [
      { path: "/wrongful-termination-settlements", label: "US wrongful termination settlements" },
      { path: "/tools/employment/severance-pay-calculator", label: "Severance pay calculator" },
      { path: "/statute-of-limitations-by-state", label: "US statute of limitations by state" },
    ],
    lastVerified: INTERNATIONAL_LAST_VERIFIED,
  },
  {
    slug: "new-zealand",
    country: "New Zealand",
    code: "NZ",
    currency: "NZD",
    tagline: "Personal grievance deadlines, ACC's no-fault injury cover and the Disputes Tribunal",
    metaTitle: "New Zealand Legal Guide — Personal Grievance, ACC & Disputes Tribunal Limits",
    metaDescription:
      "Plain-English New Zealand legal reference: the 90-day personal grievance deadline, unjustified dismissal remedies, ACC's no-fault injury scheme, Consumer Guarantees Act rights, and Disputes Tribunal limits and fees.",
    intro: [
      "New Zealand law is unusually centralised: one national employment system, one national consumer statute and one no-fault accident scheme that replaces most personal injury litigation. That makes the answers consistent nationwide, but it also means the routes are narrower — if a claim does not fit the designated forum, there is often no alternative court remedy.",
      "Two deadlines dominate. Employment personal grievances must be raised with the employer within 90 days of the problem, and Disputes Tribunal claims sit under a fixed money limit that decides whether your dispute is cheap and informal or an expensive District Court matter.",
    ],
    quickFacts: [
      { label: "Personal grievance", value: "90 days", note: "Raised with the employer, not filed in court" },
      { label: "Disputes Tribunal limit", value: "NZ$30,000", note: "Per claim, lawyers not permitted" },
      { label: "Contract & tort limitation", value: "6 years", note: "Limitation Act 2010" },
      { label: "Injury compensation", value: "ACC, no-fault", note: "Suing for compensatory damages is barred" },
    ],
    deadlines: [
      { claim: "Personal grievance (raise with employer)", limit: "90 days", authority: "Employment Relations Act 2000 s.114" },
      { claim: "Sexual harassment grievance", limit: "12 months", authority: "Employment Relations Act 2000 s.114(1A)" },
      { claim: "Filing in the Employment Relations Authority", limit: "3 years after grievance raised", authority: "Employment Relations Act 2000 s.114(6)" },
      { claim: "Breach of contract / negligence", limit: "6 years", authority: "Limitation Act 2010 s.11" },
      { claim: "Late knowledge longstop", limit: "15 years", authority: "Limitation Act 2010 s.11(3)" },
      { claim: "Human Rights Commission complaint", limit: "12 months", authority: "Human Rights Act 1993 s.79" },
      { claim: "Residential tenancy claim", limit: "12 months from breach", authority: "Residential Tenancies Act 1986" },
    ],
    topics: [
      {
        id: "personal-grievance",
        heading: "The 90-day personal grievance clock — and what 'raising' actually means",
        body: [
          "A personal grievance covers unjustified dismissal, unjustified disadvantage, discrimination, harassment and duress. The 90-day period runs from the date the action occurred or came to your notice, and the step you must take within it is raising the grievance with the employer — a letter or email that identifies the problem and says you are raising a personal grievance is enough. You do not need to have filed anything with the Employment Relations Authority in that window.",
          "Miss the 90 days and you need the employer's consent or the Authority's leave for exceptional circumstances, which is granted sparingly. Sexual harassment grievances carry a longer 12-month window, and once a grievance is validly raised you generally have three years to file with the Authority.",
          "The test for dismissal is justification: what a fair and reasonable employer could have done in all the circumstances. Process failures alone can make an otherwise defensible dismissal unjustified, which is why remedies frequently turn on whether the employer investigated, put allegations to the employee and genuinely considered the response.",
        ],
        steps: [
          "Put the grievance in writing within 90 days, dated, and keep proof of sending.",
          "Name the specific action — dismissal, disadvantage, discrimination — and what you want.",
          "Request your personal file and the investigation documents under the Privacy Act.",
          "Use free mediation through MBIE before filing with the Authority.",
        ],
      },
      {
        id: "acc",
        heading: "ACC: no-fault cover instead of a personal injury claim",
        body: [
          "New Zealand's Accident Compensation scheme covers personal injury by accident, work-related conditions and treatment injury, and in exchange bars claims for compensatory damages for those injuries. Instead of suing, you lodge an ACC claim, usually through the treating doctor, and receive treatment costs, weekly compensation at 80% of pre-injury earnings, and lump sums for permanent impairment.",
          "Because litigation is off the table for the injury itself, disputes are about entitlement and cover: whether the injury is accident-related rather than degenerative, whether earnings were calculated correctly, and whether a treatment injury is established. The route is a review application within three months of the decision, then appeal to the District Court.",
          "Exemplary damages remain available in rare cases of outrageous conduct, and claims for mental injury not tied to a covered physical injury, or for non-injury losses such as lost property, sit outside the bar.",
        ],
        steps: [
          "Lodge the ACC claim through your GP or the treatment provider immediately.",
          "Challenge a declined claim by filing a review within three months of the decision letter.",
          "Ask for an independent medical assessment if cover is refused as degenerative.",
        ],
      },
      {
        id: "consumer",
        heading: "Consumer Guarantees Act and the Disputes Tribunal",
        body: [
          "The Consumer Guarantees Act gives buyers guarantees of acceptable quality, fitness for purpose and correspondence with description, and those guarantees cannot be contracted out of in consumer sales. As in Australia, the remedy depends on whether the failure is substantial: substantial failures let the consumer reject the goods for a refund or claim compensation; minor ones give the supplier a chance to repair within a reasonable time.",
          "The Disputes Tribunal hears claims up to NZ$30,000, decides them by referees rather than judges, and does not allow lawyers to appear. Filing fees are tiered by claim value, hearings are informal, and orders are enforceable in the District Court. Appeals are limited to procedural unfairness, not disagreement with the outcome.",
          "For faulty services and misleading conduct, the Fair Trading Act adds a separate route with Commerce Commission enforcement, useful where the loss is small but the conduct is systemic.",
        ],
      },
    ],
    smallClaims: {
      limit: "NZ$30,000",
      court: "Disputes Tribunal",
      fee: "NZ$59 to NZ$234 depending on claim value",
      note: "Lawyers cannot represent parties in the Disputes Tribunal, which keeps costs low; appeals are limited to unfair conduct of the hearing.",
    },
    faqs: [
      {
        question: "How long do I have to raise a personal grievance in New Zealand?",
        answer:
          "90 days from the date the problem happened or came to your notice. You raise it with the employer in writing — you do not need to have filed with the Employment Relations Authority within that period. Sexual harassment grievances have a 12-month window.",
      },
      {
        question: "Can I sue for a personal injury in New Zealand?",
        answer:
          "Generally no. ACC provides no-fault cover for personal injury and bars claims for compensatory damages. You claim through ACC instead, and challenge declined entitlements through the review and District Court appeal process.",
      },
      {
        question: "What is the Disputes Tribunal limit?",
        answer:
          "NZ$30,000 per claim. Lawyers are not permitted to appear, filing fees run from about NZ$59 to NZ$234 depending on the amount claimed, and a referee decides the case informally.",
      },
    ],
    helpBodies: [
      { name: "Employment New Zealand (MBIE)", role: "Free employment rights information and mediation", url: "https://www.employment.govt.nz" },
      { name: "ACC", role: "Accident compensation claims and reviews", url: "https://www.acc.co.nz" },
      { name: "Disputes Tribunal", role: "Low-cost civil claims up to NZ$30,000", url: "https://www.disputestribunal.govt.nz" },
      { name: "Citizens Advice Bureau NZ", role: "Free general legal and consumer advice", url: "https://www.cab.org.nz" },
      { name: "Community Law Centres", role: "Free legal help for people who cannot afford a lawyer", url: "https://communitylaw.org.nz" },
    ],
    sources: [
      { name: "Employment Relations Act 2000", url: "https://www.legislation.govt.nz/act/public/2000/0024/latest/DLM58316.html" },
      { name: "Limitation Act 2010", url: "https://www.legislation.govt.nz/act/public/2010/0110/latest/DLM2033100.html" },
      { name: "Consumer Guarantees Act 1993", url: "https://www.legislation.govt.nz/act/public/1993/0091/latest/DLM311053.html" },
      { name: "Disputes Tribunal — fees and limits", url: "https://www.disputestribunal.govt.nz" },
    ],
    relatedUsPaths: [
      { path: "/wrongful-termination-settlements", label: "US wrongful termination settlements" },
      { path: "/tools/employment/severance-pay-calculator", label: "Severance pay calculator" },
      { path: "/data/court-filing-fees", label: "US court filing fees by state" },
    ],
    lastVerified: INTERNATIONAL_LAST_VERIFIED,
  },
  {
    slug: "south-africa",
    country: "South Africa",
    code: "ZA",
    currency: "ZAR",
    tagline: "CCMA referral deadlines, BCEA notice and severance rules, and the free Small Claims Court",
    metaTitle: "South Africa Legal Guide — CCMA Deadlines, BCEA Notice & Small Claims Court",
    metaDescription:
      "Plain-English South African legal reference: 30-day CCMA unfair dismissal referrals, BCEA notice periods and severance pay, prescription periods, Consumer Protection Act rights, and the free Small Claims Court.",
    intro: [
      "South African employment law is unusually protective and unusually deadline-driven. Dismissal disputes go to the CCMA or a bargaining council rather than a court, and the referral window is short — 30 days for unfair dismissal, 90 days for unfair labour practice — measured from the date the dispute arose.",
      "Outside employment, the Prescription Act sets a general three-year period for debt and delict claims, while the Small Claims Court offers a genuinely free forum for claims up to R20,000 where lawyers are not allowed to appear at all.",
    ],
    quickFacts: [
      { label: "Unfair dismissal referral", value: "30 days", note: "To the CCMA or bargaining council" },
      { label: "Unfair labour practice", value: "90 days", note: "From the act or omission" },
      { label: "Small Claims Court", value: "R20,000", note: "No filing fee, no legal representation" },
      { label: "General prescription", value: "3 years", note: "Debt and delict, Prescription Act 68 of 1969" },
    ],
    deadlines: [
      { claim: "Unfair dismissal (CCMA referral)", limit: "30 days", authority: "Labour Relations Act 66 of 1995 s.191(1)" },
      { claim: "Unfair labour practice", limit: "90 days", authority: "Labour Relations Act s.191(1)(b)(ii)" },
      { claim: "Automatically unfair dismissal (Labour Court)", limit: "90 days after conciliation certificate", authority: "Labour Relations Act s.191(11)" },
      { claim: "Discrimination (Employment Equity Act)", limit: "6 months", authority: "Employment Equity Act 55 of 1998 s.10" },
      { claim: "Debt and delict claims", limit: "3 years", authority: "Prescription Act 68 of 1969 s.11(d)" },
      { claim: "Claims against the State (notice)", limit: "6 months' notice, 3 years to sue", authority: "Institution of Legal Proceedings Against Organs of State Act 40 of 2002" },
      { claim: "Road Accident Fund claim", limit: "3 years (2 years if driver unidentified)", authority: "Road Accident Fund Act 56 of 1996" },
    ],
    topics: [
      {
        id: "ccma",
        heading: "The CCMA route: 30 days, conciliation, then arbitration",
        body: [
          "Almost every dismissal dispute starts with a referral to the CCMA or the relevant bargaining council on form LRA 7.11 within 30 days of the dismissal date. Late referrals require a condonation application explaining the delay, the prospects of success and the prejudice to the employer — condonation is discretionary and frequently refused for long, unexplained delays.",
          "The first step is conciliation, a confidential settlement meeting. If it fails, the commissioner issues a certificate of non-resolution, and most misconduct and incapacity dismissals then go to arbitration at the CCMA, where the award is final and binding and only reviewable by the Labour Court. Automatically unfair dismissals — pregnancy, union activity, whistleblowing, discrimination — go to the Labour Court instead, within 90 days of the certificate.",
          "Compensation for unfair dismissal is capped at 12 months' remuneration, or 24 months where the dismissal is automatically unfair. Reinstatement is the default remedy for a substantively unfair dismissal unless it is impracticable or the employee does not want it.",
        ],
        steps: [
          "Refer to the CCMA within 30 days using form LRA 7.11 — email, fax or in person.",
          "If late, file a condonation application with a full explanation for every day of delay.",
          "Ask for the disciplinary record, charge sheet and outcome letter in writing.",
          "Attend conciliation in person; settlements there are enforceable as arbitration awards.",
        ],
      },
      {
        id: "notice-severance",
        heading: "BCEA notice periods and retrenchment severance pay",
        body: [
          "The Basic Conditions of Employment Act sets minimum notice by length of service: one week during the first six months, two weeks from six months to one year, and four weeks after one year. Farm and domestic workers get four weeks after six months. Notice must be in writing, and pay in lieu is permitted, but notice cannot be used to sidestep a fair dismissal process.",
          "Where the dismissal is for operational requirements — retrenchment — the employee is entitled to severance of at least one week's remuneration for each completed year of continuous service, on top of notice pay and accrued leave. Refusing a reasonable alternative position forfeits severance.",
          "Retrenchment also carries a consultation obligation under section 189, and for large employers a facilitated section 189A process. Failure to consult properly makes the dismissal procedurally unfair even where the commercial rationale is sound.",
        ],
        steps: [
          "Calculate notice from continuous service, not from your current job title or grade.",
          "Add one week per completed year of service for a retrenchment severance figure.",
          "Check the final payslip covers notice, severance, accrued leave and pro-rata bonus.",
          "Refer any shortfall as a BCEA claim; refer the fairness dispute to the CCMA separately.",
        ],
      },
      {
        id: "small-claims",
        heading: "Small Claims Court and consumer protection",
        body: [
          "The Small Claims Court hears claims up to R20,000, charges no filing fee, and prohibits legal representation entirely — a commissioner, usually a practising attorney sitting voluntarily, decides the matter. Before issuing summons you must send a letter of demand giving the other side 14 days to pay, then obtain the summons from the clerk of the court.",
          "Judgments are final: there is no appeal on the merits, only review to the High Court for gross irregularity. That trade-off is why the forum is fast and free, and why the letter of demand and your documents do most of the work.",
          "For goods and services, the Consumer Protection Act adds a six-month right to return defective goods for repair, replacement or refund at the consumer's election, plus a cooling-off right for direct marketing. Complaints can go to the National Consumer Commission or an accredited ombud rather than to court.",
        ],
      },
    ],
    smallClaims: {
      limit: "R20,000",
      court: "Small Claims Court",
      fee: "No filing fee (sheriff service costs may apply)",
      note: "Legal representation is not permitted, a letter of demand giving 14 days is required first, and there is no appeal on the merits.",
    },
    faqs: [
      {
        question: "How long do I have to refer an unfair dismissal to the CCMA?",
        answer:
          "30 days from the date of dismissal. Late referrals require a condonation application setting out the reason for the delay, the prospects of success and the degree of lateness. Unfair labour practice disputes carry a 90-day window.",
      },
      {
        question: "How much severance pay am I owed if I am retrenched in South Africa?",
        answer:
          "At least one week's remuneration for each completed year of continuous service, plus notice pay and accrued leave. Unreasonably refusing an alternative position offered by the employer forfeits the severance entitlement.",
      },
      {
        question: "Does the Small Claims Court cost anything?",
        answer:
          "There is no filing fee. You pay only for the sheriff to serve the summons if you use one. Lawyers are not allowed to appear, so there are no legal fees either.",
      },
    ],
    helpBodies: [
      { name: "CCMA", role: "Free conciliation and arbitration of dismissal disputes", url: "https://www.ccma.org.za" },
      { name: "Department of Employment and Labour", role: "BCEA enforcement, UIF and workplace inspections", url: "https://www.labour.gov.za" },
      { name: "Legal Aid South Africa", role: "Free legal representation for qualifying people", url: "https://legal-aid.co.za" },
      { name: "National Consumer Commission", role: "Consumer Protection Act complaints", url: "https://www.thencc.gov.za" },
      { name: "Small Claims Court (DOJ)", role: "Free claims up to R20,000", url: "https://www.justice.gov.za/scc/scc.htm" },
    ],
    sources: [
      { name: "Labour Relations Act 66 of 1995", url: "https://www.gov.za/documents/labour-relations-act" },
      { name: "Basic Conditions of Employment Act 75 of 1997", url: "https://www.gov.za/documents/basic-conditions-employment-act" },
      { name: "Prescription Act 68 of 1969", url: "https://www.gov.za/documents/prescription-act" },
      { name: "Consumer Protection Act 68 of 2008", url: "https://www.gov.za/documents/consumer-protection-act" },
    ],
    relatedUsPaths: [
      { path: "/wrongful-termination-settlements", label: "US wrongful termination settlements" },
      { path: "/tools/employment/severance-pay-calculator", label: "Severance pay calculator" },
      { path: "/statute-of-limitations-by-state", label: "US statute of limitations by state" },
    ],
    lastVerified: INTERNATIONAL_LAST_VERIFIED,
  },
];

export function getJurisdictionBySlug(slug?: string): InternationalJurisdiction | undefined {
  return internationalJurisdictions.find((j) => j.slug === slug);
}
