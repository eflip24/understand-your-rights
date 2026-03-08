import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function FreelanceRateCalculator() {
  const [hourly, setHourly] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("30");
  const [weeksPerYear, setWeeksPerYear] = useState("48");
  const [taxRate, setTaxRate] = useState("25");
  const [expenses, setExpenses] = useState("500");
  const [result, setResult] = useState<{ hourly: number; daily: number; weekly: number; monthly: number; annual: number; afterTax: number } | null>(null);

  const calculate = () => {
    const h = parseFloat(hourly);
    const hpw = parseFloat(hoursPerWeek);
    const wpy = parseFloat(weeksPerYear);
    const tax = parseFloat(taxRate) / 100;
    const exp = parseFloat(expenses);

    const annual = h * hpw * wpy;
    const monthly = annual / 12;
    const weekly = h * hpw;
    const daily = weekly / 5;
    const afterTax = annual * (1 - tax) - exp * 12;

    setResult({
      hourly: h,
      daily: Math.round(daily * 100) / 100,
      weekly: Math.round(weekly * 100) / 100,
      monthly: Math.round(monthly * 100) / 100,
      annual: Math.round(annual * 100) / 100,
      afterTax: Math.round(afterTax * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Hourly Rate ($)</Label>
          <Input type="number" placeholder="75" value={hourly} onChange={(e) => setHourly(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Billable Hours/Week</Label>
          <Input type="number" placeholder="30" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Working Weeks/Year</Label>
          <Input type="number" placeholder="48" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Estimated Tax Rate (%)</Label>
          <Input type="number" placeholder="25" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Monthly Expenses ($)</Label>
          <Input type="number" placeholder="500" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!hourly} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Rates
      </Button>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          {[
            { label: "Hourly", value: result.hourly },
            { label: "Daily", value: result.daily },
            { label: "Weekly", value: result.weekly },
            { label: "Monthly", value: result.monthly },
            { label: "Annual (Gross)", value: result.annual },
            { label: "Annual (Net)", value: result.afterTax },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-xl font-bold font-serif text-foreground">${item.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
