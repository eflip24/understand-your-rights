import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer } from "lucide-react";
import ToolRecommender from "@/components/tools/ToolRecommender";
import SettlementTaxabilityFAQ from "@/components/tools/SettlementTaxabilityFAQ";
import ToolResultAd from "@/components/tools/ToolResultAd";
import { stateData } from "@/data/locations/stateData";
import { getPainSufferingRule } from "@/data/painSufferingCaps";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

type Sev =
  | "soft-tissue"
  | "soft-tissue-long"
  | "fracture"
  | "surgery"
  | "permanent"
  | "catastrophic";

const SEVERITY: Record<Sev, { label: string; low: number; high: number; blurb: string }> = {
  "soft-tissue": {
    label: "Soft tissue, resolved in under 6 weeks (whiplash, sprain, bruising)",
    low: 1,
    high: 1.5,
    blurb: "Adjusters run these through Colossus or Claims Outcome Advisor and rarely move past 1.5× without a specialist referral in the file.",
  },
  "soft-tissue-long": {
    label: "Soft tissue with 3+ months of treatment or injections",
    low: 1.5,
    high: 2.5,
    blurb: "Sustained, documented treatment is what separates a 1× file from a 2.5× file. Gaps in treatment are the single biggest value killer.",
  },
  fracture: {
    label: "Fracture, torn ligament or herniated disc, no surgery",
    low: 2,
    high: 3.5,
    blurb: "Objective imaging (MRI, X-ray) moves you out of the software's 'subjective complaints' bucket and into a hard-injury band.",
  },
  surgery: {
    label: "Surgery required (arthroscopy, fusion, ORIF, repair)",
    low: 3,
    high: 5,
    blurb: "Surgical files are valued off the operative report, the surgeon's permanency opinion, and post-op restrictions, not the bill total.",
  },
  permanent: {
    label: "Permanent impairment, scarring or chronic pain diagnosis",
    low: 4,
    high: 7,
    blurb: "A percentage impairment rating under the AMA Guides converts pain into a number the insurer's software cannot discount away.",
  },
  catastrophic: {
    label: "Catastrophic: TBI, spinal cord, amputation, disfigurement",
    low: 5,
    high: 10,
    blurb: "Above 5× the case is valued by life-care plan and vocational expert reports rather than a multiplier of the medical bills.",
  },
};

const AGGRAVATORS: { id: string; label: string; bump: number }[] = [
  { id: "liability", label: "Liability is clear and admitted (rear-end, DUI, citation issued)", bump: 0.5 },
  { id: "impact", label: "Injury interferes with work, parenting or a documented hobby", bump: 0.5 },
  { id: "mental", label: "Diagnosed anxiety, PTSD or depression from the incident", bump: 0.5 },
  { id: "priorInjury", label: "No prior claims or pre-existing injury to the same body part", bump: 0.25 },
  { id: "gap", label: "Treatment gap of 30+ days in the medical records", bump: -0.75 },
  { id: "minorImpact", label: "Minor property damage / low-speed impact photos exist", bump: -0.5 },
];

