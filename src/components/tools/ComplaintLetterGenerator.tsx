import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ComplaintLetterGenerator() {
  const [form, setForm] = useState({
    yourName: "",
    yourAddress: "",
    recipientName: "",
    recipientCompany: "",
    type: "product",
    product: "",
    purchaseDate: "",
    issue: "",
    resolution: "",
  });
  const [output, setOutput] = useState("");

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const generate = () => {
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const text = `${form.yourName || "[Your Name]"}
${form.yourAddress || "[Your Address]"}

${date}

${form.recipientName || "[Recipient Name]"}
${form.recipientCompany || "[Company Name]"}

Dear ${form.recipientName || "Sir/Madam"},

RE: Formal Complaint Regarding ${form.product || "[Product/Service]"}

I am writing to formally complain about ${form.product || "[product/service]"} ${form.purchaseDate ? `purchased on ${form.purchaseDate}` : ""}.

${form.issue || "[Describe the issue in detail, including dates, reference numbers, and any previous attempts to resolve the matter.]"}

I am requesting the following resolution: ${form.resolution || "[State what you want — refund, replacement, repair, etc.]"}

Under consumer protection regulations, I believe I am entitled to a satisfactory resolution. I have enclosed copies of relevant documentation for your reference.

I would appreciate a response within 14 days of receiving this letter. If I do not receive a satisfactory response, I may escalate this matter to the relevant consumer protection agency.

I trust that you will treat this matter with the urgency it deserves and look forward to your prompt response.

Yours ${form.recipientName ? "sincerely" : "faithfully"},


_________________________
${form.yourName || "[Your Name]"}

Enclosures: [List any attached documents — receipts, photos, correspondence]`;

    setOutput(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Your Name</Label>
          <Input placeholder="John Smith" value={form.yourName} onChange={(e) => update("yourName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Your Address</Label>
          <Input placeholder="123 Main St, City, State" value={form.yourAddress} onChange={(e) => update("yourAddress", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Recipient Name</Label>
          <Input placeholder="Customer Service Manager" value={form.recipientName} onChange={(e) => update("recipientName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input placeholder="Acme Corp" value={form.recipientCompany} onChange={(e) => update("recipientCompany", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Complaint Type</Label>
          <Select value={form.type} onValueChange={(v) => update("type", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="product">Product Issue</SelectItem>
              <SelectItem value="service">Service Complaint</SelectItem>
              <SelectItem value="billing">Billing Dispute</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Product/Service Name</Label>
          <Input placeholder="Widget Pro 3000" value={form.product} onChange={(e) => update("product", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Purchase Date</Label>
          <Input type="date" value={form.purchaseDate} onChange={(e) => update("purchaseDate", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Desired Resolution</Label>
          <Input placeholder="Full refund" value={form.resolution} onChange={(e) => update("resolution", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Describe the Issue</Label>
        <Textarea placeholder="Explain what happened..." value={form.issue} onChange={(e) => update("issue", e.target.value)} rows={4} />
      </div>
      <Button onClick={generate} disabled={!form.yourName} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Generate Letter
      </Button>
      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)}>Copy to Clipboard</Button>
          </div>
          <Textarea value={output} readOnly rows={20} className="font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
