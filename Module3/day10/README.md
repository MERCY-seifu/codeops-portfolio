# Addis Eats Capstone

A responsive React prototype for discovering Ethiopian home-kitchen dishes,
building an order, and stepping through checkout.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production build, run
`npm run build`.

## Project documents

- [Project brief](./PROJECT-BRIEF.md) — one-page problem, audience, scope, and success criteria.
- [Route map](./ROUTES.md) — screens, paths, and the primary user journey.

## Included screens

- **Menu** — fetched menu, category filters, dish details, and add-to-cart actions.
- **Cart & checkout** — quantity controls, total, and required delivery fields.
- **Order confirmation** — receipt after checkout, with a preview path from the cart.
- **About** — service overview and ordering steps.
- **Not found** — recovery link for unknown URLs.

This is a front-end scaffold only. It does not process payments or persist
orders on a server.
