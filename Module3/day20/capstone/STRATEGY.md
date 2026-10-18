# Addis Eats Capstone — Next.js Migration Strategy

## Goal

Migrate the Day 10 React capstone into Next.js App Router without dropping its
menu, filtering, cart, checkout, confirmation, About, or not-found screens.
Make restaurant discovery the entry screen and keep the Ethiopian ordering
journey discoverable across the route map.

## Route migration

| Capstone screen | Next.js route |
| --- | --- |
| Restaurant discovery | `/` and `/restaurants` |
| Restaurant menu and dish details | `/restaurants/[slug]` and `/dish/[id]` |
| Dish menu | `/menu` |
| Cart and checkout | `/cart` and `/checkout` |
| Order confirmation | `/confirmation` |
| Order tracking | `/tracking` |
| Profile | `/profile` |
| About the service | `/about` |
| Unknown route recovery | Next.js `not-found` route |

The root route renders restaurant discovery. The `/menu` route loads local
Ethiopian dishes on the server; category filters update `/menu?category=...`.
Restaurant routes select their menu from the same validated local dataset.

## Rendering and data

Ethiopian menu JSON and restaurant menus are loaded and validated on the server.
Static page content and dish presentation remain Server Components. Client code
is limited to interactive menu filters, dish options, cart actions, checkout,
profile edits, and the in-memory order/track screens.

Cart and checkout behavior is intentionally client-side for this learning
prototype; no payment or order data is sent to a server. See
[BOUNDARY.md](./BOUNDARY.md) for the exact component boundaries and production
build verification.
