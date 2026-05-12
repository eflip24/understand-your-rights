import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Simplified state guideline percentages of combined parent income per # of children.
// Sources: published state child support guidelines (income shares / Melson / percentage models).
const STATE_RATES: Record<string, { model: string; pct: number[]; note: string }> = {
  "California": { model: "Income Shares", pct: [0.20, 0.27, 0.32, 0.36, 0.40], note: "CA Fam. Code § 4055 — guideline formula varies by custody time-share." },
  "New York": { model: "Percentage of Income", pct: [0.17, 0.25, 0.29, 0.31, 0.35], note: "N.Y. Dom. Rel. Law § 240(1-b)." },
  "Texas": { model: "Percentage of Income (Obligor only)", pct: [0.20, 0.25, 0.30, 0.35, 0.40], note: "Tex. Fam. Code § 154.125 — based on obligor net income." },
  "Florida": { model: "Income Shares", pct: [0.20, 0.28, 0.32, 0.36, 0.40], note: "Fla. Stat. § 61.30." },
  "Illinois": { model: "Income Shares", pct: [0.20, 0.28, 0.32, 0.40, 0.45], note: "750 ILCS 5/505." },
  "Other": { model: "Income Shares (estimate)", pct: [0.20, 0.27, 0.32, 0.36, 0.40], note: "Most states use a similar income-shares model — check your state for precision." },
};

export default function ChildSupportCalculator() {
  const [yourIncome, setYourIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [children, setChildren] = useState("1");
  const [state, setState] = useState("California");
  const [role, setRole] = useState<"obligor" | "recipient">("obligor");

  const yi = parseFloat(yourIncome) || 0;
  const oi = parseFloat(otherIncome) || 0;
  const n = Math.max(1, Math.min(5, parseInt(children) || 1));
  const data = STATE_RATES[state];
  const pct = data.pct[n - 1];

  let monthlyObligation = 0;
  if (state === "Texas") {
    // Obligor-income only
    const obligorIncome = role === "obligor" ? yi : oi;
    monthlyObligation = (obligorIncome * pct) / 12;
  } else {
    const combined = yi + oi;
    const totalSupport = (combined * pct) / 12;
    const obligorIncome = role === "obligor" ? yi : oi;
    const share = combined > 0 ? obligorIncome / combined : 0;
    monthlyObligation = totalSupport * share;
  }

  const calculated = yi > 0 || oi > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Your Annual Income ($)</Label><Input type="number" value={yourIncome} onChange={e => setYourIncome(e.target.value)} placeholder="60000" /></div>
        <div><Label>Other Parent's Annual Income ($)</Label><Input type="number" value={otherIncome} onChange={e => setOtherIncome(e.target.value)} placeholder="50000" /></div>
        <div>
          <Label>Number of Children</Label>
          <Select value={children} onValueChange={setChildren}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{[1,2,3,4,5].map(i => <SelectItem key={i} value={String(i)}>{i}{i===5?"+":""}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(STATE_RATES).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>Your Role</Label>
          <Select value={role} onValueChange={(v) => setRole(v as "obligor" | "recipient")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="obligor">I will pay support (non-custodial)</SelectItem>
              <SelectItem value="recipient">I will receive support (custodial)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated Monthly Child Support</h3>
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">{role === "obligor" ? "You would pay" : "You would receive"}</p>
              <p className="text-4xl font-bold text-accent">${monthlyObligation.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">Model:</span> {data.model}</p>
              <p><span className="font-medium">Guideline %:</span> {(pct * 100).toFixed(0)}% of combined income for {n} child{n > 1 ? "ren" : ""}</p>
              <p><span className="font-medium">Statute:</span> {data.note}</p>
            </div>
            <p className="text-xs text-muted-foreground">This is a baseline estimate. Final orders depend on custody time, healthcare costs, childcare, and judicial discretion. Not legal advice — consult a family law attorney for your specific situation.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
