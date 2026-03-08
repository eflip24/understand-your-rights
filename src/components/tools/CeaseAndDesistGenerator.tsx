import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CeaseAndDesistGenerator() {
  const [form, setForm] = useState({ type: "harassment", senderName: "", senderAddress: "", recipientName: "", recipientAddress: "", description: "", deadline: "10", state: "" });
  const [output, setOutput] = useState("");

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const generate = () => {
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const typeMap: Record<string, { subject: string; legal: string }> = {
      harassment: { subject: "Cease and Desist — Harassment", legal: "continued harassment, including but not limited to unwanted contact, threats, and intimidating behavior" },
      defamation: { subject: "Cease and Desist — Defamation", legal: "defamatory statements made about me/my business, which are false and have caused reputational and/or financial harm" },
      infringement: { subject: "Cease and Desist — Intellectual Property Infringement", legal: "unauthorized use of copyrighted/trademarked material belonging to me/my organization" },
      "contract-breach": { subject: "Cease and Desist — Breach of Contract", legal: "breach of the agreement between our parties, specifically the violation of contractual obligations" },
      "debt-collection": { subject: "Cease and Desist — Debt Collection", legal: "continued debt collection activities. Under the Fair Debt Collection Practices Act (FDCPA), I have the right to request that you cease all communication regarding this alleged debt" },
    };

    const { subject, legal } = typeMap[form.type] || typeMap.harassment;

    const text = `${form.senderName || "[Your Full Name]"}
${form.senderAddress || "[Your Address]"}

${today}

VIA CERTIFIED MAIL — RETURN RECEIPT REQUESTED

${form.recipientName || "[Recipient Name]"}
${form.recipientAddress || "[Recipient Address]"}

Re: ${subject}

Dear ${form.recipientName || "[Recipient Name]"},

This letter serves as a formal demand that you immediately CEASE AND DESIST all ${legal}.

${form.description || "[Provide specific details about the behavior, actions, or violations you want stopped. Include dates, incidents, and any relevant evidence.]"}

DEMANDS:

1. You must immediately cease all of the above-described activities.
2. You must confirm in writing within ${form.deadline || "10"} days of receipt of this letter that you will comply with these demands.
3. You must not retaliate against me in any way for sending this letter.

CONSEQUENCES OF NON-COMPLIANCE:

Please be advised that if you fail to comply with the demands set forth in this letter within ${form.deadline || "10"} days, I am prepared to pursue all available legal remedies, which may include but are not limited to:

• Filing a civil lawsuit seeking damages and injunctive relief
• Reporting your conduct to appropriate regulatory authorities
• Seeking a restraining order or protective order
${form.type === "infringement" ? "• Filing a DMCA takedown notice\n• Pursuing statutory damages under copyright/trademark law\n" : ""}${form.type === "debt-collection" ? "• Filing a complaint with the Consumer Financial Protection Bureau (CFPB)\n• Pursuing damages under the FDCPA\n" : ""}
This letter is written without prejudice to any and all rights and remedies available to me under the laws of ${form.state ? `the State of ${form.state}` : "[your state]"} and applicable federal law, all of which are expressly reserved.

I strongly recommend that you seek legal counsel regarding this matter.

Govern yourself accordingly.

Sincerely,

_________________________
${form.senderName || "[Your Full Name]"}

CC: [Your Attorney, if applicable]`;

    setOutput(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Type of C&D</Label>
          <Select value={form.type} onValueChange={(v) => update("type", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="defamation">Defamation</SelectItem>
              <SelectItem value="infringement">IP Infringement</SelectItem>
              <SelectItem value="contract-breach">Breach of Contract</SelectItem>
              <SelectItem value="debt-collection">Debt Collection</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Response Deadline (days)</Label>
          <Input type="number" placeholder="10" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Your Name</Label>
          <Input placeholder="John Doe" value={form.senderName} onChange={(e) => update("senderName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Your Address</Label>
          <Input placeholder="123 Main St, City, State, ZIP" value={form.senderAddress} onChange={(e) => update("senderAddress", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Recipient Name</Label>
          <Input placeholder="Jane Smith" value={form.recipientName} onChange={(e) => update("recipientName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Recipient Address</Label>
          <Input placeholder="456 Other St, City, State, ZIP" value={form.recipientAddress} onChange={(e) => update("recipientAddress", e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Governing State</Label>
          <Input placeholder="California" value={form.state} onChange={(e) => update("state", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Describe the Specific Conduct</Label>
        <Textarea placeholder="On [date], you [describe the behavior]..." rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </div>
      <Button onClick={generate} disabled={!form.senderName} className="bg-accent text-accent-foreground hover:bg-gold-dark">Generate C&D Letter</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)}>Copy to Clipboard</Button>
          </div>
          <Textarea value={output} readOnly rows={30} className="font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
