

# New Category: Finance & Trading Tools

Add a new **"finance"** tool category with 10 calculators covering trading, crypto, and personal finance.

## New Category
Add `"finance"` to `ToolCategory` type and `categories` array with `DollarSign` icon.

## 10 New Tool Components

1. **CryptoTaxCalculator** — Input buy price, sell price, quantity, holding period. Outputs capital gain/loss and short-term vs long-term tax estimate.

2. **DCACalculator** (Dollar Cost Averaging) — Input total investment, frequency, number of periods, start/end price. Shows average cost basis and total units acquired.

3. **PositionSizeCalculator** — Input account size, risk %, stop loss distance. Outputs max position size and dollar risk.

4. **ProfitLossCalculator** — Input entry price, exit price, quantity, leverage (optional). Shows P&L in dollars and percentage, with fees.

5. **CompoundInterestCalculator** — Input principal, rate, compounding frequency, time period. Shows final amount, total interest earned.

6. **MarginCallCalculator** — Input equity, borrowed amount, maintenance margin %. Shows margin call price and current margin ratio.

7. **BreakevenCalculator** — Input entry price, fees %, leverage. Shows exact breakeven price accounting for round-trip trading fees.

8. **RiskRewardCalculator** — Input entry, stop loss, take profit. Shows risk:reward ratio and required win rate to be profitable.

9. **CryptoConverterCalculator** — Input amount, select common crypto (BTC, ETH, etc.), uses static reference prices. Shows equivalent values across assets.

10. **LoanPaymentCalculator** — Input principal, annual rate, term in months. Shows monthly payment, total interest, total paid (standard amortization).

## Files to Create (10)
- `src/components/tools/CryptoTaxCalculator.tsx`
- `src/components/tools/DCACalculator.tsx`
- `src/components/tools/PositionSizeCalculator.tsx`
- `src/components/tools/ProfitLossCalculator.tsx`
- `src/components/tools/CompoundInterestCalculator.tsx`
- `src/components/tools/MarginCallCalculator.tsx`
- `src/components/tools/BreakevenCalculator.tsx`
- `src/components/tools/RiskRewardCalculator.tsx`
- `src/components/tools/CryptoConverterCalculator.tsx`
- `src/components/tools/LoanPaymentCalculator.tsx`

## Files to Edit (2)
- **`src/data/tools.ts`** — Add `"finance"` category + 10 tool entries with SEO descriptions and FAQs
- **`src/pages/ToolPage.tsx`** — Import 10 components, add to `toolComponents` map

All tools are pure client-side calculators (no API calls needed). Each follows the existing pattern: `useState` for inputs, calculate function, styled result cards.

