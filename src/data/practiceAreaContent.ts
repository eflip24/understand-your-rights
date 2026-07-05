// Sprint 6 — Lawyer directory enrichment + tool recommender data
// Per-practice-area "Questions to ask", cost bands, and next-step recommendations.

export interface RelatedLink {
  label: string;
  path: string;
  kind: "tool" | "blog" | "directory" | "guide";
  reason: string;
}

export interface PracticeAreaContent {
  slug: string;
  // Questions to ask during a consult (high-intent block)
  questions: string[];
  // Fee model plain-English
  feeModel: string;
  // Typical retainer / hourly / contingency range (national)
  costRange: {
    contingencyPct?: string; // e.g. "33–40%"
    hourlyRange?: string; // e.g. "$250–$500/hr"
    consultFee?: string; // e.g. "Free" or "$150–$300"
    flatFeeRange?: string; // e.g. "$2,500–$7,500"
  };
  // Data-driven "Average cost in {state}" bands (low/mid/high state tiers)
  stateCostMultiplier?: {
    low: number; // multiplier vs national average (rural / low COL states)
    mid: number;
    high: number; // metro / high COL (NY, CA, MA, DC)
  };
  // Recommender: tools + one guide/blog + one directory link
  recommended: RelatedLink[];
}

// Sensible cost tier by state (COL/lawyer market)
const HIGH_COST_STATES = new Set(["CA", "NY", "NJ", "MA", "CT", "DC", "WA", "HI", "MD"]);
const LOW_COST_STATES = new Set(["MS", "AR", "AL", "WV", "KY", "OK", "NM", "SD", "ND", "MT", "WY", "ID", "TN", "IN", "MO", "KS", "NE", "IA"]);

export function costTierForState(stateAbbr: string): "low" | "mid" | "high" {
  const s = stateAbbr.toUpperCase();
  if (HIGH_COST_STATES.has(s)) return "high";
  if (LOW_COST_STATES.has(s)) return "low";
  return "mid";
}

