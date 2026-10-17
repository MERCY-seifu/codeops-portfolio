# Addis Eats: interactive menu (Day 28 exercise)

React + Vite. The menu is driven by state:

- Category filter: state lifted into `Menu`, passed to `CategoryBar` and `DishList`
- Per-dish counter: `Dish` keeps its own `count` and tells `Menu` via `onAdd`
- Running order total in ETB (state in `Menu`)
- Controlled TeleBirr delivery form (`OrderForm`, one state object, live validation)

## Run
    npm install
    npm run dev

## Check
    npm run lint
    npm run build
