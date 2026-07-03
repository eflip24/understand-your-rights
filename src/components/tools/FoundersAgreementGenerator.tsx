import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export default function FoundersAgreementGenerator() {
  const { t } = useTranslation(["tools", "common"]);
  const [company, setCompany] = useState("");
  const [founders, setFounders] = useState("");
  const [vesting, setVesting] = useState("4 years with a 1-year cliff");

  const doc = `FOUNDERS' AGREEMENT — ${(company || "[Company]").toUpperCase()}

Effective Date: ${new Date().toLocaleDateString()}

1. FOUNDERS & EQUITY SPLIT
${founders || "[Name — % equity — role]"}

2. VESTING. All founder equity is subject to a vesting schedule of ${vesting}. Unvested shares are forfeited upon departure for any reason.

3. INTELLECTUAL PROPERTY ASSIGNMENT. Each founder hereby assigns to the Company all IP, code, designs, and inventions created in connection with the Company's business, whether before or after the effective date.

4. ROLES & COMMITMENT. Each founder will work full-time on the Company. Any outside business activity must be disclosed and approved.

5. DECISION-MAKING. Day-to-day decisions: by the assigned role-holder. Major decisions (financing, hiring of executives, sale, dissolution): unanimous founder consent.

6. CONFIDENTIALITY. Founders will keep all Company information confidential during and after their involvement.

7. NON-COMPETE / NON-SOLICIT. For 12 months after departure, a founder will not (i) start a competing business in the same market, or (ii) solicit Company employees, customers, or investors.

8. DEPARTURE. A founder who leaves voluntarily forfeits unvested shares. Vested shares are subject to a Company right of first refusal at fair market value.

9. DISPUTE RESOLUTION. Disputes will first go to mediation, then binding arbitration.

10. ENTIRE AGREEMENT. This document is the entire agreement among the founders and supersedes all prior discussions. It is not a substitute for formal incorporation documents.

Founder Signatures:

____________________________   Date: ___________
____________________________   Date: ___________`;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label>{t("internals.foundersAgreementGenerator.labels.companyName")}</Label><Input value={company} onChange={e => setCompany(e.target.value)} /></div>
        <div><Label>{t("internals.foundersAgreementGenerator.labels.vestingSchedule")}</Label><Input value={vesting} onChange={e => setVesting(e.target.value)} /></div>
        <div className="sm:col-span-2"><Label>{t("internals.foundersAgreementGenerator.labels.foundersNamePercentRole")}</Label><Textarea value={founders} onChange={e => setFounders(e.target.value)} rows={4} placeholder={t("internals.foundersAgreementGenerator.placeholders.janeDoe50PercentCeoAnd")} /></div>
      </div>
      <Textarea value={doc} readOnly rows={18} className="font-mono text-xs" />
      <Button onClick={() => navigator.clipboard.writeText(doc)}>{t("internals.foundersAgreementGenerator.buttons.copyAgreement")}</Button>
    </div>
  );
}
