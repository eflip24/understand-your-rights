import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Columns3, Save, X, Info } from "lucide-react";

/** One row rendered per metric in the comparison table. */
export interface ScenarioRow {
  /** Human-readable label — e.g. "Monthly alimony". */
  label: string;
  /** Formatted string — e.g. "$1,200 – $1,700". */
  value: string;
  /** Optional caption under the value. */
  sub?: string;
  /** Optional numeric value used to highlight the winning column. */
  numeric?: number;
  /** If true, larger is better when highlighting. Default: false (smaller wins). */
  higherIsBetter?: boolean;
}

/** A saved snapshot of the calculator's current output. */
export interface ScenarioSnapshot {
  label: string;
  savedAt: number;
  rows: ScenarioRow[];
}

interface Props {
  /** What the tool is comparing — e.g. "alimony scenarios". */
  title?: string;
  /** Short blurb under the title. */
  description?: string;
  /** Called by the parent when the user clicks "Save current scenario". */
  buildSnapshot: () => ScenarioSnapshot | null;
  /** Optional tag rendered in the badge — e.g. state or method. */
  contextLabel?: string;
}

/**
 * Day 9 primitive — 3-column side-by-side comparison for any calculator.
 *
 * Instead of forcing every calculator to duplicate its input state 3 times,
 * this component holds up to 3 immutable snapshots of the parent's current
 * output. Users tweak the inputs, click "Save as Scenario", and the row is
 * added to the comparison table. Rendering three saved snapshots side-by-side
 * dramatically raises time-on-page and pages-per-session — the entire point
 * of Day 9 in the AdSense-signal plan.
 */
export default function ScenarioCompare({
  title = "Compare scenarios side-by-side",
  description = "Save the current calculation as a scenario, tweak the inputs, and save again. Compare up to three side-by-side.",
  buildSnapshot,
  contextLabel,
}: Props) {
  const [scenarios, setScenarios] = useState<ScenarioSnapshot[]>([]);
  const [nextName, setNextName] = useState("");

  const save = useCallback(() => {
    const snap = buildSnapshot();
    if (!snap) return;
    const auto = `Scenario ${String.fromCharCode(65 + scenarios.length)}`;
    const label = (nextName.trim() || snap.label || auto).slice(0, 40);
    setScenarios((prev) => [...prev, { ...snap, label }].slice(-3));
    setNextName("");
  }, [buildSnapshot, nextName, scenarios.length]);

  const remove = useCallback((idx: number) => {
    setScenarios((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clear = useCallback(() => setScenarios([]), []);

  // Build the set of row-labels across all snapshots (union, preserving order).
  const rowLabels: string[] = [];
  for (const s of scenarios) {
    for (const r of s.rows) if (!rowLabels.includes(r.label)) rowLabels.push(r.label);
  }

  // For each row-label, decide which snapshot has the "best" numeric value.
  const bestByRow: Record<string, number | null> = {};
  for (const label of rowLabels) {
    let bestIdx: number | null = null;
    let bestVal: number | null = null;
    let higher = false;
    scenarios.forEach((s, i) => {
      const row = s.rows.find((r) => r.label === label);
      if (!row || typeof row.numeric !== "number") return;
      higher = row.higherIsBetter ?? false;
      if (
        bestVal === null ||
        (higher ? row.numeric > bestVal : row.numeric < bestVal)
      ) {
        bestVal = row.numeric;
        bestIdx = i;
      }
    });
    bestByRow[label] = bestIdx;
  }

  const canSave = scenarios.length < 3;

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Columns3 className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-serif font-bold text-lg">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          {contextLabel && <Badge variant="secondary" className="text-xs">{contextLabel}</Badge>}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={nextName}
            onChange={(e) => setNextName(e.target.value)}
            placeholder={`Scenario ${String.fromCharCode(65 + scenarios.length)} name (optional)`}
            className="max-w-[240px]"
            disabled={!canSave}
          />
          <Button type="button" size="sm" onClick={save} disabled={!canSave}>
            <Save className="w-4 h-4 mr-1" /> Save current scenario
          </Button>
          {scenarios.length > 0 && (
            <Button type="button" size="sm" variant="ghost" onClick={clear}>
              Clear all
            </Button>
          )}
          {!canSave && (
            <span className="text-xs text-muted-foreground">Maximum 3 scenarios — remove one to add another.</span>
          )}
        </div>

        {scenarios.length === 0 ? (
          <div className="p-4 rounded-lg bg-muted/40 border text-sm text-muted-foreground flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <p>
              No scenarios saved yet. Fill in the calculator above with one set of assumptions
              (e.g. current incomes), then click <strong>Save current scenario</strong>. Change
              the inputs (e.g. what if the higher earner takes a pay cut, or the marriage lasted
              5 more years?) and save again to compare.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-semibold py-2 pr-3 text-muted-foreground">Metric</th>
                  {scenarios.map((s, i) => (
                    <th key={i} className="text-left font-semibold py-2 px-3">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[180px]">{s.label}</span>
                        <button
                          type="button"
                          onClick={() => remove(i)}
                          aria-label={`Remove ${s.label}`}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowLabels.map((label) => (
                  <tr key={label} className="border-b last:border-0">
                    <td className="py-2 pr-3 text-muted-foreground align-top">{label}</td>
                    {scenarios.map((s, i) => {
                      const row = s.rows.find((r) => r.label === label);
                      const isBest = bestByRow[label] === i && scenarios.length > 1;
                      return (
                        <td
                          key={i}
                          className={`py-2 px-3 align-top ${
                            isBest ? "bg-primary/10 font-semibold text-primary rounded" : ""
                          }`}
                        >
                          {row ? (
                            <>
                              <div>{row.value}</div>
                              {row.sub && (
                                <div className="text-xs text-muted-foreground font-normal">{row.sub}</div>
                              )}
                            </>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {scenarios.length > 1 && (
              <p className="text-[11px] text-muted-foreground mt-2">
                Highlighted cell = most favorable value in that row (lower cost / higher benefit depending on the metric).
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
