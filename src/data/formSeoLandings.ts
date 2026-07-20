/**
 * SEO landing page content for top-CPC legal forms.
 * These are separate keyword-targeted landing pages that funnel into the
 * existing `/forms/:slug` wizards. Not modifications to the wizards.
 */

export interface HowToStep {
  name: string;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FormSeoLandingDef {
  /** URL slug under /forms/ (e.g. "w-9-online-free") */
  slug: string;
  /** Wizard slug in src/data/forms.ts to funnel users into */
  wizardSlug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Top of page hero sub-headline */
  tagline: string;
  intro: string;
  useCases: string[];
  howToSteps: HowToStep[];
  faqs: FaqItem[];
  keywords: string[];
  /** Optional related SEO landings by slug */
  related?: string[];
  /** Whether to add GovernmentService schema (for IRS/USCIS forms) */
  isGovernmentForm?: boolean;
  governmentAgency?: string;
}

export const FORM_SEO_LANDINGS: FormSeoLandingDef[] = [
  {
    slug: "w-9-online-free",
    wizardSlug: "w-9",
    h1: "Fill Out a W-9 Form Online — Free, Fillable PDF (2024 Revision)",
    metaTitle: "Free Fillable W-9 Form Online (2024 PDF) | LegallySpoken",
    metaDescription:
      "Fill out IRS Form W-9 (Rev. March 2024) online free in minutes. Guided wizard, instant PDF download, e-signature ready. No login required.",
    tagline: "IRS Form W-9 (Rev. March 2024) • Free fillable PDF • E-sign ready",
    intro:
      "Form W-9, Request for Taxpayer Identification Number and Certification, is the IRS form independent contractors, freelancers, LLC members and vendors give to businesses that pay them. Payers use the information on the W-9 to prepare 1099-NEC and 1099-MISC forms at year-end. Our free online W-9 mirrors the exact IRS March 2024 revision — every line, checkbox, and certification statement — and generates a clean, printable PDF instantly.",
    useCases: [
      "Freelancers and 1099 contractors sending a W-9 to a new client",
      "LLC members and S-corp owners providing their EIN to a payer",
      "Landlords collecting W-9s from property managers or vendors",
      "Nonprofits collecting W-9s from service providers before issuing 1099s",
      "Real estate transactions requiring TIN certification",
    ],
    howToSteps: [
      { name: "Enter your legal name and business name", text: "Line 1 is your legal name as shown on your income tax return. Line 2 is your business or disregarded entity name (if different)." },
      { name: "Select your federal tax classification", text: "Individual/sole proprietor, C-corp, S-corp, partnership, trust/estate, or LLC. If LLC, pick the tax classification (C, S, or P)." },
      { name: "Add exemption codes (if applicable)", text: "Most individuals leave these blank. Exempt payees have a code; FATCA-exempt entities (rare for U.S. persons) have a separate code." },
      { name: "Enter your address", text: "Street, city, state, and ZIP. This is where the requester will mail your 1099." },
      { name: "Provide your TIN", text: "Enter your SSN if you're an individual/sole proprietor, or your EIN if you have one. Do not enter both." },
      { name: "Sign and date under penalties of perjury", text: "The certification confirms the TIN is correct and you are not subject to backup withholding. Draw or type your signature and download the PDF." },
    ],
    faqs: [
      { q: "Is this the official IRS W-9?", a: "Yes. Our wizard mirrors the IRS Form W-9 (Rev. March 2024) line-for-line. The generated PDF is the same information a payer would receive on the IRS-issued blank form." },
      { q: "Is filling out the W-9 free?", a: "Yes. The guided wizard and standard PDF download are always free. A clean, watermark-free PDF is available as an optional one-time upgrade." },
      { q: "Do I use my SSN or EIN on the W-9?", a: "Sole proprietors and single-member LLCs (disregarded entities) generally use their SSN. Corporations, partnerships and multi-member LLCs use their EIN." },
      { q: "Can I e-sign the W-9?", a: "Yes. The IRS accepts electronic signatures on W-9s. You can draw or type your signature in the final step and download the signed PDF." },
      { q: "How long is a W-9 valid?", a: "A W-9 remains valid until the information on it changes (name, address, TIN, or tax classification). Payers may request a new W-9 periodically for their records." },
      { q: "What's new in the March 2024 W-9 revision?", a: "The 2024 revision adds a new Line 3b requiring flow-through entities (partnerships, trusts, LLCs treated as partnerships) with direct or indirect foreign partners to check a box if they have any foreign partners, owners, or beneficiaries." },
    ],
    keywords: ["fillable w-9", "w9 form 2024 pdf", "w-9 online free", "irs w-9 fillable", "download w9 pdf"],
    related: ["w-4-online-free", "i-9-online-free"],
    isGovernmentForm: true,
    governmentAgency: "Internal Revenue Service",
  },
  {
    slug: "w-4-online-free",
    wizardSlug: "w-4",
    h1: "Fill Out a W-4 Form Online — Free 2026 Employee's Withholding Certificate",
    metaTitle: "Free Fillable W-4 Form 2026 Online PDF | LegallySpoken",
    metaDescription:
      "Complete IRS Form W-4 (2026) online free. Multiple jobs, dependents, and deductions worksheet built in. Instant PDF, e-sign ready, no login.",
    tagline: "IRS Form W-4 (2026) • Employee's Withholding Certificate • Free PDF",
    intro:
      "Form W-4, Employee's Withholding Certificate, tells your employer how much federal income tax to withhold from your paycheck. The 2026 W-4 uses the modern five-step design (no more allowances) with built-in adjustments for multiple jobs, dependents, and other income. Our free online W-4 walks you through each step, calculates the withholding adjustments for you, and produces a clean PDF you can hand to HR the same day.",
    useCases: [
      "New hires completing W-4 on day one of employment",
      "Employees adjusting withholding after marriage, divorce, or a new child",
      "Two-earner households using the Step 2 multiple-jobs worksheet",
      "Employees claiming the Child Tax Credit or Credit for Other Dependents",
      "Correcting under- or over-withholding after a large tax bill or refund",
    ],
    howToSteps: [
      { name: "Enter your personal information (Step 1)", text: "Name, address, SSN, and filing status (Single, Married filing jointly, or Head of household)." },
      { name: "Handle multiple jobs (Step 2)", text: "If you have more than one job or your spouse works, use the IRS estimator, the multiple-jobs worksheet, or check the Step 2(c) box on both W-4s (only if the two jobs pay similarly)." },
      { name: "Claim dependents (Step 3)", text: "Multiply the number of qualifying children under 17 by $2,000 and other dependents by $500. Add them together and enter the total." },
      { name: "Make other adjustments (Step 4)", text: "Optional: report other income not from jobs, itemized deductions above the standard deduction, and any extra per-pay-period withholding." },
      { name: "Sign and give to your employer (Step 5)", text: "Sign and date under penalties of perjury. Your employer completes the bottom section and files the form with payroll — you keep a copy for your records." },
    ],
    faqs: [
      { q: "Do I have to fill out a W-4 every year?", a: "No. You only need a new W-4 when your situation changes (marriage, new child, new job) or when you want to adjust your withholding." },
      { q: "What's changed on the 2026 W-4?", a: "The 2026 form keeps the five-step design introduced in 2020. Dependent amounts remain $2,000 per qualifying child and $500 per other dependent. Standard deduction and bracket thresholds in the worksheets update annually with inflation." },
      { q: "Can I claim exempt from withholding?", a: "Only if you had no federal tax liability last year and expect none this year. Write 'Exempt' in the space below Step 4(c) and complete Steps 1(a), 1(b), and 5 only. Exempt status expires February 15 each year." },
      { q: "How do I have more tax taken out per paycheck?", a: "Enter an additional dollar amount on Step 4(c). This is the most direct way to increase withholding — it's added to whatever the tables already calculate." },
      { q: "Is the online W-4 accepted by employers?", a: "Yes. The IRS allows electronic W-4 submissions, and printed PDFs are universally accepted by HR and payroll departments." },
    ],
    keywords: ["w4 form 2026", "fillable w4", "w-4 online free", "employee withholding certificate 2026"],
    related: ["w-9-online-free", "i-9-online-free"],
    isGovernmentForm: true,
    governmentAgency: "Internal Revenue Service",
  },
  {
    slug: "i-9-online-free",
    wizardSlug: "i-9",
    h1: "Fill Out Form I-9 Online — Free Employment Eligibility Verification (Ed. 01/20/25)",
    metaTitle: "Free Fillable I-9 Form Online (2025 Edition) | LegallySpoken",
    metaDescription:
      "Complete USCIS Form I-9 (Edition 01/20/25) online free. Sections 1 & 2 wizard, acceptable-documents lookup, instant PDF, e-sign ready.",
    tagline: "USCIS Form I-9 (Edition 01/20/25) • Employment Eligibility Verification",
    intro:
      "Form I-9, Employment Eligibility Verification, is the USCIS form every U.S. employer must complete for every new hire — citizen, permanent resident, and work-authorized noncitizen alike. The employee completes Section 1 on or before day one; the employer completes Section 2 within three business days of the start date. Our free online I-9 wizard uses the current 01/20/25 edition and produces a clean PDF you can print, store, or upload into your HRIS.",
    useCases: [
      "Small businesses onboarding their first W-2 employees",
      "HR teams standardizing new-hire paperwork",
      "Employers verifying List A vs. List B + C documents",
      "Reverifying work authorization for noncitizens with expiring authorization",
      "Preparing I-9s ahead of an internal audit or ICE inspection",
    ],
    howToSteps: [
      { name: "Employee: complete Section 1 by end of first day", text: "Enter legal name, address, DOB, SSN (optional unless E-Verify), and attest citizenship/immigration status. Sign and date." },
      { name: "Choose acceptable documents", text: "Employee presents either one List A document (establishes both identity and work authorization) OR one List B (identity) plus one List C (work authorization) document." },
      { name: "Employer: examine originals within 3 business days", text: "Physically examine the documents (or use the DHS alternative procedure if enrolled in E-Verify and qualified). Do not accept photocopies except for certified birth certificate copies." },
      { name: "Employer: complete Section 2", text: "Record document titles, issuing authorities, document numbers, and expiration dates. Enter first day of employment and sign the attestation." },
      { name: "Retain the completed I-9", text: "Keep the I-9 for 3 years after hire OR 1 year after termination, whichever is later. Do NOT file it with USCIS — store it separately from the personnel file." },
    ],
    faqs: [
      { q: "Which I-9 edition is current?", a: "The current edition is dated 01/20/25 (expires 05/31/2027). Employers must use only the current edition." },
      { q: "Can I complete the I-9 remotely?", a: "Yes, under the DHS alternative procedure, but only if the employer is enrolled in E-Verify in good standing. Otherwise, documents must be examined in person or via an authorized representative." },
      { q: "What if a document expires after hire?", a: "Reverify work authorization in Supplement B (formerly Section 3) before the expiration date. Do not reverify List B identity documents or U.S. passports." },
      { q: "Can I ask the employee for specific documents?", a: "No. Requiring specific documents from the List of Acceptable Documents is considered document abuse and violates INA anti-discrimination provisions. The employee chooses which documents to present." },
      { q: "How long must I keep I-9 forms?", a: "3 years after the date of hire or 1 year after the date of termination, whichever is later. Store I-9s separately from personnel files to simplify audits." },
    ],
    keywords: ["i-9 form 2025", "fillable i9", "employment eligibility verification form", "i-9 online free"],
    related: ["w-4-online-free", "w-9-online-free"],
    isGovernmentForm: true,
    governmentAgency: "U.S. Citizenship and Immigration Services",
  },
  {
    slug: "nda-online-free",
    wizardSlug: "nda",
    h1: "Free NDA Template Online — Fill Out & Download a Non-Disclosure Agreement",
    metaTitle: "Free NDA Template — Fillable Non-Disclosure Agreement PDF | LegallySpoken",
    metaDescription:
      "Create a free non-disclosure agreement online in minutes. Mutual or one-way NDA, custom term length, instant PDF, e-signature ready.",
    tagline: "Simple NDA • Mutual or one-way • Free fillable PDF with e-signature",
    intro:
      "A Non-Disclosure Agreement (NDA), also called a confidentiality agreement, is a contract that prevents one or both parties from disclosing sensitive business information — client lists, trade secrets, product roadmaps, financials, source code — to third parties. Our free NDA template supports both one-way (unilateral) and mutual configurations, adjustable term length, and choice-of-law selection. The generated PDF is ready to e-sign and enforceable in every U.S. state.",
    useCases: [
      "Contractors and freelancers signing an NDA before a client engagement",
      "Founders sharing pitch decks and financials with prospective investors",
      "Employers protecting trade secrets when onboarding new employees",
      "M&A due diligence between two companies exploring a transaction",
      "Software developers reviewing another company's proprietary code",
    ],
    howToSteps: [
      { name: "Pick one-way or mutual", text: "One-way NDAs bind only the recipient (typical for employees and vendors). Mutual NDAs bind both parties (typical for partnerships and M&A talks)." },
      { name: "Enter the parties", text: "Full legal names of both the disclosing and receiving parties (individuals or entities). Include entity type (LLC, Inc., Ltd.) and state of formation." },
      { name: "Define the confidential information", text: "Describe the category of information covered (e.g. 'business plans, customer lists, technical specifications') and note standard exclusions (public information, independently developed information)." },
      { name: "Set the term", text: "Typical NDAs run 2–5 years. Trade secrets can be protected indefinitely so long as they remain secret. Pick a term that matches the sensitivity of the information." },
      { name: "Choose governing law", text: "Select the state whose law governs the agreement — usually where one of the parties is headquartered." },
      { name: "Both parties sign", text: "Draw or type signatures in the final step. Download the signed PDF and share a copy with the other party." },
    ],
    faqs: [
      { q: "Is a free online NDA legally enforceable?", a: "Yes, when properly drafted. Courts enforce NDAs that (1) identify the confidential information with reasonable specificity, (2) have a reasonable term and geographic scope, and (3) are signed by both parties. Our template meets all three criteria." },
      { q: "One-way NDA or mutual NDA?", a: "Use a one-way NDA when only one party shares confidential information (e.g. you're hiring a contractor). Use a mutual NDA when both parties will exchange sensitive information (e.g. two companies exploring a partnership)." },
      { q: "How long should an NDA last?", a: "For general business information, 2–5 years is standard. For trade secrets, an NDA can protect information indefinitely — but only while the information remains secret." },
      { q: "Does an NDA need to be notarized?", a: "No. NDAs are enforceable with signatures alone. Notarization is not required in any U.S. state." },
      { q: "Can I use an NDA with an employee?", a: "Yes, though many states now restrict NDAs covering harassment or discrimination claims. Employment NDAs typically also include invention-assignment and non-solicitation clauses — consider our full employment agreement template for that use case." },
    ],
    keywords: ["free nda template", "non disclosure agreement online", "mutual nda pdf", "confidentiality agreement free"],
    related: ["demand-letter-online-free", "promissory-note-online-free"],
  },
  {
    slug: "demand-letter-online-free",
    wizardSlug: "demand-letter",
    h1: "Free Demand Letter for Payment — Fill Out & Download Online",
    metaTitle: "Free Demand Letter Template Online — Fillable PDF | LegallySpoken",
    metaDescription:
      "Write a professional demand letter for payment online free. Interest calculation, deadline, small-claims warning included. Instant PDF.",
    tagline: "Demand letter for payment • Small-claims-ready • Free fillable PDF",
    intro:
      "A demand letter is the formal written notice you send before filing a lawsuit or a small-claims action. It states the amount owed, the reason it's owed, a firm deadline for payment, and the consequences of non-payment. A well-drafted demand letter resolves most disputes without litigation — and if it doesn't, it becomes exhibit A in your small-claims filing. Our free template produces a courtroom-ready PDF in under five minutes.",
    useCases: [
      "Freelancers and contractors chasing overdue invoices",
      "Landlords demanding unpaid rent before filing eviction",
      "Small businesses collecting on unpaid B2B invoices",
      "Individuals recovering unreturned security deposits",
      "Anyone preparing to file in small-claims court",
    ],
    howToSteps: [
      { name: "Identify sender and recipient", text: "Full legal names and addresses of both you (the creditor) and the debtor. Use the debtor's registered business address for entities." },
      { name: "State the amount owed", text: "Break it down: principal, interest, late fees, and any collection costs. Show the math." },
      { name: "Explain the debt", text: "Reference the underlying contract, invoice number, or transaction date. Attach copies of the invoice or agreement if possible." },
      { name: "Set a firm deadline", text: "Typically 10–30 days from the date of the letter. Include the exact date, not just a duration." },
      { name: "State consequences", text: "Small-claims filing, collection agency referral, and/or reporting to credit bureaus (for business debts). Keep it factual — no threats of criminal action for civil debts." },
      { name: "Send by certified mail", text: "Certified mail with return receipt creates a paper trail. Keep the return receipt — you'll need it in court." },
    ],
    faqs: [
      { q: "Do I need a lawyer to send a demand letter?", a: "No. Individuals and businesses regularly send demand letters without an attorney. A demand letter from you is legally identical to one from a lawyer — the leverage comes from the credibility of the claim." },
      { q: "How much time should I give the debtor to pay?", a: "10–30 days is standard. Any less can look unreasonable to a judge; any more delays your recovery. 14 days is a common middle ground." },
      { q: "Can I charge interest?", a: "Yes, at your state's statutory pre-judgment interest rate (typically 4–10% annually) or at any rate stipulated in the original contract." },
      { q: "What if the debtor ignores my letter?", a: "You've built your case. File in small-claims court (limits range from $2,500 in Rhode Island to $25,000 in Tennessee). The unanswered demand letter is strong evidence of the debtor's default." },
      { q: "Do I have to send a demand letter before suing?", a: "Not usually, but it's almost always in your interest. Courts view demand letters favorably, and many disputes settle at this stage without any court involvement." },
    ],
    keywords: ["demand letter for payment", "free demand letter template", "collection letter pdf", "small claims demand letter"],
    related: ["promissory-note-online-free", "nda-online-free"],
  },
  {
    slug: "promissory-note-online-free",
    wizardSlug: "promissory-note",
    h1: "Free Promissory Note Template — Fill Out a Loan Agreement Online",
    metaTitle: "Free Promissory Note Template Online — Fillable PDF | LegallySpoken",
    metaDescription:
      "Create a free promissory note online in minutes. Fixed or installment loan, interest rate, late fees, secured or unsecured. Instant PDF.",
    tagline: "Promissory note / loan agreement • Secured or unsecured • Free fillable PDF",
    intro:
      "A promissory note is a written promise from a borrower to repay a specific amount of money to a lender, with terms covering interest, payment schedule, and default remedies. Whether you're lending money to a family member, funding a small business, or documenting a private mortgage, a properly drafted promissory note protects both sides — the lender gets an enforceable IOU, and the borrower gets clear, documented terms.",
    useCases: [
      "Personal loans between family members or friends",
      "Small-business seller-financed acquisitions",
      "Real estate transactions with private financing",
      "Convertible notes for early-stage startup investments",
      "Documenting an existing informal debt in writing",
    ],
    howToSteps: [
      { name: "Enter borrower and lender information", text: "Full legal names and addresses of both parties. For business borrowers, include the entity type and state of formation." },
      { name: "State the principal amount", text: "The exact dollar amount being loaned. Write it in both numerals and words to avoid ambiguity." },
      { name: "Set the interest rate", text: "APR must comply with state usury laws (typically 6–24% depending on state and lender type). Use 0% only if you're willing to accept imputed interest for tax purposes." },
      { name: "Choose the repayment structure", text: "Lump sum on a specific date, monthly installments (amortized or interest-only), or on-demand. Installment schedules should list payment amounts and due dates." },
      { name: "Add late fees and default terms", text: "State the grace period (typically 5–15 days), late fee amount, and what constitutes default. Include acceleration language allowing the lender to demand the full balance on default." },
      { name: "Sign (notarization optional but recommended)", text: "Both parties sign and date. Notarization isn't required for enforceability but strengthens the note if it ever needs to be enforced in court." },
    ],
    faqs: [
      { q: "Is a promissory note legally binding?", a: "Yes. A promissory note is a legally enforceable contract in every U.S. state, provided it identifies the parties, the amount, the repayment terms, and is signed by the borrower." },
      { q: "What's the difference between a promissory note and a loan agreement?", a: "Promissory notes are typically shorter and unilateral (the borrower promises to pay). Loan agreements are longer, bilateral, and include representations, warranties, and covenants. For loans over $25,000 or with complex terms, a full loan agreement is often preferred." },
      { q: "Do I need to charge interest?", a: "You can lend at 0%, but the IRS may impute interest at the Applicable Federal Rate (AFR) for loans over $10,000. To avoid tax complications, charge at least the current AFR." },
      { q: "Secured vs. unsecured?", a: "Unsecured notes rely on the borrower's promise. Secured notes are backed by collateral (a car, real estate, business assets) that the lender can seize on default. Secured notes need an additional security agreement or, for real estate, a deed of trust or mortgage." },
      { q: "Should I notarize a promissory note?", a: "Not required, but strongly recommended for notes over $10,000 or between family members. Notarization creates a presumption of authenticity that makes enforcement easier." },
    ],
    keywords: ["promissory note template free", "loan agreement pdf", "iou template", "personal loan agreement free"],
    related: ["demand-letter-online-free", "nda-online-free"],
  },
];

export const getFormSeoLandingBySlug = (slug: string): FormSeoLandingDef | undefined =>
  FORM_SEO_LANDINGS.find((f) => f.slug === slug);
