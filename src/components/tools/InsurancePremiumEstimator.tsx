import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const baseRates: Record<string, number> = { auto: 160, home: 150, renters: 20, life: 40 };
const ageFactors: Record<string, number> = { "16-25": 1.8, "26-35": 1.0, "36-45": 0.95, "46-55": 1.05, "56-65": 1.15, "65+": 1.3 };
const creditFactors: Record<string, number> = { excellent: 0.8, good: 1.0, fair: 1.2, poor: 1.5 };
const coverageLevels: Record<string, number> = { minimum: 0.5, standard: 1.0, full: 1.4, premium: 1.8 };

export default function InsurancePremiumEstimator() {
  const [insuranceType, setInsuranceType] = useState("auto");
  const [ageRange, setAgeRange] = useState("26-35");
  const [creditScore, setCreditScore] = useState("good");
  const [coverageLevel, setCoverageLevel] = useState("standard");
  const [zipCode, setZipCode] = useState("");
  const [result, setResult] = useState<{ monthly: number; annual: number; factors: string[] } | null>(null);

  const calculate = () => {
    const base = baseRates[insuranceType];
    const ageFactor = ageFactors[ageRange];
    const creditFactor = creditFactors[creditScore];
    const coverageFactor = coverageLevels[coverageLevel];
    // Simple location factor based on first digit of zip
    const firstDigit = parseInt(zipCode.charAt(0)) || 5;
    const locationFactor = firstDigit <= 3 ? 1.15 : firstDigit >= 7 ? 1.1 : 1.0;
    const monthly = Math.round(base * ageFactor * creditFactor * coverageFactor * locationFactor);
    const factors: string[] = [];
    if (ageFactor > 1.1) factors.push("Age bracket increases your rate");
    if (creditFactor > 1.1) factors.push("Credit score increases your rate");
    if (coverageFactor > 1.2) factors.push("Higher coverage level adds cost");
    if (locationFactor > 1.05) factors.push("Your area has higher average rates");
    if (factors.length === 0) factors.push("Your profile has favorable rate factors");
    setResult({ monthly, annual: monthly * 12, factors });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Insurance Type</Label>
          <Select value={insuranceType} onValueChange={setInsuranceType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto Insurance</SelectItem>
              <SelectItem value="home">Homeowners Insurance</SelectItem>
              <SelectItem value="renters">Renters Insurance</SelectItem>
              <SelectItem value="life">Life Insurance (Term)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Age Range</Label>
          <Select value={ageRange} onValueChange={setAgeRange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(ageFactors).map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Credit Score Range</Label>
          <Select value={creditScore} onValueChange={setCreditScore}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent (750+)</SelectItem>
              <SelectItem value="good">Good (670-749)</SelectItem>
              <SelectItem value="fair">Fair (580-669)</SelectItem>
              <SelectItem value="poor">Poor (below 580)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Coverage Level</Label>
          <Select value={coverageLevel} onValueChange={setCoverageLevel}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="minimum">Minimum (state required)</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="full">Full Coverage</SelectItem>
              <SelectItem value="premium">Premium / Maximum</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>ZIP Code</Label>
          <Input type="text" maxLength={5} placeholder="90210" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} className="w-full">Estimate Premium</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="font-semibold text-lg">Estimated Premium</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="text-center p-3 rounded-md bg-accent/10 border border-accent/30">
              <p className="text-sm text-muted-foreground">Monthly</p>
              <p className="text-2xl font-bold text-foreground">{fmt(result.monthly)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">Annual</p>
              <p className="text-2xl font-bold text-foreground">{fmt(result.annual)}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Rate Factors:</p>
            {result.factors.map((f, i) => (
              <p key={i} className="text-sm text-muted-foreground">• {f}</p>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">This is a rough estimate. Actual premiums depend on your specific driving record, claims history, vehicle, and insurer. Get real quotes for accurate pricing.</p>
        </div>
      )}
    </div>
  );
}