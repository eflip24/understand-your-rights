import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolResultAd from "@/components/tools/ToolResultAd";

const severityBands: Record<string, { label: string; low: number; high: number }> = {
  minor: { label: "Minor bruising / no lasting injury", low: 1.0, high: 2.0 },
  moderate: { label: "Sprains, soft-tissue, no surgery", low: 2.0, high: 3.5 },
  serious: { label: "Fracture or requires surgery", low: 3.5, high: 5.0 },
  severe: { label: "Long-term disability / TBI", low: 5.0, high: 8.0 },
};

const faultAdjust: Record<string, number> = {
  clear: 1.0,
  shared: 0.7,
  weak: 0.4,
};

export default function SlipAndFallSettlementEstimator() {
  const [medical, setMedical] = useState("");
  const [futureMed, setFutureMed] = useState("");
  const [lostWages, setLostWages] = useState("");
  const [severity, setSeverity] = useState("moderate");
  const [fault, setFault] = useState("clear");
  const [result, setResult] = useState<{ low: number; high: number; economic: number } | null>(null);

  const calc = () => {
    const econ = (parseFloat(medical) || 0) + (parseFloat(futureMed) || 0) + (parseFloat(lostWages) || 0);
    const band = severityBands[severity];
    const adj = faultAdjust[fault];
    setResult({
      economic: Math.round(econ),
      low: Math.round(econ * band.low * adj),
      high: Math.round(econ * band.high * adj),
    });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Medical bills to date ($)</Label>
          <Input type="number" placeholder="12000" value={medical} onChange={(e) => setMedical(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Estimated future medical ($)</Label>
          <Input type="number" placeholder="3000" value={futureMed} onChange={(e) => setFutureMed(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Lost wages ($)</Label>
          <Input type="number" placeholder="4500" value={lostWages} onChange={(e) => setLostWages(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Injury severity</Label>
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(severityBands).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Liability / property owner fault</Label>
          <Select value={fault} onValueChange={setFault}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="clear">Clear hazard, owner on notice</SelectItem>
              <SelectItem value="shared">Shared fault (comparative negligence)</SelectItem>
              <SelectItem value="weak">Weak liability / open & obvious</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={calc} className="w-full">Estimate slip and fall settlement</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-lg">Estimated settlement range</h3>
          <p className="text-sm text-muted-foreground">Economic damages: {fmt(result.economic)}</p>
          <p className="text-2xl font-bold text-accent">{fmt(result.low)} – {fmt(result.high)}</p>
          <p className="text-xs text-muted-foreground">Uses the multiplier method common in premises-liability claims, adjusted for comparative fault. General information only — not legal advice.</p>
        </div>
      )}
      <ToolResultAd show={!!result} />
    </div>
  );
}
