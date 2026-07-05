import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";

// 2024 federal minimum wage
const FED_MIN_WAGE = 7.25;
// Federal CCPA cap for ordinary (consumer) debts: lesser of 25% disposable or amount above 30x fed min wage
// Weekly threshold = 30 * $7.25 = $217.50
const FED_WEEKLY_THRESHOLD = 30 * FED_MIN_WAGE;

type DebtType = "consumer" | "child-support-single" | "child-support-multi" | "student-loan" | "federal-tax" | "state-tax";

interface StateRule {
  // Cap on disposable income for ordinary consumer debts; null = follows federal 25%
  consumerCapPct: number | null;
  minWageMultiplier: number; // multiplier of state or fed min wage used for protected floor
  stateMinWage: number;
  notes: string;
}

const STATE_RULES: Record<string, StateRule> = {
  "Federal (default)": { consumerCapPct: 25, minWageMultiplier: 30, stateMinWage: FED_MIN_WAGE, notes: "Federal CCPA: lesser of 25% disposable or excess over 30× fed min wage ($217.50/wk)." },
  "California": { consumerCapPct: 20, minWageMultiplier: 40, stateMinWage: 16.00, notes: "CA: lesser of 20% disposable or 40× state min wage/week ($640). Stricter than federal." },
  "New York": { consumerCapPct: 10, minWageMultiplier: 30, stateMinWage: 16.00, notes: "NY: 10% of gross OR 25% disposable, whichever less; nothing if disposable ≤ 30× state min wage." },
  "Texas": { consumerCapPct: 0, minWageMultiplier: 0, stateMinWage: 7.25, notes: "TX: consumer-debt wage garnishment is PROHIBITED. Only child support, taxes, student loans, or court-ordered spousal support." },
  "North Carolina": { consumerCapPct: 0, minWageMultiplier: 0, stateMinWage: 7.25, notes: "NC: consumer wage garnishment prohibited except for taxes, student loans, child support, and ambulance/hospital debts." },
  "Pennsylvania": { consumerCapPct: 0, minWageMultiplier: 0, stateMinWage: 7.25, notes: "PA: consumer wage garnishment prohibited (allowed only for support, rent, taxes, student loans)." },
  "South Carolina": { consumerCapPct: 0, minWageMultiplier: 0, stateMinWage: 7.25, notes: "SC: consumer wage garnishment prohibited except taxes, child support, student loans." },
  "Florida": { consumerCapPct: 25, minWageMultiplier: 30, stateMinWage: 12.00, notes: "FL: head-of-family with disposable ≤ $750/wk is fully exempt. Otherwise 25%." },
  "Illinois": { consumerCapPct: 15, minWageMultiplier: 45, stateMinWage: 14.00, notes: "IL: lesser of 15% gross or amount over 45× state min wage/week." },
  "New Jersey": { consumerCapPct: 10, minWageMultiplier: 30, stateMinWage: 15.13, notes: "NJ: 10% if income ≤ 250% federal poverty; else up to 25%." },
  "Massachusetts": { consumerCapPct: 15, minWageMultiplier: 50, stateMinWage: 15.00, notes: "MA: 15% gross, protected floor of 50× state min wage/week." },
  "Colorado": { consumerCapPct: 20, minWageMultiplier: 40, stateMinWage: 14.42, notes: "CO: 20% disposable or amount over 40× state min wage." },
  "Nevada": { consumerCapPct: 25, minWageMultiplier: 50, stateMinWage: 12.00, notes: "NV: 25% or amount over 50× federal min wage." },
  "Washington": { consumerCapPct: 25, minWageMultiplier: 35, stateMinWage: 16.28, notes: "WA: 25% or amount over 35× state min wage; consumer debts capped lower." },
  "Ohio": { consumerCapPct: 25, minWageMultiplier: 30, stateMinWage: 10.45, notes: "Follows federal CCPA formula." },
  "Georgia": { consumerCapPct: 25, minWageMultiplier: 30, stateMinWage: 7.25, notes: "Follows federal CCPA formula." },
  "Michigan": { consumerCapPct: 25, minWageMultiplier: 30, stateMinWage: 10.33, notes: "Follows federal CCPA formula." },
  "Arizona": { consumerCapPct: 25, minWageMultiplier: 30, stateMinWage: 14.35, notes: "Follows federal CCPA formula." },
  "Virginia": { consumerCapPct: 25, minWageMultiplier: 40, stateMinWage: 12.00, notes: "VA: 25% or amount over 40× fed min wage/week ($290)." },
};

