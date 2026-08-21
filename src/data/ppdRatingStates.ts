/**
 * Permanent partial disability (PPD) benefit inputs for the Workers' Comp
 * Impairment Rating Calculator. Values are the published maximum weekly PPD
 * rate and the whole-person / scheduled week base each state uses to convert
 * an AMA Guides impairment rating into dollars.
 */

export interface PpdState {
  code: string;
  name: string;
  /** Max weekly PPD benefit ($). */
  maxWeekly: number;
  /** Weeks payable for a 100% whole-person impairment. */
  wholePersonWeeks: number;
  /** Percentage of the average weekly wage used for PPD (decimal). */
  wageRate: number;
  note: string;
}

export const ppdStates: PpdState[] = [
  { code: "CA", name: "California", maxWeekly: 290, wholePersonWeeks: 700, wageRate: 0.6667, note: "California rates impairment through the 2005 PDRS, adjusting the whole-person rating for occupation and age before converting to weeks." },
  { code: "TX", name: "Texas", maxWeekly: 1_112, wholePersonWeeks: 300, wageRate: 0.7, note: "Texas pays impairment income benefits of three weeks per 1% whole-body impairment at 70% of the average weekly wage." },
  { code: "FL", name: "Florida", maxWeekly: 1_260, wholePersonWeeks: 350, wageRate: 0.75, note: "Florida uses a sliding schedule: 2 weeks per point up to 10%, then 3, 4 and 6 weeks per point at higher ratings." },
  { code: "NY", name: "New York", maxWeekly: 1_222, wholePersonWeeks: 525, wageRate: 0.6667, note: "New York uses schedule loss of use awards for extremities and capped non-schedule awards tied to loss of wage-earning capacity." },
  { code: "IL", name: "Illinois", maxWeekly: 1_161, wholePersonWeeks: 500, wageRate: 0.6, note: "Illinois pays PPD at 60% of the average weekly wage, with the person-as-a-whole valued at 500 weeks." },
  { code: "PA", name: "Pennsylvania", maxWeekly: 1_325, wholePersonWeeks: 500, wageRate: 0.6667, note: "Pennsylvania uses an impairment rating evaluation (IRE) to move a claimant from total to partial status, capped at 500 weeks." },
  { code: "GA", name: "Georgia", maxWeekly: 800, wholePersonWeeks: 300, wageRate: 0.6667, note: "Georgia pays PPD at two-thirds of the average weekly wage against a 300-week body-as-a-whole schedule." },
  { code: "OH", name: "Ohio", maxWeekly: 638, wholePersonWeeks: 200, wageRate: 0.6667, note: "Ohio pays two weeks per 1% of permanent partial impairment, up to 200 weeks." },
  { code: "NC", name: "North Carolina", maxWeekly: 1_330, wholePersonWeeks: 300, wageRate: 0.6667, note: "North Carolina uses a scheduled-member table; the back is valued at 300 weeks." },
  { code: "MI", name: "Michigan", maxWeekly: 1_100, wholePersonWeeks: 400, wageRate: 0.8, note: "Michigan pays 80% of the after-tax average weekly wage, with wage-loss rather than pure impairment driving value." },
  { code: "NJ", name: "New Jersey", maxWeekly: 1_131, wholePersonWeeks: 600, wageRate: 0.7, note: "New Jersey values total permanent disability at 600 weeks and pays a percentage of that schedule." },
  { code: "VA", name: "Virginia", maxWeekly: 1_410, wholePersonWeeks: 500, wageRate: 0.6667, note: "Virginia pays PPD only for scheduled body parts; there is no whole-person award for the back alone." },
];

/** Fallback for jurisdictions not individually modelled. */
export const DEFAULT_PPD: Omit<PpdState, "code" | "name"> = {
  maxWeekly: 1_000,
  wholePersonWeeks: 400,
  wageRate: 0.6667,
  note: "Generic model: two-thirds of the average weekly wage against a 400-week whole-person schedule. Check your state board's current maximum.",
};

export function getPpdState(code: string): PpdState | undefined {
  return ppdStates.find((s) => s.code === code);
}

/** Scheduled member values (weeks) common across most jurisdictions. */
export const scheduledMembers: { id: string; label: string; weeks: number }[] = [
  { id: "whole", label: "Whole person / back / neck", weeks: 0 },
  { id: "arm", label: "Arm (above elbow)", weeks: 250 },
  { id: "hand", label: "Hand", weeks: 190 },
  { id: "thumb", label: "Thumb", weeks: 60 },
  { id: "finger", label: "Index finger", weeks: 35 },
  { id: "leg", label: "Leg (above knee)", weeks: 215 },
  { id: "foot", label: "Foot", weeks: 155 },
  { id: "eye", label: "Loss of vision in one eye", weeks: 150 },
  { id: "hearing", label: "Hearing loss, one ear", weeks: 50 },
];
