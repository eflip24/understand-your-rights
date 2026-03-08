import { useState } from "react";
import { Button } from "@/components/ui/button";
import SaveAnalysisButton from "@/components/SaveAnalysisButton";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Loader2 } from "lucide-react";
import { useContractAnalysis } from "@/hooks/useContractAnalysis";

interface Finding {
  clause: string;
  severity: "high" | "medium" | "low";
  issue: string;
  recommendation: string;
}

interface RedFlagResult {
  summary: string;
  riskLevel: string;
  findings: Finding[];
}

const severityColors: Record<string, string> = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-accent text-accent-foreground",
  low: "bg-secondary text-secondary-foreground",
};

export default function ContractRedFlagScanner() {
  const [text, setText] = useState("");
  const { result, isLoading, analyze } = useContractAnalysis<RedFlagResult>("red-flag-scanner");

  const handleAnalyze = () => {
    if (text.trim().length < 50) return;
    analyze({ text });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Paste your contract text</label>
        <Textarea
          placeholder="Paste the full contract or specific sections you want analyzed..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
        <p className="text-xs text-muted-foreground mt-1">Minimum 50 characters required</p>
      </div>

      <Button onClick={handleAnalyze} disabled={isLoading || text.trim().length < 50} className="w-full gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
        {isLoading ? "Analyzing Contract..." : "Scan for Red Flags"}
      </Button>

      {result && (
        <div className="space-y-4">
          <Card className="border-accent/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                <span className="font-semibold">Overall Risk: </span>
                <Badge className={severityColors[result.riskLevel] || "bg-secondary"}>{result.riskLevel}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </CardContent>
          </Card>

          {result.findings.map((finding, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-sm">{finding.issue}</h4>
                  <Badge className={severityColors[finding.severity]}>{finding.severity}</Badge>
                </div>
                <blockquote className="border-l-2 border-muted pl-3 text-sm text-muted-foreground italic mb-2">
                  "{finding.clause}"
                </blockquote>
                <p className="text-sm"><span className="font-medium">Recommendation:</span> {finding.recommendation}</p>
              </CardContent>
            </Card>
          ))}

          <SaveAnalysisButton
            toolSlug="contract-red-flag-scanner"
            toolName="Contract Red Flag Scanner"
            inputData={{ text }}
            resultData={result as unknown as Record<string, unknown>}
          />
        </div>
      )}
    </div>
  );
}
