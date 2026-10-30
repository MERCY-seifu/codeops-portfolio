# Performance and accessibility verification

## Production build measurements

These are from the Day 24 Addis Eats production build, served locally with
`next start`; they are not measurements from a public deployment.

| Route | Route JS | First Load JS |
| --- | ---: | ---: |
| `/` | 176 B | 111 kB |
| `/menu` | 2.24 kB | 118 kB |
| `/restaurants` | 176 B | 111 kB |
| `/cart` | 1.88 kB | 107 kB |
| Shared by all routes | — | 102 kB |

Build output also reports 34.1 kB of middleware. The production build
successfully generated all 22 static pages/routes.

## Live-web performance and accessibility

The following checks still need Lighthouse or hands-on testing against the
public deployment. Local layout checks do not replace these measurements.

| Measure | Target | Day 24 result | How to verify |
| --- | --- | --- | --- |
| Largest Contentful Paint | < 2.5 s | Not measured | Lighthouse on the deployed URL with throttling |
| Cumulative Layout Shift | < 0.1 | Not measured | Lighthouse on the deployed URL |
| Interaction to Next Paint | < 200 ms | Not measured | Lighthouse on the deployed URL |
| Keyboard-only flow | All actions reachable | Not tested | Use Tab, Shift+Tab, Enter, and Space without a mouse |
| Mobile layout at 390 px | No horizontal overflow; navigation visible | Passed locally; document width 375 px | Browser viewport smoke check |
| Real mobile viewport | Usable; no hover-only actions | Not tested | Open the deployed URL on a phone |
| Images | No image over ~150 kB | Not measured | Inspect deployed network transfer sizes |
| Metadata and headings | One page-level H1; share metadata and image | Not verified live | Inspect deployed source and share preview |
| Discovery routes | `sitemap.xml`, `robots.txt`; no private routes indexed | Not verified live | Open both deployed endpoints and inspect directives |

## Existing bundle comparison

## Build and verification record

- `eslint .`: passed
- `next build`: passed; route measurements are recorded above
- Local production smoke test: `/`, `/menu`, `/restaurants`, `/about`,
  `/robots.txt`, and `/sitemap.xml` returned HTTP 200; signed-out `/profile`
  redirected with HTTP 307 as expected
- Public live-site battery: **not run; no deployment URL is configured**
- Lighthouse Core Web Vitals: **not measured**
