import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function IndependentContractorAgreement() {
  const [form, setForm] = useState({ clientName: "", contractorName: "", clientAddress: "", contractorAddress: "", services: "", compensation: "", paymentTerms: "net-30", duration: "", state: "" });
  const [output, setOutput] = useState("");

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const generate = () => {
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const payTermsMap: Record<string, string> = { "net-15": "within fifteen (15) days", "net-30": "within thirty (30) days", "net-45": "within forty-five (45) days", "net-60": "within sixty (60) days", "upon-completion": "upon completion of the services" };

    const text = `INDEPENDENT CONTRACTOR AGREEMENT

This Independent Contractor Agreement ("Agreement") is entered into as of ${date}, by and between:

CLIENT: ${form.clientName || "[Client Name]"}
Address: ${form.clientAddress || "[Client Address]"}

CONTRACTOR: ${form.contractorName || "[Contractor Name]"}
Address: ${form.contractorAddress || "[Contractor Address]"}

1. SERVICES
The Contractor agrees to perform the following services for the Client:

${form.services || "[Describe the services to be performed]"}

2. TERM
${form.duration ? `This Agreement shall commence on the date first written above and continue for a period of ${form.duration}, unless terminated earlier in accordance with this Agreement.` : "This Agreement shall commence on the date first written above and continue until the services are completed or the Agreement is terminated."}

3. COMPENSATION
The Client agrees to pay the Contractor ${form.compensation || "[specify compensation amount and structure]"}.

Payment shall be made ${payTermsMap[form.paymentTerms] || "within thirty (30) days"} of receipt of a proper invoice from the Contractor.

4. INDEPENDENT CONTRACTOR STATUS
The Contractor is an independent contractor and not an employee, partner, or agent of the Client. The Contractor shall:
(a) Have no authority to bind the Client to any agreements;
(b) Be solely responsible for all taxes, including self-employment tax;
(c) Not be entitled to employee benefits;
(d) Control the manner and means of performing the services;
(e) Provide their own tools and equipment unless otherwise agreed.

5. CONFIDENTIALITY
The Contractor agrees to hold in confidence all proprietary information, trade secrets, and confidential business information of the Client. This obligation survives termination of this Agreement.

6. INTELLECTUAL PROPERTY
All work product, inventions, and materials created by the Contractor in connection with the services shall be the sole and exclusive property of the Client. The Contractor hereby assigns all rights, title, and interest in such work product to the Client.

7. NON-SOLICITATION
During the term of this Agreement and for a period of twelve (12) months after termination, the Contractor agrees not to directly solicit the Client's employees or customers with whom the Contractor had contact during the engagement.

8. INDEMNIFICATION
Each party agrees to indemnify and hold harmless the other party from any claims, damages, or expenses arising from their breach of this Agreement or negligent acts.

9. TERMINATION
Either party may terminate this Agreement:
(a) With thirty (30) days' written notice;
(b) Immediately upon material breach by the other party that remains uncured for ten (10) days after written notice;
(c) Immediately if the other party becomes insolvent or files for bankruptcy.

Upon termination, the Client shall pay for all services performed through the date of termination.

10. LIMITATION OF LIABILITY
Neither party shall be liable for indirect, incidental, or consequential damages. The Contractor's total liability shall not exceed the total fees paid under this Agreement.

11. DISPUTE RESOLUTION
Any disputes arising under this Agreement shall first be submitted to mediation. If mediation fails, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.

12. GOVERNING LAW
This Agreement shall be governed by the laws of the State of ${form.state || "[State]"}.

13. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior discussions, agreements, and understandings.

14. AMENDMENTS
This Agreement may only be amended by a written document signed by both parties.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.


CLIENT:

_________________________
${form.clientName || "[Client Name]"}
Date: ________________


CONTRACTOR:

_________________________
${form.contractorName || "[Contractor Name]"}
Date: ________________`;

    setOutput(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Client Name</Label>
          <Input placeholder="Acme Corp" value={form.clientName} onChange={(e) => update("clientName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Contractor Name</Label>
          <Input placeholder="Jane Smith Consulting" value={form.contractorName} onChange={(e) => update("contractorName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Client Address</Label>
          <Input placeholder="123 Business St" value={form.clientAddress} onChange={(e) => update("clientAddress", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Contractor Address</Label>
          <Input placeholder="456 Freelance Ave" value={form.contractorAddress} onChange={(e) => update("contractorAddress", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Compensation</Label>
          <Input placeholder="$5,000 per month" value={form.compensation} onChange={(e) => update("compensation", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Payment Terms</Label>
          <select value={form.paymentTerms} onChange={(e) => update("paymentTerms", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="net-15">Net 15</option>
            <option value="net-30">Net 30</option>
            <option value="net-45">Net 45</option>
            <option value="net-60">Net 60</option>
            <option value="upon-completion">Upon Completion</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Duration (optional)</Label>
          <Input placeholder="6 months" value={form.duration} onChange={(e) => update("duration", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Governing State</Label>
          <Input placeholder="Delaware" value={form.state} onChange={(e) => update("state", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Scope of Services</Label>
        <Textarea placeholder="Describe the services the contractor will provide..." rows={3} value={form.services} onChange={(e) => update("services", e.target.value)} />
      </div>
      <Button onClick={generate} disabled={!form.clientName || !form.contractorName} className="bg-accent text-accent-foreground hover:bg-gold-dark">Generate Agreement</Button>
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
