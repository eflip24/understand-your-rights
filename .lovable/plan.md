

# Increase All Font Sizes by 20% Site-Wide

## Approach

The simplest and most effective way to scale all fonts by 20% across the entire site is to set the root `font-size` on the `html` element to `120%` (default is `100%` = `16px`, so this becomes `19.2px`). Since Tailwind's font size utilities and most CSS use `rem` units, everything scales proportionally with a single line of CSS.

## File to Edit

**`src/index.css`** — Add `font-size: 120%` to the `html` element in the base layer:

```css
@layer base {
  html {
    font-size: 120%;
  }
}
```

This single change scales all `rem`-based typography (headings, body text, buttons, labels, inputs) uniformly by 20% without touching any individual component.

