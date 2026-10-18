# Addis Eats — Day 13

A Next.js App Router implementation focused on deliberate Server and Client
Component boundaries.

## Run locally

```powershell
npm install
npm run dev
```

Open the URL printed by Next.js. The menu is at `/menu`; `/` redirects there.

## Routes

- `/menu` — server-loaded and server-filtered menu. Category buttons update the
  URL and request a new server-rendered result.
- `/cart` — shared cart, quantity controls, and demo delivery form.
- `/confirmation` — confirmation preview or the latest in-memory demo receipt.
- `/about` — static service overview.
- unknown paths — a not-found screen with a menu link.

## Architecture and bundle

See [BOUNDARY.md](./BOUNDARY.md) for the component-by-component rendering
boundary and measured `/menu` First Load JS comparison. Menu data is read and
validated on the server from `data/menu.json`; only interaction leaves and the
isolated cart provider are client components.

The checkout is a front-end demonstration. It does not contact kitchens,
process payments, or send customer details to a server.
