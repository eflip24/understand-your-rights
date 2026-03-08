import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const stateInfo: Record<string, { enforceability: string; notes: string; maxDuration: string }> = {
  "California": { enforceability: "Generally Unenforceable", notes: "California broadly prohibits non-compete agreements under Business and Professions Code § 16600.", maxDuration: "N/A" },
  "Oklahoma": { enforceability: "Generally Unenforceable", notes: "Oklahoma law voids non-compete clauses in most employment contexts.", maxDuration: "N/A" },
  "North Dakota": { enforceability: "Generally Unenforceable", notes: "Non-competes are largely unenforceable under North Dakota law.", maxDuration: "N/A" },
  "Texas": { enforceability: "Enforceable with Limits", notes: "Must be reasonable in scope, time, and geography. Typically limited to 2 years.", maxDuration: "2 years" },
  "New York": { enforceability: "Enforceable with Limits", notes: "Courts apply a reasonableness test. Duration, geography, and hardship are all considered.", maxDuration: "1-2 years" },
  "Florida": { enforceability: "Enforceable", notes: "Florida favors enforceability and has specific statutes governing non-competes.", maxDuration: "2 years typical" },
  "Illinois": { enforceability: "Enforceable with Limits", notes: "Requires adequate consideration. Recent laws restrict use for low-wage workers.", maxDuration: "2 years" },
  "Colorado": { enforceability: "Limited", notes: "Largely prohibited as of 2022 for workers earning below a certain threshold.", maxDuration: "Varies" },
  "Massachusetts": { enforceability: "Enforceable with Limits", notes: "Limited to 12 months. Garden leave or mutually-agreed consideration required.", maxDuration: "12 months" },
  "Other State": { enforceability: "Varies", notes: "Most states allow reasonable non-competes. Check your specific state law.", maxDuration: "1-2 years typical" },
};

export default function NonCompeteChecker() {
  const [state, setState] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState<typeof stateInfo[string] & { durationWarning?: string } | null>(null);

  const check = () => {
    const info = stateInfo[state] || stateInfo["Other State"];
    const months = parseInt(duration);
    let durationWarning: string | undefined;
    if (months > 24) durationWarning = "Most courts consider durations over 2 years to be unreasonable.";
    else if (months > 12) durationWarning = "Longer durations face more scrutiny. Consider consulting a lawyer.";
    setResult({ ...info, durationWarning });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state..." /></SelectTrigger>
            <SelectContent>
              {Object.keys(stateInfo).map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Duration (months)</Label>
          <Input type="number" placeholder="12" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
      </div>
      <Button onClick={check} disabled={!state || !duration} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Check Enforceability
      </Button>
      {result && (
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-lg bg-secondary">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={result.enforceability.includes("Unenforceable") ? "destructive" : "default"}>
                {result.enforceability}
              </Badge>
              {result.maxDuration !== "N/A" && (
                <span className="text-xs text-muted-foreground">Max: {result.maxDuration}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{result.notes}</p>
          </div>
          {result.durationWarning && (
            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">⚠️ {result.durationWarning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
