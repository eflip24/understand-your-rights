import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Approximate filing fees (USD) by state
const FILING_FEES: Record<string, number> = {
  "California": 435, "New York": 335, "Texas": 350, "Florida": 408, "Illinois": 388,
  "Pennsylvania": 350, "Ohio": 300, "Georgia": 220, "North Carolina": 225, "Michigan": 175, "Other": 300,
};

export default function DivorceCostEstimator() {
  const [state, setState] = useState("California");
  const [type, setType] = useState<"uncontested" | "mediated" | "contested" | "litigated">("uncontested");
  const [hasChildren, setHasChildren] = useState<"no" | "yes">("no");
  const [hasAssets, setHasAssets] = useState<"low" | "moderate" | "high">("low");
  const [hourlyRate, setHourlyRate] = useState("325");

  const filingFee = FILING_FEES[state];
  const rate = parseFloat(hourlyRate) || 325;

  const baseHours: Record<string, number> = { uncontested: 3, mediated: 12, contested: 60, litigated: 150 };
  let hours = baseHours[type];
  if (hasChildren === "yes") hours *= 1.4;
  if (hasAssets === "moderate") hours *= 1.3;
  if (hasAssets === "high") hours *= 1.8;

  const attorneyFees = hours * rate;
  const mediation = type === "mediated" ? 2500 : type === "contested" ? 4000 : 0;
  const courtCosts = type === "litigated" ? 3500 : type === "contested" ? 1500 : 250;

  const low = filingFee + attorneyFees * 0.7 + mediation + courtCosts * 0.6;
  const high = filingFee + attorneyFees * 1.3 + mediation * 1.5 + courtCosts * 1.4;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(FILING_FEES).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Divorce Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="uncontested">Uncontested (both agree)</SelectItem>
              <SelectItem value="mediated">Mediated</SelectItem>
              <SelectItem value="contested">Contested (settled out of court)</SelectItem>
              <SelectItem value="litigated">Litigated (full trial)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Children Involved?</Label>
          <Select value={hasChildren} onValueChange={(v) => setHasChildren(v as "no" | "yes")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes (custody/support disputed)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Marital Asset Complexity</Label>
          <Select value={hasAssets} onValueChange={(v) => setHasAssets(v as typeof hasAssets)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (renters, no business)</SelectItem>
              <SelectItem value="moderate">Moderate (home, retirement accounts)</SelectItem>
              <SelectItem value="high">High (business, multiple properties)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2"><Label>Attorney Hourly Rate ($)</Label><Input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} /></div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-serif font-bold text-lg">Estimated Total Cost (per spouse)</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Low Estimate</p>
              <p className="text-3xl font-bold text-accent">${low.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">High Estimate</p>
              <p className="text-3xl font-bold text-accent">${high.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
            <p><span className="font-medium">Filing fee ({state}):</span> ${filingFee}</p>
            <p><span className="font-medium">Estimated attorney hours:</span> {hours.toFixed(0)} @ ${rate}/hr</p>
            {mediation > 0 && <p><span className="font-medium">Mediation:</span> ~${mediation}</p>}
            <p><span className="font-medium">Court costs:</span> ~${courtCosts}</p>
          </div>
          <p className="text-xs text-muted-foreground">Estimates are per spouse. Costs scale dramatically with conflict — uncontested divorces cost a fraction of contested ones. Not legal advice.</p>
        </CardContent>
      </Card>
    </div>
  );
}
