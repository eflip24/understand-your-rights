import { useTranslation } from "react-i18next";
import Head from "@/components/seo/Head";
import ContentPageLayout from "@/components/layout/ContentPageLayout";

export default function TermsOfServicePage() {
  const { t } = useTranslation("pages");
  const sections = t("terms.sections", { returnObjects: true }) as Array<{ title: string; body: string }>;
  const acceptable = t("terms.acceptable.items", { returnObjects: true }) as string[];
  const sections2 = t("terms.sections2", { returnObjects: true }) as Array<{ title: string; body: string }>;
  return (
    <>
      <Head title={t("terms.metaTitle")} description={t("terms.metaDescription")} />
      <ContentPageLayout
        title={t("terms.title")}
        subtitle={t("terms.subtitle")}
        breadcrumbs={[{ label: t("terms.breadcrumb") }]}
        metaTitle={t("terms.metaTitle")}
        metaDescription={t("terms.metaDescription")}
      >
        <div className="prose dark:prose-invert max-w-none prose-headings:font-serif">
          {Array.isArray(sections) &&
            sections.map((s) => (
              <div key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}

          <h2>{t("terms.acceptable.title")}</h2>
          <p>{t("terms.acceptable.intro")}</p>
          <ul>
            {Array.isArray(acceptable) && acceptable.map((it, i) => <li key={i}>{it}</li>)}
          </ul>

          {Array.isArray(sections2) &&
            sections2.map((s) => (
              <div key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}

          <h2>{t("terms.contact.title")}</h2>
          <p>{t("terms.contact.body")}</p>

          <p className="text-muted-foreground text-sm mt-8">
            <em>{t("terms.lastUpdated")}</em>
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
