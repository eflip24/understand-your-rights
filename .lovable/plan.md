

# Fix: Scroll to Top on Route Change

When navigating between tool pages (or any pages), the browser keeps the previous scroll position instead of scrolling to the top. This is a common React Router SPA issue.

## Solution

Create a small `ScrollToTop` component that listens to `useLocation()` changes and calls `window.scrollTo(0, 0)` on every route change. Place it inside `<BrowserRouter>` in `App.tsx`.

## Files

**Create (1)**
- `src/components/ScrollToTop.tsx` — 8-line component using `useEffect` + `useLocation`

**Edit (1)**
- `src/App.tsx` — Import and render `<ScrollToTop />` inside `<BrowserRouter>`

