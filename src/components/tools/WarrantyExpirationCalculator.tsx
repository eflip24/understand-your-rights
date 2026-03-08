import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WarrantyEntry {
  product: string;
  purchaseDate: string;
  warrantyLength: string;
  warrantyUnit: string;
}

export default function WarrantyExpirationCalculator() {
  const [entries, setEntries] = useState<WarrantyEntry[]>([{ product: "", purchaseDate: "", warrantyLength: "", warrantyUnit: "months" }]);
  const [results, setResults] = useState<{ product: string; expirationDate: string; daysLeft: number; status: string }[] | null>(null);

  const updateEntry = (i: number, key: keyof WarrantyEntry, value: string) => {
    const updated = [...entries];
    updated[i] = { ...updated[i], [key]: value };
    setEntries(updated);
  };

  const addEntry = () => setEntries([...entries, { product: "", purchaseDate: "", warrantyLength: "", warrantyUnit: "months" }]);
  const removeEntry = (i: number) => setEntries(entries.filter((_, idx) => idx !== i));

  const calculate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const res = entries
      .filter((e) => e.product && e.purchaseDate && e.warrantyLength)
      .map((e) => {
        const purchase = new Date(e.purchaseDate);
        const length = parseInt(e.warrantyLength);
        const expiration = new Date(purchase);
        if (e.warrantyUnit === "years") expiration.setFullYear(expiration.getFullYear() + length);
        else if (e.warrantyUnit === "months") expiration.setMonth(expiration.getMonth() + length);
        else expiration.setDate(expiration.getDate() + length);

        const diff = Math.ceil((expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        let status = "Active";
        if (diff < 0) status = "Expired";
        else if (diff <= 30) status = "Expiring Soon";
        return {
          product: e.product,
          expirationDate: expiration.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          daysLeft: diff,
          status,
        };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
    setResults(res);
  };

  const valid = entries.some((e) => e.product && e.purchaseDate && e.warrantyLength);

  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div key={i} className="grid gap-3 sm:grid-cols-5 items-end p-3 rounded-lg bg-secondary/50">
          <div className="space-y-1">
            <Label>Product</Label>
            <Input placeholder="Laptop" value={entry.product} onChange={(e) => updateEntry(i, "product", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Purchase Date</Label>
            <Input type="date" value={entry.purchaseDate} onChange={(e) => updateEntry(i, "purchaseDate", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Warranty Length</Label>
            <Input type="number" placeholder="12" value={entry.warrantyLength} onChange={(e) => updateEntry(i, "warrantyLength", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Unit</Label>
            <Select value={entry.warrantyUnit} onValueChange={(v) => updateEntry(i, "warrantyUnit", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            {entries.length > 1 && <Button variant="outline" size="sm" onClick={() => removeEntry(i)}>Remove</Button>}
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <Button variant="outline" onClick={addEntry}>+ Add Product</Button>
        <Button onClick={calculate} disabled={!valid} className="bg-accent text-accent-foreground hover:bg-gold-dark">Track Warranties</Button>
      </div>
      {results && results.length > 0 && (
        <div className="space-y-2 pt-2">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
              <div>
                <span className="font-medium">{r.product}</span>
                <p className="text-xs text-muted-foreground">Expires: {r.expirationDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {r.daysLeft < 0 ? `Expired ${Math.abs(r.daysLeft)} days ago` : `${r.daysLeft} days left`}
                </span>
                <Badge variant={r.status === "Expired" ? "destructive" : r.status === "Expiring Soon" ? "outline" : "default"}>
                  {r.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
