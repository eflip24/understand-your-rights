import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const questions = [
  { id: 1, category: "Behavioral Control", question: "Does the company control when, where, and how the worker performs tasks?", employeeWeight: 2 },
  { id: 2, category: "Behavioral Control", question: "Does the company provide training on how to do the job?", employeeWeight: 2 },
  { id: 3, category: "Behavioral Control", question: "Is the worker required to follow a set schedule?", employeeWeight: 1.5 },
  { id: 4, category: "Financial Control", question: "Does the company provide the tools and equipment needed?", employeeWeight: 1.5 },
  { id: 5, category: "Financial Control", question: "Is the worker paid a regular salary or hourly wage (vs. per project)?", employeeWeight: 2 },
  { id: 6, category: "Financial Control", question: "Does the company reimburse the worker's business expenses?", employeeWeight: 1 },
  { id: 7, category: "Financial Control", question: "Can the worker realize a profit or loss on the work?", employeeWeight: -2 },
  { id: 8, category: "Relationship", question: "Are there employee benefits (insurance, vacation, pension)?", employeeWeight: 2 },
  { id: 9, category: "Relationship", question: "Is the relationship expected to be permanent or indefinite?", employeeWeight: 1.5 },
  { id: 10, category: "Relationship", question: "Is the work performed a key aspect of the company's regular business?", employeeWeight: 1.5 },
];

export default function ContractorVsEmployeeChecker() {
  const [answers, setAnswers] = useState<Record<number, "yes" | "no">>({});
  const [result, setResult] = useState<null | { score: number; classification: string; factors: { category: string; label: string; direction: string }[] }>(null);

  const analyze = () => {
    if (Object.keys(answers).length < questions.length) return;
    let score = 0;
    const factors: { category: string; label: string; direction: string }[] = [];
    questions.forEach(q => {
      const answer = answers[q.id];
      const isEmployee = (answer === "yes" && q.employeeWeight > 0) || (answer === "no" && q.employeeWeight < 0);
      if (isEmployee) {
        score += Math.abs(q.employeeWeight);
        factors.push({ category: q.category, label: q.question, direction: "Employee" });
      } else {
        factors.push({ category: q.category, label: q.question, direction: "Contractor" });
      }
    });
    const maxScore = questions.reduce((s, q) => s + Math.abs(q.employeeWeight), 0);
    const pct = (score / maxScore) * 100;
    const classification = pct >= 65 ? "Likely Employee (W-2)" : pct >= 35 ? "Uncertain — Could Be Either" : "Likely Independent Contractor (1099)";
    setResult({ score: pct, classification, factors });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="p-4 border rounded-lg">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{q.category}</p>
            <p className="font-medium text-sm mb-3">{q.id}. {q.question}</p>
            <RadioGroup value={answers[q.id] || ""} onValueChange={(v) => setAnswers(prev => ({ ...prev, [q.id]: v as "yes" | "no" }))}>
              <div className="flex gap-6">
                <div className="flex items-center gap-2"><RadioGroupItem value="yes" id={`q${q.id}-yes`} /><Label htmlFor={`q${q.id}-yes`}>Yes</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="no" id={`q${q.id}-no`} /><Label htmlFor={`q${q.id}-no`}>No</Label></div>
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
      <Button onClick={analyze} className="w-full" disabled={Object.keys(answers).length < questions.length}>
        Analyze Classification ({Object.keys(answers).length}/{questions.length} answered)
      </Button>
      {result && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className={`p-4 rounded-lg text-center ${result.score >= 65 ? "bg-accent/10 border border-accent" : result.score >= 35 ? "bg-amber-500/10 border border-amber-500" : "bg-primary/10 border border-primary"}`}>
              <p className="text-2xl font-bold">{result.classification}</p>
              <p className="text-sm text-muted-foreground mt-1">Employee indicators: {result.score.toFixed(0)}%</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Factor Analysis</h4>
              {result.factors.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                  <span className="truncate flex-1">{f.label.substring(0, 60)}...</span>
                  <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded ${f.direction === "Employee" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"}`}>{f.direction}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">This analysis is based on IRS guidelines. Consult a tax professional for definitive classification.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
