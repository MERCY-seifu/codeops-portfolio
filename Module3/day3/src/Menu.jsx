import { useState } from "react";
import { dishes } from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

export default function Menu() {
  // Step 2: lifted category state
  const [category, setCategory] = useState("All");
  // Step 4: running total in ETB
  const [total, setTotal] = useState(0);
  console.log("Menu render:", { category, total });

  // Derived list: not stored in state, computed from category
  const visible =
    category === "All" ? dishes : dishes.filter((d) => d.category === category);

  return (
    <main>
      <h1>Addis Eats</h1>
      <CategoryBar selected={category} onSelect={setCategory} />
      <DishList dishes={visible} onAdd={(price) => setTotal((t) => t + price)} />
      <p className="total">Order total: <strong>{total} ETB</strong></p>
      <OrderForm total={total} />
    </main>
  );
}
