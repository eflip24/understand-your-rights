import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Quote {
  company: string;
  monthlyPremium: string;
  deductible: string;
  coverageLimit: string;
}

const emptyQuote = (): Quote => ({ company: "", monthlyPremium: "", deductible: "", coverageLimit: "" });

export default function InsuranceQuoteComparison() {
  const [quotes, setQuotes] = useState<Quote[]>([emptyQuote(), emptyQuote(), emptyQuote()]);
  const [result, setResult] = useState<{ sorted: (Quote & { annualCost: number; effectiveCost: number })[] } | null>(null);

  const updateQuote = (idx: number, field: keyof Quote, value: string) => {
    const updated = [...quotes];
    updated[idx] = { ...updated[idx], [field]: value };
    setQuotes(updated);
  };

  const addQuote = () => setQuotes([...quotes, emptyQuote()]);

  const compare = () => {
    const valid = quotes.filter(q => q.company && q.monthlyPremium);
    const analyzed = valid.map(q => {
      const monthly = parseFloat(q.monthlyPremium) || 0;
      const deductible = parseFloat(q.deductible) || 0;
      return { ...q, annualCost: monthly * 12, effectiveCost: monthly * 12 + deductible };
    });
    analyzed.sort((a, b) => a.effectiveCost - b.effectiveCost);
    setResult({ sorted: analyzed });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      {quotes.map((q, i) => (
        <div key={i} className="rounded-lg border p-4 space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Quote {i + 1}</h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Label>Company Name</Label>
              <Input placeholder="State Farm" value={q.company} onChange={(e) => updateQuote(i, "company", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Monthly Premium ($)</Label>
              <Input type="number" placeholder="150" value={q.monthlyPremium} onChange={(e) => updateQuote(i, "monthlyPremium", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Deductible ($)</Label>
              <Input type="number" placeholder="500" value={q.deductible} onChange={(e) => updateQuote(i, "deductible", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Coverage Limit ($)</Label>
              <Input type="number" placeholder="100000" value={q.coverageLimit} onChange={(e) => updateQuote(i, "coverageLimit", e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <Button variant="outline" onClick={addQuote}>+ Add Quote</Button>
        <Button onClick={compare} className="flex-1">Compare Quotes</Button>
      </div>
      {result && result.sorted.length > 0 && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="font-semibold text-lg">Comparison Results</h3>
          <div className="space-y-2">
            {result.sorted.map((q, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-md ${i === 0 ? "bg-accent/10 border border-accent/30" : "bg-muted"}`}>
                <div>
                  <p className="font-medium text-foreground">{q.company} {i === 0 && <span className="text-xs text-accent font-bold ml-1">BEST VALUE</span>}</p>
                  <p className="text-sm text-muted-foreground">Coverage: {q.coverageLimit ? fmt(parseFloat(q.coverageLimit)) : "N/A"} · Deductible: {fmt(parseFloat(q.deductible) || 0)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{fmt(q.annualCost)}/yr</p>
                  <p className="text-xs text-muted-foreground">Eff. cost: {fmt(q.effectiveCost)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Effective cost = annual premium + deductible. Lower is better, but also consider coverage limits, company ratings, and claims reputation.</p>
        </div>
      )}
    </div>
  );
}