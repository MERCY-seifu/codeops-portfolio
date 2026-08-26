import Dish from './Dish.jsx'
import './Menu.css'

// Static menu data. Not state yet — that comes with interactivity on Day 27.
const menu = [
  { id: 1, name: 'Doro Wat', price: 250 },
  { id: 2, name: 'Tibs', price: 220 },
  { id: 3, name: 'Shiro', price: 150 },
  { id: 4, name: 'Kitfo', price: 280 },
  { id: 5, name: 'Injera Combo', price: 180 },
]

function Menu() {
  return (
    <section className="menu">
      {menu.map((dish) => (
        <Dish key={dish.id} name={dish.name} price={dish.price} />
      ))}
    </section>
  )
}

export default Menu
