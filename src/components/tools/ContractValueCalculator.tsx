import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContractValueCalculator() {
  const [form, setForm] = useState({ baseValue: "", frequency: "monthly", duration: "", renewals: "0", escalation: "0" });
  const [result, setResult] = useState<{ initialTerm: number; renewalValue: number; totalValue: number; monthlyAvg: number } | null>(null);

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const calculate = () => {
    const base = parseFloat(form.baseValue);
    const dur = parseInt(form.duration);
    const renewalCount = parseInt(form.renewals);
    const esc = parseFloat(form.escalation) / 100;

    let periodsPerYear = 12;
    if (form.frequency === "quarterly") periodsPerYear = 4;
    else if (form.frequency === "annually") periodsPerYear = 1;
    else if (form.frequency === "weekly") periodsPerYear = 52;

    const totalPeriods = dur * periodsPerYear;
    let initialTerm = 0;
    for (let y = 0; y < dur; y++) {
      const yearPayment = base * Math.pow(1 + esc, y);
      initialTerm += yearPayment * periodsPerYear;
    }

    let renewalValue = 0;
    for (let r = 0; r < renewalCount; r++) {
      for (let y = 0; y < dur; y++) {
        const totalYear = dur * (r + 1) + y;
        const yearPayment = base * Math.pow(1 + esc, totalYear);
        renewalValue += yearPayment * periodsPerYear;
      }
    }

    const totalValue = initialTerm + renewalValue;
    const totalMonths = dur * 12 * (1 + renewalCount);
    const monthlyAvg = totalValue / totalMonths;

    setResult({
      initialTerm: Math.round(initialTerm * 100) / 100,
      renewalValue: Math.round(renewalValue * 100) / 100,
      totalValue: Math.round(totalValue * 100) / 100,
      monthlyAvg: Math.round(monthlyAvg * 100) / 100,
    });
  };

  const valid = form.baseValue && form.duration;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Payment Amount ($)</Label>
          <Input type="number" placeholder="5000" value={form.baseValue} onChange={(e) => update("baseValue", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Payment Frequency</Label>
          <Select value={form.frequency} onValueChange={(v) => update("frequency", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Term Duration (years)</Label>
          <Input type="number" placeholder="3" value={form.duration} onChange={(e) => update("duration", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Number of Renewals</Label>
          <Input type="number" placeholder="0" min="0" value={form.renewals} onChange={(e) => update("renewals", e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Annual Escalation Rate (%)</Label>
          <Input type="number" placeholder="3" step="0.5" value={form.escalation} onChange={(e) => update("escalation", e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!valid} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Total Value
      </Button>
      {result && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.initialTerm.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Initial Term Value</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.renewalValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Renewal Value</p>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-2xl font-bold font-serif text-accent">${result.totalValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Contract Value</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.monthlyAvg.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Monthly Average</p>
          </div>
        </div>
      )}
    </div>
  );
}
