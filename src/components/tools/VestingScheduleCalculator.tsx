import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VestingScheduleCalculator() {
  const [totalShares, setTotalShares] = useState("");
  const [vestingMonths, setVestingMonths] = useState("48");
  const [cliffMonths, setCliffMonths] = useState("12");
  const [frequency, setFrequency] = useState("monthly");

  const shares = parseFloat(totalShares) || 0;
  const vesting = parseInt(vestingMonths) || 0;
  const cliff = parseInt(cliffMonths) || 0;

  const freqMonths = frequency === "monthly" ? 1 : frequency === "quarterly" ? 3 : 12;

  const schedule: { month: number; vestedThisPeriod: number; cumulative: number }[] = [];
  if (shares > 0 && vesting > 0) {
    const cliffShares = cliff > 0 ? Math.floor(shares * (cliff / vesting)) : 0;
    const remainingShares = shares - cliffShares;
    const periodsAfterCliff = Math.floor((vesting - cliff) / freqMonths);
    const perPeriod = periodsAfterCliff > 0 ? remainingShares / periodsAfterCliff : 0;

    let cumulative = 0;
    for (let m = freqMonths; m <= vesting; m += freqMonths) {
      if (m < cliff) continue;
      if (m === cliff || (cliff === 0 && m === freqMonths)) {
        const vestedNow = cliff > 0 ? cliffShares : perPeriod;
        cumulative += vestedNow;
        schedule.push({ month: m, vestedThisPeriod: Math.round(vestedNow), cumulative: Math.round(cumulative) });
      } else {
        cumulative += perPeriod;
        schedule.push({ month: m, vestedThisPeriod: Math.round(perPeriod), cumulative: Math.round(Math.min(cumulative, shares)) });
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Total Shares / Units</Label>
          <Input type="number" value={totalShares} onChange={(e) => setTotalShares(e.target.value)} placeholder="e.g. 10000" />
        </div>
        <div className="space-y-2">
          <Label>Vesting Period (months)</Label>
          <Input type="number" value={vestingMonths} onChange={(e) => setVestingMonths(e.target.value)} placeholder="48" />
        </div>
        <div className="space-y-2">
          <Label>Cliff Period (months)</Label>
          <Input type="number" value={cliffMonths} onChange={(e) => setCliffMonths(e.target.value)} placeholder="12" />
        </div>
        <div className="space-y-2">
          <Label>Vesting Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {schedule.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="font-serif font-bold text-lg">Vesting Schedule</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Month</th>
                  <th className="p-3 text-right font-medium">Vested This Period</th>
                  <th className="p-3 text-right font-medium">Cumulative Vested</th>
                  <th className="p-3 text-right font-medium">% Vested</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month} className="border-b last:border-0">
                    <td className="p-3">{row.month}</td>
                    <td className="p-3 text-right">{row.vestedThisPeriod.toLocaleString()}</td>
                    <td className="p-3 text-right font-medium">{row.cumulative.toLocaleString()}</td>
                    <td className="p-3 text-right">{((row.cumulative / shares) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
