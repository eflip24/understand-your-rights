import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ProfitLossCalculator() {
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [leverage, setLeverage] = useState("1");
  const [feePercent, setFeePercent] = useState("0.1");
  const [result, setResult] = useState<{ grossPnl: number; fees: number; netPnl: number; returnPercent: number } | null>(null);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const exit = parseFloat(exitPrice);
    const qty = parseFloat(quantity);
    const lev = parseFloat(leverage);
    const fee = parseFloat(feePercent) / 100;
    const grossPnl = (exit - entry) * qty * lev;
    const totalNotional = entry * qty * lev + exit * qty * lev;
    const fees = totalNotional * fee;
    const netPnl = grossPnl - fees;
    const investment = entry * qty;
    const returnPercent = (netPnl / investment) * 100;
    setResult({
      grossPnl: Math.round(grossPnl * 100) / 100,
      fees: Math.round(fees * 100) / 100,
      netPnl: Math.round(netPnl * 100) / 100,
      returnPercent: Math.round(returnPercent * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Entry Price ($)</Label>
          <Input type="number" placeholder="100" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Exit Price ($)</Label>
          <Input type="number" placeholder="120" value={exitPrice} onChange={(e) => setExitPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input type="number" placeholder="10" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Leverage (×)</Label>
          <Input type="number" placeholder="1" value={leverage} onChange={(e) => setLeverage(e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Trading Fee (%)</Label>
          <Input type="number" placeholder="0.1" step="0.01" value={feePercent} onChange={(e) => setFeePercent(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!entryPrice || !exitPrice || !quantity} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate P&L
      </Button>
      {result && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className={`text-center p-4 rounded-lg border ${result.netPnl >= 0 ? "bg-green-500/10 border-green-500/20" : "bg-destructive/10 border-destructive/20"}`}>
            <p className={`text-2xl font-bold font-serif ${result.netPnl >= 0 ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>${result.netPnl.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Net P&L</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">{result.returnPercent}%</p>
            <p className="text-sm text-muted-foreground">Return</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.grossPnl.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Gross P&L</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.fees.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Fees</p>
          </div>
        </div>
      )}
    </div>
  );
}
