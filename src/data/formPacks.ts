import type { FormFieldDef, LegalFormDef } from "./forms";
import { getFormBySlug } from "./forms";

/**
 * A form pack is a bundled multi-form wizard that collects shared information
 * once (name, address, property details, etc.), lets the user toggle which
 * documents to generate, and produces a single downloadable ZIP.
 *
 * Each pack member points at an existing LegalFormDef by slug. The pack wizard
 * merges shared data + per-form deltas and passes the union to generateFormPdf
 * per member.
 *
 * Pricing is pack-level; individual forms remain available at /forms/{slug}
 * at their own per-form price.
 */

export interface PackMember {
  formSlug: string;
  /** Selected by default in the pack picker step. */
  defaultSelected: boolean;
  /** Optional members show as an unchecked toggle (e.g. Contractor Agreement
   *  in the New Hire pack). */
  optional?: boolean;
  /** Per-form fields whose id differs from the shared field id — mapped from
   *  a shared field. Runs during PDF generation only. */
  sharedFieldOverrides?: Record<string, string>;
}

export interface PackSharedField extends FormFieldDef {
  /** Group label rendered as a step title in the pack wizard. */
  group: string;
  /** List of `{formSlug}.{fieldId}` locations this shared field populates. */
  distributeTo: string[];
}

export interface FormPack {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: "employment" | "realestate" | "business" | "personal" | "gdpr";
  /** Region — controls hub placement & wizard breadcrumb. Defaults to "us". */
  region?: "us" | "eu";
  priceUsd: number;
  savingsCopy: string;
  overview: string;
  members: PackMember[];
  sharedFields: PackSharedField[];
  /** Extra intro copy shown above the disclaimer. */
  disclaimer?: string;
}

// ---------------------------------------------------------------------------
// New Hire Pack — /forms/new-hire-pack
// ---------------------------------------------------------------------------
const newHirePack: FormPack = {
  slug: "new-hire-pack",
  title: "New Hire Forms Pack",
  seoTitle: "New Hire Forms Pack – Complete Employment Onboarding Documents",
  seoDescription:
    "Complete every new-hire document — W-4, I-9, offer letter, NDA, direct deposit, and optional contractor agreement — in a single guided wizard. Free watermarked PDFs or clean professional pack.",
  category: "employment",
  priceUsd: 34,
  savingsCopy: "Save vs. buying each form individually. All clean PDFs delivered as one ZIP.",
  overview:
    "Everything an employer needs to bring on a new employee — tax forms, eligibility verification, offer letter, confidentiality agreement, and direct deposit authorization. Fill shared employee and employer information once; each document is generated with the right data.",
  members: [
    { formSlug: "w-4", defaultSelected: true },
    { formSlug: "i-9", defaultSelected: true },
    { formSlug: "offer-letter", defaultSelected: true },
    { formSlug: "nda", defaultSelected: true },
    { formSlug: "direct-deposit-authorization", defaultSelected: true },
    { formSlug: "independent-contractor-agreement", defaultSelected: false, optional: true },
  ],
  sharedFields: [
    // Employee identity
    { group: "Employee", id: "shared_employeeFirstName", label: "Employee first name", type: "text", required: true,
      distributeTo: ["w-4.firstName", "i-9.firstName", "offer-letter.candidateName", "nda.party2Name", "direct-deposit-authorization.employeeName"] },
    { group: "Employee", id: "shared_employeeLastName", label: "Employee last name", type: "text", required: true,
      distributeTo: ["w-4.lastName", "i-9.lastName"] },
    { group: "Employee", id: "shared_employeeAddress", label: "Employee home address (street, city, state, ZIP)", type: "textarea", required: true,
      distributeTo: ["w-4.address", "i-9.address", "offer-letter.candidateAddress", "direct-deposit-authorization.employeeAddress"] },
    { group: "Employee", id: "shared_employeeSSN", label: "Employee SSN", type: "ssn",
      distributeTo: ["w-4.ssn", "i-9.ssn", "direct-deposit-authorization.employeeSSN"] },
    { group: "Employee", id: "shared_employeeDOB", label: "Employee date of birth", type: "date",
      distributeTo: ["i-9.dob"] },
    { group: "Employee", id: "shared_employeeEmail", label: "Employee email", type: "email",
      distributeTo: ["i-9.email"] },
    // Employer
    { group: "Employer", id: "shared_employerName", label: "Employer / company name", type: "text", required: true,
      distributeTo: ["offer-letter.employerName", "nda.party1Name", "direct-deposit-authorization.employerName", "independent-contractor-agreement.clientName"] },
    { group: "Employer", id: "shared_employerAddress", label: "Employer address", type: "textarea",
      distributeTo: ["offer-letter.employerAddress", "independent-contractor-agreement.clientAddress"] },
    // Role / start
    { group: "Position & pay", id: "shared_jobTitle", label: "Job title", type: "text", required: true,
      distributeTo: ["offer-letter.jobTitle"] },
    { group: "Position & pay", id: "shared_startDate", label: "Start date", type: "date", required: true,
      distributeTo: ["offer-letter.startDate", "direct-deposit-authorization.effectiveDate"] },
    { group: "Position & pay", id: "shared_payRate", label: "Compensation (e.g. $75,000 / year)", type: "text",
      distributeTo: ["offer-letter.payRate"] },
    { group: "Position & pay", id: "shared_letterDate", label: "Offer / hire date", type: "date",
      distributeTo: ["offer-letter.letterDate"] },
  ],
};

