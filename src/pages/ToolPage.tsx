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
import ContractRedFlagScanner from "@/components/tools/ContractRedFlagScanner";
import NDAFairnessScore from "@/components/tools/NDAFairnessScore";
import LeaseAnalyzer from "@/components/tools/LeaseAnalyzer";
import TermsSummarizer from "@/components/tools/TermsSummarizer";
import ContractComparison from "@/components/tools/ContractComparison";
import ClauseExplainer from "@/components/tools/ClauseExplainer";
import ContractExpirationTracker from "@/components/tools/ContractExpirationTracker";
import SignatureBlockGenerator from "@/components/tools/SignatureBlockGenerator";
import ContractChecklistGenerator from "@/components/tools/ContractChecklistGenerator";
import AmendmentDrafter from "@/components/tools/AmendmentDrafter";
import ContractValueCalculator from "@/components/tools/ContractValueCalculator";
import WarrantyExpirationCalculator from "@/components/tools/WarrantyExpirationCalculator";
import StatuteOfLimitationsLookup from "@/components/tools/StatuteOfLimitationsLookup";
import SmallClaimsLimitChecker from "@/components/tools/SmallClaimsLimitChecker";
import ConsumerRightsQuiz from "@/components/tools/ConsumerRightsQuiz";
import DisputeLetterGenerator from "@/components/tools/DisputeLetterGenerator";
import SalaryToHourlyConverter from "@/components/tools/SalaryToHourlyConverter";
import PTOCalculator from "@/components/tools/PTOCalculator";
import WrongfulTerminationChecklist from "@/components/tools/WrongfulTerminationChecklist";
import MinimumWageLookup from "@/components/tools/MinimumWageLookup";
import EmploymentContractChecklist from "@/components/tools/EmploymentContractChecklist";
import CeaseAndDesistGenerator from "@/components/tools/CeaseAndDesistGenerator";
import PowerOfAttorneyGenerator from "@/components/tools/PowerOfAttorneyGenerator";
import IndependentContractorAgreement from "@/components/tools/IndependentContractorAgreement";
import PromissoryNoteGenerator from "@/components/tools/PromissoryNoteGenerator";
import SecurityDepositCalculator from "@/components/tools/SecurityDepositCalculator";
import RentIncreaseCalculator from "@/components/tools/RentIncreaseCalculator";
import LeaseTermComparison from "@/components/tools/LeaseTermComparison";
import MoveOutChecklistGenerator from "@/components/tools/MoveOutChecklistGenerator";
import RentalAgreementGenerator from "@/components/tools/RentalAgreementGenerator";
import BusinessNameChecker from "@/components/tools/BusinessNameChecker";
import ContractorVsEmployeeChecker from "@/components/tools/ContractorVsEmployeeChecker";
import SeverancePayCalculator from "@/components/tools/SeverancePayCalculator";
import OvertimeCalculator from "@/components/tools/OvertimeCalculator";
import PartnershipSplitCalculator from "@/components/tools/PartnershipSplitCalculator";
import BusinessExpenseTracker from "@/components/tools/BusinessExpenseTracker";
import CryptoTaxCalculator from "@/components/tools/CryptoTaxCalculator";
import DCACalculator from "@/components/tools/DCACalculator";
import PositionSizeCalculator from "@/components/tools/PositionSizeCalculator";
import ProfitLossCalculator from "@/components/tools/ProfitLossCalculator";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";
import MarginCallCalculator from "@/components/tools/MarginCallCalculator";
import BreakevenCalculator from "@/components/tools/BreakevenCalculator";
import RiskRewardCalculator from "@/components/tools/RiskRewardCalculator";
import CryptoConverterCalculator from "@/components/tools/CryptoConverterCalculator";
import LoanPaymentCalculator from "@/components/tools/LoanPaymentCalculator";
import GrantBudgetCalculator from "@/components/tools/GrantBudgetCalculator";
import GrantDeadlineTracker from "@/components/tools/GrantDeadlineTracker";
import GrantComplianceChecklist from "@/components/tools/GrantComplianceChecklist";
import VestingScheduleCalculator from "@/components/tools/VestingScheduleCalculator";
import StockOptionTaxCalculator from "@/components/tools/StockOptionTaxCalculator";
import EquityDilutionCalculator from "@/components/tools/EquityDilutionCalculator";
import SolarROICalculator from "@/components/tools/SolarROICalculator";
import SolarIncentiveEstimator from "@/components/tools/SolarIncentiveEstimator";
import EnergySavingsCalculator from "@/components/tools/EnergySavingsCalculator";
import CarbonFootprintCalculator from "@/components/tools/CarbonFootprintCalculator";
import GreenLeaseChecker from "@/components/tools/GreenLeaseChecker";
import EVvsGasCalculator from "@/components/tools/EVvsGasCalculator";
import HomeEnergyAuditChecklist from "@/components/tools/HomeEnergyAuditChecklist";
import PPACalculator from "@/components/tools/PPACalculator";

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
  "red-flag-scanner": ContractRedFlagScanner,
  "nda-fairness": NDAFairnessScore,
  "lease-analyzer": LeaseAnalyzer,
  "terms-summarizer": TermsSummarizer,
  "contract-comparison": ContractComparison,
  "clause-explainer": ClauseExplainer,
  "contract-expiration": ContractExpirationTracker,
  "signature-block": SignatureBlockGenerator,
  "contract-checklist": ContractChecklistGenerator,
  "amendment-drafter": AmendmentDrafter,
  "contract-value": ContractValueCalculator,
  "warranty-tracker": WarrantyExpirationCalculator,
  "statute-of-limitations": StatuteOfLimitationsLookup,
  "small-claims-limit": SmallClaimsLimitChecker,
  "consumer-rights-quiz": ConsumerRightsQuiz,
  "dispute-letter": DisputeLetterGenerator,
  "salary-converter": SalaryToHourlyConverter,
  "pto-calculator": PTOCalculator,
  "wrongful-termination": WrongfulTerminationChecklist,
  "minimum-wage": MinimumWageLookup,
  "employment-checklist": EmploymentContractChecklist,
  "cease-desist": CeaseAndDesistGenerator,
  "poa-generator": PowerOfAttorneyGenerator,
  "ic-agreement": IndependentContractorAgreement,
  "promissory-note": PromissoryNoteGenerator,
  "security-deposit": SecurityDepositCalculator,
  "rent-increase": RentIncreaseCalculator,
  "lease-comparison": LeaseTermComparison,
  "moveout-checklist": MoveOutChecklistGenerator,
  "rental-agreement": RentalAgreementGenerator,
  "business-name": BusinessNameChecker,
  "contractor-vs-employee": ContractorVsEmployeeChecker,
  "severance-pay": SeverancePayCalculator,
  "overtime-calc": OvertimeCalculator,
  "partnership-split": PartnershipSplitCalculator,
  "business-expense": BusinessExpenseTracker,
  "crypto-tax": CryptoTaxCalculator,
  "dca-calculator": DCACalculator,
  "position-size": PositionSizeCalculator,
  "profit-loss": ProfitLossCalculator,
  "compound-interest": CompoundInterestCalculator,
  "margin-call": MarginCallCalculator,
  "breakeven-calc": BreakevenCalculator,
  "risk-reward": RiskRewardCalculator,
  "crypto-converter": CryptoConverterCalculator,
  "loan-payment": LoanPaymentCalculator,
  "grant-budget": GrantBudgetCalculator,
  "grant-deadline": GrantDeadlineTracker,
  "grant-compliance": GrantComplianceChecklist,
  "vesting-schedule": VestingScheduleCalculator,
  "stock-option-tax": StockOptionTaxCalculator,
  "equity-dilution": EquityDilutionCalculator,
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
