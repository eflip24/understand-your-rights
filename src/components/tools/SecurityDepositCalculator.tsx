import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const depositData: Record<string, { maxMonths: number; interestRequired: boolean; returnDays: number; notes: string }> = {
  "California": { maxMonths: 2, interestRequired: false, returnDays: 21, notes: "2 months for unfurnished, 3 for furnished" },
  "New York": { maxMonths: 1, interestRequired: true, returnDays: 14, notes: "Max 1 month rent. Interest required in buildings with 6+ units" },
  "Texas": { maxMonths: 0, interestRequired: false, returnDays: 30, notes: "No statutory limit on deposit amount" },
  "Florida": { maxMonths: 0, interestRequired: true, returnDays: 15, notes: "No limit. Must hold in separate account or post surety bond" },
  "Illinois": { maxMonths: 1.5, interestRequired: true, returnDays: 30, notes: "Interest required for 25+ unit buildings in Chicago" },
  "Pennsylvania": { maxMonths: 2, interestRequired: true, returnDays: 30, notes: "2 months first year, 1 month after. Interest after 25 months" },
  "Ohio": { maxMonths: 0, interestRequired: false, returnDays: 30, notes: "No statutory limit. Must return within 30 days" },
  "Georgia": { maxMonths: 0, interestRequired: false, returnDays: 30, notes: "No statutory limit on amount" },
  "North Carolina": { maxMonths: 2, interestRequired: false, returnDays: 30, notes: "1.5 months for month-to-month, 2 months for longer" },
  "Michigan": { maxMonths: 1.5, interestRequired: false, returnDays: 30, notes: "Max 1.5 months rent" },
  "New Jersey": { maxMonths: 1.5, interestRequired: true, returnDays: 30, notes: "Interest or investment required" },
  "Virginia": { maxMonths: 2, interestRequired: false, returnDays: 45, notes: "Max 2 months rent" },
  "Washington": { maxMonths: 0, interestRequired: false, returnDays: 21, notes: "No statutory limit on amount" },
  "Massachusetts": { maxMonths: 1, interestRequired: true, returnDays: 30, notes: "Max first and last month plus 1 month deposit" },
  "Arizona": { maxMonths: 1.5, interestRequired: false, returnDays: 14, notes: "Max 1.5 months rent" },
  "Colorado": { maxMonths: 0, interestRequired: false, returnDays: 30, notes: "No statutory limit. 30 days to return unless lease says 60" },
  "Maryland": { maxMonths: 2, interestRequired: false, returnDays: 45, notes: "Max 2 months rent" },
  "Oregon": { maxMonths: 0, interestRequired: false, returnDays: 31, notes: "No statutory limit on amount" },
  "Connecticut": { maxMonths: 2, interestRequired: true, returnDays: 30, notes: "2 months for under 62, 1 month for 62+" },
  "Nevada": { maxMonths: 3, interestRequired: false, returnDays: 30, notes: "Max 3 months rent" },
};

export default function SecurityDepositCalculator() {
  const [state, setState] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");

  const data = state ? depositData[state] : null;
  const rent = parseFloat(monthlyRent) || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent>{Object.keys(depositData).sort().map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Monthly Rent ($)</Label><Input type="number" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value)} placeholder="1500" /></div>
      </div>
      {data && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">{state} Security Deposit Rules</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Maximum Deposit</p>
                <p className="text-xl font-bold">{data.maxMonths > 0 ? `${data.maxMonths} month${data.maxMonths !== 1 ? "s" : ""} rent` : "No statutory limit"}</p>
                {rent > 0 && data.maxMonths > 0 && <p className="text-sm text-accent font-medium">${(rent * data.maxMonths).toLocaleString()}</p>}
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Return Deadline</p>
                <p className="text-xl font-bold">{data.returnDays} days</p>
                <p className="text-sm text-muted-foreground">after move-out</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Interest Required?</p>
                <p className="text-xl font-bold">{data.interestRequired ? "Yes" : "No"}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm">{data.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
