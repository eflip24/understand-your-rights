import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  progressPct: number;
  step: number;
  totalSteps: number;
  isLast: boolean;
  onNext: () => void;
  /** When true, hide the sticky bar (e.g. on the download screen once complete). */
  hidden?: boolean;
}

/**
 * Mobile-only sticky action bar for the form wizard.
 * Surfaces the primary "Next" CTA + micro progress on scroll so users on phones
 * never lose the conversion point. Hidden on md+ where the inline buttons are visible.
 */
export default function StickyMobileCta({
  progressPct,
  step,
  totalSteps,
  isLast,
  onNext,
  hidden = false,
}: Props) {
  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 py-3 shadow-[0_-6px_20px_-8px_rgba(0,0,0,0.15)] backdrop-blur md:hidden"
      role="region"
      aria-label="Form actions"
    >
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>
              Step {step + 1} / {totalSteps}
            </span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        {isLast ? (
          <Button size="sm" disabled className="gap-1.5 bg-accent/60 text-accent-foreground">
            <Check className="h-4 w-4" /> Ready
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={onNext}
            className="gap-1 bg-accent text-accent-foreground hover:bg-gold-dark"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
