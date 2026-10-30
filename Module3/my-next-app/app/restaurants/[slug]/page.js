import Link from 'next/link'
import Image from 'next/image'
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
  return {
    title: restaurant ? restaurant.name : 'Restaurant',
    description: restaurant
      ? `${restaurant.description} Browse ${restaurant.name}'s Ethiopian menu on Addis Eats.`
      : 'Explore Ethiopian restaurants and local menus on Addis Eats.',
    openGraph: {
      title: restaurant?.name || 'Restaurant',
      description: restaurant?.description || 'Explore Ethiopian food on Addis Eats.',
      ...(restaurant?.image ? {
        images: [{
          url: `https://images.unsplash.com/${restaurant.image}?auto=format&fit=crop&w=1200&q=85`,
          alt: `${restaurant.name} Ethiopian food`,
        }],
      } : {}),
    },
  }
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
        >
          <Image
            src={`https://images.unsplash.com/${restaurant.image}?auto=format&fit=crop&w=1200&q=85`}
            alt={`${restaurant.name} Ethiopian food`}
            fill
            sizes="100vw"
            priority
          />
        </div>
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
