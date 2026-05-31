## Plan: Finish B9.5 Gemini free-tier re-run

Resume the idempotent translator until the Gemini free-tier quota blocks again, then report status.

### Steps

1. Run `bun scripts/translate-region-intros.mjs --provider=gemini`.
2. The script skips entries already present in `src/data/eu/regionIntrosGenerated.ts`, so it picks up after the ~27 entries currently filled.
3. The script writes the overlay file after each successful translation, so partial progress survives a 429 cutoff.
4. If the 60s exec timeout cuts the run mid-stream, re-invoke the same command — it resumes from disk.
5. When the run ends (completion or 429 quota), report:
   - newly filled entries this session
   - total filled vs. ~219 target slots
   - countries/regions still outstanding for the next daily run

### Notes

- Execution only — no code changes.
- If quota blocks early, the remaining gaps are safely resumable tomorrow with the same command.
- English fallback + banner means missing locales don't break pages; this just improves locale quality.
