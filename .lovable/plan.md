

# Fix Navbar Alignment Issues

## Problems Identified

After the 20% root font-size increase, the navbar has alignment issues:

1. **Desktop**: The `h-16` (4rem) navbar height is now taller due to the root font scaling, but items use `justify-between` with no proper grouping, causing uneven spacing between logo, nav links, search, auth buttons, and theme toggle.
2. **Mobile**: Logo, theme toggle, and hamburger are cramped together with no proper spacing. The `ThemeToggle` sits outside the mobile menu trigger group, causing misalignment.
3. **The hamburger menu button renders on desktop too** because the `lg:hidden` is on `SheetTrigger` but not on the wrapping `Sheet`, so the button still takes space.

## Changes

### `src/components/layout/Navbar.tsx`

- **Group right-side items properly**: Wrap ThemeToggle + mobile hamburger into a single `flex items-center gap-2` container so they align as a unit on mobile.
- **Adjust container**: Change from `h-16` to `h-14` to compensate for the 20% font scaling (the scaled `h-16` = ~77px which is too tall; `h-14` = ~67px, closer to a standard navbar).
- **Fix icon sizes**: Use fixed `size` values (e.g., `w-[28px] h-[28px]`) on the Scale logo icon so it doesn't scale with rem.
- **Ensure hamburger is properly hidden on desktop**: Move `lg:hidden` to a wrapper `div` around the entire `Sheet` component.
- **Tighten nav link padding**: Reduce `px-3` to `px-2` on desktop nav links to prevent overflow at the scaled font size.

