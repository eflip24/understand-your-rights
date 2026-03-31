import { Link } from "react-router-dom";
import { Gift, UserCheck, MessageSquare, MapPin, Wrench, Bot, Map, BookOpen, HeartPulse, Heart, Ban, Eye, RefreshCw, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Head from "@/components/seo/Head";

const trustBadges = [
  { icon: Gift, label: "Free Forever" },
  { icon: UserCheck, label: "No Signup Required" },
  { icon: MessageSquare, label: "Plain English" },
  { icon: MapPin, label: "50 States Covered" },
];

const offerings = [
  {
    icon: Wrench,
    title: "100+ Free Legal Tools",
    description: "Instant calculators, generators, checkers, and analyzers across contracts, consumer rights, employment, real estate, finance, and more. No login, no credit card, no hassle.",
  },
  {
    icon: Bot,
    title: "AI-Powered Analysis",
    description: "Tools like our Contract Red Flag Scanner and Terms & Conditions Summarizer help you quickly spot risks and understand complex documents in plain English.",
  },
  {
    icon: Map,
    title: "State-Specific Guides",
    description: "Covering all 50 states with practical information tailored to where you live.",
  },
  {
    icon: BookOpen,
    title: "Legal Terms Dictionary",
    description: "Breaking down complicated legal language into everyday words.",
  },
  {
    icon: HeartPulse,
    title: "Personalized Recommendations",
    description: "Our 60-second Legal Health Check quiz points you to the exact tools you need.",
  },
];

const promises = [
  { icon: Heart, title: "Always Free", description: "Core tools and resources will remain free forever." },
  { icon: Ban, title: "No Nonsense", description: "We explain things clearly, without fluff or upsells." },
  { icon: Eye, title: "Transparency First", description: "Every tool and guide includes clear disclaimers. This is general information only — not personalized legal advice." },
  { icon: RefreshCw, title: "Continuously Improving", description: "We update tools and content as laws change and add new resources based on what real people are searching for." },
];

export default function AboutPage() {
  return (
    <>
      <Head
        title="About Us | LegallySpoken — Free Legal Tools for Everyone"
        description="Learn about LegallySpoken's mission to provide 100+ free legal tools, plain-English guides, and AI-powered analysis for everyday people across all 50 states."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-28">
        <div className="container text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 text-accent">
            <Scale className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Legal clarity, <span className="text-accent">simplified.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Free Legal Tools for Everyday People
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link to="/tools">Explore All Tools</Link>
          </Button>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-accent/10 p-3">
                  <b.icon className="h-6 w-6 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At LegallySpoken, we believe everyone deserves access to clear, practical legal information — without the confusion, high costs, or barriers that usually come with it.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We created this platform because navigating everyday legal matters shouldn't feel overwhelming or require a law degree. Whether you're reviewing a contract, dealing with a landlord issue, checking your employment rights, or trying to understand a new law, we're here to help with simple, free tools that give you instant answers.
          </p>
          <p className="text-foreground text-lg leading-relaxed font-medium">
            To empower everyday people with 100% free, no-signup legal tools and plain-English resources so you can understand your rights, protect yourself, and make smarter decisions — quickly and confidently.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We cut through the legal jargon and deliver practical help exactly when you need it.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container space-y-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center">What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {offerings.map((o) => (
              <Card key={o.title} className="border-border/50">
                <CardContent className="p-6 space-y-3">
                  <div className="rounded-lg bg-accent/10 p-3 w-fit">
                    <o.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-foreground">{o.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{o.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground">
            Everything on LegallySpoken is designed to be fast, mobile-friendly, and genuinely useful.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Who We Are</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            LegallySpoken was built by a small team passionate about access to justice. Our content and tools are developed with input from practicing attorneys and regularly reviewed to reflect current laws (as of 2026).
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We are not a law firm, and we are not here to replace your lawyer. Instead, we act as a helpful starting point — giving you the knowledge and confidence to handle routine legal matters on your own or prepare better questions when you do consult a professional.
          </p>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container space-y-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center">Our Promise to You</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {promises.map((p) => (
              <div key={p.title} className="text-center space-y-3">
                <div className="rounded-full bg-accent/10 p-4 w-fit mx-auto">
                  <p.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why "Legally Spoken" */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Why "Legally Spoken"?</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Because legal matters should be spoken in a language everyone can understand. We turn complex legalese into clear, actionable insights so you can focus on what matters most — protecting yourself, your family, or your business.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            If you've ever felt lost reading a contract, confused by a legal notice, or unsure of your rights, you're exactly why we built LegallySpoken.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We're constantly expanding our library of tools and guides. If there's something specific you'd like to see, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Ready to get started?</h2>
          <p className="text-primary-foreground/70">
            Thank you for trusting us with your legal questions.
            <br />— The LegallySpoken Team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/legal-health-check">Start Your Legal Health Check</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/tools">Browse 100+ Tools</Link>
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-8">
            <strong>Disclaimer:</strong> This site provides general legal information, not legal advice. Consult a qualified attorney for specific legal questions. Last updated March 2026.
          </p>
        </div>
      </section>
    </>
  );
}
