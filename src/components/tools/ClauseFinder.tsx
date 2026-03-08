import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const clauseTypes = [
  { name: "Indemnification", keywords: ["indemnif", "hold harmless", "indemnity"] },
  { name: "Termination", keywords: ["terminat", "cancel", "end of agreement", "expir"] },
  { name: "Non-Compete", keywords: ["non-compete", "noncompete", "not compete", "competitive activit"] },
  { name: "Confidentiality", keywords: ["confidential", "non-disclosure", "nondisclosure", "proprietary information", "trade secret"] },
  { name: "Liability", keywords: ["liabilit", "liable", "limitation of liability", "damages"] },
  { name: "Force Majeure", keywords: ["force majeure", "act of god", "beyond control", "unforeseeable"] },
  { name: "Governing Law", keywords: ["governing law", "governed by", "jurisdiction", "venue"] },
  { name: "Severability", keywords: ["severab", "invalid provision", "unenforceable"] },
  { name: "Entire Agreement", keywords: ["entire agreement", "whole agreement", "supersedes"] },
  { name: "Assignment", keywords: ["assign", "transfer of rights", "delegation"] },
  { name: "Warranty", keywords: ["warrant", "guarant", "representation"] },
  { name: "Payment Terms", keywords: ["payment", "invoice", "due date", "compensation", "fee"] },
  { name: "Intellectual Property", keywords: ["intellectual property", "copyright", "patent", "trademark", "ownership of work"] },
  { name: "Dispute Resolution", keywords: ["dispute", "arbitrat", "mediat", "resolution"] },
  { name: "Amendment", keywords: ["amend", "modif", "written consent"] },
];

export default function ClauseFinder() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<{ name: string; found: boolean; snippets: string[] }[]>([]);

  const analyze = () => {
    const lower = text.toLowerCase();
    const found = clauseTypes.map((ct) => {
      const snippets: string[] = [];
      ct.keywords.forEach((kw) => {
        const idx = lower.indexOf(kw);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(text.length, idx + kw.length + 60);
          snippets.push("..." + text.slice(start, end).trim() + "...");
        }
      });
      return { name: ct.name, found: snippets.length > 0, snippets: snippets.slice(0, 1) };
    });
    setResults(found);
  };

  const foundCount = results.filter((r) => r.found).length;

  return (
    <div className="space-y-4">
      <Textarea placeholder="Paste your contract text here..." value={text} onChange={(e) => setText(e.target.value)} rows={8} />
      <Button onClick={analyze} disabled={!text.trim()} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Find Clauses
      </Button>
      {results.length > 0 && (
        <div className="space-y-3 pt-2">
          <p className="text-sm font-medium">{foundCount} of {clauseTypes.length} clause types detected</p>
          {results.map((r) => (
            <div key={r.name} className={`p-3 rounded-lg border ${r.found ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800" : "bg-secondary"}`}>
              <div className="flex items-center gap-2">
                <Badge variant={r.found ? "default" : "secondary"}>{r.found ? "Found" : "Not Found"}</Badge>
                <span className="font-medium text-sm">{r.name}</span>
              </div>
              {r.snippets.map((s, i) => (
                <p key={i} className="text-xs text-muted-foreground mt-1 italic">{s}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