// ---------------------------------------------------------------------------
// Landlord Starter Pack — /forms/landlord-starter-pack
// ---------------------------------------------------------------------------
const landlordPack: FormPack = {
  slug: "landlord-starter-pack",
  title: "Landlord Starter Forms Pack",
  seoTitle: "Landlord Starter Forms Pack – Rental Property Documents",
  seoDescription:
    "Everything a landlord needs — lease, eviction notice, notice to vacate, inspection checklist, security deposit receipt, and late rent notice — in one guided wizard.",
  category: "realestate",
  priceUsd: 29,
  savingsCopy: "Everything you need to start or manage a rental. One shared property + tenant profile.",
  overview:
    "Six documents that cover the full landlord lifecycle: signing a new tenant, moving them in, handling missed rent, and — if needed — ending the tenancy. State-aware rules apply where required.",
  members: [
    { formSlug: "residential-lease-agreement", defaultSelected: true },
    { formSlug: "move-in-move-out-checklist", defaultSelected: true },
    { formSlug: "security-deposit-receipt", defaultSelected: true },
    { formSlug: "late-rent-notice", defaultSelected: false, optional: true },
    { formSlug: "notice-to-vacate", defaultSelected: false, optional: true },
    { formSlug: "eviction-notice", defaultSelected: false, optional: true },
  ],
  sharedFields: [
    { group: "Landlord", id: "shared_landlordName", label: "Landlord / owner name", type: "text", required: true,
      distributeTo: ["residential-lease-agreement.landlordName", "move-in-move-out-checklist.landlordName", "security-deposit-receipt.landlordName", "late-rent-notice.landlordName", "notice-to-vacate.landlordName", "eviction-notice.landlordName"] },
    { group: "Landlord", id: "shared_landlordAddress", label: "Landlord address (where tenant sends notices)", type: "textarea",
      distributeTo: ["residential-lease-agreement.landlordAddress", "notice-to-vacate.landlordAddress"] },
    { group: "Tenant", id: "shared_tenantName", label: "Tenant name(s)", type: "text", required: true,
      distributeTo: ["residential-lease-agreement.tenantName", "move-in-move-out-checklist.tenantName", "security-deposit-receipt.tenantName", "late-rent-notice.tenantName", "notice-to-vacate.tenantName", "eviction-notice.tenantName"] },
    { group: "Property", id: "shared_propertyAddress", label: "Rental property address", type: "textarea", required: true,
      distributeTo: ["residential-lease-agreement.propertyAddress", "move-in-move-out-checklist.propertyAddress", "security-deposit-receipt.propertyAddress", "late-rent-notice.propertyAddress", "notice-to-vacate.propertyAddress", "eviction-notice.propertyAddress"] },
    { group: "Property", id: "shared_propertyState", label: "State", type: "usState", required: true,
      distributeTo: ["residential-lease-agreement.state", "security-deposit-receipt.propertyState", "late-rent-notice.propertyState", "notice-to-vacate.propertyState", "eviction-notice.state"] },
    { group: "Lease terms", id: "shared_monthlyRent", label: "Monthly rent (USD)", type: "text",
      distributeTo: ["residential-lease-agreement.monthlyRent", "late-rent-notice.rentAmount"] },
    { group: "Lease terms", id: "shared_leaseStart", label: "Lease start date", type: "date",
      distributeTo: ["residential-lease-agreement.leaseStart"] },
    { group: "Lease terms", id: "shared_leaseEnd", label: "Lease end date", type: "date",
      distributeTo: ["residential-lease-agreement.leaseEnd"] },
    { group: "Lease terms", id: "shared_depositAmount", label: "Security deposit (USD)", type: "text",
      distributeTo: ["residential-lease-agreement.securityDeposit", "security-deposit-receipt.depositAmount"] },
  ],
};

