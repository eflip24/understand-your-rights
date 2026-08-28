import { supabase } from "@/integrations/supabase/client";
import { SOL_STATES, getSol, type SolClaimType } from "@/data/solData";

export interface EstimateLine {
  label: string;
  value: string;
}

export interface EstimateCapturePayload {
  email: string;
  consent: true;
  toolId?: string;
  toolName?: string;
  claimType?: string;
  stateCode?: string | null;
  summary?: string;
  lines?: EstimateLine[];
  deadlineDate?: string | null;
  incidentDate?: string | null;
  estimate?: Record<string, unknown>;
}

export interface LeadCapturePayload {
  fullName: string;
  email: string;
  consent: true;
  phone?: string;
  stateCode?: string | null;
  city?: string;
  claimType: string;
  incidentDate?: string | null;
  description?: string;
  estimatedValueCents?: number | null;
  solOpen?: boolean | null;
  toolId?: string;
}

async function post(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("capture-lead", {
    body: { ...body, sourcePath: window.location.pathname, website: "" },
  });
  if (error) {
    let details = error.message;
    try {
      // @ts-expect-error — FunctionsHttpError carries a Response context
      if (error.context?.text) details = await error.context.text();
    } catch {
      /* keep the original message */
    }
    throw new Error(details);
  }
  return data as { ok: boolean; id?: string };
}

export const captureEstimate = (payload: EstimateCapturePayload) =>
  post({ kind: "estimate", ...payload });

export const captureLead = (payload: LeadCapturePayload) =>
  post({ kind: "lead", ...payload });

/**
 * Derives the filing deadline for a claim so the follow-up email can carry a
 * real, state-specific date rather than generic marketing copy. Returns null
 * when we don't have a citation for that state/claim pairing.
 */
export function deriveDeadline(
  stateAbbr: string | null | undefined,
  claim: SolClaimType,
  incidentDate: string | null | undefined,
): string | null {
  if (!stateAbbr || !incidentDate) return null;
  const state = SOL_STATES.find((s) => s.abbr === stateAbbr.toUpperCase());
  if (!state) return null;
  const entry = getSol(state.state, claim);
  if (!entry) return null;
  const start = new Date(incidentDate);
  if (Number.isNaN(start.getTime())) return null;
  const deadline = new Date(start);
  deadline.setFullYear(deadline.getFullYear() + Math.floor(entry.years));
  const months = Math.round((entry.years % 1) * 12);
  if (months) deadline.setMonth(deadline.getMonth() + months);
  return deadline.toISOString().slice(0, 10);
}

export function isDeadlineOpen(deadline: string | null): boolean | null {
  if (!deadline) return null;
  return Date.parse(deadline) > Date.now();
}

export const US_STATES = SOL_STATES.map((s) => ({ abbr: s.abbr, name: s.state }));
