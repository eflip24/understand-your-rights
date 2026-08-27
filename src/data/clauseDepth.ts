/**
 * Depth layer for /legal-clauses/:slug pages.
 *
 * The base `legalClauses.ts` entries carry explanation, sample language, red
 * flags and FAQs. This module adds the material that makes a clause page
 * actually useful at the negotiating table: what to ask for, three drafted
 * variants of the same clause, how enforceability shifts by state, and which
 * contract types the clause belongs in.
 *
 * Every clause gets a negotiation playbook and alternative wording (specific
 * where written, category-derived otherwise). Only the clauses whose
 * enforceability genuinely varies get a state table.
 */

export interface NegotiationPlay {
  /** What the party with less leverage should ask for. */
  ask: string;
  /** The realistic landing spot when the other side pushes back. */
  fallback?: string;

  /** What counterparties almost never agree to. */
  rarelyAccepted?: string;
}

export interface ClauseVariant {
  stance: "One-sided" | "Balanced" | "Protective";
  /** Whose interest the wording serves, in plain English. */
  favors: string;
  text: string;
}

export interface ClauseStateRow {
  state: string;
  status: string;
  detail: string;
}

export interface ClauseDepth {
  /** 3–5 concrete negotiation moves. */
  negotiation: NegotiationPlay[];
  /** Three drafted versions of the same clause. */
  alternatives: ClauseVariant[];
  /** Present only where the law varies materially between states. */
  stateVariation?: {
    heading: string;
    note: string;
    rows: ClauseStateRow[];
  };
  /** Slugs from contractTypes.ts where this clause routinely appears. */
  contractTypeSlugs?: string[];
}

/* ------------------------------------------------------------------ */
/* Priority clauses — hand-written depth                               */
/* ------------------------------------------------------------------ */

