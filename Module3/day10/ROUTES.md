# Route Map

| Path | Screen | Purpose | Ways to reach it |
| --- | --- | --- | --- |
| `/` | Menu | Browse dishes, filter by category, and add items to the cart. | Brand link or Menu navigation. |
| `/cart` | Cart & checkout | Adjust quantities, review the total, and enter delivery details. | Cart button in the header. |
| `/confirmation` | Order confirmation | Show the placed order receipt or a reachable empty-state preview. | Submit a valid checkout, or use the preview link on the cart screen. |
| `/about` | About | Explain the service and the ordering process. | About navigation or footer link. |
| `*` | Not found | Explain that a path is unavailable and link back to the menu. | Any unrecognized URL. |

## Primary journey

`Menu → add a dish → Cart & checkout → submit delivery details → Order confirmation`

The cart is held in React context while moving between routes. Menu data is
loaded from `public/menu.json`; checkout is a front-end demonstration and does
not submit personal information to a server.
