import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, DollarSign, Scale, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// State-specific overtime rules beyond federal FLSA
const STATE_RULES: Record<string, { dailyOtAfter?: number; dailyDoubleAfter?: number; seventhDayRule?: boolean; note: string }> = {
  "Federal (FLSA only)": { note: "Overtime at 1.5× after 40 hours in a workweek. No daily overtime." },
  California: { dailyOtAfter: 8, dailyDoubleAfter: 12, seventhDayRule: true, note: "1.5× after 8 hrs/day or 40 hrs/week. 2× after 12 hrs/day. 7th consecutive day: 1.5× for first 8, 2× thereafter. Lab. Code § 510." },
  Colorado: { dailyOtAfter: 12, note: "1.5× after 12 hrs/day, 40 hrs/week, or 12 consecutive hours. COMPS Order #38." },
  Alaska: { dailyOtAfter: 8, note: "1.5× after 8 hrs/day or 40 hrs/week (employers with 4+ employees). AS § 23.10.060." },
  Nevada: { dailyOtAfter: 8, note: "1.5× after 8 hrs/day if paid <1.5× minimum wage, or 40 hrs/week. NRS 608.018." },
  "Puerto Rico": { dailyOtAfter: 8, note: "1.5× after 8 hrs/day or 40 hrs/week. Act No. 379." },
};

const STATES = Object.keys(STATE_RULES);

