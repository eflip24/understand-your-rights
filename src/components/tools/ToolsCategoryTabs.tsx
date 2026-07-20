import { LayoutGrid, type LucideIcon } from "lucide-react";
import { categories, type ToolCategory } from "@/data/tools";
import { cn } from "@/lib/utils";

type CatKey = ToolCategory | "all";

interface Props {
  active: CatKey;
  onChange: (c: CatKey) => void;
  counts: Record<string, number>;
  labelFor: (id: ToolCategory) => string;
}

export default function ToolsCategoryTabs({ active, onChange, counts, labelFor }: Props) {
  const items: { id: CatKey; label: string; Icon: LucideIcon }[] = [
    { id: "all", label: "All", Icon: LayoutGrid },
    ...categories.map((c) => ({ id: c.id as CatKey, label: labelFor(c.id), Icon: c.icon as LucideIcon })),
  ];

  return (
    <div className="sticky top-16 z-20 -mx-4 mb-6 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div
        role="tablist"
        aria-label="Filter tools by category"
        className="flex flex-nowrap gap-2 overflow-x-auto pb-1"
      >
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(id)}
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
                {counts[id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
