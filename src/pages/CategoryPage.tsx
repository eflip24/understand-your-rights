import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, getToolsByCategory, type ToolCategory } from "@/data/tools";
import NotFound from "@/pages/NotFound";
import Head from "@/components/seo/Head";
import { useLocalizedTools } from "@/i18n/useLocalizedTools";
import { useLocalizedPath } from "@/i18n/paths";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const catInfo = categories.find((c) => c.id === category);
  const { toolName, toolShortDescription, catLabel, catDescription } = useLocalizedTools();
  const lp = useLocalizedPath();
  if (!catInfo) return <NotFound />;

  const catTools = getToolsByCategory(category as ToolCategory);
  const label = catLabel(catInfo);
  const description = catDescription(catInfo);

  return (
    <div className="container py-10">
      <Head
        title={`${label} — Free Legal Tools | LegallySpoken`}
        description={description}
      />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-lg bg-accent/10">
          <catInfo.icon className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-3xl font-bold">{label}</h1>
      </div>
      <p className="text-muted-foreground mb-8 max-w-xl">{description}</p>

      {catTools.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <p className="mb-1 text-lg font-semibold">No tools in this category yet</p>
          <p className="text-sm text-muted-foreground">
            Check back soon — new tools ship every week.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catTools.map((tool) => (
            <Link key={tool.id} to={lp(`/tools/${tool.category}/${tool.slug}`)}>
              <Card className="relative h-full hover:shadow-lg hover:border-accent/30 transition-all group">
                {tool.popular && (
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                    Popular
                  </span>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <tool.icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-base">{toolName(tool)}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{toolShortDescription(tool)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
