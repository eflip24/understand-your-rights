import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SalaryToHourlyConverter() {
  const [mode, setMode] = useState<"s2h" | "h2s">("s2h");
  const [salary, setSalary] = useState("");
  const [hourly, setHourly] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [benefitsPercent, setBenefitsPercent] = useState("30");
  const [result, setResult] = useState<{ hourly: number; salary: number; withBenefits: number; monthly: number; biweekly: number } | null>(null);

  const calculate = () => {
    const hpw = parseFloat(hoursPerWeek) || 40;
    const wpy = parseFloat(weeksPerYear) || 52;
    const bp = parseFloat(benefitsPercent) / 100;
    const totalHours = hpw * wpy;

    if (mode === "s2h") {
      const s = parseFloat(salary);
      const h = s / totalHours;
      const withBenefits = h * (1 + bp);
      setResult({ hourly: Math.round(h * 100) / 100, salary: s, withBenefits: Math.round(withBenefits * 100) / 100, monthly: Math.round((s / 12) * 100) / 100, biweekly: Math.round((s / 26) * 100) / 100 });
    } else {
      const h = parseFloat(hourly);
      const s = h * totalHours;
      const withBenefits = s * (1 + bp);
      setResult({ hourly: h, salary: Math.round(s * 100) / 100, withBenefits: Math.round(withBenefits * 100) / 100, monthly: Math.round((s / 12) * 100) / 100, biweekly: Math.round((s / 26) * 100) / 100 });
    }
  };

  const valid = mode === "s2h" ? !!salary : !!hourly;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant={mode === "s2h" ? "default" : "outline"} onClick={() => { setMode("s2h"); setResult(null); }}>Salary → Hourly</Button>
        <Button variant={mode === "h2s" ? "default" : "outline"} onClick={() => { setMode("h2s"); setResult(null); }}>Hourly → Salary</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {mode === "s2h" ? (
          <div className="space-y-2">
            <Label>Annual Salary ($)</Label>
            <Input type="number" placeholder="75000" value={salary} onChange={(e) => setSalary(e.target.value)} />
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Hourly Rate ($)</Label>
            <Input type="number" placeholder="36" step="0.5" value={hourly} onChange={(e) => setHourly(e.target.value)} />
          </div>
        )}
        <div className="space-y-2">
          <Label>Hours per Week</Label>
          <Input type="number" placeholder="40" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Weeks per Year</Label>
          <Input type="number" placeholder="52" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Benefits Overhead (%)</Label>
          <Input type="number" placeholder="30" value={benefitsPercent} onChange={(e) => setBenefitsPercent(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!valid} className="bg-accent text-accent-foreground hover:bg-gold-dark">Convert</Button>
      {result && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-2xl font-bold font-serif text-accent">${result.hourly.toFixed(2)}/hr</p>
            <p className="text-sm text-muted-foreground">Hourly Rate</p>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-2xl font-bold font-serif text-accent">${result.salary.toLocaleString()}/yr</p>
            <p className="text-sm text-muted-foreground">Annual Salary</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.monthly.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Monthly</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.biweekly.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Bi-weekly</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg sm:col-span-2">
            <p className="text-2xl font-bold font-serif">${result.withBenefits.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Cost with Benefits</p>
          </div>
        </div>
      )}
    </div>
  );
}
