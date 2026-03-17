import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { getToolBySlug } from "@/data/tools";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import NotFound from "@/pages/NotFound";

// Lazy-load all tool components
const toolComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "reading-time": React.lazy(() => import("@/components/tools/ReadingTimeCalculator")),
  "word-counter": React.lazy(() => import("@/components/tools/WordCounter")),
  "jargon-translator": React.lazy(() => import("@/components/tools/JargonTranslator")),
  "clause-finder": React.lazy(() => import("@/components/tools/ClauseFinder")),
  "cancellation-deadline": React.lazy(() => import("@/components/tools/CancellationDeadline")),
  "notice-period": React.lazy(() => import("@/components/tools/NoticePeriod")),
  "late-fee": React.lazy(() => import("@/components/tools/LateFeeCalculator")),
  "refund-checker": React.lazy(() => import("@/components/tools/RefundChecker")),
  "non-compete": React.lazy(() => import("@/components/tools/NonCompeteChecker")),
  "freelance-rate": React.lazy(() => import("@/components/tools/FreelanceRateCalculator")),
  "invoice-interest": React.lazy(() => import("@/components/tools/InvoiceInterestCalculator")),
  "nda-generator": React.lazy(() => import("@/components/tools/NDAGenerator")),
  "privacy-generator": React.lazy(() => import("@/components/tools/PrivacyPolicyGenerator")),
  "complaint-generator": React.lazy(() => import("@/components/tools/ComplaintLetterGenerator")),
  "tos-generator": React.lazy(() => import("@/components/tools/TermsOfServiceGenerator")),
  "red-flag-scanner": React.lazy(() => import("@/components/tools/ContractRedFlagScanner")),
  "nda-fairness": React.lazy(() => import("@/components/tools/NDAFairnessScore")),
  "lease-analyzer": React.lazy(() => import("@/components/tools/LeaseAnalyzer")),
  "terms-summarizer": React.lazy(() => import("@/components/tools/TermsSummarizer")),
  "contract-comparison": React.lazy(() => import("@/components/tools/ContractComparison")),
  "clause-explainer": React.lazy(() => import("@/components/tools/ClauseExplainer")),
  "contract-expiration": React.lazy(() => import("@/components/tools/ContractExpirationTracker")),
  "signature-block": React.lazy(() => import("@/components/tools/SignatureBlockGenerator")),
  "contract-checklist": React.lazy(() => import("@/components/tools/ContractChecklistGenerator")),
  "amendment-drafter": React.lazy(() => import("@/components/tools/AmendmentDrafter")),
  "contract-value": React.lazy(() => import("@/components/tools/ContractValueCalculator")),
  "warranty-tracker": React.lazy(() => import("@/components/tools/WarrantyExpirationCalculator")),
  "statute-of-limitations": React.lazy(() => import("@/components/tools/StatuteOfLimitationsLookup")),
  "small-claims-limit": React.lazy(() => import("@/components/tools/SmallClaimsLimitChecker")),
  "consumer-rights-quiz": React.lazy(() => import("@/components/tools/ConsumerRightsQuiz")),
  "dispute-letter": React.lazy(() => import("@/components/tools/DisputeLetterGenerator")),
  "salary-converter": React.lazy(() => import("@/components/tools/SalaryToHourlyConverter")),
  "pto-calculator": React.lazy(() => import("@/components/tools/PTOCalculator")),
  "wrongful-termination": React.lazy(() => import("@/components/tools/WrongfulTerminationChecklist")),
  "minimum-wage": React.lazy(() => import("@/components/tools/MinimumWageLookup")),
  "employment-checklist": React.lazy(() => import("@/components/tools/EmploymentContractChecklist")),
  "cease-desist": React.lazy(() => import("@/components/tools/CeaseAndDesistGenerator")),
  "poa-generator": React.lazy(() => import("@/components/tools/PowerOfAttorneyGenerator")),
  "ic-agreement": React.lazy(() => import("@/components/tools/IndependentContractorAgreement")),
  "promissory-note": React.lazy(() => import("@/components/tools/PromissoryNoteGenerator")),
  "security-deposit": React.lazy(() => import("@/components/tools/SecurityDepositCalculator")),
  "rent-increase": React.lazy(() => import("@/components/tools/RentIncreaseCalculator")),
  "lease-comparison": React.lazy(() => import("@/components/tools/LeaseTermComparison")),
  "moveout-checklist": React.lazy(() => import("@/components/tools/MoveOutChecklistGenerator")),
  "rental-agreement": React.lazy(() => import("@/components/tools/RentalAgreementGenerator")),
  "business-name": React.lazy(() => import("@/components/tools/BusinessNameChecker")),
  "contractor-vs-employee": React.lazy(() => import("@/components/tools/ContractorVsEmployeeChecker")),
  "severance-pay": React.lazy(() => import("@/components/tools/SeverancePayCalculator")),
  "overtime-calc": React.lazy(() => import("@/components/tools/OvertimeCalculator")),
  "partnership-split": React.lazy(() => import("@/components/tools/PartnershipSplitCalculator")),
  "business-expense": React.lazy(() => import("@/components/tools/BusinessExpenseTracker")),
  "crypto-tax": React.lazy(() => import("@/components/tools/CryptoTaxCalculator")),
  "dca-calculator": React.lazy(() => import("@/components/tools/DCACalculator")),
  "position-size": React.lazy(() => import("@/components/tools/PositionSizeCalculator")),
  "profit-loss": React.lazy(() => import("@/components/tools/ProfitLossCalculator")),
  "compound-interest": React.lazy(() => import("@/components/tools/CompoundInterestCalculator")),
  "margin-call": React.lazy(() => import("@/components/tools/MarginCallCalculator")),
  "breakeven-calc": React.lazy(() => import("@/components/tools/BreakevenCalculator")),
  "risk-reward": React.lazy(() => import("@/components/tools/RiskRewardCalculator")),
  "crypto-converter": React.lazy(() => import("@/components/tools/CryptoConverterCalculator")),
  "loan-payment": React.lazy(() => import("@/components/tools/LoanPaymentCalculator")),
  "grant-budget": React.lazy(() => import("@/components/tools/GrantBudgetCalculator")),
  "grant-deadline": React.lazy(() => import("@/components/tools/GrantDeadlineTracker")),
  "grant-compliance": React.lazy(() => import("@/components/tools/GrantComplianceChecklist")),
  "vesting-schedule": React.lazy(() => import("@/components/tools/VestingScheduleCalculator")),
  "stock-option-tax": React.lazy(() => import("@/components/tools/StockOptionTaxCalculator")),
  "equity-dilution": React.lazy(() => import("@/components/tools/EquityDilutionCalculator")),
  "solar-roi": React.lazy(() => import("@/components/tools/SolarROICalculator")),
  "solar-incentive": React.lazy(() => import("@/components/tools/SolarIncentiveEstimator")),
  "energy-savings": React.lazy(() => import("@/components/tools/EnergySavingsCalculator")),
  "carbon-footprint": React.lazy(() => import("@/components/tools/CarbonFootprintCalculator")),
  "green-lease": React.lazy(() => import("@/components/tools/GreenLeaseChecker")),
  "ev-vs-gas": React.lazy(() => import("@/components/tools/EVvsGasCalculator")),
  "home-energy-audit": React.lazy(() => import("@/components/tools/HomeEnergyAuditChecklist")),
  "ppa-calculator": React.lazy(() => import("@/components/tools/PPACalculator")),
  "income-tax": React.lazy(() => import("@/components/tools/IncomeTaxEstimator")),
  "auto-loan": React.lazy(() => import("@/components/tools/AutoLoanCalculator")),
  "debt-payoff": React.lazy(() => import("@/components/tools/DebtPayoffCalculator")),
  "net-worth": React.lazy(() => import("@/components/tools/NetWorthCalculator")),
  "paycheck-calc": React.lazy(() => import("@/components/tools/PaycheckCalculator")),
  "settlement-estimator": React.lazy(() => import("@/components/tools/SettlementEstimator")),
  "insurance-quote-comparison": React.lazy(() => import("@/components/tools/InsuranceQuoteComparison")),
  "accident-damage": React.lazy(() => import("@/components/tools/AccidentDamageCalculator")),
  "attorney-fee": React.lazy(() => import("@/components/tools/AttorneyFeeCalculator")),
  "insurance-premium": React.lazy(() => import("@/components/tools/InsurancePremiumEstimator")),
};

const ToolLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent" />
  </div>
);

export default function ToolPage() {
  const { category, tool: toolSlug } = useParams<{ category: string; tool: string }>();
  
  if (!category || !toolSlug) return <NotFound />;
  
  const tool = getToolBySlug(category, toolSlug);
  if (!tool) return <NotFound />;

  const ToolComponent = toolComponents[tool.id];
  if (!ToolComponent) return <NotFound />;

  return (
    <ToolPageLayout tool={tool}>
      <Suspense fallback={<ToolLoader />}>
        <ToolComponent />
      </Suspense>
    </ToolPageLayout>
  );
}
