import {
  LayoutGrid,
  Briefcase,
  Receipt,
  Building2,
  Home,
  User,
  type LucideIcon,
} from "lucide-react";
import { categoryLabels, type FormCategory } from "@/data/forms";
import { cn } from "@/lib/utils";

type CatKey = FormCategory | "all";

const ICONS: Record<CatKey, LucideIcon> = {
  all: LayoutGrid,
  employment: Briefcase,
  tax: Receipt,
  business: Building2,
  realestate: Home,
  personal: User,
};

const ORDER: CatKey[] = ["all", "employment", "tax", "business", "realestate", "personal"];

interface Props {
  active: CatKey;
  onChange: (c: CatKey) => void;
  counts: Record<CatKey, number>;
}

export default function FormsCategoryTabs({ active, onChange, counts }: Props) {
  return (
    <div className="sticky top-16 z-20 -mx-4 mb-6 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div
        role="tablist"
        aria-label="Filter forms by category"
        className="flex flex-nowrap gap-2 overflow-x-auto pb-1"
      >
        {ORDER.map((c) => {
          const Icon = ICONS[c];
          const isActive = active === c;
          const label = c === "all" ? "All" : categoryLabels[c];
          return (
            <button
              key={c}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(c)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                isActive
                  ? "border-accent bg-accent text-accent-foreground shadow-sm"
                  : "border-border bg-background text-foreground/75 hover:border-accent/40 hover:text-accent",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                  isActive ? "bg-background/25 text-accent-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {counts[c] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
