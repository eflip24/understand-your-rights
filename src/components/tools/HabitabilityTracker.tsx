import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export default function HabitabilityTracker() {
  const { t } = useTranslation("common");
  const [tenant, setTenant] = useState("");
  const [landlord, setLandlord] = useState("");
  const [address, setAddress] = useState("");
  const [issue, setIssue] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const letter = `${date}

To: ${landlord || "[Landlord Name]"}
From: ${tenant || "[Tenant Name]"}
Property: ${address || "[Rental Address]"}

Subject: Formal Request for Repair — Habitability Issue

Dear ${landlord || "Landlord"},

I am writing to formally notify you of a habitability issue at the above property:

${issue || "[Describe the issue, when it started, and how it affects livability.]"}

Under the implied warranty of habitability, you are required to maintain this property in safe and livable condition. I am requesting that this be repaired within a reasonable time, generally 14–30 days depending on severity.

Please confirm receipt of this notice and provide a timeline for repair. If the issue is not addressed, I may pursue remedies available under state law, which may include rent withholding, repair-and-deduct, or terminating the lease.

I am keeping a written log of this issue and all communications.

Sincerely,
${tenant || "[Tenant Name]"}`;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>{t("common:fields.name")}</Label><Input value={tenant} onChange={e => setTenant(e.target.value)} /></div>
        <div><Label>Landlord name</Label><Input value={landlord} onChange={e => setLandlord(e.target.value)} /></div>
        <div className="sm:col-span-2"><Label>Property address</Label><Input value={address} onChange={e => setAddress(e.target.value)} /></div>
        <div><Label>{t("common:fields.date")}</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
      </div>
      <div><Label>Describe the issue</Label><Textarea value={issue} onChange={e => setIssue(e.target.value)} rows={4} placeholder="e.g., No hot water since Jan 5. Affects bathing and dishwashing..." /></div>
      <Textarea value={letter} readOnly rows={16} className="font-mono text-xs" />
      <Button onClick={() => navigator.clipboard.writeText(letter)}>Copy Letter</Button>
    </div>
  );
}
