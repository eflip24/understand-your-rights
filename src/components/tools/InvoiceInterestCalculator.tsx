import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InvoiceInterestCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [rateType, setRateType] = useState("annual");
  const [result, setResult] = useState<{ interest: number; total: number; dailyRate: number } | null>(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const d = parseInt(days);
    let dailyRate: number;
    if (rateType === "annual") dailyRate = r / 365;
    else if (rateType === "monthly") dailyRate = r / 30;
    else dailyRate = r;
    const interest = principal * dailyRate * d;
    setResult({
      interest: Math.round(interest * 100) / 100,
      total: Math.round((principal + interest) * 100) / 100,
      dailyRate: Math.round(dailyRate * 10000) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Invoice Amount ($)</Label>
          <Input type="number" placeholder="5000" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Interest Rate (%)</Label>
          <Input type="number" placeholder="10" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Days Overdue</Label>
          <Input type="number" placeholder="45" value={days} onChange={(e) => setDays(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Rate Type</Label>
          <Select value={rateType} onValueChange={setRateType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={calculate} disabled={!amount || !rate || !days} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Interest
      </Button>
      {result && (
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.interest.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Interest Owed</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.total.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Total Due</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">{result.dailyRate}%</p>
            <p className="text-xs text-muted-foreground">Daily Rate</p>
          </div>
        </div>
      )}
    </div>
  );
}
