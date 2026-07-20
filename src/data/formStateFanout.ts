/**
 * State fan-out SEO landing data for high-CPC forms.
 * Powers /forms/{form}/{state} routes for CA, NY, TX, FL, IL, PA.
 */

export interface StateFanoutState {
  code: string;
  slug: string;
  name: string;
}

export const FANOUT_STATES: StateFanoutState[] = [
  { code: "CA", slug: "california", name: "California" },
  { code: "NY", slug: "new-york", name: "New York" },
  { code: "TX", slug: "texas", name: "Texas" },
  { code: "FL", slug: "florida", name: "Florida" },
  { code: "IL", slug: "illinois", name: "Illinois" },
  { code: "PA", slug: "pennsylvania", name: "Pennsylvania" },
];

export interface FormStateContentDef {
  /** URL prefix under /forms/ */
  urlPrefix: string;
  /** Wizard slug to funnel into */
  wizardSlug: string;
  /** Query param name for pre-selected state on the wizard */
  stateParam: string;
  formShortName: string;
  h1Template: (state: string) => string;
  metaTitleTemplate: (state: string) => string;
  metaDescriptionTemplate: (state: string) => string;
  intro: (state: string) => string;
  /** State-specific rules block */
  stateRules: Record<string, { title: string; bullets: string[]; statute?: string }>;
  howToSteps: { name: string; text: string }[];
  faqs: (state: string) => { q: string; a: string }[];
}

const evictionRules: FormStateContentDef["stateRules"] = {
  CA: {
    title: "California eviction notice timing",
    statute: "Cal. Code Civ. Proc. §§1161, 1946.2",
    bullets: [
      "3-day notice to pay rent or quit (business days only; excess of the amount due is void)",
      "3-day notice to cure or quit for curable lease violations",
      "3-day unconditional quit for incurable violations (nuisance, illegal use, subletting in violation of lease)",
      "For no-fault terminations under AB 1482 (statewide rent cap), landlord must pay one month of relocation assistance",
      "30-day notice for month-to-month tenants under 1 year; 60-day notice for tenants 1+ year",
      "Just-cause required for AB 1482-covered units after 12 months of tenancy",
    ],
  },
  NY: {
    title: "New York eviction notice timing",
    statute: "N.Y. Real Prop. Acts. Law §§ 711, 753; RPL §226-c",
    bullets: [
      "14-day rent demand notice (in writing) required before nonpayment eviction filing",
      "10-day notice to cure for lease violations (curable defaults)",
      "30-day notice for month-to-month tenants under 1 year",
      "60-day notice for tenants 1–2 years (RPL §226-c, HSTPA of 2019)",
      "90-day notice for tenants over 2 years or in a lease of at least 2 years",
      "Good cause eviction protections apply in New York City and opt-in municipalities (2024)",
    ],
  },
  TX: {
    title: "Texas eviction notice timing",
    statute: "Tex. Prop. Code §24.005",
    bullets: [
      "3-day notice to vacate (default) — includes weekends and holidays",
      "Lease can shorten to 1 day or extend the notice period",
      "Notice must be delivered in person, by mail, or posted on the inside of the front door (with strict rules)",
      "No cure period is required by statute for nonpayment — 3-day vacate notice is enough",
      "Landlord must file a forcible-detainer suit in justice court after the notice expires",
    ],
  },
  FL: {
    title: "Florida eviction notice timing",
    statute: "Fla. Stat. §§ 83.56, 83.57",
    bullets: [
      "3-day notice to pay rent or quit (excludes Saturdays, Sundays, and legal holidays)",
      "7-day notice to cure lease violations (curable defaults)",
      "7-day unconditional quit for repeat violations or serious noncompliance",
      "15-day notice to terminate a month-to-month tenancy",
      "Effective 2023, non-refundable monthly fees in lieu of security deposit are allowed",
    ],
  },
  IL: {
    title: "Illinois eviction notice timing",
    statute: "735 ILCS 5/9-209, 9-210",
    bullets: [
      "5-day notice to pay rent or quit for nonpayment",
      "10-day notice to cure or quit for lease violations",
      "30-day notice to terminate a month-to-month tenancy",
      "Chicago RLTO adds tenant protections and requires attached RLTO summary",
      "Cook County Residential Tenant Landlord Ordinance (RTLO) mirrors Chicago protections countywide since 2021",
    ],
  },
  PA: {
    title: "Pennsylvania eviction notice timing",
    statute: "68 P.S. §§ 250.501, 250.502",
    bullets: [
      "10-day notice to quit for nonpayment (default; can be waived in lease)",
      "15-day notice for lease-term ≤ 1 year for end-of-term or breach",
      "30-day notice for lease term > 1 year for end-of-term or breach",
      "No statutory cure period — landlord may proceed after the notice expires",
      "Philadelphia's Good Cause Eviction Bill (2023) adds just-cause requirements citywide",
    ],
  },
};

