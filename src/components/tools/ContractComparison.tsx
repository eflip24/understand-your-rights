import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, GitCompare } from "lucide-react";
import { useContractAnalysis } from "@/hooks/useContractAnalysis";

interface Difference {
  topic: string;
  contractA: string;
  contractB: string;
  implication: string;
}

interface ComparisonResult {
  summary: string;
  differences: Difference[];
  recommendation: string;
}

export default function ContractComparison() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const { result, isLoading, analyze } = useContractAnalysis<ComparisonResult>("contract-comparison");

  const handleAnalyze = () => {
    if (textA.trim().length < 50 || textB.trim().length < 50) return;
    analyze({ textA, textB });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium mb-2 block">Contract A</label>
          <Textarea
            placeholder="Paste the first contract..."
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            className="min-h-[180px]"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Contract B</label>
          <Textarea
            placeholder="Paste the second contract..."
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            className="min-h-[180px]"
          />
        </div>
      </div>

      <Button onClick={handleAnalyze} disabled={isLoading || textA.trim().length < 50 || textB.trim().length < 50} className="w-full gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GitCompare className="h-4 w-4" />}
        {isLoading ? "Comparing..." : "Compare Contracts"}
      </Button>

      {result && (
        <div className="space-y-4">
          <Card className="border-accent/30">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </CardContent>
          </Card>

          {result.differences.map((diff, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-3">{diff.topic}</h4>
                <div className="grid gap-2 md:grid-cols-2 mb-2">
                  <div className="text-sm bg-secondary/50 p-2 rounded">
                    <span className="font-medium text-xs text-muted-foreground block mb-1">Contract A</span>
                    {diff.contractA}
                  </div>
                  <div className="text-sm bg-secondary/50 p-2 rounded">
                    <span className="font-medium text-xs text-muted-foreground block mb-1">Contract B</span>
                    {diff.contractB}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground"><span className="font-medium">Implication:</span> {diff.implication}</p>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-1">Overall Recommendation</h4>
              <p className="text-sm text-muted-foreground">{result.recommendation}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
