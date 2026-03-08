import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EquityDilutionCalculator() {
  const [currentShares, setCurrentShares] = useState("");
  const [yourShares, setYourShares] = useState("");
  const [newShares, setNewShares] = useState("");
  const [optionPool, setOptionPool] = useState("");

  const current = parseFloat(currentShares) || 0;
  const yours = parseFloat(yourShares) || 0;
  const newIssued = parseFloat(newShares) || 0;
  const pool = parseFloat(optionPool) || 0;

  const totalNew = current + newIssued + pool;
  const prePct = current > 0 ? (yours / current) * 100 : 0;
  const postPct = totalNew > 0 ? (yours / totalNew) * 100 : 0;
  const dilution = prePct - postPct;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Current Total Shares Outstanding</Label>
          <Input type="number" value={currentShares} onChange={(e) => setCurrentShares(e.target.value)} placeholder="e.g. 1000000" />
        </div>
        <div className="space-y-2">
          <Label>Your Shares</Label>
          <Input type="number" value={yourShares} onChange={(e) => setYourShares(e.target.value)} placeholder="e.g. 100000" />
        </div>
        <div className="space-y-2">
          <Label>New Shares Issued (Funding Round)</Label>
          <Input type="number" value={newShares} onChange={(e) => setNewShares(e.target.value)} placeholder="e.g. 250000" />
        </div>
        <div className="space-y-2">
          <Label>New Option Pool Shares</Label>
          <Input type="number" value={optionPool} onChange={(e) => setOptionPool(e.target.value)} placeholder="e.g. 100000" />
        </div>
      </div>

      {current > 0 && yours > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pre-Dilution Ownership</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">{prePct.toFixed(2)}%</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Post-Dilution Ownership</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">{postPct.toFixed(2)}%</p></CardContent>
          </Card>
          <Card className={dilution > 0 ? "border-destructive/50" : ""}>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Dilution Impact</CardTitle></CardHeader>
            <CardContent><p className={`text-2xl font-bold font-serif ${dilution > 0 ? "text-destructive" : ""}`}>-{dilution.toFixed(2)}%</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">New Total Shares</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">{totalNew.toLocaleString()}</p></CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
