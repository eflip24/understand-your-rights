import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MAX_BY_STATE: Record<string, number> = {
  "California": 450, "New York": 504, "Texas": 577, "Florida": 275, "Illinois": 542,
  "Pennsylvania": 605, "Washington": 1019, "Massachusetts": 1033, "Other / National avg": 450,
};

export default function UnemploymentEstimator() {
  const [wages, setWages] = useState("");
  const [state, setState] = useState("Other / National avg");
  const [result, setResult] = useState<{ weekly: number; max: number; weeks: number } | null>(null);

  const calc = () => {
    const w = parseFloat(wages);
    const max = MAX_BY_STATE[state];
    // Most states: ~50% of weekly wage = quarterly highest / 26 ish. Approximation: annual / 52 * 0.5
    const weekly = Math.min(Math.round((w / 52) * 0.5), max);
    setResult({ weekly, max, weeks: 26 });
  };

  return (
    <div className="space-y-4">
      <div><Label>State</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{Object.keys(MAX_BY_STATE).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div><Label>Annual wages (last 12 months, $)</Label><Input type="number" value={wages} onChange={e => setWages(e.target.value)} /></div>
      <Button onClick={calc} disabled={!wages}>Estimate Benefits</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-2">
          <p className="text-3xl font-bold">${result.weekly}/week</p>
          <p className="text-sm text-muted-foreground">State maximum: ${result.max}/week. Typical duration: up to {result.weeks} weeks.</p>
          <p className="text-xs italic text-muted-foreground">Estimate only. Actual benefit calculated by your state's unemployment office using base-period wages.</p>
        </CardContent></Card>
      )}
    </div>
  );
}