export const practiceAreaContent: Record<string, PracticeAreaContent> = {
  "personal-injury": {
    slug: "personal-injury",
    questions: [
      "What percentage of your practice is personal injury cases like mine?",
      "Do you charge a contingency fee, and what percentage — before or after case costs?",
      "Who pays the case expenses (expert witnesses, medical records, filing fees) if we lose?",
      "Will you personally handle my case, or will it be assigned to an associate or paralegal?",
      "Have you tried a case like mine to verdict, or do you typically settle?",
      "What's your realistic estimate of the case value, and what's the timeline?",
      "Do you carry legal malpractice insurance?",
      "Are there any medical liens (Medicare, Medicaid, private insurer) I need to worry about?",
    ],
    feeModel: "Almost always contingency — you pay nothing unless they recover money for you.",
    costRange: { contingencyPct: "33–40% (rising to 40% if suit is filed)", consultFee: "Free" },
    stateCostMultiplier: { low: 0.92, mid: 1.0, high: 1.08 },
    recommended: [
      { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Ballpark your case value before the consult." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "See exactly what a 33% vs 40% fee means for your net recovery." },
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Confirm your filing deadline hasn't passed." },
      { label: "Personal Injury Law Guide", path: "/personal-injury-law", kind: "guide", reason: "Understand the process before you hire." },
    ],
  },
  "car-accident": {
    slug: "car-accident",
    questions: [
      "Have you handled cases against my insurer specifically?",
      "How do you value pain and suffering — multiplier method, per-diem, or both?",
      "How is comparative fault handled in this state, and how does it affect my recovery?",
      "Should I give a recorded statement to the other driver's insurer?",
      "What happens if my medical bills exceed the at-fault driver's policy limits?",
      "Will you pursue an underinsured motorist (UIM) claim against my own policy?",
      "What's your fee if the case settles pre-suit vs. after filing?",
      "How long does a typical car accident case take from hire to check?",
    ],
    feeModel: "Contingency — no fee unless they win.",
    costRange: { contingencyPct: "33% pre-suit, 40% after filing", consultFee: "Free" },
    stateCostMultiplier: { low: 0.90, mid: 1.0, high: 1.10 },
    recommended: [
      { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Estimate what your crash claim is worth." },
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Most auto claims must be filed within 2–3 years." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Compare your net recovery at 33% vs 40%." },
      { label: "Auto Accident Law Guide", path: "/auto-accident-law", kind: "guide", reason: "Read up on fault, PIP, and UIM before the call." },
    ],
  },
  "truck-accident": {
    slug: "truck-accident",
    questions: [
      "How many commercial truck cases have you tried or settled?",
      "Do you know how to preserve the ECM/black box and driver logs before they're destroyed?",
      "Will you send a spoliation letter to the trucking company today?",
      "Which federal motor carrier regulations (FMCSR) apply to my crash?",
      "Are there multiple liable parties — driver, carrier, broker, shipper, maintenance company?",
      "What's the trucking company's insurance policy limit ($750K minimum, often $1M+)?",
      "Will you retain accident reconstruction and trucking industry experts?",
    ],
    feeModel: "Contingency — high case costs are advanced by the firm.",
    costRange: { contingencyPct: "40% (higher because of expert costs)", consultFee: "Free" },
    stateCostMultiplier: { low: 0.95, mid: 1.0, high: 1.10 },
    recommended: [
      { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Truck cases often break policy limits — see the range." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Understand the impact of 40% contingency plus case costs." },
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Confirm your window to file." },
      { label: "Auto Accident Law Guide", path: "/auto-accident-law", kind: "guide", reason: "Read the trucking regulation basics." },
    ],
  },
  "medical-malpractice": {
    slug: "medical-malpractice",
    questions: [
      "How many med mal cases have you taken to verdict in the last 5 years?",
      "Will you retain a qualified medical expert to review my records before filing?",
      "Does this state require a Certificate of Merit or expert affidavit before filing?",
      "What's this state's damages cap on non-economic damages?",
      "What's the statute of repose in this state (final cutoff regardless of discovery)?",
      "Roughly how much do you expect to advance in case costs (expert fees can hit $50K+)?",
      "What happens to those costs if we lose?",
    ],
    feeModel: "Contingency, but with high advanced costs. Many firms decline cases under $250K expected value.",
    costRange: { contingencyPct: "33–45% (sliding scale by state; some states cap it)", consultFee: "Free" },
    stateCostMultiplier: { low: 0.95, mid: 1.0, high: 1.15 },
    recommended: [
      { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Rough-value your case before spending $30K+ on experts." },
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Med mal SOL is short and includes a hard statute of repose." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Med mal fees can be sliding-scale — check your net." },
      { label: "Personal Injury Law Guide", path: "/personal-injury-law", kind: "guide", reason: "Learn what proving negligence looks like." },
    ],
  },
  "workers-compensation": {
    slug: "workers-compensation",
    questions: [
      "Is my case a straight workers' comp claim, a third-party lawsuit, or both?",
      "How is your fee set — most states cap workers' comp attorney fees by statute (10–25%).",
      "Should I settle with a clincher (full and final) or a stipulation (leave medicals open)?",
      "How is my average weekly wage (AWW) calculated, and did the insurer get it right?",
      "What's my permanent impairment rating likely to be, and who chooses the doctor?",
      "Will Medicare need a set-aside (MSA) out of my settlement?",
      "Am I protected from retaliation for filing this claim?",
    ],
    feeModel: "Contingency, but capped by state statute (usually 15–25% of the settlement/award).",
    costRange: { contingencyPct: "15–25% (state-capped)", consultFee: "Free" },
    stateCostMultiplier: { low: 0.95, mid: 1.0, high: 1.05 },
    recommended: [
      { label: "Workers' Comp Settlement Calculator", path: "/tools/employment/workers-comp-settlement-calculator", kind: "tool", reason: "Estimate your TTD + PPD settlement before signing anything." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "See how the state-capped fee affects your check." },
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Comp claims have short notice + filing windows." },
      { label: "Employment Law Guide", path: "/employment-law", kind: "guide", reason: "Understand retaliation protections." },
    ],
  },
  employment: {
    slug: "employment",
    questions: [
      "Have you handled cases against employers this size in this industry?",
      "Do you take cases on contingency, hourly, or a hybrid?",
      "Do I need to file an EEOC charge first, and when is the 180/300-day deadline?",
      "What damages am I entitled to — back pay, front pay, emotional distress, punitives?",
      "Are Title VII compensatory/punitive damage caps going to limit my recovery?",
      "Is this a case where liquidated (double) damages apply (FLSA, ADEA)?",
      "How likely is a mandatory arbitration clause in my contract to force us out of court?",
    ],
    feeModel: "Mix: many take on contingency (33–40%); complex/hourly cases $300–$600/hr.",
    costRange: { contingencyPct: "33–40%", hourlyRange: "$300–$600/hr", consultFee: "Free or $100–$300" },
    stateCostMultiplier: { low: 0.90, mid: 1.0, high: 1.15 },
    recommended: [
      { label: "EEOC Settlement Calculator", path: "/tools/employment/eeoc-settlement-calculator", kind: "tool", reason: "Estimate back pay + damages against Title VII caps." },
      { label: "Overtime & Wage Theft Calculator", path: "/tools/business/overtime-calculator", kind: "tool", reason: "If unpaid OT is part of your claim, quantify it." },
      { label: "Final Paycheck Deadline Lookup", path: "/tools/employment/final-paycheck-deadline-lookup", kind: "tool", reason: "Missed final-pay deadlines often mean statutory penalties." },
      { label: "Employment Law Guide", path: "/employment-law", kind: "guide", reason: "Know your rights before the consult." },
    ],
  },
  "insurance-dispute": {
    slug: "insurance-dispute",
    questions: [
      "Have you sued this insurance company before? What was the outcome?",
      "Is this a bad-faith claim, a coverage dispute, or both?",
      "What's the extra-contractual exposure — attorney's fees, punitive damages, statutory penalties?",
      "How do you charge — hourly, contingency, or fee-shifting under the state bad-faith statute?",
      "Have you sent a demand/reservation-of-rights letter setting up bad faith?",
      "What's the appraisal or ADR clause in my policy going to require?",
    ],
    feeModel: "Mix: hourly for complex coverage, contingency for first-party bad faith; some states shift fees.",
    costRange: { contingencyPct: "33–40%", hourlyRange: "$300–$650/hr", consultFee: "Free–$300" },
    stateCostMultiplier: { low: 0.95, mid: 1.0, high: 1.10 },
    recommended: [
      { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "If the dispute is about injury payout, ballpark the value." },
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Bad-faith claims have short, often policy-based deadlines." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Compare contingency vs hourly for your net." },
      { label: "Insurance Law Guide", path: "/insurance-law", kind: "guide", reason: "Read up on bad faith and coverage law." },
    ],
  },
  "real-estate": {
    slug: "real-estate",
    questions: [
      "Do you handle purchases/sales, landlord-tenant, boundary/title, or all of the above?",
      "Is this billed flat-fee (typical for closings) or hourly (typical for disputes)?",
      "What's included in your flat fee — title review, closing attendance, deed prep?",
      "If title issues appear, what's your hourly rate and estimated additional cost?",
      "Do you carry title insurance errors coverage?",
      "What's the timeline from contract to close?",
    ],
    feeModel: "Flat fee for closings; hourly for disputes/litigation.",
    costRange: { flatFeeRange: "$500–$1,500 (closing)", hourlyRange: "$250–$500/hr (disputes)", consultFee: "Free–$250" },
    stateCostMultiplier: { low: 0.85, mid: 1.0, high: 1.20 },
    recommended: [
      { label: "Security Deposit Calculator", path: "/tools/consumer/security-deposit-calculator", kind: "tool", reason: "For landlord-tenant disputes." },
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Property claim deadlines vary widely." },
      { label: "Landlord-Tenant Law Guide", path: "/landlord-tenant-law", kind: "guide", reason: "Understand notice and eviction rules." },
    ],
  },
  "family-law": {
    slug: "family-law",
    questions: [
      "How is your fee structured — retainer + hourly, flat fee for uncontested, or hybrid?",
      "What's the typical all-in cost for a case like mine — contested vs uncontested?",
      "Does this state require mediation before trial?",
      "How is alimony calculated here, and are there statutory guidelines or caps?",
      "How is custody decided — best-interests factors, shared presumption, etc.?",
      "Will you pursue attorney's fees from the higher-earning spouse?",
      "How do we handle retirement accounts, business valuations, and QDROs?",
    ],
    feeModel: "Retainer + hourly for contested; flat fee possible for uncontested divorces.",
    costRange: { hourlyRange: "$250–$550/hr", flatFeeRange: "$1,500–$5,000 uncontested", consultFee: "Free–$300" },
    stateCostMultiplier: { low: 0.85, mid: 1.0, high: 1.20 },
    recommended: [
      { label: "Alimony / Spousal Support Calculator", path: "/tools/family/alimony-spousal-support-calculator", kind: "tool", reason: "Estimate support under your state's formula." },
      { label: "Child Support Calculator", path: "/tools/family/child-support-calculator", kind: "tool", reason: "Estimate guideline child support." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Model retainer + hourly total cost." },
    ],
  },
  bankruptcy: {
    slug: "bankruptcy",
    questions: [
      "Chapter 7 or Chapter 13 — which fits my income, assets, and debts?",
      "What's the flat fee, and what's excluded (adversary proceedings, amendments)?",
      "Do I qualify under the means test, and can you run it now?",
      "Which of my assets are exempt under this state's exemptions vs federal?",
      "How long does the whole process take, and when is the 341 meeting?",
      "What debts can't be discharged (taxes, student loans, DSO)?",
      "Should I stop paying credit cards before filing?",
    ],
    feeModel: "Flat fee, usually paid up front for Ch. 7 or through the plan for Ch. 13.",
    costRange: { flatFeeRange: "$1,000–$2,500 (Ch. 7); $3,000–$5,000 (Ch. 13)", consultFee: "Free" },
    stateCostMultiplier: { low: 0.85, mid: 1.0, high: 1.15 },
    recommended: [
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Check debt-collection SOL before assuming bankruptcy is the only route." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Compare filing cost vs debt to be discharged." },
    ],
  },
  "criminal-defense": {
    slug: "criminal-defense",
    questions: [
      "Have you handled this specific charge in this county before?",
      "Do you charge a flat fee per stage (pre-trial, plea, trial) or hourly?",
      "What does the flat fee cover, and what triggers additional fees?",
      "What are the possible outcomes — dismissal, plea, diversion, trial?",
      "Are there collateral consequences (immigration, licensing, gun rights) I should worry about?",
      "Will you be the attorney in court, or an associate?",
      "Should I speak to the police or investigators before we meet again?",
    ],
    feeModel: "Flat fee per stage (misdemeanors) or hourly with retainer (felonies).",
    costRange: { flatFeeRange: "$1,500–$5,000 misdemeanor; $10,000–$50,000+ felony", hourlyRange: "$250–$700/hr", consultFee: "Free–$300" },
    stateCostMultiplier: { low: 0.85, mid: 1.0, high: 1.20 },
    recommended: [
      { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Confirm the charging window on your alleged offense." },
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Model retainer burn on hourly cases." },
    ],
  },
  immigration: {
    slug: "immigration",
    questions: [
      "Are you a licensed immigration attorney (not a notario or consultant)?",
      "Do you charge flat fees per petition, or hourly for complex cases?",
      "What's included — USCIS fees, translations, RFE responses?",
      "What's your realistic timeline given current USCIS/embassy backlogs?",
      "Are there any bars or inadmissibility issues in my history I should know about?",
      "Can you handle an appeal or federal court challenge if we're denied?",
    ],
    feeModel: "Flat fee per petition; hourly for removal defense / federal litigation.",
    costRange: { flatFeeRange: "$1,500–$8,000 per petition", hourlyRange: "$250–$500/hr", consultFee: "$100–$300" },
    stateCostMultiplier: { low: 0.90, mid: 1.0, high: 1.15 },
    recommended: [
      { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Budget your total legal spend." },
    ],
  },
};

export function getPracticeAreaContent(slug: string): PracticeAreaContent | undefined {
  return practiceAreaContent[slug];
}

// Format a national fee band adjusted for state cost tier.
export function formatStateCostBand(
  content: PracticeAreaContent,
  stateAbbr: string,
  stateName: string,
): string | null {
  const mult = content.stateCostMultiplier;
  if (!mult) return null;
  const tier = costTierForState(stateAbbr);
  const factor = mult[tier];
  const { hourlyRange, flatFeeRange } = content.costRange;

  const scale = (range: string) => {
    // e.g. "$250–$500/hr" → scale both ends
    const m = range.match(/\$([\d,]+)\D+\$([\d,]+)([^$]*)/);
    if (!m) return range;
    const low = Math.round((parseInt(m[1].replace(/,/g, ""), 10) * factor) / 25) * 25;
    const high = Math.round((parseInt(m[2].replace(/,/g, ""), 10) * factor) / 25) * 25;
    return `$${low.toLocaleString()}–$${high.toLocaleString()}${m[3] || ""}`;
  };

  if (flatFeeRange) return `${scale(flatFeeRange)} typical in ${stateName} (${tier === "high" ? "higher metro rates" : tier === "low" ? "lower cost-of-living market" : "mid-range market"})`;
  if (hourlyRange) return `${scale(hourlyRange)} typical in ${stateName} (${tier === "high" ? "higher metro rates" : tier === "low" ? "lower cost-of-living market" : "mid-range market"})`;
  return null;
}
