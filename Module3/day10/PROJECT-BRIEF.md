# Addis Eats — Project Brief

**Addis Eats** is a responsive food-ordering experience that helps people in
Addis Ababa discover Ethiopian dishes prepared by local home kitchens. The
project brings the menu, order review, checkout, and confirmation journey into
one clear application.

**Audience and need.** Residents and visitors who want to browse familiar
Ethiopian food, understand prices before ordering, and place an order without
calling multiple kitchens. The interface should be welcoming, readable on
mobile, and straightforward for first-time users.

**Experience goals.** Visitors can browse a fetched menu, filter by category,
see each dish's price and spice information, and add dishes to a shared cart.
They can review quantities and the order total, enter delivery details, and
reach a confirmation screen. The About screen explains the service and how an
order works. All screens are reachable through visible navigation or the
menu-to-cart-to-confirmation flow.

**Scope.** This capstone includes a React single-page scaffold, client-side
routes, accessible navigation and form labels, loading/error states for menu
data, and a reducer-backed cart shared through context. The brief, route map,
and running scaffold live together in this repository. Prices are displayed
in Ethiopian birr (ETB).

**Success criteria.** The app builds and runs locally; the menu loads from
`public/menu.json`; filtering and cart actions work; checkout validates
required contact and delivery fields; the confirmation screen is reachable;
and navigation works at every documented route.

**Out of scope.** This is a front-end teaching prototype. It does not process
payments, contact restaurants, save orders to a server, or guarantee delivery.
Customer and order details exist only for the current browser session.
