import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Deadline {
  id: number;
  name: string;
  date: string;
  type: string;
}

export default function GrantDeadlineTracker() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("application");

  const addDeadline = () => {
    if (!name || !date) return;
    setDeadlines([...deadlines, { id: Date.now(), name, date, type }]);
    setName("");
    setDate("");
  };

  const removeDeadline = (id: number) => setDeadlines(deadlines.filter((d) => d.id !== id));

  const getStatus = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return { label: "Overdue", variant: "destructive" as const, days };
    if (days <= 7) return { label: "Urgent", variant: "destructive" as const, days };
    if (days <= 30) return { label: "Upcoming", variant: "secondary" as const, days };
    return { label: "On Track", variant: "outline" as const, days };
  };

  const sorted = [...deadlines].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Label>Grant / Task Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. NSF Progress Report" />
        </div>
        <div className="space-y-2">
          <Label>Deadline Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="application">Application</option>
            <option value="progress-report">Progress Report</option>
            <option value="final-report">Final Report</option>
            <option value="financial-report">Financial Report</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Button onClick={addDeadline}>Add Deadline</Button>
      </div>

      {sorted.length > 0 && (
        <div className="space-y-2 pt-2">
          <h3 className="font-serif font-bold text-lg">Timeline</h3>
          {sorted.map((d) => {
            const status = getStatus(d.date);
            return (
              <Card key={d.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{d.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{d.type.replace("-", " ")} · {new Date(d.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {status.days < 0 ? `${Math.abs(status.days)}d overdue` : `${status.days}d remaining`}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeDeadline(d.id)}>×</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {sorted.length === 0 && <p className="text-sm text-muted-foreground">Add deadlines above to start tracking.</p>}
    </div>
  );
}
