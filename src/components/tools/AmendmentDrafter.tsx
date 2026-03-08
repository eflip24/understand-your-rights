import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AmendmentDrafter() {
  const [form, setForm] = useState({ contractTitle: "", originalDate: "", party1: "", party2: "", state: "", amendmentNumber: "1", changes: "" });
  const [output, setOutput] = useState("");

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const generate = () => {
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const ordinal = form.amendmentNumber === "1" ? "First" : form.amendmentNumber === "2" ? "Second" : form.amendmentNumber === "3" ? "Third" : `${form.amendmentNumber}th`;

    const text = `${ordinal.toUpperCase()} AMENDMENT TO ${(form.contractTitle || "[CONTRACT TITLE]").toUpperCase()}

This ${ordinal} Amendment ("Amendment") is made and entered into as of ${date}, by and between:

${form.party1 || "[Party 1]"} ("Party A")
and
${form.party2 || "[Party 2]"} ("Party B")

RECITALS

WHEREAS, the parties entered into that certain ${form.contractTitle || "[Contract Title]"} dated ${form.originalDate ? new Date(form.originalDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "[Original Date]"} (the "Original Agreement"); and

WHEREAS, the parties desire to amend the Original Agreement as set forth herein;

NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein, the parties agree as follows:

1. AMENDMENTS

The following changes are hereby made to the Original Agreement:

${form.changes || "[Describe the specific changes to be made]"}

2. EFFECT OF AMENDMENT

Except as specifically modified by this Amendment, all terms and conditions of the Original Agreement shall remain in full force and effect. In the event of any conflict between this Amendment and the Original Agreement, this Amendment shall control.

3. COUNTERPARTS

This Amendment may be executed in counterparts, each of which shall be deemed an original.

4. GOVERNING LAW

This Amendment shall be governed by the laws of the State of ${form.state || "[State]"}.

IN WITNESS WHEREOF, the parties have executed this Amendment as of the date first written above.


_________________________          _________________________
${form.party1 || "[Party 1]"}                    ${form.party2 || "[Party 2]"}
Date: ________________             Date: ________________`;

    setOutput(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Original Contract Title</Label>
          <Input placeholder="Service Agreement" value={form.contractTitle} onChange={(e) => update("contractTitle", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Original Contract Date</Label>
          <Input type="date" value={form.originalDate} onChange={(e) => update("originalDate", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Party 1</Label>
          <Input placeholder="Acme Corp" value={form.party1} onChange={(e) => update("party1", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Party 2</Label>
          <Input placeholder="Beta Inc" value={form.party2} onChange={(e) => update("party2", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Amendment Number</Label>
          <Input type="number" min="1" placeholder="1" value={form.amendmentNumber} onChange={(e) => update("amendmentNumber", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Governing State</Label>
          <Input placeholder="Delaware" value={form.state} onChange={(e) => update("state", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Describe the Changes</Label>
        <Textarea placeholder="Section 3.1 is amended to read: ..." rows={4} value={form.changes} onChange={(e) => update("changes", e.target.value)} />
      </div>
      <Button onClick={generate} disabled={!form.party1 || !form.party2} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Draft Amendment
      </Button>
      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)}>Copy to Clipboard</Button>
          </div>
          <Textarea value={output} readOnly rows={25} className="font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
