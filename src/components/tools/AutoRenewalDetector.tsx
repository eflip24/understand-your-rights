import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AutoRenewalDetector() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ detected: boolean; matches: string[]; noticeWindow: string | null; warnings: string[] } | null>(null);

  const analyze = () => {
    const patterns = [/auto(?:matic|matically)?\s*(?:renew|renewal)/gi, /evergreen/gi, /shall\s*renew/gi, /renew(?:s|ed)?\s*for\s*(?:successive|additional)/gi];
    const matches: string[] = [];
    patterns.forEach(p => { const m = text.match(p); if (m) matches.push(...m); });
    const noticeMatch = text.match(/(\d+)\s*(?:days?|months?)\s*(?:prior|written\s*notice|before|in\s*advance)/i);
    const warnings: string[] = [];
    if (matches.length && !noticeMatch) warnings.push("Auto-renewal detected but no clear notice window — risky.");
    if (noticeMatch && parseInt(noticeMatch[1]) > 60) warnings.push(`Long notice window (${noticeMatch[0]}) — set a calendar reminder.`);
    if (/perpetual|indefinite/i.test(text)) warnings.push("Possible perpetual term language detected.");
    setResult({ detected: matches.length > 0, matches: [...new Set(matches.map(m => m.toLowerCase()))], noticeWindow: noticeMatch?.[0] || null, warnings });
  };

  return (
    <div className="space-y-4">
      <Textarea placeholder="Paste your contract or subscription terms..." value={text} onChange={(e) => setText(e.target.value)} rows={10} />
      <Button onClick={analyze} disabled={text.trim().length < 30}>Detect Auto-Renewal</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-3">
          <p className="font-semibold">{result.detected ? "⚠ Auto-renewal language detected" : "✓ No auto-renewal language found"}</p>
          {result.matches.length > 0 && <p className="text-sm">Matches: {result.matches.join(", ")}</p>}
          {result.noticeWindow && <p className="text-sm">Notice window: <span className="font-medium">{result.noticeWindow}</span></p>}
          {result.warnings.map((w, i) => <p key={i} className="text-sm text-destructive">• {w}</p>)}
        </CardContent></Card>
      )}
    </div>
  );
}
