/// <reference types="npm:@types/react@18.3.1" />
import type { ComponentType } from 'npm:react@18.3.1'
import { template as purchaseReceipt } from './purchase-receipt.tsx'
import { template as estimateResult } from './estimate-result.tsx'
import { template as caseReviewReceived } from './case-review-received.tsx'
import { template as deadlineReminder } from './deadline-reminder.tsx'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'purchase-receipt': purchaseReceipt,
  'estimate-result': estimateResult,
  'case-review-received': caseReviewReceived,
  'deadline-reminder': deadlineReminder,
}
