export interface ContractType {
  slug: string;
  title: string;
  category: string;
  description: string;
  keyClauseSlugs: string[];
  commonRisks: string[];
  relatedToolIds: string[];
  faqs: { question: string; answer: string }[];
}

export const contractTypes: ContractType[] = [
  {
    slug: "nda",
    title: "Non-Disclosure Agreement (NDA)",
    category: "Business",
    description: "A Non-Disclosure Agreement (NDA) is a legally binding contract that establishes a confidential relationship between parties. The party receiving confidential information agrees not to disclose it to third parties and to use it only for agreed purposes. NDAs are used before discussing business deals, hiring contractors, sharing trade secrets, and during merger negotiations.\n\nNDAs can be mutual (both parties share and protect information) or one-way (only one party discloses). Key provisions include the definition of confidential information, exclusions, the duration of the obligation, permitted disclosures, and remedies for breach. A well-drafted NDA should clearly define what's covered and what's not.\n\nNDAs are often the first legal document exchanged in any business relationship. They set the tone for the relationship and provide essential protection for proprietary information, trade secrets, and competitive intelligence.",
    keyClauseSlugs: ["confidentiality-clause", "termination-clause", "governing-law-clause", "severability-clause", "entire-agreement-clause"],
    commonRisks: [
      "Overly broad definition of confidential information that restricts normal business activities",
      "One-sided NDA when both parties are sharing information",
      "No exclusions for publicly available or independently developed information",
      "Indefinite term without justification",
      "No provisions for legally compelled disclosure (subpoenas, court orders)",
      "Penalties that exceed actual damages (may be unenforceable)"
    ],
    relatedToolIds: ["nda-generator", "clause-finder", "jargon-translator"],
    faqs: [
      { question: "When do I need an NDA?", answer: "Before sharing any proprietary information: business plans, financial data, trade secrets, customer lists, or technical specifications. Common scenarios include investor discussions, vendor evaluations, and hiring." },
      { question: "Should I use a mutual or one-way NDA?", answer: "Use a mutual NDA when both parties will share confidential information. Use a one-way NDA when only one party is disclosing. When in doubt, a mutual NDA is safer and more equitable." },
      { question: "How long should an NDA last?", answer: "The confidentiality obligation typically lasts 2-5 years. Trade secrets may warrant indefinite protection. The term should match the expected useful life of the information." },
    ],
  },
  {
    slug: "employment-contract",
    title: "Employment Contract",
    category: "Employment",
    description: "An employment contract is an agreement between an employer and employee that defines the terms and conditions of employment. It covers compensation, benefits, job responsibilities, termination conditions, and post-employment restrictions. While at-will employment is the default in most U.S. states, written employment contracts provide clarity and protection for both parties.\n\nKey provisions include: job title and description, compensation and benefits, work schedule and location, termination provisions (including notice periods and severance), intellectual property assignment, confidentiality obligations, non-compete and non-solicitation restrictions, and dispute resolution.\n\nEmployment contracts range from simple offer letters to comprehensive agreements with dozens of pages. The complexity should match the level of the position and the sensitivity of the role. Executive employment agreements typically include detailed termination provisions, change-of-control protections, and equity compensation terms.",
    keyClauseSlugs: ["non-compete-clause", "confidentiality-clause", "intellectual-property-clause", "termination-clause", "non-solicitation-clause", "arbitration-clause"],
    commonRisks: [
      "Overly broad non-compete that may be unenforceable",
      "Intellectual property clause that covers personal projects outside work",
      "No clear severance or termination benefits",
      "Mandatory arbitration that waives important employee rights",
      "Unclear performance metrics or grounds for termination",
      "Non-solicitation that prevents normal professional networking"
    ],
    relatedToolIds: ["non-compete", "clause-finder", "freelance-rate"],
    faqs: [
      { question: "Is an offer letter the same as an employment contract?", answer: "An offer letter is a simpler form of employment contract. It typically covers key terms (salary, start date, position) but may not address all issues that a comprehensive employment agreement would." },
      { question: "Can an employer change the terms of an employment contract?", answer: "Generally not without the employee's consent. Material changes may require new consideration (like a raise) to be enforceable. Check your contract for provisions allowing modification." },
      { question: "What's 'at-will' employment?", answer: "At-will means either party can end the employment at any time, for any legal reason, with or without notice. A written contract can modify at-will status with specific termination provisions." },
    ],
  },
  {
    slug: "freelance-agreement",
    title: "Freelance / Independent Contractor Agreement",
    category: "Employment",
    description: "A freelance agreement (or independent contractor agreement) defines the relationship between a client and an independent contractor. It's critical for establishing that the worker is a contractor, not an employee — a distinction that affects taxes, benefits, liability, and legal rights.\n\nKey provisions include: scope of work, compensation and payment terms, project timeline and deliverables, intellectual property ownership, confidentiality, termination, liability and indemnification, and independent contractor status confirmation.\n\nThe IRS and state agencies scrutinize independent contractor classifications. Misclassification can result in back taxes, penalties, and liability for employee benefits. The agreement should clearly establish the contractor's independence: control over how work is performed, use of own tools and equipment, ability to work for other clients, and responsibility for own taxes and insurance.",
    keyClauseSlugs: ["intellectual-property-clause", "payment-terms-clause", "confidentiality-clause", "termination-clause", "indemnification-clause", "limitation-of-liability"],
    commonRisks: [
      "Worker misclassification — treating an employee as a contractor",
      "Unclear IP ownership leading to disputes over work product",
      "No payment terms or excessively long payment periods",
      "Overly restrictive non-compete that contradicts contractor status",
      "No liability cap for the contractor's work",
      "Scope creep without additional compensation"
    ],
    relatedToolIds: ["freelance-rate", "invoice-interest", "nda-generator"],
    faqs: [
      { question: "What makes someone an independent contractor vs. employee?", answer: "Key factors include: control over how work is done (contractors control their own methods), use of own equipment, ability to work for multiple clients, no employee benefits, and payment by project rather than salary." },
      { question: "Who owns the work product?", answer: "Without a contract, the default depends on the situation. Under copyright law, independent contractors typically own their work unless it's assigned in writing. The contract should clearly address IP ownership." },
      { question: "Do I need insurance as a freelancer?", answer: "It's highly recommended. General liability insurance and professional liability (E&O) insurance protect against claims from your work. Some clients require proof of insurance before engaging you." },
    ],
  },
  {
    slug: "lease-agreement",
    title: "Lease Agreement",
    category: "Real Estate",
    description: "A lease agreement is a contract between a property owner (landlord) and a tenant that grants the tenant the right to use the property for a specified period in exchange for rent. Lease agreements can cover residential, commercial, or industrial properties, each with different legal requirements and common provisions.\n\nResidential leases are heavily regulated by state and local laws, including rent control ordinances, habitability requirements, security deposit limits, and eviction procedures. Commercial leases have fewer regulatory protections and are more heavily negotiated.\n\nKey provisions include: rent amount and payment terms, lease term and renewal options, security deposit, maintenance responsibilities, permitted use, subletting and assignment, insurance requirements, and termination conditions. Commercial leases also address tenant improvements, operating expense pass-throughs (NNN, modified gross, full-service), and signage rights.",
    keyClauseSlugs: ["termination-clause", "notice-clause", "insurance-clause", "assignment-clause", "governing-law-clause"],
    commonRisks: [
      "Automatic renewal without adequate notice period",
      "Unlimited landlord access without reasonable notice",
      "Tenant responsible for structural repairs",
      "Excessive penalties for early termination",
      "Unclear responsibility for utilities and maintenance",
      "No provision for subletting or assignment"
    ],
    relatedToolIds: ["notice-period", "cancellation-deadline", "late-fee"],
    faqs: [
      { question: "Can a landlord raise rent during the lease term?", answer: "Generally not unless the lease allows it (like an annual escalation clause). After the lease term expires, the landlord can raise rent with proper notice, subject to any rent control regulations." },
      { question: "What's the difference between a lease and a rental agreement?", answer: "A lease typically has a fixed term (e.g., 12 months). A rental agreement is usually month-to-month. Leases provide more stability; rental agreements provide more flexibility." },
      { question: "What is 'NNN' (triple net)?", answer: "In a triple net lease, the tenant pays base rent plus property taxes, insurance, and common area maintenance (CAM). This passes most operating costs to the tenant. It's common in commercial real estate." },
    ],
  },
  {
    slug: "saas-agreement",
    title: "SaaS (Software as a Service) Agreement",
    category: "Technology",
    description: "A SaaS agreement governs the use of cloud-based software services. Unlike traditional software licenses where the customer buys and installs software, SaaS agreements provide access to hosted software on a subscription basis. The provider maintains the software, infrastructure, and data security.\n\nKey provisions include: service description and features, subscription terms and pricing, service level agreements (SLAs) with uptime guarantees, data ownership and portability, data security and privacy, intellectual property rights, limitation of liability, and termination with data return/deletion.\n\nSaaS agreements must address unique issues: what happens to data if the service is discontinued, how data is backed up and recovered, what security certifications the provider maintains, how the service integrates with other systems, and what happens during outages.",
    keyClauseSlugs: ["limitation-of-liability", "data-protection-clause", "intellectual-property-clause", "termination-clause", "warranty-clause", "payment-terms-clause"],
    commonRisks: [
      "No guaranteed uptime or SLA credits for downtime",
      "Vendor lock-in with no data portability provisions",
      "Unclear data ownership — who owns the data you put in?",
      "Auto-renewal with significant price increases",
      "Inadequate data security commitments",
      "No compensation for data loss"
    ],
    relatedToolIds: ["tos-generator", "privacy-generator", "clause-finder"],
    faqs: [
      { question: "Who owns the data in a SaaS application?", answer: "The customer should own their data. The SaaS agreement should explicitly state that the customer retains all rights to their data and that the provider only has a limited license to host and process it." },
      { question: "What is an SLA?", answer: "A Service Level Agreement defines the provider's uptime commitment (e.g., 99.9%), how downtime is measured, and what credits or remedies are available if the SLA is breached." },
      { question: "What happens to my data if the SaaS provider goes out of business?", answer: "This should be addressed in the contract. Good SaaS agreements include data portability rights, advance notice of service discontinuation, and a transition period for data extraction." },
    ],
  },
  {
    slug: "consulting-agreement",
    title: "Consulting Agreement",
    category: "Business",
    description: "A consulting agreement defines the terms under which a consultant provides expert advice, analysis, or specialized services to a client. Unlike employment contracts, consulting agreements establish an independent contractor relationship where the consultant maintains control over how the work is performed.\n\nKey provisions include: scope of services (detailed description of deliverables and expectations), compensation structure (hourly, fixed fee, retainer, or milestone-based), expenses and reimbursement, intellectual property ownership, confidentiality, non-solicitation, liability and indemnification, and termination.\n\nConsulting agreements should be specific about deliverables and expectations to prevent scope creep. Clear milestones, acceptance criteria, and change order procedures help manage the engagement effectively and prevent disputes over what was promised vs. what was delivered.",
    keyClauseSlugs: ["intellectual-property-clause", "confidentiality-clause", "payment-terms-clause", "termination-clause", "indemnification-clause", "non-solicitation-clause"],
    commonRisks: [
      "Vague scope of work leading to scope creep",
      "No change order process for additional work",
      "Overly broad IP assignment covering consultant's pre-existing IP",
      "No cap on liability",
      "Payment contingent on subjective 'satisfaction'",
      "Non-compete that prevents consultant from serving other clients"
    ],
    relatedToolIds: ["freelance-rate", "invoice-interest", "nda-generator"],
    faqs: [
      { question: "How is a consulting agreement different from an employment contract?", answer: "A consultant is an independent contractor who controls how the work is done, uses their own tools, can work for other clients, and is responsible for their own taxes and insurance." },
      { question: "Should I charge hourly or fixed fee?", answer: "Hourly works best for ongoing advisory roles or when scope is uncertain. Fixed fee works best for well-defined projects with clear deliverables. Many consultants use retainer arrangements for ongoing availability." },
      { question: "Who owns the work product?", answer: "This must be specified in the contract. Options include: full assignment to the client, client license with consultant retaining ownership, or shared ownership. The default (without a contract) varies by jurisdiction." },
    ],
  },
  {
    slug: "partnership-agreement",
    title: "Partnership Agreement",
    category: "Business",
    description: "A partnership agreement defines the terms of a business partnership, including each partner's rights, responsibilities, contributions, and share of profits and losses. Without a written partnership agreement, partners are subject to default rules under state law, which may not align with their intentions.\n\nKey provisions include: capital contributions, profit and loss sharing, management and decision-making authority, partner compensation and distributions, admission of new partners, withdrawal and retirement of partners, dissolution procedures, non-compete obligations, and dispute resolution.\n\nPartnership agreements should address what happens when things go wrong: a partner wants to leave, partners disagree on a major decision, a partner dies or becomes incapacitated, or the business needs to be dissolved. Buy-sell provisions and valuation methods are particularly important for ensuring smooth transitions.",
    keyClauseSlugs: ["dispute-resolution-clause", "non-compete-clause", "confidentiality-clause", "termination-clause", "governing-law-clause"],
    commonRisks: [
      "No written agreement (relying on default state law rules)",
      "Unclear profit and loss sharing arrangements",
      "No buy-sell provisions for partner exits",
      "Deadlock situations with 50/50 decision-making",
      "Joint and several liability for partnership debts",
      "No valuation method for partner buyouts"
    ],
    relatedToolIds: ["nda-generator", "clause-finder", "jargon-translator"],
    faqs: [
      { question: "Do I need a written partnership agreement?", answer: "While not legally required (oral partnerships are valid), a written agreement is strongly recommended. Without one, state default rules apply, and partners may disagree about terms they assumed but never formalized." },
      { question: "What's the difference between a general and limited partnership?", answer: "In a general partnership, all partners have management authority and personal liability. In a limited partnership, limited partners contribute capital but don't manage and have limited liability." },
      { question: "How are partnerships taxed?", answer: "Partnerships are 'pass-through' entities — the partnership itself doesn't pay income tax. Instead, profits and losses flow through to individual partners' personal tax returns." },
    ],
  },
  {
    slug: "purchase-agreement",
    title: "Purchase Agreement (Sale of Goods)",
    category: "Commercial",
    description: "A purchase agreement governs the sale of goods between a buyer and seller. It defines the goods being sold, the price, delivery terms, payment terms, warranties, and the rights and remedies of each party. For significant purchases, a well-drafted agreement protects both parties from disputes about what was promised.\n\nPurchase agreements for goods are governed by Article 2 of the Uniform Commercial Code (UCC), which provides default rules for sales transactions. The UCC applies unless the parties agree to different terms in their contract.\n\nKey provisions include: description and quantity of goods, price and payment terms, delivery terms (FOB shipping point vs. destination), inspection and acceptance procedures, warranties (express and implied), risk of loss, and remedies for breach. International sales may be governed by the United Nations Convention on Contracts for the International Sale of Goods (CISG).",
    keyClauseSlugs: ["warranty-clause", "payment-terms-clause", "limitation-of-liability", "indemnification-clause", "force-majeure-clause", "governing-law-clause"],
    commonRisks: [
      "Vague product specifications leading to quality disputes",
      "No inspection period or acceptance procedure",
      "Risk of loss unclear during shipping",
      "All implied warranties disclaimed without understanding the implications",
      "No remedies for non-conforming goods",
      "Payment due before inspection"
    ],
    relatedToolIds: ["refund-checker", "late-fee", "clause-finder"],
    faqs: [
      { question: "What is FOB?", answer: "FOB (Free on Board) determines when risk of loss transfers. FOB Shipping Point means risk transfers when goods leave the seller's dock. FOB Destination means risk transfers when goods arrive at the buyer's location." },
      { question: "What is the UCC?", answer: "The Uniform Commercial Code is a set of standardized laws governing commercial transactions in the U.S. Article 2 specifically covers the sale of goods." },
      { question: "Can I return non-conforming goods?", answer: "Under the UCC, you have the right to inspect goods upon delivery and reject non-conforming goods. The contract may modify these rights, so check the acceptance and rejection provisions carefully." },
    ],
  },
  {
    slug: "service-agreement",
    title: "Service Agreement",
    category: "Business",
    description: "A service agreement defines the terms under which one party provides services to another. It covers the scope of services, performance standards, pricing, timeline, intellectual property rights, liability, and termination. Service agreements range from simple one-page documents to comprehensive master service agreements (MSAs) with multiple statements of work (SOWs).\n\nUnlike goods (which are covered by the UCC), services are governed by common law contract principles. This means the parties have more freedom to define their terms, but also less default protection if the contract is silent on an issue.\n\nFor ongoing service relationships, many businesses use a Master Service Agreement (MSA) that establishes general terms, combined with individual Statements of Work (SOWs) that define specific projects, timelines, and pricing. This structure allows flexibility for new projects without renegotiating the entire agreement each time.",
    keyClauseSlugs: ["payment-terms-clause", "termination-clause", "limitation-of-liability", "indemnification-clause", "confidentiality-clause", "warranty-clause"],
    commonRisks: [
      "Vague scope of services leading to disputes about what's included",
      "No service level standards or acceptance criteria",
      "Time-and-materials pricing with no cap",
      "Client owns all IP including service provider's tools and methods",
      "No limitation of liability",
      "No change order process for scope changes"
    ],
    relatedToolIds: ["freelance-rate", "invoice-interest", "clause-finder"],
    faqs: [
      { question: "What's the difference between an MSA and SOW?", answer: "A Master Service Agreement (MSA) establishes general terms for the relationship. A Statement of Work (SOW) defines a specific project under the MSA, including scope, timeline, and pricing. This allows multiple projects under one set of general terms." },
      { question: "Should services be time-and-materials or fixed price?", answer: "T&M works best when scope is uncertain or evolving. Fixed price works best for well-defined deliverables. Consider a hybrid: fixed price for defined deliverables with T&M for additional requests." },
      { question: "What service level standards should I include?", answer: "Define measurable standards: response times, quality benchmarks, deliverable formats, revision limits, and acceptance criteria. Vague standards like 'professional quality' are hard to enforce." },
    ],
  },
  {
    slug: "licensing-agreement",
    title: "Licensing Agreement",
    category: "IP",
    description: "A licensing agreement grants one party (the licensee) the right to use another party's (the licensor's) intellectual property — such as patents, trademarks, copyrights, or trade secrets — under specified conditions. The licensor retains ownership while the licensee gains usage rights.\n\nLicensing agreements are used for: software licensing, trademark licensing (brand franchising), patent licensing (technology transfer), content licensing (media, music, images), and trade secret licensing.\n\nKey provisions include: the specific IP being licensed, the scope of the license (exclusive vs. non-exclusive, territory, duration), royalty or fee structure, quality control standards, sublicensing rights, reporting and audit rights, infringement responsibilities, and termination and IP return provisions.",
    keyClauseSlugs: ["intellectual-property-clause", "payment-terms-clause", "warranty-clause", "termination-clause", "governing-law-clause", "confidentiality-clause"],
    commonRisks: [
      "Exclusive license without adequate minimum royalties or performance requirements",
      "No quality control standards for trademark licenses (can lead to abandonment)",
      "Unclear sublicensing rights",
      "No audit rights to verify royalty calculations",
      "License scope too broad or too narrow for intended use",
      "No provisions for IP improvements or modifications"
    ],
    relatedToolIds: ["clause-finder", "jargon-translator", "nda-generator"],
    faqs: [
      { question: "What's the difference between exclusive and non-exclusive licenses?", answer: "An exclusive license gives only the licensee the right to use the IP (even the licensor can't use it). A non-exclusive license allows the licensor to grant the same rights to others. A sole license is in between — only the licensee and licensor can use it." },
      { question: "How are license fees typically structured?", answer: "Common structures include: one-time lump sum, ongoing royalties (percentage of revenue), per-unit fees, minimum annual fees plus royalties, and subscription-based fees." },
      { question: "What happens to the license if the licensor goes bankrupt?", answer: "Under the Bankruptcy Code (Section 365(n)), licensees have the right to retain their rights under the license if the licensor's bankruptcy trustee rejects the agreement." },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service (ToS)",
    category: "Technology",
    description: "Terms of Service (also called Terms of Use or Terms and Conditions) are the rules and guidelines that users must agree to in order to use a website, app, or service. They create a legally binding agreement between the service provider and its users, defining acceptable use, intellectual property rights, liability limitations, and dispute resolution.\n\nToS documents serve several purposes: they protect the service provider from liability, set user expectations, establish rules of conduct, address intellectual property rights, and comply with legal requirements.\n\nKey provisions include: acceptable use policy, user-generated content rights, intellectual property ownership, privacy (often referencing a separate privacy policy), disclaimers and limitation of liability, termination and account suspension, dispute resolution (often mandatory arbitration), and governing law.",
    keyClauseSlugs: ["limitation-of-liability", "arbitration-clause", "intellectual-property-clause", "termination-clause", "governing-law-clause", "waiver-of-jury-trial"],
    commonRisks: [
      "Overly broad license to user-generated content",
      "Mandatory arbitration without class action waiver disclosure",
      "Unilateral right to change terms without notice",
      "Disclaimer of all warranties (may violate consumer protection laws)",
      "No procedure for account termination appeal",
      "Privacy practices not aligned with privacy policy"
    ],
    relatedToolIds: ["tos-generator", "privacy-generator", "clause-finder"],
    faqs: [
      { question: "Are Terms of Service legally binding?", answer: "Yes, if properly implemented. Clickwrap agreements (user must click 'I agree') are generally enforceable. Browsewrap (posted on the site but no active agreement) is harder to enforce." },
      { question: "Can I change my ToS after users agree?", answer: "Yes, but you should notify users of material changes and give them the option to accept or stop using the service. The ToS should include a provision explaining how changes will be communicated." },
      { question: "Do I need both ToS and a Privacy Policy?", answer: "Yes. They serve different purposes. ToS governs the user-service relationship. Privacy Policy addresses data collection and use, which is legally required in many jurisdictions." },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    category: "Technology",
    description: "A privacy policy is a legal document that explains how an organization collects, uses, stores, shares, and protects personal information. Privacy policies are legally required by numerous regulations including GDPR (EU), CCPA (California), and various other state and international privacy laws.\n\nA comprehensive privacy policy addresses: what personal information is collected, how it's collected (directly, automatically, from third parties), the legal basis for processing (consent, contract, legitimate interest), how information is used, who it's shared with, how it's protected, how long it's retained, users' rights regarding their data, and how the policy is updated.\n\nPrivacy policies must be clear, accessible, and accurate. Misleading or incomplete privacy policies can result in enforcement actions from regulators, lawsuits, and reputational damage. Many organizations engage privacy counsel to ensure compliance with applicable laws.",
    keyClauseSlugs: ["data-protection-clause", "governing-law-clause", "notice-clause"],
    commonRisks: [
      "Not covering all applicable privacy laws (GDPR, CCPA, etc.)",
      "Vague or incomplete description of data practices",
      "Not updating the policy when practices change",
      "No mechanism for users to exercise their data rights",
      "Sharing data with third parties not disclosed in the policy",
      "Inadequate security measures for the type of data collected"
    ],
    relatedToolIds: ["privacy-generator", "tos-generator"],
    faqs: [
      { question: "Is a privacy policy legally required?", answer: "In most cases, yes. If you collect any personal information from users, multiple laws (GDPR, CCPA, COPPA, CalOPPA) require a privacy policy. Even without legal requirements, it's best practice." },
      { question: "What's the difference between GDPR and CCPA?", answer: "GDPR is the EU's comprehensive privacy regulation requiring explicit consent and giving users extensive rights. CCPA is California's privacy law focused on transparency and the right to opt out of data sales. Both require privacy policies." },
      { question: "How often should I update my privacy policy?", answer: "Whenever your data practices change, when new laws take effect, or at minimum annually. Notify users of material changes." },
    ],
  },
  {
    slug: "joint-venture-agreement",
    title: "Joint Venture Agreement",
    category: "Business",
    description: "A joint venture agreement establishes a collaborative business arrangement between two or more parties who agree to pool resources for a specific project or business activity while maintaining their separate identities. Unlike a partnership, a joint venture is typically limited in scope and duration.\n\nJoint ventures are used for: large projects requiring combined resources, entering new markets, developing new products or technologies, sharing risks and costs of major investments, and accessing complementary skills or assets.\n\nKey provisions include: purpose and scope of the venture, contributions of each party (capital, assets, expertise), management and decision-making structure, profit and loss sharing, IP ownership and licensing between parties, exit strategies, non-compete restrictions among the venturers, and dissolution procedures.",
    keyClauseSlugs: ["confidentiality-clause", "intellectual-property-clause", "dispute-resolution-clause", "termination-clause", "non-compete-clause", "governing-law-clause"],
    commonRisks: [
      "Unclear management structure leading to deadlock",
      "Unequal contributions without corresponding profit sharing adjustments",
      "IP developed jointly with no clear ownership framework",
      "No exit mechanism or unreasonable exit restrictions",
      "Joint and several liability for venture debts",
      "Inadequate conflict of interest provisions"
    ],
    relatedToolIds: ["nda-generator", "clause-finder", "jargon-translator"],
    faqs: [
      { question: "How is a joint venture different from a partnership?", answer: "A joint venture is typically for a specific project or limited purpose, while a partnership is an ongoing business relationship. Joint venturers maintain separate identities and may have different liability exposure." },
      { question: "What structure should a joint venture use?", answer: "JVs can be structured as contractual arrangements, separate LLCs, or corporations. The choice affects liability, taxation, and governance. Most JVs between larger companies use a separate entity." },
      { question: "How are disputes typically resolved in JVs?", answer: "Given the collaborative nature, JVs typically require negotiation or mediation before arbitration. Many JV agreements include escalation procedures (managers → executives → mediation → arbitration)." },
    ],
  },
  {
    slug: "real-estate-purchase",
    title: "Real Estate Purchase Agreement",
    category: "Real Estate",
    description: "A real estate purchase agreement is a contract between a buyer and seller for the sale of real property. It's one of the most significant contracts most people will ever sign, covering the purchase price, financing terms, contingencies, closing procedures, and representations about the property's condition.\n\nReal estate transactions are governed by state-specific laws and customs that vary significantly. Many states require specific disclosures (lead paint, natural hazards, HOA information) and have unique closing procedures (some use escrow companies, others use attorneys).\n\nKey provisions include: purchase price and financing terms, earnest money deposit, contingencies (financing, inspection, appraisal, title), property disclosures, closing date and procedures, title insurance requirements, risk of loss provisions, prorations (taxes, HOA dues), and remedies for breach.",
    keyClauseSlugs: ["representations-warranties-clause", "termination-clause", "governing-law-clause", "notice-clause", "entire-agreement-clause"],
    commonRisks: [
      "Waiving inspection contingency to be competitive (accepting unknown defects)",
      "Insufficient earnest money that doesn't adequately secure the deal",
      "Financing contingency too short to secure a mortgage",
      "Unclear responsibility for repairs discovered during inspection",
      "No provision for seller's failure to disclose known defects",
      "Closing date too aggressive for the complexity of the transaction"
    ],
    relatedToolIds: ["cancellation-deadline", "notice-period", "jargon-translator"],
    faqs: [
      { question: "What happens if the buyer backs out?", answer: "It depends on the reason. If a contingency isn't met (failed inspection, denied financing), the buyer can usually cancel and get their deposit back. If the buyer simply changes their mind, they may lose their earnest money deposit." },
      { question: "What is earnest money?", answer: "A deposit (typically 1-3% of the purchase price) showing the buyer's good faith. It's held in escrow and applied toward the purchase at closing. If the buyer breaches, the seller may keep it as liquidated damages." },
      { question: "Do I need a real estate attorney?", answer: "It depends on the state. Some states require attorney involvement in real estate closings. Even in states where it's not required, an attorney can help protect your interests, especially for complex transactions." },
    ],
  },
  {
    slug: "loan-agreement",
    title: "Loan Agreement",
    category: "Financial",
    description: "A loan agreement is a contract between a lender and borrower that sets out the terms of a loan, including the principal amount, interest rate, repayment schedule, collateral requirements, and default provisions. Loan agreements range from simple promissory notes for personal loans to complex credit facilities for corporate borrowers.\n\nKey provisions include: loan amount and disbursement, interest rate (fixed or variable) and calculation method, repayment schedule, prepayment provisions and penalties, collateral and security interests, financial covenants, representations and warranties, events of default and remedies, and conditions precedent to funding.\n\nLoan agreements must comply with federal and state lending regulations, including truth-in-lending requirements (for consumer loans), usury laws (interest rate caps), and equal credit opportunity requirements. Commercial loans have fewer regulatory restrictions but more complex covenants and reporting requirements.",
    keyClauseSlugs: ["payment-terms-clause", "representations-warranties-clause", "termination-clause", "governing-law-clause", "severability-clause"],
    commonRisks: [
      "Variable interest rate without a cap",
      "Prepayment penalties that discourage early repayment",
      "Cross-default clauses triggering default under other agreements",
      "Financial covenants that are difficult to maintain",
      "Personal guarantee for a business loan",
      "Acceleration clause allowing demand for full repayment upon any default"
    ],
    relatedToolIds: ["late-fee", "invoice-interest", "jargon-translator"],
    faqs: [
      { question: "What is a variable interest rate?", answer: "A rate that changes based on a benchmark (like SOFR or prime rate). Variable rates start lower but can increase, potentially making payments unaffordable. Consider caps on rate increases." },
      { question: "What is loan acceleration?", answer: "When the lender demands repayment of the entire outstanding balance (not just missed payments) after a default event. This is one of the most powerful lender remedies." },
      { question: "What are financial covenants?", answer: "Requirements to maintain specific financial metrics (debt-to-equity ratio, minimum revenue, etc.). Breaching a covenant can trigger default, even if payments are current." },
    ],
  },
  {
    slug: "non-solicitation-agreement",
    title: "Non-Solicitation Agreement",
    category: "Employment",
    description: "A non-solicitation agreement prevents a departing employee or contractor from soliciting the company's clients, customers, or employees for a specified period. It's narrower than a non-compete (which restricts where you can work) and focuses specifically on protecting business relationships.\n\nNon-solicitation agreements are generally more enforceable than non-competes because they don't prevent someone from working — they only restrict who they can contact. However, they must still be reasonable in scope and duration.\n\nKey provisions include: the scope of restricted contacts (clients, customers, employees, or all three), the duration of the restriction, the definition of 'solicitation' (active outreach vs. responding to unsolicited contacts), geographic limitations, and consequences of violation.",
    keyClauseSlugs: ["non-solicitation-clause", "confidentiality-clause", "termination-clause", "severability-clause", "governing-law-clause"],
    commonRisks: [
      "Overly broad definition of solicitation that includes responding to unsolicited contacts",
      "Duration exceeding 2 years (harder to enforce)",
      "Covers clients the employee never worked with",
      "No exception for publicly advertised positions (employee non-solicitation)",
      "No consideration provided for signing the agreement",
      "Restricts both client and employee solicitation without adequate justification"
    ],
    relatedToolIds: ["non-compete", "clause-finder", "jargon-translator"],
    faqs: [
      { question: "Is a non-solicitation agreement the same as a non-compete?", answer: "No. A non-compete restricts where you can work entirely. A non-solicitation only restricts who you can contact (clients or employees). Non-solicitation agreements are generally more enforceable because they're narrower." },
      { question: "Can I still work for a competitor?", answer: "Yes, a non-solicitation agreement by itself doesn't prevent you from working for a competitor. It only prevents you from actively soliciting the former employer's clients or employees." },
      { question: "What counts as 'solicitation'?", answer: "Typically, actively reaching out to someone to take their business or recruit them. General marketing or advertising usually doesn't count. Responding to someone who contacts you first may or may not count, depending on the agreement language." },
    ],
  },
  {
    slug: "shareholder-agreement",
    title: "Shareholder Agreement",
    category: "Business",
    description: "A shareholder agreement is a contract among the shareholders of a company that defines their rights, obligations, and the rules governing the company. It supplements the company's articles of incorporation and bylaws with more detailed provisions about management, share transfers, and dispute resolution.\n\nShareholder agreements are particularly important in closely held companies where personal relationships and trust are central to the business. They address: voting rights and board representation, share transfer restrictions, buy-sell provisions (triggered by death, disability, departure, or disputes), dividend policies, non-compete obligations, information rights, and protective provisions requiring supermajority approval.\n\nBuy-sell provisions (also called buyout provisions) are among the most important elements. They establish how shares are valued, who has the right to buy, and under what circumstances — preventing deadlocks and ensuring fair exits.",
    keyClauseSlugs: ["dispute-resolution-clause", "non-compete-clause", "confidentiality-clause", "termination-clause", "governing-law-clause", "assignment-clause"],
    commonRisks: [
      "No buy-sell provisions for shareholder exits",
      "No valuation methodology for share transfers",
      "50/50 ownership without deadlock resolution mechanism",
      "Majority shareholder can oppress minority shareholders",
      "No drag-along or tag-along rights",
      "Personal guarantees by departing shareholders not addressed"
    ],
    relatedToolIds: ["nda-generator", "clause-finder", "jargon-translator"],
    faqs: [
      { question: "Do I need a shareholder agreement?", answer: "For any company with multiple shareholders, yes. Without one, disputes are governed by default state law rules, which may not protect your interests. Even two-person companies should have one." },
      { question: "What are drag-along and tag-along rights?", answer: "Drag-along rights allow majority shareholders to force minority shareholders to participate in a sale. Tag-along rights allow minority shareholders to join a sale on the same terms. Both protect against unfair treatment." },
      { question: "How are shares valued for a buyout?", answer: "Common methods include: agreed-upon formula (book value, revenue multiple), independent appraisal, or a fixed price updated annually. The agreement should specify the method to avoid disputes." },
    ],
  },
  {
    slug: "commercial-lease",
    title: "Commercial Lease",
    category: "Real Estate",
    description: "A commercial lease is an agreement between a landlord and a business tenant for the use of commercial property (office, retail, industrial, or warehouse space). Unlike residential leases, commercial leases are largely unregulated and heavily negotiated, with terms significantly affecting the tenant's business operations and costs.\n\nCommercial leases are categorized by their cost structure: gross lease (landlord pays all operating expenses), net lease (tenant pays some or all operating expenses), and modified gross lease (a hybrid). The most common commercial lease is the 'triple net' (NNN) lease, where the tenant pays base rent plus property taxes, insurance, and common area maintenance.\n\nKey negotiation points include: rent and escalations, tenant improvement allowance, lease term and renewal options, exclusivity clauses (preventing the landlord from leasing to competitors), assignment and subletting rights, maintenance responsibilities, and personal guarantees.",
    keyClauseSlugs: ["termination-clause", "insurance-clause", "assignment-clause", "notice-clause", "governing-law-clause", "force-majeure-clause"],
    commonRisks: [
      "Personal guarantee by business owner for the full lease term",
      "No cap on common area maintenance (CAM) charges",
      "Continuous operation clause requiring the business to stay open",
      "Demolition or relocation clause allowing landlord to move tenant",
      "No tenant improvement allowance or insufficient allowance",
      "Auto-renewal without adequate opt-out notice period"
    ],
    relatedToolIds: ["notice-period", "late-fee", "clause-finder"],
    faqs: [
      { question: "What is a personal guarantee on a lease?", answer: "When a business owner personally guarantees the lease, they're personally liable for rent if the business fails. Try to negotiate: limited guarantees (only for part of the term), burning guarantees (that reduce over time), or elimination after meeting financial benchmarks." },
      { question: "What is a tenant improvement (TI) allowance?", answer: "Money the landlord provides to customize the space for the tenant's needs. TI allowances are negotiable and vary by market. They typically range from $10-$80+ per square foot depending on the space and market conditions." },
      { question: "Can I sublease my commercial space?", answer: "Only if the lease permits it. Most commercial leases require landlord consent for subleasing. Negotiate for consent not to be unreasonably withheld. Some leases prohibit subleasing entirely." },
    ],
  },
  {
    slug: "website-terms",
    title: "Website Terms and Conditions",
    category: "Technology",
    description: "Website terms and conditions (also called Terms of Use) establish the rules for using a website. They protect the website owner from liability, set expectations for user behavior, address intellectual property rights, and establish the legal framework for the user-website relationship.\n\nWebsite terms are typically presented in one of two ways: browsewrap (terms are posted on the site via a hyperlink, and using the site constitutes agreement) or clickwrap (users must actively click 'I agree' before accessing features). Clickwrap agreements are significantly more enforceable than browsewrap.\n\nKey provisions include: acceptable use restrictions, intellectual property ownership, user-generated content policies, disclaimers and limitation of liability, privacy references, account creation and termination, DMCA compliance, and governing law.",
    keyClauseSlugs: ["limitation-of-liability", "intellectual-property-clause", "governing-law-clause", "arbitration-clause", "termination-clause"],
    commonRisks: [
      "Browsewrap presentation (harder to enforce than clickwrap)",
      "No DMCA takedown procedure for user-generated content",
      "Overly broad license to user content",
      "No mechanism for notifying users of changes",
      "Liability disclaimers that don't comply with consumer protection laws",
      "Missing accessibility compliance provisions"
    ],
    relatedToolIds: ["tos-generator", "privacy-generator", "clause-finder"],
    faqs: [
      { question: "Do I need website terms and conditions?", answer: "While not legally required for all websites, they provide important legal protections and are strongly recommended. Any site that collects user data, allows user accounts, or accepts payments should have them." },
      { question: "What's the difference between clickwrap and browsewrap?", answer: "Clickwrap requires users to actively agree (click 'I accept'). Browsewrap just posts terms with a link at the bottom. Clickwrap is much more enforceable because there's clear evidence of agreement." },
      { question: "Can I copy someone else's terms?", answer: "No. Terms should be customized for your specific website, business model, and legal requirements. Using someone else's terms may not cover your needs and could create legal issues." },
    ],
  },
];

export function getContractTypeBySlug(slug: string): ContractType | undefined {
  return contractTypes.find((c) => c.slug === slug);
}

export function getAllContractTypeSlugs(): string[] {
  return contractTypes.map((c) => c.slug);
}

export function getContractTypesByCategory(category: string): ContractType[] {
  return contractTypes.filter((c) => c.category === category);
}

export function getContractTypeCategories(): string[] {
  return [...new Set(contractTypes.map((c) => c.category))].sort();
}

export function searchContractTypes(query: string): ContractType[] {
  const q = query.toLowerCase();
  return contractTypes.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );
}
