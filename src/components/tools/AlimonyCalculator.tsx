import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Simplified state alimony formulas. Many states give judges full discretion;
// where formulas exist (or commonly used by judges), we apply them.
const STATE_FORMULAS: Record<string, { factor: number; durationPct: number; note: string }> = {
  "California": { factor: 0.40, durationPct: 0.50, note: "CA Fam. Code § 4320 — temporary support often = 40% of higher earner minus 50% of lower earner. Long-term is judicial discretion." },
  "New York": { factor: 0.30, durationPct: 0.40, note: "N.Y. Dom. Rel. Law § 236(B)(6) — formula based on income up to $228,000 income cap." },
  "Texas": { factor: 0.20, durationPct: 0.30, note: "Tex. Fam. Code § 8.055 — capped at lesser of $5,000/mo or 20% of payer's gross income." },
  "Florida": { factor: 0.30, durationPct: 0.50, note: "Fla. Stat. § 61.08 — 2023 reforms eliminated permanent alimony; durational caps apply." },
  "Illinois": { factor: 0.333, durationPct: 0.50, note: "750 ILCS 5/504 — 33.3% of payer income minus 25% of recipient income; capped at 40% combined." },
  "Other": { factor: 0.30, durationPct: 0.40, note: "Most states use a similar income-difference formula. Check your state for precision." },
};

export default function AlimonyCalculator() {
  const [higherIncome, setHigherIncome] = useState("");
  const [lowerIncome, setLowerIncome] = useState("");
  const [years, setYears] = useState("");
  const [state, setState] = useState("California");

  const hi = parseFloat(higherIncome) || 0;
  const li = parseFloat(lowerIncome) || 0;
  const y = parseFloat(years) || 0;
  const data = STATE_FORMULAS[state];

  const diff = Math.max(0, hi - li);
  const monthlyAlimony = (diff * data.factor) / 12;
  const durationYears = y * data.durationPct;
  const indefinite = y >= 20 && state !== "Florida" && state !== "Texas";

  const calculated = hi > 0 && y > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Higher Earner Annual Income ($)</Label><Input type="number" value={higherIncome} onChange={e => setHigherIncome(e.target.value)} placeholder="120000" /></div>
        <div><Label>Lower Earner Annual Income ($)</Label><Input type="number" value={lowerIncome} onChange={e => setLowerIncome(e.target.value)} placeholder="40000" /></div>
        <div><Label>Length of Marriage (years)</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="10" step="0.5" /></div>
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(STATE_FORMULAS).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>

      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated Alimony</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Monthly Amount</p>
                <p className="text-3xl font-bold text-accent">${monthlyAlimony.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Likely Duration</p>
                <p className="text-3xl font-bold text-accent">{indefinite ? "Long-term" : `${durationYears.toFixed(1)} yrs`}</p>
                {indefinite && <p className="text-xs text-muted-foreground">(20+ year marriage)</p>}
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-1">State guideline:</p>
              <p className="text-muted-foreground">{data.note}</p>
            </div>
            <p className="text-xs text-muted-foreground">Alimony is highly discretionary. Judges weigh standard of living, age, health, contributions to the marriage, and earning capacity. This is an estimate only — not legal advice.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
