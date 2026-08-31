import CaseReviewForm from "@/components/capture/CaseReviewForm";

export default function HomeCaseReviewBand() {
  return (
    <section className="container py-14 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Not sure if you have a claim?
          </h2>
          <p className="text-muted-foreground">
            Tell us what happened and we&apos;ll review the basics — claim type, your state, and
            whether the filing window is still open — free of charge.
          </p>
        </div>
        <CaseReviewForm
          toolId="homepage"
          heading="Get a free case review"
          blurb="Takes about a minute. No cost, no obligation."
        />
        <p className="mt-4 text-center text-xs text-muted-foreground">
          LegallySpoken is not a law firm. Submitting this form is not legal advice and does not
          create an attorney-client relationship.
        </p>
      </div>
    </section>
  );
}
