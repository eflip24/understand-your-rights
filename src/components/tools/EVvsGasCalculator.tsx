import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EVvsGasCalculator() {
  const [annualMiles, setAnnualMiles] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [mpg, setMpg] = useState("");
  const [electricityRate, setElectricityRate] = useState("");
  const [evEfficiency, setEvEfficiency] = useState("");
  const [result, setResult] = useState<{
    gasCostYear: number;
    evCostYear: number;
    annualSavings: number;
    savingsPercent: number;
    savings10yr: number;
  } | null>(null);

  const calculate = () => {
    const miles = parseFloat(annualMiles);
    const gas = parseFloat(gasPrice);
    const mpgVal = parseFloat(mpg);
    const elecRate = parseFloat(electricityRate);
    const evEff = parseFloat(evEfficiency); // kWh per 100 miles
    if (!miles || !gas || !mpgVal || !elecRate || !evEff) return;

    const gasCostYear = (miles / mpgVal) * gas;
    const evCostYear = (miles / 100) * evEff * elecRate;
    const annualSavings = gasCostYear - evCostYear;
    const savingsPercent = (annualSavings / gasCostYear) * 100;
    const savings10yr = annualSavings * 10;

    setResult({ gasCostYear, evCostYear, annualSavings, savingsPercent, savings10yr });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="annualMiles">Annual Miles Driven</Label>
          <Input id="annualMiles" type="number" placeholder="12000" value={annualMiles} onChange={(e) => setAnnualMiles(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="gasPrice">Gas Price ($/gallon)</Label>
          <Input id="gasPrice" type="number" step="0.01" placeholder="3.50" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="mpg">Gas Vehicle MPG</Label>
          <Input id="mpg" type="number" placeholder="28" value={mpg} onChange={(e) => setMpg(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="electricityRate">Electricity Rate ($/kWh)</Label>
          <Input id="electricityRate" type="number" step="0.01" placeholder="0.13" value={electricityRate} onChange={(e) => setElectricityRate(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="evEfficiency">EV Efficiency (kWh per 100 miles)</Label>
          <Input id="evEfficiency" type="number" placeholder="30" value={evEfficiency} onChange={(e) => setEvEfficiency(e.target.value)} />
        </div>
      </div>

      <Button onClick={calculate} className="w-full">Compare Costs</Button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">⛽ Gas Vehicle (Annual)</p>
            <p className="text-2xl font-bold text-foreground">${result.gasCostYear.toFixed(0)}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">⚡ EV (Annual)</p>
            <p className="text-2xl font-bold text-accent">${result.evCostYear.toFixed(0)}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Annual Savings</p>
            <p className="text-2xl font-bold text-accent">${result.annualSavings.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">{result.savingsPercent.toFixed(0)}% less</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">10-Year Savings</p>
            <p className="text-2xl font-bold text-accent">${result.savings10yr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </CardContent></Card>
        </div>
      )}
    </div>
  );
}
