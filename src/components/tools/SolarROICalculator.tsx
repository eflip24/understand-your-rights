import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SolarROICalculator() {
  const [systemCost, setSystemCost] = useState("");
  const [annualProduction, setAnnualProduction] = useState("");
  const [electricityRate, setElectricityRate] = useState("");
  const [incentives, setIncentives] = useState("");
  const [result, setResult] = useState<{
    netCost: number;
    annualSavings: number;
    paybackYears: number;
    savings25: number;
    roi: number;
  } | null>(null);

  const calculate = () => {
    const cost = parseFloat(systemCost);
    const kwh = parseFloat(annualProduction);
    const rate = parseFloat(electricityRate);
    const rebates = parseFloat(incentives) || 0;
    if (!cost || !kwh || !rate) return;

    const netCost = cost - rebates;
    const annualSavings = kwh * rate;
    const paybackYears = netCost / annualSavings;
    const savings25 = annualSavings * 25 - netCost;
    const roi = (savings25 / netCost) * 100;

    setResult({ netCost, annualSavings, paybackYears, savings25, roi });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="systemCost">System Cost ($)</Label>
          <Input id="systemCost" type="number" placeholder="25000" value={systemCost} onChange={(e) => setSystemCost(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="annualProduction">Annual Production (kWh)</Label>
          <Input id="annualProduction" type="number" placeholder="10000" value={annualProduction} onChange={(e) => setAnnualProduction(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="electricityRate">Electricity Rate ($/kWh)</Label>
          <Input id="electricityRate" type="number" step="0.01" placeholder="0.13" value={electricityRate} onChange={(e) => setElectricityRate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="incentives">Incentives & Rebates ($)</Label>
          <Input id="incentives" type="number" placeholder="7500" value={incentives} onChange={(e) => setIncentives(e.target.value)} />
        </div>
      </div>

      <Button onClick={calculate} className="w-full">Calculate ROI</Button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Net Cost</p>
            <p className="text-2xl font-bold text-foreground">${result.netCost.toLocaleString()}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Annual Savings</p>
            <p className="text-2xl font-bold text-accent">${result.annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Payback Period</p>
            <p className="text-2xl font-bold text-foreground">{result.paybackYears.toFixed(1)} years</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">25-Year Net Savings</p>
            <p className="text-2xl font-bold text-accent">${result.savings25.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </CardContent></Card>
          <Card className="sm:col-span-2"><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Return on Investment</p>
            <p className="text-3xl font-bold text-accent">{result.roi.toFixed(1)}%</p>
          </CardContent></Card>
        </div>
      )}
    </div>
  );
}
