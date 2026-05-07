import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const RULES: Record<string, Record<string, string>> = {
  "California": { nonpayment: "3 days (excluding weekends/holidays)", violation: "3-day cure or quit", noFault: "30 or 60 days (length depends on tenancy)" },
  "New York": { nonpayment: "14 days", violation: "10-day cure", noFault: "30, 60, or 90 days based on tenancy length" },
  "Texas": { nonpayment: "3 days (or as lease specifies)", violation: "3 days", noFault: "30 days for month-to-month" },
  "Florida": { nonpayment: "3 days (excluding weekends/holidays)", violation: "7-day cure or quit", noFault: "15 days for month-to-month" },
  "Illinois": { nonpayment: "5 days", violation: "10 days", noFault: "30 days for month-to-month" },
  "Washington": { nonpayment: "14 days", violation: "10-day cure", noFault: "Just-cause required; 60 days minimum" },
  "Massachusetts": { nonpayment: "14 days", violation: "Cure varies by lease", noFault: "30 days or full rental period" },
  "Georgia": { nonpayment: "Immediate demand for possession", violation: "As lease specifies", noFault: "60 days" },
};

export default function EvictionNoticeLookup() {
  const [state, setState] = useState("");
  const [reason, setReason] = useState("");
  const r = state && reason ? RULES[state]?.[reason] : null;

  return (
    <div className="space-y-4">
      <div><Label>State</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
          <SelectContent>{Object.keys(RULES).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div><Label>Reason</Label>
        <Select value={reason} onValueChange={setReason}>
          <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="nonpayment">Non-payment of rent</SelectItem>
            <SelectItem value="violation">Lease violation</SelectItem>
            <SelectItem value="noFault">No-fault / end of tenancy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {r && (
        <Card><CardContent className="p-4 space-y-2">
          <p className="text-2xl font-bold">{r}</p>
          <p className="text-xs italic text-muted-foreground">Notice rules vary by city and lease type. Local rent-control ordinances may extend timelines.</p>
        </CardContent></Card>
      )}
    </div>
  );
}
