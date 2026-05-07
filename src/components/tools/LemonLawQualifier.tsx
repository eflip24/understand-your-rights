import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LemonLawQualifier() {
  const [repairs, setRepairs] = useState("");
  const [days, setDays] = useState("");
  const [age, setAge] = useState("");
  const [miles, setMiles] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const check = () => {
    const r = parseInt(repairs), d = parseInt(days), a = parseInt(age), m = parseInt(miles);
    const reasons: string[] = [];
    if (r >= 4) reasons.push(`${r} repair attempts for the same issue meets most state thresholds (typically 3–4).`);
    if (d >= 30) reasons.push(`${d} days out of service exceeds the common 30-day standard.`);
    if (a <= 24 && m <= 24000) reasons.push("Vehicle is within the typical 2 years / 24,000 miles coverage window.");
    const qualifies = reasons.length >= 2;
    setResult(qualifies
      ? `Likely qualifies as a lemon. Reasons:\n• ${reasons.join("\n• ")}\n\nNext step: contact your state attorney general or a lemon-law attorney.`
      : `May not meet the typical lemon-law threshold. Lemon laws vary by state — check your state's specific rules.${reasons.length ? "\n\nFactors in your favor:\n• " + reasons.join("\n• ") : ""}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>Repair attempts (same issue)</Label><Input type="number" value={repairs} onChange={e => setRepairs(e.target.value)} /></div>
        <div><Label>Total days out of service</Label><Input type="number" value={days} onChange={e => setDays(e.target.value)} /></div>
        <div><Label>Vehicle age (months)</Label><Input type="number" value={age} onChange={e => setAge(e.target.value)} /></div>
        <div><Label>Mileage</Label><Input type="number" value={miles} onChange={e => setMiles(e.target.value)} /></div>
      </div>
      <Button onClick={check} disabled={!repairs || !days || !age || !miles}>Check Qualification</Button>
      {result && <Card><CardContent className="p-4"><p className="text-sm whitespace-pre-wrap">{result}</p></CardContent></Card>}
    </div>
  );
}
