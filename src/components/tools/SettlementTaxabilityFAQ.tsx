import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, ExternalLink } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";

type Variant = "personal-injury" | "employment" | "workers-comp" | "generic";

const FAQS: Record<Variant, { q: string; a: string }[]> = {
  "personal-injury": [
    {
      q: "Are personal injury settlements taxable?",
      a: "No. The compensatory portion for physical injury or physical sickness is federal-income-tax-free under IRC § 104(a)(2) — that covers medical bills, pain and suffering tied to the injury, and lost wages tied to the injury. Punitive damages and pre/post-judgment interest ARE taxable as ordinary income.",
    },
    {
      q: "Do I owe tax on the medical portion?",
      a: "No — unless you deducted those medical expenses on a prior return. If you did, that portion becomes taxable under the tax-benefit rule.",
    },
    {
      q: "Are pain and suffering damages taxable?",
      a: "Tax-free when they stem from a physical injury. Pure emotional-distress claims not tied to a physical injury (e.g., defamation) are taxable.",
    },
  ],
  employment: [
    {
      q: "Are employment / discrimination settlements taxable?",
      a: "Generally yes. Back pay and front pay are taxed as wages (W-2, subject to payroll tax). Emotional-distress damages without physical injury are taxable. Only amounts attributable to actual physical injury or sickness are excluded under IRC § 104(a)(2).",
    },
    {
      q: "How are attorney fees taxed in employment cases?",
      a: "For discrimination and whistleblower claims covered by IRC § 62(a)(20), attorney fees are an above-the-line deduction — you're not taxed on the lawyer's share. Ask your attorney to confirm the claim qualifies before signing.",
    },
    {
      q: "Are punitive damages taxable?",
      a: "Yes, always — even in physical-injury cases. Insist the settlement agreement allocate compensatory vs punitive portions in writing.",
    },
  ],
  "workers-comp": [
    {
      q: "Are workers' compensation settlements taxable?",
      a: "No. Workers' comp payments — lump sum, structured, or weekly — are fully exempt from federal income tax under IRC § 104(a)(1). Most states follow the federal rule.",
    },
    {
      q: "What about the SSDI offset?",
      a: "If your workers' comp reduces your SSDI, the offset amount may be treated as taxable SSDI income. The comp itself stays tax-free.",
    },
    {
      q: "Are third-party settlements (e.g., defective equipment) taxable?",
      a: "That's a personal injury claim, not workers' comp — the physical-injury portion is still tax-free under § 104(a)(2), but punitive damages and interest are taxable.",
    },
  ],
  generic: [
    {
      q: "Is my settlement taxable?",
      a: "Depends on what the money replaces. Physical-injury compensatory damages are tax-free (IRC § 104(a)(2)). Lost-wage settlements, punitive damages, and interest are taxable. Ask your attorney to allocate categories in the settlement agreement.",
    },
    {
      q: "Will I get a 1099?",
      a: "Usually yes for the taxable portion. Defense counsel typically issues a 1099-MISC (box 3) for non-wage settlement money and a 1099-INT for interest. Wage components go on a W-2.",
    },
  ],
};

export default function SettlementTaxabilityFAQ({
  variant = "personal-injury",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const lp = useLocalizedPath();
  const faqs = FAQS[variant];

  return (
    <section className={`rounded-lg border bg-muted/30 p-4 sm:p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-4 w-4 text-accent" />
        <h3 className="font-semibold text-foreground text-sm sm:text-base">Are these settlements taxable?</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Quick answer: the physical-injury compensatory portion is tax-free under IRC § 104(a)(2). Wages, punitive damages, and interest are taxable.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`stf-${i}`}>
            <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Link
        to={lp("/personal-injury-settlements/taxability")}
        className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline"
      >
        Full settlement-taxability guide <ExternalLink className="h-3 w-3" />
      </Link>
      <p className="text-[10px] text-muted-foreground mt-2">
        Educational only, not tax advice. Confirm treatment with a CPA before filing.
      </p>
    </section>
  );
}
