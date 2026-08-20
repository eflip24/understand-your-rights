import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";
import SettlementTaxabilityFAQ from "@/components/tools/SettlementTaxabilityFAQ";
import ToolResultAd from "@/components/tools/ToolResultAd";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

type Severity = "soft" | "fracture" | "surgery" | "catastrophic";

const SEVERITY: Record<Severity, { label: string; low: number; high: number }> = {
  soft: { label: "Soft tissue / whiplash, no surgery", low: 1.5, high: 2.5 },
  fracture: { label: "Fractures or herniated disc, conservative care", low: 2.5, high: 4 },
  surgery: { label: "Surgery required (fusion, ORIF, joint repair)", low: 4, high: 6 },
  catastrophic: { label: "Catastrophic (TBI, amputation, paralysis, burns)", low: 6, high: 10 },
};

export default function TruckAccidentSettlementCalculator() {
  const [medical, setMedical] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [wages, setWages] = useState("");
  const [propertyDamage, setPropertyDamage] = useState("");
  const [severity, setSeverity] = useState<Severity>("fracture");
  const [fault, setFault] = useState("0");
  const [feePct, setFeePct] = useState("33.33");
  const [liens, setLiens] = useState("");

  // Trucking-specific liability multipliers
  const [hosViolation, setHosViolation] = useState(false);
  const [maintenanceFailure, setMaintenanceFailure] = useState(false);
  const [negligentHiring, setNegligentHiring] = useState(false);
  const [drugAlcohol, setDrugAlcohol] = useState(false);

  const med = parseFloat(medical) || 0;
  const futMed = parseFloat(futureMedical) || 0;
  const wage = parseFloat(wages) || 0;
  const prop = parseFloat(propertyDamage) || 0;
  const faultPct = Math.min(100, Math.max(0, parseFloat(fault) || 0));
  const fee = Math.min(50, Math.max(0, parseFloat(feePct) || 0));
  const lien = parseFloat(liens) || 0;

  const specials = med + futMed + wage;
  const band = SEVERITY[severity];

  // Aggravating evidence increases the pain-and-suffering multiplier and the
  // realistic chance of a punitive-damages component.
  const aggravators = [hosViolation, maintenanceFailure, negligentHiring, drugAlcohol].filter(Boolean).length;
  const bump = aggravators * 0.5;

  const lowMult = band.low + bump * 0.5;
  const highMult = band.high + bump;

  const painLow = specials * lowMult;
  const painHigh = specials * highMult;

  const grossLow = (specials + painLow + prop) * (1 - faultPct / 100);
  const grossHigh = (specials + painHigh + prop) * (1 - faultPct / 100);

  const netLow = Math.max(0, grossLow * (1 - fee / 100) - lien);
  const netHigh = Math.max(0, grossHigh * (1 - fee / 100) - lien);

  const calc = specials > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Medical bills to date ($)</Label><Input type="number" value={medical} onChange={(e) => setMedical(e.target.value)} placeholder="48000" /></div>
        <div><Label>Estimated future medical care ($)</Label><Input type="number" value={futureMedical} onChange={(e) => setFutureMedical(e.target.value)} placeholder="25000" /></div>
        <div><Label>Lost wages / earning capacity ($)</Label><Input type="number" value={wages} onChange={(e) => setWages(e.target.value)} placeholder="18000" /></div>
        <div><Label>Vehicle & property damage ($)</Label><Input type="number" value={propertyDamage} onChange={(e) => setPropertyDamage(e.target.value)} placeholder="32000" /></div>
        <div className="sm:col-span-2">
          <Label>Injury severity</Label>
          <Select value={severity} onValueChange={(v) => setSeverity(v as Severity)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(SEVERITY).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div><Label>Your share of fault (%)</Label><Input type="number" value={fault} onChange={(e) => setFault(e.target.value)} /></div>
        <div><Label>Attorney contingency fee (%)</Label><Input type="number" value={feePct} onChange={(e) => setFeePct(e.target.value)} /></div>
        <div className="sm:col-span-2"><Label>Medical liens / health-plan subrogation ($)</Label><Input type="number" value={liens} onChange={(e) => setLiens(e.target.value)} placeholder="0" /></div>
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <p className="text-sm font-medium">Evidence from the carrier's own records (check all that apply)</p>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={hosViolation} onCheckedChange={(v) => setHosViolation(!!v)} /><span>Hours-of-service violation in the ELD data or driver logs (49 CFR § 395)</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={maintenanceFailure} onCheckedChange={(v) => setMaintenanceFailure(!!v)} /><span>Brake, tire or inspection defect in the maintenance file (49 CFR § 396)</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={negligentHiring} onCheckedChange={(v) => setNegligentHiring(!!v)} /><span>Negligent hiring, training or retention by the motor carrier</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={drugAlcohol} onCheckedChange={(v) => setDrugAlcohol(!!v)} /><span>Positive post-accident drug or alcohol test (49 CFR § 382)</span></label>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated truck accident settlement range</h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Economic damages (specials)</p>
                <p className="text-2xl font-bold">{usd(specials)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Gross settlement range</p>
                <p className="text-2xl font-bold">{usd(grossLow)} – {usd(grossHigh)}</p>
                <p className="text-xs text-muted-foreground mt-1">Multiplier {lowMult.toFixed(1)}× – {highMult.toFixed(1)}×</p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Estimated net to you</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{usd(netLow)} – {usd(netHigh)}</p>
                <p className="text-xs text-muted-foreground mt-1">After {fee}% fee{lien > 0 ? ` and ${usd(lien)} liens` : ""}</p>
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-2 font-medium">Component</th><th className="text-right p-2 font-medium">Low</th><th className="text-right p-2 font-medium">High</th></tr></thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Medical (past + future)</td><td className="p-2 text-right">{usd(med + futMed)}</td><td className="p-2 text-right">{usd(med + futMed)}</td></tr>
                  <tr className="border-t"><td className="p-2">Lost wages & earning capacity</td><td className="p-2 text-right">{usd(wage)}</td><td className="p-2 text-right">{usd(wage)}</td></tr>
                  <tr className="border-t"><td className="p-2">Property damage</td><td className="p-2 text-right">{usd(prop)}</td><td className="p-2 text-right">{usd(prop)}</td></tr>
                  <tr className="border-t"><td className="p-2">Pain & suffering</td><td className="p-2 text-right">{usd(painLow)}</td><td className="p-2 text-right">{usd(painHigh)}</td></tr>
                  {faultPct > 0 && <tr className="border-t"><td className="p-2">Comparative-fault reduction ({faultPct}%)</td><td className="p-2 text-right text-destructive">-{usd((specials + painLow + prop) * faultPct / 100)}</td><td className="p-2 text-right text-destructive">-{usd((specials + painHigh + prop) * faultPct / 100)}</td></tr>}
                  <tr className="border-t bg-muted/50 font-bold"><td className="p-2">Gross settlement</td><td className="p-2 text-right">{usd(grossLow)}</td><td className="p-2 text-right">{usd(grossHigh)}</td></tr>
                </tbody>
              </table>
            </div>

            {aggravators > 0 && (
              <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
                <span className="font-medium">{aggravators} regulatory aggravator{aggravators > 1 ? "s" : ""} flagged.</span> FMCSA violations move a case from ordinary negligence toward gross negligence, which is what unlocks punitive exposure and pushes carriers such as a self-insured fleet or its excess layer to settle above policy-limit anchors. Send a spoliation letter within days — ELD data is only retained 6 months and dashcam footage often 30 days.
              </div>
            )}

            <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20 space-y-1">
              <p className="font-medium">Why truck cases pay more than car cases</p>
              <p>Interstate carriers must carry at least $750,000 in liability coverage under 49 CFR § 387 ($1M for hazmat, $5M for certain hazardous loads), versus $25,000–$50,000 state minimums for private cars. Multiple defendants — driver, motor carrier, broker, shipper, maintenance contractor and trailer owner — often mean stacked policies.</p>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimates only. Actual values depend on venue, jury verdict history, policy limits, and the strength of the FMCSA record. Not legal advice.
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
