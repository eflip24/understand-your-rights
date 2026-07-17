import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryLabels, type LegalFormDef } from "@/data/forms";
import { useLocalizedPath } from "@/i18n/paths";

export default function FormCard({ form }: { form: LegalFormDef }) {
  const lp = useLocalizedPath();
  return (
    <Card className="group flex h-full flex-col transition-all hover:shadow-lg hover:border-accent/40">
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="rounded-md bg-accent/10 p-2">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-[10px]">{categoryLabels[form.category]}</Badge>
            <Badge className="bg-green-100 text-green-800 text-[10px] hover:bg-green-100">Free option</Badge>
          </div>
        </div>
        <h3 className="font-serif text-lg font-bold leading-tight">{form.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{form.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">Clean PDF ${form.price.toFixed(2)}</span>
          <Button asChild size="sm" variant="ghost" className="gap-1">
            <Link to={lp(`/forms/${form.slug}`)}>
              Fill Free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
