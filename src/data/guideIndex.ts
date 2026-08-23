/**
 * Central registry of every "money page" guide/pillar on the site.
 *
 * Drives:
 *  - /guides hub page
 *  - the Navbar "Guides" mega-menu
 *  - Footer guide links
 *
 * RULE: every new high-intent guide/pillar page MUST be registered here,
 * otherwise it ends up orphaned from internal navigation.
 */

export interface GuideEntry {
  /** Absolute in-app path (no locale prefix — use useLocalizedPath). */
  path: string;
  title: string;
  blurb: string;
  /** Optional short badge, e.g. "High value". */
  badge?: string;
}

export interface GuideGroup {
  id: string;
  label: string;
  description: string;
  entries: GuideEntry[];
}

export const guideGroups: GuideGroup[] = [
  {
    id: "data",
    label: "Legal data & research",
    description:
      "Original, citable datasets compiled from state statutes and agency guidance — free to download and republish.",
    entries: [
      {
        path: "/data/settlement-deadlines",
        title: "State legal deadlines dataset",
        blurb:
          "Filing deadlines, workers' comp appeal windows, EEOC limits and insurer prompt-pay rules for all 51 US jurisdictions. CSV + embed.",
        badge: "Dataset",
      },
      {
        path: "/courts",
        title: "US court systems & small claims limits",
        blurb:
          "Court structure, small claims caps, filing fees and official judiciary links for all 51 US jurisdictions, plus courthouse pages for major cities.",
        badge: "Dataset",
      },
    ],
  },
  {
    id: "injury",
    label: "Injury & accident settlements",
    description:
      "What claims are worth, how adjusters value them, and what to do after a crash or injury.",
    entries: [
      {
        path: "/personal-injury-settlements",
        title: "Personal injury settlement amounts",
        blurb: "Settlement ranges by injury type, the multiplier method, and how carriers value a claim.",
        badge: "Hub",
      },
      {
        path: "/truck-accident-settlements",
        title: "Truck accident settlements",
        blurb: "FMCSA rules, trucking insurance layers, and why 18-wheeler claims settle higher.",
      },
      {
        path: "/uber-lyft-accident-claims",
        title: "Uber & Lyft accident claims",
        blurb: "Period 1/2/3 coverage tiers, James River and Progressive policies, and who pays.",
      },
      {
        path: "/nursing-home-abuse-claims",
        title: "Nursing home abuse & neglect claims",
        blurb: "CMS citations, state ombudsman complaints, and typical settlement drivers.",
      },
      {
        path: "/how-pain-and-suffering-is-calculated",
        title: "How pain and suffering is calculated",
        blurb: "Multiplier vs per-diem methods, with worked examples adjusters actually use.",
      },
      {
        path: "/what-to-do-after-a-car-accident",
        title: "What to do after a car accident",
        blurb: "The 12-step checklist that protects your claim in the first 48 hours.",
      },
      {
        path: "/motorcycle-helmet-insurance-laws-by-state",
        title: "Motorcycle helmet & insurance laws by state",
        blurb: "Helmet mandates, comparative-fault impact, and minimum coverage in all 50 states.",
      },
      {
        path: "/attorney-contingency-fee-explained",
        title: "Attorney contingency fees explained",
        blurb: "33% vs 40%, case costs, liens, and what actually lands in your pocket.",
      },
      {
        path: "/tools/consumer/wrongful-death-settlement-calculator",
        title: "Wrongful death settlement calculator",
        blurb: "Present-value lost support, household services, state damage caps and comparative-fault bars.",
        badge: "Calculator",
      },
      {
        path: "/tools/consumer/lost-wages-calculator",
        title: "Lost wages & future earnings calculator",
        blurb: "Past wage loss, self-employed income, and the present value of lost earning capacity.",
        badge: "Calculator",
      },
      {
        path: "/tools/consumer/truck-accident-settlement-calculator",
        title: "Truck accident settlement calculator",
        blurb: "FMCSA violation aggravators, stacked policy limits, and net recovery after fees and liens.",
        badge: "Calculator",
      },
      {
        path: "/tools/consumer/dog-bite-settlement-calculator",
        title: "Dog bite settlement calculator",
        blurb: "Dunbar severity scale, strict-liability vs one-bite states, and homeowner policy limits.",
        badge: "Calculator",
      },
      {
        path: "/tools/consumer/nursing-home-abuse-settlement-calculator",
        title: "Nursing home abuse settlement calculator",
        blurb: "Pressure ulcers, falls and neglect deaths with CMS citation aggravators and damage caps.",
        badge: "Calculator",
      },
      {
        path: "/tools/consumer/diminished-value-calculator",
        title: "Diminished value calculator",
        blurb: "Formula 17c vs independent appraisal for your car's post-accident loss of resale value.",
        badge: "Calculator",
      },
      {
        path: "/tools/employment/impairment-rating-calculator",
        title: "Workers' comp impairment rating calculator",
        blurb: "Convert an AMA Guides rating into a PPD award using your state's weekly cap and week schedule.",
        badge: "Calculator",
      },
      {
        path: "/tools/family/custody-time-percentage-calculator",
        title: "Custody & parenting time percentage calculator",
        blurb: "Turn any schedule into annual overnights and the timeshare percentage support formulas use.",
        badge: "Calculator",
      },
      {
        path: "/tools/finance/estate-tax-estimator",
        title: "Estate & inheritance tax estimator",
        blurb: "Federal and state death taxes, portability, the New York cliff and beneficiary-class rates.",
        badge: "Calculator",
      },

    ],
  },

  {
    id: "insurance",
    label: "Insurance claim denials",
    description: "What to do when a carrier delays, underpays, or denies a legitimate claim.",
    entries: [
      {
        path: "/car-insurance-claim-denied",
        title: "Car insurance claim denied",
        blurb: "Denial reasons, DOI complaints, appraisal clauses, and bad-faith remedies.",
      },
      {
        path: "/homeowners-insurance-claim-denied",
        title: "Homeowners insurance claim denied",
        blurb: "Wind vs flood exclusions, public adjusters, and appraisal or suit deadlines.",
      },
      {
        path: "/auto-insurance-claim-guide",
        title: "Auto insurance claim guide",
        blurb: "Carrier tendencies, Colossus-style claim software, and negotiating with adjusters.",
      },
    ],
  },
  {
    id: "work",
    label: "Work, disability & benefits",
    description: "Denied benefits, workplace claims, and the appeal windows that matter.",
    entries: [
      {
        path: "/workers-comp-denied-what-next",
        title: "Workers' comp denied — what next",
        blurb: "State board appeals, IME challenges, and typical denial-reversal timelines.",
      },
      {
        path: "/wrongful-termination-settlements",
        title: "Wrongful termination settlements",
        blurb: "EEOC charge windows, damages categories, and realistic settlement ranges.",
      },
      {
        path: "/long-term-disability-claim-guide",
        title: "Long-term disability claim guide",
        blurb: "ERISA appeals, own-occupation vs any-occupation, and the 180-day trap.",
      },
      {
        path: "/ssdi-denied-what-next",
        title: "SSDI denied — what next",
        blurb: "Reconsideration, ALJ hearings, and back-pay math after an approval.",
      },
    ],
  },
  {
    id: "debt",
    label: "Debt & bankruptcy",
    description: "Compare relief options before you commit to one.",
    entries: [
      {
        path: "/chapter-7-vs-chapter-13",
        title: "Chapter 7 vs Chapter 13 bankruptcy",
        blurb: "Means test, exemptions, plan payments, and what each chapter discharges.",
      },
      {
        path: "/bankruptcy-vs-debt-settlement",
        title: "Bankruptcy vs debt settlement",
        blurb: "Cost, credit impact, tax consequences, and when each option wins.",
      },
      {
        path: "/debt-settlement-calculator",
        title: "Debt settlement calculator",
        blurb: "Estimate a realistic lump-sum offer and total program cost.",
      },
    ],
  },
  {
    id: "masstort",
    label: "Mass torts & toxic exposure",
    description: "Active MDLs, eligibility criteria, and payout tiers.",
    entries: [
      {
        path: "/mass-tort-lawsuits",
        title: "Mass tort lawsuits hub",
        blurb: "Every active case we track — eligibility, deadlines, and settlement status.",
        badge: "Hub",
      },
      {
        path: "/mesothelioma-settlement-guide",
        title: "Mesothelioma settlement guide",
        blurb: "Asbestos trust funds, filing deadlines, and average verdict vs settlement values.",
        badge: "High value",
      },
      {
        path: "/roundup-camp-lejeune-updates",
        title: "Roundup & Camp Lejeune updates",
        blurb: "Latest MDL status, tier payouts, and who still qualifies to file.",
      },
    ],
  },
  {
    id: "criminal-family",
    label: "Criminal & family",
    description: "Penalties, formulas, and state-by-state differences.",
    entries: [
      {
        path: "/dui-first-offense-guide",
        title: "DUI first offense guide",
        blurb: "BAC thresholds, jail exposure, fines, IID and SR-22 rules in all 51 jurisdictions.",
        badge: "51 states",
      },
      {
        path: "/alimony-calculator",
        title: "Alimony calculator",
        blurb: "State-specific spousal support formulas and duration guidelines.",
      },
      {
        path: "/tools/finance/probate-cost-calculator",
        title: "Probate cost & executor fee calculator",
        blurb: "Statutory sliding scales, executor commissions, court fees and small-estate thresholds.",
        badge: "Calculator",
      },
    ],
  },
  {
    id: "self-help-filings",
    label: "Self-help filings & letters",
    description:
      "Guided documents that replace a paid consultation for routine disputes — fill in the facts, get a court-ready PDF.",
    entries: [
      {
        path: "/forms/small-claims-demand-packet",
        title: "Small claims demand letter & filing prep packet",
        blurb: "Pre-suit demand letter, claim valuation, service method and a court-day evidence checklist.",
        badge: "New",
      },
      {
        path: "/forms/debt-validation-letter",
        title: "Debt validation letter (FDCPA)",
        blurb: "Use your 30-day right to force a collector to prove the debt before they collect or report it.",
        badge: "New",
      },
      {
        path: "/forms/demand-letter",
        title: "Demand letter / collection letter",
        blurb: "Formal written demand for payment, with deadline and escalation language.",
      },
    ],
  },
  {
    id: "practice-areas",
    label: "Practice-area libraries",
    description: "Deep topic libraries with state-level articles.",
    entries: [
      { path: "/auto-accident-law", title: "Auto accident law", blurb: "Fault, coverage, and claim mechanics." },
      { path: "/personal-injury-law", title: "Personal injury law", blurb: "Liability, damages, and litigation basics." },
      { path: "/insurance-law", title: "Insurance law", blurb: "Policy interpretation and bad-faith standards." },
      { path: "/employment-law", title: "Employment law", blurb: "Wages, discrimination, and termination." },
      { path: "/criminal-law", title: "Criminal law", blurb: "Charges, procedure, and sentencing." },
      { path: "/landlord-tenant-law", title: "Landlord & tenant law", blurb: "Evictions, deposits, and habitability." },
      { path: "/ai-tech-law", title: "AI & tech law", blurb: "Data, privacy, and emerging-tech regulation." },
    ],
  },
  {
    id: "europe",
    label: "Europe",
    description:
      "Country-specific calculators and guidance for employees and consumers in Germany, France, Spain, Italy and Portugal.",
    entries: [
      {
        path: "/eu-tools",
        title: "European legal calculators",
        blurb: "Statutory severance and notice-period maths for DE, FR, ES, IT and PT, with the labour-code article behind each result.",
        badge: "New",
      },
      {
        path: "/eu-tools/severance-calculator",
        title: "EU severance calculator",
        blurb: "Dismissal compensation under §1a KSchG, the French barème, the Estatuto de los Trabajadores, TFR and the Código do Trabalho.",
      },
      {
        path: "/eu-tools/notice-period-calculator",
        title: "EU notice period calculator",
        blurb: "Statutory notice, last working day and pay in lieu for employer and employee terminations across five countries.",
      },
      {
        path: "/lawyer-eu",
        title: "EU lawyer directory",
        blurb: "How to instruct a lawyer in each EU country, bar-association rules, fees and legal aid.",
      },
      {
        path: "/eu-forms",
        title: "European legal forms",
        blurb: "GDPR, employment, consumer and business templates for the EU, with country-native versions.",
      },
    ],
  },
];


/** Flat list of every registered guide. */
export const allGuides: GuideEntry[] = guideGroups.flatMap((g) => g.entries);

/** Compact list used by the navbar mega-menu (high-intent clusters only). */
export const navGuideGroups = guideGroups.filter((g) => g.id !== "practice-areas");
