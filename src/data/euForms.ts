/**
 * Batch 5 — European starter pack.
 *
 * 8 EU-focused fillable forms. Each entry uses the shared LegalFormDef
 * shape (see forms.ts) with region:"eu" so they are excluded from the
 * US Forms Hub and grouped under /eu-forms.
 *
 * PDF rendering uses the generic label/value renderer — legally-sensitive
 * template text is included in each step's `note` block so it appears in
 * both the wizard UI and the generated PDF.
 */
import type { LegalFormDef, FormFieldDef } from "@/data/forms";

/** Ten common EU jurisdictions surfaced in the country selector. */
export const EU_COUNTRIES: { code: string; name: string }[] = [
  { code: "generic", name: "Generic EU (any member state)" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "IE", name: "Ireland" },
  { code: "BE", name: "Belgium" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Poland" },
  { code: "SE", name: "Sweden" },
];

const countryField: FormFieldDef = {
  id: "__euCountry",
  label: "Applicable country / jurisdiction",
  type: "select",
  required: true,
  help: "Choose 'Generic EU' if the parties are in different member states or you want a jurisdiction-neutral template.",
  options: EU_COUNTRIES.map((c) => ({ value: c.code, label: c.name })),
};

/** EU-specific category taxonomy used only on the EU hub. */
export type EuCategoryKey =
  | "gdpr"
  | "employment"
  | "consumer"
  | "business"
  | "realestate"
  | "personal"
  | "tax";

export const euCategoryLabels: Record<EuCategoryKey, string> = {
  gdpr: "Data Protection & GDPR",
  employment: "Employment & HR (EU)",
  consumer: "Consumer Rights & Contracts",
  business: "Company & Business",
  realestate: "Real Estate & Rental",
  personal: "Personal & Family",
  tax: "Tax & VAT",
};

const today = "2026-07-21";

export const euForms: LegalFormDef[] = [
  // ------------------------------------------------------------------ 1. DPA
  {
    slug: "eu-gdpr-dpa",
    title: "Free GDPR Data Processing Agreement (DPA) Template — EU / GDPR Article 28",
    shortDescription:
      "Controller-to-processor DPA covering Article 28 GDPR clauses: subject matter, duration, sub-processors, security, international transfers, and audit rights.",
    category: "business",
    region: "eu",
    euCategory: "gdpr",
    price: 9.99,
    lastUpdated: today,
    isFeatured: true,
    pdfTemplate: "generic",
    edition: "GDPR Art. 28 compliant",
    officialLink: {
      label: "eur-lex.europa.eu (GDPR text)",
      href: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    },
    steps: [
      {
        id: "parties",
        title: "The parties",
        description: "Identify the data controller (your company or customer) and the data processor (the vendor handling personal data).",
        fields: [
          countryField,
          { id: "controllerName", label: "Controller — legal name", type: "text", required: true },
          { id: "controllerAddress", label: "Controller — registered address", type: "textarea", required: true },
          { id: "controllerRep", label: "Controller — signatory name & role", type: "text", required: true },
          { id: "processorName", label: "Processor — legal name", type: "text", required: true },
          { id: "processorAddress", label: "Processor — registered address", type: "textarea", required: true },
          { id: "processorRep", label: "Processor — signatory name & role", type: "text", required: true },
        ],
      },
      {
        id: "processing",
        title: "Nature & purpose of processing (Art. 28(3))",
        note:
          "Article 28 GDPR requires the DPA to specify: subject matter, duration, nature and purpose of processing, type of personal data, categories of data subjects, and controller obligations & rights.",
        fields: [
          { id: "subjectMatter", label: "Subject matter of processing", type: "textarea", required: true, placeholder: "e.g. hosting and analytics of controller's SaaS product users" },
          { id: "duration", label: "Duration", type: "text", required: true, placeholder: "e.g. Term of the underlying service agreement" },
          { id: "purpose", label: "Purpose of processing", type: "textarea", required: true },
          { id: "dataTypes", label: "Categories of personal data", type: "textarea", required: true, placeholder: "e.g. name, email, IP address, usage logs" },
          { id: "dataSubjects", label: "Categories of data subjects", type: "textarea", required: true, placeholder: "e.g. controller's end users, employees" },
        ],
      },
      {
        id: "sub-processors",
        title: "Sub-processors & transfers",
        fields: [
          { id: "subProcessorsAllowed", label: "Sub-processors permitted?", type: "select", required: true, options: [
            { value: "general", label: "General written authorization (with 30-day notice of changes)" },
            { value: "specific", label: "Specific prior written consent required for each" },
            { value: "none", label: "None permitted" },
          ] },
          { id: "subProcessorsList", label: "Approved sub-processors (initial list)", type: "textarea", placeholder: "One per line: name — service — country" },
          { id: "internationalTransfers", label: "International data transfers outside EEA?", type: "select", required: true, options: [
            { value: "none", label: "None — data stays inside EEA" },
            { value: "sccs", label: "Yes — under EU Standard Contractual Clauses (2021/914)" },
            { value: "adequacy", label: "Yes — to adequacy-decision country only" },
          ] },
        ],
      },
      {
        id: "security",
        title: "Security & breach",
        note:
          "Art. 32 GDPR: processor must implement appropriate technical and organisational measures. Art. 33: processor must notify controller of a personal data breach without undue delay.",
        fields: [
          { id: "securityMeasures", label: "Key security measures (summary)", type: "textarea", required: true, placeholder: "e.g. encryption at rest & in transit, access controls, MFA, ISO 27001 certified data centers, staff confidentiality obligations" },
          { id: "breachNotificationHours", label: "Breach notification window (hours)", type: "number", required: true, placeholder: "72" },
          { id: "auditRights", label: "Audit rights", type: "select", required: true, options: [
            { value: "reports", label: "Third-party audit reports (SOC 2 / ISO 27001) on request" },
            { value: "onsite", label: "On-site audit once per year with 30-day notice" },
          ] },
        ],
      },
      {
        id: "term",
        title: "Term, deletion & signatures",
        fields: [
          { id: "onTermination", label: "On termination the processor will…", type: "select", required: true, options: [
            { value: "delete", label: "Delete all personal data (default under Art. 28(3)(g))" },
            { value: "return", label: "Return all personal data to the controller" },
          ] },
          { id: "effectiveDate", label: "Effective date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 2. Consent
  {
    slug: "eu-gdpr-consent",
    title: "Free GDPR Consent Form Template — EU Marketing & Data Consent",
    shortDescription:
      "Plain-English GDPR consent form covering purposes, data categories, withdrawal, retention, and data-subject rights under Articles 6, 7 and 13.",
    category: "business",
    region: "eu",
    euCategory: "gdpr",
    price: 4.99,
    lastUpdated: today,
    isFeatured: true,
    pdfTemplate: "generic",
    edition: "GDPR Art. 6, 7 & 13",
    steps: [
      {
        id: "controller",
        title: "Data controller",
        fields: [
          countryField,
          { id: "controllerName", label: "Your organisation (controller)", type: "text", required: true },
          { id: "controllerContact", label: "Contact address (postal or email)", type: "textarea", required: true },
          { id: "dpoContact", label: "DPO contact (if appointed)", type: "text" },
        ],
      },
      {
        id: "purpose",
        title: "What you'll do with the data",
        note:
          "Art. 7 GDPR: consent must be freely given, specific, informed and unambiguous. List each purpose separately — bundling purposes into one tick-box is not valid consent.",
        fields: [
          { id: "dataCategories", label: "Personal data collected", type: "textarea", required: true, placeholder: "e.g. name, email, phone number" },
          { id: "purpose1", label: "Purpose 1", type: "text", required: true, placeholder: "e.g. Send our monthly newsletter" },
          { id: "purpose2", label: "Purpose 2 (optional)", type: "text" },
          { id: "purpose3", label: "Purpose 3 (optional)", type: "text" },
          { id: "recipients", label: "Recipients / sub-processors", type: "textarea", placeholder: "e.g. Mailchimp (email delivery), based in USA under SCCs" },
        ],
      },
      {
        id: "retention",
        title: "Retention & rights",
        fields: [
          { id: "retention", label: "How long you'll keep the data", type: "text", required: true, placeholder: "e.g. Until consent is withdrawn, then deleted within 30 days" },
          { id: "withdrawInstructions", label: "How to withdraw consent", type: "textarea", required: true, placeholder: "e.g. Click 'unsubscribe' in any email, or email privacy@example.com" },
        ],
      },
      {
        id: "signature",
        title: "Signature",
        fields: [
          { id: "dataSubjectName", label: "Data subject — full name", type: "text", required: true },
          { id: "consentDate", label: "Date consent given", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 3. EU Employment Contract
  {
    slug: "eu-employment-contract",
    title: "Free EU Employment Contract Template — Directive 2019/1152 Transparent Working Conditions",
    shortDescription:
      "EU employment contract with the mandatory information required by Directive 2019/1152 on transparent and predictable working conditions.",
    category: "employment",
    region: "eu",
    euCategory: "employment",
    price: 9.99,
    lastUpdated: today,
    isFeatured: true,
    pdfTemplate: "generic",
    edition: "Directive 2019/1152",
    steps: [
      {
        id: "parties",
        title: "Employer & employee",
        fields: [
          countryField,
          { id: "employerName", label: "Employer legal name", type: "text", required: true },
          { id: "employerAddress", label: "Employer registered address", type: "textarea", required: true },
          { id: "employeeName", label: "Employee full name", type: "text", required: true },
          { id: "employeeAddress", label: "Employee address", type: "textarea", required: true },
        ],
      },
      {
        id: "role",
        title: "Role, workplace & start",
        note:
          "Directive 2019/1152 art. 4 requires the employer to provide information on: identity of parties, place of work, job title / description, start date, duration (if fixed-term), probationary period, remuneration, working time, paid leave, notice period, and applicable collective agreements.",
        fields: [
          { id: "jobTitle", label: "Job title", type: "text", required: true },
          { id: "jobDescription", label: "Duties / description", type: "textarea", required: true },
          { id: "workplace", label: "Place of work (or note that work is remote / multi-site)", type: "text", required: true },
          { id: "startDate", label: "Start date", type: "date", required: true },
          { id: "contractType", label: "Contract type", type: "select", required: true, options: [
            { value: "indefinite", label: "Indefinite (permanent)" },
            { value: "fixed", label: "Fixed-term" },
          ] },
          { id: "endDate", label: "End date (fixed-term only)", type: "date", showWhen: (d) => d.contractType === "fixed" },
          { id: "probationMonths", label: "Probationary period (months, max 6 under Directive 2019/1152)", type: "number" },
        ],
      },
      {
        id: "pay",
        title: "Pay & hours",
        fields: [
          { id: "salaryAmount", label: "Gross salary amount", type: "number", required: true },
          { id: "salaryPeriod", label: "Paid…", type: "select", required: true, options: [
            { value: "monthly", label: "Monthly" },
            { value: "weekly", label: "Weekly" },
            { value: "hourly", label: "Hourly" },
          ] },
          { id: "currency", label: "Currency", type: "select", required: true, options: [
            { value: "EUR", label: "EUR (€)" }, { value: "GBP", label: "GBP (£)" }, { value: "SEK", label: "SEK" }, { value: "PLN", label: "PLN" },
          ] },
          { id: "weeklyHours", label: "Standard weekly working hours", type: "number", required: true, placeholder: "e.g. 40" },
          { id: "holidayDays", label: "Paid annual leave (days, EU minimum 20)", type: "number", required: true },
        ],
      },
      {
        id: "endterms",
        title: "Notice, confidentiality & signature",
        fields: [
          { id: "noticeWeeks", label: "Notice period (weeks)", type: "number", required: true },
          { id: "collectiveAgreement", label: "Applicable collective agreement (if any)", type: "text" },
          { id: "confidentialityIncluded", label: "Include confidentiality clause?", type: "checkbox" },
          { id: "signingDate", label: "Contract date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 4. RTBF
  {
    slug: "eu-rtbf-request",
    title: "Free 'Right to be Forgotten' Request Letter — GDPR Article 17",
    shortDescription:
      "Formal letter requesting erasure of personal data under Article 17 GDPR. Send to a company, search engine, or public authority.",
    category: "personal",
    region: "eu",
    euCategory: "gdpr",
    price: 2.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "GDPR Art. 17",
    steps: [
      {
        id: "requester",
        title: "Your details",
        fields: [
          countryField,
          { id: "requesterName", label: "Your full name", type: "text", required: true },
          { id: "requesterEmail", label: "Your email", type: "email", required: true },
          { id: "requesterAddress", label: "Your postal address", type: "textarea" },
        ],
      },
      {
        id: "recipient",
        title: "Who you're writing to",
        fields: [
          { id: "recipientName", label: "Company / controller name", type: "text", required: true },
          { id: "recipientEmail", label: "Their DPO / privacy contact email", type: "email", required: true },
        ],
      },
      {
        id: "request",
        title: "Grounds for erasure",
        note:
          "Article 17(1) GDPR lists six grounds for erasure — you only need one. Common choices: (a) data no longer necessary, (b) you withdraw consent, (c) you object under Art. 21, (d) unlawful processing.",
        fields: [
          { id: "ground", label: "Ground under Art. 17(1) GDPR", type: "select", required: true, options: [
            { value: "17-1-a", label: "(a) No longer necessary for the original purpose" },
            { value: "17-1-b", label: "(b) I withdraw consent and there is no other legal basis" },
            { value: "17-1-c", label: "(c) I object to processing under Art. 21 and no overriding grounds" },
            { value: "17-1-d", label: "(d) Data was processed unlawfully" },
            { value: "17-1-e", label: "(e) Erasure required by EU or Member-State law" },
          ] },
          { id: "dataToErase", label: "What data you want erased", type: "textarea", required: true, placeholder: "e.g. My account (email jane@example.com), any linked profile data, and search index entries pointing to https://example.com/…" },
          { id: "priorContact", label: "Prior contact reference (if any)", type: "text" },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 5. EU POA
  {
    slug: "eu-power-of-attorney",
    title: "Free EU Power of Attorney Template (General / Financial)",
    shortDescription:
      "General-purpose EU power of attorney letting an agent act on your behalf on financial and administrative matters. Notarisation rules vary by country.",
    category: "personal",
    region: "eu",
    euCategory: "personal",
    price: 6.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "parties",
        title: "Principal & agent",
        fields: [
          countryField,
          { id: "principalName", label: "Principal (you) — full name", type: "text", required: true },
          { id: "principalId", label: "Principal ID / passport number", type: "text", required: true },
          { id: "principalAddress", label: "Principal address", type: "textarea", required: true },
          { id: "agentName", label: "Agent — full name", type: "text", required: true },
          { id: "agentId", label: "Agent ID / passport number", type: "text", required: true },
          { id: "agentAddress", label: "Agent address", type: "textarea", required: true },
        ],
      },
      {
        id: "powers",
        title: "Powers granted",
        note:
          "Notarisation and witnessing rules differ by member state. Germany, France, Italy and Spain typically require notary certification for banking or real-estate powers. Check with a local notary before use.",
        fields: [
          { id: "powerBanking", label: "Banking transactions (open/close accounts, transfers, cards)", type: "checkbox" },
          { id: "powerTax", label: "Tax filings & correspondence with authorities", type: "checkbox" },
          { id: "powerRealEstate", label: "Real-estate transactions", type: "checkbox" },
          { id: "powerLegal", label: "Legal representation before courts & administrative bodies", type: "checkbox" },
          { id: "powerBusiness", label: "Business / company matters", type: "checkbox" },
          { id: "powerOther", label: "Other (describe)", type: "textarea" },
          { id: "effectiveDate", label: "Effective from", type: "date", required: true },
          { id: "expiryDate", label: "Valid until (leave blank for open-ended)", type: "date" },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 6. Consumer withdrawal (14 day)
  {
    slug: "eu-consumer-withdrawal",
    title: "Free 14-Day Consumer Withdrawal Form — EU Directive 2011/83/EU Annex I(B)",
    shortDescription:
      "Standard EU cancellation form to exercise the 14-day right of withdrawal on online and off-premises purchases under Directive 2011/83/EU.",
    category: "personal",
    region: "eu",
    euCategory: "consumer",
    price: 1.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "Directive 2011/83/EU Annex I(B)",
    steps: [
      {
        id: "trader",
        title: "Trader details",
        fields: [
          countryField,
          { id: "traderName", label: "Trader (seller) name", type: "text", required: true },
          { id: "traderAddress", label: "Trader address", type: "textarea", required: true },
          { id: "traderEmail", label: "Trader email", type: "email", required: true },
        ],
      },
      {
        id: "order",
        title: "Your order",
        note:
          "You have 14 calendar days from receipt of goods (or conclusion of the contract for services) to withdraw without giving a reason. Return shipping costs may fall on you unless the trader stated otherwise.",
        fields: [
          { id: "consumerName", label: "Your name", type: "text", required: true },
          { id: "consumerAddress", label: "Your address", type: "textarea", required: true },
          { id: "orderRef", label: "Order reference", type: "text", required: true },
          { id: "orderDate", label: "Date ordered", type: "date", required: true },
          { id: "receivedDate", label: "Date received", type: "date", required: true },
          { id: "itemsWithdrawn", label: "Goods / services being withdrawn", type: "textarea", required: true },
          { id: "reason", label: "Reason (optional)", type: "textarea" },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 7. VAT invoice
  {
    slug: "eu-vat-invoice",
    title: "Free EU VAT Invoice Template — Multi-Country with Reverse Charge",
    shortDescription:
      "Compliant EU VAT invoice with mandatory Article 226 VAT Directive fields, reverse-charge toggle, and multi-currency support.",
    category: "business",
    region: "eu",
    euCategory: "tax",
    price: 3.99,
    lastUpdated: today,
    isFeatured: true,
    pdfTemplate: "generic",
    edition: "Directive 2006/112/EC Art. 226",
    steps: [
      {
        id: "seller",
        title: "Seller",
        fields: [
          countryField,
          { id: "sellerName", label: "Seller legal name", type: "text", required: true },
          { id: "sellerAddress", label: "Seller address", type: "textarea", required: true },
          { id: "sellerVat", label: "Seller VAT number", type: "text", required: true, placeholder: "e.g. DE123456789" },
        ],
      },
      {
        id: "buyer",
        title: "Buyer",
        fields: [
          { id: "buyerName", label: "Buyer name", type: "text", required: true },
          { id: "buyerAddress", label: "Buyer address", type: "textarea", required: true },
          { id: "buyerVat", label: "Buyer VAT number (required for reverse charge / intra-EU B2B)", type: "text" },
        ],
      },
      {
        id: "invoice",
        title: "Invoice details",
        note:
          "Art. 226 VAT Directive requires: unique invoice number, issue date, supply date if different, VAT numbers of both parties for B2B intra-EU, description & quantity, unit price ex-VAT, VAT rate & amount, and total. For reverse charge use the note: 'Reverse charge — Art. 196 VAT Directive'.",
        fields: [
          { id: "invoiceNumber", label: "Invoice number", type: "text", required: true },
          { id: "issueDate", label: "Issue date", type: "date", required: true },
          { id: "supplyDate", label: "Date of supply", type: "date", required: true },
          { id: "currency", label: "Currency", type: "select", required: true, options: [
            { value: "EUR", label: "EUR (€)" }, { value: "GBP", label: "GBP (£)" }, { value: "SEK", label: "SEK" }, { value: "PLN", label: "PLN" }, { value: "USD", label: "USD" },
          ] },
          { id: "lineDescription", label: "Description of goods / services", type: "textarea", required: true },
          { id: "quantity", label: "Quantity", type: "number", required: true },
          { id: "unitPriceExVat", label: "Unit price (ex-VAT)", type: "number", required: true },
          { id: "vatRate", label: "VAT rate (%)", type: "number", required: true, placeholder: "e.g. 19 (DE), 20 (FR), 21 (ES/NL), 22 (IT)" },
          { id: "reverseCharge", label: "Apply reverse charge (intra-EU B2B under Art. 196)?", type: "checkbox" },
          { id: "paymentTerms", label: "Payment terms", type: "text", placeholder: "e.g. Due within 30 days by SEPA transfer" },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 8. EU NDA
  {
    slug: "eu-nda",
    title: "Free EU NDA Template with GDPR Clauses — Mutual Non-Disclosure Agreement",
    shortDescription:
      "Mutual non-disclosure agreement for EU parties, with GDPR-aware clauses on personal data received during the collaboration.",
    category: "business",
    region: "eu",
    euCategory: "business",
    price: 6.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "parties",
        title: "The parties",
        fields: [
          countryField,
          { id: "party1Name", label: "Party 1 — legal name", type: "text", required: true },
          { id: "party1Address", label: "Party 1 — address", type: "textarea", required: true },
          { id: "party2Name", label: "Party 2 — legal name", type: "text", required: true },
          { id: "party2Address", label: "Party 2 — address", type: "textarea", required: true },
          { id: "governingLaw", label: "Governing law", type: "text", required: true, placeholder: "e.g. Laws of Ireland" },
        ],
      },
      {
        id: "scope",
        title: "Scope & term",
        fields: [
          { id: "purpose", label: "Purpose of disclosure", type: "textarea", required: true, placeholder: "e.g. Evaluate a potential commercial partnership between the parties" },
          { id: "confidentialityYears", label: "Confidentiality period (years)", type: "number", required: true, placeholder: "e.g. 3" },
          { id: "returnOnRequest", label: "Return / destroy materials on written request", type: "checkbox" },
        ],
      },
      {
        id: "gdpr",
        title: "GDPR data clauses",
        note:
          "If any confidential information includes personal data, both parties act as independent controllers unless they agree otherwise. Each party must comply with the GDPR, maintain appropriate technical and organisational measures, and notify the other of any personal data breach without undue delay.",
        fields: [
          { id: "includesPersonalData", label: "Confidential info likely to include personal data?", type: "checkbox" },
          { id: "signatoryDate", label: "Effective date", type: "date", required: true },
        ],
      },
    ],
  },
];
