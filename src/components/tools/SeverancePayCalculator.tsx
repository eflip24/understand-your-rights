import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SeverancePayCalculator() {
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [level, setLevel] = useState("standard");

  const annualSalary = parseFloat(salary) || 0;
  const yearsWorked = parseFloat(years) || 0;
  const weeklySalary = annualSalary / 52;

  const multipliers: Record<string, { low: number; high: number; label: string }> = {
    standard: { low: 1, high: 2, label: "Standard (1-2 weeks/year)" },
    generous: { low: 2, high: 4, label: "Generous (2-4 weeks/year)" },
    executive: { low: 4, high: 8, label: "Executive (4-8 weeks/year)" },
  };

  const m = multipliers[level];
  const lowWeeks = yearsWorked * m.low;
  const highWeeks = yearsWorked * m.high;
  const lowAmount = weeklySalary * lowWeeks;
  const highAmount = weeklySalary * highWeeks;

  const calculated = annualSalary > 0 && yearsWorked > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Annual Salary ($)</Label><Input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="75000" /></div>
        <div><Label>Years of Service</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="5" step="0.5" /></div>
      </div>
      <div>
        <Label>Severance Level</Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.entries(multipliers).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated Severance Range</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Low Estimate</p>
                <p className="text-2xl font-bold text-accent">${lowAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                <p className="text-sm text-muted-foreground">{lowWeeks.toFixed(1)} weeks</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">High Estimate</p>
                <p className="text-2xl font-bold text-accent">${highAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                <p className="text-sm text-muted-foreground">{highWeeks.toFixed(1)} weeks</p>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">Weekly salary:</span> ${weeklySalary.toFixed(2)}</p>
              <p><span className="font-medium">Years of service:</span> {yearsWorked}</p>
              <p><span className="font-medium">Level:</span> {m.label}</p>
            </div>
            <p className="text-xs text-muted-foreground">Severance is not legally required in most US states. These estimates reflect common industry practices. Always negotiate based on your specific situation.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
