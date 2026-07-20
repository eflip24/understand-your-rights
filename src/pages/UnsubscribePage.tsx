import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";


type State = "loading" | "valid" | "invalid" | "already" | "success" | "error";

export default function UnsubscribePage() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const url = import.meta.env.VITE_SUPABASE_URL as string;
        const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
        const res = await fetch(
          `${url}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: key } },
        );
        const j = await res.json();
        if (j?.valid) setState("valid");
        else if (j?.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch { setState("error"); }
    })();
  }, [token]);

  const confirm = async () => {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) setState("error");
      else if ((data as any)?.success) setState("success");
      else if ((data as any)?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch { setState("error"); }
    setSubmitting(false);
  };

  return (
    <>
      <Helmet><title>Unsubscribe · LegallySpoken</title><meta name="robots" content="noindex" /></Helmet>
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-background">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm text-center">
          {state === "loading" && (
            <><Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">Verifying your link…</p></>
          )}
          {state === "valid" && (
            <>
              <h1 className="text-2xl font-bold text-navy">Unsubscribe from emails</h1>
              <p className="mt-3 text-muted-foreground">
                Click below to stop receiving emails from LegallySpoken. This won't affect
                purchases you've already made — your documents stay in your dashboard.
              </p>
              <Button onClick={confirm} disabled={submitting} className="mt-6 w-full">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm unsubscribe"}
              </Button>
            </>
          )}
          {state === "success" && (
            <>
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
              <h1 className="mt-3 text-2xl font-bold text-navy">You're unsubscribed</h1>
              <p className="mt-2 text-muted-foreground">We won't send you any more emails.</p>
              <Button asChild className="mt-6"><Link to="/">Return home</Link></Button>
            </>
          )}
          {state === "already" && (
            <>
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
              <h1 className="mt-3 text-2xl font-bold text-navy">Already unsubscribed</h1>
              <p className="mt-2 text-muted-foreground">This email address is already on our unsubscribe list.</p>
              <Button asChild className="mt-6"><Link to="/">Return home</Link></Button>
            </>
          )}
          {(state === "invalid" || state === "error") && (
            <>
              <XCircle className="mx-auto h-10 w-10 text-destructive" />
              <h1 className="mt-3 text-2xl font-bold text-navy">
                {state === "invalid" ? "Invalid or expired link" : "Something went wrong"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                Please use the most recent unsubscribe link from one of our emails, or contact support.
              </p>
              <Button asChild variant="outline" className="mt-6"><Link to="/">Return home</Link></Button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
