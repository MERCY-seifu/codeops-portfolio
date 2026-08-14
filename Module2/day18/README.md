# Addis Market — Order Summary

## What this is
A small pricing module (`pricing.js`) plus a script (`summary.js`) that
takes an array of orders (`orders.js`) and produces a per-order total
(with VAT) and a grand total, all formatted in ETB.

## Files
- `pricing.js` — exports `total`, `withVat`, and `format`
- `orders.js` — sample order data (array of order objects, each with
  a list of `{ name, price, qty }` items)
- `summary.js` — imports both, processes the orders, prints the summary

## How to run
```
node summary.js
```

## Techniques used

- **`export` / `import`** — `pricing.js` exports its three functions;
  `summary.js` imports them and imports the `orders` array from
  `orders.js`.
- **`reduce`** — used twice:
  1. Inside `pricing.js`'s `total(items)`, to sum up an order's line
     items (`price * qty` for each, destructuring `{ price, qty }`
     straight out of the parameter list).
  2. In `summary.js`, to sum every order's total into one grand total.
- **Destructuring** — `total(items)` destructures `{ price, qty }`
  directly in the `reduce` callback's parameter list instead of
  writing `item.price` / `item.qty`.
- **`map` + spread** — `orders.map(order => ({ ...order, total: ... }))`
  copies every existing field on the order (via `...order`) and adds a
  new `total` field, without mutating the original `orders` array.
- **`filter`** — `ordersWithTotals.filter(order => order.total > 500)`
  produces a second, separate list containing only orders over 500 ETB.
- **VAT calculation** — `withVat(amount)` applies a flat 15% VAT rate
  on top of the raw item subtotal.
- **Formatting** — `format(amount)` turns a raw number into a
  comma-separated, two-decimal ETB string (e.g. `1,552.50 ETB`).

## Self-check
- [x] `withVat` and `format` exported from `pricing.js`
- [x] Both imported into `summary.js`
- [x] `reduce` used to total each order's items, destructuring `{ price, qty }`
- [x] `map` + spread used to attach a `total` field to each order
      without mutating the original order objects
- [x] `filter` used to list only orders over 500 ETB
- [x] A formatted per-order summary and a grand total are printed
- [x] Ran with `node summary.js` and confirmed the output looks correct






# TeleBirr Transaction Report

A small report generator over a list of TeleBirr transactions for an Addis
shop, built with `map` / `filter` / `reduce`, destructuring, spread, and ES
modules.

## Modules

- **`transactions.js`** — Owns the data. Exports the raw `transactions`
  array (`{ id, customer, amount, type }` objects, `type` is `"credit"` or
  `"debit"`, `amount` in ETB). No logic lives here.

- **`report.js`** — Owns the logic. Exports pure functions that consume
  transaction arrays and return summaries or formatted strings:
  - `totalByType(txns, type)` — `filter` + `reduce` to total credits or debits.
  - `splitByType(txns)` — `filter` to split a list into `{ credits, debits }`.
  - `formatReceipts(txns)` — `map` with `{ id, customer, amount, type }`
    destructuring to build formatted receipt lines.
  - `correctAmount(txn, newAmount)` — `spread` to return a corrected copy
    of a transaction without mutating the original.
  - `netBalance(txns)` — credits minus debits, using `totalByType`.

- **`app.js`** — Owns wiring/printing. Imports `transactions` from
  `transactions.js` and the summary functions from `report.js`, then prints
  the full report to the console.

## Run it

```bash
node app.js
```

## Sample output

```
=== TeleBirr Transaction Report ===

Receipts:
 #1 Almaz      -250 ETB (debit)
 #2 Dawit      +600 ETB (credit)
 #3 Tigist     -180 ETB (debit)
 #4 Bereket    +1200 ETB (credit)
 #5 Hana       -90 ETB (debit)
 #6 Samuel     +450 ETB (credit)

Totals:
  Total credits: 2250 ETB
  Total debits:  520 ETB
  Net balance:   1730 ETB

Correction example (spread, no mutation):
  original: { id: 3, customer: 'Tigist', amount: 180, type: 'debit' }
  corrected: { id: 3, customer: 'Tigist', amount: 200, type: 'debit' }
```

Note how the corrected copy has the updated `amount: 200` while the
`original` transaction in the array is untouched — that's the spread
operator producing a new object instead of mutating the existing one.

## Pushing to GitHub

```bash
git init
git add transactions.js report.js app.js README.md
git commit -m "TeleBirr transaction report: modules + sample output"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```