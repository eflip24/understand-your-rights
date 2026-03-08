import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EnergySavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [coveragePercent, setCoveragePercent] = useState("");
  const [systemCost, setSystemCost] = useState("");
  const [result, setResult] = useState<{
    monthlySavings: number;
    annualSavings: number;
    lifetimeSavings: number;
    breakevenMonths: number;
  } | null>(null);

  const calculate = () => {
    const bill = parseFloat(monthlyBill);
    const coverage = parseFloat(coveragePercent);
    const cost = parseFloat(systemCost);
    if (!bill || !coverage || !cost) return;

    const monthlySavings = bill * (coverage / 100);
    const annualSavings = monthlySavings * 12;
    const lifetimeSavings = annualSavings * 25 - cost;
    const breakevenMonths = Math.ceil(cost / monthlySavings);

    setResult({ monthlySavings, annualSavings, lifetimeSavings, breakevenMonths });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="monthlyBill">Current Monthly Bill ($)</Label>
          <Input id="monthlyBill" type="number" placeholder="150" value={monthlyBill} onChange={(e) => setMonthlyBill(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="coverage">Solar Coverage (%)</Label>
          <Input id="coverage" type="number" placeholder="80" value={coveragePercent} onChange={(e) => setCoveragePercent(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="systemCost">System Cost ($)</Label>
          <Input id="systemCost" type="number" placeholder="20000" value={systemCost} onChange={(e) => setSystemCost(e.target.value)} />
        </div>
      </div>

      <Button onClick={calculate} className="w-full">Calculate Savings</Button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Monthly Savings</p>
            <p className="text-2xl font-bold text-accent">${result.monthlySavings.toFixed(0)}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Annual Savings</p>
            <p className="text-2xl font-bold text-accent">${result.annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Break-Even</p>
            <p className="text-2xl font-bold text-foreground">{result.breakevenMonths} months</p>
            <p className="text-xs text-muted-foreground">({(result.breakevenMonths / 12).toFixed(1)} years)</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">25-Year Net Savings</p>
            <p className="text-2xl font-bold text-accent">${result.lifetimeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </CardContent></Card>
        </div>
      )}
    </div>
  );
}
