import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const checklist = [
  { category: "Basics", items: ["Job title and description are accurate", "Start date is specified", "Employment type (full-time, part-time, contract) is clear", "Work location and remote work policies defined", "Reporting structure identified"] },
  { category: "Compensation & Benefits", items: ["Base salary or hourly rate specified", "Pay schedule (weekly, biweekly, monthly)", "Bonus structure and eligibility criteria", "Stock options or equity grants (if applicable)", "Health insurance details", "Retirement plan contributions", "Other benefits (dental, vision, life insurance)"] },
  { category: "Time Off", items: ["Vacation/PTO policy and accrual rate", "Sick leave policy", "Holiday schedule", "Parental leave policy", "Bereavement and personal leave"] },
  { category: "Restrictive Covenants", items: ["Non-compete clause scope and duration", "Non-solicitation provisions", "Non-disclosure/confidentiality agreement", "Intellectual property assignment clause", "Invention assignment provisions"] },
  { category: "Termination", items: ["At-will or for-cause termination specified", "Notice period requirements", "Severance package terms", "Garden leave provisions", "Return of company property requirements"] },
  { category: "Dispute Resolution", items: ["Arbitration clause (mandatory or optional)", "Governing law and jurisdiction", "Mediation requirements", "Class action waiver (if any)", "Attorney fee provisions"] },
];

export default function EmploymentContractChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totalItems = checklist.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = Object.values(checked).filter(Boolean).length;
  const toggle = (key: string) => setChecked({ ...checked, [key]: !checked[key] });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{completedItems}/{totalItems} items reviewed</span>
        <Button variant="outline" size="sm" onClick={() => setChecked({})}>Reset</Button>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%` }} />
      </div>
      {checklist.map((cat) => (
        <div key={cat.category} className="space-y-2">
          <h3 className="font-serif font-bold text-base">{cat.category}</h3>
          {cat.items.map((item) => {
            const key = `${cat.category}-${item}`;
            return (
              <div key={key} className="flex items-start gap-3 p-2 rounded hover:bg-secondary/50">
                <Checkbox checked={!!checked[key]} onCheckedChange={() => toggle(key)} id={key} className="mt-0.5" />
                <label htmlFor={key} className={`text-sm cursor-pointer ${checked[key] ? "line-through text-muted-foreground" : ""}`}>{item}</label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
