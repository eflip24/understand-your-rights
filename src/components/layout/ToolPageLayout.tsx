import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Tool, getRelatedTools } from "@/data/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLdGraph, webApplicationSchema, faqSchema } from "@/components/seo/JsonLd";
import Head from "@/components/seo/Head";
import AdSlot from "@/components/ads/AdSlot";
import { useLocalizedPath } from "@/i18n/paths";
import { useLocalizedTools } from "@/i18n/useLocalizedTools";

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const { t } = useTranslation(["tools", "common"]);
  const lp = useLocalizedPath();
  const { toolName, toolDescription, toolShortDescription, toolCategoryLabel, toolFaqs } = useLocalizedTools();
  const relatedTools = getRelatedTools(tool.id);
  const location = useLocation();
  const url = `https://legallyspoken.com${location.pathname}`;

  const localizedName = toolName(tool);
  const localizedDesc = toolDescription(tool);
  const localizedFaqs = toolFaqs(tool);

  const schemas = [
    webApplicationSchema(localizedName, localizedDesc, url),
    ...(localizedFaqs.length ? [faqSchema(localizedFaqs)] : []),
  ];
  return (
    <div className="container py-8 max-w-4xl">
      <Head
        title={`${localizedName} — ${t("common:page.freeToolSuffix")}`}
        description={localizedDesc.slice(0, 155)}
      />
      <JsonLdGraph schemas={schemas} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to={lp("/tools")} className="hover:text-foreground transition-colors">{t("common:page.tools")}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp(`/tools/${tool.category}`)} className="hover:text-foreground transition-colors">
          {toolCategoryLabel(tool)}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{localizedName}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-lg bg-accent/10">
            <tool.icon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <span className="text-xs font-medium text-accent uppercase tracking-wider">{toolCategoryLabel(tool)}</span>
            <h1 className="text-3xl font-bold text-foreground leading-tight">{localizedName}</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">{localizedDesc}</p>
      </div>

      {/* Tool Content */}
      <Card className="mb-10 shadow-md">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>

      <AdSlot slot="post-result" className="mb-10" />

      {/* FAQ */}
      {localizedFaqs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{t("common:page.faq")}</h2>
          <Accordion type="single" collapsible className="w-full">
            {localizedFaqs.map((faq, i) => (
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
          <h2 className="text-2xl font-bold mb-4">{t("common:page.relatedTools")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((rt) => (
              <Link key={rt.id} to={lp(`/tools/${rt.category}/${rt.slug}`)}>
                <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <rt.icon className="h-4 w-4 text-accent" />
                      <CardTitle className="text-base">{toolName(rt)}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{toolShortDescription(rt)}</p>
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
