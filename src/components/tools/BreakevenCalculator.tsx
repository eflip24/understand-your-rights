import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function BreakevenCalculator() {
  const [entryPrice, setEntryPrice] = useState("");
  const [feePercent, setFeePercent] = useState("0.1");
  const [leverage, setLeverage] = useState("1");
  const [result, setResult] = useState<{ breakevenLong: number; breakevenShort: number; totalFeeCost: number; feeImpact: number } | null>(null);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const fee = parseFloat(feePercent) / 100;
    const lev = parseFloat(leverage);
    // Round trip fees: entry fee + exit fee
    const roundTripFee = 2 * fee;
    const feeImpact = roundTripFee / lev;
    const breakevenLong = entry * (1 + roundTripFee);
    const breakevenShort = entry * (1 - roundTripFee);
    const totalFeeCost = entry * roundTripFee;

    setResult({
      breakevenLong: Math.round(breakevenLong * 10000) / 10000,
      breakevenShort: Math.round(breakevenShort * 10000) / 10000,
      totalFeeCost: Math.round(totalFeeCost * 100) / 100,
      feeImpact: Math.round(feeImpact * 10000) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Entry Price ($)</Label>
          <Input type="number" placeholder="50000" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Trading Fee (%)</Label>
          <Input type="number" placeholder="0.1" step="0.01" value={feePercent} onChange={(e) => setFeePercent(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Leverage (×)</Label>
          <Input type="number" placeholder="1" value={leverage} onChange={(e) => setLeverage(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!entryPrice} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Breakeven
      </Button>
      {result && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xl font-bold font-serif text-green-600 dark:text-green-400">${result.breakevenLong}</p>
            <p className="text-xs text-muted-foreground">Breakeven (Long)</p>
          </div>
          <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <p className="text-xl font-bold font-serif text-destructive">${result.breakevenShort}</p>
            <p className="text-xs text-muted-foreground">Breakeven (Short)</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalFeeCost}</p>
            <p className="text-xs text-muted-foreground">Round-trip Fee Cost</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">{result.feeImpact}%</p>
            <p className="text-xs text-muted-foreground">Fee Impact</p>
          </div>
        </div>
      )}
    </div>
  );
}
