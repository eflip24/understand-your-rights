import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function MarginCallCalculator() {
  const [equity, setEquity] = useState("");
  const [borrowed, setBorrowed] = useState("");
  const [shares, setShares] = useState("");
  const [maintenanceMargin, setMaintenanceMargin] = useState("25");
  const [result, setResult] = useState<{ currentMargin: number; marginCallPrice: number; totalValue: number; status: string } | null>(null);

  const calculate = () => {
    const eq = parseFloat(equity);
    const borr = parseFloat(borrowed);
    const sh = parseFloat(shares);
    const mm = parseFloat(maintenanceMargin) / 100;
    const totalValue = eq + borr;
    const currentPrice = totalValue / sh;
    const currentMargin = (eq / totalValue) * 100;
    // Margin call when: (shares × price - borrowed) / (shares × price) = mm
    // price = borrowed / (shares × (1 - mm))
    const marginCallPrice = borr / (sh * (1 - mm));
    const status = currentMargin > mm * 100 + 10 ? "Safe" : currentMargin > mm * 100 ? "Warning" : "Margin Call";

    setResult({
      currentMargin: Math.round(currentMargin * 100) / 100,
      marginCallPrice: Math.round(marginCallPrice * 100) / 100,
      totalValue: Math.round(totalValue * 100) / 100,
      status,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Your Equity ($)</Label>
          <Input type="number" placeholder="10000" value={equity} onChange={(e) => setEquity(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Borrowed Amount ($)</Label>
          <Input type="number" placeholder="10000" value={borrowed} onChange={(e) => setBorrowed(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Number of Shares</Label>
          <Input type="number" placeholder="100" value={shares} onChange={(e) => setShares(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Maintenance Margin (%)</Label>
          <Input type="number" placeholder="25" value={maintenanceMargin} onChange={(e) => setMaintenanceMargin(e.target.value)} />
        </div>
      </div>
      <Button onClick={calculate} disabled={!equity || !borrowed || !shares} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Margin Call
      </Button>
      {result && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className={`text-center p-4 rounded-lg border ${result.status === "Safe" ? "bg-green-500/10 border-green-500/20" : result.status === "Warning" ? "bg-yellow-500/10 border-yellow-500/20" : "bg-destructive/10 border-destructive/20"}`}>
            <p className={`text-2xl font-bold font-serif ${result.status === "Safe" ? "text-green-600 dark:text-green-400" : result.status === "Warning" ? "text-yellow-600 dark:text-yellow-400" : "text-destructive"}`}>{result.status}</p>
            <p className="text-sm text-muted-foreground">Account Status</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">{result.currentMargin}%</p>
            <p className="text-sm text-muted-foreground">Current Margin</p>
          </div>
          <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <p className="text-2xl font-bold font-serif text-destructive">${result.marginCallPrice}</p>
            <p className="text-sm text-muted-foreground">Margin Call Price</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif">${result.totalValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Position Value</p>
          </div>
        </div>
      )}
    </div>
  );
}
