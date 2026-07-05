import ToolRecommender from "@/components/tools/ToolRecommender";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import { SOL_STATES, CLAIM_TYPES, getSol, type SolClaimType } from "@/data/solData";
import { Link } from "react-router-dom";

function fmtYears(y: number) {
  if (y < 1) {
    const months = Math.round(y * 12);
    return `${months} month${months === 1 ? "" : "s"}`;
  }
  return `${y} year${y === 1 ? "" : "s"}`;
}

function addYears(iso: string, years: number): Date {
  const d = new Date(iso);
  const wholeYears = Math.floor(years);
  const fracMonths = Math.round((years - wholeYears) * 12);
  d.setFullYear(d.getFullYear() + wholeYears);
  d.setMonth(d.getMonth() + fracMonths);
  return d;
}

export default function StatuteOfLimitationsLookup() {
  const [state, setState] = useState("");
  const [claim, setClaim] = useState<SolClaimType | "">("");
  const [incidentDate, setIncidentDate] = useState("");

  const entry = state && claim ? getSol(state, claim) : null;
  const claimLabel = CLAIM_TYPES.find((c) => c.id === claim)?.label ?? "";

  const deadline = useMemo(() => {
    if (!entry || !incidentDate) return null;
    const d = addYears(incidentDate, entry.years);
    const now = new Date();
    const daysLeft = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return { date: d, daysLeft };
  }, [entry, incidentDate]);

  const status: "safe" | "urgent" | "expired" | null = deadline
    ? deadline.daysLeft < 0
      ? "expired"
      : deadline.daysLeft <= 90
      ? "urgent"
      : "safe"
    : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Your state</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent className="max-h-72">
              {SOL_STATES.map((s) => (
                <SelectItem key={s.abbr} value={s.state}>{s.state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Type of claim</Label>
          <Select value={claim} onValueChange={(v) => setClaim(v as SolClaimType)}>
            <SelectTrigger><SelectValue placeholder="Select claim type" /></SelectTrigger>
            <SelectContent className="max-h-72">
              {CLAIM_TYPES.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date of incident (optional)</Label>
          <Input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} max={new Date().toISOString().slice(0, 10)} />
        </div>
      </div>

      {entry && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm text-muted-foreground">Filing deadline for {claimLabel} in {state}</p>
                <p className="text-4xl font-serif font-bold text-primary">{fmtYears(entry.years)}</p>
              </div>
              <Badge variant="secondary" className="text-xs">{entry.citation}</Badge>
            </div>

            {deadline && (
              <div className={`p-4 rounded-lg border ${
                status === "expired" ? "bg-destructive/10 border-destructive/40" :
                status === "urgent" ? "bg-amber-500/10 border-amber-500/40" :
                "bg-emerald-500/10 border-emerald-500/40"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {status === "expired" ? <AlertCircle className="w-5 h-5 text-destructive" /> :
                   status === "urgent" ? <Clock className="w-5 h-5 text-amber-600" /> :
                   <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  <p className="font-semibold">
                    {status === "expired" ? "Deadline has passed" :
                     status === "urgent" ? "Deadline approaching" :
                     "Time to file"}
                  </p>
                </div>
                <p className="text-sm">
                  File by <span className="font-semibold">{deadline.date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
                  {status !== "expired" && ` — ${deadline.daysLeft} day${deadline.daysLeft === 1 ? "" : "s"} remaining`}
                  {status === "expired" && ` — ${Math.abs(deadline.daysLeft)} day${Math.abs(deadline.daysLeft) === 1 ? "" : "s"} past deadline`}
                </p>
                {status === "urgent" && (
                  <p className="text-xs mt-2 text-muted-foreground">Under 90 days left. Consult an attorney immediately — service, filing, and pre-suit notices take time.</p>
                )}
                {status === "expired" && (
                  <p className="text-xs mt-2 text-muted-foreground">Some exceptions may still apply (discovery rule, tolling for minors/disability, fraudulent concealment). Speak with a lawyer before assuming the claim is dead.</p>
                )}
              </div>
            )}

            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Important exceptions that can change your deadline:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Discovery rule:</strong> The clock may start when you discovered (or should have discovered) the harm, not when it happened. Common in medical malpractice, fraud, and latent injuries.</li>
                <li><strong>Tolling for minors:</strong> Many states pause the clock until age 18.</li>
                <li><strong>Government defendants:</strong> Tort Claims Acts often require notice within 60–180 days, well before the general deadline.</li>
                <li><strong>Contracts with different terms:</strong> A written contract can shorten (but usually not lengthen beyond statutory max) the limitations period.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/tools/consumer/sol-deadline">Precise deadline calculator <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/local-lawyers">Find a lawyer in {state} <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground border-t pt-3">
        Educational reference only — not legal advice. Statutes change; verify with a licensed attorney in your jurisdiction before relying on these figures.
      </p>

      <ToolRecommender topic="statute-of-limitations" />
    </div>
  );
}
