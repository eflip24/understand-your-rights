import { FileText, Calculator, Shield, Users, Scale, Clock, DollarSign, Search, FileCheck, Briefcase, Receipt, Ban, AlertTriangle, ScrollText, Mail, Brain, Home, GitCompare, MessageSquare } from "lucide-react";

export type ToolCategory = "contract" | "consumer" | "employment" | "generators" | "ai";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: ToolCategory;
  categoryLabel: string;
  description: string;
  shortDescription: string;
  icon: typeof FileText;
  popular?: boolean;
  faqs: { question: string; answer: string }[];
  relatedToolIds: string[];
}

export interface CategoryInfo {
  id: ToolCategory;
  label: string;
  description: string;
  icon: typeof FileText;
  color: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "contract",
    label: "Contract Tools",
    description: "Analyze, understand, and work with contracts and agreements.",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: "consumer",
    label: "Consumer Tools",
    description: "Calculate deadlines, fees, and check your consumer rights.",
    icon: Shield,
    color: "text-green-500",
  },
  {
    id: "employment",
    label: "Employment Tools",
    description: "Navigate employment contracts, rates, and obligations.",
    icon: Briefcase,
    color: "text-purple-500",
  },
  {
    id: "generators",
    label: "Document Generators",
    description: "Generate legal documents from simple forms.",
    icon: ScrollText,
    color: "text-amber-500",
  },
  {
    id: "ai",
    label: "AI Analysis Tools",
    description: "AI-powered contract analysis, scoring, and comparison.",
    icon: Brain,
    color: "text-rose-500",
  },
];

