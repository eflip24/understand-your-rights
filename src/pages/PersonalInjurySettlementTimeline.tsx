import { Link } from "react-router-dom";
import { ChevronRight, Printer, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/personal-injury-settlements/timeline`;

const STEPS = [
  {
    step: "Step 1 — Immediate response (Day 0 to Week 1)",
    time: "0–7 days",
    what: "Get medical treatment the same day, even if you feel fine. Report the incident to your own insurer only. Preserve evidence: photos, dashcam, torn clothing, defective product. Do NOT give a recorded statement to the other side's insurer.",
    why: "Gaps in treatment become the insurer's #1 defense (\"if you were really hurt, you'd have seen a doctor\"). A 48-hour gap can knock 20–40% off case value.",
  },
  {
    step: "Step 2 — Investigation and evidence lock-down",
    time: "Weeks 1–8",
    what: "Attorney gathers the police report, 911 audio, surveillance video, cell records, EDR/black-box data, and witness statements. A spoliation letter goes to anyone holding physical evidence (trucking companies must preserve HOS logs; retailers must preserve floor-inspection logs).",
    why: "Video and telematics get overwritten in 14–90 days. Missing this window is unrecoverable.",
  },
  {
    step: "Step 3 — Treatment to Maximum Medical Improvement (MMI)",
    time: "Month 1 to MMI (typically 3–18 months)",
    what: "Continue every recommended treatment: PT, injections, imaging, surgery, follow-ups. MMI = your doctor confirms further treatment won't improve your condition. Only then can you accurately value future medical costs.",
    why: "Settling before MMI is the #1 mistake. Once you sign, you cannot reopen the claim — even if you need surgery a month later.",
  },
  {
    step: "Step 4 — Demand letter",
    time: "Month 3–12 (after MMI)",
    what: "Attorney sends a formal demand: medical records, bills, wage-loss documentation, expert reports, and a narrative of pain and suffering. Anchor high — 3–5× medicals for pain and suffering plus future costs is standard.",
    why: "Insurer counter-offers typically land at 40–60% of demand. Anchor low = you leave money on the table you can never claw back.",
  },
  {
    step: "Step 5 — Negotiation",
    time: "1–3 months after demand",
    what: "Written back-and-forth. Attorney pushes the adjuster through their reserve authority. Mediation is common on cases above ~$100K. Most cases settle here at 60–80% of the initial demand.",
    why: "This is where experience earns fees. Adjusters have public dockets showing which lawyers actually try cases — they pay more to lawyers with trial credibility.",
  },
  {
    step: "Step 6 — Lawsuit and trial (if negotiation stalls)",
    time: "12–36 months if filed",
    what: "Complaint filed before the statute of limitations. Discovery, depositions, motions, mediation, trial. 95%+ of filed cases still settle before verdict — but filing suit typically bumps offers 30–100%.",
    why: "The threat of trial (and a jury) is what forces top-dollar offers. Only lawyers with actual trial records get this leverage.",
  },
];

const FACTORS = [
  { factor: "Case complexity", faster: "Clear liability, one defendant", slower: "Multiple defendants, disputed fault, product liability" },
  { factor: "Injury severity", faster: "Soft tissue, quick MMI", slower: "Surgery, TBI, permanent impairment (long MMI)" },
  { factor: "Insurance posture", faster: "Bad-faith exposure, clear liability", slower: "Aggressive TPAs, low policy limits vs damages" },
  { factor: "Venue", faster: "Plaintiff-friendly urban counties", slower: "Defense-friendly rural counties, tort-reform states" },
  { factor: "Lien resolution", faster: "Small hospital lien, private PPO", slower: "Medicare/Medicaid, ERISA, VA — negotiation adds 2–6 months" },
];

const FAQS = [
  {
    question: "How long does a personal injury settlement take from start to finish?",
    answer:
      "Most cases resolve in 6–24 months. Simple soft-tissue claims with clear liability settle in 4–8 months. Cases requiring surgery or filed lawsuits typically take 18–36 months. Wait for Maximum Medical Improvement before demanding — settling early is the biggest driver of undervaluation.",
  },
  {
    question: "Why does my case seem stalled after the demand letter?",
    answer:
      "The insurer's initial response window is usually 30–60 days but adjusters commonly ask for extensions. Silence past 90 days usually means the adjuster is waiting for supervisor authority or preparing a lowball counter. Your attorney should escalate with a 'demand for authority' letter or file suit.",
  },
  {
    question: "How long after I settle do I get paid?",
    answer:
      "Typically 4–8 weeks. Insurer cuts the settlement check to the law firm's IOLTA trust account (5–15 days), the firm resolves medical liens (2–6 weeks), then disburses your net after fees and liens. Medicare/Medicaid liens can extend disbursement past 90 days.",
  },
  {
    question: "Should I settle before I finish treatment?",
    answer:
      "No — almost never. Once you sign a release, you can't come back for more even if you need surgery next month. Wait for Maximum Medical Improvement (MMI). The only common exceptions are low-policy-limit cases where the insurer tenders policy limits early.",
  },
  {
    question: "Does hiring a lawyer slow the settlement down?",
    answer:
      "Slightly at first (case build-up), but represented claimants recover 3–4× more on average even after 33% contingency fees (Insurance Research Council studies). The insurer's first-offer strategy assumes an unrepresented claimant.",
  },
  {
    question: "What if the statute of limitations is close?",
    answer:
      "Your attorney files a lawsuit to preserve the claim, then continues negotiating. Missing the deadline permanently kills the case. Use our Statute of Limitations Lookup to confirm your state's deadline — it can be as short as 1 year (KY, LA, TN).",
  },
];

export default function PersonalInjurySettlementTimeline() {
  const lp = useLocalizedPath();

  return (
    <div className="container py-8 max-w-4xl">
      <Tier3Head
        title="Personal Injury Settlement Timeline: 6 Steps and How Long Each Takes"
        description="Detailed personal injury settlement timeline from crash day through disbursement: investigation, MMI, demand, negotiation, lawsuit, and payout. Realistic ranges and delay factors."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Personal Injury Settlement Timeline: 6 Steps and How Long Each Takes",
            "Step-by-step personal injury settlement timeline with realistic time ranges, common delay factors, and how to avoid the most expensive mistakes.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Personal Injury Settlements", url: `${SITE}/personal-injury-settlements` },
            { name: "Timeline", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp("/personal-injury-settlements")} className="hover:text-foreground">Personal Injury Settlements</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Timeline</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          Personal Injury Settlement Timeline: 6 Steps and How Long Each Takes
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Most personal injury cases settle in <strong>6 to 24 months</strong>. Here's exactly what happens at each step, realistic time ranges, and the mistakes that push cases past the two-year mark.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button size="sm" variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" /> Save as PDF
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={lp("/personal-injury-settlements")}>Estimate My Case Value</Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={lp("/tools/consumer/statute-of-limitations-lookup")}>Check Statute of Limitations</Link>
        </Button>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-accent" /> The 6-Step Timeline
        </h2>
        <ol className="space-y-4">
          {STEPS.map((s) => (
            <li key={s.step} className="rounded-lg border p-4">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <p className="font-bold text-foreground">{s.step}</p>
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent font-medium">{s.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">What happens:</strong> {s.what}</p>
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Why it matters:</strong> {s.why}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">What Speeds Up or Slows Down Your Case</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-3 font-semibold">Factor</th>
                <th className="text-left py-2 pr-3 font-semibold text-emerald-700">Faster</th>
                <th className="text-left py-2 font-semibold text-destructive">Slower</th>
              </tr>
            </thead>
            <tbody>
              {FACTORS.map((f) => (
                <tr key={f.factor} className="border-b last:border-0">
                  <td className="py-2 pr-3 font-medium text-foreground">{f.factor}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{f.faster}</td>
                  <td className="py-2 text-muted-foreground">{f.slower}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-10 rounded-lg border border-amber-500/40 bg-amber-500/5 p-5">
        <p className="flex items-center gap-2 font-bold text-amber-700 mb-2">
          <AlertTriangle className="h-5 w-5" /> The one mistake that costs the most
        </p>
        <p className="text-sm text-muted-foreground">
          Settling before Maximum Medical Improvement. Once you sign the release, the case is closed — even if you need surgery a month later. Wait for MMI, then demand.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Timeline FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`tl-${i}`}>
              <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Related Tools & Guides</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card><CardContent className="pt-4">
            <Link to={lp("/personal-injury-settlements")} className="font-semibold text-foreground hover:text-accent">Settlement Value Calculator</Link>
            <p className="text-xs text-muted-foreground mt-1">Estimate your case worth using multiplier or per-diem method.</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4">
            <Link to={lp("/personal-injury-settlements/taxability")} className="font-semibold text-foreground hover:text-accent">Are Settlements Taxable?</Link>
            <p className="text-xs text-muted-foreground mt-1">IRS treatment, punitive damages, 1099 handling, printable checklist.</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4">
            <Link to={lp("/tools/consumer/attorney-fee-calculator")} className="font-semibold text-foreground hover:text-accent">Attorney Fee Calculator</Link>
            <p className="text-xs text-muted-foreground mt-1">See your net recovery after contingency fees and costs.</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4">
            <Link to={lp("/tools/consumer/medical-lien-subrogation-estimator")} className="font-semibold text-foreground hover:text-accent">Medical Lien Estimator</Link>
            <p className="text-xs text-muted-foreground mt-1">Model how much of your settlement goes to Medicare or the hospital.</p>
          </CardContent></Card>
        </div>
      </section>

      <ToolRecommender topic="personal-injury" />

      <AdSlot slot="end-of-article" className="mb-8" />

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> Educational timeline only, not legal advice. Actual case duration varies by jurisdiction, venue, injury severity, and insurer posture. Consult a licensed personal injury attorney for your specific situation.
        </p>
      </div>
    </div>
  );
}
