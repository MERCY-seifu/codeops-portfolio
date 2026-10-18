'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AddToCartButton } from '../../components/CartControls.jsx'

const sizeOptions = [
  { label: 'Regular', extra: 0 },
  { label: 'Large', extra: 70 },
]

const extras = [
  { label: 'Extra injera', extra: 25 },
  { label: 'Ayib cheese', extra: 40 },
]

export function DishDetail({ dish, restaurant }) {
  const [spice, setSpice] = useState(dish.spicy ? 'Medium' : 'Mild')
  const [size, setSize] = useState(sizeOptions[0])
  const [selectedExtras, setSelectedExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.extra, 0)
  const unitPrice = dish.price + size.extra + extrasPrice
  const cartDish = {
    ...dish,
    price: unitPrice,
    name: `${dish.name} · ${size.label}${selectedExtras.length ? ` · ${selectedExtras.map((item) => item.label).join(', ')}` : ''}`,
    id: `${restaurant?.slug || 'yod-abyssinia'}-${dish.id}-${size.label}-${spice}-${selectedExtras.map((item) => item.label).join('-')}`,
    restaurant: restaurant?.name || 'Yod Abyssinia',
  }

  function toggleExtra(option) {
    setSelectedExtras((current) =>
      current.some((item) => item.label === option.label)
        ? current.filter((item) => item.label !== option.label)
        : [...current, option],
    )
  }

  return (
    <article className="dish-detail">
      <Link className="back-link" href={restaurant ? `/restaurants/${restaurant.slug}` : '/menu'}>← Back to {restaurant ? restaurant.name : 'menu'}</Link>
      <div
        className="dish-detail__image"
        role="img"
        aria-label={`${dish.name} prepared Ethiopian dish`}
        style={{ backgroundImage: `url(${dish.image})` }}
      />
      <div className="dish-detail__content">
        <div className="dish-detail__heading">
          <div>
            <h1>{dish.name}</h1>
            <p>{restaurant?.name || 'Yod Abyssinia'} · {dish.price} ETB</p>
          </div>
          <span className="rating">★ 4.8 · 320+ ratings</span>
        </div>
        <p className="dish-detail__description">{dish.description} Served with fresh injera and a little taste of home.</p>
        <section className="option-section">
          <div className="option-heading"><h2>Spice level</h2><span>Required</span></div>
          <div className="option-row">
            {['Mild', 'Medium', 'Hot'].map((option) => (
              <button className={`option-button${spice === option ? ' is-selected' : ''}`} type="button" key={option} aria-pressed={spice === option} onClick={() => setSpice(option)}>
                {option === 'Hot' ? '♨ ' : ''}{option}
              </button>
            ))}
          </div>
        </section>
        <section className="option-section">
          <div className="option-heading"><h2>Size</h2><span>Choose one</span></div>
          <div className="option-row">
            {sizeOptions.map((option) => (
              <button className={`option-button option-button--price${size.label === option.label ? ' is-selected' : ''}`} type="button" key={option.label} aria-pressed={size.label === option.label} onClick={() => setSize(option)}>
                <span>{option.label}<small>{dish.price + option.extra} ETB</small></span>
                <span className="radio-mark" aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>
        <section className="option-section">
          <div className="option-heading"><h2>Extras</h2><span>Optional</span></div>
          {extras.map((option) => {
            const checked = selectedExtras.some((item) => item.label === option.label)
            return (
              <label className="extra-option" key={option.label}>
                <input type="checkbox" checked={checked} onChange={() => toggleExtra(option)} />
                <span>{option.label}</span>
                <span>+{option.extra} ETB</span>
              </label>
            )
          })}
        </section>
        <div className="dish-detail__actions">
          <div className="quantity-control" aria-label="Quantity">
            <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
            <span>{quantity}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}>+</button>
          </div>
          <AddToCartButton dish={cartDish} quantity={quantity} onAdded={() => setAdded(true)}>
            {added ? `Added · ${unitPrice * quantity} ETB` : `Add to cart · ${unitPrice * quantity} ETB`}
          </AddToCartButton>
        </div>
        {added && <p className="success-message" role="status">Added to your cart. <Link href="/cart">View cart →</Link></p>}
      </div>
    </article>
  )
}
