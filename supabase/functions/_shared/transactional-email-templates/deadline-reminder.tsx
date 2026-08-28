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
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  claimType?: string
  stateCode?: string | null
  deadlineDate?: string
  daysLeft?: number
  pageUrl?: string
}

const NAVY = '#1a2a4f'
const GOLD = '#c9a961'
const TEXT = '#22314f'
const MUTED = '#6b7280'

const label = (slug?: string) =>
  (slug || 'your claim').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const DeadlineReminder = ({
  claimType = 'other',
  stateCode,
  deadlineDate = '',
  daysLeft = 60,
  pageUrl = 'https://legallyspoken.com/statute-of-limitations-by-state',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      {daysLeft} days left to file your {label(claimType)} claim
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={brand}>LegallySpoken</Heading>
        </Section>

        <Section style={card}>
          <Heading style={h1}>Your filing deadline is approaching</Heading>
          <Text style={paragraph}>
            You used our calculator for a <strong>{label(claimType)}</strong> matter
            {stateCode ? ` in ${stateCode}` : ''}. Based on the statute of
            limitations for that claim, your filing window closes on{' '}
            <strong>{deadlineDate}</strong> — about <strong>{daysLeft} days</strong> from now.
          </Text>

          <Section style={warnBox}>
            <Text style={warnText}>
              Once the statute of limitations expires, courts normally dismiss the
              claim regardless of how strong it is. Some claims have shorter notice
              deadlines against government bodies or insurers.
            </Text>
          </Section>

          <Section style={{ textAlign: 'center', margin: '28px 0' }}>
            <Button href={pageUrl} style={button}>
              Check your state's deadline
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={disclaimer}>
            This reminder is general information, not legal advice, and the date
            shown is an estimate based on the details you entered. Confirm the
            applicable deadline with a licensed attorney in your jurisdiction.
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
const warnBox = { backgroundColor: '#fff8e8', border: `1px solid ${GOLD}`, borderRadius: '8px', padding: '14px' }
const warnText = { color: TEXT, fontSize: '14px', lineHeight: '21px', margin: '0' }
const button = { backgroundColor: NAVY, color: '#ffffff', borderRadius: '8px', padding: '12px 22px', fontSize: '15px', textDecoration: 'none' }
const hr = { borderColor: '#e5e7eb', margin: '24px 0 16px' }
const disclaimer = { color: MUTED, fontSize: '12px', lineHeight: '18px' }

export const template: TemplateEntry = {
  component: DeadlineReminder,
  displayName: 'Filing deadline reminder',
  subject: (data: Props) =>
    `${data?.daysLeft ?? 60} days left to file your ${label(data?.claimType)} claim`,
  previewData: {
    claimType: 'car-accident',
    stateCode: 'CA',
    deadlineDate: '2028-04-11',
    daysLeft: 60,
    pageUrl: 'https://legallyspoken.com/statute-of-limitations-by-state',
  },
}

export default DeadlineReminder
