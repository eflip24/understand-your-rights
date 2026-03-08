

# Hero Banner & Premium Polish Improvements

## Problem
The dark mode hero has a muddy gold-brown gradient that looks washed out. The `bg-primary` in dark mode is the gold accent color, and the gradient `from-primary via-primary to-navy-dark` creates an awkward brownish blend. The overall feel isn't premium enough.

## Changes

### 1. Hero Banner Redesign (`src/pages/HomePage.tsx`)
- Replace the current flat gradient with a refined dark hero that works in both modes
- Use explicit dark navy background with a subtle radial gold glow/accent instead of relying on `bg-primary` (which flips between navy and gold across themes)
- Add a subtle decorative element — a soft radial gradient spotlight behind the heading for depth
- Use hardcoded navy/dark colors for the hero so it looks consistent in both light and dark mode (hero should always be dark/navy with gold accents)
- Tighten spacing, make the search bar more prominent with a slight border glow

### 2. CSS Variable Adjustments (`src/index.css`)
- No changes needed to the core theme — the fix is to stop the hero from using theme-flipping `primary` and instead use explicit colors so it always renders as a dark navy hero with gold text

### 3. Specific Hero Changes
- Background: `bg-[hsl(222,50%,8%)]` (deep navy, constant across themes) with a radial gold gradient overlay at ~5% opacity for warmth
- Heading: white text with the gold accent span preserved
- Subtitle: `text-white/70` instead of `text-primary-foreground/80`
- Search input: dark glass-like background (`bg-white/10 border border-white/20`) with white placeholder text
- Search button: gold accent, unchanged
- Subtext: `text-white/40`
- Add subtle top/bottom border lines using gold at very low opacity for a premium divider feel

## Files
- **Edit**: `src/pages/HomePage.tsx` — rework hero section classes only, keep all other sections unchanged

