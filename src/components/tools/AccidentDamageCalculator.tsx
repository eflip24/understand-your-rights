import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AccidentDamageCalculator() {
  const [medicalBills, setMedicalBills] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [propertyDamage, setPropertyDamage] = useState("");
  const [lostWages, setLostWages] = useState("");
  const [futureLostWages, setFutureLostWages] = useState("");
  const [outOfPocket, setOutOfPocket] = useState("");
  const [painSuffering, setPainSuffering] = useState("");
  const [result, setResult] = useState<{ economic: number; nonEconomic: number; total: number } | null>(null);

  const calculate = () => {
    const economic = [medicalBills, futureMedical, propertyDamage, lostWages, futureLostWages, outOfPocket]
      .reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
    const nonEconomic = parseFloat(painSuffering) || 0;
    setResult({ economic, nonEconomic, total: economic + nonEconomic });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-muted-foreground">Economic Damages</h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Medical Bills ($)</Label>
          <Input type="number" placeholder="15000" value={medicalBills} onChange={(e) => setMedicalBills(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Future Medical Costs ($)</Label>
          <Input type="number" placeholder="5000" value={futureMedical} onChange={(e) => setFutureMedical(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Property Damage ($)</Label>
          <Input type="number" placeholder="8000" value={propertyDamage} onChange={(e) => setPropertyDamage(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Lost Wages ($)</Label>
          <Input type="number" placeholder="4000" value={lostWages} onChange={(e) => setLostWages(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Future Lost Earnings ($)</Label>
          <Input type="number" placeholder="0" value={futureLostWages} onChange={(e) => setFutureLostWages(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Out-of-Pocket Expenses ($)</Label>
          <Input type="number" placeholder="500" value={outOfPocket} onChange={(e) => setOutOfPocket(e.target.value)} />
        </div>
      </div>
      <h4 className="font-medium text-sm text-muted-foreground pt-2">Non-Economic Damages</h4>
      <div className="space-y-2">
        <Label>Pain & Suffering Estimate ($)</Label>
        <Input type="number" placeholder="20000" value={painSuffering} onChange={(e) => setPainSuffering(e.target.value)} />
        <p className="text-xs text-muted-foreground">Tip: A common estimate is 1.5–5x your medical bills, depending on severity.</p>
      </div>
      <Button onClick={calculate} className="w-full">Calculate Total Damages</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="font-semibold text-lg">Damage Breakdown</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">Economic Damages</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.economic)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">Non-Economic Damages</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.nonEconomic)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-accent/10 border border-accent/30">
              <p className="text-sm text-muted-foreground">Total Damages</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.total)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">This is an estimate for informational purposes only. Actual recoverable damages depend on fault, insurance limits, and jurisdiction.</p>
        </div>
      )}
    </div>
  );
}