const leaseRules: FormStateContentDef["stateRules"] = {
  CA: {
    title: "California residential lease requirements",
    statute: "Cal. Civ. Code §1950.5 (as amended 2024)",
    bullets: [
      "Security deposit cap: 1 month's rent (2 months for small landlords owning ≤2 properties with ≤4 units total)",
      "Deposit must be returned within 21 days of move-out with itemized deductions",
      "Mandatory disclosures: lead-based paint (pre-1978), Megan's Law, bedbug info, mold if known, Prop 65 (if applicable), flood hazard (AB 1747)",
      "AB 1482 caps annual rent increases at 5% + CPI (max 10%) for most units 15+ years old",
      "Late fees must be a reasonable estimate of actual damages — flat fees can be void",
    ],
  },
  NY: {
    title: "New York residential lease requirements",
    statute: "N.Y. Gen. Oblig. Law §7-108; RPL §235-e",
    bullets: [
      "Security deposit cap: 1 month's rent (HSTPA of 2019)",
      "Deposit must be returned within 14 days with itemized statement",
      "Mandatory disclosures: lead-based paint (pre-1978), bedbug annual filing (NYC), window guard rider (NYC), sprinkler system, flood zone",
      "Late fees cap: greater of $50 or 5% of rent — assessed only after a 5-day grace period",
      "Rent-stabilized units have additional restrictions on increases and renewals",
    ],
  },
  TX: {
    title: "Texas residential lease requirements",
    statute: "Tex. Prop. Code §§ 92.101–92.109",
    bullets: [
      "No statutory cap on security deposit",
      "Deposit must be returned within 30 days of move-out",
      "Mandatory disclosures: lead-based paint (pre-1978), landlord/agent identity, parking policy (if applicable), tenant remedies for landlord violations",
      "Late fees must be reasonable — 12% of rent generally accepted as reasonable safe harbor for units up to 4 dwellings, 10% for larger",
      "No statutory grace period — lease controls",
    ],
  },
  FL: {
    title: "Florida residential lease requirements",
    statute: "Fla. Stat. §§ 83.49, 83.51",
    bullets: [
      "No statutory cap on security deposit",
      "Deposit must be returned within 15 days (no deductions) or 30 days (with itemized notice of intent to withhold)",
      "Mandatory disclosures: lead-based paint (pre-1978), radon gas, landlord/agent identity, security-deposit holding method",
      "New (2023): landlord may offer monthly non-refundable fee in lieu of security deposit",
      "No statutory late-fee cap — lease controls, but must not be punitive",
    ],
  },
  IL: {
    title: "Illinois residential lease requirements",
    statute: "765 ILCS 710, 715, 720; Chicago Muni. Code Ch. 5-12 (RLTO)",
    bullets: [
      "No statewide cap on security deposit (Chicago RLTO limits to standard practices and requires interest payment)",
      "Deposit return: 30 days (with itemized deductions) or 45 days (statewide default); Chicago RLTO — 30–45 days depending on damages",
      "Mandatory disclosures: lead-based paint (pre-1978), radon (if known), utility costs, Chicago RLTO summary (Chicago and Cook County)",
      "Late fees: reasonable and stated in lease; Chicago caps late fees at $10 for the first $500 of rent + 5% for amounts above",
      "Local ordinances (Chicago, Evanston, Mount Prospect, Cook County) add tenant protections",
    ],
  },
  PA: {
    title: "Pennsylvania residential lease requirements",
    statute: "68 P.S. §§ 250.511a, 250.512",
    bullets: [
      "Security deposit cap: 2 months' rent in year 1, 1 month's rent starting year 2",
      "Deposit must be returned within 30 days with itemized statement",
      "Mandatory disclosures: lead-based paint (pre-1978), utility responsibility, escrow account (deposits >$100 held over 2 years)",
      "No statutory late-fee cap — lease controls, must not be unconscionable",
      "Philadelphia adds Good Cause Eviction requirements (2023)",
    ],
  },
};

