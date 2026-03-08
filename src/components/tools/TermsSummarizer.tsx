import { useState } from "react";
import { Button } from "@/components/ui/button";
import SaveAnalysisButton from "@/components/SaveAnalysisButton";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText } from "lucide-react";
import { useContractAnalysis } from "@/hooks/useContractAnalysis";

interface Section {
  title: string;
  points: string[];
  concern: boolean;
}

interface SummarizerResult {
  summary: string;
  sections: Section[];
}

export default function TermsSummarizer() {
  const [text, setText] = useState("");
  const { result, isLoading, analyze } = useContractAnalysis<SummarizerResult>("terms-summarizer");

  const handleAnalyze = () => {
    if (text.trim().length < 50) return;
    analyze({ text });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Paste Terms & Conditions</label>
        <Textarea
          placeholder="Paste the terms of service, privacy policy, or any legal document..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      <Button onClick={handleAnalyze} disabled={isLoading || text.trim().length < 50} className="w-full gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        {isLoading ? "Summarizing..." : "Summarize in Plain English"}
      </Button>

      {result && (
        <div className="space-y-4">
          <Card className="border-accent/30">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </CardContent>
          </Card>

          {result.sections.map((section, i) => (
            <Card key={i} className={section.concern ? "border-destructive/30" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-sm">{section.title}</h4>
                  {section.concern && <Badge variant="destructive" className="text-xs">Concern</Badge>}
                </div>
                <ul className="space-y-1">
                  {section.points.map((p, j) => <li key={j} className="text-sm text-muted-foreground">• {p}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}

          <SaveAnalysisButton
            toolSlug="terms-summarizer"
            toolName="Terms & Conditions Summarizer"
            inputData={{ text }}
            resultData={result as unknown as Record<string, unknown>}
          />
        </div>
      )}
    </div>
  );
}
