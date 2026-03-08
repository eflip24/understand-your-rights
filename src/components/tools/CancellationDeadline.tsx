import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, addBusinessDays, format } from "date-fns";

export default function CancellationDeadline() {
  const [signupDate, setSignupDate] = useState("");
  const [period, setPeriod] = useState("14");
  const [dayType, setDayType] = useState("calendar");
  const [result, setResult] = useState<{ deadline: string; daysLeft: number; expired: boolean } | null>(null);

  const calculate = () => {
    const start = new Date(signupDate);
    const days = parseInt(period);
    const deadline = dayType === "calendar" ? addDays(start, days) : addBusinessDays(start, days);
    const now = new Date();
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    setResult({ deadline: format(deadline, "MMMM d, yyyy"), daysLeft, expired: daysLeft < 0 });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Signup / Purchase Date</Label>
          <Input type="date" value={signupDate} onChange={(e) => setSignupDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Cooling-Off Period (days)</Label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {[3, 7, 14, 30, 60, 90].map((d) => (
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
      <Button onClick={calculate} disabled={!signupDate} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Deadline
      </Button>
      {result && (
        <div className={`p-6 rounded-lg text-center ${result.expired ? "bg-destructive/10 border border-destructive/30" : "bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-800"}`}>
          <p className="text-sm text-muted-foreground mb-1">Your cancellation deadline is</p>
          <p className="text-2xl font-bold font-serif">{result.deadline}</p>
          <p className={`text-sm mt-2 font-medium ${result.expired ? "text-destructive" : "text-green-600"}`}>
            {result.expired ? `Expired ${Math.abs(result.daysLeft)} days ago` : `${result.daysLeft} days remaining`}
          </p>
        </div>
      )}
    </div>
  );
}