// ---------------------------------------------------------------------------
// Small Business Basics Pack — /forms/small-business-pack
// ---------------------------------------------------------------------------
const smallBusinessPack: FormPack = {
  slug: "small-business-pack",
  title: "Small Business Basics Pack",
  seoTitle: "Small Business Forms Pack – Essential Startup & Operations Documents",
  seoDescription:
    "Every core small-business document in one wizard — contractor agreement, NDA, bill of sale, promissory note, LLC operating agreement, and demand letter.",
  category: "business",
  priceUsd: 39,
  savingsCopy: "Six essential business templates. One shared business profile.",
  overview:
    "The forms every small business ends up needing: hire a contractor, protect confidential info, sell an asset, document a loan, formalize your LLC, and chase down a debt — all in one guided wizard.",
  members: [
    { formSlug: "independent-contractor-agreement", defaultSelected: true },
    { formSlug: "nda", defaultSelected: true },
    { formSlug: "llc-operating-agreement", defaultSelected: true },
    { formSlug: "vehicle-bill-of-sale", defaultSelected: false, optional: true },
    { formSlug: "promissory-note", defaultSelected: false, optional: true },
    { formSlug: "demand-letter", defaultSelected: false, optional: true },
  ],
  sharedFields: [
    { group: "Your business", id: "shared_businessName", label: "Business / LLC legal name", type: "text", required: true,
      distributeTo: ["llc-operating-agreement.llcName", "independent-contractor-agreement.clientName", "nda.party1Name", "demand-letter.senderName", "promissory-note.lenderName"] },
    { group: "Your business", id: "shared_businessAddress", label: "Business address", type: "textarea", required: true,
      distributeTo: ["llc-operating-agreement.principalAddress", "independent-contractor-agreement.clientAddress", "demand-letter.senderAddress"] },
    { group: "Your business", id: "shared_businessState", label: "Formation state", type: "usState", required: true,
      distributeTo: ["llc-operating-agreement.formationState", "independent-contractor-agreement.governingState"] },
    { group: "Owner / signer", id: "shared_ownerName", label: "Owner / signer name", type: "text", required: true,
      distributeTo: ["llc-operating-agreement.member1Name"] },
    { group: "Owner / signer", id: "shared_ownerAddress", label: "Owner / signer address", type: "textarea",
      distributeTo: ["llc-operating-agreement.member1Address"] },
  ],
  disclaimer:
    "LLC operating agreements, contractor agreements, and promissory notes have material tax and liability consequences. Have these reviewed by a licensed attorney or CPA before signing.",
};

