# Capstone Route Map

| Path | Screen | Purpose | How to reach it |
| --- | --- | --- | --- |
| `/` | Restaurant discovery | Browse popular restaurants, food categories, and today's offer. | Home/brand link. |
| `/restaurants` | Restaurant list | Search restaurants by name, cuisine, and category. | Restaurants navigation or homepage link. |
| `/restaurants/yod-abyssinia` | Restaurant detail | View restaurant information and its menu. Other restaurant slugs use the same route. | Select a restaurant card. |
| `/menu` | Dish menu | Search, filter, and add dishes; category filter is reflected in the query string. | Search navigation or category links. |
| `/dish/1` | Dish detail | Choose spice, size, extras, and quantity before adding to the cart. | Select a dish image or title. |
| `/cart` | Cart | Change quantities, remove items, review delivery, and continue to checkout. | Cart navigation. |
| `/checkout` | Checkout | Select a saved or new address, choose a demo payment method, and apply a promo code. | Continue from the cart. |
| `/confirmation` | Confirmation | Review the completed demo receipt and continue to tracking. | Submit the checkout form. |
| `/tracking` | Order tracking | View order status, delivery estimate, route illustration, and courier contact controls. | Confirmation, order navigation, or profile. |
| `/profile` | Profile | Edit sample account details, save an address, view order history, or reorder. | Profile navigation. |
| `/about` | About | Learn the concept and order flow. | About link or footer. |
| `*` | Not found | Recover with a link to the menu. | Visit an unknown path. |

## Primary flow

`Restaurant discovery → restaurant menu → dish details → Cart → Checkout → Confirmation → Tracking`

Restaurant menus use the shared local dish dataset with restaurant-specific
category selections. Checkout, payment methods, profile, and tracking are a
front-end prototype; no external services are contacted. All routes are
directly addressable. Menu searches and categories are shareable in their URLs.
The cart is in memory and persists while navigating within the app, not across
reloads.
