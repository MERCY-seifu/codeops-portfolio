import { useState } from "react";

// Step 1: each Dish owns a count state and an "Add" button.
// It also tells the parent (Menu) so the running total can update.
export default function Dish({ dish, onAdd }) {
  const [count, setCount] = useState(0);
  console.log(`Dish ${dish.name} render, count =`, count);

  function handleAdd() {
    setCount((c) => c + 1);
    onAdd(dish.price);
  }

  return (
    <li className="dish">
      <div>
        <strong>{dish.name}</strong> {dish.spicy && <span title="Spicy">🌶️</span>}
        <div className="muted">{dish.price} ETB</div>
      </div>
      <div className="dish-actions">
        {count > 0 && <span className="badge">× {count}</span>}
        <button onClick={handleAdd}>Add</button>
      </div>
    </li>
  );
}