// ---------------------------------------------------------------------------
// Personal Planning Pack — /forms/personal-planning-pack
// ---------------------------------------------------------------------------
const personalPlanningPack: FormPack = {
  slug: "personal-planning-pack",
  title: "Personal Planning Forms Pack",
  seoTitle: "Personal Planning Forms Pack – Estate & Health Care Documents",
  seoDescription:
    "A guided pack of the five essential personal-planning documents — financial POA, healthcare POA, simple will, living will, and HIPAA authorization.",
  category: "personal",
  priceUsd: 34,
  savingsCopy: "One shared personal profile fills all five documents.",
  overview:
    "The core documents every adult should have on file. Appoint someone to handle your finances and healthcare, write a basic will, state your end-of-life wishes, and authorize medical information sharing.",
  members: [
    { formSlug: "power-of-attorney-financial", defaultSelected: true },
    { formSlug: "healthcare-power-of-attorney", defaultSelected: true },
    { formSlug: "simple-will", defaultSelected: true },
    { formSlug: "living-will", defaultSelected: true },
    { formSlug: "hipaa-authorization", defaultSelected: true },
  ],
  sharedFields: [
    { group: "You (the principal)", id: "shared_principalName", label: "Your full legal name", type: "text", required: true,
      distributeTo: ["power-of-attorney-financial.principalName", "healthcare-power-of-attorney.principalName", "simple-will.testatorName", "living-will.principalName", "hipaa-authorization.patientName"] },
    { group: "You (the principal)", id: "shared_principalAddress", label: "Home address", type: "textarea", required: true,
      distributeTo: ["power-of-attorney-financial.principalAddress", "healthcare-power-of-attorney.principalAddress", "simple-will.testatorAddress", "living-will.principalAddress", "hipaa-authorization.patientAddress"] },
    { group: "You (the principal)", id: "shared_principalDOB", label: "Date of birth", type: "date",
      distributeTo: ["healthcare-power-of-attorney.principalDOB", "living-will.principalDOB", "hipaa-authorization.patientDOB"] },
    { group: "You (the principal)", id: "shared_principalState", label: "State of residence", type: "usState", required: true,
      distributeTo: ["power-of-attorney-financial.principalState", "healthcare-power-of-attorney.principalState", "simple-will.testatorState", "living-will.principalState"] },
    { group: "Your agent", id: "shared_agentName", label: "Primary agent name (financial + healthcare)", type: "text", required: true,
      distributeTo: ["power-of-attorney-financial.agentName", "healthcare-power-of-attorney.agentName"] },
    { group: "Your agent", id: "shared_agentAddress", label: "Agent address", type: "textarea",
      distributeTo: ["power-of-attorney-financial.agentAddress", "healthcare-power-of-attorney.agentAddress"] },
    { group: "Your agent", id: "shared_agentPhone", label: "Agent phone", type: "text",
      distributeTo: ["healthcare-power-of-attorney.agentPhone"] },
    { group: "Your agent", id: "shared_alternateAgentName", label: "Alternate agent name", type: "text",
      distributeTo: ["power-of-attorney-financial.alternateAgentName", "healthcare-power-of-attorney.alternateAgentName"] },
  ],
  disclaimer:
    "Estate and healthcare documents have strict signing and witnessing requirements that vary by state. This pack is not a substitute for review by a licensed estate-planning attorney.",
};

