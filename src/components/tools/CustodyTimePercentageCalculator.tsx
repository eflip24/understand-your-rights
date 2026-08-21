import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolRecommender from "@/components/tools/ToolRecommender";
import ToolResultAd from "@/components/tools/ToolResultAd";

/** Common parenting-time schedules with the overnights they generate per year. */
const SCHEDULES = [
  { id: "custom", label: "Custom — enter my own overnights", overnights: 0 },
  { id: "eow", label: "Every other weekend (Fri–Sun)", overnights: 52 },
  { id: "eow-mid", label: "Every other weekend + one midweek overnight", overnights: 78 },
  { id: "eow-long", label: "Every other weekend Thu–Mon", overnights: 104 },
  { id: "5-2-2-5", label: "5-2-2-5 rotation", overnights: 182 },
  { id: "2-2-3", label: "2-2-3 rotation", overnights: 182 },
  { id: "week-week", label: "Week on / week off", overnights: 182 },
  { id: "4-3", label: "4-3 split", overnights: 156 },
  { id: "school-year", label: "School year with one parent, summers with the other", overnights: 90 },
];

export default function CustodyTimePercentageCalculator() {
  const [schedule, setSchedule] = useState("eow");
  const [customNights, setCustomNights] = useState("");
  const [holidayNights, setHolidayNights] = useState("7");
  const [summerNights, setSummerNights] = useState("14");
  const [travelDays, setTravelDays] = useState("0");

  const preset = SCHEDULES.find((s) => s.id === schedule)!;
  const baseNights = schedule === "custom" ? parseFloat(customNights) || 0 : preset.overnights;
  const holidays = parseFloat(holidayNights) || 0;
  const summer = parseFloat(summerNights) || 0;
  const travel = parseFloat(travelDays) || 0;

  const totalNights = Math.min(365, baseNights + holidays + summer);
  const pct = (totalNights / 365) * 100;
  const otherPct = 100 - pct;
  const calc = totalNights > 0;

  const thresholdNote =
    pct >= 50
      ? "Equal or majority timeshare. In most income-shares states this materially reduces or eliminates a support obligation, and in California a 50% timeshare makes the guideline figure turn almost entirely on income difference."
      : pct >= 35
        ? "Above the shared-parenting threshold used by many states (typically 30–35% of overnights), which triggers the shared-custody support formula rather than the sole-custody one."
        : pct >= 25
          ? "Approaching the shared-parenting threshold. Adding one midweek overnight per fortnight is often enough to cross a 30% trigger."
          : "Standard visitation range. Support is normally calculated on the sole-custody schedule at this level of parenting time.";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label>Parenting schedule</Label>
          <Select value={schedule} onValueChange={setSchedule}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{SCHEDULES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        {schedule === "custom" && (
          <div><Label>Regular overnights per year</Label><Input type="number" value={customNights} onChange={(e) => setCustomNights(e.target.value)} placeholder="110" /></div>
        )}
        <div><Label>Extra holiday overnights per year</Label><Input type="number" value={holidayNights} onChange={(e) => setHolidayNights(e.target.value)} /></div>
        <div><Label>Extra summer / school-break overnights</Label><Input type="number" value={summerNights} onChange={(e) => setSummerNights(e.target.value)} /></div>
        <div><Label>Long-distance travel days per year</Label><Input type="number" value={travelDays} onChange={(e) => setTravelDays(e.target.value)} /></div>
      </div>

      {calc && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Parenting-time timeshare</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 bg-emerald-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">Your timeshare</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">{pct.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{totalNights} overnights of 365</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Other parent</p>
                <p className="text-2xl font-bold">{otherPct.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{365 - totalNights} overnights</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Overnights per month</p>
                <p className="text-2xl font-bold">{(totalNights / 12).toFixed(1)}</p>
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted"><tr><th className="text-left p-2 font-medium">Source of overnights</th><th className="text-right p-2 font-medium">Nights</th></tr></thead>
                <tbody>
                  <tr className="border-t"><td className="p-2">Regular schedule</td><td className="p-2 text-right">{baseNights}</td></tr>
                  <tr className="border-t"><td className="p-2">Holidays</td><td className="p-2 text-right">{holidays}</td></tr>
                  <tr className="border-t"><td className="p-2">Summer / school breaks</td><td className="p-2 text-right">{summer}</td></tr>
                  {travel > 0 && <tr className="border-t"><td className="p-2">Travel days (not counted as overnights)</td><td className="p-2 text-right">{travel}</td></tr>}
                  <tr className="border-t bg-muted/50 font-bold"><td className="p-2">Total overnights</td><td className="p-2 text-right">{totalNights}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/20">
              <span className="font-medium">What this percentage means for support.</span> {thresholdNote}
            </div>
          </CardContent>
        </Card>
      )}

      {calc && <ToolResultAd show />}

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted"><tr><th className="text-left p-2 font-medium">Schedule</th><th className="text-right p-2 font-medium">Overnights/yr</th><th className="text-right p-2 font-medium">Timeshare</th></tr></thead>
          <tbody>
            {SCHEDULES.filter((s) => s.id !== "custom").map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.label}</td>
                <td className="p-2 text-right">{s.overnights}</td>
                <td className="p-2 text-right">{((s.overnights / 365) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border p-4 text-sm space-y-2">
        <h3 className="font-serif font-bold">How courts count parenting time</h3>
        <p className="text-muted-foreground">Most states count <strong>overnights</strong>, not hours or days, because an overnight is objective and easy to audit against a calendar. A few — California and Oregon among them — allow a court to count significant daytime periods where a parent has full caretaking responsibility. Time the child is at school or daycare is credited to whichever parent is responsible for the child that day.</p>
      </div>

      <ToolRecommender topic="family-law" />
    </div>
  );
}