export default function PainAndSufferingCalculator() {
  const [medical, setMedical] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [wages, setWages] = useState("");
  const [sev, setSev] = useState<Sev>("fracture");
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [fault, setFault] = useState("0");
  const [stateSlug, setStateSlug] = useState("california");
  const [claimType, setClaimType] = useState<"general" | "medmal">("general");
  const [perDiemRate, setPerDiemRate] = useState("225");
  const [recoveryDays, setRecoveryDays] = useState("120");
  const [feePct, setFeePct] = useState("33.33");

  const med = parseFloat(medical) || 0;
  const futMed = parseFloat(futureMedical) || 0;
  const wage = parseFloat(wages) || 0;
  const specials = med + futMed + wage;
  const faultPct = Math.min(100, Math.max(0, parseFloat(fault) || 0));
  const fee = Math.min(50, Math.max(0, parseFloat(feePct) || 0));

  const state = stateData.find((s) => s.slug === stateSlug) ?? stateData[0];
  const rule = getPainSufferingRule(state.abbreviation);

  const band = SEVERITY[sev];
  const bump = AGGRAVATORS.reduce((n, a) => n + (flags[a.id] ? a.bump : 0), 0);
  const multLow = Math.max(0.5, band.low + bump);
  const multHigh = Math.max(multLow + 0.5, band.high + bump);

  // Method 1 — multiplier. Pain and suffering is the multiplier applied to the
  // medical specials only; lost wages are economic and are not multiplied.
  const medicalBase = med + futMed;
  const multiplierLow = medicalBase * multLow;
  const multiplierHigh = medicalBase * multHigh;

  // Method 2 — per diem. A daily rate (often the claimant's daily wage) for
  // every day from the incident to maximum medical improvement.
  const perDiem = (parseFloat(perDiemRate) || 0) * (parseFloat(recoveryDays) || 0);

  // Comparative fault, applied the way the claimant's own state applies it.
  const { barred, faultNote } = useMemo(() => {
    const r = state.negligenceRule;
    if (r === "contributory" && faultPct > 0) {
      return {
        barred: true,
        faultNote: `${state.name} still follows pure contributory negligence. Any fault of your own — even 1% — bars recovery completely, which is why insurers in ${state.name} argue fault far harder than value.`,
      };
    }
    if (r === "modified comparative (50%)" && faultPct >= 50) {
      return { barred: true, faultNote: `${state.name} bars recovery once you are 50% or more at fault.` };
    }
    if (r === "modified comparative (51%)" && faultPct > 50) {
      return { barred: true, faultNote: `${state.name} bars recovery once you are more than 50% at fault.` };
    }
    return {
      barred: false,
      faultNote: `${state.name} applies ${r}. Your award is reduced by your share of fault${faultPct > 0 ? ` — here, ${faultPct}%` : ""}.`,
    };
  }, [state, faultPct]);

  const faultFactor = barred ? 0 : 1 - faultPct / 100;

  const psLow = Math.min(multiplierLow, perDiem > 0 ? Math.min(multiplierLow, perDiem) : multiplierLow) * faultFactor;
  const psHigh = Math.max(multiplierHigh, perDiem) * faultFactor;

  const totalLow = (specials + multiplierLow) * faultFactor;
  const totalHigh = (specials + multiplierHigh) * faultFactor;
  const netLow = totalLow * (1 - fee / 100);
  const netHigh = totalHigh * (1 - fee / 100);

  const cap = claimType === "medmal" ? rule.medMalCap : rule.generalCap;
  const capped = cap !== "No cap" && !cap.startsWith("No cap");
  const calc = medicalBase > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Medical bills billed to date ($)</Label>
          <Input type="number" value={medical} onChange={(e) => setMedical(e.target.value)} placeholder="12500" />
        </div>
        <div>
          <Label>Future / recommended treatment ($)</Label>
          <Input type="number" value={futureMedical} onChange={(e) => setFutureMedical(e.target.value)} placeholder="4000" />
        </div>
        <div>
          <Label>Lost wages ($)</Label>
          <Input type="number" value={wages} onChange={(e) => setWages(e.target.value)} placeholder="3200" />
        </div>
        <div>
          <Label>Your share of fault (%)</Label>
          <Input type="number" value={fault} onChange={(e) => setFault(e.target.value)} placeholder="0" />
        </div>
        <div className="sm:col-span-2">
          <Label>Injury severity</Label>
          <Select value={sev} onValueChange={(v) => setSev(v as Sev)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(SEVERITY).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>State where the claim is filed</Label>
          <Select value={stateSlug} onValueChange={setStateSlug}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="max-h-64">
              {stateData.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Claim type</Label>
          <Select value={claimType} onValueChange={(v) => setClaimType(v as "general" | "medmal")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Auto, premises, product or general injury</SelectItem>
              <SelectItem value="medmal">Medical malpractice</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Per-diem daily rate ($)</Label>
          <Input type="number" value={perDiemRate} onChange={(e) => setPerDiemRate(e.target.value)} />
        </div>
        <div>
          <Label>Days from injury to maximum medical improvement</Label>
          <Input type="number" value={recoveryDays} onChange={(e) => setRecoveryDays(e.target.value)} />
        </div>
        <div>
          <Label>Attorney contingency fee (%)</Label>
          <Input type="number" value={feePct} onChange={(e) => setFeePct(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <p className="text-sm font-medium">Adjuster value factors</p>
        {AGGRAVATORS.map((a) => (
          <label key={a.id} className="flex items-start gap-2 text-sm">
            <Checkbox
              checked={!!flags[a.id]}
              onCheckedChange={(v) => setFlags((f) => ({ ...f, [a.id]: !!v }))}
            />
            <span>
              {a.label}{" "}
              <span className={a.bump >= 0 ? "text-emerald-700 dark:text-emerald-500" : "text-amber-700 dark:text-amber-500"}>
                ({a.bump >= 0 ? "+" : ""}{a.bump}× multiplier)
              </span>
            </span>
          </label>
        ))}
      </div>

      {calc && (
        <Card className="print:shadow-none">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-serif font-bold text-lg">
                Pain and suffering estimate — {state.name}
              </h3>
              <Button variant="outline" size="sm" onClick={() => window.print()} className="print:hidden gap-2">
                <Printer className="h-4 w-4" /> Print / save PDF
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Multiplier method ({multLow.toFixed(2)}× – {multHigh.toFixed(2)}×)</p>
                <p className="text-2xl font-bold">{usd(multiplierLow)} – {usd(multiplierHigh)}</p>
                <p className="text-xs text-muted-foreground mt-1">Applied to {usd(medicalBase)} of medical specials</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Per-diem method</p>
                <p className="text-2xl font-bold">{usd(perDiem)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {usd(parseFloat(perDiemRate) || 0)}/day × {parseInt(recoveryDays) || 0} days
                </p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Pain and suffering, after fault</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">
                  {usd(psLow)} – {usd(psHigh)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Negotiating range to open from the top</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 rounded-lg border">
                <p className="text-xs text-muted-foreground">Total claim value (economic + pain and suffering)</p>
                <p className="text-xl font-bold">{usd(totalLow)} – {usd(totalHigh)}</p>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="text-xs text-muted-foreground">Estimated net to you after a {fee}% fee</p>
                <p className="text-xl font-bold">{usd(netLow)} – {usd(netHigh)}</p>
              </div>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
              <span className="font-medium">Comparative fault in {state.name}:</span> {faultNote}
            </div>

            <div className={`p-3 rounded-lg text-sm border ${capped ? "bg-amber-500/10 border-amber-500/20" : "bg-muted border-transparent"}`}>
              <span className="font-medium">
                {capped ? `Cap applies: ${cap}.` : "No statutory cap on pain and suffering for this claim type."}
              </span>{" "}
              {rule.note}
            </div>

            <div className="p-3 bg-muted rounded-lg text-sm">
              <span className="font-medium">Severity band note.</span> {band.blurb}
            </div>

            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p className="font-medium">Deadline check</p>
              <p>
                The personal-injury statute of limitations in {state.name} is {state.personalInjurySOL} from the date of injury.
                Miss it and the pain-and-suffering figure above is worth nothing, whatever the medical records say.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimates only, based on the multiplier and per-diem methods insurers and plaintiff firms both use.
              Caps and comparative-fault rules change; confirm the current figure for your state. Not legal advice.
            </p>
          </CardContent>
        </Card>
      )}

      <ToolResultAd show={!!calc} />

      <div className="rounded-lg border p-4 text-sm space-y-2">
        <p className="font-medium">How the two methods differ</p>
        <p>
          The <strong>multiplier method</strong> takes your medical specials and multiplies them by a factor
          between roughly 1× and 5× (higher for catastrophic injuries) to price the human cost. It is what
          claims software applies first, and it is why an insurer will fight hard about which treatment
          counts as "reasonable and necessary" — every dollar removed from the specials is removed several
          times over from the pain-and-suffering figure.
        </p>
        <p>
          The <strong>per-diem method</strong> assigns a daily value to living with the injury — commonly the
          claimant's own daily wage, on the argument that a day of pain is worth at least a day of work — and
          multiplies it by the days from the injury to maximum medical improvement. It works best for injuries
          with a clear, finite recovery period, and poorly for permanent conditions, where a life-care plan
          replaces it.
        </p>
        <p>
          In practice you calculate both, present whichever is higher in the demand letter, and keep the other
          as a fallback position when the adjuster attacks your methodology.
        </p>
      </div>

      <SettlementTaxabilityFAQ variant="personal-injury" className="mt-6" />
      <ToolRecommender topic="personal-injury" />
    </div>
  );
}