const poaRules: FormStateContentDef["stateRules"] = {
  CA: {
    title: "California financial POA requirements",
    statute: "Cal. Prob. Code §§ 4000–4545 (Uniform Statutory Form Power of Attorney Act)",
    bullets: [
      "Must be signed by the principal and either (a) acknowledged before a notary OR (b) signed by 2 competent adult witnesses",
      "Statutory short-form POA is codified — using it creates a strong presumption of validity",
      "Springing POAs (effective on incapacity) require a physician's certification of incapacity to activate",
      "Cannot delegate authority to make healthcare decisions — use an Advance Healthcare Directive for that",
      "Third parties can rely on the POA in good faith without liability (Prob. Code §4303)",
    ],
  },
  NY: {
    title: "New York financial POA requirements",
    statute: "N.Y. Gen. Oblig. Law §§ 5-1501 to 5-1514",
    bullets: [
      "Must use the New York Statutory Short Form Power of Attorney (revised 2021)",
      "Both principal AND agent must sign and have signatures notarized",
      "Requires 2 disinterested witnesses in addition to the notary (2021 amendments allow the notary to be one witness)",
      "Gift transactions require a separate Statutory Gifts Rider signed with the same formalities",
      "Third parties who refuse to honor a valid NY statutory POA face damages under GOL §5-1510",
    ],
  },
  TX: {
    title: "Texas financial POA requirements",
    statute: "Tex. Est. Code §§ 751.001–753.005 (Durable Power of Attorney Act)",
    bullets: [
      "Must be signed by the principal and acknowledged before a notary public",
      "Texas Statutory Durable Power of Attorney form is codified — using it grants a strong presumption of validity",
      "Durable by default unless the document expressly states it terminates on incapacity",
      "Third parties are protected when acting in good faith reliance on the POA",
      "Gift-making authority must be specifically granted — not implied from general grants",
    ],
  },
  FL: {
    title: "Florida financial POA requirements",
    statute: "Fla. Stat. §§ 709.2101–709.2402 (Florida Power of Attorney Act)",
    bullets: [
      "Must be signed by the principal in the presence of 2 witnesses AND a notary public",
      "Springing POAs (contingent on incapacity) are prohibited for POAs signed after Oct 1, 2011 — must be durable and immediate",
      "Certain powers (making gifts, changing beneficiary designations, creating a trust) require specific enumeration and separate initialing",
      "Real property transactions require the POA to be recorded in the county where the property is located",
      "Third parties may require a certificate of the agent's authority",
    ],
  },
  IL: {
    title: "Illinois financial POA requirements",
    statute: "755 ILCS 45/ (Illinois Power of Attorney Act)",
    bullets: [
      "Must be signed by the principal AND witnessed by at least 1 competent adult witness (not the agent) AND notarized",
      "Illinois Statutory Short Form Power of Attorney for Property is codified — using it grants presumption of validity",
      "Notice provisions must appear in the exact statutory format at the top of the document",
      "Durable by default — remains effective through the principal's disability",
      "Agent has statutory fiduciary duties (Section 2-7): act in good faith, keep records, not commingle assets",
    ],
  },
  PA: {
    title: "Pennsylvania financial POA requirements",
    statute: "20 Pa. C.S. §§ 5601–5612",
    bullets: [
      "Must be signed by the principal, acknowledged before a notary, AND witnessed by 2 witnesses (neither the notary nor the agent)",
      "Notice provisions and agent acknowledgment (Section 5601(c) and (d)) are mandatory as of Act 95 of 2014",
      "Certain 'hot powers' (gifts, changing beneficiaries, creating trusts) require express grant in the POA",
      "Durable by default unless the document expressly states it terminates on incapacity",
      "Third parties acting in good faith are protected under §5608",
    ],
  },
};

