## Plan: Resume B9.5 region-intro translation run

Re-run the idempotent translator to fill the remaining ~210 region/locale gaps in `src/data/eu/regionIntrosGenerated.ts`.

### Steps

1. Run `bun scripts/translate-region-intros.mjs --provider=gemini` (forces Gemini free-tier; bypasses Lovable Gateway).
2. The script auto-skips entries already in `regionIntrosGenerated.ts`, so it resumes from where the last run stopped (currently FR: Île-de-France + Auvergne-Rhône-Alpes done in de/es/it/pt).
3. Stream progress; the script writes the overlay file after every successful translation, so partial progress is preserved even if Gemini's 20 req/day quota cuts us off again.
4. After the run completes (or hits quota), report:
   - Count of newly filled entries this run
   - Total filled vs. remaining (out of ~219 target slots)
   - Any country/region still missing for follow-up

### Notes

- No code changes — execution only.
- If Gemini quota blocks early, the run is safely resumable tomorrow with the same command.
- 60s per-call exec timeout may force a few sequential `code--exec` invocations; each picks up where the previous left off thanks to idempotency.
