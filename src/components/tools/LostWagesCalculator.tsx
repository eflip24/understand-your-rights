import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";
import SettlementTaxabilityFAQ from "@/components/tools/SettlementTaxabilityFAQ";
import ToolResultAd from "@/components/tools/ToolResultAd";
import { presentValueFactor } from "@/data/wrongfulDeathStates";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

type PayType = "hourly" | "salary" | "self-employed";

export default function LostWagesCalculator() {
  const [payType, setPayType] = useState<PayType>("hourly");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [annualSalary, setAnnualSalary] = useState("");
  const [weeksMissed, setWeeksMissed] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("0");
  const [bonusLost, setBonusLost] = useState("");
  const [pipReimbursed, setPipReimbursed] = useState("");
  const [sickLeaveUsed, setSickLeaveUsed] = useState(false);

  // Future earning capacity
  const [impairmentPct, setImpairmentPct] = useState("0");
  const [yearsToRetirement, setYearsToRetirement] = useState("20");

  const rate = parseFloat(hourlyRate) || 0;
  const hpw = parseFloat(hoursPerWeek) || 0;
  const salary = parseFloat(annualSalary) || 0;
  const weeks = parseFloat(weeksMissed) || 0;
  const otHours = parseFloat(overtimeHours) || 0;
  const bonus = parseFloat(bonusLost) || 0;
  const pip = parseFloat(pipReimbursed) || 0;
  const impairment = Math.min(100, Math.max(0, parseFloat(impairmentPct) || 0));
  const years = parseFloat(yearsToRetirement) || 0;

  const weeklyBase =
    payType === "hourly" ? rate * hpw : salary / 52;
  const effectiveHourly = payType === "hourly" ? rate : salary / 2080;

  const baseLoss = weeklyBase * weeks;
  const overtimeLoss = otHours * effectiveHourly * 1.5;
  // Self-employed claimants must also prove lost business profit continuity.
  const selfEmployedAdj = payType === "self-employed" ? baseLoss * 0.15 : 0;
  const pastLoss = baseLoss + overtimeLoss + bonus + selfEmployedAdj;

  const annualEarnings = payType === "hourly" ? rate * hpw * 52 : salary;
  const futureLossRaw = annualEarnings * (impairment / 100) * years;
  const futureLossPV = annualEarnings * (impairment / 100) * presentValueFactor(years);

  const claimable = Math.max(0, pastLoss - pip);
  const totalClaim = claimable + futureLossPV;
  const calc = pastLoss > 0 || futureLossPV > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>How you are paid</Label>
          <Select value={payType} onValueChange={(v) => setPayType(v as PayType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly employee</SelectItem>
              <SelectItem value="salary">Salaried employee</SelectItem>
              <SelectItem value="self-employed">Self-employed / 1099</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {payType === "hourly" ? (
          <>
            <div><Label>Hourly rate ($)</Label><Input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="28.50" /></div>
            <div><Label>Usual hours per week</Label><Input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} /></div>
          </>
        ) : (
          <div><Label>Annual {payType === "self-employed" ? "net business income" : "salary"} ($)</Label><Input type="number" value={annualSalary} onChange={(e) => setAnnualSalary(e.target.value)} placeholder="74000" /></div>
        )}
        <div><Label>Weeks of work missed</Label><Input type="number" value={weeksMissed} onChange={(e) => setWeeksMissed(e.target.value)} placeholder="8" /></div>
        <div><Label>Overtime hours lost</Label><Input type="number" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} /></div>
        <div><Label>Lost bonus / commission ($)</Label><Input type="number" value={bonusLost} onChange={(e) => setBonusLost(e.target.value)} placeholder="0" /></div>
        <div><Label>Already paid by PIP / disability ($)</Label><Input type="number" value={pipReimbursed} onChange={(e) => setPipReimbursed(e.target.value)} placeholder="0" /></div>
        <div><Label>Permanent earning-capacity loss (%)</Label><Input type="number" value={impairmentPct} onChange={(e) => setImpairmentPct(e.target.value)} /></div>
        <div><Label>Years to retirement</Label><Input type="number" value={yearsToRetirement} onChange={(e) => setYearsToRetirement(e.target.value)} /></div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={sickLeaveUsed} onCheckedChange={(v) => setSickLeaveUsed(!!v)} />
        I used my own PTO or sick leave to cover the time off
      </label>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Lost earnings claim</h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Past lost wages</p>
                <p className="text-2xl font-bold">{usd(pastLoss)}</p>
                <p className="text-xs text-muted-foreground mt-1">{weeks} weeks at {usd(weeklyBase)}/week</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Future earning capacity (present value)</p>
                <p className="text-2xl font-bold">{usd(futureLossPV)}</p>
                <p className="text-xs text-muted-foreground mt-1">{impairment}% impairment · {years} years · discounted from {usd(futureLossRaw)}</p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Total wage claim</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{usd(totalClaim)}</p>
                {pip > 0 && <p className="text-xs text-muted-foreground mt-1">Net of {usd(pip)} already paid</p>}
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-2 font-medium">Component</th><th className="text-right p-2 font-medium">Amount</th></tr></thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Base wages missed</td><td className="p-2 text-right">{usd(baseLoss)}</td></tr>
                  <tr className="border-t"><td className="p-2">Lost overtime (1.5×)</td><td className="p-2 text-right">{usd(overtimeLoss)}</td></tr>
                  <tr className="border-t"><td className="p-2">Bonus / commission</td><td className="p-2 text-right">{usd(bonus)}</td></tr>
                  {selfEmployedAdj > 0 && <tr className="border-t"><td className="p-2">Lost business goodwill / turned-away work</td><td className="p-2 text-right">{usd(selfEmployedAdj)}</td></tr>}
                  {pip > 0 && <tr className="border-t"><td className="p-2">Less PIP / disability already paid</td><td className="p-2 text-right text-destructive">-{usd(pip)}</td></tr>}
                  <tr className="border-t"><td className="p-2">Future earning capacity (PV)</td><td className="p-2 text-right">{usd(futureLossPV)}</td></tr>
                  <tr className="border-t bg-muted/50 font-bold"><td className="p-2">Total claim</td><td className="p-2 text-right">{usd(totalClaim)}</td></tr>
                </tbody>
              </table>
            </div>

            {sickLeaveUsed && (
              <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
                <span className="font-medium">Claim your used PTO.</span> Most jurisdictions treat accrued paid leave as your property under the collateral source rule — you can usually claim the value of sick and vacation days burned because of the injury, even though you were paid.
              </div>
            )}

            {payType === "self-employed" && (
              <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
                <span className="font-medium">Proof for 1099 claimants:</span> adjusters expect two years of Schedule C returns, 1099s, invoices for the claim period, and a written statement of jobs turned down. Net profit — not gross revenue — is the recoverable figure.
              </div>
            )}

            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p className="font-medium">Documents that get lost wages paid:</p>
              <p>Employer wage-and-salary verification letter, pay stubs for 13 weeks pre-injury, W-2 or Schedule C, and a physician's out-of-work note tying each missed day to the injury.</p>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimates only. Future earning-capacity claims usually require a vocational expert and an economist. Present values use a 3% discount rate against 2% wage growth. Not legal advice.
            </p>
          </CardContent>
        </Card>
      )}

      <ToolResultAd show={!!calc} />

      <SettlementTaxabilityFAQ variant="personal-injury" className="mt-6" />
      <ToolRecommender topic="personal-injury" />
    </div>
  );
}
