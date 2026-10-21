/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  heading?: string
  message?: string
  buttonUrl?: string
  buttonLabel?: string
}

const NAVY = '#1a2a4f'
const GOLD = '#c9a24b'

const ReviewUpdate = ({
  name = 'there',
  heading = 'Update on a review request',
  message = 'There is an update waiting for you.',
  buttonUrl = 'https://legallyspoken.com/my-reviews',
  buttonLabel = 'Open LegallySpoken',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{heading}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={{ textAlign: 'center' as const, marginBottom: '12px' }}>
          <Heading style={brand}>LegallySpoken</Heading>
        </Section>
        <Section style={card}>
          <Heading style={h1}>{heading}</Heading>
          <Text style={p}>Hi {name},</Text>
          <Text style={p}>{message}</Text>
          <Button href={buttonUrl} style={button}>{buttonLabel}</Button>
          <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0 16px' }} />
          <Text style={small}>
            For confidentiality, case details and documents are only available after you sign in.
            LegallySpoken is not a law firm and does not give legal advice.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { margin: '0 auto', padding: '24px 12px', maxWidth: '600px' }
const brand = { color: NAVY, fontSize: '22px', margin: '0' }
const card = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '28px' }
const h1 = { color: NAVY, fontSize: '20px', margin: '0 0 12px' }
const p = { color: '#22314f', fontSize: '15px', lineHeight: '24px' }
const small = { color: '#6b7280', fontSize: '12px', lineHeight: '18px' }
const button = { backgroundColor: NAVY, color: '#ffffff', borderRadius: '8px', padding: '12px 20px', fontSize: '15px', textDecoration: 'none', borderBottom: `3px solid ${GOLD}` }

export const template: TemplateEntry = {
  component: ReviewUpdate,
  displayName: 'Lawyer review update',
  subject: (d: Props) => d?.heading || 'Update on your LegallySpoken review',
  previewData: { name: 'Aoife', heading: 'New review request assigned to you', message: 'A client in Cork has asked you to review a settlement agreement. Please accept or decline within 24 hours.', buttonUrl: 'https://legallyspoken.com/lawyer-portal', buttonLabel: 'Open lawyer portal' },
}
