import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function TermsOfServiceGenerator() {
  const [form, setForm] = useState({
    company: "",
    website: "",
    email: "",
    type: "website",
    features: { accounts: true, payments: false, ugc: false, api: false },
  });
  const [output, setOutput] = useState("");

  const update = (key: string, value: any) => setForm({ ...form, [key]: value });
  const toggleFeature = (key: string) => setForm({ ...form, features: { ...form.features, [key]: !form.features[key as keyof typeof form.features] } });

  const generate = () => {
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const text = `TERMS OF SERVICE

Last Updated: ${date}

Please read these Terms of Service ("Terms") carefully before using ${form.website || "[website URL]"} ("the Service") operated by ${form.company || "[Company Name]"} ("we," "us," or "our").

1. ACCEPTANCE OF TERMS

By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.

2. DESCRIPTION OF SERVICE

${form.company || "[Company Name]"} provides ${form.type === "website" ? "a website" : form.type === "saas" ? "a software-as-a-service platform" : "a mobile application"} accessible at ${form.website || "[URL]"}.

${form.features.accounts ? `3. USER ACCOUNTS

To access certain features, you may need to create an account. You are responsible for:
• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use

We reserve the right to suspend or terminate accounts that violate these Terms.
` : ""}
${form.features.payments ? `${form.features.accounts ? "4" : "3"}. PAYMENTS AND BILLING

• All fees are stated at the time of purchase
• Payments are processed through our third-party payment processor
• Refunds are handled according to our refund policy
• We reserve the right to change pricing with 30 days' notice
` : ""}
${form.features.ugc ? `USER-GENERATED CONTENT

By posting content on our Service, you:
• Grant us a non-exclusive, worldwide license to use, display, and distribute your content
• Represent that you own or have the right to share such content
• Agree not to post content that is illegal, offensive, or infringes on others' rights

We reserve the right to remove any content that violates these Terms.
` : ""}
INTELLECTUAL PROPERTY

All content, features, and functionality of the Service are owned by ${form.company || "[Company Name]"} and are protected by copyright, trademark, and other intellectual property laws.

LIMITATION OF LIABILITY

TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${(form.company || "[Company Name]").toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.

Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.

DISCLAIMER OF WARRANTIES

THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.

INDEMNIFICATION

You agree to indemnify and hold harmless ${form.company || "[Company Name]"}, its officers, directors, employees, and agents from any claims arising from your use of the Service or violation of these Terms.

TERMINATION

We may terminate or suspend your access to the Service at any time, without prior notice, for any reason, including breach of these Terms.

GOVERNING LAW

These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.

CHANGES TO TERMS

We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on the Service.

CONTACT US

If you have questions about these Terms, contact us at:
${form.email || "[email address]"}
${form.company || "[Company Name]"}`;

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
          <Input placeholder="legal@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Features Your Service Includes</Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "accounts", label: "User Accounts" },
            { key: "payments", label: "Payments / Billing" },
            { key: "ugc", label: "User-Generated Content" },
            { key: "api", label: "API Access" },
          ].map((f) => (
            <div key={f.key} className="flex items-center gap-2">
              <Checkbox checked={form.features[f.key as keyof typeof form.features]} onCheckedChange={() => toggleFeature(f.key)} />
              <span className="text-sm">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={generate} disabled={!form.company} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Generate Terms of Service
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
