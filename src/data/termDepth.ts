/**
 * Term depth layer — rescues thin glossary pages that already rank on pages 4-7.
 *
 * Each entry adds statutory grounding, a worked example, a comparison table and
 * "commonly confused with" disambiguation on top of the base definition.
 *
 * Educational reference. NOT legal advice.
 */

export interface TermDepth {
  /** Short statutory / doctrinal grounding. */
  legalBasis: string;
  /** The elements or tests a court actually applies. */
  elements?: { label: string; body: string }[];
  /** A worked, concrete example. */
  workedExample: { scenario: string; analysis: string; outcome: string };
  /** Comparison rows — how the term differs across states or from neighbours. */
  comparison?: { title: string; columns: [string, string]; rows: [string, string][] };
  /** Terms readers routinely mix this up with. */
  confusedWith?: { term: string; slug?: string; difference: string }[];
  /** Related internal destinations. */
  relatedLinks?: { label: string; href: string }[];
}

export const termDepth: Record<string, TermDepth> = {
  negligence: {
    legalBasis:
      "Negligence is a common-law tort refined state by state, not a single federal statute. The framework most US courts apply comes from the Restatement (Second) of Torts §§ 281–283: a duty of reasonable care, a breach of that duty, cause in fact and proximate cause, and actual damages. States then modify it by statute — comparative-fault acts, damage caps, and shortened limitation periods for medical or government defendants.",
    elements: [
      { label: "Duty", body: "The defendant owed the plaintiff a legally recognised duty of reasonable care. Drivers owe it to other road users; property owners owe it to lawful visitors; professionals owe the standard of their field." },
      { label: "Breach", body: "The defendant fell below the standard of a reasonably prudent person in the same circumstances. Violating a safety statute (running a red light, ignoring a building code) can establish breach automatically — negligence per se." },
      { label: "Causation", body: "Two tests must be met: cause in fact (\"but for\" the conduct the harm would not have happened) and proximate cause (the harm was a foreseeable result, not a freak chain of events)." },
      { label: "Damages", body: "Actual, provable loss — medical bills, lost income, property damage, pain and suffering. A near miss with no injury is not negligence, however careless the conduct." },
    ],
    workedExample: {
      scenario:
        "A delivery driver checks a phone, drifts a lane and rear-ends a stopped car. The other driver has $9,400 in ER and physio bills, misses three weeks of work at $1,100 a week, and is found by the police report to have had a brake light out.",
      analysis:
        "Duty: every driver owes other road users reasonable care. Breach: distracted driving plus a rear-end collision creates a strong presumption of fault. Causation: the impact directly caused the cervical strain documented the same day. Damages: $9,400 medical + $3,300 lost wages = $12,700 economic loss, plus non-economic pain and suffering.",
      outcome:
        "In a pure comparative state, a 10% fault allocation for the brake light reduces a $30,000 valuation to $27,000. In a contributory-negligence state (Alabama, Maryland, North Carolina, Virginia and DC), that same 10% can defeat the claim entirely — which is why the fault rule in your state matters more than the size of the bills.",
    },
    comparison: {
      title: "How fault rules change the payout",
      columns: ["Fault rule", "Effect on a claim where you are 30% at fault"],
      rows: [
        ["Pure comparative (e.g. California, New York, Florida for most claims)", "Recover 70% of your damages — you can recover even if 99% at fault."],
        ["Modified comparative, 51% bar (e.g. Texas, Illinois, Ohio)", "Recover 70%; recover nothing once your fault reaches 51%."],
        ["Modified comparative, 50% bar (e.g. Georgia, Colorado, Tennessee)", "Recover 70%; recover nothing once your fault reaches 50%."],
        ["Contributory negligence (AL, MD, NC, VA, DC)", "Recover nothing — any fault at all bars recovery."],
      ],
    },
    confusedWith: [
      { term: "Gross negligence", difference: "Ordinary negligence is carelessness. Gross negligence is a conscious, reckless disregard for safety — it can unlock punitive damages and usually cannot be waived by contract." },
      { term: "Negligence per se", difference: "Breach proven automatically by violating a safety statute, rather than argued to a jury as unreasonable conduct." },
      { term: "Strict liability", slug: "strict-liability", difference: "No carelessness needed — liability attaches because of the activity or defect itself, common in product and abnormally dangerous activity cases." },
      { term: "Breach of contract", slug: "breach", difference: "Failure to perform a promise you agreed to, judged against the contract, not against a reasonable-person standard." },
    ],
    relatedLinks: [
      { label: "Personal injury settlement calculator", href: "/tools/settlement-calculator" },
      { label: "How pain and suffering is calculated", href: "/how-is-pain-and-suffering-calculated" },
      { label: "Statute of limitations by state", href: "/data/settlement-deadlines" },
      { label: "Car accident checklist", href: "/car-accident-checklist" },
    ],
  },
};

export function getTermDepth(slug: string): TermDepth | undefined {
  return termDepth[slug];
}
