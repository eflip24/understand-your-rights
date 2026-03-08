import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PTOCalculator() {
  const [accrualRate, setAccrualRate] = useState("");
  const [accrualPeriod, setAccrualPeriod] = useState("monthly");
  const [monthsEmployed, setMonthsEmployed] = useState("");
  const [usedDays, setUsedDays] = useState("0");
  const [maxCarryover, setMaxCarryover] = useState("");
  const [result, setResult] = useState<{ totalAccrued: number; used: number; remaining: number; hoursRemaining: number } | null>(null);

  const calculate = () => {
    const rate = parseFloat(accrualRate);
    const months = parseInt(monthsEmployed);
    const used = parseFloat(usedDays) || 0;
    const maxCo = maxCarryover ? parseFloat(maxCarryover) : Infinity;

    let periods: number;
    if (accrualPeriod === "monthly") periods = months;
    else if (accrualPeriod === "biweekly") periods = Math.floor(months * 2.17);
    else periods = Math.floor(months / 12);

    let totalAccrued = Math.min(rate * periods, maxCo === Infinity ? Infinity : maxCo);
    if (maxCo !== Infinity) totalAccrued = Math.min(totalAccrued, maxCo);
    const remaining = Math.max(0, totalAccrued - used);

    setResult({
      totalAccrued: Math.round(totalAccrued * 100) / 100,
      used,
      remaining: Math.round(remaining * 100) / 100,
      hoursRemaining: Math.round(remaining * 8 * 100) / 100,
    });
  };

  const valid = accrualRate && monthsEmployed;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Accrual Rate (days per period)</Label>
          <Input type="number" placeholder="1.25" step="0.25" value={accrualRate} onChange={(e) => setAccrualRate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Accrual Period</Label>
          <Select value={accrualPeriod} onValueChange={setAccrualPeriod}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Months Employed</Label>
          <Input type="number" placeholder="18" value={monthsEmployed} onChange={(e) => setMonthsEmployed(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Days Already Used</Label>
          <Input type="number" placeholder="5" value={usedDays} onChange={(e) => setUsedDays(e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Max Carryover / Cap (days, optional)</Label>
          <Input type="number" placeholder="No cap" value={maxCarryover} onChange={(e) => setMaxCarryover(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!valid} className="bg-accent text-accent-foreground hover:bg-gold-dark">Calculate PTO</Button>
      {result && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">{result.totalAccrued}</p>
            <p className="text-sm text-muted-foreground">Days Accrued</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">{result.used}</p>
            <p className="text-sm text-muted-foreground">Days Used</p>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-2xl font-bold font-serif text-accent">{result.remaining} days</p>
            <p className="text-sm text-muted-foreground">Remaining PTO</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">{result.hoursRemaining} hrs</p>
            <p className="text-sm text-muted-foreground">Remaining Hours</p>
          </div>
        </div>
      )}
    </div>
  );
}
