import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Home } from "lucide-react";
import { useContractAnalysis } from "@/hooks/useContractAnalysis";

interface LeaseResult {
  summary: string;
  keyTerms: { label: string; value: string }[];
  risks: string[];
  recommendations: string[];
}

export default function LeaseAnalyzer() {
  const [text, setText] = useState("");
  const { result, isLoading, analyze } = useContractAnalysis<LeaseResult>("lease-analyzer");

  const handleAnalyze = () => {
    if (text.trim().length < 50) return;
    analyze({ text });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Paste your lease agreement</label>
        <Textarea
          placeholder="Paste the full lease agreement text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      <Button onClick={handleAnalyze} disabled={isLoading || text.trim().length < 50} className="w-full gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Home className="h-4 w-4" />}
        {isLoading ? "Analyzing Lease..." : "Analyze Lease"}
      </Button>

      {result && (
        <div className="space-y-4">
          <Card className="border-accent/30">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </CardContent>
          </Card>

          {result.keyTerms.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-3">Key Terms</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {result.keyTerms.map((term, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-muted pb-1">
                      <span className="font-medium">{term.label}</span>
                      <span className="text-muted-foreground">{term.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {result.risks.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2 text-destructive">⚠ Risks</h4>
                <ul className="space-y-1">
                  {result.risks.map((r, i) => <li key={i} className="text-sm text-muted-foreground">• {r}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.recommendations.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {result.recommendations.map((r, i) => <li key={i} className="text-sm text-muted-foreground">• {r}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
