export interface LegalClause {
  slug: string;
  title: string;
  category: string;
  explanation: string;
  exampleClauses: string[];
  enforceabilityNotes: string;
  redFlags: string[];
  relatedTermSlugs: string[];
  relatedToolIds: string[];
  faqs: { question: string; answer: string }[];
}

export const legalClauses: LegalClause[] = [
  {
    slug: "non-compete-clause",
    title: "Non-Compete Clause",
    category: "Employment",
    explanation: "A non-compete clause restricts an employee or contractor from working for competitors or starting a competing business after leaving a company. These clauses are designed to protect trade secrets, client relationships, and competitive advantages. However, they're increasingly scrutinized by courts and legislators who view overly broad non-competes as unfair restraints on workers' ability to earn a living.",
    exampleClauses: [
      "Employee agrees that for a period of twelve (12) months following the termination of employment, Employee shall not directly or indirectly engage in, be employed by, or provide services to any Competing Business within a fifty (50) mile radius of any Company office location.",
      "For twenty-four (24) months after the end of this Agreement, Contractor shall not solicit, contact, or provide services to any client of the Company with whom Contractor had contact during the term of this Agreement.",
      "During the Restricted Period, Employee shall not, anywhere in the United States, engage in any business activity that is competitive with the Company's business as conducted at the time of termination."
    ],
    enforceabilityNotes: "Enforceability varies dramatically by state. California, North Dakota, Oklahoma, and Minnesota generally ban non-competes. Other states require reasonableness in scope, duration, and geography. Courts typically consider: the duration (1-2 years is generally reasonable), geographic scope (must be tied to actual business operations), the scope of restricted activities (must be narrowly defined), and whether the employee received adequate consideration. The FTC has proposed federal rules that could significantly restrict non-competes nationwide.",
    redFlags: [
      "Duration exceeding 2 years",
      "Nationwide or global geographic scope without justification",
      "Broad definition of 'competing business' that covers unrelated industries",
      "No compensation during the restricted period",
      "No carve-out for involuntary termination",
      "Applies to low-wage or non-executive employees"
    ],
    relatedTermSlugs: ["non-compete", "non-disclosure", "covenant", "severability"],
    relatedToolIds: ["non-compete", "clause-finder"],
    faqs: [
      { question: "Can I be forced to sign a non-compete?", answer: "You can't be physically forced, but an employer can make signing a condition of employment. In some states, existing employees must receive additional consideration (like a raise or bonus) for a non-compete to be enforceable." },
      { question: "What if my non-compete is unreasonable?", answer: "Courts may refuse to enforce it, modify it to make it reasonable (blue penciling), or strike it entirely. Consult an employment attorney in your state." },
      { question: "Does a non-compete survive if I'm laid off?", answer: "In many states, yes, unless the clause specifically excludes involuntary termination. However, courts may be less likely to enforce a non-compete against a laid-off employee." },
    ],
  },
  {
    slug: "confidentiality-clause",
    title: "Confidentiality Clause",
    category: "Contract",
    explanation: "A confidentiality clause (also known as a non-disclosure provision) obligates one or both parties to keep specified information secret. These clauses define what information is considered confidential, how it must be protected, what constitutes permitted disclosure, and how long the obligation lasts. They're found in virtually every type of business agreement.",
    exampleClauses: [
      "Each party agrees to maintain in strict confidence all Confidential Information received from the other party, to use such information solely for the purposes of this Agreement, and not to disclose it to any third party without prior written consent.",
      "Confidential Information shall mean all non-public information disclosed by either party, whether oral, written, or electronic, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.",
      "'Confidential Information' shall not include information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was known to the receiving party prior to disclosure; (c) is independently developed without use of Confidential Information; or (d) is received from a third party without restriction."
    ],
    enforceabilityNotes: "Confidentiality clauses are generally enforceable if the information is genuinely confidential, the clause is reasonably scoped, and the duration is appropriate. Courts may refuse to enforce clauses that are overly broad (covering all information rather than specifically identified categories) or that last indefinitely without justification. Trade secrets may warrant indefinite protection, while general business information typically has a 2-5 year confidentiality period.",
    redFlags: [
      "No definition of what constitutes 'Confidential Information'",
      "No exclusions for publicly available information",
      "Indefinite duration for non-trade-secret information",
      "One-sided obligation when information flows both ways",
      "No carve-out for legally compelled disclosures",
      "Overly broad definition covering 'all information' exchanged"
    ],
    relatedTermSlugs: ["non-disclosure", "intellectual-property", "non-compete"],
    relatedToolIds: ["nda-generator", "clause-finder", "jargon-translator"],
    faqs: [
      { question: "How long should confidentiality obligations last?", answer: "Typically 2-5 years for general business information. Trade secrets may warrant indefinite protection. The appropriate duration depends on the type and sensitivity of the information." },
      { question: "Can I be required to keep a salary confidential?", answer: "In the U.S., the National Labor Relations Act generally protects employees' right to discuss wages and working conditions, regardless of what a confidentiality clause says." },
      { question: "What if I'm legally required to disclose confidential information?", answer: "Most well-drafted confidentiality clauses include a carve-out for legally compelled disclosures (e.g., court orders, subpoenas). You should notify the disclosing party before disclosing if possible." },
    ],
  },
  {
    slug: "indemnification-clause",
    title: "Indemnification Clause",
    category: "Contract",
    explanation: "An indemnification clause allocates risk between the parties by requiring one party (the indemnitor) to compensate the other (the indemnitee) for certain losses, damages, or liabilities. These clauses are among the most heavily negotiated in any contract because they directly determine who pays when things go wrong.",
    exampleClauses: [
      "Contractor shall indemnify, defend, and hold harmless Client from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) Contractor's negligence or willful misconduct; (b) any breach of this Agreement by Contractor; or (c) any infringement of third-party intellectual property rights.",
      "Each party shall indemnify the other party from and against any third-party claims arising from: (i) the indemnifying party's breach of any representation, warranty, or obligation under this Agreement; or (ii) the indemnifying party's gross negligence or willful misconduct.",
      "Company's total indemnification obligation under this Section shall not exceed the total fees paid by Client under this Agreement during the twelve (12) months preceding the claim giving rise to the indemnification obligation."
    ],
    enforceabilityNotes: "Indemnification clauses are generally enforceable, but several factors affect their validity: some states have anti-indemnity statutes (especially in construction) that prohibit one party from being indemnified for its own negligence; indemnification for intentional wrongdoing may be unenforceable; and courts may scrutinize one-sided indemnification provisions in contracts of adhesion.",
    redFlags: [
      "One-sided indemnification (only one party indemnifies)",
      "No cap on indemnification liability",
      "Indemnification for the indemnitee's own negligence (may be unenforceable)",
      "No duty to mitigate damages",
      "Indemnitor must also defend (pay legal costs upfront)",
      "Broad trigger language covering 'any and all' claims without limitation"
    ],
    relatedTermSlugs: ["indemnification", "hold-harmless", "liability", "damages"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "What's the difference between 'indemnify' and 'defend'?", answer: "'Indemnify' means to compensate for losses. 'Defend' means to provide legal representation and pay defense costs. A duty to defend is triggered by allegations, while indemnification is triggered by actual liability." },
      { question: "Should indemnification be mutual?", answer: "In most commercial contracts, yes. Each party should indemnify the other for their own negligence and breaches. One-sided indemnification is a red flag unless there's a good reason." },
      { question: "Can indemnification be capped?", answer: "Yes, and it often should be. Common caps include the total contract value, the fees paid in the preceding 12 months, or the limits of the indemnitor's insurance coverage." },
    ],
  },
  {
    slug: "limitation-of-liability",
    title: "Limitation of Liability Clause",
    category: "Contract",
    explanation: "A limitation of liability clause caps the total amount one party can recover from the other in the event of a breach or other claim. These clauses also commonly exclude certain types of damages (like consequential, incidental, or punitive damages). They're among the most important risk allocation provisions in any contract.",
    exampleClauses: [
      "IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED THE TOTAL AMOUNTS ACTUALLY PAID BY CLIENT TO PROVIDER DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.",
      "NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES, REGARDLESS OF THE THEORY OF LIABILITY.",
      "The limitations in this Section shall not apply to: (a) either party's indemnification obligations; (b) either party's breach of confidentiality; (c) either party's infringement of the other's intellectual property rights; or (d) either party's gross negligence or willful misconduct."
    ],
    enforceabilityNotes: "Limitation of liability clauses are generally enforceable in commercial contracts between sophisticated parties. However, courts may refuse to enforce them when: the limitation is unconscionable, the breaching party acted with gross negligence or willful misconduct, the clause attempts to limit liability below a reasonable minimum, or consumer protection laws prohibit such limitations. The clause must be conspicuous (often in ALL CAPS) and mutually agreed upon.",
    redFlags: [
      "Liability capped at an unreasonably low amount (e.g., $100 on a $1M contract)",
      "No carve-outs for gross negligence or willful misconduct",
      "Excludes all consequential damages without exception",
      "One-sided (only limits one party's liability)",
      "Not clearly written or conspicuously displayed",
      "Attempts to limit liability for personal injury or death"
    ],
    relatedTermSlugs: ["liability", "damages", "indemnification", "negligence"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Why are these clauses often in ALL CAPS?", answer: "Courts require limitation of liability clauses to be conspicuous — clearly visible and hard to miss. ALL CAPS formatting helps meet this requirement and makes the clause harder to challenge as hidden or inconspicuous." },
      { question: "What should be carved out from the liability cap?", answer: "Common carve-outs include: confidentiality breaches, IP infringement, indemnification obligations, gross negligence/willful misconduct, data breaches, and payment obligations." },
      { question: "What's a reasonable liability cap?", answer: "A common benchmark is the total fees paid or payable under the agreement, sometimes limited to the preceding 12-month period. The appropriate cap depends on the risk profile of the engagement." },
    ],
  },
  {
    slug: "termination-clause",
    title: "Termination Clause",
    category: "Contract",
    explanation: "A termination clause defines the circumstances under which one or both parties can end the contract before its natural expiration. It specifies the types of termination available (for cause, for convenience, or both), the notice requirements, the cure period for breaches, and what happens after termination (return of materials, payment for work done, surviving obligations).",
    exampleClauses: [
      "Either party may terminate this Agreement for cause upon thirty (30) days' prior written notice if the other party materially breaches this Agreement and fails to cure such breach within the thirty-day notice period.",
      "Client may terminate this Agreement for convenience at any time upon sixty (60) days' prior written notice. Upon such termination, Client shall pay for all services performed and expenses incurred through the effective date of termination.",
      "This Agreement shall automatically terminate upon: (a) the bankruptcy or insolvency of either party; (b) the assignment of either party's assets for the benefit of creditors; or (c) the appointment of a receiver for either party's business."
    ],
    enforceabilityNotes: "Termination clauses are generally enforceable. Courts focus on whether the termination was proper: Was sufficient notice given? Was the cure period honored? Was there actually a material breach (for cause termination)? Improper termination can itself be a breach of contract, potentially exposing the terminating party to damages.",
    redFlags: [
      "Only one party has the right to terminate for convenience",
      "No cure period for breaches before termination",
      "Unreasonably short notice period (e.g., 24 hours)",
      "No provisions for payment of work completed before termination",
      "Unclear definition of what constitutes 'cause' for termination",
      "No survival clause specifying which obligations continue after termination"
    ],
    relatedTermSlugs: ["termination", "breach", "material-breach", "non-compete"],
    relatedToolIds: ["clause-finder", "notice-period", "cancellation-deadline"],
    faqs: [
      { question: "Can I terminate a contract without cause?", answer: "Only if the contract includes a 'termination for convenience' clause. Without one, terminating without cause may itself be a breach of contract." },
      { question: "What is a 'cure period'?", answer: "A grace period (typically 15-30 days) during which the breaching party can fix the problem before the other party can terminate. Most well-drafted contracts include cure periods." },
      { question: "What obligations survive termination?", answer: "Typically: confidentiality, indemnification, intellectual property ownership, payment obligations for work completed, limitation of liability, and dispute resolution provisions." },
    ],
  },
  {
    slug: "force-majeure-clause",
    title: "Force Majeure Clause",
    category: "Contract",
    explanation: "A force majeure clause excuses one or both parties from performing their contractual obligations when extraordinary events beyond their control make performance impossible or impracticable. These events typically include natural disasters, wars, pandemics, government actions, and other unforeseeable circumstances. The COVID-19 pandemic dramatically increased attention to these clauses.",
    exampleClauses: [
      "Neither party shall be liable for any failure or delay in performing its obligations under this Agreement where such failure or delay results from any cause beyond the reasonable control of that party, including but not limited to: acts of God, flood, fire, earthquake, epidemic, pandemic, war, terrorism, civil unrest, strikes, government orders, or embargo.",
      "If a Force Majeure Event continues for more than ninety (90) consecutive days, either party may terminate this Agreement upon written notice to the other party, without liability for such termination.",
      "The party affected by the Force Majeure Event shall: (a) promptly notify the other party in writing; (b) provide regular updates on the status; (c) use commercially reasonable efforts to mitigate the impact; and (d) resume performance as soon as reasonably practicable."
    ],
    enforceabilityNotes: "Force majeure clauses are generally enforceable, but courts interpret them narrowly. The party invoking force majeure must show: the event falls within the clause's defined events, the event actually prevented or delayed performance (not just made it more expensive), the event was beyond the party's control, and the party took reasonable steps to mitigate. Financial hardship or market changes are generally not force majeure events.",
    redFlags: [
      "Vague catch-all language without specific enumerated events",
      "No requirement to notify the other party",
      "No obligation to mitigate the impact",
      "No time limit on how long force majeure can be invoked",
      "Only excuses one party but not the other",
      "No provision for termination if the event continues indefinitely"
    ],
    relatedTermSlugs: ["force-majeure", "liability", "termination", "breach"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Does a pandemic qualify as force majeure?", answer: "It depends on the clause language. If 'pandemic' or 'epidemic' is specifically listed, it clearly qualifies. If not, the party must argue it falls under general catch-all language, which is less certain." },
      { question: "Does force majeure eliminate the obligation entirely?", answer: "Usually not. It suspends the obligation during the event. Once the event ends, the obligation typically resumes. However, prolonged force majeure may allow termination." },
      { question: "What if the contract has no force majeure clause?", answer: "The affected party may need to rely on common law doctrines like impossibility, impracticability, or frustration of purpose, which have higher thresholds than contractual force majeure." },
    ],
  },
  {
    slug: "arbitration-clause",
    title: "Arbitration Clause",
    category: "Dispute Resolution",
    explanation: "An arbitration clause requires the parties to resolve disputes through private arbitration rather than litigation in court. These clauses specify the arbitration rules, the number of arbitrators, the location of arbitration, and whether the arbitration is binding. They're common in employment contracts, consumer agreements, and commercial contracts.",
    exampleClauses: [
      "Any dispute, controversy, or claim arising out of or relating to this Agreement, or the breach, termination, or invalidity thereof, shall be settled by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. The arbitration shall be conducted by a single arbitrator in [City, State].",
      "Before initiating arbitration, the parties agree to first attempt to resolve the dispute through good faith negotiation for thirty (30) days. If negotiation fails, either party may initiate arbitration by providing written notice.",
      "The arbitrator shall have the authority to award any remedy available at law or in equity, except that the arbitrator shall not have authority to award punitive or exemplary damages. The arbitrator's decision shall be final and binding, and judgment upon the award may be entered in any court of competent jurisdiction."
    ],
    enforceabilityNotes: "The Federal Arbitration Act strongly favors enforcement of arbitration agreements. Courts generally enforce arbitration clauses unless: the clause is unconscionable, there was fraud in the making of the agreement (not fraud in the performance), the clause waives non-waivable statutory rights, or specific state laws restrict arbitration for certain claims (like some employment discrimination claims).",
    redFlags: [
      "Waiver of class action rights without clear disclosure",
      "Arbitration location is far from one party's business/residence",
      "One party selects or controls the arbitration process",
      "High arbitration fees that effectively prevent one party from pursuing claims",
      "No discovery allowed",
      "Arbitrator's decision is non-binding (reduces the value of arbitration)"
    ],
    relatedTermSlugs: ["arbitration", "mediation", "jurisdiction", "venue"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Can I opt out of an arbitration clause?", answer: "Some contracts provide a limited opt-out period (typically 30 days). If there's no opt-out provision, you generally can't opt out after agreeing to the contract." },
      { question: "Is arbitration cheaper than going to court?", answer: "Often yes, especially for simpler disputes. However, arbitrator fees can be significant ($300-$1,000+ per hour), and complex arbitrations can be as expensive as litigation." },
      { question: "Can I appeal an arbitration decision?", answer: "Generally, no. One of the key features (and risks) of binding arbitration is that the decision is final with very limited grounds for appeal. Courts can only vacate awards for fraud, corruption, or the arbitrator exceeding their authority." },
    ],
  },
  {
    slug: "governing-law-clause",
    title: "Governing Law Clause",
    category: "Contract",
    explanation: "A governing law clause (also called a choice of law clause) specifies which jurisdiction's laws will be used to interpret the contract and resolve disputes. This is particularly important in contracts between parties in different states or countries, as different jurisdictions may interpret the same contract language differently.",
    exampleClauses: [
      "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.",
      "This Agreement shall be governed by the laws of England and Wales. The parties agree to submit to the exclusive jurisdiction of the courts of England and Wales.",
      "The validity, interpretation, and performance of this Agreement shall be governed by the laws of the State of New York, and any disputes shall be resolved in the state or federal courts located in New York County."
    ],
    enforceabilityNotes: "Governing law clauses are generally enforceable if: there is a reasonable relationship between the chosen jurisdiction and the transaction, the chosen law doesn't violate the fundamental policy of a state with a materially greater interest, and the clause was not obtained through fraud or overreaching. Courts may disregard the clause if applying the chosen law would violate public policy of the forum state.",
    redFlags: [
      "Chosen jurisdiction has no connection to either party or the transaction",
      "Chosen law is significantly less favorable to one party",
      "No companion forum selection clause (governing law without specifying where to sue)",
      "Conflicts with mandatory consumer protection laws",
      "Doesn't address conflict of laws principles",
      "Different governing law for different provisions (creates confusion)"
    ],
    relatedTermSlugs: ["jurisdiction", "venue", "arbitration"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Why is Delaware so popular for governing law?", answer: "Delaware has well-developed, business-friendly corporate law, a specialized Chancery Court, and extensive case law that provides predictable outcomes. This makes it a common choice for commercial contracts." },
      { question: "Can I choose any state's law?", answer: "Generally yes, as long as there's a reasonable relationship between the chosen state and the transaction. Courts may refuse to apply a chosen law if it violates the fundamental policy of the state with the most significant connection to the dispute." },
      { question: "What does 'without regard to conflict of laws' mean?", answer: "This language prevents a court from using the chosen state's conflict-of-laws rules to redirect to another state's law. Without this language, the chosen state's conflict rules might point back to a different state's substantive law." },
    ],
  },
  {
    slug: "intellectual-property-clause",
    title: "Intellectual Property Clause",
    category: "Contract",
    explanation: "An intellectual property (IP) clause defines ownership, rights, and restrictions related to intellectual property created, used, or exchanged under the contract. These clauses address who owns work product, what licenses are granted, how pre-existing IP is treated, and what happens to IP rights when the contract ends.",
    exampleClauses: [
      "All Work Product created by Contractor under this Agreement shall be considered 'work made for hire' under applicable copyright law and shall be the sole and exclusive property of the Company. To the extent any Work Product does not qualify as work made for hire, Contractor hereby irrevocably assigns all right, title, and interest therein to the Company.",
      "Contractor retains ownership of all pre-existing intellectual property ('Background IP'). Contractor grants Company a non-exclusive, perpetual, royalty-free license to use Background IP solely as incorporated into the Work Product delivered under this Agreement.",
      "Neither party shall acquire any right, title, or interest in the other party's intellectual property, except for the limited license expressly granted herein. All use of the other party's trademarks shall be in accordance with written brand guidelines."
    ],
    enforceabilityNotes: "IP clauses are generally enforceable, but certain elements require careful drafting: 'work made for hire' has a specific legal definition under copyright law and doesn't apply to all situations; broad IP assignments may be challengeable if they exceed the scope of the engagement; and some states restrict assignment of inventions created outside work hours using the employee's own resources.",
    redFlags: [
      "No distinction between foreground IP (created under the contract) and background IP (pre-existing)",
      "Overly broad assignment covering all IP created during the contract period, not just contract-related IP",
      "No license back for the creating party to use their own work",
      "Assignment of moral rights (which can't be assigned in some jurisdictions)",
      "No provisions for IP upon contract termination",
      "Vague definition of 'Work Product'"
    ],
    relatedTermSlugs: ["intellectual-property", "non-disclosure", "indemnification"],
    relatedToolIds: ["nda-generator", "clause-finder", "jargon-translator"],
    faqs: [
      { question: "What is 'work made for hire'?", answer: "Under U.S. copyright law, a work made for hire is either: (1) created by an employee within the scope of employment, or (2) specially ordered or commissioned and falls into specific categories, with a written agreement. The employer/commissioner is considered the author and owner." },
      { question: "Can I retain rights to IP I create for a client?", answer: "Only if the contract allows it. You can negotiate to retain ownership and grant the client a license, or retain a license to use the IP in your portfolio or for other clients." },
      { question: "What happens to IP rights when the contract ends?", answer: "It depends on the contract. Typically, assigned IP remains with the assignee. Licensed IP reverts based on the license terms. Well-drafted contracts specifically address post-termination IP rights." },
    ],
  },
  {
    slug: "payment-terms-clause",
    title: "Payment Terms Clause",
    category: "Contract",
    explanation: "A payment terms clause defines how, when, and how much the paying party must pay. It covers the total amount or rate, payment schedule, acceptable payment methods, late payment penalties, expense reimbursement, and dispute procedures. Clear payment terms prevent most payment-related disputes.",
    exampleClauses: [
      "Client shall pay Contractor within thirty (30) days of receipt of each invoice. Invoices shall be submitted monthly in arrears for services performed during the preceding month. All payments shall be made in U.S. dollars by wire transfer or ACH.",
      "A late payment fee of 1.5% per month (18% per annum) shall be charged on any invoice not paid within the payment period. Contractor reserves the right to suspend services if any invoice remains unpaid for more than sixty (60) days.",
      "The total fee for the Project shall be $[Amount], payable as follows: 30% upon execution of this Agreement; 30% upon completion of Phase 1; 30% upon completion of Phase 2; and 10% upon final delivery and acceptance."
    ],
    enforceabilityNotes: "Payment terms are generally enforceable as written. However, courts may scrutinize: excessive late fees that function as penalties (some jurisdictions cap late fees), acceleration clauses (requiring full payment upon any default), and pay-if-paid or pay-when-paid clauses in construction contracts (treated differently by state).",
    redFlags: [
      "No specific payment deadline (e.g., 'payment due upon receipt')",
      "Excessively long payment terms (90+ days)",
      "Late fees exceeding state usury limits",
      "No right to suspend work for non-payment",
      "Pay-if-paid clause transferring collection risk to subcontractors",
      "No dispute resolution process for invoice disagreements"
    ],
    relatedTermSlugs: ["default", "breach", "damages", "lien"],
    relatedToolIds: ["late-fee", "invoice-interest", "freelance-rate"],
    faqs: [
      { question: "What's a standard payment term?", answer: "Net 30 (payment due within 30 days of invoice) is the most common. Net 15 and Net 60 are also common. For freelancers and small businesses, Net 15 or payment upon completion is often preferable." },
      { question: "Can I charge interest on late payments?", answer: "Yes, if it's specified in the contract. Common rates are 1-1.5% per month. Some states cap the maximum interest rate you can charge. Check your state's usury laws." },
      { question: "What is a retainer payment?", answer: "An upfront payment, often held in a trust account, that secures the service provider's availability and is drawn down as work is performed. Common for legal services and consulting engagements." },
    ],
  },
  {
    slug: "entire-agreement-clause",
    title: "Entire Agreement (Merger) Clause",
    category: "Contract",
    explanation: "An entire agreement clause (also called a merger or integration clause) states that the written contract is the complete and final agreement between the parties, superseding all prior negotiations, discussions, and agreements. It prevents either party from claiming that additional promises or agreements exist outside the written contract.",
    exampleClauses: [
      "This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, with respect to such subject matter.",
      "The parties acknowledge that they have not relied upon any statement, representation, or warranty not contained in this Agreement and that this Agreement, together with its Exhibits, constitutes the complete and exclusive statement of the parties' agreement.",
      "No prior or contemporaneous oral or written communications shall be relevant or admissible to supplement, explain, or vary any of the terms of this Agreement."
    ],
    enforceabilityNotes: "Entire agreement clauses are generally enforceable and serve as strong evidence that the written contract is the complete agreement. However, they don't prevent claims of fraud (oral misrepresentations that induced the contract), nor do they override mandatory statutory terms. Some courts may still consider extrinsic evidence to resolve ambiguities in the written contract.",
    redFlags: [
      "Referenced exhibits or schedules are missing or incomplete",
      "Oral promises made during negotiation are not included in the written agreement",
      "Side letters or separate agreements exist but aren't referenced",
      "The clause attempts to disclaim liability for pre-contractual misrepresentations (may not override fraud claims)",
      "No provision for how future amendments must be made"
    ],
    relatedTermSlugs: ["boilerplate", "amendment", "waiver", "addendum"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Can I still sue for oral promises if there's an entire agreement clause?", answer: "The clause makes it much harder but not impossible. Claims of fraud or fraudulent misrepresentation can sometimes overcome an entire agreement clause." },
      { question: "What if the contract references external documents?", answer: "Documents explicitly referenced and incorporated by reference are considered part of the agreement. Make sure all referenced documents are attached and reviewed." },
      { question: "Does the clause prevent future changes?", answer: "No. It addresses prior agreements, not future modifications. However, most contracts also include a provision requiring future amendments to be in writing." },
    ],
  },
  {
    slug: "assignment-clause",
    title: "Assignment Clause",
    category: "Contract",
    explanation: "An assignment clause governs whether and how a party can transfer its rights and obligations under the contract to a third party. These clauses may prohibit assignment entirely, allow it with consent, or permit it freely. They're important in M&A transactions, business reorganizations, and subcontracting arrangements.",
    exampleClauses: [
      "Neither party may assign this Agreement or any rights or obligations hereunder without the prior written consent of the other party, which consent shall not be unreasonably withheld. Any attempted assignment without such consent shall be void.",
      "Notwithstanding the foregoing, either party may assign this Agreement without consent: (a) to an affiliate; (b) in connection with a merger, acquisition, or sale of all or substantially all of its assets; or (c) as part of a corporate reorganization.",
      "This Agreement shall be binding upon and inure to the benefit of the parties and their respective successors and permitted assigns."
    ],
    enforceabilityNotes: "Anti-assignment clauses are generally enforceable. However, some rights may be assignable despite contract restrictions (such as the right to receive payment). In bankruptcy, trustees may be able to assume and assign contracts regardless of anti-assignment provisions. The UCC has specific rules about assignment of rights under Article 2 (sale of goods).",
    redFlags: [
      "No assignment clause at all (default rules vary by jurisdiction)",
      "Unrestricted assignment allows transfer to competitors or unqualified parties",
      "No carve-out for corporate reorganizations or acquisitions",
      "Anti-assignment clause doesn't address whether it applies to the obligations (duties) as well as rights",
      "Consent requirement with no standard for granting or withholding consent"
    ],
    relatedTermSlugs: ["assignee", "termination", "boilerplate"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "What's the difference between assignment and delegation?", answer: "Assignment transfers rights (like the right to receive payment). Delegation transfers duties (like the obligation to perform work). An assignment clause should address both." },
      { question: "Can a contract be assigned in an acquisition?", answer: "Many contracts include specific exceptions for M&A transactions, allowing assignment without consent. Without such an exception, the acquiring company may need consent from all counterparties." },
      { question: "What does 'consent not to be unreasonably withheld' mean?", answer: "The other party can't refuse assignment without a legitimate business reason. However, what constitutes 'unreasonable' refusal can be debated." },
    ],
  },
  {
    slug: "warranty-clause",
    title: "Warranty Clause",
    category: "Contract",
    explanation: "A warranty clause contains promises about the quality, condition, or performance of goods, services, or other subject matter of the contract. Warranties can be express (explicitly stated) or implied (imposed by law). Warranty clauses also commonly include warranty disclaimers limiting or excluding certain warranties.",
    exampleClauses: [
      "Provider warrants that all Services shall be performed in a professional and workmanlike manner, consistent with industry standards. If Services fail to meet this warranty, Provider shall, at its expense, re-perform the non-conforming Services.",
      "THE SERVICES ARE PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
      "Seller warrants that the Products shall be free from defects in materials and workmanship for a period of twelve (12) months from the date of delivery ('Warranty Period'). Seller's sole obligation under this warranty shall be, at Seller's option, to repair or replace any defective Product."
    ],
    enforceabilityNotes: "Express warranties are enforceable as stated. Implied warranty disclaimers must be conspicuous (often in ALL CAPS) and use specific language. The UCC requires the word 'merchantability' to disclaim the implied warranty of merchantability. Consumer protection laws in many states restrict the ability to disclaim implied warranties in consumer transactions. Warranty limitations must be reasonable.",
    redFlags: [
      "Complete disclaimer of all warranties including express warranties",
      "Unreasonably short warranty period",
      "Remedy limited to repair/replacement with no refund option",
      "No warranty for services (only for products)",
      "Warranty void for normal use scenarios",
      "Disclaimer hidden in fine print (not conspicuous)"
    ],
    relatedTermSlugs: ["warranty", "liability", "damages", "breach"],
    relatedToolIds: ["refund-checker", "clause-finder", "jargon-translator"],
    faqs: [
      { question: "Can all warranties be disclaimed?", answer: "Express warranties generally cannot be disclaimed. Implied warranties can be disclaimed in commercial transactions with proper language. Consumer transactions have additional protections that may prevent disclaimer." },
      { question: "What does 'AS IS' mean?", answer: "'AS IS' disclaims implied warranties, meaning you accept the product or service in its current condition. However, express warranties and fraud claims may still apply." },
      { question: "What is the warranty of merchantability?", answer: "An implied warranty that goods are fit for their ordinary purpose and meet the quality standards of the trade. It applies automatically to sales by merchants unless properly disclaimed." },
    ],
  },
  {
    slug: "notice-clause",
    title: "Notice Clause",
    category: "Contract",
    explanation: "A notice clause specifies how formal communications between the parties must be delivered. This includes the required delivery method (mail, email, courier), the addresses for notice, and when notice is considered received. Proper notice is often a prerequisite for exercising rights under the contract, such as termination or claiming a breach.",
    exampleClauses: [
      "All notices required or permitted under this Agreement shall be in writing and shall be deemed given: (a) when delivered personally; (b) one (1) business day after deposit with a nationally recognized overnight courier; or (c) three (3) business days after mailing by certified mail, return receipt requested.",
      "Notices shall be sent to the addresses set forth on the signature page, or to such other address as either party may designate by written notice to the other party.",
      "Email notice shall be deemed given when sent to the email addresses specified below, provided the sender does not receive a bounce-back or delivery failure notification."
    ],
    enforceabilityNotes: "Notice clauses are generally enforceable. Courts strictly enforce notice requirements — if the contract requires certified mail and you send an email, your notice may be ineffective, even if the other party actually received it. Keep proof of delivery for all formal notices.",
    redFlags: [
      "No notice clause at all",
      "Only one method of notice allowed (inflexible)",
      "No email option in modern contracts",
      "Notice addresses are out of date",
      "No provision for updating notice addresses",
      "Unreasonably short notice periods for important actions"
    ],
    relatedTermSlugs: ["termination", "breach", "boilerplate"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Does email count as valid notice?", answer: "Only if the contract explicitly allows email notice. Many older contracts require postal mail or courier delivery. Modern contracts increasingly include email as an acceptable delivery method." },
      { question: "When is notice considered 'received'?", answer: "It depends on the delivery method: personal delivery is immediate, overnight courier is typically the next business day, and certified mail is typically 3-5 business days after mailing." },
      { question: "What if the other party refuses to accept notice?", answer: "If notice is sent to the correct address using the required method, refusal to accept doesn't prevent it from being effective. Keep proof of attempted delivery." },
    ],
  },
  {
    slug: "severability-clause",
    title: "Severability Clause",
    category: "Contract",
    explanation: "A severability clause protects the overall contract if one or more provisions are found to be invalid, illegal, or unenforceable. Without this clause, a court might void the entire contract because of one problematic provision. It's considered standard boilerplate but serves a genuinely important protective function.",
    exampleClauses: [
      "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the validity, legality, and enforceability of the remaining provisions shall not in any way be affected or impaired thereby, and such provision shall be reformed to the minimum extent necessary to make it valid and enforceable.",
      "In the event that any term or condition of this Agreement is determined to be unenforceable, the parties agree that such term shall be modified to the extent necessary to make it enforceable, while preserving the parties' original intent.",
      "Should any provision of this Agreement be deemed void or unenforceable, the remaining provisions shall continue in full force and effect as if such void or unenforceable provision had never been included."
    ],
    enforceabilityNotes: "Severability clauses are widely accepted and enforced. However, they have limits: if a core provision (like the subject matter or price) is invalid, the contract may fail entirely because the remaining provisions can't stand on their own. Some courts distinguish between 'divisible' contracts (where provisions can be separated) and 'indivisible' contracts (where they can't).",
    redFlags: [
      "No severability clause in a contract with aggressive provisions",
      "Clause doesn't include reformation language (allowing courts to modify rather than strike provisions)",
      "Contract has interdependent provisions that can't function independently"
    ],
    relatedTermSlugs: ["severability", "boilerplate", "waiver", "void-voidable"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Is a severability clause always necessary?", answer: "While not strictly required, it's strongly recommended in every contract. Without one, a single invalid provision could potentially void the entire agreement." },
      { question: "What does 'blue penciling' mean?", answer: "Blue penciling is when a court modifies an invalid provision to make it enforceable rather than striking it entirely. Not all jurisdictions allow blue penciling, and some severability clauses expressly authorize it." },
      { question: "Can severability save a fundamentally flawed contract?", answer: "No. If the core provisions are invalid, severability can't save the contract. It works best for preserving the contract when peripheral or ancillary provisions are struck down." },
    ],
  },
  {
    slug: "dispute-resolution-clause",
    title: "Dispute Resolution Clause",
    category: "Dispute Resolution",
    explanation: "A dispute resolution clause establishes the process parties must follow to resolve disagreements. It may include a multi-step process starting with informal negotiation, escalating to mediation, and finally to arbitration or litigation. These clauses aim to resolve disputes efficiently and at the lowest possible cost.",
    exampleClauses: [
      "In the event of any dispute, the parties shall first attempt to resolve the matter through good faith negotiation between senior executives for thirty (30) days. If not resolved, the dispute shall be submitted to mediation. If mediation fails within sixty (60) days, either party may initiate binding arbitration.",
      "Any dispute shall be finally resolved by binding arbitration conducted under the rules of JAMS in San Francisco, California, by a single arbitrator with relevant industry experience.",
      "The parties irrevocably submit to the exclusive jurisdiction of the state and federal courts located in New York County, New York, for the resolution of any dispute arising under this Agreement."
    ],
    enforceabilityNotes: "Dispute resolution clauses are generally enforceable. Multi-step clauses (negotiation → mediation → arbitration) are favored by courts. However, courts may not enforce requirements to negotiate or mediate if they lack specificity about the process or timeline. Arbitration clauses receive strong protection under the Federal Arbitration Act.",
    redFlags: [
      "No dispute resolution clause at all",
      "Multi-step process with no time limits (delays resolution)",
      "Mandatory arbitration with no opt-out for consumer contracts",
      "Forum located far from one party's place of business",
      "No provision for emergency or interim relief",
      "Different dispute resolution mechanisms for different claims (creates confusion)"
    ],
    relatedTermSlugs: ["arbitration", "mediation", "jurisdiction", "venue"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Is a multi-step dispute resolution process better?", answer: "Generally yes. A multi-step process (negotiation → mediation → arbitration) gives parties multiple opportunities to resolve disputes at lower cost before escalating to more formal (and expensive) proceedings." },
      { question: "Can I go directly to court if the contract requires arbitration?", answer: "Generally no, unless you're seeking emergency relief (like a temporary restraining order) that the contract allows you to seek from a court." },
      { question: "What are the costs of dispute resolution?", answer: "Negotiation is free, mediation typically costs $200-$500/hour for the mediator (split between parties), and arbitration costs include arbitrator fees ($300-$1,000+/hour), administrative fees, and legal representation." },
    ],
  },
  {
    slug: "non-solicitation-clause",
    title: "Non-Solicitation Clause",
    category: "Employment",
    explanation: "A non-solicitation clause prevents a departing employee or contractor from soliciting the company's clients, customers, or employees for a specified period after leaving. Unlike non-competes, which restrict where you can work, non-solicitation clauses restrict who you can contact. They're generally more enforceable than non-competes because they're narrower in scope.",
    exampleClauses: [
      "For a period of twelve (12) months following termination, Employee shall not, directly or indirectly, solicit, contact, or attempt to divert any client or customer of the Company with whom Employee had material contact during the last two (2) years of employment.",
      "During the Restricted Period, Contractor shall not recruit, hire, or attempt to hire any employee of the Company, or encourage any employee to terminate their employment with the Company.",
      "The non-solicitation restriction in this Section shall not prevent Employee from responding to a client's unsolicited contact or from general advertising that is not specifically targeted at Company clients."
    ],
    enforceabilityNotes: "Non-solicitation clauses are generally more enforceable than non-competes because they're narrower. Courts evaluate: the scope of restricted contacts (must be limited to people the employee actually worked with), the duration (1-2 years is typical), and whether the clause is necessary to protect legitimate business interests. Unlike non-competes, non-solicitation clauses are enforceable in most states, including California for customer non-solicitation (employee non-solicitation is more restricted).",
    redFlags: [
      "Covers clients the employee never worked with",
      "Duration exceeding 2 years",
      "Prohibits responding to unsolicited contacts",
      "Restricts solicitation of both clients AND employees (may be overly broad)",
      "No exception for publicly available contact information",
      "No consideration for the restricted period (no compensation)"
    ],
    relatedTermSlugs: ["non-compete", "non-disclosure", "covenant", "termination"],
    relatedToolIds: ["non-compete", "clause-finder"],
    faqs: [
      { question: "Is a non-solicitation clause the same as a non-compete?", answer: "No. A non-compete restricts where you can work. A non-solicitation clause restricts who you can contact. Non-solicitation clauses are generally narrower and more enforceable." },
      { question: "Can I accept business from a former client if they contact me first?", answer: "It depends on the clause language. Some non-solicitation clauses only prohibit active solicitation and permit responding to unsolicited contacts. Others broadly prohibit any business dealings." },
      { question: "Does LinkedIn contact count as solicitation?", answer: "It depends on the activity. A general LinkedIn post probably isn't solicitation. Directly messaging a former client about your new services likely is. Courts are still developing standards for social media solicitation." },
    ],
  },
  {
    slug: "data-protection-clause",
    title: "Data Protection Clause",
    category: "Privacy",
    explanation: "A data protection clause addresses how personal data will be collected, processed, stored, and protected under the contract. With the proliferation of data privacy regulations (GDPR, CCPA, etc.), these clauses have become essential in virtually any contract involving personal information.",
    exampleClauses: [
      "Each party shall comply with all applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), with respect to any personal data processed under this Agreement.",
      "Processor shall: (a) process Personal Data only on documented instructions from Controller; (b) ensure persons authorized to process Personal Data have committed to confidentiality; (c) implement appropriate technical and organizational security measures; and (d) assist Controller in responding to data subject rights requests.",
      "Upon termination of this Agreement, Processor shall, at Controller's election, return or securely delete all Personal Data within thirty (30) days and certify such deletion in writing."
    ],
    enforceabilityNotes: "Data protection clauses are enforceable and increasingly mandatory. The GDPR requires specific contractual provisions between data controllers and processors (Article 28). Failure to include required data protection terms can result in regulatory fines. The adequacy of data protection clauses may also be relevant to cybersecurity insurance coverage.",
    redFlags: [
      "No data protection clause when personal data is being processed",
      "No specification of each party's role (controller vs. processor)",
      "No breach notification requirements",
      "No restrictions on sub-processing or data transfers",
      "No data retention or deletion provisions",
      "Vague security obligations (should specify minimum standards)"
    ],
    relatedTermSlugs: ["non-disclosure", "intellectual-property", "liability"],
    relatedToolIds: ["privacy-generator", "clause-finder", "tos-generator"],
    faqs: [
      { question: "What's the difference between a data controller and a data processor?", answer: "A data controller determines the purposes and means of processing personal data. A data processor processes data on behalf of the controller. A company collecting customer data is typically the controller; a SaaS provider storing that data is typically a processor." },
      { question: "Do I need a Data Processing Agreement (DPA)?", answer: "If you share personal data with a service provider and you're subject to GDPR or similar laws, yes. The DPA defines the processor's obligations regarding the personal data." },
      { question: "What should a breach notification clause include?", answer: "The timeline for notification (GDPR requires 72 hours), what information must be included, who must be notified (controller and/or affected individuals), and the format of notification." },
    ],
  },
  {
    slug: "insurance-clause",
    title: "Insurance Clause",
    category: "Contract",
    explanation: "An insurance clause requires one or both parties to maintain specified types and amounts of insurance coverage during the contract term. These clauses allocate risk by ensuring that adequate insurance is available to cover potential losses, reducing reliance on indemnification provisions alone.",
    exampleClauses: [
      "Contractor shall maintain throughout the term of this Agreement: (a) Commercial General Liability insurance with limits of not less than $1,000,000 per occurrence; (b) Professional Liability insurance with limits of not less than $2,000,000 per claim; and (c) Workers' Compensation insurance as required by applicable law.",
      "Contractor shall name Client as an additional insured on all liability policies required hereunder and shall provide certificates of insurance upon request.",
      "All required insurance policies shall: (i) be issued by insurers with an A.M. Best rating of A- VII or higher; (ii) include a waiver of subrogation in favor of Client; and (iii) provide thirty (30) days' advance written notice of cancellation or material change."
    ],
    enforceabilityNotes: "Insurance clauses are enforceable. Courts routinely enforce requirements to maintain specific coverage levels. Additional insured requirements and waiver of subrogation provisions are also generally enforceable. However, the insurance clause itself doesn't create insurance coverage — the actual policy terms control.",
    redFlags: [
      "No insurance requirements in a high-risk engagement",
      "Required coverage limits are too low for the risk involved",
      "No requirement for certificates of insurance",
      "No additional insured requirement",
      "No notice of cancellation provision",
      "Insurance requirements don't match the type of work being performed"
    ],
    relatedTermSlugs: ["indemnification", "liability", "negligence", "hold-harmless"],
    relatedToolIds: ["clause-finder"],
    faqs: [
      { question: "What does 'additional insured' mean?", answer: "Being named as an additional insured on someone else's policy extends that policy's coverage to you for claims arising from their work. It provides an extra layer of protection beyond indemnification." },
      { question: "What is a waiver of subrogation?", answer: "It prevents the insurance company from suing the other contracting party to recover claim payments. Without it, the insurer could sue the additional insured to recover money it paid on a claim." },
      { question: "How do I verify the other party's insurance?", answer: "Request a Certificate of Insurance (COI) from their insurance broker. The COI shows policy types, limits, effective dates, and any additional insured endorsements." },
    ],
  },
  {
    slug: "representations-warranties-clause",
    title: "Representations and Warranties Clause",
    category: "Contract",
    explanation: "Representations and warranties are statements of fact made by one or both parties about the current state of affairs. Representations are assertions about past or present facts. Warranties are promises about the truth of those facts. If a representation or warranty turns out to be false, the other party may have a claim for breach of contract and potentially fraud.",
    exampleClauses: [
      "Each party represents and warrants that: (a) it has full power and authority to enter into this Agreement; (b) this Agreement constitutes a valid and binding obligation; (c) the execution and performance of this Agreement does not violate any other agreement or applicable law.",
      "Seller represents and warrants that: (a) the Products are free from defects in materials and workmanship; (b) the Products do not infringe any third party's intellectual property rights; and (c) the Products comply with all applicable laws and regulations.",
      "The representations and warranties made in this Section shall survive the closing for a period of eighteen (18) months, except for representations regarding taxes and title, which shall survive indefinitely."
    ],
    enforceabilityNotes: "Representations and warranties are enforceable. Their breach can give rise to claims for damages and, in some cases, rescission of the contract. False representations may also support fraud claims, which can bypass limitation of liability clauses. The distinction between representations and warranties can matter — misrepresentation claims may allow rescission, while breach of warranty claims may only allow damages.",
    redFlags: [
      "Only one party makes representations and warranties",
      "No representations about authority to enter the agreement",
      "No IP non-infringement warranty",
      "No survival period specified (representations expire at closing)",
      "Knowledge qualifiers on critical representations ('to the best of Seller's knowledge')",
      "No representations about compliance with applicable laws"
    ],
    relatedTermSlugs: ["warranty", "breach", "damages", "indemnification"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "What's the difference between a representation and a warranty?", answer: "A representation is a statement of fact about past or present conditions. A warranty is a promise that the facts are true. The distinction can affect available remedies: misrepresentation may allow rescission, while breach of warranty typically allows only damages." },
      { question: "What are knowledge qualifiers?", answer: "Phrases like 'to the best of Seller's knowledge' that limit representations to what the party actually knows. They reduce the making party's exposure but weaken the receiving party's protection." },
      { question: "How long should representations survive?", answer: "Typically 12-24 months after closing for general representations. Fundamental representations (title, authority, taxes) often survive indefinitely or for the applicable statute of limitations period." },
    ],
  },
  {
    slug: "waiver-of-jury-trial",
    title: "Waiver of Jury Trial Clause",
    category: "Dispute Resolution",
    explanation: "A waiver of jury trial clause provides that the parties agree to have any disputes decided by a judge (bench trial) rather than a jury. These clauses are common in commercial contracts because bench trials are often faster, less expensive, and more predictable than jury trials, particularly for complex commercial disputes.",
    exampleClauses: [
      "EACH PARTY HEREBY IRREVOCABLY WAIVES ALL RIGHT TO TRIAL BY JURY IN ANY ACTION, PROCEEDING, OR COUNTERCLAIM ARISING OUT OF OR RELATING TO THIS AGREEMENT.",
      "THE PARTIES ACKNOWLEDGE THAT THEY HAVE BEEN ADVISED BY COUNSEL REGARDING THE MEANING AND CONSEQUENCES OF THIS WAIVER OF JURY TRIAL AND VOLUNTARILY AGREE TO WAIVE SUCH RIGHT.",
      "This waiver of jury trial shall apply to any and all disputes between the parties, whether arising in contract, tort, or otherwise, and whether arising before or after the termination of this Agreement."
    ],
    enforceabilityNotes: "Jury trial waivers are enforceable in most federal courts and many state courts, but enforceability varies by jurisdiction. Some states (like California and Georgia) view them with skepticism. To be enforceable, the waiver should be: conspicuous (often in ALL CAPS), knowing and voluntary, and mutual. Courts may refuse to enforce waivers in consumer contracts or contracts of adhesion.",
    redFlags: [
      "Not prominently displayed or in ALL CAPS",
      "One-sided (only one party waives jury rights)",
      "No acknowledgment that the waiver is knowing and voluntary",
      "In a consumer contract (may be unenforceable)",
      "Not signed or initialed separately (some jurisdictions require this)"
    ],
    relatedTermSlugs: ["arbitration", "jurisdiction", "venue"],
    relatedToolIds: ["clause-finder", "jargon-translator"],
    faqs: [
      { question: "Why would I waive my right to a jury trial?", answer: "Bench trials are often faster, less expensive, and more predictable for complex commercial disputes. Judges are better at understanding complex legal and financial issues than juries." },
      { question: "Is a jury trial waiver enforceable?", answer: "In most jurisdictions, yes, if it's knowing, voluntary, and conspicuous. However, some states are skeptical of pre-dispute jury waivers, especially in consumer contracts." },
      { question: "Can the waiver be challenged later?", answer: "Yes, but challenges rarely succeed if the waiver is properly drafted. The challenging party must typically show the waiver wasn't knowing or voluntary, or that enforcing it would be unconscionable." },
    ],
  },
  // ── Batch 2: 30 new legal clauses ──────────────────────────
  {
    slug: "acceleration-clause",
    title: "Acceleration Clause",
    category: "Financial",
    explanation: "An acceleration clause allows a lender to demand immediate repayment of the entire outstanding loan balance if the borrower violates certain terms, most commonly by missing payments. Without this clause, a lender could only sue for each missed payment individually. Acceleration clauses are standard in mortgages, auto loans, and commercial lending agreements. They give lenders powerful leverage to enforce timely payment and protect their investment.",
    exampleClauses: [
      "Upon the occurrence of an Event of Default, the Lender may, at its sole discretion, declare the entire unpaid principal balance, together with all accrued interest and fees, immediately due and payable without further notice or demand.",
      "If Borrower fails to make any payment within fifteen (15) days of its due date, the entire remaining balance of this Note shall, at the option of the Holder, become immediately due and payable.",
    ],
    enforceabilityNotes: "Acceleration clauses are generally enforceable but must be exercised in good faith. Many jurisdictions require the lender to provide notice and an opportunity to cure before accelerating. In residential mortgages, federal regulations may impose additional requirements.",
    redFlags: [
      "No notice or cure period before acceleration",
      "Acceleration triggered by minor or technical defaults unrelated to payment",
      "No option to reinstate the loan after curing the default",
      "Automatic acceleration without lender discretion (may harm borrower unfairly)",
    ],
    relatedTermSlugs: ["default", "breach"],
    relatedToolIds: ["contract-red-flag-scanner", "late-fee-calculator"],
    faqs: [
      { question: "Can a lender accelerate a loan for any reason?", answer: "Only for reasons specified in the contract. Common triggers include missed payments, bankruptcy filing, failure to maintain insurance, or unauthorized transfer of the collateral. The lender must act in good faith." },
      { question: "Can I stop acceleration once it's been triggered?", answer: "Many loan agreements allow reinstatement if you cure the default and pay any associated fees within a specified period. Some jurisdictions also provide statutory reinstatement rights, especially for residential mortgages." },
    ],
  },
  {
    slug: "anti-dilution-clause",
    title: "Anti-Dilution Clause",
    category: "Investment",
    explanation: "An anti-dilution clause protects investors from having their ownership percentage reduced when a company issues new shares at a lower price than what the investor originally paid. These clauses are standard in venture capital and private equity deals. They adjust the investor's conversion price downward to compensate for the dilutive effect of the new issuance, effectively giving them more shares for the same investment.",
    exampleClauses: [
      "If the Company issues additional shares at a price per share less than the Conversion Price then in effect, the Conversion Price shall be adjusted on a broad-based weighted average basis.",
      "In the event of a down round, the Conversion Price of the Series A Preferred Stock shall be reduced to the price at which the new shares are issued (full ratchet adjustment).",
    ],
    enforceabilityNotes: "Anti-dilution clauses are standard and enforceable in investment agreements. Courts generally uphold them as negotiated terms between sophisticated parties. The choice between full ratchet and weighted average formulas significantly impacts both investors and founders.",
    redFlags: [
      "Full ratchet anti-dilution (extremely investor-favorable, punishes founders)",
      "No carve-outs for employee stock option pools",
      "No pay-to-play requirement (investors get protection without participating in down rounds)",
      "Overly broad triggers that include non-dilutive issuances",
    ],
    relatedTermSlugs: ["consideration", "capacity"],
    relatedToolIds: ["partnership-split-calculator"],
    faqs: [
      { question: "What's the difference between full ratchet and weighted average anti-dilution?", answer: "Full ratchet adjusts the conversion price to the new lower price regardless of how many shares are issued — very investor-favorable. Weighted average takes into account the number of new shares issued relative to existing shares, resulting in a more moderate adjustment." },
      { question: "Why should founders care about anti-dilution clauses?", answer: "They can significantly increase investor ownership at the expense of founders and employees in a down round. Full ratchet clauses can be devastating — a small down-round can massively dilute founder ownership." },
    ],
  },
  {
    slug: "automatic-renewal-clause",
    title: "Automatic Renewal Clause",
    category: "General",
    explanation: "An automatic renewal clause (also called an evergreen clause) extends a contract for additional periods unless one party provides notice of termination within a specified timeframe. These are common in service agreements, subscriptions, leases, and software licenses. While they provide continuity and convenience, they can trap parties into unwanted extensions if the cancellation window is missed.",
    exampleClauses: [
      "This Agreement shall automatically renew for successive one (1) year periods unless either party provides written notice of non-renewal at least sixty (60) days prior to the end of the then-current term.",
      "Unless terminated in accordance with this Section, the subscription shall automatically renew at the then-current rate on each anniversary of the Effective Date.",
    ],
    enforceabilityNotes: "Generally enforceable, but many states have enacted consumer protection laws requiring clear disclosure of auto-renewal terms, conspicuous cancellation procedures, and reminder notices before renewal. Several states require businesses to provide easy online cancellation methods.",
    redFlags: [
      "Extremely long notice periods for cancellation (e.g., 180 days)",
      "Renewal term longer than original term",
      "Price increases upon renewal with no cap or notice",
      "No confirmation or reminder before renewal date",
      "Cancellation requires written letter rather than electronic notice",
    ],
    relatedTermSlugs: ["termination", "breach"],
    relatedToolIds: ["cancellation-deadline", "contract-expiration-tracker"],
    faqs: [
      { question: "What if I miss the cancellation deadline?", answer: "You're generally bound for the renewal period. However, if the auto-renewal wasn't properly disclosed (especially in consumer contracts), or if the other party failed to send required reminder notices, you may have grounds to challenge the renewal." },
      { question: "Are there laws regulating auto-renewal?", answer: "Yes. Many states have auto-renewal laws requiring clear disclosure, easy cancellation methods, and reminder notices. California, New York, Illinois, and others have specific statutes. The FTC has also issued guidelines." },
    ],
  },
  {
    slug: "best-efforts-clause",
    title: "Best Efforts Clause",
    category: "Performance",
    explanation: "A best efforts clause requires a party to try as hard as possible to fulfill an obligation, without absolutely guaranteeing a specific result. It's a higher standard than 'reasonable efforts' or 'commercially reasonable efforts' but less than an absolute guarantee. These clauses are common when performance depends on factors partially outside a party's control, such as obtaining regulatory approval, securing financing, or achieving sales targets.",
    exampleClauses: [
      "The Distributor shall use its best efforts to promote, market, and sell the Products throughout the Territory during the term of this Agreement.",
      "Each party shall use its best efforts to obtain all necessary regulatory approvals required to consummate the transactions contemplated by this Agreement.",
    ],
    enforceabilityNotes: "Best efforts clauses are enforceable but courts struggle with defining exactly what 'best efforts' means. Most jurisdictions interpret it as requiring diligent, good-faith efforts — not that the party must exhaust all resources regardless of cost. Courts generally don't require parties to sacrifice their own financial interests.",
    redFlags: [
      "No definition of what 'best efforts' means in context",
      "Best efforts obligation without any measurable milestones or benchmarks",
      "Confusion between 'best efforts' and 'reasonable efforts' (they're different standards)",
      "Unilateral best efforts obligation (only one party bears the burden)",
    ],
    relatedTermSlugs: ["good-faith", "breach", "damages"],
    relatedToolIds: ["contract-checklist-generator", "clause-finder"],
    faqs: [
      { question: "What's the difference between best efforts and reasonable efforts?", answer: "Best efforts is generally a higher standard requiring maximum diligence. Reasonable efforts requires only what a prudent person would do under the circumstances. Commercially reasonable efforts falls in between, requiring industry-standard diligence." },
      { question: "Can I be sued for not achieving results under a best efforts clause?", answer: "You can be sued for not trying hard enough, but not for failing to achieve results. The key question is whether you made genuine, diligent efforts — not whether you succeeded." },
    ],
  },
  {
    slug: "choice-of-forum-clause",
    title: "Choice of Forum Clause",
    category: "Dispute Resolution",
    explanation: "A choice of forum clause (also called a forum selection clause) designates the specific court or location where disputes must or may be litigated. It differs from a choice of law clause, which determines which jurisdiction's laws apply. A contract might specify Delaware law (choice of law) but require litigation in New York courts (choice of forum). These clauses reduce uncertainty and prevent races to the courthouse.",
    exampleClauses: [
      "Any legal action or proceeding arising under this Agreement shall be brought exclusively in the federal or state courts located in New York County, New York, and the parties hereby irrevocably consent to personal jurisdiction and venue therein.",
      "Each party agrees that any suit, action, or proceeding arising out of this Agreement may be instituted in the courts of England and Wales, and each party irrevocably submits to the jurisdiction of such courts.",
    ],
    enforceabilityNotes: "Choice of forum clauses are presumptively valid under M/S Bremen v. Zapata Oil. They can be challenged if enforcement would be unreasonable, if the clause was obtained through fraud, or if it would effectively deprive a party of their day in court. Consumer contracts may receive additional scrutiny.",
    redFlags: [
      "Forum located far from both parties (suggests the drafter picked a favorable court)",
      "Mandatory forum in a jurisdiction with unfavorable laws for the other party",
      "No distinction between mandatory and permissive submission to jurisdiction",
      "Forum selection combined with jury trial waiver and short limitation period",
    ],
    relatedTermSlugs: ["jurisdiction", "venue", "arbitration"],
    relatedToolIds: ["clause-finder", "contract-red-flag-scanner"],
    faqs: [
      { question: "What's the difference between choice of forum and choice of law?", answer: "Choice of forum determines WHERE disputes are litigated (which court). Choice of law determines WHICH jurisdiction's laws apply. They can specify different places — you might apply Texas law but litigate in California courts." },
      { question: "Can I challenge a forum selection clause?", answer: "Yes, but it's difficult. You must show the clause is unreasonable, was procured by fraud, or would effectively deny you access to justice. Courts rarely override forum selection clauses between commercial parties." },
    ],
  },
  {
    slug: "clawback-clause",
    title: "Clawback Clause",
    category: "Financial",
    explanation: "A clawback clause allows one party to reclaim compensation, bonuses, or distributions previously paid under certain circumstances — such as financial restatement, misconduct, or failure to meet performance targets. These clauses became prominent after corporate scandals and the 2008 financial crisis. The Dodd-Frank Act and SEC rules now require public companies to adopt clawback policies for executive compensation.",
    exampleClauses: [
      "In the event of a financial restatement due to material noncompliance with financial reporting requirements, the Company shall recover any incentive compensation paid to Executive in excess of what would have been paid under the restated results.",
      "If Employee engages in Cause-related conduct within twelve (12) months following payment of any bonus, the Company may require repayment of such bonus in full.",
    ],
    enforceabilityNotes: "Clawback clauses are generally enforceable, especially when they relate to misconduct or financial restatements. Courts may scrutinize the triggering events and ensure they're clearly defined. Some jurisdictions limit clawback periods or require advance notice.",
    redFlags: [
      "Vague triggering events that give one party excessive discretion",
      "No time limit on clawback rights",
      "Clawback applies to base salary (not just bonuses/incentive pay)",
      "No process for the affected party to dispute the clawback",
      "Clawback triggered by events outside the employee's control",
    ],
    relatedTermSlugs: ["damages", "breach", "termination"],
    relatedToolIds: ["severance-pay-calculator", "contract-red-flag-scanner"],
    faqs: [
      { question: "Are clawback clauses mandatory?", answer: "For public companies, yes — SEC rules under Dodd-Frank require listed companies to adopt clawback policies for executive incentive compensation. For private companies, clawback clauses are optional but increasingly common." },
      { question: "Can a company clawback compensation for any reason?", answer: "Only for reasons specified in the clawback clause. Common triggers include financial restatements, fraud, misconduct, or violation of non-compete agreements. The triggers must be clearly defined and reasonable." },
    ],
  },
  {
    slug: "change-of-control-clause",
    title: "Change of Control Clause",
    category: "Corporate",
    explanation: "A change of control clause addresses what happens to a contract when one party undergoes a significant ownership change — such as a merger, acquisition, or transfer of a controlling interest. These clauses may grant termination rights, trigger consent requirements, or activate special provisions like accelerated payments or golden parachute compensation.",
    exampleClauses: [
      "In the event of a Change of Control of either party, the other party shall have the right to terminate this Agreement upon thirty (30) days' written notice.",
      "A 'Change of Control' means (i) a merger or consolidation in which the Company is not the surviving entity, (ii) the sale of all or substantially all of the Company's assets, or (iii) the acquisition by any person of more than 50% of the Company's voting securities.",
    ],
    enforceabilityNotes: "Change of control clauses are standard and generally enforceable. However, overly broad definitions of 'change of control' that capture routine corporate transactions may be challenged. In M&A contexts, these clauses significantly affect deal value and structure.",
    redFlags: [
      "Overly broad definition that includes minority investments or management changes",
      "No notice or cure period before termination rights activate",
      "Automatic termination rather than optional termination rights",
      "Double-trigger requirements that make it nearly impossible to exercise rights",
    ],
    relatedTermSlugs: ["termination", "novation", "breach"],
    relatedToolIds: ["contract-red-flag-scanner", "contract-checklist-generator"],
    faqs: [
      { question: "Why do change of control clauses matter in acquisitions?", answer: "They can significantly affect deal value. If key contracts terminate upon change of control, the business being acquired loses important revenue streams or vendor relationships. Acquirers always review these clauses during due diligence." },
      { question: "What's a 'double trigger' change of control provision?", answer: "It requires two events before benefits are triggered: (1) a change of control occurs, AND (2) the employee is terminated or their role is materially changed. This prevents windfall payments when the employee isn't actually harmed by the transaction." },
    ],
  },
  {
    slug: "compliance-clause",
    title: "Compliance Clause",
    category: "Regulatory",
    explanation: "A compliance clause requires one or both parties to adhere to applicable laws, regulations, industry standards, and ethical guidelines in performing their obligations under the contract. These clauses have become increasingly important with growing regulatory complexity, anti-corruption enforcement (FCPA, UK Bribery Act), data privacy laws (GDPR, CCPA), and sanctions regimes.",
    exampleClauses: [
      "Each party shall comply with all applicable federal, state, and local laws, regulations, and ordinances in the performance of its obligations under this Agreement, including but not limited to anti-bribery, export control, and data protection laws.",
      "Supplier represents and warrants that it shall comply with all applicable labor laws, including wage and hour requirements, workplace safety regulations, and anti-discrimination laws.",
    ],
    enforceabilityNotes: "Compliance clauses are universally enforceable and increasingly expected in commercial contracts. Failure to include adequate compliance provisions can expose companies to regulatory risk and reputational harm. Many industries have specific compliance requirements that should be addressed.",
    redFlags: [
      "Vague compliance obligations without specifying which laws or standards",
      "No audit or verification rights to confirm compliance",
      "No remediation or cure period for compliance failures",
      "Compliance obligations that are impossible or impractical for the other party",
      "No representation that the party is not on any sanctions or debarment list",
    ],
    relatedTermSlugs: ["good-faith", "breach", "termination"],
    relatedToolIds: ["contract-checklist-generator", "privacy-policy-generator"],
    faqs: [
      { question: "What laws should a compliance clause cover?", answer: "At minimum: anti-bribery (FCPA/UK Bribery Act), sanctions, export controls, data privacy (GDPR/CCPA), labor laws, and environmental regulations. Industry-specific regulations should also be addressed." },
      { question: "Can I be held liable for my contractor's compliance violations?", answer: "Potentially yes. Under many regulatory regimes, companies can be liable for violations by their agents, contractors, and subcontractors. This is why compliance clauses often include audit rights and indemnification for the other party's violations." },
    ],
  },
  {
    slug: "cross-default-clause",
    title: "Cross-Default Clause",
    category: "Financial",
    explanation: "A cross-default clause provides that a default under one agreement between the parties (or related agreements) automatically constitutes a default under the current agreement. This prevents a borrower from selectively defaulting on obligations and ensures creditors can protect themselves when a borrower's financial health deteriorates. Cross-default clauses are standard in loan agreements, bond indentures, and complex financing arrangements.",
    exampleClauses: [
      "It shall constitute an Event of Default hereunder if Borrower defaults under any other indebtedness or obligation to Lender or any affiliate of Lender, regardless of whether such default has been waived.",
      "A default by Borrower under any agreement for borrowed money in excess of $1,000,000, which default is not cured within the applicable grace period, shall constitute an Event of Default under this Agreement.",
    ],
    enforceabilityNotes: "Cross-default clauses are generally enforceable between commercial parties. Courts look for clear and unambiguous language defining what constitutes a triggering default. Borrowers should negotiate materiality thresholds and cure periods to prevent cascading defaults from minor issues.",
    redFlags: [
      "No materiality threshold (any default, no matter how small, triggers cross-default)",
      "Cross-default extends to affiliates or unrelated third-party agreements",
      "No cure or grace period before cross-default takes effect",
      "Includes disputed or contested defaults as triggers",
      "No carve-out for defaults that are being contested in good faith",
    ],
    relatedTermSlugs: ["default", "breach", "liability"],
    relatedToolIds: ["contract-red-flag-scanner", "contract-value-calculator"],
    faqs: [
      { question: "How does a cross-default clause differ from a cross-acceleration clause?", answer: "A cross-default is triggered when default occurs under another agreement, while cross-acceleration is triggered only when the other lender actually accelerates the debt. Cross-acceleration is less aggressive because it requires the other lender to take action first." },
      { question: "Can cross-default clauses be limited?", answer: "Yes, and they should be. Common limitations include materiality thresholds (default must exceed a dollar amount), cure periods, exclusions for disputed defaults, and limitations to agreements with the same lender rather than all creditors." },
    ],
  },
  {
    slug: "cure-period-clause",
    title: "Cure Period Clause",
    category: "General",
    explanation: "A cure period clause gives a party a specified amount of time to fix (cure) a breach or default before the other party can exercise remedies like termination or acceleration. These clauses balance the interests of both parties — giving the breaching party a fair opportunity to correct mistakes while preserving the non-breaching party's right to act if problems aren't resolved.",
    exampleClauses: [
      "Upon the occurrence of a breach, the non-breaching party shall provide written notice specifying the breach. The breaching party shall have thirty (30) days from receipt of such notice to cure the breach before any termination rights may be exercised.",
      "No Event of Default shall be deemed to have occurred if the defaulting party cures such default within fifteen (15) business days after receiving written notice thereof.",
    ],
    enforceabilityNotes: "Cure period clauses are standard and universally enforceable. Courts may imply a reasonable cure period even when the contract is silent, particularly for non-material breaches. The adequacy of the cure period depends on the nature of the obligation.",
    redFlags: [
      "Unreasonably short cure period for complex obligations",
      "No cure period at all for curable breaches",
      "Cure period doesn't restart for new or different breaches",
      "No clear definition of what constitutes an adequate cure",
      "Cure period applies to some breaches but not others without clear rationale",
    ],
    relatedTermSlugs: ["breach", "default", "termination"],
    relatedToolIds: ["notice-period", "contract-checklist-generator"],
    faqs: [
      { question: "What's a reasonable cure period?", answer: "It depends on the obligation. Payment defaults might have 5-15 days. Operational or performance issues might need 30-60 days. Construction or complex technical obligations might need 90+ days. The key is that the period must be realistic for the type of breach." },
      { question: "Do all breaches get a cure period?", answer: "Not necessarily. Contracts often carve out certain 'incurable' breaches — like fraud, criminal conduct, or insolvency — from the cure period. These breaches may trigger immediate termination rights." },
    ],
  },
  {
    slug: "drag-along-clause",
    title: "Drag-Along Clause",
    category: "Corporate",
    explanation: "A drag-along clause gives majority shareholders the right to force minority shareholders to sell their shares in the event of a company sale or acquisition. This prevents minority shareholders from blocking a deal that the majority wants to pursue. The minority shareholders must sell on the same terms and conditions as the majority. Drag-along rights are standard in shareholders' agreements and venture capital term sheets.",
    exampleClauses: [
      "If holders of a majority of the outstanding shares approve a sale of the Company, all other shareholders shall be required to sell their shares on the same terms and conditions, and shall take all actions necessary to consummate such sale.",
      "In the event of a Drag-Along Sale, each Shareholder agrees to (i) vote in favor of the transaction, (ii) waive any appraisal or dissenter's rights, and (iii) execute all documents necessary to effect the sale.",
    ],
    enforceabilityNotes: "Drag-along clauses are generally enforceable when properly drafted and agreed to in advance. Courts require that minority shareholders receive the same price and terms as majority shareholders. The clause must be clearly disclosed and agreed to, and the sale must be on commercially reasonable terms.",
    redFlags: [
      "No minimum price floor or fairness requirement",
      "Drag-along can be triggered by a simple majority (rather than supermajority)",
      "No independent valuation requirement",
      "Waiver of all appraisal and dissenter's rights",
      "No notice period before the drag-along is exercised",
    ],
    relatedTermSlugs: ["capacity", "consideration", "privity"],
    relatedToolIds: ["partnership-split-calculator", "contract-red-flag-scanner"],
    faqs: [
      { question: "What protections do minority shareholders have in a drag-along?", answer: "Key protections include receiving the same price per share as majority holders, a minimum price floor, independent valuation requirements, fiduciary duty obligations of the majority, and advance notice of the proposed sale." },
      { question: "What's the difference between drag-along and tag-along rights?", answer: "Drag-along forces minority to sell (protects majority). Tag-along allows minority to join a sale (protects minority). They're complementary — most shareholders' agreements include both." },
    ],
  },
  {
    slug: "exclusivity-clause",
    title: "Exclusivity Clause",
    category: "Commercial",
    explanation: "An exclusivity clause grants one party the exclusive right to provide services, distribute products, or negotiate a deal within a defined scope. These clauses are common in distribution agreements, licensing deals, M&A negotiations, and service contracts. They provide security to the exclusive party but limit the other party's flexibility.",
    exampleClauses: [
      "During the Term, Distributor shall be the exclusive distributor of the Products within the Territory. Company shall not appoint any other distributors or sell directly within the Territory.",
      "For a period of sixty (60) days from the Effective Date, the Company shall negotiate exclusively with Buyer and shall not solicit, entertain, or accept any other offers for the sale of the Company.",
    ],
    enforceabilityNotes: "Exclusivity clauses are enforceable but may be subject to antitrust scrutiny if they unreasonably restrain competition. Courts consider the scope, duration, and geographic reach. Overly broad exclusivity may be narrowed or voided under competition laws.",
    redFlags: [
      "Unlimited duration or excessively long exclusivity period",
      "Overly broad geographic scope or product scope",
      "No performance minimums or benchmarks for the exclusive party",
      "No termination rights if the exclusive party underperforms",
      "Exclusivity survives termination of the main agreement",
    ],
    relatedTermSlugs: ["non-compete", "breach", "termination"],
    relatedToolIds: ["non-compete-checker", "contract-red-flag-scanner"],
    faqs: [
      { question: "Can exclusivity clauses violate antitrust laws?", answer: "Yes, if they unreasonably restrain competition. Factors include market power of the parties, duration, geographic scope, and impact on competitors. Exclusive dealing arrangements are evaluated under the rule of reason." },
      { question: "Should exclusivity include performance requirements?", answer: "Absolutely. Without minimum purchase quantities, sales targets, or marketing commitments, you risk being locked into an exclusive relationship with an underperforming partner who blocks you from working with others." },
    ],
  },
  {
    slug: "first-right-of-refusal-clause",
    title: "First Right of Refusal Clause",
    category: "Commercial",
    explanation: "A right of first refusal (ROFR) gives one party the right to match any offer that the other party receives from a third party before the other party can accept it. If the ROFR holder matches the offer, the transaction goes to them instead. If they decline, the other party is free to proceed with the third party. ROFRs are common in real estate leases, shareholders' agreements, and commercial contracts.",
    exampleClauses: [
      "Before selling the Property to any third party, Seller shall first offer the Property to Tenant on the same terms and conditions. Tenant shall have thirty (30) days to accept or decline the offer.",
      "If any Shareholder receives a bona fide offer to purchase their shares, the Company and remaining Shareholders shall have a right of first refusal to purchase such shares on the same terms within forty-five (45) days of written notice.",
    ],
    enforceabilityNotes: "Rights of first refusal are generally enforceable but must be clearly drafted with specific terms regarding timing, matching requirements, and consequences of non-exercise. Courts may find them unenforceable if too vague or if they constitute unreasonable restraints on alienation.",
    redFlags: [
      "No time limit for the ROFR holder to make a decision",
      "Unclear matching requirements (does the holder need to match all terms?)",
      "ROFR that perpetually resets (chilling effect on third-party offers)",
      "No obligation for the seller to provide full details of the third-party offer",
      "ROFR survives assignment or change of control",
    ],
    relatedTermSlugs: ["consideration", "good-faith", "privity"],
    relatedToolIds: ["lease-analyzer", "contract-red-flag-scanner"],
    faqs: [
      { question: "Does a right of first refusal discourage third-party offers?", answer: "Yes, this is a well-known problem. Third parties may not bother making offers if they know the ROFR holder can simply match them. This 'chilling effect' can reduce competition and lower the price the seller ultimately receives." },
      { question: "What's the difference between right of first refusal and right of first offer?", answer: "With a ROFR, the seller gets a third-party offer first, then gives the ROFR holder a chance to match. With a right of first offer (ROFO), the seller must offer to the ROFO holder first before seeking third-party offers." },
    ],
  },
  {
    slug: "holdback-clause",
    title: "Holdback Clause",
    category: "Financial",
    explanation: "A holdback clause retains a portion of a payment amount for a specified period to protect against potential claims, deficiencies, or adjustments. In M&A transactions, a percentage of the purchase price is typically held back in escrow to cover potential indemnification claims. In construction, holdbacks (also called retainage) ensure contractors complete punch list items.",
    exampleClauses: [
      "Ten percent (10%) of the Purchase Price shall be deposited into an escrow account and held for a period of eighteen (18) months following the Closing Date to satisfy any indemnification claims by the Buyer.",
      "Owner shall retain five percent (5%) of each progress payment as holdback, to be released within thirty (30) days of final completion and acceptance of the Work.",
    ],
    enforceabilityNotes: "Holdback clauses are standard and enforceable in both M&A and construction contexts. Many states have specific statutes governing construction retainage, including maximum percentages and required release timelines. The holdback amount and duration should be proportionate to the risk.",
    redFlags: [
      "Holdback percentage that is disproportionately high (e.g., 25%+ in M&A)",
      "No defined release date or trigger for releasing the holdback",
      "Holdback can be applied to claims beyond the scope of the contract",
      "No interest accrual on the holdback amount",
      "No dispute resolution mechanism for holdback claims",
    ],
    relatedTermSlugs: ["escrow", "damages", "breach"],
    relatedToolIds: ["contract-value-calculator", "invoice-interest-calculator"],
    faqs: [
      { question: "What's a typical holdback percentage?", answer: "In M&A: 5-15% of the purchase price, held for 12-24 months. In construction: 5-10% of each payment, released after final completion. The appropriate amount depends on the risk profile and deal specifics." },
      { question: "What happens to the holdback if no claims are made?", answer: "It's released to the selling party or contractor according to the release schedule in the agreement. Any remaining holdback after the expiration of the claim period is returned, usually with or without interest depending on the contract terms." },
    ],
  },
  {
    slug: "indemnity-cap-clause",
    title: "Indemnity Cap Clause",
    category: "Risk Allocation",
    explanation: "An indemnity cap limits the maximum amount one party can be required to pay under the indemnification provisions of a contract. Without a cap, a party's indemnification liability could theoretically be unlimited. Caps are typically set as a percentage of the contract value, the total fees paid, or a fixed dollar amount. They are a critical risk allocation tool in virtually all commercial contracts.",
    exampleClauses: [
      "Notwithstanding any provision to the contrary, each party's aggregate liability for all indemnification claims under this Agreement shall not exceed the total fees paid or payable during the twelve (12) month period preceding the claim.",
      "The Seller's maximum aggregate liability for indemnification claims shall not exceed fifteen percent (15%) of the Purchase Price, except for claims arising from fraud or willful misconduct, which shall not be subject to any cap.",
    ],
    enforceabilityNotes: "Indemnity caps are standard and enforceable between commercial parties. Courts generally uphold them as negotiated risk allocation. However, caps typically don't apply to fraud, willful misconduct, or breach of fundamental representations. Some jurisdictions may not enforce caps in consumer contracts.",
    redFlags: [
      "Cap set too low relative to potential losses",
      "No carve-outs for fraud, willful misconduct, or IP infringement",
      "Cap applies to all claims including data breaches or regulatory fines",
      "Asymmetric caps (one party has a much lower cap than the other)",
      "Cap erodes over time without replenishment",
    ],
    relatedTermSlugs: ["indemnity", "liability", "damages"],
    relatedToolIds: ["contract-value-calculator", "contract-red-flag-scanner"],
    faqs: [
      { question: "What's a typical indemnity cap?", answer: "For service contracts: 1-2x annual fees. For M&A deals: 10-25% of purchase price for general reps, with higher or no cap for fundamental reps. The appropriate cap depends on the deal size, risk profile, and negotiating leverage." },
      { question: "Should some claims be excluded from the cap?", answer: "Yes. Fraud, willful misconduct, IP indemnification, confidentiality breaches, and data privacy violations are commonly carved out from the cap. These represent risks that the indemnifying party should fully bear." },
    ],
  },
  {
    slug: "integration-clause",
    title: "Integration Clause",
    category: "General",
    explanation: "An integration clause (also called an entire agreement or merger clause) states that the written contract represents the complete and final agreement between the parties, superseding all prior negotiations, discussions, and agreements. This prevents either party from later claiming that oral promises or earlier drafts are part of the deal. It's one of the most important boilerplate clauses in any contract.",
    exampleClauses: [
      "This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior and contemporaneous agreements, understandings, negotiations, and discussions, whether oral or written.",
      "This Agreement, together with all exhibits and schedules attached hereto, represents the complete understanding between the parties. No prior representations, inducements, promises, or agreements, oral or otherwise, shall be of any force or effect.",
    ],
    enforceabilityNotes: "Integration clauses are universally enforceable and are one of the most reliably upheld contract provisions. Under the parol evidence rule, they prevent the introduction of prior or contemporaneous oral agreements to contradict or supplement the written contract.",
    redFlags: [
      "Missing integration clause (allows claims based on oral promises)",
      "Integration clause that doesn't reference attached exhibits and schedules",
      "Contradicts other provisions that incorporate external documents by reference",
      "No exception for fraud (most courts allow fraud claims regardless of integration clauses)",
    ],
    relatedTermSlugs: ["boilerplate", "amendment", "addendum"],
    relatedToolIds: ["contract-checklist-generator", "clause-finder"],
    faqs: [
      { question: "Can I still claim fraud if there's an integration clause?", answer: "Generally yes. Most courts hold that integration clauses cannot bar fraud claims. If the other party made fraudulent misrepresentations to induce you to sign the contract, you can typically pursue those claims regardless of the integration clause." },
      { question: "Does an integration clause prevent future amendments?", answer: "No. It only addresses prior and contemporaneous agreements. Future amendments are governed by the amendment clause, which typically requires written agreement signed by both parties." },
    ],
  },
  {
    slug: "key-person-clause",
    title: "Key Person Clause",
    category: "Commercial",
    explanation: "A key person clause (also called key man clause) gives one party specific rights — usually suspension, termination, or renegotiation — if a named individual who is essential to the contract's performance is no longer involved. These clauses are common in professional services contracts, fund management agreements, and entertainment deals where the value depends heavily on specific individuals.",
    exampleClauses: [
      "If John Smith ceases to be actively involved in the performance of Services for any reason, Client may terminate this Agreement upon thirty (30) days' written notice without penalty.",
      "If any Key Person is unable or unwilling to devote substantially all of their business time to the Fund, the Investment Period shall be automatically suspended until a qualified replacement is approved by a majority of the Limited Partners.",
    ],
    enforceabilityNotes: "Key person clauses are enforceable as standard contract provisions. Courts treat them as negotiated terms reflecting the importance of specific individuals to the deal. The clause should clearly define who the key persons are and what triggers apply.",
    redFlags: [
      "No definition of what 'actively involved' or 'substantially all business time' means",
      "No process for approving replacement key persons",
      "Clause triggers only on death or disability, not voluntary departure",
      "No cure period or opportunity to find a replacement",
      "Key person list that's too broad or includes easily replaceable roles",
    ],
    relatedTermSlugs: ["termination", "breach", "good-faith"],
    relatedToolIds: ["contract-checklist-generator", "contract-red-flag-scanner"],
    faqs: [
      { question: "Who should be named as a key person?", answer: "Only individuals whose involvement is genuinely critical to the value of the contract — lead partners, creative directors, fund managers, or subject matter experts whose departure would materially change what's being delivered." },
      { question: "What happens when a key person leaves?", answer: "Depending on the clause, the other party may have rights to suspend performance, renegotiate terms, approve a replacement, or terminate the agreement. The specific remedy should be clearly stated." },
    ],
  },
  {
    slug: "material-adverse-change-clause",
    title: "Material Adverse Change Clause",
    category: "Corporate",
    explanation: "A material adverse change (MAC) clause (also called material adverse effect or MAE clause) allows a party to walk away from or renegotiate a deal if a significant negative event occurs that fundamentally affects the value, operations, or financial condition of the other party. MAC clauses are critical in M&A agreements, loan commitments, and major commercial contracts.",
    exampleClauses: [
      "Buyer's obligation to close is conditioned upon there not having occurred any Material Adverse Change in the business, financial condition, results of operations, or prospects of the Company since the date of this Agreement.",
      "'Material Adverse Effect' means any event, change, or occurrence that, individually or in the aggregate, has had or would reasonably be expected to have a material adverse effect on the business, assets, financial condition, or results of operations of the Company.",
    ],
    enforceabilityNotes: "MAC clauses are enforceable but courts set a very high bar for invoking them. The Delaware Chancery Court in Akorn v. Fresenius established that a MAC must be durationally significant — not just a short-term decline. Parties should carefully negotiate carve-outs and define what constitutes 'material.'",
    redFlags: [
      "Overly broad MAC definition with no carve-outs",
      "No exceptions for general economic or industry-wide conditions",
      "MAC triggered by the announcement of the transaction itself",
      "No requirement that the change be 'durationally significant'",
      "Subjective determination without objective criteria",
    ],
    relatedTermSlugs: ["due-diligence", "breach", "termination"],
    relatedToolIds: ["contract-red-flag-scanner", "contract-value-calculator"],
    faqs: [
      { question: "How bad does a change need to be to qualify as a MAC?", answer: "Very bad. Courts have found that a MAC requires a substantial decline that would be viewed as significantly altering the total mix of information. Short-term drops in revenue or stock price typically don't qualify. Think 40%+ declines sustained over commercially significant periods." },
      { question: "What are common MAC carve-outs?", answer: "Standard carve-outs include general economic conditions, industry-wide changes, changes in law, natural disasters, pandemic effects, and changes resulting from the announcement of the deal itself. These prevent buyers from using external events as pretexts to back out." },
    ],
  },
  {
    slug: "most-favored-nation-clause",
    title: "Most Favored Nation Clause",
    category: "Commercial",
    explanation: "A most favored nation (MFN) clause guarantees that one party will receive terms at least as favorable as those offered to any other party. If the provider offers better pricing, terms, or conditions to another customer, the MFN holder is automatically entitled to the same terms. These clauses originated in international trade treaties and are now common in commercial supply agreements, licensing deals, and insurance contracts.",
    exampleClauses: [
      "If Supplier offers to any other customer pricing or terms more favorable than those set forth in this Agreement, Supplier shall promptly offer the same pricing or terms to Buyer.",
      "The license fees set forth herein shall be no greater than the lowest fees charged by Licensor to any other licensee for comparable rights and usage volumes.",
    ],
    enforceabilityNotes: "MFN clauses are generally enforceable but may raise antitrust concerns if they facilitate price fixing or reduce price competition. The FTC and DOJ have challenged MFN clauses in certain industries. Clear definitions of 'comparable terms' and 'comparable customers' are essential for enforcement.",
    redFlags: [
      "No definition of what constitutes 'comparable' customers or transactions",
      "No mechanism for verifying compliance (no audit rights)",
      "MFN applies retroactively to deals made before the contract",
      "No carve-outs for volume discounts, promotional pricing, or strategic deals",
      "Potential antitrust implications in concentrated markets",
    ],
    relatedTermSlugs: ["good-faith", "breach", "consideration"],
    relatedToolIds: ["contract-red-flag-scanner", "contract-value-calculator"],
    faqs: [
      { question: "Can MFN clauses violate antitrust laws?", answer: "Potentially yes. The FTC has challenged MFN clauses that reduce price competition, particularly in healthcare and technology. If an MFN effectively discourages a supplier from offering competitive prices to anyone, it may be anticompetitive." },
      { question: "How do I verify the other party is honoring the MFN?", answer: "Include audit rights in the contract that allow you to review the other party's pricing to other customers. Without verification mechanisms, MFN clauses are difficult to enforce." },
    ],
  },
  {
    slug: "no-shop-clause",
    title: "No-Shop Clause",
    category: "Corporate",
    explanation: "A no-shop clause prohibits one party (usually a seller in an M&A transaction) from soliciting, encouraging, or negotiating with other potential buyers during a specified period. This gives the prospective buyer confidence to invest time and resources in due diligence without worrying about being outbid. No-shop clauses are standard in letters of intent, merger agreements, and exclusive negotiation periods.",
    exampleClauses: [
      "During the Exclusivity Period, the Company shall not, directly or indirectly, solicit, initiate, encourage, or engage in discussions or negotiations with any other party regarding any acquisition, merger, or similar transaction.",
      "From the date hereof until the earlier of the Closing Date or termination of this Agreement, the Seller shall not shop the Company or any of its assets to any third party.",
    ],
    enforceabilityNotes: "No-shop clauses are enforceable as negotiated agreements between sophisticated parties. However, directors of public companies have fiduciary duties that may require them to consider unsolicited superior proposals. This tension is typically addressed through 'fiduciary out' provisions.",
    redFlags: [
      "No fiduciary out allowing the board to consider superior unsolicited offers",
      "Excessively long no-shop period without a termination right",
      "No break-up fee provision (seller gives up flexibility without compensation if deal falls through)",
      "No-shop extends to preliminary or exploratory conversations",
      "No sunset provision if the buyer fails to proceed diligently",
    ],
    relatedTermSlugs: ["good-faith", "due-diligence", "termination"],
    relatedToolIds: ["contract-red-flag-scanner", "contract-checklist-generator"],
    faqs: [
      { question: "What's a 'fiduciary out' in relation to a no-shop?", answer: "A fiduciary out allows the target's board of directors to consider and accept a superior unsolicited offer if the board determines that failing to do so would breach their fiduciary duties to shareholders. Most public company merger agreements include this exception." },
      { question: "How long should a no-shop period last?", answer: "Typically 30-90 days for a letter of intent, and from signing to closing for a definitive agreement (usually 2-6 months). The period should be long enough for meaningful due diligence but not so long that it unfairly restricts the seller." },
    ],
  },
  {
    slug: "non-disparagement-clause",
    title: "Non-Disparagement Clause",
    category: "Employment",
    explanation: "A non-disparagement clause prohibits one or both parties from making negative, critical, or damaging statements about the other party. These clauses are common in settlement agreements, severance packages, and employment contracts. They protect reputation and prevent former business partners or employees from publicly criticizing each other after the relationship ends.",
    exampleClauses: [
      "Neither party shall make any disparaging, defamatory, or derogatory statements about the other party, its officers, directors, employees, products, or services to any third party.",
      "Employee agrees not to make any statements, written or oral, that could reasonably be construed as negative, disparaging, or damaging to the Company's reputation, goodwill, or business interests.",
    ],
    enforceabilityNotes: "Non-disparagement clauses are generally enforceable but have been significantly limited by the NLRB's 2023 McLaren Macomb decision, which found that overly broad non-disparagement clauses in severance agreements can violate the National Labor Relations Act. The FTC has also scrutinized these clauses in consumer contexts.",
    redFlags: [
      "One-sided clause (only restricts the employee, not the company)",
      "Overly broad definition of disparagement that could cover truthful statements",
      "No carve-outs for legally required disclosures or government investigations",
      "Severe financial penalties for violation without due process",
      "Clause restricts discussing working conditions (may violate NLRA)",
    ],
    relatedTermSlugs: ["non-disclosure", "termination", "damages"],
    relatedToolIds: ["severance-pay-calculator", "contract-red-flag-scanner"],
    faqs: [
      { question: "Can a non-disparagement clause prevent me from posting negative reviews?", answer: "It depends. In an employment or business context, properly drafted clauses can restrict public criticism. However, the Consumer Review Fairness Act prohibits businesses from penalizing consumers for posting honest reviews." },
      { question: "Does non-disparagement restrict what I tell government agencies?", answer: "No. You generally cannot be restricted from communicating with government agencies, filing complaints, or participating in investigations. Properly drafted clauses should include carve-outs for legally protected communications." },
    ],
  },
  {
    slug: "penalty-clause",
    title: "Penalty Clause",
    category: "Risk Allocation",
    explanation: "A penalty clause imposes a payment obligation on a party who breaches a contract, where the amount is designed to punish the breaching party rather than to compensate for actual losses. Under common law, penalty clauses are generally unenforceable — courts will strike them down and substitute actual damages. This distinguishes them from liquidated damages clauses, which estimate genuine pre-agreed compensation.",
    exampleClauses: [
      "In the event of Contractor's failure to complete the Work by the Completion Date, Contractor shall pay Owner the sum of $50,000 per day as a penalty for each day of delay.",
      "If Employee breaches the non-compete covenant, Employee shall pay Company three times the total compensation received during the term of employment as a penalty.",
    ],
    enforceabilityNotes: "Penalty clauses are unenforceable in most common law jurisdictions. Courts distinguish between enforceable liquidated damages (a genuine pre-estimate of loss) and unenforceable penalties (amounts designed to punish). The test is whether the amount is proportionate to the anticipated harm, not whether the clause is labeled as a 'penalty' or 'liquidated damages.'",
    redFlags: [
      "Amount is grossly disproportionate to any conceivable actual loss",
      "The clause is explicitly labeled as a 'penalty'",
      "Same penalty amount applies regardless of the severity of the breach",
      "No relationship between the penalty amount and the contract value",
      "Penalty increases exponentially over time",
    ],
    relatedTermSlugs: ["liquidated-damages", "breach", "damages"],
    relatedToolIds: ["late-fee-calculator", "contract-red-flag-scanner"],
    faqs: [
      { question: "What's the difference between a penalty clause and liquidated damages?", answer: "Liquidated damages are a genuine pre-estimate of the loss likely to be suffered from a breach — they're enforceable. Penalty clauses are designed to punish the breaching party with an amount that bears no reasonable relationship to actual losses — they're unenforceable." },
      { question: "How do courts decide if a clause is a penalty?", answer: "Courts look at whether the amount was a reasonable estimate of anticipated damages at the time the contract was formed, whether actual damages would be difficult to calculate, and whether the amount is proportionate to the breach. Labels don't matter — a clause called 'liquidated damages' can still be a penalty." },
    ],
  },
  {
    slug: "price-adjustment-clause",
    title: "Price Adjustment Clause",
    category: "Commercial",
    explanation: "A price adjustment clause allows the contract price to change during the term based on defined triggers or formulas. Common mechanisms include cost-of-living adjustments (COLA) tied to CPI, raw material price indexes, currency fluctuations, or periodic market rate reviews. These clauses are essential in long-term contracts to prevent either party from being locked into pricing that becomes commercially unreasonable.",
    exampleClauses: [
      "On each anniversary of the Effective Date, the unit price shall be adjusted by the percentage change in the Consumer Price Index for All Urban Consumers (CPI-U) for the preceding twelve-month period.",
      "If the cost of raw materials increases by more than ten percent (10%) from the baseline price set forth in Exhibit A, Supplier may increase the contract price by the amount of such excess upon sixty (60) days' written notice.",
    ],
    enforceabilityNotes: "Price adjustment clauses are enforceable when they reference objective, verifiable benchmarks. Vague provisions allowing unilateral price increases 'at the supplier's discretion' are more likely to be challenged. Courts look for definite formulas or standards that both parties can verify.",
    redFlags: [
      "Unilateral price adjustment at one party's sole discretion",
      "No cap on price increases",
      "No right to terminate if prices increase beyond a certain threshold",
      "Adjustment formula that only allows prices to go up, never down",
      "No advance notice of price changes",
    ],
    relatedTermSlugs: ["consideration", "breach", "good-faith"],
    relatedToolIds: ["rent-increase-calculator", "contract-value-calculator"],
    faqs: [
      { question: "What's the best index to use for price adjustments?", answer: "CPI-U is the most common general index. For specific industries, use relevant indexes like PPI (Producer Price Index) for manufacturing, or commodity-specific indexes for raw materials. The key is choosing an objective, publicly available benchmark that reflects actual cost drivers." },
      { question: "Can I refuse to pay a price increase?", answer: "Only if the increase doesn't comply with the contract terms. If the adjustment follows the agreed formula, you're generally bound to pay. If there's no formula and the increase is unilateral, you may have grounds to dispute it." },
    ],
  },
  {
    slug: "right-to-audit-clause",
    title: "Right to Audit Clause",
    category: "Compliance",
    explanation: "A right to audit clause gives one party the right to examine the other party's books, records, and operations to verify compliance with the contract terms. These clauses are essential in cost-plus contracts, royalty agreements, franchise agreements, and any arrangement where payments are based on reported figures. They serve as both a deterrent against fraud and a mechanism for ensuring accuracy.",
    exampleClauses: [
      "Upon reasonable notice, Licensor shall have the right to audit Licensee's books and records related to this Agreement no more than once per calendar year. If an audit reveals an underpayment of more than five percent (5%), Licensee shall bear the cost of the audit.",
      "The Company reserves the right to audit Supplier's facilities, records, and processes at any time during regular business hours to verify compliance with the quality standards and regulatory requirements set forth herein.",
    ],
    enforceabilityNotes: "Right to audit clauses are standard and enforceable. Courts readily enforce audit rights, especially when they're tied to financial accuracy or regulatory compliance. The clause should balance the need for oversight with the audited party's operational burden.",
    redFlags: [
      "No limit on audit frequency (potential for harassment)",
      "Audit costs always borne by the audited party regardless of findings",
      "No notice requirement before conducting an audit",
      "Audit scope extends beyond what's relevant to the contract",
      "No confidentiality obligations for audit findings",
    ],
    relatedTermSlugs: ["good-faith", "breach", "damages"],
    relatedToolIds: ["business-expense-tracker", "contract-checklist-generator"],
    faqs: [
      { question: "How often can audits be conducted?", answer: "Typically once per year. More frequent audits may be allowed if a previous audit uncovered discrepancies. The contract should specify maximum frequency and reasonable notice requirements (usually 15-30 days)." },
      { question: "Who pays for the audit?", answer: "Usually the party requesting the audit pays. However, most clauses include a provision that if the audit reveals a material discrepancy (typically 3-5%), the audited party pays for the audit." },
    ],
  },
  {
    slug: "right-of-first-offer-clause",
    title: "Right of First Offer Clause",
    category: "Commercial",
    explanation: "A right of first offer (ROFO) requires a party to offer an asset or opportunity to the ROFO holder before seeking offers from third parties. Unlike a right of first refusal (where the holder matches a third-party offer), a ROFO requires the seller to give the holder the first opportunity to make an offer. If the holder declines or the parties can't agree on terms, the seller can then seek third-party offers.",
    exampleClauses: [
      "Before offering the Property for sale to any third party, Owner shall first notify Tenant and offer Tenant the opportunity to purchase the Property. Tenant shall have thirty (30) days to submit a purchase offer.",
      "If any Member wishes to transfer their Membership Interest, they shall first offer such Interest to the remaining Members at a price determined by the valuation methodology set forth in Exhibit C.",
    ],
    enforceabilityNotes: "Rights of first offer are generally enforceable when clearly drafted. They're considered less restrictive than rights of first refusal because they don't require matching a specific third-party offer. Courts enforce them as standard contract provisions between commercial parties.",
    redFlags: [
      "No defined timeline for the ROFO holder to respond",
      "No objective valuation methodology or pricing mechanism",
      "ROFO that perpetually blocks the seller from approaching the market",
      "No expiration of the ROFO after the holder's initial refusal",
      "Unclear whether the ROFO resets if the seller changes terms for third parties",
    ],
    relatedTermSlugs: ["good-faith", "consideration", "privity"],
    relatedToolIds: ["lease-analyzer", "contract-red-flag-scanner"],
    faqs: [
      { question: "What's the advantage of a ROFO over a ROFR?", answer: "A ROFO is less chilling to third-party interest because the seller can approach the market if the ROFO holder declines. With a ROFR, third parties know their offer can be matched, which discourages competitive bidding." },
      { question: "What happens if the ROFO holder makes an offer the seller rejects?", answer: "The seller can then seek third-party offers. Many ROFO clauses require the seller to sell to a third party at a price equal to or higher than the ROFO holder's rejected offer within a specified time period." },
    ],
  },
  {
    slug: "survival-clause",
    title: "Survival Clause",
    category: "General",
    explanation: "A survival clause specifies which provisions of a contract continue to be effective after the contract terminates or expires. Without a survival clause, all rights and obligations generally end when the contract ends. Commonly surviving provisions include confidentiality, indemnification, limitation of liability, intellectual property ownership, non-compete obligations, and dispute resolution.",
    exampleClauses: [
      "The following provisions shall survive termination or expiration of this Agreement: Sections 5 (Confidentiality), 8 (Indemnification), 9 (Limitation of Liability), 11 (Governing Law), and 12 (Dispute Resolution).",
      "Any provisions of this Agreement that by their nature are intended to survive termination, including but not limited to confidentiality, intellectual property rights, and payment obligations for work performed prior to termination, shall survive indefinitely or for the period specified therein.",
    ],
    enforceabilityNotes: "Survival clauses are universally enforceable. Courts look to the survival clause to determine which obligations persist after termination. If the clause is missing or unclear, courts apply general contract principles, which may lead to unpredictable results.",
    redFlags: [
      "No survival clause at all (creates uncertainty about post-termination rights)",
      "All provisions survive indefinitely (overly broad and impractical)",
      "Key protective provisions (like indemnification) don't survive",
      "Inconsistent survival periods for related provisions",
      "Non-compete survives termination without time limitation",
    ],
    relatedTermSlugs: ["termination", "non-disclosure", "indemnity"],
    relatedToolIds: ["contract-checklist-generator", "clause-finder"],
    faqs: [
      { question: "Which provisions should survive termination?", answer: "At minimum: confidentiality, indemnification, limitation of liability, IP ownership, payment for work done, governing law, and dispute resolution. Non-compete and non-solicitation clauses typically also survive for their stated duration." },
      { question: "Do survival clauses have time limits?", answer: "They can. Some obligations survive indefinitely (like IP ownership), while others survive for a defined period (like confidentiality for 3-5 years). Best practice is to specify the survival period for each provision." },
    ],
  },
  {
    slug: "tag-along-clause",
    title: "Tag-Along Clause",
    category: "Corporate",
    explanation: "A tag-along clause (also called co-sale right) gives minority shareholders the right to join a sale when a majority shareholder sells their shares. If the majority shareholder finds a buyer, the minority shareholders can 'tag along' and sell their shares on the same terms and conditions. This protects minority shareholders from being left behind in a company with new, potentially unfavorable controlling owners.",
    exampleClauses: [
      "If any Majority Shareholder proposes to sell shares to a third party, the Minority Shareholders shall have the right to participate in such sale on the same terms and conditions, pro rata based on their ownership percentage.",
      "Upon receipt of a Tag-Along Notice, each Minority Holder may elect to include up to their proportionate share of the offered shares in the proposed transaction at the same price per share.",
    ],
    enforceabilityNotes: "Tag-along clauses are standard and enforceable in shareholders' agreements. Courts treat them as negotiated protections for minority shareholders. The clause should clearly define the triggering sale threshold, notice requirements, and the pro-rata calculation method.",
    redFlags: [
      "Tag-along right doesn't apply to all types of transfers (e.g., excludes indirect sales)",
      "Insufficient notice period for minority shareholders to exercise their rights",
      "No penalty for majority shareholders who complete a sale without honoring tag-along",
      "Tag-along doesn't apply to transfers between affiliates or related parties",
      "No provision for what happens if the buyer won't purchase minority shares",
    ],
    relatedTermSlugs: ["capacity", "consideration", "privity"],
    relatedToolIds: ["partnership-split-calculator", "contract-red-flag-scanner"],
    faqs: [
      { question: "How do tag-along and drag-along rights work together?", answer: "They're complementary protections. Tag-along protects minority shareholders (right to join a sale). Drag-along protects majority shareholders (right to force minority to sell). Most shareholders' agreements include both to balance everyone's interests." },
      { question: "What if the buyer doesn't want to buy minority shares?", answer: "Most tag-along clauses require the selling shareholder to reduce their own sale proportionally to accommodate the minority's participation, or to not proceed with the sale at all." },
    ],
  },
  {
    slug: "time-is-of-the-essence-clause",
    title: "Time Is of the Essence Clause",
    category: "General",
    explanation: "A 'time is of the essence' clause makes strict compliance with deadlines a material term of the contract. Without this clause, courts generally allow parties reasonable flexibility with timing, and minor delays don't constitute a material breach. With it, any failure to meet a deadline — even by a single day — gives the non-breaching party the right to terminate and seek damages.",
    exampleClauses: [
      "Time is of the essence with respect to all dates and time periods set forth in this Agreement. Failure to perform any obligation by the specified date shall constitute a material breach.",
      "The parties acknowledge and agree that time is of the essence in the performance of their respective obligations under this Agreement, and that any delay in performance shall entitle the non-defaulting party to exercise all remedies available at law or in equity.",
    ],
    enforceabilityNotes: "Time is of the essence clauses are enforceable when clearly stated. Courts take them seriously and will treat late performance as a material breach. However, a party who accepts late performance without objection may waive the time-is-of-the-essence provision through their conduct.",
    redFlags: [
      "Blanket application to all deadlines (some may not warrant strict enforcement)",
      "No cure period for minor delays",
      "Combined with disproportionate liquidated damages for late performance",
      "Applies to deadlines that are unrealistic or depend on the other party's cooperation",
      "One-sided application (only applies to one party's obligations)",
    ],
    relatedTermSlugs: ["breach", "termination", "waiver"],
    relatedToolIds: ["contract-expiration-tracker", "notice-period"],
    faqs: [
      { question: "What happens if I'm late on a deadline with this clause?", answer: "Even a minor delay can constitute a material breach, giving the other party the right to terminate the contract and sue for damages. This is why these clauses are so significant — they eliminate the flexibility courts normally allow for timing." },
      { question: "Can the time-is-of-the-essence requirement be waived?", answer: "Yes, through conduct. If the non-breaching party accepts late performance without objection, they may be deemed to have waived the time requirement. To preserve the clause, promptly object to any delay in writing." },
    ],
  },
  {
    slug: "tolling-clause",
    title: "Tolling Clause",
    category: "Legal Process",
    explanation: "A tolling clause suspends (pauses) the running of the statute of limitations or other contractual deadlines for a specified period or during certain events. Tolling agreements are common when parties are negotiating a settlement and want to preserve their litigation rights without the pressure of an expiring deadline. They can also appear in contracts to extend deadlines during force majeure events or disputes.",
    exampleClauses: [
      "The parties agree that the applicable statute of limitations for any claims arising under this Agreement shall be tolled during the period beginning on the date of written notice of a claim and ending sixty (60) days after the conclusion of any mediation or negotiation process.",
      "During any period in which performance is suspended due to a Force Majeure Event, all contractual deadlines and limitation periods shall be tolled for the duration of the suspension.",
    ],
    enforceabilityNotes: "Tolling agreements are generally enforceable as voluntary contracts. Courts uphold them because they serve the public policy of encouraging settlement negotiations. The tolling period should be clearly defined with specific start and end dates or triggering events.",
    redFlags: [
      "No defined end date for the tolling period",
      "Tolling that only benefits one party",
      "Unclear what deadlines or limitations are being tolled",
      "No ability to terminate the tolling agreement with reasonable notice",
      "Tolling extends beyond the original limitation period without cap",
    ],
    relatedTermSlugs: ["statute-of-limitations", "force-majeure", "breach"],
    relatedToolIds: ["statute-of-limitations-lookup", "cancellation-deadline"],
    faqs: [
      { question: "Why would I agree to a tolling agreement?", answer: "To preserve your right to sue while exploring settlement. Without tolling, you might have to file a lawsuit just to protect the deadline, even if both parties prefer to negotiate. Tolling gives everyone time to talk without the pressure of an expiring clock." },
      { question: "Can I end a tolling agreement early?", answer: "Yes, if the agreement includes a termination provision, which most do. Typically, either party can end the tolling with written notice, after which the clock resumes (not restarts) with any remaining time." },
    ],
  },
  {
    slug: "venue-clause",
    title: "Venue Clause",
    category: "Dispute Resolution",
    explanation: "A venue clause specifies the geographic location (city, county, or state) where legal proceedings must or may be filed. While similar to a forum selection clause, venue is specifically about geographic location, while forum selection can also designate a type of court (federal vs. state). Venue clauses reduce litigation costs and uncertainty by preventing disputes from being filed in unexpected or inconvenient locations.",
    exampleClauses: [
      "The parties agree that the exclusive venue for any legal action arising out of this Agreement shall be the state or federal courts located in Cook County, Illinois.",
      "Any action or proceeding arising under this Agreement shall be venued in the courts of competent jurisdiction in the City of London, England.",
    ],
    enforceabilityNotes: "Venue clauses are generally enforceable under the M/S Bremen framework. Courts may deny enforcement if the chosen venue is seriously inconvenient, if the clause was procured through fraud, or if enforcement would contravene public policy. Consumer contracts may receive additional scrutiny.",
    redFlags: [
      "Venue in a location with no connection to either party or the contract",
      "Mandatory venue combined with choice of law from a different jurisdiction",
      "Venue that would effectively prevent the weaker party from pursuing claims",
      "No distinction between mandatory and permissive venue",
      "Venue clause conflicts with an arbitration clause in the same contract",
    ],
    relatedTermSlugs: ["jurisdiction", "venue", "forum-selection"],
    relatedToolIds: ["clause-finder", "contract-checklist-generator"],
    faqs: [
      { question: "What's the difference between venue and jurisdiction?", answer: "Jurisdiction is the court's authority to hear a case (subject matter and personal jurisdiction). Venue is the geographic location where the case is filed. A court might have jurisdiction but be an improper venue, or vice versa." },
      { question: "Can I challenge an inconvenient venue clause?", answer: "Yes, through a motion to transfer venue based on forum non conveniens. You must show the chosen venue is seriously inconvenient and that another venue would be more appropriate. Success depends on the facts and the court's discretion." },
    ],
  },
];

export function getLegalClauseBySlug(slug: string): LegalClause | undefined {
  return legalClauses.find((c) => c.slug === slug);
}

export function getAllLegalClauseSlugs(): string[] {
  return legalClauses.map((c) => c.slug);
}

export function getLegalClausesByCategory(category: string): LegalClause[] {
  return legalClauses.filter((c) => c.category === category);
}

export function getLegalClauseCategories(): string[] {
  return [...new Set(legalClauses.map((c) => c.category))].sort();
}

export function searchLegalClauses(query: string): LegalClause[] {
  const q = query.toLowerCase();
  return legalClauses.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.explanation.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );
}
