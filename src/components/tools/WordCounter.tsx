import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ words: number; characters: number; sentences: number; paragraphs: number; pages: number } | null>(null);

  const calculate = () => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length || 1;
    const pages = Math.ceil(words / 250);
    setResult({ words, characters, sentences, paragraphs, pages });
  };

  return (
    <div className="space-y-4">
      <Textarea placeholder="Paste your contract text here..." value={text} onChange={(e) => setText(e.target.value)} rows={8} />
      <Button onClick={calculate} disabled={!text.trim()} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Count Words
      </Button>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
          {[
            { label: "Words", value: result.words },
            { label: "Characters", value: result.characters },
            { label: "Sentences", value: result.sentences },
            { label: "Paragraphs", value: result.paragraphs },
            { label: "Est. Pages", value: result.pages },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-2xl font-bold font-serif text-foreground">{item.value.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
