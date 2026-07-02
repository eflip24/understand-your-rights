import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export default function SubscriptionCancellationLetter() {
  const { t } = useTranslation(["tools", "common"]);
  const [name, setName] = useState("");
  const [acct, setAcct] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const letter = `${date}

To Whom It May Concern,

I am writing to formally cancel my subscription to ${service || "[Service Name]"}, effective immediately.

Account holder: ${name || "[Your Name]"}
Account number / email: ${acct || "[Account ID]"}

Please confirm cancellation in writing and stop all future charges to my payment method. Per your terms, I am providing this notice in writing as required.

If any further steps are needed on my part, please notify me at the contact information on file. I expect a written confirmation of cancellation within 7 business days.

Sincerely,
${name || "[Your Name]"}`;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>{t("internals.subscriptionCancel.yourName")}</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
        <div><Label>{t("internals.subscriptionCancel.accountId")}</Label><Input value={acct} onChange={e => setAcct(e.target.value)} /></div>
        <div><Label>{t("internals.subscriptionCancel.serviceName")}</Label><Input value={service} onChange={e => setService(e.target.value)} /></div>
        <div><Label>{t("internals.subscriptionCancel.date")}</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
      </div>
      <Textarea value={letter} readOnly rows={14} className="font-mono text-sm" />
      <Button onClick={() => navigator.clipboard.writeText(letter)}>{t("internals.subscriptionCancel.button")}</Button>
    </div>
  );
}
