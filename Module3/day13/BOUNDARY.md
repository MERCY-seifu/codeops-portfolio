# Server and Client Component Boundaries

## Server-rendered code

| Component | Why it runs on the server |
| --- | --- |
| `app/layout.js` | Defines document metadata and composes the app without browser state. |
| `app/menu/page.js` | Async route; awaits `getDishes()`, validates the local JSON, filters and sorts dishes before rendering. No hooks or browser code. |
| `lib/menu.js` | Reads and validates `data/menu.json`; protected by `server-only` so it cannot enter a client bundle. |
| `app/menu/DishList.jsx` | Renders server-provided dish data; only the add button is a client leaf. |
| `app/menu/page.js` to `FilterShell` | The server-rendered dish list is passed as `children`, not imported into the client shell. |
| `app/components/SiteHeader.jsx` | Static brand/navigation; the live cart count is isolated in `CartIndicator`. |
| `app/about/page.js` and route wrappers | Static page layout and metadata; interactive cart leaves are composed below them. |

## Client boundaries

| Component | Why it needs a client boundary |
| --- | --- |
| `app/menu/FilterShell.jsx` | Client filter shell accepts the server-rendered dish list through `children`; its category buttons navigate to server-filtered query routes. |
| `app/providers.jsx` and `app/cart/CartProvider.jsx` | Small client wrapper isolates the reducer-backed cart provider; the root layout remains a Server Component. |
| `app/components/CartControls.jsx` | Isolates both the live cart count and add-to-cart click handlers into small interactive leaves. |
| `app/cart/OrderScreens.jsx` | Quantity updates, checkout form submit, and the confirmation receipt use shared cart state. |

The cart reducer and context definition contain no hooks or browser APIs. They
are reached through client components and do not create their own client
boundary. `CategoryBar`, `useCart`, and `CartProvider` are included in their
containing client entry points rather than adding redundant directives.
There are four deliberate `"use client"` entry points in the app. In
particular, menu data and `getDishes` are server-only. No menu fetch hook or
menu loading/error state is shipped to the browser.

## First Load JS measurement

Measured in the same production build using Next.js 15.5.28, with a temporary
client-rendered `/menu-before` route using the same menu dataset and cart
button as a baseline. That comparison route was removed after measurement.
Both figures come from the `First Load JS` column in the Next build output.

| Menu implementation | First Load JS |
| --- | ---: |
| Before: client page with menu data and category state (`/menu-before`) | 108 kB |
| After: async server page and server-filtered menu (`/menu`) | 107 kB |

The server-rendered implementation reduces the measured first load by 1 kB
(about 0.9%). Dish records and category filtering are evaluated on the server
instead of shipping the dataset and filter logic in the menu page JavaScript.
The shared Next.js runtime and the necessary cart/filter interaction code
remain in the browser bundle.

Next reports route-specific `Size` separately from shared `First Load JS`;
this comparison uses `First Load JS` for both routes.
