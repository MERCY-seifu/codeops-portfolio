import React from 'react'

const Cart = ({ cart, onCart }) => {
  return (
    <div className="cart">
        <h1>Cart</h1>
        <h2>{cart}</h2>
    </div>
  )
}

export default Cart