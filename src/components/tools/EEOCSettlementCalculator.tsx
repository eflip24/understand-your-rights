import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolResultAd from "@/components/tools/ToolResultAd";

// Title VII compensatory + punitive damages caps by employer size (2026 figures)
const capBySize: Record<string, { label: string; cap: number }> = {
  s15_100: { label: "15–100 employees", cap: 50000 },
  s101_200: { label: "101–200 employees", cap: 100000 },
  s201_500: { label: "201–500 employees", cap: 200000 },
  s500plus: { label: "Over 500 employees", cap: 300000 },
};

const claimStrength: Record<string, { label: string; low: number; high: number }> = {
  weak: { label: "Weak — mostly anecdotal", low: 0.15, high: 0.35 },
  moderate: { label: "Moderate — some documentation", low: 0.35, high: 0.6 },
  strong: { label: "Strong — clear paper trail / witnesses", low: 0.55, high: 0.85 },
};

export default function EEOCSettlementCalculator() {
  const [annualWage, setAnnualWage] = useState("");
  const [monthsOut, setMonthsOut] = useState("");
  const [medical, setMedical] = useState("");
  const [size, setSize] = useState("s201_500");
  const [strength, setStrength] = useState("moderate");
  const [result, setResult] = useState<{ backPay: number; compLow: number; compHigh: number; low: number; high: number } | null>(null);

  const calc = () => {
    const wage = parseFloat(annualWage) || 0;
    const months = parseFloat(monthsOut) || 0;
    const med = parseFloat(medical) || 0;
    const backPay = (wage / 12) * months;
    const cap = capBySize[size].cap;
    const s = claimStrength[strength];
    const compLow = Math.min(cap, wage * s.low + med);
    const compHigh = Math.min(cap, wage * s.high + med);
    setResult({
      backPay: Math.round(backPay),
      compLow: Math.round(compLow),
      compHigh: Math.round(compHigh),
      low: Math.round(backPay + compLow),
      high: Math.round(backPay + compHigh),
    });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Annual wage / salary ($)</Label>
          <Input type="number" placeholder="65000" value={annualWage} onChange={(e) => setAnnualWage(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Months out of work / underpaid</Label>
          <Input type="number" placeholder="6" value={monthsOut} onChange={(e) => setMonthsOut(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Medical / therapy costs ($)</Label>
          <Input type="number" placeholder="2500" value={medical} onChange={(e) => setMedical(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Employer size</Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(capBySize).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Strength of your EEOC claim</Label>
          <Select value={strength} onValueChange={setStrength}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(claimStrength).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={calc} className="w-full">Estimate EEOC settlement value</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-lg">Estimated EEOC settlement range</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between"><span>Back pay</span><span className="font-medium text-foreground">{fmt(result.backPay)}</span></div>
            <div className="flex justify-between"><span>Compensatory + punitive (capped at {fmt(capBySize[size].cap)})</span><span className="font-medium text-foreground">{fmt(result.compLow)} – {fmt(result.compHigh)}</span></div>
          </div>
          <p className="text-2xl font-bold text-accent pt-2">{fmt(result.low)} – {fmt(result.high)}</p>
          <p className="text-xs text-muted-foreground">Title VII caps combined compensatory and punitive damages by employer size; back pay is not capped. Estimates only — not legal advice.</p>
        </div>
      )}
      <ToolResultAd show={!!result} />
    </div>
  );
}
