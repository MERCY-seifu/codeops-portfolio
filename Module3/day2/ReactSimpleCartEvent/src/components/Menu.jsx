import React, { useState } from "react";
import { menu } from "../assets/data";
import Dish from "./Dish";
import Cart from "./Cart";

const Menu = () => {
  // Cart event
  const [cart, setCart] = useState(0);

  return (
    <>
      <Cart cart={cart} onCart={setCart}/>

      <div className="menu-list">
        {menu.map((item) => (
          <Dish item={item} cart={cart} onCart={setCart}/>
        ))}
      </div>
    </>
  );
};

export default Menu;
