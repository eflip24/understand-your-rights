import ToolRecommender from "@/components/tools/ToolRecommender";
import SettlementTaxabilityFAQ from "@/components/tools/SettlementTaxabilityFAQ";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HardHat, ExternalLink, Info } from "lucide-react";
import { Link } from "react-router-dom";
import ToolResultAd from "@/components/tools/ToolResultAd";

// State workers' comp maximum weekly benefit (approximate 2024 SAWW-based caps)
const STATE_MAX: Record<string, { max: number; note?: string }> = {
  "National average": { max: 1100 },
  Alabama: { max: 1050 },
  Alaska: { max: 1348 },
  Arizona: { max: 1173 },
  Arkansas: { max: 811 },
  California: { max: 1620 },
  Colorado: { max: 1382 },
  Connecticut: { max: 1651 },
  Delaware: { max: 872 },
  Florida: { max: 1260 },
  Georgia: { max: 800 },
  Hawaii: { max: 1188 },
  Idaho: { max: 928 },
  Illinois: { max: 1849 },
  Indiana: { max: 833 },
  Iowa: { max: 2130, note: "One of the highest caps" },
  Kansas: { max: 804 },
  Kentucky: { max: 1118 },
  Louisiana: { max: 816 },
  Maine: { max: 1128 },
  Maryland: { max: 1231 },
  Massachusetts: { max: 1829 },
  Michigan: { max: 1163 },
  Minnesota: { max: 1284 },
  Mississippi: { max: 604, note: "Lowest cap in US" },
  Missouri: { max: 1179 },
  Montana: { max: 894 },
  Nebraska: { max: 1029 },
  Nevada: { max: 1183 },
  "New Hampshire": { max: 1875 },
  "New Jersey": { max: 1131 },
  "New Mexico": { max: 951 },
  "New York": { max: 1145 },
  "North Carolina": { max: 1240 },
  "North Dakota": { max: 1191 },
  Ohio: { max: 1132 },
  Oklahoma: { max: 984 },
  Oregon: { max: 1616 },
  Pennsylvania: { max: 1325 },
  "Rhode Island": { max: 1567 },
  "South Carolina": { max: 1063 },
  "South Dakota": { max: 895 },
  Tennessee: { max: 1108 },
  Texas: { max: 1105 },
  Utah: { max: 1030 },
  Vermont: { max: 1584 },
  Virginia: { max: 1338 },
  Washington: { max: 2081 },
  "West Virginia": { max: 1029 },
  Wisconsin: { max: 1200 },
  Wyoming: { max: 985 },
};

// Body-part scheduled weeks (rough average; states vary)
const BODY_PARTS: Record<string, { label: string; weeks: number }> = {
  back: { label: "Back / spine", weeks: 300 },
  neck: { label: "Neck / cervical", weeks: 250 },
  shoulder: { label: "Shoulder", weeks: 200 },
  arm: { label: "Arm (full)", weeks: 240 },
  hand: { label: "Hand", weeks: 190 },
  fingers: { label: "Fingers", weeks: 60 },
  hip: { label: "Hip", weeks: 220 },
  leg: { label: "Leg (full)", weeks: 260 },
  knee: { label: "Knee", weeks: 200 },
  foot: { label: "Foot / ankle", weeks: 150 },
  head: { label: "Head / brain (TBI)", weeks: 400 },
  hearing: { label: "Hearing loss", weeks: 150 },
  eye: { label: "Eye / vision", weeks: 160 },
  other: { label: "Other / whole-person", weeks: 500 },
};

