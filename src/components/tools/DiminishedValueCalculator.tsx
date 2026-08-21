import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";
import ToolResultAd from "@/components/tools/ToolResultAd";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** 17c damage multipliers used by most carriers. */
const DAMAGE = [
  { id: "1.00", label: "Severe structural / frame damage", mult: 1.0 },
  { id: "0.75", label: "Major damage to structure and panels", mult: 0.75 },
  { id: "0.50", label: "Moderate damage to panels and paint", mult: 0.5 },
  { id: "0.25", label: "Minor damage to panels and paint", mult: 0.25 },
  { id: "0.00", label: "No structural damage / cosmetic only", mult: 0.0 },
];

/** 17c mileage multipliers. */
function mileageMultiplier(miles: number) {
  if (miles < 20_000) return 1.0;
  if (miles < 40_000) return 0.8;
  if (miles < 60_000) return 0.6;
  if (miles < 80_000) return 0.4;
  if (miles < 100_000) return 0.2;
  return 0.0;
}

export default function DiminishedValueCalculator() {
  const [value, setValue] = useState("");
  const [mileage, setMileage] = useState("");
  const [damage, setDamage] = useState("0.50");
  const [repairCost, setRepairCost] = useState("");
  const [age, setAge] = useState("3");
  const [luxury, setLuxury] = useState("standard");
  const [atFault, setAtFault] = useState("0");

  const preLoss = parseFloat(value) || 0;
  const miles = parseFloat(mileage) || 0;
  const repairs = parseFloat(repairCost) || 0;
  const vehicleAge = parseFloat(age) || 0;
  const fault = Math.min(100, Math.max(0, parseFloat(atFault) || 0));

  const dm = DAMAGE.find((d) => d.id === damage)?.mult ?? 0.5;
  const mm = mileageMultiplier(miles);

  // Formula 17c: 10% base cap → damage modifier → mileage modifier.
  const base = preLoss * 0.1;
  const c17 = base * dm * mm;

  // Market / appraisal method: repairs and brand desirability drive real loss.
  const brandFactor = luxury === "luxury" ? 1.35 : luxury === "truck" ? 1.15 : 1.0;
  const ageFactor = vehicleAge <= 2 ? 1.2 : vehicleAge <= 5 ? 1.0 : vehicleAge <= 8 ? 0.7 : 0.4;
  const repairRatio = preLoss > 0 ? Math.min(0.6, repairs / preLoss) : 0;
  const marketValue = preLoss * repairRatio * 0.35 * brandFactor * ageFactor;

  const netC17 = c17 * (1 - fault / 100);
  const netMarket = marketValue * (1 - fault / 100);
  const calc = preLoss > 0 && repairs > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Pre-accident market value ($)</Label><Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="28500" /></div>
        <div><Label>Cost of repairs ($)</Label><Input type="number" value={repairCost} onChange={(e) => setRepairCost(e.target.value)} placeholder="9400" /></div>
        <div><Label>Mileage at time of crash</Label><Input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="34000" /></div>
        <div><Label>Vehicle age (years)</Label><Input type="number" value={age} onChange={(e) => setAge(e.target.value)} /></div>
        <div>
          <Label>Severity of damage</Label>
          <Select value={damage} onValueChange={setDamage}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{DAMAGE.map((d) => <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Vehicle type</Label>
          <Select value={luxury} onValueChange={setLuxury}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard car / crossover</SelectItem>
              <SelectItem value="truck">Truck, SUV or performance model</SelectItem>
              <SelectItem value="luxury">Luxury / European marque</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Your share of fault (%)</Label><Input type="number" value={atFault} onChange={(e) => setAtFault(e.target.value)} /></div>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Diminished value estimate</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Insurer 17c formula</p>
                <p className="text-2xl font-bold">{usd(netC17)}</p>
                <p className="text-xs text-muted-foreground mt-1">10% cap × {dm.toFixed(2)} damage × {mm.toFixed(1)} mileage</p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Appraisal / market method</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{usd(netMarket)}</p>
                <p className="text-xs text-muted-foreground mt-1">What an independent appraiser typically supports</p>
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-2 font-medium">Step</th><th className="text-right p-2 font-medium">Value</th></tr></thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Base cap (10% of pre-loss value)</td><td className="p-2 text-right">{usd(base)}</td></tr>
                  <tr className="border-t"><td className="p-2">After damage multiplier</td><td className="p-2 text-right">{usd(base * dm)}</td></tr>
                  <tr className="border-t"><td className="p-2">After mileage multiplier</td><td className="p-2 text-right">{usd(c17)}</td></tr>
                  <tr className="border-t"><td className="p-2">Repairs as share of value</td><td className="p-2 text-right">{(repairRatio * 100).toFixed(0)}%</td></tr>
                  {fault > 0 && <tr className="border-t"><td className="p-2">Less your {fault}% comparative fault</td><td className="p-2 text-right text-destructive">-{usd(marketValue - netMarket)}</td></tr>}
                  <tr className="border-t bg-muted/50 font-bold"><td className="p-2">Realistic negotiating range</td><td className="p-2 text-right">{usd(netC17)} – {usd(Math.max(netMarket, netC17))}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
              <span className="font-medium">Why the two numbers differ.</span> Carriers open with Formula 17c because its 10% cap and mileage multiplier suppress the payout — a car over 100,000 miles scores zero. Independent appraisers instead compare real resale prices for accident-reported vehicles, which is why an appraisal usually beats the 17c offer. A CARFAX or AutoCheck structural-damage entry is the single strongest piece of evidence.
            </div>

            <div className="p-3 bg-amber-500/10 rounded-lg text-sm border border-amber-500/20">
              <span className="font-medium">First-party vs third-party.</span> Most states let you claim diminished value only against the at-fault driver's carrier. Georgia is the notable exception, where the Mabry decision requires your own insurer to pay it on a first-party collision claim.
            </div>
          </CardContent>
        </Card>
      )}

      {calc && <ToolResultAd />}

      <div className="rounded-lg border p-4 text-sm space-y-2">
        <h3 className="font-serif font-bold">How to document a diminished value claim</h3>
        <ol className="list-decimal ml-5 space-y-1 text-muted-foreground">
          <li>Pull the vehicle history report and confirm the accident is recorded.</li>
          <li>Get the final repair invoice showing structural or frame work.</li>
          <li>Order an independent diminished value appraisal ($200–$400).</li>
          <li>Collect three dealer trade-in quotes disclosing the accident history.</li>
          <li>Send a written demand to the at-fault carrier citing your state's loss-of-value case law.</li>
          <li>If refused, small claims court is usually available up to your state's limit.</li>
        </ol>
      </div>

      <ToolRecommender area="auto-accident" />
    </div>
  );
}
