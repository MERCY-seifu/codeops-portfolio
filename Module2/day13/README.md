# Business Profile Card — Sabegn Coffee

A one-page styled profile card for **Sabegn Coffee**, a fictional cafe on
Bole Road, Addis Ababa, serving traditional Ethiopian coffee and pastries.

## Live files
- `index.html` — page markup
- `styles.css` — all styling

## CSS techniques used

- **CSS custom properties (`:root`)** — a full color palette (`--brand`,
  `--brand-hover`, `--accent`, `--text-dark`, `--text-muted`, `--bg-page`,
  `--bg-card`, `--border-color`) and a spacing scale
  (`--space-xs` through `--space-xl`), plus `--radius`, all reused via
  `var()` throughout the stylesheet.
- **Global reset** — `* { box-sizing: border-box; margin: 0; padding: 0; }`
  applied site-wide so padding and borders never blow out declared widths.
- **Google Fonts** — "Inter" loaded via `<link>` in the `<head>` and set as
  the body font, with a fallback of `sans-serif`.
- **Box model on the card** — `padding`, a `border`, `border-radius`, and
  `margin: auto` to center the card on the page.
- **Typographic hierarchy** — business name (`h1`, bold, brand color) →
  tagline (italic, accent color) → body copy with `line-height: 1.8` for
  readability → smaller detail list → smallest footnote text.
- **`:hover` state using HSL lightness only** — `.btn:hover` swaps
  `--brand` for `--brand-hover`, which is the exact same hue and
  saturation with only the lightness value increased.
- **Pseudo-elements**:
  - `.card::before` — a decorative accent bar across the top of the card.
  - `.card__details .telebirr::after` — a required-field-style `*` marker
    appended after the "Payment" line, paired with a footnote explaining it.
- **BEM-style class naming** (`card__name`, `card__tagline`, `card__body`,
  etc.) to keep the CSS organized and easy to extend.

## How to view
Open `index.html` directly in a browser, or serve the folder with any
static server. `styles.css` must sit alongside `index.html` since it's
linked with a relative path.
