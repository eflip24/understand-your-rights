import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const emissionFactors: Record<string, number> = {
  coal: 0.95,
  natural_gas: 0.42,
  oil: 0.72,
  grid_avg: 0.39,
};

export default function CarbonFootprintCalculator() {
  const [annualKwh, setAnnualKwh] = useState("");
  const [source, setSource] = useState("grid_avg");
  const [solarPercent, setSolarPercent] = useState("");
  const [result, setResult] = useState<{
    currentCO2: number;
    avoidedCO2: number;
    treesEquivalent: number;
    milesEquivalent: number;
  } | null>(null);

  const calculate = () => {
    const kwh = parseFloat(annualKwh);
    const solar = parseFloat(solarPercent) || 0;
    if (!kwh) return;

    const factor = emissionFactors[source] || 0.39;
    const currentCO2 = (kwh * factor) / 1000; // metric tons
    const avoidedCO2 = (kwh * (solar / 100) * factor) / 1000;
    const treesEquivalent = Math.round(avoidedCO2 / 0.022); // ~0.022 tons per tree/year
    const milesEquivalent = Math.round(avoidedCO2 * 2481); // ~2481 miles per ton

    setResult({ currentCO2, avoidedCO2, treesEquivalent, milesEquivalent });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="annualKwh">Annual Electricity Usage (kWh)</Label>
          <Input id="annualKwh" type="number" placeholder="10000" value={annualKwh} onChange={(e) => setAnnualKwh(e.target.value)} />
        </div>
        <div>
          <Label>Current Energy Source</Label>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="grid_avg">US Grid Average</SelectItem>
              <SelectItem value="coal">Coal</SelectItem>
              <SelectItem value="natural_gas">Natural Gas</SelectItem>
              <SelectItem value="oil">Oil</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="solarPercent">Solar/Renewable Replacement (%)</Label>
          <Input id="solarPercent" type="number" placeholder="100" value={solarPercent} onChange={(e) => setSolarPercent(e.target.value)} />
        </div>
      </div>

      <Button onClick={calculate} className="w-full">Calculate Offset</Button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Current CO₂ Emissions</p>
            <p className="text-2xl font-bold text-foreground">{result.currentCO2.toFixed(2)} tons/yr</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">CO₂ Avoided</p>
            <p className="text-2xl font-bold text-accent">{result.avoidedCO2.toFixed(2)} tons/yr</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">🌳 Equivalent Trees Planted</p>
            <p className="text-2xl font-bold text-foreground">{result.treesEquivalent.toLocaleString()}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">🚗 Driving Miles Offset</p>
            <p className="text-2xl font-bold text-foreground">{result.milesEquivalent.toLocaleString()}</p>
          </CardContent></Card>
        </div>
      )}
    </div>
  );
}
