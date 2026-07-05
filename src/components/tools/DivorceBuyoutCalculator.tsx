import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ToolResultAd from "@/components/tools/ToolResultAd";

export default function DivorceBuyoutCalculator() {
  const [homeValue, setHomeValue] = useState("");
  const [mortgage, setMortgage] = useState("");
  const [sellingCostPct, setSellingCostPct] = useState("6");
  const [yourShare, setYourShare] = useState("50");
  const [separateContrib, setSeparateContrib] = useState("");
  const [result, setResult] = useState<{ equity: number; netEquity: number; spouseBuyout: number; yourEquity: number } | null>(null);

  const calc = () => {
    const value = parseFloat(homeValue) || 0;
    const mort = parseFloat(mortgage) || 0;
    const costPct = (parseFloat(sellingCostPct) || 0) / 100;
    const share = (parseFloat(yourShare) || 0) / 100;
    const separate = parseFloat(separateContrib) || 0;
    const equity = value - mort;
    const netEquity = Math.max(0, equity - value * costPct);
    const maritalEquity = Math.max(0, netEquity - separate);
    const yourEquity = separate + maritalEquity * share;
    const spouseBuyout = maritalEquity * (1 - share);
    setResult({
      equity: Math.round(equity),
      netEquity: Math.round(netEquity),
      spouseBuyout: Math.round(spouseBuyout),
      yourEquity: Math.round(yourEquity),
    });
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Current home value ($)</Label>
          <Input type="number" placeholder="450000" value={homeValue} onChange={(e) => setHomeValue(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Remaining mortgage balance ($)</Label>
          <Input type="number" placeholder="280000" value={mortgage} onChange={(e) => setMortgage(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Selling costs if you sold (%)</Label>
          <Input type="number" placeholder="6" value={sellingCostPct} onChange={(e) => setSellingCostPct(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Your marital share (%)</Label>
          <Input type="number" placeholder="50" value={yourShare} onChange={(e) => setYourShare(e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Your separate-property contribution ($) — e.g. pre-marriage down payment</Label>
          <Input type="number" placeholder="0" value={separateContrib} onChange={(e) => setSeparateContrib(e.target.value)} />
        </div>
      </div>
      <Button onClick={calc} className="w-full">Calculate divorce buyout</Button>
      {result && (
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-lg">Estimated house buyout</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between"><span>Gross equity</span><span className="font-medium text-foreground">{fmt(result.equity)}</span></div>
            <div className="flex justify-between"><span>Net equity (after hypothetical sale costs)</span><span className="font-medium text-foreground">{fmt(result.netEquity)}</span></div>
            <div className="flex justify-between"><span>Your total share of equity</span><span className="font-medium text-foreground">{fmt(result.yourEquity)}</span></div>
          </div>
          <p className="text-2xl font-bold text-accent pt-2">Amount to pay spouse: {fmt(result.spouseBuyout)}</p>
          <p className="text-xs text-muted-foreground">Assumes you keep the house and refinance into your name. Community-property vs equitable-distribution states treat contributions differently. General information only — not legal advice.</p>
        </div>
      )}
      <ToolResultAd show={!!result} />
    </div>
  );
}
