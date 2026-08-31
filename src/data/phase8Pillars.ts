import type { RecommenderTopic } from "@/components/tools/ToolRecommender";

/**
 * Phase 8 — High-CPC US content expansion.
 *
 * Data-driven pillar pages rendered by src/pages/HighCpcPillarPage.tsx.
 * Each entry targets a high-CPC commercial-intent cluster we did not own
 * yet, with entity-dense copy (carriers, statutes, agencies), HowTo + FAQ
 * JSON-LD, an InMarketEntityBlock, a RelatedIntentStrip and a tie-in to the
 * matching calculator plus /lawyer-near-me/{practice-area}.
 *
 * Copy lives here so it can be edited without touching JSX.
 */

export interface PillarTable {
  caption: string;
  columns: string[];
  rows: string[][];
  /** Optional note rendered under the table (source, caveat). */
  note?: string;
}

export interface PillarSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Original data tables — the citable asset on a rebuilt page. */
  tables?: PillarTable[];
}

export interface PillarFaq {
  question: string;
  answer: string;
}

export interface PillarCta {
  path: string;
  label: string;
  description: string;
}

export interface Phase8Pillar {
  slug: string;
  category: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Short eyebrow line above the H1. */
  tagline: string;
  /** Entity-dense opening paragraphs. */
  intro: string[];
  entityBlock: {
    category: string;
    intro: string;
    entities: string[];
    relatedTerms?: { label: string; href?: string }[];
  };
  /** Quick-scan fact table. */
  keyFacts: { label: string; value: string }[];
  sections: PillarSection[];
  howTo: { name: string; text: string }[];
  faqs: PillarFaq[];
  primaryCta: PillarCta;
  lawyerCta: PillarCta;
  recommenderTopic?: RecommenderTopic;
  /** ISO dates surfaced in Article JSON-LD and the byline. */
  datePublished?: string;
  dateModified?: string;
  /** Editorial role id from editorialTeam.ts; used for byline + Article schema author. */
  authorId?: string;
  cluster: string;
  related: { label: string; href: string; blurb?: string }[];
}

