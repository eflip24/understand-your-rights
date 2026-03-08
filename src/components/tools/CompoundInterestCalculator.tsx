import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [monthlyContribution, setMonthlyContribution] = useState("0");
  const [result, setResult] = useState<{ finalAmount: number; totalInterest: number; totalContributions: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(frequency);
    const mc = parseFloat(monthlyContribution) || 0;

    // A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
    const compoundFactor = Math.pow(1 + r / n, n * t);
    let finalAmount = p * compoundFactor;
    const periodicContribution = mc * (12 / n);
    if (r > 0) {
      finalAmount += periodicContribution * ((compoundFactor - 1) / (r / n));
    } else {
      finalAmount += periodicContribution * n * t;
    }
    const totalContributions = p + mc * 12 * t;
    const totalInterest = finalAmount - totalContributions;

    setResult({
      finalAmount: Math.round(finalAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Initial Principal ($)</Label>
          <Input type="number" placeholder="10000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Annual Interest Rate (%)</Label>
          <Input type="number" placeholder="7" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Time Period (Years)</Label>
          <Input type="number" placeholder="10" value={years} onChange={(e) => setYears(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Compounding Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Annually</SelectItem>
              <SelectItem value="4">Quarterly</SelectItem>
              <SelectItem value="12">Monthly</SelectItem>
              <SelectItem value="365">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Monthly Contribution ($)</Label>
          <Input type="number" placeholder="500" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!principal || !rate || !years} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Compound Interest
      </Button>
      {result && (
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xl font-bold font-serif text-green-600 dark:text-green-400">${result.finalAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Final Amount</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalInterest.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Interest Earned</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalContributions.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Contributions</p>
          </div>
        </div>
      )}
    </div>
  );
}
