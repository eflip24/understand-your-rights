

# New Tools: Grants & Equity Compensation

Add 6 new tools spanning government/nonprofit grants and equity/stock grants — both common legal areas.

## New Tools

### Government & Nonprofit Grants
1. **Grant Budget Calculator** — Input total grant amount, allocate across categories (personnel, equipment, travel, indirect costs). Shows remaining funds, indirect cost rate, and warns if allocations exceed limits.

2. **Grant Deadline Tracker** — Input grant name, application deadline, reporting deadlines. Shows countdown timers, status badges (upcoming/overdue/submitted), and sorted timeline view.

3. **Grant Compliance Checklist** — Select grant type (federal, state, foundation, corporate). Generates a checklist of common compliance requirements (reporting, audits, matching funds, allowable expenses).

### Equity & Stock Grants
4. **Vesting Schedule Calculator** — Input total shares/units, vesting period, cliff period, vesting frequency. Shows vesting timeline with cumulative vested shares per period.

5. **Stock Option Tax Calculator** — Input grant price, exercise price, number of shares, holding period, income bracket. Calculates ISO vs NSO tax treatment, AMT implications, and estimated tax owed.

6. **Equity Dilution Calculator** — Input current shares outstanding, new shares issued (grant pool, funding round). Shows pre/post dilution ownership percentages and dilution impact.

## Files to Create (6)
- `src/components/tools/GrantBudgetCalculator.tsx`
- `src/components/tools/GrantDeadlineTracker.tsx`
- `src/components/tools/GrantComplianceChecklist.tsx`
- `src/components/tools/VestingScheduleCalculator.tsx`
- `src/components/tools/StockOptionTaxCalculator.tsx`
- `src/components/tools/EquityDilutionCalculator.tsx`

## Files to Edit (2)
- **`src/data/tools.ts`** — Add 6 tool entries under existing categories (`finance` for equity tools, `legal` or a new `grants` subcategory under an existing category)
- **`src/pages/ToolPage.tsx`** — Import and register 6 components

All pure client-side calculators, no API calls needed.

