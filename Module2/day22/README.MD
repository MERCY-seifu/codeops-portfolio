# Birr Watch

Convert any currency to Ethiopian Birr (ETB) and keep a running watchlist of your conversions.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure, form, and watchlist container. Uses Tailwind CSS via CDN. |
| `style.css` | Small custom animations and focus styles that Tailwind's utilities don't cover. |
| `app.js` | All app logic: state, API calls, validation, rendering, persistence. |
| `README.md` | This file. |

## Setup

1. Get a free API key at [exchangerate-api.com](https://www.exchangerate-api.com) (Free plan).
2. Open `app.js` and replace the placeholder:
   ```js
   const API_KEY = "YOUR_API_KEY_HERE";
   ```
   with your real key.
3. Open `index.html` in a browser. No build step or server required.

## How it works

- **Form** — Enter an amount and a 3-letter currency code (e.g. `USD`, `GBP`, `KES`) and submit to convert it into ETB.
- **Validation** — The amount must be a positive number and the currency code must be exactly 3 letters. Negative or zero amounts are rejected before any network request is made.
- **Loading** — On submit, the app waits ~3 seconds (simulated delay via `setTimeout`) before showing the button as fetching, so users get clear loading feedback even on fast connections.
- **API call** — Uses the [Pair Conversion endpoint](https://www.exchangerate-api.com/docs/pair-conversion-requests):
  ```
  GET https://v6.exchangerate-api.com/v6/YOUR_API_KEY/pair/{CODE}/ETB/{AMOUNT}
  ```
- **Error handling** — All API calls are wrapped in `try/catch`. If the currency code is invalid, the key is wrong, or the network fails, the app shows **"No currency"** rather than crashing or displaying stale data.
- **Watchlist** — Stored as a plain array of objects in `state.watchlist`. Adding a currency that's already tracked updates that entry instead of creating a duplicate. Deleting a row uses a single delegated click listener on the watchlist container, so it works for every row without re-attaching listeners after each render.
- **Persistence** — The watchlist is saved to `localStorage` on every change and reloaded automatically when the page opens again.

## Design notes

The DOM is only ever updated for the parts that actually changed (the watchlist list, the button label/spinner, the error banner). The form's `<input>` elements are created once and never rebuilt via `innerHTML`, so typing in them never loses focus or cursor position — a common bug when `render()` regenerates the whole page on every state change.

## Currency codes

Codes follow [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) — three uppercase letters, e.g. `USD`, `EUR`, `GBP`, `KES`, `CNY`.