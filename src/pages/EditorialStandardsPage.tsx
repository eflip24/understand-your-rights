import { ShieldCheck, BookOpen, RefreshCw, Bot, Users, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import Head from "@/components/seo/Head";
import { Card, CardContent } from "@/components/ui/card";

const ICONS = [BookOpen, ShieldCheck, Bot, Users, RefreshCw, AlertTriangle];

export default function EditorialStandardsPage() {
  const { t } = useTranslation("pages");
  const intro = t("editorial.intro", { returnObjects: true }) as string[];
  const pillars = t("editorial.pillars", { returnObjects: true }) as Array<{ title: string; body: string }>;
  const steps = t("editorial.pipeline.steps", { returnObjects: true }) as Array<{ label: string; body: string }>;
  const aiItems = t("editorial.aiDisclosure.items", { returnObjects: true }) as string[];
  return (
    <>
      <Head title={t("editorial.metaTitle")} description={t("editorial.metaDescription")} />

      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20">
        <div className="container max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center rounded-full bg-accent/10 p-3">
            <ShieldCheck className="h-7 w-7 text-accent" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{t("editorial.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("editorial.subtitle")}</p>
        </div>
      </section>

      <section className="container max-w-4xl mx-auto py-14 space-y-12">
        <div className="space-y-4">
          {Array.isArray(intro) &&
            intro.map((p, i) => (
              <p key={i} className="text-muted-foreground text-lg leading-relaxed">
                {p}
              </p>
            ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Array.isArray(pillars) &&
            pillars.map((p, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Card key={p.title}>
                  <CardContent className="p-6 space-y-3">
                    <div className="rounded-lg bg-accent/10 p-2.5 w-fit">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="font-serif font-semibold text-lg">{p.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">{t("editorial.pipeline.title")}</h2>
          <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
            {Array.isArray(steps) &&
              steps.map((s, i) => (
                <li key={i}>
                  <strong className="text-foreground">{s.label}</strong> {s.body}
                </li>
              ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">{t("editorial.aiDisclosure.title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("editorial.aiDisclosure.intro")}</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            {Array.isArray(aiItems) && aiItems.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">{t("editorial.corrections.title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("editorial.corrections.body")}</p>
        </div>

        <p className="text-xs text-muted-foreground border-t pt-6">{t("editorial.disclaimer")}</p>
      </section>
    </>
  );
}
