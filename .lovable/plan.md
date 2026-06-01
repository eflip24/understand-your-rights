## Plan: Continue B9.5 Gemini free-tier re-run

Resume the idempotent translator targeting the next outstanding country, until the Gemini 20/day quota blocks again.

### Steps

1. Run `bun scripts/translate-region-intros.mjs --provider=gemini --country=de` to fill German regions (FR is already complete at ~49 entries).
2. Script is idempotent — it skips entries already in `src/data/eu/regionIntrosGenerated.ts` and writes after each successful translation, so progress survives a 429 cutoff or exec timeout.
3. If the exec call times out mid-run, re-invoke the same command to resume from disk.
4. When the run ends (completion or 429 quota hit), report:
   - newly filled entries this session
   - total filled vs. ~219 target slots
   - countries/regions still outstanding for the next daily run (es/it/pt)

### Notes

- Execution only — no source code changes; only the auto-generated overlay file updates.
- English fallback + banner keeps all pages functional; this run only improves locale coverage.
- After DE completes, subsequent days: `--country=es`, then `--country=it`, then `--country=pt` to stay under the 20/day cap.
