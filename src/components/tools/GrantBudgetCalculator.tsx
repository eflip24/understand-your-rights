import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const defaultCategories = [
  { name: "Personnel", amount: "" },
  { name: "Equipment", amount: "" },
  { name: "Travel", amount: "" },
  { name: "Supplies", amount: "" },
  { name: "Contractual", amount: "" },
  { name: "Other Direct Costs", amount: "" },
];

export default function GrantBudgetCalculator() {
  const [totalGrant, setTotalGrant] = useState("");
  const [indirectRate, setIndirectRate] = useState("10");
  const [allocations, setAllocations] = useState(defaultCategories);

  const grant = parseFloat(totalGrant) || 0;
  const rate = parseFloat(indirectRate) || 0;

  const directTotal = allocations.reduce((sum, a) => sum + (parseFloat(a.amount) || 0), 0);
  const indirectCosts = directTotal * (rate / 100);
  const totalAllocated = directTotal + indirectCosts;
  const remaining = grant - totalAllocated;
  const overBudget = remaining < 0;

  const updateAllocation = (index: number, value: string) => {
    const updated = [...allocations];
    updated[index] = { ...updated[index], amount: value };
    setAllocations(updated);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Total Grant Amount ($)</Label>
          <Input type="number" value={totalGrant} onChange={(e) => setTotalGrant(e.target.value)} placeholder="e.g. 500000" />
        </div>
        <div className="space-y-2">
          <Label>Indirect Cost Rate (%)</Label>
          <Input type="number" value={indirectRate} onChange={(e) => setIndirectRate(e.target.value)} placeholder="e.g. 10" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif font-bold text-lg">Budget Allocations</h3>
        {allocations.map((a, i) => (
          <div key={a.name} className="flex items-center gap-3">
            <Label className="w-40 shrink-0 text-sm">{a.name}</Label>
            <Input type="number" value={a.amount} onChange={(e) => updateAllocation(i, e.target.value)} placeholder="0" />
          </div>
        ))}
      </div>

      {grant > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Direct Costs</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">${directTotal.toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Indirect Costs ({rate}%)</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">${indirectCosts.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Allocated</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">${totalAllocated.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p></CardContent>
          </Card>
          <Card className={overBudget ? "border-destructive" : ""}>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Remaining</CardTitle></CardHeader>
            <CardContent><p className={`text-2xl font-bold font-serif ${overBudget ? "text-destructive" : "text-accent"}`}>${remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p></CardContent>
          </Card>
        </div>
      )}

      {overBudget && (
        <p className="text-sm text-destructive font-medium">⚠ Budget exceeded by ${Math.abs(remaining).toLocaleString(undefined, { maximumFractionDigits: 2 })}. Reduce allocations or increase grant amount.</p>
      )}
    </div>
  );
}
