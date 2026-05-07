import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const ITEMS = [
  "Identify the protected class involved (race, color, religion, sex, national origin, age 40+, disability, genetic info).",
  "Document specific incidents with dates, times, locations, and witnesses.",
  "Save written evidence: emails, texts, performance reviews, policies.",
  "Note any comparators (similarly situated employees treated differently).",
  "Report internally first (HR or supervisor), in writing if possible.",
  "Keep copies of your own complaint and any responses.",
  "Track any retaliation that follows your complaint.",
  "File EEOC charge within 180 days (300 days in deferral states).",
  "Continue performing your job well — avoid giving cause for discipline.",
  "Consult an employment attorney before signing any severance/release.",
];

export default function DiscriminationChecklist() {
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) => { const s = new Set(done); s.has(i) ? s.delete(i) : s.add(i); setDone(s); };
  return (
    <Card><CardContent className="p-4 space-y-2">
      <p className="text-sm text-muted-foreground mb-3">{done.size}/{ITEMS.length} complete</p>
      {ITEMS.map((s, i) => (
        <div key={i} className="flex items-start gap-2">
          <Checkbox checked={done.has(i)} onCheckedChange={() => toggle(i)} className="mt-1" />
          <label className={`text-sm ${done.has(i) ? "line-through text-muted-foreground" : ""}`}>{s}</label>
        </div>
      ))}
    </CardContent></Card>
  );
}
