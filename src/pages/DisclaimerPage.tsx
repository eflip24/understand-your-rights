import { useTranslation } from "react-i18next";
import Head from "@/components/seo/Head";
import ContentPageLayout from "@/components/layout/ContentPageLayout";

export default function DisclaimerPage() {
  const { t } = useTranslation("pages");
  const sections = t("disclaimer.sections", { returnObjects: true }) as Array<{ title: string; body: string }>;
  return (
    <>
      <Head title={t("disclaimer.metaTitle")} description={t("disclaimer.metaDescription")} />
      <ContentPageLayout
        title={t("disclaimer.title")}
        subtitle={t("disclaimer.subtitle")}
        breadcrumbs={[{ label: t("disclaimer.breadcrumb") }]}
        metaTitle={t("disclaimer.metaTitle")}
        metaDescription={t("disclaimer.metaDescription")}
      >
        <div className="prose dark:prose-invert max-w-none prose-headings:font-serif">
          {Array.isArray(sections) &&
            sections.map((s) => (
              <div key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          <p className="text-muted-foreground text-sm mt-8">
            <em>{t("disclaimer.lastUpdated")}</em>
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
