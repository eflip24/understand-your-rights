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

  // ------------------------------------------------------------------ 9. DSAR
  {
    slug: "eu-dsar-request",
    title: "Free Data Subject Access Request (DSAR) Letter — GDPR Article 15",
    shortDescription:
      "Formal letter to a data controller requesting a copy of all personal data held about you, under Article 15 GDPR.",
    category: "personal",
    region: "eu",
    euCategory: "gdpr",
    price: 2.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "GDPR Art. 15",
    steps: [
      {
        id: "requester",
        title: "Your details",
        fields: [
          countryField,
          { id: "requesterName", label: "Your full name", type: "text", required: true },
          { id: "requesterEmail", label: "Your email", type: "email", required: true },
          { id: "requesterAddress", label: "Your postal address", type: "textarea" },
          { id: "identityRef", label: "Identity reference (customer ID, account number, etc.)", type: "text" },
        ],
      },
      {
        id: "recipient",
        title: "Who you're writing to",
        fields: [
          { id: "controllerName", label: "Controller / company name", type: "text", required: true },
          { id: "controllerContact", label: "DPO or privacy contact email", type: "email", required: true },
        ],
      },
      {
        id: "scope",
        title: "What you're requesting",
        note:
          "Article 15 GDPR gives you the right to: (a) confirmation of processing, (b) a copy of the personal data, (c) purposes, categories, recipients, retention, sources, automated decision-making details, and international transfers. The controller must respond within one month (extendable by two months for complex requests).",
        fields: [
          { id: "scopeConfirmation", label: "Confirmation that my data is being processed", type: "checkbox" },
          { id: "scopeCopy", label: "A copy of all personal data held about me", type: "checkbox" },
          { id: "scopePurposes", label: "Purposes of processing", type: "checkbox" },
          { id: "scopeRecipients", label: "Recipients / categories of recipients", type: "checkbox" },
          { id: "scopeRetention", label: "Retention period or criteria used", type: "checkbox" },
          { id: "scopeSources", label: "Sources of the data (if not collected from me)", type: "checkbox" },
          { id: "scopeAutomated", label: "Existence of automated decision-making, including profiling", type: "checkbox" },
          { id: "scopeTransfers", label: "International data transfers and safeguards", type: "checkbox" },
          { id: "format", label: "Preferred delivery format", type: "select", required: true, options: [
            { value: "electronic", label: "Electronic (PDF or structured file)" },
            { value: "post", label: "Postal mail" },
          ] },
          { id: "requestDate", label: "Date of request", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 10. Data Breach Notification
  {
    slug: "eu-data-breach-notification",
    title: "Free GDPR Data Breach Notification Template — Articles 33 & 34",
    shortDescription:
      "Notification template for reporting a personal data breach to the supervisory authority (Art. 33) and, where required, to affected data subjects (Art. 34).",
    category: "business",
    region: "eu",
    euCategory: "gdpr",
    price: 7.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "GDPR Art. 33 & 34",
    steps: [
      {
        id: "controller",
        title: "Controller & DPO",
        fields: [
          countryField,
          { id: "controllerName", label: "Controller — legal name", type: "text", required: true },
          { id: "controllerAddress", label: "Controller — registered address", type: "textarea", required: true },
          { id: "dpoName", label: "DPO name (or breach point of contact)", type: "text", required: true },
          { id: "dpoEmail", label: "DPO / breach contact email", type: "email", required: true },
          { id: "supervisoryAuthority", label: "Lead supervisory authority", type: "text", required: true, placeholder: "e.g. CNIL (France), BfDI (Germany), AEPD (Spain)" },
        ],
      },
      {
        id: "breach",
        title: "The breach",
        note:
          "Article 33: notify the competent supervisory authority within 72 hours of becoming aware of the breach where feasible. Article 34: additionally notify affected data subjects when the breach is likely to result in a high risk to their rights and freedoms.",
        fields: [
          { id: "discoveryDateTime", label: "When did you become aware of the breach?", type: "text", required: true, placeholder: "e.g. 15 March 2026, 14:30 CET" },
          { id: "incidentDateTime", label: "When did the incident occur (if known)?", type: "text" },
          { id: "natureOfBreach", label: "Nature of the breach", type: "select", required: true, options: [
            { value: "confidentiality", label: "Confidentiality — unauthorised disclosure / access" },
            { value: "integrity", label: "Integrity — unauthorised alteration" },
            { value: "availability", label: "Availability — accidental / unlawful loss or destruction" },
            { value: "mixed", label: "Mixed / more than one category" },
          ] },
          { id: "description", label: "Description of what happened", type: "textarea", required: true },
          { id: "dataCategories", label: "Categories of personal data affected", type: "textarea", required: true, placeholder: "e.g. names, emails, hashed passwords, IP addresses" },
          { id: "dataSubjectCategories", label: "Categories of data subjects affected", type: "textarea", required: true, placeholder: "e.g. customers, employees" },
          { id: "approximateNumbers", label: "Approximate number of data subjects & records", type: "text", required: true },
        ],
      },
      {
        id: "consequences",
        title: "Consequences & measures",
        fields: [
          { id: "likelyConsequences", label: "Likely consequences for data subjects", type: "textarea", required: true, placeholder: "e.g. risk of phishing / identity theft" },
          { id: "measuresTaken", label: "Measures already taken", type: "textarea", required: true, placeholder: "e.g. revoked tokens, forced password reset, patched vulnerability" },
          { id: "measuresProposed", label: "Measures proposed to mitigate risk", type: "textarea" },
          { id: "highRisk", label: "Breach likely to result in a HIGH risk to data subjects — notify them under Art. 34?", type: "checkbox" },
          { id: "communicationMethod", label: "How data subjects will be notified", type: "text", placeholder: "e.g. Email to affected accounts + banner in app" },
          { id: "notificationDate", label: "Date of notification", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 11. Privacy Policy
  {
    slug: "eu-privacy-policy",
    title: "Free GDPR Privacy Policy Template — Articles 13 & 14",
    shortDescription:
      "Basic GDPR-compliant privacy policy covering the Article 13 & 14 disclosures every EU business must publish.",
    category: "business",
    region: "eu",
    euCategory: "gdpr",
    price: 9.99,
    lastUpdated: today,
    isFeatured: true,
    pdfTemplate: "generic",
    edition: "GDPR Art. 13 & 14",
    steps: [
      {
        id: "controller",
        title: "Your organisation",
        fields: [
          countryField,
          { id: "controllerName", label: "Controller / company name", type: "text", required: true },
          { id: "controllerAddress", label: "Registered address", type: "textarea", required: true },
          { id: "contactEmail", label: "Privacy contact email", type: "email", required: true },
          { id: "dpoContact", label: "DPO name & contact (if appointed)", type: "text" },
          { id: "websiteUrl", label: "Website / service URL", type: "text", required: true },
        ],
      },
      {
        id: "processing",
        title: "What data & why",
        note:
          "Under Art. 13 GDPR you must disclose: identity & contact of controller, DPO if any, purposes and legal basis for processing, legitimate interests where relied on, recipients, international transfers, retention period, data-subject rights, right to lodge a complaint, and whether provision of data is a statutory / contractual requirement.",
        fields: [
          { id: "dataCollected", label: "Personal data you collect", type: "textarea", required: true, placeholder: "e.g. name, email, IP address, order history, cookies" },
          { id: "purposes", label: "Purposes of processing", type: "textarea", required: true, placeholder: "e.g. account creation, order fulfilment, marketing (with consent), fraud prevention" },
          { id: "legalBases", label: "Legal bases used (Art. 6)", type: "textarea", required: true, placeholder: "e.g. Contract (Art. 6(1)(b)), Consent (Art. 6(1)(a)), Legitimate interests (Art. 6(1)(f))" },
          { id: "recipients", label: "Recipients / processors", type: "textarea", placeholder: "e.g. Stripe (payments), AWS (hosting), Google Analytics (analytics)" },
          { id: "internationalTransfers", label: "Transfers outside the EEA?", type: "select", required: true, options: [
            { value: "none", label: "None" },
            { value: "sccs", label: "Yes, under Standard Contractual Clauses" },
            { value: "adequacy", label: "Yes, to adequacy-decision countries only" },
          ] },
          { id: "retentionSummary", label: "Retention periods (summary)", type: "textarea", required: true, placeholder: "e.g. Account data: while the account is active + 12 months. Invoices: 10 years (tax law)." },
        ],
      },
      {
        id: "rights",
        title: "Rights, cookies & complaints",
        fields: [
          { id: "cookiesUsed", label: "Cookies / tracking used", type: "select", required: true, options: [
            { value: "essential", label: "Essential only (no consent banner needed)" },
            { value: "analytics", label: "Essential + analytics (consent required)" },
            { value: "marketing", label: "Analytics + advertising (consent required)" },
          ] },
          { id: "supervisoryAuthority", label: "Supervisory authority (for complaints)", type: "text", required: true, placeholder: "e.g. Commission Nationale de l'Informatique et des Libertés (CNIL)" },
          { id: "policyEffectiveDate", label: "Effective date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 12. Freelance Contract
  {
    slug: "eu-freelance-contract",
    title: "Free EU Freelance / Self-Employed Service Contract",
    shortDescription:
      "Service contract between a client and a self-employed freelancer in the EU, with clear deliverables, VAT status, and IP terms.",
    category: "employment",
    region: "eu",
    euCategory: "employment",
    price: 7.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "parties",
        title: "Client & freelancer",
        fields: [
          countryField,
          { id: "clientName", label: "Client legal name", type: "text", required: true },
          { id: "clientAddress", label: "Client address", type: "textarea", required: true },
          { id: "clientVat", label: "Client VAT number (if applicable)", type: "text" },
          { id: "freelancerName", label: "Freelancer legal name", type: "text", required: true },
          { id: "freelancerAddress", label: "Freelancer address", type: "textarea", required: true },
          { id: "freelancerVat", label: "Freelancer VAT number (if applicable)", type: "text" },
        ],
      },
      {
        id: "scope",
        title: "Scope & deliverables",
        note:
          "Freelance contracts must clearly establish independence — no fixed hours, no exclusive relationship, freelancer supplies own tools and works for other clients — to avoid re-classification as employment (false self-employment / disguised employment) under EU and national labour law.",
        fields: [
          { id: "services", label: "Services to be provided", type: "textarea", required: true },
          { id: "deliverables", label: "Deliverables / milestones", type: "textarea", required: true },
          { id: "startDate", label: "Start date", type: "date", required: true },
          { id: "endDate", label: "End date or 'until completion'", type: "text" },
        ],
      },
      {
        id: "fees",
        title: "Fees & IP",
        fields: [
          { id: "feeAmount", label: "Fee amount", type: "number", required: true },
          { id: "feeCurrency", label: "Currency", type: "select", required: true, options: [
            { value: "EUR", label: "EUR (€)" }, { value: "GBP", label: "GBP (£)" }, { value: "USD", label: "USD" },
          ] },
          { id: "feeStructure", label: "Fee structure", type: "select", required: true, options: [
            { value: "fixed", label: "Fixed total fee" },
            { value: "hourly", label: "Hourly rate" },
            { value: "milestone", label: "Milestone-based" },
          ] },
          { id: "vatHandling", label: "VAT handling", type: "select", required: true, options: [
            { value: "add", label: "VAT added at applicable local rate" },
            { value: "reverse", label: "Reverse charge (intra-EU B2B under Art. 196)" },
            { value: "exempt", label: "Not VAT-registered / exempt" },
          ] },
          { id: "paymentTerms", label: "Payment terms", type: "text", placeholder: "e.g. Net 30 by bank transfer" },
          { id: "ipOwnership", label: "IP ownership on delivery", type: "select", required: true, options: [
            { value: "client", label: "Assigned to client on full payment" },
            { value: "license", label: "Freelancer retains ownership; client gets a non-exclusive licence" },
          ] },
          { id: "signDate", label: "Effective date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 13. Independent Contractor Agreement (EU)
  {
    slug: "eu-independent-contractor-agreement",
    title: "Free EU Independent Contractor Agreement Template",
    shortDescription:
      "Contractor agreement drafted around EU false-self-employment criteria (autonomy, own tools, no integration into workforce, multiple clients).",
    category: "employment",
    region: "eu",
    euCategory: "employment",
    price: 8.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "parties",
        title: "The parties",
        fields: [
          countryField,
          { id: "clientName", label: "Client legal name", type: "text", required: true },
          { id: "clientAddress", label: "Client address", type: "textarea", required: true },
          { id: "contractorName", label: "Contractor legal name", type: "text", required: true },
          { id: "contractorAddress", label: "Contractor address", type: "textarea", required: true },
          { id: "contractorRegistration", label: "Contractor business registration / VAT number", type: "text" },
        ],
      },
      {
        id: "relationship",
        title: "Independence factors",
        note:
          "Genuinely self-employed contractors: work autonomously, use their own equipment, are free to accept other clients, are not integrated into the client's workforce, and bear financial risk. This section documents each factor to reduce re-classification risk.",
        fields: [
          { id: "ownEquipment", label: "Contractor provides own tools & equipment", type: "checkbox" },
          { id: "worksForOthers", label: "Contractor is free to work for other clients", type: "checkbox" },
          { id: "noFixedHours", label: "No fixed working hours — contractor sets own schedule", type: "checkbox" },
          { id: "canSubcontract", label: "Contractor may subcontract or use substitutes", type: "checkbox" },
          { id: "bearsRisk", label: "Contractor bears financial risk (rectification / warranty)", type: "checkbox" },
        ],
      },
      {
        id: "scope",
        title: "Scope, fee & IP",
        fields: [
          { id: "services", label: "Services / deliverables", type: "textarea", required: true },
          { id: "startDate", label: "Start date", type: "date", required: true },
          { id: "term", label: "Term / expected completion", type: "text", required: true },
          { id: "feeAmount", label: "Fee (with currency)", type: "text", required: true, placeholder: "e.g. €5,000 fixed, or €80/hour" },
          { id: "expenses", label: "Expenses policy", type: "select", required: true, options: [
            { value: "included", label: "Included in fee" },
            { value: "preapproved", label: "Pre-approved expenses reimbursed at cost" },
          ] },
          { id: "ipAssignment", label: "All work-product IP is assigned to the client on payment", type: "checkbox" },
          { id: "signDate", label: "Signature date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 14. Director Appointment Letter
  {
    slug: "eu-director-appointment",
    title: "Free EU Company Director Appointment Letter",
    shortDescription:
      "Formal letter appointing a company director, setting out role, powers, remuneration, and duties under national company law.",
    category: "business",
    region: "eu",
    euCategory: "business",
    price: 6.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "company",
        title: "Company",
        fields: [
          countryField,
          { id: "companyName", label: "Company legal name", type: "text", required: true },
          { id: "companyRegistration", label: "Company registration number", type: "text", required: true },
          { id: "registeredAddress", label: "Registered address", type: "textarea", required: true },
        ],
      },
      {
        id: "director",
        title: "Director",
        fields: [
          { id: "directorName", label: "Director full name", type: "text", required: true },
          { id: "directorAddress", label: "Director address", type: "textarea", required: true },
          { id: "directorNationality", label: "Nationality", type: "text" },
          { id: "directorDob", label: "Date of birth", type: "date" },
        ],
      },
      {
        id: "role",
        title: "Role & terms",
        note:
          "Directors owe statutory duties under national company law (e.g. §93 AktG in Germany, s. 172-177 Companies Act in Ireland, Art. L. 225-251 Code de commerce in France). This letter records the appointment; the actual duties come from statute.",
        fields: [
          { id: "roleTitle", label: "Role title", type: "select", required: true, options: [
            { value: "director", label: "Director" },
            { value: "managing", label: "Managing Director" },
            { value: "executive", label: "Executive Director" },
            { value: "nonexec", label: "Non-Executive Director" },
          ] },
          { id: "appointmentDate", label: "Effective appointment date", type: "date", required: true },
          { id: "term", label: "Term of appointment", type: "text", required: true, placeholder: "e.g. Indefinite / 3 years / until removed by shareholders" },
          { id: "remuneration", label: "Remuneration", type: "text", placeholder: "e.g. €0 (uncompensated) or €X per year" },
          { id: "keyPowers", label: "Key powers granted", type: "textarea", placeholder: "e.g. Sign banking documents, represent the company externally, hire staff up to €X" },
          { id: "insuranceCover", label: "D&O insurance in place?", type: "checkbox" },
          { id: "signatoryDate", label: "Signature date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 15. Service / Consulting Agreement
  {
    slug: "eu-service-agreement",
    title: "Free EU Service / Consulting Agreement Template",
    shortDescription:
      "General-purpose B2B service or consulting agreement for EU businesses, with SOW, fees, VAT, and limitation of liability.",
    category: "business",
    region: "eu",
    euCategory: "business",
    price: 7.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "parties",
        title: "The parties",
        fields: [
          countryField,
          { id: "providerName", label: "Provider (consultant) — legal name", type: "text", required: true },
          { id: "providerAddress", label: "Provider address", type: "textarea", required: true },
          { id: "providerVat", label: "Provider VAT number", type: "text" },
          { id: "clientName", label: "Client — legal name", type: "text", required: true },
          { id: "clientAddress", label: "Client address", type: "textarea", required: true },
          { id: "clientVat", label: "Client VAT number", type: "text" },
        ],
      },
      {
        id: "sow",
        title: "Statement of work",
        fields: [
          { id: "servicesDescription", label: "Services to be provided", type: "textarea", required: true },
          { id: "deliverables", label: "Deliverables", type: "textarea" },
          { id: "kpis", label: "Acceptance criteria / KPIs", type: "textarea" },
          { id: "startDate", label: "Start date", type: "date", required: true },
          { id: "endDate", label: "End date or 'until completion'", type: "text" },
        ],
      },
      {
        id: "commercial",
        title: "Fees, IP & liability",
        note:
          "Under Directive 2011/7/EU on combating late payment in commercial transactions, B2B payment terms should not exceed 60 days unless expressly agreed and not grossly unfair. Statutory late-payment interest applies (ECB reference + 8 percentage points).",
        fields: [
          { id: "fees", label: "Fees & rate", type: "text", required: true, placeholder: "e.g. €150/hour or €10,000 fixed" },
          { id: "paymentTerms", label: "Payment terms", type: "text", required: true, placeholder: "e.g. Net 30 days" },
          { id: "vatHandling", label: "VAT handling", type: "select", required: true, options: [
            { value: "add", label: "VAT added at applicable rate" },
            { value: "reverse", label: "Reverse charge (Art. 196 VAT Directive)" },
            { value: "exempt", label: "Not VAT-registered / exempt" },
          ] },
          { id: "ipTerms", label: "IP terms", type: "select", required: true, options: [
            { value: "clientOwns", label: "All work product assigned to client on payment" },
            { value: "providerOwns", label: "Provider retains IP; client gets a non-exclusive licence" },
          ] },
          { id: "liabilityCap", label: "Liability cap (typically fees paid in the prior 12 months)", type: "text", placeholder: "e.g. Fees paid in prior 12 months" },
          { id: "governingLaw", label: "Governing law", type: "text", required: true },
          { id: "signDate", label: "Effective date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 16. IP Assignment
  {
    slug: "eu-ip-assignment",
    title: "Free EU IP Assignment Agreement Template",
    shortDescription:
      "Full assignment of intellectual property (copyright, related rights, database rights) from an author or contractor to a company, with a moral-rights waiver where permitted.",
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
          { id: "assignorName", label: "Assignor (author / contractor) name", type: "text", required: true },
          { id: "assignorAddress", label: "Assignor address", type: "textarea", required: true },
          { id: "assigneeName", label: "Assignee (company) legal name", type: "text", required: true },
          { id: "assigneeAddress", label: "Assignee registered address", type: "textarea", required: true },
        ],
      },
      {
        id: "work",
        title: "Assigned work & rights",
        note:
          "Moral rights (paternity, integrity) are inalienable in France, Germany and most EU civil-law jurisdictions — they cannot be transferred and often cannot be waived. Include a waiver clause but note it may be unenforceable in some member states.",
        fields: [
          { id: "workDescription", label: "Description of the work assigned", type: "textarea", required: true, placeholder: "e.g. All code, designs and documentation created for Project X between 1 Jan and 30 Jun 2026" },
          { id: "rightsIncluded", label: "Rights included", type: "textarea", required: true, placeholder: "e.g. copyright, database rights, related rights, all trademarks, know-how" },
          { id: "consideration", label: "Consideration (payment for the assignment)", type: "text", required: true, placeholder: "e.g. €5,000, or 'included in service fee under agreement dated …'" },
          { id: "moralRightsWaiver", label: "Include moral-rights waiver (where permitted)", type: "checkbox" },
          { id: "warrantyOriginal", label: "Assignor warrants the work is original and free of third-party claims", type: "checkbox" },
          { id: "signDate", label: "Effective date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 17. Basic Shareholder Agreement
  {
    slug: "eu-shareholder-agreement",
    title: "Free EU Basic Shareholder Agreement Template",
    shortDescription:
      "Simple shareholder agreement for a private EU company, covering share ownership, transfer restrictions, and basic decision-making.",
    category: "business",
    region: "eu",
    euCategory: "business",
    price: 12.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "company",
        title: "The company",
        fields: [
          countryField,
          { id: "companyName", label: "Company legal name", type: "text", required: true },
          { id: "companyForm", label: "Legal form", type: "select", required: true, options: [
            { value: "gmbh", label: "GmbH (Germany)" }, { value: "sarl", label: "SARL / SAS (France)" },
            { value: "sl", label: "SL / SRL (Spain / Italy)" }, { value: "bv", label: "BV (Netherlands)" },
            { value: "ltd", label: "Ltd (Ireland)" }, { value: "other", label: "Other" },
          ] },
          { id: "registeredAddress", label: "Registered address", type: "textarea", required: true },
          { id: "shareCapital", label: "Share capital", type: "text", required: true, placeholder: "e.g. €25,000 divided into 25,000 shares" },
        ],
      },
      {
        id: "shareholders",
        title: "Shareholders",
        fields: [
          { id: "shareholder1Name", label: "Shareholder 1 name", type: "text", required: true },
          { id: "shareholder1Percent", label: "Shareholder 1 % holding", type: "number", required: true },
          { id: "shareholder2Name", label: "Shareholder 2 name", type: "text" },
          { id: "shareholder2Percent", label: "Shareholder 2 % holding", type: "number" },
          { id: "shareholder3Name", label: "Shareholder 3 name (optional)", type: "text" },
          { id: "shareholder3Percent", label: "Shareholder 3 % holding", type: "number" },
        ],
      },
      {
        id: "governance",
        title: "Governance & transfers",
        note:
          "This template is a simple starting point. A private-company shareholder agreement usually needs local review — statutory pre-emption, drag/tag rights and quorum rules vary materially between GmbH, SARL, SL, BV and Ltd companies.",
        fields: [
          { id: "boardComposition", label: "Board composition", type: "text", required: true, placeholder: "e.g. 2 directors — one nominated by each majority shareholder group" },
          { id: "reservedMatters", label: "Reserved matters (require unanimous / supermajority approval)", type: "textarea", placeholder: "e.g. Issuing new shares, taking on debt over €X, changing the business, selling the company" },
          { id: "preEmption", label: "Include pre-emption rights on share transfers", type: "checkbox" },
          { id: "tagAlong", label: "Include tag-along right for minority shareholders", type: "checkbox" },
          { id: "dragAlong", label: "Include drag-along right (majority can force a sale)", type: "checkbox" },
          { id: "governingLaw", label: "Governing law", type: "text", required: true },
          { id: "signDate", label: "Effective date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 18. EU Demand Letter
  {
    slug: "eu-demand-letter",
    title: "Free EU Demand / Collection Letter — Late Payment Directive 2011/7/EU",
    shortDescription:
      "Formal demand letter to recover an unpaid invoice, invoking statutory late-payment interest and recovery costs under Directive 2011/7/EU.",
    category: "business",
    region: "eu",
    euCategory: "business",
    price: 4.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    edition: "Directive 2011/7/EU",
    steps: [
      {
        id: "sender",
        title: "You (the creditor)",
        fields: [
          countryField,
          { id: "senderName", label: "Your business name", type: "text", required: true },
          { id: "senderAddress", label: "Your address", type: "textarea", required: true },
          { id: "senderVat", label: "Your VAT number", type: "text" },
        ],
      },
      {
        id: "debtor",
        title: "Debtor",
        fields: [
          { id: "debtorName", label: "Debtor legal name", type: "text", required: true },
          { id: "debtorAddress", label: "Debtor address", type: "textarea", required: true },
        ],
      },
      {
        id: "debt",
        title: "The debt",
        note:
          "Directive 2011/7/EU (transposed into national law across the EU) grants automatic statutory late-payment interest on B2B debts after the payment deadline, plus a flat €40 recovery-cost lump sum and reasonable further recovery costs.",
        fields: [
          { id: "invoiceNumber", label: "Invoice number", type: "text", required: true },
          { id: "invoiceDate", label: "Invoice date", type: "date", required: true },
          { id: "dueDate", label: "Original due date", type: "date", required: true },
          { id: "amountDue", label: "Amount due", type: "number", required: true },
          { id: "currency", label: "Currency", type: "select", required: true, options: [
            { value: "EUR", label: "EUR (€)" }, { value: "GBP", label: "GBP (£)" }, { value: "SEK", label: "SEK" }, { value: "PLN", label: "PLN" },
          ] },
          { id: "servicesGoods", label: "What the invoice was for", type: "textarea", required: true },
          { id: "priorReminders", label: "Prior reminders sent (dates)", type: "text" },
          { id: "paymentDeadlineDays", label: "Payment deadline (days from this letter)", type: "number", required: true, placeholder: "e.g. 14" },
          { id: "claimInterest", label: "Claim statutory late-payment interest", type: "checkbox" },
          { id: "claimRecoveryCosts", label: "Claim €40 lump-sum recovery cost (Art. 6)", type: "checkbox" },
          { id: "letterDate", label: "Letter date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 19. Consumer Complaint Letter
  {
    slug: "eu-consumer-complaint",
    title: "Free EU Consumer Complaint Letter Template",
    shortDescription:
      "Formal complaint letter to a trader relying on the EU Consumer Rights Directive (2011/83/EU) and the Sale of Goods Directive (2019/771).",
    category: "personal",
    region: "eu",
    euCategory: "consumer",
    price: 2.49,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "consumer",
        title: "You (the consumer)",
        fields: [
          countryField,
          { id: "consumerName", label: "Your full name", type: "text", required: true },
          { id: "consumerAddress", label: "Your address", type: "textarea", required: true },
          { id: "consumerEmail", label: "Your email", type: "email", required: true },
        ],
      },
      {
        id: "trader",
        title: "Trader",
        fields: [
          { id: "traderName", label: "Trader legal name", type: "text", required: true },
          { id: "traderAddress", label: "Trader address", type: "textarea", required: true },
          { id: "traderEmail", label: "Trader email", type: "email" },
        ],
      },
      {
        id: "complaint",
        title: "The complaint",
        note:
          "Directive 2019/771 gives EU consumers a 2-year legal guarantee (some countries longer) covering goods that are not in conformity at delivery. Remedies (Art. 13): repair or replacement first, then price reduction or termination. Every EU country also offers an ADR body and the EU Online Dispute Resolution platform (ec.europa.eu/consumers/odr) for online purchases.",
        fields: [
          { id: "orderRef", label: "Order / contract reference", type: "text", required: true },
          { id: "purchaseDate", label: "Date of purchase", type: "date", required: true },
          { id: "itemDescription", label: "Product / service", type: "textarea", required: true },
          { id: "amountPaid", label: "Amount paid", type: "text", required: true },
          { id: "problem", label: "Description of the problem", type: "textarea", required: true },
          { id: "remedyRequested", label: "Remedy requested", type: "select", required: true, options: [
            { value: "repair", label: "Repair" },
            { value: "replacement", label: "Replacement" },
            { value: "reduction", label: "Price reduction" },
            { value: "refund", label: "Full refund / contract termination" },
          ] },
          { id: "deadlineDays", label: "Deadline for trader response (days)", type: "number", required: true, placeholder: "e.g. 14" },
          { id: "letterDate", label: "Letter date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 20. EU Rental Agreement
  {
    slug: "eu-rental-agreement",
    title: "Free Basic EU Rental / Tenancy Agreement Template",
    shortDescription:
      "Simple residential tenancy agreement for EU landlords and tenants. National tenancy laws override — always check local minimum-term and deposit rules.",
    category: "realestate",
    region: "eu",
    euCategory: "realestate",
    price: 8.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "parties",
        title: "Landlord & tenant",
        fields: [
          countryField,
          { id: "landlordName", label: "Landlord name", type: "text", required: true },
          { id: "landlordAddress", label: "Landlord address", type: "textarea", required: true },
          { id: "tenantName", label: "Tenant name(s)", type: "text", required: true },
          { id: "tenantAddress", label: "Tenant current address", type: "textarea" },
        ],
      },
      {
        id: "property",
        title: "The property",
        note:
          "National tenancy rules override this template. Germany's Mietrecht, France's Loi ALUR, Spain's LAU, Italy's Legge 431/1998, and the Netherlands' Huurrecht each impose minimum terms, notice periods, and deposit caps. Never sign a foreign-language template without local review.",
        fields: [
          { id: "propertyAddress", label: "Rental property address", type: "textarea", required: true },
          { id: "propertyType", label: "Property type", type: "select", required: true, options: [
            { value: "apartment", label: "Apartment" },
            { value: "house", label: "House" },
            { value: "room", label: "Room in shared property" },
          ] },
          { id: "furnished", label: "Furnished?", type: "select", required: true, options: [
            { value: "furnished", label: "Furnished" },
            { value: "part", label: "Part-furnished" },
            { value: "unfurnished", label: "Unfurnished" },
          ] },
        ],
      },
      {
        id: "terms",
        title: "Term, rent & deposit",
        fields: [
          { id: "startDate", label: "Start date", type: "date", required: true },
          { id: "termLength", label: "Term length", type: "text", required: true, placeholder: "e.g. 12 months, or open-ended (unbefristet)" },
          { id: "noticePeriod", label: "Notice period", type: "text", required: true, placeholder: "e.g. 3 months" },
          { id: "monthlyRent", label: "Monthly rent", type: "number", required: true },
          { id: "currency", label: "Currency", type: "select", required: true, options: [
            { value: "EUR", label: "EUR (€)" }, { value: "GBP", label: "GBP (£)" }, { value: "SEK", label: "SEK" }, { value: "PLN", label: "PLN" },
          ] },
          { id: "rentDueDay", label: "Rent due day of month", type: "number", placeholder: "e.g. 1" },
          { id: "depositAmount", label: "Security deposit (typically 1-3 months' rent)", type: "number" },
          { id: "utilitiesIncluded", label: "Utilities included in rent?", type: "textarea", placeholder: "e.g. Water & heating included; electricity billed separately" },
          { id: "signDate", label: "Signature date", type: "date", required: true },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ 21. Simple Will
  {
    slug: "eu-simple-will",
    title: "Free Basic EU Simple Will Template",
    shortDescription:
      "A starting-point simple will for EU residents. Formalities vary sharply by country — always finalise with a notary where required.",
    category: "personal",
    region: "eu",
    euCategory: "personal",
    price: 9.99,
    lastUpdated: today,
    pdfTemplate: "generic",
    steps: [
      {
        id: "testator",
        title: "You (the testator)",
        fields: [
          countryField,
          { id: "testatorName", label: "Your full legal name", type: "text", required: true },
          { id: "testatorAddress", label: "Your address", type: "textarea", required: true },
          { id: "testatorDob", label: "Date of birth", type: "date", required: true },
          { id: "testatorNationality", label: "Nationality", type: "text", required: true },
        ],
      },
      {
        id: "family",
        title: "Family & executor",
        note:
          "EU Regulation 650/2012 (Brussels IV) lets you choose the law of your nationality to govern your succession. Most civil-law countries (France, Germany, Spain, Italy) enforce 'forced heirship' — a fixed share must go to children and sometimes spouse. This template is a starting draft only; wills should be notarised or holographic under local law.",
        fields: [
          { id: "spouseName", label: "Spouse / partner name (if any)", type: "text" },
          { id: "childrenNames", label: "Children (names & dates of birth)", type: "textarea" },
          { id: "executorName", label: "Executor full name", type: "text", required: true },
          { id: "executorAddress", label: "Executor address", type: "textarea", required: true },
          { id: "alternateExecutorName", label: "Alternate executor", type: "text" },
        ],
      },
      {
        id: "bequests",
        title: "Bequests & residuary estate",
        fields: [
          { id: "specificBequests", label: "Specific bequests (item / cash amount to named person)", type: "textarea", placeholder: "e.g. €10,000 to my brother John Smith. My gold watch to my daughter Anna." },
          { id: "residuaryBeneficiary", label: "Residuary beneficiary (who inherits everything else)", type: "text", required: true },
          { id: "residuaryAlternate", label: "Alternate residuary beneficiary", type: "text" },
          { id: "guardianMinorChildren", label: "Guardian for minor children (if applicable)", type: "text" },
          { id: "chosenSuccessionLaw", label: "Chosen law of succession (usually nationality — Brussels IV)", type: "text" },
          { id: "signDate", label: "Date of will", type: "date", required: true },
        ],
      },
    ],
  },
];
