import { Link } from "react-router-dom";
import { ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/motorcycle-helmet-insurance-laws-by-state`;

// Helmet: universal = all riders, partial = under 18/21 or with permit, none = no law.
// Min liability: state minimum liability BI per person / per accident / property damage.
const ROWS: { state: string; helmet: string; minBI: string; noFault: string; uim: string }[] = [
  { state: "Alabama", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Optional" },
  { state: "Alaska", helmet: "Under 18 + permit", minBI: "50/100/25", noFault: "No", uim: "Required (reject in writing)" },
  { state: "Arizona", helmet: "Under 18", minBI: "25/50/15", noFault: "No", uim: "Offered" },
  { state: "Arkansas", helmet: "Under 21", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "California", helmet: "Universal", minBI: "15/30/5", noFault: "No", uim: "Offered" },
  { state: "Colorado", helmet: "Under 18", minBI: "25/50/15", noFault: "No", uim: "Offered" },
  { state: "Connecticut", helmet: "Under 18", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Delaware", helmet: "Under 19", minBI: "25/50/10", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Florida", helmet: "Under 21 (or w/ $10K med)", minBI: "10/20/10 + PIP", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Georgia", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Hawaii", helmet: "Under 18", minBI: "20/40/10", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Idaho", helmet: "Under 18", minBI: "25/50/15", noFault: "No", uim: "Offered" },
  { state: "Illinois", helmet: "None", minBI: "25/50/20", noFault: "No", uim: "Required" },
  { state: "Indiana", helmet: "Under 18", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Iowa", helmet: "None", minBI: "20/40/15", noFault: "No", uim: "Offered" },
  { state: "Kansas", helmet: "Under 18", minBI: "25/50/25", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Kentucky", helmet: "Under 21 / permit", minBI: "25/50/25", noFault: "Yes (choice)", uim: "Offered" },
  { state: "Louisiana", helmet: "Universal", minBI: "15/30/25", noFault: "No", uim: "Required (reject in writing)" },
  { state: "Maine", helmet: "Under 18 / permit", minBI: "50/100/25", noFault: "No", uim: "Required" },
  { state: "Maryland", helmet: "Universal", minBI: "30/60/15", noFault: "No", uim: "Required" },
  { state: "Massachusetts", helmet: "Universal", minBI: "20/40/5 + PIP", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Michigan", helmet: "Under 21 (or w/ $20K med)", minBI: "50/100/10 + PIP", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Minnesota", helmet: "Under 18 / permit", minBI: "30/60/10 + PIP", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Mississippi", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Missouri", helmet: "Under 26", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Montana", helmet: "Under 18", minBI: "25/50/20", noFault: "No", uim: "Offered" },
  { state: "Nebraska", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Nevada", helmet: "Universal", minBI: "25/50/20", noFault: "No", uim: "Offered" },
  { state: "New Hampshire", helmet: "Under 18", minBI: "25/50/25 (opt)", noFault: "No", uim: "Required if BI" },
  { state: "New Jersey", helmet: "Universal", minBI: "15/30/5 + PIP", noFault: "Yes (choice)", uim: "Required" },
  { state: "New Mexico", helmet: "Under 18", minBI: "25/50/10", noFault: "No", uim: "Offered" },
  { state: "New York", helmet: "Universal", minBI: "25/50/10 + PIP", noFault: "Yes (PIP)", uim: "Required" },
  { state: "North Carolina", helmet: "Universal", minBI: "30/60/25", noFault: "No", uim: "Required" },
  { state: "North Dakota", helmet: "Under 18", minBI: "25/50/25 + PIP", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Ohio", helmet: "Under 18 / permit", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Oklahoma", helmet: "Under 18", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Oregon", helmet: "Universal", minBI: "25/50/20 + PIP", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Pennsylvania", helmet: "Under 21 / <2yr", minBI: "15/30/5 + PIP", noFault: "Yes (choice)", uim: "Offered" },
  { state: "Rhode Island", helmet: "Under 21 / permit", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "South Carolina", helmet: "Under 21", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "South Dakota", helmet: "Under 18", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Tennessee", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Texas", helmet: "Under 21 (or w/ ins/training)", minBI: "30/60/25", noFault: "No", uim: "Offered" },
  { state: "Utah", helmet: "Under 21", minBI: "25/65/15 + PIP", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Vermont", helmet: "Universal", minBI: "25/50/10", noFault: "No", uim: "Required" },
  { state: "Virginia", helmet: "Universal", minBI: "30/60/20", noFault: "No", uim: "Required" },
  { state: "Washington", helmet: "Universal", minBI: "25/50/10", noFault: "No", uim: "Offered" },
  { state: "West Virginia", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Wisconsin", helmet: "Under 18 / permit", minBI: "25/50/10", noFault: "No", uim: "Required" },
  { state: "Wyoming", helmet: "Under 18", minBI: "25/50/20", noFault: "No", uim: "Offered" },
  { state: "District of Columbia", helmet: "Universal", minBI: "25/50/10", noFault: "No", uim: "Required" },
];

const HELMET_DEFENSE: { rule: string; states: string; effect: string }[] = [
  {
    rule: "Helmet non-use inadmissible / barred",
    states: "Florida, Texas, and several states by statute or case law",
    effect: "No damages reduction; the jury never hears whether a helmet was worn.",
  },
  {
    rule: "Admissible only for head and neck injuries",
    states: "Most comparative-negligence states",
    effect: "Typical reduction of 10%–40% on head-injury damages, and only with biomechanical expert proof.",
  },
  {
    rule: "Treated as general comparative fault",
    states: "A minority of jurisdictions",
    effect: "Reduction applied to the whole award, not just the head-injury component.",
  },
  {
    rule: "Contributory negligence states",
    states: "Alabama, Maryland, North Carolina, Virginia, DC",
    effect: "Any rider fault can bar recovery entirely — the highest-stakes version of this argument.",
  },
];

const COST_BANDS: { injury: string; medical: string; band: string }[] = [
  { injury: "Road rash, no fracture", medical: "$3,000 – $12,000", band: "$8,000 – $35,000" },
  { injury: "Single limb fracture with ORIF", medical: "$40,000 – $90,000", band: "$60,000 – $180,000" },
  { injury: "Multiple fractures / pelvis", medical: "$90,000 – $250,000", band: "$150,000 – $600,000" },
  { injury: "Traumatic brain injury (helmeted)", medical: "$150,000 – $500,000", band: "$400,000 – $2,000,000" },
  { injury: "Traumatic brain injury (unhelmeted, non-universal state)", medical: "$150,000 – $500,000", band: "Same range less a 10%–40% helmet-defense reduction" },
  { injury: "Spinal cord injury / paraplegia", medical: "$500,000 – $1,500,000+", band: "Policy-limits driven; usually exceeds available coverage" },
];

const FAQS = [
  { question: "How is the helmet defense actually applied in court?", answer: "Three approaches exist. A minority of states (including Florida and Texas) bar or sharply limit evidence of helmet non-use. Most comparative-negligence states allow it only for head and neck injuries, and only if the defense produces biomechanical expert testimony that a helmet would have prevented or reduced that specific injury. A handful of states apportion the reduction as ordinary comparative fault against the entire award." },
  { question: "Do helmet laws change my insurance premium?", answer: "Not directly — carriers price on rider age, engine displacement, ZIP code, record and coverage limits. Indirectly they matter a great deal: in non-universal states, medical-payments and UM/UIM claims for head injuries are larger, and that loss experience is priced into the state's base rate." },
  { question: "What coverage limits should a rider actually carry?", answer: "State minimums are almost never adequate. A single ORIF surgery plus rehabilitation regularly exceeds $150,000. Practical targets are $100,000/$300,000 bodily injury liability, matching UM/UIM, $10,000 MedPay, and — if you rely on your bike for work — separate disability coverage, because auto policies do not replace long-term income." },
  { question: "Is a passenger covered if they were not wearing a helmet?", answer: "A passenger has their own claim against the at-fault driver and, usually, against the rider's liability coverage. In non-universal states the same helmet-defense argument can reduce the passenger's head-injury damages, and in universal-helmet states an unhelmeted passenger can also expose the rider to a citation." },
  { question: "Does no-fault / PIP apply to motorcycles?", answer: "Often not. Several no-fault states — Michigan and Florida among them — treat motorcycles differently from cars, either excluding them from mandatory PIP or requiring a separate purchase. Riders in those states frequently discover after a crash that they have no first-party medical coverage at all." },
  { question: "What is a lane-splitting citation worth to the insurer?", answer: "California permits lane splitting, Utah and a few others permit limited lane filtering, and most states prohibit both. A citation is not automatic liability, but it hands the adjuster a comparative-fault argument that commonly shaves 10% to 30% off the offer even where the other driver turned across the rider's path." },
  { question: "Do modular or novelty helmets satisfy a universal helmet law?", answer: "Only DOT-compliant helmets meeting FMVSS 218 satisfy these statutes. Novelty shells sold as 'not for highway use' do not, and wearing one in a universal-helmet state can produce both a citation and the same damages argument as wearing nothing." },
  { question: "How long do I have to file a motorcycle injury claim?", answer: "The personal-injury statute of limitations governs, most commonly two or three years from the crash, with shorter notice deadlines — sometimes 60 to 180 days — when a government vehicle or a road-design defect is involved. UM/UIM claims are contractual and can carry separate, sometimes shorter, contract deadlines." },
  { question: "Does a helmet law violation itself prove negligence?", answer: "Generally no. Many states expressly provide that helmet non-use is not negligence per se and is not admissible to show fault for the crash. The fight is narrower: whether it can be used to reduce damages for the head injury specifically." },
  { question: "Does not wearing a helmet reduce my motorcycle accident settlement?", answer: "In many states, yes — under comparative-negligence rules the insurer can argue your head/neck injuries were worsened by not wearing a helmet, potentially reducing damages by 10–40%. A few states (Florida, Texas) limit this 'helmet defense.'" },
  { question: "Do I need special motorcycle insurance beyond state minimums?", answer: "Yes. State minimum liability rarely covers a serious motorcycle injury (surgery + PT often exceeds $100K). Add MedPay ($5K–$10K) and Uninsured/Underinsured Motorist coverage — 1 in 8 US drivers is uninsured." },
  { question: "Which states have universal helmet laws in 2026?", answer: "18 states plus DC still require helmets for ALL riders: AL, CA, GA, LA, MD, MA, MS, NE, NV, NJ, NY, NC, OR, TN, VT, VA, WA, WV, DC. Others require helmets only for riders under 18 or 21." },
];

export default function MotorcycleHelmetLawsByState() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Motorcycle Helmet & Insurance Laws by State (2026)"
        description="State-by-state motorcycle helmet requirements, minimum liability limits, no-fault status, and uninsured motorist rules. Updated 2026."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Motorcycle Helmet & Insurance Laws by State",
            "50-state comparison of motorcycle helmet requirements and minimum insurance limits.",
            URL,
            { datePublished: "2026-01-22", dateModified: "2026-08-08" },
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Auto Accident Law", url: `${SITE}/auto-accident-law` },
            { name: "Motorcycle Laws by State", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={localePath("/auto-accident-law")} className="hover:text-primary">Auto Accident Law</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Motorcycle Laws by State</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Motorcycle Helmet & Insurance Laws by State (2026)</h1>
          <p className="text-lg text-muted-foreground">
            Helmet requirement, minimum liability limits, no-fault status, and uninsured/underinsured motorist rules — for all 50 states plus DC.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Save as PDF</Button>
          </div>
        </header>

        <p className="text-xs text-muted-foreground mb-6">
          By the LegallySpoken Editorial Team · Last reviewed August 8, 2026
        </p>


        <Card className="mb-6">
          <CardContent className="pt-4 text-sm text-muted-foreground space-y-2">
            <p><strong>How to read this table.</strong> "Universal" = all riders must wear a helmet. "Under 18/21" = only younger riders. Minimum BI is bodily injury per person / per accident / property damage in thousands of dollars. "PIP" = personal injury protection is required. UIM = uninsured/underinsured motorist coverage.</p>
            <p><strong>Why it matters for your settlement.</strong> In non-universal states insurers routinely argue the "helmet defense" to reduce head/neck injury awards. And in no-fault states you generally must first exhaust PIP before suing.</p>
          </CardContent>
        </Card>

        <div className="rounded-lg border overflow-x-auto mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>Helmet requirement</TableHead>
                <TableHead>Min liability (BI/PD)</TableHead>
                <TableHead>No-fault?</TableHead>
                <TableHead>UM/UIM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.state}>
                  <TableCell className="font-medium">{r.state}</TableCell>
                  <TableCell>{r.helmet}</TableCell>
                  <TableCell className="font-mono text-xs">{r.minBI}</TableCell>
                  <TableCell>{r.noFault}</TableCell>
                  <TableCell>{r.uim}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AdSlot slot="mid-content" />

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-3">How the "helmet defense" works, by liability rule</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            Whether a helmet was worn rarely decides fault for the collision. It decides how much of the
            head-injury damages survive. Which of the four rules below applies in your state is usually
            worth more to the outcome than the helmet statute itself.
          </p>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule</TableHead>
                  <TableHead>Where it applies</TableHead>
                  <TableHead>Effect on the award</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {HELMET_DEFENSE.map((r) => (
                  <TableRow key={r.rule}>
                    <TableCell className="font-medium">{r.rule}</TableCell>
                    <TableCell>{r.states}</TableCell>
                    <TableCell>{r.effect}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-3">Motorcycle injury severity and typical settlement bands</h2>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Injury pattern</TableHead>
                  <TableHead>Typical medical specials</TableHead>
                  <TableHead>Typical settlement band</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COST_BANDS.map((r) => (
                  <TableRow key={r.injury}>
                    <TableCell className="font-medium">{r.injury}</TableCell>
                    <TableCell className="font-mono text-xs">{r.medical}</TableCell>
                    <TableCell>{r.band}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Bands assume clear liability and adequate coverage. In practice the at-fault driver's policy limit
            caps most motorcycle recoveries, which is why underinsured-motorist coverage matters more to riders
            than to drivers.
          </p>
        </section>

        <section className="my-8">
          <ToolRecommender topic="car-accident" title="Value your motorcycle accident case" />
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

        <RelatedIntentStrip
          cluster="Auto & injury cluster"
          links={[
            { label: "What to do after a car accident", href: "/what-to-do-after-a-car-accident", blurb: "The first 48 hours, evidence and adjuster calls." },
            { label: "Car insurance claim denied", href: "/car-insurance-claim-denied", blurb: "Denial reasons and how to reverse them." },
            { label: "Pain and suffering explained", href: "/pain-and-suffering-calculation", blurb: "Multiplier and per-diem methods." },
            { label: "Personal injury settlements", href: "/personal-injury-settlements", blurb: "How injury claims are valued end to end." },
          ]}
        />

        <section className="my-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Injured in a motorcycle crash?</h3>
              <p className="text-sm text-muted-foreground mb-3">Get a free case review from a motorcycle-accident attorney in your state.</p>
              <Button asChild><Link to={localePath("/lawyer-near-me")}>Find a motorcycle-accident lawyer near me</Link></Button>
            </CardContent>
          </Card>
        </section>

        <p className="text-xs text-muted-foreground mt-8">
          Data compiled from state DMV/DOT sources and IIHS as of 2026. Verify current rules with your state DMV before making legal or insurance decisions.
        </p>
      </main>
    </>
  );
}
