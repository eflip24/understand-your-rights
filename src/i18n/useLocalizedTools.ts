import { useTranslation } from "react-i18next";
import type { Tool, CategoryInfo } from "@/data/tools";

/**
 * Reads translated tool / category strings from the `tools` i18n namespace,
 * falling back to the English source on every field.
 *
 * Keys used:
 *   tools:<toolId>.name / .shortDescription / .description / .faqs[i].question / .faqs[i].answer
 *   tools:_categories.<categoryId>.label / .description
 */
export function useLocalizedTools() {
  const { t } = useTranslation("tools");

  const toolName = (tool: Tool) =>
    t(`${tool.id}.name`, { defaultValue: tool.name });

  const toolShortDescription = (tool: Tool) =>
    t(`${tool.id}.shortDescription`, { defaultValue: tool.shortDescription });

  const toolDescription = (tool: Tool) =>
    t(`${tool.id}.description`, { defaultValue: tool.description });

  const toolFaqs = (tool: Tool) =>
    tool.faqs.map((faq, i) => ({
      question: t(`${tool.id}.faqs.${i}.question`, { defaultValue: faq.question }),
      answer: t(`${tool.id}.faqs.${i}.answer`, { defaultValue: faq.answer }),
    }));

  const categoryLabel = (categoryId: string, fallback: string) =>
    t(`_categories.${categoryId}.label`, { defaultValue: fallback });

  const categoryDescription = (categoryId: string, fallback: string) =>
    t(`_categories.${categoryId}.description`, { defaultValue: fallback });

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
