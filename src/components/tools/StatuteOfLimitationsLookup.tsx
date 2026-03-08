import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const solData: Record<string, Record<string, { years: number; notes: string }>> = {
  "Written Contract": {
    "California": { years: 4, notes: "Cal. Code Civ. Proc. § 337" },
    "New York": { years: 6, notes: "N.Y. C.P.L.R. § 213(2)" },
    "Texas": { years: 4, notes: "Tex. Civ. Prac. & Rem. Code § 16.004" },
    "Florida": { years: 5, notes: "Fla. Stat. § 95.11(2)(b)" },
    "Illinois": { years: 10, notes: "735 ILCS 5/13-206" },
    "Other": { years: 6, notes: "Most states range from 3-10 years. Check your state specifically." },
  },
  "Oral Contract": {
    "California": { years: 2, notes: "Cal. Code Civ. Proc. § 339" },
    "New York": { years: 6, notes: "N.Y. C.P.L.R. § 213(2)" },
    "Texas": { years: 4, notes: "Tex. Civ. Prac. & Rem. Code § 16.004" },
    "Florida": { years: 4, notes: "Fla. Stat. § 95.11(3)(k)" },
    "Illinois": { years: 5, notes: "735 ILCS 5/13-205" },
    "Other": { years: 4, notes: "Most states range from 2-6 years for oral contracts." },
  },
  "Personal Injury": {
    "California": { years: 2, notes: "Cal. Code Civ. Proc. § 335.1" },
    "New York": { years: 3, notes: "N.Y. C.P.L.R. § 214(5)" },
    "Texas": { years: 2, notes: "Tex. Civ. Prac. & Rem. Code § 16.003" },
    "Florida": { years: 4, notes: "Fla. Stat. § 95.11(3)(a)" },
    "Illinois": { years: 2, notes: "735 ILCS 5/13-202" },
    "Other": { years: 2, notes: "Most states allow 2-3 years for personal injury claims." },
  },
  "Property Damage": {
    "California": { years: 3, notes: "Cal. Code Civ. Proc. § 338(b)" },
    "New York": { years: 3, notes: "N.Y. C.P.L.R. § 214(4)" },
    "Texas": { years: 2, notes: "Tex. Civ. Prac. & Rem. Code § 16.003" },
    "Florida": { years: 4, notes: "Fla. Stat. § 95.11(3)(h)" },
    "Illinois": { years: 5, notes: "735 ILCS 5/13-205" },
    "Other": { years: 3, notes: "Most states allow 2-6 years for property damage claims." },
  },
  "Fraud": {
    "California": { years: 3, notes: "Cal. Code Civ. Proc. § 338(d)" },
    "New York": { years: 6, notes: "N.Y. C.P.L.R. § 213(8)" },
    "Texas": { years: 4, notes: "Tex. Civ. Prac. & Rem. Code § 16.004" },
    "Florida": { years: 4, notes: "Fla. Stat. § 95.11(3)(j)" },
    "Illinois": { years: 5, notes: "735 ILCS 5/13-205" },
    "Other": { years: 4, notes: "Most states allow 3-6 years for fraud claims." },
  },
};

const claimTypes = Object.keys(solData);
const states = ["California", "New York", "Texas", "Florida", "Illinois", "Other"];

export default function StatuteOfLimitationsLookup() {
  const [claimType, setClaimType] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState<{ years: number; notes: string } | null>(null);

  const lookup = () => {
    const data = solData[claimType]?.[state];
    if (data) setResult(data);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Claim Type</Label>
          <Select value={claimType} onValueChange={setClaimType}>
            <SelectTrigger><SelectValue placeholder="Select claim type..." /></SelectTrigger>
            <SelectContent>
              {claimTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state..." /></SelectTrigger>
            <SelectContent>
              {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={lookup} disabled={!claimType || !state} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Look Up
      </Button>
      {result && (
        <div className="p-6 rounded-lg bg-secondary text-center space-y-2">
          <p className="text-3xl font-bold font-serif">{result.years} Year{result.years !== 1 ? "s" : ""}</p>
          <p className="text-sm text-muted-foreground">{result.notes}</p>
          <p className="text-xs text-muted-foreground mt-2">⚠️ This is general information. Consult a lawyer for your specific situation.</p>
        </div>
      )}
    </div>
  );
}
