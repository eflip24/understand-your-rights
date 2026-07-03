import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function PowerOfAttorneyGenerator() {
  const { t } = useTranslation(["tools", "common"]);
  const [form, setForm] = useState({ type: "general", principalName: "", principalAddress: "", agentName: "", agentAddress: "", alternateAgent: "", state: "", powers: "", effective: "immediate" });
  const [output, setOutput] = useState("");

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const generate = () => {
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const typeLabels: Record<string, string> = { general: "GENERAL", limited: "LIMITED", durable: "DURABLE", financial: "FINANCIAL" };
    const poaType = typeLabels[form.type] || "GENERAL";

    const defaultPowers: Record<string, string> = {
      general: `(a) Manage, buy, sell, and deal with all real and personal property;
(b) Conduct banking transactions, including deposits, withdrawals, and transfers;
(c) Manage investments and securities;
(d) File tax returns and handle tax matters;
(e) Enter into contracts and agreements;
(f) Handle insurance matters;
(g) Manage business operations;
(h) Make healthcare decisions (if applicable under state law);
(i) Handle all other financial and legal matters as I could do personally.`,
      limited: form.powers || `[Specify the limited powers being granted — e.g., "sell the property located at 123 Main Street" or "manage my bank accounts at XYZ Bank during my absence from January 1 to March 31, 2025"]`,
      durable: `(a) Manage all financial affairs and property;
(b) Conduct banking and investment transactions;
(c) File taxes and handle government benefits;
(d) Enter into contracts;
(e) Make healthcare decisions;
(f) Handle all matters necessary for my care and well-being.

THIS POWER OF ATTORNEY SHALL NOT BE AFFECTED BY MY SUBSEQUENT DISABILITY OR INCAPACITY.`,
      financial: `(a) Conduct all banking transactions;
(b) Manage investments, stocks, bonds, and mutual funds;
(c) Buy, sell, or manage real property;
(d) File tax returns and represent me before tax authorities;
(e) Collect debts, manage accounts receivable;
(f) Handle insurance claims and benefits;
(g) Manage retirement accounts and benefits.`,
    };

    const text = `${poaType} POWER OF ATTORNEY

I, ${form.principalName || "[Principal's Full Legal Name]"}, of ${form.principalAddress || "[Principal's Address]"} ("Principal"), hereby appoint:

${form.agentName || "[Agent's Full Legal Name]"}, of ${form.agentAddress || "[Agent's Address]"} ("Agent")

as my true and lawful attorney-in-fact to act on my behalf.
${form.alternateAgent ? `\nIf my primary Agent is unable or unwilling to serve, I appoint ${form.alternateAgent} as my alternate Agent.\n` : ""}
1. POWERS GRANTED

I grant my Agent the following powers:

${defaultPowers[form.type] || defaultPowers.general}

2. EFFECTIVE DATE

This Power of Attorney ${form.effective === "immediate" ? "is effective immediately upon execution" : "shall become effective only upon my disability or incapacity, as certified by my attending physician"}.

3. DURATION

This Power of Attorney shall remain in effect until:
(a) I revoke it in writing;
(b) I become incapacitated (unless this is a Durable Power of Attorney);
(c) My death; or
(d) A court order terminates it.
${form.type === "durable" ? "\nAs a Durable Power of Attorney, this document shall remain in full force and effect even if I become disabled or incapacitated.\n" : ""}
4. THIRD-PARTY RELIANCE

Any third party who receives a copy of this Power of Attorney may rely upon it. Any third party may rely on the Agent's representation that this Power of Attorney has not been revoked.

5. GOVERNING LAW

This Power of Attorney shall be governed by the laws of the State of ${form.state || "[State]"}.

6. SEVERABILITY

If any provision of this Power of Attorney is held invalid, the remaining provisions shall remain in full force and effect.

EXECUTED on ${date}.


_________________________
${form.principalName || "[Principal's Name]"}
Principal


ACKNOWLEDGMENT OF AGENT:

I, ${form.agentName || "[Agent's Name]"}, accept my appointment as Agent and agree to act in the Principal's best interest.

_________________________
${form.agentName || "[Agent's Name]"}
Agent
Date: ________________


NOTARIZATION:

State of ${form.state || "[State]"}
County of ________________

On ${date}, before me, ________________, a notary public, personally appeared ${form.principalName || "[Principal's Name]"}, proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to this instrument and acknowledged that they executed the same.

_________________________
Notary Public
My Commission Expires: ________________`;

    setOutput(text);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.typeOfPoa")}</Label>
          <Select value={form.type} onValueChange={(v) => update("type", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General POA</SelectItem>
              <SelectItem value="limited">Limited POA</SelectItem>
              <SelectItem value="durable">Durable POA</SelectItem>
              <SelectItem value="financial">Financial POA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.effective")}</Label>
          <Select value={form.effective} onValueChange={(v) => update("effective", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediately</SelectItem>
              <SelectItem value="springing">Upon Incapacity (Springing)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.principalNameYou")}</Label>
          <Input placeholder={t("internals.powerOfAttorneyGenerator.placeholders.johnDoe")} value={form.principalName} onChange={(e) => update("principalName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.principalAddress")}</Label>
          <Input placeholder={t("internals.powerOfAttorneyGenerator.placeholders.n123MainStCityState")} value={form.principalAddress} onChange={(e) => update("principalAddress", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.agentName")}</Label>
          <Input placeholder={t("internals.powerOfAttorneyGenerator.placeholders.janeSmith")} value={form.agentName} onChange={(e) => update("agentName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.agentAddress")}</Label>
          <Input placeholder={t("internals.powerOfAttorneyGenerator.placeholders.n456OakAveCityState")} value={form.agentAddress} onChange={(e) => update("agentAddress", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.alternateAgentOptional")}</Label>
          <Input placeholder={t("internals.powerOfAttorneyGenerator.placeholders.bobJohnson")} value={form.alternateAgent} onChange={(e) => update("alternateAgent", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.governingState")}</Label>
          <Input placeholder={t("internals.powerOfAttorneyGenerator.placeholders.california")} value={form.state} onChange={(e) => update("state", e.target.value)} />
        </div>
      </div>
      {form.type === "limited" && (
        <div className="space-y-2">
          <Label>{t("internals.powerOfAttorneyGenerator.labels.specificPowersToGrant")}</Label>
          <Textarea placeholder={t("internals.powerOfAttorneyGenerator.placeholders.describeTheSpecificLimitedPowers")} rows={3} value={form.powers} onChange={(e) => update("powers", e.target.value)} />
        </div>
      )}
      <Button onClick={generate} disabled={!form.principalName || !form.agentName} className="bg-accent text-accent-foreground hover:bg-gold-dark">{t("internals.powerOfAttorneyGenerator.buttons.generatePoa")}</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)}>{t("internals.powerOfAttorneyGenerator.buttons.copyToClipboard")}</Button>
          </div>
          <Textarea value={output} readOnly rows={30} className="font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
