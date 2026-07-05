import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const offenseTiers: Record<string, { label: string; attorneyLow: number; attorneyHigh: number; fines: number; other: number }> = {
  first: { label: "1st offense DUI/DWI", attorneyLow: 1500, attorneyHigh: 5000, fines: 1200, other: 2500 },
  second: { label: "2nd offense", attorneyLow: 3000, attorneyHigh: 10000, fines: 2500, other: 5000 },
  felony: { label: "Felony / injury DUI", attorneyLow: 8000, attorneyHigh: 25000, fines: 5000, other: 8000 },
};

export default function DUICostEstimator() {
  const [tier, setTier] = useState("first");
  const [contested, setContested] = useState(false);
  const [ignition, setIgnition] = useState(true);
  const [insurance, setInsurance] = useState(true);
  const [state, setState] = useState("");
  const [result, setResult] = useState<{ low: number; high: number; breakdown: { label: string; value: string }[] } | null>(null);

  const calc = () => {
    const t = offenseTiers[tier];
    const trialMult = contested ? 1.8 : 1.0;
    const attorneyLow = t.attorneyLow * trialMult;
    const attorneyHigh = t.attorneyHigh * trialMult;
    const iid = ignition ? 1200 : 0; // ignition interlock ~$1,000-$1,500/yr
    const insuranceHike = insurance ? 4500 : 0; // 3-yr SR-22 avg increase
    const low = attorneyLow + t.fines + t.other + iid + insuranceHike;
    const high = attorneyHigh + t.fines + t.other + iid + insuranceHike;
    const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    setResult({
      low: Math.round(low),
      high: Math.round(high),
      breakdown: [
        { label: `DUI lawyer cost${contested ? " (trial)" : ""}`, value: `${fmt(attorneyLow)} – ${fmt(attorneyHigh)}` },
        { label: "Court fines & fees", value: fmt(t.fines) },
        { label: "Classes, probation, license reinstatement", value: fmt(t.other) },
        { label: "Ignition interlock device (1 yr)", value: fmt(iid) },
        { label: "Insurance increase / SR-22 (3 yr)", value: fmt(insuranceHike) },
      ],
    });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label>Offense</Label>
          <Select value={tier} onValueChange={setTier}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(offenseTiers).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>State (optional)</Label>
          <Input placeholder="e.g. California" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="space-y-2 flex flex-col justify-end">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={contested} onCheckedChange={(v) => setContested(v === true)} />
            Case will go to trial / be contested
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={ignition} onCheckedChange={(v) => setIgnition(v === true)} />
            Ignition interlock required
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={insurance} onCheckedChange={(v) => setInsurance(v === true)} />
            Include SR-22 / insurance impact
          </label>
        </div>
      </div>
      <Button onClick={calc} className="w-full">Estimate DUI lawyer cost & total</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="font-semibold text-lg">Estimated total cost{state ? ` (${state})` : ""}</h3>
          <p className="text-2xl font-bold text-accent">{fmt(result.low)} – {fmt(result.high)}</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {result.breakdown.map((b) => (
              <li key={b.label} className="flex justify-between gap-4"><span>{b.label}</span><span className="font-medium text-foreground">{b.value}</span></li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">Ranges reflect typical US costs. Actual DUI lawyer cost varies by state, jurisdiction, and case complexity. General information only — not legal advice.</p>
        </div>
      )}
    </div>
  );
}
