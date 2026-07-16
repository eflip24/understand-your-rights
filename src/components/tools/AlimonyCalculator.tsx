import ToolRecommender from "@/components/tools/ToolRecommender";
import ScenarioCompare, { type ScenarioSnapshot } from "@/components/tools/ScenarioCompare";
import { useCallback, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ExternalLink, Info, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

// State alimony formulas / guidelines. Where states use judicial discretion
// (no formula), we apply a national-median approach with a clear note.
interface StateFormula {
  // % of income difference used as monthly starting point
  incomeShareLow: number;
  incomeShareHigh: number;
  // duration multiplier vs years married
  durationLow: number;
  durationHigh: number;
  // monthly cap ($) if any
  monthlyCap?: number;
  // permanent alimony still possible for long marriages
  permanentPossible: boolean;
  note: string;
}

const STATES: Record<string, StateFormula> = {
  "National guideline": { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Generic income-shares approach used when no state formula exists." },
  Alabama: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Ala. Code § 30-2-57 — judicial discretion; rehabilitative preferred." },
  Alaska: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "AS § 25.24.160 — needs vs. ability to pay." },
  Arizona: { incomeShareLow: 0.2, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: false, note: "A.R.S. § 25-319 — new 2023 spousal maintenance guidelines with formula." },
  Arkansas: { incomeShareLow: 0.2, incomeShareHigh: 0.3, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Ark. Code § 9-12-312 — typically 20% of payer's take-home." },
  California: { incomeShareLow: 0.35, incomeShareHigh: 0.45, durationLow: 0.5, durationHigh: 0.5, permanentPossible: true, note: "Cal. Fam. Code § 4320 — temporary: 40% of higher earner minus 50% of lower. Long-term: judicial." },
  Colorado: { incomeShareLow: 0.4, incomeShareHigh: 0.4, durationLow: 0.31, durationHigh: 0.5, permanentPossible: true, note: "C.R.S. § 14-10-114 — 40% higher income minus 50% lower, capped at 40% of combined." },
  Connecticut: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.6, permanentPossible: true, note: "Conn. Gen. Stat. § 46b-82 — judicial; considers 12 statutory factors." },
  Delaware: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.5, durationHigh: 0.5, permanentPossible: false, note: "13 Del. C. § 1512 — capped at 50% of marriage duration unless 20+ year marriage." },
  "District of Columbia": { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "D.C. Code § 16-913 — judicial discretion." },
  Florida: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.75, permanentPossible: false, note: "Fla. Stat. § 61.08 — 2023 reforms eliminated permanent alimony. Durational max = 50% of short, 60% moderate, 75% long marriage." },
  Georgia: { incomeShareLow: 0.2, incomeShareHigh: 0.3, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "O.C.G.A. § 19-6-1 — no statutory formula; based on need + ability." },
  Hawaii: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "HRS § 580-47 — judicial factors." },
  Idaho: { incomeShareLow: 0.2, incomeShareHigh: 0.3, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Idaho Code § 32-705 — needs vs. ability." },
  Illinois: { incomeShareLow: 0.333, incomeShareHigh: 0.333, durationLow: 0.2, durationHigh: 1.0, permanentPossible: true, note: "750 ILCS 5/504 — (33.3% of payer income) − (25% of recipient). Combined cap 40%. Duration: 20% under 5yr → 100% (perm) at 20+." },
  Indiana: { incomeShareLow: 0.15, incomeShareHigh: 0.25, durationLow: 0.2, durationHigh: 0.3, permanentPossible: false, note: "Ind. Code § 31-15-7 — limited to rehabilitative (3yr max) or incapacity." },
  Iowa: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Iowa Code § 598.21A — traditional, rehabilitative, or reimbursement." },
  Kansas: { incomeShareLow: 0.2, incomeShareHigh: 0.25, durationLow: 0.33, durationHigh: 0.33, permanentPossible: false, note: "K.S.A. § 23-2902 — capped at 121 months statutorily." },
  Kentucky: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "KRS § 403.200 — need + ability." },
  Louisiana: { incomeShareLow: 0.2, incomeShareHigh: 0.33, durationLow: 0.3, durationHigh: 0.33, permanentPossible: false, note: "La. C.C. art. 112 — max 33% of net income; time-limited." },
  Maine: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.5, durationHigh: 0.5, permanentPossible: true, note: "19-A M.R.S. § 951-A — permanent only after 20yr marriage." },
  Maryland: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Md. Fam. Law § 11-106 — indefinite possible for unconscionable disparity." },
  Massachusetts: { incomeShareLow: 0.3, incomeShareHigh: 0.35, durationLow: 0.5, durationHigh: 0.8, permanentPossible: true, note: "M.G.L. c. 208 § 53 — 30–35% of income difference; duration tied to marriage length." },
  Michigan: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "MCL § 552.23 — 14-factor judicial analysis." },
  Minnesota: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Minn. Stat. § 518.552 — temporary or permanent." },
  Mississippi: { incomeShareLow: 0.2, incomeShareHigh: 0.3, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Miss. Code § 93-5-23 — judicial; Armstrong factors." },
  Missouri: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Mo. Rev. Stat. § 452.335 — need + ability." },
  Montana: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "MCA § 40-4-203 — needs-based, no formula." },
  Nebraska: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Neb. Rev. Stat. § 42-365 — reasonable + just." },
  Nevada: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "NRS § 125.150 — judicial; Tonopah formula sometimes used." },
  "New Hampshire": { incomeShareLow: 0.23, incomeShareHigh: 0.23, durationLow: 0.5, durationHigh: 0.5, permanentPossible: false, note: "RSA 458:19 — formula: 23% of income difference. Duration = 50% of marriage." },
  "New Jersey": { incomeShareLow: 0.3, incomeShareHigh: 0.35, durationLow: 1.0, durationHigh: 1.0, permanentPossible: false, note: "N.J.S.A. § 2A:34-23 — 2014 reforms replaced permanent with open durational for 20+ marriages." },
  "New Mexico": { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "N.M. Stat. § 40-4-7 — needs vs. ability." },
  "New York": { incomeShareLow: 0.2, incomeShareHigh: 0.3, durationLow: 0.15, durationHigh: 0.5, permanentPossible: true, monthlyCap: 5700, note: "DRL § 236(B)(6) — formula: 30% of payer minus 20% of recipient. Income cap $228k. Duration: 15–30% (0–15yr), 30–40% (15–20yr), 35–50% (20+yr)." },
  "North Carolina": { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "N.C. Gen. Stat. § 50-16.3A — judicial; dependent-spouse standard." },
  "North Dakota": { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "N.D. Cent. Code § 14-05-24 — needs-based." },
  Ohio: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Ohio Rev. Code § 3105.18 — 14 statutory factors." },
  Oklahoma: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "43 O.S. § 121 — needs + ability." },
  Oregon: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "ORS § 107.105 — transitional, compensatory, or maintenance." },
  Pennsylvania: { incomeShareLow: 0.4, incomeShareHigh: 0.4, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "23 Pa. C.S. § 3701 — pendente lite: 40% of monthly income difference." },
  "Rhode Island": { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "R.I. Gen. Laws § 15-5-16 — 12 statutory factors." },
  "South Carolina": { incomeShareLow: 0.25, incomeShareHigh: 0.4, durationLow: 0.3, durationHigh: 1.0, permanentPossible: true, note: "S.C. Code § 20-3-130 — five forms including permanent periodic." },
  "South Dakota": { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "SDCL § 25-4-41 — judicial." },
  Tennessee: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Tenn. Code § 36-5-121 — rehabilitative preferred; alimony in futuro possible." },
  Texas: { incomeShareLow: 0.2, incomeShareHigh: 0.2, durationLow: 0.3, durationHigh: 0.3, monthlyCap: 5000, permanentPossible: false, note: "Tex. Fam. Code § 8.055 — capped at lesser of $5,000/mo or 20% of gross. Max 5–10yr duration." },
  Utah: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 1.0, durationHigh: 1.0, permanentPossible: false, note: "Utah Code § 30-3-5 — duration cannot exceed marriage length." },
  Vermont: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "15 V.S.A. § 752 — judicial; rehabilitative + permanent." },
  Virginia: { incomeShareLow: 0.28, incomeShareHigh: 0.28, durationLow: 0.5, durationHigh: 0.5, permanentPossible: true, note: "Va. Code § 20-107.1 — pendente lite: 28% payer minus 58% recipient." },
  Washington: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.25, durationHigh: 0.5, permanentPossible: true, note: "RCW § 26.09.090 — no formula; needs + ability." },
  "West Virginia": { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "W.Va. Code § 48-6-301 — 20-factor analysis." },
  Wisconsin: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Wis. Stat. § 767.56 — no formula; presumption of 50/50 income split for long marriages." },
  Wyoming: { incomeShareLow: 0.25, incomeShareHigh: 0.35, durationLow: 0.3, durationHigh: 0.5, permanentPossible: true, note: "Wyo. Stat. § 20-2-114 — judicial." },
};

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const ALIMONY_STATE_FORMULAS = STATES;

