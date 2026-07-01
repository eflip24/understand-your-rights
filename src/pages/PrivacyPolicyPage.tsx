import { useTranslation } from "react-i18next";
import Head from "@/components/seo/Head";
import ContentPageLayout from "@/components/layout/ContentPageLayout";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation("pages");
  const collectItems = t("privacy.collect.items", { returnObjects: true }) as string[];
  const adsItems = t("privacy.ads.items", { returnObjects: true }) as string[];
  const usageItems = t("privacy.usage.items", { returnObjects: true }) as string[];
  const rightsItems = t("privacy.rights.items", { returnObjects: true }) as string[];
  const sections = t("privacy.sections", { returnObjects: true }) as Array<{ title: string; body: string }>;
  const closing = t("privacy.closing", { returnObjects: true }) as Array<{ title: string; body: string }>;
  return (
    <>
      <Head title={t("privacy.metaTitle")} description={t("privacy.metaDescription")} />
      <ContentPageLayout
        title={t("privacy.title")}
        subtitle={t("privacy.subtitle")}
        breadcrumbs={[{ label: t("privacy.breadcrumb") }]}
        metaTitle={t("privacy.metaTitle")}
        metaDescription={t("privacy.metaDescription")}
      >
        <div className="prose dark:prose-invert max-w-none prose-headings:font-serif">
          <h2>{t("privacy.collect.title")}</h2>
          <p>{t("privacy.collect.intro")}</p>
          <ul>
            {Array.isArray(collectItems) && collectItems.map((it, i) => <li key={i}>{it}</li>)}
          </ul>

          <h2>{t("privacy.ads.title")}</h2>
          <p>{t("privacy.ads.intro")}</p>
          <ul>
            {Array.isArray(adsItems) && adsItems.map((it, i) => <li key={i}>{it}</li>)}
          </ul>

          <h2>{t("privacy.ccpa.title")}</h2>
          <p>{t("privacy.ccpa.body")}</p>

          <h2>{t("privacy.usage.title")}</h2>
          <p>{t("privacy.usage.intro")}</p>
          <ul>
            {Array.isArray(usageItems) && usageItems.map((it, i) => <li key={i}>{it}</li>)}
          </ul>

          {Array.isArray(sections) &&
            sections.map((s) => (
              <div key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}

          <h2>{t("privacy.rights.title")}</h2>
          <p>{t("privacy.rights.intro")}</p>
          <ul>
            {Array.isArray(rightsItems) && rightsItems.map((it, i) => <li key={i}>{it}</li>)}
          </ul>

          {Array.isArray(closing) &&
            closing.map((s) => (
              <div key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}

          <h2>{t("privacy.contact.title")}</h2>
          <p>{t("privacy.contact.body")}</p>

          <p className="text-muted-foreground text-sm mt-8">
            <em>{t("privacy.lastUpdated")}</em>
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
