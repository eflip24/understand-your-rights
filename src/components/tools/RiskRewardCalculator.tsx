import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [result, setResult] = useState<{ riskAmount: number; rewardAmount: number; ratio: number; requiredWinRate: number; riskPercent: number; rewardPercent: number } | null>(null);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);
    const tp = parseFloat(takeProfit);
    const riskAmount = Math.abs(entry - stop);
    const rewardAmount = Math.abs(tp - entry);
    const ratio = rewardAmount / riskAmount;
    const requiredWinRate = (1 / (1 + ratio)) * 100;
    const riskPercent = (riskAmount / entry) * 100;
    const rewardPercent = (rewardAmount / entry) * 100;

    setResult({
      riskAmount: Math.round(riskAmount * 100) / 100,
      rewardAmount: Math.round(rewardAmount * 100) / 100,
      ratio: Math.round(ratio * 100) / 100,
      requiredWinRate: Math.round(requiredWinRate * 100) / 100,
      riskPercent: Math.round(riskPercent * 100) / 100,
      rewardPercent: Math.round(rewardPercent * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Entry Price ($)</Label>
          <Input type="number" placeholder="100" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Stop Loss ($)</Label>
          <Input type="number" placeholder="95" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Take Profit ($)</Label>
          <Input type="number" placeholder="115" value={takeProfit} onChange={(e) => setTakeProfit(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!entryPrice || !stopLoss || !takeProfit} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate R:R
      </Button>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-2xl font-bold font-serif text-accent">1:{result.ratio}</p>
            <p className="text-sm text-muted-foreground">Risk:Reward</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif">{result.requiredWinRate}%</p>
            <p className="text-xs text-muted-foreground">Min Win Rate</p>
          </div>
          <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <p className="text-xl font-bold font-serif text-destructive">${result.riskAmount} ({result.riskPercent}%)</p>
            <p className="text-xs text-muted-foreground">Risk</p>
          </div>
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xl font-bold font-serif text-green-600 dark:text-green-400">${result.rewardAmount} ({result.rewardPercent}%)</p>
            <p className="text-xs text-muted-foreground">Reward</p>
          </div>
        </div>
      )}
    </div>
  );
}
