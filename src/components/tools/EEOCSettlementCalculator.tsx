import ToolRecommender from "@/components/tools/ToolRecommender";
import SettlementTaxabilityFAQ from "@/components/tools/SettlementTaxabilityFAQ";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, ExternalLink, AlertTriangle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import ToolResultAd from "@/components/tools/ToolResultAd";

// Title VII / ADA compensatory + punitive damages caps by employer size (42 U.S.C. § 1981a(b)(3))
const CAP_BY_SIZE: Record<string, { label: string; cap: number }> = {
  s15_100: { label: "15–100 employees", cap: 50000 },
  s101_200: { label: "101–200 employees", cap: 100000 },
  s201_500: { label: "201–500 employees", cap: 200000 },
  s500plus: { label: "Over 500 employees", cap: 300000 },
};

// Discrimination-type multipliers reflect settlement patterns from published EEOC data
const CLAIM_TYPES: Record<string, { label: string; mult: number; note: string; capped: boolean }> = {
  race: { label: "Race (Title VII)", mult: 1.3, note: "Race claims under 42 U.S.C. § 1981 have NO damages cap.", capped: false },
  sex: { label: "Sex / gender (Title VII)", mult: 1.1, note: "Covered by Title VII caps.", capped: true },
  pregnancy: { label: "Pregnancy (PDA)", mult: 1.15, note: "Covered by Title VII caps.", capped: true },
  age: { label: "Age (ADEA)", mult: 1.0, note: "ADEA: NO compensatory/punitive damages, but liquidated (2×) back pay for willful.", capped: false },
  disability: { label: "Disability (ADA)", mult: 1.1, note: "Covered by Title VII caps.", capped: true },
  religion: { label: "Religion (Title VII)", mult: 0.9, note: "Covered by Title VII caps.", capped: true },
  national_origin: { label: "National origin", mult: 1.0, note: "Covered by Title VII caps.", capped: true },
  retaliation: { label: "Retaliation", mult: 1.4, note: "Jury-friendly; often the strongest claim.", capped: true },
  sexual_harassment: { label: "Sexual harassment", mult: 1.5, note: "Highest jury verdicts historically.", capped: true },
};

