import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 14600,
  married: 29200,
  head: 21900,
};

interface BracketResult {
  rate: number;
  taxable: number;
  tax: number;
}

export default function IncomeTaxEstimator() {
  const [income, setIncome] = useState("");
  const [filing, setFiling] = useState("single");
  const [deductions, setDeductions] = useState("");
  const [result, setResult] = useState<{ brackets: BracketResult[]; totalTax: number; effectiveRate: number; takeHome: number } | null>(null);

  const calculate = () => {
    const gross = parseFloat(income);
    const ded = deductions ? parseFloat(deductions) : STANDARD_DEDUCTIONS[filing];
    const taxableIncome = Math.max(0, gross - ded);
    const brackets = BRACKETS_2024[filing as keyof typeof BRACKETS_2024];
    const bracketResults: BracketResult[] = [];
    let totalTax = 0;

    for (const b of brackets) {
      if (taxableIncome <= b.min) break;
      const taxable = Math.min(taxableIncome, b.max) - b.min;
      const tax = taxable * b.rate;
      totalTax += tax;
      bracketResults.push({ rate: b.rate * 100, taxable: Math.round(taxable), tax: Math.round(tax * 100) / 100 });
    }

    setResult({
      brackets: bracketResults,
      totalTax: Math.round(totalTax * 100) / 100,
      effectiveRate: taxableIncome > 0 ? Math.round((totalTax / gross) * 10000) / 100 : 0,
      takeHome: Math.round((gross - totalTax) * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Gross Annual Income ($)</Label>
          <Input type="number" placeholder="85000" value={income} onChange={(e) => setIncome(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Filing Status</Label>
          <Select value={filing} onValueChange={setFiling}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married Filing Jointly</SelectItem>
              <SelectItem value="head">Head of Household</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Deductions ($, blank = standard)</Label>
          <Input type="number" placeholder={STANDARD_DEDUCTIONS[filing].toString()} value={deductions} onChange={(e) => setDeductions(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!income} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Estimate Tax
      </Button>
      {result && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-xl font-bold font-serif text-accent">${result.totalTax.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Estimated Federal Tax</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-xl font-bold font-serif text-foreground">{result.effectiveRate}%</p>
              <p className="text-xs text-muted-foreground">Effective Tax Rate</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-xl font-bold font-serif text-foreground">${result.takeHome.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Estimated Take-Home</p>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2 font-medium">Bracket</th>
                  <th className="text-right p-2 font-medium">Taxable</th>
                  <th className="text-right p-2 font-medium">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.brackets.map((b, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{b.rate}%</td>
                    <td className="p-2 text-right">${b.taxable.toLocaleString()}</td>
                    <td className="p-2 text-right">${b.tax.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
