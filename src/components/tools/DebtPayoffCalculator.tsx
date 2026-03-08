import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DebtPayoffCalculator() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [minPayment, setMinPayment] = useState("");
  const [extraPayment, setExtraPayment] = useState("");
  const [result, setResult] = useState<{
    monthsMin: number; interestMin: number;
    monthsExtra: number; interestExtra: number;
    interestSaved: number; timeSaved: number;
  } | null>(null);

  const simulate = (bal: number, monthlyRate: number, payment: number) => {
    let remaining = bal;
    let totalInterest = 0;
    let months = 0;
    while (remaining > 0.01 && months < 1200) {
      const interest = remaining * monthlyRate;
      totalInterest += interest;
      remaining = remaining + interest - Math.min(payment, remaining + interest);
      months++;
    }
    return { months, totalInterest: Math.round(totalInterest * 100) / 100 };
  };

  const calculate = () => {
    const b = parseFloat(balance);
    const mr = parseFloat(rate) / 100 / 12;
    const mp = parseFloat(minPayment);
    const ep = parseFloat(extraPayment) || 0;

    const min = simulate(b, mr, mp);
    const extra = simulate(b, mr, mp + ep);

    setResult({
      monthsMin: min.months,
      interestMin: min.totalInterest,
      monthsExtra: extra.months,
      interestExtra: extra.totalInterest,
      interestSaved: Math.round((min.totalInterest - extra.totalInterest) * 100) / 100,
      timeSaved: min.months - extra.months,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label>Current Balance ($)</Label>
          <Input type="number" placeholder="15000" value={balance} onChange={(e) => setBalance(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Annual Interest Rate (%)</Label>
          <Input type="number" placeholder="18.9" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Minimum Payment ($)</Label>
          <Input type="number" placeholder="300" value={minPayment} onChange={(e) => setMinPayment(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Extra Payment ($)</Label>
          <Input type="number" placeholder="200" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!balance || !rate || !minPayment} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Payoff
      </Button>
      {result && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">Minimum Payments Only</p>
              <p className="text-lg font-bold font-serif text-foreground">{result.monthsMin} months ({Math.floor(result.monthsMin / 12)}y {result.monthsMin % 12}m)</p>
              <p className="text-sm text-muted-foreground">Total interest: ${result.interestMin.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">With Extra Payments</p>
              <p className="text-lg font-bold font-serif text-foreground">{result.monthsExtra} months ({Math.floor(result.monthsExtra / 12)}y {result.monthsExtra % 12}m)</p>
              <p className="text-sm text-muted-foreground">Total interest: ${result.interestExtra.toLocaleString()}</p>
            </div>
          </div>
          {result.interestSaved > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-xl font-bold font-serif text-accent">${result.interestSaved.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Interest Saved</p>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-xl font-bold font-serif text-accent">{result.timeSaved} months</p>
                <p className="text-xs text-muted-foreground">Time Saved</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
