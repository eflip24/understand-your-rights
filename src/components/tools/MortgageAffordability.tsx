import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function MortgageAffordability() {
  const [income, setIncome] = useState("");
  const [debts, setDebts] = useState("");
  const [down, setDown] = useState("");
  const [rate, setRate] = useState("7");
  const [result, setResult] = useState<{ maxPayment: number; maxPrice: number } | null>(null);

  const calc = () => {
    const monthly = parseFloat(income) / 12;
    const dti = monthly * 0.36 - parseFloat(debts || "0");
    const r = parseFloat(rate) / 100 / 12;
    const n = 360;
    // PITI estimate: principal&interest is ~80% of payment (taxes/insurance ~20%)
    const pi = dti * 0.8;
    const principal = pi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    const maxPrice = Math.round(principal + parseFloat(down || "0"));
    setResult({ maxPayment: Math.round(dti), maxPrice });
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>Annual income ($)</Label><Input type="number" value={income} onChange={e => setIncome(e.target.value)} /></div>
        <div><Label>Monthly debts ($)</Label><Input type="number" value={debts} onChange={e => setDebts(e.target.value)} /></div>
        <div><Label>Down payment ($)</Label><Input type="number" value={down} onChange={e => setDown(e.target.value)} /></div>
        <div><Label>Interest rate (%)</Label><Input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} /></div>
      </div>
      <Button onClick={calc} disabled={!income}>Calculate</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-2">
          <p className="text-3xl font-bold">${result.maxPrice.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Maximum home price (using 36% DTI rule)</p>
          <p className="text-sm">Max monthly housing payment: <strong>${result.maxPayment.toLocaleString()}</strong></p>
        </CardContent></Card>
      )}
    </div>
  );
}
