import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

const Q = [
  { q: "Did you receive the product/service as described?", yes: -2, no: 3 },
  { q: "Did you contact the merchant first?", yes: 2, no: -1 },
  { q: "Was the charge unauthorized (fraud)?", yes: 4, no: 0 },
  { q: "Is the charge less than 60 days old?", yes: 3, no: -3 },
  { q: "Do you have written proof (emails, receipts)?", yes: 2, no: -1 },
  { q: "Was the merchant unresponsive or refused refund?", yes: 2, no: -1 },
];

export default function ChargebackChecker() {
  const { t } = useTranslation(["tools", "common"]);
  const [answers, setAnswers] = useState<Record<number, "yes" | "no" | undefined>>({});
  const [result, setResult] = useState<{ score: number; verdict: string; tips: string[] } | null>(null);

  const calc = () => {
    let score = 0;
    Q.forEach((item, i) => { const a = answers[i]; if (a === "yes") score += item.yes; else if (a === "no") score += item.no; });
    const verdict = score >= 8 ? "Strong case" : score >= 3 ? "Likely eligible" : score >= 0 ? "Borderline" : "Unlikely";
    const tips = [
      "Document all communication with the merchant before filing.",
      "File the chargeback with your card issuer, not the merchant.",
      "Federal Fair Credit Billing Act gives 60 days to dispute.",
      "Keep evidence: receipts, screenshots, shipping info.",
    ];
    setResult({ score, verdict, tips });
  };

  return (
    <div className="space-y-4">
      {Q.map((item, i) => (
        <div key={i}>
          <Label className="text-sm">{item.q}</Label>
          <RadioGroup value={answers[i]} onValueChange={(v) => setAnswers({ ...answers, [i]: v as "yes" | "no" })} className="flex gap-4 mt-1">
            <div className="flex items-center gap-2"><RadioGroupItem value="yes" id={`y${i}`} /><Label htmlFor={`y${i}`}>{t("internals.chargebackChecker.labels.yes")}</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="no" id={`n${i}`} /><Label htmlFor={`n${i}`}>{t("internals.chargebackChecker.labels.no")}</Label></div>
          </RadioGroup>
        </div>
      ))}
      <Button onClick={calc} disabled={Object.keys(answers).length < Q.length}>{t("internals.chargebackChecker.buttons.checkEligibility")}</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-2">
          <p className="text-2xl font-bold">{result.verdict}</p>
          <p className="text-sm text-muted-foreground">Score: {result.score}</p>
          <ul className="space-y-1 mt-2">{result.tips.map((t, i) => <li key={i} className="text-sm">• {t}</li>)}</ul>
        </CardContent></Card>
      )}
    </div>
  );
}
