import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NDAGenerator() {
  const [form, setForm] = useState({
    type: "mutual",
    party1: "",
    party2: "",
    state: "",
    duration: "2",
    scope: "",
  });
  const [output, setOutput] = useState("");

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const generate = () => {
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const isMutual = form.type === "mutual";
    const text = `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of ${date}, by and between:

Party 1: ${form.party1} ("${isMutual ? "Party A" : "Disclosing Party"}")
Party 2: ${form.party2} ("${isMutual ? "Party B" : "Receiving Party"}")

1. PURPOSE
${isMutual ? "Both parties" : "The Disclosing Party"} wish${isMutual ? "" : "es"} to disclose certain confidential information${form.scope ? ` relating to ${form.scope}` : ""} for the purpose of evaluating a potential business relationship.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by ${isMutual ? "either party" : "the Disclosing Party"}, including but not limited to business plans, financial data, technical information, customer lists, trade secrets, and proprietary data.

3. OBLIGATIONS
${isMutual ? "Each party" : "The Receiving Party"} agrees to:
(a) Hold all Confidential Information in strict confidence;
(b) Not disclose Confidential Information to third parties without prior written consent;
(c) Use Confidential Information solely for the purpose stated above;
(d) Take reasonable measures to protect the confidentiality of the information.

4. EXCLUSIONS
This Agreement does not apply to information that:
(a) Was publicly known at the time of disclosure;
(b) Becomes publicly known through no fault of the ${isMutual ? "receiving party" : "Receiving Party"};
(c) Was already in the ${isMutual ? "receiving party's" : "Receiving Party's"} possession;
(d) Is independently developed without use of Confidential Information;
(e) Is required to be disclosed by law or court order.

5. TERM
This Agreement shall remain in effect for ${form.duration} year${form.duration !== "1" ? "s" : ""} from the date first written above.

6. GOVERNING LAW
This Agreement shall be governed by the laws of the State of ${form.state || "[State]"}.

7. REMEDIES
${isMutual ? "Each party acknowledges" : "The Receiving Party acknowledges"} that breach of this Agreement may cause irreparable harm, and the ${isMutual ? "non-breaching party" : "Disclosing Party"} shall be entitled to seek equitable relief, including injunction.

8. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties regarding confidentiality and supersedes all prior discussions.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.


_________________________          _________________________
${form.party1 || "[Party 1]"}                    ${form.party2 || "[Party 2]"}
Date: ________________             Date: ________________`;

    setOutput(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>NDA Type</Label>
          <Select value={form.type} onValueChange={(v) => update("type", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mutual">Mutual NDA</SelectItem>
              <SelectItem value="one-way">One-Way NDA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Duration (years)</Label>
          <Select value={form.duration} onValueChange={(v) => update("duration", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "5"].map((d) => (
                <SelectItem key={d} value={d}>{d} year{d !== "1" ? "s" : ""}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Party 1 (Your Name/Company)</Label>
          <Input placeholder="Acme Corp" value={form.party1} onChange={(e) => update("party1", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Party 2 (Other Party)</Label>
          <Input placeholder="Beta Inc" value={form.party2} onChange={(e) => update("party2", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Governing State</Label>
          <Input placeholder="Delaware" value={form.state} onChange={(e) => update("state", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Scope / Subject Matter</Label>
          <Input placeholder="Software development project" value={form.scope} onChange={(e) => update("scope", e.target.value)} />
        </div>
      </div>
      <Button onClick={generate} disabled={!form.party1 || !form.party2} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Generate NDA
      </Button>
      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)}>
              Copy to Clipboard
            </Button>
          </div>
          <Textarea value={output} readOnly rows={25} className="font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
