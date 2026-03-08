import { useEffect } from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  const jsonString = JSON.stringify(data);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = jsonString;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [jsonString]);

  return null;
}

// Helper functions for common schemas

export function faqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function webApplicationSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "Legal",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function definedTermSchema(term: string, definition: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Legal Terms Dictionary",
    },
  };
}

export function articleSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "LegallySpoken",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LegallySpoken",
    url: "https://legallyspoken.com",
    description: "Free legal tools, contract analyzers, and plain-English legal resources.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://legallyspoken.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
