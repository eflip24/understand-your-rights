import { useState } from "react";
import { Download, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { generateFormPdf, downloadBlob } from "@/lib/pdf/generateFormPdf";
import type { LegalFormDef } from "@/data/forms";

interface Props {
  form: LegalFormDef;
  data: Record<string, unknown>;
  hasPurchased: boolean;
  onCheckout: () => void;
}

export default function PdfActionBar({ form, data, hasPurchased, onCheckout }: Props) {
  const [busyFree, setBusyFree] = useState(false);
  const [busyClean, setBusyClean] = useState(false);

  const handleFree = async () => {
    setBusyFree(true);
    try {
      const blob = await generateFormPdf({ form, data, watermark: true });
      downloadBlob(blob, `${form.slug}-free-draft.pdf`);
      toast({ title: "Free draft downloaded", description: "Includes a watermark. Upgrade for a clean copy." });
    } catch (e) {
      toast({ title: "Couldn't generate PDF", description: String(e), variant: "destructive" });
    } finally {
      setBusyFree(false);
    }
  };

  const handleClean = async () => {
    if (!hasPurchased) {
      onCheckout();
      return;
    }
    setBusyClean(true);
    try {
      const blob = await generateFormPdf({ form, data, watermark: false });
      downloadBlob(blob, `${form.slug}-clean.pdf`);
      toast({ title: "Clean PDF downloaded" });
    } catch (e) {
      toast({ title: "Couldn't generate PDF", description: String(e), variant: "destructive" });
    } finally {
      setBusyClean(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        variant="outline"
        className="flex-1 gap-2"
        onClick={handleFree}
        disabled={busyFree}
      >
        {busyFree ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Download Free PDF (watermarked)
      </Button>
      <Button
        className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-gold-dark"
        onClick={handleClean}
        disabled={busyClean}
      >
        {busyClean ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : hasPurchased ? (
          <Download className="h-4 w-4" />
        ) : (
          <Lock className="h-4 w-4" />
        )}
        {hasPurchased ? "Download Clean PDF" : `Get Clean PDF — $${form.price.toFixed(2)}`}
      </Button>
    </div>
  );
}
