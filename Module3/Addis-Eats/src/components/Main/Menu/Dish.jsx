function Dish({ name, price }) {
  return (
    <div className="dish-card">
      <h3 className="dish-name">{name}</h3>
      <p className="dish-price">{price} birr</p>
    </div>
  )
}

export default Dish
