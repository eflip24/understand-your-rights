import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function SeverancePayCalculator() {
  const { t } = useTranslation(["tools", "common"]);
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [level, setLevel] = useState("standard");

  const annualSalary = parseFloat(salary) || 0;
  const yearsWorked = parseFloat(years) || 0;
  const weeklySalary = annualSalary / 52;

  const multipliers: Record<string, { low: number; high: number; labelKey: string }> = {
    standard: { low: 1, high: 2, labelKey: "internals.severance.levelStandard" },
    generous: { low: 2, high: 4, labelKey: "internals.severance.levelGenerous" },
    executive: { low: 4, high: 8, labelKey: "internals.severance.levelExecutive" },
  };

  const m = multipliers[level];
  const lowWeeks = yearsWorked * m.low;
  const highWeeks = yearsWorked * m.high;
  const lowAmount = weeklySalary * lowWeeks;
  const highAmount = weeklySalary * highWeeks;

  const calculated = annualSalary > 0 && yearsWorked > 0;
  const weeksLbl = t("internals.severance.weeks");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>{t("internals.severance.salary")}</Label><Input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="75000" /></div>
        <div><Label>{t("internals.severance.years")}</Label><Input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="5" step="0.5" /></div>
      </div>
      <div>
        <Label>{t("internals.severance.level")}</Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.entries(multipliers).map(([k, v]) => <SelectItem key={k} value={k}>{t(v.labelKey)}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">{t("internals.severance.range")}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">{t("internals.severance.low")}</p>
                <p className="text-2xl font-bold text-accent">${lowAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                <p className="text-sm text-muted-foreground">{lowWeeks.toFixed(1)} {weeksLbl}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">{t("internals.severance.high")}</p>
                <p className="text-2xl font-bold text-accent">${highAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                <p className="text-sm text-muted-foreground">{highWeeks.toFixed(1)} {weeksLbl}</p>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">{t("internals.severance.weeklySalary")}</span> ${weeklySalary.toFixed(2)}</p>
              <p><span className="font-medium">{t("internals.severance.yearsService")}</span> {yearsWorked}</p>
              <p><span className="font-medium">{t("internals.severance.levelLabel")}</span> {t(m.labelKey)}</p>
            </div>
            <p className="text-xs text-muted-foreground">{t("internals.severance.footer")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
