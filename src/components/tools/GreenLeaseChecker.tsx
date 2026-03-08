import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClauseItem {
  id: string;
  label: string;
  description: string;
  importance: "essential" | "recommended" | "optional";
}

const greenClauses: ClauseItem[] = [
  { id: "benchmarking", label: "Energy Benchmarking", description: "Requires annual energy performance benchmarking using ENERGY STAR Portfolio Manager or equivalent.", importance: "essential" },
  { id: "utility-data", label: "Utility Data Sharing", description: "Tenant and landlord agree to share whole-building utility data for benchmarking and reporting.", importance: "essential" },
  { id: "efficiency-upgrades", label: "Efficiency Upgrade Cost Sharing", description: "Defines how costs and savings from energy efficiency upgrades are split between parties.", importance: "essential" },
  { id: "green-build", label: "Green Building Standards", description: "Requires compliance with LEED, ENERGY STAR, or local green building codes for any tenant improvements.", importance: "recommended" },
  { id: "waste-mgmt", label: "Waste Management & Recycling", description: "Establishes recycling programs, composting, and waste reduction targets.", importance: "recommended" },
  { id: "water-conservation", label: "Water Conservation", description: "Includes water-efficient fixtures and landscaping requirements.", importance: "recommended" },
  { id: "renewable-energy", label: "Renewable Energy Procurement", description: "Allows or requires on-site renewable energy or green power purchasing.", importance: "optional" },
  { id: "ev-charging", label: "EV Charging Infrastructure", description: "Provisions for installing and maintaining electric vehicle charging stations.", importance: "optional" },
  { id: "indoor-air", label: "Indoor Air Quality Standards", description: "Sets minimum ventilation and air quality standards using ASHRAE guidelines.", importance: "recommended" },
  { id: "reporting", label: "Sustainability Reporting", description: "Annual sustainability reporting requirements and compliance verification.", importance: "optional" },
];

export default function GreenLeaseChecker() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const score = () => {
    let total = 0;
    greenClauses.forEach((c) => {
      if (selected.has(c.id)) {
        total += c.importance === "essential" ? 3 : c.importance === "recommended" ? 2 : 1;
      }
    });
    return total;
  };

  const maxScore = greenClauses.reduce((s, c) => s + (c.importance === "essential" ? 3 : c.importance === "recommended" ? 2 : 1), 0);

  const importanceColor = (imp: string) => {
    if (imp === "essential") return "destructive" as const;
    if (imp === "recommended") return "default" as const;
    return "secondary" as const;
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Check which green lease provisions are included in your commercial lease:</p>

      <div className="space-y-3">
        {greenClauses.map((clause) => (
          <div key={clause.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <Checkbox id={clause.id} checked={selected.has(clause.id)} onCheckedChange={() => toggle(clause.id)} className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor={clause.id} className="font-medium cursor-pointer">{clause.label}</Label>
                <Badge variant={importanceColor(clause.importance)} className="text-xs">{clause.importance}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{clause.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={() => setShowResults(true)} className="w-full">Evaluate Lease</Button>

      {showResults && (
        <Card className="border-accent/30">
          <CardHeader><CardTitle>Green Lease Score</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">{score()} / {maxScore}</p>
              <p className="text-sm text-muted-foreground mt-1">{selected.size} of {greenClauses.length} clauses present</p>
            </div>
            {greenClauses.filter(c => c.importance === "essential" && !selected.has(c.id)).length > 0 && (
              <div className="mt-4">
                <p className="font-medium text-destructive mb-2">Missing Essential Clauses:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {greenClauses.filter(c => c.importance === "essential" && !selected.has(c.id)).map(c => (
                    <li key={c.id}>{c.label}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
