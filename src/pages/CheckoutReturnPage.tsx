import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalizedPath } from "@/i18n/paths";
import Head from "@/components/seo/Head";

export default function CheckoutReturnPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const slug = params.get("slug");
  const lp = useLocalizedPath();

  return (
    <div className="container max-w-2xl py-16 px-4 text-center">
      <Head title="Payment complete | LegallySpoken" description="Your form purchase is confirmed." />
      {sessionId ? (
        <>
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
          <h1 className="mt-4 font-serif text-2xl font-bold">Payment complete</h1>
          <p className="mt-2 text-muted-foreground">
            Your clean PDF is unlocked. It may take a few seconds to register — return to your form and click
            <em> Download Clean PDF</em> again if needed.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {slug && (
              <Button asChild>
                <Link to={lp(`/forms/${slug}`)}>Back to my form</Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link to={lp("/dashboard")}>Go to dashboard</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">No session information found.</p>
        </>
      )}
    </div>
  );
}
