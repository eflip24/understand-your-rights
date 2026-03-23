import { useEffect } from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** @deprecated Use JsonLdGraph instead to avoid duplicate schema issues */
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

/**
 * Consolidated JSON-LD component that merges all schemas into a single
 * <script> tag using the @graph pattern. Prevents duplicate FAQPage errors.
 */
export function JsonLdGraph({ schemas }: { schemas: (Record<string, unknown> | null | undefined)[] }) {
  const filtered = schemas.filter(Boolean) as Record<string, unknown>[];
  const graph = filtered.map(({ "@context": _, ...rest }) => rest);
  const data = { "@context": "https://schema.org", "@graph": graph };
  const json = JSON.stringify(data);

  useEffect(() => {
    let el = document.getElementById("ld-json-graph") as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = "ld-json-graph";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = json;
    return () => {
      el?.remove();
    };
  }, [json]);

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

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LegallySpoken",
    url: "https://legallyspoken.com",
    description: "Free legal tools, contract analyzers, and plain-English legal resources for everyday people.",
    sameAs: [],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    ...(opts.image && { image: opts.image }),
    author: {
      "@type": "Person",
      name: opts.author || "LegallySpoken",
    },
    publisher: {
      "@type": "Organization",
      name: "LegallySpoken",
    },
  };
}

export function localBusinessSchema(opts: {
  name: string;
  address: string;
  lat: number;
  lng: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: opts.name,
    address: opts.address,
    url: opts.url,
    geo: {
      "@type": "GeoCoordinates",
      latitude: opts.lat,
      longitude: opts.lng,
    },
  };
}

export function itemListSchema(name: string, items: { url: string; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: item.url,
      name: item.name,
    })),
  };
}
