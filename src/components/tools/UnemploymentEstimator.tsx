import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const MAX_BY_STATE: Record<string, number> = {
  "California": 450, "New York": 504, "Texas": 577, "Florida": 275, "Illinois": 542,
  "Pennsylvania": 605, "Washington": 1019, "Massachusetts": 1033, "Other / National avg": 450,
};

export default function UnemploymentEstimator() {
  const { t } = useTranslation(["tools", "common"]);
  const [wages, setWages] = useState("");
  const [state, setState] = useState("Other / National avg");
  const [result, setResult] = useState<{ weekly: number; max: number; weeks: number } | null>(null);

  const calc = () => {
    const w = parseFloat(wages);
    const max = MAX_BY_STATE[state];
    const weekly = Math.min(Math.round((w / 52) * 0.5), max);
    setResult({ weekly, max, weeks: 26 });
  };

  return (
    <div className="space-y-4">
      <div><Label>{t("common:fields.state")}</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{Object.keys(MAX_BY_STATE).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div><Label>{t("internals.unemployment.wages")}</Label><Input type="number" value={wages} onChange={e => setWages(e.target.value)} /></div>
      <Button onClick={calc} disabled={!wages}>{t("internals.unemployment.button")}</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-2">
          <p className="text-3xl font-bold">${result.weekly}{t("internals.unemployment.perWeek")}</p>
          <p className="text-sm text-muted-foreground">{t("internals.unemployment.stateMax")}: ${result.max}{t("internals.unemployment.maxPerWeek", { weeks: result.weeks })}</p>
          <p className="text-xs italic text-muted-foreground">{t("internals.unemployment.footer")}</p>
        </CardContent></Card>
      )}
    </div>
  );
}
