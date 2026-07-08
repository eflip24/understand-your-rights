import { Link } from "react-router-dom";
import { Printer, CheckCircle2, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/what-to-do-after-a-car-accident`;

const STEPS = [
  { title: "1. Stop and secure the scene", body: "Pull over safely, turn on hazards, set out reflective triangles if you have them. Leaving the scene — even a minor fender-bender — can be a criminal hit-and-run charge in every state." },
  { title: "2. Check for injuries — call 911", body: "Any injury, airbag deployment, or vehicle that can't be driven = call 911. In most states you must report crashes with injury or damage above a $500–$2,500 threshold." },
  { title: "3. Do NOT admit fault", body: "Say only: 'I'm not sure what happened.' Apologies get quoted in insurance recordings as admissions and can slash your claim by 30–70%." },
  { title: "4. Photograph everything", body: "Both vehicles, all four corners, plates, VIN, damage close-ups, skid marks, traffic signs, weather, the whole intersection, and the other driver's license/insurance card." },
  { title: "5. Collect witness contact info", body: "Names and phone numbers of everyone who saw it. Independent witnesses are the #1 predictor of a favorable liability finding." },
  { title: "6. Get the police report number", body: "Ask the responding officer for the report number and their badge. Most reports are available in 3–10 days from the department's records portal." },
  { title: "7. Seek medical care within 24–48 hours", body: "Even 'I feel fine' cases — adrenaline masks whiplash, concussion, and internal injury. Gaps in treatment are the insurer's #1 defense to reduce settlement value." },
  { title: "8. Notify your insurer — but say little", body: "Report the accident (required by policy) but decline to give a recorded statement about injuries until you've spoken to a lawyer. Never speak to the OTHER driver's insurer." },
  { title: "9. Preserve evidence and start a file", body: "Keep the damaged clothing, do not repair the car until it's documented, save every medical bill, ER discharge paper, pharmacy receipt, and mileage log to appointments." },
  { title: "10. Call a personal injury attorney before signing anything", body: "Most PI lawyers work on contingency (no fee unless you win). Do this BEFORE accepting any settlement offer — early lowball offers are typically 10–20% of true case value." },
];

const FAQS = [
  { question: "Do I need to call the police for a minor accident?", answer: "In most states you must call police if there's any injury or damage above a set dollar threshold (commonly $500–$2,500). Even for pure fender-benders, an official report protects you if the other driver later changes their story." },
  { question: "Should I go to the hospital if I feel fine?", answer: "Yes — get checked within 24–48 hours. Whiplash, concussion, and internal bleeding often present hours or days later. Treatment gaps over 48 hours are used by insurers to argue you weren't really injured." },
  { question: "Should I talk to the other driver's insurance company?", answer: "No. You have no legal obligation to give a statement to the at-fault driver's insurer, and recorded statements are used to reduce your claim. Refer them to your own insurer or your attorney." },
  { question: "How long do I have to file a car accident claim?", answer: "The statute of limitations ranges from 1 to 6 years depending on state (2 years is most common). But insurance policies require notice within days. File early." },
];

export default function CarAccidentChecklist() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="What to Do After a Car Accident: 10-Step Checklist (2026)"
        description="Free 10-step checklist covering the exact actions to take at the scene, in the 24 hours after, and before you talk to any insurance company. Printable PDF."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "What to Do After a Car Accident: 10-Step Checklist",
            "Step-by-step checklist for the scene, the first 24 hours, and dealing with insurers after a crash.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Auto Accident Law", url: `${SITE}/auto-accident-law` },
            { name: "Car Accident Checklist", url: URL },
          ]),
          faqSchema(FAQS),
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
            The exact sequence — at the scene, in the first 24 hours, and before talking to any insurer. Print this or save it to your phone.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Save as PDF</Button>
          </div>
        </header>

        <Card className="mb-6 border-amber-500/50 bg-amber-500/5">
          <CardContent className="pt-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm">
              <strong>Time-sensitive:</strong> Skid marks fade in hours, surveillance footage overwrites in 14–30 days, and most insurance policies require notice within days. Do steps 1–8 today.
            </p>
          </CardContent>
        </Card>

        <section className="space-y-3 mb-8">
          {STEPS.map((s) => (
            <Card key={s.title}>
              <CardContent className="pt-4 flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold mb-1">{s.title}</h2>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <AdSlot slot="car-accident-checklist-mid" />

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
              <p className="text-sm text-muted-foreground mb-3">Most personal-injury attorneys don't charge unless they recover money for you.</p>
              <Button asChild><Link to={localePath("/lawyer-near-me")}>Find a car-accident lawyer near me</Link></Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
