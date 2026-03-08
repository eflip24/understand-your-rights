import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const cryptoPrices: Record<string, { name: string; price: number }> = {
  BTC: { name: "Bitcoin", price: 87000 },
  ETH: { name: "Ethereum", price: 2050 },
  SOL: { name: "Solana", price: 135 },
  BNB: { name: "BNB", price: 610 },
  XRP: { name: "XRP", price: 2.15 },
  ADA: { name: "Cardano", price: 0.72 },
  DOGE: { name: "Dogecoin", price: 0.17 },
  DOT: { name: "Polkadot", price: 5.80 },
};

export default function CryptoConverterCalculator() {
  const [amount, setAmount] = useState("");
  const [fromCrypto, setFromCrypto] = useState("BTC");
  const [result, setResult] = useState<{ usdValue: number; conversions: { symbol: string; name: string; amount: number }[] } | null>(null);

  const calculate = () => {
    const qty = parseFloat(amount);
    const fromPrice = cryptoPrices[fromCrypto].price;
    const usdValue = qty * fromPrice;
    const conversions = Object.entries(cryptoPrices)
      .filter(([symbol]) => symbol !== fromCrypto)
      .map(([symbol, data]) => ({
        symbol,
        name: data.name,
        amount: Math.round((usdValue / data.price) * 100000) / 100000,
      }));
    setResult({ usdValue: Math.round(usdValue * 100) / 100, conversions });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">⚠️ Uses static reference prices for demonstration. Not real-time data.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Amount</Label>
          <Input type="number" placeholder="1" step="0.001" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Cryptocurrency</Label>
          <Select value={fromCrypto} onValueChange={setFromCrypto}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(cryptoPrices).map(([symbol, data]) => (
                <SelectItem key={symbol} value={symbol}>{symbol} — {data.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={calculate} disabled={!amount} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Convert
      </Button>
      {result && (
        <div className="space-y-4 pt-2">
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-2xl font-bold font-serif text-accent">${result.usdValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">USD Value</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {result.conversions.map((c) => (
              <div key={c.symbol} className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-lg font-bold font-serif text-foreground">{c.amount}</p>
                <p className="text-xs text-muted-foreground">{c.symbol}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
