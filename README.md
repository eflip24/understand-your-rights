# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Testing

- `npm test` — unit/component tests via Vitest.
- `npm run test:a11y` — audits key routes against WCAG 2.1 AA via axe-core (`scripts/axe-audit.mjs`).

## Translating EU country pillars

Long-form copy on `/lawyer-eu/{country}` pillar pages is authored in English plus the country's native language; the other 4 EU locales are filled by an AI-assisted translation pass.

```
bun scripts/translate-country-pillars.mjs                          # all gaps, Lovable AI first
bun scripts/translate-country-pillars.mjs --provider=gemini        # use Google AI Studio (free tier)
bun scripts/translate-country-pillars.mjs --country=fr --locale=es # single combo
bun scripts/translate-country-pillars.mjs --dry                    # show what would run
```

The script is idempotent — it only fills missing locale entries and writes to `src/data/eu/countryPillarsGenerated.ts`. Requires `LOVABLE_API_KEY` and/or `GEMINI_API_KEY` in the environment. On a 402 (Lovable credits exhausted) or 429 it auto-falls back to Gemini when both keys are present.

## How can I deploy this project?


Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
