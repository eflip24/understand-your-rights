import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface AuditItem {
  id: string;
  label: string;
  savings: string;
  priority: "high" | "medium" | "low";
  applies: string[]; // home types
}

const auditItems: AuditItem[] = [
  { id: "attic-insulation", label: "Add/upgrade attic insulation", savings: "$200–$600/yr", priority: "high", applies: ["single", "townhouse"] },
  { id: "air-sealing", label: "Air seal gaps around windows/doors", savings: "$100–$300/yr", priority: "high", applies: ["single", "townhouse", "condo", "apartment"] },
  { id: "hvac-upgrade", label: "Upgrade to high-efficiency HVAC", savings: "$300–$800/yr", priority: "high", applies: ["single", "townhouse"] },
  { id: "smart-thermostat", label: "Install smart thermostat", savings: "$50–$150/yr", priority: "medium", applies: ["single", "townhouse", "condo", "apartment"] },
  { id: "led-lighting", label: "Switch to LED lighting", savings: "$50–$100/yr", priority: "medium", applies: ["single", "townhouse", "condo", "apartment"] },
  { id: "water-heater", label: "Upgrade water heater (heat pump)", savings: "$200–$500/yr", priority: "medium", applies: ["single", "townhouse"] },
  { id: "windows", label: "Replace single-pane windows", savings: "$150–$400/yr", priority: "medium", applies: ["single", "townhouse", "condo"] },
  { id: "duct-sealing", label: "Seal and insulate ductwork", savings: "$100–$300/yr", priority: "medium", applies: ["single", "townhouse"] },
  { id: "solar-panels", label: "Install solar panels", savings: "$600–$1500/yr", priority: "high", applies: ["single", "townhouse"] },
  { id: "power-strips", label: "Use smart power strips", savings: "$20–$50/yr", priority: "low", applies: ["single", "townhouse", "condo", "apartment"] },
  { id: "energy-audit-pro", label: "Schedule professional energy audit", savings: "Identifies $200–$1000+/yr in savings", priority: "high", applies: ["single", "townhouse", "condo", "apartment"] },
  { id: "appliance-upgrade", label: "Upgrade to ENERGY STAR appliances", savings: "$50–$200/yr", priority: "low", applies: ["single", "townhouse", "condo", "apartment"] },
];

export default function HomeEnergyAuditChecklist() {
  const [homeType, setHomeType] = useState("");
  const [homeAge, setHomeAge] = useState("");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [generated, setGenerated] = useState(false);

  const toggle = (id: string) => {
    const next = new Set(completed);
    next.has(id) ? next.delete(id) : next.add(id);
    setCompleted(next);
  };

  const filteredItems = auditItems.filter(item => !homeType || item.applies.includes(homeType));

  const priorityColor = (p: string) => {
    if (p === "high") return "destructive" as const;
    if (p === "medium") return "default" as const;
    return "secondary" as const;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Home Type</Label>
          <Select value={homeType} onValueChange={setHomeType}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single-Family Home</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Home Age</Label>
          <Select value={homeAge} onValueChange={setHomeAge}>
            <SelectTrigger><SelectValue placeholder="Select age" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="new">0–10 years</SelectItem>
              <SelectItem value="mid">10–30 years</SelectItem>
              <SelectItem value="old">30+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={() => setGenerated(true)} className="w-full" disabled={!homeType}>Generate Checklist</Button>

      {generated && (
        <Card>
          <CardHeader><CardTitle>Your Energy Audit Checklist</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                <Checkbox id={item.id} checked={completed.has(item.id)} onCheckedChange={() => toggle(item.id)} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={item.id} className={`font-medium cursor-pointer ${completed.has(item.id) ? "line-through text-muted-foreground" : ""}`}>{item.label}</Label>
                    <Badge variant={priorityColor(item.priority)} className="text-xs">{item.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Est. savings: {item.savings}</p>
                </div>
              </div>
            ))}
            <div className="pt-3 text-sm text-muted-foreground text-center">
              {completed.size} of {filteredItems.length} items completed
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
