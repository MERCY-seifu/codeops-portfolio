import Link from 'next/link'
import Image from 'next/image'
import { restaurants } from '../lib/restaurants.js'

const foodCategories = [
  { label: 'Injera & Wot', category: 'Main', icon: '♨' },
  { label: 'Tibs', category: 'Main', icon: '✦' },
  { label: 'Kitfo', category: 'Main', icon: '♨' },
  { label: 'Fasting food', category: 'Vegetarian', icon: '✿' },
  { label: 'Breakfast', category: 'Breakfast', icon: '☀' },
  { label: 'Sides', category: 'Sides', icon: '◈' },
  { label: 'Traditional platters', category: 'Vegetarian', icon: '✿' },
]

export function RestaurantCard({ restaurant }) {
  return (
    <Link className="restaurant-card" href={`/restaurants/${restaurant.slug}`} aria-label={`Explore the menu at ${restaurant.name}`}>
      <div
        className="restaurant-card__image"
      >
        <Image
          src={restaurant.image}
          alt={`${restaurant.name} Ethiopian food`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 900px) 45vw, 25vw"
        />
        {restaurant.badge && <span className="restaurant-card__badge">{restaurant.badge}</span>}
      </div>
      <div className="restaurant-card__content">
        <div className="restaurant-card__title">
          <h3>{restaurant.name}</h3>
          <span className="rating"><span aria-hidden="true">★</span> {restaurant.rating}</span>
        </div>
        <p>{restaurant.cuisine}</p>
        <div className="restaurant-card__meta">
          <span>{restaurant.delivery}</span>
          <span>{restaurant.fee ? `${restaurant.fee} ETB` : 'Free delivery'}</span>
        </div>
      </div>
    </Link>
  )
}

export function HomeContent() {
  return (
    <main className="page-shell home-shell">
      <div className="home-heading">
        <div>
          <p className="eyebrow">Your neighborhood, served</p>
          <h1>A taste of Addis, made for you.</h1>
          <p>What are you craving today? <strong>{restaurants.length} Ethiopian kitchens</strong> are ready to explore.</p>
        </div>
        <Link className="delivery-chip" href="/menu"><span aria-hidden="true">⌖</span> Avg. delivery 30 min</Link>
      </div>

      <section className="offer-banner" aria-label="Today's offer">
        <div className="offer-banner__copy">
          <span className="offer-banner__eyebrow">✦ Today&apos;s offer</span>
          <h2>20% off your first order</h2>
          <p>Use code <strong>ADDIS20</strong> at checkout · Min order 150 ETB · Ends today</p>
          <div className="offer-banner__actions">
            <Link className="button button--light" href="/menu">Order now</Link>
            <Link href="/menu">See all offers <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="offer-banner__photo">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/1/13/Sahring_Shiro_and_Tibs_in_Zweye%2C_Ethiopia.JPG"
            alt="A colorful Ethiopian meal"
            fill
            sizes="(max-width: 640px) 78px, 118px"
          />
        </div>
      </section>

      <nav className="food-categories" aria-label="Browse food categories">
        {foodCategories.map(({ label, category, icon }) => (
          <Link className="category-chip" href={`/menu?category=${encodeURIComponent(category)}`} key={label}>
            <span aria-hidden="true">{icon}</span>{label}
          </Link>
        ))}
      </nav>

      <div className="home-columns">
        <section className="restaurant-section">
          <div className="section-head section-head--compact">
            <div>
              <p className="eyebrow">Made fresh near you</p>
              <h2>Popular near you</h2>
            </div>
            <Link className="text-link" href="/restaurants">See all restaurants <span aria-hidden="true">→</span></Link>
          </div>
          <div className="restaurant-grid">
            {restaurants.map((restaurant, index) => (
              <RestaurantCard key={restaurant.name} restaurant={{ ...restaurant, badge: index === 0 ? 'Bestseller' : index === 1 || index === 4 ? 'Fasting' : undefined }} />
            ))}
          </div>
        </section>

        <aside className="home-sidebar" aria-label="Delivery and recommendations">
          <section className="sidebar-card delivery-card">
            <div className="sidebar-card__topline">
              <span className="sidebar-card__label">Your delivery area</span>
              <span className="live-pill"><span aria-hidden="true">●</span> OPEN</span>
            </div>
            <h3>Bole, Addis Ababa</h3>
            <p>Fresh meals are arriving in about 30 minutes.</p>
            <div className="delivery-progress"><span /></div>
            <Link className="button button--primary button--full" href="/menu">Find your next meal</Link>
          </section>

          <section className="sidebar-card picks-card">
            <div className="sidebar-card__heading">
              <h3>Fasting-friendly picks</h3>
              <span aria-hidden="true">✿</span>
            </div>
            <Link className="mini-pick" href="/dish/6?restaurant=tsome-bet">
              <span className="mini-pick__image mini-pick__image--one" />
              <span><strong>Beyaynetu</strong><small>Tsome Bet · 150 ETB</small></span>
              <span className="mini-pick__arrow" aria-hidden="true">+</span>
            </Link>
            <Link className="mini-pick" href="/dish/2?restaurant=yod-abyssinia">
              <span className="mini-pick__image mini-pick__image--two" />
              <span><strong>Shiro</strong><small>Yod Abyssinia · 120 ETB</small></span>
              <span className="mini-pick__arrow" aria-hidden="true">+</span>
            </Link>
          </section>

          <section className="invite-card">
            <span aria-hidden="true">✦</span>
            <h3>Invite a friend, get 50 ETB</h3>
            <p>They get 20% off, too. Share the joy of real food.</p>
            <Link href="/about">How it works <span aria-hidden="true">→</span></Link>
          </section>
        </aside>
      </div>
    </main>
  )
}
