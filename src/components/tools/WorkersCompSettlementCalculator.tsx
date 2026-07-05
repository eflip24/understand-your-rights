import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolResultAd from "@/components/tools/ToolResultAd";

// Rough national averages. State law varies widely.
const bodyPartWeeks: Record<string, { label: string; weeks: number }> = {
  back: { label: "Back / spine", weeks: 250 },
  shoulder: { label: "Shoulder", weeks: 180 },
  knee: { label: "Knee", weeks: 160 },
  hand: { label: "Hand / wrist", weeks: 190 },
  foot: { label: "Foot / ankle", weeks: 150 },
  head: { label: "Head / brain", weeks: 400 },
  other: { label: "Other body part", weeks: 150 },
};

export default function WorkersCompSettlementCalculator() {
  const [avgWeeklyWage, setAvgWeeklyWage] = useState("");
  const [impairmentPct, setImpairmentPct] = useState("");
  const [bodyPart, setBodyPart] = useState("back");
  const [medicalPaid, setMedicalPaid] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [result, setResult] = useState<{ ppd: number; total: number; low: number; high: number } | null>(null);

  const calc = () => {
    const wage = parseFloat(avgWeeklyWage) || 0;
    const imp = (parseFloat(impairmentPct) || 0) / 100;
    const compRate = wage * (2 / 3); // typical workers' comp rate = 2/3 AWW
    const weeks = bodyPartWeeks[bodyPart].weeks * imp;
    const ppd = compRate * weeks;
    const med = (parseFloat(medicalPaid) || 0) + (parseFloat(futureMedical) || 0);
    const total = ppd + med;
    setResult({
      ppd: Math.round(ppd),
      total: Math.round(total),
      low: Math.round(total * 0.8),
      high: Math.round(total * 1.25),
    });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Average weekly wage ($)</Label>
          <Input type="number" placeholder="900" value={avgWeeklyWage} onChange={(e) => setAvgWeeklyWage(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Permanent impairment rating (%)</Label>
          <Input type="number" placeholder="15" value={impairmentPct} onChange={(e) => setImpairmentPct(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Injured body part</Label>
          <Select value={bodyPart} onValueChange={setBodyPart}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(bodyPartWeeks).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Medical bills already paid ($)</Label>
          <Input type="number" placeholder="18000" value={medicalPaid} onChange={(e) => setMedicalPaid(e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Estimated future medical ($)</Label>
          <Input type="number" placeholder="10000" value={futureMedical} onChange={(e) => setFutureMedical(e.target.value)} />
        </div>
      </div>
      <Button onClick={calc} className="w-full">Estimate workers' comp settlement</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-lg">Estimated settlement range</h3>
          <p className="text-sm text-muted-foreground">Permanent partial disability (PPD) portion: {fmt(result.ppd)}</p>
          <p className="text-2xl font-bold text-accent">{fmt(result.low)} – {fmt(result.high)}</p>
          <p className="text-xs text-muted-foreground">Uses two-thirds of average weekly wage × body-part weeks × impairment rating, plus medical. State rules and caps vary. General information only — not legal advice.</p>
        </div>
      )}
      <ToolResultAd show={!!result} />
    </div>
  );
}
