import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ASSET_FIELDS = [
  { key: "cash", label: "Cash & Savings" },
  { key: "investments", label: "Investments & Retirement" },
  { key: "property", label: "Real Estate Value" },
  { key: "vehicles", label: "Vehicles" },
  { key: "other_assets", label: "Other Assets" },
];

const LIABILITY_FIELDS = [
  { key: "mortgage", label: "Mortgage Balance" },
  { key: "auto_loans", label: "Auto Loans" },
  { key: "student_loans", label: "Student Loans" },
  { key: "credit_cards", label: "Credit Card Debt" },
  { key: "other_debts", label: "Other Debts" },
];

export default function NetWorthCalculator() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ totalAssets: number; totalLiabilities: number; netWorth: number } | null>(null);

  const update = (key: string, val: string) => setValues((prev) => ({ ...prev, [key]: val }));
  const getNum = (key: string) => parseFloat(values[key] || "0") || 0;

  const calculate = () => {
    const totalAssets = ASSET_FIELDS.reduce((sum, f) => sum + getNum(f.key), 0);
    const totalLiabilities = LIABILITY_FIELDS.reduce((sum, f) => sum + getNum(f.key), 0);
    setResult({ totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Assets</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ASSET_FIELDS.map((f) => (
            <div key={f.key} className="space-y-1">
              <Label className="text-sm">{f.label}</Label>
              <Input type="number" placeholder="0" value={values[f.key] || ""} onChange={(e) => update(f.key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Liabilities</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LIABILITY_FIELDS.map((f) => (
            <div key={f.key} className="space-y-1">
              <Label className="text-sm">{f.label}</Label>
              <Input type="number" placeholder="0" value={values[f.key] || ""} onChange={(e) => update(f.key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>
      <Button onClick={calculate} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Net Worth
      </Button>
      {result && (
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalAssets.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Assets</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-xl font-bold font-serif text-foreground">${result.totalLiabilities.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Liabilities</p>
          </div>
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className={`text-xl font-bold font-serif ${result.netWorth >= 0 ? "text-accent" : "text-destructive"}`}>
              ${result.netWorth.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Net Worth</p>
          </div>
        </div>
      )}
    </div>
  );
}
