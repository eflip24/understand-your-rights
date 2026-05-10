import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cookie } from "lucide-react";
import { getConsent, setConsent, OPEN_CONSENT_EVENT } from "@/lib/consent";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(true);

  useEffect(() => {
    if (!getConsent()) {
      // Slight delay so it doesn't fight with first paint
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const existing = getConsent();
      if (existing) {
        setAnalytics(existing.analytics);
        setAdvertising(existing.advertising);
      }
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, handler);
  }, []);

  if (!open) return null;

  const acceptAll = () => {
    setConsent({ analytics: true, advertising: true });
    setOpen(false);
  };
  const rejectAll = () => {
    setConsent({ analytics: false, advertising: false });
    setOpen(false);
  };
  const savePrefs = () => {
    setConsent({ analytics, advertising });
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6"
    >
      <div className="mx-auto max-w-4xl rounded-lg border bg-background shadow-2xl">
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-3 mb-3">
            <Cookie className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="flex-1">
              <h2 className="font-serif font-bold text-lg mb-1">We value your privacy</h2>
              <p className="text-sm text-muted-foreground">
                We use cookies to power site features, measure traffic, and serve relevant ads (Google AdSense).
                You can accept all, reject non-essential, or customize. See our{" "}
                <Link to="/privacy-policy" className="text-accent underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          {showPrefs && (
            <div className="mt-4 space-y-3 border-t pt-4">
              <Row label="Strictly necessary" desc="Required for the site to function. Always on." checked disabled />
              <Row
                label="Analytics"
                desc="Anonymous usage statistics so we can improve the site."
                checked={analytics}
                onChange={setAnalytics}
              />
              <Row
                label="Advertising (Google AdSense)"
                desc="Personalized ads. If off, you'll still see ads, but non-personalized."
                checked={advertising}
                onChange={setAdvertising}
              />
            </div>
          )}

          <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:justify-end">
            {!showPrefs && (
              <Button variant="ghost" onClick={() => setShowPrefs(true)} className="sm:mr-auto">
                Manage preferences
              </Button>
            )}
            <Button variant="outline" onClick={rejectAll}>Reject non-essential</Button>
            {showPrefs ? (
              <Button onClick={savePrefs} className="bg-accent text-accent-foreground hover:bg-gold-dark">
                Save preferences
              </Button>
            ) : (
              <Button onClick={acceptAll} className="bg-accent text-accent-foreground hover:bg-gold-dark">
                Accept all
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} disabled={disabled} onCheckedChange={onChange} />
    </div>
  );
}
