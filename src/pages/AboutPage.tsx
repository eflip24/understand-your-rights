import { Link } from "react-router-dom";
import {
  Gift,
  UserCheck,
  MessageSquare,
  MapPin,
  Wrench,
  Bot,
  Map,
  BookOpen,
  HeartPulse,
  Heart,
  Ban,
  Eye,
  RefreshCw,
  Scale,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Head from "@/components/seo/Head";
import { useLocalizedPath } from "@/i18n/paths";

const BADGE_ICONS = [Gift, UserCheck, MessageSquare, MapPin];
const OFFERING_ICONS = [Wrench, Bot, Map, BookOpen, HeartPulse];
const PROMISE_ICONS = [Heart, Ban, Eye, RefreshCw];

export default function AboutPage() {
  const lp = useLocalizedPath();
  const { t } = useTranslation("pages");
  const badges = t("about.trustBadges", { returnObjects: true }) as string[];
  const offerings = t("about.offerings.items", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const promises = t("about.promise.items", { returnObjects: true }) as Array<{ title: string; description: string }>;
  return (
    <>
      <Head title={t("about.metaTitle")} description={t("about.metaDescription")} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-28">
        <div className="container text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 text-accent">
            <Scale className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {t("about.hero.titlePre")} <span className="text-accent">{t("about.hero.titleAccent")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("about.hero.subtitle")}</p>
          <Button asChild size="lg" className="mt-4">
            <Link to={lp("/tools")}>{t("about.hero.cta")}</Link>
          </Button>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {Array.isArray(badges) &&
              badges.map((label, i) => {
                const Icon = BADGE_ICONS[i % BADGE_ICONS.length];
                return (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <div className="rounded-full bg-accent/10 p-3">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{t("about.mission.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.mission.p1")}</p>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.mission.p2")}</p>
          <p className="text-foreground text-lg leading-relaxed font-medium">{t("about.mission.p3")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("about.mission.p4")}</p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container space-y-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center">
            {t("about.offerings.title")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Array.isArray(offerings) &&
              offerings.map((o, i) => {
                const Icon = OFFERING_ICONS[i % OFFERING_ICONS.length];
                return (
                  <Card key={o.title} className="border-border/50">
                    <CardContent className="p-6 space-y-3">
                      <div className="rounded-lg bg-accent/10 p-3 w-fit">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-serif font-semibold text-lg text-foreground">{o.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{o.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
          <p className="text-center text-muted-foreground">{t("about.offerings.closing")}</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{t("about.who.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.who.p1")}</p>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.who.p2")}</p>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container space-y-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center">
            {t("about.promise.title")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {Array.isArray(promises) &&
              promises.map((p, i) => {
                const Icon = PROMISE_ICONS[i % PROMISE_ICONS.length];
                return (
                  <div key={p.title} className="text-center space-y-3">
                    <div className="rounded-full bg-accent/10 p-4 w-fit mx-auto">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-serif font-semibold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Why "Legally Spoken" */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{t("about.why.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.why.p1")}</p>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("about.why.p2")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("about.why.p3")}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">{t("about.cta.title")}</h2>
          <p className="text-primary-foreground/70 whitespace-pre-line">{t("about.cta.body")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to={lp("/legal-health-check")}>{t("about.cta.healthCheck")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to={lp("/tools")}>{t("about.cta.browse")}</Link>
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/90 mt-8">{t("about.cta.disclaimer")}</p>
        </div>
      </section>
    </>
  );
}