export default function WageGarnishmentCalculator() {
  const [state, setState] = useState("Federal (default)");
  const [debtType, setDebtType] = useState<DebtType>("consumer");
  const [grossPay, setGrossPay] = useState("");
  const [taxesAndRequired, setTaxesAndRequired] = useState("");
  const [supportsOtherFamily, setSupportsOtherFamily] = useState<"yes" | "no">("no");
  const [arrears12wk, setArrears12wk] = useState<"yes" | "no">("no");

  const gross = parseFloat(grossPay) || 0;
  const deductions = parseFloat(taxesAndRequired) || 0;
  const disposable = Math.max(0, gross - deductions);
  const rule = STATE_RULES[state];

  let maxGarnishment = 0;
  let formulaExplanation = "";
  let capPct = 0;

  if (debtType === "consumer") {
    if (rule.consumerCapPct === 0) {
      maxGarnishment = 0;
      formulaExplanation = `${state} prohibits consumer wage garnishment.`;
    } else {
      const pctCap = disposable * ((rule.consumerCapPct ?? 25) / 100);
      const floorProtection = rule.minWageMultiplier * rule.stateMinWage;
      const excessOverFloor = Math.max(0, disposable - floorProtection);
      maxGarnishment = Math.min(pctCap, excessOverFloor);
      capPct = rule.consumerCapPct ?? 25;
      formulaExplanation = `Lesser of ${capPct}% of disposable ($${pctCap.toFixed(2)}) OR amount over ${rule.minWageMultiplier}× min wage ($${floorProtection.toFixed(2)} protected).`;
    }
  } else if (debtType === "child-support-single" || debtType === "child-support-multi") {
    // CCPA: 50% if supports other, 60% if not; +5% if 12+ weeks in arrears
    let pct = supportsOtherFamily === "yes" ? 50 : 60;
    if (arrears12wk === "yes") pct += 5;
    maxGarnishment = disposable * (pct / 100);
    capPct = pct;
    formulaExplanation = `Federal CCPA child support cap: ${pct}% of disposable income (supports other family: ${supportsOtherFamily}, 12+ wks arrears: ${arrears12wk}).`;
  } else if (debtType === "student-loan") {
    // Fed non-tax debt: 15% disposable
    maxGarnishment = Math.min(disposable * 0.15, Math.max(0, disposable - FED_WEEKLY_THRESHOLD));
    capPct = 15;
    formulaExplanation = "Federal student loans (administrative wage garnishment): 15% of disposable, minus 30× fed min wage floor.";
  } else if (debtType === "federal-tax") {
    // IRS uses tables; approximate: everything above standard deduction+exemption per pay period
    maxGarnishment = Math.max(0, disposable - 460); // rough weekly single-0 exempt 2024
    formulaExplanation = "IRS levies leave only exempt amount (~$460/wk single, 0 dependents in 2024). Everything above is levied.";
  } else if (debtType === "state-tax") {
    maxGarnishment = disposable * 0.10;
    capPct = 10;
    formulaExplanation = "Most state tax agencies garnish ~10% of gross wages; some go up to 25%.";
  }

  const take = Math.max(0, disposable - maxGarnishment);
  const calc = gross > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(STATE_RULES).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Debt Type</Label>
          <Select value={debtType} onValueChange={(v) => setDebtType(v as DebtType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="consumer">Consumer debt (credit card, medical, personal loan)</SelectItem>
              <SelectItem value="child-support-single">Child support</SelectItem>
              <SelectItem value="student-loan">Federal student loan</SelectItem>
              <SelectItem value="federal-tax">IRS tax levy</SelectItem>
              <SelectItem value="state-tax">State tax levy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Gross pay per week ($)</Label><Input type="number" value={grossPay} onChange={e => setGrossPay(e.target.value)} placeholder="800" /></div>
        <div><Label>Taxes + required deductions ($)</Label><Input type="number" value={taxesAndRequired} onChange={e => setTaxesAndRequired(e.target.value)} placeholder="200" /></div>
        {debtType === "child-support-single" && (
          <>
            <div>
              <Label>Do you support another spouse/child?</Label>
              <Select value={supportsOtherFamily} onValueChange={(v) => setSupportsOtherFamily(v as "yes" | "no")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>12+ weeks in arrears?</Label>
              <Select value={arrears12wk} onValueChange={(v) => setArrears12wk(v as "yes" | "no")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Weekly Garnishment Estimate</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Disposable Income</p>
                <p className="text-2xl font-bold">${disposable.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-destructive/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Max Garnishment</p>
                <p className="text-2xl font-bold text-destructive">${maxGarnishment.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Your Take-Home</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">${take.toFixed(2)}</p>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-2">
              <p><span className="font-medium">Formula:</span> {formulaExplanation}</p>
              <p><span className="font-medium">{state} rule:</span> {rule.notes}</p>
              <p className="text-xs text-muted-foreground">Monthly max garnishment ≈ ${(maxGarnishment * 4.33).toFixed(0)}. Annual ≈ ${(maxGarnishment * 52).toFixed(0)}.</p>
            </div>
            <p className="text-xs text-muted-foreground">
              You may qualify for a claim of exemption (head-of-family, low-income, EITC recipient) that reduces or eliminates garnishment. Filing bankruptcy triggers an automatic stay that halts most garnishments immediately. Not legal advice.
            </p>
          </CardContent>
        </Card>
      )}

      <ToolRecommender topic="wage-hour" />
    </div>
  );
}
