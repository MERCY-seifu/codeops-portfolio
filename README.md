# Addis Eats

Week 1 mini-project: a single React app that brings together a fetched menu,
a category filter, a cart shared through context, a reducer owning the cart
transitions, and a custom `useFetch` hook.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL. The menu loads from `public/menu.json` through
`useFetch`, so no backend is required.

## Where each piece lives

| File | What it does |
| --- | --- |
| `src/hooks/useFetch.js` | Custom hook: `{ data, loading, error }`, re-fetches on URL change, aborts the in-flight request on cleanup. |
| `src/cart/cartReducer.js` | Pure reducer — `ADD_ITEM`, `REMOVE_ITEM`, `CLEAR_CART` — tested standalone against plain objects before it was wired into React. |
| `src/cart/CartProvider.jsx` | `useReducer` owning cart state, exposes `items`, `total`, `count`, and action helpers through context. The provider value is memoised with `useMemo` so consumers don't re-render on unrelated changes. |
| `src/cart/CartContext.js` / `useCart.js` | The context object and a small hook wrapper around `useContext`. |
| `src/Menu.jsx` | Ties the fetch hook, the category filter, and the dish grid together. Filtering and sorting run inside `useMemo`, keyed on the fetched list and the active category. |
| `src/components/CategoryFilter.jsx` | Pill row for switching categories. |
| `src/components/Header.jsx` | Reads the cart count via `useContext` for the badge. |
| `src/components/CheckoutPanel.jsx` | Reads cart items/total via `useContext` for the checkout view. |

## Verifying the memoisation

Open React DevTools → Profiler, record a render, and toggle the category
filter. `Header` and `CheckoutPanel` should not re-render from unrelated
state changes elsewhere in the tree, since the context value only changes
when the cart itself changes.

## Notes

- Prices are in Ethiopian birr (ETB); this is a teaching sample, not a real
  storefront.
- No backend: `menu.json` is served as a static file so `useFetch` has
  something real to hit.
