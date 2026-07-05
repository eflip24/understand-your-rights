import { Link } from "react-router-dom";
import { ArrowRight, Calculator, BookOpen, MapPin, Sparkles } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";

export type RecommenderTopic =
  | "personal-injury"
  | "car-accident"
  | "truck-accident"
  | "medical-malpractice"
  | "workers-compensation"
  | "employment"
  | "wage-hour"
  | "eeoc"
  | "family-law"
  | "alimony"
  | "statute-of-limitations"
  | "insurance-dispute"
  | "real-estate";

interface RecItem {
  label: string;
  path: string;
  kind: "tool" | "guide" | "directory";
  reason: string;
}

const RECS: Record<RecommenderTopic, RecItem[]> = {
  "personal-injury": [
    { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "See your net after contingency." },
    { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Don't miss the filing deadline." },
    { label: "Personal Injury Law Guide", path: "/personal-injury-law", kind: "guide", reason: "How PI cases actually work." },
    { label: "Find a Personal Injury Lawyer Near You", path: "/lawyer-near-me/personal-injury", kind: "directory", reason: "Most take these on contingency." },
  ],
  "car-accident": [
    { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Ballpark your crash claim value." },
    { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Most auto claims: 2–3 years." },
    { label: "Auto Accident Law Guide", path: "/auto-accident-law", kind: "guide", reason: "Learn PIP, UIM, and fault rules." },
    { label: "Find a Car Accident Lawyer Near You", path: "/lawyer-near-me/car-accident", kind: "directory", reason: "Free consults, no upfront fee." },
  ],
  "truck-accident": [
    { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Truck cases often break policy limits." },
    { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Model 40% contingency + case costs." },
    { label: "Find a Truck Accident Lawyer", path: "/lawyer-near-me/truck-accident", kind: "directory", reason: "You want a specialist — ECM/FMCSR." },
  ],
  "medical-malpractice": [
    { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Firms decline low-value med mal cases." },
    { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Med mal SOL is short + repose." },
    { label: "Find a Medical Malpractice Lawyer", path: "/lawyer-near-me/medical-malpractice", kind: "directory", reason: "Free case reviews." },
  ],
  "workers-compensation": [
    { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "State-capped fee — model your check." },
    { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Short notice/filing windows." },
    { label: "Employment Law Guide", path: "/employment-law", kind: "guide", reason: "Retaliation protections." },
    { label: "Find a Workers' Comp Lawyer", path: "/lawyer-near-me/workers-compensation", kind: "directory", reason: "Fees are state-capped and contingency." },
  ],
  employment: [
    { label: "EEOC Settlement Calculator", path: "/tools/employment/eeoc-settlement-calculator", kind: "tool", reason: "Estimate back pay + damages." },
    { label: "Overtime & Wage Theft Calculator", path: "/tools/business/overtime-calculator", kind: "tool", reason: "Quantify unpaid OT." },
    { label: "Employment Law Guide", path: "/employment-law", kind: "guide", reason: "Know your rights first." },
    { label: "Find an Employment Lawyer", path: "/lawyer-near-me/employment", kind: "directory", reason: "Many take these on contingency." },
  ],
  "wage-hour": [
    { label: "EEOC Settlement Calculator", path: "/tools/employment/eeoc-settlement-calculator", kind: "tool", reason: "If retaliation is also in play." },
    { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "FLSA: 2 years, 3 if willful." },
    { label: "Final Paycheck Deadline Lookup", path: "/tools/employment/final-paycheck-deadline-lookup", kind: "tool", reason: "Missed deadlines = penalties." },
    { label: "Find an Employment Lawyer", path: "/lawyer-near-me/employment", kind: "directory", reason: "Wage cases are often contingency + fee-shift." },
  ],
  eeoc: [
    { label: "Overtime & Wage Theft Calculator", path: "/tools/business/overtime-calculator", kind: "tool", reason: "Quantify wage-and-hour damages." },
    { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "EEOC: 180/300-day charge window." },
    { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Model your net after fees." },
    { label: "Find an Employment Lawyer", path: "/lawyer-near-me/employment", kind: "directory", reason: "Fee-shifting statute — usually contingency." },
  ],
  "family-law": [
    { label: "Alimony Calculator", path: "/tools/family/alimony-spousal-support-calculator", kind: "tool", reason: "Estimate support under your state formula." },
    { label: "Child Support Calculator", path: "/tools/family/child-support-calculator", kind: "tool", reason: "Guideline support estimate." },
    { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Model retainer + hourly." },
    { label: "Find a Family Law Attorney", path: "/lawyer-near-me/family-law", kind: "directory", reason: "Free/low-cost consults available." },
  ],
  alimony: [
    { label: "Child Support Calculator", path: "/tools/family/child-support-calculator", kind: "tool", reason: "Child support offsets alimony in many states." },
    { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Enforcement/modification deadlines." },
    { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Budget for a contested divorce." },
    { label: "Find a Family Law Attorney", path: "/lawyer-near-me/family-law", kind: "directory", reason: "Get a lawyer's read on the number." },
  ],
  "statute-of-limitations": [
    { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Estimate value before you file." },
    { label: "Attorney Fee Calculator", path: "/tools/consumer/attorney-fee-calculator", kind: "tool", reason: "Understand contingency vs hourly." },
    { label: "Find a Lawyer Near You", path: "/lawyer-near-me", kind: "directory", reason: "Deadlines are hard — call today." },
  ],
  "insurance-dispute": [
    { label: "Personal Injury Settlement Calculator", path: "/tools/consumer/settlement-estimator", kind: "tool", reason: "Value your underlying injury claim." },
    { label: "Statute of Limitations Lookup", path: "/tools/consumer/statute-of-limitations-lookup", kind: "tool", reason: "Bad-faith SOL is often short." },
    { label: "Insurance Law Guide", path: "/insurance-law", kind: "guide", reason: "Bad faith 101." },
    { label: "Find an Insurance Dispute Lawyer", path: "/lawyer-near-me/insurance-dispute", kind: "directory", reason: "Many take bad-faith on contingency." },
  ],
  "real-estate": [
    { label: "Security Deposit Calculator", path: "/tools/consumer/security-deposit-calculator", kind: "tool", reason: "For landlord/tenant disputes." },
    { label: "Landlord-Tenant Law Guide", path: "/landlord-tenant-law", kind: "guide", reason: "Notice and eviction rules." },
    { label: "Find a Real Estate Lawyer", path: "/lawyer-near-me/real-estate", kind: "directory", reason: "Flat-fee closings, hourly disputes." },
  ],
};

const ICONS = {
  tool: Calculator,
  guide: BookOpen,
  directory: MapPin,
} as const;

const LABELS = {
  tool: "Tool",
  guide: "Guide",
  directory: "Directory",
} as const;

interface Props {
  topic: RecommenderTopic;
  title?: string;
  className?: string;
}

/**
 * "What should I do next?" recommender.
 * Drop-in block for after tool results or on directory pages.
 */
export default function ToolRecommender({ topic, title = "What should I do next?", className = "" }: Props) {
  const items = RECS[topic];
  const lp = useLocalizedPath();
  if (!items?.length) return null;

  return (
    <div className={`mt-8 rounded-lg border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Based on your results, these next steps typically deliver the most value.
      </p>
      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = ICONS[item.kind];
          return (
            <li key={item.path}>
              <Link
                to={lp(item.path)}
                className="group flex items-start gap-3 rounded-md border bg-card/60 p-3 hover:bg-card hover:border-accent/40 transition"
              >
                <Icon className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground group-hover:text-accent">
                      {item.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {LABELS[item.kind]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.reason}</p>
                </div>
                <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
