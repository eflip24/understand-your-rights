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
];

/** Flat list of every registered guide. */
export const allGuides: GuideEntry[] = guideGroups.flatMap((g) => g.entries);

/** Compact list used by the navbar mega-menu (high-intent clusters only). */
export const navGuideGroups = guideGroups.filter((g) => g.id !== "practice-areas");
