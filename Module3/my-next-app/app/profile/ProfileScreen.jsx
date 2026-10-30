'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '../cart/useCart.js'

export function ProfileScreen({ user, orders }) {
  const { lastOrder, addItem } = useCart()
  const latestOrder = orders[0] || lastOrder
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(latestOrder?.phone || '+251 91 234 5678')
  const [addressEditor, setAddressEditor] = useState(false)
  const [extraAddress, setExtraAddress] = useState('')

  function reorder() {
    if (!latestOrder?.items?.length) {
      router.push('/restaurants/yod-abyssinia')
      return
    }
    latestOrder.items.forEach((item) => addItem(item, item.qty))
    router.push('/cart')
  }

  return (
    <div className="profile-layout">
      <section className="profile-main">
        <div className="profile-heading">
          <div><p className="eyebrow">Your Addis Eats account</p><h1>Profile</h1></div>
          <span className="language-chip">EN　⌄</span>
        </div>
        <section className="profile-card profile-user">
          <span className="profile-avatar">S</span>
          <span><strong>{name}</strong><small>{phone} · {user.email}</small></span>
          <button className="edit-button" type="button" aria-label="Edit profile details" aria-expanded={editing} onClick={() => setEditing((value) => !value)}>✎</button>
        </section>
        {editing && (
          <form className="profile-edit-form" onSubmit={(event) => { event.preventDefault(); setEditing(false) }}>
            <label className="checkout-label">Full name<input value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} /></label>
            <label className="checkout-label">Phone number<input value={phone} onChange={(event) => setPhone(event.target.value)} required maxLength={18} /></label>
            <button className="button button--primary" type="submit">Save profile</button>
          </form>
        )}
        <div className="profile-stats">
          <div><strong>{orders.length}</strong><span>Orders</span></div>
          <div><strong>340</strong><span>Points</span></div>
          <div><strong>4.8</strong><span>Your rating</span></div>
        </div>
        <section className="profile-section">
          <div className="section-head section-head--compact"><h2>Saved addresses</h2><button className="inline-action" type="button" aria-expanded={addressEditor} onClick={() => setAddressEditor((value) => !value)}>＋ Add new</button></div>
          <div className="profile-card address-card"><span className="selection-icon">⌂</span><span><strong>Home</strong><small>Bole Road, 3rd floor</small></span><span className="address-default">Default</span></div>
          <div className="profile-card address-card"><span className="selection-icon">▤</span><span><strong>Work</strong><small>Kazanchis Business Center, 5th floor</small></span><span className="edit-button">✎</span></div>
          {extraAddress && <div className="profile-card address-card"><span className="selection-icon">⌖</span><span><strong>Saved address</strong><small>{extraAddress}</small></span></div>}
          {addressEditor && (
            <form className="profile-edit-form" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); setExtraAddress(String(form.get('address')).trim()); setAddressEditor(false) }}>
              <label className="checkout-label">New address<input name="address" required maxLength={160} placeholder="Street, area, building" /></label>
              <button className="button button--primary" type="submit">Save address</button>
            </form>
          )}
        </section>
        <section className="profile-section">
          <div className="section-head section-head--compact"><h2>Recent orders</h2><Link className="text-link" href="/tracking">See all</Link></div>
          <article className="profile-card recent-order">
            <span className="recent-order__image" aria-hidden="true">♨</span>
            <span><strong>{latestOrder?.restaurant || 'No orders yet'}</strong><small>{latestOrder ? `${latestOrder.items.length} items · ${latestOrder.reference}` : 'Your placed demo orders appear here.'}</small><small>{latestOrder?.items.map((item) => item.name).join(', ') || user.email}</small></span>
            <button className="button button--small button--primary" type="button" onClick={reorder}>{latestOrder ? 'Reorder' : 'Menu'}</button>
          </article>
        </section>
      </section>
      <aside className="profile-aside">
        <section className="profile-points"><span aria-hidden="true">✦</span><p>Your rewards</p><h2>340 points</h2><p>Earn points with every order and turn them into tasty treats.</p><Link href="/menu">Explore rewards →</Link></section>
        <section className="profile-links">
          <Link href="/tracking"><span>▤</span> Order history <span>→</span></Link>
          <Link href="/about"><span>♡</span> Help &amp; support <span>→</span></Link>
          <Link href="/about"><span>⚙</span> Settings <span>→</span></Link>
        </section>
        <p className="demo-note">Profile edits and saved addresses are kept in this browser demo only.</p>
      </aside>
    </div>
  )
}
