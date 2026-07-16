import ToolRecommender from "@/components/tools/ToolRecommender";
import SettlementTaxabilityFAQ from "@/components/tools/SettlementTaxabilityFAQ";
import MultiStepWizard, { type WizardStep } from "@/components/tools/MultiStepWizard";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertTriangle, TrendingDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import ToolResultAd from "@/components/tools/ToolResultAd";

/**
 * Day 8 — 5-screen wizard wrapper around the existing SettlementEstimator
 * logic. Same math, same output; the form is split across steps so users
 * spend meaningfully more time on the page (Google engagement signal +
 * gives the contextual entity block time to be crawled/rendered).
 *
 * Steps: Medical → Wages/Property → Pain & Suffering → Adjustments → Fees → Results.
 */

const injuryMultipliers: Record<string, { label: string; low: number; high: number; desc: string }> = {
  minor: { label: "Minor — soft tissue", low: 1.5, high: 3, desc: "Sprains, bruises, minor whiplash. Full recovery in weeks." },
  moderate: { label: "Moderate — fractures", low: 2.5, high: 4, desc: "Broken bones, deep lacerations, months of recovery." },
  severe: { label: "Severe — surgery required", low: 4, high: 6, desc: "Surgical repair, TBI, herniated disc, permanent limitations." },
  catastrophic: { label: "Catastrophic — permanent", low: 5, high: 10, desc: "Paralysis, amputation, severe TBI, wrongful death." },
};

const perDiemFactor = { low: 1, high: 3 };

