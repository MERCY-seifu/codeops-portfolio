# Cut scope and remaining work

## Must before this can be presented as a deployed capstone

- Configure Supabase Auth and replace the hardcoded demo users and custom
  session cookie.
- Create persistent profile/order tables and enable/test owner-scoped RLS.
- Configure and deploy the app to Vercel with server-only secrets.
- Complete the main order flow against the deployed services.
- Run and record the three negative authorization tests against the live URL.
- Test a brand-new account and write down all empty, loading, and error states.
- Run the complete production verification battery and replace every
  "not tested" value in `PERF.md` with measured results.

## Deliberately out of scope for the deadline

- Real payment processing or contacting a restaurant.
- Live courier GPS or SMS notifications.
- Additional themes, animation, or new features.

The first list is not a set of optional polish items: until it is complete,
this folder is a local demonstration rather than the requested deployed
capstone.
