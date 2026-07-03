import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const TRIGGERS = ["act of god", "war", "terrorism", "pandemic", "epidemic", "government", "natural disaster", "earthquake", "flood", "fire", "strike", "labor dispute", "supply chain", "shortage", "embargo"];
const STRONG = ["catch-all", "any other event", "beyond reasonable control", "including but not limited to"];

export default function ForceMajeureChecker() {
  const { t } = useTranslation(["tools", "common"]);
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ found: boolean; triggers: string[]; strength: string; notes: string[] } | null>(null);

  const analyze = () => {
    const lower = text.toLowerCase();
    const fmMatch = /force majeure|act of god|beyond.{0,20}control/i.test(text);
    const triggers = TRIGGERS.filter(t => lower.includes(t));
    const hasCatchAll = STRONG.some(s => lower.includes(s));
    const strength = !fmMatch ? "None detected" : triggers.length >= 5 && hasCatchAll ? "Strong & broad" : triggers.length >= 3 ? "Moderate" : "Narrow";
    const notes: string[] = [];
    if (!fmMatch) notes.push("No force majeure clause detected. Consider negotiating one in.");
    if (fmMatch && !hasCatchAll) notes.push("Clause lacks a catch-all 'any other event beyond reasonable control' phrase.");
    if (!/notice|notify/i.test(text)) notes.push("No notice requirement found — disputes may arise about when force majeure was invoked.");
    if (!/mitigat/i.test(text)) notes.push("No duty-to-mitigate language — adds risk for the non-performing party.");
    setResult({ found: fmMatch, triggers, strength, notes });
  };

  return (
    <div className="space-y-4">
      <Textarea placeholder={t("internals.forceMajeureChecker.placeholders.pasteYourContractText")} value={text} onChange={(e) => setText(e.target.value)} rows={10} />
      <Button onClick={analyze} disabled={text.trim().length < 30}>{t("internals.forceMajeureChecker.buttons.checkForceMajeureClause")}</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-3">
          <div><span className="text-sm text-muted-foreground">Strength: </span><span className="font-semibold">{result.strength}</span></div>
          {result.triggers.length > 0 && (
            <div><p className="text-sm font-medium mb-1">Covered events:</p>
              <div className="flex flex-wrap gap-2">{result.triggers.map(t => <span key={t} className="text-xs bg-secondary px-2 py-1 rounded">{t}</span>)}</div>
            </div>
          )}
          {result.notes.length > 0 && (
            <div><p className="text-sm font-medium mb-1">Notes:</p>
              <ul className="space-y-1">{result.notes.map((n, i) => <li key={i} className="text-sm text-muted-foreground">• {n}</li>)}</ul>
            </div>
          )}
        </CardContent></Card>
      )}
    </div>
  );
}
