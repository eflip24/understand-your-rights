import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SOL_YEARS: Record<string, Record<string, number>> = {
  "Written Contract": { "California": 4, "New York": 6, "Texas": 4, "Florida": 5, "Illinois": 10, "Other": 6 },
  "Oral Contract": { "California": 2, "New York": 6, "Texas": 4, "Florida": 4, "Illinois": 5, "Other": 4 },
  "Personal Injury": { "California": 2, "New York": 3, "Texas": 2, "Florida": 4, "Illinois": 2, "Other": 2 },
  "Property Damage": { "California": 3, "New York": 3, "Texas": 2, "Florida": 4, "Illinois": 5, "Other": 3 },
  "Fraud": { "California": 3, "New York": 6, "Texas": 4, "Florida": 4, "Illinois": 5, "Other": 4 },
  "Medical Malpractice": { "California": 3, "New York": 2.5, "Texas": 2, "Florida": 2, "Illinois": 2, "Other": 3 },
  "Defamation": { "California": 1, "New York": 1, "Texas": 1, "Florida": 2, "Illinois": 1, "Other": 1 },
  "Wrongful Death": { "California": 2, "New York": 2, "Texas": 2, "Florida": 2, "Illinois": 2, "Other": 2 },
};

export default function StatuteOfLimitationsDeadlineCalculator() {
  const [claimType, setClaimType] = useState("Personal Injury");
  const [state, setState] = useState("California");
  const [incidentDate, setIncidentDate] = useState("");

  const years = SOL_YEARS[claimType]?.[state];
  let deadline: Date | null = null;
  let daysRemaining: number | null = null;
  let expired = false;

  if (incidentDate && years) {
    const start = new Date(incidentDate);
    deadline = new Date(start);
    deadline.setFullYear(deadline.getFullYear() + Math.floor(years));
    if (years % 1 !== 0) deadline.setMonth(deadline.getMonth() + Math.round((years % 1) * 12));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    expired = daysRemaining < 0;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Claim Type</Label>
          <Select value={claimType} onValueChange={setClaimType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(SOL_YEARS).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{["California","New York","Texas","Florida","Illinois","Other"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2"><Label>Date of Incident / Breach</Label><Input type="date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)} /></div>
      </div>

      {deadline && daysRemaining !== null && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Filing Deadline</h3>
            <div className={`p-6 rounded-lg text-center ${expired ? "bg-destructive/10" : "bg-muted"}`}>
              <p className="text-sm text-muted-foreground">Last day to file:</p>
              <p className="text-3xl font-bold text-accent">{deadline.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              <p className="text-lg mt-2 font-medium">
                {expired ? `Expired ${Math.abs(daysRemaining).toLocaleString()} days ago` : `${daysRemaining.toLocaleString()} days remaining`}
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">Statute of limitations:</span> {years} year{years !== 1 ? "s" : ""}</p>
              <p><span className="font-medium">Claim:</span> {claimType} ({state})</p>
            </div>
            {expired ? (
              <p className="text-sm text-destructive">Your claim is likely time-barred. Limited exceptions (discovery rule, fraudulent concealment, plaintiff was a minor) may apply — talk to a lawyer immediately.</p>
            ) : daysRemaining < 90 ? (
              <p className="text-sm text-destructive font-medium">⚠️ Less than 90 days remain. Contact a lawyer urgently.</p>
            ) : null}
            <p className="text-xs text-muted-foreground">General information only. Tolling rules, discovery dates, and government claim notice deadlines may shorten or extend this date. Not legal advice.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
