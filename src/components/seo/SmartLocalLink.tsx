import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categoryToDirectory: Record<string, { slug: string; label: string }> = {
  "Auto Accident Law": { slug: "car-accident", label: "Car Accident Lawyer" },
  "Personal Injury Law": { slug: "personal-injury", label: "Personal Injury Lawyer" },
  "Insurance Law": { slug: "insurance-dispute", label: "Insurance Dispute Lawyer" },
  "Employment Law": { slug: "employment", label: "Employment Lawyer" },
  "Criminal Law": { slug: "criminal-defense", label: "Criminal Defense Lawyer" },
  "Landlord-Tenant Law": { slug: "real-estate", label: "Real Estate Lawyer" },
};

interface SmartLocalLinkProps {
  category: string;
  state?: string;
}

export default function SmartLocalLink({ category, state }: SmartLocalLinkProps) {
  const mapping = categoryToDirectory[category];
  if (!mapping) return null;

  const href = state ? `/lawyer-near-me/${mapping.slug}/${state}` : `/lawyer-near-me/${mapping.slug}`;

  return (
    <Link to={href}>
      <Card className="border-accent/20 bg-accent/5 hover:bg-accent/10 hover:shadow-md transition-all group">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <MapPin className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Looking for legal help near you?</p>
            <p className="text-sm text-muted-foreground">
              View our {mapping.label} Directory
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition-transform" />
        </CardContent>
      </Card>
    </Link>
  );
}
