import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Clock, ExternalLink, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stateData } from "@/data/locations/stateData";
import {
  quizQuestions,
  QuizAnswers,
  RecommendedTool,
  getRecommendations,
  getRelatedRecommendations,
} from "./quizData";
import { Tool } from "@/data/tools";

interface Props {
  mode?: "inline" | "modal";
}

const defaultAnswers: QuizAnswers = {
  situation: "",
  state: "",
  urgency: "",
  hasDocuments: "",
  goal: "",
  freeText: "",
};

export default function LegalHealthCheckQuiz({ mode = "inline" }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({ ...defaultAnswers });
  const [results, setResults] = useState<RecommendedTool[] | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);

  const totalSteps = quizQuestions.length;
  const currentQ = quizQuestions[step];
  const isLastStep = step === totalSteps - 1;
  const progressPct = results ? 100 : ((step + 1) / totalSteps) * 100;

  const currentValue = answers[currentQ?.id as keyof QuizAnswers] || "";

  const setAnswer = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    },
    [currentQ?.id]
  );

  const canProceed =
    currentQ?.optional || currentQ?.type === "text" || currentValue !== "";

  const handleNext = useCallback(() => {
    if (isLastStep) {
      const recs = getRecommendations(answers);
      const related = getRelatedRecommendations(
        recs.map((r) => r.id),
        answers
      );
      setResults(recs);
      setRelatedTools(related);
      try {
        localStorage.setItem("legalHealthCheckResults", JSON.stringify({ answers, timestamp: Date.now() }));
      } catch {}
    } else {
      setStep((s) => s + 1);
    }
  }, [isLastStep, answers, step]);

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleRetake = () => {
    setStep(0);
    setAnswers({ ...defaultAnswers });
    setResults(null);
    setRelatedTools([]);
  };

  const selectedState = stateData.find((s) => s.slug === answers.state);

  // Results screen
  if (results) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-2">
          <Progress value={100} className="h-1.5" />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Results Ready
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Here's what we recommend for you
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Based on your answers
            {selectedState ? ` in ${selectedState.name}` : ""}
            {answers.situation !== "other"
              ? `, it looks like you're dealing with a ${answers.situation.replace("accident", "car accident / insurance")} situation.`
              : "."}
            {" "}Here are the most helpful free tools:
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {results.map((tool, i) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.category}/${tool.slug}`}
              className="block"
            >
              <Card className="hover:shadow-md hover:border-accent/30 transition-all group">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 text-accent font-bold text-sm shrink-0 group-hover:bg-accent/20 transition-colors">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1.5">
                      {tool.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 text-accent/80">
                        <Sparkles className="h-3 w-3" />
                        {tool.whyRecommended}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tool.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-accent transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {relatedTools.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">
              Related Tools You Might Like
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.category}/${tool.slug}`}
                >
                  <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-1">{tool.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {tool.shortDescription}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={handleRetake} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Retake Quiz
          </Button>
          <Link to="/tools">
            <Button variant="outline" className="gap-2">
              <List className="h-4 w-4" /> Browse All Tools
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Powered by LegallySpoken's 100+ free tools • Always free • Not legal
          advice — consult a professional if needed.
        </p>
      </div>
    );
  }

  // Quiz stepper
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span className="font-medium">Legal Health Check</span>
        <span>
          Question {step + 1} of {totalSteps}
        </span>
      </div>
      <Progress value={progressPct} className="h-1.5 mb-8" />

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        {currentQ.question}
      </h2>

      {/* Options */}
      <div className="mb-8">
        {currentQ.type === "cards" && currentQ.options && (
          <div className="grid gap-3 sm:grid-cols-2">
            {currentQ.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAnswer(opt.value)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all min-h-[56px] ${
                  currentValue === opt.value
                    ? "border-accent bg-accent/10 shadow-sm"
                    : "border-border hover:border-accent/40 hover:bg-accent/5"
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <span className="font-medium text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {currentQ.type === "dropdown" && (
          <Select value={currentValue} onValueChange={setAnswer}>
            <SelectTrigger className="w-full max-w-sm mx-auto">
              <SelectValue placeholder="Select your state..." />
            </SelectTrigger>
            <SelectContent>
              {stateData.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {currentQ.type === "text" && (
          <div className="max-w-md mx-auto">
            <Textarea
              placeholder="Optional — share any details that might help us recommend better tools..."
              value={currentValue}
              onChange={(e) => setAnswer(e.target.value)}
              rows={3}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 0}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="gap-1"
        >
          {isLastStep ? "See Results" : "Next"}{" "}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-6">
        This is a general recommendation tool only. It is not legal advice.
      </p>
    </div>
  );
}
