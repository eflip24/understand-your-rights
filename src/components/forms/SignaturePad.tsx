import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eraser, PenLine, Type } from "lucide-react";

export interface SignatureValue {
  dataUrl?: string;   // canvas drawing
  typedName?: string; // typed alternative
  signedAt: string;   // ISO date
}

interface Props {
  value?: SignatureValue;
  onChange: (v: SignatureValue | undefined) => void;
  signerLabel?: string;
}

export default function SignaturePad({ value, onChange, signerLabel = "Signer" }: Props) {
  const padRef = useRef<SignatureCanvas>(null);
  const [tab, setTab] = useState<"draw" | "type">(value?.typedName && !value?.dataUrl ? "type" : "draw");
  const [typed, setTyped] = useState(value?.typedName ?? "");

  useEffect(() => {
    if (value?.dataUrl && padRef.current) {
      try { padRef.current.fromDataURL(value.dataUrl); } catch { /* noop */ }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const saveDrawing = () => {
    if (!padRef.current || padRef.current.isEmpty()) {
      onChange(undefined);
      return;
    }
    const dataUrl = padRef.current.toDataURL("image/png");
    onChange({ dataUrl, signedAt: new Date().toISOString() });
  };

  const clearDrawing = () => {
    padRef.current?.clear();
    onChange(undefined);
  };

  const saveTyped = (name: string) => {
    setTyped(name);
    if (name.trim().length < 2) {
      onChange(undefined);
      return;
    }
    onChange({ typedName: name.trim(), signedAt: new Date().toISOString() });
  };

  return (
    <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 space-y-3">
      <div>
        <p className="font-medium text-sm">{signerLabel} — Electronic Signature</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Under the federal ESIGN Act and state UETA, an electronic signature is generally as legally valid as a handwritten one. Some documents (wills in most states, notarized POAs) still require a wet-ink signature, witnesses, or notarization — check the state notes above.
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as "draw" | "type")}>
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="draw" className="gap-1"><PenLine className="h-3.5 w-3.5" /> Draw</TabsTrigger>
          <TabsTrigger value="type" className="gap-1"><Type className="h-3.5 w-3.5" /> Type</TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="mt-3 space-y-2">
          <div className="rounded-md border border-dashed border-border bg-background overflow-hidden">
            <SignatureCanvas
              ref={padRef}
              penColor="#0b1a35"
              canvasProps={{ className: "w-full h-40", "aria-label": "Signature drawing pad" }}
              onEnd={saveDrawing}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Sign with your finger, stylus, or trackpad.</p>
            <Button type="button" size="sm" variant="ghost" onClick={clearDrawing} className="gap-1 text-muted-foreground">
              <Eraser className="h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="type" className="mt-3 space-y-2">
          <Label htmlFor="typed-sig" className="text-xs">Type your full legal name</Label>
          <Input
            id="typed-sig"
            value={typed}
            placeholder="Jane Q. Doe"
            onChange={(e) => saveTyped(e.target.value)}
            className="font-serif italic text-lg"
          />
          {typed && (
            <p className="text-xs text-muted-foreground">
              By typing your name you agree that this constitutes your electronic signature and has the same effect as a handwritten signature.
            </p>
          )}
        </TabsContent>
      </Tabs>

      {value && (
        <p className="text-xs text-emerald-700 dark:text-emerald-400">
          ✓ Signed {new Date(value.signedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
