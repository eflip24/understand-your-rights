/**
 * Keyword-cluster landing pages — map high-CPC SEMrush phrases to the
 * primary tool/form that answers them, with entity-dense copy, FAQs and
 * internal links. Served at /answers/:slug.
 *
 * Each cluster targets one commercial-intent head term plus 4–8 long-tails
 * from Semrush's phrase_related / phrase_questions reports for the head.
 * Keep entries short and specific — Google rewards focused answer pages.
 */

export interface KeywordClusterFaq {
  question: string;
  answer: string;
}

export interface KeywordClusterCTA {
  /** Full app path, e.g. /tools/finance/settlement-estimator or /forms/w-9 */
  path: string;
  label: string;
  description: string;
}

export interface KeywordClusterLink {
  path: string;
  label: string;
}

export interface KeywordCluster {
  /** URL slug at /answers/:slug — should read like a natural query. */
  slug: string;
  /** Short pillar category shown as a badge. */
  category: string;
  /** SEO H1 — target the head keyphrase exactly. */
  title: string;
  /** <title> tag (≤ 60 chars). */
  metaTitle: string;
  /** <meta description> (≤ 158 chars). */
  metaDescription: string;
  /** Head keyphrase for the entity block ("insert" — see template). */
  headKeyword: string;
  /** Long-tail variations that should appear in-copy naturally. */
  keyphrases: string[];
  /** 2–4 short paragraphs of answer content. */
  answer: string[];
  /** Bullet list of quick facts / entities (carriers, agencies, laws). */
  entityFacts: string[];
  /** Primary CTA — usually a calculator or fillable form. */
  primaryCta: KeywordClusterCTA;
  /** Secondary internal links (pillars, related landings). */
  relatedLinks: KeywordClusterLink[];
  /** FAQ block — used for FAQPage JSON-LD. */
  faqs: KeywordClusterFaq[];
}

