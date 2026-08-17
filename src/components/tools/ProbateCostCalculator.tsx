import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";
import ToolResultAd from "@/components/tools/ToolResultAd";
import { probateStates, getProbateState, estimateProbateCost } from "@/data/probateFees";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function ProbateCostCalculator() {
  const [stateCode, setStateCode] = useState("CA");
  const [estateValue, setEstateValue] = useState("");
  const [mortgageDebt, setMortgageDebt] = useState("");
  const [nonProbateAssets, setNonProbateAssets] = useState("");
  const [parcels, setParcels] = useState("1");
  const [waiveExecutorFee, setWaiveExecutorFee] = useState(false);
  const [contested, setContested] = useState(false);

  const st = getProbateState(stateCode)!;
  const gross = parseFloat(estateValue) || 0;
  const nonProbate = parseFloat(nonProbateAssets) || 0;
  const debt = parseFloat(mortgageDebt) || 0;
  const realEstateParcels = parseInt(parcels) || 0;

  // Key trap: statutory fees in CA/FL/NY are calculated on GROSS value,
  // debts are NOT deducted. Non-probate assets are excluded entirely.
  const probateEstate = Math.max(0, gross - nonProbate);
  const feeBase = st.basis === "statutory-scale" ? probateEstate : Math.max(0, probateEstate - debt * 0.5);

  const result = estimateProbateCost(st, feeBase, { waiveExecutorFee, contested, realEstateParcels });
  const smallEstateEligible = probateEstate > 0 && probateEstate <= st.smallEstateLimit;
  const calc = gross > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>State</Label>
          <Select value={stateCode} onValueChange={setStateCode}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {probateStates.map((s) => (
                <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div><Label>Gross estate value ($)</Label><Input type="number" value={estateValue} onChange={(e) => setEstateValue(e.target.value)} placeholder="650000" /></div>
        <div><Label>Assets passing outside probate ($)</Label><Input type="number" value={nonProbateAssets} onChange={(e) => setNonProbateAssets(e.target.value)} placeholder="150000" /></div>
        <div><Label>Mortgages &amp; debts ($)</Label><Input type="number" value={mortgageDebt} onChange={(e) => setMortgageDebt(e.target.value)} placeholder="220000" /></div>
        <div><Label>Real estate parcels to appraise</Label><Input type="number" value={parcels} onChange={(e) => setParcels(e.target.value)} /></div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={waiveExecutorFee} onCheckedChange={(v) => setWaiveExecutorFee(!!v)} />
          Family executor waives the commission
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={contested} onCheckedChange={(v) => setContested(!!v)} />
          Will contest or beneficiary dispute expected
        </label>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated probate cost — {st.name}</h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Total probate cost</p>
                <p className="text-2xl font-bold">{usd(result.total)}</p>
                <p className="text-xs text-muted-foreground mt-1">{result.percentOfEstate.toFixed(1)}% of the probate estate</p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Net to heirs</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{usd(result.netToHeirs)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Typical duration</p>
                <p className="text-2xl font-bold">{st.typicalMonths[0]}–{st.typicalMonths[1]} mo</p>
                <p className="text-xs text-muted-foreground mt-1">{contested ? "A contest usually adds 12+ months" : "Uncontested estate"}</p>
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr><th className="text-left p-2 font-medium">Cost item</th><th className="text-right p-2 font-medium">Amount</th></tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Attorney fee {st.basis === "statutory-scale" ? "(statutory scale)" : "(reasonable fee)"}</td><td className="p-2 text-right">{usd(result.attorneyFee)}</td></tr>
                  <tr className="border-t"><td className="p-2">Executor / personal representative commission</td><td className="p-2 text-right">{result.executorFee === 0 ? "Waived" : usd(result.executorFee)}</td></tr>
                  <tr className="border-t"><td className="p-2">Court filing fee</td><td className="p-2 text-right">{usd(result.filingFee)}</td></tr>
                  <tr className="border-t"><td className="p-2">Appraisal, probate referee &amp; bond</td><td className="p-2 text-right">{usd(result.appraisalAndBond)}</td></tr>
                  <tr className="border-t"><td className="p-2">Publication &amp; certified copies</td><td className="p-2 text-right">{usd(result.publicationAndCertified)}</td></tr>
                  <tr className="border-t"><td className="p-2">Estate accounting &amp; final tax returns</td><td className="p-2 text-right">{usd(result.accountingAndTax)}</td></tr>
                  <tr className="border-t bg-muted/50 font-bold"><td className="p-2">Total</td><td className="p-2 text-right">{usd(result.total)}</td></tr>
                </tbody>
              </table>
            </div>

            {smallEstateEligible && (
              <div className="p-3 bg-emerald-500/10 rounded-lg text-sm border border-emerald-500/20">
                <span className="font-medium">You may be able to skip formal probate.</span> {st.name} allows a small-estate affidavit or summary administration for probate estates up to {usd(st.smallEstateLimit)} — usually a filing fee plus a short waiting period instead of the fees above.
              </div>
            )}

            {st.basis === "statutory-scale" && (
              <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
                <span className="font-medium">Fees are calculated on gross value, not equity.</span> A {usd(probateEstate)} home with a {usd(debt)} mortgage still generates fees on the full {usd(probateEstate)} in {st.name}.
              </div>
            )}

            <div className="p-3 bg-muted rounded-lg text-sm">
              <p><span className="font-medium">{st.name} rule:</span> {st.notes}</p>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimates only. Extraordinary services (litigation, sale of a business, tax controversies) are billed on top with court approval. Confirm current fees with the probate clerk in the county of residence. Not legal advice.
            </p>
          </CardContent>
        </Card>
      )}

      <ToolResultAd show={!!calc} />
      <ToolRecommender topic="estate-planning" />
    </div>
  );
}
