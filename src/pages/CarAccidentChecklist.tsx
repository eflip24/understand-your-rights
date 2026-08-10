import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Printer, CheckCircle2, AlertTriangle, ChevronRight, Clock } from "lucide-react";
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

const AccidentDamageCalculator = lazy(() => import("@/components/tools/AccidentDamageCalculator"));

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/what-to-do-after-a-car-accident`;
const REVIEWED = "2026-08-04";
const AUTHOR = getEditorialRole("personal-injury-editor")?.name;

const STEPS = [
  {
    title: "1. Stop, secure the scene, and turn on hazards",
    body: "Pull to the shoulder or the nearest safe lot only if the vehicles are drivable; otherwise stay put with hazards on and set triangles or flares 100–200 feet back. Leaving before exchanging information is a misdemeanor hit-and-run in every state, and a felony in most states when anyone is injured (e.g., California Vehicle Code §20001, Texas Transportation Code §550.021, Florida Statute §316.027).",
    detail: "Secondary collisions on interstates are the single most common cause of post-crash fatality. If you are in a live traffic lane on a highway and the car moves, move it — nearly every state's 'move over / quick clearance' statute expressly permits it and photos taken before moving are enough to preserve the scene.",
  },
  {
    title: "2. Check for injuries and call 911",
    body: "Call 911 for any injury, airbag deployment, fluid leak, or non-drivable vehicle. Ask dispatch for both police and EMS if anyone reports neck pain, headache, numbness, chest pain, or confusion.",
    detail: "An EMS refusal form ('patient refused transport') is used by adjusters as evidence you were uninjured. If you're unsure, get evaluated — the ambulance bill is claimable damages; the credibility loss is not recoverable.",
  },
  {
    title: "3. Do not admit fault — and do not speculate",
    body: "Say only: 'I'm not sure what happened.' Do not say 'I'm sorry,' 'I didn't see you,' or 'I might have been going a bit fast.' Those phrases are recorded on body cams and in the officer's narrative and are quoted verbatim in liability determinations.",
    detail: "In pure comparative-negligence states, a 20% fault finding costs 20% of your recovery. In modified comparative states (Texas, Colorado, and ~32 others), crossing 50% or 51% eliminates recovery entirely. In Alabama, Maryland, North Carolina, Virginia and D.C., contributory negligence means 1% fault can bar the claim outright.",
  },
  {
    title: "4. Photograph and video everything before anything moves",
    body: "Capture: all four corners of both vehicles, wide shots showing the vehicles' final rest positions relative to lane lines, plates, VIN plate, the other driver's license and insurance card, skid marks, debris fields, traffic control devices, weather and lighting, and any commercial signage on a work vehicle.",
    detail: "Add a 30-second slow video walk-around narrating the time, location, and direction of travel. Metadata (GPS + timestamp) in that file is far harder for a defense expert to attack than your memory nine months later.",
  },
  {
    title: "5. Collect independent witness contact details",
    body: "Names, mobile numbers, and email for anyone who stopped. Independent witnesses — not passengers — are the strongest single predictor of a favorable liability finding when the two drivers' accounts conflict.",
    detail: "Police reports frequently omit witnesses who left before officers arrived. A 20-second voice memo of a witness describing what they saw, recorded with their permission, has repeatedly moved disputed-liability files from 50/50 to 100/0.",
  },
  {
    title: "6. Get the crash report number and the officer's badge",
    body: "Ask for the report ('crash report,' 'CR-3' in Texas, 'HSMV 90010S' in Florida, 'SR-1' supplemental in California). Most agencies post reports to a records portal (LexisNexis BuyCrash, CarFax Police Reports, or the state DOT) within 3–10 business days.",
    detail: "Read it the day it lands. Diagram errors, wrong direction of travel, and mis-keyed insurance information are common and can usually be corrected by a written supplement request to the records division within 30 days.",
  },
  {
    title: "7. Get medical care within 24–48 hours",
    body: "Go to an ER, urgent care, or your primary physician even if you 'feel fine.' Adrenaline and cortisol routinely mask whiplash-associated disorder, concussion, rib fracture, and internal bleeding for 12–72 hours.",
    detail: "Adjuster software flags any gap between the crash date and first treatment date. A gap over 72 hours materially reduces the modeled value of the bodily-injury claim; a gap over 30 days mid-treatment is treated as recovery.",
  },
  {
    title: "8. Notify your own insurer — and say little",
    body: "Your policy's cooperation clause requires prompt notice; failing to report can void coverage. Report the facts (date, place, vehicles, police report number). Decline to characterize injuries or fault while your diagnosis is incomplete.",
    detail: "Open your own MedPay or PIP claim immediately — those are no-fault first-party benefits ($1,000–$10,000 MedPay; $10,000 PIP in Florida) that pay medical bills now and do not depend on proving the other driver was at fault.",
  },
  {
    title: "9. Never give a recorded statement to the other driver's insurer",
    body: "You have no legal obligation to speak to the at-fault carrier. Their adjuster will call within 24–72 hours, be friendly, and ask open questions designed to lock in a low injury description and a partial fault admission.",
    detail: "Standard opener: 'On a scale of one to ten, how are you feeling today?' A cheerful 'I'm okay, thanks' becomes 'claimant reported no significant symptoms' in the file. Refer them to your carrier or your attorney in writing.",
  },
  {
    title: "10. Preserve evidence, open a file, and get a valuation before you sign",
    body: "Keep the damaged clothing and child seat, don't repair the vehicle until the damage is photographed and appraised, and log every bill, mileage entry, missed shift, and symptom in a daily journal.",
    detail: "First offers made in the first 14 days are typically 10–25% of the eventual settlement value, and every release is final. Run the numbers before you accept anything, and never sign a blanket medical authorization — it opens your entire history, not just this crash.",
  },
];

const TIMELINE = [
  { window: "0–30 minutes", action: "Secure scene, 911, photos, witness details, exchange information", why: "Physical evidence and independent witnesses disappear first" },
  { window: "1–24 hours", action: "Medical evaluation; notify your own insurer; write your own narrative while memory is fresh", why: "Treatment gaps and shifting narratives are the two most-used defenses" },
  { window: "1–3 days", action: "Open PIP/MedPay; request the crash report number; decline the other insurer's recorded statement", why: "First-party benefits pay bills before liability is resolved" },
  { window: "3–14 days", action: "Send preservation letters for intersection, business, dashcam and telematics footage", why: "Most private CCTV overwrites in 14–30 days; some systems in 72 hours" },
  { window: "14–45 days", action: "Complete diagnostic imaging; obtain the crash report; document lost wages with an employer letter", why: "Objective findings drive the non-economic damages model" },
  { window: "45 days – MMI", action: "Continue consistent treatment to Maximum Medical Improvement before demanding", why: "Demanding before MMI caps the claim below its true value" },
  { window: "Before the SOL", action: "File suit or settle — 1–6 years depending on state, 2 years most common", why: "A missed statute of limitations extinguishes the claim entirely" },
];

const REPORTING = [
  { state: "California", threshold: "Any injury/death, or property damage over $1,000 (SR-1 to DMV within 10 days)", sol: "2 years (injury) / 3 years (property)", fault: "Pure comparative" },
  { state: "Texas", threshold: "Injury, death, or apparent damage of $1,000+ (CR-3)", sol: "2 years", fault: "Modified 51% bar" },
  { state: "Florida", threshold: "Injury, death, or damage of $500+", sol: "2 years", fault: "Modified 51% bar (2023 reform)" },
  { state: "New York", threshold: "Injury/death, or property damage over $1,000 (MV-104 within 10 days)", sol: "3 years", fault: "Pure comparative" },
  { state: "Illinois", threshold: "Injury/death, or damage over $1,500 ($500 if any driver uninsured)", sol: "2 years", fault: "Modified 51% bar" },
  { state: "Pennsylvania", threshold: "Injury/death, or vehicle not drivable", sol: "2 years", fault: "Modified 51% bar" },
  { state: "Georgia", threshold: "Injury/death, or damage of $500+", sol: "2 years", fault: "Modified 50% bar" },
  { state: "North Carolina", threshold: "Injury/death, or damage of $1,000+", sol: "3 years", fault: "Contributory (1% bars recovery)" },
  { state: "Arizona", threshold: "Injury, death, or any damage", sol: "2 years", fault: "Pure comparative" },
  { state: "Ohio", threshold: "Injury/death, or damage of $1,000+", sol: "2 years", fault: "Modified 51% bar" },
];

const FAQS = [
  { question: "Do I need to call the police for a minor accident?", answer: "Call if there is any injury, or if property damage plausibly exceeds your state's reporting threshold — commonly $500 (Florida, Georgia) to $1,500 (Illinois). Even below the threshold, an official crash report is the cheapest insurance against the other driver changing their story or later claiming an injury you can't disprove." },
  { question: "Should I go to the hospital if I feel fine?", answer: "Get evaluated within 24–48 hours. Whiplash-associated disorder, concussion, and internal bleeding commonly present hours to days later. Claims-evaluation software explicitly scores the interval between crash date and first treatment date; a gap beyond 72 hours reduces the modeled value of the injury claim even when the injury is real." },
  { question: "Should I talk to the other driver's insurance company?", answer: "No. You owe a duty of cooperation to your own insurer only. Recorded statements to the adverse carrier are used to fix an early, understated injury description and to extract partial fault admissions. Provide the crash report number in writing and nothing else." },
  { question: "How long do I have to file a car accident claim?", answer: "Statutes of limitations run 1 year (Kentucky, Tennessee, Louisiana for most claims) to 6 years (Maine, North Dakota), with 2 years the most common. Claims against a city, county, or state agency often require a formal notice of claim within 60–180 days — far shorter than the general statute." },
  { question: "What if the other driver has no insurance?", answer: "Open a UM (uninsured motorist) claim under your own policy. UM/UIM steps into the shoes of the at-fault driver and pays bodily injury damages up to your selected limit. Some states also allow stacking of UM limits across vehicles on the same policy, which can multiply the available coverage." },
  { question: "Who pays my medical bills while the claim is pending?", answer: "Your MedPay ($1,000–$10,000) or, in no-fault states, PIP (e.g., $10,000 in Florida, with the 14-day treatment rule) pays first regardless of fault. Health insurance covers the balance and typically asserts a subrogation lien against the eventual settlement. The at-fault carrier pays nothing until final settlement." },
  { question: "Should I use my own collision coverage or wait for the other insurer?", answer: "Using your collision coverage gets your car repaired in days rather than weeks; your insurer then pursues subrogation and refunds your deductible if it recovers. Waiting on a liability adjuster who has not yet accepted fault can leave a vehicle unrepaired for a month or more." },
  { question: "How much is my car accident claim worth?", answer: "Economic damages (medical bills, lost wages, future care, property damage) are added, then non-economic damages are modeled — usually 1.5–5× the medical specials depending on objective findings, surgery, and permanence — then reduced by your comparative-fault percentage and by liens. Run the numbers with the calculator above before responding to any offer." },
  { question: "What if the crash was partly my fault?", answer: "You can still recover in 46 jurisdictions. Pure comparative states reduce recovery by your fault share with no cutoff; modified comparative states bar recovery at 50% or 51%. Alabama, Maryland, North Carolina, Virginia and Washington D.C. apply contributory negligence, where any fault at all can bar recovery — which is exactly why step 3 matters." },
  { question: "Do I need a lawyer for a car accident?", answer: "For property damage only, usually not. For any claim involving imaging findings, injections, surgery, a disputed-liability crash, a commercial or government vehicle, or a policy-limits question, representation typically increases the net recovery even after a 33.33% contingency fee. Consultations are free and fees are contingent." },
  { question: "How long does a car accident settlement take?", answer: "Property-damage-only claims resolve in 2–6 weeks. Soft-tissue injury claims typically settle 2–5 months after Maximum Medical Improvement. Surgical or disputed-liability claims run 9–24 months, and filed lawsuits that reach trial commonly take 18–36 months." },
  { question: "What should I never do after a car accident?", answer: "Never leave the scene, admit fault, guess at speeds or distances, post about the crash or your activities on social media, sign a blanket medical authorization, accept a first offer inside 14 days, or repair the vehicle before it is photographed and appraised." },
];

export default function CarAccidentChecklist() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="What to Do After a Car Accident: 10-Step Checklist (2026)"
        description="The exact 10 steps to take after a crash — scene evidence, the 72-hour medical window, insurer traps, state reporting thresholds, and how to value your claim before you sign."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "What to Do After a Car Accident: 10-Step Checklist",
            "Step-by-step checklist for the scene, the first 72 hours, state reporting thresholds, insurer tactics, and claim valuation after a crash.",
            URL,
            { datePublished: "2026-01-12", dateModified: REVIEWED, author: AUTHOR },
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Auto Accident Law", url: `${SITE}/auto-accident-law` },
            { name: "Car Accident Checklist", url: URL },
          ]),
          faqSchema(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "What to do after a car accident",
            description: "Ten sequential steps to protect your health, your evidence, and your insurance claim after a motor-vehicle collision.",
            totalTime: "P3D",
            step: STEPS.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title.replace(/^\d+\.\s*/, ""),
              text: s.body,
              url: `${URL}#step-${i + 1}`,
            })),
          },
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={localePath("/auto-accident-law")} className="hover:text-primary">Auto Accident Law</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Car Accident Checklist</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-3">What to Do After a Car Accident: 10-Step Checklist</h1>
          <p className="text-lg text-muted-foreground">
            The exact sequence — at the scene, in the first 72 hours, and before you talk to any insurer. Includes state reporting thresholds, the deadlines that quietly kill claims, and a calculator to value your damages before you respond to an offer.
          </p>
          <AuthorByline authorId="personal-injury-editor" reviewedAt={REVIEWED} compact className="mt-3" />
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Save as PDF</Button>
          </div>
        </header>

        <Card className="mb-6 border-amber-500/50 bg-amber-500/5">
          <CardContent className="pt-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm">
              <strong>Time-sensitive:</strong> Skid marks fade within hours, most private CCTV overwrites in 14–30 days, event data recorder ("black box") data can be lost when the vehicle is totaled and sold at salvage, and nearly every policy requires prompt notice. Do steps 1–8 today.
            </p>
          </CardContent>
        </Card>

        <section className="space-y-3 mb-8">
          {STEPS.map((s, i) => (
            <Card key={s.title} id={`step-${i + 1}`}>
              <CardContent className="pt-4 flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold mb-1">{s.title}</h2>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                  <p className="text-sm text-muted-foreground mt-2 border-l-2 border-primary/30 pl-3">{s.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <AdSlot slot="mid-content" />

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />The first 72 hours, then the first year</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Claims are rarely lost at the scene. They are lost in the quiet gaps — the week nobody requested the footage, the month with no treatment, the deadline nobody diaried.
          </p>
          <Card>
            <CardContent className="pt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Window</TableHead>
                    <TableHead>What to do</TableHead>
                    <TableHead>Why it matters</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TIMELINE.map((t) => (
                    <TableRow key={t.window}>
                      <TableCell className="font-medium whitespace-nowrap">{t.window}</TableCell>
                      <TableCell className="text-sm">{t.action}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{t.why}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-2">Crash-reporting thresholds, filing deadlines, and fault rules</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Three state rules decide most of what happens next: when you are legally required to report the crash, how long you have to bring a claim, and how your own share of fault reduces the recovery.
          </p>
          <Card>
            <CardContent className="pt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableHead>Must report when</TableHead>
                    <TableHead>Injury filing deadline</TableHead>
                    <TableHead>Fault rule</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {REPORTING.map((r) => (
                    <TableRow key={r.state}>
                      <TableCell className="font-medium whitespace-nowrap">{r.state}</TableCell>
                      <TableCell className="text-sm">{r.threshold}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{r.sol}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.fault}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-3">
                Thresholds and deadlines change with legislative sessions — confirm against your state's current vehicle code before relying on a date. Claims against public entities usually carry a separate 60–180 day notice requirement.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="prose prose-sm max-w-none my-10">
          <h2 className="text-2xl font-bold mt-6 mb-3">What the other driver's adjuster is actually doing</h2>
          <p>
            Within 24–72 hours a bodily-injury adjuster at GEICO, State Farm, Progressive, Allstate, USAA, Liberty Mutual, Nationwide or Travelers opens a file and begins scoring it. Modern carriers run injury claims through evaluation platforms — Colossus, Claim IQ, and similar — that convert your medical records into severity points using ICD-10 diagnosis codes, CPT treatment codes, provider type, treatment duration, imaging findings, impairment ratings under the AMA Guides, and venue-specific verdict history. The output is a settlement range the adjuster is authorized to pay.
          </p>
          <p>
            Three inputs move that range more than anything else: objective findings (MRI, CT, EMG rather than subjective complaints alone), treatment continuity (no gaps), and permanence (an impairment rating or a physician's statement of future care). A crash with $6,000 of chiropractic-only care and a 40-day gap will model far below a crash with $6,000 of care that includes an MRI, an orthopedic consult, and continuous treatment to Maximum Medical Improvement.
          </p>
          <p>
            Minor-impact soft-tissue ("MIST") protocols are triggered by low property damage. If the photos show minimal bumper damage, expect an early nuisance-value offer and a defense argument that the forces involved could not cause injury. This is precisely why step 4 asks for wide-angle photos of vehicle positions and interior damage, not just a close-up of the bumper.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">The coverages that actually pay</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Bodily Injury (BI) liability</strong> — the at-fault driver's coverage for your injuries. State minimums are often just $25,000/$50,000 (and $15,000 in California and Florida), which is why policy limits, not case value, cap most settlements.</li>
            <li><strong>Property Damage (PD) liability</strong> — repairs or actual cash value of your vehicle, plus diminished value in states that recognize it.</li>
            <li><strong>UM/UIM</strong> — your own coverage when the at-fault driver is uninsured or underinsured. In many claims this is the largest available pot of money.</li>
            <li><strong>MedPay / PIP</strong> — first-party medical benefits payable regardless of fault. Florida PIP requires initial treatment within 14 days or benefits are forfeited.</li>
            <li><strong>Collision</strong> — your own vehicle repair, subject to deductible, refunded if your insurer subrogates successfully.</li>
            <li><strong>Rental reimbursement and loss of use</strong> — frequently overlooked and routinely payable.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Evidence to preserve in writing this week</h2>
          <p>
            Send a short preservation letter (email is fine) to any business with a camera facing the scene, to the other driver's employer if a commercial vehicle was involved, and to your own insurer regarding telematics or dashcam data. Ask specifically for: exterior CCTV for the 30 minutes surrounding the crash, event data recorder downloads, dispatch and ELD logs for commercial vehicles, and 911 audio from the local PSAP. Nearly all of it is destroyed on an automatic retention cycle, and once it is gone, no court order retrieves it.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Bottom line</h2>
          <p>
            The crash is one moment; the claim is a documentation exercise that runs for months. Photograph everything before it moves, get evaluated inside 48 hours, treat consistently to Maximum Medical Improvement, keep the other carrier at arm's length, and value the claim with real numbers before you respond to any offer.
          </p>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Estimate your accident damages</h2>
          <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
            <AccidentDamageCalculator />
          </Suspense>
        </section>

        <section className="my-8">
          <ToolRecommender topic="car-accident" title="Value your case with our free tools" />
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

        <section className="my-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Talk to a local car-accident lawyer (free consultation)</h3>
              <p className="text-sm text-muted-foreground mb-3">Most personal-injury attorneys don't charge unless they recover money for you — see exactly how those fees work in our <Link to={localePath("/attorney-contingency-fee-explained")} className="underline hover:text-primary">contingency fee breakdown</Link>.</p>
              <Button asChild><Link to={localePath("/lawyer-near-me")}>Find a car-accident lawyer near me</Link></Button>
            </CardContent>
          </Card>
        </section>
      <RelatedIntentStrip
        cluster="Auto-accident cluster"
        links={[
          { href: "/auto-insurance-claim-guide", label: "Auto insurance claim guide", blurb: "How adjusters value BI, UM/UIM, MedPay, PIP" },
          { href: "/personal-injury-settlements/auto-accident", label: "Auto-accident settlement calculator", blurb: "Estimate your case value" },
          { href: "/how-pain-and-suffering-is-calculated", label: "Pain & suffering explained", blurb: "The multiplier the adjuster is running" },
          { href: "/attorney-contingency-fee-explained", label: "Contingency fees explained", blurb: "What you actually take home" },
          { href: "/motorcycle-helmet-insurance-laws-by-state", label: "Motorcycle helmet laws by state", blurb: "How helmet laws affect BI recovery" },
        ]}
      />
      </main>
    </>
  );
}
