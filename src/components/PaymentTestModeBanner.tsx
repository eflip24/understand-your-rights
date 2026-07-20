import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;
const DISMISS_KEY = "ls_test_mode_banner_dismissed";

// Only show on paths where a user could actually reach checkout.
function isPaymentPath(pathname: string): boolean {
  // Strip locale prefix.
  const p = pathname.replace(/^\/(es|fr|de|pt|it)(?=\/|$)/, "") || "/";
  return (
    p.startsWith("/forms/") ||        // individual form or pack wizard
    p.startsWith("/checkout")         // return page
  );
}

export function PaymentTestModeBanner() {
  const location = useLocation();
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  });

  // Reset dismissal when navigating away and back.
  useEffect(() => {
    // No-op: keep dismissal for the session so it doesn't nag on every form.
  }, [location.pathname]);

  if (!clientToken) return null;
  if (!clientToken.startsWith("pk_test_")) return null;
  if (!isPaymentPath(location.pathname)) return null;
  if (dismissed) return null;

  return (
    <div className="w-full bg-orange-100 border-b border-orange-300 px-4 py-2 text-center text-xs text-orange-900 relative">
      <span>
        Test mode — use card <code className="font-mono">4242 4242 4242 4242</code>, any future expiry, any CVC. No real charges.
      </span>
      <button
        type="button"
        aria-label="Dismiss test-mode banner"
        onClick={() => {
          sessionStorage.setItem(DISMISS_KEY, "1");
          setDismissed(true);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-orange-900/70 hover:bg-orange-200 hover:text-orange-900"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
