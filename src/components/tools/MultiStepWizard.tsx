import { ReactNode, useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export interface WizardStep {
  /** Short label shown in the stepper (e.g. "Injury"). */
  label: string;
  /** Longer title rendered above the step content. */
  title: string;
  /** Optional helper copy under the title. */
  description?: string;
  /** Step body — plain JSX. */
  content: ReactNode;
  /** Optional guard — when it returns false, the "Next" button is disabled. */
  canAdvance?: () => boolean;
}

interface Props {
  steps: WizardStep[];
  /** Rendered after the user completes the last step (results view). */
  finalContent: ReactNode;
  /** Optional callback fired when the user reaches the results view. */
  onComplete?: () => void;
}

/**
 * Day 8 primitive — wraps long single-page calculators into a multi-screen
 * flow. Multi-step forms typically lift time-on-page 3–4× vs. one big form,
 * which is the entire point for AdSense contextual classification.
 *
 * Generic on purpose: state lives in the parent so any calculator can plug
 * its existing controlled inputs into the `content` slot without re-wiring.
 */
export default function MultiStepWizard({ steps, finalContent, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const total = steps.length;
  const isResults = index === total;
  const progress = useMemo(
    () => Math.round(((isResults ? total : index) / total) * 100),
    [index, total, isResults],
  );

  const goNext = useCallback(() => {
    setIndex((i) => {
      const next = Math.min(i + 1, total);
      if (next === total) onComplete?.();
      return next;
    });
  }, [total, onComplete]);
  const goBack = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  const current = steps[index];
  const canAdvance = current?.canAdvance ? current.canAdvance() : true;

  return (
    <div className="space-y-4">
      {/* Stepper */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {isResults ? "Complete" : `Step ${index + 1} of ${total}`}
            {!isResults && current ? ` — ${current.label}` : ""}
          </span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <ol className="hidden sm:flex items-center gap-1 text-[11px]">
          {steps.map((s, i) => {
            const done = i < index || isResults;
            const active = i === index && !isResults;
            return (
              <li
                key={s.label}
                className={`flex-1 flex items-center gap-1.5 px-2 py-1 rounded ${
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : done
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-current text-[10px] flex items-center justify-center">
                    {i + 1}
                  </span>
                )}
                <span className="truncate">{s.label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          {isResults ? (
            <>{finalContent}</>
          ) : (
            <>
              <div>
                <h3 className="font-serif font-bold text-xl">{current.title}</h3>
                {current.description && (
                  <p className="text-sm text-muted-foreground mt-1">{current.description}</p>
                )}
              </div>
              <div>{current.content}</div>
            </>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={goBack}
              disabled={index === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {!isResults ? (
              <Button type="button" size="sm" onClick={goNext} disabled={!canAdvance}>
                {index === total - 1 ? "See results" : "Next"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIndex(0)}
              >
                Start over
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