export const tools: Tool[] = [
  // Contract Tools
  {
    id: "reading-time",
    name: "Contract Reading Time Calculator",
    slug: "reading-time-calculator",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Paste your contract text and get an estimated reading time based on word count and legal complexity. Helps you plan how long it will take to review a document.",
    shortDescription: "Estimate how long it takes to read a contract.",
    icon: Clock,
    popular: true,
    faqs: [
      { question: "How is reading time calculated?", answer: "We use an average reading speed of 200 words per minute for legal text, which is slower than regular text due to complexity." },
      { question: "Does complexity affect the estimate?", answer: "Yes, legal jargon density adds extra time to account for re-reading and comprehension." },
      { question: "Is this accurate for all contracts?", answer: "It's an estimate. Complex financial or technical contracts may take longer." },
    ],
    relatedToolIds: ["word-counter", "clause-finder", "jargon-translator"],
  },
  {
    id: "word-counter",
    name: "Contract Word Counter",
    slug: "word-counter",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Get detailed statistics about your contract including word count, character count, sentence count, paragraph count, and estimated pages.",
    shortDescription: "Get detailed word and character statistics.",
    icon: Calculator,
    popular: true,
    faqs: [
      { question: "How are pages estimated?", answer: "We estimate 250 words per page for standard legal documents." },
      { question: "Does it count headers and footers?", answer: "It counts all text you paste into the tool." },
      { question: "Can I use this for non-legal documents?", answer: "Absolutely! The word counter works for any text." },
    ],
    relatedToolIds: ["reading-time", "clause-finder", "jargon-translator"],
  },
  {
    id: "jargon-translator",
    name: "Legal Jargon Translator",
    slug: "jargon-translator",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Look up common legal terms and get plain-English explanations. Search our dictionary of 100+ legal terms to understand what your contract actually says.",
    shortDescription: "Translate legal terms to plain English.",
    icon: Search,
    popular: true,
    faqs: [
      { question: "How many terms are in the dictionary?", answer: "We currently have 100+ common legal terms with plain-English definitions." },
      { question: "Is this legal advice?", answer: "No. This tool provides general explanations. Always consult a lawyer for specific legal questions." },
      { question: "Can I suggest new terms?", answer: "We're always expanding our dictionary. Contact us with suggestions." },
    ],
    relatedToolIds: ["clause-finder", "reading-time", "word-counter"],
  },
  {
    id: "clause-finder",
    name: "Contract Clause Finder",
    slug: "clause-finder",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Paste your contract and search for common clause types like indemnification, termination, non-compete, confidentiality, and more. Quickly find the sections that matter most.",
    shortDescription: "Find specific clauses in your contracts.",
    icon: FileCheck,
    faqs: [
      { question: "What clause types can it find?", answer: "It searches for 15+ common clause types including indemnification, termination, non-compete, confidentiality, liability, and more." },
      { question: "How accurate is the finder?", answer: "It uses keyword matching to identify likely clause locations. Review the context to confirm." },
      { question: "Does it work with any contract format?", answer: "Yes, as long as you paste the text content of your contract." },
    ],
    relatedToolIds: ["reading-time", "word-counter", "jargon-translator"],
  },
  // Consumer Tools
  {
    id: "cancellation-deadline",
    name: "Cancellation Deadline Calculator",
    slug: "cancellation-deadline-calculator",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Calculate your cancellation deadline based on your signup date and cooling-off period. Know exactly when your right to cancel expires.",
    shortDescription: "Calculate when your cancellation window closes.",
    icon: Ban,
    popular: true,
    faqs: [
      { question: "What is a cooling-off period?", answer: "A cooling-off period is a time window after signing a contract during which you can cancel without penalty." },
      { question: "Are cooling-off periods the same everywhere?", answer: "No, they vary by jurisdiction and contract type. Common periods are 3, 7, 14, and 30 days." },
      { question: "Does this include weekends?", answer: "You can choose whether to count business days only or calendar days." },
    ],
    relatedToolIds: ["notice-period", "late-fee", "refund-checker"],
  },
  {
    id: "notice-period",
    name: "Notice Period Calculator",
    slug: "notice-period-calculator",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Calculate your notice period end date based on your start date and notice terms. Works for employment, rental, and service agreements.",
    shortDescription: "Calculate when your notice period ends.",
    icon: Clock,
    faqs: [
      { question: "What notice periods are common?", answer: "Common periods include 2 weeks, 30 days, 60 days, and 90 days depending on the agreement type." },
      { question: "Does it account for weekends?", answer: "You can toggle between calendar days and business days." },
      { question: "Can I use this for rental agreements?", answer: "Yes! It works for any agreement with a notice period." },
    ],
    relatedToolIds: ["cancellation-deadline", "late-fee", "refund-checker"],
  },
  {
    id: "late-fee",
    name: "Late Fee Calculator",
    slug: "late-fee-calculator",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Calculate the total late fee on an overdue payment. Enter the principal amount, fee rate, and number of days late to see what you owe or are owed.",
    shortDescription: "Calculate late fees on overdue payments.",
    icon: DollarSign,
    popular: true,
    faqs: [
      { question: "How are late fees typically calculated?", answer: "Most late fees are either a flat amount or a percentage of the outstanding balance, charged daily or monthly." },
      { question: "Are there legal limits on late fees?", answer: "Yes, many jurisdictions cap late fees. Check your local laws." },
      { question: "Can I use this for invoices?", answer: "Yes, it works for any type of overdue payment." },
    ],
    relatedToolIds: ["invoice-interest", "cancellation-deadline", "notice-period"],
  },
  {
    id: "refund-checker",
    name: "Refund Eligibility Checker",
    slug: "refund-eligibility-checker",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Answer a few simple questions about your purchase and situation to check if you might be eligible for a refund. Covers common consumer scenarios.",
    shortDescription: "Check if you qualify for a refund.",
    icon: AlertTriangle,
    faqs: [
      { question: "Is the result legally binding?", answer: "No. This provides general guidance based on common consumer protection rules. Always check your specific contract and local laws." },
      { question: "What scenarios does it cover?", answer: "It covers online purchases, in-store purchases, services, subscriptions, and defective products." },
      { question: "Does it vary by country?", answer: "The checker provides general guidance. Specific rights vary by jurisdiction." },
    ],
    relatedToolIds: ["cancellation-deadline", "late-fee", "notice-period"],
  },
  // Employment Tools
  {
    id: "non-compete",
    name: "Non-Compete Duration Checker",
    slug: "non-compete-checker",
    category: "employment",
    categoryLabel: "Employment Tools",
    description: "Enter your non-compete clause duration and state to see general enforceability information. Some states restrict or ban non-competes entirely.",
    shortDescription: "Check non-compete enforceability by state.",
    icon: Scale,
    popular: true,
    faqs: [
      { question: "Are non-competes enforceable?", answer: "It varies widely by state. Some states like California generally don't enforce them." },
      { question: "What's a typical non-compete duration?", answer: "Most courts consider 1-2 years reasonable. Longer periods are harder to enforce." },
      { question: "Should I sign a non-compete?", answer: "Consult an employment lawyer before signing. This tool provides general info only." },
    ],
    relatedToolIds: ["freelance-rate", "invoice-interest"],
  },
  {
    id: "freelance-rate",
    name: "Freelance Rate Calculator",
    slug: "freelance-rate-calculator",
    category: "employment",
    categoryLabel: "Employment Tools",
    description: "Convert between hourly rates, project fees, and annual income. Factor in taxes, expenses, and billable hours to find your true freelance rate.",
    shortDescription: "Convert between hourly, project, and annual rates.",
    icon: DollarSign,
    faqs: [
      { question: "How do I calculate my hourly rate?", answer: "Start with your desired annual income, add taxes and expenses, then divide by your estimated billable hours." },
      { question: "What are typical billable hours?", answer: "Most freelancers bill 1,000-1,500 hours per year out of 2,080 total working hours." },
      { question: "Should I include benefits costs?", answer: "Yes! Factor in health insurance, retirement, and other benefits you'd get as an employee." },
    ],
    relatedToolIds: ["invoice-interest", "non-compete"],
  },
  {
    id: "invoice-interest",
    name: "Invoice Late Interest Calculator",
    slug: "invoice-interest-calculator",
    category: "employment",
    categoryLabel: "Employment Tools",
    description: "Calculate the interest owed on late invoice payments. Enter the invoice amount, interest rate, and days overdue to determine the total amount due.",
    shortDescription: "Calculate interest on unpaid invoices.",
    icon: Receipt,
    faqs: [
      { question: "What interest rate should I charge?", answer: "Common rates are 1-1.5% per month. Check your contract terms and local regulations." },
      { question: "Can I legally charge interest on late payments?", answer: "In most cases, yes, if it's specified in your contract or invoice terms." },
      { question: "How is daily interest calculated?", answer: "Annual rate divided by 365, multiplied by the number of days overdue and the principal amount." },
    ],
    relatedToolIds: ["late-fee", "freelance-rate", "non-compete"],
  },
  // Document Generators
  {
    id: "nda-generator",
    name: "NDA Template Generator",
    slug: "nda-generator",
    category: "generators",
    categoryLabel: "Document Generators",
    description: "Generate a basic Non-Disclosure Agreement by filling out a simple form. Customize parties, duration, scope, and jurisdiction.",
    shortDescription: "Generate a basic NDA from a form.",
    icon: FileText,
    popular: true,
    faqs: [
      { question: "Is this NDA legally binding?", answer: "This generates a template. Have it reviewed by a lawyer before using it for important agreements." },
      { question: "What type of NDA is generated?", answer: "A mutual or one-way NDA depending on your selection, covering standard confidentiality terms." },
      { question: "Can I customize the template?", answer: "Yes, the generated text can be copied and edited as needed." },
    ],
    relatedToolIds: ["privacy-generator", "tos-generator", "complaint-generator"],
  },
  {
    id: "privacy-generator",
    name: "Privacy Policy Generator",
    slug: "privacy-policy-generator",
    category: "generators",
    categoryLabel: "Document Generators",
    description: "Generate a privacy policy for your website or app. Answer questions about your data practices and get a formatted policy document.",
    shortDescription: "Create a privacy policy for your website.",
    icon: Shield,
    faqs: [
      { question: "Does this comply with GDPR?", answer: "It includes common GDPR provisions but should be reviewed by a legal professional for full compliance." },
      { question: "Can I use this for my app?", answer: "Yes, the generator covers both websites and mobile applications." },
      { question: "How often should I update my privacy policy?", answer: "Update whenever your data practices change, or at least annually." },
    ],
    relatedToolIds: ["tos-generator", "nda-generator", "complaint-generator"],
  },
  {
    id: "complaint-generator",
    name: "Complaint Letter Generator",
    slug: "complaint-letter-generator",
    category: "generators",
    categoryLabel: "Document Generators",
    description: "Generate a formal complaint letter. Fill in the details about your issue and get a professionally formatted letter ready to send.",
    shortDescription: "Create a formal complaint letter.",
    icon: Mail,
    faqs: [
      { question: "What types of complaints does this cover?", answer: "Product issues, service complaints, billing disputes, and general consumer complaints." },
      { question: "Should I send the letter by mail or email?", answer: "For formal complaints, certified mail provides proof of delivery. Email is faster for initial contact." },
      { question: "What should I include with my letter?", answer: "Include copies of receipts, contracts, photos, or any evidence supporting your complaint." },
    ],
    relatedToolIds: ["refund-checker", "nda-generator", "privacy-generator"],
  },
  {
    id: "tos-generator",
    name: "Terms of Service Generator",
    slug: "terms-of-service-generator",
    category: "generators",
    categoryLabel: "Document Generators",
    description: "Generate terms of service for your website or application. Covers user agreements, liability limitations, and standard legal provisions.",
    shortDescription: "Create terms of service for your site.",
    icon: ScrollText,
    faqs: [
      { question: "Do I legally need terms of service?", answer: "While not always legally required, they protect your business and set user expectations." },
      { question: "What's the difference between ToS and a privacy policy?", answer: "ToS governs user behavior and your liability. Privacy policy covers data collection and use." },
      { question: "Can users agree by using my site?", answer: "Browsewrap agreements are weaker than clickwrap. Consider requiring explicit agreement." },
    ],
    relatedToolIds: ["privacy-generator", "nda-generator", "complaint-generator"],
  },
  // AI Analysis Tools
  {
    id: "red-flag-scanner",
    name: "Contract Red Flag Scanner",
    slug: "red-flag-scanner",
    category: "ai",
    categoryLabel: "AI Analysis",
    description: "Paste your contract and let AI identify risky clauses, unfair terms, and potential legal issues with severity ratings and recommendations.",
    shortDescription: "AI scans contracts for risky clauses.",
    icon: AlertTriangle,
    popular: true,
    faqs: [
      { question: "How does the scanner work?", answer: "It uses AI to analyze your contract text and identify clauses that could be problematic, one-sided, or contain hidden risks." },
      { question: "Is this legal advice?", answer: "No. This is an AI-powered analysis tool for educational purposes. Always consult a lawyer for legal decisions." },
      { question: "How long does analysis take?", answer: "Typically 5-15 seconds depending on the length of the contract." },
    ],
    relatedToolIds: ["clause-finder", "clause-explainer", "nda-fairness"],
  },
  {
    id: "nda-fairness",
    name: "NDA Fairness Score",
    slug: "nda-fairness-score",
    category: "ai",
    categoryLabel: "AI Analysis",
    description: "Paste an NDA and get a fairness score from 0-100, with a breakdown of strengths, concerns, and recommendations for negotiation.",
    shortDescription: "Score your NDA's fairness 0-100.",
    icon: Scale,
    faqs: [
      { question: "What does the score mean?", answer: "A score of 70+ indicates a generally fair NDA. Below 40 suggests significant one-sided terms that should be negotiated." },
      { question: "Does it work for mutual NDAs?", answer: "Yes, it analyzes both mutual and one-way NDAs and considers whether the obligations are balanced." },
      { question: "Can I use this before signing?", answer: "Absolutely — that's the ideal use case. Review the score and concerns before signing any NDA." },
    ],
    relatedToolIds: ["nda-generator", "red-flag-scanner", "clause-explainer"],
  },
  {
    id: "lease-analyzer",
    name: "Lease Agreement Analyzer",
    slug: "lease-analyzer",
    category: "ai",
    categoryLabel: "AI Analysis",
    description: "Paste your lease agreement and get a summary of key terms, hidden risks, and recommendations. Perfect for renters reviewing a new lease.",
    shortDescription: "Analyze lease agreements for risks.",
    icon: Home,
    faqs: [
      { question: "What types of leases does it analyze?", answer: "Residential and commercial leases. It identifies key terms like rent, deposit, duration, and maintenance obligations." },
      { question: "Will it catch hidden fees?", answer: "The AI looks for unusual charges, escalation clauses, and fees that may not be obvious at first reading." },
      { question: "Should I trust the analysis completely?", answer: "Use it as a starting point. For significant lease commitments, always have a lawyer review the full document." },
    ],
    relatedToolIds: ["red-flag-scanner", "clause-explainer", "terms-summarizer"],
  },
  {
    id: "terms-summarizer",
    name: "Terms & Conditions Summarizer",
    slug: "terms-summarizer",
    category: "ai",
    categoryLabel: "AI Analysis",
    description: "Paste any Terms & Conditions or legal document and get a plain-English summary organized by topic, with concerning sections highlighted.",
    shortDescription: "Summarize T&C in plain English.",
    icon: FileText,
    popular: true,
    faqs: [
      { question: "How long can the document be?", answer: "It works best with documents under 10,000 words. For longer documents, paste the most relevant sections." },
      { question: "What does 'Concern' mean?", answer: "Sections flagged as concerns contain terms that are unusual, potentially unfavorable, or worth paying extra attention to." },
      { question: "Can I use this for privacy policies?", answer: "Yes! It works for any legal document — T&C, privacy policies, EULAs, and more." },
    ],
    relatedToolIds: ["jargon-translator", "clause-explainer", "red-flag-scanner"],
  },
  {
    id: "contract-comparison",
    name: "Contract Comparison Tool",
    slug: "contract-comparison",
    category: "ai",
    categoryLabel: "AI Analysis",
    description: "Paste two contracts side by side and get an AI-powered comparison highlighting key differences, changed terms, and which version favors which party.",
    shortDescription: "Compare two contracts side-by-side.",
    icon: GitCompare,
    faqs: [
      { question: "What should I compare?", answer: "Compare different versions of the same contract, competing offers, or a proposed contract against a standard template." },
      { question: "Does it show exact text differences?", answer: "It highlights semantic differences — changes in meaning, scope, and obligations — rather than word-by-word diffs." },
      { question: "Can I compare different types of contracts?", answer: "You can, but the most useful comparisons are between similar contract types (e.g., two employment contracts)." },
    ],
    relatedToolIds: ["red-flag-scanner", "clause-finder", "clause-explainer"],
  },
  {
    id: "clause-explainer",
    name: "Clause Explainer",
    slug: "clause-explainer",
    category: "ai",
    categoryLabel: "AI Analysis",
    description: "Paste any legal clause and get a plain-English explanation, risk assessment, practical implications, and negotiation tips.",
    shortDescription: "Get plain-English clause explanations.",
    icon: MessageSquare,
    faqs: [
      { question: "What kind of clauses can I explain?", answer: "Any legal clause from any type of contract — employment, lease, NDA, terms of service, or any other agreement." },
      { question: "Is the explanation legally accurate?", answer: "The AI provides general interpretations. For clauses with significant financial or legal implications, consult a lawyer." },
      { question: "Can I paste multiple clauses?", answer: "For best results, paste one clause at a time. This ensures focused, detailed explanations." },
    ],
    relatedToolIds: ["jargon-translator", "red-flag-scanner", "clause-finder"],
  },
  // Contract Tools (Batch 1)
  {
    id: "contract-expiration",
    name: "Contract Expiration Tracker",
    slug: "contract-expiration-tracker",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Enter your contract dates and track expirations in one place. See which contracts are expiring soon, active, or already expired.",
    shortDescription: "Track contract expiration dates.",
    icon: Clock,
    faqs: [
      { question: "Can I track multiple contracts?", answer: "Yes, add as many contracts as you need and see them sorted by expiration date." },
      { question: "Does it send notifications?", answer: "This is a manual tracker. Check back periodically to review your upcoming expirations." },
      { question: "What counts as 'expiring soon'?", answer: "Contracts expiring within 30 days are flagged as expiring soon." },
    ],
    relatedToolIds: ["contract-value", "reading-time", "clause-finder"],
  },
  {
    id: "signature-block",
    name: "Signature Block Generator",
    slug: "signature-block-generator",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Generate properly formatted signature blocks for individuals, corporations, LLCs, and partnerships. Copy and paste into your contracts.",
    shortDescription: "Generate proper signature blocks.",
    icon: FileCheck,
    faqs: [
      { question: "What entity types are supported?", answer: "Individual, corporation, LLC, and partnership signature blocks." },
      { question: "Is the format legally standard?", answer: "Yes, the generated blocks follow common legal formatting conventions." },
      { question: "Can I use this for any contract?", answer: "Yes, signature blocks are standard across all contract types." },
    ],
    relatedToolIds: ["nda-generator", "amendment-drafter", "contract-checklist"],
  },
  {
    id: "contract-checklist",
    name: "Contract Checklist Generator",
    slug: "contract-checklist-generator",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Select your contract type and get a comprehensive review checklist. Track which items you've reviewed with an interactive progress bar.",
    shortDescription: "Generate a contract review checklist.",
    icon: FileCheck,
    popular: true,
    faqs: [
      { question: "What contract types are covered?", answer: "Employment contracts, NDAs, lease agreements, and service agreements." },
      { question: "Can I save my progress?", answer: "Currently the checklist resets when you leave the page. Copy the items for your records." },
      { question: "Is this a substitute for legal review?", answer: "No, use it as a starting point to identify key items before consulting a lawyer." },
    ],
    relatedToolIds: ["clause-finder", "reading-time", "signature-block"],
  },
  {
    id: "amendment-drafter",
    name: "Contract Amendment Drafter",
    slug: "amendment-drafter",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Generate a basic contract amendment by filling in the original contract details and describing the changes. Creates a formatted amendment document.",
    shortDescription: "Draft a contract amendment from a form.",
    icon: FileText,
    faqs: [
      { question: "Is this amendment legally binding?", answer: "This generates a template. Have it reviewed by a lawyer before using it." },
      { question: "Can I amend any type of contract?", answer: "Yes, the amendment format is standard and works for most contract types." },
      { question: "What if I need multiple amendments?", answer: "Generate a new amendment for each set of changes, incrementing the amendment number." },
    ],
    relatedToolIds: ["signature-block", "nda-generator", "contract-checklist"],
  },
  {
    id: "contract-value",
    name: "Contract Value Calculator",
    slug: "contract-value-calculator",
    category: "contract",
    categoryLabel: "Contract Tools",
    description: "Calculate the total value of a contract including renewals and annual escalation rates. See initial term value, renewal value, and monthly averages.",
    shortDescription: "Calculate total contract value with renewals.",
    icon: Calculator,
    faqs: [
      { question: "What is an escalation rate?", answer: "An annual percentage increase applied to payments, commonly 2-5% per year." },
      { question: "Does it handle different payment frequencies?", answer: "Yes — weekly, monthly, quarterly, and annual payment schedules." },
      { question: "How are renewals calculated?", answer: "Each renewal period uses the same duration as the initial term, with escalation continuing." },
    ],
    relatedToolIds: ["contract-expiration", "late-fee", "invoice-interest"],
  },
  // Consumer Tools (Batch 1)
  {
    id: "warranty-tracker",
    name: "Warranty Expiration Calculator",
    slug: "warranty-expiration-calculator",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Track warranty expiration dates for your purchases. Enter product details and warranty length to see which warranties are still active.",
    shortDescription: "Track warranty end dates for purchases.",
    icon: Shield,
    faqs: [
      { question: "Can I track multiple products?", answer: "Yes, add as many products as you need." },
      { question: "What warranty units are supported?", answer: "Days, months, and years." },
      { question: "Does it work for extended warranties?", answer: "Yes, just enter the total warranty period including any extensions." },
    ],
    relatedToolIds: ["refund-checker", "cancellation-deadline", "late-fee"],
  },
  // Consumer Tools (Batch 2)
  {
    id: "statute-of-limitations",
    name: "Statute of Limitations Lookup",
    slug: "statute-of-limitations-lookup",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Look up the statute of limitations for common legal claims by state. Find out how long you have to file for contract disputes, personal injury, fraud, and more.",
    shortDescription: "Look up filing deadlines by state.",
    icon: Clock,
    faqs: [
      { question: "What claim types are covered?", answer: "Written contracts, oral contracts, personal injury, property damage, and fraud." },
      { question: "Are these exact deadlines?", answer: "These are general guidelines. Discovery rules and tolling can extend deadlines. Consult a lawyer." },
      { question: "Do all states have the same limits?", answer: "No, statute of limitations varies significantly by state and claim type." },
    ],
    relatedToolIds: ["small-claims-limit", "refund-checker", "cancellation-deadline"],
  },
  {
    id: "small-claims-limit",
    name: "Small Claims Court Limit Checker",
    slug: "small-claims-limit-checker",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Check the maximum dollar amount you can sue for in small claims court in your state. Enter your claim amount to see if it qualifies.",
    shortDescription: "Check small claims $ limits by state.",
    icon: Scale,
    popular: true,
    faqs: [
      { question: "What is small claims court?", answer: "A simplified court for resolving disputes involving smaller amounts of money, without needing a lawyer." },
      { question: "Can I file above the limit?", answer: "You can reduce your claim to fit the limit (waiving the excess) or file in a higher court." },
      { question: "Are these limits current?", answer: "We update limits regularly, but verify with your local court as limits change." },
    ],
    relatedToolIds: ["statute-of-limitations", "late-fee", "refund-checker"],
  },
  {
    id: "consumer-rights-quiz",
    name: "Consumer Rights Quiz",
    slug: "consumer-rights-quiz",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Test your knowledge of consumer protection rights with our interactive quiz. Learn about return policies, warranties, billing disputes, and more.",
    shortDescription: "Test your consumer rights knowledge.",
    icon: Shield,
    faqs: [
      { question: "How many questions are there?", answer: "The quiz has 8 questions covering various consumer rights topics." },
      { question: "Is this based on US law?", answer: "Yes, the questions are primarily based on US federal and state consumer protection laws." },
      { question: "Can I retake the quiz?", answer: "Yes, you can restart the quiz as many times as you like." },
    ],
    relatedToolIds: ["refund-checker", "small-claims-limit", "statute-of-limitations"],
  },
  {
    id: "dispute-letter",
    name: "Dispute Letter Generator",
    slug: "dispute-letter-generator",
    category: "consumer",
    categoryLabel: "Consumer Tools",
    description: "Generate a formal dispute letter for billing errors, credit report inaccuracies, service complaints, or product issues. Includes relevant legal references.",
    shortDescription: "Generate formal dispute letters.",
    icon: Mail,
    faqs: [
      { question: "What types of disputes are supported?", answer: "Billing disputes, credit report disputes, service disputes, and product disputes." },
      { question: "Should I send this by mail or email?", answer: "For billing and credit disputes, certified mail provides proof of delivery and triggers legal protections." },
      { question: "Is this letter legally sufficient?", answer: "It follows standard dispute letter formats. Customize it to your situation for best results." },
    ],
    relatedToolIds: ["complaint-generator", "refund-checker", "small-claims-limit"],
  },
  // Employment Tools (Batch 2)
  {
    id: "salary-converter",
    name: "Salary to Hourly Converter",
    slug: "salary-to-hourly-converter",
    category: "employment",
    categoryLabel: "Employment Tools",
    description: "Convert between annual salary and hourly rate. Factor in benefits overhead, hours per week, and weeks per year to see the true cost of employment.",
    shortDescription: "Convert salary to hourly rate and back.",
    icon: Calculator,
    popular: true,
    faqs: [
      { question: "What is benefits overhead?", answer: "The additional cost of employing someone beyond salary — typically 25-40% for health insurance, retirement, taxes, etc." },
      { question: "Why use 52 weeks?", answer: "52 weeks is standard for a full year. Reduce for unpaid time off." },
      { question: "Does this include taxes?", answer: "The benefits overhead percentage can include employer-paid taxes like FICA." },
    ],
    relatedToolIds: ["freelance-rate", "pto-calculator", "invoice-interest"],
  },
  {
    id: "pto-calculator",
    name: "PTO Calculator",
    slug: "pto-calculator",
    category: "employment",
    categoryLabel: "Employment Tools",
    description: "Calculate your accrued paid time off based on your accrual rate, employment tenure, and days already used. See remaining PTO in days and hours.",
    shortDescription: "Calculate accrued PTO balance.",
    icon: Clock,
    faqs: [
      { question: "What's a typical accrual rate?", answer: "Common rates are 1-2 days per month, or 4-6 hours per pay period." },
      { question: "What is a PTO cap?", answer: "Many companies cap the total PTO you can accumulate. Once you hit the cap, you stop accruing until you use some." },
      { question: "Are sick days included?", answer: "It depends on your company. Some have separate sick leave; others combine all time off into PTO." },
    ],
    relatedToolIds: ["salary-converter", "freelance-rate", "non-compete"],
  },
  // Employment Tools (Batch 3)
  {
    id: "wrongful-termination",
    name: "Wrongful Termination Checklist",
    slug: "wrongful-termination-checklist",
    category: "employment",
    categoryLabel: "Employment Tools",
    description: "Answer questions about your termination and get an assessment of potential wrongful termination indicators, including discrimination and retaliation flags.",
    shortDescription: "Assess potential wrongful termination.",
    icon: AlertTriangle,
    faqs: [
      { question: "Is this legal advice?", answer: "No. This provides general information to help you decide if consulting an employment lawyer is warranted." },
      { question: "What counts as wrongful termination?", answer: "Termination based on discrimination, retaliation, breach of contract, or violation of public policy." },
      { question: "Should I consult a lawyer?", answer: "If you see multiple red flags, consulting an employment lawyer is strongly recommended." },
    ],
    relatedToolIds: ["non-compete", "salary-converter", "pto-calculator"],
  },
  {
    id: "minimum-wage",
    name: "Minimum Wage Lookup",
    slug: "minimum-wage-lookup",
    category: "employment",
    categoryLabel: "Employment Tools",
    description: "Look up current federal and state minimum wage rates, including tipped minimum wage. Compare your state's rate to the federal minimum.",
    shortDescription: "Look up minimum wage by state.",
    icon: DollarSign,
    faqs: [
      { question: "Which rate applies — federal or state?", answer: "Employers must pay the higher of the two. If your state rate is higher, that applies." },
      { question: "What about tipped employees?", answer: "Some states allow a lower minimum for tipped workers. Tips plus wages must equal at least the standard minimum." },
      { question: "Are these rates current?", answer: "We update regularly, but rates change. Verify with your state labor department." },
    ],
    relatedToolIds: ["salary-converter", "freelance-rate", "pto-calculator"],
  },
  {
    id: "employment-checklist",
    name: "Employment Contract Checklist",
    slug: "employment-contract-checklist",
    category: "employment",
    categoryLabel: "Employment Tools",
    description: "A comprehensive interactive checklist of everything to look for in an employment contract — compensation, benefits, restrictive covenants, termination terms, and more.",
    shortDescription: "Review checklist for employment contracts.",
    icon: FileCheck,
    faqs: [
      { question: "How many items are on the checklist?", answer: "Over 30 items across 6 categories covering all major aspects of employment contracts." },
      { question: "Can I save my progress?", answer: "Progress resets when you leave. Use it alongside your contract review." },
      { question: "Is this for employees or employers?", answer: "Primarily designed for employees reviewing a contract before signing." },
    ],
    relatedToolIds: ["contract-checklist", "non-compete", "salary-converter"],
  },
  // Document Generators (Batch 3)
  {
    id: "cease-desist",
    name: "Cease and Desist Letter Generator",
    slug: "cease-and-desist-generator",
    category: "generators",
    categoryLabel: "Document Generators",
    description: "Generate a formal cease and desist letter for harassment, defamation, IP infringement, contract breach, or debt collection issues.",
    shortDescription: "Generate C&D letters for common scenarios.",
    icon: Mail,
    popular: true,
    faqs: [
      { question: "Is a C&D letter legally binding?", answer: "A C&D letter itself is not a court order, but it creates a record and puts the recipient on formal notice." },
      { question: "Should I send it by mail or email?", answer: "Certified mail with return receipt provides proof of delivery, which is important for legal proceedings." },
      { question: "What if they ignore it?", answer: "If ignored, you may need to escalate to filing a lawsuit or seeking a court order." },
    ],
    relatedToolIds: ["complaint-generator", "dispute-letter", "nda-generator"],
  },
  {
    id: "poa-generator",
    name: "Power of Attorney Generator",
    slug: "power-of-attorney-generator",
    category: "generators",
    categoryLabel: "Document Generators",
    description: "Generate a basic Power of Attorney document. Choose between general, limited, durable, or financial POA with customizable terms and notarization block.",
    shortDescription: "Generate a basic POA document.",
    icon: FileText,
    faqs: [
      { question: "What's the difference between POA types?", answer: "General covers everything, Limited is for specific tasks, Durable survives incapacity, Financial covers money matters." },
      { question: "Does it need to be notarized?", answer: "Most states require notarization. The template includes a notarization block." },
      { question: "Can I revoke a POA?", answer: "Yes, you can revoke a POA at any time by providing written notice to the agent and any third parties." },
    ],
    relatedToolIds: ["nda-generator", "tos-generator", "privacy-generator"],
  },
  {
    id: "ic-agreement",
    name: "Independent Contractor Agreement Generator",
    slug: "independent-contractor-agreement-generator",
    category: "generators",
    categoryLabel: "Document Generators",
    description: "Generate a comprehensive independent contractor agreement covering scope of work, compensation, IP rights, confidentiality, and termination terms.",
    shortDescription: "Generate an IC agreement from a form.",
    icon: Briefcase,
    faqs: [
      { question: "Why is this important?", answer: "A proper IC agreement helps establish the contractor relationship and avoid misclassification issues." },
      { question: "What's included?", answer: "Services scope, compensation, IP assignment, confidentiality, non-solicitation, indemnification, and termination." },
      { question: "Is this for 1099 contractors?", answer: "Yes, this is designed for independent contractor (1099) relationships, not employees (W-2)." },
    ],
    relatedToolIds: ["nda-generator", "freelance-rate", "invoice-interest"],
  },
];

export function getToolBySlug(category: string, slug: string): Tool | undefined {
  return tools.find((t) => t.category === category && t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter((t) => t.popular);
}

export function getRelatedTools(toolId: string): Tool[] {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return [];
  return tools.filter((t) => tool.relatedToolIds.includes(t.id));
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.categoryLabel.toLowerCase().includes(q)
  );
}
