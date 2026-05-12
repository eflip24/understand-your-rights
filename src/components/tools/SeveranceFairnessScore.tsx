import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SeveranceFairnessScore() {
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [level, setLevel] = useState<"entry" | "mid" | "senior" | "executive">("mid");
  const [hasHealthcare, setHasHealthcare] = useState<"no" | "yes">("no");
  const [hasOutplacement, setHasOutplacement] = useState<"no" | "yes">("no");

  const annual = parseFloat(salary) || 0;
  const y = parseFloat(years) || 0;
  const offer = parseFloat(offerAmount) || 0;

  // Benchmark: weeks per year of service by level
  const benchmarkWeeks: Record<string, number> = { entry: 1, mid: 2, senior: 3, executive: 4 };
  const expectedWeeks = y * benchmarkWeeks[level];
  const weeklySalary = annual / 52;
  const expectedAmount = weeklySalary * expectedWeeks;

  let score = 0;
  if (expectedAmount > 0) {
    const ratio = offer / expectedAmount;
    score = Math.min(100, Math.round(ratio * 70)); // 70 points come from money
  }
  if (hasHealthcare === "yes") score += 15;
  if (hasOutplacement === "yes") score += 10;
  // Tenure bonus
  if (y >= 10) score += 5;
  score = Math.min(100, Math.max(0, score));

  const verdict = score >= 85 ? { label: "Excellent", color: "text-emerald-600", advice: "Strong offer. Review the release of claims carefully before signing." }
    : score >= 65 ? { label: "Fair", color: "text-accent", advice: "Reasonable but likely room to negotiate 10–25% more, especially on healthcare or non-cash terms." }
    : score >= 45 ? { label: "Below Market", color: "text-amber-600", advice: "Counter-offer. Ask for at least the benchmark amount, plus extended healthcare and outplacement." }
    : { label: "Lowball", color: "text-destructive", advice: "Do not sign. Consult an employment attorney — especially if you have potential discrimination, retaliation, or contract claims." };

  const calculated = annual > 0 && y > 0 && offer > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Annual Salary ($)</Label><Input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="85000" /></div>
        <div><Label>Years of Service</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="5" step="0.5" /></div>
        <div><Label>Severance Offered ($)</Label><Input type="number" value={offerAmount} onChange={e => setOfferAmount(e.target.value)} placeholder="20000" /></div>
        <div>
          <Label>Your Role Level</Label>
          <Select value={level} onValueChange={(v) => setLevel(v as typeof level)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry / Junior</SelectItem>
              <SelectItem value="mid">Mid-level / Individual Contributor</SelectItem>
              <SelectItem value="senior">Senior / Manager / Director</SelectItem>
              <SelectItem value="executive">Executive / VP+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Includes Healthcare (COBRA paid)?</Label>
          <Select value={hasHealthcare} onValueChange={(v) => setHasHealthcare(v as "no" | "yes")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
          </Select>
        </div>
        <div>
          <Label>Includes Outplacement?</Label>
          <Select value={hasOutplacement} onValueChange={(v) => setHasOutplacement(v as "no" | "yes")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
          </Select>
        </div>
      </div>

      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Fairness Score</h3>
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className={`text-6xl font-bold ${verdict.color}`}>{score}</p>
              <p className="text-sm text-muted-foreground">out of 100</p>
              <p className={`text-xl font-semibold mt-2 ${verdict.color}`}>{verdict.label}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">Industry benchmark:</span> ${expectedAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })} ({benchmarkWeeks[level]} week{benchmarkWeeks[level] !== 1 ? "s" : ""}/year × {y} years)</p>
              <p><span className="font-medium">Your offer vs. benchmark:</span> {expectedAmount > 0 ? `${((offer / expectedAmount) * 100).toFixed(0)}%` : "—"}</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg text-sm">
              <p className="font-medium mb-1">Recommendation:</p>
              <p>{verdict.advice}</p>
            </div>
            <p className="text-xs text-muted-foreground">Benchmarks reflect typical US severance practice. Severance is generally not legally required. Always have an attorney review the release before signing — once signed, you usually waive the right to sue. Not legal advice.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
