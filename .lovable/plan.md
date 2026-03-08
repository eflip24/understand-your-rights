

# Premium Hero Banner Redesign

## Problem
The current hero has a low-quality AI-generated stock image (scales/gavel) floated to the right that looks cheap and dated. The layout is a basic two-column split with too much empty space. It doesn't feel premium or world-class.

## Approach
Remove the image entirely and go for a **full-width centered hero** with premium design elements created purely through CSS — no reliance on generated images. Think Stripe, Linear, or Vercel-level polish.

### Design Direction
- **Centered layout** with large, bold heading and subtitle
- **Animated gradient orb** behind the heading — a soft, blurred radial gradient that subtly shifts (gold/amber tones) for depth and movement
- **Floating badge** above the heading (e.g., "50+ Free Legal Tools") as a pill/chip with a subtle border glow
- **Search bar** centered and wider, with a glass-morphism effect and subtle inner shadow
- **Trust indicators** below search — small icons or text chips (e.g., "No signup required · Free forever · Instant results")
- **Subtle dot/grid pattern** in the background at very low opacity for texture
- Remove the hero illustration image import entirely — pure CSS visual impact

### Specific CSS Techniques
- Large soft radial gradient orb: `bg-[radial-gradient(ellipse_at_center,...)]` with gold at ~10-15% opacity, blurred
- Animated glow: CSS `@keyframes` for a slow pulsing/shifting gradient
- Glass search bar: `backdrop-blur-sm bg-white/5 border border-white/10`
- Badge pill: `border border-[hsl(42,55%,55%,0.3)] bg-[hsl(42,55%,55%,0.08)]` with small text

## Files
- **Edit**: `src/pages/HomePage.tsx` — rewrite hero section only (lines 77-125), remove `heroIllustration` import
- **Edit**: `tailwind.config.ts` — add `pulse-glow` keyframe animation for the gradient orb
- **Delete asset**: `src/assets/hero-illustration.png` can be kept but will no longer be imported

