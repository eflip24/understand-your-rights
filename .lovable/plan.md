

# New Category: Green Energy & Solar Tools

Add a new **"energy"** category with 8 calculators covering solar ROI, energy savings, carbon footprint, and green incentives — fitting the platform's legal/finance angle.

## New Category
Add `"energy"` to `ToolCategory` with a `Sun` or `Leaf` icon from lucide-react.

## 8 New Tools

### Solar & Renewable Energy
1. **Solar Panel ROI Calculator** — Input system cost, energy production (kWh/year), electricity rate, incentives/rebates. Shows payback period, 25-year savings, and ROI percentage.

2. **Solar Incentive & Tax Credit Estimator** — Input system cost, state, filing status. Shows federal ITC (30%), state rebates, SRECs, and net cost after incentives.

3. **Energy Savings Calculator** — Input current monthly bill, system size, solar coverage %. Shows annual savings, lifetime savings, and break-even month.

4. **Carbon Footprint Offset Calculator** — Input annual kWh usage, energy source mix. Shows CO₂ emissions avoided by switching to solar/wind, equivalent trees planted.

### Green Finance & Legal
5. **Green Lease Clause Checker** — Select common green lease provisions (energy benchmarking, utility data sharing, efficiency upgrades). Generates a checklist of recommended clauses for commercial leases.

6. **EV vs Gas Cost Comparison** — Input annual miles, gas price, MPG, electricity rate, EV efficiency. Shows annual fuel cost comparison and break-even analysis.

7. **Home Energy Audit Checklist** — Select home type and age. Generates prioritized checklist of energy improvements with estimated savings ranges.

8. **Power Purchase Agreement (PPA) Calculator** — Input PPA rate, escalation %, term years, current utility rate, utility escalation. Compares PPA vs utility costs over the contract term.

## Files to Create (8)
- `src/components/tools/SolarROICalculator.tsx`
- `src/components/tools/SolarIncentiveEstimator.tsx`
- `src/components/tools/EnergySavingsCalculator.tsx`
- `src/components/tools/CarbonFootprintCalculator.tsx`
- `src/components/tools/GreenLeaseChecker.tsx`
- `src/components/tools/EVvsGasCalculator.tsx`
- `src/components/tools/HomeEnergyAuditChecklist.tsx`
- `src/components/tools/PPACalculator.tsx`

## Files to Edit (2)
- **`src/data/tools.ts`** — Add `"energy"` category + 8 tool entries with descriptions and FAQs
- **`src/pages/ToolPage.tsx`** — Import and register 8 components

All pure client-side calculators, no API calls needed.

