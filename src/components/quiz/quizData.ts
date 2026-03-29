import { tools, Tool } from "@/data/tools";
import { Home, Briefcase, FileText, Car, DollarSign, Building2, HelpCircle, CircleAlert, Clock, CheckCircle, ClipboardList, Hand, Scale, Calculator, Search, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  type: "cards" | "dropdown" | "text";
  options?: { value: string; label: string; icon?: LucideIcon }[];
  optional?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "situation",
    question: "What's the main situation you're dealing with right now?",
    type: "cards",
    options: [
      { value: "renting", label: "Renting or leasing", icon: Home },
      { value: "employment", label: "Employment or workplace", icon: Briefcase },
      { value: "contracts", label: "Signing or reviewing a contract", icon: FileText },
      { value: "accident", label: "Car accident, injury, or insurance", icon: Car },
      { value: "money", label: "Money, debt, or taxes", icon: DollarSign },
      { value: "business", label: "Starting or running a business", icon: Building2 },
      { value: "other", label: "Something else", icon: HelpCircle },
    ],
  },
  {
    id: "state",
    question: "Where are you located?",
    type: "dropdown",
  },
  {
    id: "urgency",
    question: "How urgent is this?",
    type: "cards",
    options: [
      { value: "urgent", label: "I need help right away", icon: CircleAlert },
      { value: "important", label: "Important but not urgent", icon: Clock },
      { value: "planning", label: "Just planning ahead", icon: CheckCircle },
    ],
  },
  {
    id: "hasDocuments",
    question: "Do you have any documents related to this?",
    type: "cards",
    options: [
      { value: "yes", label: "Yes (contract, lease, letter, etc.)", icon: ClipboardList },
      { value: "no", label: "No, not yet", icon: Hand },
    ],
  },
  {
    id: "goal",
    question: "What's your main goal?",
    type: "cards",
    options: [
      { value: "rights", label: "Understand my rights", icon: Scale },
      { value: "calculate", label: "Calculate something specific", icon: Calculator },
      { value: "risk", label: "Check if something looks risky", icon: Search },
      { value: "guidance", label: "Get next-step guidance", icon: Compass },
    ],
  },
  {
    id: "freeText",
    question: "Anything else we should know?",
    type: "text",
    optional: true,
  },
];

const situationMap: Record<string, string[]> = {
  renting: [
    "rent-increase", "security-deposit", "lease-analyzer", "moveout-checklist",
    "rental-agreement", "lease-comparison", "late-fee", "green-lease",
  ],
  employment: [
    "overtime-calc", "severance-pay", "wrongful-termination", "pto-calculator",
    "salary-converter", "minimum-wage", "employment-checklist", "non-compete",
    "freelance-rate", "contractor-vs-employee",
  ],
  contracts: [
    "red-flag-scanner", "clause-finder", "terms-summarizer", "contract-comparison",
    "clause-explainer", "reading-time", "word-counter", "jargon-translator",
    "contract-checklist", "nda-fairness", "contract-value", "amendment-drafter",
  ],
  accident: [
    "settlement-estimator", "accident-damage", "insurance-premium",
    "insurance-quote-comparison", "attorney-fee", "statute-of-limitations",
    "auto-loan",
  ],
  money: [
    "debt-payoff", "income-tax", "compound-interest", "crypto-tax",
    "loan-payment", "net-worth", "paycheck-calc", "invoice-interest",
    "auto-loan",
  ],
  business: [
    "business-name", "freelance-rate", "partnership-split", "equity-dilution",
    "business-expense", "contractor-vs-employee", "vesting-schedule",
    "stock-option-tax", "profit-loss", "breakeven-calc",
  ],
  other: [
    "settlement-estimator", "red-flag-scanner", "debt-payoff",
    "income-tax", "overtime-calc", "rent-increase",
  ],
};

const goalBoost: Record<string, string[]> = {
  rights: [
    "statute-of-limitations", "small-claims-limit", "consumer-rights-quiz",
    "minimum-wage", "wrongful-termination",
  ],
  calculate: [
    "late-fee", "overtime-calc", "compound-interest", "income-tax",
    "settlement-estimator", "rent-increase", "debt-payoff",
  ],
  risk: [
    "red-flag-scanner", "nda-fairness", "lease-analyzer", "non-compete",
    "contract-comparison", "clause-finder",
  ],
  guidance: [
    "contract-checklist", "employment-checklist", "moveout-checklist",
    "dispute-letter", "complaint-generator",
  ],
};

const documentBoostIds = [
  "red-flag-scanner", "contract-comparison", "clause-finder",
  "lease-analyzer", "terms-summarizer", "clause-explainer", "nda-fairness",
];

export interface QuizAnswers {
  situation: string;
  state: string;
  urgency: string;
  hasDocuments: string;
  goal: string;
  freeText: string;
}

export interface RecommendedTool extends Tool {
  whyRecommended: string;
  estimatedTime: string;
}

export function getRecommendations(answers: QuizAnswers): RecommendedTool[] {
  const situationTools = situationMap[answers.situation] || situationMap.other;
  const goalTools = goalBoost[answers.goal] || [];
  const hasDoc = answers.hasDocuments === "yes";

  // Score each tool
  const scoreMap = new Map<string, number>();

  situationTools.forEach((id, i) => {
    scoreMap.set(id, (scoreMap.get(id) || 0) + (situationTools.length - i));
  });

  goalTools.forEach((id) => {
    scoreMap.set(id, (scoreMap.get(id) || 0) + 3);
  });

  if (hasDoc) {
    documentBoostIds.forEach((id) => {
      scoreMap.set(id, (scoreMap.get(id) || 0) + 4);
    });
  }

  // Boost popular tools slightly
  tools.filter((t) => t.popular).forEach((t) => {
    if (scoreMap.has(t.id)) {
      scoreMap.set(t.id, (scoreMap.get(t.id) || 0) + 1);
    }
  });

  // Sort by score, pick top 6
  const sorted = [...scoreMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const timeEstimates: Record<string, string> = {
    risk: "~2 min",
    calculate: "~30 sec",
    rights: "~1 min",
    guidance: "~2 min",
  };
  const defaultTime = "~1 min";

  return sorted
    .map(([id]) => {
      const tool = tools.find((t) => t.id === id);
      if (!tool) return null;

      let why = "";
      if (situationTools.includes(id) && goalTools.includes(id)) {
        why = "Matches your situation and goal perfectly.";
      } else if (hasDoc && documentBoostIds.includes(id)) {
        why = "Great for analyzing the documents you have.";
      } else if (goalTools.includes(id)) {
        why = "Directly supports your stated goal.";
      } else {
        why = "Commonly used for your type of situation.";
      }

      return {
        ...tool,
        whyRecommended: why,
        estimatedTime: timeEstimates[answers.goal] || defaultTime,
      } as RecommendedTool;
    })
    .filter(Boolean) as RecommendedTool[];
}

export function getRelatedRecommendations(
  mainIds: string[],
  answers: QuizAnswers
): Tool[] {
  const mainSet = new Set(mainIds);
  const allCategories = new Set(
    mainIds.map((id) => tools.find((t) => t.id === id)?.category).filter(Boolean)
  );

  return tools
    .filter((t) => !mainSet.has(t.id) && !allCategories.has(t.category) && t.popular)
    .slice(0, 3);
}
