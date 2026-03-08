import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface Partner {
  name: string;
  capital: string;
  hoursPerWeek: string;
}

export default function PartnershipSplitCalculator() {
  const [partners, setPartners] = useState<Partner[]>([
    { name: "", capital: "", hoursPerWeek: "" },
    { name: "", capital: "", hoursPerWeek: "" },
  ]);
  const [capitalWeight, setCapitalWeight] = useState("50");
  const [result, setResult] = useState<null | { splits: { name: string; capitalPct: number; timePct: number; blendedPct: number }[] }>(null);

  const updatePartner = (i: number, field: keyof Partner, val: string) => {
    setPartners(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  };

  const addPartner = () => {
    if (partners.length < 6) setPartners(prev => [...prev, { name: "", capital: "", hoursPerWeek: "" }]);
  };

  const removePartner = (i: number) => {
    if (partners.length > 2) setPartners(prev => prev.filter((_, idx) => idx !== i));
  };

  const calculate = () => {
    const cw = parseFloat(capitalWeight) / 100;
    const tw = 1 - cw;
    const totalCapital = partners.reduce((s, p) => s + (parseFloat(p.capital) || 0), 0);
    const totalHours = partners.reduce((s, p) => s + (parseFloat(p.hoursPerWeek) || 0), 0);

    const splits = partners.map(p => {
      const capital = parseFloat(p.capital) || 0;
      const hours = parseFloat(p.hoursPerWeek) || 0;
      const capitalPct = totalCapital > 0 ? (capital / totalCapital) * 100 : 100 / partners.length;
      const timePct = totalHours > 0 ? (hours / totalHours) * 100 : 100 / partners.length;
      const blendedPct = capitalPct * cw + timePct * tw;
      return { name: p.name || `Partner ${partners.indexOf(p) + 1}`, capitalPct, timePct, blendedPct };
    });

    setResult({ splits });
  };

  return (
    <div className="space-y-6">
      {partners.map((p, i) => (
        <Card key={i}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Partner {i + 1}</h4>
              {partners.length > 2 && <Button variant="ghost" size="sm" onClick={() => removePartner(i)} className="text-destructive text-xs">Remove</Button>}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div><Label className="text-xs">Name</Label><Input value={p.name} onChange={e => updatePartner(i, "name", e.target.value)} placeholder={`Partner ${i + 1}`} /></div>
              <div><Label className="text-xs">Capital Contribution ($)</Label><Input type="number" value={p.capital} onChange={e => updatePartner(i, "capital", e.target.value)} placeholder="50000" /></div>
              <div><Label className="text-xs">Hours/Week</Label><Input type="number" value={p.hoursPerWeek} onChange={e => updatePartner(i, "hoursPerWeek", e.target.value)} placeholder="40" /></div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-3">
        <Button variant="outline" onClick={addPartner} disabled={partners.length >= 6}>+ Add Partner</Button>
      </div>
      <div>
        <Label>Capital vs. Time Weight (Capital: {capitalWeight}% / Time: {100 - parseFloat(capitalWeight)}%)</Label>
        <Input type="range" min="0" max="100" value={capitalWeight} onChange={e => setCapitalWeight(e.target.value)} className="mt-1" />
      </div>
      <Button onClick={calculate} className="w-full">Calculate Splits</Button>
      {result && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Suggested Equity Split</h3>
            {result.splits.map((s, i) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-2xl font-bold text-accent">{s.blendedPct.toFixed(1)}%</p>
                </div>
                <div className="w-full bg-background rounded-full h-3">
                  <div className="bg-accent h-3 rounded-full transition-all" style={{ width: `${s.blendedPct}%` }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Capital: {s.capitalPct.toFixed(1)}%</span>
                  <span>Time: {s.timePct.toFixed(1)}%</span>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">This is a starting point for negotiation. Consider also factoring in expertise, risk tolerance, and roles. Consult a business attorney.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
