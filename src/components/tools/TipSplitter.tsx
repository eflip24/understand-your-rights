import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

export default function TipSplitter() {
  const { t } = useTranslation(["tools", "common"]);
  const [bill, setBill] = useState("");
  const [tax, setTax] = useState("");
  const [tip, setTip] = useState("18");
  const [people, setPeople] = useState("2");
  const [serviceCharge, setServiceCharge] = useState(false);
  const [result, setResult] = useState<{ perPerson: number; total: number; tipAmt: number } | null>(null);

  const calc = () => {
    const b = parseFloat(bill);
    const t = parseFloat(tax || "0");
    const tipAmt = serviceCharge ? 0 : b * (parseFloat(tip) / 100);
    const total = b + t + tipAmt;
    setResult({ perPerson: total / parseInt(people), total, tipAmt });
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>{t("internals.tipSplitter.labels.subtotalDollar")}</Label><Input type="number" value={bill} onChange={e => setBill(e.target.value)} /></div>
        <div><Label>{t("internals.tipSplitter.labels.taxDollar")}</Label><Input type="number" value={tax} onChange={e => setTax(e.target.value)} /></div>
        <div><Label>{t("internals.tipSplitter.labels.tipPercent")}</Label><Input type="number" value={tip} onChange={e => setTip(e.target.value)} disabled={serviceCharge} /></div>
        <div><Label>{t("internals.tipSplitter.labels.people")}</Label><Input type="number" value={people} onChange={e => setPeople(e.target.value)} /></div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked={serviceCharge} onCheckedChange={v => setServiceCharge(!!v)} id="sc" />
        <Label htmlFor="sc" className="text-sm">{t("internals.tipSplitter.labels.mandatoryServiceChargeAlreadyIncludedSkip")}</Label>
      </div>
      <Button onClick={calc} disabled={!bill}>{t("internals.tipSplitter.buttons.calculateSplit")}</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-2">
          <p className="text-3xl font-bold">${result.perPerson.toFixed(2)}/person</p>
          <p className="text-sm text-muted-foreground">Total: ${result.total.toFixed(2)} • Tip: ${result.tipAmt.toFixed(2)}</p>
          <p className="text-xs italic text-muted-foreground">Note: Mandatory service charges are not legally tips and may not go to staff. Voluntary tips do.</p>
        </CardContent></Card>
      )}
    </div>
  );
}
