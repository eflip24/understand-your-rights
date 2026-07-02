import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const STEPS = [
  "Change passwords for the affected account and any account using the same password.",
  "Enable two-factor authentication everywhere it's offered.",
  "Place a fraud alert with one credit bureau (Equifax, Experian, or TransUnion) — they notify the others.",
  "Consider a credit freeze (free in all 50 states).",
  "Monitor bank and credit card statements weekly for 90 days.",
  "Get a free credit report at annualcreditreport.com.",
  "Save the breach notification email/letter for your records.",
  "If SSN was exposed, file IRS Form 14039 (Identity Theft Affidavit) preemptively.",
  "Report identity theft to the FTC at IdentityTheft.gov for a recovery plan.",
  "Accept any free credit monitoring offered by the breached company.",
  "Watch for phishing emails referencing the breach.",
  "If financial loss occurs, file a police report.",
];

export default function DataBreachChecklist() {
  const { t } = useTranslation(["tools", "common"]);
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) => { const s = new Set(done); s.has(i) ? s.delete(i) : s.add(i); setDone(s); };

  return (
    <Card><CardContent className="p-4 space-y-2">
      <p className="text-sm text-muted-foreground mb-3">{t("internals.dataBreach.progress")}: {done.size}/{STEPS.length}</p>
      {STEPS.map((s, i) => (
        <div key={i} className="flex items-start gap-2">
          <Checkbox checked={done.has(i)} onCheckedChange={() => toggle(i)} className="mt-1" />
          <label className={`text-sm ${done.has(i) ? "line-through text-muted-foreground" : ""}`}>{s}</label>
        </div>
      ))}
    </CardContent></Card>
  );
}
