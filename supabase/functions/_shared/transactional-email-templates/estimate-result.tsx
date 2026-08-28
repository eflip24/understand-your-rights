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
  Row,
  Column,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Line { label?: string; value?: string }

interface Props {
  toolName?: string
  summary?: string
  lines?: Line[]
  deadlineDate?: string | null
  stateCode?: string | null
  pageUrl?: string
}

const NAVY = '#1a2a4f'
const GOLD = '#c9a961'
const TEXT = '#22314f'
const MUTED = '#6b7280'

const EstimateResult = ({
  toolName = 'your estimate',
  summary = '',
  lines = [],
  deadlineDate,
  stateCode,
  pageUrl = 'https://legallyspoken.com',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {toolName} results from LegallySpoken</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={brand}>LegallySpoken</Heading>
        </Section>

        <Section style={card}>
          <Heading style={h1}>Your {toolName} results</Heading>
          {summary ? <Text style={paragraph}>{summary}</Text> : null}

          {lines.length ? (
            <Section style={table}>
              {lines.map((line, i) => (
                <Row key={i} style={row}>
                  <Column style={labelCell}>{line.label}</Column>
                  <Column style={valueCell}>{line.value}</Column>
                </Row>
              ))}
            </Section>
          ) : null}

          {deadlineDate ? (
            <Section style={deadlineBox}>
              <Text style={deadlineText}>
                <strong>Filing deadline{stateCode ? ` (${stateCode})` : ''}: {deadlineDate}</strong>
                <br />
                Claims filed after the statute of limitations expires are normally
                barred permanently. We will send you one reminder before this date.
              </Text>
            </Section>
          ) : null}

          <Section style={{ textAlign: 'center', margin: '28px 0' }}>
            <Button href={pageUrl} style={button}>
              Open the full breakdown
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={disclaimer}>
            This estimate is general information, not legal advice, and does not
            create an attorney-client relationship. Actual outcomes depend on the
            facts of your case and the law in your jurisdiction.
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
const table = { margin: '20px 0', border: `1px solid #e5e7eb`, borderRadius: '8px' }
const row = { borderBottom: '1px solid #f1f2f4' }
const labelCell = { color: MUTED, fontSize: '14px', padding: '10px 14px' }
const valueCell = { color: NAVY, fontSize: '14px', fontWeight: 'bold', padding: '10px 14px', textAlign: 'right' as const }
const deadlineBox = { backgroundColor: '#fff8e8', border: `1px solid ${GOLD}`, borderRadius: '8px', padding: '14px' }
const deadlineText = { color: TEXT, fontSize: '14px', lineHeight: '21px', margin: '0' }
const button = { backgroundColor: NAVY, color: '#ffffff', borderRadius: '8px', padding: '12px 22px', fontSize: '15px', textDecoration: 'none' }
const hr = { borderColor: '#e5e7eb', margin: '24px 0 16px' }
const disclaimer = { color: MUTED, fontSize: '12px', lineHeight: '18px' }

export const template: TemplateEntry = {
  component: EstimateResult,
  displayName: 'Calculator estimate result',
  subject: (data: Props) => `Your ${data?.toolName || 'estimate'} results`,
  previewData: {
    toolName: 'Pain and Suffering Calculator',
    summary: 'Based on the details you entered, your estimated pain and suffering range is $18,000 – $45,000.',
    lines: [
      { label: 'Medical specials', value: '$9,000' },
      { label: 'Multiplier applied', value: '2.0 – 5.0' },
      { label: 'Estimated range', value: '$18,000 – $45,000' },
    ],
    deadlineDate: '2028-04-11',
    stateCode: 'CA',
    pageUrl: 'https://legallyspoken.com/tools/personal-injury/pain-and-suffering-calculator',
  },
}

export default EstimateResult
