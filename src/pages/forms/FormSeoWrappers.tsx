/**
 * Thin wrappers that bind route-specific props (landing slug, form key) to
 * the generic FormSeoLanding / FormStateSeoLanding pages. Keeps AppRoutes.tsx
 * flat and lets each SEO landing have its own static path.
 */
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import FormSeoLandingPage from "@/components/forms/FormSeoLandingPage";
import {
  getFormSeoLandingBySlug,
  FORM_SEO_LANDINGS,
} from "@/data/formSeoLandings";
import { STATE_FANOUT_FORMS, FANOUT_STATES } from "@/data/formStateFanout";
import { useLocalizedPath } from "@/i18n/paths";

export function FormSeoLandingWrapper({ landingSlug }: { landingSlug: string }) {
  const lp = useLocalizedPath();
  const def = getFormSeoLandingBySlug(landingSlug);
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

export function FormStateSeoLandingWrapper({ formKey }: { formKey: string }) {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const lp = useLocalizedPath();

  const def = STATE_FANOUT_FORMS[formKey];
  const stateInfo = FANOUT_STATES.find((s) => s.slug === stateSlug);
  if (!def || !stateInfo) return <Navigate to={lp("/forms")} replace />;

  const rules = def.stateRules[stateInfo.code];
  if (!rules) return <Navigate to={lp("/forms")} replace />;

  const stateName = stateInfo.name;
  const siblingStates = FANOUT_STATES.filter((s) => s.slug !== stateSlug).slice(0, 4);
  const otherForms = Object.entries(STATE_FANOUT_FORMS)
    .filter(([k]) => k !== formKey)
    .slice(0, 3);
  const related = [
    ...siblingStates.map((s) => ({
      label: `${s.name} ${def.formShortName}`,
      href: lp(`/forms/${def.urlPrefix}/${s.slug}`),
    })),
    ...otherForms.map(([, d]) => ({
      label: `${stateName} ${d.formShortName}`,
      href: lp(`/forms/${d.urlPrefix}/${stateInfo.slug}`),
    })),
  ];

  return (
    <FormSeoLandingPage
      slug={`${def.urlPrefix}/${stateInfo.slug}`}
      wizardSlug={def.wizardSlug}
      wizardQuery={`${def.stateParam}=${stateInfo.code}`}
      h1={def.h1Template(stateName)}
      metaTitle={def.metaTitleTemplate(stateName)}
      metaDescription={def.metaDescriptionTemplate(stateName)}
      tagline={`${stateName} • Free fillable PDF • State-compliant`}
      intro={def.intro(stateName)}
      useCases={[
        `${stateName} landlords, tenants, buyers, sellers, or principals needing a state-compliant document`,
        `Small business owners handling ${def.formShortName.toLowerCase()} in ${stateName}`,
        `Anyone who needs the correct ${stateName} statutory format without paying an attorney`,
        `Users comparing ${stateName}'s rules to other states before choosing where to file or serve`,
      ]}
      howToSteps={def.howToSteps}
      faqs={def.faqs(stateName)}
      keywords={[
        `${stateName.toLowerCase()} ${def.formShortName.toLowerCase()}`,
        `${def.formShortName.toLowerCase()} ${stateName.toLowerCase()} pdf`,
        `free ${stateName.toLowerCase()} ${def.formShortName.toLowerCase()}`,
      ]}
      breadcrumbTail={[
        { label: def.formShortName, href: lp(`/forms/${def.wizardSlug}`) },
        { label: stateName },
      ]}
      stateBlock={{ title: rules.title, statute: rules.statute, bullets: rules.bullets }}
      related={related}
    />
  );
}
