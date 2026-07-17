export type FormFieldType =
  | "text"
  | "email"
  | "date"
  | "number"
  | "select"
  | "textarea"
  | "checkbox"
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
}

export interface FormStepDef {
  id: string;
  title: string;
  description?: string;
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
}

export const categoryLabels: Record<FormCategory, string> = {
  employment: "Employment",
  tax: "Tax",
  business: "Business",
  realestate: "Real Estate",
  personal: "Personal",
};

export const legalForms: LegalFormDef[] = [
  {
    slug: "w-9",
    title: "Form W-9 – Request for Taxpayer Identification Number",
    shortDescription:
      "Provide your TIN to a business that pays you as an independent contractor.",
    category: "tax",
    price: 4.99,
    lastUpdated: "2026-01-15",
    isFeatured: true,
    pdfTemplate: "w9",
    steps: [
      {
        id: "identity",
        title: "Your identity",
        description: "Match this exactly to what appears on your tax return.",
        fields: [
          { id: "name", label: "Full legal name", type: "text", required: true, help: "As shown on your income tax return." },
          { id: "businessName", label: "Business / disregarded entity name", type: "text", help: "Only if different from the name above." },
          {
            id: "classification",
            label: "Federal tax classification",
            type: "select",
            required: true,
            options: [
              { value: "individual", label: "Individual / sole proprietor" },
              { value: "cCorp", label: "C Corporation" },
              { value: "sCorp", label: "S Corporation" },
              { value: "partnership", label: "Partnership" },
              { value: "trust", label: "Trust / estate" },
              { value: "llc", label: "Limited liability company" },
            ],
          },
        ],
      },
      {
        id: "address",
        title: "Address",
        fields: [
          { id: "address", label: "Street address", type: "text", required: true },
          { id: "cityStateZip", label: "City, state, and ZIP code", type: "text", required: true },
        ],
      },
      {
        id: "tin",
        title: "Taxpayer identification",
        description: "Enter your SSN or EIN. Never share this over unsecured channels.",
        fields: [
          { id: "ssn", label: "Social Security Number", type: "ssn", help: "Individuals and sole proprietors." },
          { id: "ein", label: "Employer Identification Number", type: "ein", help: "Entities other than sole proprietors." },
        ],
      },
      {
        id: "certify",
        title: "Certification",
        fields: [
          { id: "certifyAccurate", label: "I certify the information provided is accurate.", type: "checkbox", required: true },
          { id: "signatureDate", label: "Date", type: "date", required: true },
        ],
      },
    ],
    relatedForms: ["w-4", "nda"],
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
