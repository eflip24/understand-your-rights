import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const questions = [
  { id: "notice", label: "Were you given a reason for termination?", options: ["Yes, a clear reason", "Vague or unclear reason", "No reason given", "I was told it was a layoff"] },
  { id: "timing", label: "When were you terminated relative to any complaints or protected activities?", options: ["No recent complaints/activities", "Within 1 month of a complaint", "Within 3 months", "Right after filing a complaint"] },
  { id: "contract", label: "Did you have a written employment contract?", options: ["Yes, with specific terms", "Yes, at-will", "No written contract", "I had an offer letter only"] },
  { id: "discrimination", label: "Do you believe the termination was based on a protected characteristic?", options: ["No", "Possibly (age, race, gender, disability, religion, etc.)", "Yes, with evidence", "I was replaced by someone in a different protected group"] },
  { id: "retaliation", label: "Did you recently engage in any protected activity?", options: ["No", "Filed a complaint internally", "Filed a government complaint (EEOC, OSHA, etc.)", "Reported illegal activity (whistleblowing)"] },
  { id: "documentation", label: "Were you on a performance improvement plan (PIP)?", options: ["No, never had performance issues", "Yes, and I completed it successfully", "Yes, and I was terminated during/after it", "I had verbal warnings only"] },
];

function assess(answers: Record<string, string>) {
  let flags: string[] = [];
  let score = 0;

  if (answers.notice === "No reason given") { flags.push("No reason given for termination — may indicate pretext"); score += 2; }
  if (answers.notice === "Vague or unclear reason") { flags.push("Vague termination reason could indicate pretext"); score += 1; }
  if (answers.timing === "Right after filing a complaint") { flags.push("Timing strongly suggests possible retaliation"); score += 3; }
  if (answers.timing === "Within 1 month of a complaint") { flags.push("Close timing to complaint raises retaliation concerns"); score += 2; }
  if (answers.timing === "Within 3 months") { flags.push("Proximity to complaint may be relevant"); score += 1; }
  if (answers.discrimination === "Yes, with evidence") { flags.push("Evidence of discrimination strengthens potential claim"); score += 3; }
  if (answers.discrimination === "Possibly (age, race, gender, disability, religion, etc.)") { flags.push("Possible discrimination — document any supporting evidence"); score += 1; }
  if (answers.discrimination === "I was replaced by someone in a different protected group") { flags.push("Replacement by someone in a different group may support discrimination claim"); score += 2; }
  if (answers.retaliation === "Reported illegal activity (whistleblowing)") { flags.push("Whistleblower protections may apply"); score += 3; }
  if (answers.retaliation === "Filed a government complaint (EEOC, OSHA, etc.)") { flags.push("Government complaints trigger anti-retaliation protections"); score += 2; }
  if (answers.contract === "Yes, with specific terms") { flags.push("Review contract for breach — specific terms may limit termination rights"); score += 1; }
  if (answers.documentation === "No, never had performance issues") { flags.push("Lack of prior performance issues undermines performance-based termination"); score += 1; }
  if (answers.documentation === "Yes, and I completed it successfully") { flags.push("Successful PIP completion undermines performance-based termination"); score += 2; }

  let level: string, advice: string;
  if (score >= 7) {
    level = "Strong Indicators";
    advice = "Multiple factors suggest this may be wrongful termination. Consult an employment lawyer promptly. Document everything and preserve any relevant communications.";
  } else if (score >= 4) {
    level = "Some Concerns";
    advice = "There are some indicators worth investigating. Consider scheduling a consultation with an employment lawyer to evaluate your specific situation.";
  } else {
    level = "Fewer Indicators";
    advice = "Based on your answers, there are fewer typical wrongful termination indicators, but every situation is unique. If you feel something was wrong, a brief consultation with an employment lawyer can provide clarity.";
  }

  return { level, advice, flags, score };
}

export default function WrongfulTerminationChecklist() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReturnType<typeof assess> | null>(null);

  const allAnswered = questions.every((q) => answers[q.id]);

  return (
    <div className="space-y-5">
      {questions.map((q) => (
        <div key={q.id} className="space-y-2">
          <Label>{q.label}</Label>
          <Select value={answers[q.id] || ""} onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {q.options.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button onClick={() => setResult(assess(answers))} disabled={!allAnswered} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Assess Situation
      </Button>
      {result && (
        <div className="space-y-3 pt-2">
          <div className="p-6 rounded-lg bg-secondary text-center space-y-2">
            <Badge variant={result.score >= 7 ? "destructive" : result.score >= 4 ? "outline" : "default"}>
              {result.level}
            </Badge>
            <p className="text-sm text-muted-foreground">{result.advice}</p>
          </div>
          {result.flags.length > 0 && (
            <div className="space-y-2">
              <p className="font-medium text-sm">Identified Concerns:</p>
              {result.flags.map((flag, i) => (
                <div key={i} className="p-2 rounded bg-yellow-50 border border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">⚠️ {flag}</p>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">⚠️ This tool provides general information, not legal advice. Always consult a qualified employment attorney.</p>
        </div>
      )}
    </div>
  );
}
