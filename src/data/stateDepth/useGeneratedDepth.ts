import { useEffect, useState } from "react";
import type { NearMissDepth } from "@/data/nearMissDepth";

// One JSON file per pillar, loaded only when a state guide of that pillar opens.
const loaders = import.meta.glob<Record<string, NearMissDepth>>("./*.json", { import: "default" });

export function useGeneratedDepth(pillar: string, state: string, slug: string): NearMissDepth | undefined {
  const [depth, setDepth] = useState<NearMissDepth | undefined>();
  useEffect(() => {
    let alive = true;
    setDepth(undefined);
    const load = loaders[`./${pillar}.json`];
    if (!load) return;
    load()
      .then((all) => alive && setDepth(all[`${pillar}/${state}/${slug}`]))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [pillar, state, slug]);
  return depth;
}
