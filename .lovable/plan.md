

# Add 5 High-Value Calculators Before Launch

## Rationale
Your site already has 70+ tools including a Loan Payment Calculator that covers mortgage/loan/payment calculations. BMI, grade, and time calculators don't fit the legal/finance niche. The 5 tools below have high search volume and complement your existing collection.

## New Tools

### 1. Income Tax Estimator (finance category)
Simple federal tax bracket calculator. Input: filing status, gross income, deductions. Output: tax by bracket, effective rate, take-home estimate.

### 2. Auto Loan Calculator (finance category)  
Input: vehicle price, down payment, trade-in value, rate, term. Output: monthly payment, total interest, total cost. Distinct from the generic Loan Payment Calculator by including auto-specific fields.

### 3. Debt Payoff Calculator (finance category)
Input: balance, interest rate, minimum payment, extra payment. Output: months to payoff, total interest paid, interest saved with extra payments.

### 4. Net Worth Calculator (finance category)
Input: list of assets (cash, investments, property, vehicles) and liabilities (mortgage, loans, credit cards). Output: total assets, total liabilities, net worth.

### 5. Paycheck Calculator (employment category)
Input: hourly rate or salary, hours/week, pay frequency, federal filing status, state. Output: gross pay, estimated federal tax, estimated state tax, FICA, net pay.

## Files

- **Create (5):** One component per tool in `src/components/tools/`
  - `IncomeTaxEstimator.tsx`
  - `AutoLoanCalculator.tsx`
  - `DebtPayoffCalculator.tsx`
  - `NetWorthCalculator.tsx`
  - `PaycheckCalculator.tsx`

- **Edit:** `src/data/tools.ts` — add 5 tool entries with descriptions, FAQs, related tools
- **Edit:** `src/pages/ToolPage.tsx` — add lazy imports for the 5 new components

## Technical Notes
- All client-side calculations, no backend needed
- Follow the exact same pattern as existing calculators (e.g., `LoanPaymentCalculator.tsx`, `CompoundInterestCalculator.tsx`)
- Each gets proper SEO via the existing `ToolPageLayout` wrapper
- Styled consistently with accent colors, grid result cards

