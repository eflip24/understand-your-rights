import { Check, Loader2, CloudOff } from "lucide-react";

export type AutoSaveStatus = "idle" | "saving" | "saved" | "offline";

export default function AutoSaveIndicator({
  status,
  lastSavedAt,
}: {
  status: AutoSaveStatus;
  lastSavedAt: Date | null;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-live="polite">
      {status === "saving" && (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
        </>
      )}
      {status === "saved" && (
        <>
          <Check className="h-3.5 w-3.5 text-green-600" /> Saved
          {lastSavedAt && <span className="opacity-70">· {timeAgo(lastSavedAt)}</span>}
        </>
      )}
      {status === "offline" && (
        <>
          <CloudOff className="h-3.5 w-3.5" /> Offline — saved locally
        </>
      )}
      {status === "idle" && lastSavedAt && (
        <span className="opacity-70">Last saved {timeAgo(lastSavedAt)}</span>
      )}
    </div>
  );
}

function timeAgo(d: Date): string {
  const sec = Math.max(1, Math.floor((Date.now() - d.getTime()) / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return d.toLocaleDateString();
}