export const phase8Pillars: Phase8Pillar[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: "truck-accident-settlements",
    category: "Personal Injury",
    h1: "Truck Accident Settlements: What 18-Wheeler Claims Are Worth",
    metaTitle: "Truck Accident Settlement Amounts & Values (2026)",
    metaDescription:
      "How semi-truck accident settlements are valued: FMCSA hours-of-service rules, ELD data, MCS-90 endorsements, $750K–$5M policy limits and typical payout ranges.",
    tagline: "Commercial motor vehicle claims · FMCSA · $750K+ policy limits",
    intro: [
      "Truck accident settlements are valued differently from ordinary car crashes because a commercial motor vehicle (CMV) carries far higher insurance limits and is governed by federal regulation. Under 49 CFR § 387, interstate carriers hauling general freight must carry at least $750,000 in liability coverage, and $1 million to $5 million for hazardous materials. Most national fleets — Werner, Schneider, Swift/Knight, Prime Inc., J.B. Hunt, FedEx Freight, XPO — carry $1M primary layers with $5M–$50M excess towers above them.",
      "That higher coverage ceiling, combined with Federal Motor Carrier Safety Administration (FMCSA) rules a plaintiff can use to prove negligence per se, is why truck accident lawyer keywords are among the most expensive in legal advertising. The evidence set is also unique: electronic logging device (ELD) records, driver qualification files, Hours-of-Service (HOS) logs under 49 CFR Part 395, drug-and-alcohol testing under Part 382, black box / ECM data, and the carrier's CSA BASIC safety scores.",
    ],
    entityBlock: {
      category: "Personal Injury · Commercial Trucking",
      intro:
        "Semi-truck and 18-wheeler collisions involve federal safety regulation, layered commercial insurance towers, and evidence that is destroyed on a short retention cycle. Claims are handled by trucking-specific adjusters and third-party administrators, not standard auto carriers.",
      entities: [
        "FMCSA",
        "49 CFR Part 395 (Hours of Service)",
        "Electronic Logging Device (ELD)",
        "MCS-90 endorsement",
        "CSA BASIC scores",
        "Engine Control Module (ECM) data",
        "Spoliation letter",
        "Great West Casualty",
        "Canal Insurance",
        "Sentry Insurance",
        "Zurich North America",
        "Old Republic",
        "Negligent hiring & retention",
        "Vicarious liability / respondeat superior",
        "Broker liability",
        "Underride collision",
        "Jackknife",
        "Traumatic brain injury (TBI)",
      ],
      relatedTerms: [
        { label: "Personal injury settlements", href: "/personal-injury-settlements" },
        { label: "Auto insurance claim guide", href: "/auto-insurance-claim-guide" },
        { label: "Pain and suffering", href: "/pain-and-suffering-calculation" },
      ],
    },
    keyFacts: [
      { label: "Federal minimum liability (general freight)", value: "$750,000" },
      { label: "Hazmat minimum", value: "$1M–$5M" },
      { label: "Typical fleet tower", value: "$1M primary + $5M–$50M excess" },
      { label: "ELD data retention", value: "6 months (HOS records)" },
      { label: "Typical serious-injury range", value: "$150,000 – $2,000,000+" },
      { label: "Wrongful death range", value: "$1M – $10M+" },
    ],
    sections: [
      {
        heading: "What drives the value of a truck accident settlement",
        bullets: [
          "Medical specials — surgical spine, TBI and orthopedic hardware cases move into seven figures fast.",
          "Policy limits available: primary layer, excess/umbrella tower, and any MCS-90 endorsement backstop.",
          "Liability clarity: HOS violations, falsified logs, or a positive Part 382 drug screen create punitive exposure.",
          "Corporate negligence theories — negligent hiring, negligent retention, negligent maintenance under Part 396.",
          "Comparative fault in your state (pure comparative, modified 50%/51%, or contributory).",
          "Lost earning capacity, life care plan cost, and household services for catastrophic injuries.",
        ],
      },
      {
        heading: "Evidence that disappears if you wait",
        paragraphs: [
          "Carriers are only required to retain HOS supporting documents for six months, and ECM data is frequently overwritten within days once the tractor is back in service. A spoliation letter — sent within days of the crash — is what preserves ELD downloads, dashcam footage, dispatch records, driver qualification files, maintenance logs and post-accident testing results. Rapid-response teams sent by the carrier's insurer are often on scene the same day; the injured party rarely is.",
        ],
      },
      {
        heading: "Who ends up paying",
        bullets: [
          "The motor carrier under respondeat superior for its employee driver.",
          "The driver individually, when acting outside the scope of employment.",
          "The freight broker or shipper for negligent selection or improper loading.",
          "A maintenance contractor or parts manufacturer for mechanical failure.",
          "The MCS-90 endorsement, which forces the insurer to pay a public judgment even where coverage would otherwise be excluded.",
        ],
      },
    ],
    howTo: [
      { name: "Get treated and documented immediately", text: "Emergency evaluation plus follow-up with a treating specialist. Gaps in treatment are the single most common reason adjusters discount a truck claim." },
      { name: "Send a spoliation / preservation letter", text: "Demand ELD, ECM, dashcam, dispatch, DQ file, maintenance and post-accident test records before the retention window closes." },
      { name: "Identify every insurance layer", text: "Request the MCS-90, primary policy, excess tower, and any broker or shipper coverage. Total available limits set the realistic ceiling." },
      { name: "Build the damages file", text: "Medical specials, wage loss, life care plan, and vocational assessment for permanent impairment." },
      { name: "Estimate your range", text: "Use the settlement calculator to model specials, multiplier and comparative fault before you talk numbers." },
      { name: "Demand and negotiate", text: "Serve a demand package with liability, damages and regulatory violations. Excess carriers only engage once primary limits are credibly exposed." },
    ],
    faqs: [
      { question: "How much is the average truck accident settlement?", answer: "There is no reliable single average because the range is enormous. Soft-tissue-only claims commonly resolve in the $25,000–$100,000 band; surgical injuries typically land between $250,000 and $1.5 million; catastrophic injury and wrongful death claims against a fleet with a $5M+ excess tower routinely exceed $1 million. Available policy limits — not the injury alone — usually cap the outcome." },
      { question: "Why are truck accident cases worth more than car accident cases?", answer: "Three reasons: federally mandated minimum limits of $750,000 (versus state auto minimums as low as $25,000), corporate defendants with excess towers, and FMCSA regulations that let a plaintiff prove negligence per se from an hours-of-service or maintenance violation." },
      { question: "What is an MCS-90 endorsement?", answer: "It is a federally required endorsement that obligates the insurer to pay a judgment for public injury even when the policy itself would not cover the loss — for example, when the tractor was used outside the declared operation. The insurer can then seek reimbursement from the carrier. It functions as a safety net for injured members of the public." },
      { question: "How long do truck accident claims take to settle?", answer: "Typically 12–30 months. Federal document discovery, corporate depositions, accident reconstruction and life care planning all add time, and excess carriers rarely negotiate seriously until the case is in litigation." },
      { question: "Do I need a lawyer for a semi-truck crash?", answer: "Practically, yes. Commercial defense counsel is retained within hours of the collision, the evidence is on short retention cycles, and layered coverage disputes are technical. Truck cases are almost always taken on contingency at 33–40%." },
      { question: "What if the truck driver was an owner-operator?", answer: "Liability usually still reaches the motor carrier whose authority and placards the truck was operating under. Leased owner-operators are treated as statutory employees of the carrier under the FMCSA leasing regulations at 49 CFR Part 376." },
    ],
    primaryCta: {
      path: "/tools/consumer/settlement-estimator",
      label: "Estimate your truck accident settlement",
      description: "Model medical specials, pain-and-suffering multiplier and comparative fault in under two minutes.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/personal-injury",
      label: "Find a truck accident lawyer near you",
      description: "Most commercial-vehicle firms work on contingency and advance case costs.",
    },
    recommenderTopic: "truck-accident",
    cluster: "Personal injury cluster",
    related: [
      { label: "Personal injury settlement hub", href: "/personal-injury-settlements", blurb: "Values, timelines and taxability across every injury type." },
      { label: "Uber & Lyft accident claims", href: "/uber-lyft-accident-claims", blurb: "$1M rideshare coverage and the three driving periods." },
      { label: "Pain and suffering explained", href: "/pain-and-suffering-calculation", blurb: "Multiplier vs per diem methods adjusters actually use." },
      { label: "Attorney contingency fees", href: "/attorney-contingency-fees", blurb: "What 33% vs 40% costs you at settlement." },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: "uber-lyft-accident-claims",
    category: "Rideshare Injury",
    h1: "Uber & Lyft Accident Claims: Who Pays and How Much",
    metaTitle: "Uber & Lyft Accident Claims — Coverage & Payouts",
    metaDescription:
      "How rideshare accident claims work: Uber's $1M James River policy, Lyft's three driving periods, contingent collision, UM/UIM coverage and typical settlement ranges.",
    tagline: "Rideshare injury · $1,000,000 third-party liability · Period 1/2/3",
    intro: [
      "Rideshare accident claims turn on one question before anything else: which app period the driver was in at the moment of impact. Uber and Lyft both structure coverage in three periods, and the available limits swing from your own auto policy up to a $1,000,000 third-party liability policy depending on whether the driver was offline, waiting for a ride request, or actively transporting a passenger.",
      "Uber's commercial coverage has historically been placed through James River Insurance (and more recently other excess and surplus lines carriers); Lyft has used Zurich/Progressive-backed programs. Both are administered by third-party claim handlers, not your neighborhood adjuster, and both aggressively contest Period 1 claims where only contingent limits apply.",
    ],
    entityBlock: {
      category: "Personal Injury · Rideshare & Transportation Network Companies",
      intro:
        "Transportation Network Company (TNC) claims sit between personal auto and commercial coverage. The driver's personal policy typically excludes livery use, so the app period determines whether a $50,000 contingent layer or a $1,000,000 commercial policy responds.",
      entities: [
        "Transportation Network Company (TNC)",
        "James River Insurance",
        "Zurich North America",
        "Progressive commercial",
        "Period 0 / 1 / 2 / 3",
        "Contingent liability coverage",
        "Contingent comprehensive & collision",
        "Livery exclusion",
        "Uninsured / underinsured motorist (UM/UIM)",
        "Independent contractor classification",
        "$1,000,000 third-party liability",
        "$2,500 deductible (contingent collision)",
        "Arbitration clause / terms of service",
      ],
      relatedTerms: [
        { label: "Car insurance claim denied", href: "/car-insurance-claim-denied" },
        { label: "Auto insurance claim guide", href: "/auto-insurance-claim-guide" },
        { label: "Truck accident settlements", href: "/truck-accident-settlements" },
      ],
    },
    keyFacts: [
      { label: "Period 1 (app on, no ride accepted)", value: "$50K/$100K/$25K contingent" },
      { label: "Period 2 (en route to pickup)", value: "$1,000,000 liability" },
      { label: "Period 3 (passenger on board)", value: "$1,000,000 liability" },
      { label: "Offline (Period 0)", value: "Driver's personal auto policy only" },
      { label: "Contingent collision deductible", value: "$2,500 (Uber) / $2,500 (Lyft)" },
      { label: "Typical passenger claim range", value: "$15,000 – $300,000+" },
    ],
    sections: [
      {
        heading: "The three periods, in plain English",
        bullets: [
          "Period 0 — app off. Only the driver's personal auto policy applies. Rideshare exclusions rarely matter here.",
          "Period 1 — app on, waiting for a request. Contingent limits of roughly $50,000 per person / $100,000 per accident / $25,000 property damage apply, and only in excess of the driver's own coverage.",
          "Period 2 — request accepted, driving to the passenger. Full $1,000,000 third-party liability attaches.",
          "Period 3 — passenger in the vehicle. Full $1,000,000 third-party liability plus UM/UIM in most states.",
        ],
      },
      {
        heading: "If you were the passenger",
        paragraphs: [
          "Passengers are almost never at fault, so the fight is about damages, not liability. You have a claim against the rideshare policy if the driver caused the crash, and against the other driver's carrier if they did — plus rideshare UM/UIM coverage if the at-fault driver is uninsured or underinsured. Screenshot the trip receipt immediately: trip ID, driver name, timestamps and route are the cleanest proof of period.",
        ],
      },
      {
        heading: "If you were hit by a rideshare driver",
        paragraphs: [
          "You will be asked to prove period. Request the trip record through the platform's insurance portal and preserve the police report's app-status notation. Adjusters routinely take the position that the driver was in Period 1 (or offline) because it drops the exposure from $1,000,000 to a contingent layer — that assertion should never be accepted without the trip data.",
        ],
      },
      {
        heading: "Why rideshare claims stall",
        bullets: [
          "Period disputes between the personal carrier and the TNC carrier.",
          "Livery exclusions in the driver's personal policy triggering a denial letter.",
          "Third-party administrators with slow authority chains and low first offers.",
          "Independent-contractor arguments to keep the platform itself out of the case.",
          "Arbitration clauses in the rider terms of service for non-injury disputes.",
        ],
      },
      {
        heading: "Coverage by app period — Uber vs Lyft, side by side",
        paragraphs: [
          "The table below is the single most useful thing to have open when an adjuster tells you what policy applies. Limits are the published U.S. minimums each platform maintains nationally; a handful of states (New York, and Washington for TNC-specific statutes) require higher or differently structured coverage, and New York rideshare trips are written through a state-specific group policy with $1.25 million in liability.",
        ],
        tables: [
          {
            caption: "Rideshare insurance limits by app period (2026, U.S. baseline)",
            columns: ["App period", "Uber", "Lyft", "Who pays first"],
            rows: [
              ["Period 0 — app off", "No platform coverage", "No platform coverage", "Driver's personal auto policy"],
              ["Period 1 — app on, no request", "$50K/$100K bodily injury, $25K property; contingent comp/collision with $2,500 deductible", "$50K/$100K bodily injury, $25K property; contingent comp/collision with $2,500 deductible", "Personal policy first, platform layer excess"],
              ["Period 2 — en route to pickup", "$1,000,000 third-party liability", "$1,000,000 third-party liability", "Platform commercial policy primary"],
              ["Period 3 — passenger on board", "$1,000,000 liability + UM/UIM in most states", "$1,000,000 liability + UM/UIM in most states", "Platform commercial policy primary"],
              ["New York trips (all periods 2–3)", "$1.25M liability via NY TNC group policy", "$1.25M liability via NY TNC group policy", "TNC group policy"],
            ],
            note: "Limits reflect published platform insurance summaries. Confirm the applicable policy in writing — the period assertion in the first adjuster call is not evidence.",
          },
        ],
      },
      {
        heading: "What rideshare claims actually settle for",
        paragraphs: [
          "Rideshare claims are valued the same way as any auto injury claim — documented medical specials, wage loss, and a general-damages multiplier — but with two twists: the available limit is far higher than a typical personal policy in Periods 2 and 3, and the third-party administrator handling the file usually needs internal authority sign-off above roughly $100,000, which adds weeks.",
        ],
        tables: [
          {
            caption: "Typical rideshare injury settlement ranges by injury profile",
            columns: ["Injury profile", "Typical medical specials", "Common settlement range", "Notes"],
            rows: [
              ["Soft tissue, chiropractic only, no imaging", "$1,500 – $5,000", "$8,000 – $20,000", "Adjusters apply MIST-style scoring; low first offers are routine"],
              ["Soft tissue with MRI-confirmed disc bulge", "$6,000 – $15,000", "$25,000 – $60,000", "Causation letter from the treating physician moves the number most"],
              ["Injections (ESI / facet blocks)", "$15,000 – $35,000", "$60,000 – $150,000", "Documented failed conservative care is the value driver"],
              ["Surgery (discectomy, fusion, ORIF)", "$60,000 – $250,000", "$200,000 – $1,000,000 (limit)", "Period 2/3 cases frequently reach the $1M policy"],
              ["Fracture with hardware, no surgery on spine", "$25,000 – $70,000", "$90,000 – $300,000", "Scarring and permanent impairment ratings add materially"],
              ["Catastrophic / TBI / wrongful death", "$150,000+", "$1,000,000 policy limit, plus UM/UIM stacking", "Look for excess layers and the other driver's own policy"],
            ],
            note: "Ranges are drawn from published rideshare-claim outcomes and standard specials-plus-multiplier valuation. Your case may fall outside them.",
          },
        ],
      },
      {
        heading: "Deadlines that actually bind your rideshare claim",
        tables: [
          {
            caption: "Rideshare claim deadlines",
            columns: ["Step", "Practical deadline", "Why it matters"],
            rows: [
              ["Report through the app", "Same day", "Opens the claim number that routes to the commercial carrier"],
              ["Request the trip record", "Within 30 days", "Establishes the app period before the file is closed out"],
              ["First medical treatment", "72 hours", "Gaps beyond a week are used to discount general damages"],
              ["Personal-injury statute of limitations", "1 year (KY, LA, TN) to 6 years (ME, ND)", "Missing it ends the claim regardless of merit"],
              ["Wrongful death", "1–3 years from date of death", "Runs separately from the injury clock"],
              ["UM/UIM notice to the TNC carrier", "Often 30 days to 1 year per policy", "Late notice is a standard UM/UIM denial ground"],
            ],
          },
        ],
      },
    ],
    howTo: [
      { name: "Capture the trip evidence at the scene", text: "Screenshot the trip receipt, trip ID, driver name and plate, and photograph the app screen showing an active ride." },
      { name: "Report through the app's crash flow", text: "Both platforms open a claim number and route it to their commercial carrier. Do not rely only on a 911 report." },
      { name: "Get treated within 72 hours", text: "Delayed treatment is the fastest way to get your general damages discounted." },
      { name: "Confirm which period applied", text: "Request the trip record in writing. Period determines whether $50K or $1M is on the table." },
      { name: "Check UM/UIM", text: "If the at-fault driver is uninsured, rideshare UM/UIM often responds during Periods 2 and 3." },
      { name: "Value the claim and demand", text: "Run the numbers on specials plus multiplier, then submit a documented demand to the TNC's carrier." },
    ],
    faqs: [
      { question: "Does Uber's $1 million policy always apply?", answer: "No. It applies only in Period 2 (en route to pickup) and Period 3 (passenger on board). If the driver was logged in but had not accepted a ride, contingent limits near $50K/$100K/$25K apply, and if the app was off, only the driver's personal auto policy responds." },
      { question: "Can I sue Uber or Lyft directly?", answer: "Usually not for the driver's negligence — both classify drivers as independent contractors, so recovery normally comes from the insurance policy rather than the company. Direct claims against the platform are limited to theories such as negligent driver screening or defective app design." },
      { question: "What if I was a passenger and the other driver caused the crash?", answer: "You claim against the at-fault driver's liability policy first. If those limits are inadequate, the rideshare UM/UIM coverage in Period 2 or 3 typically fills the gap up to $1 million." },
      { question: "How much is a typical Uber accident settlement?", answer: "Soft-tissue passenger claims usually settle between $15,000 and $50,000. Claims with imaging-confirmed injuries, injections or surgery commonly land between $75,000 and $300,000, with catastrophic cases running to the $1 million policy limit." },
      { question: "Does my own car insurance cover me while driving for Uber?", answer: "Not unless you carry a rideshare endorsement. Standard personal policies contain a livery or public-conveyance exclusion, which is why the platform's contingent coverage exists — and why it carries a $2,500 deductible." },
      { question: "How long do I have to file?", answer: "The personal-injury statute of limitations in your state governs — commonly two or three years, but as short as one year in Kentucky, Louisiana and Tennessee. Platform reporting deadlines are much shorter in practice, so report immediately." },
      { question: "What is the difference between Period 1 and Period 2 for my payout?", answer: "It is usually the difference between about $50,000 and $1,000,000 of available coverage. Period 1 is app-on but no accepted request; Period 2 begins the moment the driver accepts your ride request. The trip record timestamp — not the adjuster's summary — decides it." },
      { question: "Who pays if the rideshare driver was not at fault?", answer: "The at-fault driver's liability carrier pays first. If their limits are exhausted or they are uninsured, the rideshare UM/UIM coverage (Periods 2 and 3) responds up to $1 million in most states. You can pursue both in parallel." },
      { question: "Do I have to give the rideshare carrier a recorded statement?", answer: "You are obliged to cooperate with your own insurer, not with the other side's. Statements to the TNC's third-party administrator are optional and are frequently used to pin down a Period 1 narrative or a 'minor impact' description. Decline until you have the trip record and, ideally, counsel." },
      { question: "What if my rideshare driver was driving for both Uber and Lyft at once?", answer: "Multi-apping is common. Whichever platform had an accepted ride or an on-board passenger at impact provides the $1 million layer; the other platform's coverage sits in Period 1 at contingent limits. Pull the trip records from both accounts." },
      { question: "Can I claim for a damaged phone, laptop or luggage in a rideshare crash?", answer: "Yes — personal property damaged in the crash is recoverable as property damage under the applicable liability policy. Photograph the items, keep receipts or a replacement quote, and submit them with your medical documentation rather than separately." },
      { question: "How long does a rideshare settlement take to pay?", answer: "Once you accept, the TNC's administrator typically issues the release within 5–10 business days and the check 2–4 weeks after the signed release returns. Any health-insurance or Medicare lien must be resolved before your net funds are disbursed, which adds 30–90 days in lien-heavy cases." },
    ],
    primaryCta: {
      path: "/tools/consumer/settlement-estimator",
      label: "Estimate your rideshare claim value",
      description: "Model your medical specials and multiplier against the applicable policy limit.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/car-accident",
      label: "Find a rideshare accident lawyer near you",
      description: "Free consultations; rideshare cases are handled on contingency.",
    },
    datePublished: "2026-02-14",
    dateModified: "2026-08-06",
    authorId: "personal-injury-editor",
    recommenderTopic: "car-accident",
    cluster: "Personal injury cluster",
    related: [
      { label: "Truck accident settlements", href: "/truck-accident-settlements", blurb: "Commercial policy towers and FMCSA violations." },
      { label: "Car insurance claim denied", href: "/car-insurance-claim-denied", blurb: "How to fight a denial and file a DOI complaint." },
      { label: "Personal injury settlement hub", href: "/personal-injury-settlements", blurb: "Values, timelines and taxability." },
      { label: "What to do after a car accident", href: "/what-to-do-after-a-car-accident", blurb: "The 12-step scene checklist." },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: "nursing-home-abuse-claims",
    category: "Elder Law & Personal Injury",
    h1: "Nursing Home Abuse & Neglect Claims: Rights, Evidence, Payouts",
    metaTitle: "Nursing Home Abuse Claims — Evidence & Settlements",
    metaDescription:
      "How nursing home abuse and neglect claims work: CMS 42 CFR Part 483 rights, Five-Star ratings, state ombudsman complaints, pressure-ulcer cases and settlement ranges.",
    tagline: "Elder abuse · CMS 42 CFR Part 483 · State long-term care ombudsman",
    intro: [
      "Nursing home abuse and neglect claims are built on a federal floor of resident rights. Any facility that accepts Medicare or Medicaid must comply with the CMS Requirements of Participation at 42 CFR Part 483, which guarantee freedom from abuse and neglect, adequate staffing, comprehensive care planning, and protection against unnecessary chemical or physical restraints. A violation shows up as an F-tag on the facility's Statement of Deficiencies (CMS Form 2567) and often as a downgrade in the CMS Five-Star Quality Rating on Medicare's Care Compare.",
      "Those records are public, and they are the backbone of a claim. Pressure ulcers (stage III and IV), falls with fracture, dehydration and malnutrition, medication errors, elopement, sepsis and unexplained bruising are the recurring fact patterns. Most cases are also reportable in parallel to Adult Protective Services and the state Long-Term Care Ombudsman.",
    ],
    entityBlock: {
      category: "Elder Law · Long-Term Care Litigation",
      intro:
        "Long-term care claims combine federal regulatory violations with state nursing-home statutes, many of which allow attorney fees and enhanced damages. Facility owners are typically layered through management companies and REIT landlords, which affects who ultimately pays.",
      entities: [
        "CMS 42 CFR Part 483",
        "Requirements of Participation",
        "F-tag / CMS Form 2567",
        "Five-Star Quality Rating",
        "Medicare Care Compare",
        "State Long-Term Care Ombudsman",
        "Adult Protective Services (APS)",
        "Elder Justice Act",
        "Minimum Data Set (MDS 3.0)",
        "Braden Scale",
        "Stage III / IV pressure ulcer",
        "Sepsis and dehydration",
        "Elopement / wandering",
        "Chemical restraint",
        "Arbitration agreement (admission packet)",
        "Wrongful death / survival action",
      ],
      relatedTerms: [
        { label: "Personal injury settlements", href: "/personal-injury-settlements" },
        { label: "Pain and suffering", href: "/pain-and-suffering-calculation" },
      ],
    },
    keyFacts: [
      { label: "Governing federal rule", value: "42 CFR Part 483" },
      { label: "Public inspection record", value: "CMS Form 2567 (Statement of Deficiencies)" },
      { label: "Complaint routes", value: "State survey agency, APS, LTC Ombudsman" },
      { label: "Typical neglect settlement", value: "$100,000 – $500,000" },
      { label: "Death / gross neglect", value: "$500,000 – $3,000,000+" },
      { label: "Common obstacle", value: "Admission-packet arbitration clause" },
    ],
    sections: [
      {
        heading: "Warning signs that support a claim",
        bullets: [
          "Pressure ulcers appearing or worsening after admission — the strongest single indicator of neglect.",
          "Repeated unwitnessed falls, especially after a documented fall-risk care plan.",
          "Rapid weight loss, dehydration, or untreated urinary tract infections progressing to sepsis.",
          "Unexplained bruising in patterned locations, fractures, or fear around specific staff.",
          "Overmedication with antipsychotics used as chemical restraint.",
          "Sudden staff turnover, refusal to allow unsupervised visits, or missing chart entries.",
        ],
      },
      {
        heading: "Evidence that decides these cases",
        paragraphs: [
          "The medical chart, MDS 3.0 assessments, Braden Scale scoring, wound-care notes, turn-and-reposition logs, staffing sheets (PBJ payroll-based journal data) and the facility's own incident reports carry the case. Photographs of wounds with dates, plus the facility's CMS deficiency history, convert a sympathetic story into a documented pattern of understaffing.",
        ],
      },
      {
        heading: "Who is legally responsible",
        bullets: [
          "The licensed operator of the facility for negligent care and understaffing.",
          "The management company that sets staffing budgets and census targets.",
          "Ownership entities and REIT landlords where corporate structuring drained resources.",
          "Individual staff for intentional abuse — usually alongside a criminal referral.",
          "Contract providers such as wound-care or therapy vendors.",
        ],
      },
      {
        heading: "The arbitration clause problem",
        paragraphs: [
          "Most admission packets include a pre-dispute arbitration agreement. In many states these are enforceable, but they are frequently vulnerable — signed by a family member without a valid power of attorney, presented as a condition of admission, or unconscionable in their fee-splitting terms. Whether the clause survives often determines the settlement value of the case.",
        ],
      },
      {
        heading: "What each fact pattern is worth",
        paragraphs: [
          "Long-term care claims are priced by injury severity, how clearly the chart shows a preventable failure, and whether the facility's CMS deficiency history establishes a pattern. The ranges below reflect negotiated resolutions rather than verdicts; a tried case with punitive exposure sits well above the top of each band.",
        ],
        tables: [
          {
            caption: "Typical negotiated settlement bands by fact pattern",
            columns: ["Fact pattern", "Core proof", "Typical settlement band", "What pushes it higher"],
            rows: [
              ["Stage III/IV pressure ulcer, survived", "Braden scores, turn logs, wound photos, weight records", "$150,000 – $600,000", "Ulcer acquired in-house, missing repositioning documentation"],
              ["Fall with hip fracture", "Fall-risk care plan, prior falls, call-light response times", "$100,000 – $400,000", "Two or more prior unwitnessed falls with no care-plan update"],
              ["Dehydration / malnutrition", "Intake and output charting, weight loss over 5% in 30 days", "$125,000 – $500,000", "Hospital transfer with acute kidney injury"],
              ["Sepsis from untreated infection", "Vitals trending, nursing notes, delay to transfer", "$400,000 – $1,500,000", "Death, or a documented delay of more than 24 hours"],
              ["Elopement / wandering injury", "Wander-guard orders, door alarm logs, supervision level", "$250,000 – $1,000,000", "Death from exposure or traffic; alarms known to be broken"],
              ["Physical or sexual abuse by staff", "Police report, APS substantiation, hiring and background file", "$300,000 – $2,000,000+", "Negligent hiring or retention after prior complaints"],
              ["Medication error with harm", "MAR, pharmacy records, physician orders", "$75,000 – $350,000", "Antipsychotic used as chemical restraint without consent"],
            ],
            note: "Bands are general observations from reported settlements and public verdict reporters; individual results depend on jurisdiction, damages caps and the resident's life expectancy. Not a prediction of value in your case.",
          },
          {
            caption: "Records to request, who holds them and why they matter",
            columns: ["Record", "Source", "Why it decides the case"],
            rows: [
              ["Complete medical chart + MAR", "Facility medical records dept.", "Establishes orders given and care actually delivered"],
              ["MDS 3.0 assessments", "Facility / CMS submission", "Shows the facility's own risk scoring at admission and quarterly"],
              ["Braden Scale scoring and wound notes", "Nursing / wound-care vendor", "Pressure-ulcer preventability turns on this"],
              ["Turn-and-reposition and toileting logs", "Nursing flow sheets", "Gaps here are the classic neglect exhibit"],
              ["PBJ staffing data", "CMS Payroll-Based Journal (public)", "Documents chronic understaffing on the shifts in question"],
              ["Form 2567 Statements of Deficiency", "State survey agency (public)", "Establishes notice and a pattern for punitive damages"],
              ["Five-Star rating history", "Medicare Care Compare (public)", "Contextualizes the facility against state averages"],
              ["Incident and grievance reports", "Facility administrator", "Often contradicts the chart's sanitized version"],
              ["Admission packet + arbitration page", "Family copy or facility", "Determines the forum and often the value"],
            ],
            note: "Send a written HIPAA-compliant request naming each item; facilities generally must respond within 2 business days for on-site review and 2 working days for copies under 42 CFR § 483.10(g)(2).",
          },
        ],
      },
      {
        heading: "Complaint routes and what each one produces",
        tables: [
          {
            caption: "Where to report, timing and the record it creates",
            columns: ["Channel", "Who investigates", "Typical response time", "Evidentiary value"],
            rows: [
              ["State survey agency complaint", "Licensing / certification surveyors", "Immediate jeopardy: 2 days; high harm: 10 days", "Produces a Form 2567 finding usable in litigation"],
              ["Adult Protective Services", "County APS caseworker", "24 hours to 10 days by severity", "Substantiated finding corroborates abuse allegations"],
              ["Long-Term Care Ombudsman", "State ombudsman program", "Days", "Advocacy and retaliation protection; records are confidential"],
              ["Law enforcement", "Local police / DA elder-crimes unit", "Immediate for assault", "Criminal file, interviews, forensic photographs"],
              ["Medicaid Fraud Control Unit", "State attorney general", "Weeks", "Reaches ownership-level neglect and billing for care not given"],
            ],
          },
        ],
      },
    ],
    howTo: [
      { name: "Document the injury today", text: "Dated photographs of wounds and bruising, plus written notes of every conversation with staff and their names." },
      { name: "Request the complete chart in writing", text: "You are entitled to the medical record, MDS assessments, care plans, wound notes and incident reports. Request them before a transfer or discharge." },
      { name: "File the regulatory complaints", text: "State survey agency, Adult Protective Services and the Long-Term Care Ombudsman. Each generates an independent investigative record." },
      { name: "Pull the facility's public record", text: "Check the CMS Five-Star rating and recent Form 2567 deficiencies for a staffing or wound-care pattern." },
      { name: "Preserve the admission packet", text: "The arbitration clause, signature page and any power-of-attorney documentation shape the entire strategy." },
      { name: "Value and pursue the claim", text: "Damages include medical costs, pain and suffering, and — in gross-neglect cases — punitive damages under state elder-abuse statutes." },
    ],
    faqs: [
      { question: "What is the average nursing home abuse settlement?", answer: "Documented neglect cases with a serious pressure ulcer or fracture commonly settle between $100,000 and $500,000. Cases involving death, sepsis from an untreated stage IV ulcer, or a pattern of regulatory violations frequently exceed $1 million, particularly in states whose elder-abuse statutes allow attorney fees and enhanced damages." },
      { question: "Is a pressure ulcer automatically neglect?", answer: "Not automatically, but it is close. CMS guidance provides that a resident who enters without pressure sores should not develop them unless clinically unavoidable — and the facility bears the burden of documenting why prevention failed despite proper assessment, turning schedules and nutrition." },
      { question: "Who can file the claim?", answer: "The resident, an agent under a valid power of attorney, a court-appointed guardian, or — if the resident has died — the personal representative of the estate through a wrongful death and survival action." },
      { question: "Does signing an arbitration agreement kill my case?", answer: "No. It changes the forum, not the right to compensation, and these clauses are regularly challenged when signed by someone without legal authority, or when the terms are unconscionable. Many cases still resolve for full value in arbitration." },
      { question: "How long do I have to sue a nursing home?", answer: "Generally the state personal-injury statute of limitations of one to three years, but some states apply a shorter medical-malpractice period with a certificate-of-merit requirement. Wrongful death clocks usually run from the date of death." },
      { question: "Will reporting cause retaliation against my relative?", answer: "Retaliation and retaliatory discharge are prohibited under federal resident-rights rules. The Long-Term Care Ombudsman exists specifically to intervene when a facility pressures a resident or family after a complaint." },
      { question: "How much does a nursing home abuse lawyer cost?", answer: "Almost always a contingency fee of 33% to 40%, with the firm advancing the cost of medical experts, life-care planners and record retrieval. Those costs are meaningful — expert review alone often runs $10,000 to $25,000 — which is why firms screen for documented injury before accepting a case." },
      { question: "Can I sue if my relative was on Medicaid?", answer: "Yes. Payment source does not affect the right to sue, though Medicaid and Medicare hold statutory liens against any recovery for the care they paid for. Those liens are negotiable and are usually resolved before the settlement is disbursed." },
      { question: "What if the facility says my relative fell 'unwitnessed'?", answer: "An unwitnessed fall is not a defense — it is often the claim. Once a fall-risk assessment exists, the facility owes the interventions in its own care plan: bed alarms, low beds, mats, scheduled toileting and supervision. The question is whether those interventions were ordered and delivered." },
      { question: "How long does a nursing home case take?", answer: "Expect 12 to 24 months when the case settles pre-suit or at mediation, and 2 to 4 years if it is tried. Arbitration is usually faster, often 9 to 18 months, which is one reason defendants prefer it." },
      { question: "Does a CMS deficiency automatically prove negligence?", answer: "No, but it is powerful corroboration. A Form 2567 citation for the same failure mode — inadequate pressure-ulcer prevention, insufficient staffing, failure to supervise — establishes notice and supports a punitive-damages claim in states that allow one." },
      { question: "What damages can the family recover after a death?", answer: "Two claims usually run together: a survival action for the resident's pain, suffering and medical bills before death, and a wrongful death claim for the family's loss. Many state elder-abuse statutes add attorney fees and, for reckless neglect, enhanced or punitive damages." },
    ],
    datePublished: "2026-02-18",
    dateModified: "2026-08-08",
    authorId: "personal-injury-editor",
    primaryCta: {
      path: "/tools/consumer/settlement-estimator",
      label: "Estimate a nursing home neglect claim",
      description: "Model medical damages and a pain-and-suffering multiplier for an elder-neglect claim.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/personal-injury",
      label: "Find a nursing home abuse lawyer near you",
      description: "Elder-abuse firms take these on contingency and advance expert costs.",
    },
    recommenderTopic: "personal-injury",
    cluster: "Personal injury cluster",
    related: [
      { label: "Personal injury settlement hub", href: "/personal-injury-settlements", blurb: "How injury claims are valued end to end." },
      { label: "Pain and suffering explained", href: "/pain-and-suffering-calculation", blurb: "Multiplier and per diem methods." },
      { label: "Wrongful termination settlements", href: "/wrongful-termination-settlements", blurb: "For staff fired after reporting abuse." },
      { label: "Mass tort lawsuits", href: "/mass-tort-lawsuits", blurb: "Active litigations and eligibility." },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    slug: "workers-comp-denied-what-next",
    category: "Workers' Compensation",
    h1: "Workers' Comp Claim Denied? Here's Exactly What to Do Next",
    metaTitle: "Workers' Comp Denied — Appeal Steps & Deadlines",
    metaDescription:
      "Denied workers' compensation claim? Understand the denial letter, IME games, utilization review, appeal deadlines by state, and how to protect your benefits.",
    tagline: "Workers' comp appeals · IME · Utilization review · State board deadlines",
    intro: [
      "A workers' compensation denial is not the end of the claim — it is the start of an administrative appeal with a hard deadline. Most denials arrive as a standardized form (a Notice of Controversy, Form C-7 in New York, DWC-1/Notice of Denial in California, DWC Form-021 in Texas) and cite one of a short list of reasons: late notice to the employer, no medical evidence linking the injury to work, a pre-existing or degenerative condition, an intoxication or horseplay defense, or a dispute that you were an employee at all.",
      "Insurers such as Travelers, The Hartford, Liberty Mutual, Zurich, AmTrust, Sedgwick (as third-party administrator) and state funds like SCIF and SAIF handle these files with claim-scoring and utilization review vendors. The denial letter is a litigation position, not a medical determination — and the majority of properly appealed denials result in some award or settlement.",
    ],
    entityBlock: {
      category: "Workers' Compensation · Insurance Disputes",
      intro:
        "Workers' comp is a state administrative system with its own courts, forms, and deadlines. Denials are frequently driven by an independent medical examination or a utilization-review vendor rather than the treating physician's opinion.",
      entities: [
        "Notice of Controversy",
        "Independent Medical Examination (IME)",
        "Utilization Review (UR)",
        "Independent Medical Review (IMR)",
        "Qualified Medical Evaluator (QME)",
        "Maximum Medical Improvement (MMI)",
        "Permanent Partial Disability (PPD)",
        "Temporary Total Disability (TTD)",
        "Impairment rating / AMA Guides",
        "Compromise & Release",
        "Sedgwick",
        "Liberty Mutual",
        "The Hartford",
        "Travelers",
        "Workers' Compensation Appeals Board (WCAB)",
        "Nurse case manager",
      ],
      relatedTerms: [
        { label: "SSDI denied — what next", href: "/ssdi-denied-what-next" },
        { label: "Long-term disability claim guide", href: "/long-term-disability-claim-guide" },
      ],
    },
    keyFacts: [
      { label: "Typical appeal window", value: "30 days – 2 years (state-specific)" },
      { label: "Most common denial reason", value: "Causation / pre-existing condition" },
      { label: "Who decides the appeal", value: "State board, commission or WCAB judge" },
      { label: "Attorney fee structure", value: "Contingency, usually 10–20%, court-approved" },
      { label: "Benefit types at stake", value: "Medical, TTD, PPD, vocational rehab" },
      { label: "Settlement vehicle", value: "Compromise & Release / lump-sum stipulation" },
    ],
    sections: [
      {
        heading: "Read the denial letter first — the reason dictates the fix",
        bullets: [
          "Late notice — respond with proof of when and how you reported (text, email, supervisor statement).",
          "No causal relationship — you need a treating physician's narrative stating the injury is work-related to a reasonable degree of medical certainty.",
          "Pre-existing condition — the legal standard in most states is aggravation, not pristine health. Prior degeneration does not defeat a claim that made it symptomatic.",
          "Not an employee — misclassification as a 1099 contractor is challengeable on the economic-realities test.",
          "Intoxication / horseplay — the employer must prove the defense; a positive test alone is often not enough without proof of causation.",
          "IDD / no objective findings — get imaging and a functional capacity evaluation into the record.",
        ],
      },
      {
        heading: "The IME and utilization review problem",
        paragraphs: [
          "Denials frequently rest on an insurer-selected independent medical examiner who spends fifteen minutes with you, or a utilization-review physician who never examines you at all and simply denies the requested treatment as not medically necessary. Both are rebuttable. Requesting the UR determination and the IME report in full — and having your treating physician respond point by point — is the single most effective step in an appeal.",
        ],
      },
      {
        heading: "Keep your benefits alive while you appeal",
        bullets: [
          "Continue authorized treatment; gaps are read as recovery.",
          "Use your group health insurance under protest and preserve the bills for reimbursement.",
          "Apply for state short-term disability or unemployment where eligible, and disclose it accurately.",
          "Do not sign a broad medical authorization or a Compromise & Release without understanding what future medical rights you are waiving.",
          "Assume surveillance and social media review are happening.",
        ],
      },
      {
        heading: "Denial reasons, cure strategy and realistic odds",
        tables: [
          {
            caption: "The six denial reasons that drive most workers' comp controversions",
            columns: ["Stated reason", "What the carrier is really arguing", "What cures it", "Typical cure time"],
            rows: [
              ["Late notice", "You reported after the statutory notice window (30 days in NY/CA, 30 days in TX, 90 days in PA)", "Text messages, emails, incident report, coworker or supervisor affidavit showing actual notice", "2–4 weeks"],
              ["No causal relationship", "The treating records do not connect the mechanism of injury to the diagnosis", "Treating-physician narrative using the phrase 'to a reasonable degree of medical certainty'", "3–6 weeks"],
              ["Pre-existing / degenerative", "Imaging shows arthritis or disc disease predating the accident", "Aggravation opinion — most states compensate a work-related worsening of a prior condition", "4–8 weeks"],
              ["Not an employee", "You were paid on a 1099 or through a staffing firm", "Economic-realities evidence: schedule control, tools supplied, exclusivity, direct supervision", "1–3 months"],
              ["Intoxication / horseplay / violation of rule", "A post-accident test was positive or a safety rule was broken", "Carrier bears the burden; a positive THC test without impairment proof rarely defeats the claim", "1–3 months"],
              ["Treatment not medically necessary", "A utilization-review physician denied the requested surgery or therapy on paper", "UR appeal / IMR with peer-reviewed guideline citations (MTUS, ODG, ACOEM)", "30–45 days"],
            ],
            note: "Timelines assume the treating physician cooperates promptly. Statutory notice windows are examples; confirm your own state's rule.",
          },
        ],
      },
      {
        heading: "Appeal deadlines and the first filing by state",
        paragraphs: [
          "Workers' comp appeals run on administrative clocks that are far shorter than civil statutes of limitation. The date printed on the denial form controls. If two dates appear — one to request a hearing and one to file a claim petition — calendar the earlier one.",
        ],
        tables: [
          {
            caption: "Denial-appeal windows and first filing (representative states, 2026)",
            columns: ["State", "First filing after denial", "Window", "Deciding body"],
            rows: [
              ["California", "Application for Adjudication + DOR", "1 year from denial / injury date", "WCAB judge (UR disputes go to IMR in 30 days)"],
              ["New York", "Form RFA-1LC hearing request", "Claim must be filed within 2 years", "NY Workers' Compensation Board"],
              ["Texas", "DWC-045 Benefit Review Conference request", "1 year from injury; BRC promptly after denial", "Division of Workers' Compensation"],
              ["Florida", "Petition for Benefits (PFB)", "2 years from injury, 1 year from last benefit", "Judge of Compensation Claims"],
              ["Pennsylvania", "Claim Petition", "3 years from injury", "Workers' Compensation Judge"],
              ["Illinois", "Application for Adjustment of Claim", "3 years from injury / 2 years from last payment", "Illinois Workers' Compensation Commission"],
              ["Georgia", "Form WC-14", "1 year from injury", "State Board of Workers' Compensation"],
              ["Ohio", "Notice of Appeal to Industrial Commission", "14 days from BWC order", "Industrial Commission of Ohio"],
              ["New Jersey", "Claim Petition", "2 years from injury / last payment", "Division of Workers' Compensation"],
              ["Michigan", "Application for Mediation or Hearing", "2 years from injury", "Board of Magistrates"],
            ],
            note: "Deadlines summarized from state workers' compensation statutes and agency forms. Verify the exact date on your denial notice — a missed administrative deadline usually ends the claim on the merits.",
          },
        ],
      },
      {
        heading: "How denied claims resolve",
        paragraphs: [
          "Most appeals settle before a full hearing. Once the treating physician's causation narrative is in the record and the IME has been deposed or contradicted, carriers reassess exposure and offer a stipulated award or a lump-sum Compromise & Release. Value turns on the impairment rating under the AMA Guides, wage rate, remaining medical exposure and whether future medical is left open or closed out.",
        ],
        tables: [
          {
            caption: "What a workers' comp settlement is built from",
            columns: ["Component", "How it is calculated", "Notes"],
            rows: [
              ["Temporary total disability (TTD)", "Roughly 66⅔% of average weekly wage, subject to a state maximum", "Paid for the healing period until MMI"],
              ["Permanent partial disability (PPD)", "Impairment % under the AMA Guides × statutory weeks × compensation rate", "The single biggest driver in most settlements"],
              ["Future medical", "Projected cost of injections, surgery, medication and follow-up", "Closing future medical usually raises the lump sum materially"],
              ["Medicare set-aside (MSA)", "Required analysis when you are a Medicare beneficiary or reasonably expect entitlement", "Adds 4–8 weeks to closing; funds must be spent on injury-related care"],
              ["Vocational rehabilitation", "Retraining benefit where you cannot return to the prior job", "Available in some states only"],
              ["Attorney fee", "Contingency, typically 10–20%, approved by the board", "Deducted from the award, not added to it"],
            ],
            note: "Illustrative structure only. Rates, statutory weeks and maximums differ in every state.",
          },
        ],
      },
    ],

    howTo: [
      { name: "Note your appeal deadline immediately", text: "Find the appeal window on the denial form and calendar it. Missing it can end the claim permanently regardless of merit." },
      { name: "Request the full claim file", text: "Ask in writing for the IME report, UR determination, adjuster notes where discoverable, and the wage statement used to set your rate." },
      { name: "Get a causation narrative", text: "Have your treating physician write that the work event caused or aggravated the condition to a reasonable degree of medical certainty." },
      { name: "File the appeal form with the state board", text: "Each state has its own petition — Form C-3/RFA/DWC-041. File it even if negotiations are ongoing." },
      { name: "Prepare for the hearing", text: "Witness statements, incident report, photographs of the hazard, and prior complaints about the same condition." },
      { name: "Value any settlement offer", text: "Run your impairment rating and wage rate through the workers' comp calculator before accepting a Compromise & Release." },
    ],
    faqs: [
      { question: "How long do I have to appeal a workers' comp denial?", answer: "It varies sharply by state — as little as 20 to 30 days to request a hearing in some jurisdictions, up to one or two years to file a claim petition in others. The deadline is printed on the denial notice; treat the shortest date on the form as the real one." },
      { question: "What percentage of denied workers' comp claims win on appeal?", answer: "Outcomes vary by state and by claim type, but a substantial share of appealed denials end in an award or negotiated settlement — particularly causation denials, which are usually cured by a properly worded treating-physician narrative." },
      { question: "Can I see my own doctor instead of the company doctor?", answer: "It depends on the state. Some allow free choice of physician from the outset, others require you to treat within an employer-designated network or MPN for an initial period before switching. Your treating physician's opinion carries the most weight either way." },
      { question: "Can I be fired for filing a workers' comp claim?", answer: "Retaliation for filing is prohibited in every state and creates a separate cause of action. Employers usually frame the termination as performance-based or as an inability to accommodate restrictions, so document your performance history and any comments tied to the claim." },
      { question: "Should I hire a lawyer for a denied claim?", answer: "For any denial involving surgery, lost time beyond a few weeks, or a permanent impairment rating, yes. Workers' comp attorney fees are contingency-based and capped and approved by the state board — typically 10–20% of the recovery." },
      { question: "What is a Compromise & Release?", answer: "A lump-sum settlement that typically closes the claim, often including future medical care. It is final: once approved, you generally cannot reopen the claim if the condition worsens. Value it against expected future treatment before signing." },
      { question: "Do I have to attend the insurance company's IME?", answer: "In almost every state, yes — refusing an authorized independent medical examination can suspend your benefits. What you can do is bring a witness where permitted, write down the start and end time and exactly what was examined, and request a full copy of the report so your treating physician can rebut it point by point." },
      { question: "What happens if I miss the appeal deadline?", answer: "The claim is usually barred on the merits, no matter how strong the medical evidence. A small number of states allow late filing for equitable tolling — fraudulent concealment by the employer, mental incapacity, or an occupational disease that was not discoverable — but those exceptions are narrow and require a motion." },
      { question: "Can I get unemployment while my workers' comp appeal is pending?", answer: "Sometimes. Unemployment requires that you be able and available to work, so it may conflict with a total-disability claim but not with a claim for partial disability or a denied claim where you are working with restrictions. Disclose the workers' comp claim on the unemployment application — inconsistent statements are the fastest way to lose both." },
      { question: "How is my average weekly wage calculated, and why does it matter?", answer: "Most states average your gross earnings over the 52 weeks before the injury, including overtime and, in some states, the value of lodging or per diem. Because temporary and permanent benefits are both a percentage of that number, an understated AWW quietly reduces every dollar you receive — check the carrier's wage statement against your own pay records." },
      { question: "What is utilization review and how do I fight a UR denial?", answer: "Utilization review is a paper process where a physician retained by the carrier decides whether requested treatment meets evidence-based guidelines such as MTUS, ODG or ACOEM. You fight it by having the treating physician resubmit with the specific guideline citation, functional deficits, conservative care already tried, and objective imaging — and, in California, by filing for Independent Medical Review within 30 days." },
      { question: "Should I close out future medical in a settlement?", answer: "Only after pricing it. Ask the treating physician for a future-care plan — injections, hardware removal, revision surgery, medication — and cost it out. If you are on Medicare or likely to be within 30 months, a Medicare set-aside is required and the funds are restricted to injury-related care." },
    ],
    datePublished: "2026-03-04",
    dateModified: "2026-08-07",
    authorId: "personal-injury-editor",

    primaryCta: {
      path: "/tools/consumer/workers-comp-settlement-calculator",
      label: "Estimate your workers' comp settlement",
      description: "Model impairment rating, weekly wage rate and future medical exposure.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/employment",
      label: "Find a workers' comp lawyer near you",
      description: "State-board-approved contingency fees, usually 10–20%.",
    },
    recommenderTopic: "workers-compensation",
    cluster: "Disability & benefits cluster",
    related: [
      { label: "SSDI denied — what next", href: "/ssdi-denied-what-next", blurb: "Reconsideration, ALJ hearing and back pay." },
      { label: "Long-term disability claim guide", href: "/long-term-disability-claim-guide", blurb: "ERISA appeals and the administrative record." },
      { label: "Wrongful termination settlements", href: "/wrongful-termination-settlements", blurb: "If you were fired after filing." },
      { label: "Wage garnishment calculator", href: "/tools/finance/wage-garnishment-calculator", blurb: "Protect income while benefits are paused." },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    slug: "car-insurance-claim-denied",
    category: "Auto Insurance",
    h1: "Car Insurance Claim Denied: How to Fight Back and Win",
    metaTitle: "Car Insurance Claim Denied — Appeal & Bad Faith",
    metaDescription:
      "Denied auto insurance claim? Learn the real denial reasons, how to appeal, when it becomes bad faith, and how to file a state Department of Insurance complaint.",
    tagline: "Auto claim denials · Bad faith · Department of Insurance complaints",
    intro: [
      "An auto insurance denial usually arrives with a short reason code and a long list of policy citations. The most common grounds are a late or delayed notice, a lapse in premium payment at the time of loss, an excluded driver behind the wheel, a material misrepresentation on the application, an alleged pre-existing condition or 'MIST' soft-tissue coding, a disputed liability determination, or a claim valued below the deductible after a low property-damage estimate.",
      "Carriers including State Farm, GEICO, Progressive, Allstate, USAA, Farmers, Liberty Mutual, Nationwide and Travelers run claims through scoring platforms — Colossus, ClaimIQ, Mitchell Decision Point, Xactimate for property — and denials are often driven by those outputs rather than a human read of the file. Every state requires insurers to follow Unfair Claims Settlement Practices standards, and a denial that ignores them can convert an ordinary claim into a bad-faith case with extra-contractual damages.",
    ],
    entityBlock: {
      category: "Insurance Disputes · Auto",
      intro:
        "Auto denials are governed by the policy contract plus the state's unfair claims practices act. Two escalation routes exist in parallel: an internal appeal with the carrier, and a formal complaint to the state Department of Insurance, which forces a written response.",
      entities: [
        "Unfair Claims Settlement Practices Act",
        "Department of Insurance (DOI) complaint",
        "Bad faith / extra-contractual damages",
        "Colossus",
        "ClaimIQ",
        "Mitchell Decision Point",
        "MIST (Minor Impact Soft Tissue)",
        "Material misrepresentation / rescission",
        "Named driver exclusion",
        "Total loss valuation (ACV)",
        "Diminished value",
        "Appraisal clause",
        "Uninsured / underinsured motorist",
        "Examination Under Oath (EUO)",
        "Reservation of rights letter",
        "Subrogation",
      ],
      relatedTerms: [
        { label: "Auto insurance claim guide", href: "/auto-insurance-claim-guide" },
        { label: "Homeowners claim denied", href: "/homeowners-insurance-claim-denied" },
        { label: "Uber & Lyft accident claims", href: "/uber-lyft-accident-claims" },
      ],
    },
    keyFacts: [
      { label: "Internal appeal window", value: "Usually 30–180 days (check the letter)" },
      { label: "DOI complaint response time", value: "Typically 15–30 days" },
      { label: "Bad faith exposure", value: "Consequential + punitive damages, fees in some states" },
      { label: "Total loss dispute tool", value: "Policy appraisal clause" },
      { label: "Diminished value recovery", value: "~10–25% of pre-loss value where allowed" },
      { label: "Cost to complain to the DOI", value: "$0" },
    ],
    sections: [
      {
        heading: "Denial reasons and the counter-move for each",
        bullets: [
          "Late notice — show the date you reported and that the carrier suffered no prejudice; most states require actual prejudice to void coverage.",
          "Policy lapse — request the payment history and any cancellation notice; improper notice of cancellation revives coverage in many states.",
          "Excluded driver — verify the exclusion was signed and in force on the loss date.",
          "Misrepresentation — the misstatement must generally be material to the risk, not a trivial error.",
          "Liability disputed — get the police report, scene photos, dashcam, and independent witness statements into the file.",
          "Injuries 'not related to the accident' — obtain a treating-physician causation letter addressing pre-existing findings directly.",
          "Lowball total loss — invoke the appraisal clause and submit comparable local listings, not the carrier's national valuation report.",
        ],
      },
      {
        heading: "When a denial becomes bad faith",
        paragraphs: [
          "A carrier owes a duty of good faith and fair dealing. Failing to conduct a reasonable investigation, misrepresenting policy terms, ignoring communications, refusing to explain a denial in writing, or unreasonably delaying payment where liability is clear can each support a bad-faith claim. In a first-party context, that can mean damages beyond the policy limit; in a third-party context, an insurer that refuses a within-limits demand can be exposed to the entire excess verdict.",
        ],
      },
      {
        heading: "The two escalation tracks — use both",
        bullets: [
          "Internal appeal: written, specific, with the exact policy provision, the documents rebutting the stated reason, and a deadline for response.",
          "State Department of Insurance complaint: free, online, and forces the carrier's compliance unit to answer in writing within a set period. Complaints are tracked against the carrier's market-conduct record.",
          "Where the amount is small, small claims court on the property-damage or deductible portion is often faster than either.",
        ],
      },
      {
        heading: "Denial grounds, how often they appear, and what beats them",
        tables: [
          {
            caption: "Auto claim denial grounds and the evidence that reverses them",
            columns: ["Stated ground", "What the carrier must show", "Evidence that reverses it"],
            rows: [
              ["Late notice", "Actual prejudice to the investigation in most states", "Report date proof, intact vehicle, available witnesses"],
              ["Policy lapse / cancellation", "Proper statutory notice of cancellation was mailed", "Payment history, bank record, absence of a compliant notice"],
              ["Named-driver exclusion", "A signed exclusion in force on the loss date", "Copy of the signed endorsement and its effective dates"],
              ["Material misrepresentation", "The misstatement was material to underwriting the risk", "Underwriting guidelines showing the fact would not change the rate"],
              ["Liability disputed", "A reasonable investigation supporting its version", "Police report, dashcam, scene photos, independent witnesses"],
              ["Injuries unrelated / pre-existing", "Medical opinion severing causation", "Treating-physician causation letter addressing prior findings"],
              ["MIST / low-impact", "Biomechanical or damage-threshold argument", "Repair estimate detail, photographs, imaging, treatment continuity"],
              ["Total loss valuation too low", "A supportable actual-cash-value figure", "Local comparable listings, dealer quotes, appraisal-clause demand"],
            ],
            note: "Denial grounds compiled from state Department of Insurance complaint categories and standard personal-auto policy conditions.",
          },
        ],
      },
      {
        heading: "Prompt-pay clocks and complaint routes by state",
        paragraphs: [
          "Every state sets deadlines for acknowledging a claim, deciding coverage, and paying. Missing them is not just annoying — it is the statutory hook for an unfair claims practice argument and the first thing a Department of Insurance analyst checks.",
        ],
        tables: [
          {
            caption: "Representative prompt-payment deadlines (large states)",
            columns: ["State", "Acknowledge claim", "Coverage decision", "Payment after acceptance"],
            rows: [
              ["California", "15 days", "40 days from proof of loss", "30 days"],
              ["Texas", "15 days", "15 business days after receiving all items", "5 business days"],
              ["Florida", "14 days", "60 days (property); 90 days (PIP)", "20 days"],
              ["New York", "15 business days", "15 business days after proof of loss", "5 business days"],
              ["Illinois", "15 working days", "30 working days", "30 days"],
              ["Pennsylvania", "10 working days", "15 working days after investigation", "Prompt on acceptance"],
            ],
            note: "Deadlines summarized from state unfair claims settlement practices regulations; exact triggers vary by claim type. Verify against your state's current rule before citing it in an appeal.",
          },
        ],
      },
      {
        heading: "What bad faith is worth",
        tables: [
          {
            caption: "Recovery beyond the policy benefit, by theory",
            columns: ["Theory", "What you can recover", "Typical requirement"],
            rows: [
              ["Breach of contract", "The unpaid benefit plus interest", "Coverage exists and the loss is proved"],
              ["First-party bad faith", "Consequential damages, emotional distress, sometimes fees", "Denial was unreasonable and the insurer knew or recklessly disregarded that"],
              ["Statutory unfair claims practice", "Statutory penalties and attorney fees in many states", "Violation of the state's claims-handling standards"],
              ["Third-party bad faith (excess exposure)", "The entire verdict above policy limits", "Refusal of a reasonable within-limits demand"],
              ["Punitive damages", "Multiplier on compensatory damages where allowed", "Clear and convincing evidence of malice or oppression"],
            ],
          },
        ],
      },
    ],
    howTo: [
      { name: "Get the denial in writing", text: "Demand a written denial citing the specific policy language relied on. Verbal denials are not appealable." },
      { name: "Request the complete claim file", text: "Ask for the adjuster's estimate, valuation report, any IME or peer review, and the recorded statement transcript." },
      { name: "Rebut the stated reason with documents", text: "Match each cited ground with evidence — payment receipts, causation letters, comparable vehicle listings, witness statements." },
      { name: "File the internal appeal in writing", text: "Send it by a trackable method, set a 30-day response deadline, and reference the unfair claims practices statute." },
      { name: "File a Department of Insurance complaint", text: "Free and effective. Attach the denial letter and your appeal; the carrier must respond to the regulator." },
      { name: "Escalate to counsel if it stays denied", text: "Bad-faith and coverage attorneys take these on contingency where extra-contractual damages or attorney fees are available." },
    ],
    faqs: [
      { question: "Can I sue my insurance company for denying my claim?", answer: "Yes. You can sue for breach of contract to recover the benefit itself, and in most states for bad faith if the denial was unreasonable — which can add consequential damages, emotional distress, attorney fees and, in some states, punitive damages on top of the policy benefit." },
      { question: "How long does an insurance company have to pay a claim?", answer: "State prompt-payment rules typically require acknowledgment within 10–15 days, a coverage decision within 30–40 days of receiving proof of loss, and payment within a short window after acceptance. Missing those deadlines is itself evidence of unfair claims practice." },
      { question: "Does complaining to the Department of Insurance actually work?", answer: "Often, yes. It costs nothing, the carrier must respond in writing to the regulator, and complaint volume feeds into market-conduct examinations. Many denials are reversed at this stage without litigation." },
      { question: "What is the appraisal clause?", answer: "A provision in most auto and property policies allowing either side to demand a binding valuation by independent appraisers and an umpire when the dispute is about the amount of loss rather than coverage. It is the fastest route out of a lowball total-loss valuation." },
      { question: "Can my insurer deny my claim because I have a pre-existing injury?", answer: "Not simply because a prior condition exists. The legal standard in most states is that a defendant takes the plaintiff as found — an aggravation of a pre-existing condition is compensable. What the carrier needs is a physician saying the current symptoms are unrelated, and that opinion is rebuttable." },
      { question: "Will appealing a denial raise my premium?", answer: "Appealing a claim decision is not a rate-making event on its own. Premiums move on at-fault losses, claim frequency and territory rating, not on whether you challenged a denial." },
      { question: "What should my appeal letter actually say?", answer: "Four things: the claim number and date of loss; the exact denial ground quoted from the letter; the documents that rebut it, listed and attached; and a demand for a written decision within 30 days citing your state's unfair claims settlement practices statute. Keep it under two pages and send it by a trackable method." },
      { question: "How long do I have to appeal an auto claim denial?", answer: "The internal appeal window is set by the letter and is commonly 30 to 180 days. Separately, the contractual suit-limitation clause in most auto policies gives you one to two years from the loss to sue, and the state's breach-of-contract statute of limitations (often 3–6 years) sits behind that. Diary all three." },
      { question: "Can the insurer deny my claim because I did not get a recorded statement done?", answer: "They can assert non-cooperation, which is a real policy condition for your own insurer. But a denial on that basis usually requires a material breach that prejudiced the investigation, not a scheduling dispute. Offer a written statement and document your availability." },
      { question: "What is diminished value and can I recover it after a denial?", answer: "Diminished value is the loss in resale value of a repaired vehicle. Most states allow third-party diminished-value claims against the at-fault driver's carrier (Georgia is the strongest for first-party claims). Recovery typically runs 10–25% of pre-loss value and needs an independent appraisal, not the carrier's estimate." },
      { question: "Does filing a Department of Insurance complaint hurt my chances in court?", answer: "No. The complaint file is administrative, costs nothing, and the carrier's written response often becomes useful evidence of its stated reasoning — which is exactly what a bad-faith case needs. Filing does not waive any right to sue." },
      { question: "What if the carrier just stops responding instead of denying?", answer: "Silence is treated as constructive denial in most unfair-claims statutes, which require acknowledgment and a decision within fixed periods. Send a written demand referencing the statutory deadline, then file the DOI complaint. Delay itself is actionable bad faith in many states." },
    ],
    primaryCta: {
      path: "/tools/consumer/settlement-estimator",
      label: "Value your claim before you appeal",
      description: "Know your realistic number before you respond to the adjuster.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/insurance-dispute",
      label: "Find an insurance dispute lawyer near you",
      description: "Bad-faith cases are frequently taken on contingency.",
    },
    datePublished: "2026-02-14",
    dateModified: "2026-08-06",
    authorId: "personal-injury-editor",
    recommenderTopic: "insurance-dispute",
    cluster: "Insurance dispute cluster",
    related: [
      { label: "Auto insurance claim guide", href: "/auto-insurance-claim-guide", blurb: "Carrier tendencies and claim-scoring software." },
      { label: "Homeowners claim denied", href: "/homeowners-insurance-claim-denied", blurb: "Storm, water and hurricane deductible disputes." },
      { label: "Uber & Lyft accident claims", href: "/uber-lyft-accident-claims", blurb: "Which rideshare policy period applies." },
      { label: "Personal injury settlement hub", href: "/personal-injury-settlements", blurb: "How injury claims are valued." },
    ],
  },

  /* ------------------------------------------------------------------ 6 */
  {
    slug: "homeowners-insurance-claim-denied",
    category: "Property Insurance",
    h1: "Homeowners Insurance Claim Denied: Storm, Water and Roof Disputes",
    metaTitle: "Homeowners Insurance Claim Denied — What to Do",
    metaDescription:
      "Denied homeowners claim? Understand ACV vs RCV, hurricane and wind/hail deductibles, water-damage exclusions, the appraisal clause, public adjusters and bad faith.",
    tagline: "HO-3 policies · Hurricane deductibles · Appraisal clause · Public adjusters",
    intro: [
      "Homeowners claim denials cluster around a handful of policy mechanics that most policyholders never read until a loss happens. A standard HO-3 policy covers the dwelling on an open-perils basis but excludes flood, earth movement, wear and tear, and — critically — 'constant or repeated seepage' of water over 14 days or more. Add a separate percentage-based hurricane or wind/hail deductible (commonly 1%–5% of Coverage A in Florida, Texas, Louisiana and the Gulf and Atlantic coasts) and a large storm claim can be denied or reduced to near zero without the carrier ever disputing that damage occurred.",
      "The second mechanic is valuation. Actual Cash Value (ACV) pays replacement cost minus depreciation; Replacement Cost Value (RCV) pays the depreciation holdback only after repairs are completed and documented. Many 'denials' are really recoverable-depreciation disputes. Carriers including State Farm, Allstate, Citizens Property Insurance, Universal, Travelers, USAA and Chubb rely on Xactimate estimates and engineering reports from vendors such as Rimkus, EFI Global and Donan to support these positions.",
    ],
    entityBlock: {
      category: "Property Insurance · Storm & Water Damage",
      intro:
        "Property denials turn on the interaction between named exclusions, percentage deductibles and valuation method. The appraisal clause, a licensed public adjuster and a state Department of Insurance complaint are the three practical levers before litigation.",
      entities: [
        "HO-3 open perils policy",
        "Actual Cash Value (ACV)",
        "Replacement Cost Value (RCV)",
        "Recoverable depreciation",
        "Hurricane deductible (1%–5%)",
        "Wind/hail deductible",
        "Anti-concurrent causation clause",
        "Flood exclusion / NFIP",
        "Wear and tear exclusion",
        "Constant or repeated seepage",
        "Xactimate",
        "Public adjuster",
        "Appraisal clause",
        "Examination Under Oath (EUO)",
        "Proof of Loss (sworn)",
        "Citizens Property Insurance",
        "Assignment of Benefits (AOB)",
        "Matching statute",
      ],
      relatedTerms: [
        { label: "Car insurance claim denied", href: "/car-insurance-claim-denied" },
        { label: "Auto insurance claim guide", href: "/auto-insurance-claim-guide" },
      ],
    },
    keyFacts: [
      { label: "Standard policy form", value: "HO-3 (open perils dwelling)" },
      { label: "Hurricane deductible", value: "1%–5% of Coverage A" },
      { label: "Flood coverage", value: "Excluded — requires NFIP or private flood" },
      { label: "Sworn Proof of Loss deadline", value: "Often 60 days from request" },
      { label: "Suit limitation clause", value: "Commonly 1–2 years from date of loss" },
      { label: "Public adjuster fee", value: "Typically 10%–20% of recovery (state capped)" },
    ],
    sections: [
      {
        heading: "The denials that come up again and again",
        bullets: [
          "Damage attributed to wear, tear and age rather than the storm — typically supported by an engineer's report.",
          "Water damage recharacterized as long-term seepage rather than a sudden and accidental discharge.",
          "Flood versus wind-driven rain, where the anti-concurrent causation clause is used to exclude the entire loss.",
          "Loss falls under the percentage hurricane deductible and therefore below the payable threshold.",
          "Late reporting of a roof claim, defeating the 'prompt notice' condition.",
          "Failure to submit a sworn Proof of Loss or to appear for an Examination Under Oath — a procedural denial that is fully avoidable.",
          "Cosmetic-damage exclusions on metal roofs, and matching disputes when only a slope is replaced.",
        ],
      },
      {
        heading: "ACV vs RCV — where the money actually is",
        paragraphs: [
          "On an RCV policy the carrier issues an ACV check first and holds back depreciation. That holdback is released once you complete repairs and submit invoices. Homeowners who never submit final invoices simply forfeit it. If your carrier refuses to release recoverable depreciation after documented completion, that is a payable dispute, not a denial — and it is one of the easiest to win.",
        ],
      },
      {
        heading: "Your three escalation levers",
        bullets: [
          "The appraisal clause: binding on the amount of loss, and far cheaper and faster than suit. It does not resolve coverage questions.",
          "A licensed public adjuster: works for you, re-scopes the loss in Xactimate, and is paid a percentage capped by state law.",
          "A Department of Insurance complaint: free, and it forces a written carrier response into the regulatory record.",
        ],
      },
      {
        heading: "Deadlines that quietly end claims",
        paragraphs: [
          "Property policies carry a suit-limitation provision — often one or two years from the date of loss, shorter than the general contract statute of limitations — plus sworn Proof of Loss deadlines typically running 60 days from the carrier's request. Post-hurricane, several states also impose statutory notice deadlines measured in months from landfall. Missing any of them can be fatal regardless of the merits.",
        ],
      },
    ],
    howTo: [
      { name: "Get the written denial and the full estimate", text: "Request the denial letter, the Xactimate estimate, and any engineering or cause-and-origin report the carrier relied on." },
      { name: "Document the loss independently", text: "Dated photographs, video, moisture readings, and a contractor's written scope of repair with line-item pricing." },
      { name: "Check the deductible math", text: "Confirm whether a percentage hurricane or wind/hail deductible was applied and whether the trigger conditions were actually met." },
      { name: "Submit a sworn Proof of Loss", text: "Complete and timely — this preserves the claim and starts the carrier's response clock." },
      { name: "Invoke appraisal or hire a public adjuster", text: "Use appraisal for amount-of-loss disputes; a public adjuster to re-scope and re-price the entire claim." },
      { name: "File a DOI complaint and diary the suit deadline", text: "Complain in writing to the regulator and calendar the policy's suit-limitation date before it runs." },
    ],
    faqs: [
      { question: "Why was my roof claim denied as wear and tear?", answer: "Because the carrier's inspector or engineer concluded the shingle damage predates the storm — granule loss, thermal cracking or blistering rather than wind creasing or hail bruising. The counter is an independent roofing or engineering inspection tied to the date-of-loss weather data for your exact address." },
      { question: "What is a hurricane deductible and how is it calculated?", answer: "It is a percentage of your dwelling (Coverage A) limit rather than a flat dollar amount — commonly 1% to 5%. On a $400,000 dwelling limit, a 2% hurricane deductible means the first $8,000 of loss is yours. It usually triggers only for named storms after a state weather-service declaration." },
      { question: "Does homeowners insurance cover flooding?", answer: "No. Standard HO-3 policies exclude flood and surface water. Coverage comes from a separate NFIP policy or a private flood policy. Storm surge is treated as flood, which is why wind-versus-water disputes dominate coastal hurricane claims." },
      { question: "Should I hire a public adjuster or a lawyer?", answer: "A public adjuster is the right first call when the dispute is about scope and pricing. A lawyer is needed when the carrier denies coverage outright, alleges misrepresentation, demands an Examination Under Oath, or when bad-faith conduct is in play." },
      { question: "How long do I have to sue my homeowners insurer?", answer: "Check the suit-limitation clause in your policy — frequently one or two years from the date of loss, which is often shorter than the state contract limitations period. Some states also impose their own statutory claim-notice deadlines after a named storm." },
      { question: "What is recoverable depreciation and how do I get it?", answer: "It is the amount held back from the initial ACV payment on a replacement-cost policy. You recover it by completing the repairs and submitting final invoices and proof of payment within the policy's time limit — typically 180 days to two years after the loss." },
    ],
    primaryCta: {
      path: "/tools/consumer/settlement-estimator",
      label: "Estimate what your claim should pay",
      description: "Sanity-check the carrier's number before you accept or appeal.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/insurance-dispute",
      label: "Find a property insurance lawyer near you",
      description: "Many states shift attorney fees to the insurer on a successful claim.",
    },
    recommenderTopic: "insurance-dispute",
    cluster: "Insurance dispute cluster",
    related: [
      { label: "Car insurance claim denied", href: "/car-insurance-claim-denied", blurb: "Auto denials, bad faith and DOI complaints." },
      { label: "Auto insurance claim guide", href: "/auto-insurance-claim-guide", blurb: "How adjusters value claims." },
      { label: "Demand letter generator", href: "/forms/demand-letter", blurb: "Put your appeal in writing, properly." },
      { label: "Legal health check", href: "/legal-health-check", blurb: "Find the right tool for your situation." },
    ],
  },

  /* ------------------------------------------------------------------ 7 */
  {
    slug: "chapter-7-vs-chapter-13",
    category: "Bankruptcy",
    h1: "Chapter 7 vs Chapter 13 Bankruptcy: Which One Fits Your Situation",
    metaTitle: "Chapter 7 vs Chapter 13 Bankruptcy — Full Comparison",
    metaDescription:
      "Compare Chapter 7 and Chapter 13 bankruptcy: means test, exemptions, timelines, costs, what happens to your house and car, credit impact and which debts survive.",
    tagline: "Means test · Exemptions · 341 meeting · Discharge",
    intro: [
      "Chapter 7 and Chapter 13 solve different problems. Chapter 7 is a liquidation: a trustee reviews your assets, sells anything not protected by exemptions, and most unsecured debt is discharged in roughly three to five months. Chapter 13 is a reorganization: you keep your property and repay a court-approved portion of your debt through a three- or five-year plan administered by a standing trustee, with the remaining dischargeable balance wiped at completion.",
      "Which one is available to you is not purely a choice. The means test under 11 U.S.C. § 707(b) compares your household income to the state median; above it, you must pass a disposable-income calculation using IRS National and Local Standards or file Chapter 13 instead. Both chapters require pre-filing credit counseling and a pre-discharge debtor education course from an approved provider, and both trigger the automatic stay under § 362 the moment the petition is filed — stopping wage garnishment, foreclosure sales, repossession and collection calls.",
    ],
    entityBlock: {
      category: "Consumer Bankruptcy · Debt Relief",
      intro:
        "Consumer bankruptcy is federal, filed in U.S. Bankruptcy Court, but the exemptions that decide what you keep are largely state law. The chapter you file determines whether you liquidate and discharge quickly, or keep assets and repay through a plan.",
      entities: [
        "11 U.S.C. § 707(b) means test",
        "Automatic stay (§ 362)",
        "Chapter 7 trustee",
        "Chapter 13 standing trustee",
        "341 meeting of creditors",
        "Homestead exemption",
        "Wildcard exemption",
        "Federal vs state exemption schemes",
        "IRS National & Local Standards",
        "Reaffirmation agreement",
        "Lien stripping / cramdown",
        "Priority unsecured debt",
        "Nondischargeable debt (§ 523)",
        "Credit counseling / debtor education",
        "Form 122A / Form 122C",
        "Discharge order",
      ],
      relatedTerms: [
        { label: "Bankruptcy vs debt settlement", href: "/bankruptcy-vs-debt-settlement" },
        { label: "Debt settlement calculator", href: "/tools/finance/debt-settlement-calculator" },
      ],
    },
    keyFacts: [
      { label: "Chapter 7 timeline", value: "~3–5 months to discharge" },
      { label: "Chapter 13 timeline", value: "3 or 5 year plan" },
      { label: "Chapter 7 court filing fee", value: "$338" },
      { label: "Chapter 13 court filing fee", value: "$313" },
      { label: "Credit report impact", value: "Ch.7: 10 years · Ch.13: 7 years" },
      { label: "Refiling bar", value: "Ch.7 to Ch.7: 8 years" },
    ],
    sections: [
      {
        heading: "Choose Chapter 7 if",
        bullets: [
          "Your household income is below the state median, or you pass the § 707(b) disposable-income test.",
          "Your debt is mostly unsecured — credit cards, medical bills, personal loans, deficiency balances.",
          "Your equity in your home and vehicle fits inside your state's exemptions.",
          "You are not trying to cure a mortgage arrearage or stop a foreclosure over time.",
          "You want the fastest possible discharge and a clean break.",
        ],
      },
      {
        heading: "Choose Chapter 13 if",
        bullets: [
          "You are behind on a mortgage and want to cure the arrears over 3–5 years while keeping the house.",
          "You have non-exempt equity you would lose in a Chapter 7 liquidation.",
          "Your income is above the median and the means test pushes you out of Chapter 7.",
          "You need to cram down a vehicle loan (bought more than 910 days ago) to the collateral's value.",
          "You have priority debt — recent taxes or domestic support arrears — that must be paid but can be stretched.",
          "You want to strip a wholly unsecured second mortgage from an underwater property.",
        ],
      },
      {
        heading: "Debts neither chapter erases",
        bullets: [
          "Domestic support obligations — child support and alimony.",
          "Most recent income taxes, and all trust-fund and fraud-related taxes.",
          "Student loans, absent an undue-hardship adversary proceeding.",
          "Debts from fraud, willful and malicious injury, or DUI-related personal injury.",
          "Criminal fines and restitution.",
          "Debts deliberately omitted from your schedules.",
        ],
      },
      {
        heading: "What actually happens to your house and car",
        paragraphs: [
          "In Chapter 7, secured creditors keep their liens. If you are current and your equity is exempt, you generally keep the property by continuing to pay — sometimes via a reaffirmation agreement. If you have significant non-exempt equity, the trustee can sell the asset, pay your exemption in cash, and distribute the rest. In Chapter 13, arrears are folded into the plan and the automatic stay halts a foreclosure sale, which is the single most common reason people choose Chapter 13 over Chapter 7.",
        ],
      },
      {
        heading: "Chapter 7 vs Chapter 13 side by side",
        paragraphs: [
          "The table below is the comparison most filers actually need: not the statutory definitions, but what each chapter costs, how long it lasts, and what it does to the two assets people care about most.",
        ],
        tables: [
          {
            caption: "Chapter 7 vs Chapter 13 — the practical differences",
            columns: ["Factor", "Chapter 7 (liquidation)", "Chapter 13 (reorganization)"],
            rows: [
              ["Court filing fee", "$338", "$313"],
              ["Typical attorney fee", "$1,200–$2,500, paid before filing", "$3,500–$5,500, mostly paid through the plan"],
              ["Time to discharge", "3–5 months from filing", "36 or 60 months of plan payments"],
              ["Income requirement", "Below state median, or pass Form 122A-2", "Regular income sufficient to fund a plan"],
              ["Non-exempt assets", "Trustee may sell them", "You keep them and pay their value into the plan"],
              ["Mortgage arrears", "Cannot be cured — foreclosure resumes after the stay lifts", "Cured over 3–5 years while you keep the home"],
              ["Vehicle cramdown", "Not available", "Available if purchased 910+ days before filing"],
              ["Second-mortgage strip", "Not available", "Available if the home is worth less than the first mortgage"],
              ["Credit report duration", "10 years from filing", "7 years from filing"],
              ["Repeat filing bar", "8 years (Ch.7 to Ch.7)", "2 years (Ch.13 to Ch.13); 4 years after a Ch.7 discharge"],
            ],
            note: "Filing fees are the standard fees charged by U.S. Bankruptcy Courts; attorney-fee ranges reflect typical consumer no-asset and standard plan cases and vary by district.",
          },
        ],
      },
      {
        heading: "What your money actually goes to",
        paragraphs: [
          "People compare bankruptcy to debt settlement on headline cost and get the wrong answer, because the two routes carry very different hidden costs. Settlement generates taxable cancellation-of-debt income on Form 1099-C and does not stop a lawsuit; bankruptcy's discharge is not taxable income and stops collection instantly. The worked example below uses $42,000 of unsecured debt — close to the median consumer filing.",
        ],
        tables: [
          {
            caption: "Worked example — $42,000 unsecured debt, three routes",
            columns: ["Route", "Out of pocket", "Time", "Tax consequence", "Collection stops"],
            rows: [
              ["Chapter 7", "≈ $1,900 (fee + counsel)", "4 months", "None — discharge is not income", "Immediately, at filing"],
              ["Chapter 13 (30% plan)", "≈ $12,600 + $4,000 counsel over 60 months", "5 years", "None", "Immediately, at filing"],
              ["Debt settlement (50%)", "≈ $21,000 + 20–25% company fee", "24–48 months", "1099-C on ≈ $21,000 forgiven", "No — suits and garnishment continue"],
              ["Minimum payments", "≈ $96,000 total interest and principal", "20+ years", "None", "No"],
            ],
            note: "Illustrative only. Plan percentages, settlement rates and interest assumptions vary; run your own numbers in the debt settlement calculator below.",
          },
        ],
      },
      {
        heading: "Exemptions: what you keep depends on your state",
        paragraphs: [
          "Exemptions are the single biggest variable in whether Chapter 7 is safe for you. Seventeen states plus DC let you elect the federal exemption scheme of 11 U.S.C. § 522(d); the rest force you into state exemptions. A homeowner with $80,000 of equity is untouchable in Florida and at real risk in a state with a $25,000 homestead cap.",
        ],
        tables: [
          {
            caption: "Homestead and vehicle exemptions in the largest filing states",
            columns: ["State", "Homestead (single filer)", "Motor vehicle", "Federal scheme allowed?"],
            rows: [
              ["Federal (§ 522(d))", "$27,900", "$4,450", "—"],
              ["California (System 2)", "$31,950", "$6,375", "No — state only"],
              ["Texas", "Unlimited (acreage limits apply)", "One vehicle per licensed driver", "Yes"],
              ["Florida", "Unlimited (acreage limits apply)", "$1,000", "No — state only"],
              ["New York", "$179,950–$204,825 by county", "$4,825", "No — state only"],
              ["Illinois", "$15,000", "$2,400", "No — state only"],
              ["Ohio", "$161,375", "$4,450", "No — state only"],
              ["Georgia", "$21,500", "$5,000", "No — state only"],
            ],
            note: "Federal figures adjust every three years under § 104. State caps change by statute and several are indexed for inflation — confirm the current figure for your district before relying on it.",
          },
        ],
      },
      {
        heading: "Timeline from first call to discharge",
        tables: [
          {
            caption: "What happens, and when",
            columns: ["Stage", "Chapter 7", "Chapter 13"],
            rows: [
              ["Credit counseling", "Within 180 days before filing", "Within 180 days before filing"],
              ["Petition filed / automatic stay", "Day 0", "Day 0"],
              ["First plan payment due", "n/a", "Day 30, before confirmation"],
              ["341 meeting of creditors", "Day 21–40", "Day 21–50"],
              ["Objection / confirmation window", "Trustee has 60 days after the 341 to object to exemptions", "Confirmation hearing usually within 45 days of the 341"],
              ["Debtor education course", "Before discharge", "Before discharge"],
              ["Discharge order", "Roughly 60–75 days after the 341 meeting", "After the final plan payment, 36 or 60 months in"],
            ],
          },
        ],
      },
      {
        heading: "Mistakes that cost filers their case",
        bullets: [
          "Paying back a relative in the 12 months before filing — the trustee can claw the money back as a preferential transfer to an insider.",
          "Running up credit cards or taking cash advances within 90 days: purchases over roughly $800 for luxury goods and cash advances over roughly $1,100 are presumed nondischargeable.",
          "Transferring a car or a house title to a family member 'for safekeeping' — a fraudulent transfer that can convert a routine case into a denial of discharge under § 727.",
          "Emptying a protected retirement account to pay unsecured creditors before filing. ERISA-qualified plans and most IRAs are already exempt; the money would have been kept.",
          "Omitting a creditor, a bank account, a side gig or an expected tax refund from the schedules. Everything is disclosed under penalty of perjury.",
          "Filing a Chapter 13 plan that cannot survive a single missed payment. Feasibility under § 1325(a)(6) is a confirmation requirement, and roughly half of Chapter 13 plans are dismissed before completion.",
        ],
      },
    ],
    howTo: [
      { name: "Total your debts by category", text: "Separate secured (mortgage, auto), priority (taxes, support) and general unsecured. The mix drives the chapter." },
      { name: "Run the means test", text: "Compare six-month average household income to your state median for your household size, then apply the IRS standards deduction test if above." },
      { name: "Value your assets against exemptions", text: "Check whether your state uses its own scheme or allows the federal exemptions, and calculate your homestead, vehicle and wildcard protection." },
      { name: "Complete credit counseling", text: "Required from an approved provider within 180 days before filing." },
      { name: "File the petition and schedules", text: "Filing triggers the automatic stay immediately, halting garnishment, repossession and foreclosure." },
      { name: "Attend the 341 meeting and finish debtor education", text: "The trustee examines you under oath; the second course is required before the discharge order is entered." },
    ],
    faqs: [
      { question: "Will I lose my house in Chapter 7?", answer: "Usually not, if you are current on the mortgage and your equity fits within your state's homestead exemption — which ranges from a few thousand dollars to unlimited in states like Florida and Texas. Trustees sell homes only when there is meaningful non-exempt equity after costs of sale and your exemption." },
      { question: "How much does bankruptcy cost?", answer: "Court fees are $338 for Chapter 7 and $313 for Chapter 13. Attorney fees typically run $1,200–$2,500 for a straightforward Chapter 7 and $3,500–$5,500 for Chapter 13, with the latter usually paid through the plan rather than up front." },
      { question: "Which is worse for my credit, Chapter 7 or Chapter 13?", answer: "Chapter 7 stays on your credit report for 10 years from filing; Chapter 13 for 7 years. In practice both cause a similar immediate drop, and scores frequently begin recovering within 12–24 months once the discharge is entered and utilization resets." },
      { question: "Can I convert from Chapter 13 to Chapter 7?", answer: "Yes. Conversion is common when income drops mid-plan or the plan becomes unfeasible, and it is available as of right in most circumstances under 11 U.S.C. § 1307 provided you qualify under the means test at conversion." },
      { question: "Does bankruptcy stop wage garnishment?", answer: "Immediately. The automatic stay under § 362 halts most garnishments the moment the petition is filed — the notable exception being domestic support obligations, which continue." },
      { question: "How often can I file?", answer: "Chapter 7 to Chapter 7 requires 8 years between filings. Chapter 13 after a Chapter 7 discharge requires 4 years for a full discharge, and Chapter 13 to Chapter 13 requires 2 years." },
      { question: "What is the means test and how do I know if I pass?", answer: "Form 122A-1 compares your six-month average gross household income (annualized) to the median for your household size in your state. Below the median, you pass automatically and file Chapter 7. Above it, Form 122A-2 subtracts IRS National and Local Standards for food, housing, transportation and health care, plus your actual secured payments and priority debt, and looks at what is left over each month. Roughly speaking, more than about $290 of monthly disposable income presumes abuse and pushes you toward Chapter 13." },
      { question: "Do I keep my car in Chapter 7?", answer: "If you are current on the loan and your equity fits the state motor-vehicle exemption (commonly $3,000–$7,500, with a wildcard sometimes stacked on top), you keep it by continuing to pay — often under a reaffirmation agreement. If it is paid off and worth more than the exemption, the trustee can sell it, pay you the exempt amount in cash, and distribute the balance." },
      { question: "What is a Chapter 13 cramdown and when can I use it?", answer: "A cramdown reduces a secured debt to the collateral's actual value, with the shortfall treated as unsecured. It is available for vehicles purchased more than 910 days before filing and for most other personal property purchased more than one year before filing. It is not available for the mortgage on your principal residence." },
      { question: "Can I strip a second mortgage?", answer: "In Chapter 13, yes — if the first mortgage balance exceeds the home's fair market value, a wholly unsecured junior lien can be stripped off and treated as general unsecured debt, disappearing at plan completion. Lien stripping is not available in Chapter 7." },
      { question: "Will my employer or landlord find out?", answer: "Bankruptcy filings are public court records, but there is no notice to your employer unless a wage order is used in Chapter 13 or your employer is a creditor. Discrimination in employment because of a bankruptcy filing is prohibited by 11 U.S.C. § 525." },
      { question: "How soon can I get a mortgage after bankruptcy?", answer: "Typical seasoning is two years after a Chapter 7 discharge for FHA and VA loans, four years for conventional, and as little as 12 months of on-time plan payments with court permission during an active Chapter 13." },
      { question: "Should I settle my debts instead of filing?", answer: "Settlement makes sense when you have a lump sum available, the debt is limited to a few accounts, and you can absorb the tax on the forgiven balance reported on Form 1099-C. Bankruptcy is usually cheaper when the debt exceeds roughly half your annual income, when garnishment has already started, or when a foreclosure or repossession is imminent — because forgiven debt in bankruptcy is not taxable income." },
    ],
    primaryCta: {
      path: "/tools/finance/debt-settlement-calculator",
      label: "Compare bankruptcy against settling your debt",
      description: "Model lump-sum settlement offers and total cost before you commit to a chapter.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/debt-bankruptcy",
      label: "Find a bankruptcy lawyer near you",
      description: "Most offer a free consultation and flat-fee Chapter 7 representation.",
    },
    datePublished: "2026-02-14",
    dateModified: "2026-08-05",
    authorId: "consumer-finance-editor",
    cluster: "Debt & bankruptcy cluster",
    related: [
      { label: "Bankruptcy vs debt settlement", href: "/bankruptcy-vs-debt-settlement", blurb: "Which route costs less overall." },
      { label: "Debt settlement calculator", href: "/tools/finance/debt-settlement-calculator", blurb: "Model realistic settlement offers." },
      { label: "Wage garnishment calculator", href: "/tools/finance/wage-garnishment-calculator", blurb: "See how much can legally be taken." },
      { label: "Workers' comp denied", href: "/workers-comp-denied-what-next", blurb: "If lost income triggered the debt." },
    ],
  },

  /* ------------------------------------------------------------------ 8 */
  {
    slug: "wrongful-termination-settlements",
    category: "Employment Law",
    h1: "Wrongful Termination Settlements: What Cases Are Really Worth",
    metaTitle: "Wrongful Termination Settlement Amounts (2026)",
    metaDescription:
      "How wrongful termination settlements are valued: EEOC charges, Title VII caps, at-will exceptions, retaliation and whistleblower claims, back pay and front pay.",
    tagline: "EEOC · Title VII · Retaliation · Back pay & front pay",
    intro: [
      "Almost all US employment is at-will, so a wrongful termination case is never about fairness — it is about fitting the firing into a recognized exception. The main ones are discrimination under Title VII of the Civil Rights Act, the ADEA (age 40+), the ADA (disability), and Section 1981 (race); retaliation for protected activity; interference with FMLA leave; whistleblower protection under Sarbanes-Oxley, Dodd-Frank or a state statute; breach of an express or implied contract; and termination in violation of public policy, such as firing someone for filing a workers' compensation claim or refusing to break the law.",
      "Most federal discrimination claims must go through the EEOC first. You generally have 180 days from the termination to file a charge — extended to 300 days in states with a work-sharing FEP agency such as California's CRD or New York's DHR — and you cannot sue in federal court until you receive a Right to Sue notice. Missing that window ends most claims outright.",
    ],
    entityBlock: {
      category: "Employment Law · Discrimination & Retaliation",
      intro:
        "Wrongful termination value is driven by lost wages, the strength of the causal evidence, and the statutory framework — several of which cap compensatory and punitive damages by employer size while allowing recovery of attorney fees.",
      entities: [
        "EEOC charge of discrimination",
        "Right to Sue letter",
        "Title VII of the Civil Rights Act",
        "ADEA (age 40+)",
        "Americans with Disabilities Act (ADA)",
        "42 U.S.C. § 1981",
        "FMLA interference & retaliation",
        "Sarbanes-Oxley / Dodd-Frank whistleblower",
        "Public policy exception",
        "Constructive discharge",
        "McDonnell Douglas burden-shifting",
        "Pretext",
        "Back pay / front pay",
        "Liquidated damages",
        "Title VII damages caps ($50K–$300K)",
        "Duty to mitigate",
        "Severance & release agreement",
        "OWBPA 21/7-day rule",
      ],
      relatedTerms: [
        { label: "Workers' comp denied", href: "/workers-comp-denied-what-next" },
        { label: "EEOC settlement calculator", href: "/tools/consumer/eeoc-settlement-calculator" },
      ],
    },
    keyFacts: [
      { label: "EEOC filing deadline", value: "180 days (300 in deferral states)" },
      { label: "Title VII compensatory + punitive cap", value: "$50K–$300K by employer size" },
      { label: "Uncapped statutes", value: "§ 1981 (race), many state laws" },
      { label: "Typical negotiated settlement", value: "$25,000 – $150,000" },
      { label: "Strong case with fees + front pay", value: "$150,000 – $500,000+" },
      { label: "Attorney fee model", value: "Contingency 33–40%, fee-shifting on win" },
    ],
    sections: [
      {
        heading: "What actually drives settlement value",
        bullets: [
          "Back pay: salary and benefits from termination to resolution, reduced by what you earned or should have earned elsewhere.",
          "Front pay: future lost earnings where reinstatement is impractical — often the largest line item for long-tenured employees.",
          "Emotional distress and, where available, punitive damages for malice or reckless indifference.",
          "Attorney fees, which are recoverable under Title VII, the ADA, the ADEA and most state analogues — and which put real pressure on defendants.",
          "Evidence quality: temporal proximity to protected activity, shifting explanations, comparator evidence, and documents contradicting the stated reason.",
          "Employer size, insurance (EPLI coverage), and whether the claim is capped or uncapped.",
        ],
      },
      {
        heading: "The evidence that wins these cases",
        paragraphs: [
          "Courts apply the McDonnell Douglas framework: you establish a prima facie case, the employer offers a legitimate non-discriminatory reason, and you must show that reason is pretext. Pretext is proved with documents — performance reviews that were positive until you complained, an explanation that changes between the termination meeting and the EEOC position statement, comparators outside your protected class who were not fired for the same conduct, and a timeline showing the adverse action followed close on the heels of your protected activity.",
        ],
      },
      {
        heading: "Before you sign a severance agreement",
        bullets: [
          "A release waives every claim you have, usually including the EEOC damages claim, in exchange for the severance.",
          "If you are 40 or older, the OWBPA gives you 21 days to consider (45 in a group layoff) and 7 days to revoke after signing.",
          "Severance is negotiable. A demand supported by a documented claim commonly moves the number materially.",
          "Watch for non-disparagement, non-compete and confidentiality terms that outlast the payment.",
          "Nothing can lawfully stop you from filing a charge with the EEOC — only from personally recovering after a valid release.",
        ],
      },
      {
        heading: "Mitigation matters more than people expect",
        paragraphs: [
          "You have a legal duty to look for comparable work. Back and front pay are reduced by what you earn or reasonably could have earned, and defendants routinely subpoena job-search records. Keep a dated log of every application, interview and recruiter contact — it protects the largest component of your damages.",
        ],
      },
      {
        heading: "Which statute you file under changes the ceiling",
        paragraphs: [
          "Wrongful termination is not one claim. The statute you plead determines the filing deadline, whether compensatory and punitive damages are capped, whether the employer pays your attorney fees, and whether you get a jury. Filing under the wrong theory — or missing the agency step — is the single most common way a strong case loses value.",
        ],
        tables: [
          {
            caption: "Federal claim routes: deadline, damages ceiling and fee shifting",
            columns: ["Claim", "Agency step", "Deadline", "Damages ceiling", "Fees recoverable"],
            rows: [
              ["Title VII (race, sex, religion, national origin)", "EEOC charge required", "180 days (300 in deferral states)", "Compensatory + punitive capped $50k–$300k by employer size", "Yes"],
              ["42 U.S.C. § 1981 (race)", "No agency step", "4 years", "Uncapped", "Yes"],
              ["ADEA (age 40+)", "EEOC charge required", "180 / 300 days", "Back pay + liquidated (double) for willful; no emotional distress", "Yes"],
              ["ADA (disability)", "EEOC charge required", "180 / 300 days", "Same caps as Title VII", "Yes"],
              ["FMLA retaliation", "No agency step", "2 years (3 if willful)", "Lost wages + liquidated damages", "Yes"],
              ["FLSA retaliation", "No agency step", "2–3 years", "Lost wages + liquidated damages", "Yes"],
              ["Sarbanes-Oxley § 806 whistleblower", "OSHA complaint required", "180 days", "Uncapped back pay, reinstatement, special damages", "Yes"],
              ["Dodd-Frank whistleblower", "SEC tip", "6 years", "Double back pay", "Yes"],
              ["State FEHA / NYSHRL and similar", "State agency (often optional)", "1–3 years", "Usually uncapped", "Yes"],
            ],
            note: "Title VII caps: $50,000 (15–100 employees), $100,000 (101–200), $200,000 (201–500), $300,000 (501+). Caps apply to compensatory plus punitive damages combined, not to back pay.",
          },
          {
            caption: "How a settlement number is actually built",
            columns: ["Component", "How it is calculated", "Typical share of the total"],
            rows: [
              ["Back pay", "Lost wages and benefits from termination to settlement, minus interim earnings", "40–60%"],
              ["Front pay", "Projected loss until comparable re-employment, usually 6–24 months", "10–30%"],
              ["Emotional distress", "Garden-variety $10k–$75k; treatment-supported $75k–$300k", "10–25%"],
              ["Punitive / liquidated", "Willfulness or malice; capped jointly with compensatory under Title VII", "0–20%"],
              ["Attorney fees", "Lodestar under the fee-shifting statute, often negotiated separately", "20–40% on top"],
              ["Litigation-risk discount", "Applied by the employer for proof problems and mitigation gaps", "−20% to −50%"],
            ],
            note: "Employers price cases as expected value: probability of liability times damages, minus defense costs saved. Documented mitigation and contemporaneous complaints move the probability term more than anything else.",
          },
        ],
      },
      {
        heading: "The evidence hierarchy defendants respect",
        tables: [
          {
            caption: "What moves a wrongful termination case, ranked",
            columns: ["Evidence", "Why it matters", "How to preserve it"],
            rows: [
              ["Written complaint before the firing", "Establishes protected activity and employer knowledge", "Email it to HR from a personal copy; save the timestamp"],
              ["Positive performance reviews", "Contradicts a sudden performance pretext", "Download the full review history before access ends"],
              ["Comparator evidence", "Shows similarly situated employees treated better", "Names, dates, roles and the discipline each received"],
              ["Temporal proximity", "Firing within weeks of leave, complaint or injury", "A dated timeline built from calendar and payroll records"],
              ["Shifting reasons", "The stated reason changed between HR, the letter and the UI filing", "Keep every written version, including the unemployment response"],
              ["Texts and Slack messages", "Where the real motive is usually stated", "Screenshot with sender and date visible"],
              ["Severance agreement terms", "Unusual haste or an inflated offer signals awareness of risk", "Preserve the original draft and every revision"],
            ],
          },
        ],
      },
    ],
    howTo: [
      { name: "Preserve the evidence now", text: "Forward performance reviews, emails, texts and the termination letter to a personal account before your access is cut off." },
      { name: "Identify the legal hook", text: "Discrimination, retaliation, FMLA, whistleblower, contract or public policy — each has its own deadline and damages framework." },
      { name: "File an EEOC or state agency charge", text: "180 days from the termination, or 300 in deferral states. This is a prerequisite to most federal discrimination suits." },
      { name: "Document your damages and mitigation", text: "Pay stubs, benefits value, and a dated job-search log to protect back and front pay." },
      { name: "Value the claim", text: "Run wages, tenure and statutory caps through the EEOC settlement calculator before responding to any offer." },
      { name: "Negotiate or litigate", text: "Most cases resolve at mediation. Fee-shifting statutes give a documented claim leverage well beyond the raw wage loss." },
    ],
    faqs: [
      { question: "What is the average wrongful termination settlement?", answer: "Most negotiated settlements fall between $25,000 and $150,000. Cases with strong documentary evidence, long tenure, high salary or an uncapped statute — particularly § 1981 race claims and many state discrimination laws — commonly reach $150,000 to $500,000 or more, and jury verdicts can exceed that substantially." },
      { question: "Can I be fired for no reason at all?", answer: "Yes. At-will employment allows termination for any reason or no reason — just not for an illegal reason. The case exists only if the real motive was discrimination, retaliation, protected leave, whistleblowing, or a violation of public policy or contract." },
      { question: "How long do I have to file a wrongful termination claim?", answer: "For federal discrimination claims, 180 days to file an EEOC charge, or 300 days where a state agency has a work-sharing agreement. After the Right to Sue letter you have 90 days to file suit. Contract and public-policy claims follow the state statute of limitations, typically two to four years." },
      { question: "Are wrongful termination settlements taxable?", answer: "Generally yes. Back pay and front pay are wages subject to withholding, emotional distress damages are taxable unless attributable to physical injury or sickness, and punitive damages are always taxable. Attorney fees can create additional tax complications — allocate them in the settlement agreement deliberately." },
      { question: "What is constructive discharge?", answer: "When working conditions become so intolerable that a reasonable person would feel compelled to resign, the resignation is treated as a firing. The bar is high — you generally need severe, documented conditions and evidence that you complained through the proper channel first." },
      { question: "Do I need a lawyer, or can I handle the EEOC process myself?", answer: "You can file a charge yourself, and many people do. Counsel matters most when the employer files a position statement, at mediation, and when valuing a settlement — employment attorneys typically work on contingency, and fee-shifting statutes mean the employer may pay your fees if you prevail." },
      { question: "Should I sign the severance agreement I was handed?", answer: "Not on the spot. If you are 40 or older, the OWBPA gives you 21 days to consider it (45 in a group layoff) and 7 days to revoke after signing. Signing releases every claim described above, so the value of what you are giving up should be calculated before, not after." },
      { question: "Does filing for unemployment hurt my case?", answer: "No — it usually helps. The employer's written response to the unemployment claim locks in a stated reason for the termination. If that reason later shifts in litigation, the inconsistency becomes evidence of pretext." },
      { question: "How long does a wrongful termination case take?", answer: "The EEOC investigation alone commonly runs 6 to 10 months before a Right to Sue letter. Cases that settle at mediation typically resolve in 9 to 18 months from the termination; cases that go to trial run 2 to 4 years." },
      { question: "What if I was an independent contractor?", answer: "Most discrimination statutes protect employees, not contractors — but the label on your paycheck does not control. If the company set your hours, supplied your tools and supervised your work, you may be a misclassified employee under the economic-realities test, which restores the claim and often adds a wage-and-hour claim." },
      { question: "Can I be fired while on FMLA leave?", answer: "Only for reasons unrelated to the leave, and the employer carries the burden of proving it would have fired you anyway. A termination during or immediately after protected leave creates strong temporal proximity and is one of the most defensible claim types." },
      { question: "What is the difference between back pay and front pay?", answer: "Back pay covers wages and benefits already lost between the termination and the resolution. Front pay compensates future loss when reinstatement is impractical, usually projected over 6 to 24 months. Both are reduced by what you earned or reasonably could have earned elsewhere." },
    ],
    datePublished: "2026-03-04",
    dateModified: "2026-08-08",
    authorId: "senior-legal-researcher",
    primaryCta: {
      path: "/tools/consumer/eeoc-settlement-calculator",
      label: "Estimate your wrongful termination settlement",
      description: "Model back pay, front pay, emotional distress and statutory caps.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/employment",
      label: "Find an employment lawyer near you",
      description: "Contingency representation plus fee-shifting on a successful claim.",
    },
    recommenderTopic: "eeoc",
    cluster: "Employment cluster",
    related: [
      { label: "Workers' comp denied", href: "/workers-comp-denied-what-next", blurb: "Fired after an injury claim? Two claims may run in parallel." },
      { label: "EEOC settlement calculator", href: "/tools/consumer/eeoc-settlement-calculator", blurb: "Value the claim before you negotiate." },
      { label: "Employment law guide", href: "/employment-law", blurb: "Rights, leave, wages and discrimination." },
      { label: "Demand letter generator", href: "/forms/demand-letter", blurb: "Open negotiations in writing." },
    ],
  },

  /* ------------------------------------------------------------------ 9 */
  {
    slug: "roundup-camp-lejeune-updates",
    category: "Mass Tort",
    h1: "Roundup & Camp Lejeune Claim Updates: Status, Eligibility, Payouts",
    metaTitle: "Roundup & Camp Lejeune Claims — Status & Payouts",
    metaDescription:
      "Current status of Roundup (MDL 2741) and Camp Lejeune (CLJA) claims: eligibility, qualifying diagnoses, elective option payouts, deadlines and settlement ranges.",
    tagline: "MDL 2741 · Camp Lejeune Justice Act · PACT Act · EDNC",
    intro: [
      "Two of the largest active mass torts in the United States run on completely different tracks. Roundup litigation against Monsanto (now Bayer) is consolidated in MDL 2741 before the Northern District of California, with thousands of additional cases in state courts, centered on the claim that glyphosate exposure caused non-Hodgkin lymphoma. Camp Lejeune claims arise from the Camp Lejeune Justice Act, passed as part of the 2022 PACT Act, which created a federal cause of action in the Eastern District of North Carolina for people exposed to contaminated water at the base between 1 August 1953 and 31 December 1987.",
      "The mechanics differ in ways that matter. Roundup is ordinary product-liability litigation with a state statute of limitations running from diagnosis or discovery. Camp Lejeune requires an administrative claim to the Department of the Navy JAG Tort Claims Unit first, has a six-month agency review window before suit, and bars punitive damages while offsetting VA and Medicare benefits already received.",
    ],
    entityBlock: {
      category: "Mass Tort · Toxic Exposure",
      intro:
        "Mass tort claims are individual cases coordinated for pretrial efficiency, not class actions — each claimant's diagnosis, exposure history and damages are evaluated separately, which is why payouts vary so widely inside the same litigation.",
      entities: [
        "MDL 2741 (Roundup, N.D. Cal.)",
        "Monsanto / Bayer AG",
        "Glyphosate",
        "Non-Hodgkin lymphoma (NHL)",
        "IARC Group 2A classification",
        "Camp Lejeune Justice Act (CLJA)",
        "Honoring our PACT Act of 2022",
        "Eastern District of North Carolina (EDNC)",
        "Department of the Navy JAG Tort Claims Unit",
        "Elective Option settlement tiers",
        "ATSDR water modeling",
        "Trichloroethylene (TCE) / Perchloroethylene (PCE)",
        "Benzene / vinyl chloride",
        "Bellwether trials",
        "Plaintiff fact sheet",
        "Common benefit fund",
        "VA and Medicare offsets",
      ],
      relatedTerms: [
        { label: "Mass tort lawsuits hub", href: "/mass-tort-lawsuits" },
        { label: "Mesothelioma settlement guide", href: "/mesothelioma-settlement-guide" },
      ],
    },
    keyFacts: [
      { label: "Roundup venue", value: "MDL 2741, N.D. California + state courts" },
      { label: "Roundup qualifying diagnosis", value: "Non-Hodgkin lymphoma and subtypes" },
      { label: "Camp Lejeune exposure window", value: "1 Aug 1953 – 31 Dec 1987" },
      { label: "Camp Lejeune minimum exposure", value: "30 cumulative days on base" },
      { label: "Camp Lejeune first step", value: "Administrative claim to Navy JAG" },
      { label: "Attorney fees (CLJA statutory cap)", value: "20% administrative / 25% filed suit" },
    ],
    sections: [
      {
        heading: "Roundup — who may have a claim",
        bullets: [
          "Diagnosis of non-Hodgkin lymphoma or a recognized subtype (DLBCL, follicular lymphoma, CLL, and others).",
          "Meaningful glyphosate exposure — agricultural workers, landscapers, groundskeepers, nursery and farm workers, and long-term residential users.",
          "Exposure predating the diagnosis by a plausible latency period, supported by purchase records, employment history or witness statements.",
          "A claim filed within the state statute of limitations, which typically runs from diagnosis or from when the link was discovered.",
        ],
      },
      {
        heading: "Camp Lejeune — who may have a claim",
        bullets: [
          "Service members, civilian employees, contractors, family members and in-utero exposures at Camp Lejeune or MCAS New River.",
          "At least 30 cumulative days on base between 1 August 1953 and 31 December 1987.",
          "A qualifying condition — including several cancers (kidney, bladder, liver, leukemia, non-Hodgkin lymphoma, multiple myeloma), Parkinson's disease, aplastic anemia and myelodysplastic syndromes, kidney disease, and certain birth defects.",
          "An administrative claim submitted to the Navy JAG Tort Claims Unit before suit can be filed in EDNC.",
        ],
      },
      {
        heading: "How payouts are structured",
        paragraphs: [
          "Neither litigation pays a flat amount. Roundup resolutions have been tiered by diagnosis severity, age at diagnosis, treatment intensity, exposure duration and survival status, with the bulk of individual settlements historically in the tens to low hundreds of thousands and a small number of tried verdicts far higher. Camp Lejeune has an Elective Option offering fixed-tier payments based on the qualifying diagnosis and length of exposure — faster, lower, and available without proving individual causation — alongside the traditional litigation track for claimants who want full damages evaluation.",
        ],
      },
      {
        heading: "What to gather before you talk to anyone",
        bullets: [
          "Complete medical records establishing the diagnosis, its date, and treatment history.",
          "Exposure proof: DD-214 and base housing or duty records for Camp Lejeune; employment, purchase or property records for Roundup.",
          "Documentation of VA benefits already received — these are offset against a CLJA recovery.",
          "For deceased claimants, the estate's appointment papers, since survival and wrongful death claims are handled through the personal representative.",
        ],
      },
      {
        heading: "Camp Lejeune Elective Option tiers, explained",
        paragraphs: [
          "The Elective Option is the government's fixed-tier settlement track. Tier I covers the diagnoses with the strongest ATSDR-modelled association to the contaminated wells at Tarawa Terrace and Hadnot Point; Tier II covers conditions with a weaker but recognised association. The payment rises with cumulative exposure length, and a separate fixed amount is added where the claimant has died.",
        ],
        tables: [
          {
            caption: "Elective Option — tier structure and payment bands",
            columns: ["Tier", "Representative conditions", "30–364 days exposure", "1–5 years", "5+ years"],
            rows: [
              ["Tier I", "Kidney cancer, liver cancer, non-Hodgkin lymphoma, leukemia, bladder cancer", "$150,000", "$300,000", "$450,000"],
              ["Tier II", "Multiple myeloma, Parkinson's disease, kidney disease / end-stage renal disease, systemic sclerosis", "$100,000", "$250,000", "$400,000"],
              ["Death add-on", "Any qualifying Tier I or Tier II condition where the claimant has died", "+$100,000", "+$100,000", "+$100,000"],
            ],
            note: "Amounts are the published Elective Option bands and are reduced by VA, Medicare and Medicaid offsets and by the statutory attorney-fee cap. Conditions outside these tiers must be pursued on the litigation track.",
          },
        ],
      },
      {
        heading: "Elective Option or litigation — how the two tracks compare",
        tables: [
          {
            caption: "Fixed-tier settlement vs individual litigation",
            columns: ["Factor", "Elective Option", "Litigation in EDNC"],
            rows: [
              ["Causation proof", "Not required — tier eligibility only", "Individual causation must be established"],
              ["Typical time to money", "Months", "Two years and up"],
              ["Damages ceiling", "Capped by tier", "Full economic and non-economic damages"],
              ["Punitive damages", "Barred by the CLJA", "Barred by the CLJA"],
              ["Attorney fee cap", "20%", "25%"],
              ["Offsets", "VA / Medicare / Medicaid deducted", "VA / Medicare / Medicaid deducted"],
              ["Best fit", "Clear tier diagnosis, modest damages, need for speed", "Severe illness, heavy treatment costs, large wage loss, death case"],
            ],
          },
        ],
      },
      {
        heading: "Roundup: what drives the value of an individual claim",
        paragraphs: [
          "Roundup resolutions are graded on a points-style matrix rather than published tiers. Firms handling inventory settlements weigh diagnosis subtype, age at diagnosis, treatment intensity, exposure duration and whether the claimant survived. The table below reflects the value drivers most consistently applied across inventory settlements.",
        ],
        tables: [
          {
            caption: "Roundup value drivers and their direction of effect",
            columns: ["Factor", "Raises value", "Lowers value"],
            rows: [
              ["Diagnosis", "DLBCL, aggressive NHL subtypes, relapse", "Indolent CLL with watchful waiting only"],
              ["Age at diagnosis", "Under 60, working, dependants at home", "Advanced age with competing morbidity"],
              ["Treatment", "Chemotherapy, stem-cell transplant, hospitalisation", "Observation only"],
              ["Exposure", "Occupational, years of near-daily use, documented", "Occasional residential use, no records"],
              ["Alternative cause", "No competing risk factors", "Prior immunosuppression, hepatitis C, other known NHL risk"],
              ["Outcome", "Death case with surviving spouse or minor children", "Full remission with no lasting impairment"],
            ],
            note: "Directional guidance drawn from publicly reported inventory settlement criteria. Individual outcomes vary; no firm can promise a figure at intake.",
          },
        ],
      },
      {
        heading: "Deadlines you cannot miss",
        tables: [
          {
            caption: "Filing windows by litigation",
            columns: ["Claim", "Trigger", "Window", "Mandatory first step"],
            rows: [
              ["Roundup (product liability)", "Diagnosis, or discovery of the link", "State statute of limitations — commonly 2–3 years, 1 year in Louisiana and Tennessee", "None; file suit or join an inventory"],
              ["Roundup (wrongful death)", "Date of death", "Typically 1–3 years by state", "Estate must be opened"],
              ["Camp Lejeune (CLJA)", "CLJA framework", "Two-year filing framework with a six-month agency review before suit", "Administrative claim to Navy JAG Tort Claims Unit"],
            ],
            note: "Limitations rules are state-specific and fact-specific. Treat this as a prompt to confirm your date with a lawyer, not as legal advice on your deadline.",
          },
        ],
      },
      {
        heading: "How to avoid the mass-tort claim mills",
        bullets: [
          "Ask who will actually litigate your case. Many television and social advertisements are run by lead-generation companies that sell the signed retainer to a filing firm.",
          "Get the fee agreement in writing, including case costs, common-benefit assessments and lien-resolution charges — not just the headline percentage.",
          "Confirm the firm has cases on file in the correct venue (MDL 2741 in N.D. Cal., or EDNC for Camp Lejeune) rather than only accumulating inventory.",
          "Never sign a medical authorisation before you know which firm receives your records.",
          "Be sceptical of any promised figure at intake. No one can price a claim before records and exposure history are reviewed.",
          "Check whether the firm handles Medicare and Medicaid lien resolution in-house — an unresolved lien can hold your money for months after settlement.",
        ],
      },
    ],
    howTo: [
      { name: "Confirm the qualifying diagnosis", text: "Obtain the pathology report and treating oncologist records establishing the diagnosis and its date." },
      { name: "Build the exposure record", text: "DD-214, base housing records and duty stations for Camp Lejeune; employment history, purchase receipts and product usage for Roundup." },
      { name: "Check the deadline that applies to you", text: "Roundup follows the state statute of limitations from diagnosis or discovery; CLJA has its own filing framework and a mandatory administrative step." },
      { name: "File the administrative claim (Camp Lejeune)", text: "Submit to the Department of the Navy JAG Tort Claims Unit and wait out the six-month review before filing suit in EDNC." },
      { name: "Decide between the Elective Option and litigation", text: "Fixed-tier payment quickly, or full individual damages evaluation with a longer timeline and higher ceiling." },
      { name: "Account for offsets and fees", text: "VA and Medicare benefits are offset, and CLJA caps attorney fees at 20% administratively and 25% on filed suits." },
    ],
    faqs: [
      { question: "Is it too late to file a Roundup claim?", answer: "Not necessarily. The limitations period is state-specific and generally runs from the date of diagnosis or from when the connection between the illness and glyphosate exposure was or should have been discovered — which is later than most people assume. Bayer continues to resolve qualifying claims while new filings proceed in MDL 2741 and state courts." },
      { question: "What is the Camp Lejeune Elective Option?", answer: "A streamlined settlement track offering fixed payment tiers based on the qualifying diagnosis and length of exposure, without individually litigating causation. It resolves faster than litigation but pays less than a fully developed individual claim, so the choice depends on the strength of your damages record." },
      { question: "How much are Camp Lejeune claims worth?", answer: "It depends entirely on the diagnosis tier, length of exposure and damages. Elective Option tiers pay defined amounts for the most clearly linked conditions; individually litigated claims with severe illness, extensive treatment or death can be worth substantially more, but they take considerably longer and are reduced by VA and Medicare offsets." },
      { question: "Do I need to have served in the military to file a Camp Lejeune claim?", answer: "No. Civilian employees, contractors, and family members who lived on base — including those exposed in utero — can file, provided they meet the 30-day cumulative exposure requirement within the covered window." },
      { question: "Is a mass tort the same as a class action?", answer: "No. In a mass tort, each claimant keeps an individual case with its own damages evaluation; cases are only coordinated for pretrial purposes in an MDL. In a class action, one judgment binds the entire class and payouts are usually uniform." },
      { question: "What do these lawyers charge?", answer: "Roundup cases are handled on standard contingency, typically 33–40%, plus case costs and any common-benefit assessment. Camp Lejeune fees are capped by statute at 20% for claims resolved administratively and 25% for cases filed in court." },
      { question: "Does filing a Camp Lejeune claim reduce my VA benefits?", answer: "It does not cancel your benefits, but the Camp Lejeune Justice Act requires that any award be offset by disability compensation, health-care payments and other benefits already paid for the same injury by the VA, Medicare or Medicaid. Keep every award letter and payment record — the offset is calculated from them, and unclaimed documentation cannot reduce it in your favour." },
      { question: "Can I file for a family member who has died?", answer: "Yes. Both litigations allow survival and wrongful-death claims brought by the personal representative of the estate. You will need letters testamentary or letters of administration from probate court, the death certificate, and the medical records establishing the qualifying diagnosis. Under the CLJA, a representative may file even where the exposure predates the veteran's death by decades." },
      { question: "Do I have to travel to North Carolina or California?", answer: "Almost never. Mass tort claims are handled through plaintiff fact sheets, written discovery and records collection. Only claimants selected as bellwether cases sit for deposition or attend trial, and even those proceedings are increasingly handled remotely." },
      { question: "How long will my claim take?", answer: "Camp Lejeune requires a six-month administrative review before suit can be filed, and litigated claims in EDNC have been running well beyond two years. The Elective Option resolves fastest — months rather than years — for claimants whose diagnosis fits a defined tier. Roundup timelines vary by venue and by whether your case falls into a negotiated inventory settlement." },
      { question: "What if I used Roundup at home rather than at work?", answer: "Residential users can and do file, but the exposure case is harder. Frequency and duration matter more than occupation: years of regular yard and garden application, documented by purchase receipts, store loyalty records, property records or witness statements, is the profile firms accept." },
      { question: "Will a mass tort settlement affect Medicaid, SSI or other means-tested benefits?", answer: "It can. A lump sum counts as a resource in the month after receipt for SSI and Medicaid. Claimants on means-tested programs commonly use a special needs trust or a structured settlement to preserve eligibility — set this up before the money is disbursed, not after." },
      { question: "Is there a filing fee or upfront cost to me?", answer: "No. Both litigations are handled on contingency, with case costs advanced by the firm and deducted from any recovery. Ask for the fee agreement in writing and confirm how costs, common-benefit assessments and lien resolution charges are calculated before signing." },
    ],
    primaryCta: {
      path: "/mass-tort-lawsuits",
      label: "See all active mass tort litigations",
      description: "Eligibility criteria and status for every case we track.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/personal-injury",
      label: "Find a mass tort lawyer near you",
      description: "Free case review; toxic-exposure claims are contingency-based.",
    },
    recommenderTopic: "personal-injury",
    datePublished: "2026-02-14",
    dateModified: "2026-08-05",
    authorId: "personal-injury-editor",
    cluster: "Mass tort cluster",
    related: [
      { label: "Mass tort lawsuits hub", href: "/mass-tort-lawsuits", blurb: "Every active litigation we track." },
      { label: "Mesothelioma settlement guide", href: "/mesothelioma-settlement-guide", blurb: "Asbestos trusts and settlement ranges." },
      { label: "Nursing home abuse claims", href: "/nursing-home-abuse-claims", blurb: "Elder neglect evidence and payouts." },
      { label: "Personal injury settlement hub", href: "/personal-injury-settlements", blurb: "How injury claims get valued." },
    ],
  },
  /* ------------------------------------------------- Stage 5 · cluster 1 */
  {
    slug: "health-insurance-claim-denied",
    category: "Insurance",
    h1: "Health Insurance Claim Denied: How to Win the Appeal",
    metaTitle: "Health Insurance Claim Denied? Appeal Steps & Deadlines (2026)",
    metaDescription:
      "Why health insurers deny claims, how internal appeals and external review work under the ACA and ERISA, deadlines by plan type, and what to send to overturn a denial.",
    tagline: "ACA internal appeal · ERISA § 503 · Independent external review",
    intro: [
      "A denied health insurance claim is rarely final. Federal law gives most people two bites: an internal appeal decided by the plan itself, and an independent external review decided by an Independent Review Organization (IRO) whose decision binds the insurer. Government data has consistently shown that only a small minority of denied in-network claims are ever appealed — and that a meaningful share of those that are appealed get overturned.",
      "The rules that apply depend on where your coverage comes from. A marketplace or individually purchased plan follows the Affordable Care Act appeal rules at 45 CFR § 147.136. An employer-sponsored plan is usually governed by ERISA and 29 CFR § 2560.503-1, which sets the plan's response deadlines and your right to the full claim file free of charge. Medicare Advantage and Medicaid managed care have their own tracks, with fast-track appeal rights that run in days rather than months.",
      "Denials cluster into a handful of reasons: prior authorization not obtained, service deemed not medically necessary, treatment classed as experimental or investigational, out-of-network billing, coding or bundling errors, and eligibility or coordination-of-benefits gaps. Each one has a different winning argument, and the coding-error category is often fixed with a phone call rather than an appeal.",
    ],
    entityBlock: {
      category: "Insurance · Health coverage disputes",
      intro:
        "Health claim denials are decided against plan documents, medical policy bulletins and clinical criteria sets. Naming the right authority in the appeal letter is what moves a file from a claims processor to a medical director.",
      entities: [
        "Explanation of Benefits (EOB)",
        "Adverse Benefit Determination",
        "Internal appeal",
        "External review / Independent Review Organization (IRO)",
        "ACA 45 CFR § 147.136",
        "ERISA 29 CFR § 2560.503-1",
        "Summary Plan Description (SPD)",
        "Prior authorization",
        "Medical necessity",
        "Experimental or investigational exclusion",
        "MCG and InterQual criteria",
        "Peer-to-peer review",
        "Expedited / urgent care appeal",
        "No Surprises Act",
        "Independent Dispute Resolution (IDR)",
        "State department of insurance complaint",
        "Medicare Advantage organization determination",
        "Coordination of benefits",
      ],
      relatedTerms: [
        { label: "Car insurance claim denied", href: "/car-insurance-claim-denied" },
        { label: "Homeowners claim denied", href: "/homeowners-insurance-claim-denied" },
        { label: "Long-term disability claim guide", href: "/long-term-disability-claim-guide" },
      ],
    },
    keyFacts: [
      { label: "Internal appeal deadline (ACA plans)", value: "180 days from the denial notice" },
      { label: "Plan decision — pre-service claim", value: "30 days" },
      { label: "Plan decision — post-service claim", value: "60 days" },
      { label: "Urgent care appeal decision", value: "72 hours or sooner" },
      { label: "External review request window", value: "Usually 4 months after the final internal denial" },
      { label: "External review decision", value: "45 days standard / 72 hours expedited" },
      { label: "Cost of external review to you", value: "Free, or a nominal state filing fee" },
      { label: "Claim file under ERISA", value: "Must be provided free on request" },
    ],
    sections: [
      {
        heading: "Which appeal track applies to your plan",
        paragraphs: [
          "Before writing anything, identify the plan type. It determines the deadline, who decides the appeal, and whether a court case would ultimately be an ERISA action tried on the written record rather than a jury trial.",
        ],
        tables: [
          {
            caption: "Appeal rights by coverage type",
            columns: ["Coverage", "Governing rules", "Internal appeal", "Next step after denial"],
            rows: [
              ["Marketplace / individual plan", "ACA 45 CFR § 147.136", "180 days to file; 1 level", "State or federal external review by an IRO"],
              ["Employer group plan (insured)", "ERISA + ACA", "180 days; 1–2 levels", "External review, then ERISA suit in federal court"],
              ["Employer self-funded plan", "ERISA (state insurance law preempted)", "180 days; per plan document", "Federal external review process, then ERISA suit"],
              ["Church or government plan", "Plan terms; often exempt from ERISA", "Per plan document", "State remedies, contract action"],
              ["Medicare Advantage", "42 CFR Part 422", "60 days for reconsideration", "Automatic forward to an Independent Review Entity"],
              ["Medicaid managed care", "42 CFR Part 438", "60 days; aid paid pending if requested in time", "State fair hearing"],
            ],
            note: "Self-funded employer plans are the most commonly misidentified — check whether your ID card says the insurer is only the administrator (ASO/TPA).",
          },
        ],
      },
      {
        heading: "Denial reasons and the argument that beats each one",
        tables: [
          {
            caption: "Common denial codes and the winning response",
            columns: ["Stated reason", "What it usually means", "Strongest response"],
            rows: [
              ["Not medically necessary", "Clinical criteria set (MCG/InterQual) not met on the record", "Treating physician letter citing the criteria line by line, plus guidelines from the relevant specialty society"],
              ["Experimental / investigational", "Treatment not in the plan's technology assessment", "Peer-reviewed literature, FDA status, NCCN or specialty compendium listing, and any state mandate"],
              ["No prior authorization", "Administrative failure, often by the provider", "Retro-authorization request plus proof of urgency or of the provider's submission attempt"],
              ["Out of network", "No in-network provider available, or emergency care", "Network adequacy argument, gap exception request, and No Surprises Act protections for emergencies"],
              ["Coding / bundling error", "Wrong CPT, modifier or diagnosis pairing", "Corrected claim from the provider's billing office — no formal appeal needed"],
              ["Not a covered benefit", "Exclusion in the plan document", "Read the SPD exclusion verbatim; argue ambiguity, mandate coverage or parity law where applicable"],
              ["Eligibility / COB", "Plan believes another payer is primary", "Termination or coverage letter from the other carrier and an updated COB questionnaire"],
              ["Mental health / substance use limit", "Stricter review than for medical care", "Mental Health Parity and Addiction Equity Act comparative analysis request"],
            ],
          },
        ],
      },
      {
        heading: "What to put in the appeal packet",
        bullets: [
          "The denial letter itself, with the exact reason and any code quoted back to the plan.",
          "A written request for the full claim file, the specific plan provision relied upon and the internal clinical criteria used — ERISA plans must supply these free of charge.",
          "A letter of medical necessity from the treating physician written against the plan's own criteria, not in general terms.",
          "The clinical record: chart notes, imaging, lab results, prior conservative treatments tried and failed.",
          "Peer-reviewed literature or specialty-society guidance for anything labelled experimental.",
          "A short cover letter stating the outcome you want, the deadline the plan must meet, and that you are preserving your right to external review and, if applicable, an ERISA action.",
          "A request for expedited handling where a delay would seriously jeopardise health — this converts a 30-day timeline into 72 hours.",
        ],
      },
      {
        heading: "External review: the step most people skip",
        paragraphs: [
          "Once the internal appeal is exhausted, an independent physician reviewer employed by an IRO — not the insurer — decides the case, and the insurer must comply. External review is free or near-free, does not require a lawyer, and is the last step before litigation. In an ERISA case it matters for a second reason: federal courts generally review only the administrative record built during the appeals, so evidence you failed to submit before the final denial may never be considered.",
        ],
        bullets: [
          "Standard external review requests generally must be filed within four months of the final internal denial.",
          "Expedited external review runs in parallel with an urgent internal appeal — you do not have to wait.",
          "Denials based purely on eligibility or contract terms may fall outside external review; those go to the state regulator or to court.",
          "File a parallel complaint with your state department of insurance for fully insured plans; regulators frequently prompt a re-review.",
        ],
      },
    ],
    howTo: [
      { name: "Read the EOB and denial letter", text: "Identify the exact denial reason, the code, the claim number and the appeal deadline printed on the notice." },
      { name: "Identify your plan type", text: "Marketplace, insured group, self-funded ERISA, Medicare Advantage or Medicaid — the track and deadlines differ." },
      { name: "Request the claim file", text: "Ask in writing for the full file, the plan provision relied on and the clinical criteria applied. ERISA plans must provide it free." },
      { name: "Fix billing errors first", text: "Coding, modifier and bundling denials are corrected by the provider's billing office without a formal appeal." },
      { name: "Build the medical necessity letter", text: "Have the treating physician address the plan's criteria point by point and attach supporting records and literature." },
      { name: "File the internal appeal in time", text: "Submit within 180 days, keep proof of delivery, and request expedited review if a delay would jeopardise your health." },
      { name: "Escalate to external review", text: "After the final internal denial, request independent external review within roughly four months; the IRO decision binds the insurer." },
    ],
    faqs: [
      { question: "How long do I have to appeal a denied health insurance claim?", answer: "For most ACA-governed and ERISA plans, 180 days from the date of the adverse benefit determination. Medicare Advantage reconsiderations run on a 60-day clock, and Medicaid managed care appeals are typically 60 days with continued benefits available if you file quickly enough. Always use the deadline printed on your denial letter, and file early — nothing is gained by waiting." },
      { question: "Do appeals actually work?", answer: "Often enough that skipping the appeal is the costliest choice you can make. Federal marketplace data has repeatedly shown that only a tiny fraction of denied in-network claims are appealed, while a substantial share of the appeals filed result in the denial being reversed in whole or part. Denials driven by coding and prior-authorization technicalities are the most reversible." },
      { question: "What is an external review and does it cost anything?", answer: "It is a review by an Independent Review Organization — physicians with no financial relationship to your insurer — whose decision the plan must follow. It is free in most states, or carries only a nominal filing fee, and you do not need a lawyer to request it." },
      { question: "Can I sue my health insurer?", answer: "Yes, but for employer-sponsored coverage the case is usually an ERISA benefits action in federal court, decided on the written administrative record, with remedies generally limited to the benefit owed plus possible attorney fees — no pain and suffering or punitive damages. That is exactly why the appeal record you build now matters so much." },
      { question: "What if the treatment is urgent?", answer: "Request an expedited appeal. Urgent-care appeals must be decided as soon as the clinical situation requires and generally no later than 72 hours, and you can request expedited external review at the same time rather than waiting for the internal process to finish." },
      { question: "The plan says the treatment is experimental. What overturns that?", answer: "Documentation that the treatment is accepted practice: FDA approval or clearance for the indication, inclusion in recognised compendia or specialty-society guidelines, peer-reviewed outcome studies, and evidence that standard alternatives were tried and failed. Ask for the plan's technology assessment so you can rebut the specific document being relied on." },
      { question: "Does the No Surprises Act help with an out-of-network denial?", answer: "For emergency care and for out-of-network clinicians treating you at an in-network facility, yes — you generally cannot be balance-billed beyond in-network cost sharing, and the payment dispute goes to Independent Dispute Resolution between the provider and the plan rather than to you." },
      { question: "Should I hire a lawyer?", answer: "For an internal appeal or external review on a moderate claim, usually not — the process is designed to be used without one. Consider counsel when the amount at stake is large, the denial involves a long course of treatment, the plan has ignored its own deadlines, or you are approaching an ERISA lawsuit, because the record closes at the end of the appeal." },
    ],
    primaryCta: {
      path: "/forms/demand-letter",
      label: "Build a written appeal letter",
      description: "Use the guided demand-letter wizard to produce a dated, itemised appeal you can post with proof of delivery.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/insurance",
      label: "Find an insurance dispute lawyer",
      description: "Most insurance and ERISA benefits lawyers review denials at no cost and take cases on contingency or fee-shifting.",
    },
    recommenderTopic: "insurance-dispute",
    datePublished: "2026-08-31",
    dateModified: "2026-08-31",
    authorId: "senior-legal-researcher",
    cluster: "Insurance denial cluster",
    related: [
      { label: "Car insurance claim denied", href: "/car-insurance-claim-denied", blurb: "Auto denials, bad faith and state deadlines." },
      { label: "Homeowners insurance claim denied", href: "/homeowners-insurance-claim-denied", blurb: "Property claim denials and appraisal clauses." },
      { label: "Long-term disability claim guide", href: "/long-term-disability-claim-guide", blurb: "ERISA disability denials and appeals." },
      { label: "SSDI denied — what next", href: "/ssdi-denied-what-next", blurb: "Federal disability appeal levels." },
    ],
  },

  /* ------------------------------------------------- Stage 5 · cluster 2 */
  {
    slug: "data-breach-claim-compensation",
    category: "Privacy",
    h1: "Data Breach Compensation: What Your Claim Is Actually Worth",
    metaTitle: "Data Breach Claim Compensation & Settlements (2026 Guide)",
    metaDescription:
      "What you can claim after a data breach: settlement structures, documented-loss reimbursement, GDPR Article 82 damages, state privacy laws, deadlines and evidence to keep.",
    tagline: "Class settlements · GDPR Article 82 · State privacy statutes",
    intro: [
      "Data breach compensation works differently from a normal injury claim, because the loss is usually informational rather than physical. In the United States most recoveries come through class action settlements with a tiered structure: a small flat payment for everyone who files a valid claim, a larger reimbursement for documented out-of-pocket losses, a payment for lost time at a fixed hourly rate, and credit monitoring provided at the defendant's cost. In the EU and UK, individuals can bring their own claim under Article 82 of the GDPR for material and non-material damage, including distress.",
      "The threshold question in US federal court is standing. After TransUnion LLC v. Ramirez (2021), a plaintiff needs concrete harm, not merely the risk that data may one day be misused. Misuse that has already happened — fraudulent accounts, tax-refund fraud, medical identity theft, drained accounts — converts a weak claim into a strong one. That is why documenting harm from the first week matters more than anything else you can do.",
      "Which law applies depends on the data and the defendant: HIPAA-covered health records, the Gramm-Leach-Bliley Act for financial institutions, the Illinois Biometric Information Privacy Act for fingerprints and faceprints, state breach-notification statutes in all 50 states, the California Consumer Privacy Act's private right of action for certain unencrypted data, and the GDPR for anyone in the EU or UK.",
    ],
    entityBlock: {
      category: "Privacy · Data protection claims",
      intro:
        "Breach claims are decided on standing, causation and documentation. Naming the right statute and the right category of data is what separates a claim that clears a motion to dismiss from one that does not.",
      entities: [
        "Personally identifiable information (PII)",
        "Protected health information (PHI)",
        "Breach notification letter",
        "TransUnion v. Ramirez standing",
        "Article III injury in fact",
        "GDPR Article 82 damages",
        "UK GDPR / Data Protection Act 2018",
        "Illinois Biometric Information Privacy Act (BIPA)",
        "California Consumer Privacy Act (CCPA) § 1798.150",
        "HIPAA breach reporting",
        "Gramm-Leach-Bliley Act Safeguards Rule",
        "FTC Act Section 5 unfair practices",
        "Credit monitoring and identity restoration",
        "Credit freeze",
        "FTC IdentityTheft.gov recovery plan",
        "Class settlement claim form",
        "Pro rata distribution",
        "Data protection authority complaint",
      ],
      relatedTerms: [
        { label: "Identity theft recovery steps", href: "/tools/consumer/statute-of-limitations-lookup" },
        { label: "GDPR request forms", href: "/eu-forms" },
        { label: "Demand letter builder", href: "/forms/demand-letter" },
      ],
    },
    keyFacts: [
      { label: "Typical flat class settlement payment", value: "$25–$150 per claimant" },
      { label: "Documented out-of-pocket reimbursement", value: "Commonly capped at $2,500–$10,000" },
      { label: "Lost-time payments", value: "Often 2–10 hours at $20–$35 per hour" },
      { label: "Credit monitoring provided", value: "1–3 years, at the defendant's cost" },
      { label: "CCPA statutory damages (private right)", value: "$100–$750 per consumer per incident" },
      { label: "Illinois BIPA damages", value: "$1,000 negligent / $5,000 intentional per violation" },
      { label: "GDPR Article 82", value: "Compensation for material and non-material damage, no fixed cap" },
      { label: "Typical US claim deadline", value: "The settlement claims deadline, often 60–120 days after notice" },
    ],
    sections: [
      {
        heading: "How US breach settlements are structured",
        paragraphs: [
          "Almost every consumer data breach class settlement uses the same architecture. Understanding it tells you exactly which receipts to keep and which box to tick on the claim form — most people leave money on the table by claiming only the flat payment.",
        ],
        tables: [
          {
            caption: "Settlement benefit tiers and what each requires",
            columns: ["Benefit tier", "Typical amount", "Proof required"],
            rows: [
              ["Flat cash / alternative cash payment", "$25–$150, often pro rata", "Claim form only; no receipts"],
              ["Documented ordinary losses", "Up to $500–$2,500", "Receipts: bank fees, credit report costs, postage, notary, phone charges"],
              ["Extraordinary loss (identity theft)", "Up to $5,000–$10,000", "Police report, FTC identity theft report, bank fraud correspondence"],
              ["Lost time", "2–10 hours at $20–$35 per hour", "Self-attestation describing what you did and when"],
              ["Credit monitoring / identity restoration", "1–3 years of service", "Enrolment only"],
              ["Injunctive relief (security upgrades)", "No cash", "Automatic; no claim needed"],
            ],
            note: "Pro rata clauses mean the flat amount shrinks if claim volume is high and grows if it is low. Always claim documented losses as well as the flat payment where both are offered.",
          },
        ],
      },
      {
        heading: "Which law gives you a claim",
        tables: [
          {
            caption: "Routes to compensation by data type and jurisdiction",
            columns: ["Route", "Who can use it", "What it delivers"],
            rows: [
              ["State breach-notification statutes", "Anyone notified of a breach", "Notice rights; a private action in some states, regulator enforcement in others"],
              ["CCPA § 1798.150", "California residents, unencrypted and unredacted personal data", "Statutory damages of $100–$750 per consumer per incident, after a 30-day cure notice"],
              ["Illinois BIPA", "Illinois residents, biometric identifiers", "$1,000 per negligent violation, $5,000 per reckless or intentional violation"],
              ["Negligence / implied contract", "Most claimants, usually via class action", "Actual damages; requires concrete harm after Ramirez"],
              ["GDPR Article 82", "People in the EU/EEA", "Material and non-material damages, including distress, plus a free DPA complaint route"],
              ["UK GDPR / DPA 2018", "People in the UK", "Compensation claims, ICO complaint, no fee to complain"],
              ["HIPAA", "Patients whose PHI was exposed", "No private right of action; complaint to HHS Office for Civil Rights, but useful as evidence of a duty"],
              ["FCRA", "Where credit files are misused", "Statutory and actual damages against furnishers and bureaus"],
            ],
          },
        ],
      },
      {
        heading: "Document harm in the first 30 days",
        bullets: [
          "Keep the breach notification letter or email — it names the defendant, the data categories and the date, and is the anchor exhibit for any claim.",
          "Place a free credit freeze with Equifax, Experian and TransUnion, and note the date you did it.",
          "Pull all three credit reports and save PDFs; inaccuracies become evidence of misuse.",
          "Log every hour you spend on the response — calls, forms, bank visits — with dates. Lost-time payments are usually paid on attestation alone.",
          "Save every receipt: bank fees, replacement card charges, postage, notary, credit report fees, identity-monitoring you bought yourself.",
          "If fraud actually occurred, file an FTC report at IdentityTheft.gov and a police report. Those two documents unlock the largest settlement tier.",
          "In the EU or UK, send a data subject access request to the organisation and, if the answer is unsatisfactory, complain to your data protection authority — it is free and does not stop a compensation claim.",
        ],
      },
      {
        heading: "Realistic expectations",
        paragraphs: [
          "Headline settlement figures are aggregate funds, not individual payments. A widely reported nine-figure settlement usually pays a modest flat amount to most claimants, with the largest individual sums going to a small number of people who documented real identity theft. Claim rates on consumer breach settlements are typically low, which is why documented-loss and lost-time claims are worth the effort — those tiers are frequently underclaimed.",
          "Individual lawsuits outside a class rarely make economic sense in the US unless you suffered substantial, provable loss. In the EU and UK the calculus differs: an individual Article 82 claim for distress is a realistic route, and regulators will investigate on a free complaint.",
        ],
      },
    ],
    howTo: [
      { name: "Confirm you were affected", text: "Keep the notification letter and check the incident's official settlement site or the state attorney general's breach list." },
      { name: "Freeze credit and set alerts", text: "Free freezes at all three bureaus, plus alerts on bank and card accounts, on the day you learn of the breach." },
      { name: "Collect evidence of harm", text: "Credit reports, fraudulent charges, account notices, bank correspondence, and a dated log of your time." },
      { name: "File the claim form before the deadline", text: "Claim every tier you qualify for — flat payment, documented losses and lost time — not just the easiest box." },
      { name: "Report actual fraud formally", text: "IdentityTheft.gov and a police report create the documentation the extraordinary-loss tier requires." },
      { name: "EU/UK: complain and claim", text: "Send a data subject access request, complain to the DPA or ICO for free, and pursue Article 82 compensation for material or non-material damage." },
      { name: "Decide whether to opt out", text: "Opting out of a class preserves an individual lawsuit but forfeits the settlement payment — only sensible with large documented loss." },
    ],
    faqs: [
      { question: "How much money do people actually get from a data breach settlement?", answer: "For most claimants, a flat payment in the range of $25 to $150, often reduced pro rata if many people file. Claimants who document out-of-pocket costs typically recover those on top, up to a cap, and the small number who prove actual identity theft can recover several thousand dollars under the extraordinary-loss tier." },
      { question: "Can I sue on my own instead of joining the class?", answer: "You can opt out and sue individually, but in the US you must show concrete harm rather than a risk of future misuse, and litigation costs quickly exceed the value of a modest claim. Opting out generally only makes sense when you have substantial documented loss, such as sustained identity theft or a drained account." },
      { question: "Do I need to prove identity theft to get anything?", answer: "No. The flat cash tier and credit monitoring usually require nothing more than a valid claim form. Proof of fraud is only needed for the higher reimbursement tiers." },
      { question: "What is the deadline to claim?", answer: "For a class settlement, the claims deadline on the official notice — commonly 60 to 120 days after notice is issued — and it is strictly enforced. For an independent lawsuit, the state statute of limitations for negligence or contract applies, usually two to six years. GDPR compensation claims follow national limitation rules, commonly six years in England and Wales." },
      { question: "How do I know a settlement notice is not a scam?", answer: "Legitimate administrators never ask for payment, a full Social Security number by email, or bank credentials over the phone. Verify the settlement website against the court docket or the defendant's own breach page, and be wary of links in unsolicited texts." },
      { question: "Does a breach of my medical records give me a HIPAA claim?", answer: "HIPAA has no private right of action, so you cannot sue under it directly. You can complain to the HHS Office for Civil Rights, and the HIPAA duty is frequently used as the standard of care in a state-law negligence claim, which is the route health-data class actions actually take." },
      { question: "What compensation does the GDPR allow?", answer: "Article 82 allows compensation for both material damage, such as financial loss, and non-material damage, such as distress and loss of control over your data. There is no statutory cap, but awards for distress alone are typically modest, and the Court of Justice has held that a mere infringement without demonstrated damage is not enough on its own." },
      { question: "Is credit monitoring worth accepting?", answer: "Yes — it costs you nothing and, in most settlements, accepting it does not reduce your cash payment. It is not a substitute for a credit freeze, which is free, permanent until you lift it, and stops new accounts being opened in your name." },
    ],
    primaryCta: {
      path: "/forms/demand-letter",
      label: "Send a documented demand letter",
      description: "Put your losses in writing to the organisation that lost your data, with dates, receipts and a response deadline.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/consumer-protection",
      label: "Find a consumer privacy lawyer",
      description: "Privacy class action firms review breach claims at no cost and are paid from any settlement fund.",
    },
    recommenderTopic: "statute-of-limitations",
    datePublished: "2026-08-31",
    dateModified: "2026-08-31",
    authorId: "consumer-finance-editor",
    cluster: "Privacy & data protection cluster",
    related: [
      { label: "EU GDPR forms and packs", href: "/eu-forms", blurb: "Access, erasure and objection requests." },
      { label: "Health insurance claim denied", href: "/health-insurance-claim-denied", blurb: "When health data and claims go wrong." },
      { label: "Statute of limitations by state", href: "/statute-of-limitations-by-state", blurb: "Deadlines for negligence and contract claims." },
      { label: "AI hiring and workplace surveillance", href: "/ai-hiring-and-workplace-surveillance", blurb: "Employment-side privacy rules." },
    ],
  },

  /* ------------------------------------------------- Stage 5 · cluster 3 */
  {
    slug: "ai-hiring-and-workplace-surveillance",
    category: "Employment",
    h1: "AI Hiring Tools and Workplace Surveillance: Your Rights at Work",
    metaTitle: "AI Hiring Bias & Workplace Surveillance Laws (2026)",
    metaDescription:
      "Where AI hiring tools and employee monitoring cross the legal line: NYC Local Law 144 audits, Illinois AIVIA, Colorado AI Act, EEOC disparate impact, BIPA, ECPA and GDPR limits.",
    tagline: "Local Law 144 · Colorado AI Act · BIPA · EEOC disparate impact",
    intro: [
      "Automated hiring tools now screen a large share of applications before a human sees them, and employee monitoring software has moved from network logs to keystroke capture, screen recording, webcam checks and productivity scoring. Neither is illegal in itself. Both become unlawful when they discriminate, when required disclosures are skipped, or when they capture categories of data a statute protects.",
      "Three legal frameworks converge here. Anti-discrimination law — Title VII, the ADA and the ADEA — applies to an algorithm exactly as it applies to a hiring manager, and disparate impact liability does not require anyone to have intended to discriminate. Specific AI statutes now impose disclosure and audit duties: New York City Local Law 144 requires an annual independent bias audit of automated employment decision tools with published results and candidate notice, Illinois regulates AI video interview analysis, and Colorado's Artificial Intelligence Act creates duties for developers and deployers of high-risk systems in employment. Privacy law sets the third boundary: biometric statutes such as Illinois BIPA, wiretap and interception rules under the ECPA and stricter state analogues, and the GDPR for anyone monitoring workers in the EU.",
    ],
    entityBlock: {
      category: "Employment · Algorithmic decision-making",
      intro:
        "Claims in this area are built from disclosure failures, audit gaps and adverse impact statistics. The tool vendor and the employer can both be exposed, and the paper trail is usually generated by the compliance obligations themselves.",
      entities: [
        "Automated Employment Decision Tool (AEDT)",
        "NYC Local Law 144 bias audit",
        "Illinois Artificial Intelligence Video Interview Act",
        "Colorado Artificial Intelligence Act (SB 24-205)",
        "Title VII disparate impact",
        "Four-fifths (80%) rule",
        "Uniform Guidelines on Employee Selection Procedures",
        "ADA reasonable accommodation in assessments",
        "Age Discrimination in Employment Act",
        "EEOC charge and right-to-sue letter",
        "Illinois Biometric Information Privacy Act (BIPA)",
        "Electronic Communications Privacy Act (ECPA)",
        "Connecticut and Delaware monitoring notice statutes",
        "New York Civil Rights Law § 52-c",
        "GDPR Article 22 automated decision-making",
        "Data protection impact assessment (DPIA)",
        "Keystroke and screen monitoring",
        "Productivity scoring",
      ],
      relatedTerms: [
        { label: "Wrongful termination settlements", href: "/wrongful-termination-settlements" },
        { label: "EEOC settlement calculator", href: "/tools/consumer/eeoc-settlement-calculator" },
        { label: "Data breach compensation", href: "/data-breach-claim-compensation" },
      ],
    },
    keyFacts: [
      { label: "NYC bias audit", value: "Independent audit within the past year, results published" },
      { label: "NYC candidate notice", value: "At least 10 business days before use" },
      { label: "Adverse impact screen", value: "Four-fifths rule under the Uniform Guidelines" },
      { label: "EEOC charge deadline", value: "180 days, or 300 days in deferral states" },
      { label: "Illinois AIVIA", value: "Notice, explanation and consent before AI video analysis" },
      { label: "BIPA damages", value: "$1,000 negligent / $5,000 intentional per violation" },
      { label: "Colorado AI Act", value: "Duties of reasonable care for high-risk employment systems" },
      { label: "GDPR", value: "Article 22 limits on solely automated decisions; DPIA required for systematic monitoring" },
    ],
    sections: [
      {
        heading: "What the law requires where you are",
        tables: [
          {
            caption: "AI hiring and monitoring rules by jurisdiction",
            columns: ["Jurisdiction", "What it covers", "Core duty"],
            rows: [
              ["New York City", "Automated employment decision tools", "Annual independent bias audit, published summary, 10 business days' notice to candidates"],
              ["Illinois", "AI analysis of video interviews", "Notice, plain-language explanation, consent, deletion on request"],
              ["Illinois (BIPA)", "Faceprints, voiceprints, fingerprints", "Written notice, written release, retention schedule, per-violation damages"],
              ["Colorado", "High-risk AI systems in employment", "Reasonable care to avoid algorithmic discrimination; impact assessments; notice of adverse decisions"],
              ["Maryland", "Facial recognition in interviews", "Applicant consent required"],
              ["Connecticut / Delaware", "Electronic monitoring of employees", "Written notice before monitoring begins"],
              ["New York State", "Employee monitoring", "Written notice on hire and posted notice under Civil Rights Law § 52-c"],
              ["California", "Personal information of applicants and employees", "Notice at collection and access rights under the CCPA/CPRA"],
              ["EU / UK", "Automated decisions and monitoring", "GDPR Article 22 safeguards, lawful basis, DPIA, works council consultation in several member states"],
            ],
            note: "This is a fast-moving area; several additional states have enacted or proposed AI employment rules. Confirm current requirements before relying on any single entry.",
          },
        ],
      },
      {
        heading: "When an algorithm becomes discrimination",
        paragraphs: [
          "A hiring tool violates Title VII when its selection rate for a protected group is substantially lower than for the highest-selected group and the employer cannot show the tool is job-related and consistent with business necessity. The four-fifths rule is the conventional screen: a selection rate for one group below 80% of the top group's rate is treated as evidence of adverse impact worth investigating.",
        ],
        tables: [
          {
            caption: "Common failure modes and the claim they create",
            columns: ["Tool behaviour", "Legal risk", "Evidence to gather"],
            rows: [
              ["Resume screener trained on past hires", "Title VII disparate impact replicating historic imbalance", "Bias audit summary, selection rate data, job posting and rejection timestamps"],
              ["Gamified or timed assessment", "ADA claim where disability affects performance", "Accommodation request, employer response, assessment description"],
              ["Video interview analysing facial expression or tone", "Illinois AIVIA, BIPA, ADA and Title VII exposure", "Consent screens, notices given, vendor name, recording retention terms"],
              ["Employment-gap or graduation-year filters", "ADEA age discrimination, caregiver impact", "Application form screenshots, filter criteria, rejection speed"],
              ["Productivity scoring driving discipline", "Disparate impact, disability accommodation, NLRA concerted activity issues", "Score reports, discipline notices, monitoring policy, notice given"],
              ["Continuous keystroke or webcam monitoring", "Wiretap and state monitoring-notice statutes, GDPR proportionality", "Monitoring policy, notice date, scope of capture, off-duty capture evidence"],
            ],
          },
        ],
      },
      {
        heading: "What to do if you think a tool screened you out",
        bullets: [
          "Ask the employer, in writing, whether an automated employment decision tool was used and request the required notice and the most recent published bias audit.",
          "Keep the job posting, your application confirmation, every automated rejection and its timestamp — very fast rejections indicate automated screening.",
          "If you have a disability, request an alternative assessment format in writing; a refusal to accommodate is often a stronger and simpler claim than the algorithm itself.",
          "Preserve consent screens and privacy notices from any video interview or assessment platform.",
          "File an EEOC charge within 180 days, or 300 days in a state with a deferral agency; the deadline runs from the adverse decision, not from when you discovered the tool.",
          "In the EU or UK, request the logic involved in the decision and human review under GDPR Article 22 and file a subject access request for your assessment data.",
        ],
      },
      {
        heading: "Non-competes and post-employment restrictions",
        paragraphs: [
          "The same workers affected by algorithmic hiring often face restrictive covenants on the way out. Enforceability remains a matter of state law, and it varies sharply: California, Minnesota, North Dakota and Oklahoma void most employee non-competes outright, while other states enforce them only where the restriction is reasonable in duration, geography and scope and protects a legitimate interest such as trade secrets or customer relationships. Several states also impose salary thresholds below which a non-compete cannot be enforced at all.",
        ],
        bullets: [
          "Read the agreement for a choice-of-law clause; employers frequently select a more employer-friendly state than the one you work in.",
          "Separate the non-compete from non-solicitation and confidentiality clauses — the latter two are far more widely enforced and often survive even where the non-compete fails.",
          "Where you were fired without cause, many courts weigh that heavily against enforcement.",
          "Ask whether you received consideration beyond continued employment; several states require something more when the agreement was signed after hiring.",
          "Get a written opinion before you resign, not after the demand letter arrives — injunction timelines are measured in days.",
        ],
      },
    ],
    howTo: [
      { name: "Identify whether automation was used", text: "Look for tool disclosures, assessment platforms, bias audit notices and unusually fast rejections." },
      { name: "Request the notices and audit", text: "Ask in writing for the AEDT notice, the published bias audit summary and the data categories collected." },
      { name: "Preserve the record", text: "Save the posting, application, consent screens, rejection emails and timestamps before accounts are closed." },
      { name: "Request accommodation if relevant", text: "Ask for an alternative assessment format in writing; document the employer's response." },
      { name: "File within the deadline", text: "EEOC charge within 180 or 300 days depending on state, or a state agency charge in parallel." },
      { name: "Use privacy rights to get data", text: "CCPA access requests, GDPR subject access and Article 22 human-review requests produce the underlying assessment data." },
      { name: "Check restrictive covenants separately", text: "Review any non-compete under the law of the state where you actually work, and treat non-solicitation clauses as a distinct risk." },
    ],
    faqs: [
      { question: "Is it legal for an employer to reject me using AI?", answer: "Yes, in most of the US, provided the tool does not discriminate and any applicable disclosure and audit duties are met. Where it becomes unlawful is when the tool produces adverse impact on a protected group without job-related justification, screens out disabled applicants who were denied an accommodation, or is used without the notice, consent or bias-audit steps a jurisdiction requires." },
      { question: "How do I find out whether an AI tool was used on my application?", answer: "Ask the employer directly in writing. In New York City, employers must give candidates notice at least 10 business days before using an automated employment decision tool and must publish a summary of the most recent bias audit. In the EU and UK, you can request the logic involved and ask for human review of a solely automated decision under Article 22." },
      { question: "What is the four-fifths rule?", answer: "A screening test from the Uniform Guidelines on Employee Selection Procedures: if a protected group is selected at less than 80% of the rate of the most-selected group, that difference is treated as evidence of adverse impact meriting scrutiny. It is a red flag, not an automatic violation — the employer can still show the tool is job-related and consistent with business necessity." },
      { question: "Can my employer monitor my keystrokes and screen?", answer: "Generally yes on company equipment and for legitimate business purposes, but several states — including Connecticut, Delaware and New York — require written notice before electronic monitoring, and intercepting private communications can breach federal or state wiretap law. In the EU, continuous monitoring requires a lawful basis, proportionality, a data protection impact assessment and, in many countries, consultation with employee representatives." },
      { question: "Does a video interview that analyses my face create a claim?", answer: "It can. Illinois requires notice, an explanation and consent before AI analysis of video interviews and allows you to request deletion. If faceprints are captured, the Biometric Information Privacy Act adds written-release requirements and damages of $1,000 or $5,000 per violation. Maryland requires consent for facial recognition in interviews." },
      { question: "What is the deadline to challenge an AI-driven rejection?", answer: "For a federal discrimination claim, file an EEOC charge within 180 days of the adverse decision, extended to 300 days where a state or local fair employment agency exists. State law claims and privacy statutes have their own, often longer, limitation periods, but the EEOC clock is the one that most commonly expires unnoticed." },
      { question: "Are non-competes still enforceable?", answer: "It depends entirely on the state. California, Minnesota, North Dakota and Oklahoma void most employee non-competes; other states enforce them where the duration, geography and scope are reasonable and protect a legitimate business interest, and several apply salary thresholds. Non-solicitation and confidentiality clauses are enforced far more widely, so read them as separate obligations." },
      { question: "Is it worth filing if I only suspect automation?", answer: "Start with the written requests rather than a filing. The notice, audit summary and data access responses either confirm your suspicion or close the question, and they create a paper trail while the EEOC deadline is still open. An employment lawyer can review that correspondence in a free consultation before you commit to a charge." },
    ],
    primaryCta: {
      path: "/tools/consumer/eeoc-settlement-calculator",
      label: "Estimate an employment claim's value",
      description: "Model back pay, front pay and emotional distress to see what a discrimination claim is realistically worth.",
    },
    lawyerCta: {
      path: "/lawyer-near-me/employment",
      label: "Find an employment lawyer",
      description: "Most employment lawyers offer a free initial review and work on contingency or statutory fee-shifting.",
    },
    recommenderTopic: "employment",
    datePublished: "2026-08-31",
    dateModified: "2026-08-31",
    authorId: "editor-in-chief",
    cluster: "Employment & AI cluster",
    related: [
      { label: "Wrongful termination settlements", href: "/wrongful-termination-settlements", blurb: "What termination claims pay by state." },
      { label: "Severance pay calculator", href: "/tools/consumer/severance-pay-calculator", blurb: "Value a severance offer before signing." },
      { label: "Data breach compensation", href: "/data-breach-claim-compensation", blurb: "When personal data is exposed." },
      { label: "Employment law guide", href: "/employment-law", blurb: "Rights at work, start to finish." },
    ],
  },
];

export const phase8PillarSlugs = phase8Pillars.map((p) => p.slug);

export function getPhase8Pillar(slug: string): Phase8Pillar | undefined {
  return phase8Pillars.find((p) => p.slug === slug);
}
