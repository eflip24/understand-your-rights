import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PositionSizeCalculator() {
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("2");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [result, setResult] = useState<{ dollarRisk: number; positionSize: number; units: number; stopDistance: number; stopPercent: number } | null>(null);

  const calculate = () => {
    const account = parseFloat(accountSize);
    const risk = parseFloat(riskPercent) / 100;
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);
    const dollarRisk = account * risk;
    const stopDistance = Math.abs(entry - stop);
    const stopPercent = (stopDistance / entry) * 100;
    const units = dollarRisk / stopDistance;
    const positionSize = units * entry;
    setResult({
      dollarRisk: Math.round(dollarRisk * 100) / 100,
      positionSize: Math.round(positionSize * 100) / 100,
      units: Math.round(units * 10000) / 10000,
      stopDistance: Math.round(stopDistance * 100) / 100,
      stopPercent: Math.round(stopPercent * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Account Size ($)</Label>
          <Input type="number" placeholder="10000" value={accountSize} onChange={(e) => setAccountSize(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Risk Per Trade (%)</Label>
          <Input type="number" placeholder="2" step="0.5" value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Entry Price ($)</Label>
          <Input type="number" placeholder="150" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Stop Loss Price ($)</Label>
          <Input type="number" placeholder="145" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!accountSize || !riskPercent || !entryPrice || !stopLoss} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Position Size
      </Button>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          {[
            { label: "Dollar Risk", value: `$${result.dollarRisk.toLocaleString()}` },
            { label: "Position Size", value: `$${result.positionSize.toLocaleString()}` },
            { label: "Units/Shares", value: result.units.toString() },
            { label: "Stop Distance", value: `$${result.stopDistance}` },
            { label: "Stop %", value: `${result.stopPercent}%` },
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
