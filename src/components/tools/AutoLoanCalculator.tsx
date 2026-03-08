import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [tradeIn, setTradeIn] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("60");
  const [result, setResult] = useState<{ loanAmount: number; monthlyPayment: number; totalInterest: number; totalCost: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price) - (parseFloat(downPayment) || 0) - (parseFloat(tradeIn) || 0);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(term);
    let monthly: number;
    if (r === 0) {
      monthly = p / n;
    } else {
      monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalPaid = monthly * n;
    setResult({
      loanAmount: Math.round(p * 100) / 100,
      monthlyPayment: Math.round(monthly * 100) / 100,
      totalInterest: Math.round((totalPaid - p) * 100) / 100,
      totalCost: Math.round((totalPaid + (parseFloat(downPayment) || 0) + (parseFloat(tradeIn) || 0)) * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label>Vehicle Price ($)</Label>
          <Input type="number" placeholder="35000" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Down Payment ($)</Label>
          <Input type="number" placeholder="5000" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Trade-In Value ($)</Label>
          <Input type="number" placeholder="3000" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Annual Interest Rate (%)</Label>
          <Input type="number" placeholder="6.5" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Loan Term (Months)</Label>
          <Input type="number" placeholder="60" value={term} onChange={(e) => setTerm(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!price || !rate || !term} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Auto Loan
      </Button>
      {result && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.loanAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Loan Amount</p>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-xl font-bold font-serif text-accent">${result.monthlyPayment.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Monthly Payment</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalInterest.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Interest</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalCost.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Cost</p>
          </div>
        </div>
      )}
    </div>
  );
}
