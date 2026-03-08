import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function PrivacyPolicyGenerator() {
  const [form, setForm] = useState({
    company: "",
    website: "",
    email: "",
    collects: { name: true, email: true, payment: false, location: false, cookies: true, analytics: true },
    children: false,
  });
  const [output, setOutput] = useState("");

  const update = (key: string, value: any) => setForm({ ...form, [key]: value });
  const toggleCollect = (key: string) => setForm({ ...form, collects: { ...form.collects, [key]: !form.collects[key as keyof typeof form.collects] } });

  const generate = () => {
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const collected = Object.entries(form.collects).filter(([, v]) => v).map(([k]) => k);
    const dataList = collected.map((c) => {
      const labels: Record<string, string> = { name: "Name and contact details", email: "Email address", payment: "Payment and billing information", location: "Location data", cookies: "Cookies and usage data", analytics: "Analytics and browsing behavior" };
      return labels[c] || c;
    });

    const text = `PRIVACY POLICY

Last Updated: ${date}

${form.company || "[Company Name]"} ("we," "us," or "our") operates ${form.website || "[website URL]"}. This Privacy Policy explains how we collect, use, and protect your personal information.

1. INFORMATION WE COLLECT

We may collect the following types of information:
${dataList.map((d) => `• ${d}`).join("\n")}

2. HOW WE USE YOUR INFORMATION

We use the collected information to:
• Provide and maintain our services
• Process transactions and send related information
• Send promotional communications (with your consent)
• Monitor and analyze usage patterns
• Detect, prevent, and address technical issues

3. DATA SHARING

We do not sell your personal information. We may share data with:
• Service providers who assist in operating our website
• Legal authorities when required by law
• Business partners with your consent

4. DATA RETENTION

We retain personal information only as long as necessary for the purposes outlined in this policy, or as required by law.

5. YOUR RIGHTS

You have the right to:
• Access your personal data
• Request correction of inaccurate data
• Request deletion of your data
• Opt out of marketing communications
• Data portability (where applicable)

${form.collects.cookies ? `6. COOKIES

We use cookies and similar technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

Types of cookies we use:
• Essential cookies (required for website functionality)
• Analytics cookies (help us understand how visitors use our site)
• Preference cookies (remember your settings)
` : ""}
${form.children ? `7. CHILDREN'S PRIVACY

Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal data, please contact us.
` : ""}
${form.collects.cookies ? "8" : "7"}. DATA SECURITY

We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

${form.collects.cookies ? "9" : "8"}. CHANGES TO THIS POLICY

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.

${form.collects.cookies ? "10" : "9"}. CONTACT US

If you have questions about this Privacy Policy, contact us at:
${form.email || "[email address]"}
${form.company || "[Company Name]"}
${form.website || "[Website URL]"}`;

    setOutput(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input placeholder="Acme Corp" value={form.company} onChange={(e) => update("company", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Website URL</Label>
          <Input placeholder="https://example.com" value={form.website} onChange={(e) => update("website", e.target.value)} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Contact Email</Label>
          <Input placeholder="privacy@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Data You Collect</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(form.collects).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox checked={val} onCheckedChange={() => toggleCollect(key)} />
              <span className="text-sm capitalize">{key}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox checked={form.children} onCheckedChange={(v) => update("children", !!v)} />
        <span className="text-sm">Include children's privacy section (COPPA)</span>
      </div>

      <Button onClick={generate} disabled={!form.company} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Generate Privacy Policy
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
