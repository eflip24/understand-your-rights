import { useParams, Navigate } from "react-router-dom";
import FormSeoLandingPage from "@/components/forms/FormSeoLandingPage";
import {
  STATE_FANOUT_FORMS,
  FANOUT_STATES,
} from "@/data/formStateFanout";
import { useLocalizedPath } from "@/i18n/paths";

export default function FormStateSeoLanding() {
  const { formKey, stateSlug } = useParams<{ formKey: string; stateSlug: string }>();
  const lp = useLocalizedPath();

  const def = formKey ? STATE_FANOUT_FORMS[formKey] : undefined;
  const stateInfo = FANOUT_STATES.find((s) => s.slug === stateSlug);

  if (!def || !stateInfo) return <Navigate to={lp("/forms")} replace />;

  const rules = def.stateRules[stateInfo.code];
  if (!rules) return <Navigate to={lp("/forms")} replace />;

  const stateName = stateInfo.name;

  // Cross-link to sibling states + one other form fanout
  const siblingStates = FANOUT_STATES.filter((s) => s.slug !== stateSlug).slice(0, 4);
  const otherForms = Object.entries(STATE_FANOUT_FORMS)
    .filter(([k]) => k !== formKey)
    .slice(0, 3);
  const related = [
    ...siblingStates.map((s) => ({
      label: `${s.name} ${def.formShortName}`,
      href: lp(`/forms/${def.urlPrefix}/${s.slug}`),
    })),
    ...otherForms.map(([k, d]) => ({
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
        `${stateName} landlords and tenants (or buyers/sellers/principals) needing a state-compliant document`,
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
