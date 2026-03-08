import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Tool, getRelatedTools } from "@/data/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import JsonLd, { webApplicationSchema, faqSchema } from "@/components/seo/JsonLd";

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const relatedTools = getRelatedTools(tool.id);
  const location = useLocation();
  const url = `https://legallyspoken.com${location.pathname}`;
  const schemas = [
    webApplicationSchema(tool.name, tool.description, url),
    ...(tool.faqs?.length ? [faqSchema(tool.faqs)] : []),
  ].filter(Boolean);
  return (
    <div className="container py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/tools" className="hover:text-foreground transition-colors">Tools</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/tools/${tool.category}`} className="hover:text-foreground transition-colors">
          {tool.categoryLabel}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-lg bg-accent/10">
            <tool.icon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <span className="text-xs font-medium text-accent uppercase tracking-wider">{tool.categoryLabel}</span>
            <h1 className="text-3xl font-bold text-foreground leading-tight">{tool.name}</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">{tool.description}</p>
      </div>

      {/* Tool Content */}
      <Card className="mb-10 shadow-md">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>

      {/* FAQ */}
      {tool.faqs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {tool.faqs.map((faq, i) => (
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
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((rt) => (
              <Link key={rt.id} to={`/tools/${rt.category}/${rt.slug}`}>
                <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <rt.icon className="h-4 w-4 text-accent" />
                      <CardTitle className="text-base">{rt.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{rt.shortDescription}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
