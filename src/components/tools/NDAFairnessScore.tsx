import { useState } from "react";
import { Button } from "@/components/ui/button";
import SaveAnalysisButton from "@/components/SaveAnalysisButton";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Scale } from "lucide-react";
import { useContractAnalysis } from "@/hooks/useContractAnalysis";

interface NDAResult {
  score: number;
  summary: string;
  strengths: string[];
  concerns: string[];
  recommendations: string[];
}

export default function NDAFairnessScore() {
  const [text, setText] = useState("");
  const { result, isLoading, analyze } = useContractAnalysis<NDAResult>("nda-fairness");

  const handleAnalyze = () => {
    if (text.trim().length < 50) return;
    analyze({ text });
  };

  const scoreColor = result ? (result.score >= 70 ? "text-green-600" : result.score >= 40 ? "text-accent" : "text-destructive") : "";

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Paste your NDA text</label>
        <Textarea
          placeholder="Paste the full NDA document..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      <Button onClick={handleAnalyze} disabled={isLoading || text.trim().length < 50} className="w-full gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scale className="h-4 w-4" />}
        {isLoading ? "Analyzing NDA..." : "Score NDA Fairness"}
      </Button>

      {result && (
        <div className="space-y-4">
          <Card className="border-accent/30">
            <CardContent className="p-6 text-center">
              <div className={`text-5xl font-bold mb-2 ${scoreColor}`}>{result.score}/100</div>
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </CardContent>
          </Card>

          {result.strengths.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2 text-green-600">✓ Strengths</h4>
                <ul className="space-y-1">
                  {result.strengths.map((s, i) => <li key={i} className="text-sm text-muted-foreground">• {s}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.concerns.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2 text-destructive">⚠ Concerns</h4>
                <ul className="space-y-1">
                  {result.concerns.map((c, i) => <li key={i} className="text-sm text-muted-foreground">• {c}</li>)}
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

          <SaveAnalysisButton
            toolSlug="nda-fairness-score"
            toolName="NDA Fairness Score"
            inputData={{ text }}
            resultData={result as unknown as Record<string, unknown>}
          />
        </div>
      )}
    </div>
  );
}
