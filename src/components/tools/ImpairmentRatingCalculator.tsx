import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";
import ToolResultAd from "@/components/tools/ToolResultAd";
import { ppdStates, getPpdState, DEFAULT_PPD, scheduledMembers } from "@/data/ppdRatingStates";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function ImpairmentRatingCalculator() {
  const [stateCode, setStateCode] = useState("TX");
  const [wage, setWage] = useState("");
  const [rating, setRating] = useState("");
  const [member, setMember] = useState("whole");
  const [lumpSum, setLumpSum] = useState("no");
  const [futureMedical, setFutureMedical] = useState("");

  const st = getPpdState(stateCode);
  const rules = st ?? { ...DEFAULT_PPD, code: stateCode, name: stateCode };
  const awk = parseFloat(wage) || 0;
  const pct = Math.min(100, Math.max(0, parseFloat(rating) || 0));
  const medical = parseFloat(futureMedical) || 0;

  const mem = scheduledMembers.find((m) => m.id === member)!;
  const weeksBase = mem.weeks > 0 ? mem.weeks : rules.wholePersonWeeks;
  const weeksPayable = weeksBase * (pct / 100);

  const compRate = Math.min(rules.maxWeekly, awk * rules.wageRate);
  const ppdAward = compRate * weeksPayable;
  // Lump sums are commuted, typically at a 3–4% discount applied to the tail.
  const commuted = lumpSum === "yes" ? ppdAward * 0.94 : ppdAward;
  const total = commuted + medical;
  const calc = awk > 0 && pct > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>State</Label>
          <Select value={stateCode} onValueChange={setStateCode}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ppdStates.map((s) => <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>)}
              <SelectItem value="OTHER">Other state (generic model)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Average weekly wage ($)</Label><Input type="number" value={wage} onChange={(e) => setWage(e.target.value)} placeholder="1150" /></div>
        <div><Label>Impairment rating (%)</Label><Input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="12" /></div>
        <div>
          <Label>Body part rated</Label>
          <Select value={member} onValueChange={setMember}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{scheduledMembers.map((m) => <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Settling as a lump sum?</Label>
          <Select value={lumpSum} onValueChange={setLumpSum}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No — weekly payments</SelectItem>
              <SelectItem value="yes">Yes — commuted lump sum</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Future medical / Medicare set-aside ($)</Label><Input type="number" value={futureMedical} onChange={(e) => setFutureMedical(e.target.value)} placeholder="0" /></div>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Permanent partial disability estimate</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Weekly compensation rate</p>
                <p className="text-2xl font-bold">{usd(compRate)}</p>
                <p className="text-xs text-muted-foreground mt-1">{(rules.wageRate * 100).toFixed(1)}% of AWW, capped at {usd(rules.maxWeekly)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Weeks payable</p>
                <p className="text-2xl font-bold">{weeksPayable.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">{pct}% of {weeksBase} weeks</p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Estimated settlement value</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{usd(total)}</p>
                {medical > 0 && <p className="text-xs text-muted-foreground mt-1">Includes {usd(medical)} future medical</p>}
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-2 font-medium">Component</th><th className="text-right p-2 font-medium">Amount</th></tr></thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Indemnity (PPD) award</td><td className="p-2 text-right">{usd(ppdAward)}</td></tr>
                  {lumpSum === "yes" && <tr className="border-t"><td className="p-2">Commutation discount (≈6%)</td><td className="p-2 text-right text-destructive">-{usd(ppdAward - commuted)}</td></tr>}
                  {medical > 0 && <tr className="border-t"><td className="p-2">Future medical / MSA</td><td className="p-2 text-right">{usd(medical)}</td></tr>}
                  <tr className="border-t bg-muted/50 font-bold"><td className="p-2">Total</td><td className="p-2 text-right">{usd(total)}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
              <span className="font-medium">{rules.name}:</span> {rules.note}
            </div>

            <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
              <span className="font-medium">Dispute the rating, not just the money.</span> The rating percentage — not the wage — is what moves the number most. If the treating physician's AMA Guides rating is lower than your restrictions suggest, most states let you obtain a second opinion or an independent medical examination before the award becomes final.
            </div>
          </CardContent>
        </Card>
      )}

      {calc && <ToolResultAd show />}

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-2 font-medium">State</th>
              <th className="text-right p-2 font-medium">Max weekly PPD</th>
              <th className="text-right p-2 font-medium">Whole-person weeks</th>
              <th className="text-right p-2 font-medium">Wage rate</th>
            </tr>
          </thead>
          <tbody>
            {ppdStates.map((s) => (
              <tr key={s.code} className="border-t">
                <td className="p-2">{s.name}</td>
                <td className="p-2 text-right">{usd(s.maxWeekly)}</td>
                <td className="p-2 text-right">{s.wholePersonWeeks}</td>
                <td className="p-2 text-right">{(s.wageRate * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToolRecommender topic="workers-compensation" />
    </div>
  );
}
