# Data access and refresh

This capstone uses Supabase Auth for account identity. Menu and restaurant
catalog data remain local; demo orders and client-side cart/profile state are
not persisted across a server restart or page reload.

| Data | Location and execution | Key / refresh | Reason and limitation |
| --- | --- | --- | --- |
| Menu and dish details | `lib/menu.js`; server-side read of `data/menu.json` | Dish `id`; read when a route renders | The 20 base dishes, names, categories, and ETB prices match `Module3/day21/data/menu.json`; no client fetch or external service. |
| Restaurant listings | `lib/restaurants.js`; server-side module data | Restaurant `slug`; read when a route renders | Small local discovery dataset. |
| Accounts and sessions | `lib/supabase/server.js`; Supabase Auth and server-verified cookies | Supabase user UUID and confirmed email | Supabase manages passwords and email confirmation; only the publishable key is used by this app. |
| Orders and tracking | `lib/demo-orders.js`; server-side `Map` | Order `reference`, always filtered by session user ID | Demonstrates ownership checks; resets when the process restarts and is not shared reliably across serverless instances. |
| Cart and profile edits | React client state in the cart/profile components | Product ID and current component state | Keeps interaction responsive; resets on reload and is not authoritative. |

## Production data plan

Store profiles and orders in Postgres, assign each row an `auth.uid()` owner, and enable RLS with explicit
`SELECT`, `INSERT`, `UPDATE`, and `DELETE` owner policies. Perform privileged
writes on the server, validate submitted product IDs and quantities against
server-owned menu data, and calculate all prices on the server. Revalidate
order/profile routes after successful writes; do not cache private responses.

No Supabase profile/order schema, policy, or production data query has been
configured for this Day 24 copy.
