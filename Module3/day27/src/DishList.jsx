import Dish from "./Dish";

export default function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) return <p>No dishes in this category.</p>;
  return (
    <ul className="dish-list">
      {dishes.map((d) => (
        <Dish key={d.id} dish={d} onAdd={onAdd} />
      ))}
    </ul>
  );
}
