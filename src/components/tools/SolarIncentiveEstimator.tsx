import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const stateIncentives: Record<string, { rebate: number; srec: number; name: string }> = {
  CA: { rebate: 1000, srec: 50, name: "California" },
  NY: { rebate: 5000, srec: 40, name: "New York" },
  MA: { rebate: 3000, srec: 300, name: "Massachusetts" },
  NJ: { rebate: 1500, srec: 220, name: "New Jersey" },
  TX: { rebate: 2500, srec: 0, name: "Texas" },
  FL: { rebate: 0, srec: 0, name: "Florida" },
  AZ: { rebate: 1000, srec: 0, name: "Arizona" },
  CO: { rebate: 2000, srec: 0, name: "Colorado" },
  IL: { rebate: 0, srec: 75, name: "Illinois" },
  MD: { rebate: 1000, srec: 60, name: "Maryland" },
};

export default function SolarIncentiveEstimator() {
  const [systemCost, setSystemCost] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState<{
    federalITC: number;
    stateRebate: number;
    srecValue: number;
    totalIncentives: number;
    netCost: number;
  } | null>(null);

  const calculate = () => {
    const cost = parseFloat(systemCost);
    if (!cost || !state) return;

    const federalITC = cost * 0.3;
    const stateData = stateIncentives[state] || { rebate: 0, srec: 0 };
    const srecValue = stateData.srec * 10; // estimated 10 SRECs/year first year
    const totalIncentives = federalITC + stateData.rebate + srecValue;
    const netCost = Math.max(0, cost - totalIncentives);

    setResult({ federalITC, stateRebate: stateData.rebate, srecValue, totalIncentives, netCost });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="systemCost">System Cost ($)</Label>
          <Input id="systemCost" type="number" placeholder="25000" value={systemCost} onChange={(e) => setSystemCost(e.target.value)} />
        </div>
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent>
              {Object.entries(stateIncentives).map(([code, data]) => (
                <SelectItem key={code} value={code}>{data.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={calculate} className="w-full">Estimate Incentives</Button>

      {result && (
        <div className="space-y-3">
          <Card><CardContent className="pt-4 flex justify-between items-center">
            <span className="text-muted-foreground">Federal ITC (30%)</span>
            <span className="text-lg font-bold text-accent">${result.federalITC.toLocaleString()}</span>
          </CardContent></Card>
          <Card><CardContent className="pt-4 flex justify-between items-center">
            <span className="text-muted-foreground">State Rebate</span>
            <span className="text-lg font-bold text-foreground">${result.stateRebate.toLocaleString()}</span>
          </CardContent></Card>
          <Card><CardContent className="pt-4 flex justify-between items-center">
            <span className="text-muted-foreground">SREC Value (est. Year 1)</span>
            <span className="text-lg font-bold text-foreground">${result.srecValue.toLocaleString()}</span>
          </CardContent></Card>
          <Card className="border-accent/30"><CardContent className="pt-4 flex justify-between items-center">
            <span className="font-medium text-foreground">Total Incentives</span>
            <span className="text-xl font-bold text-accent">${result.totalIncentives.toLocaleString()}</span>
          </CardContent></Card>
          <Card className="border-accent/30"><CardContent className="pt-4 flex justify-between items-center">
            <span className="font-medium text-foreground">Net Cost After Incentives</span>
            <span className="text-xl font-bold text-foreground">${result.netCost.toLocaleString()}</span>
          </CardContent></Card>
        </div>
      )}
    </div>
  );
}
