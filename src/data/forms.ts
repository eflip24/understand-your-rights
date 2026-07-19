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

export type PdfTemplate = "w9" | "i9" | "w4" | "nda" | "lease" | "poa";

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
  {
    slug: "w-4",
    title: "Form W-4 – Employee's Withholding Certificate",
    shortDescription: "Tell your employer how much federal income tax to withhold from your paycheck.",
    category: "tax",
    price: 4.99,
    lastUpdated: "2026-01-15",
    isFeatured: true,
    pdfTemplate: "w4",
    steps: [
      {
        id: "personal",
        title: "Personal information",
        fields: [
          { id: "firstName", label: "First name and middle initial", type: "text", required: true },
          { id: "lastName", label: "Last name", type: "text", required: true },
          { id: "ssn", label: "Social Security Number", type: "ssn", required: true },
          { id: "address", label: "Home address", type: "text", required: true },
          {
            id: "filingStatus",
            label: "Filing status",
            type: "select",
            required: true,
            options: [
              { value: "single", label: "Single or married filing separately" },
              { value: "mfj", label: "Married filing jointly" },
              { value: "hoh", label: "Head of household" },
            ],
          },
        ],
      },
      {
        id: "adjustments",
        title: "Adjustments",
        description: "Only fill sections that apply to you.",
        fields: [
          { id: "multipleJobs", label: "Multiple jobs or spouse works", type: "checkbox" },
          { id: "dependents", label: "Total credit for dependents ($)", type: "number", help: "Number of qualifying children under 17 × $2,000, plus other dependents × $500." },
          { id: "otherIncome", label: "Other income (not from jobs) — annual $", type: "number" },
          { id: "deductions", label: "Deductions above the standard deduction — annual $", type: "number" },
          { id: "extraWithholding", label: "Extra withholding per paycheck ($)", type: "number" },
        ],
      },
      {
        id: "sign",
        title: "Sign & date",
        fields: [
          { id: "certify", label: "I declare that this certificate is correct.", type: "checkbox", required: true },
          { id: "signatureDate", label: "Date", type: "date", required: true },
        ],
      },
    ],
    relatedForms: ["w-9", "i-9"],
  },
  {
    slug: "i-9",
    title: "Form I-9 – Employment Eligibility Verification",
    shortDescription: "Establish identity and authorization to work in the United States.",
    category: "employment",
    price: 4.99,
    lastUpdated: "2026-01-15",
    isFeatured: true,
    pdfTemplate: "i9",
    steps: [
      {
        id: "employee",
        title: "Employee information",
        fields: [
          { id: "lastName", label: "Last name (family name)", type: "text", required: true },
          { id: "firstName", label: "First name (given name)", type: "text", required: true },
          { id: "middleInitial", label: "Middle initial", type: "text" },
          { id: "otherLastNames", label: "Other last names used (if any)", type: "text" },
          { id: "address", label: "Address (street, apt)", type: "text", required: true },
          { id: "cityStateZip", label: "City, state, ZIP", type: "text", required: true },
          { id: "dob", label: "Date of birth", type: "date", required: true },
          { id: "ssn", label: "U.S. Social Security Number", type: "ssn" },
          { id: "email", label: "Email address", type: "email" },
        ],
      },
      {
        id: "attestation",
        title: "Citizenship / immigration status",
        fields: [
          {
            id: "status",
            label: "I attest, under penalty of perjury, that I am:",
            type: "select",
            required: true,
            options: [
              { value: "citizen", label: "A citizen of the United States" },
              { value: "national", label: "A noncitizen national of the United States" },
              { value: "lpr", label: "A lawful permanent resident" },
              { value: "authorized", label: "A noncitizen authorized to work" },
            ],
          },
          { id: "alienNumber", label: "USCIS A-Number (if applicable)", type: "text" },
          { id: "workAuthExpires", label: "Work authorization expiration (if any)", type: "date" },
        ],
      },
      {
        id: "sign",
        title: "Sign & date",
        fields: [
          { id: "certify", label: "I attest under penalty of perjury that the above is true.", type: "checkbox", required: true },
          { id: "signatureDate", label: "Today's date", type: "date", required: true },
        ],
      },
    ],
    relatedForms: ["w-4", "w-9"],
  },
  {
    slug: "nda",
    title: "Mutual Non-Disclosure Agreement (NDA)",
    shortDescription: "A simple two-party NDA to keep shared information confidential.",
    category: "business",
    price: 9.99,
    lastUpdated: "2026-01-15",
    isFeatured: true,
    pdfTemplate: "nda",
    steps: [
      {
        id: "parties",
        title: "Parties",
        fields: [
          { id: "partyAName", label: "Party A – legal name", type: "text", required: true },
          { id: "partyAAddress", label: "Party A – address", type: "text", required: true },
          { id: "partyBName", label: "Party B – legal name", type: "text", required: true },
          { id: "partyBAddress", label: "Party B – address", type: "text", required: true },
          { id: "effectiveDate", label: "Effective date", type: "date", required: true },
        ],
      },
      {
        id: "scope",
        title: "Scope",
        fields: [
          { id: "purpose", label: "Purpose of disclosure", type: "textarea", required: true, placeholder: "Evaluating a potential business relationship regarding …" },
          { id: "term", label: "Term of confidentiality (years)", type: "number", required: true, help: "Typical range: 2–5 years." },
          { id: "governingState", label: "Governing state / country", type: "text", required: true },
        ],
      },
      {
        id: "sign",
        title: "Sign",
        fields: [
          { id: "partyASigner", label: "Party A signer name & title", type: "text", required: true },
          { id: "partyBSigner", label: "Party B signer name & title", type: "text", required: true },
          { id: "signatureDate", label: "Signature date", type: "date", required: true },
          { id: "certify", label: "Both parties agree to the terms above.", type: "checkbox", required: true },
        ],
      },
    ],
    relatedForms: ["w-9"],
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
