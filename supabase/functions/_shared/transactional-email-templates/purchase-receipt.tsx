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
  Button,
  Hr,
  Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  formTitle?: string
  amount?: string
  currency?: string
  orderId?: string
  downloadUrl?: string
  dashboardUrl?: string
  purchaseDate?: string
}

const NAVY = '#1a2a4f'
const GOLD = '#c9a961'
const TEXT = '#22314f'
const MUTED = '#6b7280'

const PurchaseReceipt = ({
  formTitle = 'your document',
  amount = '',
  currency = 'USD',
  orderId = '',
  downloadUrl,
  dashboardUrl = 'https://legallyspoken.com/dashboard/documents',
  purchaseDate,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {formTitle} is ready to download</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={brand}>LegallySpoken</Heading>
        </Section>

        <Section style={card}>
          <Heading style={h1}>Thank you for your purchase</Heading>
          <Text style={paragraph}>
            Your clean, watermark-free PDF for <strong>{formTitle}</strong> is
            ready. You can download it using the button below or access it
            anytime from your document library.
          </Text>

          {downloadUrl ? (
            <Section style={{ textAlign: 'center', margin: '28px 0' }}>
              <Button href={downloadUrl} style={button}>
                Download your PDF
              </Button>
              <Text style={hint}>
                This secure download link is valid for 24 hours.
              </Text>
            </Section>
          ) : null}

          <Hr style={hr} />

          <Heading as="h2" style={h2}>Order details</Heading>
          <Text style={row}><span style={label}>Document:</span> {formTitle}</Text>
          {amount ? (
            <Text style={row}><span style={label}>Amount:</span> {amount} {currency}</Text>
          ) : null}
          {orderId ? (
            <Text style={row}><span style={label}>Order ID:</span> {orderId}</Text>
          ) : null}
          {purchaseDate ? (
            <Text style={row}><span style={label}>Date:</span> {purchaseDate}</Text>
          ) : null}

          <Hr style={hr} />

          <Text style={paragraph}>
            You can re-download this document anytime from your{' '}
            <Link href={dashboardUrl} style={link}>document library</Link>.
          </Text>

          <Text style={disclaimer}>
            LegallySpoken provides self-help legal forms and information, not
            legal advice. For advice on your specific situation, consult a
            licensed attorney in your jurisdiction.
          </Text>
        </Section>

        <Text style={footer}>
          © LegallySpoken · legallyspoken.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PurchaseReceipt,
  subject: (d: Props) =>
    d?.formTitle ? `Your ${d.formTitle} is ready` : 'Your document is ready',
  displayName: 'Purchase Receipt',
  previewData: {
    formTitle: 'Form W-9 (Rev. March 2024)',
    amount: '$9.99',
    currency: 'USD',
    orderId: 'ord_123456',
    downloadUrl: 'https://legallyspoken.com/dashboard/documents',
    dashboardUrl: 'https://legallyspoken.com/dashboard/documents',
    purchaseDate: 'July 20, 2026',
  },
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
  color: TEXT,
  margin: 0,
  padding: 0,
}
const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '32px 20px',
}
const header: React.CSSProperties = { textAlign: 'center', marginBottom: '16px' }
const brand: React.CSSProperties = {
  color: NAVY,
  fontSize: '22px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  margin: 0,
}
const card: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '28px 24px',
}
const h1: React.CSSProperties = {
  color: NAVY,
  fontSize: '22px',
  fontWeight: 700,
  margin: '0 0 12px',
}
const h2: React.CSSProperties = {
  color: NAVY,
  fontSize: '15px',
  fontWeight: 700,
  margin: '18px 0 8px',
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
}
const paragraph: React.CSSProperties = {
  color: TEXT,
  fontSize: '15px',
  lineHeight: '22px',
  margin: '0 0 12px',
}
const button: React.CSSProperties = {
  backgroundColor: GOLD,
  color: NAVY,
  padding: '13px 28px',
  borderRadius: '10px',
  fontSize: '15px',
  fontWeight: 700,
  textDecoration: 'none',
  display: 'inline-block',
}
const hint: React.CSSProperties = {
  color: MUTED,
  fontSize: '12px',
  margin: '10px 0 0',
}
const row: React.CSSProperties = {
  color: TEXT,
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
}
const label: React.CSSProperties = { color: MUTED, marginRight: '6px' }
const hr: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '20px 0',
}
const link: React.CSSProperties = { color: NAVY, textDecoration: 'underline' }
const disclaimer: React.CSSProperties = {
  color: MUTED,
  fontSize: '12px',
  lineHeight: '18px',
  marginTop: '16px',
}
const footer: React.CSSProperties = {
  color: MUTED,
  fontSize: '12px',
  textAlign: 'center',
  marginTop: '18px',
}
