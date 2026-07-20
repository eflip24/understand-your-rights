import {
  FileText,
  Receipt,
  Briefcase,
  Home,
  HeartHandshake,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { ToolCategory } from "@/data/tools";

const EVENTS: {
  icon: LucideIcon;
  title: string;
  desc: string;
  category: ToolCategory;
}[] = [
  { icon: FileText, title: "Signing a contract", desc: "Read faster, find clauses, translate legalese", category: "contract" },
  { icon: Receipt, title: "Fees, refunds & debts", desc: "Late fees, cancellations, refund eligibility", category: "consumer" },
  { icon: Briefcase, title: "Starting or leaving a job", desc: "Non-compete, notice period, freelance rate", category: "employment" },
  { icon: Home, title: "Renting or buying property", desc: "Lease clauses, security deposit, closing costs", category: "realestate" },
  { icon: HeartHandshake, title: "Family & divorce", desc: "Alimony, child support, custody planning", category: "family" },
  { icon: Building2, title: "Running a small business", desc: "NDAs, contractor agreements, entity setup", category: "business" },
];

interface Props {
  onSelectCategory: (c: ToolCategory) => void;
}

export default function ToolsBySituationTiles({ onSelectCategory }: Props) {
  return (
    <section aria-labelledby="tools-situation-heading" className="mt-10">
      <div className="mb-5">
        <h2 id="tools-situation-heading" className="font-serif text-2xl font-bold md:text-3xl">
          Find a tool by situation
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Not sure where to start? Pick what's happening in your life.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((e) => {
          const Icon = e.icon;
          return (
            <button
              key={e.title}
              onClick={() => onSelectCategory(e.category)}
              className="group relative flex items-start gap-4 rounded-xl border border-border bg-background/70 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
            >
              <div className="rounded-lg bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold leading-tight">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
              </div>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-all group-hover:right-3 group-hover:text-accent" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
