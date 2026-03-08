import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DisputeLetterGenerator() {
  const [form, setForm] = useState({ type: "billing", name: "", address: "", companyName: "", companyAddress: "", accountNumber: "", amount: "", date: "", description: "" });
  const [output, setOutput] = useState("");

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const generate = () => {
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const typeLabels: Record<string, string> = { billing: "Billing Dispute", credit: "Credit Report Dispute", service: "Service Dispute", product: "Product Dispute" };

    const text = `${form.name || "[Your Full Name]"}
${form.address || "[Your Address]"}

${today}

${form.companyName || "[Company Name]"}
${form.companyAddress || "[Company Address]"}

Re: ${typeLabels[form.type] || "Formal Dispute"}
${form.accountNumber ? `Account Number: ${form.accountNumber}` : "Account Number: [Your Account Number]"}
${form.amount ? `Disputed Amount: $${form.amount}` : ""}
${form.date ? `Date of Transaction/Issue: ${new Date(form.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}` : ""}

Dear Sir or Madam,

I am writing to formally dispute ${form.type === "billing" ? "a charge on my account" : form.type === "credit" ? "information on my credit report" : form.type === "service" ? "the quality of service provided" : "an issue with a product I purchased"}.

${form.description || "[Describe the issue in detail, including what happened, when it happened, and what resolution you are seeking.]"}

I request that you ${form.type === "billing" ? "investigate this charge and provide a full accounting of the disputed amount. Under the Fair Credit Billing Act, I request that this amount not be reported as delinquent during the investigation period" : form.type === "credit" ? "investigate this matter and correct or remove the inaccurate information from my credit report within 30 days, as required by the Fair Credit Reporting Act" : "resolve this matter promptly and provide a written response within 30 days"}.

I have enclosed copies of relevant documentation to support my dispute. Please acknowledge receipt of this letter and provide your findings in writing.

${form.type === "billing" || form.type === "credit" ? "Please note that under federal law, you are required to acknowledge this dispute within 30 days and resolve the investigation within two billing cycles (not more than 90 days).\n\n" : ""}I expect a prompt resolution to this matter. If I do not receive a satisfactory response within 30 days, I may escalate this complaint to the appropriate regulatory agency.

Sincerely,

${form.name || "[Your Full Name]"}

Enclosures:
- [List any supporting documents]`;

    setOutput(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Dispute Type</Label>
          <Select value={form.type} onValueChange={(v) => update("type", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="billing">Billing Dispute</SelectItem>
              <SelectItem value="credit">Credit Report Dispute</SelectItem>
              <SelectItem value="service">Service Dispute</SelectItem>
              <SelectItem value="product">Product Dispute</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Your Full Name</Label>
          <Input placeholder="John Doe" value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Your Address</Label>
          <Input placeholder="123 Main St, City, State, ZIP" value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input placeholder="ABC Company" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Company Address</Label>
          <Input placeholder="456 Business Ave, City, State, ZIP" value={form.companyAddress} onChange={(e) => update("companyAddress", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Account Number (optional)</Label>
          <Input placeholder="XXXX-1234" value={form.accountNumber} onChange={(e) => update("accountNumber", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Disputed Amount ($)</Label>
          <Input type="number" placeholder="250.00" value={form.amount} onChange={(e) => update("amount", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Date of Issue</Label>
          <Input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Describe the Issue</Label>
        <Textarea placeholder="Explain what happened, include dates and specifics..." rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </div>
      <Button onClick={generate} disabled={!form.name} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Generate Dispute Letter
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
