import { Link } from "react-router-dom";
import { ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { tools } from "@/data/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Head from "@/components/seo/Head";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ContentPageLayoutProps {
  title: string;
  subtitle?: string;
  category?: string;
  breadcrumbs: Breadcrumb[];
  relatedToolIds?: string[];
  relatedTermSlugs?: string[];
  relatedClauseSlugs?: string[];
  faqs?: FAQ[];
  metaTitle?: string;
  metaDescription?: string;
  children: React.ReactNode;
}

export default function ContentPageLayout({
  title,
  subtitle,
  category,
  breadcrumbs,
  relatedToolIds = [],
  relatedTermSlugs = [],
  relatedClauseSlugs = [],
  faqs = [],
  metaTitle,
  metaDescription,
  children,
}: ContentPageLayoutProps) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const relatedTools = tools.filter((t) => relatedToolIds.includes(t.id));

  return (
    <div className="container py-8 max-w-4xl">
      <Head
        title={metaTitle || `${title} | LegallySpoken`}
        description={metaDescription || subtitle || `Learn about ${title} — plain-English guide with examples and FAQs.`}
      />
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {crumb.href ? (
              <Link to={crumb.href} className="hover:text-foreground transition-colors">{crumb.label}</Link>
            ) : (
              <span className="text-foreground">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Header */}
      <div className="mb-8">
        {category && <Badge variant="secondary" className="mb-3">{category}</Badge>}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">{title}</h1>
        {subtitle && <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>

      {/* Main Content */}
      <div className="mb-10">{children}</div>

      {/* Related Terms */}
      {relatedTermSlugs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Related Legal Terms</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTermSlugs.map((slug) => (
              <Link key={slug} to={`/legal-terms/${slug}`}>
                <Badge variant="outline" className="hover:bg-accent/10 transition-colors cursor-pointer capitalize">
                  {slug.replace(/-/g, " ")}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Clauses */}
      {relatedClauseSlugs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Related Clauses</h2>
          <div className="flex flex-wrap gap-2">
            {relatedClauseSlugs.map((slug) => (
              <Link key={slug} to={`/legal-clauses/${slug}`}>
                <Badge variant="outline" className="hover:bg-accent/10 transition-colors cursor-pointer capitalize">
                  {slug.replace(/-/g, " ")}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link key={tool.id} to={`/tools/${tool.category}/${tool.slug}`}>
                <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <tool.icon className="h-4 w-4 text-accent" />
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tool.shortDescription}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Helpful */}
      <div className="border-t pt-6 mt-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Was this helpful?</span>
          <div className="flex gap-2">
            <Button
              variant={helpful === true ? "default" : "outline"}
              size="sm"
              onClick={() => setHelpful(true)}
              className="gap-1"
            >
              <ThumbsUp className="h-3.5 w-3.5" /> Yes
            </Button>
            <Button
              variant={helpful === false ? "default" : "outline"}
              size="sm"
              onClick={() => setHelpful(false)}
              className="gap-1"
            >
              <ThumbsDown className="h-3.5 w-3.5" /> No
            </Button>
          </div>
          {helpful !== null && (
            <span className="text-sm text-muted-foreground">Thanks for your feedback!</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          <strong>Disclaimer:</strong> This content is for informational purposes only and does not constitute legal advice.
          Always consult a qualified attorney for legal questions specific to your situation.
        </p>
      </div>
    </div>
  );
}
