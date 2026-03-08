import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TAX_BRACKETS = [
  { label: "10%", rate: 0.10 },
  { label: "12%", rate: 0.12 },
  { label: "22%", rate: 0.22 },
  { label: "24%", rate: 0.24 },
  { label: "32%", rate: 0.32 },
  { label: "35%", rate: 0.35 },
  { label: "37%", rate: 0.37 },
];

export default function StockOptionTaxCalculator() {
  const [optionType, setOptionType] = useState("iso");
  const [grantPrice, setGrantPrice] = useState("");
  const [exercisePrice, setExercisePrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [numShares, setNumShares] = useState("");
  const [holdingPeriod, setHoldingPeriod] = useState("long");
  const [bracket, setBracket] = useState("0.22");

  const grant = parseFloat(grantPrice) || 0;
  const exercise = parseFloat(exercisePrice) || 0;
  const sell = parseFloat(sellPrice) || 0;
  const shares = parseInt(numShares) || 0;
  const taxRate = parseFloat(bracket);
  const ltcgRate = 0.15;

  const bargainElement = (exercise - grant) * shares;
  const capitalGain = (sell - exercise) * shares;
  const totalGain = (sell - grant) * shares;

  const isLongTerm = holdingPeriod === "long";
  const isISO = optionType === "iso";

  let ordinaryIncomeTax = 0;
  let capitalGainsTax = 0;
  let amtExposure = 0;

  if (isISO) {
    if (isLongTerm) {
      capitalGainsTax = totalGain > 0 ? totalGain * ltcgRate : 0;
    } else {
      ordinaryIncomeTax = bargainElement > 0 ? bargainElement * taxRate : 0;
      capitalGainsTax = capitalGain > 0 ? capitalGain * (isLongTerm ? ltcgRate : taxRate) : 0;
    }
    amtExposure = bargainElement > 0 ? bargainElement * 0.28 : 0;
  } else {
    ordinaryIncomeTax = bargainElement > 0 ? bargainElement * taxRate : 0;
    capitalGainsTax = capitalGain > 0 ? capitalGain * (isLongTerm ? ltcgRate : taxRate) : 0;
  }

  const totalTax = ordinaryIncomeTax + capitalGainsTax;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Option Type</Label>
          <Select value={optionType} onValueChange={setOptionType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="iso">ISO (Incentive Stock Option)</SelectItem>
              <SelectItem value="nso">NSO (Non-Qualified Stock Option)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Grant / Strike Price ($)</Label>
          <Input type="number" value={grantPrice} onChange={(e) => setGrantPrice(e.target.value)} placeholder="e.g. 10" />
        </div>
        <div className="space-y-2">
          <Label>Fair Market Value at Exercise ($)</Label>
          <Input type="number" value={exercisePrice} onChange={(e) => setExercisePrice(e.target.value)} placeholder="e.g. 25" />
        </div>
        <div className="space-y-2">
          <Label>Sale Price ($)</Label>
          <Input type="number" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="e.g. 50" />
        </div>
        <div className="space-y-2">
          <Label>Number of Shares</Label>
          <Input type="number" value={numShares} onChange={(e) => setNumShares(e.target.value)} placeholder="e.g. 1000" />
        </div>
        <div className="space-y-2">
          <Label>Holding Period</Label>
          <Select value={holdingPeriod} onValueChange={setHoldingPeriod}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="long">Long-term (&gt;1 year from exercise, &gt;2 years from grant)</SelectItem>
              <SelectItem value="short">Short-term (disqualifying disposition)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Ordinary Income Tax Bracket</Label>
          <Select value={bracket} onValueChange={setBracket}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TAX_BRACKETS.map((b) => (
                <SelectItem key={b.rate} value={b.rate.toString()}>{b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {shares > 0 && sell > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Bargain Element</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">${bargainElement.toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Capital Gain</CardTitle></CardHeader>
            <CardContent><p className={`text-2xl font-bold font-serif ${capitalGain < 0 ? "text-destructive" : ""}`}>${capitalGain.toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Gain</CardTitle></CardHeader>
            <CardContent><p className={`text-2xl font-bold font-serif ${totalGain < 0 ? "text-destructive" : ""}`}>${totalGain.toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Ordinary Income Tax</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">${ordinaryIncomeTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Capital Gains Tax</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">${capitalGainsTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></CardContent>
          </Card>
          <Card className="border-primary/30">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Estimated Total Tax</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold font-serif">${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></CardContent>
          </Card>
          {isISO && amtExposure > 0 && (
            <Card className="sm:col-span-2 lg:col-span-3">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">⚠ <strong>AMT Exposure:</strong> The bargain element of ${bargainElement.toLocaleString()} may trigger Alternative Minimum Tax. Estimated AMT on this amount: ${amtExposure.toLocaleString(undefined, { maximumFractionDigits: 0 })} (at 28% rate). Consult a tax professional.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
