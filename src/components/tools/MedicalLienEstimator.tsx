import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";

type LienType = "medicare" | "medicaid" | "erisa" | "hospital" | "private-health" | "va-tricare";

interface LienRule {
  label: string;
  reducesForAttorneyFees: boolean; // "Common Fund" / procurement reduction
  typicalNegotiationRange: [number, number]; // % of original lien typically settled for
  formulaNote: string;
}

const LIEN_RULES: Record<LienType, LienRule> = {
  medicare: {
    label: "Medicare (MSP)",
    reducesForAttorneyFees: true,
    typicalNegotiationRange: [60, 100],
    formulaNote: "Medicare reduces its lien by a pro-rata share of attorney fees + costs (42 CFR § 411.37). Formula: Lien × (1 − procurement ratio). Compromise/waiver requests are available for hardship.",
  },
  medicaid: {
    label: "Medicaid",
    reducesForAttorneyFees: true,
    typicalNegotiationRange: [33, 75],
    formulaNote: "Post-Ahlborn/Wos, Medicaid's lien is limited to the medical portion of the settlement. Many states apply a 1/3 rule (lien ≤ 1/3 of gross recovery).",
  },
  erisa: {
    label: "ERISA self-funded health plan",
    reducesForAttorneyFees: false,
    typicalNegotiationRange: [50, 90],
    formulaNote: "Self-funded ERISA plans (US Airways v. McCutchen) enforce plan terms strictly. If the plan disclaims common-fund reduction, full lien is owed. Negotiation depends on plan language.",
  },
  hospital: {
    label: "Hospital / provider lien",
    reducesForAttorneyFees: true,
    typicalNegotiationRange: [20, 60],
    formulaNote: "State hospital lien acts vary widely — most require the hospital to accept reasonable charges, and many statutes cap liens at 25-40% of settlement. 'Balance billing' and charge-master vs. contract rates are heavily negotiable.",
  },
  "private-health": {
    label: "Private health insurance (fully-insured)",
    reducesForAttorneyFees: true,
    typicalNegotiationRange: [40, 80],
    formulaNote: "Fully-insured plans are governed by state anti-subrogation, made-whole doctrine, and common-fund rules. Many states bar subrogation entirely (e.g., NY, VA for auto).",
  },
  "va-tricare": {
    label: "VA / TRICARE",
    reducesForAttorneyFees: true,
    typicalNegotiationRange: [50, 100],
    formulaNote: "Federal Medical Care Recovery Act (FMCRA). Reduced by pro-rata share of fees. Waivers available for hardship.",
  },
};

export default function MedicalLienEstimator() {
  const [lienType, setLienType] = useState<LienType>("medicare");
  const [grossSettlement, setGrossSettlement] = useState("");
  const [attorneyFeePct, setAttorneyFeePct] = useState("33.33");
  const [caseCosts, setCaseCosts] = useState("");
  const [totalMedicalBills, setTotalMedicalBills] = useState("");
  const [lienAmount, setLienAmount] = useState("");

  const gross = parseFloat(grossSettlement) || 0;
  const feePct = parseFloat(attorneyFeePct) || 0;
  const costs = parseFloat(caseCosts) || 0;
  const totalMed = parseFloat(totalMedicalBills) || 0;
  const lien = parseFloat(lienAmount) || 0;

  const rule = LIEN_RULES[lienType];
  const attorneyFee = gross * (feePct / 100);
  const totalProcurement = attorneyFee + costs;
  const procurementRatio = gross > 0 ? totalProcurement / gross : 0;

  // Medicare-style reduction
  const proRataReduction = rule.reducesForAttorneyFees ? lien * procurementRatio : 0;
  const reducedLien = lien - proRataReduction;

  // Typical negotiated range
  const [minPct, maxPct] = rule.typicalNegotiationRange;
  const negotiatedLow = lien * (minPct / 100);
  const negotiatedHigh = lien * (maxPct / 100);

  // Ahlborn cap for Medicaid: lien limited to medical portion of settlement
  const medicalPortionRatio = totalMed > 0 && gross > 0 ? Math.min(1, totalMed / (gross * 3)) : 1;
  const ahlbornCap = lienType === "medicaid" ? gross * medicalPortionRatio * 0.33 : null;

  const netToClient = gross - attorneyFee - costs - Math.min(reducedLien, negotiatedLow);
  const calc = gross > 0 && lien > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Lien Type</Label>
          <Select value={lienType} onValueChange={(v) => setLienType(v as LienType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(LIEN_RULES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div><Label>Gross Settlement ($)</Label><Input type="number" value={grossSettlement} onChange={e => setGrossSettlement(e.target.value)} placeholder="100000" /></div>
        <div><Label>Original Lien Amount ($)</Label><Input type="number" value={lienAmount} onChange={e => setLienAmount(e.target.value)} placeholder="25000" /></div>
        <div><Label>Total Medical Bills ($)</Label><Input type="number" value={totalMedicalBills} onChange={e => setTotalMedicalBills(e.target.value)} placeholder="35000" /></div>
        <div><Label>Attorney Contingency %</Label><Input type="number" value={attorneyFeePct} onChange={e => setAttorneyFeePct(e.target.value)} step="0.01" /></div>
        <div><Label>Case Costs ($)</Label><Input type="number" value={caseCosts} onChange={e => setCaseCosts(e.target.value)} placeholder="2500" /></div>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Lien Reduction Analysis — {rule.label}</h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Original Lien</p>
                <p className="text-2xl font-bold">${lien.toLocaleString()}</p>
              </div>
              {rule.reducesForAttorneyFees && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">After Pro-Rata Reduction</p>
                  <p className="text-2xl font-bold text-accent">${reducedLien.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">Procurement ratio: {(procurementRatio * 100).toFixed(1)}%</p>
                </div>
              )}
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Typical Negotiated Range</p>
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-500">
                  ${negotiatedLow.toLocaleString("en-US", { maximumFractionDigits: 0 })}–${negotiatedHigh.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{minPct}%–{maxPct}% of original</p>
              </div>
            </div>

            {ahlbornCap !== null && (
              <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
                <p><span className="font-medium">Ahlborn cap:</span> Medicaid recovery limited to ~${ahlbornCap.toLocaleString("en-US", { maximumFractionDigits: 0 })} (medical portion of settlement, ~33% rule). Use to challenge overreach.</p>
              </div>
            )}

            <div className="p-4 bg-primary/5 rounded-lg space-y-2 border border-primary/20">
              <p className="font-bold text-sm">Estimated Net to You (best-case negotiation):</p>
              <div className="flex justify-between text-sm"><span>Gross settlement</span><span>${gross.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span>Attorney fee ({feePct}%)</span><span className="text-destructive">-${attorneyFee.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-sm"><span>Case costs</span><span className="text-destructive">-${costs.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span>Negotiated lien (low estimate)</span><span className="text-destructive">-${Math.min(reducedLien, negotiatedLow).toLocaleString("en-US", { maximumFractionDigits: 0 })}</span></div>
              <div className="border-t pt-2 flex justify-between font-bold"><span>Net to you</span><span className="text-emerald-700 dark:text-emerald-500">${netToClient.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span></div>
            </div>

            <div className="p-3 bg-muted rounded-lg text-sm">
              <p><span className="font-medium">Rule:</span> {rule.formulaNote}</p>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimates only. Actual lien resolution requires certified conditional payment letters (Medicare), plan documents (ERISA), or hospital contracts. Never disburse settlement funds until liens are resolved in writing. Not legal advice.
            </p>
          </CardContent>
        </Card>
      )}

      <ToolRecommender topic="personal-injury" />
    </div>
  );
}
