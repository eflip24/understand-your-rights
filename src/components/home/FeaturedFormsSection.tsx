import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredForms } from "@/data/forms";
import FormCard from "@/components/forms/FormCard";
import FormDisclaimer from "@/components/forms/FormDisclaimer";
import { useLocalizedPath } from "@/i18n/paths";

export default function FeaturedFormsSection() {
  const lp = useLocalizedPath();
  const forms = featuredForms().slice(0, 6);
  return (
    <section className="container py-16">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-3xl font-bold">Free Fillable Legal Forms – Online & Instant PDF</h2>
        <p className="mt-2 text-muted-foreground">
          Complete common legal forms online in minutes. Free download available. Clean professional PDF option.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {forms.map((f) => (
          <FormCard key={f.slug} form={f} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to={lp("/forms")}>
          <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-gold-dark">
            Browse All Forms <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div className="mx-auto mt-6 max-w-3xl">
        <FormDisclaimer compact />
      </div>
    </section>
  );
}
