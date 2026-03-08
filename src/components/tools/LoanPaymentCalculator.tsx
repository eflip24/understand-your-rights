import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoanPaymentCalculator() {
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [termMonths, setTermMonths] = useState("");
  const [result, setResult] = useState<{ monthlyPayment: number; totalPaid: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(annualRate) / 100 / 12;
    const n = parseInt(termMonths);
    let monthlyPayment: number;
    if (r === 0) {
      monthlyPayment = p / n;
    } else {
      monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - p;
    setResult({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPaid: Math.round(totalPaid * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Loan Amount ($)</Label>
          <Input type="number" placeholder="250000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Annual Interest Rate (%)</Label>
          <Input type="number" placeholder="6.5" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Loan Term (Months)</Label>
          <Input type="number" placeholder="360" value={termMonths} onChange={(e) => setTermMonths(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!principal || !annualRate || !termMonths} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Payment
      </Button>
      {result && (
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-xl font-bold font-serif text-accent">${result.monthlyPayment.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Monthly Payment</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalPaid.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Paid</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalInterest.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Interest</p>
          </div>
        </div>
      )}
    </div>
  );
}
