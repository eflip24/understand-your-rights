import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const wageData: Record<string, { state: number; tipped: number; notes: string }> = {
  "Federal": { state: 7.25, tipped: 2.13, notes: "Federal minimum wage since 2009" },
  "Alabama": { state: 7.25, tipped: 2.13, notes: "No state minimum wage law — federal applies" },
  "Alaska": { state: 11.73, tipped: 11.73, notes: "No tip credit allowed" },
  "Arizona": { state: 14.70, tipped: 11.70, notes: "Adjusted annually for inflation" },
  "California": { state: 16.50, tipped: 16.50, notes: "No tip credit. Higher in some cities." },
  "Colorado": { state: 14.81, tipped: 11.79, notes: "Adjusted annually for inflation" },
  "Connecticut": { state: 16.35, tipped: 6.38, notes: "Increases scheduled" },
  "Delaware": { state: 13.25, tipped: 2.23, notes: "Scheduled increases" },
  "Florida": { state: 13.00, tipped: 9.98, notes: "Increasing $1/year to $15" },
  "Georgia": { state: 7.25, tipped: 2.13, notes: "State rate is $5.15, but most workers covered by federal" },
  "Hawaii": { state: 14.00, tipped: 12.75, notes: "If employee earns $7+ above minimum with tips" },
  "Idaho": { state: 7.25, tipped: 3.35, notes: "Follows federal minimum" },
  "Illinois": { state: 15.00, tipped: 9.00, notes: "Higher in Chicago" },
  "Indiana": { state: 7.25, tipped: 2.13, notes: "Follows federal minimum" },
  "Iowa": { state: 7.25, tipped: 4.35, notes: "Follows federal minimum" },
  "Kansas": { state: 7.25, tipped: 2.13, notes: "Follows federal minimum" },
  "Kentucky": { state: 7.25, tipped: 2.13, notes: "Follows federal minimum" },
  "Louisiana": { state: 7.25, tipped: 2.13, notes: "No state law — federal applies" },
  "Maine": { state: 14.65, tipped: 7.33, notes: "Adjusted annually" },
  "Maryland": { state: 15.00, tipped: 3.63, notes: "Rate varies by employer size" },
  "Massachusetts": { state: 15.00, tipped: 6.75, notes: "Tipped rate increasing annually" },
  "Michigan": { state: 10.56, tipped: 4.01, notes: "Scheduled increases" },
  "Minnesota": { state: 11.13, tipped: 11.13, notes: "No tip credit allowed" },
  "Mississippi": { state: 7.25, tipped: 2.13, notes: "No state law — federal applies" },
  "Missouri": { state: 13.75, tipped: 6.88, notes: "Adjusted annually" },
  "Montana": { state: 10.55, tipped: 10.55, notes: "No tip credit for businesses with gross sales > $110K" },
  "Nebraska": { state: 13.50, tipped: 2.13, notes: "Increasing to $15 by 2026" },
  "Nevada": { state: 12.00, tipped: 12.00, notes: "No tip credit" },
  "New Hampshire": { state: 7.25, tipped: 3.27, notes: "Follows federal" },
  "New Jersey": { state: 15.49, tipped: 5.62, notes: "Adjusted annually" },
  "New Mexico": { state: 12.00, tipped: 3.00, notes: "Higher in some cities" },
  "New York": { state: 16.00, tipped: 10.65, notes: "Higher in NYC. Varies by industry." },
  "North Carolina": { state: 7.25, tipped: 2.13, notes: "Follows federal" },
  "North Dakota": { state: 7.25, tipped: 4.86, notes: "Follows federal" },
  "Ohio": { state: 10.65, tipped: 5.35, notes: "Adjusted annually" },
  "Oklahoma": { state: 7.25, tipped: 2.13, notes: "Follows federal for employers with 10+ employees" },
  "Oregon": { state: 14.70, tipped: 14.70, notes: "No tip credit. Higher in Portland metro." },
  "Pennsylvania": { state: 7.25, tipped: 2.83, notes: "Follows federal" },
  "Rhode Island": { state: 15.00, tipped: 3.89, notes: "Increasing" },
  "South Carolina": { state: 7.25, tipped: 2.13, notes: "No state law — federal applies" },
  "South Dakota": { state: 11.60, tipped: 5.80, notes: "Adjusted annually" },
  "Tennessee": { state: 7.25, tipped: 2.13, notes: "No state law — federal applies" },
  "Texas": { state: 7.25, tipped: 2.13, notes: "Follows federal" },
  "Utah": { state: 7.25, tipped: 2.13, notes: "Follows federal" },
  "Vermont": { state: 14.01, tipped: 7.01, notes: "Adjusted annually" },
  "Virginia": { state: 12.41, tipped: 2.13, notes: "Increasing to $15" },
  "Washington": { state: 16.66, tipped: 16.66, notes: "No tip credit. Higher in Seattle." },
  "West Virginia": { state: 8.75, tipped: 2.62, notes: "For employers with 6+ employees" },
  "Wisconsin": { state: 7.25, tipped: 2.33, notes: "Follows federal" },
  "Wyoming": { state: 7.25, tipped: 2.13, notes: "Follows federal" },
  "District of Columbia": { state: 17.50, tipped: 10.00, notes: "Highest in the nation. Adjusted annually." },
};

const stateNames = Object.keys(wageData).sort();

export default function MinimumWageLookup() {
  const [state, setState] = useState("");
  const [result, setResult] = useState<{ state: number; tipped: number; notes: string; name: string } | null>(null);

  const lookup = () => {
    const data = wageData[state];
    if (data) setResult({ ...data, name: state });
  };

  return (
    <div className="space-y-4">
      <div className="max-w-sm space-y-2">
        <Label>State</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger><SelectValue placeholder="Select state..." /></SelectTrigger>
          <SelectContent>
            {stateNames.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={lookup} disabled={!state} className="bg-accent text-accent-foreground hover:bg-gold-dark">Look Up</Button>
      {result && (
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-3xl font-bold font-serif text-accent">${result.state.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Standard Minimum Wage</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-3xl font-bold font-serif">${result.tipped.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Tipped Minimum Wage</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">{result.notes}</p>
          </div>
          {result.name !== "Federal" && (
            <div className="p-3 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Federal minimum: $7.25/hr — Employers must pay the higher of state or federal.</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">⚠️ Rates are approximate and may change. Check your state's labor department for current rates. Some cities have higher local minimums.</p>
        </div>
      )}
    </div>
  );
}
