interface AdSlotProps {
  slot: "above-content" | "mid-content" | "end-of-article" | "post-result" | "sidebar" | "in-feed";
  className?: string;
}

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  // Only render in production with AdSense configured
  // For now, render a placeholder that can be activated later
  if (typeof window !== "undefined" && !document.querySelector('script[src*="adsbygoogle"]')) {
    return null;
  }

  const slotStyles: Record<string, string> = {
    "above-content": "min-h-[90px] md:min-h-[90px]",
    "mid-content": "min-h-[250px]",
    "end-of-article": "min-h-[250px]",
    "post-result": "min-h-[250px]",
    "sidebar": "min-h-[250px] md:min-h-[600px]",
    "in-feed": "min-h-[120px]",
  };

  return (
    <div
      className={`w-full flex items-center justify-center ${slotStyles[slot] || ""} ${className}`}
      data-ad-slot={slot}
      aria-hidden="true"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
