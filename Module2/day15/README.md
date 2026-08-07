# Day 15 — Responsive & Animated Menu

## What this is
A menu section (`menu.html` + `menu.css`) that starts as a single column
on mobile and expands to multiple columns on larger screens, with a
tasteful hover transition on each dish card.

## Files
- `menu.html` — markup for the menu section and dish cards
- `menu.css` — mobile-first responsive styling with animated hover state

## Techniques used
- **Viewport meta tag** — `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  in the `<head>`, so mobile browsers render at actual device width instead
  of a zoomed-out desktop layout.
- **Mobile-first grid** — `.menu-grid` starts as `grid-template-columns: 1fr`
  (one column) with no media query, so mobile is the default rather than
  an afterthought.
- **`min-width: 768px` media query** — switches the grid to
  `repeat(2, 1fr)` (two columns) for tablets and up.
- **`min-width: 1024px` media query** — switches the grid to
  `repeat(3, 1fr)` (three columns) for laptop/desktop screens.
- **Hover transition** — each `.menu-card` / `.dish-card` has
  `transition: transform 0.2s ease, box-shadow 0.2s ease` and lifts on
  hover with `transform: translateY(-6px)`, plus a subtle image zoom
  (`scale(1.06)`) on the card's photo.
- **`prefers-reduced-motion` guard** — a `@media (prefers-reduced-motion: reduce)`
  block disables the transition and transform for anyone whose OS has
  requested reduced motion, so the hover effect never becomes a
  vestibular/motion-sensitivity issue.

## Self-check
- [x] Viewport meta tag present
- [x] Mobile-first: single column is the base, not a media-query override
- [x] Two columns from 768px, three columns from 1024px
- [x] Hover transition + translateY/scale lift on each card
- [x] Motion wrapped in a `prefers-reduced-motion` guard
- [x] Resized 360px → 1280px in browser dev tools and confirmed it adapts
      smoothly with no overlap or broken layout at any width

## How to view
Open `menu.html` directly in a browser, or use a live server extension.
Resize the window (or use browser dev tools' responsive mode) from 360px
up to 1280px to see the column count change at the breakpoints above.
