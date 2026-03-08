import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ContractEntry {
  name: string;
  startDate: string;
  endDate: string;
}

export default function ContractExpirationTracker() {
  const [entries, setEntries] = useState<ContractEntry[]>([{ name: "", startDate: "", endDate: "" }]);
  const [results, setResults] = useState<{ name: string; daysLeft: number; status: string }[] | null>(null);

  const updateEntry = (i: number, key: keyof ContractEntry, value: string) => {
    const updated = [...entries];
    updated[i] = { ...updated[i], [key]: value };
    setEntries(updated);
  };

  const addEntry = () => setEntries([...entries, { name: "", startDate: "", endDate: "" }]);
  const removeEntry = (i: number) => setEntries(entries.filter((_, idx) => idx !== i));

  const calculate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const res = entries
      .filter((e) => e.name && e.endDate)
      .map((e) => {
        const end = new Date(e.endDate);
        const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        let status = "Active";
        if (diff < 0) status = "Expired";
        else if (diff <= 30) status = "Expiring Soon";
        else if (diff <= 90) status = "Upcoming";
        return { name: e.name, daysLeft: diff, status };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
    setResults(res);
  };

  const valid = entries.some((e) => e.name && e.endDate);

  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div key={i} className="grid gap-3 sm:grid-cols-4 items-end p-3 rounded-lg bg-secondary/50">
          <div className="space-y-1">
            <Label>Contract Name</Label>
            <Input placeholder="Office Lease" value={entry.name} onChange={(e) => updateEntry(i, "name", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Start Date</Label>
            <Input type="date" value={entry.startDate} onChange={(e) => updateEntry(i, "startDate", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>End Date</Label>
            <Input type="date" value={entry.endDate} onChange={(e) => updateEntry(i, "endDate", e.target.value)} />
          </div>
          <div>
            {entries.length > 1 && (
              <Button variant="outline" size="sm" onClick={() => removeEntry(i)}>Remove</Button>
            )}
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <Button variant="outline" onClick={addEntry}>+ Add Contract</Button>
        <Button onClick={calculate} disabled={!valid} className="bg-accent text-accent-foreground hover:bg-gold-dark">
          Track Expirations
        </Button>
      </div>
      {results && results.length > 0 && (
        <div className="space-y-2 pt-2">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
              <span className="font-medium">{r.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)} days ago` : `${r.daysLeft} days left`}
                </span>
                <Badge variant={r.status === "Expired" ? "destructive" : r.status === "Expiring Soon" ? "outline" : "default"}>
                  {r.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
