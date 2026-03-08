import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ReadingTimeCalculator() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ words: number; minutes: number; seconds: number } | null>(null);

  const calculate = () => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const legalWPM = 200;
    const totalMinutes = words / legalWPM;
    const minutes = Math.floor(totalMinutes);
    const seconds = Math.round((totalMinutes - minutes) * 60);
    setResult({ words, minutes, seconds });
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your contract text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
      />
      <Button onClick={calculate} disabled={!text.trim()} className="bg-accent text-accent-foreground hover:bg-gold-dark">
        Calculate Reading Time
      </Button>
      {result && (
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif text-foreground">{result.words}</p>
            <p className="text-sm text-muted-foreground">Words</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif text-foreground">{result.minutes}</p>
            <p className="text-sm text-muted-foreground">Minutes</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold font-serif text-foreground">{result.seconds}</p>
            <p className="text-sm text-muted-foreground">Seconds</p>
          </div>
        </div>
      )}
    </div>
  );
}
