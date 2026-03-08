import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const limits: Record<string, { limit: number; notes: string }> = {
  "Alabama": { limit: 6000, notes: "District Court" },
  "Alaska": { limit: 10000, notes: "District Court" },
  "Arizona": { limit: 3500, notes: "Justice Court" },
  "California": { limit: 12500, notes: "Small Claims Division of Superior Court" },
  "Colorado": { limit: 7500, notes: "County Court" },
  "Connecticut": { limit: 5000, notes: "Small Claims Session" },
  "Delaware": { limit: 25000, notes: "Justice of the Peace Court" },
  "Florida": { limit: 8000, notes: "County Court" },
  "Georgia": { limit: 15000, notes: "Magistrate Court" },
  "Hawaii": { limit: 5000, notes: "District Court, Small Claims Division" },
  "Idaho": { limit: 5000, notes: "Magistrate's Division" },
  "Illinois": { limit: 10000, notes: "Small Claims Court" },
  "Indiana": { limit: 10000, notes: "Small Claims Court" },
  "Iowa": { limit: 6500, notes: "Small Claims Court" },
  "Kansas": { limit: 4000, notes: "District Court, Small Claims" },
  "Kentucky": { limit: 2500, notes: "District Court, Small Claims" },
  "Louisiana": { limit: 5000, notes: "City Court / Justice of the Peace" },
  "Maine": { limit: 6000, notes: "District Court, Small Claims" },
  "Maryland": { limit: 5000, notes: "District Court" },
  "Massachusetts": { limit: 7000, notes: "Boston Municipal Court / District Court" },
  "Michigan": { limit: 6500, notes: "District Court, Small Claims" },
  "Minnesota": { limit: 15000, notes: "Conciliation Court" },
  "Mississippi": { limit: 3500, notes: "Justice Court" },
  "Missouri": { limit: 5000, notes: "Small Claims Court" },
  "Montana": { limit: 7000, notes: "Justice's Court / District Court" },
  "Nebraska": { limit: 3600, notes: "County Court" },
  "Nevada": { limit: 10000, notes: "Justice Court, Small Claims" },
  "New Hampshire": { limit: 10000, notes: "District Court, Small Claims" },
  "New Jersey": { limit: 5000, notes: "Special Civil Part" },
  "New Mexico": { limit: 10000, notes: "Magistrate Court / Metropolitan Court" },
  "New York": { limit: 10000, notes: "Small Claims Court (NYC: $10,000)" },
  "North Carolina": { limit: 10000, notes: "District Court, Small Claims" },
  "North Dakota": { limit: 15000, notes: "District Court, Small Claims" },
  "Ohio": { limit: 6000, notes: "Small Claims Division" },
  "Oklahoma": { limit: 10000, notes: "District Court, Small Claims" },
  "Oregon": { limit: 10000, notes: "Justice Court / Circuit Court" },
  "Pennsylvania": { limit: 12000, notes: "District Justice Court" },
  "Rhode Island": { limit: 5000, notes: "District Court, Small Claims" },
  "South Carolina": { limit: 7500, notes: "Magistrate's Court" },
  "South Dakota": { limit: 12000, notes: "Circuit Court, Small Claims" },
  "Tennessee": { limit: 25000, notes: "General Sessions Court" },
  "Texas": { limit: 20000, notes: "Justice Court" },
  "Utah": { limit: 11000, notes: "Small Claims Court" },
  "Vermont": { limit: 5000, notes: "Superior Court, Small Claims" },
  "Virginia": { limit: 5000, notes: "General District Court" },
  "Washington": { limit: 10000, notes: "District Court, Small Claims" },
  "West Virginia": { limit: 10000, notes: "Magistrate Court" },
  "Wisconsin": { limit: 10000, notes: "Small Claims Court" },
  "Wyoming": { limit: 6000, notes: "Circuit Court, Small Claims" },
  "District of Columbia": { limit: 10000, notes: "Superior Court, Small Claims" },
};

const stateNames = Object.keys(limits).sort();

export default function SmallClaimsLimitChecker() {
  const [state, setState] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [result, setResult] = useState<{ limit: number; notes: string; eligible: boolean } | null>(null);

  const check = () => {
    const data = limits[state];
    if (!data) return;
    const amount = parseFloat(claimAmount) || 0;
    setResult({ ...data, eligible: amount <= data.limit });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state..." /></SelectTrigger>
            <SelectContent>
              {stateNames.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Your Claim Amount ($) (optional)</Label>
          <input type="number" placeholder="5000" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>
      </div>
      <Button onClick={check} disabled={!state} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Check Limit
      </Button>
      {result && (
        <div className="space-y-3 pt-2">
          <div className="p-6 rounded-lg bg-secondary text-center space-y-1">
            <p className="text-3xl font-bold font-serif">${result.limit.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Maximum small claims amount in {state}</p>
            <p className="text-xs text-muted-foreground">{result.notes}</p>
          </div>
          {claimAmount && (
            <div className={`p-4 rounded-lg text-center ${result.eligible ? "bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-800" : "bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-800"}`}>
              <p className={`text-sm font-medium ${result.eligible ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}>
                {result.eligible
                  ? `✓ Your claim of $${parseFloat(claimAmount).toLocaleString()} is within the small claims limit.`
                  : `✗ Your claim of $${parseFloat(claimAmount).toLocaleString()} exceeds the small claims limit. You may need to file in a higher court.`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