export default function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [state, setState] = useState("Federal (FLSA only)");
  const [dailyHours, setDailyHours] = useState<string[]>(["8", "8", "8", "8", "8", "0", "0"]);
  const [weeksUnpaid, setWeeksUnpaid] = useState("");

  const rate = parseFloat(hourlyRate) || 0;
  const rules = STATE_RULES[state];

  const weekly = useMemo(() => {
    const daily = dailyHours.map((h) => parseFloat(h) || 0);
    const totalHours = daily.reduce((a, b) => a + b, 0);

    let regularPay = 0;
    let otPay = 0;
    let dtPay = 0;
    let otHours = 0;
    let dtHours = 0;
    let regularHours = 0;

    // Federal / weekly-only path
    if (!rules.dailyOtAfter) {
      regularHours = Math.min(40, totalHours);
      otHours = Math.max(0, totalHours - 40);
      regularPay = regularHours * rate;
      otPay = otHours * rate * 1.5;
    } else {
      // State with daily overtime rules — compute per day, then reconcile weekly
      let dailyReg = 0;
      let dailyOt = 0;
      let dailyDt = 0;
      daily.forEach((h, idx) => {
        if (h <= 0) return;
        const isSeventhDay = rules.seventhDayRule && idx === 6 && daily.slice(0, 6).every((d) => d > 0);
        if (isSeventhDay) {
          // 7th consecutive day: first 8 at 1.5×, over 8 at 2×
          dailyOt += Math.min(h, 8);
          dailyDt += Math.max(0, h - 8);
          return;
        }
        const dtAfter = rules.dailyDoubleAfter ?? Infinity;
        const otAfter = rules.dailyOtAfter!;
        dailyReg += Math.min(h, otAfter);
        dailyOt += Math.max(0, Math.min(h, dtAfter) - otAfter);
        dailyDt += Math.max(0, h - dtAfter);
      });
      // Weekly 40-hr rule adds OT to any regular hours over 40
      const weeklyOtFromReg = Math.max(0, dailyReg - 40);
      regularHours = Math.min(40, dailyReg);
      otHours = dailyOt + weeklyOtFromReg;
      dtHours = dailyDt;
      regularPay = regularHours * rate;
      otPay = otHours * rate * 1.5;
      dtPay = dtHours * rate * 2;
    }

    return {
      totalHours,
      regularHours,
      otHours,
      dtHours,
      regularPay,
      otPay,
      dtPay,
      totalPay: regularPay + otPay + dtPay,
    };
  }, [dailyHours, rate, rules]);

  const weeks = parseFloat(weeksUnpaid) || 0;
  const unpaidPremium = (weekly.otPay - weekly.otHours * rate) + (weekly.dtPay - weekly.dtHours * rate);
  // Back pay estimate: unpaid OT/DT premium * weeks. FLSA allows liquidated (double) damages.
  const backPay = unpaidPremium * weeks;
  const flsaDoubleDamages = backPay * 2;

  const calculated = rate > 0 && weekly.totalHours > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Hourly rate ($)</Label>
          <Input type="number" step="0.01" min="0" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="25.00" />
        </div>
        <div className="space-y-2">
          <Label>State overtime rules</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATES.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Hours worked each day (this week)</Label>
        <div className="grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div key={day} className="space-y-1">
              <p className="text-xs text-center text-muted-foreground">{day}</p>
              <Input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={dailyHours[i]}
                onChange={(e) => {
                  const next = [...dailyHours];
                  next[i] = e.target.value;
                  setDailyHours(next);
                }}
                className="text-center px-1"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">{rules.note}</p>
      </div>

      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              <h3 className="font-serif font-bold text-lg">This week's pay</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              <StatBox label="Regular" hours={weekly.regularHours} amount={weekly.regularPay} sub={`× $${rate.toFixed(2)}`} />
              <StatBox label="Overtime (1.5×)" hours={weekly.otHours} amount={weekly.otPay} sub={`× $${(rate * 1.5).toFixed(2)}`} highlight />
              <StatBox label="Double time (2×)" hours={weekly.dtHours} amount={weekly.dtPay} sub={`× $${(rate * 2).toFixed(2)}`} highlight />
              <StatBox label="Total gross" hours={weekly.totalHours} amount={weekly.totalPay} sub="all hours" primary />
            </div>
          </CardContent>
        </Card>
      )}

      {calculated && (weekly.otHours > 0 || weekly.dtHours > 0) && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif font-bold text-lg">Unpaid overtime back-pay estimator</h3>
              <Badge variant="secondary" className="text-xs">FLSA</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              If your employer paid straight-time (not 1.5×/2×) for these hours, use this to estimate what you may be owed.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Weeks this pattern occurred</Label>
                <Input type="number" min="0" max="156" value={weeksUnpaid} onChange={(e) => setWeeksUnpaid(e.target.value)} placeholder="52" />
                <p className="text-xs text-muted-foreground">FLSA look-back: 2 years (3 if willful).</p>
              </div>
              {weeks > 0 && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-background border">
                    <p className="text-xs text-muted-foreground">Unpaid premium per week</p>
                    <p className="text-lg font-semibold">${unpaidPremium.toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="text-xs text-muted-foreground">Estimated back-pay owed</p>
                    <p className="text-2xl font-bold text-primary">${backPay.toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                    <p className="text-xs text-muted-foreground">With FLSA liquidated (2×) damages</p>
                    <p className="text-2xl font-bold text-accent">${flsaDoubleDamages.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>
            {weeks > 0 && (
              <div className="text-sm space-y-2 border-t pt-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <p>
                    Under the FLSA, prevailing employees in unpaid-overtime cases are typically awarded <strong>double the unpaid amount</strong> (liquidated damages) <em>plus</em> attorney's fees. Many wage-and-hour attorneys work on contingency.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button asChild size="sm" variant="outline">
                    <Link to="/tools/consumer/statute-of-limitations">Check your state's filing deadline <ExternalLink className="w-3 h-3 ml-1" /></Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/local-lawyers">Find an employment lawyer <ExternalLink className="w-3 h-3 ml-1" /></Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground border-t pt-3">
        Estimator only — not legal advice. Overtime eligibility depends on your exemption status (executive, administrative, professional, outside sales, etc.). Salaried does not automatically mean exempt.
      </p>

      <ToolRecommender topic="wage-hour" />
    </div>
  );
}

function StatBox({ label, hours, amount, sub, highlight, primary }: { label: string; hours: number; amount: number; sub: string; highlight?: boolean; primary?: boolean }) {
  return (
    <div className={`p-3 rounded-lg text-center border ${
      primary ? "bg-primary/10 border-primary/30" :
      highlight && amount > 0 ? "bg-accent/10 border-accent/30" :
      "bg-muted border-transparent"
    }`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-xl font-bold ${primary ? "text-primary" : highlight && amount > 0 ? "text-accent" : ""}`}>${amount.toFixed(2)}</p>
      <p className="text-xs text-muted-foreground">{hours} hr {sub}</p>
    </div>
  );
}
