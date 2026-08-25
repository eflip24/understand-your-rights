import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";
import ToolResultAd from "@/components/tools/ToolResultAd";

export default function SeverancePayCalculator() {
  const { t } = useTranslation(["tools", "common"]);
  const lp = useLocalizedPath();
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [level, setLevel] = useState("standard");
  const [ptoDays, setPtoDays] = useState("");
  const [stateTax, setStateTax] = useState("5");
  const [age, setAge] = useState("under40");
  const [groupLayoff, setGroupLayoff] = useState("individual");

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

  // Severance is supplemental wages: employers normally withhold a flat 22%
  // federal rate (37% above $1M), plus FICA and state income tax. Net cash is
  // what people actually want to know before signing a release.
  const FED_SUPPLEMENTAL = 0.22;
  const FICA = 0.0765;
  const stateRate = (parseFloat(stateTax) || 0) / 100;
  const effectiveTax = FED_SUPPLEMENTAL + FICA + stateRate;
  const ptoValue = (parseFloat(ptoDays) || 0) * (annualSalary / 260);
  const grossLow = lowAmount + ptoValue;
  const grossHigh = highAmount + ptoValue;
  const netLow = grossLow * (1 - effectiveTax);
  const netHigh = grossHigh * (1 - effectiveTax);

  // OWBPA: workers 40+ get 21 days to consider a release (45 in a group
  // layoff) and 7 days to revoke after signing. Under 40 there is no
  // statutory review period at all.
  const is40Plus = age === "over40";
  const reviewDays = is40Plus ? (groupLayoff === "group" ? 45 : 21) : 0;

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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Unused PTO days being paid out</Label>
          <Input type="number" min="0" value={ptoDays} onChange={e => setPtoDays(e.target.value)} placeholder="8" />
        </div>
        <div>
          <Label>Your state income tax rate (%)</Label>
          <Input type="number" min="0" step="0.1" value={stateTax} onChange={e => setStateTax(e.target.value)} placeholder="5" />
        </div>
        <div>
          <Label>Your age</Label>
          <Select value={age} onValueChange={setAge}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="under40">Under 40</SelectItem>
              <SelectItem value="over40">40 or older</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Layoff type</Label>
          <Select value={groupLayoff} onValueChange={setGroupLayoff}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Just me / small number</SelectItem>
              <SelectItem value="group">Group layoff or RIF</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
            <div className="p-4 rounded-lg border bg-background space-y-2 text-sm">
              <p className="font-semibold">Take-home after withholding</p>
              {ptoValue > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>+ Unused PTO payout ({ptoDays} days)</span>
                  <span>${ptoValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>− Federal supplemental withholding (22%), FICA (7.65%) and state ({stateTax}%)</span>
                <span>{Math.round(effectiveTax * 100)}%</span>
              </div>
              <div className="flex justify-between font-bold text-accent border-t pt-2">
                <span>Estimated net cash</span>
                <span>
                  ${netLow.toLocaleString("en-US", { maximumFractionDigits: 0 })} – ${netHigh.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted text-sm space-y-2">
              <p className="font-semibold">Your review deadline</p>
              {is40Plus ? (
                <p className="text-muted-foreground">
                  You are 40 or older, so the Older Workers Benefit Protection Act gives you{" "}
                  <strong className="text-foreground">{reviewDays} days</strong> to consider the release
                  {groupLayoff === "group" ? " (45 days because this is a group layoff, and the employer must disclose the ages and job titles of everyone selected and not selected)" : ""}{" "}
                  and <strong className="text-foreground">7 days to revoke</strong> after signing. A release
                  that shortcuts either window is unenforceable as to age-discrimination claims.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Under 40 there is no statutory review period, so any deadline in the letter is the
                  employer's own. You can still ask for more time — most employers grant a few days.
                </p>
              )}
              <p className="text-muted-foreground">
                Also price COBRA before you sign. Continuation coverage typically runs $650–$750 a month
                for an individual and $1,900–$2,200 for a family, so a few months of employer-paid COBRA
                is often worth more than an extra week of pay.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">{t("internals.severance.footer")} Withholding is an estimate only; your actual tax depends on your full-year income and filing status.</p>
          </CardContent>
        </Card>
      )}

      <ToolResultAd show={calculated} />

      <p className="text-sm text-muted-foreground">
        Working in the EU? Severance there is set by statute, not custom.{" "}
        <Link to={lp("/eu-tools/severance-calculator")} className="text-accent hover:underline inline-flex items-center gap-1">
          Use the European severance calculator <ArrowRight className="h-3 w-3" />
        </Link>
      </p>
    </div>
  );
}
