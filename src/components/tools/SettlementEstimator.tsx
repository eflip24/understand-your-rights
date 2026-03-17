import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const injuryMultipliers: Record<string, { label: string; low: number; high: number }> = {
  minor: { label: "Minor (sprains, bruises)", low: 1.5, high: 3 },
  moderate: { label: "Moderate (fractures, whiplash)", low: 2, high: 4 },
  severe: { label: "Severe (TBI, spinal cord)", low: 4, high: 6 },
  catastrophic: { label: "Catastrophic (paralysis, amputation)", low: 5, high: 10 },
};

export default function SettlementEstimator() {
  const [medicalBills, setMedicalBills] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [lostWages, setLostWages] = useState("");
  const [futureLostWages, setFutureLostWages] = useState("");
  const [propertyDamage, setPropertyDamage] = useState("");
  const [injurySeverity, setInjurySeverity] = useState("moderate");
  const [result, setResult] = useState<{ lowEstimate: number; highEstimate: number; economicDamages: number } | null>(null);

  const calculate = () => {
    const med = parseFloat(medicalBills) || 0;
    const futMed = parseFloat(futureMedical) || 0;
    const wages = parseFloat(lostWages) || 0;
    const futWages = parseFloat(futureLostWages) || 0;
    const prop = parseFloat(propertyDamage) || 0;
    const economicDamages = med + futMed + wages + futWages + prop;
    const mult = injuryMultipliers[injurySeverity];
    setResult({
      economicDamages: Math.round(economicDamages),
      lowEstimate: Math.round(economicDamages * mult.low),
      highEstimate: Math.round(economicDamages * mult.high),
    });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Medical Bills to Date ($)</Label>
          <Input type="number" placeholder="15000" value={medicalBills} onChange={(e) => setMedicalBills(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Estimated Future Medical ($)</Label>
          <Input type="number" placeholder="5000" value={futureMedical} onChange={(e) => setFutureMedical(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Lost Wages to Date ($)</Label>
          <Input type="number" placeholder="8000" value={lostWages} onChange={(e) => setLostWages(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Future Lost Earning Capacity ($)</Label>
          <Input type="number" placeholder="0" value={futureLostWages} onChange={(e) => setFutureLostWages(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Property Damage ($)</Label>
          <Input type="number" placeholder="5000" value={propertyDamage} onChange={(e) => setPropertyDamage(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Injury Severity</Label>
          <Select value={injurySeverity} onValueChange={setInjurySeverity}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(injuryMultipliers).map(([key, val]) => (
                <SelectItem key={key} value={key}>{val.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={calculate} className="w-full">Estimate Settlement Value</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="font-semibold text-lg">Estimated Settlement Range</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">Economic Damages</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.economicDamages)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">Low Estimate</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.lowEstimate)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">High Estimate</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.highEstimate)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Uses the multiplier method ({injuryMultipliers[injurySeverity].low}x–{injuryMultipliers[injurySeverity].high}x). Actual settlements depend on many factors. This is not legal advice.</p>
        </div>
      )}
    </div>
  );
}