import { euForms } from "./euForms";
import { euCountryForms } from "./euCountryForms";

export type FormFieldType =
  | "text"
  | "email"
  | "date"
  | "number"
  | "select"
  | "textarea"
  | "checkbox"
  | "radio"
  | "usState"
  | "ssn"
  | "ein";

export interface FormFieldDef {
  id: string;
  label: string;
  type: FormFieldType;
  help?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  /** Field is only rendered / validated when this predicate returns true. */
  showWhen?: (data: Record<string, unknown>) => boolean;
  /** Small italic note rendered directly under the field (used for the IRS
   *  "Note:" block under Line 3a). Plain text; wraps naturally. */
  note?: string;
}

export interface FormStepDef {
  id: string;
  title: string;
  description?: string;
  /** Optional block of exact regulatory text rendered under the description
   *  (Part I instructions, Part II certification, etc.). */
  note?: string;
  fields: FormFieldDef[];
}

export type FormCategory =
  | "employment"
  | "tax"
  | "business"
  | "realestate"
  | "personal";

export type PdfTemplate =
  | "w9"
  | "i9"
  | "w4"
  | "nda"
  | "lease"
  | "poa"
  | "billOfSale"
  | "evictionNotice"
  | "demandLetter"
  | "promissoryNote"
  | "releaseOfLiability"
  // Generic renderer covers the following (Batch 4 pack forms + EU Batch 5).
  | "generic"
  | "offerLetter"
  | "independentContractor"
  | "directDeposit"
  | "noticeToVacate"
  | "moveInOutChecklist"
  | "securityDepositReceipt"
  | "lateRentNotice"
  | "llcOperatingAgreement"
  | "healthcarePoa"
  | "simpleWill"
  | "livingWill"
  | "hipaaAuthorization";

export interface LegalFormDef {
  slug: string;
  title: string;
  shortDescription: string;
  category: FormCategory;
  price: number; // USD for clean PDF (EUR for EU forms)
  lastUpdated: string; // ISO date
  isFeatured?: boolean;
  steps: FormStepDef[];
  pdfTemplate: PdfTemplate;
  relatedForms?: string[];
  relatedBlogSlugs?: string[];
  /** Official government URL (IRS, USCIS). When set, the wizard page renders
   *  a "verify at official source" callout. */
  officialLink?: { label: string; href: string };
  /** Optional short edition tag rendered in the header (e.g. "Rev. March 2024",
   *  "Edition 01/20/25 · Expires 05/31/2027"). */
  edition?: string;
  /** When true, the wizard renders a StateSelector at the top of the flow and
   *  the PDF appends a state-specific rules appendix. */
  stateAware?: boolean;
  /** Jurisdiction bucket — controls hub separation. Defaults to "us". */
  region?: "us" | "eu";
  /** EU-hub subcategory. Only meaningful when region === "eu". */
  euCategory?: "gdpr" | "employment" | "consumer" | "business" | "realestate" | "personal" | "tax";
  /** Optional ISO country code for country-native EU forms (Batch 7).
   *  When set, the form is routed under `/eu-forms/:country/:slug`. */
  country?: "de" | "fr" | "es" | "it" | "nl" | "pl";
}


export const categoryLabels: Record<FormCategory, string> = {
  employment: "Employment",
  tax: "Tax",
  business: "Business",
  realestate: "Real Estate",
  personal: "Personal",
};

