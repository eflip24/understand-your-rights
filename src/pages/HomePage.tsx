import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, BookOpen, Scale, Gavel, Car, HeartPulse, ShieldCheck, Users, Briefcase, AlertTriangle, Home, Cpu, Wrench, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPopularTools, categories } from "@/data/tools";
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const popularTools = getPopularTools();
  const { data: blogPosts } = useBlogPosts();
  const latestPosts = blogPosts?.slice(0, 3) || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const legalGuides = [
    { title: "Auto Accident Law", description: "Know your rights after a car crash. Guides on fault, claims, and compensation.", href: "/auto-accident-law", icon: Car },
    { title: "Personal Injury Law", description: "How personal injury claims work, settlements, and what you can recover.", href: "/personal-injury-law", icon: HeartPulse },
    { title: "Insurance Law", description: "Fight denied claims, understand your policy, and know your rights.", href: "/insurance-law", icon: ShieldCheck },
    { title: "Employment Law", description: "Workplace rights, wrongful termination, overtime, and discrimination.", href: "/employment-law", icon: Briefcase },
    { title: "Criminal Law", description: "DUI, arrests, felonies, misdemeanors — what to expect and your rights.", href: "/criminal-law", icon: AlertTriangle },
    { title: "Landlord-Tenant Law", description: "Eviction rules, lease disputes, security deposits, and tenant rights.", href: "/landlord-tenant-law", icon: Home },
    { title: "AI & Tech Law", description: "AI content legality, deepfakes, data privacy, and digital rights.", href: "/ai-tech-law", icon: Cpu },
    { title: "Find a Lawyer", description: "Browse our free attorney directory by practice area near you.", href: "/local-lawyers", icon: Users },
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-[hsl(222,50%,8%)] min-h-[520px] flex items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] animate-pulse-glow">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(42,55%,55%,0.12),hsl(42,55%,45%,0.04)_50%,transparent_70%)] blur-3xl" />
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-[40%] -translate-y-1/2 w-[500px] h-[400px] animate-pulse-glow-delayed">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(222,50%,40%,0.08),transparent_60%)] blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(hsl(0,0%,100%,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(42,55%,55%,0.3)] to-transparent" />

        <div className="container relative py-24 md:py-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(42,55%,55%,0.25)] bg-[hsl(42,55%,55%,0.06)] backdrop-blur-sm mb-8 animate-fade-in">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(42,55%,60%)] animate-pulse" />
              <span className="text-xs font-medium tracking-wide text-[hsl(42,40%,70%)]">100+ Free Legal Tools — No Signup Required</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] text-white tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Legal clarity,{" "}
              <span className="bg-gradient-to-r from-[hsl(42,55%,65%)] to-[hsl(42,45%,50%)] bg-clip-text text-transparent">simplified</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 mb-10 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Understand contracts, check risks, calculate deadlines, and generate documents — instantly, for free.
            </p>

            <form onSubmit={handleSearch} className="w-full max-w-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative flex gap-2 p-1.5 rounded-xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] shadow-[0_0_40px_-12px_hsl(42,55%,55%,0.15)]">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <Input
                    placeholder="Search for a legal tool..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-transparent text-white border-0 text-base placeholder:text-white/25 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button type="submit" className="h-11 px-6 bg-accent text-accent-foreground hover:bg-gold-dark rounded-lg font-semibold">
                  Search
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {["No signup required", "Free forever", "Instant results"].map((text) => (
                <span key={text} className="flex items-center gap-1.5 text-xs text-white/30">
                  <svg className="w-3.5 h-3.5 text-[hsl(42,55%,55%,0.5)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(42,55%,55%,0.15)] to-transparent" />
      </section>

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

      {/* Popular Tools */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Popular Tools</h2>
          <p className="text-muted-foreground">The most used legal tools on our platform.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool, i) => (
            <Link key={tool.id} to={`/tools/${tool.category}/${tool.slug}`}>
              <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all group" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <tool.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{tool.categoryLabel}</span>
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tool.shortDescription}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/tools">
            <Button variant="outline" className="gap-2">
              View All Tools <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

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
