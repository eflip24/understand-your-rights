import type { PillarData } from "./autoAccidentLaw";

export const landlordTenantLaw: PillarData = {
  basePath: "/landlord-tenant-law",
  category: "Landlord-Tenant Law",
  pillarTitle: "Landlord-Tenant Law Guide — Rights, Responsibilities & Remedies",
  pillarMetaTitle: "Landlord-Tenant Law — Free Rental Rights Guide | LegallySpoken",
  pillarMetaDescription: "Learn about landlord-tenant law in plain English. Covers evictions, security deposits, lease breaking, rent increases, and tenant rights by state.",
  pillarIntro: "Landlord-tenant law governs rental agreements and the rights and responsibilities of both property owners and renters. Whether you're a tenant facing eviction, disputing a security deposit, or a landlord dealing with problem tenants, this guide covers every major topic with free tools and state-specific information.",
  clusters: [
    {
      slug: "eviction-process",
      title: "The Eviction Process — Step by Step",
      metaTitle: "Eviction Process — How Evictions Work by State | LegallySpoken",
      metaDescription: "Understand the eviction process from notice to court. Learn about legal grounds, tenant defenses, and state-specific rules.",
      content: `<h2>How the Eviction Process Works</h2>
<p>Eviction is the legal process of removing a tenant from a rental property. Landlords must follow strict legal procedures — "self-help" evictions (changing locks, removing belongings) are illegal in all states.</p>
<h3>Legal Grounds for Eviction</h3>
<p><strong>Non-payment of rent:</strong> The most common reason. Notice periods vary from 3-14 days.</p>
<p><strong>Lease violations:</strong> Breaking lease terms (unauthorized pets, subletting, noise complaints).</p>
<p><strong>End of lease term:</strong> Landlord chooses not to renew (subject to rent control laws where applicable).</p>
<p><strong>Illegal activity:</strong> Drug dealing, violent crime on the premises.</p>
<h3>The Legal Process</h3>
<p><strong>Step 1:</strong> Written notice to the tenant (pay or quit, cure or quit, or unconditional quit).</p>
<p><strong>Step 2:</strong> File an eviction lawsuit (unlawful detainer) with the court.</p>
<p><strong>Step 3:</strong> Court hearing where both sides present their case.</p>
<p><strong>Step 4:</strong> If landlord wins, a writ of possession is issued.</p>
<p><strong>Step 5:</strong> Sheriff or marshal enforces the eviction.</p>`,
      faqs: [
        { question: "Can a landlord evict you without notice?", answer: "No. All states require written notice before filing an eviction lawsuit. The type of notice and waiting period varies by state and the reason for eviction." },
        { question: "How long does the eviction process take?", answer: "Typically 3-8 weeks from notice to removal, depending on the state, reason for eviction, and whether the tenant contests. Some states with tenant-friendly laws can take 3-6 months." },
      ],
      relatedToolIds: ["security-deposit-calculator", "rent-increase-calculator", "complaint-letter-generator"],
      relatedTermSlugs: ["breach", "termination", "remedy"],
    },
    {
      slug: "security-deposits",
      title: "Security Deposit Laws by State",
      metaTitle: "Security Deposit Laws — Limits, Returns & Disputes | LegallySpoken",
      metaDescription: "Understand security deposit laws including state limits, return deadlines, allowable deductions, and how to dispute unfair withholding.",
      content: `<h2>Security Deposit Laws</h2>
<p>Security deposit rules vary dramatically by state. Knowing your state's specific laws is essential for both landlords and tenants.</p>
<h3>State Limits on Security Deposits</h3>
<p>Many states cap security deposits at 1-2 months' rent. Some states (like Texas) have no statutory limit. A few states require deposits to be held in interest-bearing accounts.</p>
<h3>Return Deadlines</h3>
<p>Landlords must return deposits within a state-specified timeframe after move-out (typically 14-60 days). Failure to return within the deadline may result in penalties — some states award double or triple damages.</p>
<h3>Allowable Deductions</h3>
<p><strong>Allowed:</strong> Unpaid rent, cleaning beyond normal wear and tear, repair of damage caused by tenant.</p>
<p><strong>Not allowed:</strong> Normal wear and tear (paint fading, carpet wear), pre-existing damage, routine maintenance.</p>
<h3>Disputing Deductions</h3>
<p>Request an itemized statement of deductions. Compare against move-in condition documentation. If unfair, send a demand letter. If unresolved, file in small claims court.</p>`,
      faqs: [
        { question: "What is 'normal wear and tear'?", answer: "Normal wear and tear includes: small nail holes, minor scuffs, gradual carpet wear, fading paint, and worn door handles. Damage beyond this — large holes, stains, burns, broken fixtures — can be deducted." },
        { question: "Can my landlord keep my deposit for cleaning?", answer: "Only if the unit is left significantly dirtier than when you moved in (beyond normal use). Professional cleaning fees are a common dispute — document your cleaning at move-out." },
      ],
      relatedToolIds: ["security-deposit-calculator", "move-out-checklist-generator", "dispute-letter-generator"],
      relatedTermSlugs: ["escrow", "breach", "damages"],
    },
    {
      slug: "lease-breaking",
      title: "Can You Break a Lease Early Without Penalty?",
      metaTitle: "Breaking a Lease — Legal Options & Penalties | LegallySpoken",
      metaDescription: "Learn when and how you can break a lease early, what penalties you may face, and legal exceptions that let you out without penalty.",
      content: `<h2>Breaking a Lease Early</h2>
<p>A lease is a binding contract, but there are legal reasons and practical strategies for breaking one without devastating financial consequences.</p>
<h3>Legal Reasons to Break a Lease Without Penalty</h3>
<p><strong>Military deployment:</strong> The Servicemembers Civil Relief Act (SCRA) allows active military to break leases when deployed or relocated.</p>
<p><strong>Uninhabitable conditions:</strong> If the landlord fails to maintain habitable conditions (no heat, water, structural hazards), you may have grounds to break the lease.</p>
<p><strong>Landlord harassment:</strong> Repeated illegal entry, privacy violations, or harassment.</p>
<p><strong>Domestic violence:</strong> Many states allow DV victims to break leases with a protective order or police report.</p>
<p><strong>Health/safety code violations:</strong> Documented violations that make the unit unsafe.</p>
<h3>Landlord's Duty to Mitigate</h3>
<p>In most states, landlords must make reasonable efforts to re-rent the unit. You're only liable for rent until a new tenant is found, not the full remaining lease term.</p>
<h3>Strategies for Breaking a Lease</h3>
<p>Negotiate with your landlord, find a replacement tenant, sublet (if allowed), or pay the early termination fee if your lease has one.</p>`,
      faqs: [
        { question: "How much does it cost to break a lease?", answer: "Typical penalties range from 1-2 months' rent to the full remaining lease balance. Many leases have an early termination clause specifying the exact cost. Negotiation is often possible." },
        { question: "Can breaking a lease hurt my credit?", answer: "Not directly, but if you owe money after breaking the lease and it goes to collections, that will appear on your credit report. Unpaid rent judgments can also affect your ability to rent in the future." },
      ],
      relatedToolIds: ["lease-term-comparison", "security-deposit-calculator", "dispute-letter-generator"],
      relatedTermSlugs: ["breach", "termination", "damages"],
    },
    {
      slug: "tenant-rights",
      title: "Tenant Rights — What Every Renter Should Know",
      metaTitle: "Tenant Rights — Your Complete Guide | LegallySpoken",
      metaDescription: "Know your rights as a tenant. Covers habitability, privacy, discrimination, repairs, and retaliation protections.",
      content: `<h2>Essential Tenant Rights</h2>
<p>Tenants have significant legal protections under both federal and state law. Knowing your rights is the best defense against unfair landlord practices.</p>
<h3>Right to Habitable Housing</h3>
<p>The implied warranty of habitability requires landlords to maintain rental units in livable condition: working plumbing, heating, electricity, structural integrity, pest control, and compliance with building codes.</p>
<h3>Right to Privacy</h3>
<p>Landlords generally must give 24-48 hours' notice before entering your unit (except emergencies). They cannot enter at unreasonable hours or without proper notice.</p>
<h3>Protection from Discrimination</h3>
<p>The Fair Housing Act prohibits discrimination based on race, color, religion, national origin, sex, familial status, and disability. Many states add protections for sexual orientation, gender identity, source of income, and more.</p>
<h3>Protection from Retaliation</h3>
<p>Landlords cannot raise rent, reduce services, or threaten eviction in retaliation for tenants exercising legal rights (reporting code violations, joining tenant organizations, etc.).</p>
<h3>Right to Repairs</h3>
<p>If a landlord fails to make necessary repairs, tenants may have options including: "repair and deduct" (making repairs and deducting cost from rent), rent withholding, or reporting to housing authorities.</p>`,
      faqs: [
        { question: "Can my landlord raise rent whenever they want?", answer: "For month-to-month leases, landlords can raise rent with proper notice (typically 30 days). During a lease term, rent is fixed unless the lease allows increases. Rent control cities have additional limits." },
        { question: "Can my landlord enter my apartment without permission?", answer: "Generally no. Most states require 24-48 hours' written notice except in emergencies (fire, flood, gas leak). The entry must be at reasonable times and for legitimate purposes." },
      ],
      relatedToolIds: ["rent-increase-calculator", "complaint-letter-generator", "lease-analyzer"],
      relatedTermSlugs: ["warranty", "breach", "good-faith"],
    },
    {
      slug: "landlord-responsibilities",
      title: "Landlord Responsibilities — Legal Obligations",
      metaTitle: "Landlord Responsibilities — Your Legal Obligations | LegallySpoken",
      metaDescription: "Understand your legal obligations as a landlord. Covers maintenance, habitability, security deposits, and fair housing compliance.",
      content: `<h2>Legal Responsibilities of Landlords</h2>
<p>Landlords have significant legal obligations to tenants. Failing to meet these can result in lawsuits, fines, and loss of the ability to evict problem tenants.</p>
<h3>Maintaining Habitable Conditions</h3>
<p>Landlords must provide and maintain: structural integrity, plumbing and hot water, heating (and AC in some states), electrical systems, pest control, smoke and CO detectors, and compliance with all building codes.</p>
<h3>Security Deposit Management</h3>
<p>Properly collect, store (separate/interest-bearing accounts where required), and return security deposits according to state law. Provide itemized deduction statements.</p>
<h3>Fair Housing Compliance</h3>
<p>Never discriminate in advertising, screening, renting, or providing services based on protected characteristics. Provide reasonable accommodations for disabled tenants.</p>
<h3>Proper Eviction Procedures</h3>
<p>Follow all legal notice and court procedures. Never engage in self-help evictions: changing locks, shutting off utilities, removing doors/windows, or removing tenant belongings.</p>`,
      faqs: [
        { question: "How quickly must a landlord make repairs?", answer: "Emergency repairs (no heat, water leak, broken locks) must be addressed within 24-48 hours. Non-emergency repairs typically within 14-30 days, depending on state law and the nature of the issue." },
        { question: "Can a landlord be sued for mold?", answer: "Yes, if they knew about or should have known about the mold and failed to remediate it. Mold-related health claims can result in significant damages, especially if children or immunocompromised tenants are affected." },
      ],
      relatedToolIds: ["security-deposit-calculator", "rent-increase-calculator", "rental-agreement-generator"],
      relatedTermSlugs: ["liability", "warranty", "good-faith"],
    },
    {
      slug: "rent-increase-laws",
      title: "Rent Increase Laws by State",
      metaTitle: "Rent Increase Laws — How Much Can a Landlord Raise Rent? | LegallySpoken",
      metaDescription: "Understand rent increase laws and limits by state. Covers notice requirements, rent control, and what to do about unfair increases.",
      content: `<h2>Rent Increase Laws</h2>
<p>Rent increase laws vary dramatically by state and even by city. Understanding the rules helps tenants know their rights and landlords stay compliant.</p>
<h3>General Rules</h3>
<p>In most states without rent control, landlords can raise rent by any amount — but only with proper notice and not during a fixed-term lease (unless the lease allows it).</p>
<h3>Notice Requirements</h3>
<p>Month-to-month: typically 30 days' written notice (60-90 days for large increases in some states). Fixed-term lease: rent increases take effect at renewal. Notice must be in writing.</p>
<h3>Rent Control Cities and States</h3>
<p>California (statewide cap of 5% + CPI), Oregon (statewide cap of 7% + CPI), New York City, San Francisco, Washington DC, and several other cities limit annual increases. Some states preempt local rent control entirely.</p>
<h3>Challenging an Unfair Increase</h3>
<p>In rent-controlled areas, file a complaint with the rent board. In other areas, negotiate with the landlord, check if the increase is retaliatory (illegal), or consider moving if the market doesn't support the increase.</p>`,
      faqs: [
        { question: "Is there a limit on how much rent can be increased?", answer: "Only in rent-controlled jurisdictions. Most states have no cap on rent increases — landlords can raise rent by any amount with proper notice between lease terms. Market competition is the primary limiting factor." },
        { question: "Can rent be raised during a lease?", answer: "Not unless the lease specifically contains a clause allowing mid-lease increases. A lease is a contract, and both parties are bound by its terms for the duration." },
      ],
      relatedToolIds: ["rent-increase-calculator", "lease-term-comparison", "complaint-letter-generator"],
      relatedTermSlugs: ["breach", "good-faith", "remedy"],
    },
    {
      slug: "habitability-standards",
      title: "Habitability Standards — What Makes a Home 'Livable'",
      metaTitle: "Habitability Standards — Your Right to a Livable Home | LegallySpoken",
      metaDescription: "Learn about the implied warranty of habitability, what conditions must be met, and what to do if your rental is uninhabitable.",
      content: `<h2>The Implied Warranty of Habitability</h2>
<p>Every residential lease carries an implied warranty of habitability — the landlord's legal obligation to maintain the property in livable condition. This right exists in every state.</p>
<h3>Minimum Habitability Requirements</h3>
<p><strong>Structural:</strong> Weatherproof roof and walls, intact floors, functioning windows and doors.</p>
<p><strong>Utilities:</strong> Running water, hot water, electricity, adequate heating.</p>
<p><strong>Safety:</strong> Working locks, smoke detectors, CO detectors, safe stairways and exits.</p>
<p><strong>Sanitation:</strong> Functioning plumbing, pest control, garbage disposal systems.</p>
<p><strong>Compliance:</strong> Meeting all local building and housing codes.</p>
<h3>Tenant Remedies for Uninhabitable Conditions</h3>
<p><strong>Repair and deduct:</strong> Make the repair yourself and deduct the cost from rent (allowed in many states with limits).</p>
<p><strong>Rent withholding:</strong> Withhold rent until repairs are made (must follow state procedures carefully).</p>
<p><strong>Report to authorities:</strong> Contact local housing inspection or code enforcement.</p>
<p><strong>Constructive eviction:</strong> Move out and argue the conditions forced you to leave, terminating your lease obligation.</p>`,
      faqs: [
        { question: "Can I withhold rent for uninhabitable conditions?", answer: "In many states, yes, but you must follow specific legal procedures: document the issue, give written notice to the landlord, allow reasonable time for repair, and in some states, deposit rent in an escrow account." },
        { question: "What if my landlord ignores repair requests?", answer: "Document everything in writing. If the landlord doesn't respond, options include: repair and deduct, rent withholding, reporting to housing authorities, or consulting a tenant rights attorney." },
      ],
      relatedToolIds: ["complaint-letter-generator", "move-out-checklist-generator", "dispute-letter-generator"],
      relatedTermSlugs: ["warranty", "breach", "remedy"],
    },
    {
      slug: "subletting-rules",
      title: "Subletting — Rules, Risks & How to Do It Legally",
      metaTitle: "Subletting Rules — Can You Sublet Your Apartment? | LegallySpoken",
      metaDescription: "Learn about subletting rules, whether your lease allows it, how to get landlord approval, and the legal risks involved.",
      content: `<h2>Subletting Your Rental</h2>
<p>Subletting means renting out your rental unit to someone else while you remain on the original lease. The rules around subletting depend on your lease and state law.</p>
<h3>Can You Sublet?</h3>
<p>Check your lease first. If it prohibits subletting, you generally can't (though some states override this). If the lease is silent, subletting is usually allowed. If it requires landlord approval, the landlord typically can't unreasonably withhold it.</p>
<h3>How to Sublet Legally</h3>
<p><strong>Step 1:</strong> Review your lease for subletting provisions.</p>
<p><strong>Step 2:</strong> Get written permission from your landlord.</p>
<p><strong>Step 3:</strong> Screen potential subtenants carefully.</p>
<p><strong>Step 4:</strong> Create a sublease agreement that mirrors your original lease terms.</p>
<h3>Risks of Subletting</h3>
<p>You remain liable for rent and damages. If the subtenant doesn't pay or damages the property, you're responsible. Unauthorized subletting can be grounds for eviction.</p>`,
      faqs: [
        { question: "What's the difference between subletting and assigning a lease?", answer: "Subletting: you remain on the lease and are responsible for the subtenant. Assignment: you transfer the lease entirely to a new tenant and are no longer responsible (with landlord's consent)." },
        { question: "Can my landlord charge a subletting fee?", answer: "Some states allow reasonable subletting fees (typically $50-$250 for processing). Other states prohibit any subletting fees. Check your local laws." },
      ],
      relatedToolIds: ["lease-term-comparison", "rental-agreement-generator", "security-deposit-calculator"],
      relatedTermSlugs: ["breach", "liability", "termination"],
    },
    {
      slug: "fair-housing",
      title: "Fair Housing Laws — Tenant Discrimination Protections",
      metaTitle: "Fair Housing Laws — Discrimination Protections for Tenants | LegallySpoken",
      metaDescription: "Understand Fair Housing Act protections against housing discrimination. Covers protected classes, common violations, and how to file complaints.",
      content: `<h2>Fair Housing Laws</h2>
<p>The Fair Housing Act (FHA) prohibits discrimination in housing based on protected characteristics. It applies to all aspects of housing: advertising, screening, renting, terms, and eviction.</p>
<h3>Protected Classes</h3>
<p><strong>Federal:</strong> Race, color, religion, national origin, sex, familial status (families with children under 18), and disability.</p>
<p><strong>Many states add:</strong> Sexual orientation, gender identity, marital status, source of income, age, veteran status, and genetic information.</p>
<h3>Common Fair Housing Violations</h3>
<p>Refusing to rent based on a protected class, different terms/conditions for different groups, discriminatory advertising ("no children," "Christians preferred"), failing to accommodate disabled tenants, and steering tenants toward/away from certain neighborhoods.</p>
<h3>Reasonable Accommodations</h3>
<p>Landlords must make reasonable accommodations for disabled tenants: allowing service animals (even in no-pet buildings), modifying the unit for accessibility, and adjusting rules or policies when necessary.</p>
<h3>Filing a Complaint</h3>
<p>File with HUD (US Department of Housing and Urban Development) within 1 year or file a federal lawsuit within 2 years. Many states have their own fair housing agencies with additional protections.</p>`,
      faqs: [
        { question: "Can a landlord refuse to rent to families with children?", answer: "No, except in qualified senior housing (55+ communities meeting specific requirements). Familial status is a protected class under the Fair Housing Act." },
        { question: "Is 'source of income' discrimination illegal?", answer: "In many states and cities, yes. This protects tenants who pay with housing vouchers (Section 8), disability income, or other government assistance. Check your state's specific protections." },
      ],
      relatedToolIds: ["complaint-letter-generator", "dispute-letter-generator", "lease-analyzer"],
      relatedTermSlugs: ["liability", "damages", "remedy"],
    },
    {
      slug: "repair-obligations",
      title: "Repair Obligations — Landlord vs Tenant",
      metaTitle: "Repair Responsibilities — Landlord vs Tenant | LegallySpoken",
      metaDescription: "Understand who is responsible for repairs in a rental. Covers landlord obligations, tenant responsibilities, and the repair-and-deduct remedy.",
      content: `<h2>Who Is Responsible for Repairs?</h2>
<p>Repair responsibilities are one of the most common sources of landlord-tenant disputes. The general rule is simple, but the details matter.</p>
<h3>Landlord Responsibilities</h3>
<p>Landlords must maintain: structural elements, major systems (plumbing, electrical, HVAC), appliances provided with the rental, common areas, and anything required by building codes or the warranty of habitability.</p>
<h3>Tenant Responsibilities</h3>
<p>Tenants must: keep the unit reasonably clean, dispose of garbage properly, use appliances and fixtures reasonably, not damage the property beyond normal wear and tear, and promptly report maintenance issues.</p>
<h3>When the Landlord Won't Fix Things</h3>
<p><strong>Document everything:</strong> Written repair requests, photos, dates.</p>
<p><strong>Repair and deduct:</strong> In many states, tenants can make repairs and deduct costs from rent (usually with limits and specific procedures).</p>
<p><strong>Rent withholding:</strong> Some states allow withholding rent until repairs are completed.</p>
<p><strong>Report violations:</strong> Contact local housing code enforcement.</p>
<p><strong>Legal action:</strong> Sue for breach of the warranty of habitability.</p>`,
      faqs: [
        { question: "Who pays for plumbing repairs in a rental?", answer: "The landlord is responsible for plumbing system maintenance and repairs — unless the tenant caused the damage (e.g., flushing inappropriate items). Leaking pipes, water heater issues, and backed-up sewer lines are landlord responsibilities." },
        { question: "Can I be evicted for requesting repairs?", answer: "No. Retaliatory eviction — evicting a tenant for exercising legal rights like requesting repairs — is illegal in almost all states. Document all repair requests in writing as evidence." },
      ],
      relatedToolIds: ["complaint-letter-generator", "move-out-checklist-generator", "security-deposit-calculator"],
      relatedTermSlugs: ["warranty", "breach", "liability"],
    },
  ],
};
