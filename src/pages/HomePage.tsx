import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, FileText, Shield, Briefcase, ScrollText, BookOpen, Scale, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getPopularTools, categories } from "@/data/tools";
import JsonLd, { websiteSchema } from "@/components/seo/JsonLd";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const popularTools = getPopularTools();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const legalResources = [
    {
      title: "Legal Terms Dictionary",
      description: "50+ legal terms explained in plain English with example clauses and related resources.",
      href: "/legal-terms",
      icon: BookOpen,
      count: "50+ terms",
    },
    {
      title: "Contract Clauses Guide",
      description: "Understand common contract clauses, their enforceability, and red flags to watch for.",
      href: "/legal-clauses",
      icon: Gavel,
      count: "20+ clauses",
    },
    {
      title: "Contract Types Explained",
      description: "Learn about different contract types, their key clauses, and common risks.",
      href: "/contract-types",
      icon: Scale,
      count: "20+ types",
    },
  ];

  return (
    <div>
      <JsonLd data={websiteSchema()} />
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-dark opacity-90" />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Simple Legal Tools for{" "}
              <span className="text-accent">Everyday People</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Understand contracts, check risks, calculate deadlines, and generate documents — no lawyer required.
            </p>
            <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for a legal tool..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-background text-foreground border-none text-base"
                />
              </div>
              <Button type="submit" className="h-12 px-6 bg-accent text-accent-foreground hover:bg-gold-dark">
                Search
              </Button>
            </form>
            <p className="mt-4 text-sm text-primary-foreground/50">
              50+ free tools available • No signup required
            </p>
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
                  <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <cat.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2">{cat.label}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
              { step: "1", title: "Choose a Tool", desc: "Browse our collection of 50+ free legal tools." },
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
