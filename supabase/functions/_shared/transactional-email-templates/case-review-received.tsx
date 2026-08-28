/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  fullName?: string
  claimType?: string
  stateCode?: string | null
  referenceId?: string
}

const NAVY = '#1a2a4f'
const TEXT = '#22314f'
const MUTED = '#6b7280'

const label = (slug?: string) =>
  (slug || 'your matter').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const CaseReviewReceived = ({
  fullName = 'there',
  claimType = 'other',
  stateCode,
  referenceId = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your free case review request</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={brand}>LegallySpoken</Heading>
        </Section>

        <Section style={card}>
          <Heading style={h1}>We received your case review request</Heading>
          <Text style={paragraph}>
            Hi {fullName}, thanks for the details about your{' '}
            <strong>{label(claimType)}</strong> matter
            {stateCode ? ` in ${stateCode}` : ''}. A member of our team will review
            it and follow up by email.
          </Text>
          <Text style={paragraph}>
            Reference: <strong>{referenceId}</strong>
          </Text>
          <Text style={paragraph}>
            In the meantime, keep every document connected to your claim —
            medical records, correspondence with insurers, photos and receipts.
            They are the single biggest factor in what a claim is worth.
          </Text>

          <Hr style={hr} />
          <Text style={disclaimer}>
            LegallySpoken is not a law firm and does not provide legal advice.
            Submitting this form does not create an attorney-client relationship.
            If a licensed attorney contacts you, any representation is between you
            and that attorney. Statutes of limitations apply — do not delay
            seeking advice.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = { backgroundColor: '#f4f5f7', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { margin: '0 auto', padding: '24px 12px', maxWidth: '600px' }
const header = { textAlign: 'center' as const, marginBottom: '12px' }
const brand = { color: NAVY, fontSize: '22px', margin: '0', letterSpacing: '0.5px' }
const card = { backgroundColor: '#ffffff', borderRadius: '10px', padding: '28px' }
const h1 = { color: NAVY, fontSize: '20px', margin: '0 0 12px' }
const paragraph = { color: TEXT, fontSize: '15px', lineHeight: '24px' }
const hr = { borderColor: '#e5e7eb', margin: '24px 0 16px' }
const disclaimer = { color: MUTED, fontSize: '12px', lineHeight: '18px' }

export const template: TemplateEntry = {
  component: CaseReviewReceived,
  displayName: 'Case review received',
  subject: 'We received your free case review request',
  previewData: {
    fullName: 'Jordan',
    claimType: 'car-accident',
    stateCode: 'TX',
    referenceId: '8f2c1d54-0a3b-4d21-9f77-2c1b9a55e001',
  },
}

export default CaseReviewReceived