export const clauseDepth: Record<string, ClauseDepth> = {
  "non-compete-clause": {
    negotiation: [
      {
        ask: "Cut the restricted period to 6–12 months and tie the geography to the offices or accounts you actually worked on.",
        fallback: "12 months, limited to named competitors rather than an entire industry.",
        rarelyAccepted: "Removing the clause outright when you are being hired into a client-facing or R&D role.",
      },
      {
        ask: "Garden leave: the restriction only applies if the employer keeps paying base salary for the restricted period.",
        fallback: "Payment at 50% of base, or the restriction lapses if severance is not paid.",
      },
      {
        ask: "A carve-out so the clause does not apply if you are laid off, terminated without cause, or the role is eliminated.",
        fallback: "Carve-out for reductions in force only.",
      },
      {
        ask: "Narrow 'Competing Business' to the specific product line or service you worked on, defined by name.",
        fallback: "Definition limited to the employer's revenue-generating lines as of your last day.",
      },
    ],
    alternatives: [
      {
        stance: "One-sided",
        favors: "Employer",
        text: "For twenty-four (24) months following termination for any reason, Employee shall not, anywhere in the United States, directly or indirectly own, manage, be employed by, consult for, or otherwise participate in any business that competes with any business conducted by the Company or any affiliate.",
      },
      {
        stance: "Balanced",
        favors: "Both parties",
        text: "For twelve (12) months following termination, Employee shall not provide services substantially similar to those Employee provided to the Company, to any Competing Business, within fifty (50) miles of a Company office at which Employee regularly worked during the final twelve (12) months of employment. 'Competing Business' means a business offering [named products/services].",
      },
      {
        stance: "Protective",
        favors: "Employee",
        text: "For six (6) months following termination by the Company for Cause or resignation without Good Reason, and only for so long as the Company continues to pay Employee's base salary at the rate in effect on the termination date, Employee shall not provide services to a Competing Business identified on Schedule A. This restriction shall not apply following any termination without Cause, layoff, or non-renewal.",
      },
    ],
    stateVariation: {
      heading: "Non-compete enforceability by state",
      note: "State law, not the contract, controls whether a non-compete binds you. Several states ban them for most workers; others void them below a wage threshold. Check current statute before relying on any of this.",
      rows: [
        { state: "California", status: "Void", detail: "Bus. & Prof. Code §16600 voids employee non-competes; §16600.5 makes it unlawful to even attempt to enforce one, with employee attorney fees." },
        { state: "Minnesota", status: "Void", detail: "Agreements entered on or after July 1, 2023 are void; non-solicits and NDAs remain available." },
        { state: "North Dakota", status: "Void", detail: "N.D.C.C. §9-08-06 voids employee non-competes outside sale-of-business contexts." },
        { state: "Oklahoma", status: "Void", detail: "Non-competes void; narrow customer non-solicits allowed by statute." },
        { state: "Colorado", status: "Wage threshold", detail: "Enforceable only against highly compensated workers, with statutory notice; criminal and civil penalties for overreach." },
        { state: "Washington", status: "Wage threshold", detail: "Void below an inflation-adjusted earnings threshold; duration presumed unreasonable beyond 18 months." },
        { state: "Illinois", status: "Wage threshold", detail: "Freedom to Work Act voids non-competes below a set annual earnings floor; requires 14 days to review and advice to consult counsel." },
        { state: "Oregon", status: "Restricted", detail: "Maximum 12 months, written notice before hire, and a compensation floor; otherwise voidable." },
        { state: "Texas", status: "Enforceable if reasonable", detail: "Must be ancillary to an otherwise enforceable agreement; courts reform overbroad terms rather than void them." },
        { state: "Florida", status: "Enforceable", detail: "§542.335 presumes up to 2 years reasonable for former employees and requires a legitimate business interest." },
        { state: "New York", status: "Enforceable if reasonable", detail: "Common-law reasonableness test; courts scrutinise scope and often blue-pencil." },
        { state: "Massachusetts", status: "Restricted", detail: "Maximum 12 months, garden-leave or other mutually agreed consideration, and notice requirements." },
      ],
    },
    contractTypeSlugs: ["employment-contract", "non-solicitation-agreement", "consulting-agreement", "shareholder-agreement"],
  },

  "arbitration-clause": {
    negotiation: [
      {
        ask: "Make arbitration optional for claims under a threshold (e.g. small claims limit) so you keep a cheap forum for small disputes.",
        fallback: "A small-claims carve-out only.",
      },
      {
        ask: "The drafting party pays the arbitrator's fees and administrative costs.",
        fallback: "Fees split, capped at what a court filing fee would cost you.",
      },
      {
        ask: "Arbitration seated where you live or work, not the counterparty's headquarters.",
        fallback: "Remote or documents-only arbitration for claims under a set value.",
      },
      {
        ask: "Strike the class-action waiver, or add a mass-arbitration batching protocol so identical claims are heard together.",
        rarelyAccepted: "Consumer-facing companies rarely give up class waivers entirely.",
      },
    ],
    alternatives: [
      {
        stance: "One-sided",
        favors: "Drafting party",
        text: "Any dispute arising out of or relating to this Agreement shall be resolved exclusively by binding arbitration administered in [Company's home city], on an individual basis only. The parties waive any right to a jury trial and to participate in any class, collective, or representative proceeding.",
      },
      {
        stance: "Balanced",
        favors: "Both parties",
        text: "Any dispute shall be resolved by binding arbitration under the [AAA/JAMS] rules before a single arbitrator, seated in the county where the responding party resides or maintains its principal place of business. Either party may bring an individual claim in small claims court. The party initiating arbitration pays the filing fee; all other arbitration costs are borne by [Company].",
      },
      {
        stance: "Protective",
        favors: "Non-drafting party",
        text: "Arbitration is available at the election of either party but is not mandatory. If elected, the arbitration shall be seated in [Consumer/Employee]'s home county, administered under the applicable consumer or employment rules, with all arbitrator and administrative fees paid by [Company]. Nothing in this Agreement waives any statutory right, including the right to file a charge with a government agency.",
      },
    ],
    stateVariation: {
      heading: "How states treat arbitration clauses",
      note: "The Federal Arbitration Act preempts most state attempts to block arbitration, but states still police unconscionability, and federal law now carves out sexual harassment and assault claims (Ending Forced Arbitration Act, 2022).",
      rows: [
        { state: "California", status: "Scrutinised", detail: "Armendariz factors require a neutral arbitrator, adequate discovery, a written award, all types of relief, and no employee cost beyond court fees." },
        { state: "New Jersey", status: "Strict waiver language", detail: "A jury-trial waiver must be clear and explicit; vague arbitration clauses are struck down." },
        { state: "New York", status: "Mostly enforceable", detail: "FAA preemption limits state carve-outs, but harassment claims are covered by federal EFAA." },
        { state: "Missouri", status: "Consideration issues", detail: "Courts have voided at-will employment arbitration clauses lacking independent consideration." },
        { state: "Montana", status: "Notice rule", detail: "Reasonable-expectations doctrine requires conspicuous notice of arbitration terms." },
        { state: "Texas", status: "Enforceable", detail: "Broad enforcement; unilateral modification rights can still void a clause." },
      ],
    },
    contractTypeSlugs: ["terms-of-service", "employment-contract", "service-agreement", "website-terms"],
  },

  "indemnification-clause": {
    negotiation: [
      { ask: "Make indemnity mutual — each party covers claims arising from its own acts.", fallback: "Mutual for third-party IP and confidentiality claims only." },
      { ask: "Cap indemnity at the liability cap, or at fees paid in the prior 12 months.", fallback: "Uncapped only for IP infringement, gross negligence, and wilful misconduct." },
      { ask: "Limit to third-party claims; strike indemnity for direct claims between the parties (that is what breach damages are for).", fallback: "Direct claims limited to confirmed data-breach costs." },
      { ask: "Give the indemnifying party control of the defence, with consent required before any settlement that admits fault.", fallback: "Joint control with reasonable cooperation duties." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Recipient of indemnity", text: "Vendor shall defend, indemnify, and hold harmless Customer and its affiliates, officers, and agents from and against any and all claims, losses, liabilities, damages, costs, and expenses (including attorneys' fees) arising from or relating in any way to the Services, without limitation." },
      { stance: "Balanced", favors: "Both parties", text: "Each party shall defend the other against third-party claims to the extent arising from the indemnifying party's negligence, wilful misconduct, or breach of this Agreement, and shall pay damages finally awarded or agreed in settlement. The indemnified party shall give prompt notice, tender control of the defence, and cooperate at the indemnifying party's expense." },
      { stance: "Protective", favors: "Indemnifying party", text: "Vendor's indemnity obligation applies solely to third-party claims alleging that the Services as delivered infringe a U.S. patent or copyright, is subject to the limitation of liability in Section [X], and does not apply to claims arising from Customer data, Customer modifications, or use in combination with third-party products." },
    ],
    contractTypeSlugs: ["saas-agreement", "service-agreement", "consulting-agreement", "purchase-agreement"],
  },

  "limitation-of-liability": {
    negotiation: [
      { ask: "Set the cap at 12 months of fees rather than the fees actually paid to date.", fallback: "Greater of fees paid or a fixed floor amount." },
      { ask: "Carve out data breach, confidentiality breach, IP infringement, and indemnity obligations from the cap.", fallback: "A super-cap (2–3x) for those categories instead of uncapped." },
      { ask: "Make the cap mutual so it is not only the vendor that is protected.", fallback: "Mutual except for the customer's payment obligations." },
      { ask: "Strike the exclusion of 'loss of data' where the vendor is hosting your data.", rarelyAccepted: "Uncapped consequential damages of any kind." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Vendor", text: "In no event shall Vendor's aggregate liability exceed one hundred dollars ($100). Vendor shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, or for lost profits, revenue, or data, under any theory of liability." },
      { stance: "Balanced", favors: "Both parties", text: "Except for the Excluded Claims, each party's aggregate liability arising out of this Agreement shall not exceed the total fees paid or payable in the twelve (12) months preceding the event giving rise to the claim. 'Excluded Claims' means breaches of confidentiality, indemnity obligations, and either party's gross negligence or wilful misconduct." },
      { stance: "Protective", favors: "Customer", text: "Vendor's liability for claims arising from a Security Incident affecting Customer Data shall not exceed three (3) times the fees paid in the preceding twelve (12) months. Nothing in this section limits liability for death or personal injury, fraud, or any liability that cannot lawfully be limited." },
    ],
    contractTypeSlugs: ["saas-agreement", "service-agreement", "licensing-agreement", "terms-of-service"],
  },

  "termination-clause": {
    negotiation: [
      { ask: "Mutual termination for convenience on equal notice — if they can walk in 30 days, so can you.", fallback: "Convenience termination after an initial committed term." },
      { ask: "A cure period of at least 30 days for any breach that can be fixed.", fallback: "15 days for payment breaches, 30 for everything else." },
      { ask: "A transition/wind-down period with continued service at the same rates.", fallback: "60 days of transition assistance at time-and-materials rates." },
      { ask: "Pro-rated refund of prepaid fees on termination for the other party's breach.", rarelyAccepted: "Refunds when you terminate for convenience." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Drafting party", text: "Company may terminate this Agreement at any time, for any reason or no reason, effective immediately upon notice. Customer may terminate only at the end of the then-current term upon ninety (90) days' prior written notice. No fees are refundable under any circumstance." },
      { stance: "Balanced", favors: "Both parties", text: "Either party may terminate this Agreement for convenience upon thirty (30) days' written notice, or immediately upon the other party's material breach that remains uncured thirty (30) days after written notice describing the breach. Upon termination, Customer shall pay for Services performed through the termination date and Company shall refund any prepaid, unused fees." },
      { stance: "Protective", favors: "Receiving party", text: "In addition to the rights above, Customer may terminate immediately upon (a) Company's failure to meet the Service Levels in two consecutive months, (b) a Security Incident affecting Customer Data, or (c) Company's insolvency. Company shall provide up to ninety (90) days of transition assistance and return all Customer Data in a machine-readable format within thirty (30) days." },
    ],
    contractTypeSlugs: ["saas-agreement", "employment-contract", "service-agreement", "commercial-lease"],
  },

  "confidentiality-clause": {
    negotiation: [
      { ask: "Standard four exclusions: publicly available, previously known, independently developed, lawfully received from a third party.", fallback: "At minimum the public-domain and independent-development carve-outs." },
      { ask: "A defined term — 3 to 5 years — with indefinite protection reserved for trade secrets.", fallback: "5 years plus perpetual trade-secret protection." },
      { ask: "Make it mutual whenever information flows both ways.", fallback: "Mutual for anything exchanged during diligence." },
      { ask: "A compelled-disclosure carve-out and an express whistleblower/DTSA immunity notice.", rarelyAccepted: "Nothing — this one is standard and should always be included." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Disclosing party", text: "Recipient shall hold in strict confidence all information disclosed by Discloser, in perpetuity, and shall not disclose it to any person for any purpose. All information exchanged is deemed Confidential Information whether or not marked." },
      { stance: "Balanced", favors: "Both parties", text: "Each party shall protect the other's Confidential Information using at least the degree of care it uses for its own, and shall use it solely to perform this Agreement. Obligations survive for five (5) years after disclosure, except for trade secrets, which remain protected for as long as they qualify as such under applicable law. Confidential Information excludes information that is public, previously known, independently developed, or lawfully received from a third party." },
      { stance: "Protective", favors: "Receiving party", text: "Confidential Information must be marked confidential at disclosure or confirmed in writing within thirty (30) days. Recipient may disclose as required by law or court order after giving Discloser reasonable prior notice. Nothing herein restricts Recipient's right to report a suspected violation of law to a government agency or limits the immunity provided by 18 U.S.C. §1833(b)." },
    ],
    contractTypeSlugs: ["nda", "employment-contract", "consulting-agreement", "joint-venture-agreement"],
  },

  "intellectual-property-clause": {
    negotiation: [
      { ask: "Carve out your pre-existing IP, tools, and generic know-how from any assignment.", fallback: "A licence back to your own background IP." },
      { ask: "Assignment triggered on payment in full, not on creation.", fallback: "Assignment on final payment for each deliverable." },
      { ask: "Portfolio rights: the right to display the work as a sample.", fallback: "Portfolio rights after public launch." },
      { ask: "For employees: the statutory invention carve-out for work done on your own time with your own equipment.", rarelyAccepted: "Retaining ownership of work-for-hire deliverables." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Client / employer", text: "All work product, inventions, discoveries, and materials conceived or created by Contractor, whether or not during working hours and whether or not related to the Services, shall be the sole and exclusive property of Company, and Contractor hereby irrevocably assigns all right, title, and interest therein." },
      { stance: "Balanced", favors: "Both parties", text: "Deliverables created specifically for Company under this Agreement shall, upon payment in full, be assigned to Company. Contractor retains ownership of Background IP and grants Company a perpetual, non-exclusive, royalty-free licence to use Background IP as embedded in the Deliverables." },
      { stance: "Protective", favors: "Creator", text: "Contractor grants Company an exclusive licence to use the Deliverables in its field of business; ownership transfers only upon receipt of all amounts due. Contractor retains the right to reuse generic components, libraries, and know-how, and to display the Deliverables in a portfolio after public release." },
    ],
    stateVariation: {
      heading: "State invention-assignment limits",
      note: "Several states void assignment of inventions an employee developed entirely on their own time, without employer resources, and outside the employer's business.",
      rows: [
        { state: "California", status: "Statutory limit", detail: "Labor Code §2870 voids over-broad assignments; §2872 requires written notice of the limit." },
        { state: "Washington", status: "Statutory limit", detail: "RCW 49.44.140 mirrors the California carve-out." },
        { state: "Illinois", status: "Statutory limit", detail: "765 ILCS 1060 Employee Patent Act limits assignment to work related to the employer's business." },
        { state: "Delaware", status: "Statutory limit", detail: "19 Del. C. §805 voids assignment of purely personal-time inventions." },
        { state: "Minnesota", status: "Statutory limit", detail: "Minn. Stat. §181.78 voids over-broad invention assignment provisions." },
        { state: "Kansas / North Carolina / Utah", status: "Statutory limit", detail: "Comparable statutes preserve employee ownership of unrelated personal-time inventions." },
      ],
    },
    contractTypeSlugs: ["freelance-agreement", "employment-contract", "consulting-agreement", "licensing-agreement"],
  },

  "payment-terms-clause": {
    negotiation: [
      { ask: "Net 15 or Net 30 from invoice date, not from acceptance or month-end.", fallback: "Net 30 with a defined acceptance window of 5 business days." },
      { ask: "Late interest at 1.5% per month plus recovery of collection costs.", fallback: "1% per month, statutory maximum where lower." },
      { ask: "The right to suspend work after 15 days of non-payment following notice.", fallback: "Suspension after 30 days with notice." },
      { ask: "Deposit or milestone billing on anything over a set project value.", rarelyAccepted: "100% upfront on large engagements." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Payer", text: "Company shall pay undisputed invoices within ninety (90) days following Company's acceptance of the Deliverables. Company may withhold payment in whole or in part pending resolution of any dispute, and no interest shall accrue on withheld amounts." },
      { stance: "Balanced", favors: "Both parties", text: "Invoices are due Net thirty (30) days from the invoice date. Disputed amounts must be identified in writing within ten (10) days of the invoice, and undisputed amounts remain payable. Overdue amounts accrue interest at 1.5% per month or the maximum permitted by law, whichever is lower." },
      { stance: "Protective", favors: "Supplier", text: "A deposit of [X]% is due before work commences; the balance is due Net fifteen (15) days from invoice. Supplier may suspend performance upon fifteen (15) days' written notice of non-payment and may recover reasonable collection costs and attorneys' fees. Time for performance extends day-for-day during any suspension." },
    ],
    contractTypeSlugs: ["freelance-agreement", "service-agreement", "consulting-agreement", "purchase-agreement"],
  },

  "non-solicitation-clause": {
    negotiation: [
      { ask: "Limit customer non-solicits to accounts you personally serviced in the last 12 months.", fallback: "Accounts you serviced or had confidential information about." },
      { ask: "Limit employee non-solicits to active solicitation — general job adverts and LinkedIn posts excluded.", fallback: "Carve-out for responses to general advertisements." },
      { ask: "12 months maximum duration.", fallback: "18 months for senior sales roles." },
      { ask: "No 'no-hire' clause that blocks hiring anyone who applies on their own initiative.", rarelyAccepted: "Removing customer non-solicits from a commission-based sales role." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Employer", text: "For twenty-four (24) months after termination, Employee shall not solicit, hire, or engage any person who was employed by the Company at any time during Employee's employment, nor contact any customer or prospective customer of the Company for any purpose." },
      { stance: "Balanced", favors: "Both parties", text: "For twelve (12) months after termination, Employee shall not directly solicit business competitive with the Company from any customer Employee serviced or about whom Employee received Confidential Information during the final twelve (12) months of employment, nor actively recruit any Company employee with whom Employee worked." },
      { stance: "Protective", favors: "Employee", text: "The restrictions apply only to Employee's direct, targeted solicitation. They do not restrict (a) responses to unsolicited enquiries, (b) general advertising not targeted at Company personnel, (c) service to customers who independently approach Employee, or (d) any activity following termination without Cause." },
    ],
    stateVariation: {
      heading: "Non-solicit enforceability by state",
      note: "Even states that void non-competes usually still permit narrow customer non-solicits protecting trade secrets — but the scope tolerated varies.",
      rows: [
        { state: "California", status: "Largely void", detail: "Edwards v. Arthur Andersen voids customer non-solicits; only trade-secret misappropriation claims survive." },
        { state: "Oklahoma", status: "Narrow only", detail: "Statute permits a bar on soliciting established customers, nothing broader." },
        { state: "Minnesota", status: "Permitted", detail: "The 2023 non-compete ban expressly preserves non-solicitation and confidentiality agreements." },
        { state: "Louisiana", status: "Parish list required", detail: "La. R.S. 23:921 requires named parishes/municipalities and a 2-year maximum." },
        { state: "Georgia", status: "Permitted", detail: "Restrictive Covenants Act allows customer non-solicits without an explicit geographic limit if scope is otherwise reasonable." },
        { state: "New York", status: "Permitted", detail: "Enforceable where limited to customers the employee actually served; BDO Seidman standard." },
      ],
    },
    contractTypeSlugs: ["non-solicitation-agreement", "employment-contract", "partnership-agreement", "shareholder-agreement"],
  },

  "penalty-clause": {
    negotiation: [
      { ask: "Reframe any penalty as liquidated damages tied to a genuine pre-estimate of loss.", fallback: "A stated formula with a written rationale in the recitals." },
      { ask: "Cap total liquidated damages at a percentage of contract value.", fallback: "Cap at the fees payable for the affected milestone." },
      { ask: "Make the remedy mutual — bonuses for early delivery, deductions for late.", rarelyAccepted: "Removing delay damages from a construction or SLA contract entirely." },
      { ask: "An express statement that liquidated damages are the sole and exclusive remedy for that breach.", fallback: "Exclusive remedy except for wilful misconduct." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Non-breaching party", text: "If Contractor fails to complete the Work by the Completion Date, Contractor shall pay a penalty of $5,000 per day of delay, in addition to any other remedies available at law or in equity." },
      { stance: "Balanced", favors: "Both parties", text: "The parties acknowledge that actual damages from delay would be difficult to determine and agree that $[X] per day represents a reasonable pre-estimate of loss and not a penalty. Aggregate liquidated damages shall not exceed ten percent (10%) of the Contract Price and are the sole remedy for delay." },
      { stance: "Protective", favors: "Performing party", text: "Liquidated damages accrue only after a ten (10) day grace period, do not accrue for delays caused by the other party, change orders, or Force Majeure, are capped at five percent (5%) of the Contract Price, and are offset by any early-completion bonus earned." },
    ],
    stateVariation: {
      heading: "Liquidated damages vs unenforceable penalties",
      note: "Courts everywhere void true penalties. The dividing line is whether the sum was a reasonable forecast of loss at the time of contracting (and, in some states, whether it is also reasonable in hindsight).",
      rows: [
        { state: "California", status: "Presumed valid, rebuttable", detail: "Civ. Code §1671(b): valid unless the challenging party shows it was unreasonable under the circumstances at contracting." },
        { state: "New York", status: "Strict", detail: "Void if 'plainly disproportionate' to probable loss; courts examine both estimate and actual harm." },
        { state: "Texas", status: "Two-part test", detail: "Harm must have been difficult to estimate and the amount a reasonable forecast; unconscionable disparity voids the clause." },
        { state: "Florida", status: "Two-part test", detail: "Void if damages were readily ascertainable at contracting or the sum shocks the conscience." },
        { state: "Illinois", status: "Prospective view", detail: "Reasonableness judged at the time of contracting; blanket 'any breach' clauses are frequently struck." },
      ],
    },
    contractTypeSlugs: ["service-agreement", "purchase-agreement", "commercial-lease", "loan-agreement"],
  },

  "governing-law-clause": {
    negotiation: [
      { ask: "Governing law of your home state, or a neutral third state if neither will yield.", fallback: "Their law, your venue (or vice versa) as a trade." },
      { ask: "Exclude the conflict-of-laws rules so the chosen law actually applies.", fallback: "Standard 'without regard to conflict of law principles' wording." },
      { ask: "Preserve mandatory consumer or employment protections of your home state.", rarelyAccepted: "Two different governing laws depending on who sues." },
      { ask: "For cross-border deals, exclude the UN Convention on Contracts for the International Sale of Goods (CISG) deliberately, not by accident.", fallback: "Express CISG exclusion." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Drafting party", text: "This Agreement shall be governed by the laws of the State of [Company's state], and the parties irrevocably submit to the exclusive jurisdiction of the state and federal courts located in [Company's county], waiving any objection based on inconvenient forum." },
      { stance: "Balanced", favors: "Both parties", text: "This Agreement is governed by the laws of the State of [neutral state], without regard to its conflict of law principles. Any action must be brought in the state or federal courts located in the defendant's principal place of business." },
      { stance: "Protective", favors: "Non-drafting party", text: "This Agreement is governed by the laws of the State of [your state]. Nothing in this section waives any non-waivable right or protection afforded to [Consumer/Employee] under the laws of the jurisdiction in which they reside or work." },
    ],
    contractTypeSlugs: ["saas-agreement", "service-agreement", "terms-of-service", "purchase-agreement"],
  },

  "waiver-of-jury-trial": {
    negotiation: [
      { ask: "Strike it — a bench trial is not automatically faster and you lose a real strategic lever.", fallback: "Waiver limited to commercial disputes over a stated value." },
      { ask: "Make it mutual and conspicuous (bold, capitals, separately initialled).", fallback: "Mutual waiver in the signature block." },
      { ask: "Carve out tort claims, fraud, and statutory claims.", rarelyAccepted: "Lenders and landlords rarely drop jury waivers." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Drafting party", text: "BORROWER IRREVOCABLY WAIVES ANY RIGHT TO TRIAL BY JURY IN ANY ACTION ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE TRANSACTIONS CONTEMPLATED HEREBY." },
      { stance: "Balanced", favors: "Both parties", text: "EACH PARTY KNOWINGLY, VOLUNTARILY, AND INTENTIONALLY WAIVES ANY RIGHT TO A TRIAL BY JURY IN RESPECT OF ANY LITIGATION ARISING OUT OF THIS AGREEMENT. Each party acknowledges it has had the opportunity to consult counsel regarding this waiver." },
      { stance: "Protective", favors: "Non-drafting party", text: "The jury-trial waiver in this section applies only to contract claims between the parties valued above $[X], is mutual, and does not apply to claims of fraud, personal injury, or claims arising under statute where waiver is prohibited." },
    ],
    stateVariation: {
      heading: "Pre-dispute jury waivers by state",
      note: "A few states refuse to enforce contractual jury waivers agreed before a dispute exists — arbitration is the usual workaround there.",
      rows: [
        { state: "California", status: "Unenforceable", detail: "Grafton Partners v. Superior Court: pre-dispute jury waivers are void; arbitration remains available." },
        { state: "Georgia", status: "Unenforceable", detail: "Constitutional right; pre-dispute contractual waivers are not enforced." },
        { state: "Washington", status: "Narrow", detail: "Enforced only where knowing, voluntary, and conspicuous — heavy scrutiny of adhesion contracts." },
        { state: "New York", status: "Enforceable", detail: "Enforced if clear and unambiguous; void in residential leases by statute (RPL §259-c)." },
        { state: "Texas", status: "Enforceable", detail: "Enforceable if knowing and voluntary; conspicuousness carries a presumption." },
        { state: "Florida", status: "Enforceable", detail: "Enforced where the waiver is clear; courts examine bargaining power in consumer contracts." },
      ],
    },
    contractTypeSlugs: ["loan-agreement", "commercial-lease", "purchase-agreement", "service-agreement"],
  },

  "non-disparagement-clause": {
    negotiation: [
      { ask: "Make it mutual and bind named executives, not just 'the Company' as an abstraction.", fallback: "Mutual as to HR and your direct management chain." },
      { ask: "Carve out truthful statements to government agencies, in legal proceedings, and to counsel.", fallback: "Standard legal-process and agency carve-out." },
      { ask: "Limit it to public statements — private candid feedback to a future employer should not breach it.", rarelyAccepted: "Wholesale removal in a settlement agreement." },
      { ask: "No liquidated damages or clawback of severance for an alleged breach without a court finding.", fallback: "Clawback capped at a portion of severance." },
    ],
    alternatives: [
      { stance: "One-sided", favors: "Employer", text: "Employee shall not make any statement, written or oral, that disparages or reflects negatively upon the Company, its products, officers, directors, or employees. Any breach entitles the Company to immediate repayment of all severance paid." },
      { stance: "Balanced", favors: "Both parties", text: "Neither party shall make public statements disparaging the other. The Company's obligation extends to its officers and to Employee's direct management chain. Nothing in this section prohibits truthful statements required by law, made in a legal proceeding, or made to a government agency." },
      { stance: "Protective", favors: "Employee", text: "This section applies to public statements only and does not restrict (a) truthful statements about unlawful conduct or working conditions, (b) any disclosure protected by the Speak Out Act, the NLRA, or state law, or (c) responses to a reference request. Any alleged breach must be established by a court before any remedy is sought." },
    ],
    stateVariation: {
      heading: "Limits on silencing clauses",
      note: "Recent federal and state law restricts non-disparagement and NDA terms covering harassment, discrimination, and unlawful conduct.",
      rows: [
        { state: "Federal", status: "Restricted", detail: "Speak Out Act (2022) voids pre-dispute NDA and non-disparagement clauses covering sexual assault or harassment disputes." },
        { state: "California", status: "Restricted", detail: "Silenced No More Act: settlement and separation agreements cannot bar disclosure of unlawful acts in the workplace." },
        { state: "Washington", status: "Restricted", detail: "Silenced No More Act applies to employees and contractors, retroactively in part." },
        { state: "New York", status: "Restricted", detail: "GOL §5-336 limits discrimination-claim NDAs and requires the complainant's preference to control." },
        { state: "Illinois", status: "Restricted", detail: "Workplace Transparency Act requires mutuality and consideration for unilateral confidentiality terms." },
        { state: "NLRB", status: "Restricted", detail: "McLaren Macomb: broad confidentiality and non-disparagement terms in severance can violate Section 7 rights." },
      ],
    },
    contractTypeSlugs: ["employment-contract", "nda", "partnership-agreement"],
  },
};

/* ------------------------------------------------------------------ */
/* Generic depth by category — used when a clause has no bespoke entry  */
/* ------------------------------------------------------------------ */

const GENERIC_NEGOTIATION: NegotiationPlay[] = [
  {
    ask: "Make the obligation mutual wherever both sides can realistically be on the hook.",
    fallback: "Mutual for the categories that actually apply to both parties.",
  },
  {
    ask: "Replace open-ended language ('any', 'all', 'in perpetuity') with a defined scope and a defined end date.",
    fallback: "A stated term with renewal by written agreement.",
  },
  {
    ask: "Add a notice-and-cure step before any right to terminate or claim damages is triggered.",
    fallback: "A 30-day cure period for anything curable.",
  },
  {
    ask: "Tie the clause to the liability cap so it cannot be used to route around the negotiated risk allocation.",
    fallback: "An express cross-reference to the limitation of liability section.",
  },
];

function genericAlternatives(title: string): ClauseVariant[] {
  return [
    {
      stance: "One-sided",
      favors: "Drafting party",
      text: `The ${title.toLowerCase()} as drafted by the party proposing the contract typically applies to one party only, uses undefined terms such as "any and all", carries no time limit, and provides no cure period. Treat unlimited scope plus unlimited duration as the marker of a one-sided version.`,
    },
    {
      stance: "Balanced",
      favors: "Both parties",
      text: `A balanced ${title.toLowerCase()} states exactly what is covered, applies the same standard to both parties, runs for a defined period, and requires written notice plus a reasonable opportunity to cure before any remedy is available.`,
    },
    {
      stance: "Protective",
      favors: "The party bearing the obligation",
      text: `A protective version adds express carve-outs (acts of the other party, legally compelled conduct, matters outside your reasonable control), caps exposure by reference to the limitation of liability, and makes the stated remedy the sole and exclusive remedy for that breach.`,
    },
  ];
}

/** Depth for a clause — bespoke when written, otherwise a category-derived set. */
export function getClauseDepth(slug: string, title: string): ClauseDepth {
  const bespoke = clauseDepth[slug];
  if (bespoke) return bespoke;
  return {
    negotiation: GENERIC_NEGOTIATION,
    alternatives: genericAlternatives(title),
  };
}

export function hasBespokeClauseDepth(slug: string): boolean {
  return Boolean(clauseDepth[slug]);
}
