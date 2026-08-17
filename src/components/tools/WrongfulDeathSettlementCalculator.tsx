import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";
import SettlementTaxabilityFAQ from "@/components/tools/SettlementTaxabilityFAQ";
import ToolResultAd from "@/components/tools/ToolResultAd";
import {
  wrongfulDeathStates,
  getWrongfulDeathState,
  presentValueFactor,
  consumptionOffset,
} from "@/data/wrongfulDeathStates";

const usd = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

const FAULT_LABEL: Record<string, string> = {
  "pure-comparative": "Pure comparative negligence — your recovery is reduced by your share of fault, with no cutoff.",
  "modified-50": "Modified comparative (50% bar) — recovery is barred at 50% or more fault.",
  "modified-51": "Modified comparative (51% bar) — recovery is barred at 51% or more fault.",
  contributory: "Pure contributory negligence — any fault attributed to the decedent can bar recovery entirely.",
};

export default function WrongfulDeathSettlementCalculator() {
  const [stateCode, setStateCode] = useState("CA");
  const [age, setAge] = useState("42");
  const [retirementAge, setRetirementAge] = useState("67");
  const [income, setIncome] = useState("");
  const [benefitsPct, setBenefitsPct] = useState("22");
  const [householdSize, setHouseholdSize] = useState("3");
  const [medicalBills, setMedicalBills] = useState("");
  const [funeral, setFuneral] = useState("12000");
  const [servicesPerYear, setServicesPerYear] = useState("8000");
  const [preDeathSuffering, setPreDeathSuffering] = useState(false);
  const [grossNegligence, setGrossNegligence] = useState(false);
  const [faultPct, setFaultPct] = useState("0");

  const st = getWrongfulDeathState(stateCode)!;
  const currentAge = parseFloat(age) || 0;
  const retire = parseFloat(retirementAge) || 0;
  const wage = parseFloat(income) || 0;
  const benefits = parseFloat(benefitsPct) || 0;
  const hh = parseInt(householdSize) || 1;
  const meds = parseFloat(medicalBills) || 0;
  const funeralCost = parseFloat(funeral) || 0;
  const services = parseFloat(servicesPerYear) || 0;
  const fault = Math.min(100, Math.max(0, parseFloat(faultPct) || 0));

  const workYears = Math.max(0, retire - currentAge);
  const pvFactorWork = presentValueFactor(workYears);
  // Household services are typically projected to life expectancy, not retirement.
  const serviceYears = Math.max(0, Math.min(78 - currentAge, 40));
  const pvFactorServices = presentValueFactor(serviceYears);

  const totalComp = wage * (1 + benefits / 100);
  const offset = consumptionOffset(hh);
  const netSupport = totalComp * (1 - offset);
  const lostSupport = netSupport * pvFactorWork;
  const lostServices = services * pvFactorServices;

  const economic = lostSupport + lostServices + meds + funeralCost;

  // Non-economic: multiplier approach anchored on economic loss and dependants.
  const dependants = Math.max(0, hh - 1);
  const baseMultiplier = 0.8 + Math.min(dependants, 4) * 0.35;
  let nonEconomicRaw = st.nonEconomicAllowed ? economic * baseMultiplier : 0;
  if (preDeathSuffering && st.nonEconomicAllowed) nonEconomicRaw *= 1.25;
  const nonEconomic = st.nonEconomicCap
    ? Math.min(nonEconomicRaw, st.nonEconomicCap)
    : nonEconomicRaw;
  const capApplied = st.nonEconomicCap !== null && nonEconomicRaw > st.nonEconomicCap;

  const punitive = st.punitiveAllowed && grossNegligence ? (economic + nonEconomic) * 0.5 : 0;

  const grossLow = (economic * 0.7 + nonEconomic * 0.5 + punitive * 0.3);
  const grossHigh = economic + nonEconomic + punitive;

  const barred =
    (st.faultRule === "contributory" && fault > 0) ||
    (st.faultRule === "modified-50" && fault >= 50) ||
    (st.faultRule === "modified-51" && fault >= 51);

  const reduction = 1 - fault / 100;
  const netLow = barred ? 0 : grossLow * reduction;
  const netHigh = barred ? 0 : grossHigh * reduction;

  const calc = wage > 0 || meds > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>State where the claim is filed</Label>
          <Select value={stateCode} onValueChange={setStateCode}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {wrongfulDeathStates.map((s) => (
                <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div><Label>Decedent's age at death</Label><Input type="number" value={age} onChange={(e) => setAge(e.target.value)} /></div>
        <div><Label>Expected retirement age</Label><Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} /></div>
        <div><Label>Annual gross income ($)</Label><Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="72000" /></div>
        <div><Label>Employer benefits (% of wage)</Label><Input type="number" value={benefitsPct} onChange={(e) => setBenefitsPct(e.target.value)} /></div>
        <div><Label>Household size (incl. decedent)</Label><Input type="number" value={householdSize} onChange={(e) => setHouseholdSize(e.target.value)} /></div>
        <div><Label>Final medical bills ($)</Label><Input type="number" value={medicalBills} onChange={(e) => setMedicalBills(e.target.value)} placeholder="48000" /></div>
        <div><Label>Funeral &amp; burial ($)</Label><Input type="number" value={funeral} onChange={(e) => setFuneral(e.target.value)} /></div>
        <div><Label>Annual value of household services ($)</Label><Input type="number" value={servicesPerYear} onChange={(e) => setServicesPerYear(e.target.value)} /></div>
        <div><Label>Fault attributed to the decedent (%)</Label><Input type="number" value={faultPct} onChange={(e) => setFaultPct(e.target.value)} /></div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={preDeathSuffering} onCheckedChange={(v) => setPreDeathSuffering(!!v)} />
          Decedent survived with conscious pain before death (survival claim)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={grossNegligence} onCheckedChange={(v) => setGrossNegligence(!!v)} />
          Evidence of gross negligence, DUI or willful misconduct
        </label>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Wrongful death valuation — {st.name}</h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Economic damages (present value)</p>
                <p className="text-2xl font-bold">{usd(economic)}</p>
                <p className="text-xs text-muted-foreground mt-1">{workYears} work years · {(offset * 100).toFixed(0)}% personal-consumption offset</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Non-economic damages</p>
                <p className="text-2xl font-bold">{st.nonEconomicAllowed ? usd(nonEconomic) : "Not recoverable"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {st.nonEconomicAllowed
                    ? capApplied ? `Capped at ${usd(st.nonEconomicCap!)} by statute` : `${baseMultiplier.toFixed(2)}× multiplier · ${dependants} dependant(s)`
                    : "This state limits recovery to pecuniary loss"}
                </p>
              </div>
            </div>

            {punitive > 0 && (
              <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
                <span className="font-medium">Punitive exposure:</span> approximately {usd(punitive)} where gross negligence is proven. Punitive damages are taxable even when the compensatory portion is not.
              </div>
            )}

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-2">
              <p className="text-xs text-muted-foreground">Estimated settlement range (after {fault}% comparative fault)</p>
              {barred ? (
                <p className="text-lg font-bold text-destructive">
                  Recovery likely barred — {st.name} applies the {st.faultRule.replace("-", " ")} rule at this fault level.
                </p>
              ) : (
                <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-500">
                  {usd(netLow)} – {usd(netHigh)}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                The low end reflects a pre-suit insurance settlement; the high end reflects a well-documented case worked up for trial with an economist's report.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Filing deadline</p>
                <p className="font-bold">{st.solYears} year{st.solYears > 1 ? "s" : ""} from death</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Punitive damages</p>
                <p className="font-bold">{st.punitiveAllowed ? "Available" : "Not available"}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Who may file</p>
                <p className="font-medium text-xs">{st.claimants}</p>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">Fault rule:</span> {FAULT_LABEL[st.faultRule]}</p>
              <p><span className="font-medium">{st.name} note:</span> {st.note}</p>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimates only. Real wrongful death valuations depend on the defendant's insurance limits, the economist's discount rate, jury venue and the strength of liability evidence. This is not legal advice.
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
