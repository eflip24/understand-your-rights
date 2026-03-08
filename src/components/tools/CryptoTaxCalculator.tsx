import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CryptoTaxCalculator() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [holdingPeriod, setHoldingPeriod] = useState("short");
  const [taxBracket, setTaxBracket] = useState("22");
  const [result, setResult] = useState<{ gain: number; taxRate: number; taxOwed: number; netProfit: number } | null>(null);

  const calculate = () => {
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const qty = parseFloat(quantity);
    const gain = (sell - buy) * qty;
    const taxRate = holdingPeriod === "long" ? 15 : parseFloat(taxBracket);
    const taxOwed = gain > 0 ? gain * (taxRate / 100) : 0;
    const netProfit = gain - taxOwed;
    setResult({
      gain: Math.round(gain * 100) / 100,
      taxRate,
      taxOwed: Math.round(taxOwed * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Buy Price ($)</Label>
          <Input type="number" placeholder="20000" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Sell Price ($)</Label>
          <Input type="number" placeholder="35000" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input type="number" placeholder="0.5" step="0.001" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Holding Period</Label>
          <Select value={holdingPeriod} onValueChange={setHoldingPeriod}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short-term (&lt; 1 year)</SelectItem>
              <SelectItem value="long">Long-term (≥ 1 year)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {holdingPeriod === "short" && (
          <div className="space-y-2">
            <Label>Tax Bracket (%)</Label>
            <Select value={taxBracket} onValueChange={setTaxBracket}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="12">12%</SelectItem>
                <SelectItem value="22">22%</SelectItem>
                <SelectItem value="24">24%</SelectItem>
                <SelectItem value="32">32%</SelectItem>
                <SelectItem value="35">35%</SelectItem>
                <SelectItem value="37">37%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <Button onClick={calculate} disabled={!buyPrice || !sellPrice || !quantity} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Tax
      </Button>
      {result && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className={`text-center p-4 rounded-lg border ${result.gain >= 0 ? "bg-green-500/10 border-green-500/20" : "bg-destructive/10 border-destructive/20"}`}>
            <p className={`text-2xl font-bold font-serif ${result.gain >= 0 ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>${result.gain.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Capital {result.gain >= 0 ? "Gain" : "Loss"}</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">{result.taxRate}%</p>
            <p className="text-sm text-muted-foreground">Tax Rate</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.taxOwed.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Estimated Tax</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.netProfit.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Net Profit</p>
          </div>
        </div>
      )}
    </div>
  );
}