const bosRules: FormStateContentDef["stateRules"] = {
  CA: {
    title: "California vehicle bill of sale requirements",
    statute: "Cal. Veh. Code §§ 5750–5753",
    bullets: [
      "Notarization is NOT required for a private-party vehicle sale",
      "Odometer disclosure is required for vehicles under 20 years old (federal law + Cal. Veh. Code)",
      "Seller must submit a Notice of Transfer and Release of Liability (REG 138) to DMV within 5 days",
      "Smog certification required for vehicles more than 4 model years old (with limited exceptions)",
      "Buyer must transfer title within 10 days to avoid late transfer penalties",
    ],
  },
  NY: {
    title: "New York vehicle bill of sale requirements",
    statute: "N.Y. Veh. & Traf. Law §2113; DMV MV-912",
    bullets: [
      "DMV form MV-912 is the recommended (but not mandatory) bill of sale format",
      "Notarization is not required for standard private-party sales",
      "Odometer disclosure required for vehicles under 20 years old",
      "Sales tax due at time of title transfer — DTF-802 required for non-dealer sales",
      "Buyer has 30 days to register the vehicle and pay tax",
    ],
  },
  TX: {
    title: "Texas vehicle bill of sale requirements",
    statute: "Tex. Transp. Code §501.0234; TxDMV Form VTR-40",
    bullets: [
      "Notarization is not statutorily required, but recommended and often requested by the county tax office",
      "Odometer disclosure required on Form 130-U (Application for Texas Title) — bill of sale supplements this",
      "Buyer has 30 days to title and register the vehicle to avoid penalties",
      "Standard Presumptive Value (SPV) determines minimum sales tax basis",
      "Seller should file Form VTR-346 (Vehicle Transfer Notification) to protect against future liability",
    ],
  },
  FL: {
    title: "Florida vehicle bill of sale requirements",
    statute: "Fla. Stat. §319.22; HSMV Form 82050",
    bullets: [
      "Notarization is required for the seller's signature on the Florida bill of sale (HSMV 82050)",
      "Odometer disclosure required on the title itself — federal law + Fla. Stat. §319.225",
      "Sales tax (6% state + local) collected at the tax collector's office when the buyer titles the vehicle",
      "Buyer must apply for title and registration within 30 days",
      "Seller must submit a Notice of Sale (Form HSMV 82050 or online) within 30 days to avoid liability",
    ],
  },
  IL: {
    title: "Illinois vehicle bill of sale requirements",
    statute: "625 ILCS 5/3-104; RUT-50",
    bullets: [
      "Notarization is not required for private-party vehicle sales",
      "Odometer disclosure required for vehicles under 20 years old",
      "Buyer must file Form RUT-50 (Private Party Vehicle Use Tax Transaction) and pay use tax",
      "20-day window to apply for title after purchase to avoid penalties",
      "Sales price affects use tax under IL's flat-fee schedule for vehicles under $15,000",
    ],
  },
  PA: {
    title: "Pennsylvania vehicle bill of sale requirements",
    statute: "75 Pa. C.S. §1111; PennDOT Form MV-4ST",
    bullets: [
      "Notarization IS required — PennDOT Form MV-4ST (Vehicle Sales and Use Tax Return/Application for Registration) requires notarized signatures",
      "Odometer disclosure required on the title assignment section",
      "6% state sales tax (7% in Allegheny County, 8% in Philadelphia) due at time of registration",
      "Vehicle inspection (annual state inspection + emissions if applicable) required before registration",
      "Buyer has 20 days to title and register at a PennDOT agent",
    ],
  },
};

