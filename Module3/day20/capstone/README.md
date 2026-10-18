# Addis Eats Capstone — Day 20

A Next.js App Router implementation focused on deliberate Server and Client
Component boundaries.

## Run locally

```powershell
npm install
npm run dev
```

Open the URL printed by Next.js. Discover nearby restaurants at `/` and browse
the Ethiopian dish menu at `/menu`.

## Routes

- `/` and `/restaurants` — restaurant discovery, restaurant search, delivery information,
  food categories, and today's offer.
- `/restaurants/[slug]` — restaurant details and that restaurant's menu.
- `/menu` — server-loaded, searchable, and category-filtered menu.
- `/dish/[id]` — dish detail, spice, size, extras, and quantity selection.
- `/cart` and `/checkout` — shared cart and demo delivery/payment checkout.
- `/confirmation` and `/tracking` — order receipt and visual delivery progress.
- `/profile` — editable sample profile, saved addresses, rewards, and reorder shortcut.
- `/about` — static service overview.
- unknown paths — a not-found screen with a menu link.

## Architecture and bundle

See [STRATEGY.md](./STRATEGY.md), [BOUNDARY.md](./BOUNDARY.md), and
[ROUTES.md](./ROUTES.md) for the migration strategy, component-by-component
rendering boundary, and route map. Menu data is read and validated on the
server from `data/menu.json`; only interaction leaves and the isolated cart
provider are client components.

The checkout is a front-end demonstration. It does not contact kitchens,
process payments, track a live courier, or send customer details to a server.
Cart, profile, and order state live in memory and reset on reload.

## Ethiopian food photography

Dish and restaurant photography uses the following online images. Each credit
links to the original file page and its license:

- [Doro wat — A L E M U S H, CC BY-NC-SA 2.0](https://www.flickr.com/photos/88717852@N00/230251590)
- [Ethiopian vegetarian sampler — Sdkb, CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Ethiopian_vegetarian_sampler.jpg)
- [Injera with eight kinds of stew — Artem.G, CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Injera_with_eight_kinds_of_stew.jpg)
- [Tibs — Khajitdadddy, CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Siga_Tibs.jpg)
- [Kitfo — Michael T., CC BY-SA 2.0](https://commons.wikimedia.org/wiki/File:Kitfo_(Ethiopian_Tartar).jpg)
- [Shiro and tibs — Joannekinginaddis, CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Sahring_Shiro_and_Tibs_in_Zweye,_Ethiopia.JPG)
- [Fit-fit — Temesgen Woldezion / Merhawie Woldezion, CC BY-SA 2.5](https://commons.wikimedia.org/wiki/File:Taita_fit-fit.jpg)
- [Kitfo, gomen, and aybe — Arsupeee, CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Kitfo,_gomen_and_aybe.jpg)
- [Injera — Edsel Little, CC BY-SA 2.0](https://commons.wikimedia.org/wiki/File:Injera_1.jpg)
- [Ethiopian coffee ceremony — ProtoplasmaKid, CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Coffee_ceremony_of_Ethiopia_and_Eritrea_1.jpg)
- [Tej, Ethiopian honey wine — Rod Waddington, CC BY-SA 2.0](https://commons.wikimedia.org/wiki/File:Tej,_Honey_Wine,_Ethiopia_(13796990915).jpg)
- [Misir wot and gomen besiga — Andy Li, CC0](https://commons.wikimedia.org/wiki/File:Misir_Wot_and_Gomen_Besiga_-_Abyssinia,_Brighton.jpg)
- [Genfo (Ga'at) — Stefan Alfons Tzeggai, CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Ga%27at_food.jpg)
- [Ethiopian sambusa — CarTick, CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Ethiopian_Sambusa.jpg)
- [Mutton tibs and injera — ShanaliCT, CC BY 4.0](https://commons.wikimedia.org/wiki/File:Mutton_tibs_and_injera.jpg)
- [Ethiopian meal photo — Deane Bayas, Pexels License](https://www.pexels.com/photo/breakfast-meals-on-plates-17486827/)

Dish cards use photos whose Commons titles or descriptions identify the named
dish; combo plates are labeled as combos. Dishes without a verified matching
photo are left out rather than shown with an unrelated image.
