import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function AutoRenewalDetector() {
  const { t } = useTranslation(["tools", "common"]);
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ detected: boolean; matches: string[]; noticeWindow: string | null; warnings: string[] } | null>(null);

  const analyze = () => {
    const patterns = [/auto(?:matic|matically)?\s*(?:renew|renewal)/gi, /evergreen/gi, /shall\s*renew/gi, /renew(?:s|ed)?\s*for\s*(?:successive|additional)/gi];
    const matches: string[] = [];
    patterns.forEach(p => { const m = text.match(p); if (m) matches.push(...m); });
    const noticeMatch = text.match(/(\d+)\s*(?:days?|months?)\s*(?:prior|written\s*notice|before|in\s*advance)/i);
    const warnings: string[] = [];
    if (matches.length && !noticeMatch) warnings.push(t("internals.autoRenewal.warnNoNotice"));
    if (noticeMatch && parseInt(noticeMatch[1]) > 60) warnings.push(t("internals.autoRenewal.warnLongNotice", { window: noticeMatch[0] }));
    if (/perpetual|indefinite/i.test(text)) warnings.push(t("internals.autoRenewal.warnPerpetual"));
    setResult({ detected: matches.length > 0, matches: [...new Set(matches.map(m => m.toLowerCase()))], noticeWindow: noticeMatch?.[0] || null, warnings });
  };

  return (
    <div className="space-y-4">
      <Textarea placeholder={t("internals.autoRenewal.placeholder")} value={text} onChange={(e) => setText(e.target.value)} rows={10} />
      <Button onClick={analyze} disabled={text.trim().length < 30}>{t("internals.autoRenewal.button")}</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-3">
          <p className="font-semibold">{result.detected ? t("internals.autoRenewal.detected") : t("internals.autoRenewal.clean")}</p>
          {result.matches.length > 0 && <p className="text-sm">{t("internals.autoRenewal.matches")}: {result.matches.join(", ")}</p>}
          {result.noticeWindow && <p className="text-sm">{t("internals.autoRenewal.noticeWindow")}: <span className="font-medium">{result.noticeWindow}</span></p>}
          {result.warnings.map((w, i) => <p key={i} className="text-sm text-destructive">• {w}</p>)}
        </CardContent></Card>
      )}
    </div>
  );
}