// ---------------------------------------------------------------------------
// EU GDPR & Data Protection Pack — /eu-forms/gdpr-pack
// ---------------------------------------------------------------------------
const euGdprPack: FormPack = {
  slug: "gdpr-pack",
  title: "EU GDPR & Data Protection Forms Pack",
  seoTitle: "EU GDPR & Data Protection Forms Pack — DPA, Consent, DSAR, RTBF, Breach & Privacy Policy",
  seoDescription:
    "Every GDPR document an EU business needs in one guided wizard: Data Processing Agreement, Consent Form, DSAR, Right to be Forgotten, Breach Notification, and Privacy Policy.",
  category: "gdpr",
  region: "eu",
  priceUsd: 44,
  savingsCopy: "Six GDPR documents in one pack. Fill shared controller information once.",
  overview:
    "The six documents every EU business needs to be GDPR-defensible: DPA for your vendors, a valid Consent Form, a template for handling access requests (DSAR) and erasure requests (RTBF), a Breach Notification ready to send within 72 hours, and a compliant Privacy Policy.",
  members: [
    { formSlug: "eu-gdpr-dpa", defaultSelected: true },
    { formSlug: "eu-gdpr-consent", defaultSelected: true },
    { formSlug: "eu-privacy-policy", defaultSelected: true },
    { formSlug: "eu-dsar-request", defaultSelected: true },
    { formSlug: "eu-rtbf-request", defaultSelected: true },
    { formSlug: "eu-data-breach-notification", defaultSelected: false, optional: true },
  ],
  sharedFields: [
    { group: "Country", id: "shared_country", label: "Applicable country / jurisdiction", type: "select", required: true,
      options: [
        { value: "generic", label: "Generic EU (any member state)" },
        { value: "DE", label: "Germany" }, { value: "FR", label: "France" }, { value: "ES", label: "Spain" },
        { value: "IT", label: "Italy" }, { value: "NL", label: "Netherlands" }, { value: "IE", label: "Ireland" },
        { value: "BE", label: "Belgium" }, { value: "PT", label: "Portugal" }, { value: "PL", label: "Poland" }, { value: "SE", label: "Sweden" },
      ],
      distributeTo: [
        "eu-gdpr-dpa.__euCountry","eu-gdpr-consent.__euCountry","eu-privacy-policy.__euCountry",
        "eu-dsar-request.__euCountry","eu-rtbf-request.__euCountry","eu-data-breach-notification.__euCountry",
      ] },
    { group: "Your organisation", id: "shared_controllerName", label: "Controller / organisation legal name", type: "text", required: true,
      distributeTo: ["eu-gdpr-dpa.controllerName","eu-gdpr-consent.controllerName","eu-privacy-policy.controllerName","eu-data-breach-notification.controllerName"] },
    { group: "Your organisation", id: "shared_controllerAddress", label: "Registered address", type: "textarea", required: true,
      distributeTo: ["eu-gdpr-dpa.controllerAddress","eu-privacy-policy.controllerAddress","eu-data-breach-notification.controllerAddress"] },
    { group: "Your organisation", id: "shared_privacyContact", label: "Privacy / DPO contact email", type: "email",
      distributeTo: ["eu-privacy-policy.contactEmail","eu-gdpr-consent.controllerContact"] },
    { group: "Your organisation", id: "shared_websiteUrl", label: "Website / service URL", type: "text",
      distributeTo: ["eu-privacy-policy.websiteUrl"] },
  ],
  disclaimer:
    "GDPR compliance depends heavily on your specific processing activities and national implementing law. Use these as starting drafts and have them reviewed by a data-protection lawyer or DPO before use.",
};

