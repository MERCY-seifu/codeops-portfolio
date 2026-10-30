# Authentication setup

This app uses Supabase Auth for server-side email/password registration,
sign-in, email confirmation, sign-out, and protected routes. Passwords are not
stored or checked by this app.

1. In Supabase, enable email/password authentication and require email
   confirmation.
2. Set the minimum password length to at least 12 characters.
3. In `.env.local`, configure:
   - `NEXT_PUBLIC_SITE_URL` as the exact app origin (for example,
     `http://localhost:3000` for local development).
   - `NEXT_PUBLIC_SUPABASE_URL` as the Supabase project API URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` as the project publishable/anon key.
4. Add `${NEXT_PUBLIC_SITE_URL}/auth/callback` to the Supabase Auth redirect
   URL allow list. Add the production origin separately before deployment.
5. Restart the Next.js server after changing environment variables.

Only the Supabase publishable/anon key belongs in `NEXT_PUBLIC_*` variables.
Never expose a service-role key in this app or in browser code. Supabase owns
password hashing, email verification, and authentication tokens; the server
validates users with `auth.getUser()` before granting access to protected
pages and order APIs.

Order, cart, and profile-edit data are still demonstration data and are not
persisted to Supabase.
