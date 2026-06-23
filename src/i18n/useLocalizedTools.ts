import { useTranslation } from "react-i18next";
import type { Tool, CategoryInfo } from "@/data/tools";
import { useToolTranslationOverrides } from "./toolTranslationOverrides";

/**
 * Reads translated tool / category strings from the `tools` i18n namespace,
 * falling back through three tiers:
 *   1. Static i18n JSON (src/i18n/locales/<locale>/tools.json)
 *   2. DB overlay (public.tool_translations) — filled by the translate-tools-cron
 *      edge function for any tool added after the static JSON was last rebuilt.
 *   3. English source string baked into src/data/tools.ts.
 *
 * Keys used (static JSON):
 *   tools:<toolId>.name / .shortDescription / .description / .faqs[i].question / .faqs[i].answer
 *   tools:_categories.<categoryId>.label / .description
 */
export function useLocalizedTools() {
  const { t } = useTranslation("tools");
  const overrides = useToolTranslationOverrides();

  const pickTool = <K extends "name" | "shortDescription" | "description">(tool: Tool, field: K, fallback: string) => {
    const translated = t(`${tool.id}.${field}`, { defaultValue: "" });
    if (translated) return translated;
    const dbOverride = overrides.tools[tool.id]?.[field];
    if (typeof dbOverride === "string" && dbOverride) return dbOverride;
    return fallback;
  };

  const toolName = (tool: Tool) => pickTool(tool, "name", tool.name);
  const toolShortDescription = (tool: Tool) => pickTool(tool, "shortDescription", tool.shortDescription);
  const toolDescription = (tool: Tool) => pickTool(tool, "description", tool.description);

  const toolFaqs = (tool: Tool) =>
    tool.faqs.map((faq, i) => {
      const tq = t(`${tool.id}.faqs.${i}.question`, { defaultValue: "" });
      const ta = t(`${tool.id}.faqs.${i}.answer`, { defaultValue: "" });
      const db = overrides.tools[tool.id]?.faqs?.[i];
      return {
        question: tq || db?.question || faq.question,
        answer: ta || db?.answer || faq.answer,
      };
    });

  const categoryLabel = (categoryId: string, fallback: string) => {
    const tr = t(`_categories.${categoryId}.label`, { defaultValue: "" });
    if (tr) return tr;
    return overrides.categories[categoryId]?.label || fallback;
  };

  const categoryDescription = (categoryId: string, fallback: string) => {
    const tr = t(`_categories.${categoryId}.description`, { defaultValue: "" });
    if (tr) return tr;
    return overrides.categories[categoryId]?.description || fallback;
  };

  const toolCategoryLabel = (tool: Tool) =>
    categoryLabel(tool.category, tool.categoryLabel);

  const catLabel = (cat: CategoryInfo) => categoryLabel(cat.id, cat.label);
  const catDescription = (cat: CategoryInfo) =>
    categoryDescription(cat.id, cat.description);

  return {
    toolName,
    toolShortDescription,
    toolDescription,
    toolFaqs,
    toolCategoryLabel,
    catLabel,
    catDescription,
    categoryLabel,
    categoryDescription,
  };
}
