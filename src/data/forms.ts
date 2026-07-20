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
  | "evictionNotice";

export interface LegalFormDef {
  slug: string;
  title: string;
  shortDescription: string;
  category: FormCategory;
  price: number; // USD for clean PDF
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
    relatedForms: ["w-9", "residential-lease"],
  },

  {
    slug: "residential-lease",
    title: "Residential Lease Agreement",
    shortDescription: "A plain-English fixed-term lease between landlord and tenant.",
    category: "realestate",
    price: 14.99,
    lastUpdated: "2026-01-15",
    isFeatured: true,
    pdfTemplate: "lease",
    steps: [
      {
        id: "parties",
        title: "Landlord & tenant",
        fields: [
          { id: "landlord", label: "Landlord full name", type: "text", required: true },
          { id: "tenant", label: "Tenant full name(s)", type: "text", required: true },
        ],
      },
      {
        id: "property",
        title: "Property",
        fields: [
          { id: "propertyAddress", label: "Property address", type: "text", required: true },
          { id: "unit", label: "Unit / apt", type: "text" },
          { id: "state", label: "State / jurisdiction", type: "text", required: true },
        ],
      },
      {
        id: "terms",
        title: "Term & rent",
        fields: [
          { id: "startDate", label: "Lease start date", type: "date", required: true },
          { id: "endDate", label: "Lease end date", type: "date", required: true },
          { id: "monthlyRent", label: "Monthly rent ($)", type: "number", required: true },
          { id: "securityDeposit", label: "Security deposit ($)", type: "number" },
          { id: "dueDay", label: "Rent due day of month", type: "number", help: "Common: 1." },
        ],
      },
      {
        id: "rules",
        title: "Rules",
        fields: [
          { id: "petsAllowed", label: "Pets allowed", type: "checkbox" },
          { id: "smokingAllowed", label: "Smoking allowed", type: "checkbox" },
          { id: "utilities", label: "Utilities included", type: "textarea", placeholder: "Water, trash, …" },
          { id: "certify", label: "Both parties agree to the terms.", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["nda"],
  },
  {
    slug: "power-of-attorney",
    title: "General Power of Attorney",
    shortDescription: "Appoint an agent to act on your behalf for financial matters.",
    category: "personal",
    price: 14.99,
    lastUpdated: "2026-01-15",
    isFeatured: true,
    pdfTemplate: "poa",
    steps: [
      {
        id: "principal",
        title: "Principal (you)",
        fields: [
          { id: "principalName", label: "Your full legal name", type: "text", required: true },
          { id: "principalAddress", label: "Your address", type: "text", required: true },
          { id: "principalDob", label: "Your date of birth", type: "date" },
        ],
      },
      {
        id: "agent",
        title: "Agent (attorney-in-fact)",
        fields: [
          { id: "agentName", label: "Agent's full legal name", type: "text", required: true },
          { id: "agentAddress", label: "Agent's address", type: "text", required: true },
          { id: "alternateAgent", label: "Alternate agent (optional)", type: "text" },
        ],
      },
      {
        id: "scope",
        title: "Powers granted",
        fields: [
          { id: "powers", label: "Powers granted to the agent", type: "textarea", required: true, placeholder: "e.g., manage bank accounts, sign real-estate documents…" },
          { id: "durable", label: "This POA is durable (survives incapacity)", type: "checkbox" },
          { id: "effectiveDate", label: "Effective date", type: "date", required: true },
          { id: "state", label: "Governing state", type: "text", required: true },
        ],
      },
      {
        id: "sign",
        title: "Sign",
        fields: [
          { id: "certify", label: "I sign this power of attorney willingly.", type: "checkbox", required: true },
          { id: "signatureDate", label: "Signature date", type: "date", required: true },
        ],
      },
    ],
    relatedForms: ["residential-lease"],
  },
];

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
