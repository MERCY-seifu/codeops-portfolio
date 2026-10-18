import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDishes } from '../../../lib/menu.js'
import { getRestaurant, restaurants } from '../../../lib/restaurants.js'
import { DishList } from '../../menu/DishList.jsx'

export function generateStaticParams() {
  return restaurants.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const restaurant = getRestaurant(slug)
  return { title: restaurant ? restaurant.name : 'Restaurant' }
}

export default async function RestaurantPage({ params }) {
  const { slug } = await params
  const restaurant = getRestaurant(slug)
  if (!restaurant) notFound()

  const dishes = await getDishes()
  const menu = dishes.filter((dish) => restaurant.menuDishIds.includes(dish.id))

  return (
    <main className="page-shell">
      <Link className="back-link" href="/">← Back to restaurants</Link>
      <section className="restaurant-hero">
        <div
          className="restaurant-hero__image"
          role="img"
          aria-label={`${restaurant.name} food`}
          style={{ backgroundImage: `url(https://images.unsplash.com/${restaurant.image}?auto=format&fit=crop&w=1200&q=85)` }}
        />
        <div className="restaurant-hero__content">
          <p className="eyebrow">Restaurant · Bole, Addis Ababa</p>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <div className="restaurant-facts">
            <span>★ {restaurant.rating} ({restaurant.reviews} ratings)</span>
            <span>◷ {restaurant.delivery}</span>
            <span>{restaurant.fee ? `${restaurant.fee} ETB delivery` : 'Free delivery'}</span>
          </div>
        </div>
      </section>
      <nav className="restaurant-tags" aria-label="Restaurant categories">
        {restaurant.tags.map((tag) => <span className="category-chip" key={tag}>{tag}</span>)}
      </nav>
      <section>
        <div className="section-head">
          <div>
            <p className="eyebrow">Prepared fresh for you</p>
            <h2>Menu</h2>
          </div>
          <Link className="text-link" href="/cart">View your cart →</Link>
        </div>
        <DishList dishes={menu} restaurantSlug={slug} restaurantName={restaurant.name} />
      </section>
    </main>
  )
}
