import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RULES: Record<string, { fired: string; quit: string }> = {
  "California": { fired: "Immediately", quit: "Within 72 hours (or immediately if 72hr+ notice given)" },
  "New York": { fired: "Next regular payday", quit: "Next regular payday" },
  "Texas": { fired: "Within 6 days", quit: "Next regular payday" },
  "Florida": { fired: "Next regular payday", quit: "Next regular payday" },
  "Illinois": { fired: "At time of separation or next payday", quit: "Next regular payday" },
  "Massachusetts": { fired: "Day of discharge", quit: "Next regular payday" },
  "Colorado": { fired: "Immediately (or within 6hrs next workday)", quit: "Next regular payday" },
  "Washington": { fired: "End of pay period", quit: "End of pay period" },
  "Oregon": { fired: "End of next business day", quit: "Immediately if 48hr notice given" },
  "Arizona": { fired: "Within 7 working days or next payday", quit: "Next regular payday" },
};

export default function FinalPaycheckLookup() {
  const [state, setState] = useState("");
  const r = RULES[state];
  return (
    <div className="space-y-4">
      <Select value={state} onValueChange={setState}>
        <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
        <SelectContent>{Object.keys(RULES).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
      </Select>
      {r && (
        <Card><CardContent className="p-4 space-y-3">
          <div><p className="text-sm font-semibold">If terminated/fired:</p><p className="text-sm text-muted-foreground">{r.fired}</p></div>
          <div><p className="text-sm font-semibold">If you quit:</p><p className="text-sm text-muted-foreground">{r.quit}</p></div>
          <p className="text-xs text-muted-foreground italic">Final pay must include unused vacation in most states. Check your state labor department for specifics.</p>
        </CardContent></Card>
      )}
    </div>
  );
}
