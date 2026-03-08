import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const questions = [
  {
    question: "A store has a 'No Returns' sign posted. Can they refuse your return of a defective product?",
    options: ["Yes, the sign is legally binding", "No, defective products must be accepted", "It depends on the state", "Only if the sign was visible before purchase"],
    correct: 1,
    explanation: "Under most consumer protection laws, a 'No Returns' sign does not override your right to return defective merchandise. Products must be fit for their intended purpose.",
  },
  {
    question: "How long do you typically have to cancel an online purchase in the EU?",
    options: ["7 days", "14 days", "30 days", "24 hours"],
    correct: 1,
    explanation: "Under EU Consumer Rights Directive, you have 14 days to withdraw from an online purchase without giving any reason.",
  },
  {
    question: "A company changes their terms of service. Are you automatically bound by the new terms?",
    options: ["Yes, always", "No, never", "Only if you were notified and continued using the service", "Only if you explicitly agreed"],
    correct: 2,
    explanation: "Generally, continued use of a service after being notified of changes can constitute acceptance, but material changes may require explicit consent.",
  },
  {
    question: "You bought a TV and it breaks after 3 months. The warranty was only 30 days. Do you have any recourse?",
    options: ["No, the warranty expired", "Yes, implied warranty of merchantability may apply", "Only if you bought an extended warranty", "Only for items over $500"],
    correct: 1,
    explanation: "The implied warranty of merchantability means products should work for a reasonable period. A TV breaking after 3 months may not meet this standard regardless of express warranty.",
  },
  {
    question: "Can a company charge your credit card for a subscription renewal without notice?",
    options: ["Yes, if you agreed to auto-renewal", "No, they must always notify you first", "It depends on state law", "Only for amounts under $50"],
    correct: 2,
    explanation: "Many states have auto-renewal laws requiring companies to provide clear notice before charging. Federal and state regulations vary significantly.",
  },
  {
    question: "You receive a product you never ordered. Are you required to pay for it or return it?",
    options: ["Yes, you must return it", "No, unordered merchandise is legally yours to keep", "You must return it but they must pay shipping", "Only if the value is under $100"],
    correct: 1,
    explanation: "Under the FTC's rule on unordered merchandise, items you receive but didn't order are considered a gift and you have no obligation to pay for or return them.",
  },
  {
    question: "A contractor damages your property during a renovation. Who is liable?",
    options: ["You, as the property owner", "The contractor", "Your homeowner's insurance only", "Nobody, it's an assumed risk"],
    correct: 1,
    explanation: "Contractors are generally liable for damage they cause during work. They should carry liability insurance. Document all damage and communicate in writing.",
  },
  {
    question: "Can a landlord enter your rented apartment without notice?",
    options: ["Yes, they own the property", "No, they must give reasonable notice (usually 24-48 hours)", "Only during business hours", "Only with a court order"],
    correct: 1,
    explanation: "Most states require landlords to give 24-48 hours advance notice before entering, except in genuine emergencies.",
  },
];

export default function ConsumerRightsQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore(score + 1);
  };

  const next = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center space-y-4 py-8">
        <p className="text-5xl font-bold font-serif">{score}/{questions.length}</p>
        <p className="text-lg text-muted-foreground">You scored {pct}%</p>
        <Badge variant={pct >= 70 ? "default" : pct >= 40 ? "outline" : "destructive"}>
          {pct >= 70 ? "Consumer Rights Expert" : pct >= 40 ? "Getting There" : "Keep Learning"}
        </Badge>
        <div><Button onClick={restart} className="bg-accent text-accent-foreground hover:bg-gold-dark">Take Again</Button></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
        <span className="text-sm text-muted-foreground">Score: {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>
      <h3 className="font-serif font-bold text-lg">{q.question}</h3>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={answered}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              answered
                ? i === q.correct
                  ? "bg-green-50 border-green-300 dark:bg-green-950/20 dark:border-green-700"
                  : i === selected
                    ? "bg-red-50 border-red-300 dark:bg-red-950/20 dark:border-red-700"
                    : "bg-secondary border-transparent"
                : "bg-secondary hover:bg-secondary/80 border-transparent hover:border-accent/30 cursor-pointer"
            }`}
          >
            <span className="text-sm">{opt}</span>
          </button>
        ))}
      </div>
      {answered && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-sm">{q.explanation}</p>
        </div>
      )}
      {answered && (
        <Button onClick={next} className="bg-accent text-accent-foreground hover:bg-gold-dark">
          {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
        </Button>
      )}
    </div>
  );
}
