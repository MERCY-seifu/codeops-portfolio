# Mini-Project — CBE Online Banking Dashboard (Layout Rebuild)

Recreated the layout structure of the **Commercial Bank of Ethiopia (CBE) online
banking dashboard** — header, sidebar navigation, account summary, and a
recent transactions list. Content is placeholder; the goal is the structure.

## What uses Grid

- `.app` — the page skeleton, built with `grid-template-areas` (`header`,
  `sidebar`, `main`, `footer`).
- `.tx-grid` — the recent transactions section, using
  `repeat(auto-fit, minmax(220px, 1fr))` so the cards reflow automatically
  based on available width.

## What uses Flexbox

- `.topbar` — logo on the left, notification bell + user avatar on the right
  (`justify-content: space-between`).
- `.sidebar__nav` — vertical stack of nav links (`flex-direction: column`).
- `.toolbar` — page title and "Send Money" button in a row.
- `.stat-row` — the three account balance cards, sharing width with
  `flex: 1` and wrapping on narrow screens.
- `.footer` — copyright text left, links right.

## Sticky element

`.topbar` is `position: sticky; top: 0`, so it stays visible while the main
content scrolls. `.sidebar` is also sticky, pinned just below the header.

## Absolutely positioned elements

- `.bell__dot` — the notification dot on the bell icon, anchored to the
  `.bell` (`position: relative`) parent.
- `.tx-card__badge` — the "New" tag on the most recent transaction card,
  anchored to `.tx-card` (`position: relative`).

## Responsive behavior

One media query at `max-width: 700px`:
- `.app` collapses to a single column (header → sidebar → main → footer).
- `.sidebar` switches from a sticky vertical column to a static horizontal
  row of links.
- `.toolbar` stacks the title and button vertically.
