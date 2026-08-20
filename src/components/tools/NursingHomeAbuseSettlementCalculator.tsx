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

type Harm = "pressure2" | "pressure4" | "fall" | "malnutrition" | "assault" | "death";

const HARM: Record<Harm, { label: string; low: number; high: number; base: number }> = {
  pressure2: { label: "Stage 1–2 pressure ulcer, healed", low: 1.5, high: 3, base: 25000 },
  pressure4: { label: "Stage 3–4 pressure ulcer, sepsis or debridement", low: 3, high: 6, base: 120000 },
  fall: { label: "Unwitnessed fall with fracture (hip, pelvis, femur)", low: 2.5, high: 5, base: 90000 },
  malnutrition: { label: "Malnutrition, dehydration or medication error", low: 3, high: 5.5, base: 100000 },
  assault: { label: "Physical or sexual abuse by staff or another resident", low: 4, high: 8, base: 175000 },
  death: { label: "Wrongful death caused by neglect", low: 5, high: 10, base: 250000 },
};

export default function NursingHomeAbuseSettlementCalculator() {
  const [medical, setMedical] = useState("");
  const [funeral, setFuneral] = useState("");
  const [harm, setHarm] = useState<Harm>("pressure4");
  const [months, setMonths] = useState("6");
  const [feePct, setFeePct] = useState("33.33");
  const [capOnNonEconomic, setCapOnNonEconomic] = useState("");

  const [staffingViolation, setStaffingViolation] = useState(false);
  const [priorCitations, setPriorCitations] = useState(false);
  const [recordsAltered, setRecordsAltered] = useState(false);
  const [arbitrationClause, setArbitrationClause] = useState(false);

  const med = parseFloat(medical) || 0;
  const fun = parseFloat(funeral) || 0;
  const mo = Math.max(0, parseFloat(months) || 0);
  const fee = Math.min(50, Math.max(0, parseFloat(feePct) || 0));
  const cap = parseFloat(capOnNonEconomic) || 0;

  const band = HARM[harm];
  const economic = med + fun;

  const aggravators = [staffingViolation, priorCitations, recordsAltered].filter(Boolean).length;
  const bump = aggravators * 0.6;

  // Suffering scales with how long the neglect went undetected.
  const durationFactor = 1 + Math.min(1, mo / 24);

  let nonEcoLow = (band.base + economic * band.low) * durationFactor;
  let nonEcoHigh = (band.base + economic * (band.high + bump)) * durationFactor;

  const capped = cap > 0 && nonEcoHigh > cap;
  if (cap > 0) {
    nonEcoLow = Math.min(nonEcoLow, cap);
    nonEcoHigh = Math.min(nonEcoHigh, cap);
  }

  const arbFactor = arbitrationClause ? 0.7 : 1;
  const grossLow = (economic + nonEcoLow) * arbFactor;
  const grossHigh = (economic + nonEcoHigh) * arbFactor;

  const netLow = grossLow * (1 - fee / 100);
  const netHigh = grossHigh * (1 - fee / 100);
  const calc = economic > 0 || mo > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label>Type of harm</Label>
          <Select value={harm} onValueChange={(v) => setHarm(v as Harm)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.entries(HARM).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Related medical bills ($)</Label><Input type="number" value={medical} onChange={(e) => setMedical(e.target.value)} placeholder="42000" /></div>
        <div><Label>Funeral / burial costs ($, if applicable)</Label><Input type="number" value={funeral} onChange={(e) => setFuneral(e.target.value)} placeholder="0" /></div>
        <div><Label>Months the neglect continued</Label><Input type="number" value={months} onChange={(e) => setMonths(e.target.value)} /></div>
        <div><Label>State cap on non-economic damages ($, optional)</Label><Input type="number" value={capOnNonEconomic} onChange={(e) => setCapOnNonEconomic(e.target.value)} placeholder="500000" /></div>
        <div><Label>Attorney contingency fee (%)</Label><Input type="number" value={feePct} onChange={(e) => setFeePct(e.target.value)} /></div>
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <p className="text-sm font-medium">Facility record factors</p>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={staffingViolation} onCheckedChange={(v) => setStaffingViolation(!!v)} /><span>Chronic understaffing shown in CMS Payroll-Based Journal or a 1–2 star staffing rating</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={priorCitations} onCheckedChange={(v) => setPriorCitations(!!v)} /><span>Prior CMS Form 2567 deficiencies or an immediate-jeopardy citation for the same issue</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={recordsAltered} onCheckedChange={(v) => setRecordsAltered(!!v)} /><span>Charting gaps, late entries or altered records in the MDS / turn logs</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={arbitrationClause} onCheckedChange={(v) => setArbitrationClause(!!v)} /><span>The admission agreement contains a binding arbitration clause</span></label>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated nursing home neglect settlement range</h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Economic damages</p><p className="text-2xl font-bold">{usd(economic)}</p></div>
              <div className="p-4 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Pain, suffering & dignity harms</p><p className="text-2xl font-bold">{usd(nonEcoLow)} – {usd(nonEcoHigh)}</p><p className="text-xs text-muted-foreground mt-1">{mo} months of exposure</p></div>
              <div className="p-4 bg-emerald-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Estimated net to the family</p><p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{usd(netLow)} – {usd(netHigh)}</p><p className="text-xs text-muted-foreground mt-1">Gross {usd(grossLow)} – {usd(grossHigh)} after a {fee}% fee</p></div>
            </div>

            {capped && (
              <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
                <span className="font-medium">Non-economic damages capped.</span> Where the claim is pleaded as medical malpractice rather than elder abuse, statutory caps apply — California's MICRA cap and Texas's $250,000 per-defendant cap are the best-known. Pleading a violation of the state Elder Abuse Act or the federal Nursing Home Reform Act (42 U.S.C. § 1395i-3) often escapes the malpractice cap and can add attorney fees.
              </div>
            )}

            {arbitrationClause && (
              <div className="p-3 bg-muted rounded-lg text-sm">
                <span className="font-medium">Arbitration discount applied (−30%).</span> Arbitrated elder-abuse claims typically resolve below jury values. Clauses signed by a relative without a valid power of attorney, or presented as a condition of admission, are frequently unenforceable — challenge it before you negotiate.
              </div>
            )}

            {aggravators > 0 && (
              <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
                <span className="font-medium">{aggravators} facility-record aggravator{aggravators > 1 ? "s" : ""}.</span> Pull the facility's last three years of CMS survey results, the Payroll-Based Journal staffing data, and the state ombudsman complaint file. A documented pattern converts a single incident into a corporate-negligence claim against the operator and its private-equity parent.
              </div>
            )}

            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p className="font-medium">Records to request in writing today</p>
              <p>Complete chart including MDS assessments, care plans, turn-and-reposition logs, wound-care notes, weight records, medication administration records, incident reports, and staffing schedules for the relevant shifts. HIPAA gives the resident's personal representative the right to these within 30 days.</p>
            </div>

            <p className="text-xs text-muted-foreground">Estimates only. Nursing home cases turn on state elder-abuse statutes, damage caps, and whether the claim is framed as neglect or malpractice. Not legal advice.</p>
          </CardContent>
        </Card>
      )}

      <ToolResultAd show={!!calc} />

      <SettlementTaxabilityFAQ variant="personal-injury" className="mt-6" />
      <ToolRecommender topic="personal-injury" />
    </div>
  );
}
