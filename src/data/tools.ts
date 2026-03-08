import { FileText, Calculator, Shield, Users, Scale, Clock, DollarSign, Search, FileCheck, Briefcase, Receipt, Ban, AlertTriangle, ScrollText, Mail } from "lucide-react";

export type ToolCategory = "contract" | "consumer" | "employment" | "generators";

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
