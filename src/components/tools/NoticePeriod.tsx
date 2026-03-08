import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, addBusinessDays, format } from "date-fns";

export default function NoticePeriod() {
  const [startDate, setStartDate] = useState("");
  const [period, setPeriod] = useState("30");
  const [dayType, setDayType] = useState("calendar");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const days = parseInt(period);
    const endDate = dayType === "calendar" ? addDays(start, days) : addBusinessDays(start, days);
    setResult(format(endDate, "MMMM d, yyyy"));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Notice Given On</Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Notice Period</Label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {[7, 14, 30, 60, 90].map((d) => (
                <SelectItem key={d} value={String(d)}>{d} days</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Day Type</Label>
          <Select value={dayType} onValueChange={setDayType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="calendar">Calendar Days</SelectItem>
              <SelectItem value="business">Business Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={calculate} disabled={!startDate} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate End Date
      </Button>
      {result && (
        <div className="p-6 rounded-lg bg-secondary text-center">
          <p className="text-sm text-muted-foreground mb-1">Your notice period ends on</p>
          <p className="text-2xl font-bold font-serif">{result}</p>
        </div>
      )}
    </div>
  );
}