// ---------------------------------------------------------------------------
// EU Employment & Freelance Pack — /eu-forms/employment-pack
// ---------------------------------------------------------------------------
const euEmploymentPack: FormPack = {
  slug: "employment-pack",
  title: "EU Employment & Freelance Forms Pack",
  seoTitle: "EU Employment & Freelance Forms Pack — Contracts, NDA & Director Appointment",
  seoDescription:
    "Everything to hire in the EU: employment contract, freelance contract, EU independent contractor agreement, NDA with GDPR clauses, and director appointment letter — one guided wizard.",
  category: "employment",
  region: "eu",
  priceUsd: 39,
  savingsCopy: "Hire employees, freelancers, contractors and directors. One shared employer profile.",
  overview:
    "Five contracts covering the full spectrum of EU engagements — from a permanent employee under Directive 2019/1152 to a genuine self-employed contractor, plus a GDPR-aware NDA and a formal director appointment.",
  members: [
    { formSlug: "eu-employment-contract", defaultSelected: true },
    { formSlug: "eu-freelance-contract", defaultSelected: true },
    { formSlug: "eu-independent-contractor-agreement", defaultSelected: false, optional: true },
    { formSlug: "eu-nda", defaultSelected: true },
    { formSlug: "eu-director-appointment", defaultSelected: false, optional: true },
  ],
  sharedFields: [
    { group: "Country", id: "shared_country", label: "Applicable country / jurisdiction", type: "select", required: true,
      options: [
        { value: "generic", label: "Generic EU" }, { value: "DE", label: "Germany" }, { value: "FR", label: "France" },
        { value: "ES", label: "Spain" }, { value: "IT", label: "Italy" }, { value: "NL", label: "Netherlands" },
        { value: "IE", label: "Ireland" }, { value: "BE", label: "Belgium" }, { value: "PT", label: "Portugal" },
        { value: "PL", label: "Poland" }, { value: "SE", label: "Sweden" },
      ],
      distributeTo: [
        "eu-employment-contract.__euCountry","eu-freelance-contract.__euCountry",
        "eu-independent-contractor-agreement.__euCountry","eu-nda.__euCountry","eu-director-appointment.__euCountry",
      ] },
    { group: "Your company (employer / client)", id: "shared_employerName", label: "Company / employer legal name", type: "text", required: true,
      distributeTo: [
        "eu-employment-contract.employerName","eu-freelance-contract.clientName",
        "eu-independent-contractor-agreement.clientName","eu-nda.party1Name","eu-director-appointment.companyName",
      ] },
    { group: "Your company (employer / client)", id: "shared_employerAddress", label: "Company address", type: "textarea", required: true,
      distributeTo: [
        "eu-employment-contract.employerAddress","eu-freelance-contract.clientAddress",
        "eu-independent-contractor-agreement.clientAddress","eu-director-appointment.registeredAddress",
      ] },
    { group: "Worker (employee / freelancer)", id: "shared_workerName", label: "Worker full name", type: "text", required: true,
      distributeTo: [
        "eu-employment-contract.employeeName","eu-freelance-contract.freelancerName",
        "eu-independent-contractor-agreement.contractorName","eu-nda.party2Name","eu-director-appointment.directorName",
      ] },
    { group: "Worker (employee / freelancer)", id: "shared_workerAddress", label: "Worker address", type: "textarea", required: true,
      distributeTo: [
        "eu-employment-contract.employeeAddress","eu-freelance-contract.freelancerAddress",
        "eu-independent-contractor-agreement.contractorAddress","eu-director-appointment.directorAddress",
      ] },
    { group: "Engagement", id: "shared_startDate", label: "Start / effective date", type: "date", required: true,
      distributeTo: [
        "eu-employment-contract.startDate","eu-freelance-contract.startDate",
        "eu-independent-contractor-agreement.startDate","eu-director-appointment.appointmentDate","eu-nda.signatoryDate",
      ] },
  ],
  disclaimer:
    "Employment, self-employment classification, and directors' duties are heavily regulated at national level. Have these reviewed by a local employment or corporate lawyer before signing.",
};

