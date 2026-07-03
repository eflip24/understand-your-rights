import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { legalTerms } from "@/data/legalTerms";
import { useTranslation } from "react-i18next";

const REPLACEMENTS: [RegExp, string][] = [
  [/\bheretofore\b/gi, "before now"], [/\bhereinafter\b/gi, "from now on"],
  [/\bhereby\b/gi, ""], [/\bwhereas\b/gi, "since"], [/\bnotwithstanding\b/gi, "despite"],
  [/\bpursuant to\b/gi, "under"], [/\bin the event that\b/gi, "if"],
  [/\bprior to\b/gi, "before"], [/\bsubsequent to\b/gi, "after"],
  [/\bshall\b/gi, "must"], [/\butilize\b/gi, "use"], [/\bcommence\b/gi, "start"],
  [/\bterminate\b/gi, "end"], [/\bin lieu of\b/gi, "instead of"],
  [/\bin order to\b/gi, "to"], [/\bat such time as\b/gi, "when"],
];

export default function PlainEnglishRewriter() {
  const { t } = useTranslation(["tools", "common"]);
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ rewritten: string; glossary: { term: string; definition: string }[] } | null>(null);

  const rewrite = () => {
    let rewritten = text;
    REPLACEMENTS.forEach(([r, s]) => { rewritten = rewritten.replace(r, s); });
    rewritten = rewritten.replace(/\s+/g, " ").replace(/\s+([.,;:])/g, "$1").trim();
    const lower = text.toLowerCase();
    const glossary = legalTerms.filter(t => lower.includes(t.term.toLowerCase())).slice(0, 8).map(t => ({ term: t.term, definition: t.definition }));
    setResult({ rewritten, glossary });
  };

  return (
    <div className="space-y-4">
      <Textarea placeholder={t("internals.plainEnglishRewriter.placeholders.pasteAConfusingLegalClause")} value={text} onChange={(e) => setText(e.target.value)} rows={8} />
      <Button onClick={rewrite} disabled={text.trim().length < 20}>{t("internals.plainEnglishRewriter.buttons.rewriteInPlainEnglish")}</Button>
      {result && (
        <div className="space-y-3">
          <Card><CardContent className="p-4">
            <h4 className="text-sm font-semibold mb-2">Plain English Version</h4>
            <p className="text-sm whitespace-pre-wrap">{result.rewritten}</p>
          </CardContent></Card>
          {result.glossary.length > 0 && (
            <Card><CardContent className="p-4">
              <h4 className="text-sm font-semibold mb-2">Legal Terms Found</h4>
              <ul className="space-y-2">{result.glossary.map(g => <li key={g.term} className="text-sm"><strong>{g.term}:</strong> {g.definition}</li>)}</ul>
            </CardContent></Card>
          )}
        </div>
      )}
    </div>
  );
}
