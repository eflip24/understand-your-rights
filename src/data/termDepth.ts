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

  precedent: {
    legalBasis:
      "Precedent operates through stare decisis — \"stand by things decided.\" A ruling by a higher court in the same jurisdiction binds every lower court in that jurisdiction on the same legal question. US Supreme Court decisions bind every court in the country on federal questions; a state supreme court binds every court of that state on state law. Decisions from other jurisdictions are persuasive only: a judge may follow them, but nothing requires it.",
    elements: [
      { label: "Binding precedent", body: "A decision of a superior court in the same appellate chain, on the same legal issue. A California trial judge must follow the California Supreme Court; a federal district judge in Texas must follow the Fifth Circuit." },
      { label: "Persuasive precedent", body: "Decisions from another state, another federal circuit, a lower court, or a foreign court. Also includes dissents, concurrences and Restatements. Influential, never mandatory." },
      { label: "Ratio decidendi", body: "The legal reasoning essential to the outcome. This — not the facts, not the commentary — is the part that binds later courts." },
      { label: "Obiter dicta", body: "Remarks made in passing that were not necessary to the decision. Frequently quoted in briefs, but never binding." },
      { label: "Distinguishing", body: "The standard way lawyers escape an unhelpful precedent: show the material facts differ, so the earlier rule does not reach this case." },
    ],
    workedExample: {
      scenario:
        "A tenant in Ohio sues a landlord for a slip on an unlit stairwell. The landlord's lawyer cites a 2019 Ohio Court of Appeals decision (Eighth District) holding that an \"open and obvious\" hazard defeats the claim. The tenant's case is filed in the Tenth District.",
      analysis:
        "The Eighth District decision is not binding in the Tenth District — Ohio appellate districts do not bind each other, so it is persuasive only. The Ohio Supreme Court's open-and-obvious line of cases does bind both. The tenant's lawyer distinguishes the 2019 case: darkness that conceals the hazard is the classic exception, so the hazard was not observable at all.",
      outcome:
        "The trial court denies summary judgment. The precedent was real, but it was neither binding in that district nor factually on point — two separate reasons it did not control the outcome.",
    },
    comparison: {
      title: "Which decisions actually bind a court",
      columns: ["Deciding court", "Binding on"],
      rows: [
        ["US Supreme Court", "Every federal and state court, on questions of federal law"],
        ["Federal Court of Appeals (e.g. Ninth Circuit)", "Federal district courts inside that circuit only"],
        ["State supreme court", "Every court of that state, on questions of that state's law"],
        ["State intermediate appellate court", "Trial courts in its district; other districts in some states, not in Ohio, California or Texas"],
        ["Trial court of any level", "No other court — not even itself in a later case"],
      ],
    },
    confusedWith: [
      { term: "Stare decisis", difference: "The doctrine that courts follow precedent. Precedent is the decision itself; stare decisis is the rule that makes it stick." },
      { term: "Res judicata", difference: "Bars the same parties from relitigating the same claim. Precedent governs the law applied to everyone; res judicata governs one dispute between two parties." },
      { term: "Case of first impression", difference: "A question no court in that jurisdiction has yet decided, so no binding precedent exists and persuasive authority carries unusual weight." },
      { term: "Statute", slug: "statute-of-limitations", difference: "Legislatures write statutes; courts write precedent. A statute overrides a conflicting precedent going forward, unless the precedent rests on the constitution." },
    ],
    relatedLinks: [
      { label: "Statute library by state", href: "/statutes" },
      { label: "Legal terms glossary", href: "/legal-terms" },
      { label: "Statute of limitations by state", href: "/statute-of-limitations" },
    ],
  },

  unconscionable: {
    legalBasis:
      "Unconscionability is the doctrine that lets a court refuse to enforce a contract or a single clause that is grossly unfair. It is codified for the sale of goods at UCC § 2-302, adopted in every state except Louisiana, and restated for contracts generally at Restatement (Second) of Contracts § 208. Courts almost always require both procedural unconscionability (something wrong with how the deal was made) and substantive unconscionability (terms that are one-sided in themselves) — most states apply a sliding scale, so a very large amount of one offsets a small amount of the other.",
    elements: [
      { label: "Procedural unconscionability", body: "Unequal bargaining power, a take-it-or-leave-it contract of adhesion, fine print, hidden terms, high-pressure sales, or a signer who could not read the language used." },
      { label: "Substantive unconscionability", body: "Terms so one-sided they shock the conscience: a price several times market, a remedy available to one side only, a waiver of all liability including intentional acts, or a fee-shifting term that makes any claim uneconomic." },
      { label: "Measured at signing", body: "Unconscionability is judged as of the moment the contract was made — not by how badly it turned out later." },
      { label: "Judge, not jury", body: "It is a question of law. The judge decides, and can void the whole contract, strike the offending clause, or rewrite the term to a lawful limit." },
    ],
    workedExample: {
      scenario:
        "A consumer buys a $1,200 laptop on a store-financed instalment plan. The pre-printed agreement, presented on a tablet with no chance to read it, sets an effective rate over 100% APR, waives the jury trial, requires arbitration 800 miles away at the buyer's cost, and lets the seller repossess without notice.",
      analysis:
        "Procedural: adhesion contract, no opportunity to read, no negotiation, sophisticated seller against a consumer. Substantive: the price-to-value ratio, the distant forum, one-sided remedies and the notice waiver each fail on their own. Courts routinely find the combination unconscionable.",
      outcome:
        "A court will typically sever the arbitration and repossession clauses and cap the finance charge, leaving the sale itself intact. Voiding the entire contract is available but rarer — courts prefer the narrowest cure that removes the unfairness.",
    },
    comparison: {
      title: "Unconscionable vs. neighbouring defences",
      columns: ["Doctrine", "What must be shown"],
      rows: [
        ["Unconscionability", "Unfair process plus unfair terms, judged when signed; decided by the judge"],
        ["Duress", "An improper threat that left no reasonable alternative"],
        ["Undue influence", "A relationship of trust that was exploited to overcome free will"],
        ["Fraud / misrepresentation", "A false statement of material fact that was relied on"],
        ["Illegality", "The contract's subject matter or purpose is itself unlawful"],
      ],
    },
    confusedWith: [
      { term: "Unfair", difference: "A hard bargain is not unconscionable. Courts enforce bad deals every day; the term has to be extreme and the process has to be defective." },
      { term: "Contract of adhesion", difference: "A standard-form take-it-or-leave-it contract. Very common and generally enforceable — it supplies the procedural half only." },
      { term: "Void contract", difference: "A void contract has no legal effect at all. An unconscionable term is usually severed while the rest survives." },
    ],
    relatedLinks: [
      { label: "Contract clause library", href: "/legal-clauses" },
      { label: "Contract types explained", href: "/contract-types" },
      { label: "Legal terms glossary", href: "/legal-terms" },
    ],
  },

  mediation: {
    legalBasis:
      "Mediation is a voluntary, confidential negotiation run by a neutral third party who has no power to impose an outcome. Its confidentiality is protected by statute — the Uniform Mediation Act in the states that adopted it, Federal Rule of Evidence 408 for settlement communications, and local court rules in every federal district. Many courts now order mediation before a case can be set for trial; parties must attend and negotiate in good faith, but no one can be ordered to settle.",
    elements: [
      { label: "The mediator has no authority", body: "Unlike an arbitrator or judge, a mediator cannot decide anything. Their job is to test each side's case, carry offers, and find the zone where both sides prefer a deal to a trial." },
      { label: "Joint session and caucus", body: "The day usually opens with everyone in one room, then splits: the mediator shuttles between separate rooms so each side can talk candidly about weaknesses." },
      { label: "Confidentiality", body: "Offers and admissions made in mediation are generally inadmissible if the case goes to trial. This is what allows realistic numbers to be discussed." },
      { label: "Binding only when written and signed", body: "A settlement reached in mediation becomes enforceable when it is reduced to a signed written agreement — usually a term sheet signed the same day." },
    ],
    workedExample: {
      scenario:
        "A rear-end injury claim with $18,000 in medical bills. The insurer's last pre-suit offer was $14,000; the claimant demanded $75,000. The court orders mediation before trial. The mediator's fee is $1,800, split between the parties.",
      analysis:
        "In caucus the mediator tests both sides: the claimant's three-week treatment gap weakens the causation argument, while the insurer's own adjuster log concedes clear liability. The mediator prices the risk of trial for each side rather than arguing who is right.",
      outcome:
        "The case resolves at $38,500 in one day. Trial would have cost roughly 12–18 months, an expert fee for the treating physician, and an uncertain jury — which is why roughly the great majority of civil cases that reach mediation settle there or shortly after.",
    },
    comparison: {
      title: "Mediation vs. arbitration vs. litigation",
      columns: ["Feature", "Mediation / Arbitration / Court"],
      rows: [
        ["Who decides the outcome", "The parties / The arbitrator / The judge or jury"],
        ["Binding", "Only if a written settlement is signed / Usually binding with narrow appeal rights / Binding, with a right of appeal"],
        ["Typical cost", "Mediator's day rate, split / Filing plus arbitrator fees, often thousands / Court fees plus full litigation costs"],
        ["Typical timescale", "A single day, often within weeks / Several months / One to three years"],
        ["Public record", "Confidential / Usually private / Public"],
        ["Discovery", "None required / Limited / Full"],
      ],
    },
    confusedWith: [
      { term: "Arbitration", slug: "arbitration", difference: "An arbitrator hears evidence and issues a binding decision. A mediator has no power to decide anything." },
      { term: "Negotiation", difference: "Direct talks between the parties with no neutral present. Mediation adds a neutral whose job is to break the deadlock." },
      { term: "Settlement conference", difference: "Substantively similar, but usually run by a judge or magistrate rather than a private neutral, and often less confidential in practice." },
      { term: "Conciliation", difference: "Used interchangeably in the US; in some countries the conciliator proposes the terms of settlement, which a US mediator typically avoids." },
    ],
    relatedLinks: [
      { label: "Settlement calculator", href: "/tools/settlement-calculator" },
      { label: "Demand letter builder", href: "/forms/demand-letter" },
      { label: "Arbitration explained", href: "/legal-terms/arbitration" },
    ],
  },

  notarization: {
    legalBasis:
      "Notarization is the act of a state-commissioned notary public verifying a signer's identity, confirming the signature was given willingly, and recording the act. It is governed state by state — most states follow the Revised Uniform Law on Notarial Acts (RULONA), and as of 2026 the large majority also authorise remote online notarization (RON) by live audio-video link. A notary certifies the signing; a notary does not verify that the document's contents are true, lawful or a good idea.",
    elements: [
      { label: "Personal appearance", body: "The signer must appear before the notary — in person, or by live two-way video in a state that permits remote online notarization." },
      { label: "Satisfactory identification", body: "Government-issued photo ID, personal knowledge of the signer, or a credible identifying witness. Expired ID is refused in most states." },
      { label: "Willingness and awareness", body: "The notary must be satisfied that the signer is acting freely and understands what is being signed. Visible coercion or confusion obliges the notary to decline." },
      { label: "The notarial certificate", body: "The wording, seal and journal entry. An acknowledgment confirms identity and willingness; a jurat additionally puts the signer under oath that the contents are true." },
    ],
    workedExample: {
      scenario:
        "A homeowner signs a financial power of attorney naming an adult child. The bank later refuses to accept it because the notary block was completed as an acknowledgment when state law required a jurat, and the notary's commission had expired eleven days earlier.",
      analysis:
        "Two independent defects. An expired commission means there was no valid notarial act at all. Using the wrong certificate form means the statutory wording for that document type is missing. Either alone is enough for a bank or recorder to reject the document.",
      outcome:
        "The document has to be re-executed and re-notarized. Where the signer's capacity has changed in the meantime, that is no longer possible — which is why powers of attorney, deeds and affidavits are worth checking against the state's exact certificate wording before the signing appointment ends.",
    },
    comparison: {
      title: "Which act does the document need?",
      columns: ["Notarial act", "When it is used"],
      rows: [
        ["Acknowledgment", "Deeds, mortgages, powers of attorney — signer confirms the signature is theirs and voluntary"],
        ["Jurat (sworn statement)", "Affidavits and sworn declarations — signer swears the contents are true, signs in front of the notary"],
        ["Signature witnessing", "Some state forms and applications — the notary watches the signature happen"],
        ["Copy certification", "A notary-certified true copy; not permitted for vital records in most states"],
        ["Apostille (not a notarial act)", "Notarized documents used abroad — issued afterwards by the Secretary of State"],
      ],
    },
    confusedWith: [
      { term: "Witnessing", difference: "A witness only observes the signing. A notary verifies identity under state law, keeps a journal and applies an official seal." },
      { term: "Legal advice", difference: "A notary who is not a lawyer cannot choose the document, draft it, or explain its effect — doing so is the unauthorised practice of law in every state." },
      { term: "Apostille", difference: "A separate state-level certification that makes a notarized document usable in another Hague Convention country." },
      { term: "Electronic signature", difference: "An e-signature under the ESIGN Act proves who signed. Notarization adds identity verification by a commissioned official — a document can need both." },
    ],
    relatedLinks: [
      { label: "Financial power of attorney form", href: "/forms/power-of-attorney-financial" },
      { label: "Bill of sale form", href: "/forms/bill-of-sale" },
      { label: "Online fillable legal forms", href: "/forms" },
    ],
  },
};

export function getTermDepth(slug: string): TermDepth | undefined {
  return termDepth[slug];
}
