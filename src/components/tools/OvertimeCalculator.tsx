import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [regularHours, setRegularHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [otMultiplier, setOtMultiplier] = useState("1.5");

  const rate = parseFloat(hourlyRate) || 0;
  const regular = parseFloat(regularHours) || 0;
  const ot = parseFloat(overtimeHours) || 0;
  const mult = parseFloat(otMultiplier) || 1.5;

  const regularPay = rate * regular;
  const otRate = rate * mult;
  const otPay = otRate * ot;
  const totalPay = regularPay + otPay;
  const totalHours = regular + ot;
  const effectiveRate = totalHours > 0 ? totalPay / totalHours : 0;

  const calculated = rate > 0 && ot > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Hourly Rate ($)</Label><Input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="25" /></div>
        <div><Label>Regular Hours (per week)</Label><Input type="number" value={regularHours} onChange={e => setRegularHours(e.target.value)} placeholder="40" /></div>
        <div><Label>Overtime Hours</Label><Input type="number" value={overtimeHours} onChange={e => setOvertimeHours(e.target.value)} placeholder="10" /></div>
        <div>
          <Label>Overtime Multiplier</Label>
          <Select value={otMultiplier} onValueChange={setOtMultiplier}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1.5">1.5x (Time and a half)</SelectItem>
              <SelectItem value="2">2x (Double time)</SelectItem>
              <SelectItem value="2.5">2.5x (Triple time minus half)</SelectItem>
              <SelectItem value="3">3x (Triple time)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {calculated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-serif font-bold text-lg">Pay Breakdown</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Regular Pay</p>
                <p className="text-xl font-bold">${regularPay.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{regular}hrs × ${rate.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Overtime Pay</p>
                <p className="text-xl font-bold text-accent">${otPay.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{ot}hrs × ${otRate.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-center border border-primary/20">
                <p className="text-sm text-muted-foreground">Total Pay</p>
                <p className="text-xl font-bold">${totalPay.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{totalHours} total hours</p>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p><span className="font-medium">Overtime rate:</span> ${otRate.toFixed(2)}/hr ({mult}x regular)</p>
              <p><span className="font-medium">Effective hourly rate:</span> ${effectiveRate.toFixed(2)}/hr (blended)</p>
              <p><span className="font-medium">OT premium earned:</span> ${(otPay - rate * ot).toFixed(2)} extra</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