interface AlimonyCalculatorProps {
  defaultState?: string;
}

export default function AlimonyCalculator({ defaultState }: AlimonyCalculatorProps = {}) {
  const [state, setState] = useState(defaultState && STATES[defaultState] ? defaultState : "National guideline");
  const [higherIncome, setHigherIncome] = useState("");
  const [lowerIncome, setLowerIncome] = useState("");
  const [years, setYears] = useState("");
  const [childSupport, setChildSupport] = useState("");
  const [role, setRole] = useState<"payer" | "recipient">("recipient");

  const result = useMemo(() => {
    const hi = parseFloat(higherIncome) || 0;
    const li = parseFloat(lowerIncome) || 0;
    const y = parseFloat(years) || 0;
    const cs = parseFloat(childSupport) || 0;
    const data = STATES[state];
    if (!(hi > 0 && y > 0)) return null;

    const diff = Math.max(0, hi - li);
    // Monthly starting values
    let monthlyLow = (diff * data.incomeShareLow) / 12;
    let monthlyHigh = (diff * data.incomeShareHigh) / 12;

    if (data.monthlyCap) {
      monthlyLow = Math.min(monthlyLow, data.monthlyCap);
      monthlyHigh = Math.min(monthlyHigh, data.monthlyCap);
    }

    // Reduce for child support already flowing to recipient (rough proxy)
    monthlyLow = Math.max(0, monthlyLow - cs * 0.25);
    monthlyHigh = Math.max(0, monthlyHigh - cs * 0.25);

    const isLongMarriage = y >= 20;
    const isShort = y < 5;
    const isMedium = y >= 5 && y < 15;

    let durationYearsLow = y * data.durationLow;
    let durationYearsHigh = y * data.durationHigh;
    const indefinite = isLongMarriage && data.permanentPossible;

    const lifetimeLow = indefinite ? monthlyLow * 12 * Math.min(y, 20) : monthlyLow * 12 * durationYearsLow;
    const lifetimeHigh = indefinite ? monthlyHigh * 12 * Math.min(y, 30) : monthlyHigh * 12 * durationYearsHigh;

    return {
      monthlyLow,
      monthlyHigh,
      durationYearsLow,
      durationYearsHigh,
      indefinite,
      isLongMarriage,
      isShort,
      isMedium,
      lifetimeLow,
      lifetimeHigh,
      formula: data,
    };
  }, [higherIncome, lowerIncome, years, state, childSupport]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="font-serif font-bold text-lg">Marriage &amp; income</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Your state</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {Object.keys(STATES).map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>I am the...</Label>
              <Select value={role} onValueChange={(v) => setRole(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="recipient">Recipient (lower earner)</SelectItem>
                  <SelectItem value="payer">Payer (higher earner)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Field label="Higher earner's annual gross income" v={higherIncome} set={setHigherIncome} placeholder="120000" />
            <Field label="Lower earner's annual gross income" v={lowerIncome} set={setLowerIncome} placeholder="40000" />
            <Field label="Years of marriage" v={years} set={setYears} placeholder="10" />
            <Field label="Monthly child support (if any)" v={childSupport} set={setChildSupport} placeholder="0" />
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-lg">Estimated {state === "National guideline" ? "" : state + " "}spousal support</h3>
              <Badge variant="secondary" className="text-xs">Educational estimate</Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatBox label="Monthly alimony" v={`${fmt(result.monthlyLow)} – ${fmt(result.monthlyHigh)}`} sub={role === "payer" ? "you would pay" : "you would receive"} primary />
              <StatBox label="Duration" v={result.indefinite ? "Indefinite" : `${result.durationYearsLow.toFixed(1)} – ${result.durationYearsHigh.toFixed(1)} yrs`} sub={result.indefinite ? "long-marriage rule" : `${result.isShort ? "short" : result.isMedium ? "medium" : "long"} marriage`} />
              <StatBox label="Total lifetime value" v={`${fmt(result.lifetimeLow)} – ${fmt(result.lifetimeHigh)}`} sub="pre-tax" highlight />
            </div>

            {result.formula.monthlyCap && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-sm">{state} caps monthly alimony at {fmt(result.formula.monthlyCap)} regardless of income.</p>
              </div>
            )}

            <div className="p-3 rounded-lg bg-background border text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold mb-1">State formula:</p>
                <p className="text-muted-foreground">{result.formula.note}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-background border text-sm">
              <p className="font-semibold mb-1">Federal tax treatment (post-2019 TCJA):</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Alimony from divorces finalized <strong>after Dec 31, 2018</strong>: <strong>not deductible</strong> for payer, <strong>not taxable</strong> to recipient.</li>
                <li>Divorces finalized <strong>before 2019</strong>: old rule still applies (deductible/taxable) unless modified to opt in to new rules.</li>
                <li>Some states still allow state-level deduction — check your state return.</li>
              </ul>
            </div>

            <div className="text-sm space-y-2">
              <p className="font-semibold">Factors that can shift the number:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Standard of living during marriage</li>
                <li>Age &amp; health of both spouses</li>
                <li>Contributions as homemaker or to spouse's career</li>
                <li>Recipient's earning capacity &amp; retraining needs</li>
                <li>Marital fault (in states that consider it)</li>
                <li>Remarriage or cohabitation ends most awards</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/tools/family/child-support">Child support calculator <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/tools/family/divorce-cost">Divorce cost estimator <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/tools/family/divorce-buyout">House buyout calculator <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/local-lawyers">Find a family law attorney <ExternalLink className="w-3 h-3 ml-1" /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}



      {/* Day 9 — 3-scenario side-by-side comparison */}
      <ScenarioCompareBar
        state={state}
        higherIncome={higherIncome}
        lowerIncome={lowerIncome}
        years={years}
        role={role}
        result={result}
      />

      <p className="text-xs text-muted-foreground border-t pt-3">
        Estimator only, not legal advice. Alimony is highly judge-dependent even in formula states. Speak with a licensed family law attorney in your state for a case-specific analysis.
      </p>

      <ToolRecommender topic="alimony" />
    </div>
  );
}

/** Wires the calculator's live state into the generic ScenarioCompare primitive. */
function ScenarioCompareBar({
  state,
  higherIncome,
  lowerIncome,
  years,
  role,
  result,
}: {
  state: string;
  higherIncome: string;
  lowerIncome: string;
  years: string;
  role: "payer" | "recipient";
  result: ReturnType<typeof buildResultShape> | null;
}) {
  const buildSnapshot = useCallback((): ScenarioSnapshot | null => {
    if (!result) return null;
    const hi = parseFloat(higherIncome) || 0;
    const li = parseFloat(lowerIncome) || 0;
    const y = parseFloat(years) || 0;
    return {
      label: `${state} · ${y}yr · ${fmt(hi)} vs ${fmt(li)}`,
      savedAt: Date.now(),
      rows: [
        {
          label: "Monthly alimony",
          value: `${fmt(result.monthlyLow)} – ${fmt(result.monthlyHigh)}`,
          sub: role === "payer" ? "you pay" : "you receive",
          numeric: (result.monthlyLow + result.monthlyHigh) / 2,
          higherIsBetter: role === "recipient",
        },
        {
          label: "Duration",
          value: result.indefinite
            ? "Indefinite"
            : `${result.durationYearsLow.toFixed(1)} – ${result.durationYearsHigh.toFixed(1)} yrs`,
          numeric: result.indefinite ? 99 : (result.durationYearsLow + result.durationYearsHigh) / 2,
          higherIsBetter: role === "recipient",
        },
        {
          label: "Total lifetime value",
          value: `${fmt(result.lifetimeLow)} – ${fmt(result.lifetimeHigh)}`,
          sub: "pre-tax",
          numeric: (result.lifetimeLow + result.lifetimeHigh) / 2,
          higherIsBetter: role === "recipient",
        },
        {
          label: "State",
          value: state,
        },
        {
          label: "Marriage length",
          value: `${y} years`,
          numeric: y,
        },
      ],
    };
  }, [state, higherIncome, lowerIncome, years, role, result]);

  return (
    <ScenarioCompare
      title="Compare 3 alimony scenarios side-by-side"
      description="Adjust the inputs above and click 'Save current scenario' to see how state, marriage length, or a pay change moves your alimony award."
      buildSnapshot={buildSnapshot}
      contextLabel={role === "payer" ? "Payer view" : "Recipient view"}
    />
  );
}

/** Type helper so ScenarioCompareBar can share the memo's shape. */
function buildResultShape() {
  return null as unknown as {
    monthlyLow: number;
    monthlyHigh: number;
    durationYearsLow: number;
    durationYearsHigh: number;
    indefinite: boolean;
    lifetimeLow: number;
    lifetimeHigh: number;
  };
}

function Field({ label, v, set, placeholder }: { label: string; v: string; set: (s: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type="number" min="0" step="0.01" value={v} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function StatBox({ label, v, sub, primary, highlight }: { label: string; v: string; sub?: string; primary?: boolean; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-lg text-center border ${
      primary ? "bg-primary/10 border-primary/30" :
      highlight ? "bg-accent/10 border-accent/30" :
      "bg-background"
    }`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold ${primary ? "text-primary" : highlight ? "text-accent" : ""}`}>{v}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
