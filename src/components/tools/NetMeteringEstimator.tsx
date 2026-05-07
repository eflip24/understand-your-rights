import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function NetMeteringEstimator() {
  const [systemKw, setSystemKw] = useState("");
  const [sunHours, setSunHours] = useState("4.5");
  const [usage, setUsage] = useState("");
  const [rate, setRate] = useState("0.15");
  const [exportRate, setExportRate] = useState("0.10");
  const [result, setResult] = useState<{ produced: number; exported: number; savings: number; credits: number } | null>(null);

  const calc = () => {
    const produced = parseFloat(systemKw) * parseFloat(sunHours) * 365;
    const used = parseFloat(usage) * 12;
    const exported = Math.max(produced - used, 0);
    const offsetSavings = Math.min(produced, used) * parseFloat(rate);
    const exportCredits = exported * parseFloat(exportRate);
    setResult({ produced: Math.round(produced), exported: Math.round(exported), savings: Math.round(offsetSavings), credits: Math.round(exportCredits) });
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>System size (kW)</Label><Input type="number" value={systemKw} onChange={e => setSystemKw(e.target.value)} /></div>
        <div><Label>Avg sun hours/day</Label><Input type="number" step="0.1" value={sunHours} onChange={e => setSunHours(e.target.value)} /></div>
        <div><Label>Monthly usage (kWh)</Label><Input type="number" value={usage} onChange={e => setUsage(e.target.value)} /></div>
        <div><Label>Retail rate ($/kWh)</Label><Input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} /></div>
        <div><Label>Export rate ($/kWh)</Label><Input type="number" step="0.01" value={exportRate} onChange={e => setExportRate(e.target.value)} /></div>
      </div>
      <Button onClick={calc} disabled={!systemKw || !usage}>Estimate Savings</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-2">
          <p className="text-3xl font-bold">${(result.savings + result.credits).toLocaleString()}/year</p>
          <p className="text-sm text-muted-foreground">Annual savings + credits</p>
          <p className="text-sm">Produced: {result.produced.toLocaleString()} kWh • Exported: {result.exported.toLocaleString()} kWh</p>
          <p className="text-xs italic text-muted-foreground">Net metering policies vary by utility. Some states use net billing (lower export rate) instead of full retail credit.</p>
        </CardContent></Card>
      )}
    </div>
  );
}
