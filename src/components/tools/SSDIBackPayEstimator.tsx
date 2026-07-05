import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";

// 2024 SSI federal max
const SSI_FED_MAX_2024 = 943;
// Max attorney fee under SSA fee agreement (2024): $7,200 cap; 25%
const SSA_FEE_CAP = 7200;
const SSA_FEE_PCT = 0.25;

type ClaimType = "ssdi" | "ssi" | "concurrent";

export default function SSDIBackPayEstimator() {
  const [claimType, setClaimType] = useState<ClaimType>("ssdi");
  const [monthlyBenefit, setMonthlyBenefit] = useState("");
  const [onsetDate, setOnsetDate] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [approvalDate, setApprovalDate] = useState("");
  const [hasAttorney, setHasAttorney] = useState<"yes" | "no">("yes");

  const monthly = parseFloat(monthlyBenefit) || 0;
  const onset = onsetDate ? new Date(onsetDate) : null;
  const app = applicationDate ? new Date(applicationDate) : null;
  const approval = approvalDate ? new Date(approvalDate) : null;

  const calc = monthly > 0 && onset && app && approval;

  let ssdiBackpay = 0;
  let retroactivePay = 0;
  let waitingPeriodExplanation = "";
  let ssiBackpay = 0;

  if (calc) {
    // SSDI: 5-month waiting period from EOD, up to 12 months retroactive before application
    // Total = months from (later of EOD+5mo, app-12mo) to approval
    const monthsBetween = (d1: Date, d2: Date) => {
      return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
    };

    if (claimType === "ssdi" || claimType === "concurrent") {
      const eligibleStart = new Date(onset);
      eligibleStart.setMonth(eligibleStart.getMonth() + 5); // 5-month waiting period

      const retroCutoff = new Date(app);
      retroCutoff.setMonth(retroCutoff.getMonth() - 12); // max 12 mo retroactive

      const effectiveStart = eligibleStart > retroCutoff ? eligibleStart : retroCutoff;
      const totalMonths = Math.max(0, monthsBetween(effectiveStart, approval));
      const retroMonths = Math.max(0, monthsBetween(retroCutoff, app));
      const preAppMonths = Math.max(0, monthsBetween(effectiveStart, app));

      retroactivePay = Math.min(preAppMonths, 12) * monthly;
      ssdiBackpay = totalMonths * monthly;
      waitingPeriodExplanation = `SSDI applies a mandatory 5-month waiting period from your Established Onset Date. Retroactive pay is capped at 12 months before the application date.`;
    }

    if (claimType === "ssi" || claimType === "concurrent") {
      // SSI: no waiting period, but no retroactive before application date
      const ssiStart = app > onset ? app : app; // benefits from application month
      const ssiMonths = Math.max(0, monthsBetween(ssiStart, approval));
      const ssiMonthly = claimType === "concurrent" ? Math.max(0, SSI_FED_MAX_2024 - monthly) : SSI_FED_MAX_2024;
      ssiBackpay = ssiMonths * ssiMonthly;
    }
  }

  const totalBackpay = ssdiBackpay + ssiBackpay;
  const attorneyFee = hasAttorney === "yes" ? Math.min(totalBackpay * SSA_FEE_PCT, SSA_FEE_CAP) : 0;
  const netToClient = totalBackpay - attorneyFee;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Claim Type</Label>
          <Select value={claimType} onValueChange={(v) => setClaimType(v as ClaimType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ssdi">SSDI only</SelectItem>
              <SelectItem value="ssi">SSI only</SelectItem>
              <SelectItem value="concurrent">Both (concurrent)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Estimated Monthly SSDI Benefit ($)</Label>
          <Input type="number" value={monthlyBenefit} onChange={e => setMonthlyBenefit(e.target.value)} placeholder="1500" />
        </div>
        <div>
          <Label>Established Onset Date (when disability began)</Label>
          <Input type="date" value={onsetDate} onChange={e => setOnsetDate(e.target.value)} />
        </div>
        <div>
          <Label>Application Filing Date</Label>
          <Input type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} />
        </div>
        <div>
          <Label>Approval / Award Date</Label>
          <Input type="date" value={approvalDate} onChange={e => setApprovalDate(e.target.value)} />
        </div>
        <div>
          <Label>Represented by attorney/rep?</Label>
          <Select value={hasAttorney} onValueChange={(v) => setHasAttorney(v as "yes" | "no")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
          </Select>
        </div>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Back Pay Estimate</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {(claimType === "ssdi" || claimType === "concurrent") && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">SSDI Back Pay</p>
                  <p className="text-2xl font-bold text-accent">${ssdiBackpay.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">Includes up to 12 mo retroactive: ${retroactivePay.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                </div>
              )}
              {(claimType === "ssi" || claimType === "concurrent") && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">SSI Back Pay</p>
                  <p className="text-2xl font-bold text-accent">${ssiBackpay.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">Paid in up to 3 installments if over 3× fed max ({(3 * SSI_FED_MAX_2024).toLocaleString()}).</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <div className="flex justify-between text-sm"><span>Gross back pay</span><span className="font-medium">${totalBackpay.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-sm"><span>Attorney fee (25% up to $7,200 cap)</span><span className="text-destructive">-${attorneyFee.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span></div>
              <div className="border-t pt-2 flex justify-between font-bold"><span>Net to you</span><span className="text-emerald-700 dark:text-emerald-500">${netToClient.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span></div>
            </div>

            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p>{waitingPeriodExplanation}</p>
              <p><span className="font-medium">Timeline reality:</span> Initial decisions take 6-8 months; denials + hearing wait ~15 months, meaning most awards include 18-30 months of back pay.</p>
              <p><span className="font-medium">Tax note:</span> SSDI back pay may be partially taxable if your combined income exceeds $25k (single) / $32k (joint). SSI is not taxable.</p>
              <p><span className="font-medium">Medicare:</span> SSDI recipients qualify for Medicare 24 months after entitlement (i.e., waiting-period end).</p>
            </div>

            <p className="text-xs text-muted-foreground">Approximation only. Actual PIA depends on your earnings record; SSA calculates the precise amount. Not legal or financial advice.</p>
          </CardContent>
        </Card>
      )}

      <ToolRecommender topic="workers-compensation" />
    </div>
  );
}