const CLAIM_STRENGTH: Record<string, { label: string; low: number; high: number; note: string }> = {
  weak: { label: "Weak — mostly your word", low: 0.15, high: 0.4, note: "No documentation, no witnesses, no similarly-situated comparators." },
  moderate: { label: "Moderate — some evidence", low: 0.4, high: 0.75, note: "Some emails, one witness, unclear paper trail." },
  strong: { label: "Strong — clear paper trail", low: 0.7, high: 1.0, note: "Written admissions, multiple witnesses, comparator evidence, or documented policy violations." },
  smoking_gun: { label: "Smoking gun", low: 0.95, high: 1.0, note: "Direct written slurs, admissions, video, or class-wide pattern." },
};

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function EEOCSettlementCalculator() {
  const [annualWage, setAnnualWage] = useState("");
  const [monthsOut, setMonthsOut] = useState("");
  const [mitigationWage, setMitigationWage] = useState("");
  const [medical, setMedical] = useState("");
  const [size, setSize] = useState("s201_500");
  const [claimType, setClaimType] = useState("retaliation");
  const [strength, setStrength] = useState("moderate");
  const [frontPayYears, setFrontPayYears] = useState("");
  const [feeRate, setFeeRate] = useState("0.4");

  const result = useMemo(() => {
    const wage = parseFloat(annualWage) || 0;
    const months = parseFloat(monthsOut) || 0;
    const mit = parseFloat(mitigationWage) || 0;
    const med = parseFloat(medical) || 0;
    const front = parseFloat(frontPayYears) || 0;

    const monthlyWage = wage / 12;
    const grossBackPay = monthlyWage * months;
    // Mitigation offset: subtract earnings from replacement work during period
    const mitigationOffset = (mit / 12) * months;
    const backPay = Math.max(0, grossBackPay - mitigationOffset);

    // Front pay = expected future wage loss (only if reinstatement not feasible)
    const frontPay = wage * front;

    const cap = CAP_BY_SIZE[size].cap;
    const type = CLAIM_TYPES[claimType];
    const s = CLAIM_STRENGTH[strength];

    // Compensatory damages: emotional distress + medical, weighted by strength
    const emotionalDistressLow = wage * s.low * 0.8;
    const emotionalDistressHigh = wage * s.high * 1.2;
    let compLow = emotionalDistressLow + med;
    let compHigh = emotionalDistressHigh + med;

    // Punitive damages: only for reckless/malicious conduct — apply if strength ≥ strong
    let punLow = 0;
    let punHigh = 0;
    if (strength === "strong" || strength === "smoking_gun") {
      punLow = backPay * 0.5;
      punHigh = backPay * 2;
    }

    // Apply claim-type multiplier
    compLow *= type.mult;
    compHigh *= type.mult;
    punLow *= type.mult;
    punHigh *= type.mult;

    // Apply Title VII caps if applicable (comp + punitive combined)
    let cappedNote = "";
    if (type.capped) {
      const combinedLow = compLow + punLow;
      const combinedHigh = compHigh + punHigh;
      if (combinedHigh > cap) {
        const ratioHigh = cap / combinedHigh;
        compHigh *= ratioHigh;
        punHigh *= ratioHigh;
        cappedNote = `High end capped at ${fmt(cap)} statutory limit.`;
      }
      if (combinedLow > cap) {
        const ratioLow = cap / combinedLow;
        compLow *= ratioLow;
        punLow *= ratioLow;
      }
    }

    const grossLow = backPay + frontPay + compLow + punLow;
    const grossHigh = backPay + frontPay + compHigh + punHigh;

    // Attorney fees under 42 U.S.C. § 1988 / Title VII § 706(k) — prevailing plaintiff can recover fees separately
    // But most settlements bundle everything; use contingency rate
    const fee = parseFloat(feeRate) || 0.4;
    const feeAmtLow = grossLow * fee;
    const feeAmtHigh = grossHigh * fee;
    const netLow = grossLow - feeAmtLow;
    const netHigh = grossHigh - feeAmtHigh;

    return {
      backPay,
      grossBackPay,
      mitigationOffset,
      frontPay,
      compLow,
      compHigh,
      punLow,
      punHigh,
      cap,
      cappedNote,
      grossLow,
      grossHigh,
      feeAmtLow,
      feeAmtHigh,
      netLow,
      netHigh,
      valid: wage > 0 && months > 0,
    };
  }, [annualWage, monthsOut, mitigationWage, medical, size, claimType, strength, frontPayYears, feeRate]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <h3 className="font-serif font-bold text-lg">Your wages &amp; time out of work</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Annual wage / salary at time of adverse action ($)" v={annualWage} set={setAnnualWage} placeholder="65000" />
            <Field label="Months since termination / demotion" v={monthsOut} set={setMonthsOut} placeholder="6" />
            <Field label="Annualized replacement earnings ($) — mitigation" v={mitigationWage} set={setMitigationWage} placeholder="0" />
            <Field label="Years of expected future wage loss (front pay)" v={frontPayYears} set={setFrontPayYears} placeholder="0" />
            <Field label="Medical / therapy / counseling costs ($)" v={medical} set={setMedical} placeholder="2500" />
            <div className="space-y-2">
              <Label>Employer size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(CAP_BY_SIZE).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label} — cap {fmt(v.cap)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-serif font-bold text-lg">Claim type &amp; strength</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Type of discrimination</Label>
              <Select value={claimType} onValueChange={setClaimType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {Object.entries(CLAIM_TYPES).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{CLAIM_TYPES[claimType].note}</p>
            </div>
            <div className="space-y-2">
              <Label>Strength of evidence</Label>
              <Select value={strength} onValueChange={setStrength}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(CLAIM_STRENGTH).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{CLAIM_STRENGTH[strength].note}</p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Attorney contingency fee</Label>
              <Select value={feeRate} onValueChange={setFeeRate}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.3333">Pre-suit / EEOC only (33.3%)</SelectItem>
                  <SelectItem value="0.4">Federal lawsuit filed (40%)</SelectItem>
                  <SelectItem value="0.45">Trial reached (45%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {result.valid && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-lg">Estimated EEOC settlement value</h3>
              <Badge variant="secondary" className="text-xs">Educational estimate</Badge>
            </div>

            <div className="p-4 rounded-lg bg-background border space-y-2 text-sm">
              <div className="flex justify-between"><span>Gross back pay</span><span>{fmt(result.grossBackPay)}</span></div>
              {result.mitigationOffset > 0 && (
                <div className="flex justify-between text-muted-foreground"><span>− Mitigation (replacement earnings)</span><span>−{fmt(result.mitigationOffset)}</span></div>
              )}
              <div className="flex justify-between font-semibold border-t pt-2"><span>Back pay (uncapped)</span><span>{fmt(result.backPay)}</span></div>
              {result.frontPay > 0 && (
                <div className="flex justify-between"><span>Front pay ({frontPayYears} yr)</span><span>{fmt(result.frontPay)}</span></div>
              )}
              <div className="flex justify-between"><span>Compensatory (emotional distress + medical)</span><span>{fmt(result.compLow)} – {fmt(result.compHigh)}</span></div>
              {(result.punLow > 0 || result.punHigh > 0) && (
                <div className="flex justify-between"><span>Punitive damages</span><span>{fmt(result.punLow)} – {fmt(result.punHigh)}</span></div>
              )}
              <div className="flex justify-between font-bold border-t pt-2 text-primary"><span>Gross settlement</span><span>{fmt(result.grossLow)} – {fmt(result.grossHigh)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>− Attorney fee ({(parseFloat(feeRate) * 100).toFixed(0)}%)</span><span>−{fmt(result.feeAmtLow)} – −{fmt(result.feeAmtHigh)}</span></div>
            </div>

            <div className="p-4 rounded-lg bg-accent/10 border border-accent/40">
              <p className="text-sm text-muted-foreground">Estimated net to you</p>
              <p className="text-3xl font-bold text-accent">{fmt(result.netLow)} – {fmt(result.netHigh)}</p>
            </div>

            {result.cappedNote && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-sm">{result.cappedNote} Back pay and front pay are NOT subject to the cap.</p>
              </div>
            )}

            {!CLAIM_TYPES[claimType].capped && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-sm">
                  {claimType === "race" && "Race claims under § 1981 have NO statutory damages cap — verdicts frequently exceed $1M."}
                  {claimType === "age" && "ADEA does not allow compensatory or punitive damages, but willful violations double the back pay (liquidated damages)."}
                </p>
              </div>
            )}

            <div className="text-sm space-y-2 border-t pt-3">
              <p className="font-semibold">Critical deadlines:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li><strong>EEOC charge:</strong> 180 days from the discriminatory act (300 days in deferral states with a state agency).</li>
                <li><strong>Right-to-sue letter:</strong> 90 days after receipt to file federal lawsuit.</li>
                <li><strong>§ 1981 race claims:</strong> 4-year federal statute — much longer window.</li>
                <li><strong>Attorney's fees:</strong> Prevailing plaintiffs can recover reasonable fees under 42 U.S.C. § 2000e-5(k), often paid on top of damages.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/tools/consumer/statute-of-limitations">Check your filing deadline <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/tools/employment/wrongful-termination">Wrongful termination checklist <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/tools/employment/discrimination-checklist">Discrimination checklist <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/local-lawyers">Find an employment lawyer <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ToolResultAd show={result.valid} />

      <p className="text-xs text-muted-foreground border-t pt-3">
        Estimator only, not legal advice. EEOC settlement values swing wildly based on venue, judge, jury pool, employer resources, and evidence. Damage caps apply to Title VII/ADA/GINA claims only — race (§ 1981), age (ADEA), and FLSA claims have separate frameworks. Speak with an employment attorney; most work on contingency.
      </p>

      <SettlementTaxabilityFAQ variant="employment" className="mt-6" />
      <ToolRecommender topic="eeoc" />
    </div>
  );
}

function Field({ label, v, set, placeholder }: { label: string; v: string; set: (s: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type="number" min="0" step="0.01" value={v} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
