import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/**
 * DebtSettlementCalculator
 * ------------------------
 * Estimates a lump-sum debt settlement payoff, program fees, and tax exposure
 * from cancellation-of-debt income (IRC § 61(a)(11)) after applying the
 * insolvency exclusion (IRC § 108(a)(1)(B)). Client-side only; not tax advice.
 */
export default function DebtSettlementCalculator() {
  const [balance, setBalance] = useState("");
  const [settlementPct, setSettlementPct] = useState("45");
  const [feePct, setFeePct] = useState("25");
  const [taxRate, setTaxRate] = useState("22");
  const [insolvencyAmount, setInsolvencyAmount] = useState("0");
  const [result, setResult] = useState<null | {
    payoff: number;
    forgiven: number;
    programFee: number;
    taxableForgiven: number;
    tax: number;
    totalOutOfPocket: number;
    savingsVsBalance: number;
  }>(null);

  const calc = () => {
    const b = parseFloat(balance) || 0;
    const s = (parseFloat(settlementPct) || 0) / 100;
    const f = (parseFloat(feePct) || 0) / 100;
    const t = (parseFloat(taxRate) || 0) / 100;
    const insolv = parseFloat(insolvencyAmount) || 0;
    const payoff = b * s;
    const forgiven = b - payoff;
    const programFee = b * f;
    const taxableForgiven = Math.max(0, forgiven - insolv);
    const tax = taxableForgiven * t;
    const totalOutOfPocket = payoff + programFee + tax;
    setResult({
      payoff,
      forgiven,
      programFee,
      taxableForgiven,
      tax,
      totalOutOfPocket,
      savingsVsBalance: b - totalOutOfPocket,
    });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Total unsecured debt ($)</Label>
          <Input type="number" placeholder="25000" value={balance} onChange={(e) => setBalance(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Settlement % of balance (industry avg 40–50%)</Label>
          <Input type="number" value={settlementPct} onChange={(e) => setSettlementPct(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Program / attorney fee % (15–25% typical)</Label>
          <Input type="number" value={feePct} onChange={(e) => setFeePct(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Marginal federal tax rate %</Label>
          <Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Insolvency amount ($ — liabilities minus assets on the day before settlement)</Label>
          <Input
            type="number"
            value={insolvencyAmount}
            onChange={(e) => setInsolvencyAmount(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Under IRC § 108(a)(1)(B), forgiven debt is excluded from taxable income up to the amount you were insolvent (Form 982). Set to 0 if you don't qualify.
          </p>
        </div>
      </div>
      <Button onClick={calc} className="w-full">
        Calculate settlement scenario
      </Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="font-semibold text-lg">Settlement breakdown</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between"><span>Lump-sum payoff to creditor</span><span className="font-mono">{fmt(result.payoff)}</span></div>
            <div className="flex justify-between"><span>Debt forgiven (1099-C amount)</span><span className="font-mono">{fmt(result.forgiven)}</span></div>
            <div className="flex justify-between"><span>Program / attorney fees</span><span className="font-mono">{fmt(result.programFee)}</span></div>
            <div className="flex justify-between"><span>Taxable forgiven (after insolvency)</span><span className="font-mono">{fmt(result.taxableForgiven)}</span></div>
            <div className="flex justify-between"><span>Estimated federal tax on forgiven debt</span><span className="font-mono">{fmt(result.tax)}</span></div>
          </div>
          <div className="border-t pt-3 grid gap-2 sm:grid-cols-2">
            <div className="text-center p-3 rounded-md bg-muted">
              <p className="text-xs text-muted-foreground">Total out of pocket</p>
              <p className="text-xl font-bold">{fmt(result.totalOutOfPocket)}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-accent/10 border border-accent/30">
              <p className="text-xs text-muted-foreground">Net savings vs. paying in full</p>
              <p className="text-xl font-bold">{fmt(result.savingsVsBalance)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Estimate only. Settlement damages your credit (typically 100–150 point drop), and creditors are not required to accept any offer. Not tax or legal advice — consult a CPA and consumer-debt attorney.
          </p>
        </div>
      )}
    </div>
  );
}
