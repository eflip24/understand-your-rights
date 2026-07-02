import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export default function EmergencyFundCalculator() {
  const { t } = useTranslation(["tools", "common"]);
  const [expenses, setExpenses] = useState("");
  const [months, setMonths] = useState("6");
  const [saving, setSaving] = useState("");
  const [current, setCurrent] = useState("0");
  const [result, setResult] = useState<{ goal: number; needed: number; monthsTo: number } | null>(null);

  const calc = () => {
    const goal = parseFloat(expenses) * parseFloat(months);
    const needed = Math.max(goal - parseFloat(current), 0);
    const monthsTo = parseFloat(saving) > 0 ? Math.ceil(needed / parseFloat(saving)) : 0;
    setResult({ goal, needed, monthsTo });
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>{t("internals.emergencyFund.expenses")}</Label><Input type="number" value={expenses} onChange={e => setExpenses(e.target.value)} /></div>
        <div><Label>{t("internals.emergencyFund.months")}</Label><Input type="number" value={months} onChange={e => setMonths(e.target.value)} /></div>
        <div><Label>{t("internals.emergencyFund.saved")}</Label><Input type="number" value={current} onChange={e => setCurrent(e.target.value)} /></div>
        <div><Label>{t("internals.emergencyFund.contribution")}</Label><Input type="number" value={saving} onChange={e => setSaving(e.target.value)} /></div>
      </div>
      <Button onClick={calc} disabled={!expenses}>{t("internals.emergencyFund.button")}</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-2">
          <p className="text-3xl font-bold">${result.goal.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">{t("internals.emergencyFund.recommended")}</p>
          <p className="text-sm">{t("internals.emergencyFund.stillNeed")}: <strong>${result.needed.toLocaleString()}</strong></p>
          {result.monthsTo > 0 && <p className="text-sm">{t("internals.emergencyFund.reachIn", { contrib: saving, months: result.monthsTo })}</p>}
        </CardContent></Card>
      )}
    </div>
  );
}
