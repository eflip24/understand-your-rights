import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, ArrowRight, Car, HeartPulse, ShieldCheck, Users, Briefcase, AlertTriangle, Home, Cpu, Wrench, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/tools";
import HeroBanner from "@/components/home/HeroBanner";
import QuizAndPopularToolsSection from "@/components/home/QuizAndPopularToolsSection";
import LegalResourcesAndHowItWorks from "@/components/home/LegalResourcesAndHowItWorks";
import { JsonLdGraph, websiteSchema, organizationSchema } from "@/components/seo/JsonLd";
import Head from "@/components/seo/Head";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useLocalizedPath } from "@/i18n/paths";

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
  const { t, i18n } = useTranslation(["home"]);
  const lp = useLocalizedPath();
  const { data: blogPosts } = useBlogPosts();
  const latestPosts = blogPosts?.slice(0, 3) || [];

  const legalGuides = [
    { titleKey: "guides.autoAccident.title", descKey: "guides.autoAccident.description", href: "/auto-accident-law", icon: Car },
    { titleKey: "guides.personalInjury.title", descKey: "guides.personalInjury.description", href: "/personal-injury-law", icon: HeartPulse },
    { titleKey: "guides.insurance.title", descKey: "guides.insurance.description", href: "/insurance-law", icon: ShieldCheck },
    { titleKey: "guides.employment.title", descKey: "guides.employment.description", href: "/employment-law", icon: Briefcase },
    { titleKey: "guides.criminal.title", descKey: "guides.criminal.description", href: "/criminal-law", icon: AlertTriangle },
    { titleKey: "guides.landlordTenant.title", descKey: "guides.landlordTenant.description", href: "/landlord-tenant-law", icon: Home },
    { titleKey: "guides.aiTech.title", descKey: "guides.aiTech.description", href: "/ai-tech-law", icon: Cpu },
    { titleKey: "guides.findLawyer.title", descKey: "guides.findLawyer.description", href: "/lawyer-near-me", icon: Users },
  ];

  const stats = [
    { value: "100+", labelKey: "stats.tools", icon: Wrench },
    { value: "7", labelKey: "stats.guides", icon: FileText },
    { value: "50", labelKey: "stats.states", icon: BarChart3 },
    { value: "6,000+", labelKey: "stats.pages", icon: Search },
  ];

  return (
    <div>
      <Head
        title={t("home:meta.title")}
        description={t("home:meta.description")}
      />
      <JsonLdGraph schemas={[websiteSchema(), organizationSchema()]} />

      <HeroBanner />

      {/* Stats Bar */}
      <section className="border-b bg-secondary/50">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="flex items-center gap-3 justify-center">
                <stat.icon className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{t(`home:${stat.labelKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique site intro — written so the page carries substantive text
          even before any tool, card, or AI-translated content loads. */}
      <section className="container py-12 md:py-14 max-w-4xl">
        <div className="space-y-5 text-foreground/90 leading-relaxed">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            What LegallySpoken actually does for you
          </h2>
          <p>
            LegallySpoken is a free, no-signup library of more than 100 plain-English legal
            tools and reference guides built for non-lawyers. Instead of selling you a
            subscription or a downloadable PDF pack, every calculator, contract analyzer,
            risk checker, deadline calendar, and document generator on this site runs
            instantly in your browser — and stays free.
          </p>
          <p>
            We cover the everyday legal situations people actually search for: reading a
            lease before you sign it, working out a personal-injury settlement range,
            calculating an employment-law deadline, spotting risky clauses in a contract,
            understanding a small-claims notice, comparing insurance offers, or finding a
            local attorney. Our state-by-state guides cover all 50 US states, and our
            European section covers Germany, France, Spain, Italy, and Portugal in each
            country&apos;s own language.
          </p>
          <p>
            Drafts are produced with AI assistance and then reviewed by a human editor
            against primary sources (statutes, regulations, agency guidance). We are
            transparent about that workflow — see our{" "}
            <Link to={lp("/editorial-standards")} className="text-accent hover:underline">
              editorial standards
            </Link>{" "}
            for exactly how we research, write, review, and update each page, and our{" "}
            <Link to={lp("/about")} className="text-accent hover:underline">about page</Link>{" "}
            for who we are.
          </p>
          <p className="text-sm text-muted-foreground">
            LegallySpoken is not a law firm and nothing here is legal advice. Use our tools
            to get oriented, then talk to a licensed attorney about decisions that matter.
          </p>
        </div>
      </section>


      <QuizAndPopularToolsSection />

      {/* Categories */}
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{t("home:categories.title")}</h2>
            <p className="text-muted-foreground">{t("home:categories.subtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={lp(`/tools/${cat.id}`)}>
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
          <h2 className="text-3xl font-bold mb-2">{t("home:guides.title")}</h2>
          <p className="text-muted-foreground">{t("home:guides.subtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {legalGuides.map((guide) => (
            <Link key={guide.href} to={lp(guide.href)}>
              <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all group p-6">
                <div className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors w-fit mb-4">
                  <guide.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{t(`home:${guide.titleKey}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`home:${guide.descKey}`)}</p>
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
              <h2 className="text-3xl font-bold mb-2">{t("home:blog.title")}</h2>
              <p className="text-muted-foreground">{t("home:blog.subtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link key={post.id} to={lp(`/blog/${post.slug}`)}>
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
                          {new Date(post.published_at).toLocaleDateString(i18n.language, { month: "long", day: "numeric", year: "numeric" })}
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
              <Link to={lp("/blog")}>
                <Button variant="outline" className="gap-2">
                  {t("home:blog.viewAll")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <LegalResourcesAndHowItWorks />

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-3">{t("home:cta.title")}</h2>
          <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">
            {t("home:cta.subtitle")}
          </p>
          <Link to={lp("/tools")}>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark gap-2">
              {t("home:cta.button")} <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
