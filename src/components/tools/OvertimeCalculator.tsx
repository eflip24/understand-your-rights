import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function OvertimeCalculator() {
  const { t } = useTranslation(["tools", "common"]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [regularHours, setRegularHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [otMultiplier, setOtMultiplier] = useState("1.5");

  const rate = parseFloat(hourlyRate) || 0;
  const regular = parseFloat(regularHours) || 0;
  const ot = parseFloat(overtimeHours) || 0;
  const mult = parseFloat(otMultiplier) || 1.5;

  const regularPay = rate * regular;
  const otRate = rate * mult;
  const otPay = otRate * ot;
  const totalPay = regularPay + otPay;
  const totalHours = regular + ot;
  const effectiveRate = totalHours > 0 ? totalPay / totalHours : 0;

  const calculated = rate > 0 && ot > 0;
  const hrs = t("internals.overtime.hrs");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>{t("internals.overtime.hourlyRate")}</Label><Input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="25" /></div>
        <div><Label>{t("internals.overtime.regularHours")}</Label><Input type="number" value={regularHours} onChange={e => setRegularHours(e.target.value)} placeholder="40" /></div>
        <div><Label>{t("internals.overtime.overtimeHours")}</Label><Input type="number" value={overtimeHours} onChange={e => setOvertimeHours(e.target.value)} placeholder="10" /></div>
        <div>
          <Label>{t("internals.overtime.multiplier")}</Label>
          <Select value={otMultiplier} onValueChange={setOtMultiplier}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1.5">{t("internals.overtime.mult15")}</SelectItem>
              <SelectItem value="2">{t("internals.overtime.mult2")}</SelectItem>
              <SelectItem value="2.5">{t("internals.overtime.mult25")}</SelectItem>
              <SelectItem value="3">{t("internals.overtime.mult3")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">{t("internals.overtime.breakdown")}</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">{t("internals.overtime.regularPay")}</p>
                <p className="text-xl font-bold">${regularPay.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{regular}{hrs} × ${rate.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">{t("internals.overtime.overtimePay")}</p>
                <p className="text-xl font-bold text-accent">${otPay.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{ot}{hrs} × ${otRate.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-center border border-primary/20">
                <p className="text-sm text-muted-foreground">{t("internals.overtime.totalPay")}</p>
                <p className="text-xl font-bold">${totalPay.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{totalHours} {t("internals.overtime.totalHours")}</p>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p><span className="font-medium">{t("internals.overtime.otRate")}</span> ${otRate.toFixed(2)}/hr ({mult}x {t("internals.overtime.otRateSuffix")})</p>
              <p><span className="font-medium">{t("internals.overtime.effectiveRate")}</span> ${effectiveRate.toFixed(2)}/hr {t("internals.overtime.effectiveRateSuffix")}</p>
              <p><span className="font-medium">{t("internals.overtime.otPremium")}</span> ${(otPay - rate * ot).toFixed(2)} {t("internals.overtime.otPremiumSuffix")}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
