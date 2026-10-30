# Authentication and authorization status

## Current implementation

This is a local learning demo, not production authentication. It has two
hardcoded sample accounts in `lib/demo-users.js`, a signed seven-day session
cookie in `lib/auth.js`, and no account registration, password hashing,
Supabase Auth, or durable user store. Never use real customer data or the demo
password for a deployed service.

The private pages are `/checkout`, `/confirmation`, `/profile`, and
`/tracking`. `middleware.js` redirects requests without a session cookie to
`/signin`; this is only an early navigation check. The server-side
`requireSession()` in `lib/session-server.js` verifies the HMAC, expiry, and
demo-user allowlist before rendering protected pages. The order actions and
`/api/orders` endpoints independently check the session. Order lookup filters
by the authenticated user ID in `lib/demo-orders.js`.

The cookie is HTTP-only, SameSite=Lax, scoped to `/`, and Secure in production.
`SESSION_SECRET` must be a private random value of at least 32 bytes. The local
sample environment file is not a production secret and must never be committed.

## Required negative tests

These are test cases, not claims that a deployed Supabase application has been
verified. Run them against the production URL only after replacing this demo
authentication and deploying a configured backend.

| Attack | Expected result | Enforcement |
| --- | --- | --- |
| Open `/profile` in a private window with no cookies | Redirect to `/signin`; no profile data | `requireSession()` |
| Send an unsigned or modified `addis_eats_session` cookie to a private page or API | No private data; redirect or HTTP 401 | `verifySessionToken()` and `getSession()` |
| Sign in as Dawit, then request Selam's order reference at `/api/orders/AE-DEMO-812/status` | HTTP 404; no order details | `getOwnedOrder()` checks the owner ID |

Record the production URL, date, exact request, and observed response here after
the tests have actually been run:

- Deployment URL: **not configured**
- Test date and results: **not run against a deployment**

## Production work still required

Use Supabase Auth and server-verified users instead of the hardcoded account
list and custom demo cookie. Store orders and profiles in Supabase with RLS
enabled and owner policies for every user-owned row. Verify every protected
page, Server Action, and API route with a real Supabase session. Keep the
Supabase service-role key server-only; the browser may use only the anon key
with RLS enforcing access.
