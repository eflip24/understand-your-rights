import { stateData, type StateLegalData } from "@/data/locations/stateData";
import { autoAccidentLaw } from "@/data/autoAccidentLaw";
import { personalInjuryLaw } from "@/data/personalInjuryLaw";
import { insuranceLaw } from "@/data/insuranceLaw";
import type { PillarData, ClusterArticle } from "@/data/autoAccidentLaw";

export interface StateVariantData {
  state: StateLegalData;
  pillar: PillarData;
  article: ClusterArticle;
}

const pillarMap: Record<string, PillarData> = {
  "auto-accident-law": autoAccidentLaw,
  "personal-injury-law": personalInjuryLaw,
  "insurance-law": insuranceLaw,
};

export const pillarSlugs = Object.keys(pillarMap);

export function getStateVariant(pillarSlug: string, stateSlug: string, articleSlug: string): StateVariantData | null {
  const pillar = pillarMap[pillarSlug];
  if (!pillar) return null;

  const state = stateData.find((s) => s.slug === stateSlug);
  if (!state) return null;

  const article = pillar.clusters.find((c) => c.slug === articleSlug);
  if (!article) return null;

  return { state, pillar, article };
}

export function getAllStateVariantPaths(): { pillar: string; state: string; slug: string }[] {
  const paths: { pillar: string; state: string; slug: string }[] = [];
  for (const [pillarSlug, pillar] of Object.entries(pillarMap)) {
    for (const state of stateData) {
      for (const cluster of pillar.clusters) {
        paths.push({ pillar: pillarSlug, state: state.slug, slug: cluster.slug });
      }
    }
  }
  return paths;
}

export function getNegligenceExplanation(rule: StateLegalData["negligenceRule"]): string {
  switch (rule) {
    case "pure comparative":
      return "You can recover damages even if you're 99% at fault, though your award is reduced by your percentage of fault.";
    case "modified comparative (50%)":
      return "You can recover damages only if you're less than 50% at fault. Your award is reduced by your percentage of fault.";
    case "modified comparative (51%)":
      return "You can recover damages only if you're 50% or less at fault. Your award is reduced by your percentage of fault.";
    case "contributory":
      return "If you're even 1% at fault, you may be barred from recovering any damages. This is one of the strictest rules in the US.";
  }
}

export function getNoFaultExplanation(noFault: boolean, stateName: string): string {
  if (noFault) {
    return `${stateName} is a no-fault state. Your own insurance (Personal Injury Protection) pays for your medical bills regardless of who caused the accident. You can only sue the at-fault driver if injuries meet a serious injury threshold.`;
  }
  return `${stateName} is an at-fault (tort) state. The driver who caused the accident is responsible for paying damages. You can file a claim with their insurance or sue them directly.`;
}

export { stateData };
