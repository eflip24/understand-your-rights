/**
 * Curated form-to-form relationships used by <RelatedForms />.
 *
 * For any slug not in the curated map, the RelatedForms component falls back
 * to same-category / same-region forms. Keep this map small and intentional —
 * only add entries where the "related" list would otherwise be low quality.
 *
 * Cross-region links (US ↔ EU) are intentionally NOT included here to keep
 * US and EU form pages separated for SEO. Cross-region CTAs live in explicit
 * "US equivalent / EU equivalent" callouts on individual pages.
 */
export const formRelationships: Record<string, string[]> = {
  // Tax
  "w-9": ["w-4", "i-9", "independent-contractor-agreement"],
  "w-4": ["w-9", "i-9", "direct-deposit-authorization"],
  "i-9": ["w-4", "w-9", "offer-letter"],

  // Employment
  "offer-letter": ["i-9", "w-4", "independent-contractor-agreement", "nda"],
  "independent-contractor-agreement": ["nda", "w-9", "offer-letter"],
  "direct-deposit-authorization": ["w-4", "offer-letter"],

  // Real estate
  "residential-lease-agreement": ["security-deposit-receipt", "move-in-move-out-checklist", "notice-to-vacate", "late-rent-notice"],
  "eviction-notice": ["notice-to-vacate", "late-rent-notice", "residential-lease-agreement"],
  "notice-to-vacate": ["eviction-notice", "residential-lease-agreement"],
  "late-rent-notice": ["eviction-notice", "notice-to-vacate", "residential-lease-agreement"],
  "security-deposit-receipt": ["residential-lease-agreement", "move-in-move-out-checklist"],
  "move-in-move-out-checklist": ["residential-lease-agreement", "security-deposit-receipt"],

  // Business
  "nda": ["independent-contractor-agreement", "llc-operating-agreement", "offer-letter"],
  "llc-operating-agreement": ["nda", "independent-contractor-agreement"],
  "promissory-note": ["demand-letter", "release-of-liability"],
  "demand-letter": ["promissory-note", "release-of-liability"],
  "release-of-liability": ["promissory-note", "demand-letter"],
  "vehicle-bill-of-sale": ["release-of-liability"],

  // Personal
  "power-of-attorney-financial": ["healthcare-power-of-attorney", "simple-will", "living-will"],
  "healthcare-power-of-attorney": ["living-will", "simple-will", "hipaa-authorization", "power-of-attorney-financial"],
  "simple-will": ["living-will", "healthcare-power-of-attorney", "power-of-attorney-financial"],
  "living-will": ["healthcare-power-of-attorney", "simple-will", "hipaa-authorization"],
  "hipaa-authorization": ["healthcare-power-of-attorney", "living-will"],

  // EU forms (Batch 5)
  "eu-gdpr-dpa": ["eu-gdpr-consent", "eu-nda", "eu-employment-contract"],
  "eu-gdpr-consent": ["eu-gdpr-dpa", "eu-rtbf-request", "eu-nda"],
  "eu-rtbf-request": ["eu-gdpr-consent", "eu-gdpr-dpa"],
  "eu-employment-contract": ["eu-nda", "eu-gdpr-dpa"],
  "eu-nda": ["eu-employment-contract", "eu-gdpr-dpa"],
  "eu-power-of-attorney": ["eu-employment-contract", "eu-consumer-withdrawal"],
  "eu-consumer-withdrawal": ["eu-vat-invoice", "eu-power-of-attorney"],
  "eu-vat-invoice": ["eu-consumer-withdrawal", "eu-nda"],
};
