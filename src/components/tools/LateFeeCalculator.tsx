import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LateFeeCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [rateType, setRateType] = useState("daily");
  const [result, setResult] = useState<{ fee: number; total: number } | null>(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const d = parseInt(days);
    let fee: number;
    if (rateType === "daily") fee = principal * r * d;
    else if (rateType === "monthly") fee = principal * r * (d / 30);
    else fee = principal * r * (d / 365);
    setResult({ fee: Math.round(fee * 100) / 100, total: Math.round((principal + fee) * 100) / 100 });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Principal Amount ($)</Label>
          <Input type="number" placeholder="1000" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Fee Rate (%)</Label>
          <Input type="number" placeholder="1.5" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Days Late</Label>
          <Input type="number" placeholder="30" value={days} onChange={(e) => setDays(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Rate Type</Label>
          <Select value={rateType} onValueChange={setRateType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={calculate} disabled={!amount || !rate || !days} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Late Fee
      </Button>
      {result && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <p className="text-2xl font-bold font-serif text-destructive">${result.fee.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Late Fee</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.total.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total Due</p>
          </div>
        </div>
      )}
    </div>
  );
}
