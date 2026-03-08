import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const checklists: Record<string, { title: string; items: string[] }> = {
  employment: {
    title: "Employment Contract Checklist",
    items: [
      "Job title and description clearly defined",
      "Start date and employment type (full-time/part-time/contract)",
      "Compensation, bonuses, and payment schedule",
      "Benefits (health, dental, vision, retirement)",
      "Vacation, PTO, and sick leave policies",
      "Non-compete clause scope and duration",
      "Non-disclosure / confidentiality provisions",
      "Termination conditions and notice period",
      "Severance package terms",
      "Intellectual property assignment clause",
      "Dispute resolution mechanism",
      "Governing law and jurisdiction",
    ],
  },
  nda: {
    title: "NDA Review Checklist",
    items: [
      "Parties correctly identified",
      "Definition of confidential information is clear",
      "Mutual vs. one-way obligations specified",
      "Exclusions from confidential information listed",
      "Duration of confidentiality obligations",
      "Permitted disclosures (e.g., legal requirements)",
      "Return or destruction of information clause",
      "Remedies for breach specified",
      "Governing law identified",
      "Non-solicitation provisions (if any)",
    ],
  },
  lease: {
    title: "Lease Agreement Checklist",
    items: [
      "Landlord and tenant names correct",
      "Property address and description accurate",
      "Lease term (start and end dates)",
      "Monthly rent and due date",
      "Security deposit amount and return conditions",
      "Late payment fees and grace period",
      "Maintenance and repair responsibilities",
      "Rules about modifications/alterations",
      "Subletting policy",
      "Termination and renewal provisions",
      "Pet policy (if applicable)",
      "Insurance requirements",
    ],
  },
  service: {
    title: "Service Agreement Checklist",
    items: [
      "Scope of services clearly described",
      "Deliverables and milestones defined",
      "Payment terms and schedule",
      "Timeline and deadlines",
      "Acceptance criteria for deliverables",
      "Change order process",
      "Confidentiality provisions",
      "Intellectual property ownership",
      "Limitation of liability",
      "Indemnification clause",
      "Termination for convenience clause",
      "Warranties and representations",
    ],
  },
};

export default function ContractChecklistGenerator() {
  const [contractType, setContractType] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const checklist = contractType ? checklists[contractType] : null;
  const total = checklist ? checklist.items.length : 0;
  const completed = checklist ? checklist.items.filter((_, i) => checked[`${contractType}-${i}`]).length : 0;

  const toggle = (key: string) => setChecked({ ...checked, [key]: !checked[key] });

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-w-sm">
        <Label>Contract Type</Label>
        <Select value={contractType} onValueChange={(v) => { setContractType(v); setChecked({}); }}>
          <SelectTrigger><SelectValue placeholder="Select contract type..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="employment">Employment Contract</SelectItem>
            <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
            <SelectItem value="lease">Lease Agreement</SelectItem>
            <SelectItem value="service">Service Agreement</SelectItem>
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
              const key = `${contractType}-${i}`;
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
