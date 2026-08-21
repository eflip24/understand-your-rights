import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";
import ToolResultAd from "@/components/tools/ToolResultAd";
import {
  ALL_STATE_CODES,
  FEDERAL_ESTATE_EXEMPTION_2026,
  FEDERAL_ESTATE_TOP_RATE,
  NO_STATE_DEATH_TAX_NOTE,
  estateTaxStates,
  getEstateTaxState,
} from "@/data/estateTaxStates";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function EstateTaxEstimator() {
  const [stateCode, setStateCode] = useState("PA");
  const [realEstate, setRealEstate] = useState("");
  const [investments, setInvestments] = useState("");
  const [retirement, setRetirement] = useState("");
  const [lifeInsurance, setLifeInsurance] = useState("");
  const [business, setBusiness] = useState("");
  const [debts, setDebts] = useState("");
  const [married, setMarried] = useState(true);
  const [portability, setPortability] = useState(true);
  const [priorGifts, setPriorGifts] = useState("");
  const [heir, setHeir] = useState("child");

  const gross =
    (parseFloat(realEstate) || 0) +
    (parseFloat(investments) || 0) +
    (parseFloat(retirement) || 0) +
    (parseFloat(lifeInsurance) || 0) +
    (parseFloat(business) || 0);
  const liabilities = parseFloat(debts) || 0;
  const gifts = parseFloat(priorGifts) || 0;
  const net = Math.max(0, gross - liabilities);
  const taxableBase = net + gifts;

  const st = getEstateTaxState(stateCode);
  const federalExemption = FEDERAL_ESTATE_EXEMPTION_2026 * (married && portability ? 2 : 1);
  const federalTaxable = Math.max(0, taxableBase - federalExemption);
  const federalTax = federalTaxable * FEDERAL_ESTATE_TOP_RATE;

  let stateTax = 0;
  if (st && st.estateExemption > 0) {
    if (st.estateCliff && taxableBase > st.estateExemption * 1.05) {
      stateTax = taxableBase * st.estateTopRate * 0.6;
    } else if (taxableBase > st.estateExemption) {
      stateTax = (taxableBase - st.estateExemption) * st.estateTopRate * 0.75;
    }
  }

  const inhRate = st?.inheritance
    ? heir === "spouse"
      ? st.inheritance.spouse
      : heir === "child"
        ? st.inheritance.child
        : heir === "sibling"
          ? st.inheritance.sibling
          : st.inheritance.other
    : 0;
  const inheritanceTax = Math.max(0, net - stateTax - federalTax) * inhRate;

  const totalTax = federalTax + stateTax + inheritanceTax;
  const toHeirs = Math.max(0, net - totalTax);
  const calc = gross > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>State of residence at death</Label>
          <Select value={stateCode} onValueChange={setStateCode}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="max-h-72">
              {ALL_STATE_CODES.map((s) => <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Primary beneficiary</Label>
          <Select value={heir} onValueChange={setHeir}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="spouse">Spouse</SelectItem>
              <SelectItem value="child">Child or grandchild</SelectItem>
              <SelectItem value="sibling">Sibling</SelectItem>
              <SelectItem value="other">Niece, nephew, friend or other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Real estate ($)</Label><Input type="number" value={realEstate} onChange={(e) => setRealEstate(e.target.value)} placeholder="650000" /></div>
        <div><Label>Investments and bank accounts ($)</Label><Input type="number" value={investments} onChange={(e) => setInvestments(e.target.value)} placeholder="420000" /></div>
        <div><Label>Retirement accounts ($)</Label><Input type="number" value={retirement} onChange={(e) => setRetirement(e.target.value)} placeholder="300000" /></div>
        <div><Label>Life insurance death benefit ($)</Label><Input type="number" value={lifeInsurance} onChange={(e) => setLifeInsurance(e.target.value)} placeholder="500000" /></div>
        <div><Label>Business interests ($)</Label><Input type="number" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="0" /></div>
        <div><Label>Mortgages and debts ($)</Label><Input type="number" value={debts} onChange={(e) => setDebts(e.target.value)} placeholder="180000" /></div>
        <div><Label>Lifetime taxable gifts already made ($)</Label><Input type="number" value={priorGifts} onChange={(e) => setPriorGifts(e.target.value)} placeholder="0" /></div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <Checkbox checked={married} onCheckedChange={(v) => setMarried(!!v)} /> Married
        </label>
        {married && (
          <label className="flex items-center gap-2">
            <Checkbox checked={portability} onCheckedChange={(v) => setPortability(!!v)} /> Electing federal portability (doubles the exemption)
          </label>
        )}
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estate tax estimate</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Net taxable estate</p>
                <p className="text-2xl font-bold">{usd(taxableBase)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Total death taxes</p>
                <p className="text-2xl font-bold">{usd(totalTax)}</p>
                <p className="text-xs text-muted-foreground mt-1">{taxableBase > 0 ? ((totalTax / taxableBase) * 100).toFixed(1) : "0"}% effective rate</p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Passing to heirs</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{usd(toHeirs)}</p>
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-2 font-medium">Item</th><th className="text-right p-2 font-medium">Amount</th></tr></thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Gross estate</td><td className="p-2 text-right">{usd(gross)}</td></tr>
                  <tr className="border-t"><td className="p-2">Less debts and mortgages</td><td className="p-2 text-right text-destructive">-{usd(liabilities)}</td></tr>
                  {gifts > 0 && <tr className="border-t"><td className="p-2">Plus lifetime taxable gifts</td><td className="p-2 text-right">{usd(gifts)}</td></tr>}
                  <tr className="border-t"><td className="p-2">Federal exemption applied</td><td className="p-2 text-right">{usd(federalExemption)}</td></tr>
                  <tr className="border-t"><td className="p-2">Federal estate tax (40% top rate)</td><td className="p-2 text-right">{usd(federalTax)}</td></tr>
                  <tr className="border-t"><td className="p-2">State estate tax{st?.estateExemption ? ` (exemption ${usd(st.estateExemption)})` : ""}</td><td className="p-2 text-right">{usd(stateTax)}</td></tr>
                  <tr className="border-t"><td className="p-2">State inheritance tax{inhRate > 0 ? ` (${(inhRate * 100).toFixed(1)}%)` : ""}</td><td className="p-2 text-right">{usd(inheritanceTax)}</td></tr>
                  <tr className="border-t bg-muted/50 font-bold"><td className="p-2">Net to heirs</td><td className="p-2 text-right">{usd(toHeirs)}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
              {st
                ? <><span className="font-medium">{st.name}:</span> {st.inheritance?.note ?? `State estate tax applies above ${usd(st.estateExemption)} at rates up to ${(st.estateTopRate * 100).toFixed(0)}%.${st.estateCliff ? " New York applies a cliff — an estate more than 105% of the threshold is taxed on the entire value, not just the excess." : ""}`}</>
                : <><span className="font-medium">{ALL_STATE_CODES.find((s) => s.code === stateCode)?.name}:</span> {NO_STATE_DEATH_TAX_NOTE}</>}
            </div>

            <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
              <span className="font-medium">Life insurance is usually counted.</span> A policy you own is included in your gross estate for federal purposes. Transferring ownership to an irrevocable life insurance trust more than three years before death removes it — one of the few remaining levers for an estate close to a state threshold.
            </div>
          </CardContent>
        </Card>
      )}

      {calc && <ToolResultAd show />}

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-2 font-medium">State</th>
              <th className="text-right p-2 font-medium">Estate tax exemption</th>
              <th className="text-right p-2 font-medium">Top rate</th>
              <th className="text-right p-2 font-medium">Inheritance tax</th>
            </tr>
          </thead>
          <tbody>
            {estateTaxStates.map((s) => (
              <tr key={s.code} className="border-t">
                <td className="p-2">{s.name}</td>
                <td className="p-2 text-right">{s.estateExemption > 0 ? usd(s.estateExemption) : "None"}</td>
                <td className="p-2 text-right">{s.estateTopRate > 0 ? `${(s.estateTopRate * 100).toFixed(0)}%` : "—"}</td>
                <td className="p-2 text-right">{s.inheritance ? `Up to ${(Math.max(s.inheritance.other, s.inheritance.sibling) * 100).toFixed(0)}%` : "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="p-2 text-xs text-muted-foreground bg-muted/40">Every other US jurisdiction imposes neither an estate nor an inheritance tax. Figures reflect published 2025–2026 thresholds and are adjusted annually.</p>
      </div>

      <ToolRecommender topic="estate-planning" />
    </div>
  );
}
