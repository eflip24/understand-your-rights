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
  category: "employment" | "realestate" | "business" | "personal";
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

export const formPacks: FormPack[] = [
  newHirePack,
  landlordPack,
  smallBusinessPack,
  personalPlanningPack,
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