export const keywordClusters: KeywordCluster[] = [
  {
    slug: "average-car-accident-settlement-amount",
    category: "Personal Injury",
    title: "Average Car Accident Settlement Amounts (2026 Guide)",
    metaTitle: "Average Car Accident Settlement Amounts 2026",
    metaDescription:
      "See typical car accident settlement ranges by injury type, how insurers calculate payouts, and what pushes an offer up. Free estimator inside.",
    headKeyword: "average car accident settlement",
    keyphrases: [
      "average car accident settlement amount",
      "car accident settlement calculator",
      "how much is a car accident worth",
      "soft tissue injury settlement",
      "car accident pain and suffering payout",
    ],
    answer: [
      "Most U.S. car accident settlements fall between <strong>$3,000 and $75,000</strong>, but the range is wide. Minor soft-tissue claims typically resolve for $3k–$15k, while cases with surgery, permanent impairment, or drunk drivers frequently exceed $100,000. The single biggest driver is <em>documented medical treatment</em>, followed by lost wages and the at-fault driver's liability limits.",
      "Adjusters at <strong>State Farm, GEICO, Progressive, Allstate</strong> and <strong>Liberty Mutual</strong> price offers using software (Colossus, ClaimIQ) that scores your ICD-10 diagnosis codes, treatment duration, and gaps in care. Longer treatment plus clean medical records almost always lift the offer.",
      "Use the estimator below to model a realistic range for your specific injuries, medicals, and lost income before you accept any offer.",
    ],
    entityFacts: [
      "State Farm, GEICO, Progressive, Allstate, USAA — top 5 U.S. auto insurers by market share",
      "Colossus & ClaimIQ — the two dominant bodily-injury pricing platforms",
      "3× multiplier — common pain-and-suffering rule of thumb for moderate soft-tissue injuries",
      "State minimum liability limits cap what the at-fault driver's policy will pay",
    ],
    primaryCta: {
      path: "/tools/finance/settlement-estimator",
      label: "Estimate my settlement",
      description: "Instant estimate based on your medicals, wages, and injury type.",
    },
    relatedLinks: [
      { path: "/how-pain-and-suffering-is-calculated", label: "How pain & suffering is calculated" },
      { path: "/attorney-contingency-fee-explained", label: "Attorney contingency fees explained" },
      { path: "/what-to-do-after-a-car-accident", label: "What to do after a car accident" },
      { path: "/personal-injury-settlements", label: "Personal injury settlement hub" },
    ],
    faqs: [
      {
        question: "How long does a car accident settlement take?",
        answer:
          "Most settle 3–9 months after treatment ends. Claims with surgery or disputed liability often run 12–24 months. Filing suit typically adds 6–18 months but usually raises the offer.",
      },
      {
        question: "Do I pay taxes on a car accident settlement?",
        answer:
          "Compensation for physical injuries and related emotional distress is federal-income-tax-free under IRC §104(a)(2). Lost-wage components and interest are taxable. Punitive damages are always taxable.",
      },
      {
        question: "Should I accept the insurance company's first offer?",
        answer:
          "Rarely. First offers from major carriers routinely come in at 40–60% of the case's real value because adjusters assume you'll counter. Get a documented range before responding.",
      },
    ],
  },

  {
    slug: "workers-comp-settlement-calculator",
    category: "Workers' Compensation",
    title: "Workers' Comp Settlement Calculator — Averages by Injury",
    metaTitle: "Workers Comp Settlement Calculator 2026",
    metaDescription:
      "Estimate a workers' compensation settlement using AMA impairment ratings, TTD benefits, and state formulas. Free calculator + adjuster tactics.",
    headKeyword: "workers comp settlement calculator",
    keyphrases: [
      "workers comp settlement calculator",
      "average workers comp settlement",
      "workers comp back injury settlement",
      "workers comp shoulder injury settlement",
      "how much is my workers comp claim worth",
    ],
    answer: [
      "A workers' comp settlement (a &ldquo;compromise & release&rdquo;) is generally the <strong>impairment rating × state PPD rate × number of weeks</strong>, plus reserved medical costs. Nationally, indemnity settlements average around <strong>$21,800</strong>, but surgical back and shoulder cases regularly clear $60k–$120k.",
      "Insurers such as <strong>Travelers, The Hartford, Zurich, Sedgwick</strong> and <strong>Gallagher Bassett</strong> reserve medical futures aggressively when the treating physician's MMI report is thin. A well-documented AMA Guides 6th-edition impairment rating is the single fastest way to raise an offer.",
      "Run the calculator below for a state-adjusted range before signing any C&R — and read the FAQ on Medicare Set-Asides before accepting future medical closure.",
    ],
    entityFacts: [
      "AMA Guides 6th Edition — the impairment rating standard most states use",
      "Sedgwick & Gallagher Bassett — the two dominant third-party administrators",
      "MMI (Maximum Medical Improvement) — the trigger point for settlement talks",
      "MSA — Medicare Set-Aside; required when settling future medicals for a Medicare-eligible claimant",
    ],
    primaryCta: {
      path: "/tools/finance/workers-comp-settlement-calculator",
      label: "Calculate my workers' comp settlement",
      description: "State-adjusted estimate using impairment rating and PPD rates.",
    },
    relatedLinks: [
      { path: "/lawyer-near-me/workers-comp", label: "Find a workers' comp lawyer near me" },
      { path: "/personal-injury-settlements/taxability", label: "Is a workers' comp settlement taxable?" },
      { path: "/tools/finance/settlement-estimator", label: "General settlement estimator" },
    ],
    faqs: [
      {
        question: "How is a workers' comp settlement calculated?",
        answer:
          "Most states use: impairment rating (%) × body-part value (weeks) × comp rate. Add unpaid TTD, future medicals, and any vocational rehab reserves. States like California, New York, Texas, Florida and Pennsylvania each apply their own PPD schedules.",
      },
      {
        question: "Is a workers' comp settlement taxable?",
        answer:
          "No — under IRC §104(a)(1) workers' compensation payments (including lump-sum settlements) are federal-income-tax-free. Interest and any wage-supplement portion may be taxable.",
      },
      {
        question: "What is a Medicare Set-Aside and when do I need one?",
        answer:
          "An MSA is a portion of your settlement earmarked for future injury-related medical care. CMS review is expected when the claimant is a Medicare beneficiary and the total settlement exceeds $25,000 — or $250,000 if the claimant has a reasonable expectation of Medicare within 30 months.",
      },
    ],
  },

  {
    slug: "mesothelioma-lawyer-average-settlement",
    category: "Mass Tort",
    title: "Mesothelioma Lawyer & Average Settlement (2026)",
    metaTitle: "Mesothelioma Lawyer Average Settlement 2026",
    metaDescription:
      "Average mesothelioma settlements run $1M–$1.4M, trial verdicts $2.4M+. See how asbestos trust funds work and how to file within statute of limitations.",
    headKeyword: "mesothelioma lawyer",
    keyphrases: [
      "mesothelioma lawyer",
      "mesothelioma attorney assistance",
      "average mesothelioma settlement",
      "asbestos trust fund claim",
      "mesothelioma lawsuit statute of limitations",
    ],
    answer: [
      "Mesothelioma settlements typically fall between <strong>$1 million and $1.4 million</strong>, with trial verdicts averaging <strong>$2.4 million</strong>. Recovery draws from two sources: solvent-defendant lawsuits and the roughly <strong>$30 billion</strong> pooled across asbestos bankruptcy trusts (Manville, Owens Corning/Fibreboard, Halliburton/DII, and dozens more).",
      "Statutes of limitations run <strong>1–6 years from diagnosis</strong> depending on the state — California is 1 year, New York is 3, Texas is 2. Filing early preserves both tort claims and trust-fund eligibility. Veterans exposed shipboard or during construction may also qualify for VA disability benefits at the 100% rate.",
      "This is time-critical litigation: get a case evaluation immediately if you or a family member has a confirmed mesothelioma or lung-cancer diagnosis with a history of asbestos exposure.",
    ],
    entityFacts: [
      "~30 asbestos bankruptcy trusts pooling ~$30 billion in claim funds",
      "Common exposure sites — shipyards, Navy vessels, refineries, boiler rooms, brake shops",
      "Latency period — 20–50 years between exposure and diagnosis",
      "VA rates 100% disability for service-connected mesothelioma",
    ],
    primaryCta: {
      path: "/mesothelioma-settlement-guide",
      label: "Read the full mesothelioma settlement guide",
      description: "Trust-fund process, statute deadlines, and what to expect.",
    },
    relatedLinks: [
      { path: "/mass-tort-lawsuits", label: "All active mass-tort cases" },
      { path: "/lawyer-near-me/personal-injury", label: "Find a personal-injury lawyer" },
      { path: "/tools/finance/settlement-estimator", label: "Settlement estimator" },
    ],
    faqs: [
      {
        question: "How much is a mesothelioma case worth?",
        answer:
          "Settlements average $1M–$1.4M; trial verdicts average about $2.4M. Individual recoveries depend on exposure history, number of solvent defendants, jurisdiction, and whether the plaintiff qualifies for multiple trust funds in addition to tort recovery.",
      },
      {
        question: "How long do I have to file a mesothelioma lawsuit?",
        answer:
          "The statute of limitations runs from diagnosis (or death, in wrongful-death actions) and ranges from 1 year (California) to 6 years (Maine, North Dakota). Most states are 2–3 years. File as soon as possible — delay can permanently bar the claim.",
      },
      {
        question: "Do I need a lawyer to file an asbestos trust claim?",
        answer:
          "Technically no, but the trusts each have their own evidentiary rules, payment percentages, and setoff formulas. A mesothelioma-focused firm typically files parallel claims across every trust you're eligible for plus a tort suit against solvent defendants.",
      },
    ],
  },

  {
    slug: "how-to-file-chapter-7-bankruptcy",
    category: "Debt Relief",
    title: "How to File Chapter 7 Bankruptcy — Step by Step",
    metaTitle: "How to File Chapter 7 Bankruptcy (2026)",
    metaDescription:
      "Chapter 7 bankruptcy step by step: means test, filing fees, credit counseling, 341 meeting, and what debts get discharged. Free debt estimator inside.",
    headKeyword: "how to file chapter 7 bankruptcy",
    keyphrases: [
      "how to file chapter 7 bankruptcy",
      "chapter 7 vs chapter 13",
      "chapter 7 means test",
      "bankruptcy attorney cost",
      "what debts are discharged in chapter 7",
    ],
    answer: [
      "Chapter 7 wipes out unsecured debt — credit cards, medical bills, personal loans, most judgments — usually within <strong>90–120 days</strong> of filing. You must first pass the <strong>means test</strong>: household income under your state's Chapter 7 threshold, or disposable income too low to fund a Chapter 13 plan.",
      "Costs: <strong>$338 court filing fee</strong> + credit counseling ($10–$50) + debtor education ($10–$50). Attorney fees run <strong>$1,200–$2,500</strong> in most metros. You'll attend a single <strong>341 meeting of creditors</strong> (now nearly always by Zoom).",
      "Non-dischargeable debts include recent taxes, most student loans (absent undue hardship), domestic support, and fraud judgments. Estimate what would remain after discharge with the debt settlement calculator below before choosing bankruptcy vs settlement.",
    ],
    entityFacts: [
      "Filing fee — $338 for Chapter 7 (as of 2026)",
      "Means test — median-income lookup published quarterly by the U.S. Trustee Program",
      "341 meeting — typically 5–10 minutes, held ~30 days after filing",
      "Automatic stay — halts collections, wage garnishment, and foreclosure the moment you file",
    ],
    primaryCta: {
      path: "/debt-settlement-calculator",
      label: "Compare debt settlement vs bankruptcy",
      description: "See likely payoff, timeline, and credit impact side-by-side.",
    },
    relatedLinks: [
      { path: "/bankruptcy-vs-debt-settlement", label: "Bankruptcy vs debt settlement" },
      { path: "/tools/finance/wage-garnishment-calculator", label: "Wage garnishment calculator" },
      { path: "/lawyer-near-me/bankruptcy", label: "Find a bankruptcy lawyer" },
    ],
    faqs: [
      {
        question: "How much does it cost to file Chapter 7 bankruptcy?",
        answer:
          "$338 court filing fee plus mandatory credit counseling and debtor education ($20–$100 combined). Attorneys typically charge $1,200–$2,500 for no-asset cases. Fee waivers are available for households under 150% of the federal poverty line.",
      },
      {
        question: "Chapter 7 vs Chapter 13 — which is better?",
        answer:
          "Chapter 7 is faster (90–120 days) and discharges most unsecured debt with no repayment plan, but you must pass the means test and may lose non-exempt assets. Chapter 13 takes 3–5 years, but keeps your home/car in foreclosure or repossession and lets you cure arrears.",
      },
      {
        question: "What debts survive Chapter 7?",
        answer:
          "Recent taxes (under 3 years), most federal student loans, domestic-support obligations, criminal restitution, DUI-related debts, and any debt from fraud or willful injury. Everything else is generally wiped out.",
      },
    ],
  },

  {
    slug: "how-much-alimony-will-i-pay",
    category: "Family Law",
    title: "How Much Alimony Will I Pay? — State-by-State Guide",
    metaTitle: "How Much Alimony Will I Pay? (State Formulas 2026)",
    metaDescription:
      "See your likely alimony/spousal support using each state's formula. Duration, tax treatment, and modification triggers explained. Free calculator.",
    headKeyword: "how much alimony will i pay",
    keyphrases: [
      "how much alimony will i pay",
      "alimony calculator",
      "spousal support calculator",
      "alimony formula by state",
      "how long do i have to pay alimony",
    ],
    answer: [
      "There's no single national alimony formula — <strong>each state calculates support differently</strong>. Broadly, courts award <strong>30–40% of the higher earner's income minus 40–50% of the lower earner's income</strong>, adjusted for marriage length. Duration typically runs 20–50% of the marriage length, with lifetime awards limited to long marriages (usually 20+ years).",
      "Under the <strong>2019 Tax Cuts and Jobs Act</strong>, alimony ordered after Dec. 31, 2018 is no longer deductible for the payor and not taxable to the recipient — a change that shifted average awards downward roughly 10–15%.",
      "Use the state-specific calculator below to get a range that reflects your jurisdiction's formula, then read the modification FAQ before agreeing to any long-term amount.",
    ],
    entityFacts: [
      "Massachusetts Alimony Reform Act — the model formula many states now follow",
      "TCJA — post-2018 orders: not deductible / not taxable",
      "Cohabitation — grounds for termination in most states, defined by statute",
      "Rehabilitative vs permanent — most modern awards are rehabilitative and time-limited",
    ],
    primaryCta: {
      path: "/tools/family/alimony-calculator",
      label: "Calculate my alimony",
      description: "State-specific formulas for all 50 states + DC.",
    },
    relatedLinks: [
      { path: "/tools/family/child-support-calculator", label: "Child support calculator" },
      { path: "/lawyer-near-me/family-law", label: "Find a family law attorney" },
    ],
    faqs: [
      {
        question: "How long does alimony last?",
        answer:
          "Rule of thumb: 20–50% of the marriage's length for marriages under 20 years. Marriages of 20+ years can result in indefinite (until retirement, remarriage, or cohabitation) support. Short marriages under 5 years often get no alimony at all.",
      },
      {
        question: "Can alimony be modified?",
        answer:
          "Yes — most orders can be modified on a substantial change in circumstances: involuntary job loss, disability, recipient's cohabitation, or retirement at normal age. &ldquo;Non-modifiable&rdquo; alimony must be labeled as such in the decree.",
      },
      {
        question: "Is alimony taxable in 2026?",
        answer:
          "For divorces finalized after Dec. 31, 2018: no. The payor cannot deduct payments and the recipient does not report them as income. Pre-2019 orders remain under the old deduction/taxable rules unless modified with an express TCJA opt-in.",
      },
    ],
  },

  {
    slug: "eviction-notice-free-template",
    category: "Landlord / Tenant",
    title: "Free Eviction Notice Template — State-Specific",
    metaTitle: "Free Eviction Notice Template (All 50 States)",
    metaDescription:
      "Generate a state-compliant eviction notice free — 3-day pay-or-quit, 30-day no-cause, or lease-violation. Correct timing per state statute.",
    headKeyword: "eviction notice",
    keyphrases: [
      "eviction notice template",
      "3 day notice to pay or quit",
      "30 day notice to vacate",
      "eviction notice by state",
      "how to evict a tenant",
    ],
    answer: [
      "Every eviction starts with the correct <strong>statutory notice</strong>. Serving the wrong form — or the wrong number of days — is the #1 reason unlawful-detainer cases get dismissed at the first hearing. California requires 3 days for non-payment, New York requires 14, Texas requires 3, Florida requires 3 business days.",
      "Our generator picks the correct notice type (pay-or-quit, cure-or-quit, no-cause, lease violation) and the correct notice period for the tenant's state, then produces a signed, printable PDF. Local jurisdictions (LA, SF, NYC, DC) often add stricter rules — the tool flags those.",
      "After the notice period expires without cure, you can file the unlawful-detainer / summary process action in the local court. Never change locks, remove belongings, or shut off utilities — those are &ldquo;self-help&rdquo; evictions and expose landlords to statutory damages.",
    ],
    entityFacts: [
      "Pay-or-quit — for non-payment of rent, shortest notice periods",
      "Cure-or-quit — for curable lease violations (unauthorized pets, noise)",
      "Unconditional quit — for severe violations (illegal activity, repeat breaches)",
      "Never self-help evict — statutory damages typically 2–3× actual damages plus attorney fees",
    ],
    primaryCta: {
      path: "/forms/eviction-notice",
      label: "Generate my eviction notice",
      description: "Free, state-compliant, printable PDF.",
    },
    relatedLinks: [
      { path: "/forms/notice-to-vacate", label: "Notice to vacate (tenant)" },
      { path: "/forms/late-rent-notice", label: "Late rent notice" },
      { path: "/lawyer-near-me/landlord-tenant", label: "Find a landlord/tenant lawyer" },
      { path: "/landlord-tenant-law", label: "Landlord/tenant law guide" },
    ],
    faqs: [
      {
        question: "How much notice do I have to give before eviction?",
        answer:
          "It depends on the reason and the state. Non-payment: California 3 days, Texas 3 days, New York 14 days, Florida 3 business days. No-cause termination of month-to-month: usually 30 days, 60 in California/Washington if tenancy is over a year. Always check local rent-control rules.",
      },
      {
        question: "Do I have to serve the notice in person?",
        answer:
          "Preferred method is personal service, but most states allow &ldquo;nail-and-mail&rdquo; (post on the door and mail) if personal service isn't possible after diligent attempts. Substitute service on an adult occupant is also common. Document every attempt.",
      },
      {
        question: "Can I evict a tenant without going to court?",
        answer:
          "No. After the notice period expires you must file an unlawful-detainer / summary-process action and get a court judgment before the sheriff can remove the tenant. Locking out or shutting off utilities is illegal in every state.",
      },
    ],
  },
];

export function getKeywordCluster(slug: string): KeywordCluster | undefined {
  return keywordClusters.find((c) => c.slug === slug);
}

export const keywordClusterSlugs = keywordClusters.map((c) => c.slug);