// ---------------------------------------------------------------------------
// EU Business Starter Pack — /eu-forms/business-starter-pack
// ---------------------------------------------------------------------------
const euBusinessStarterPack: FormPack = {
  slug: "business-starter-pack",
  title: "EU Small Business Starter Forms Pack",
  seoTitle: "EU Small Business Starter Forms Pack — Service Agreement, IP, VAT Invoice, Shareholders & Collection",
  seoDescription:
    "Every core document to run a small EU business: service / consulting agreement, IP assignment, VAT invoice, director appointment, basic shareholder agreement, and EU demand letter.",
  category: "business",
  region: "eu",
  priceUsd: 44,
  savingsCopy: "Six essential EU business templates. One shared business profile.",
  overview:
    "The paperwork every EU startup ends up needing: sign consulting clients, assign IP, invoice with VAT, appoint a director, set out shareholder terms, and — when needed — chase down an unpaid invoice under the Late Payment Directive.",
  members: [
    { formSlug: "eu-service-agreement", defaultSelected: true },
    { formSlug: "eu-ip-assignment", defaultSelected: true },
    { formSlug: "eu-vat-invoice", defaultSelected: true },
    { formSlug: "eu-director-appointment", defaultSelected: true },
    { formSlug: "eu-shareholder-agreement", defaultSelected: false, optional: true },
    { formSlug: "eu-demand-letter", defaultSelected: false, optional: true },
  ],
  sharedFields: [
    { group: "Country", id: "shared_country", label: "Country of establishment", type: "select", required: true,
      options: [
        { value: "generic", label: "Generic EU" }, { value: "DE", label: "Germany" }, { value: "FR", label: "France" },
        { value: "ES", label: "Spain" }, { value: "IT", label: "Italy" }, { value: "NL", label: "Netherlands" },
        { value: "IE", label: "Ireland" }, { value: "BE", label: "Belgium" }, { value: "PT", label: "Portugal" },
        { value: "PL", label: "Poland" }, { value: "SE", label: "Sweden" },
      ],
      distributeTo: [
        "eu-service-agreement.__euCountry","eu-ip-assignment.__euCountry","eu-vat-invoice.__euCountry",
        "eu-director-appointment.__euCountry","eu-shareholder-agreement.__euCountry","eu-demand-letter.__euCountry",
      ] },
    { group: "Your business", id: "shared_businessName", label: "Business legal name", type: "text", required: true,
      distributeTo: [
        "eu-service-agreement.providerName","eu-ip-assignment.assigneeName","eu-vat-invoice.sellerName",
        "eu-director-appointment.companyName","eu-shareholder-agreement.companyName","eu-demand-letter.senderName",
      ] },
    { group: "Your business", id: "shared_businessAddress", label: "Business address", type: "textarea", required: true,
      distributeTo: [
        "eu-service-agreement.providerAddress","eu-ip-assignment.assigneeAddress","eu-vat-invoice.sellerAddress",
        "eu-director-appointment.registeredAddress","eu-shareholder-agreement.registeredAddress","eu-demand-letter.senderAddress",
      ] },
    { group: "Your business", id: "shared_vatNumber", label: "VAT number", type: "text",
      distributeTo: ["eu-service-agreement.providerVat","eu-vat-invoice.sellerVat","eu-demand-letter.senderVat"] },
  ],
  disclaimer:
    "Company formation, share transfers, IP moral-rights waivers, and VAT rules vary materially between member states. Use these as starting drafts and confirm locally before signing.",
};

