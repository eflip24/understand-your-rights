

# Phase 4 — Batch 4 & Batch 5: 12 New Tools

## Batch 4: Promissory Note Generator + 5 Real Estate Tools

### New Category: "realestate"
Add to `ToolCategory` type and `categories` array with `Home` icon and teal color.

### Tools
1. **PromissoryNoteGenerator** — Form: lender, borrower, amount, interest rate, term, state → generates formatted promissory note text with copy button (follows `NDAGenerator` pattern)
2. **SecurityDepositCalculator** — Select state → shows max deposit (months of rent), interest requirements, return deadline. Embedded dataset of ~20 states.
3. **RentIncreaseCalculator** — Input current rent, proposed rent, lease type, state → calculates % increase, checks against common rent control caps
4. **LeaseTermComparison** — Two-column form: rent, deposit, term, utilities, pet policy for Lease A vs B → side-by-side comparison table with highlights
5. **MoveOutChecklistGenerator** — Select property type + lease features (pets, parking, furnished) → generates customized move-out checklist
6. **RentalAgreementGenerator** — Form: landlord, tenant, property address, rent, deposit, term, state → generates basic residential lease text

## Batch 5: 6 Business Tools

### New Category: "business"
Add to `ToolCategory` type and `categories` array with `Users` icon and indigo color.

### Tools
1. **BusinessNameChecker** — Input business name → checks length, special chars, suggests entity suffixes, trademark search tips
2. **ContractorVsEmployeeChecker** — 10-question quiz (behavioral control, financial control, relationship type) → classification result with IRS factor analysis
3. **SeverancePayCalculator** — Input salary, years of service, state → calculates typical severance range (1-2 weeks per year)
4. **OvertimeCalculator** — Input hourly rate, regular hours, overtime hours, OT multiplier → calculates gross pay breakdown
5. **PartnershipSplitCalculator** — Input partners (name, capital contribution, time commitment) → calculates suggested equity/profit splits
6. **BusinessExpenseTracker** — Form: business type, expense categories → generates formatted expense tracking template with copy button

## Files to Create (12)
- `src/components/tools/PromissoryNoteGenerator.tsx`
- `src/components/tools/SecurityDepositCalculator.tsx`
- `src/components/tools/RentIncreaseCalculator.tsx`
- `src/components/tools/LeaseTermComparison.tsx`
- `src/components/tools/MoveOutChecklistGenerator.tsx`
- `src/components/tools/RentalAgreementGenerator.tsx`
- `src/components/tools/BusinessNameChecker.tsx`
- `src/components/tools/ContractorVsEmployeeChecker.tsx`
- `src/components/tools/SeverancePayCalculator.tsx`
- `src/components/tools/OvertimeCalculator.tsx`
- `src/components/tools/PartnershipSplitCalculator.tsx`
- `src/components/tools/BusinessExpenseTracker.tsx`

## Files to Edit
- `src/data/tools.ts` — Add "realestate" and "business" to `ToolCategory`, add 2 category entries, add 12 tool entries with FAQs
- `src/pages/ToolPage.tsx` — Import and register 12 new components
- `src/pages/HomePage.tsx` — Update tool count to "50+"
- `src/components/layout/Navbar.tsx` — No change needed (Tools page already shows all categories)