const feePresets: Record<string, { label: string; rate: number }> = {
  standard: { label: "Standard (pre-trial 33%)", rate: 0.3333 },
  litigation: { label: "Litigation filed (40%)", rate: 0.4 },
  trial: { label: "Trial (45%)", rate: 0.45 },
};

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function SettlementEstimatorWizard() {
  const [medicalBills, setMedicalBills] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [lostWages, setLostWages] = useState("");
  const [futureLostWages, setFutureLostWages] = useState("");
  const [propertyDamage, setPropertyDamage] = useState("");
  const [injurySeverity, setInjurySeverity] = useState("moderate");
  const [method, setMethod] = useState<"multiplier" | "perdiem">("multiplier");
  const [dailyWage, setDailyWage] = useState("");
  const [recoveryDays, setRecoveryDays] = useState("");
  const [faultPct, setFaultPct] = useState("0");
  const [policyLimit, setPolicyLimit] = useState("");
  const [feePreset, setFeePreset] = useState("standard");
  const [caseCosts, setCaseCosts] = useState("");
  const [liens, setLiens] = useState("");

  const result = useMemo(() => {
    const med = parseFloat(medicalBills) || 0;
    const futMed = parseFloat(futureMedical) || 0;
    const wages = parseFloat(lostWages) || 0;
    const futWages = parseFloat(futureLostWages) || 0;
    const prop = parseFloat(propertyDamage) || 0;
    const economic = med + futMed + wages + futWages + prop;

    let painLow = 0;
    let painHigh = 0;
    if (method === "multiplier") {
      const m = injuryMultipliers[injurySeverity];
      const base = med + futMed;
      painLow = base * m.low;
      painHigh = base * m.high;
    } else {
      const wage = parseFloat(dailyWage) || 0;
      const days = parseFloat(recoveryDays) || 0;
      painLow = wage * days * perDiemFactor.low;
      painHigh = wage * days * perDiemFactor.high;
    }

    const grossLow = economic + painLow;
    const grossHigh = economic + painHigh;
    const fault = Math.min(Math.max(parseFloat(faultPct) || 0, 0), 100) / 100;
    const afterFaultLow = grossLow * (1 - fault);
    const afterFaultHigh = grossHigh * (1 - fault);
    const limit = parseFloat(policyLimit) || Infinity;
    const cappedLow = Math.min(afterFaultLow, limit);
    const cappedHigh = Math.min(afterFaultHigh, limit);
    const cappedByLimit = afterFaultHigh > limit && limit !== Infinity;
    const feeRate = feePresets[feePreset].rate;
    const costs = parseFloat(caseCosts) || 0;
    const lienAmt = parseFloat(liens) || 0;
    const netLow = Math.max(0, cappedLow - cappedLow * feeRate - costs - lienAmt);
    const netHigh = Math.max(0, cappedHigh - cappedHigh * feeRate - costs - lienAmt);

    return {
      economic, painLow, painHigh, grossLow, grossHigh,
      afterFaultLow, afterFaultHigh, cappedLow, cappedHigh, cappedByLimit,
      feeLow: cappedLow * feeRate, feeHigh: cappedHigh * feeRate,
      netLow, netHigh,
      valid: economic > 0 || painLow > 0,
    };
  }, [medicalBills, futureMedical, lostWages, futureLostWages, propertyDamage, injurySeverity, method, dailyWage, recoveryDays, faultPct, policyLimit, feePreset, caseCosts, liens]);

  const steps: WizardStep[] = [
    {
      label: "Medical",
      title: "Medical bills",
      description: "Start with what your injuries have cost — this drives most of the settlement math.",
      canAdvance: () => (parseFloat(medicalBills) || 0) + (parseFloat(futureMedical) || 0) > 0,
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Medical bills to date" v={medicalBills} set={setMedicalBills} placeholder="15000" />
          <Field label="Estimated future medical" v={futureMedical} set={setFutureMedical} placeholder="5000" />
        </div>
      ),
    },
    {
      label: "Wages & property",
      title: "Lost wages & property damage",
      description: "Wages you missed and property (vehicle, phone, etc.) count as economic damages.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Lost wages to date" v={lostWages} set={setLostWages} placeholder="8000" />
          <Field label="Future lost earning capacity" v={futureLostWages} set={setFutureLostWages} placeholder="0" />
          <Field label="Property damage (vehicle etc.)" v={propertyDamage} set={setPropertyDamage} placeholder="5000" />
        </div>
      ),
    },
    {
      label: "Pain & suffering",
      title: "Pain & suffering (non-economic)",
      description: "Adjusters use one of two methods to value non-economic damages. Pick whichever fits your case.",
      content: (
        <Tabs value={method} onValueChange={(v) => setMethod(v as "multiplier" | "perdiem")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="multiplier">Multiplier method</TabsTrigger>
            <TabsTrigger value="perdiem">Per-diem method</TabsTrigger>
          </TabsList>
          <TabsContent value="multiplier" className="space-y-3 pt-4">
            <div className="space-y-2">
              <Label>Injury severity</Label>
              <Select value={injurySeverity} onValueChange={setInjurySeverity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(injuryMultipliers).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label} — {v.low}×–{v.high}×</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{injuryMultipliers[injurySeverity].desc}</p>
            </div>
          </TabsContent>
          <TabsContent value="perdiem" className="grid gap-4 sm:grid-cols-2 pt-4">
            <Field label="Your daily wage ($)" v={dailyWage} set={setDailyWage} placeholder="200" />
            <Field label="Days affected by injury" v={recoveryDays} set={setRecoveryDays} placeholder="180" />
            <p className="text-xs text-muted-foreground sm:col-span-2">Adjusters typically value pain &amp; suffering at 1×–3× your daily wage per day of recovery.</p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      label: "Adjustments",
      title: "Real-world adjustments",
      description: "Comparative negligence and the defendant's insurance policy limit cap what you can actually collect.",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Your share of fault (%)</Label>
            <Input type="number" min="0" max="100" value={faultPct} onChange={(e) => setFaultPct(e.target.value)} placeholder="0" />
            <p className="text-xs text-muted-foreground">Most states reduce your recovery by your % of fault. In AL/MD/NC/VA/DC any fault = zero recovery.</p>
          </div>
          <Field label="Defendant's policy limit ($) — optional" v={policyLimit} set={setPolicyLimit} placeholder="100000" />
        </div>
      ),
    },
    {
      label: "Fees",
      title: "Attorney fees, costs, and liens",
      description: "Contingency fees, case costs, and medical liens come out of the gross settlement before you see a check.",
      content: (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Contingency fee</Label>
            <Select value={feePreset} onValueChange={setFeePreset}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(feePresets).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Field label="Case costs (filing, experts)" v={caseCosts} set={setCaseCosts} placeholder="3500" />
          <Field label="Medical liens (health ins., Medicare)" v={liens} set={setLiens} placeholder="4000" />
        </div>
      ),
    },
  ];

  const finalContent = (
    <div className="space-y-4">
      {result.valid ? (
        <>
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-lg">Estimated settlement range</h3>
            <Badge variant="secondary" className="text-xs">Educational estimate</Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatRow label="Economic damages" v={fmt(result.economic)} />
            <StatRow label="Pain & suffering" v={`${fmt(result.painLow)} – ${fmt(result.painHigh)}`} />
            <StatRow label="Gross claim value" v={`${fmt(result.grossLow)} – ${fmt(result.grossHigh)}`} primary />
          </div>

          {parseFloat(faultPct) > 0 && (
            <div className="p-3 rounded-lg bg-background border flex items-start gap-2">
              <TrendingDown className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">After {faultPct}% comparative fault:</p>
                <p className="text-sm">{fmt(result.afterFaultLow)} – {fmt(result.afterFaultHigh)}</p>
              </div>
            </div>
          )}

          {result.cappedByLimit && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm">Claim value exceeds the policy limit. Recovery capped at {fmt(parseFloat(policyLimit))} unless the defendant has personal assets or additional coverage (umbrella/UIM).</p>
            </div>
          )}

          <div className="p-4 rounded-lg bg-background border space-y-2">
            <p className="text-sm font-semibold">Breakdown from capped gross:</p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span>Gross settlement</span><span>{fmt(result.cappedLow)} – {fmt(result.cappedHigh)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>− Attorney fee ({(feePresets[feePreset].rate * 100).toFixed(1)}%)</span><span>−{fmt(result.feeLow)} – −{fmt(result.feeHigh)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>− Case costs</span><span>−{fmt(parseFloat(caseCosts) || 0)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>− Liens</span><span>−{fmt(parseFloat(liens) || 0)}</span></div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-accent/10 border border-accent/40">
            <p className="text-sm text-muted-foreground">Estimated net to you</p>
            <p className="text-3xl font-bold text-accent">{fmt(result.netLow)} – {fmt(result.netHigh)}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild size="sm" variant="outline">
              <Link to="/tools/consumer/statute-of-limitations">Check your filing deadline <ExternalLink className="w-3 h-3 ml-1" /></Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/tools/finance/attorney-fee">Attorney fee calculator <ExternalLink className="w-3 h-3 ml-1" /></Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/lawyer-near-me">Find a personal injury lawyer <ExternalLink className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>

          <ToolResultAd show={result.valid} />
        </>
      ) : (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Enter at least a medical bill amount to see an estimate.
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground border-t pt-3">
        Estimator only, not legal advice. Actual settlements depend on venue, defendant, insurance posture, evidence, credibility, and negotiation. Speak with a licensed personal injury attorney for a case evaluation — most work on contingency (no fee unless you recover).
      </p>

      <SettlementTaxabilityFAQ variant="personal-injury" className="mt-6" />
      <ToolRecommender topic="personal-injury" />
    </div>
  );

  return <MultiStepWizard steps={steps} finalContent={finalContent} />;
}

function Field({ label, v, set, placeholder }: { label: string; v: string; set: (s: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type="number" min="0" step="0.01" value={v} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function StatRow({ label, v, primary }: { label: string; v: string; primary?: boolean }) {
  return (
    <div className={`p-3 rounded-lg text-center border ${primary ? "bg-primary/10 border-primary/30" : "bg-background"}`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold ${primary ? "text-primary" : ""}`}>{v}</p>
    </div>
  );
}
