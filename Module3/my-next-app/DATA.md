# Data access and refresh

This capstone currently uses local sample data and in-memory demo state. It
does not use Supabase, and none of the records persist across a server restart.

| Data | Location and execution | Key / refresh | Reason and limitation |
| --- | --- | --- | --- |
| Menu and dish details | `lib/menu.js`; server-side read of `data/menu.json` | Dish `id`; read when a route renders | The 20 base dishes, names, categories, and ETB prices match `Module3/day21/data/menu.json`; no client fetch or external service. |
| Restaurant listings | `lib/restaurants.js`; server-side module data | Restaurant `slug`; read when a route renders | Small local discovery dataset. |
| Sample users | `lib/demo-users.js`; server-side module data | Fixed demo user `id` / normalized email | Demonstrates a protected flow only; no signup, password hashing, or durable identity store. |
| Orders and tracking | `lib/demo-orders.js`; server-side `Map` | Order `reference`, always filtered by session user ID | Demonstrates ownership checks; resets when the process restarts and is not shared reliably across serverless instances. |
| Cart and profile edits | React client state in the cart/profile components | Product ID and current component state | Keeps interaction responsive; resets on reload and is not authoritative. |

## Production data plan

Replace sample identity with Supabase Auth. Store profiles and orders in
Postgres, assign each row an `auth.uid()` owner, and enable RLS with explicit
`SELECT`, `INSERT`, `UPDATE`, and `DELETE` owner policies. Perform privileged
writes on the server, validate submitted product IDs and quantities against
server-owned menu data, and calculate all prices on the server. Revalidate
order/profile routes after successful writes; do not cache private responses.

No Supabase project, schema, policy, or production query has been verified for
this Day 24 copy.