export const STATE_FANOUT_FORMS: Record<string, FormStateContentDef> = {
  "eviction-notice": {
    urlPrefix: "eviction-notice",
    wizardSlug: "eviction-notice",
    stateParam: "state",
    formShortName: "Eviction Notice",
    h1Template: (state) => `${state} Eviction Notice — Free Fillable Notice to Quit / Pay-or-Quit`,
    metaTitleTemplate: (state) => `Free ${state} Eviction Notice — Fillable PDF | LegallySpoken`,
    metaDescriptionTemplate: (state) =>
      `Create a free, state-compliant ${state} eviction notice online. Correct notice period, statute citation, instant PDF. No login required.`,
    intro: (state) =>
      `A ${state} eviction notice is the written notice a landlord must legally serve on a tenant before filing for possession in court. ${state} has its own statutory notice periods and format requirements — get any of them wrong and the court dismisses the eviction case, forcing you to start over. Our free wizard generates a ${state}-compliant notice using the current statute, correct notice period, and standard service language.`,
    stateRules: evictionRules,
    howToSteps: [
      { name: "Pick the type of notice", text: "Pay rent or quit (nonpayment), cure or quit (fixable lease violation), or unconditional quit (nuisance, illegal use, repeat violations)." },
      { name: "Enter tenant and property information", text: "Full legal names of all adult tenants on the lease and the full rental address, including unit number." },
      { name: "State the reason and amount", text: "For nonpayment: total rent due, months owed, and late fees. For violations: describe the specific lease provision breached." },
      { name: "Set the notice period", text: "Use your state's statutory minimum — the wizard prefills based on the state you select." },
      { name: "Serve the notice properly", text: "Personal delivery, substituted service on an adult resident, or posting + mailing depending on state rules. Keep proof of service." },
      { name: "File in court if the tenant doesn't cure or vacate", text: "After the notice period expires, file an unlawful detainer / forcible entry & detainer / summary process action in the appropriate court." },
    ],
    faqs: (state) => [
      { q: `Is a ${state} eviction notice self-help or does it require court action?`, a: `The notice itself is a prerequisite — landlords cannot lock out tenants, shut off utilities, or physically remove them in ${state}. After the notice period expires, the landlord must file a court action and obtain a judgment for possession.` },
      { q: `Can I serve a ${state} eviction notice by email or text?`, a: `No. Every state requires physical service — personal delivery, substituted service, or posting-and-mailing. Email and text are not sufficient in any state, though some jurisdictions allow email as a supplement to statutory service.` },
      { q: `What happens if the tenant pays before the notice expires?`, a: `For a pay-or-quit notice, full payment (rent + any statutorily allowed fees) within the notice period cures the default and the eviction cannot proceed. Landlord must accept full payment; partial payment may waive the notice depending on state law.` },
      { q: `Can I use one eviction notice for multiple tenants on the same lease?`, a: `Yes, but name every adult tenant on the notice. Missing a named tenant can be grounds to dismiss the eviction action.` },
      { q: `Do I need a lawyer to file the eviction after the notice?`, a: `Individual landlords can generally represent themselves in ${state} eviction court. LLCs and corporations typically must be represented by counsel. Court fees and procedures vary by county.` },
    ],
  },
  "lease-agreement": {
    urlPrefix: "lease-agreement",
    wizardSlug: "residential-lease-agreement",
    stateParam: "state",
    formShortName: "Lease Agreement",
    h1Template: (state) => `${state} Residential Lease Agreement — Free Fillable PDF`,
    metaTitleTemplate: (state) => `Free ${state} Lease Agreement Template — Fillable PDF | LegallySpoken`,
    metaDescriptionTemplate: (state) =>
      `Create a free ${state}-compliant residential lease online. Security deposit cap, disclosures, late-fee rules built in. Instant PDF.`,
    intro: (state) =>
      `A ${state} residential lease agreement is the contract between a landlord and a tenant that spells out rent, term, security deposit, and the parties' rights and duties. ${state} has specific requirements — security deposit caps, return timelines, mandatory disclosures — that a generic online lease often misses. Our free wizard produces a ${state}-compliant lease with the correct statutory disclosures already built in.`,
    stateRules: leaseRules,
    howToSteps: [
      { name: "Enter the parties and property", text: "Full legal names of landlord and every adult tenant, plus the full property address including unit number." },
      { name: "Set the term and rent", text: "Fixed-term (typically 12 months) or month-to-month, monthly rent amount, due date, and accepted payment methods." },
      { name: "Configure the security deposit", text: "Wizard enforces the state cap and lists the required return timeline." },
      { name: "Add utilities and amenities", text: "Specify which utilities the landlord vs. tenant pays. Include appliances, parking, storage, and any furnishing." },
      { name: "Include state-mandatory disclosures", text: "Lead-based paint (federal, pre-1978) plus state-specific disclosures — the wizard adds them automatically based on state." },
      { name: "Both parties sign", text: "E-signature or wet signature. Give the tenant a fully executed copy at move-in." },
    ],
    faqs: (state) => [
      { q: `Does a ${state} lease need to be notarized?`, a: `No U.S. state requires notarization for a residential lease. Leases are enforceable with the parties' signatures alone. Notarization is optional but can help in edge-case disputes.` },
      { q: `What if I use a generic lease instead of a ${state}-specific one?`, a: `A generic lease is enforceable but may miss ${state}-mandatory disclosures. Missing disclosures don't void the lease, but they can (a) prevent the landlord from collecting late fees, (b) create tenant defenses to eviction, or (c) trigger statutory penalties.` },
      { q: `Can I raise rent during the lease term in ${state}?`, a: `Fixed-term leases lock in rent for the entire term. For month-to-month tenancies, ${state} law sets the notice period for rent increases (typically 30 days). Some ${state} cities have rent stabilization that further limits increases.` },
      { q: `Can I include a "no pets" clause?`, a: `Yes, but service animals (ADA) and emotional support animals (Fair Housing Act) are not "pets" and cannot be excluded even with a no-pets clause. You may still require documentation of the disability-related need.` },
      { q: `What happens if the tenant breaks the lease early?`, a: `In most states, the landlord must "mitigate damages" by trying to re-rent the unit. The tenant is liable for rent until a replacement tenant is found or the lease term ends, whichever is sooner, minus rent received from a replacement.` },
    ],
  },
  "power-of-attorney": {
    urlPrefix: "power-of-attorney",
    wizardSlug: "power-of-attorney-financial",
    stateParam: "state",
    formShortName: "Power of Attorney",
    h1Template: (state) => `${state} Durable Power of Attorney — Free Fillable Financial POA`,
    metaTitleTemplate: (state) => `Free ${state} Power of Attorney Form — Fillable PDF | LegallySpoken`,
    metaDescriptionTemplate: (state) =>
      `Create a free ${state}-compliant durable financial power of attorney online. Notary + witness requirements handled. Instant PDF.`,
    intro: (state) =>
      `A ${state} durable financial power of attorney (POA) lets you (the "principal") name an "agent" to handle your money, property, and legal affairs — either now or if you become incapacitated. ${state} has specific execution requirements (notarization, witnesses, statutory notice provisions). Our free wizard produces a ${state}-compliant POA with the correct signing formalities and statutory language.`,
    stateRules: poaRules,
    howToSteps: [
      { name: "Choose your agent", text: "Name the primary agent (attorney-in-fact) plus at least one successor agent in case the primary is unavailable." },
      { name: "Decide when the POA takes effect", text: "Immediately (durable, effective on signing) or springing (effective only on incapacity). Some states, like Florida, prohibit springing POAs." },
      { name: "Select the powers you're granting", text: "Real property, banking, investments, tax matters, retirement plans, insurance, and 'hot powers' like gifting or changing beneficiaries (require specific grant)." },
      { name: "Add limitations or special instructions", text: "You can restrict the agent's authority (e.g. 'cannot sell my primary residence') or add specific instructions." },
      { name: "Sign with proper formalities", text: "The wizard applies the state's exact signing requirements — notary, witnesses, or both." },
      { name: "Distribute copies", text: "Give a copy to the agent, keep the original in a safe place, and record with the county recorder if the POA covers real property." },
    ],
    faqs: (state) => [
      { q: `Is my ${state} POA valid in other states?`, a: `Yes. Under the Uniform Power of Attorney Act (adopted in some form by most states), a POA valid in the state where it was executed is generally recognized in other states. However, third parties (banks, title companies) may still require additional certification or their own forms.` },
      { q: `When does a ${state} POA end?`, a: `A POA ends on: (1) the principal's death, (2) revocation by the principal, (3) an expiration date stated in the document, or (4) court order. Divorce automatically revokes an agent designation for a spouse in most states.` },
      { q: `Can my agent make healthcare decisions?`, a: `No — a financial POA covers money and property only. Healthcare decisions require a separate healthcare power of attorney or advance directive.` },
      { q: `Does my agent have to pay my bills from their own money?`, a: `No. The agent uses your money to pay your obligations. Agents have fiduciary duties: act in your best interest, keep records, and not commingle your funds with theirs.` },
      { q: `Can I revoke my POA later?`, a: `Yes. You can revoke a POA at any time while mentally competent. Send written revocation to the agent and any third party (bank, brokerage) that has been relying on the POA. If it was recorded, record the revocation too.` },
    ],
  },
  "vehicle-bill-of-sale": {
    urlPrefix: "vehicle-bill-of-sale",
    wizardSlug: "vehicle-bill-of-sale",
    stateParam: "state",
    formShortName: "Vehicle Bill of Sale",
    h1Template: (state) => `${state} Vehicle Bill of Sale — Free Fillable PDF (DMV-Ready)`,
    metaTitleTemplate: (state) => `Free ${state} Vehicle Bill of Sale — Fillable PDF | LegallySpoken`,
    metaDescriptionTemplate: (state) =>
      `Free ${state} vehicle bill of sale online. Odometer disclosure, notary handling, DMV-ready format. Instant PDF download.`,
    intro: (state) =>
      `A ${state} vehicle bill of sale is the written record of a private-party car, motorcycle, or trailer sale. It documents the purchase price, VIN, odometer reading, and transfer of ownership — evidence the buyer needs to title and register the vehicle at the DMV, and evidence the seller needs to prove they no longer own the vehicle. Our free wizard produces a ${state}-compliant bill of sale with the correct signing formalities.`,
    stateRules: bosRules,
    howToSteps: [
      { name: "Enter buyer and seller information", text: "Full legal names, addresses, and driver's license numbers of both parties." },
      { name: "Describe the vehicle", text: "VIN (17 characters for post-1981 vehicles), year, make, model, body style, and color." },
      { name: "Record the odometer reading", text: "Exact mileage at the time of sale. Federal law requires disclosure for vehicles under 20 years old." },
      { name: "State the purchase price and payment method", text: "Full purchase price. If it's a gift or a token amount ('$1 and other valuable consideration'), state that explicitly." },
      { name: "Include as-is language and disclosures", text: "Private-party sales are typically as-is with no warranty. State any known defects to avoid later fraud claims." },
      { name: "Sign per state formalities", text: "The wizard adds notary blocks where required (e.g. Florida, Pennsylvania). Both parties sign and keep a copy." },
    ],
    faqs: (state) => [
      { q: `Do I need a bill of sale to sell a car in ${state}?`, a: `${state === "Florida" || state === "Pennsylvania" ? "Yes — " + state + " requires a notarized bill of sale (or equivalent) for private-party vehicle sales." : "Not always required by statute, but the DMV expects one for private-party sales and both parties benefit from having a written record."}` },
      { q: `Do I need to notarize the bill of sale?`, a: `${state === "Florida" || state === "Pennsylvania" ? "Yes — " + state + " requires notarization of the seller's signature." : "Notarization is not required for a private-party vehicle sale in " + state + ", though buyers sometimes request it as extra assurance."}` },
      { q: `Who pays the sales tax on a private-party sale in ${state}?`, a: `The buyer pays sales/use tax at the time of titling and registration. ${state} uses ${state === "Texas" ? "Standard Presumptive Value (SPV)" : state === "Illinois" ? "a flat-fee schedule for lower-priced vehicles" : "the sale price stated on the bill of sale"} as the tax basis.` },
      { q: `How soon must the buyer register the vehicle?`, a: `${state === "California" ? "10 days" : state === "New York" || state === "Texas" || state === "Florida" ? "30 days" : state === "Illinois" || state === "Pennsylvania" ? "20 days" : "The state deadline"} from the date of purchase, or late-transfer penalties apply.` },
      { q: `What if the buyer never registers the vehicle?`, a: `The seller can be exposed to liability for parking tickets, tolls, or accidents. Submit your state's notice-of-transfer form promptly — ${state === "California" ? "REG 138 within 5 days" : state === "Texas" ? "Form VTR-346 vehicle transfer notification" : state === "Florida" ? "Notice of Sale via HSMV 82050 within 30 days" : "your state's transfer notification form"} — to release your liability.` },
    ],
  },
};
