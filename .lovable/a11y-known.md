# Known accessibility items — Phase B5.5

Baseline run target: zero **critical** and zero **serious** violations
across the route list in `scripts/axe-audit.mjs`. Known moderate /
minor items intentionally accepted are tracked here.

## Architectural decisions

- **Map markers (`LocalMap.tsx`)**: Leaflet renders interactive map
  markers without text labels. We render a parallel text list of
  every firm above the map and mark the map container
  `aria-hidden="true"` so screen readers use the card list as the
  canonical navigation surface. Sighted keyboard users can still tab
  the map for visual reference.
- **AdSense iframes**: `<ins class="adsbygoogle">` is injected by
  Google with `title` set per ad unit. We do not wrap it in a
  landmark; axe sometimes flags region-name on parent — accepted as
  a third-party constraint.
- **Funding Choices banner**: rendered by Google. ARIA correctness
  is Google's responsibility. We do not modify or audit it.

## Run

```
BASE_URL=http://localhost:8080 node scripts/axe-audit.mjs
```

Writes `.lovable/axe-baseline.json` and exits non-zero if any
critical/serious violations exist.
