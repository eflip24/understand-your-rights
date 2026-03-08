import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, getToolsByCategory, type ToolCategory } from "@/data/tools";
import NotFound from "@/pages/NotFound";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const catInfo = categories.find((c) => c.id === category);
  if (!catInfo) return <NotFound />;

  const catTools = getToolsByCategory(category as ToolCategory);

  return (
    <div className="container py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-lg bg-accent/10">
          <catInfo.icon className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-3xl font-bold">{catInfo.label}</h1>
      </div>
      <p className="text-muted-foreground mb-8 max-w-xl">{catInfo.description}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catTools.map((tool) => (
          <Link key={tool.id} to={`/tools/${tool.category}/${tool.slug}`}>
            <Card className="h-full hover:shadow-lg hover:border-accent/30 transition-all group">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <tool.icon className="h-5 w-5 text-accent" />
                  </div>
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
  );
}
