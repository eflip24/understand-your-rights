import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

const SS_RATE = 0.062;
const SS_WAGE_BASE = 168600;
const MEDICARE_RATE = 0.0145;

function calcFederalTax(annualIncome: number, filing: string): number {
  const brackets = filing === "married" ? BRACKETS_MARRIED : BRACKETS_SINGLE;
  const standardDeduction = filing === "married" ? 29200 : 14600;
  const taxable = Math.max(0, annualIncome - standardDeduction);
  let tax = 0;
  for (const b of brackets) {
    if (taxable <= b.min) break;
    tax += (Math.min(taxable, b.max) - b.min) * b.rate;
  }
  return tax;
}

export default function PaycheckCalculator() {
  const [payType, setPayType] = useState("salary");
  const [amount, setAmount] = useState("");
  const [hours, setHours] = useState("40");
  const [frequency, setFrequency] = useState("biweekly");
  const [filing, setFiling] = useState("single");
  const [result, setResult] = useState<{
    grossPay: number; federalTax: number; socialSecurity: number; medicare: number; totalDeductions: number; netPay: number;
  } | null>(null);

  const calculate = () => {
    const amt = parseFloat(amount);
    const hrs = parseFloat(hours) || 40;
    const periodsPerYear: Record<string, number> = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 };
    const periods = periodsPerYear[frequency];

    let annualGross: number;
    if (payType === "salary") {
      annualGross = amt;
    } else {
      annualGross = amt * hrs * 52;
    }

    const grossPay = annualGross / periods;
    const federalTaxAnnual = calcFederalTax(annualGross, filing);
    const federalTax = federalTaxAnnual / periods;
    const ssAnnual = Math.min(annualGross, SS_WAGE_BASE) * SS_RATE;
    const socialSecurity = ssAnnual / periods;
    const medicare = (annualGross * MEDICARE_RATE) / periods;
    const totalDeductions = federalTax + socialSecurity + medicare;

    setResult({
      grossPay: Math.round(grossPay * 100) / 100,
      federalTax: Math.round(federalTax * 100) / 100,
      socialSecurity: Math.round(socialSecurity * 100) / 100,
      medicare: Math.round(medicare * 100) / 100,
      totalDeductions: Math.round(totalDeductions * 100) / 100,
      netPay: Math.round((grossPay - totalDeductions) * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label>Pay Type</Label>
          <Select value={payType} onValueChange={setPayType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="salary">Annual Salary</SelectItem>
              <SelectItem value="hourly">Hourly Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{payType === "salary" ? "Annual Salary ($)" : "Hourly Rate ($)"}</Label>
          <Input type="number" placeholder={payType === "salary" ? "75000" : "25"} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        {payType === "hourly" && (
          <div className="space-y-2">
            <Label>Hours per Week</Label>
            <Input type="number" placeholder="40" value={hours} onChange={(e) => setHours(e.target.value)} />
          </div>
        )}
        <div className="space-y-2">
          <Label>Pay Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-Weekly</SelectItem>
              <SelectItem value="semimonthly">Semi-Monthly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Filing Status</Label>
          <Select value={filing} onValueChange={setFiling}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married Filing Jointly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={calculate} disabled={!amount} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Paycheck
      </Button>
      {result && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-xl font-bold font-serif text-foreground">${result.grossPay.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Gross Pay</p>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-xl font-bold font-serif text-accent">${result.netPay.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Net Pay (Take-Home)</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-xl font-bold font-serif text-foreground">${result.totalDeductions.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Deductions</p>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2 font-medium">Deduction</th>
                  <th className="text-right p-2 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-2">Federal Income Tax</td><td className="p-2 text-right">${result.federalTax.toLocaleString()}</td></tr>
                <tr className="border-t"><td className="p-2">Social Security (6.2%)</td><td className="p-2 text-right">${result.socialSecurity.toLocaleString()}</td></tr>
                <tr className="border-t"><td className="p-2">Medicare (1.45%)</td><td className="p-2 text-right">${result.medicare.toLocaleString()}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">* Estimates only. Does not include state tax, local tax, or pre-tax deductions (401k, health insurance, etc.).</p>
        </div>
      )}
    </div>
  );
}
