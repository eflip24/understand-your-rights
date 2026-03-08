import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const checklists: Record<string, { title: string; items: string[] }> = {
  federal: {
    title: "Federal Grant Compliance",
    items: [
      "Registered in SAM.gov with active status",
      "Unique Entity ID (UEI) obtained",
      "Indirect cost rate agreement on file",
      "Single audit completed (if >$750K federal expenditure)",
      "Financial reports submitted per schedule",
      "Progress/performance reports filed on time",
      "Time and effort reporting for personnel",
      "Equipment inventory maintained and tagged",
      "Procurement policies follow 2 CFR 200",
      "Subrecipient monitoring procedures in place",
      "Cost sharing/matching documented (if required)",
      "Records retained for required period (typically 3 years)",
      "Prior approval obtained for budget modifications >10%",
      "Conflict of interest policy documented",
    ],
  },
  state: {
    title: "State Grant Compliance",
    items: [
      "Grant agreement fully executed",
      "State-specific reporting forms completed",
      "Expenditures within approved budget categories",
      "Quarterly financial reports submitted",
      "Program outcomes documented",
      "Match requirements met and documented",
      "Audit completed per state requirements",
      "Procurement follows state guidelines",
      "Equipment tracked and reported",
      "Final closeout report prepared",
    ],
  },
  foundation: {
    title: "Foundation/Private Grant Compliance",
    items: [
      "Letter of agreement or grant contract signed",
      "Use of funds restricted to stated purpose",
      "Interim narrative report submitted",
      "Financial accounting separated for grant funds",
      "Logo/attribution requirements met",
      "Board acknowledgment of grant terms",
      "Final narrative and financial reports submitted",
      "Unspent funds returned or reauthorized",
      "Site visit or evaluation coordinated (if required)",
    ],
  },
  corporate: {
    title: "Corporate Grant Compliance",
    items: [
      "Sponsorship agreement reviewed and signed",
      "Brand usage guidelines followed",
      "Deliverables timeline confirmed",
      "Impact metrics defined and tracked",
      "Mid-term progress update provided",
      "Recognition/publicity requirements met",
      "Financial summary of expenditures prepared",
      "Final impact report submitted",
      "Photos/testimonials collected (if required)",
    ],
  },
};

export default function GrantComplianceChecklist() {
  const [grantType, setGrantType] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const checklist = grantType ? checklists[grantType] : null;
  const total = checklist ? checklist.items.length : 0;
  const completed = checklist ? checklist.items.filter((_, i) => checked[`${grantType}-${i}`]).length : 0;

  const toggle = (key: string) => setChecked({ ...checked, [key]: !checked[key] });

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-w-sm">
        <Label>Grant Type</Label>
        <Select value={grantType} onValueChange={(v) => { setGrantType(v); setChecked({}); }}>
          <SelectTrigger><SelectValue placeholder="Select grant type..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="federal">Federal Grant</SelectItem>
            <SelectItem value="state">State Grant</SelectItem>
            <SelectItem value="foundation">Foundation / Private Grant</SelectItem>
            <SelectItem value="corporate">Corporate Grant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {checklist && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg">{checklist.title}</h3>
            <span className="text-sm text-muted-foreground">{completed}/{total} complete</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }} />
          </div>
          <div className="space-y-2">
            {checklist.items.map((item, i) => {
              const key = `${grantType}-${i}`;
              return (
                <div key={key} className="flex items-start gap-3 p-2 rounded hover:bg-secondary/50">
                  <Checkbox checked={!!checked[key]} onCheckedChange={() => toggle(key)} id={key} className="mt-0.5" />
                  <label htmlFor={key} className={`text-sm cursor-pointer ${checked[key] ? "line-through text-muted-foreground" : ""}`}>
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
