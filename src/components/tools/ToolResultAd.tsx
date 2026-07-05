import AdSlot from "@/components/ads/AdSlot";

/**
 * Inline ad slot that a tool component renders directly under its
 * computed result block. Only mounts when `show` is true so AdSense
 * requests an ad in a context surrounded by the result text — which
 * classifies more accurately (higher CPC) than the layout-level
 * `post-result` slot that renders whether or not a result exists.
 *
 * Convention for tools:
 *   <ToolResultAd show={!!result} />
 */
export default function ToolResultAd({ show, className = "mt-6" }: { show: boolean; className?: string }) {
  if (!show) return null;
  return <AdSlot slot="tool-result" className={className} />;
}
