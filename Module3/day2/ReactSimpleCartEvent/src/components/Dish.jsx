import React, { useState } from 'react'

const Dish = ({ item, cart, onCart }) => {

    const [qty, setQty] = useState(0);
    const { image, name, price, description } = item;

    const handleOrder = () => {
        setQty(prev => prev + 1);
        onCart(prev => prev + 1);   
    }

    return (
        <div className="dish-card">
            {/* <img src={image} alt={name} /> */}
            <div className="card-top">
                <h3>{name}</h3>
                <p>{price} ETB</p>
            </div>
            <p className="desc">{description}</p>

            <button onClick={handleOrder}>
                Add to Order
            </button>
            <span className="qty">{qty > 0 && qty}</span>
        </div>
    )
}

export default Dish