// Attorney fee caps common in WC (varies 15–25% by state; 20% median)
const WC_FEE_RATE = 0.2;

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function WorkersCompSettlementCalculator() {
  const [state, setState] = useState("National average");
  const [avgWeeklyWage, setAvgWeeklyWage] = useState("");
  const [bodyPart, setBodyPart] = useState("back");
  const [impairmentPct, setImpairmentPct] = useState("");
  const [ttdWeeks, setTtdWeeks] = useState(""); // temporary total disability weeks off work
  const [medicalPaid, setMedicalPaid] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [vocRehab, setVocRehab] = useState("");

  const result = useMemo(() => {
    const wage = parseFloat(avgWeeklyWage) || 0;
    const imp = (parseFloat(impairmentPct) || 0) / 100;
    const ttd = parseFloat(ttdWeeks) || 0;

    const rawCompRate = wage * (2 / 3);
    const stateMax = STATE_MAX[state].max;
    const compRate = Math.min(rawCompRate, stateMax);
    const cappedByState = rawCompRate > stateMax;

    // Temporary total disability (time off work)
    const ttdPay = compRate * ttd;

    // Permanent partial disability
    const ppdWeeks = BODY_PARTS[bodyPart].weeks * imp;
    const ppdPay = compRate * ppdWeeks;

    const medPast = parseFloat(medicalPaid) || 0;
    const medFuture = parseFloat(futureMedical) || 0;
    const voc = parseFloat(vocRehab) || 0;

    const totalIndemnity = ttdPay + ppdPay;
    const totalSettlement = totalIndemnity + medFuture + voc;

    // Range: settlements typically negotiate between 70-115% of scheduled value
    const low = totalSettlement * 0.7;
    const high = totalSettlement * 1.15;

    // Attorney fee applied to indemnity + future medical (typical); past medical usually excluded
    const feeBase = totalIndemnity + medFuture;
    const feeLow = low > 0 ? feeBase * 0.7 * WC_FEE_RATE : 0;
    const feeHigh = high > 0 ? feeBase * 1.15 * WC_FEE_RATE : 0;

    const netLow = Math.max(0, low - feeLow);
    const netHigh = Math.max(0, high - feeHigh);

    return {
      compRate,
      cappedByState,
      stateMax,
      ttdPay,
      ppdWeeks,
      ppdPay,
      medPast,
      medFuture,
      voc,
      totalSettlement,
      low,
      high,
      feeLow,
      feeHigh,
      netLow,
      netHigh,
      valid: wage > 0 && (imp > 0 || ttd > 0),
    };
  }, [avgWeeklyWage, state, impairmentPct, bodyPart, ttdWeeks, medicalPaid, futureMedical, vocRehab]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <HardHat className="w-5 h-5 text-primary" />
            <h3 className="font-serif font-bold text-lg">Your wages &amp; state</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Average weekly wage before injury ($)" v={avgWeeklyWage} set={setAvgWeeklyWage} placeholder="900" />
            <div className="space-y-2">
              <Label>Your state</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {Object.keys(STATE_MAX).map((s) => (
                    <SelectItem key={s} value={s}>{s} — max {fmt(STATE_MAX[s].max)}/wk</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {STATE_MAX[state].note && (
                <p className="text-xs text-muted-foreground">{STATE_MAX[state].note}</p>
              )}
            </div>
          </div>
          {parseFloat(avgWeeklyWage) > 0 && (
            <div className="p-3 rounded-lg bg-muted text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <p>
                Your weekly comp rate: <strong>{fmt(result.compRate)}</strong> ({((result.compRate / (parseFloat(avgWeeklyWage) || 1)) * 100).toFixed(0)}% of AWW)
                {result.cappedByState && <span className="text-amber-600"> — capped at {state} state maximum</span>}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-serif font-bold text-lg">Injury &amp; time off work</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Injured body part</Label>
              <Select value={bodyPart} onValueChange={setBodyPart}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {Object.entries(BODY_PARTS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label} — {v.weeks} wks</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Field label="Permanent impairment rating (%)" v={impairmentPct} set={setImpairmentPct} placeholder="15" />
            <Field label="Weeks off work (TTD)" v={ttdWeeks} set={setTtdWeeks} placeholder="20" />
            <Field label="Vocational rehab / retraining ($)" v={vocRehab} set={setVocRehab} placeholder="0" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-serif font-bold text-lg">Medical costs</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Medical bills already paid ($)" v={medicalPaid} set={setMedicalPaid} placeholder="18000" />
            <Field label="Estimated future medical ($)" v={futureMedical} set={setFutureMedical} placeholder="10000" />
          </div>
        </CardContent>
      </Card>

      {result.valid && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-lg">Estimated settlement</h3>
              <Badge variant="secondary" className="text-xs">Educational estimate</Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatBox label="Temporary disability (TTD)" v={fmt(result.ttdPay)} sub={`${ttdWeeks || 0} weeks × ${fmt(result.compRate)}`} />
              <StatBox label="Permanent partial (PPD)" v={fmt(result.ppdPay)} sub={`${result.ppdWeeks.toFixed(1)} weeks × ${fmt(result.compRate)}`} />
              <StatBox label="Future medical + voc" v={fmt(result.medFuture + result.voc)} sub="protected costs" />
            </div>

            <div className="p-4 rounded-lg bg-background border space-y-2">
              <div className="flex justify-between text-sm">
                <span>Baseline scheduled value</span>
                <span className="font-semibold">{fmt(result.totalSettlement)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Negotiated settlement range (70–115%)</span>
                <span className="font-bold text-primary">{fmt(result.low)} – {fmt(result.high)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground border-t pt-2">
                <span>− Attorney fee (~20% cap)</span>
                <span>−{fmt(result.feeLow)} – −{fmt(result.feeHigh)}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-accent/10 border border-accent/40">
              <p className="text-sm text-muted-foreground">Estimated net to you (after attorney fee)</p>
              <p className="text-3xl font-bold text-accent">{fmt(result.netLow)} – {fmt(result.netHigh)}</p>
              <p className="text-xs text-muted-foreground mt-1">Past medical bills ({fmt(result.medPast)}) are typically paid separately by the carrier and not included in the settlement check.</p>
            </div>

            <div className="text-sm space-y-2 border-t pt-3">
              <p className="font-semibold">Key negotiation factors:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li><strong>Clincher / full &amp; final:</strong> One lump sum closes future medical. Usually higher upfront but you take the risk of complications.</li>
                <li><strong>Stipulation:</strong> Keeps medical open for the injury. Lower cash but ongoing coverage.</li>
                <li><strong>MSA:</strong> If Medicare-eligible, a Medicare Set-Aside may be required — funds must be spent on medical before Medicare pays.</li>
                <li><strong>Second Injury Fund:</strong> Some states pay extra for pre-existing conditions worsened by work injury.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/tools/consumer/statute-of-limitations">Filing deadline for workers' comp <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/tools/employment/overtime-calc">Unpaid overtime calculator <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/local-lawyers">Find a workers' comp attorney <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ToolResultAd show={result.valid} />

      <p className="text-xs text-muted-foreground border-t pt-3">
        Estimator only, not legal advice. Workers' comp rules and benefit formulas vary widely by state. Attorney fees are capped by statute in most states (commonly 15–25%). Speak with a licensed workers' comp attorney before signing any settlement, MSA, or clincher.
      </p>

      <SettlementTaxabilityFAQ variant="workers-comp" className="mt-6" />
      <ToolRecommender topic="workers-compensation" />
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

function StatBox({ label, v, sub }: { label: string; v: string; sub: string }) {
  return (
    <div className="p-3 rounded-lg text-center border bg-background">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold">{v}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