/** IRS W-9 (Rev. March 2024) Line 3a — the seven official boxes, in order. */
export const W9_CLASSIFICATIONS = [
  { value: "individual", label: "Individual / sole proprietor" },
  { value: "cCorp", label: "C corporation" },
  { value: "sCorp", label: "S corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "trust", label: "Trust / estate" },
  { value: "llc", label: "LLC" },
  { value: "other", label: "Other (see instructions)" },
] as const;

export const legalForms: LegalFormDef[] = [
  {
    slug: "w-9",
    title:
      "Free Fillable Form W-9 (Rev. March 2024) – Request for Taxpayer Identification Number and Certification",
    shortDescription:
      "Fill the official IRS Form W-9 online, save your progress, and download a clean PDF to send to any requester.",
    category: "tax",
    price: 4.99,
    lastUpdated: "2024-03-01",
    isFeatured: true,
    pdfTemplate: "w9",
    edition: "Rev. March 2024",
    officialLink: { label: "irs.gov/FormW9", href: "https://www.irs.gov/forms-pubs/about-form-w-9" },

    steps: [
      {
        id: "name-classification",
        title: "Name & tax classification",
        description:
          "Lines 1–3 of the W-9. Match Line 1 exactly to the name shown on your income tax return.",
        fields: [
          {
            id: "name",
            label: "Line 1 — Name of entity/individual",
            type: "text",
            required: true,
            help:
              "For a sole proprietor or disregarded entity, enter the owner's name on line 1, and enter the business/disregarded entity's name on line 2.",
          },
          {
            id: "businessName",
            label: "Line 2 — Business name / disregarded entity name, if different from above",
            type: "text",
          },
          {
            id: "classification",
            label:
              "Line 3a — Federal tax classification (check only one)",
            type: "radio",
            required: true,
            options: W9_CLASSIFICATIONS.map((c) => ({ value: c.value, label: c.label })),
            note:
              'Note: Check the "LLC" box above and, in the entry space, enter the appropriate code (C, S, or P) for the tax classification of the LLC, unless it is a disregarded entity. A disregarded entity should instead check the appropriate box for the tax classification of its owner.',
          },
          {
            id: "llcTaxCode",
            label:
              "Enter the tax classification (C = C corporation, S = S corporation, P = Partnership)",
            type: "text",
            required: true,
            placeholder: "C, S, or P",
            showWhen: (d) => d.classification === "llc",
          },
          {
            id: "otherDescription",
            label: "Describe the entity type",
            type: "text",
            required: true,
            showWhen: (d) => d.classification === "other",
          },
          {
            id: "foreignPartners",
            label:
              "Line 3b — Check this box if you have any foreign partners, owners, or beneficiaries.",
            type: "checkbox",
            help:
              'Only shown if on line 3a you checked "Partnership" or "Trust/estate," or checked "LLC" and entered "P" as its tax classification, and you are providing this form to a partnership, trust, or estate in which you have an ownership interest.',
            showWhen: (d) => {
              const c = d.classification;
              const llcCode = String(d.llcTaxCode ?? "").trim().toUpperCase();
              return c === "partnership" || c === "trust" || (c === "llc" && llcCode === "P");
            },
          },
        ],
      },
      {
        id: "exemptions-address",
        title: "Exemptions & address",
        description:
          "Line 4 exemption codes apply only to certain entities (not individuals). Line 5–6 is the address where the requester will mail information returns.",
        fields: [
          {
            id: "exemptPayeeCode",
            label: "Line 4a — Exempt payee code (if any)",
            type: "text",
          },
          {
            id: "fatcaCode",
            label:
              "Line 4b — Exemption from FATCA reporting code (if any)",
            type: "text",
            help: "Applies to accounts maintained outside the United States.",
          },
          {
            id: "streetAddress",
            label: "Line 5 — Address (number, street, and apt. or suite no.)",
            type: "text",
            required: true,
          },
          {
            id: "city",
            label: "Line 6 — City",
            type: "text",
            required: true,
          },
          {
            id: "state",
            label: "State",
            type: "usState",
            required: true,
          },
          {
            id: "zip",
            label: "ZIP code",
            type: "text",
            required: true,
            placeholder: "12345 or 12345-6789",
          },
          {
            id: "requesterInfo",
            label: "Requester's name and address (optional)",
            type: "textarea",
          },
          {
            id: "accountNumbers",
            label: "Line 7 — List account number(s) here (optional)",
            type: "text",
          },
        ],
      },
      {
        id: "tin",
        title: "Part I — Taxpayer identification number (TIN)",
        note:
          "Enter your TIN in the appropriate box. The TIN provided must match the name given on line 1 to avoid backup withholding. For individuals, this is generally your social security number (SSN). However, for a resident alien, sole proprietor, or disregarded entity, see the instructions for Part I. For other entities, it is your employer identification number (EIN).",
        fields: [
          {
            id: "tinType",
            label: "Which TIN are you providing?",
            type: "radio",
            required: true,
            options: [
              { value: "ssn", label: "Social security number (SSN)" },
              { value: "ein", label: "Employer identification number (EIN)" },
            ],
          },
          {
            id: "ssn",
            label: "Social security number",
            type: "ssn",
            required: true,
            placeholder: "XXX-XX-XXXX",
            showWhen: (d) => d.tinType === "ssn",
          },
          {
            id: "ein",
            label: "Employer identification number",
            type: "ein",
            required: true,
            placeholder: "XX-XXXXXXX",
            showWhen: (d) => d.tinType === "ein",
          },
        ],
      },
      {
        id: "certification",
        title: "Part II — Certification",
        note:
          "Under penalties of perjury, I certify that:\n\n1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and\n2. I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding; and\n3. I am a U.S. citizen or other U.S. person (defined below); and\n4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.\n\nCertification instructions: You must cross out item 2 above if you have been notified by the IRS that you are currently subject to backup withholding because you have failed to report all interest and dividends on your tax return. For real estate transactions, item 2 does not apply. For mortgage interest paid, acquisition or abandonment of secured property, cancellation of debt, contributions to an individual retirement arrangement (IRA), and generally, payments other than interest and dividends, you are not required to sign the certification, but you must provide your correct TIN.",
        fields: [
          {
            id: "crossOutItem2",
            label:
              'Cross out item 2 above (I have been notified by the IRS that I am currently subject to backup withholding).',
            type: "checkbox",
          },
          {
            id: "signatureName",
            label: "Signature of U.S. person — type your full legal name",
            type: "text",
            required: true,
            help: "By typing your name you consent to sign this document electronically.",
          },
          {
            id: "certifyChecked",
            label:
              "I agree the typed name above is my electronic signature and the information on this form is true and correct.",
            type: "checkbox",
            required: true,
          },
          {
            id: "signatureDate",
            label: "Date",
            type: "date",
            required: true,
          },
        ],
      },
    ],
    relatedForms: ["w-4", "i-9", "nda"],
  },
  // ---------------------------------------------------------------------
  // Form W-4 (2026) — Employee's Withholding Certificate
  // ---------------------------------------------------------------------
  {
    slug: "w-4",
    title: "Free Fillable Form W-4 2026 – Employee's Withholding Certificate",
    shortDescription:
      "Complete the 2026 IRS Form W-4 online step-by-step so your employer withholds the right amount of federal income tax.",
    category: "tax",
    price: 4.99,
    lastUpdated: "2026-01-01",
    isFeatured: true,
    pdfTemplate: "w4",
    edition: "2026",
    officialLink: { label: "irs.gov/FormW4", href: "https://www.irs.gov/forms-pubs/about-form-w-4" },
    steps: [
      {
        id: "personal",
        title: "Step 1 — Personal information",
        description:
          "Enter your name and address exactly as shown on your Social Security card. Choose the filing status you expect to claim on your federal tax return.",
        fields: [
          { id: "firstName", label: "First name and middle initial", type: "text", required: true },
          { id: "lastName", label: "Last name", type: "text", required: true },
          { id: "ssn", label: "Social security number", type: "ssn", required: true, placeholder: "XXX-XX-XXXX" },
          { id: "streetAddress", label: "Address (number and street)", type: "text", required: true },
          { id: "city", label: "City or town", type: "text", required: true },
          { id: "state", label: "State", type: "usState", required: true },
          { id: "zip", label: "ZIP code", type: "text", required: true, placeholder: "12345" },
          {
            id: "filingStatus",
            label: "Step 1(c) — Filing status (check only one)",
            type: "radio",
            required: true,
            options: [
              { value: "single", label: "Single or Married filing separately" },
              { value: "mfj", label: "Married filing jointly or Qualifying surviving spouse" },
              { value: "hoh", label: "Head of household (unmarried and paying more than half the costs of keeping up a home for yourself and a qualifying individual)" },
            ],
          },
          {
            id: "ssnNameMismatch",
            label:
              "Check here if your last name differs from that shown on your Social Security card. You must call 800-772-1213 for a replacement card.",
            type: "checkbox",
          },
        ],
      },
      {
        id: "multiple-jobs",
        title: "Step 2 — Multiple jobs or spouse works",
        description:
          "Complete this step if (1) you hold more than one job at a time, or (2) you're married filing jointly and your spouse also works. Choose ONE of the three options below — using the IRS estimator (a) is most accurate.",
        note:
          "TIP: If you (and/or your spouse) have only one job with pay similar to the other, checking box 2(c) on each W-4 is a simple option that gets close to accurate withholding.",
        fields: [
          {
            id: "step2Method",
            label: "Which method are you using?",
            type: "radio",
            options: [
              { value: "none", label: "Not applicable — I only have one job and (if married) my spouse doesn't work" },
              { value: "estimator", label: "(a) I used the IRS Tax Withholding Estimator at irs.gov/W4App" },
              { value: "worksheet", label: "(b) I used the Multiple Jobs Worksheet on page 3 of Form W-4" },
              { value: "box2c", label: "(c) Two jobs total with roughly similar pay — check box 2(c)" },
            ],
          },
          {
            id: "secondJobAnnualPay",
            label: "Estimated annual pay of your (or your spouse's) second job — quick estimator",
            type: "number",
            placeholder: "e.g., 45000",
            help:
              "Optional. Used only as a rough guide — the actual amount to enter in Step 4(c) depends on your filing status and both incomes. See the IRS Multiple Jobs Worksheet for exact numbers.",
            showWhen: (d) => d.step2Method === "worksheet" || d.step2Method === "estimator",
          },
        ],
      },
      {
        id: "dependents",
        title: "Step 3 — Claim dependents and other credits",
        description:
          "Complete this step only for ONE of your jobs (typically the highest-paying one). If your total income will be $200,000 or less ($400,000 or less if married filing jointly), enter the amounts below.",
        fields: [
          {
            id: "qualifyingChildren",
            label: "Number of qualifying children under age 17",
            type: "number",
            placeholder: "0",
            help: "Each qualifying child is multiplied by $2,000.",
          },
          {
            id: "otherDependents",
            label: "Number of other dependents",
            type: "number",
            placeholder: "0",
            help: "Each other dependent is multiplied by $500.",
          },
          {
            id: "otherCredits",
            label: "Other credits (education credits, foreign tax credit) — $ (optional)",
            type: "number",
            placeholder: "0",
          },
        ],
      },
      {
        id: "adjustments",
        title: "Step 4 — Other adjustments (optional)",
        description:
          "Use this step to fine-tune your withholding. Amounts are annual unless otherwise noted.",
        fields: [
          {
            id: "otherIncome",
            label: "4(a) — Other income (not from jobs). Annual $",
            type: "number",
            placeholder: "0",
            help:
              "Interest, dividends, retirement income. You may prefer to pay estimated tax instead of having it withheld.",
          },
          {
            id: "deductions",
            label: "4(b) — Deductions above the standard deduction. Annual $",
            type: "number",
            placeholder: "0",
            help: "Use the Deductions Worksheet on page 3 of Form W-4 to compute this.",
          },
          {
            id: "extraWithholding",
            label: "4(c) — Extra withholding to take from each pay period. $",
            type: "number",
            placeholder: "0",
            help: "Any additional tax you want withheld each pay period.",
          },
        ],
      },
      {
        id: "sign",
        title: "Step 5 — Sign here",
        description:
          "Under penalties of perjury, I declare that this certificate, to the best of my knowledge and belief, is true, correct, and complete.",
        fields: [
          {
            id: "signatureName",
            label: "Employee's signature — type your full legal name",
            type: "text",
            required: true,
            help: "By typing your name you consent to sign electronically.",
          },
          { id: "signatureDate", label: "Date", type: "date", required: true },
          {
            id: "certify",
            label: "I declare under penalties of perjury that this certificate is true, correct, and complete.",
            type: "checkbox",
            required: true,
          },
        ],
      },
      {
        id: "employer",
        title: "Employers only (optional)",
        description:
          "Section completed by the employer, not the employee. You can leave this blank when downloading your PDF.",
        fields: [
          { id: "employerName", label: "Employer's name and address", type: "textarea" },
          { id: "firstDateOfEmployment", label: "First date of employment", type: "date" },
          { id: "employerEin", label: "Employer identification number (EIN)", type: "ein", placeholder: "XX-XXXXXXX" },
        ],
      },
    ],
    relatedForms: ["w-9", "i-9", "nda"],
  },

  // ---------------------------------------------------------------------
  // Form I-9 — Employment Eligibility Verification (Edition 01/20/25)
  // ---------------------------------------------------------------------
  {
    slug: "i-9",
    title: "Free Fillable Form I-9 Online – Employment Eligibility Verification",
    shortDescription:
      "Complete USCIS Form I-9 online. Employees fill Section 1; employers complete Section 2 with document details.",
    category: "employment",
    price: 4.99,
    lastUpdated: "2025-01-20",
    isFeatured: true,
    pdfTemplate: "i9",
    edition: "Edition 01/20/25 · Expires 05/31/2027",
    officialLink: {
      label: "uscis.gov/i-9",
      href: "https://www.uscis.gov/i-9",
    },
    steps: [
      {
        id: "employee-info",
        title: "Section 1 — Employee information",
        description:
          "Employees must complete and sign Section 1 no later than the first day of employment. Enter your legal name exactly as it appears on your identity documents.",
        fields: [
          { id: "lastName", label: "Last name (family name)", type: "text", required: true },
          { id: "firstName", label: "First name (given name)", type: "text", required: true },
          { id: "middleInitial", label: "Middle initial", type: "text", placeholder: "M" },
          {
            id: "otherLastNames",
            label: "Other last names used (if any)",
            type: "text",
            help: "Include maiden name if applicable. Enter N/A if not applicable.",
          },
          { id: "streetAddress", label: "Address (street number and name)", type: "text", required: true },
          { id: "aptNumber", label: "Apt. number (if any)", type: "text" },
          { id: "city", label: "City or town", type: "text", required: true },
          { id: "state", label: "State", type: "usState", required: true },
          { id: "zip", label: "ZIP code", type: "text", required: true },
          { id: "dob", label: "Date of birth (mm/dd/yyyy)", type: "date", required: true },
          {
            id: "ssn",
            label: "U.S. Social Security Number",
            type: "ssn",
            placeholder: "XXX-XX-XXXX",
            help:
              "Required only if your employer participates in E-Verify. Otherwise voluntary.",
          },
          { id: "email", label: "Employee's email address", type: "email" },
          { id: "phone", label: "Employee's telephone number", type: "text" },
        ],
      },
      {
        id: "attestation",
        title: "Section 1 — Citizenship / immigration status attestation",
        description:
          "I am aware that federal law provides for imprisonment and/or fines for false statements, or the use of false documents, in connection with the completion of this form. I attest, under penalty of perjury, that I am (check one):",
        fields: [
          {
            id: "status",
            label: "Attestation (check only one)",
            type: "radio",
            required: true,
            options: [
              { value: "citizen", label: "1. A citizen of the United States" },
              { value: "national", label: "2. A noncitizen national of the United States (see instructions)" },
              { value: "lpr", label: "3. A lawful permanent resident" },
              { value: "authorized", label: "4. A noncitizen (other than #2 and #3) authorized to work in the United States" },
            ],
          },
          {
            id: "uscisNumber",
            label: "USCIS A-Number / Alien Registration Number",
            type: "text",
            required: true,
            placeholder: "A-XXXXXXXXX",
            showWhen: (d) => d.status === "lpr" || d.status === "authorized",
            help: "For LPRs: A-Number from your Permanent Resident Card. For authorized aliens: your A-Number or USCIS Number if you have one.",
          },
          {
            id: "workAuthExpires",
            label: "Work authorization expiration date (mm/dd/yyyy)",
            type: "date",
            required: true,
            showWhen: (d) => d.status === "authorized",
            help: "Some aliens (e.g., refugees, asylees, some TPS) may write 'N/A' — leave blank if not applicable.",
          },
          {
            id: "i94Number",
            label: "Form I-94 Admission Number (if any)",
            type: "text",
            showWhen: (d) => d.status === "authorized",
          },
          {
            id: "foreignPassportNumber",
            label: "Foreign passport number (if any)",
            type: "text",
            showWhen: (d) => d.status === "authorized",
          },
          {
            id: "passportCountry",
            label: "Country of issuance of foreign passport",
            type: "text",
            showWhen: (d) => d.status === "authorized",
          },
        ],
      },
      {
        id: "employee-sign",
        title: "Section 1 — Signature",
        description:
          "By typing your name below you are signing Section 1 under penalty of perjury. The signature and date must be entered no later than your first day of employment.",
        fields: [
          {
            id: "employeeSignature",
            label: "Signature of employee — type full legal name",
            type: "text",
            required: true,
          },
          { id: "employeeSignatureDate", label: "Today's date (mm/dd/yyyy)", type: "date", required: true },
          {
            id: "preparerUsed",
            label:
              "A preparer and/or translator assisted me in completing Section 1. (If checked, complete the next step.)",
            type: "checkbox",
          },
        ],
      },
      {
        id: "preparer",
        title: "Preparer / Translator certification (only if used)",
        description:
          "To be completed and signed when preparers and/or translators assist an employee in completing Section 1.",
        fields: [
          {
            id: "preparerSignature",
            label: "Signature of preparer or translator — type full name",
            type: "text",
            showWhen: (d) => Boolean(d.preparerUsed),
          },
          {
            id: "preparerDate",
            label: "Date",
            type: "date",
            showWhen: (d) => Boolean(d.preparerUsed),
          },
          {
            id: "preparerLastName",
            label: "Preparer or translator — last name",
            type: "text",
            showWhen: (d) => Boolean(d.preparerUsed),
          },
          {
            id: "preparerFirstName",
            label: "Preparer or translator — first name",
            type: "text",
            showWhen: (d) => Boolean(d.preparerUsed),
          },
          {
            id: "preparerAddress",
            label: "Address (street, city, state, ZIP)",
            type: "textarea",
            showWhen: (d) => Boolean(d.preparerUsed),
          },
        ],
      },
      {
        id: "employer-docs",
        title: "Section 2 — Employer document review",
        description:
          "Employers examine documents establishing (A) both identity and employment authorization, OR (B) identity AND (C) employment authorization. Examine within 3 business days of the employee's first day of employment.",
        fields: [
          {
            id: "docPath",
            label: "Which document combination is the employee presenting?",
            type: "radio",
            required: true,
            options: [
              { value: "listA", label: "List A — a single document establishing both identity and work authorization (e.g., U.S. Passport, Permanent Resident Card, Employment Authorization Document)" },
              { value: "listBC", label: "List B + List C — one identity document AND one employment-authorization document" },
            ],
          },
          // List A block
          { id: "listA_title", label: "List A — Document title", type: "text", showWhen: (d) => d.docPath === "listA" },
          { id: "listA_authority", label: "List A — Issuing authority", type: "text", showWhen: (d) => d.docPath === "listA" },
          { id: "listA_number", label: "List A — Document number", type: "text", showWhen: (d) => d.docPath === "listA" },
          { id: "listA_expiration", label: "List A — Expiration date (if any)", type: "date", showWhen: (d) => d.docPath === "listA" },
          { id: "listA_title2", label: "List A — Additional document title (if any)", type: "text", showWhen: (d) => d.docPath === "listA" },
          { id: "listA_authority2", label: "List A — Additional issuing authority", type: "text", showWhen: (d) => d.docPath === "listA" },
          { id: "listA_number2", label: "List A — Additional document number", type: "text", showWhen: (d) => d.docPath === "listA" },
          // List B
          { id: "listB_title", label: "List B — Identity document title", type: "text", showWhen: (d) => d.docPath === "listBC" },
          { id: "listB_authority", label: "List B — Issuing authority", type: "text", showWhen: (d) => d.docPath === "listBC" },
          { id: "listB_number", label: "List B — Document number", type: "text", showWhen: (d) => d.docPath === "listBC" },
          { id: "listB_expiration", label: "List B — Expiration date (if any)", type: "date", showWhen: (d) => d.docPath === "listBC" },
          // List C
          { id: "listC_title", label: "List C — Employment authorization document title", type: "text", showWhen: (d) => d.docPath === "listBC" },
          { id: "listC_authority", label: "List C — Issuing authority", type: "text", showWhen: (d) => d.docPath === "listBC" },
          { id: "listC_number", label: "List C — Document number", type: "text", showWhen: (d) => d.docPath === "listBC" },
          { id: "listC_expiration", label: "List C — Expiration date (if any)", type: "date", showWhen: (d) => d.docPath === "listBC" },
          {
            id: "firstDayOfEmployment",
            label: "Employee's first day of employment (mm/dd/yyyy)",
            type: "date",
            required: true,
          },
          {
            id: "altProcedure",
            label:
              "Alternative Procedure used — Employer is a qualified E-Verify participant and examined documents remotely in accordance with DHS authorization.",
            type: "checkbox",
          },
        ],
      },
      {
        id: "employer-cert",
        title: "Section 2 — Employer certification",
        description:
          "I attest, under penalty of perjury, that (1) I have examined the documentation presented by the above-named employee, (2) the documentation appears to be genuine and to relate to the employee named, and (3) to the best of my knowledge the employee is authorized to work in the United States.",
        fields: [
          {
            id: "employerSignature",
            label: "Signature of employer or authorized representative — type full legal name",
            type: "text",
            required: true,
          },
          { id: "employerSignatureDate", label: "Date", type: "date", required: true },
          { id: "employerRepTitle", label: "Title of employer or authorized representative", type: "text", required: true },
          { id: "employerRepLastName", label: "Last name of employer or authorized representative", type: "text", required: true },
          { id: "employerRepFirstName", label: "First name of employer or authorized representative", type: "text", required: true },
          { id: "employerBusinessName", label: "Employer's business or organization name", type: "text", required: true },
          {
            id: "employerBusinessAddress",
            label: "Employer's business address (street, city, state, ZIP)",
            type: "textarea",
            required: true,
          },
        ],
      },
      {
        id: "reverification",
        title: "Supplement B — Reverification & rehire (optional)",
        description:
          "Complete only if the employee's work authorization has expired and needs reverification, or if you are rehiring within 3 years of the original Form I-9.",
        fields: [
          {
            id: "reverifyEnable",
            label: "This employee requires reverification or rehire documentation.",
            type: "checkbox",
          },
          { id: "reverifyNewName", label: "Employee's new name (if changed)", type: "text", showWhen: (d) => Boolean(d.reverifyEnable) },
          { id: "reverifyRehireDate", label: "Date of rehire (mm/dd/yyyy)", type: "date", showWhen: (d) => Boolean(d.reverifyEnable) },
          { id: "reverifyDocTitle", label: "Reverification document title", type: "text", showWhen: (d) => Boolean(d.reverifyEnable) },
          { id: "reverifyDocNumber", label: "Reverification document number", type: "text", showWhen: (d) => Boolean(d.reverifyEnable) },
          { id: "reverifyDocExpiration", label: "Reverification document expiration date", type: "date", showWhen: (d) => Boolean(d.reverifyEnable) },
          { id: "reverifySignature", label: "Employer signature (typed)", type: "text", showWhen: (d) => Boolean(d.reverifyEnable) },
          { id: "reverifySignatureDate", label: "Date", type: "date", showWhen: (d) => Boolean(d.reverifyEnable) },
        ],
      },
    ],
    relatedForms: ["w-4", "w-9", "nda"],
  },

  // ---------------------------------------------------------------------
  // Simple NDA (Non-Disclosure Agreement) — original template
  // ---------------------------------------------------------------------
  {
    slug: "nda",
    title: "Free NDA Template – Non-Disclosure Agreement Generator",
    shortDescription:
      "Generate a clean, plain-English Non-Disclosure Agreement — mutual or one-way — in minutes. Download as a professional PDF.",
    category: "business",
    price: 9.99,
    lastUpdated: "2026-01-01",
    isFeatured: true,
    pdfTemplate: "nda",
    steps: [
      {
        id: "parties",
        title: "Parties & agreement type",
        description:
          "Choose whether both sides are exchanging confidential information (Mutual) or only one side is disclosing (One-way).",
        fields: [
          {
            id: "agreementType",
            label: "Agreement type",
            type: "radio",
            required: true,
            options: [
              { value: "mutual", label: "Mutual — both parties will share confidential information" },
              { value: "oneway", label: "One-way — only one party (the Disclosing Party) will share confidential information" },
            ],
          },
          { id: "effectiveDate", label: "Effective date of this agreement", type: "date", required: true },
          { id: "partyAName", label: "Disclosing Party — full legal name", type: "text", required: true, help: "The party sharing confidential information (or Party A in a mutual NDA)." },
          {
            id: "partyAEntity",
            label: "Disclosing Party — entity type",
            type: "select",
            options: [
              { value: "individual", label: "Individual" },
              { value: "llc", label: "Limited liability company (LLC)" },
              { value: "corp", label: "Corporation" },
              { value: "partnership", label: "Partnership" },
              { value: "other", label: "Other" },
            ],
          },
          { id: "partyAAddress", label: "Disclosing Party — address", type: "textarea", required: true },
          { id: "partyBName", label: "Receiving Party — full legal name", type: "text", required: true, help: "The party receiving confidential information (or Party B in a mutual NDA)." },
          {
            id: "partyBEntity",
            label: "Receiving Party — entity type",
            type: "select",
            options: [
              { value: "individual", label: "Individual" },
              { value: "llc", label: "Limited liability company (LLC)" },
              { value: "corp", label: "Corporation" },
              { value: "partnership", label: "Partnership" },
              { value: "other", label: "Other" },
            ],
          },
          { id: "partyBAddress", label: "Receiving Party — address", type: "textarea", required: true },
        ],
      },
      {
        id: "purpose",
        title: "Purpose & Confidential Information",
        description:
          "Describe why the parties are sharing information and how broadly 'Confidential Information' should be defined.",
        fields: [
          {
            id: "purpose",
            label: "Purpose of disclosure",
            type: "textarea",
            required: true,
            placeholder: "e.g., Evaluating a potential business relationship regarding the licensing of Party A's software platform.",
          },
          {
            id: "scopeDefinition",
            label: "Scope of Confidential Information",
            type: "radio",
            required: true,
            options: [
              { value: "broad", label: "Broad — any non-public information disclosed in any form, whether or not marked confidential" },
              { value: "marked", label: "Narrow — only information marked or identified as confidential at the time of disclosure" },
            ],
          },
          {
            id: "specificallyIncluded",
            label: "Specifically included categories (optional)",
            type: "textarea",
            placeholder: "e.g., source code, financial statements, customer lists, product roadmaps",
          },
        ],
      },
      {
        id: "obligations",
        title: "Obligations, term & remedies",
        description:
          "Standard exclusions (public knowledge, independent development, lawful third-party disclosure) are included automatically.",
        fields: [
          {
            id: "term",
            label: "Term of confidentiality obligations",
            type: "select",
            required: true,
            options: [
              { value: "1", label: "1 year" },
              { value: "2", label: "2 years" },
              { value: "3", label: "3 years" },
              { value: "5", label: "5 years" },
              { value: "7", label: "7 years" },
              { value: "indefinite", label: "Indefinite (until the information is no longer confidential)" },
            ],
          },
          {
            id: "permittedReps",
            label:
              "Permitted disclosure to employees, contractors, attorneys, and financial advisors who need to know for the Purpose and who are bound by confidentiality.",
            type: "checkbox",
            help: "Recommended. Uncheck only if you truly want zero third-party sharing.",
          },
          {
            id: "returnOrDestroy",
            label: "On request or termination, the Receiving Party must:",
            type: "radio",
            required: true,
            options: [
              { value: "return", label: "Return all Confidential Information" },
              { value: "destroy", label: "Destroy all Confidential Information (and certify destruction in writing)" },
              { value: "either", label: "Return OR destroy, at the Disclosing Party's option" },
            ],
          },
          {
            id: "injunctiveRelief",
            label:
              "The parties acknowledge that a breach may cause irreparable harm and agree that the non-breaching party is entitled to seek injunctive relief in addition to any other remedies.",
            type: "checkbox",
          },
        ],
      },
      {
        id: "law",
        title: "Governing law & venue",
        fields: [
          { id: "governingState", label: "Governing law — state", type: "usState", required: true },
          { id: "venueCounty", label: "Venue — county (optional)", type: "text", placeholder: "e.g., New York County" },
        ],
      },
      {
        id: "sign",
        title: "Signatures",
        description:
          "By typing your name below, each party agrees this typed name is the electronic signature of the person listed.",
        fields: [
          { id: "partyASignerName", label: "Disclosing Party — signer name", type: "text", required: true },
          { id: "partyASignerTitle", label: "Disclosing Party — signer title", type: "text" },
          { id: "partyASignatureDate", label: "Disclosing Party — signature date", type: "date", required: true },
          { id: "partyBSignerName", label: "Receiving Party — signer name", type: "text", required: true },
          { id: "partyBSignerTitle", label: "Receiving Party — signer title", type: "text" },
          { id: "partyBSignatureDate", label: "Receiving Party — signature date", type: "date", required: true },
          {
            id: "certify",
            label: "Both parties agree to the terms of this Non-Disclosure Agreement.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
    relatedForms: ["w-9", "residential-lease-agreement"],
  },

  // ---------------------------------------------------------------------
  // Residential Lease Agreement
  // ---------------------------------------------------------------------
  {
    stateAware: true,
    slug: "residential-lease-agreement",
    title: "Free Residential Lease Agreement Template — Landlord & Tenant",
    shortDescription:
      "Create a professional fixed-term or month-to-month residential lease agreement. Automatic rent totals, security deposit tracking, and clear default and termination clauses.",
    category: "realestate",
    price: 14.99,
    lastUpdated: "2026-01-20",
    isFeatured: true,
    pdfTemplate: "lease",
    steps: [
      {
        id: "parties",
        title: "Landlord & tenant(s)",
        description:
          "Enter the legal name of the landlord (or property-management entity) and up to four tenants who will be jointly and severally liable on the lease.",
        fields: [
          { id: "landlordName", label: "Landlord — legal name (person or entity)", type: "text", required: true },
          { id: "landlordAddress", label: "Landlord — mailing address for notices", type: "textarea", required: true },
          { id: "landlordPhone", label: "Landlord — phone", type: "text" },
          { id: "tenant1Name", label: "Tenant 1 — full legal name", type: "text", required: true },
          { id: "tenant2Name", label: "Tenant 2 — full legal name (optional)", type: "text" },
          { id: "tenant3Name", label: "Tenant 3 — full legal name (optional)", type: "text" },
          { id: "tenant4Name", label: "Tenant 4 — full legal name (optional)", type: "text" },
        ],
      },
      {
        id: "property",
        title: "Property",
        fields: [
          { id: "propertyStreet", label: "Property street address", type: "text", required: true },
          { id: "propertyUnit", label: "Unit / apartment number", type: "text" },
          { id: "propertyCity", label: "City", type: "text", required: true },
          { id: "propertyState", label: "State", type: "usState", required: true },
          { id: "propertyZip", label: "ZIP code", type: "text", required: true },
          { id: "bedrooms", label: "Bedrooms", type: "number", placeholder: "2" },
          { id: "bathrooms", label: "Bathrooms", type: "number", placeholder: "1" },
          { id: "parking", label: "Parking (spaces or 'none')", type: "text", placeholder: "1 assigned space" },
          {
            id: "furnished",
            label: "Furnishing",
            type: "radio",
            options: [
              { value: "unfurnished", label: "Unfurnished" },
              { value: "partial", label: "Partially furnished" },
              { value: "furnished", label: "Fully furnished (inventory attached)" },
            ],
          },
        ],
      },
      {
        id: "term-rent",
        title: "Term & rent",
        description:
          "Choose a fixed-term lease with an end date, or a month-to-month tenancy that continues until terminated with proper notice.",
        fields: [
          {
            id: "termType",
            label: "Lease type",
            type: "radio",
            required: true,
            options: [
              { value: "fixed", label: "Fixed term (with end date)" },
              { value: "mtm", label: "Month-to-month" },
            ],
          },
          { id: "startDate", label: "Lease start date", type: "date", required: true },
          {
            id: "endDate",
            label: "Lease end date",
            type: "date",
            required: true,
            showWhen: (d) => d.termType === "fixed",
          },
          { id: "monthlyRent", label: "Monthly rent ($)", type: "number", required: true, placeholder: "1800" },
          { id: "dueDay", label: "Rent due — day of month", type: "number", placeholder: "1" },
          {
            id: "lateFeeType",
            label: "Late fee",
            type: "radio",
            options: [
              { value: "none", label: "No late fee" },
              { value: "flat", label: "Flat dollar amount" },
              { value: "percent", label: "Percentage of monthly rent" },
            ],
          },
          {
            id: "lateFeeAmount",
            label: "Late fee — flat amount ($)",
            type: "number",
            showWhen: (d) => d.lateFeeType === "flat",
          },
          {
            id: "lateFeePercent",
            label: "Late fee — percentage of monthly rent (%)",
            type: "number",
            showWhen: (d) => d.lateFeeType === "percent",
          },
          {
            id: "graceDays",
            label: "Grace period (days after due date before late fee applies)",
            type: "number",
            placeholder: "5",
            showWhen: (d) => d.lateFeeType === "flat" || d.lateFeeType === "percent",
          },
          { id: "firstPaymentDate", label: "First rent payment date", type: "date" },
        ],
      },
      {
        id: "deposit",
        title: "Security deposit",
        fields: [
          { id: "securityDeposit", label: "Security deposit ($)", type: "number", placeholder: "1800" },
          { id: "lastMonthRent", label: "Last month's rent held (optional, $)", type: "number" },
          {
            id: "depositHeldAt",
            label: "Where the deposit is held (bank / trust, if required by state)",
            type: "text",
            help: "Some states require deposits to be held in a separate interest-bearing account.",
          },
        ],
      },
      {
        id: "utilities",
        title: "Utilities & maintenance",
        description:
          "For each utility, choose who is responsible. Anything left blank defaults to tenant.",
        fields: [
          {
            id: "utilElectric",
            label: "Electricity",
            type: "radio",
            options: [
              { value: "tenant", label: "Tenant pays" },
              { value: "landlord", label: "Landlord pays" },
              { value: "split", label: "Split / included in rent" },
            ],
          },
          {
            id: "utilGas",
            label: "Gas",
            type: "radio",
            options: [
              { value: "tenant", label: "Tenant pays" },
              { value: "landlord", label: "Landlord pays" },
              { value: "split", label: "Split / included" },
            ],
          },
          {
            id: "utilWater",
            label: "Water & sewer",
            type: "radio",
            options: [
              { value: "tenant", label: "Tenant pays" },
              { value: "landlord", label: "Landlord pays" },
              { value: "split", label: "Split / included" },
            ],
          },
          {
            id: "utilTrash",
            label: "Trash / recycling",
            type: "radio",
            options: [
              { value: "tenant", label: "Tenant pays" },
              { value: "landlord", label: "Landlord pays" },
              { value: "split", label: "Split / included" },
            ],
          },
          {
            id: "utilInternet",
            label: "Internet / cable",
            type: "radio",
            options: [
              { value: "tenant", label: "Tenant pays" },
              { value: "landlord", label: "Landlord pays" },
              { value: "split", label: "Split / included" },
            ],
          },
          {
            id: "utilLawn",
            label: "Lawn care / snow removal",
            type: "radio",
            options: [
              { value: "tenant", label: "Tenant" },
              { value: "landlord", label: "Landlord" },
              { value: "na", label: "N/A" },
            ],
          },
          { id: "appliancesIncluded", label: "Appliances included (comma-separated)", type: "text", placeholder: "Refrigerator, stove, dishwasher, washer, dryer" },
        ],
      },
      {
        id: "rules",
        title: "Rules & restrictions",
        fields: [
          {
            id: "pets",
            label: "Pets",
            type: "radio",
            options: [
              { value: "none", label: "No pets allowed" },
              { value: "withDeposit", label: "Allowed with pet deposit" },
              { value: "noDeposit", label: "Allowed, no additional deposit" },
            ],
          },
          {
            id: "petDeposit",
            label: "Pet deposit ($)",
            type: "number",
            showWhen: (d) => d.pets === "withDeposit",
          },
          {
            id: "smoking",
            label: "Smoking",
            type: "radio",
            options: [
              { value: "prohibited", label: "Prohibited anywhere on the property" },
              { value: "outside", label: "Outside only" },
              { value: "allowed", label: "Allowed" },
            ],
          },
          {
            id: "subletting",
            label: "Subletting / assignment",
            type: "radio",
            options: [
              { value: "prohibited", label: "Prohibited without written landlord consent" },
              { value: "allowed", label: "Allowed with reasonable notice" },
            ],
          },
          { id: "quietHours", label: "Quiet hours / additional house rules (optional)", type: "textarea" },
        ],
      },
      {
        id: "termination-sign",
        title: "Termination, default & signatures",
        fields: [
          {
            id: "noticePeriod",
            label: "Notice period to terminate (days)",
            type: "number",
            placeholder: "30",
            help: "State law may impose a minimum. 30 days is common for month-to-month; fixed-term leases typically require breach or mutual agreement.",
          },
          {
            id: "curePeriod",
            label: "Default — days to cure after written notice",
            type: "number",
            placeholder: "10",
          },
          { id: "governingState", label: "Governing law — state", type: "usState", required: true },
          { id: "landlordSignature", label: "Landlord signature (typed)", type: "text", required: true },
          { id: "landlordSignDate", label: "Landlord signature date", type: "date", required: true },
          { id: "tenant1Signature", label: "Tenant 1 signature (typed)", type: "text", required: true },
          { id: "tenant1SignDate", label: "Tenant 1 signature date", type: "date", required: true },
          { id: "tenant2Signature", label: "Tenant 2 signature (typed, if applicable)", type: "text" },
          { id: "tenant2SignDate", label: "Tenant 2 signature date", type: "date" },
          {
            id: "certify",
            label: "Both parties agree to the terms of this lease.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
    relatedForms: ["power-of-attorney-financial", "eviction-notice", "vehicle-bill-of-sale"],
  },

  // ---------------------------------------------------------------------
  // Power of Attorney (Financial)
  // ---------------------------------------------------------------------
  {
    stateAware: true,
    slug: "power-of-attorney-financial",
    title: "Free Financial Power of Attorney Form — Durable & Springing POA",
    shortDescription:
      "Appoint a trusted agent to handle your financial affairs. Choose durable or springing effectiveness, custom powers, and a successor agent.",
    category: "personal",
    price: 14.99,
    lastUpdated: "2026-01-20",
    isFeatured: true,
    pdfTemplate: "poa",
    steps: [
      {
        id: "principal",
        title: "Principal (you)",
        description: "The Principal is the person granting authority. Enter your details exactly as they appear on your government-issued ID.",
        fields: [
          { id: "principalName", label: "Principal — full legal name", type: "text", required: true },
          { id: "principalAddress", label: "Principal — mailing address", type: "textarea", required: true },
          { id: "principalDob", label: "Principal — date of birth", type: "date" },
          { id: "principalPhone", label: "Principal — phone", type: "text" },
        ],
      },
      {
        id: "agent",
        title: "Agent (attorney-in-fact)",
        description:
          "The Agent will act on your behalf. Choose someone you trust completely. You may also name a successor agent to act if your primary agent cannot serve.",
        fields: [
          { id: "agentName", label: "Agent — full legal name", type: "text", required: true },
          { id: "agentAddress", label: "Agent — mailing address", type: "textarea", required: true },
          { id: "agentPhone", label: "Agent — phone", type: "text" },
          { id: "agentRelationship", label: "Agent — relationship to principal", type: "text", placeholder: "e.g., spouse, adult child, attorney" },
          {
            id: "hasSuccessor",
            label: "Name a successor / alternate agent",
            type: "checkbox",
          },
          { id: "successorName", label: "Successor agent — full legal name", type: "text", showWhen: (d) => Boolean(d.hasSuccessor) },
          { id: "successorAddress", label: "Successor agent — mailing address", type: "textarea", showWhen: (d) => Boolean(d.hasSuccessor) },
          { id: "successorPhone", label: "Successor agent — phone", type: "text", showWhen: (d) => Boolean(d.hasSuccessor) },
        ],
      },
      {
        id: "powers",
        title: "Powers granted",
        description:
          "Select the categories of authority you are granting. Uncheck any you do NOT want your agent to exercise.",
        fields: [
          { id: "powerAll", label: "Grant ALL of the powers listed below", type: "checkbox", help: "Toggling this on is a shortcut — you can still uncheck individual categories." },
          { id: "powerRealEstate", label: "Real estate transactions", type: "checkbox" },
          { id: "powerBanking", label: "Banking, finances & investments", type: "checkbox" },
          { id: "powerBusiness", label: "Business operating transactions", type: "checkbox" },
          { id: "powerInsurance", label: "Insurance & annuity transactions", type: "checkbox" },
          { id: "powerEstate", label: "Estate, trust & other beneficiary transactions", type: "checkbox" },
          { id: "powerClaims", label: "Claims & litigation", type: "checkbox" },
          { id: "powerFamily", label: "Personal & family maintenance", type: "checkbox" },
          { id: "powerBenefits", label: "Government benefits (Social Security, Medicare, etc.)", type: "checkbox" },
          { id: "powerRetirement", label: "Retirement plans", type: "checkbox" },
          { id: "powerTaxes", label: "Tax matters", type: "checkbox" },
          { id: "powerGifts", label: "Gift-giving (limited)", type: "checkbox" },
          { id: "powerCustom", label: "Additional custom powers (optional)", type: "textarea", placeholder: "Describe any additional powers or limitations." },
        ],
      },
      {
        id: "effective",
        title: "Effective date & duration",
        fields: [
          {
            id: "effectiveType",
            label: "When does this POA become effective?",
            type: "radio",
            required: true,
            options: [
              { value: "durable", label: "Immediately, and continues if I become incapacitated (Durable POA)" },
              { value: "springing", label: "Only upon a physician's certification of my incapacity (Springing POA)" },
            ],
          },
          { id: "effectiveDate", label: "Effective date", type: "date", required: true },
          { id: "terminationDate", label: "Termination date (optional — leave blank for no expiration)", type: "date" },
        ],
      },
      {
        id: "law",
        title: "Governing law & special instructions",
        fields: [
          { id: "governingState", label: "Governing law — state", type: "usState", required: true },
          {
            id: "specialInstructions",
            label: "Special instructions or limitations (optional)",
            type: "textarea",
            placeholder: "e.g., agent may not make gifts exceeding $15,000 in any calendar year without written consent.",
          },
        ],
      },
      {
        id: "sign",
        title: "Signatures & notary",
        description:
          "Type names below to indicate intent. To make this POA legally effective in most states, print the completed PDF and sign in ink before a notary public and (where required) two adult witnesses.",
        fields: [
          { id: "principalSignature", label: "Principal signature (typed)", type: "text", required: true },
          { id: "principalSignDate", label: "Principal signature date", type: "date", required: true },
          { id: "witness1Name", label: "Witness 1 — name", type: "text" },
          { id: "witness1Address", label: "Witness 1 — address", type: "text" },
          { id: "witness2Name", label: "Witness 2 — name", type: "text" },
          { id: "witness2Address", label: "Witness 2 — address", type: "text" },
          {
            id: "certify",
            label: "I understand this document must be signed in wet ink before a notary public to take effect.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
    relatedForms: ["residential-lease-agreement", "promissory-note", "vehicle-bill-of-sale"],
  },

  // ---------------------------------------------------------------------
  // Vehicle Bill of Sale (also works for boats & general property)
  // ---------------------------------------------------------------------
  {
    stateAware: true,
    slug: "vehicle-bill-of-sale",
    title: "Free Vehicle Bill of Sale Template — Car, Boat & General Property",
    shortDescription:
      "Document the sale of a vehicle, boat, or personal property. Includes federal odometer disclosure, as-is or limited warranty language, and buyer/seller signatures.",
    category: "personal",
    price: 9.99,
    lastUpdated: "2026-01-20",
    isFeatured: true,
    pdfTemplate: "billOfSale",
    steps: [
      {
        id: "type",
        title: "What is being sold?",
        fields: [
          {
            id: "saleType",
            label: "Type of property",
            type: "radio",
            required: true,
            options: [
              { value: "vehicle", label: "Motor vehicle (car, truck, motorcycle)" },
              { value: "boat", label: "Boat / watercraft" },
              { value: "general", label: "General personal property" },
            ],
          },
        ],
      },
      {
        id: "seller",
        title: "Seller information",
        fields: [
          { id: "sellerName", label: "Seller — full legal name", type: "text", required: true },
          { id: "sellerAddress", label: "Seller — address", type: "textarea", required: true },
          { id: "sellerPhone", label: "Seller — phone", type: "text" },
          { id: "sellerDl", label: "Seller — driver's license or ID number (optional)", type: "text" },
        ],
      },
      {
        id: "buyer",
        title: "Buyer information",
        fields: [
          { id: "buyerName", label: "Buyer — full legal name", type: "text", required: true },
          { id: "buyerAddress", label: "Buyer — address", type: "textarea", required: true },
          { id: "buyerPhone", label: "Buyer — phone", type: "text" },
          { id: "buyerDl", label: "Buyer — driver's license or ID number (optional)", type: "text" },
        ],
      },
      {
        id: "item",
        title: "Item description",
        description: "Provide identifying details. For vehicles, federal law (49 CFR § 580) requires an odometer disclosure at the time of transfer.",
        fields: [
          // Vehicle
          { id: "vYear", label: "Year", type: "text", required: true, showWhen: (d) => d.saleType === "vehicle" },
          { id: "vMake", label: "Make", type: "text", required: true, showWhen: (d) => d.saleType === "vehicle" },
          { id: "vModel", label: "Model", type: "text", required: true, showWhen: (d) => d.saleType === "vehicle" },
          { id: "vTrim", label: "Body / trim", type: "text", showWhen: (d) => d.saleType === "vehicle" },
          { id: "vColor", label: "Color", type: "text", showWhen: (d) => d.saleType === "vehicle" },
          { id: "vVin", label: "Vehicle identification number (VIN)", type: "text", required: true, showWhen: (d) => d.saleType === "vehicle" },
          { id: "vOdometer", label: "Odometer reading (miles)", type: "number", required: true, showWhen: (d) => d.saleType === "vehicle" },
          {
            id: "vOdometerDisclosure",
            label: "Odometer disclosure (federal requirement)",
            type: "radio",
            required: true,
            options: [
              { value: "actual", label: "Reflects ACTUAL mileage of the vehicle" },
              { value: "exceeds", label: "EXCEEDS its mechanical limits (rolled over)" },
              { value: "notActual", label: "Is NOT the actual mileage (WARNING — odometer discrepancy)" },
            ],
            showWhen: (d) => d.saleType === "vehicle",
          },
          { id: "vTitle", label: "Title number", type: "text", showWhen: (d) => d.saleType === "vehicle" },
          { id: "vPlate", label: "License plate", type: "text", showWhen: (d) => d.saleType === "vehicle" },
          // Boat
          { id: "bMake", label: "Make", type: "text", required: true, showWhen: (d) => d.saleType === "boat" },
          { id: "bModel", label: "Model", type: "text", required: true, showWhen: (d) => d.saleType === "boat" },
          { id: "bYear", label: "Year", type: "text", required: true, showWhen: (d) => d.saleType === "boat" },
          { id: "bHin", label: "Hull identification number (HIN)", type: "text", required: true, showWhen: (d) => d.saleType === "boat" },
          { id: "bLength", label: "Length (feet)", type: "number", showWhen: (d) => d.saleType === "boat" },
          { id: "bRegistration", label: "Registration number", type: "text", showWhen: (d) => d.saleType === "boat" },
          // General
          {
            id: "gDescription",
            label: "Description of item(s)",
            type: "textarea",
            required: true,
            showWhen: (d) => d.saleType === "general",
            placeholder: "Describe the item(s) being sold in detail — make, model, condition, distinguishing marks.",
          },
          { id: "gSerial", label: "Serial number (if any)", type: "text", showWhen: (d) => d.saleType === "general" },
        ],
      },
      {
        id: "terms",
        title: "Sale terms & signatures",
        fields: [
          { id: "salePrice", label: "Sale price (USD)", type: "number", required: true, placeholder: "12500" },
          {
            id: "paymentMethod",
            label: "Payment method",
            type: "select",
            required: true,
            options: [
              { value: "cash", label: "Cash" },
              { value: "check", label: "Personal check" },
              { value: "cashiers", label: "Cashier's check / money order" },
              { value: "wire", label: "Wire transfer" },
              { value: "other", label: "Other" },
            ],
          },
          { id: "saleDate", label: "Date of sale", type: "date", required: true },
          { id: "saleCity", label: "City where sale took place", type: "text" },
          { id: "saleState", label: "State where sale took place", type: "usState", required: true },
          {
            id: "warranty",
            label: "Warranty",
            type: "radio",
            required: true,
            options: [
              { value: "asIs", label: "AS-IS — no warranty of any kind, express or implied" },
              { value: "limited", label: "Limited warranty (describe below)" },
            ],
          },
          {
            id: "warrantyTerms",
            label: "Limited warranty terms",
            type: "textarea",
            showWhen: (d) => d.warranty === "limited",
          },
          { id: "sellerSignature", label: "Seller signature (typed)", type: "text", required: true },
          { id: "sellerSignDate", label: "Seller signature date", type: "date", required: true },
          { id: "buyerSignature", label: "Buyer signature (typed)", type: "text", required: true },
          { id: "buyerSignDate", label: "Buyer signature date", type: "date", required: true },
          {
            id: "certify",
            label: "Both parties agree to the terms of this Bill of Sale.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
    relatedForms: ["power-of-attorney-financial", "residential-lease-agreement", "demand-letter"],
  },

  // ---------------------------------------------------------------------
  // Eviction Notice (state-specific)
  // ---------------------------------------------------------------------
  {
    stateAware: true,
    slug: "eviction-notice",
    title: "Free Eviction Notice Generator — State-Specific",
    shortDescription:
      "Generate a state-appropriate eviction / notice to quit. Timing rules auto-fill for the top 10 states; other states default to general guidance.",
    category: "realestate",
    price: 9.99,
    lastUpdated: "2026-01-20",
    isFeatured: true,
    pdfTemplate: "evictionNotice",
    steps: [
      {
        id: "state",
        title: "Jurisdiction",
        description:
          "Select the state where the rental property is located. State laws vary — timing below reflects general statutory rules and may not account for local rent-control ordinances. Verify with a landlord-tenant attorney before serving.",
        fields: [
          { id: "state", label: "State where the property is located", type: "usState", required: true },
        ],
      },
      {
        id: "parties",
        title: "Landlord & tenant",
        fields: [
          { id: "landlordName", label: "Landlord — full legal name", type: "text", required: true },
          { id: "landlordBusiness", label: "Landlord — business / management company (optional)", type: "text" },
          { id: "landlordAddress", label: "Landlord — mailing address", type: "textarea", required: true },
          { id: "landlordPhone", label: "Landlord — phone", type: "text" },
          { id: "tenantNames", label: "Tenant(s) — full legal name(s)", type: "text", required: true, placeholder: "Jane Doe and John Doe" },
          { id: "propertyAddress", label: "Rental property address", type: "textarea", required: true },
        ],
      },
      {
        id: "reason",
        title: "Reason for eviction",
        fields: [
          {
            id: "reason",
            label: "Reason",
            type: "radio",
            required: true,
            options: [
              { value: "nonpayment", label: "Non-payment of rent" },
              { value: "curableViolation", label: "Lease violation (curable)" },
              { value: "nonCurable", label: "Lease violation (non-curable / material breach)" },
              { value: "endOfTenancy", label: "End of tenancy / no-fault termination" },
              { value: "illegal", label: "Illegal activity or serious nuisance" },
            ],
          },
          // Non-payment fields
          { id: "amountPastDue", label: "Amount of rent past due ($)", type: "number", required: true, showWhen: (d) => d.reason === "nonpayment" },
          { id: "periodCovered", label: "Period covered (e.g., 'November 1 – November 30, 2026')", type: "text", showWhen: (d) => d.reason === "nonpayment" },
          { id: "lateFees", label: "Late fees / other charges ($)", type: "number", showWhen: (d) => d.reason === "nonpayment" },
          // Violation fields
          {
            id: "violationDescription",
            label: "Description of the violation",
            type: "textarea",
            required: true,
            showWhen: (d) => d.reason === "curableViolation" || d.reason === "nonCurable",
          },
          {
            id: "leaseClause",
            label: "Lease clause / paragraph number violated (if known)",
            type: "text",
            showWhen: (d) => d.reason === "curableViolation" || d.reason === "nonCurable",
          },
          {
            id: "cureAction",
            label: "What tenant must do to cure",
            type: "textarea",
            showWhen: (d) => d.reason === "curableViolation",
          },
          // End of tenancy
          {
            id: "tenancyType",
            label: "Tenancy type",
            type: "radio",
            options: [
              { value: "mtm", label: "Month-to-month" },
              { value: "fixed", label: "Fixed-term (ending)" },
            ],
            showWhen: (d) => d.reason === "endOfTenancy",
          },
        ],
      },
      {
        id: "timing",
        title: "Notice period & deadline",
        description:
          "The notice date and vacate-by deadline are computed from the state statutory notice period. You may override the computed date if a longer notice is required by local ordinance or the lease.",
        fields: [
          { id: "noticeDate", label: "Date of this notice", type: "date", required: true },
          {
            id: "overrideVacateBy",
            label: "Manually override the computed vacate-by date",
            type: "checkbox",
          },
          {
            id: "vacateByOverride",
            label: "Vacate by (manual override)",
            type: "date",
            showWhen: (d) => Boolean(d.overrideVacateBy),
          },
        ],
      },
      {
        id: "delivery",
        title: "Delivery & certificate of service",
        fields: [
          {
            id: "serviceMethod",
            label: "Method of service",
            type: "radio",
            required: true,
            options: [
              { value: "personal", label: "Personal delivery to tenant" },
              { value: "postMail", label: "Posted on the door AND mailed by first-class mail" },
              { value: "certified", label: "Certified mail, return receipt requested" },
              { value: "substituted", label: "Substituted service (adult at residence)" },
            ],
          },
          { id: "serverName", label: "Name of person serving the notice", type: "text", required: true },
          { id: "serverSignature", label: "Server signature (typed)", type: "text", required: true },
          { id: "serverDate", label: "Date served", type: "date", required: true },
          {
            id: "certify",
            label: "I certify the information above is true and correct, and I served this notice as stated.",
            type: "checkbox",
            required: true,
          },
        ],
      },
    ],
    relatedForms: ["residential-lease-agreement", "demand-letter"],
  },

  // ---------------------------------------------------------------------
  // Demand Letter / Collection Letter
  // ---------------------------------------------------------------------
  {
    slug: "demand-letter",
    title: "Free Demand Letter Template — Pre-Litigation Collection Letter",
    shortDescription:
      "Formal written demand for payment or performance before filing suit. Widely used for unpaid invoices, security-deposit disputes, and breach of contract.",
    category: "personal",
    price: 9.99,
    lastUpdated: "2026-01-20",
    isFeatured: true,
    pdfTemplate: "demandLetter",
    steps: [
      {
        id: "letterType",
        title: "Letter type",
        description: "Choose the reason you're writing. This tailors the language of the letter.",
        fields: [
          {
            id: "letterType",
            label: "Reason for this demand",
            type: "radio",
            required: true,
            options: [
              { value: "unpaidInvoice", label: "Unpaid invoice / debt owed" },
              { value: "breach", label: "Breach of contract" },
              { value: "securityDeposit", label: "Return of security deposit" },
              { value: "propertyDamage", label: "Property damage" },
              { value: "other", label: "Other" },
            ],
          },
          {
            id: "isConsumerDebtCollector",
            label: "I am a third-party debt collector attempting to collect a consumer debt (FDCPA applies).",
            type: "checkbox",
            help: "Check only if you are a collection agency or attorney regularly collecting consumer debts for others. Original creditors do NOT check this box.",
          },
        ],
      },
      {
        id: "sender",
        title: "Sender (you)",
        description: "Enter your details as they should appear at the top of the letter.",
        fields: [
          { id: "senderType", label: "Sending as", type: "radio", required: true, options: [
            { value: "individual", label: "Individual" },
            { value: "business", label: "Business / entity" },
          ] },
          { id: "senderName", label: "Your full legal name", type: "text", required: true },
          { id: "senderBusiness", label: "Business / entity name", type: "text", showWhen: (d) => d.senderType === "business" },
          { id: "senderRole", label: "Your title / role", type: "text", showWhen: (d) => d.senderType === "business", placeholder: "e.g., Owner, Credit Manager" },
          { id: "senderAddress", label: "Return address", type: "textarea", required: true },
          { id: "senderPhone", label: "Phone", type: "text" },
          { id: "senderEmail", label: "Email", type: "email" },
        ],
      },
      {
        id: "recipient",
        title: "Recipient (debtor)",
        fields: [
          { id: "recipientName", label: "Recipient — legal name", type: "text", required: true },
          { id: "recipientAddress", label: "Recipient — mailing address", type: "textarea", required: true },
          { id: "recipientAttorney", label: "Recipient's attorney of record (if known)", type: "text" },
          { id: "letterDate", label: "Date of this letter", type: "date", required: true },
        ],
      },
      {
        id: "dispute",
        title: "The dispute",
        description: "Describe what is owed or what went wrong. Be specific — dates, amounts, and contract references strengthen the letter.",
        fields: [
          { id: "amountOwed", label: "Amount owed (USD)", type: "number", required: true },
          { id: "originalDueDate", label: "Original due date / date of breach", type: "date" },
          {
            id: "background",
            label: "Description of goods, services, or contract",
            type: "textarea",
            required: true,
            placeholder: "e.g., Invoice #1042 for web-design services delivered on Oct 3, 2025 in the amount of $2,400.",
          },
          {
            id: "priorAttempts",
            label: "Prior attempts to collect / resolve",
            type: "textarea",
            placeholder: "e.g., Oct 15 — emailed reminder. Nov 1 — mailed second notice. Nov 20 — phone call, no response.",
          },
          { id: "interestRate", label: "Contractual interest rate (%, optional)", type: "number" },
          { id: "additionalDamages", label: "Itemized additional damages (optional)", type: "textarea", placeholder: "e.g., $150 stop-payment bank fee; $75 collection costs." },
        ],
      },
      {
        id: "demand",
        title: "Demand & deadline",
        description: "Set your deadline, accepted payment methods, and what will happen if the recipient ignores the letter.",
        fields: [
          {
            id: "responseDays",
            label: "Days to respond",
            type: "select",
            required: true,
            options: [
              { value: "7", label: "7 days" },
              { value: "10", label: "10 days" },
              { value: "14", label: "14 days" },
              { value: "30", label: "30 days" },
            ],
          },
          { id: "paymentMethods", label: "Payment method(s) accepted", type: "text", required: true, placeholder: "e.g., Cashier's check, ACH, PayPal to ..." },
          { id: "conFileSuit", label: "State that you will file suit if the demand is not met", type: "checkbox" },
          { id: "conAttorneyFees", label: "Reserve the right to seek attorney's fees (where the contract or statute allows)", type: "checkbox" },
          { id: "conCollections", label: "State that the debt may be referred to a collections agency", type: "checkbox" },
          { id: "conCreditReport", label: "State that non-payment may be reported to credit bureaus (only where lawful for you)", type: "checkbox" },
          {
            id: "fdcpaAck",
            label: "FDCPA acknowledgment: 'This is an attempt to collect a debt; any information obtained will be used for that purpose.'",
            type: "checkbox",
            showWhen: (d) => Boolean(d.isConsumerDebtCollector),
            help: "Required for third-party debt collectors under the Fair Debt Collection Practices Act.",
          },
          { id: "governingState", label: "Governing state law", type: "usState", required: true },
          { id: "senderSignature", label: "Your signature (type your full name)", type: "text", required: true },
          { id: "senderSignDate", label: "Signed on", type: "date", required: true },
        ],
      },
    ],
    relatedForms: ["promissory-note", "nda", "eviction-notice"],
    officialLink: { label: "FTC — Debt Collection FAQs (consumer info)", href: "https://consumer.ftc.gov/articles/debt-collection-faqs" },
  },

  // ---------------------------------------------------------------------
  // Promissory Note (Loan Agreement)
  // ---------------------------------------------------------------------
  {
    slug: "promissory-note",
    title: "Free Promissory Note Template — Loan Agreement Between Individuals",
    shortDescription:
      "Binding written promise from a borrower to repay a fixed sum. Covers secured/unsecured, installment or lump-sum, with or without interest.",
    category: "personal",
    price: 14.99,
    lastUpdated: "2026-01-20",
    isFeatured: true,
    pdfTemplate: "promissoryNote",
    steps: [
      {
        id: "parties",
        title: "Parties",
        fields: [
          { id: "lenderName", label: "Lender — full legal name (or entity)", type: "text", required: true },
          { id: "lenderAddress", label: "Lender — mailing address", type: "textarea", required: true },
          { id: "lenderEntityType", label: "Lender is a(n)", type: "select", options: [
            { value: "individual", label: "Individual" },
            { value: "llc", label: "LLC" },
            { value: "corp", label: "Corporation" },
            { value: "partnership", label: "Partnership" },
            { value: "trust", label: "Trust" },
          ] },
          { id: "borrowerName", label: "Borrower — full legal name (or entity)", type: "text", required: true },
          { id: "borrowerAddress", label: "Borrower — mailing address", type: "textarea", required: true },
          { id: "borrowerEntityType", label: "Borrower is a(n)", type: "select", options: [
            { value: "individual", label: "Individual" },
            { value: "llc", label: "LLC" },
            { value: "corp", label: "Corporation" },
            { value: "partnership", label: "Partnership" },
            { value: "trust", label: "Trust" },
          ] },
        ],
      },
      {
        id: "loan",
        title: "Loan basics",
        fields: [
          { id: "principal", label: "Principal (USD)", type: "number", required: true },
          { id: "disbursementDate", label: "Date funds disbursed / effective date", type: "date", required: true },
          { id: "purpose", label: "Purpose of loan (optional)", type: "textarea", placeholder: "e.g., Down payment on primary residence." },
          { id: "governingState", label: "Governing state law", type: "usState", required: true },
        ],
      },
      {
        id: "interest",
        title: "Interest",
        description: "Choose how interest accrues. Most states cap interest rates for private loans between individuals — check your state's usury statute.",
        fields: [
          {
            id: "interestType",
            label: "Interest",
            type: "radio",
            required: true,
            options: [
              { value: "none", label: "No interest (0%)" },
              { value: "simple", label: "Simple interest" },
              { value: "compound", label: "Compound interest" },
            ],
          },
          { id: "apr", label: "Annual percentage rate (APR %)", type: "number", showWhen: (d) => d.interestType === "simple" || d.interestType === "compound" },
          {
            id: "compoundingFrequency",
            label: "Compounding frequency",
            type: "select",
            showWhen: (d) => d.interestType === "compound",
            options: [
              { value: "monthly", label: "Monthly" },
              { value: "quarterly", label: "Quarterly" },
              { value: "semiannual", label: "Semi-annually" },
              { value: "annual", label: "Annually" },
            ],
          },
        ],
      },
      {
        id: "repayment",
        title: "Repayment terms",
        fields: [
          {
            id: "repaymentStructure",
            label: "Repayment structure",
            type: "radio",
            required: true,
            options: [
              { value: "lumpSum", label: "Single lump-sum payment on maturity date" },
              { value: "installments", label: "Installments" },
              { value: "onDemand", label: "Payable on demand" },
            ],
          },
          { id: "maturityDate", label: "Maturity date (loan due in full)", type: "date", showWhen: (d) => d.repaymentStructure === "lumpSum" },
          {
            id: "installmentFrequency",
            label: "Installment frequency",
            type: "select",
            showWhen: (d) => d.repaymentStructure === "installments",
            options: [
              { value: "weekly", label: "Weekly" },
              { value: "biweekly", label: "Bi-weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "quarterly", label: "Quarterly" },
            ],
          },
          { id: "installmentAmount", label: "Installment amount (USD)", type: "number", showWhen: (d) => d.repaymentStructure === "installments" },
          { id: "firstPaymentDate", label: "First payment date", type: "date", showWhen: (d) => d.repaymentStructure === "installments" },
          { id: "numberOfPayments", label: "Number of payments", type: "number", showWhen: (d) => d.repaymentStructure === "installments" },
        ],
      },
      {
        id: "default",
        title: "Default, security & prepayment",
        fields: [
          { id: "graceDays", label: "Grace period before late fee (days)", type: "number", placeholder: "e.g., 10" },
          { id: "lateFeeType", label: "Late fee type", type: "select", options: [
            { value: "none", label: "None" },
            { value: "flat", label: "Flat dollar amount" },
            { value: "percent", label: "Percent of past-due amount" },
          ] },
          { id: "lateFeeAmount", label: "Late fee ($)", type: "number", showWhen: (d) => d.lateFeeType === "flat" },
          { id: "lateFeePercent", label: "Late fee (%)", type: "number", showWhen: (d) => d.lateFeeType === "percent" },
          { id: "acceleration", label: "Upon default, the entire unpaid balance becomes immediately due (acceleration clause)", type: "checkbox" },
          { id: "prepaymentAllowed", label: "Borrower may prepay any amount at any time without penalty", type: "checkbox" },
          {
            id: "collateralType",
            label: "Security / collateral",
            type: "radio",
            required: true,
            options: [
              { value: "unsecured", label: "Unsecured — no collateral" },
              { value: "secured", label: "Secured by collateral" },
            ],
          },
          { id: "collateralDescription", label: "Description of collateral", type: "textarea", showWhen: (d) => d.collateralType === "secured", placeholder: "e.g., 2020 Honda Civic, VIN 1HGCV1F30LA000000." },
          { id: "ucc1Ack", label: "Lender may file a UCC-1 financing statement to perfect the security interest", type: "checkbox", showWhen: (d) => d.collateralType === "secured" },
        ],
      },
      {
        id: "signatures",
        title: "Signatures",
        description: "The borrower's signature is required. Lender signature and notarization are recommended for enforceability.",
        fields: [
          { id: "borrowerSignature", label: "Borrower — signature (type name)", type: "text", required: true },
          { id: "borrowerSignDate", label: "Borrower — date signed", type: "date", required: true },
          { id: "lenderSignature", label: "Lender — signature (type name)", type: "text" },
          { id: "lenderSignDate", label: "Lender — date signed", type: "date" },
          { id: "hasCosigner", label: "Add a co-signer / guarantor", type: "checkbox" },
          { id: "cosignerName", label: "Co-signer — full legal name", type: "text", showWhen: (d) => Boolean(d.hasCosigner) },
          { id: "cosignerAddress", label: "Co-signer — address", type: "textarea", showWhen: (d) => Boolean(d.hasCosigner) },
          { id: "cosignerSignature", label: "Co-signer — signature (type name)", type: "text", showWhen: (d) => Boolean(d.hasCosigner) },
          { id: "cosignerSignDate", label: "Co-signer — date signed", type: "date", showWhen: (d) => Boolean(d.hasCosigner) },
          { id: "notarize", label: "Include a notary acknowledgment block", type: "checkbox" },
        ],
      },
    ],
    relatedForms: ["demand-letter", "nda", "vehicle-bill-of-sale"],
  },

  // ---------------------------------------------------------------------
  // Release of Liability / Waiver
  // ---------------------------------------------------------------------
  {
    slug: "release-of-liability",
    title: "Free Release of Liability Waiver — General & Activity-Specific",
    shortDescription:
      "Pre-activity or post-incident waiver in which one party releases another from claims. Covers events, recreation, equipment use, and settlement releases.",
    category: "personal",
    price: 9.99,
    lastUpdated: "2026-01-20",
    isFeatured: true,
    pdfTemplate: "releaseOfLiability",
    steps: [
      {
        id: "waiverType",
        title: "Waiver type",
        fields: [
          {
            id: "waiverType",
            label: "Type of release",
            type: "radio",
            required: true,
            options: [
              { value: "generalActivity", label: "General activity waiver (pre-event)" },
              { value: "eventVenue", label: "Event / venue waiver" },
              { value: "equipment", label: "Vehicle or equipment use" },
              { value: "postIncident", label: "Post-incident settlement release" },
              { value: "fitness", label: "Fitness, sports, or recreation" },
            ],
          },
        ],
      },
      {
        id: "releasee",
        title: "Releasee (party being released)",
        description: "The person, company, or organization being released from claims.",
        fields: [
          { id: "releaseeName", label: "Releasee — legal name", type: "text", required: true },
          { id: "releaseeAddress", label: "Releasee — address", type: "textarea", required: true },
          { id: "releaseeEntityType", label: "Releasee is a(n)", type: "select", options: [
            { value: "individual", label: "Individual" },
            { value: "llc", label: "LLC" },
            { value: "corp", label: "Corporation" },
            { value: "nonprofit", label: "Non-profit" },
            { value: "other", label: "Other entity" },
          ] },
          { id: "releaseeBusinessDescription", label: "Nature of Releasee's business / activity", type: "textarea", required: true, placeholder: "e.g., Rock-climbing gym operating indoor top-rope and bouldering walls." },
        ],
      },
      {
        id: "releasor",
        title: "Releasor (person signing the waiver)",
        description: "The person waiving their claims. If under 18, a parent or guardian must also sign.",
        fields: [
          { id: "releasorName", label: "Releasor — full legal name", type: "text", required: true },
          { id: "releasorAddress", label: "Releasor — address", type: "textarea", required: true },
          { id: "releasorDob", label: "Releasor — date of birth", type: "date", required: true },
          { id: "releasorPhone", label: "Releasor — phone", type: "text" },
          { id: "emergencyContactName", label: "Emergency contact — name", type: "text" },
          { id: "emergencyContactPhone", label: "Emergency contact — phone", type: "text" },
          { id: "isMinor", label: "Releasor is under 18 (parent / guardian must also sign)", type: "checkbox" },
          { id: "guardianName", label: "Parent / guardian — full legal name", type: "text", showWhen: (d) => Boolean(d.isMinor) },
          { id: "guardianRelationship", label: "Relationship to minor", type: "text", showWhen: (d) => Boolean(d.isMinor) },
        ],
      },
      {
        id: "activity",
        title: "Activity / incident details",
        fields: [
          { id: "activityDescription", label: "Description of activity (or incident, for post-incident releases)", type: "textarea", required: true },
          { id: "activityLocation", label: "Location", type: "text", required: true },
          { id: "activityDate", label: "Date of activity or incident", type: "date", required: true },
          { id: "activityEndDate", label: "End date (for multi-day activities)", type: "date" },
          {
            id: "knownRisks",
            label: "Known risks (edit or add to the defaults)",
            type: "textarea",
            required: true,
            placeholder: "e.g., falls, collisions, muscle strain, exposure to weather, equipment failure.",
          },
          { id: "consideration", label: "Consideration paid, if any (USD)", type: "number", help: "For post-incident releases, enter the settlement amount." },
          { id: "governingState", label: "Governing state law", type: "usState", required: true },
        ],
      },
      {
        id: "acknowledgments",
        title: "Acknowledgments & signature",
        description: "Each acknowledgment must be checked. They are reproduced as numbered clauses in the final PDF.",
        fields: [
          { id: "ackRead", label: "I have read and understand this Release.", type: "checkbox", required: true },
          { id: "ackAssume", label: "I voluntarily assume all risks, known and unknown, arising from the activity.", type: "checkbox", required: true },
          { id: "ackRelease", label: "I release, waive, and discharge the Releasee from all claims arising from the activity.", type: "checkbox", required: true },
          { id: "ackIndemnify", label: "I agree to indemnify and hold harmless the Releasee from any claims brought by me or on my behalf.", type: "checkbox", required: true },
          { id: "ackGoverning", label: "I agree this Release is governed by the laws of the state selected above.", type: "checkbox", required: true },
          { id: "releasorSignature", label: "Releasor — signature (type name)", type: "text", required: true },
          { id: "releasorSignDate", label: "Releasor — date signed", type: "date", required: true },
          { id: "guardianSignature", label: "Parent / guardian — signature (type name)", type: "text", showWhen: (d) => Boolean(d.isMinor), required: true },
          { id: "guardianSignDate", label: "Parent / guardian — date signed", type: "date", showWhen: (d) => Boolean(d.isMinor), required: true },
          { id: "witnessName", label: "Witness — name (optional)", type: "text" },
          { id: "witnessSignature", label: "Witness — signature (optional)", type: "text" },
          { id: "witnessSignDate", label: "Witness — date signed", type: "date" },
        ],
      },
    ],
    relatedForms: ["nda", "demand-letter", "promissory-note"],
  },
  // ==========================================================================
  // Batch 4 — Pack member forms (New Hire, Landlord, Small Business, Personal Planning)
  // Individual pages are live; primary consumption is via `/forms/*-pack` bundles.
  // ==========================================================================
  {
    slug: "offer-letter",
    title: "Employment Offer Letter",
    shortDescription:
      "Simple, professional employment offer letter covering title, pay, start date, and at-will terms.",
    category: "employment",
    price: 4.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "offerLetter",
    steps: [
      {
        id: "parties",
        title: "Employer & candidate",
        fields: [
          { id: "employerName", label: "Employer / company name", type: "text", required: true },
          { id: "employerAddress", label: "Employer address", type: "textarea" },
          { id: "candidateName", label: "Candidate full name", type: "text", required: true },
          { id: "candidateAddress", label: "Candidate address", type: "textarea" },
          { id: "letterDate", label: "Letter date", type: "date", required: true },
        ],
      },
      {
        id: "role",
        title: "Role & compensation",
        fields: [
          { id: "jobTitle", label: "Job title", type: "text", required: true },
          { id: "startDate", label: "Anticipated start date", type: "date", required: true },
          { id: "employmentType", label: "Employment type", type: "select", required: true,
            options: [
              { value: "fullTime", label: "Full-time (exempt)" },
              { value: "fullTimeNonExempt", label: "Full-time (non-exempt)" },
              { value: "partTime", label: "Part-time" },
            ] },
          { id: "payRate", label: "Compensation (e.g. $75,000 / year or $28.00 / hour)", type: "text", required: true },
          { id: "payFrequency", label: "Pay frequency", type: "select",
            options: [
              { value: "weekly", label: "Weekly" },
              { value: "biweekly", label: "Bi-weekly" },
              { value: "semimonthly", label: "Semi-monthly" },
              { value: "monthly", label: "Monthly" },
            ] },
          { id: "reportsTo", label: "Reports to", type: "text" },
          { id: "workLocation", label: "Primary work location (city, state / remote)", type: "text" },
        ],
      },
      {
        id: "terms",
        title: "Terms & benefits",
        fields: [
          { id: "benefitsSummary", label: "Benefits summary (health, PTO, 401(k), etc.)", type: "textarea",
            placeholder: "Medical, dental, vision after 60 days; 15 days PTO; 401(k) with 4% match…" },
          { id: "contingencies", label: "Contingencies", type: "checkbox",
            help: "Offer contingent on background check, I-9 verification, and reference checks" },
          { id: "atWillAck", label: "This is at-will employment (either party may terminate at any time)", type: "checkbox" },
          { id: "acceptBy", label: "Please accept by (date)", type: "date" },
        ],
      },
    ],
    relatedForms: ["i-9", "w-4", "nda"],
  },
  {
    slug: "independent-contractor-agreement",
    title: "Independent Contractor Agreement",
    shortDescription:
      "Plain-English 1099 contractor agreement covering scope, fees, IP, confidentiality, and termination.",
    category: "business",
    price: 6.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "independentContractor",
    steps: [
      {
        id: "parties",
        title: "Client & contractor",
        fields: [
          { id: "clientName", label: "Client (company) name", type: "text", required: true },
          { id: "clientAddress", label: "Client address", type: "textarea" },
          { id: "contractorName", label: "Contractor name", type: "text", required: true },
          { id: "contractorAddress", label: "Contractor address", type: "textarea" },
          { id: "contractorTaxId", label: "Contractor SSN / EIN (for 1099)", type: "text" },
          { id: "effectiveDate", label: "Effective date", type: "date", required: true },
        ],
      },
      {
        id: "scope",
        title: "Scope & compensation",
        fields: [
          { id: "servicesDescription", label: "Description of services", type: "textarea", required: true,
            placeholder: "Design and develop the marketing website; deliver source files and one round of revisions…" },
          { id: "deliverables", label: "Deliverables & milestones", type: "textarea" },
          { id: "feeStructure", label: "Fee structure", type: "select",
            options: [
              { value: "flatFee", label: "Flat fee" },
              { value: "hourly", label: "Hourly" },
              { value: "milestone", label: "Milestone-based" },
              { value: "retainer", label: "Monthly retainer" },
            ] },
          { id: "feeAmount", label: "Fee amount (USD)", type: "text", required: true },
          { id: "invoiceCadence", label: "Invoice cadence", type: "text", placeholder: "Net 15 upon each milestone" },
          { id: "expensesPolicy", label: "Expenses", type: "select",
            options: [
              { value: "none", label: "Not reimbursable" },
              { value: "preApproved", label: "Reimbursable if pre-approved in writing" },
              { value: "allActual", label: "All reasonable expenses reimbursable" },
            ] },
        ],
      },
      {
        id: "legal",
        title: "IP, confidentiality & termination",
        fields: [
          { id: "ipOwnership", label: "IP ownership", type: "select",
            options: [
              { value: "workForHire", label: "Work-for-hire (Client owns all deliverables)" },
              { value: "license", label: "Contractor retains ownership, Client gets a license" },
            ] },
          { id: "confidentiality", label: "Include mutual confidentiality clause", type: "checkbox" },
          { id: "nonSolicit", label: "12-month non-solicitation of employees", type: "checkbox" },
          { id: "termDays", label: "Either party may terminate with N days written notice", type: "number", placeholder: "14" },
          { id: "governingState", label: "Governing law (state)", type: "usState", required: true },
          { id: "contractorAck1099", label: "Contractor acknowledges 1099 status (no withholdings, no benefits)", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["nda", "w-9", "offer-letter"],
  },
  {
    slug: "direct-deposit-authorization",
    title: "Direct Deposit Authorization",
    shortDescription:
      "Simple authorization form for an employer to deposit wages directly into an employee's bank account.",
    category: "employment",
    price: 3.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "directDeposit",
    steps: [
      {
        id: "employee",
        title: "Employee",
        fields: [
          { id: "employeeName", label: "Full name", type: "text", required: true },
          { id: "employeeAddress", label: "Home address", type: "textarea" },
          { id: "employeeSSN", label: "SSN (last 4 sufficient)", type: "text" },
          { id: "employerName", label: "Employer name", type: "text", required: true },
          { id: "effectiveDate", label: "Effective pay date", type: "date", required: true },
        ],
      },
      {
        id: "bank",
        title: "Bank account",
        description: "Attach a voided check when submitting to your employer.",
        fields: [
          { id: "bankName", label: "Bank name", type: "text", required: true },
          { id: "routingNumber", label: "Routing number (9 digits)", type: "text", required: true },
          { id: "accountNumber", label: "Account number", type: "text", required: true },
          { id: "accountType", label: "Account type", type: "radio", required: true,
            options: [
              { value: "checking", label: "Checking" },
              { value: "savings", label: "Savings" },
            ] },
          { id: "depositType", label: "Deposit amount", type: "radio", required: true,
            options: [
              { value: "full", label: "Full net pay" },
              { value: "fixed", label: "Fixed dollar amount" },
              { value: "percent", label: "Percentage of net pay" },
            ] },
          { id: "depositValue", label: "Fixed $ or % (if not full)", type: "text",
            showWhen: (d) => d.depositType === "fixed" || d.depositType === "percent" },
        ],
      },
      {
        id: "ack",
        title: "Authorization",
        fields: [
          { id: "authAck", label: "I authorize my employer and its financial institution to deposit my pay to the account above, and to reverse any erroneous credits.", type: "checkbox", required: true },
          { id: "signDate", label: "Date signed", type: "date", required: true },
        ],
      },
    ],
    relatedForms: ["w-4", "i-9"],
  },
  {
    stateAware: true,
    slug: "notice-to-vacate",
    title: "Notice to Vacate (Tenant → Landlord)",
    shortDescription:
      "Written notice a tenant gives a landlord to end a month-to-month or lease-end tenancy.",
    category: "realestate",
    price: 3.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "noticeToVacate",
    steps: [
      {
        id: "parties",
        title: "Parties & property",
        fields: [
          { id: "tenantName", label: "Tenant name(s)", type: "text", required: true },
          { id: "landlordName", label: "Landlord name", type: "text", required: true },
          { id: "landlordAddress", label: "Landlord address (where notice is sent)", type: "textarea", required: true },
          { id: "propertyAddress", label: "Rental property address", type: "textarea", required: true },
          { id: "propertyState", label: "State", type: "usState", required: true },
        ],
      },
      {
        id: "notice",
        title: "Notice details",
        fields: [
          { id: "noticeDate", label: "Today's date", type: "date", required: true },
          { id: "vacateDate", label: "Move-out date", type: "date", required: true,
            help: "Most states require at least 30 days for month-to-month tenancies." },
          { id: "tenancyType", label: "Tenancy type", type: "radio",
            options: [
              { value: "monthToMonth", label: "Month-to-month" },
              { value: "leaseEnd", label: "End of fixed-term lease" },
            ] },
          { id: "forwardingAddress", label: "Forwarding address (for security deposit)", type: "textarea" },
          { id: "reason", label: "Optional reason", type: "textarea" },
        ],
      },
    ],
    relatedForms: ["residential-lease-agreement", "eviction-notice"],
  },
  {
    slug: "move-in-move-out-checklist",
    title: "Move-In / Move-Out Inspection Checklist",
    shortDescription:
      "Room-by-room condition checklist protecting both landlord and tenant on security deposit disputes.",
    category: "realestate",
    price: 3.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "moveInOutChecklist",
    steps: [
      {
        id: "meta",
        title: "Property & inspection",
        fields: [
          { id: "propertyAddress", label: "Rental property address", type: "textarea", required: true },
          { id: "tenantName", label: "Tenant name(s)", type: "text", required: true },
          { id: "landlordName", label: "Landlord / manager name", type: "text", required: true },
          { id: "inspectionType", label: "Inspection type", type: "radio", required: true,
            options: [
              { value: "moveIn", label: "Move-in" },
              { value: "moveOut", label: "Move-out" },
            ] },
          { id: "inspectionDate", label: "Inspection date", type: "date", required: true },
        ],
      },
      {
        id: "rooms",
        title: "Room-by-room condition",
        description: "Note condition (Good / Fair / Poor) and any damage.",
        fields: [
          { id: "livingRoom", label: "Living room", type: "textarea" },
          { id: "kitchen", label: "Kitchen (appliances, counters, sink, floors)", type: "textarea" },
          { id: "bedroom1", label: "Bedroom 1", type: "textarea" },
          { id: "bedroom2", label: "Bedroom 2", type: "textarea" },
          { id: "bathroom1", label: "Bathroom 1", type: "textarea" },
          { id: "bathroom2", label: "Bathroom 2", type: "textarea" },
          { id: "exterior", label: "Exterior / garage / yard", type: "textarea" },
          { id: "smokeAlarms", label: "Smoke & CO alarms tested and working", type: "checkbox" },
        ],
      },
      {
        id: "sign",
        title: "Signatures",
        fields: [
          { id: "tenantAck", label: "Tenant has inspected and agrees to the above", type: "checkbox", required: true },
          { id: "landlordAck", label: "Landlord/manager has inspected and agrees to the above", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["residential-lease-agreement", "security-deposit-receipt"],
  },
  {
    slug: "security-deposit-receipt",
    title: "Security Deposit Receipt",
    shortDescription:
      "Written receipt for a security deposit — required by many states within a short window of receipt.",
    category: "realestate",
    price: 3.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "securityDepositReceipt",
    steps: [
      {
        id: "receipt",
        title: "Deposit details",
        fields: [
          { id: "landlordName", label: "Landlord name", type: "text", required: true },
          { id: "tenantName", label: "Tenant name(s)", type: "text", required: true },
          { id: "propertyAddress", label: "Rental property address", type: "textarea", required: true },
          { id: "depositAmount", label: "Deposit amount (USD)", type: "text", required: true },
          { id: "receivedDate", label: "Date received", type: "date", required: true },
          { id: "paymentMethod", label: "Payment method", type: "select",
            options: [
              { value: "check", label: "Check" },
              { value: "moneyOrder", label: "Money order" },
              { value: "ach", label: "Bank transfer / ACH" },
              { value: "cash", label: "Cash" },
              { value: "card", label: "Credit / debit card" },
            ] },
          { id: "bankName", label: "Financial institution holding the deposit", type: "text",
            help: "Required in many states (e.g. MA, NJ, NY, CT)." },
          { id: "accountType", label: "Account type", type: "select",
            options: [
              { value: "escrow", label: "Escrow / trust account" },
              { value: "interest", label: "Interest-bearing account" },
              { value: "operating", label: "Operating account" },
            ] },
          { id: "propertyState", label: "State", type: "usState", required: true },
        ],
      },
    ],
    relatedForms: ["residential-lease-agreement", "move-in-move-out-checklist"],
  },
  {
    stateAware: true,
    slug: "late-rent-notice",
    title: "Late Rent Notice",
    shortDescription:
      "Formal reminder to a tenant that rent is past due, including late fees and a payment deadline.",
    category: "realestate",
    price: 3.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "lateRentNotice",
    steps: [
      {
        id: "parties",
        title: "Parties & property",
        fields: [
          { id: "landlordName", label: "Landlord name", type: "text", required: true },
          { id: "tenantName", label: "Tenant name(s)", type: "text", required: true },
          { id: "propertyAddress", label: "Rental property address", type: "textarea", required: true },
          { id: "propertyState", label: "State", type: "usState", required: true },
        ],
      },
      {
        id: "amounts",
        title: "Amounts owed",
        fields: [
          { id: "noticeDate", label: "Today's date", type: "date", required: true },
          { id: "rentDueDate", label: "Rent was due on", type: "date", required: true },
          { id: "rentAmount", label: "Rent amount owed (USD)", type: "text", required: true },
          { id: "lateFee", label: "Late fee (USD)", type: "text" },
          { id: "totalDue", label: "Total now due (USD)", type: "text", required: true },
          { id: "payBy", label: "Pay by (date)", type: "date", required: true },
          { id: "paymentInstructions", label: "How to pay (check payable to, portal, address)", type: "textarea" },
          { id: "escalationNote", label: "Include notice that eviction proceedings may follow if unpaid", type: "checkbox" },
        ],
      },
    ],
    relatedForms: ["eviction-notice", "residential-lease-agreement"],
  },
  {
    slug: "llc-operating-agreement",
    title: "Basic LLC Operating Agreement",
    shortDescription:
      "Simple single-member or multi-member LLC operating agreement covering ownership, management, and distributions.",
    category: "business",
    price: 9.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "llcOperatingAgreement",
    steps: [
      {
        id: "company",
        title: "Company",
        fields: [
          { id: "llcName", label: "LLC name (exact as filed)", type: "text", required: true },
          { id: "formationState", label: "Formation state", type: "usState", required: true },
          { id: "formationDate", label: "Date of formation", type: "date" },
          { id: "principalAddress", label: "Principal office address", type: "textarea", required: true },
          { id: "purpose", label: "Business purpose", type: "textarea",
            placeholder: "Any lawful purpose for which a limited liability company may be organized…" },
          { id: "term", label: "Term", type: "select",
            options: [
              { value: "perpetual", label: "Perpetual" },
              { value: "fixed", label: "Fixed (see notes)" },
            ] },
        ],
      },
      {
        id: "members",
        title: "Members & ownership",
        fields: [
          { id: "memberType", label: "Membership", type: "radio", required: true,
            options: [
              { value: "single", label: "Single-member" },
              { value: "multi", label: "Multi-member" },
            ] },
          { id: "member1Name", label: "Member 1 — name", type: "text", required: true },
          { id: "member1Address", label: "Member 1 — address", type: "textarea" },
          { id: "member1Contribution", label: "Member 1 — capital contribution (USD)", type: "text" },
          { id: "member1Interest", label: "Member 1 — membership interest (%)", type: "text", placeholder: "100" },
          { id: "member2Name", label: "Member 2 — name", type: "text", showWhen: (d) => d.memberType === "multi" },
          { id: "member2Address", label: "Member 2 — address", type: "textarea", showWhen: (d) => d.memberType === "multi" },
          { id: "member2Contribution", label: "Member 2 — capital contribution (USD)", type: "text", showWhen: (d) => d.memberType === "multi" },
          { id: "member2Interest", label: "Member 2 — membership interest (%)", type: "text", showWhen: (d) => d.memberType === "multi" },
          { id: "additionalMembers", label: "Additional members (name, contribution, %)", type: "textarea", showWhen: (d) => d.memberType === "multi" },
        ],
      },
      {
        id: "management",
        title: "Management & distributions",
        fields: [
          { id: "managementType", label: "Management", type: "radio", required: true,
            options: [
              { value: "member", label: "Member-managed" },
              { value: "manager", label: "Manager-managed" },
            ] },
          { id: "managerName", label: "Manager name (if manager-managed)", type: "text",
            showWhen: (d) => d.managementType === "manager" },
          { id: "distributionPolicy", label: "Distribution policy", type: "textarea",
            placeholder: "Distributions made in proportion to membership interests, at times determined by the members…" },
          { id: "bankAuthority", label: "Who may sign checks / open accounts", type: "text" },
          { id: "attorneyReviewAck", label: "I understand this template does not replace review by a licensed attorney or CPA.", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["independent-contractor-agreement", "nda", "promissory-note"],
  },
  {
    stateAware: true,
    slug: "healthcare-power-of-attorney",
    title: "Healthcare Power of Attorney",
    shortDescription:
      "Appoint a healthcare agent to make medical decisions for you if you cannot speak for yourself.",
    category: "personal",
    price: 6.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "healthcarePoa",
    steps: [
      {
        id: "principal",
        title: "You (the principal)",
        fields: [
          { id: "principalName", label: "Full legal name", type: "text", required: true },
          { id: "principalDOB", label: "Date of birth", type: "date" },
          { id: "principalAddress", label: "Home address", type: "textarea", required: true },
          { id: "principalState", label: "State", type: "usState", required: true,
            help: "Witness and notary rules vary by state." },
        ],
      },
      {
        id: "agent",
        title: "Your healthcare agent",
        fields: [
          { id: "agentName", label: "Agent full name", type: "text", required: true },
          { id: "agentRelationship", label: "Relationship (spouse, adult child, friend…)", type: "text" },
          { id: "agentAddress", label: "Agent address", type: "textarea" },
          { id: "agentPhone", label: "Agent phone", type: "text" },
          { id: "alternateAgentName", label: "Alternate agent name", type: "text" },
          { id: "alternateAgentPhone", label: "Alternate agent phone", type: "text" },
        ],
      },
      {
        id: "authority",
        title: "Powers & preferences",
        fields: [
          { id: "authorityBreadth", label: "Authority", type: "radio", required: true,
            options: [
              { value: "broad", label: "Broad — agent may make any healthcare decision I could make" },
              { value: "limited", label: "Limited — see specific instructions below" },
            ] },
          { id: "specificInstructions", label: "Specific instructions or limits", type: "textarea",
            showWhen: (d) => d.authorityBreadth === "limited" },
          { id: "lifeSupport", label: "Life-sustaining treatment preferences", type: "textarea",
            placeholder: "If I am in a terminal condition or permanent unconsciousness, I want / do not want…" },
          { id: "hipaaWaiver", label: "Agent may access my medical records (HIPAA)", type: "checkbox" },
          { id: "witnessAck", label: "I understand my state requires witnesses and/or notarization to make this valid.", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["living-will", "hipaa-authorization", "power-of-attorney-financial"],
  },
  {
    stateAware: true,
    slug: "simple-will",
    title: "Simple Will / Last Will and Testament",
    shortDescription:
      "Straightforward will covering executor, beneficiaries, and specific gifts. Not for complex estates.",
    category: "personal",
    price: 9.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "simpleWill",
    steps: [
      {
        id: "testator",
        title: "You (the testator)",
        fields: [
          { id: "testatorName", label: "Full legal name", type: "text", required: true },
          { id: "testatorAddress", label: "Home address", type: "textarea", required: true },
          { id: "testatorState", label: "State of residence", type: "usState", required: true },
          { id: "priorWills", label: "I revoke all prior wills and codicils", type: "checkbox", required: true },
          { id: "maritalStatus", label: "Marital status", type: "select",
            options: [
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "widowed", label: "Widowed" },
            ] },
          { id: "spouseName", label: "Spouse name", type: "text", showWhen: (d) => d.maritalStatus === "married" },
        ],
      },
      {
        id: "family",
        title: "Family & guardianship",
        fields: [
          { id: "children", label: "Children (name, date of birth)", type: "textarea" },
          { id: "minorGuardianName", label: "Guardian for minor children — name", type: "text" },
          { id: "minorGuardianAddress", label: "Guardian for minor children — address", type: "textarea" },
          { id: "alternateGuardianName", label: "Alternate guardian — name", type: "text" },
        ],
      },
      {
        id: "executor",
        title: "Executor & gifts",
        fields: [
          { id: "executorName", label: "Executor / personal representative — name", type: "text", required: true },
          { id: "executorAddress", label: "Executor address", type: "textarea" },
          { id: "alternateExecutorName", label: "Alternate executor — name", type: "text" },
          { id: "bondWaiver", label: "Executor may serve without posting bond", type: "checkbox" },
          { id: "specificGifts", label: "Specific gifts (item / amount → to whom)", type: "textarea",
            placeholder: "$10,000 to my sister Jane Doe; my 2019 Toyota Camry to my son John Doe…" },
          { id: "residuaryBeneficiary", label: "Residuary beneficiary (who receives the rest)", type: "textarea", required: true },
          { id: "alternateResiduary", label: "Alternate residuary beneficiary", type: "textarea" },
        ],
      },
      {
        id: "sign",
        title: "Signing formalities",
        note:
          "Most states require this will to be signed by you and witnessed by TWO disinterested adults present at the same time. Some states also require or allow a self-proving notarized affidavit. Do not sign until witnesses are present.",
        fields: [
          { id: "witnessAck", label: "I will sign in the presence of two disinterested adult witnesses.", type: "checkbox", required: true },
          { id: "attorneyReviewAck", label: "I understand this template is not a substitute for review by an estate-planning attorney, especially for larger estates.", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["living-will", "power-of-attorney-financial", "healthcare-power-of-attorney"],
  },
  {
    slug: "living-will",
    title: "Living Will / Advance Directive",
    shortDescription:
      "Written statement of your wishes about life-sustaining treatment if you cannot communicate.",
    category: "personal",
    price: 6.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "livingWill",
    steps: [
      {
        id: "principal",
        title: "You",
        fields: [
          { id: "principalName", label: "Full legal name", type: "text", required: true },
          { id: "principalDOB", label: "Date of birth", type: "date" },
          { id: "principalAddress", label: "Home address", type: "textarea", required: true },
          { id: "principalState", label: "State", type: "usState", required: true },
        ],
      },
      {
        id: "wishes",
        title: "Treatment preferences",
        note:
          "This directive applies only if two physicians determine you have a terminal condition or permanent unconsciousness and cannot make or communicate decisions.",
        fields: [
          { id: "cprPref", label: "CPR (cardiopulmonary resuscitation)", type: "radio",
            options: [
              { value: "want", label: "I want it" },
              { value: "decline", label: "I decline it" },
              { value: "agentDecide", label: "My agent decides" },
            ] },
          { id: "ventilatorPref", label: "Mechanical ventilation", type: "radio",
            options: [
              { value: "want", label: "I want it" },
              { value: "decline", label: "I decline it" },
              { value: "agentDecide", label: "My agent decides" },
            ] },
          { id: "tubeFeedingPref", label: "Artificial nutrition / hydration (tube feeding)", type: "radio",
            options: [
              { value: "want", label: "I want it" },
              { value: "decline", label: "I decline it" },
              { value: "agentDecide", label: "My agent decides" },
            ] },
          { id: "comfortCare", label: "I always want comfort / palliative care", type: "checkbox" },
          { id: "organDonation", label: "I wish to donate my organs and tissues (as permitted by law)", type: "checkbox" },
          { id: "otherWishes", label: "Other wishes", type: "textarea" },
        ],
      },
      {
        id: "sign",
        title: "Signing",
        fields: [
          { id: "witnessAck", label: "I will sign this directive with two disinterested adult witnesses and/or a notary, as required by my state.", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["healthcare-power-of-attorney", "hipaa-authorization", "simple-will"],
  },
  {
    slug: "hipaa-authorization",
    title: "HIPAA Authorization for Release of Medical Information",
    shortDescription:
      "Authorize a hospital or provider to release your protected health information to a named person.",
    category: "personal",
    price: 4.99,
    lastUpdated: "2026-01-01",
    pdfTemplate: "hipaaAuthorization",
    steps: [
      {
        id: "principal",
        title: "You (the patient)",
        fields: [
          { id: "patientName", label: "Patient full legal name", type: "text", required: true },
          { id: "patientDOB", label: "Date of birth", type: "date", required: true },
          { id: "patientAddress", label: "Home address", type: "textarea" },
          { id: "patientPhone", label: "Phone", type: "text" },
        ],
      },
      {
        id: "release",
        title: "Release details",
        fields: [
          { id: "providerName", label: "Provider / hospital name (who releases)", type: "text", required: true },
          { id: "providerAddress", label: "Provider address", type: "textarea" },
          { id: "recipientName", label: "Recipient name (who receives)", type: "text", required: true },
          { id: "recipientAddress", label: "Recipient address", type: "textarea" },
          { id: "recipientRelationship", label: "Recipient relationship / role", type: "text" },
          { id: "purpose", label: "Purpose of disclosure", type: "select",
            options: [
              { value: "personalUse", label: "Personal / family use" },
              { value: "legal", label: "Legal proceedings" },
              { value: "secondOpinion", label: "Second opinion / continuing care" },
              { value: "insurance", label: "Insurance claim" },
              { value: "other", label: "Other" },
            ] },
          { id: "purposeOther", label: "Describe purpose", type: "textarea", showWhen: (d) => d.purpose === "other" },
          { id: "informationType", label: "Information to be released", type: "textarea",
            placeholder: "All medical records; or specific: labs from 1/2024–12/2024, imaging, discharge summaries…" },
          { id: "excludeSensitive", label: "Exclude highly sensitive records", type: "checkbox",
            help: "Some categories (HIV/AIDS, mental health, substance use, genetic testing) require separate specific authorization in many states." },
          { id: "expirationDate", label: "This authorization expires on", type: "date", required: true },
          { id: "revokeAck", label: "I understand I may revoke this authorization in writing at any time.", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["healthcare-power-of-attorney", "living-will"],
  },
];

// Batch 5 — European starter pack. Appended here so `legalForms` includes them.
legalForms.push(...euForms);
// Batch 7 — Country-native EU forms (DE/FR/ES/IT/NL/PL) at /eu-forms/:country/:slug.
legalForms.push(...euCountryForms);

/** Look up a country-native EU form by (country, slug). */
export const getFormByCountrySlug = (country: string, slug: string): LegalFormDef | undefined =>
  legalForms.find((f) => f.country === country && f.slug === slug);

export const getFormBySlug = (slug: string): LegalFormDef | undefined =>
  legalForms.find((f) => f.slug === slug);

export const featuredForms = () => legalForms.filter((f) => f.isFeatured);

/** 50 US states + DC — used by fields with type "usState". */
export const US_STATES: { value: string; label: string }[] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
].map(([value, label]) => ({ value, label }));

/** Evaluate a field's visibility against current form data. */
export function isFieldVisible(field: FormFieldDef, data: Record<string, unknown>): boolean {
  if (!field.showWhen) return true;
  try { return Boolean(field.showWhen(data)); } catch { return true; }
}
