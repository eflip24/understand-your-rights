import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

// State liability cap in months of rent (most states require landlord to mitigate; some cap penalty)
const STATE_RULES: Record<string, { capMonths: number | null; mustMitigate: boolean; note: string }> = {
  "California": { capMonths: null, mustMitigate: true, note: "Cal. Civ. Code § 1951.2 — landlord must mitigate by re-renting." },
  "New York": { capMonths: null, mustMitigate: true, note: "RPL § 227-e (2019) — landlord must mitigate; tenants no longer liable for rent after re-rental." },
  "Texas": { capMonths: null, mustMitigate: true, note: "Tex. Prop. Code § 91.006 — landlord must use reasonable efforts to re-rent." },
  "Florida": { capMonths: 2, mustMitigate: false, note: "Fla. Stat. § 83.595 — lease may include 2-month liquidated damages clause; otherwise tenant owes full balance." },
  "Illinois": { capMonths: null, mustMitigate: true, note: "735 ILCS 5/9-213.1 — landlord must mitigate." },
  "Other": { capMonths: null, mustMitigate: true, note: "Most US states require landlords to mitigate damages by re-renting." },
};

export default function LeaseBreakPenaltyCalculator() {
  const { t } = useTranslation(["tools", "common"]);
  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthsRemaining, setMonthsRemaining] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [state, setState] = useState("California");
  const [reRentTime, setReRentTime] = useState("1");
  const [hasEarlyTermClause, setHasEarlyTermClause] = useState<"no" | "yes">("no");
  const [earlyTermFee, setEarlyTermFee] = useState("");

  const rent = parseFloat(monthlyRent) || 0;
  const months = parseFloat(monthsRemaining) || 0;
  const deposit = parseFloat(securityDeposit) || 0;
  const reRent = parseFloat(reRentTime) || 0;
  const earlyFee = parseFloat(earlyTermFee) || 0;
  const rules = STATE_RULES[state];

  let lowExposure: number;
  let highExposure: number;

  if (hasEarlyTermClause === "yes" && earlyFee > 0) {
    lowExposure = earlyFee;
    highExposure = earlyFee;
  } else if (rules.capMonths !== null) {
    lowExposure = Math.min(months, rules.capMonths) * rent;
    highExposure = lowExposure;
  } else {
    // Mitigation required: low = months until re-rented + advertising; high = full remaining if no mitigation
    lowExposure = reRent * rent + 500; // re-rental fee
    highExposure = months * rent;
  }

  // Subtract security deposit (assume returned/applied)
  const lowNet = Math.max(0, lowExposure - deposit);
  const highNet = Math.max(0, highExposure - deposit);

  const calculated = rent > 0 && months > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>{t("internals.leaseBreakPenaltyCalculator.labels.monthlyRentDollar")}</Label><Input type="number" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value)} placeholder="2000" /></div>
        <div><Label>{t("internals.leaseBreakPenaltyCalculator.labels.monthsRemainingOnLease")}</Label><Input type="number" value={monthsRemaining} onChange={e => setMonthsRemaining(e.target.value)} placeholder="6" step="0.5" /></div>
        <div><Label>{t("internals.leaseBreakPenaltyCalculator.labels.securityDepositDollar")}</Label><Input type="number" value={securityDeposit} onChange={e => setSecurityDeposit(e.target.value)} placeholder="2000" /></div>
        <div>
          <Label>{t("common:fields.state")}</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(STATE_RULES).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>{t("internals.leaseBreakPenaltyCalculator.labels.estimatedMonthsToReRent")}</Label><Input type="number" value={reRentTime} onChange={e => setReRentTime(e.target.value)} step="0.5" /></div>
        <div>
          <Label>{t("internals.leaseBreakPenaltyCalculator.labels.leaseHasEarlyTerminationClause")}</Label>
          <Select value={hasEarlyTermClause} onValueChange={(v) => setHasEarlyTermClause(v as "no" | "yes")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
          </Select>
        </div>
        {hasEarlyTermClause === "yes" && (
          <div className="sm:col-span-2"><Label>{t("internals.leaseBreakPenaltyCalculator.labels.earlyTerminationFeeStatedInLease")}</Label><Input type="number" value={earlyTermFee} onChange={e => setEarlyTermFee(e.target.value)} placeholder="4000" /></div>
        )}
      </div>

      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated Penalty</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Best Case (after deposit)</p>
                <p className="text-3xl font-bold text-accent">${lowNet.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Worst Case (after deposit)</p>
                <p className="text-3xl font-bold text-accent">${highNet.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">Maximum exposure:</span> ${(months * rent).toLocaleString("en-US", { maximumFractionDigits: 0 })} (full remaining rent)</p>
              <p><span className="font-medium">State rule:</span> {rules.note}</p>
              {rules.mustMitigate && <p className="text-emerald-700 dark:text-emerald-500">✓ Landlord must mitigate — your liability ends when the unit is re-rented.</p>}
            </div>
            <p className="text-xs text-muted-foreground">Active military (SCRA), domestic violence, uninhabitable conditions, and landlord harassment may let you break a lease without penalty in many states. Always send written notice and keep records. Not legal advice.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