// ---------------------------------------------------------------------------
// EU Personal & Consumer Pack — /eu-forms/personal-pack
// ---------------------------------------------------------------------------
const euPersonalPack: FormPack = {
  slug: "personal-pack",
  title: "EU Personal & Consumer Forms Pack",
  seoTitle: "EU Personal & Consumer Forms Pack — POA, 14-Day Withdrawal, Complaint, Tenancy & Will",
  seoDescription:
    "Five personal EU documents in one guided pack: Power of Attorney, 14-day consumer withdrawal, complaint letter, basic rental agreement, and simple will.",
  category: "personal",
  region: "eu",
  priceUsd: 34,
  savingsCopy: "One shared personal profile fills every document.",
  overview:
    "The five documents most EU consumers and residents end up needing at some point: appoint someone to act on your behalf, cancel an online purchase within 14 days, formally complain to a trader, rent a home, and draft a simple will.",
  members: [
    { formSlug: "eu-power-of-attorney", defaultSelected: true },
    { formSlug: "eu-consumer-withdrawal", defaultSelected: true },
    { formSlug: "eu-consumer-complaint", defaultSelected: true },
    { formSlug: "eu-rental-agreement", defaultSelected: false, optional: true },
    { formSlug: "eu-simple-will", defaultSelected: false, optional: true },
  ],
  sharedFields: [
    { group: "Country", id: "shared_country", label: "Country of residence", type: "select", required: true,
      options: [
        { value: "generic", label: "Generic EU" }, { value: "DE", label: "Germany" }, { value: "FR", label: "France" },
        { value: "ES", label: "Spain" }, { value: "IT", label: "Italy" }, { value: "NL", label: "Netherlands" },
        { value: "IE", label: "Ireland" }, { value: "BE", label: "Belgium" }, { value: "PT", label: "Portugal" },
        { value: "PL", label: "Poland" }, { value: "SE", label: "Sweden" },
      ],
      distributeTo: [
        "eu-power-of-attorney.__euCountry","eu-consumer-withdrawal.__euCountry",
        "eu-consumer-complaint.__euCountry","eu-rental-agreement.__euCountry","eu-simple-will.__euCountry",
      ] },
    { group: "You", id: "shared_personalName", label: "Your full legal name", type: "text", required: true,
      distributeTo: [
        "eu-power-of-attorney.principalName","eu-consumer-withdrawal.consumerName",
        "eu-consumer-complaint.consumerName","eu-rental-agreement.tenantName","eu-simple-will.testatorName",
      ] },
    { group: "You", id: "shared_personalAddress", label: "Your address", type: "textarea", required: true,
      distributeTo: [
        "eu-power-of-attorney.principalAddress","eu-consumer-withdrawal.consumerAddress",
        "eu-consumer-complaint.consumerAddress","eu-simple-will.testatorAddress",
      ] },
    { group: "You", id: "shared_personalEmail", label: "Your email", type: "email",
      distributeTo: ["eu-consumer-complaint.consumerEmail"] },
    { group: "You", id: "shared_personalDob", label: "Your date of birth", type: "date",
      distributeTo: ["eu-simple-will.testatorDob"] },
  ],
  disclaimer:
    "Powers of attorney, wills, and residential tenancies are subject to national formalities (notarisation, witnessing, minimum terms). Use as drafts only and finalise with a local notary or lawyer where required.",
};

export const formPacks: FormPack[] = [
  newHirePack,
  landlordPack,
  smallBusinessPack,
  personalPlanningPack,
  euGdprPack,
  euEmploymentPack,
  euBusinessStarterPack,
  euPersonalPack,
];

export const getPackBySlug = (slug: string): FormPack | undefined =>
  formPacks.find((p) => p.slug === slug);

/**
 * Resolve pack members to their LegalFormDef entries (drops any missing slug).
 */
export function getPackFormDefs(pack: FormPack): Array<{ member: PackMember; def: LegalFormDef }> {
  return pack.members
    .map((member) => {
      const def = getFormBySlug(member.formSlug);
      return def ? { member, def } : null;
    })
    .filter(Boolean) as Array<{ member: PackMember; def: LegalFormDef }>;
}

/**
 * Given a pack and the wizard's shared-data blob, produce a per-form data
 * object by spreading shared field values into each target `{form}.{field}` id.
 * Non-shared fields for each form remain undefined and simply won't render.
 */
export function distributeSharedData(
  pack: FormPack,
  sharedData: Record<string, unknown>,
  formSlug: string
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of pack.sharedFields) {
    const v = sharedData[field.id];
    if (v === undefined || v === null || v === "") continue;
    for (const target of field.distributeTo) {
      const [targetForm, targetField] = target.split(".");
      if (targetForm === formSlug && targetField) {
        out[targetField] = v;
      }
    }
  }
  return out;
}
