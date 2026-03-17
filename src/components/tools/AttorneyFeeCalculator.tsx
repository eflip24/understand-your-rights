import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AttorneyFeeCalculator() {
  const [feeType, setFeeType] = useState("contingency");
  const [settlementAmount, setSettlementAmount] = useState("");
  const [contingencyRate, setContingencyRate] = useState("33");
  const [caseExpenses, setCaseExpenses] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [result, setResult] = useState<{ attorneyFee: number; expenses: number; yourTakeHome: number; totalCost: number } | null>(null);

  const calculate = () => {
    if (feeType === "contingency") {
      const settlement = parseFloat(settlementAmount) || 0;
      const rate = parseFloat(contingencyRate) / 100;
      const expenses = parseFloat(caseExpenses) || 0;
      const fee = settlement * rate;
      setResult({ attorneyFee: fee, expenses, yourTakeHome: settlement - fee - expenses, totalCost: fee + expenses });
    } else {
      const rate = parseFloat(hourlyRate) || 0;
      const hours = parseFloat(estimatedHours) || 0;
      const expenses = parseFloat(caseExpenses) || 0;
      const fee = rate * hours;
      setResult({ attorneyFee: fee, expenses, yourTakeHome: 0, totalCost: fee + expenses });
    }
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Fee Structure</Label>
        <Select value={feeType} onValueChange={setFeeType}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="contingency">Contingency Fee</SelectItem>
            <SelectItem value="hourly">Hourly Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {feeType === "contingency" ? (
          <>
            <div className="space-y-2">
              <Label>Expected Settlement ($)</Label>
              <Input type="number" placeholder="100000" value={settlementAmount} onChange={(e) => setSettlementAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Contingency Rate (%)</Label>
              <Input type="number" placeholder="33" step="1" value={contingencyRate} onChange={(e) => setContingencyRate(e.target.value)} />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label>Hourly Rate ($)</Label>
              <Input type="number" placeholder="300" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Estimated Hours</Label>
              <Input type="number" placeholder="50" value={estimatedHours} onChange={(e) => setEstimatedHours(e.target.value)} />
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label>Case Expenses ($)</Label>
          <Input type="number" placeholder="5000" value={caseExpenses} onChange={(e) => setCaseExpenses(e.target.value)} />
          <p className="text-xs text-muted-foreground">Filing fees, expert witnesses, medical records, etc.</p>
        </div>
      </div>
      <Button onClick={calculate} className="w-full">Calculate Fees</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="font-semibold text-lg">Fee Breakdown</h3>
          <div className={`grid gap-3 ${feeType === "contingency" ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">Attorney Fee</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.attorneyFee)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">Case Expenses</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.expenses)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-sm text-muted-foreground">Total Legal Cost</p>
              <p className="text-xl font-bold text-foreground">{fmt(result.totalCost)}</p>
            </div>
            {feeType === "contingency" && (
              <div className="text-center p-3 rounded-md bg-accent/10 border border-accent/30">
                <p className="text-sm text-muted-foreground">Your Take-Home</p>
                <p className="text-xl font-bold text-foreground">{fmt(result.yourTakeHome)}</p>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {feeType === "contingency"
              ? "Contingency fees are standard in personal injury cases. You pay nothing upfront — the attorney collects their fee from the settlement."
              : "Hourly rates are common for non-PI cases. Total cost depends on actual hours worked."}
          </p>
        </div>
      )}
    </div>
  );
}