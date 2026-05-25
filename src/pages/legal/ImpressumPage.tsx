import { Helmet } from "react-helmet-async";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import {
  OPERATOR,
  IMPRESSUM_COPY,
  IMPRESSUM_ROUTES,
  type ImpressumLocale,
} from "@/data/eu/impressumData";

interface Props {
  /** Forces a locale (used when route is locale-specific, e.g. /impressum always = DE). */
  forceLocale?: ImpressumLocale;
}

const SITE = "https://legallyspoken.com";

export default function ImpressumPage({ forceLocale }: Props) {
  const detected = useLocaleFromUrl() as ImpressumLocale;
  const locale: ImpressumLocale = forceLocale ?? (detected in IMPRESSUM_COPY ? detected : "en");
  const copy = IMPRESSUM_COPY[locale];
  const path = IMPRESSUM_ROUTES[locale];

  return (
    <div className="container max-w-3xl py-12">
      <Helmet>
        <title>{copy.metaTitle}</title>
        <meta name="description" content={copy.metaDescription} />
        <link rel="canonical" href={`${SITE}${path}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{copy.heading}</h1>
      <p className="text-muted-foreground mb-8">{copy.intro}</p>

      <Section title={copy.operatorHeading}>
        <address className="not-italic space-y-1">
          <div className="font-semibold">{OPERATOR.entityName}</div>
          <div>{OPERATOR.address}</div>
        </address>
      </Section>

      <Section title={copy.contactHeading}>
        <p>
          Email:{" "}
          <a href={`mailto:${OPERATOR.email}`} className="text-accent underline">
            {OPERATOR.email}
          </a>
        </p>
      </Section>

      <Section title={copy.responsibleHeading}>
        <p>{copy.responsibleBody}</p>
        <p className="mt-2">
          {OPERATOR.entityName}, {OPERATOR.address}
        </p>
      </Section>

      <Section title={copy.hostingHeading}>
        <p>{copy.hostingBody}</p>
        <p className="mt-2 font-medium">{OPERATOR.hostingProvider}</p>
      </Section>

      <Section title={copy.odrHeading}>
        <p>
          {copy.odrBody}{" "}
          <a
            href={OPERATOR.euOdrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            {copy.odrLinkLabel}
          </a>
        </p>
      </Section>

      <Section title={copy.disputeHeading}>
        <p>{copy.disputeBody}</p>
      </Section>

      <Section title={copy.liabilityHeading}>
        <p>{copy.liabilityBody}</p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-bold mb-3">{title}</h2>
      <div className="text-foreground/85 leading-relaxed">{children}</div>
    </section>
  );
}
