import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Printer, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import { useLocalizedPath } from "@/i18n/paths";
import { getEditorialRole } from "@/data/editorialTeam";
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";

const SettlementEstimator = lazy(() => import("@/components/tools/SettlementEstimator"));

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/how-pain-and-suffering-is-calculated`;
const REVIEWED = "2026-08-04";

const MULTIPLIERS = [
  { type: "Soft tissue, full recovery in 3–6 months, no imaging findings", mult: "1.0–1.5×", driver: "Subjective complaints only; MIST protocols apply" },
  { type: "Soft tissue with positive MRI, physical therapy, no surgery", mult: "2–3×", driver: "Objective findings unlock the mid range" },
  { type: "Injections (epidural, facet, trigger point) or arthroscopy", mult: "3–4×", driver: "Invasive treatment plus documented pain management" },
  { type: "Fracture with hardware, or single-level fusion/discectomy", mult: "4–5×", driver: "Surgery plus scarring and restricted activity" },
  { type: "Permanent impairment rating under the AMA Guides", mult: "4–6×", driver: "Permanence is the single largest value driver" },
  { type: "Catastrophic — TBI, spinal cord, amputation, disfigurement", mult: "5–10×+", driver: "Life care plan and economist testimony dominate" },
];

const PER_DIEM = [
  { profile: "Hourly worker, $180/day earnings", days: "120 days to MMI", result: "$21,600", note: "Anchored to wage; easy to document with pay stubs" },
  { profile: "Salaried professional, $340/day", days: "180 days to MMI", result: "$61,200", note: "Insurers resist high per-diem rates; expect pushback" },
  { profile: "Retiree or homemaker (no wage anchor)", days: "180 days", result: "Use comparable verdicts instead", note: "Per diem is weakest without an earnings anchor" },
  { profile: "Permanent injury", days: "Life expectancy tables", result: "Rarely accepted pre-suit", note: "Full-life per diem is a trial argument, not a demand-letter argument" },
];

const CAPS = [
  { state: "California", cap: "$430,000 (non-death med-mal, rising to $750,000 by 2033 under AB 35); no cap in ordinary negligence" },
  { state: "Texas", cap: "$250,000 per claimant against physicians in med-mal; no cap in ordinary negligence" },
  { state: "Florida", cap: "No cap — med-mal caps struck down in McCall (2014) and Kalitan (2017)" },
  { state: "Maryland", cap: "Inflation-indexed general cap on non-economic damages, adjusted annually" },
  { state: "Colorado", cap: "Statutory non-economic cap, adjustable by the court on clear and convincing evidence" },
  { state: "Ohio", cap: "Greater of $250,000 or 3× economic damages, capped at $350,000 per plaintiff (exceptions for catastrophic injury)" },
  { state: "New York / Pennsylvania / Illinois", cap: "No cap on non-economic damages in ordinary negligence" },
];

const FAQS = [
  { question: "How is pain and suffering calculated in a personal injury case?", answer: "Two frameworks dominate: the multiplier method (medical specials × 1.5 to 5) and the per diem method (a daily dollar figure × days from injury to Maximum Medical Improvement). Insurers run both through evaluation software such as Colossus or Claim IQ, which converts diagnosis and treatment codes into severity points and produces an authorized settlement range." },
  { question: "What is a typical pain and suffering multiplier?", answer: "1.0–1.5× for soft-tissue-only claims with quick recovery, 2–3× with positive imaging and physical therapy, 3–4× with injections or arthroscopy, 4–5× with surgery or an impairment rating, and 5×+ only for catastrophic injuries such as TBI, spinal cord damage, or disfigurement." },
  { question: "What is the per diem method and when does it work?", answer: "You assign a daily value to the disruption — commonly your daily wage — and multiply by days from injury to Maximum Medical Improvement. It works best for a defined recovery period with a documented earnings anchor. It works poorly for permanent injuries (the resulting number is too large to be credible pre-suit) and for claimants with no wage to anchor to." },
  { question: "Are pain and suffering damages taxable?", answer: "Under IRC §104(a)(2), damages received on account of personal physical injury or physical sickness — including the pain and suffering component — are generally excluded from federal gross income. Punitive damages, interest on the judgment, and emotional distress unconnected to physical injury are taxable. Allocation language in the release matters; confirm with a CPA before signing." },
  { question: "How do insurance companies actually value pain and suffering?", answer: "Major carriers feed the file into evaluation software that scores ICD-10 diagnosis codes, CPT treatment codes, provider type (MD, DO, DC, PT are weighted differently), treatment duration and continuity, imaging and other objective findings, impairment ratings, and jurisdiction-specific verdict history. The adjuster then negotiates within the range the software authorizes." },
  { question: "Does the multiplier apply to lost wages too?", answer: "Usually not. The convention is to apply the multiplier to medical specials only, then add lost wages and other economic damages separately. Some attorneys include wages in the base to argue a larger number; insurers almost always refuse. Either approach is defensible as long as it is applied consistently and explained in the demand." },
  { question: "Is there a cap on pain and suffering damages?", answer: "It depends on the state and the claim type. Most states have no cap in ordinary negligence, but many cap non-economic damages in medical malpractice (California, Texas, Ohio, Maryland and others), and Florida's med-mal caps were struck down as unconstitutional. Claims against government entities carry separate, often much lower, statutory ceilings." },
  { question: "What increases pain and suffering value the most?", answer: "In rough order: permanence (an impairment rating or documented future care), surgery, objective imaging findings, continuous treatment without gaps, documented psychological sequelae such as PTSD or depression, visible scarring, and specific, credible testimony about lost activities — the hobby you stopped, the shift you can't work, the child you can't lift." },
  { question: "What destroys pain and suffering value?", answer: "Treatment gaps over 30 days, pre-existing conditions in the same body region without a clear aggravation opinion, social-media posts showing physical activity, chiropractic-only care with no medical follow-up, missed appointments, inconsistent symptom reporting between providers, and comparative fault." },
  { question: "Can I claim pain and suffering without an attorney?", answer: "Yes, but unrepresented claimants are routinely offered materially less, because the software inputs (properly coded records, an impairment rating, a venue-specific verdict comparison) are rarely assembled correctly without one. Above roughly $5,000 in medical specials, represented claimants typically net more even after a 33.33% contingency fee." },
  { question: "How does comparative fault change the number?", answer: "Your fault percentage reduces the entire award, including pain and suffering. A $60,000 non-economic figure with 25% comparative fault becomes $45,000. In modified comparative states, crossing 50% or 51% eliminates recovery, and in the handful of contributory-negligence jurisdictions any fault can bar it entirely." },
  { question: "Do pain and suffering damages apply in workers' compensation?", answer: "No. Workers' compensation is a no-fault system that pays medical benefits, wage replacement, and permanent-impairment awards, but not pain and suffering. A separate third-party liability claim against a non-employer (a negligent driver, a property owner, an equipment manufacturer) is the usual route to non-economic damages after a workplace injury." },
];

export default function PainAndSufferingExplained() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="How Pain and Suffering Is Calculated (Worked Examples, 2026)"
        description="Multiplier method, per-diem method, and Colossus scoring — how pain and suffering damages are actually valued, with worked examples, state caps, and a calculator."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "How Pain and Suffering Is Calculated",
            "The multiplier method, per-diem method, insurer evaluation software, state caps, and worked examples for valuing non-economic damages.",
            URL,
            { datePublished: "2026-01-26", dateModified: REVIEWED },
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Personal Injury Law", url: `${SITE}/personal-injury-law` },
            { name: "Pain and Suffering Calculation", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={localePath("/personal-injury-law")} className="hover:text-primary">Personal Injury Law</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Pain and Suffering</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-3">How Pain and Suffering Is Calculated</h1>
          <p className="text-lg text-muted-foreground">
            Pain and suffering is usually the largest single line in a personal injury settlement — and the most negotiable. Here is exactly how the number is built: both valuation methods, what the insurer's software is scoring, three worked examples, and the state caps that can override all of it.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Reviewed by the LegallySpoken editorial team · Last updated {new Date(REVIEWED).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · General information, not legal advice.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Save as PDF</Button>
          </div>
        </header>

        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">What "pain and suffering" legally covers</h2>
          <p>
            Pain and suffering is the everyday name for non-economic damages: physical pain, mental anguish, emotional distress, inconvenience, disfigurement, loss of enjoyment of life, and — where recognized — loss of consortium claimed by a spouse. Unlike medical bills and lost wages, there is no receipt for any of it, so the entire category is valued by argument, precedent, and software.
          </p>
          <p>
            That is also why it is where negotiations are won or lost. Economic damages are largely fixed by the records; the non-economic line is where a well-documented file and a poorly documented file diverge by a factor of three on identical injuries.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">The two dominant methods</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Multiplier method.</strong> Total the medical specials (economic damages), then multiply by roughly 1.5–5 based on severity, permanence, and treatment type.</li>
            <li><strong>Per diem method.</strong> Assign a daily dollar figure — commonly the claimant's daily wage — and multiply by the number of days from injury to Maximum Medical Improvement (MMI).</li>
          </ol>
          <p>Competent attorneys calculate both, present the higher one in the demand, and keep the lower one as a fallback. Adjusters do the reverse.</p>
        </section>

        <Card className="mb-8">
          <CardContent className="pt-4 overflow-x-auto">
            <h3 className="font-bold mb-3">Multiplier by injury profile</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Injury profile</TableHead>
                  <TableHead className="whitespace-nowrap">Multiplier</TableHead>
                  <TableHead>What drives it</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MULTIPLIERS.map((m) => (
                  <TableRow key={m.type}>
                    <TableCell>{m.type}</TableCell>
                    <TableCell className="font-mono whitespace-nowrap">{m.mult}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{m.driver}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AdSlot slot="mid-content" />

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 1 — Rear-end whiplash</h2>
          <p><strong>Facts:</strong> $8,000 in ER, chiropractic and four months of physical therapy. Cervical MRI negative. Full recovery. Three weeks off work at $1,000/week.</p>
        </section>

        <Card className="mb-8 bg-muted/40">
          <CardContent className="pt-4">
            <Table>
              <TableBody>
                <TableRow><TableCell>Medical bills</TableCell><TableCell className="text-right font-mono">$8,000</TableCell></TableRow>
                <TableRow><TableCell>Lost wages</TableCell><TableCell className="text-right font-mono">$3,000</TableCell></TableRow>
                <TableRow><TableCell>Pain &amp; suffering (multiplier 2×)</TableCell><TableCell className="text-right font-mono">$16,000</TableCell></TableRow>
                <TableRow className="font-bold border-t-2"><TableCell>Estimated demand</TableCell><TableCell className="text-right font-mono">$27,000</TableCell></TableRow>
                <TableRow><TableCell className="text-muted-foreground text-xs">Typical settlement (60–70% of demand)</TableCell><TableCell className="text-right font-mono text-xs">$16K–$19K</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 2 — Herniated disc with surgery</h2>
          <p><strong>Facts:</strong> $85,000 in medical care (MRI, two epidural steroid injections, single-level discectomy). Four months off work at $60,000/year. Permanent 8% whole-person impairment rating under the AMA Guides.</p>
        </section>

        <Card className="mb-8 bg-muted/40">
          <CardContent className="pt-4">
            <Table>
              <TableBody>
                <TableRow><TableCell>Medical bills</TableCell><TableCell className="text-right font-mono">$85,000</TableCell></TableRow>
                <TableRow><TableCell>Lost wages (4 months)</TableCell><TableCell className="text-right font-mono">$20,000</TableCell></TableRow>
                <TableRow><TableCell>Future medical (life care plan)</TableCell><TableCell className="text-right font-mono">$40,000</TableCell></TableRow>
                <TableRow><TableCell>Pain &amp; suffering (multiplier 4×)</TableCell><TableCell className="text-right font-mono">$340,000</TableCell></TableRow>
                <TableRow className="font-bold border-t-2"><TableCell>Estimated demand</TableCell><TableCell className="text-right font-mono">$485,000</TableCell></TableRow>
                <TableRow><TableCell className="text-muted-foreground text-xs">Typical settlement</TableCell><TableCell className="text-right font-mono text-xs">$280K–$380K</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 3 — the per-diem argument on the same whiplash file</h2>
          <p><strong>Facts:</strong> Same rear-end whiplash. Claimant earns $200/day. Injury to MMI: 180 days.</p>
          <ul className="list-disc list-inside">
            <li>Per diem: $200 × 180 days = <strong>$36,000</strong> in non-economic damages.</li>
            <li>Multiplier method on the same file produced $16,000.</li>
            <li>The attorney demands on the per-diem figure, the adjuster counters on the multiplier, and the non-economic line typically resolves in the $20,000–$25,000 range.</li>
          </ul>
          <p>
            The lesson is not that one method is correct. It is that both are advocacy tools, and the file that supports the higher of the two — with wage records, an MMI date from a treating physician, and a symptom journal — negotiates from the top of the range instead of the bottom.
          </p>
        </section>

        <Card className="mb-8">
          <CardContent className="pt-4 overflow-x-auto">
            <h3 className="font-bold mb-3">When per diem helps and when it backfires</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claimant profile</TableHead>
                  <TableHead>Recovery period</TableHead>
                  <TableHead className="whitespace-nowrap">Per-diem result</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PER_DIEM.map((p) => (
                  <TableRow key={p.profile}>
                    <TableCell>{p.profile}</TableCell>
                    <TableCell className="text-sm">{p.days}</TableCell>
                    <TableCell className="font-mono text-sm whitespace-nowrap">{p.result}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Estimate your own settlement range</h2>
          <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
            <SettlementEstimator />
          </Suspense>
        </section>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">What insurers actually run: Colossus and its peers</h2>
          <p>
            Allstate, GEICO, Liberty Mutual, Travelers, Nationwide, Farmers and others evaluate bodily-injury files with software — most famously Colossus, alongside Claim IQ and internal equivalents. The system converts the medical file into severity points using:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>ICD-10 diagnosis codes and CPT treatment codes</li>
            <li>Provider credentials — MD, DO, DC, PT, LMT — each weighted differently</li>
            <li>Duration, frequency and continuity of treatment</li>
            <li>Objective findings: MRI, CT, EMG, EEG, X-ray positives</li>
            <li>Permanent impairment ratings under the AMA Guides</li>
            <li>Venue: county-level verdict history and jury tendencies</li>
            <li>Duties-under-duress and loss-of-enjoyment inputs, when the demand supplies them</li>
          </ul>
          <p className="mt-2">
            A demand package written for the software cites the exact diagnosis codes, quotes imaging impressions verbatim, states the impairment rating and the physician who assigned it, documents specific activities of daily living lost, and compares two or three verdicts from the same county. A demand letter that simply says "my client is in a lot of pain" produces the bottom of the range every time.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">State caps on non-economic damages</h2>
        </section>

        <Card className="mb-8">
          <CardContent className="pt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Cap on non-economic damages</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CAPS.map((c) => (
                  <TableRow key={c.state}>
                    <TableCell className="font-medium whitespace-nowrap">{c.state}</TableCell>
                    <TableCell className="text-sm">{c.cap}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              Caps are amended by legislation and periodically struck down by state supreme courts, and government-entity claims carry separate, lower ceilings. Confirm the current figure for your jurisdiction and claim type.
            </p>
          </CardContent>
        </Card>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Factors that increase the number</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Objective imaging findings (MRI, CT, EMG) rather than subjective complaints alone</li>
            <li>Surgery — especially open surgery, fusion, or hardware placement</li>
            <li>A permanent impairment rating from an AMA Guides evaluation</li>
            <li>Documented psychological sequelae: PTSD, depression, anxiety, sleep disturbance</li>
            <li>Visible scarring, disfigurement, or amputation</li>
            <li>Specific, concrete loss of enjoyment — the sport stopped, the instrument no longer played, the child no longer lifted</li>
            <li>Consistent treatment attendance through to Maximum Medical Improvement</li>
            <li>A sympathetic venue with recent comparable verdicts</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Factors that shrink it</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Treatment gaps over 30 days, or a delay of more than 72 hours in first treatment</li>
            <li>Pre-existing degenerative findings in the same body region with no aggravation opinion</li>
            <li>Social-media posts showing physical activity during the claimed recovery</li>
            <li>Chiropractic-only treatment with no medical or orthopedic follow-up</li>
            <li>Inconsistent symptom reporting across providers</li>
            <li>Low property damage triggering minor-impact soft-tissue (MIST) defenses</li>
            <li>Comparative negligence reducing the entire award by your fault percentage</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Documenting the story so the math works</h2>
          <p>
            Keep a dated symptom and activity journal from day one: pain scores morning and night, medications, sleep quality, appointments, and the specific things you could not do that day. Ask your treating physician to record functional limitations in the chart rather than only diagnoses. Get an impairment rating if the injury is permanent. And obtain a short statement from a spouse, supervisor, or coach describing the before-and-after — third-party corroboration is what turns a number into a credible one.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Bottom line</h2>
          <p>
            Pain and suffering is math wearing a story. The math — multiplier × specials, or per diem × days — sets the range. The story — imaging, permanence, continuity of care, and documented life impact — decides where in that range you land, and whether a state cap trims the top. Build the documentation before you demand, not after the offer arrives.
          </p>
        </section>

        <section className="my-8">
          <ToolRecommender topic="personal-injury" title="Calculate your pain and suffering" />
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <Card className="my-8 border-amber-500/50 bg-amber-500/5">
          <CardContent className="pt-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm">
              Multipliers, caps, and tax treatment vary by state and by claim type. This page is general information, not legal or tax advice, and does not create an attorney-client relationship.
            </p>
          </CardContent>
        </Card>

        <section className="my-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Get a free case value review</h3>
              <p className="text-sm text-muted-foreground mb-3">A personal injury attorney can pressure-test your estimate against local jury verdicts — and see <Link to={localePath("/attorney-contingency-fee-explained")} className="underline hover:text-primary">how contingency fees affect your net</Link> before you sign.</p>
              <Button asChild><Link to={localePath("/lawyer-near-me")}>Find a personal-injury lawyer near me</Link></Button>
            </CardContent>
          </Card>
        </section>
      <RelatedIntentStrip
        cluster="Personal-injury settlement cluster"
        links={[
          { href: "/personal-injury-settlements", label: "Settlement calculator", blurb: "Runs the multiplier and per-diem yourself" },
          { href: "/auto-insurance-claim-guide", label: "Auto insurance claim guide", blurb: "Colossus, ClaimIQ, and MIST protocols" },
          { href: "/personal-injury-settlements/taxability", label: "Is my settlement taxable?", blurb: "IRC § 104(a)(2) and the allocation trap" },
          { href: "/attorney-contingency-fee-explained", label: "Contingency fees explained", blurb: "Net after attorney fees and liens" },
          { href: "/what-to-do-after-a-car-accident", label: "Car accident checklist", blurb: "The documentation the multiplier depends on" },
        ]}
      />
      </main>
    </>
  );
}
