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
