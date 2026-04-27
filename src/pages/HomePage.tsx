import { Link } from "react-router-dom";
import { Search, ArrowRight, BookOpen, Scale, Gavel, Car, HeartPulse, ShieldCheck, Users, Briefcase, AlertTriangle, Home, Cpu, Wrench, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPopularTools, categories } from "@/data/tools";
import HeroBanner from "@/components/home/HeroBanner";
import PopularToolsSection from "@/components/home/PopularToolsSection";
import { JsonLdGraph, websiteSchema, organizationSchema } from "@/components/seo/JsonLd";
import Head from "@/components/seo/Head";
import { useBlogPosts } from "@/hooks/useBlogPosts";

import catContract from "@/assets/cat-contract.png";
import catConsumer from "@/assets/cat-consumer.png";
import catEmployment from "@/assets/cat-employment.png";
import catGenerators from "@/assets/cat-generators.png";
import catAi from "@/assets/cat-ai.png";
import catRealestate from "@/assets/cat-realestate.png";
import catBusiness from "@/assets/cat-business.png";
import catFinance from "@/assets/cat-finance.png";
import catEnergy from "@/assets/cat-energy.png";

const categoryImages: Record<string, string> = {
  contract: catContract,
  consumer: catConsumer,
  employment: catEmployment,
  generators: catGenerators,
  ai: catAi,
  realestate: catRealestate,
  business: catBusiness,
  finance: catFinance,
  energy: catEnergy,
};

export default function HomePage() {
  const popularTools = getPopularTools();
  const { data: blogPosts } = useBlogPosts();
  const latestPosts = blogPosts?.slice(0, 3) || [];

  const legalGuides = [
    { title: "Auto Accident Law", description: "Know your rights after a car crash. Guides on fault, claims, and compensation.", href: "/auto-accident-law", icon: Car },
    { title: "Personal Injury Law", description: "How personal injury claims work, settlements, and what you can recover.", href: "/personal-injury-law", icon: HeartPulse },
    { title: "Insurance Law", description: "Fight denied claims, understand your policy, and know your rights.", href: "/insurance-law", icon: ShieldCheck },
    { title: "Employment Law", description: "Workplace rights, wrongful termination, overtime, and discrimination.", href: "/employment-law", icon: Briefcase },
    { title: "Criminal Law", description: "DUI, arrests, felonies, misdemeanors — what to expect and your rights.", href: "/criminal-law", icon: AlertTriangle },
    { title: "Landlord-Tenant Law", description: "Eviction rules, lease disputes, security deposits, and tenant rights.", href: "/landlord-tenant-law", icon: Home },
    { title: "AI & Tech Law", description: "AI content legality, deepfakes, data privacy, and digital rights.", href: "/ai-tech-law", icon: Cpu },
    { title: "Find a Lawyer", description: "Browse our free attorney directory by practice area near you.", href: "/lawyer-near-me", icon: Users },
  ];

  const legalResources = [
    { title: "Legal Terms Dictionary", description: "50+ legal terms explained in plain English with example clauses.", href: "/legal-terms", icon: BookOpen, count: "50+ terms" },
    { title: "Contract Clauses Guide", description: "Understand common clauses, enforceability, and red flags.", href: "/legal-clauses", icon: Gavel, count: "20+ clauses" },
    { title: "Contract Types Explained", description: "Different contract types, key clauses, and common risks.", href: "/contract-types", icon: Scale, count: "20+ types" },
  ];

  const stats = [
    { value: "100+", label: "Free Tools", icon: Wrench },
    { value: "7", label: "Legal Guides", icon: FileText },
    { value: "50", label: "States Covered", icon: BarChart3 },
    { value: "6,000+", label: "Indexed Pages", icon: Search },
  ];

  return (
    <div>
      <Head
        title="LegallySpoken — Free Legal Tools for Everyday People"
        description="100+ free legal tools to understand contracts, check risks, calculate deadlines, and generate documents. No lawyer required."
      />
      <JsonLdGraph schemas={[websiteSchema(), organizationSchema()]} />

      <HeroBanner />

      {/* Stats Bar */}
      <section className="border-b bg-secondary/50">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 justify-center">
                <stat.icon className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Health Check Teaser */}
      <section className="container py-12">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/5 via-background to-accent/10 p-8 md:p-12 text-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <span>✨</span> 60-Second Quiz
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Not sure which legal tool you need?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Take our Legal Health Check and get personalized tool recommendations instantly — 100% free, no signup required.
            </p>
            <Link to="/legal-health-check">
              <Button size="lg" className="gap-2 text-base">
                Start Legal Health Check <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <PopularToolsSection />

      {/* Categories */}
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Tool Categories</h2>
            <p className="text-muted-foreground">Browse tools by category to find what you need.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/tools/${cat.id}`}>
                <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all text-center p-6 group">
                  <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors overflow-hidden">
                    {categoryImages[cat.id] ? (
                      <img src={categoryImages[cat.id]} alt={cat.label} className="w-14 h-14 object-contain" loading="lazy" />
                    ) : (
                      <cat.icon className="h-7 w-7 text-accent" />
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2">{cat.label}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Guides */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Legal Guides</h2>
          <p className="text-muted-foreground">In-depth guides on high-impact legal topics, written in plain English.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {legalGuides.map((guide) => (
            <Link key={guide.href} to={guide.href}>
              <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all group p-6">
                <div className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors w-fit mb-4">
                  <guide.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{guide.title}</h3>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest from the Blog */}
      {latestPosts.length > 0 && (
        <section className="bg-secondary/50 py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Latest from the Blog</h2>
              <p className="text-muted-foreground">Fresh legal insights and practical guides.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all group overflow-hidden">
                    {post.featured_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardContent className="p-5">
                      {post.published_at && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </p>
                      )}
                      <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/blog">
                <Button variant="outline" className="gap-2">
                  View All Posts <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Legal Resources */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Legal Resources</h2>
          <p className="text-muted-foreground">Browse our library of plain-English legal guides and references.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {legalResources.map((resource) => (
            <Link key={resource.href} to={resource.href}>
              <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all group p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <resource.icon className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">{resource.count}</span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground">Get answers in three simple steps.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-3xl mx-auto">
            {[
              { step: "1", title: "Choose a Tool", desc: "Browse our collection of 100+ free legal tools." },
              { step: "2", title: "Enter Your Details", desc: "Paste text, fill in numbers, or answer questions." },
              { step: "3", title: "Get Results", desc: "Instant analysis, calculations, or generated documents." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-serif font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Understand Your Legal Documents?</h2>
          <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">
            Start using our free tools today. No signup, no credit card, no hassle.
          </p>
          <Link to="/tools">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark gap-2">
              Explore All Tools <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
