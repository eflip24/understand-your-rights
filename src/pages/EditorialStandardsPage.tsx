import { ShieldCheck, BookOpen, RefreshCw, Bot, Users, AlertTriangle } from "lucide-react";
import Head from "@/components/seo/Head";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  {
    icon: BookOpen,
    title: "Plain English first",
    body:
      "Every guide and tool is written for non-lawyers. We translate legalese into clear, practical language and add concrete examples whenever possible.",
  },
  {
    icon: ShieldCheck,
    title: "Sourced from primary law",
    body:
      "Statutes, regulations, and court rules cited on this site link to or paraphrase the official text. We do not rely on second-hand summaries when a primary source is available.",
  },
  {
    icon: Bot,
    title: "AI-assisted, human-reviewed",
    body:
      "We use AI (including Google Gemini and OpenAI models) to draft, translate, and structure content faster. Every published page is reviewed by a human editor before going live, and is corrected when readers flag errors.",
  },
  {
    icon: Users,
    title: "Attorney input where it matters",
    body:
      "Pillar guides on high-stakes topics (auto accident, personal injury, employment, criminal, landlord–tenant, insurance, AI & tech) are produced with input from licensed practicing attorneys.",
  },
  {
    icon: RefreshCw,
    title: "Maintained, not fire-and-forget",
    body:
      "We track changes in major statutes and case law. Articles carry a 'last updated' date and are refreshed at least annually, or sooner when the law materially changes.",
  },
  {
    icon: AlertTriangle,
    title: "Honest about limits",
    body:
      "We are not a law firm and we do not give legal advice. Every page that touches a legal topic carries a disclaimer reminding readers to consult a licensed attorney for their specific situation.",
  },
];

export default function EditorialStandardsPage() {
  return (
    <>
      <Head
        title="Editorial Standards — How LegallySpoken Builds & Reviews Content"
        description="How LegallySpoken sources, drafts, reviews, and updates its legal tools and guides. Our policy on AI-assisted content, attorney review, citations, and corrections."
      />

      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20">
        <div className="container max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center rounded-full bg-accent/10 p-3">
            <ShieldCheck className="h-7 w-7 text-accent" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Editorial standards
          </h1>
          <p className="text-lg text-muted-foreground">
            How we research, write, review, and update everything you read on LegallySpoken.
          </p>
        </div>
      </section>

      <section className="container max-w-4xl mx-auto py-14 space-y-12">
        <div className="space-y-4">
          <p className="text-muted-foreground text-lg leading-relaxed">
            LegallySpoken publishes free legal tools, calculators, and plain-English guides covering
            US federal and state law as well as the major EU jurisdictions (Germany, France, Spain,
            Italy, Portugal). Our goal is to give readers reliable, well-sourced starting points —
            not to replace a conversation with a licensed attorney.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The standards below describe exactly how we produce that content, where AI fits in, and
            how we keep things accurate over time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <Card key={p.title}>
              <CardContent className="p-6 space-y-3">
                <div className="rounded-lg bg-accent/10 p-2.5 w-fit">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="font-serif font-semibold text-lg">{p.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">Our content pipeline</h2>
          <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">Topic selection.</strong> We pick topics based on
              real reader searches, US and EU statutory updates, and gaps in existing free legal
              resources.
            </li>
            <li>
              <strong className="text-foreground">Research.</strong> An editor compiles primary
              sources: statutes, regulations, court rules, and (where relevant) leading case law and
              official agency guidance.
            </li>
            <li>
              <strong className="text-foreground">Drafting.</strong> The first draft is produced by
              an editor using AI assistance for structure, examples, and translation. The AI is
              constrained to the research notes — it does not freelance the law.
            </li>
            <li>
              <strong className="text-foreground">Review.</strong> A human editor checks every
              citation, removes anything we cannot stand behind, and rewrites any passage that
              sounds like generic AI prose.
            </li>
            <li>
              <strong className="text-foreground">Publishing.</strong> The page is published with a
              visible "last updated" date and a disclaimer.
            </li>
            <li>
              <strong className="text-foreground">Feedback loop.</strong> Readers can flag errors
              from the page footer or via{" "}
              <a href="/contact" className="text-accent hover:underline">contact@legallyspoken.com</a>.
              Verified corrections are typically applied within 2 business days.
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">AI disclosure</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use AI as a writing and translation tool, not as a legal authority. Specifically:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Blog drafts and some explanatory copy are generated with the help of large language
              models (Google Gemini, OpenAI) and edited by a human before publication.
            </li>
            <li>
              Localized versions of our European guides are produced by translating an
              editor-reviewed English source through an LLM, then spot-checked by a human reviewer.
            </li>
            <li>
              Our interactive tools (contract analyzer, risk checker, chat assistant) explicitly
              call out that their output is AI-generated and is not legal advice.
            </li>
            <li>
              We do not republish AI output as if it were attorney-written, and we do not auto-publish
              anything without human review.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">Corrections policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you spot an error — a wrong statute citation, an out-of-date deadline, a mis-summarized
            rule — please email{" "}
            <a href="mailto:hello@legallyspoken.com" className="text-accent hover:underline">
              hello@legallyspoken.com
            </a>{" "}
            with the URL and a short description. We will verify against primary sources and either
            update the page (noting the change in the "last updated" date) or explain why we believe
            the original was correct.
          </p>
        </div>

        <p className="text-xs text-muted-foreground border-t pt-6">
          <strong>Disclaimer:</strong> LegallySpoken is not a law firm. The content on this site is
          general legal information, not legal advice, and does not create an attorney–client
          relationship. Always consult a licensed attorney for advice on your specific situation.
        </p>
      </section>
    </>
  );
}
