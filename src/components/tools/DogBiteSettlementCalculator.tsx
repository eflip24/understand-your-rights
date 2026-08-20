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

type Liability = "strict" | "one-bite" | "mixed";

const LIABILITY: Record<Liability, { label: string; factor: number; note: string }> = {
  strict: {
    label: "Strict liability state (CA, FL, MI, NJ, PA, IL and ~32 others)",
    factor: 1,
    note: "The owner is liable for the bite regardless of whether the dog ever bit anyone before. You only have to prove the bite, your lawful presence, and your damages.",
  },
  "one-bite": {
    label: "One-bite / negligence state (TX, VA, NY partial, AK, MS, NM…)",
    factor: 0.75,
    note: "You must show the owner knew or should have known the dog was dangerous — prior bites, growling complaints, animal-control reports, or 'Beware of Dog' signage.",
  },
  mixed: {
    label: "Mixed rule (strict for medical costs, negligence for pain & suffering)",
    factor: 0.88,
    note: "Some states, notably New York, impose strict liability for veterinary and medical expenses but require proof of vicious propensity for pain-and-suffering damages.",
  },
};

type Sev = "minor" | "moderate" | "severe" | "disfiguring";
const SEV: Record<Sev, { label: string; low: number; high: number }> = {
  minor: { label: "Level 2–3: punctures, no surgery", low: 1.5, high: 2.5 },
  moderate: { label: "Level 4: deep punctures, sutures, infection risk", low: 2.5, high: 4 },
  severe: { label: "Level 5: multiple deep bites, surgical repair, nerve damage", low: 4, high: 6 },
  disfiguring: { label: "Facial disfigurement, permanent scarring, or child victim", low: 5, high: 9 },
};

export default function DogBiteSettlementCalculator() {
  const [medical, setMedical] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [wages, setWages] = useState("");
  const [sev, setSev] = useState<Sev>("moderate");
  const [liability, setLiability] = useState<Liability>("strict");
  const [victimChild, setVictimChild] = useState(false);
  const [scarring, setScarring] = useState(false);
  const [priorBite, setPriorBite] = useState(false);
  const [provoked, setProvoked] = useState(false);
  const [policyLimit, setPolicyLimit] = useState("");
  const [feePct, setFeePct] = useState("33.33");

  const med = parseFloat(medical) || 0;
  const futMed = parseFloat(futureMedical) || 0;
  const wage = parseFloat(wages) || 0;
  const fee = Math.min(50, Math.max(0, parseFloat(feePct) || 0));
  const limit = parseFloat(policyLimit) || 0;

  const specials = med + futMed + wage;
  const band = SEV[sev];
  const rule = LIABILITY[liability];

  let low = band.low;
  let high = band.high;
  if (victimChild) { low += 0.5; high += 1.5; }
  if (scarring) { low += 0.5; high += 1.5; }
  if (priorBite) { low += 0.5; high += 1; }

  const provocationFactor = provoked ? 0.55 : 1;
  const factor = rule.factor * provocationFactor;

  const painLow = specials * low * factor;
  const painHigh = specials * high * factor;

  let grossLow = specials * factor + painLow;
  let grossHigh = specials * factor + painHigh;

  const cappedByPolicy = limit > 0 && grossHigh > limit;
  if (limit > 0) {
    grossLow = Math.min(grossLow, limit);
    grossHigh = Math.min(grossHigh, limit);
  }

  const netLow = grossLow * (1 - fee / 100);
  const netHigh = grossHigh * (1 - fee / 100);
  const calc = specials > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Medical bills to date ($)</Label><Input type="number" value={medical} onChange={(e) => setMedical(e.target.value)} placeholder="9500" /></div>
        <div><Label>Future care: scar revision, plastic surgery ($)</Label><Input type="number" value={futureMedical} onChange={(e) => setFutureMedical(e.target.value)} placeholder="6000" /></div>
        <div><Label>Lost wages / caregiver time off ($)</Label><Input type="number" value={wages} onChange={(e) => setWages(e.target.value)} placeholder="2200" /></div>
        <div><Label>Homeowner / renter policy limit ($, optional)</Label><Input type="number" value={policyLimit} onChange={(e) => setPolicyLimit(e.target.value)} placeholder="300000" /></div>
        <div className="sm:col-span-2">
          <Label>Bite severity (Dunbar scale)</Label>
          <Select value={sev} onValueChange={(v) => setSev(v as Sev)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.entries(SEV).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>Your state's liability rule</Label>
          <Select value={liability} onValueChange={(v) => setLiability(v as Liability)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.entries(LIABILITY).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Attorney contingency fee (%)</Label><Input type="number" value={feePct} onChange={(e) => setFeePct(e.target.value)} /></div>
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <p className="text-sm font-medium">Case factors</p>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={victimChild} onCheckedChange={(v) => setVictimChild(!!v)} /><span>Victim is a child under 12 (bites are usually to the face and head)</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={scarring} onCheckedChange={(v) => setScarring(!!v)} /><span>Permanent visible scarring or disfigurement</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={priorBite} onCheckedChange={(v) => setPriorBite(!!v)} /><span>Documented prior bite or animal-control complaint against this dog</span></label>
        <label className="flex items-start gap-2 text-sm"><Checkbox checked={provoked} onCheckedChange={(v) => setProvoked(!!v)} /><span>Insurer is arguing provocation or trespass</span></label>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated dog bite settlement range</h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Economic damages</p><p className="text-2xl font-bold">{usd(specials)}</p></div>
              <div className="p-4 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Gross settlement range</p><p className="text-2xl font-bold">{usd(grossLow)} – {usd(grossHigh)}</p><p className="text-xs text-muted-foreground mt-1">Pain & suffering {usd(painLow)} – {usd(painHigh)}</p></div>
              <div className="p-4 bg-emerald-500/10 rounded-lg"><p className="text-xs text-muted-foreground">Estimated net to you</p><p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{usd(netLow)} – {usd(netHigh)}</p><p className="text-xs text-muted-foreground mt-1">After a {fee}% contingency fee</p></div>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
              <span className="font-medium">Your state's rule:</span> {rule.note}
            </div>

            {cappedByPolicy && (
              <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
                <span className="font-medium">Capped by the policy limit.</span> Homeowner and renter policies typically carry $100,000–$500,000 of liability coverage, and many carriers — State Farm, Allstate, Farmers and Travelers among them — exclude or surcharge specific breeds. Above the limit you are chasing the owner's personal assets or an umbrella policy, which is why a limits-disclosure demand should be your first letter.
              </div>
            )}

            {provoked && (
              <div className="p-3 bg-muted rounded-lg text-sm">
                <span className="font-medium">Provocation defence applied (−45%).</span> Counter it with the animal-control report, photos of the scene showing where the dog was confined, and witness statements confirming you were lawfully present and did not tease, strike or corner the animal.
              </div>
            )}

            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p className="font-medium">Evidence that raises the number</p>
              <p>Animal-control incident number, rabies vaccination status, ER records and wound-care notes, dated scar photographs at 2 weeks / 3 months / 12 months, a plastic surgeon's scar-revision estimate, and a therapist's note if the victim developed cynophobia or PTSD.</p>
            </div>

            <p className="text-xs text-muted-foreground">Estimates only. Average US dog bite claims paid by insurers run roughly $58,000–$70,000, but facial injuries to children settle far higher. Not legal advice.</p>
          </CardContent>
        </Card>
      )}

      <ToolResultAd show={!!calc} />

      <SettlementTaxabilityFAQ variant="personal-injury" className="mt-6" />
      <ToolRecommender topic="personal-injury" />
    </div>
  );
}
