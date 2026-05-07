import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function OperatingAgreementGenerator() {
  const [llc, setLlc] = useState("");
  const [state, setState] = useState("");
  const [members, setMembers] = useState("");
  const [purpose, setPurpose] = useState("");

  const doc = `OPERATING AGREEMENT OF ${(llc || "[LLC NAME]").toUpperCase()}, LLC

This Operating Agreement is made effective as of ${new Date().toLocaleDateString()} by and among the members of ${llc || "[LLC Name]"}, LLC, a limited liability company organized under the laws of ${state || "[State]"}.

1. FORMATION. The Company was formed by filing Articles of Organization with the ${state || "[State]"} Secretary of State.

2. PURPOSE. The Company is organized for the following purpose: ${purpose || "[Business purpose]"}, and any other lawful business activity.

3. MEMBERS. The members of the Company are:
${members || "[Member names and ownership %]"}

4. CAPITAL CONTRIBUTIONS. Each member has contributed cash or property as agreed. Additional contributions require unanimous member consent.

5. PROFITS & LOSSES. Profits and losses are allocated in proportion to ownership percentages.

6. MANAGEMENT. The Company is member-managed. Decisions in the ordinary course require majority vote; major decisions (sale, dissolution, admission of new members) require unanimous consent.

7. DISTRIBUTIONS. Distributions are made at the discretion of the members in proportion to ownership.

8. TRANSFERS. No member may transfer their interest without unanimous written consent.

9. DISSOLUTION. The Company dissolves upon unanimous member consent or as required by law.

10. GOVERNING LAW. This Agreement is governed by the laws of ${state || "[State]"}.

IN WITNESS WHEREOF, the members have executed this Agreement.

____________________________
Member Signature & Date`;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>LLC Name</Label><Input value={llc} onChange={e => setLlc(e.target.value)} /></div>
        <div><Label>State</Label><Input value={state} onChange={e => setState(e.target.value)} /></div>
        <div className="sm:col-span-2"><Label>Members (name + ownership %)</Label><Textarea value={members} onChange={e => setMembers(e.target.value)} rows={3} placeholder="Jane Doe — 60%&#10;John Smith — 40%" /></div>
        <div className="sm:col-span-2"><Label>Business purpose</Label><Input value={purpose} onChange={e => setPurpose(e.target.value)} /></div>
      </div>
      <Textarea value={doc} readOnly rows={20} className="font-mono text-xs" />
      <Button onClick={() => navigator.clipboard.writeText(doc)}>Copy Agreement</Button>
    </div>
  );
}
