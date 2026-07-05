import { useTranslation } from "react-i18next";

/**
 * Renders a plain-English explainer block below a tool's interactive UI.
 *
 * Purpose: satisfy AdSense "Low Value Content" policy on pure-calculator
 * pages by attaching keyword-rich, human-readable prose targeting the
 * tool's primary search intent. The FAQ JSON-LD is already emitted by
 * ToolPageLayout via faqSchema() using tool.faqs — this component only
 * adds the narrative explainer, keyed by tool id.
 *
 * Translation keys (in tools.json, top-level `seoContext` map keyed
 * by tool id — kebab-case, matches Tool.id in src/data/tools.ts):
 *   seoContext.<toolId>.heading        (H2 for the explainer)
 *   seoContext.<toolId>.paragraphs[i]  (array of prose paragraphs)
 *
 * If no seoContext block is defined for a tool, this renders nothing.
 */
export default function ToolSeoContext({ toolId }: { toolId: string }) {
  const { t, i18n } = useTranslation("tools");

  const heading = t(`seoContext.${toolId}.heading`, { defaultValue: "" });
  const paragraphsRaw = t(`seoContext.${toolId}.paragraphs`, {
    returnObjects: true,
    defaultValue: [],
  }) as unknown;
  const paragraphs = Array.isArray(paragraphsRaw)
    ? (paragraphsRaw as string[]).filter((p) => typeof p === "string" && p.trim().length > 0)
    : [];

  if (!heading || paragraphs.length === 0) return null;

  return (
    <section
      className="mb-10 prose prose-slate dark:prose-invert max-w-none"
      aria-label={heading}
      lang={i18n.language}
    >
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {p}
        </p>
      ))}
    </section>
  );
}
