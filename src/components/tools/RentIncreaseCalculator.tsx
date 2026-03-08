import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const rentControlAreas: Record<string, { cap: number; notes: string }> = {
  "California (Statewide - AB 1482)": { cap: 10, notes: "5% + local CPI, max 10%. Applies to buildings 15+ years old." },
  "New York City": { cap: 3.25, notes: "Rent Stabilization Board sets annual increases. 2024: 3% (1-yr), 2.75% (2-yr)." },
  "San Francisco": { cap: 3.6, notes: "Based on CPI. Applies to buildings built before June 1979." },
  "Los Angeles": { cap: 4, notes: "3-4% depending on CPI. Applies to buildings built before Oct 1978." },
  "Washington DC": { cap: 8.9, notes: "CPI + 2%, max varies. Elderly tenants get CPI only." },
  "Oregon (Statewide)": { cap: 10, notes: "7% + CPI. Applies to buildings 15+ years old." },
  "No Rent Control": { cap: 0, notes: "Most US jurisdictions have no rent increase limits." },
};

export default function RentIncreaseCalculator() {
  const [currentRent, setCurrentRent] = useState("");
  const [proposedRent, setProposedRent] = useState("");
  const [area, setArea] = useState("");

  const current = parseFloat(currentRent) || 0;
  const proposed = parseFloat(proposedRent) || 0;
  const increase = current > 0 ? ((proposed - current) / current) * 100 : 0;
  const monthlyDiff = proposed - current;
  const annualDiff = monthlyDiff * 12;
  const areaData = area ? rentControlAreas[area] : null;
  const exceedsCap = areaData && areaData.cap > 0 && increase > areaData.cap;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Current Monthly Rent ($)</Label><Input type="number" value={currentRent} onChange={e => setCurrentRent(e.target.value)} placeholder="1500" /></div>
        <div><Label>Proposed Monthly Rent ($)</Label><Input type="number" value={proposedRent} onChange={e => setProposedRent(e.target.value)} placeholder="1650" /></div>
      </div>
      <div>
        <Label>Jurisdiction (optional)</Label>
        <Select value={area} onValueChange={setArea}>
          <SelectTrigger><SelectValue placeholder="Select area for rent control check" /></SelectTrigger>
          <SelectContent>{Object.keys(rentControlAreas).map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {current > 0 && proposed > 0 && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Rent Increase Analysis</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Increase</p>
                <p className={`text-2xl font-bold ${increase > 10 ? "text-destructive" : increase > 5 ? "text-amber-500" : "text-accent"}`}>{increase.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Monthly Difference</p>
                <p className="text-2xl font-bold">${monthlyDiff.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Annual Impact</p>
                <p className="text-2xl font-bold">${annualDiff.toFixed(2)}</p>
              </div>
            </div>
            {areaData && areaData.cap > 0 && (
              <div className={`p-4 rounded-lg border ${exceedsCap ? "border-destructive bg-destructive/10" : "border-accent bg-accent/10"}`}>
                <p className="font-medium">{exceedsCap ? "⚠️ May Exceed Rent Control Cap" : "✅ Within Rent Control Cap"}</p>
                <p className="text-sm mt-1">Cap: {areaData.cap}% — {areaData.notes}</p>
              </div>
            )}
            {areaData && areaData.cap === 0 && (
              <div className="p-4 rounded-lg border bg-muted">
                <p className="font-medium">No Rent Control Applies</p>
                <p className="text-sm mt-1">{areaData.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
