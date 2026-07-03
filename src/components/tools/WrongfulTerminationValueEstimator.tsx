import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function WrongfulTerminationValueEstimator() {
  const { t } = useTranslation(["tools", "common"]);
  const [salary, setSalary] = useState("");
  const [monthsUnemployed, setMonthsUnemployed] = useState("");
  const [benefitsValue, setBenefitsValue] = useState("");
  const [claimType, setClaimType] = useState<"breach" | "discrimination" | "retaliation" | "whistleblower">("breach");
  const [strength, setStrength] = useState<"weak" | "moderate" | "strong">("moderate");

  const annual = parseFloat(salary) || 0;
  const months = parseFloat(monthsUnemployed) || 0;
  const benefits = parseFloat(benefitsValue) || 0;

  const monthly = annual / 12;
  const backPay = monthly * months;
  const benefitsLost = (benefits / 12) * months;

  // Front pay multiplier
  const frontPayMonths: Record<string, number> = { breach: 6, discrimination: 12, retaliation: 12, whistleblower: 18 };
  const frontPay = monthly * frontPayMonths[claimType];

  // Emotional distress / punitive (only for non-breach)
  const emotionalBase: Record<string, number> = { breach: 0, discrimination: 25000, retaliation: 35000, whistleblower: 50000 };
  const emotionalLow = emotionalBase[claimType];
  const emotionalHigh = emotionalLow * 4;

  const strengthMult: Record<string, number> = { weak: 0.4, moderate: 1.0, strong: 1.6 };
  const m = strengthMult[strength];

  const low = (backPay + benefitsLost + frontPay * 0.5 + emotionalLow) * m;
  const high = (backPay + benefitsLost + frontPay * 1.5 + emotionalHigh) * m;
  const attorneyFee = high * 0.33;

  const calculated = annual > 0 && months > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>{t("internals.wrongfulTerminationValueEstimator.labels.annualSalaryAtTerminationDollar")}</Label><Input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="75000" /></div>
        <div><Label>{t("internals.wrongfulTerminationValueEstimator.labels.monthsUnemployedSince")}</Label><Input type="number" value={monthsUnemployed} onChange={e => setMonthsUnemployed(e.target.value)} placeholder="6" step="0.5" /></div>
        <div><Label>{t("internals.wrongfulTerminationValueEstimator.labels.annualBenefitsValueDollar")}</Label><Input type="number" value={benefitsValue} onChange={e => setBenefitsValue(e.target.value)} placeholder="12000" /></div>
        <div>
          <Label>{t("internals.wrongfulTerminationValueEstimator.labels.claimType")}</Label>
          <Select value={claimType} onValueChange={(v) => setClaimType(v as typeof claimType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="breach">Breach of Contract</SelectItem>
              <SelectItem value="discrimination">Discrimination (race, sex, age, etc.)</SelectItem>
              <SelectItem value="retaliation">Retaliation</SelectItem>
              <SelectItem value="whistleblower">Whistleblower / Public Policy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>{t("internals.wrongfulTerminationValueEstimator.labels.caseStrength")}</Label>
          <Select value={strength} onValueChange={(v) => setStrength(v as typeof strength)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="weak">Weak (mostly verbal evidence)</SelectItem>
              <SelectItem value="moderate">Moderate (some documents, witnesses)</SelectItem>
              <SelectItem value="strong">Strong (clear documentation, multiple witnesses)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Estimated Case Value</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Settlement Range (Low)</p>
                <p className="text-3xl font-bold text-accent">${low.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Settlement Range (High)</p>
                <p className="text-3xl font-bold text-accent">${high.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">Back pay:</span> ${backPay.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              <p><span className="font-medium">Lost benefits:</span> ${benefitsLost.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              <p><span className="font-medium">Front pay range:</span> ${(frontPay * 0.5).toLocaleString("en-US", { maximumFractionDigits: 0 })} – ${(frontPay * 1.5).toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              {emotionalLow > 0 && <p><span className="font-medium">Emotional/punitive range:</span> ${emotionalLow.toLocaleString()} – ${emotionalHigh.toLocaleString()}</p>}
              <p><span className="font-medium">Typical attorney fee (33% of high):</span> ${attorneyFee.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
            </div>
            <p className="text-xs text-muted-foreground">Most wrongful termination cases settle. You must mitigate damages by seeking new work. Outcomes vary widely by jurisdiction, employer size, and evidence. Not legal advice — consult an employment attorney.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
