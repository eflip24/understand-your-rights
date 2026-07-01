import { Mail, Clock, MapPin, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import Head from "@/components/seo/Head";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalizedPath } from "@/i18n/paths";

export default function ContactPage() {
  const { t } = useTranslation("pages");
  const lp = useLocalizedPath();
  const canHelp = t("contact.canHelp.items", { returnObjects: true }) as string[];
  return (
    <>
      <Head title={t("contact.metaTitle")} description={t("contact.metaDescription")} />

      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-20">
        <div className="container max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center rounded-full bg-accent/10 p-3">
            <MessageSquare className="h-7 w-7 text-accent" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{t("contact.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="container max-w-3xl mx-auto py-14 space-y-10">
        <div className="grid sm:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="rounded-lg bg-accent/10 p-2.5 w-fit">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-serif font-semibold text-lg">{t("contact.email.heading")}</h2>
              <a href="mailto:hello@legallyspoken.com" className="text-accent hover:underline break-all">
                hello@legallyspoken.com
              </a>
              <p className="text-sm text-muted-foreground">{t("contact.email.body")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="rounded-lg bg-accent/10 p-2.5 w-fit">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-serif font-semibold text-lg">{t("contact.responseTime.heading")}</h2>
              <p className="text-foreground font-medium">{t("contact.responseTime.value")}</p>
              <p className="text-sm text-muted-foreground">{t("contact.responseTime.body")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">{t("contact.canHelp.heading")}</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            {Array.isArray(canHelp) && canHelp.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">{t("contact.cannotHelp.heading")}</h2>
          <p className="text-muted-foreground">
            {t("contact.cannotHelp.body")}{" "}
            <a href={lp("/lawyer-near-me")} className="text-accent hover:underline">
              {t("contact.cannotHelp.directoryLink")}
            </a>
            .
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" />
              <div className="space-y-1">
                <h2 className="font-serif font-semibold">{t("contact.operator.heading")}</h2>
                <p className="text-sm text-muted-foreground">{t("contact.operator.body")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground border-t pt-6">{t("contact.disclaimer")}</p>
      </section>
    </>
  );
}
