import { useParams } from "react-router-dom";
import { getToolBySlug } from "@/data/tools";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import NotFound from "@/pages/NotFound";

// Tool components
import ReadingTimeCalculator from "@/components/tools/ReadingTimeCalculator";
import WordCounter from "@/components/tools/WordCounter";
import JargonTranslator from "@/components/tools/JargonTranslator";
import ClauseFinder from "@/components/tools/ClauseFinder";
import CancellationDeadline from "@/components/tools/CancellationDeadline";
import NoticePeriod from "@/components/tools/NoticePeriod";
import LateFeeCalculator from "@/components/tools/LateFeeCalculator";
import RefundChecker from "@/components/tools/RefundChecker";
import NonCompeteChecker from "@/components/tools/NonCompeteChecker";
import FreelanceRateCalculator from "@/components/tools/FreelanceRateCalculator";
import InvoiceInterestCalculator from "@/components/tools/InvoiceInterestCalculator";
import NDAGenerator from "@/components/tools/NDAGenerator";
import PrivacyPolicyGenerator from "@/components/tools/PrivacyPolicyGenerator";
import ComplaintLetterGenerator from "@/components/tools/ComplaintLetterGenerator";
import TermsOfServiceGenerator from "@/components/tools/TermsOfServiceGenerator";

const toolComponents: Record<string, React.ComponentType> = {
  "reading-time": ReadingTimeCalculator,
  "word-counter": WordCounter,
  "jargon-translator": JargonTranslator,
  "clause-finder": ClauseFinder,
  "cancellation-deadline": CancellationDeadline,
  "notice-period": NoticePeriod,
  "late-fee": LateFeeCalculator,
  "refund-checker": RefundChecker,
  "non-compete": NonCompeteChecker,
  "freelance-rate": FreelanceRateCalculator,
  "invoice-interest": InvoiceInterestCalculator,
  "nda-generator": NDAGenerator,
  "privacy-generator": PrivacyPolicyGenerator,
  "complaint-generator": ComplaintLetterGenerator,
  "tos-generator": TermsOfServiceGenerator,
};

export default function ToolPage() {
  const { category, tool: toolSlug } = useParams<{ category: string; tool: string }>();
  
  if (!category || !toolSlug) return <NotFound />;
  
  const tool = getToolBySlug(category, toolSlug);
  if (!tool) return <NotFound />;

  const ToolComponent = toolComponents[tool.id];
  if (!ToolComponent) return <NotFound />;

  return (
    <ToolPageLayout tool={tool}>
      <ToolComponent />
    </ToolPageLayout>
  );
}
