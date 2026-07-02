import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export default function RefundChecker() {
  const { t } = useTranslation(["tools", "common"]);
  const questions = [
    { id: "type", label: t("internals.refund.q_type"), options: ["opt_physical", "opt_digital", "opt_service", "opt_subscription"] },
    { id: "when", label: t("internals.refund.q_when"), options: ["opt_lt14", "opt_14_30", "opt_30_90", "opt_gt90"] },
    { id: "issue", label: t("internals.refund.q_issue"), options: ["opt_defective", "opt_notdesc", "opt_changed", "opt_never"] },
    { id: "used", label: t("internals.refund.q_used"), options: ["opt_unopened", "opt_slightly", "opt_heavily", "opt_na"] },
  ];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ levelKey: string; color: string; adviceKey: string } | null>(null);

  const allAnswered = questions.every((q) => answers[q.id]);

  const check = () => {
    let score = 0;
    if (answers.when === "opt_lt14") score += 3;
    else if (answers.when === "opt_14_30") score += 2;
    else if (answers.when === "opt_30_90") score += 1;
    if (answers.issue === "opt_defective" || answers.issue === "opt_never") score += 3;
    else if (answers.issue === "opt_notdesc") score += 2;
    else score += 1;
    if (answers.used === "opt_unopened") score += 2;
    else if (answers.used === "opt_slightly") score += 1;
    if (score >= 7) setResult({ levelKey: "internals.refund.likely", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", adviceKey: "internals.refund.adviceLikely" });
    else if (score >= 4) setResult({ levelKey: "internals.refund.possibly", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", adviceKey: "internals.refund.advicePossibly" });
    else setResult({ levelKey: "internals.refund.unlikely", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", adviceKey: "internals.refund.adviceUnlikely" });
  };

  return (
    <div className="space-y-5">
      {questions.map((q) => (
        <div key={q.id} className="space-y-2">
          <Label>{q.label}</Label>
          <Select value={answers[q.id] || ""} onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
            <SelectTrigger><SelectValue placeholder={t("common:fields.selectPlaceholder")} /></SelectTrigger>
            <SelectContent>
              {q.options.map((opt) => (
                <SelectItem key={opt} value={opt}>{t(`internals.refund.${opt}`)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button onClick={check} disabled={!allAnswered} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        {t("internals.refund.button")}
      </Button>
      {result && (
        <div className="p-6 rounded-lg bg-secondary text-center space-y-2">
          <Badge className={result.color}>{t(result.levelKey)}</Badge>
          <p className="text-sm text-muted-foreground">{t(result.adviceKey)}</p>
        </div>
      )}
    </div>
  );
}
