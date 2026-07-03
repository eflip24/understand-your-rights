import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function SignatureBlockGenerator() {
  const { t } = useTranslation(["tools", "common"]);
  const [form, setForm] = useState({ entityType: "individual", name: "", title: "", company: "", name2: "", title2: "", company2: "" });
  const [output, setOutput] = useState("");

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const generate = () => {
    let block = "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date last written below.\n\n";

    const makeBlock = (name: string, title: string, company: string, type: string) => {
      if (type === "individual") {
        return `_________________________\nName: ${name || "[Full Name]"}\nDate: ________________\n`;
      }
      if (type === "corporation") {
        return `${company || "[Company Name]"}\n\nBy: _________________________\nName: ${name || "[Authorized Signatory]"}\nTitle: ${title || "[Title]"}\nDate: ________________\n`;
      }
      if (type === "llc") {
        return `${company || "[LLC Name]"}, a limited liability company\n\nBy: _________________________\nName: ${name || "[Managing Member]"}\nTitle: ${title || "Managing Member"}\nDate: ________________\n`;
      }
      return `${company || "[Partnership Name]"}\n\nBy: _________________________\nName: ${name || "[General Partner]"}\nTitle: ${title || "General Partner"}\nDate: ________________\n`;
    };

    block += "PARTY 1:\n\n" + makeBlock(form.name, form.title, form.company, form.entityType);
    block += "\n\nPARTY 2:\n\n" + makeBlock(form.name2, form.title2, form.company2, form.entityType);

    setOutput(block);
  };

  const showCompany = form.entityType !== "individual";

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t("internals.signatureBlockGenerator.labels.entityType")}</Label>
        <Select value={form.entityType} onValueChange={(v) => update("entityType", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="corporation">Corporation</SelectItem>
            <SelectItem value="llc">LLC</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Party 1</p>
          <div className="space-y-2">
            <Label>{t("internals.signatureBlockGenerator.labels.name")}</Label>
            <Input placeholder={t("internals.signatureBlockGenerator.placeholders.johnDoe")} value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          {showCompany && (
            <>
              <div className="space-y-2">
                <Label>{t("internals.signatureBlockGenerator.labels.title")}</Label>
                <Input placeholder={t("internals.signatureBlockGenerator.placeholders.ceo")} value={form.title} onChange={(e) => update("title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t("internals.signatureBlockGenerator.labels.companyName")}</Label>
                <Input placeholder={t("internals.signatureBlockGenerator.placeholders.acmeCorp")} value={form.company} onChange={(e) => update("company", e.target.value)} />
              </div>
            </>
          )}
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Party 2</p>
          <div className="space-y-2">
            <Label>{t("internals.signatureBlockGenerator.labels.name")}</Label>
            <Input placeholder={t("internals.signatureBlockGenerator.placeholders.janeSmith")} value={form.name2} onChange={(e) => update("name2", e.target.value)} />
          </div>
          {showCompany && (
            <>
              <div className="space-y-2">
                <Label>{t("internals.signatureBlockGenerator.labels.title")}</Label>
                <Input placeholder={t("internals.signatureBlockGenerator.placeholders.cfo")} value={form.title2} onChange={(e) => update("title2", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t("internals.signatureBlockGenerator.labels.companyName")}</Label>
                <Input placeholder={t("internals.signatureBlockGenerator.placeholders.betaInc")} value={form.company2} onChange={(e) => update("company2", e.target.value)} />
              </div>
            </>
          )}
        </div>
      </div>
      <Button onClick={generate} className="bg-accent text-accent-foreground hover:bg-gold-dark">{t("internals.signatureBlockGenerator.buttons.generateSignatureBlock")}</Button>
      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(output)}>{t("internals.signatureBlockGenerator.buttons.copyToClipboard")}</Button>
          </div>
          <Textarea value={output} readOnly rows={15} className="font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
