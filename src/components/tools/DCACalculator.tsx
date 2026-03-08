import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DCACalculator() {
  const [investmentPerPeriod, setInvestmentPerPeriod] = useState("");
  const [periods, setPeriods] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [result, setResult] = useState<{ totalInvested: number; totalUnits: number; avgCost: number; currentValue: number; pnl: number; pnlPercent: number } | null>(null);

  const calculate = () => {
    const inv = parseFloat(investmentPerPeriod);
    const n = parseInt(periods);
    const sp = parseFloat(startPrice);
    const ep = parseFloat(endPrice);
    const totalInvested = inv * n;
    let totalUnits = 0;
    for (let i = 0; i < n; i++) {
      const price = sp + (ep - sp) * (i / Math.max(n - 1, 1));
      totalUnits += inv / price;
    }
    const avgCost = totalInvested / totalUnits;
    const currentValue = totalUnits * ep;
    const pnl = currentValue - totalInvested;
    const pnlPercent = (pnl / totalInvested) * 100;
    setResult({
      totalInvested: Math.round(totalInvested * 100) / 100,
      totalUnits: Math.round(totalUnits * 10000) / 10000,
      avgCost: Math.round(avgCost * 100) / 100,
      currentValue: Math.round(currentValue * 100) / 100,
      pnl: Math.round(pnl * 100) / 100,
      pnlPercent: Math.round(pnlPercent * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Investment Per Period ($)</Label>
          <Input type="number" placeholder="500" value={investmentPerPeriod} onChange={(e) => setInvestmentPerPeriod(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Number of Periods</Label>
          <Input type="number" placeholder="12" value={periods} onChange={(e) => setPeriods(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Start Price ($)</Label>
          <Input type="number" placeholder="30000" value={startPrice} onChange={(e) => setStartPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>End Price ($)</Label>
          <Input type="number" placeholder="45000" value={endPrice} onChange={(e) => setEndPrice(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!investmentPerPeriod || !periods || !startPrice || !endPrice} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate DCA
      </Button>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          {[
            { label: "Total Invested", value: `$${result.totalInvested.toLocaleString()}` },
            { label: "Units Acquired", value: result.totalUnits.toString() },
            { label: "Avg Cost Basis", value: `$${result.avgCost.toLocaleString()}` },
            { label: "Current Value", value: `$${result.currentValue.toLocaleString()}` },
            { label: "P&L", value: `$${result.pnl.toLocaleString()}` },
            { label: "Return %", value: `${result.pnlPercent}%` },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-xl font-bold font-serif text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
