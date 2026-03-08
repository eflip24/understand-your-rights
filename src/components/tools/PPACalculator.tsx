import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PPACalculator() {
  const [ppaRate, setPpaRate] = useState("");
  const [ppaEscalation, setPpaEscalation] = useState("");
  const [termYears, setTermYears] = useState("");
  const [utilityRate, setUtilityRate] = useState("");
  const [utilityEscalation, setUtilityEscalation] = useState("");
  const [annualKwh, setAnnualKwh] = useState("");
  const [result, setResult] = useState<{
    ppaTotalCost: number;
    utilityTotalCost: number;
    totalSavings: number;
    yearByYear: { year: number; ppa: number; utility: number; savings: number }[];
  } | null>(null);

  const calculate = () => {
    const ppa = parseFloat(ppaRate);
    const ppaEsc = parseFloat(ppaEscalation) / 100;
    const term = parseInt(termYears);
    const utility = parseFloat(utilityRate);
    const utilEsc = parseFloat(utilityEscalation) / 100;
    const kwh = parseFloat(annualKwh);
    if (!ppa || !term || !utility || !kwh) return;

    let ppaTotalCost = 0;
    let utilityTotalCost = 0;
    const yearByYear: { year: number; ppa: number; utility: number; savings: number }[] = [];

    for (let y = 0; y < term; y++) {
      const ppaYearRate = ppa * Math.pow(1 + (ppaEsc || 0), y);
      const utilYearRate = utility * Math.pow(1 + (utilEsc || 0), y);
      const ppaCost = kwh * ppaYearRate;
      const utilCost = kwh * utilYearRate;
      ppaTotalCost += ppaCost;
      utilityTotalCost += utilCost;
      yearByYear.push({ year: y + 1, ppa: ppaCost, utility: utilCost, savings: utilCost - ppaCost });
    }

    setResult({ ppaTotalCost, utilityTotalCost, totalSavings: utilityTotalCost - ppaTotalCost, yearByYear });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="ppaRate">PPA Rate ($/kWh)</Label>
          <Input id="ppaRate" type="number" step="0.01" placeholder="0.10" value={ppaRate} onChange={(e) => setPpaRate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="ppaEsc">PPA Annual Escalation (%)</Label>
          <Input id="ppaEsc" type="number" step="0.1" placeholder="2" value={ppaEscalation} onChange={(e) => setPpaEscalation(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="utilityRate">Current Utility Rate ($/kWh)</Label>
          <Input id="utilityRate" type="number" step="0.01" placeholder="0.14" value={utilityRate} onChange={(e) => setUtilityRate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="utilEsc">Utility Annual Escalation (%)</Label>
          <Input id="utilEsc" type="number" step="0.1" placeholder="3.5" value={utilityEscalation} onChange={(e) => setUtilityEscalation(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="termYears">Contract Term (years)</Label>
          <Input id="termYears" type="number" placeholder="20" value={termYears} onChange={(e) => setTermYears(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="annualKwh">Annual Usage (kWh)</Label>
          <Input id="annualKwh" type="number" placeholder="10000" value={annualKwh} onChange={(e) => setAnnualKwh(e.target.value)} />
        </div>
      </div>

      <Button onClick={calculate} className="w-full">Compare PPA vs Utility</Button>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card><CardContent className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">PPA Total Cost</p>
              <p className="text-2xl font-bold text-foreground">${result.ppaTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </CardContent></Card>
            <Card><CardContent className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">Utility Total Cost</p>
              <p className="text-2xl font-bold text-foreground">${result.utilityTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </CardContent></Card>
            <Card className="border-accent/30"><CardContent className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">Total Savings</p>
              <p className={`text-2xl font-bold ${result.totalSavings >= 0 ? "text-accent" : "text-destructive"}`}>
                ${Math.abs(result.totalSavings).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                {result.totalSavings < 0 && " (loss)"}
              </p>
            </CardContent></Card>
          </div>

          <Card>
            <CardContent className="pt-4">
              <p className="font-medium mb-2 text-foreground">Year-by-Year Comparison</p>
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1 text-muted-foreground">Year</th>
                      <th className="text-right py-1 text-muted-foreground">PPA</th>
                      <th className="text-right py-1 text-muted-foreground">Utility</th>
                      <th className="text-right py-1 text-muted-foreground">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearByYear.map(row => (
                      <tr key={row.year} className="border-b border-border/50">
                        <td className="py-1 text-foreground">{row.year}</td>
                        <td className="text-right text-foreground">${row.ppa.toFixed(0)}</td>
                        <td className="text-right text-foreground">${row.utility.toFixed(0)}</td>
                        <td className={`text-right font-medium ${row.savings >= 0 ? "text-accent" : "text-destructive"}`}>${row.savings.toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
