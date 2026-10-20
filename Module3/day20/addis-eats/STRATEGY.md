# Addis Eats — Rendering and Delivery Strategy

## Goal

Deliver the complete Addis Eats menu-and-order experience with Next.js App
Router while keeping menu data and presentation on the server and reserving
client JavaScript for interactions that need browser state.

## Rendering choices

- The root layout, metadata, About page, menu route, and dish cards are Server
  Components.
- The async `/menu` route reads and validates the local `data/menu.json` file
  via a `server-only` module. Category selection is represented in the URL and
  filtering/sorting happens on the server.
- The server-rendered dish list is passed as `children` through the interactive
  filter shell. It is not imported into that client boundary.
- Cart state is owned by a reducer in the isolated `Providers` wrapper. Small
  cart controls and the cart/confirmation screens consume that shared state.
- The menu is dynamic because its category query determines the returned
  result. The About page and shell metadata are statically renderable.

## Delivery and trade-offs

The menu is bundled as local JSON, so it works without an API key or external
service and can be rendered on the server. A real service would replace the
file reader with a server-side database/API client and configure cache and
revalidation against the menu update frequency. Cart and checkout state are
intentionally in-memory for this prototype; reload persistence, payment, and
order submission require trusted backend services and are out of scope.

The production build and route responses are checked before delivery. The
measured menu bundle and exact Server/Client Component split are recorded in
[BOUNDARY.md](./BOUNDARY.md).
