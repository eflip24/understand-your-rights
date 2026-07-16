import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import ScenarioCompare, { type ScenarioSnapshot } from "@/components/tools/ScenarioCompare";

const STATE_RATES: Record<string, { model: string; pct: number[]; note: string }> = {
  "California": { model: "Income Shares", pct: [0.20, 0.27, 0.32, 0.36, 0.40], note: "CA Fam. Code § 4055 — guideline formula varies by custody time-share." },
  "New York": { model: "Percentage of Income", pct: [0.17, 0.25, 0.29, 0.31, 0.35], note: "N.Y. Dom. Rel. Law § 240(1-b)." },
  "Texas": { model: "Percentage of Income (Obligor only)", pct: [0.20, 0.25, 0.30, 0.35, 0.40], note: "Tex. Fam. Code § 154.125 — based on obligor net income." },
  "Florida": { model: "Income Shares", pct: [0.20, 0.28, 0.32, 0.36, 0.40], note: "Fla. Stat. § 61.30." },
  "Illinois": { model: "Income Shares", pct: [0.20, 0.28, 0.32, 0.40, 0.45], note: "750 ILCS 5/505." },
  "Other": { model: "Income Shares (estimate)", pct: [0.20, 0.27, 0.32, 0.36, 0.40], note: "Most states use a similar income-shares model — check your state for precision." },
};

export default function ChildSupportCalculator() {
  const { t } = useTranslation(["tools", "common"]);
  const [yourIncome, setYourIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [children, setChildren] = useState("1");
  const [state, setState] = useState("California");
  const [role, setRole] = useState<"obligor" | "recipient">("obligor");

  const yi = parseFloat(yourIncome) || 0;
  const oi = parseFloat(otherIncome) || 0;
  const n = Math.max(1, Math.min(5, parseInt(children) || 1));
  const data = STATE_RATES[state];
  const pct = data.pct[n - 1];

  let monthlyObligation = 0;
  if (state === "Texas") {
    const obligorIncome = role === "obligor" ? yi : oi;
    monthlyObligation = (obligorIncome * pct) / 12;
  } else {
    const combined = yi + oi;
    const totalSupport = (combined * pct) / 12;
    const obligorIncome = role === "obligor" ? yi : oi;
    const share = combined > 0 ? obligorIncome / combined : 0;
    monthlyObligation = totalSupport * share;
  }

  const calculated = yi > 0 || oi > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>{t("internals.childSupport.yourIncome")}</Label><Input type="number" value={yourIncome} onChange={e => setYourIncome(e.target.value)} placeholder="60000" /></div>
        <div><Label>{t("internals.childSupport.otherIncome")}</Label><Input type="number" value={otherIncome} onChange={e => setOtherIncome(e.target.value)} placeholder="50000" /></div>
        <div>
          <Label>{t("internals.childSupport.numChildren")}</Label>
          <Select value={children} onValueChange={setChildren}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{[1,2,3,4,5].map(i => <SelectItem key={i} value={String(i)}>{i}{i===5?"+":""}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>{t("common:fields.state")}</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(STATE_RATES).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>{t("internals.childSupport.yourRole")}</Label>
          <Select value={role} onValueChange={(v) => setRole(v as "obligor" | "recipient")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="obligor">{t("internals.childSupport.roleObligor")}</SelectItem>
              <SelectItem value="recipient">{t("internals.childSupport.roleRecipient")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">{t("internals.childSupport.estimated")}</h3>
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">{role === "obligor" ? t("internals.childSupport.youPay") : t("internals.childSupport.youReceive")}</p>
              <p className="text-4xl font-bold text-accent">${monthlyObligation.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-muted-foreground">{t("internals.childSupport.perMonth")}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p><span className="font-medium">{t("internals.childSupport.model")}</span> {data.model}</p>
              <p><span className="font-medium">{t("internals.childSupport.guidelinePct")}</span> {t("internals.childSupport.guidelineText", { pct: (pct * 100).toFixed(0), n })}</p>
              <p><span className="font-medium">{t("internals.childSupport.statute")}</span> {data.note}</p>
            </div>
            <p className="text-xs text-muted-foreground">{t("internals.childSupport.footer")}</p>
          </CardContent>
        </Card>
      )}

      {/* Day 9 — 3-scenario side-by-side comparison */}
      <ChildSupportScenarioBar
        yourIncome={yourIncome}
        otherIncome={otherIncome}
        children={children}
        state={state}
        role={role}
        monthlyObligation={monthlyObligation}
        calculated={calculated}
      />
    </div>
  );
}

function ChildSupportScenarioBar({
  yourIncome,
  otherIncome,
  children,
  state,
  role,
  monthlyObligation,
  calculated,
}: {
  yourIncome: string;
  otherIncome: string;
  children: string;
  state: string;
  role: "obligor" | "recipient";
  monthlyObligation: number;
  calculated: boolean;
}) {
  const buildSnapshot = useCallback((): ScenarioSnapshot | null => {
    if (!calculated) return null;
    const yi = parseFloat(yourIncome) || 0;
    const oi = parseFloat(otherIncome) || 0;
    const n = Math.max(1, Math.min(5, parseInt(children) || 1));
    const monthly = Math.round(monthlyObligation);
    const annual = monthly * 12;
    const fmt = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    return {
      label: `${state} · ${n} kid${n > 1 ? "s" : ""} · ${fmt(yi)} / ${fmt(oi)}`,
      savedAt: Date.now(),
      rows: [
        {
          label: role === "obligor" ? "Monthly you pay" : "Monthly you receive",
          value: fmt(monthly),
          numeric: monthly,
          higherIsBetter: role === "recipient",
        },
        { label: "Annual", value: fmt(annual), numeric: annual, higherIsBetter: role === "recipient" },
        { label: "Children", value: String(n), numeric: n },
        { label: "State", value: state },
        { label: "Combined income", value: fmt(yi + oi), numeric: yi + oi },
      ],
    };
  }, [yourIncome, otherIncome, children, state, role, monthlyObligation, calculated]);

  return (
    <ScenarioCompare
      title="Compare 3 child-support scenarios side-by-side"
      description="Adjust the incomes, number of children, or state above and save each version to see how the monthly obligation changes."
      buildSnapshot={buildSnapshot}
      contextLabel={role === "obligor" ? "Obligor view" : "Recipient view"}
    />
  );
}
