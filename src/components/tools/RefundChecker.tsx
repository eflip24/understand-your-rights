import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const questions = [
  { id: "type", label: "What did you purchase?", options: ["Physical product", "Digital product", "Service", "Subscription"] },
  { id: "when", label: "When did you buy it?", options: ["Less than 14 days ago", "14-30 days ago", "30-90 days ago", "More than 90 days ago"] },
  { id: "issue", label: "What's the issue?", options: ["Defective/broken", "Not as described", "Changed my mind", "Never received"] },
  { id: "used", label: "Has it been used?", options: ["No, unopened", "Slightly used", "Heavily used", "N/A (service/digital)"] },
];

function getEligibility(answers: Record<string, string>) {
  let score = 0;
  if (answers.when === "Less than 14 days ago") score += 3;
  else if (answers.when === "14-30 days ago") score += 2;
  else if (answers.when === "30-90 days ago") score += 1;
  if (answers.issue === "Defective/broken" || answers.issue === "Never received") score += 3;
  else if (answers.issue === "Not as described") score += 2;
  else score += 1;
  if (answers.used === "No, unopened") score += 2;
  else if (answers.used === "Slightly used") score += 1;
  if (score >= 7) return { level: "Likely Eligible", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", advice: "Based on your answers, you likely qualify for a refund. Contact the seller and reference your consumer rights." };
  if (score >= 4) return { level: "Possibly Eligible", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", advice: "You may be eligible depending on the seller's return policy and your local consumer protection laws." };
  return { level: "Unlikely", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", advice: "Based on your answers, a refund may be difficult. Check the seller's policy or consult consumer protection services." };
}

export default function RefundChecker() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ level: string; color: string; advice: string } | null>(null);

  const allAnswered = questions.every((q) => answers[q.id]);

  const check = () => {
    setResult(getEligibility(answers));
  };

  return (
    <div className="space-y-5">
      {questions.map((q) => (
        <div key={q.id} className="space-y-2">
          <Label>{q.label}</Label>
          <Select value={answers[q.id] || ""} onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {q.options.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button onClick={check} disabled={!allAnswered} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Check Eligibility
      </Button>
      {result && (
        <div className="p-6 rounded-lg bg-secondary text-center space-y-2">
          <Badge className={result.color}>{result.level}</Badge>
          <p className="text-sm text-muted-foreground">{result.advice}</p>
        </div>
      )}
    </div>
  );
}
