import { useState } from "react";
import { Button } from "@/components/ui/button";
import SaveAnalysisButton from "@/components/SaveAnalysisButton";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MessageSquare } from "lucide-react";
import { useContractAnalysis } from "@/hooks/useContractAnalysis";

interface ExplainerResult {
  plainEnglish: string;
  implications: string[];
  risks: string[];
  negotiationTips: string[];
}

export default function ClauseExplainer() {
  const [text, setText] = useState("");
  const { result, isLoading, analyze } = useContractAnalysis<ExplainerResult>("clause-explainer");

  const handleAnalyze = () => {
    if (text.trim().length < 20) return;
    analyze({ text });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Paste a contract clause</label>
        <Textarea
          placeholder="Paste any clause or legal paragraph you want explained..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <Button onClick={handleAnalyze} disabled={isLoading || text.trim().length < 20} className="w-full gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
        {isLoading ? "Explaining..." : "Explain This Clause"}
      </Button>

      {result && (
        <div className="space-y-4">
          <Card className="border-accent/30">
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-2">In Plain English</h4>
              <p className="text-sm text-muted-foreground">{result.plainEnglish}</p>
            </CardContent>
          </Card>

          {result.implications.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Practical Implications</h4>
                <ul className="space-y-1">
                  {result.implications.map((item, i) => <li key={i} className="text-sm text-muted-foreground">• {item}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.risks.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2 text-destructive">⚠ Risks</h4>
                <ul className="space-y-1">
                  {result.risks.map((item, i) => <li key={i} className="text-sm text-muted-foreground">• {item}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.negotiationTips.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Negotiation Tips</h4>
                <ul className="space-y-1">
                  {result.negotiationTips.map((item, i) => <li key={i} className="text-sm text-muted-foreground">• {item}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
