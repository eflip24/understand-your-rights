import { useParams, Navigate } from "react-router-dom";
import FormSeoLandingPage from "@/components/forms/FormSeoLandingPage";
import {
  getFormSeoLandingBySlug,
  FORM_SEO_LANDINGS,
} from "@/data/formSeoLandings";
import { useLocalizedPath } from "@/i18n/paths";

export default function FormSeoLanding() {
  const { landingSlug } = useParams<{ landingSlug: string }>();
  const lp = useLocalizedPath();
  const def = landingSlug ? getFormSeoLandingBySlug(landingSlug) : undefined;

  if (!def) return <Navigate to={lp("/forms")} replace />;

  const related = (def.related ?? [])
    .map((s) => FORM_SEO_LANDINGS.find((f) => f.slug === s))
    .filter(Boolean)
    .map((f) => ({
      label: f!.h1.split("—")[0].trim(),
      href: lp(`/forms/${f!.slug}`),
      blurb: f!.tagline,
    }));

  return (
    <FormSeoLandingPage
      slug={def.slug}
      wizardSlug={def.wizardSlug}
      h1={def.h1}
      metaTitle={def.metaTitle}
      metaDescription={def.metaDescription}
      tagline={def.tagline}
      intro={def.intro}
      useCases={def.useCases}
      howToSteps={def.howToSteps}
      faqs={def.faqs}
      keywords={def.keywords}
      breadcrumbTail={[{ label: def.h1.split("—")[0].trim() }]}
      related={related}
      isGovernmentForm={def.isGovernmentForm}
      governmentAgency={def.governmentAgency}
    />
  );
}
