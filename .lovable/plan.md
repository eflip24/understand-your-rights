

# Phase 4: Ecosystem Expansion to 50+ Tools

## Current State
- **21 tools** total: 4 contract, 4 consumer, 3 employment, 4 generators, 6 AI
- Need **~30 more tools** to reach 50+

## New Tools Plan (30 tools across 6 categories)

We'll add two new categories and expand existing ones.

### New Category: "Real Estate" (5 tools)
- **Security Deposit Calculator** — Calculate max deposit, interest owed, return deadline by state
- **Rent Increase Calculator** — Check if a rent increase is legal based on lease terms and local caps
- **Lease Term Comparison** — Compare two lease offers side by side (non-AI, structured comparison)
- **Move-Out Checklist Generator** — Generate a checklist based on lease requirements
- **Rental Agreement Generator** — Generate a basic residential lease from a form

### New Category: "Business" (6 tools)
- **Business Name Checker** — Check naming considerations (trademark basics, domain availability tips)
- **Contractor vs Employee Checker** — Questionnaire-based classification helper
- **Severance Pay Calculator** — Estimate severance based on tenure and salary
- **Overtime Calculator** — Calculate overtime pay based on hourly rate and hours worked
- **Partnership Split Calculator** — Calculate equity/profit splits for partnerships
- **Business Expense Tracker Template** — Generate a formatted expense tracking template

### Expand "Contract Tools" (+5)
- **Contract Expiration Tracker** — Enter contract dates, get alerts/timeline of expirations
- **Signature Block Generator** — Generate proper signature blocks for different entity types
- **Contract Checklist Generator** — Generate a review checklist based on contract type
- **Amendment Drafter** — Generate a basic contract amendment from form inputs
- **Contract Value Calculator** — Calculate total contract value including renewals, escalations

### Expand "Consumer Tools" (+5)
- **Warranty Expiration Calculator** — Track warranty end dates for purchases
- **Statute of Limitations Lookup** — Look up general SOL by state and claim type
- **Small Claims Court Limit Checker** — Check small claims $ limits by state
- **Consumer Rights Quiz** — Interactive quiz about consumer protection rights
- **Dispute Letter Generator** — Generate a formal dispute letter for billing/credit issues

### Expand "Employment Tools" (+5)
- **Salary to Hourly Converter** — Convert between salary and hourly rate with benefits
- **PTO Calculator** — Calculate accrued PTO based on policy and tenure
- **Wrongful Termination Checklist** — Questionnaire to assess potential wrongful termination
- **Minimum Wage Lookup** — Look up federal and state minimum wage rates
- **Employment Contract Checklist** — Generate a checklist of what to look for in an employment contract

### Expand "Document Generators" (+4)
- **Cease and Desist Letter Generator** — Generate C&D letters for common scenarios
- **Power of Attorney Generator** — Generate a basic POA document
- **Independent Contractor Agreement Generator** — Generate an IC agreement from form
- **Promissory Note Generator** — Generate a basic promissory note

## Technical Approach

All 30 tools are **client-side only** (no AI/edge functions needed). They follow the same patterns as existing tools:
- **Calculators**: Form inputs → computed results (like `LateFeeCalculator`)
- **Generators**: Form inputs → formatted text output with copy button (like `NDAGenerator`)
- **Checkers/Quizzes**: Questionnaire → conditional results (like `RefundChecker`)
- **Lookup tools**: Search/select → display data from embedded dataset (like `NonCompeteChecker`)

## Implementation Structure

1. **Add 2 new categories** to `tools.ts`: "realestate" and "business"
2. **Register all 30 tools** in `tools.ts` with slugs, descriptions, FAQs, and related tool IDs
3. **Create 30 component files** in `src/components/tools/`
4. **Register components** in `src/pages/ToolPage.tsx`
5. **Update homepage** tool count from "21" to "50+"

## Build Order (5 batches of 6)

1. **Batch 1**: All 5 new contract tools + 1 consumer tool
2. **Batch 2**: Remaining 4 consumer tools + 2 employment tools
3. **Batch 3**: Remaining 3 employment tools + 3 generators
4. **Batch 4**: Remaining 1 generator + 5 real estate tools
5. **Batch 5**: All 6 business tools + homepage/navbar updates

Each batch: add tool entries to `tools.ts`, create components, register in `ToolPage.tsx`.

## Files Modified
- `src/data/tools.ts` — Add 2 categories + 30 tool entries
- `src/pages/ToolPage.tsx` — Register 30 new components
- `src/pages/HomePage.tsx` — Update tool count
- 30 new files in `src/components/tools/`

