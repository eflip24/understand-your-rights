import { REVIEW_STATUS_STEPS } from "@/data/lawyerReview";

export default function ReviewTracker({ status }: { status: string }) {
  if (status === "declined") return <p className="text-sm text-destructive">The lawyer declined — we'll help you choose another.</p>;
  const idx = REVIEW_STATUS_STEPS.findIndex((s) => s.key === status);
  return (
    <ol className="flex flex-wrap gap-2">
      {REVIEW_STATUS_STEPS.map((s, i) => (
        <li key={s.key} className={`rounded-full px-3 py-1 text-xs font-medium ${i <= idx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          {s.label}
        </li>
      ))}
    </ol>
  );
}
