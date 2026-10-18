import { RestaurantCard } from '../HomeContent.jsx'
import { restaurants } from '../../lib/restaurants.js'

export const metadata = { title: 'Restaurants' }

export default async function RestaurantsPage({ searchParams }) {
  const params = await searchParams
  const query = typeof params?.q === 'string' ? params.q.trim().toLowerCase() : ''
  const visibleRestaurants = restaurants.filter((restaurant) =>
    !query || `${restaurant.name} ${restaurant.cuisine} ${restaurant.description} ${restaurant.tags.join(' ')}`
      .toLowerCase()
      .includes(query),
  )

  return (
    <main className="page-shell">
      <section className="listing-heading">
        <p className="eyebrow">{restaurants.length} Ethiopian kitchens deliver to Bole</p>
        <h1>Find your next favorite</h1>
        <p>Fresh meals from neighborhood kitchens, delivered to your door.</p>
        <form className="restaurant-search" action="/restaurants">
          <label className="sr-only" htmlFor="restaurant-query">Search restaurants</label>
          <input id="restaurant-query" type="search" name="q" placeholder="Search restaurants or cuisines" defaultValue={params?.q || ''} />
          <button className="button button--primary" type="submit">Search</button>
        </form>
      </section>
      <div className="section-head"><h2>{query ? `Results for “${params.q}”` : 'Popular near you'}</h2><span className="menu-count">{visibleRestaurants.length} restaurants</span></div>
      <div className="restaurant-grid restaurant-grid--listing">
        {visibleRestaurants.map((restaurant) => <RestaurantCard key={restaurant.slug} restaurant={restaurant} />)}
      </div>
      {visibleRestaurants.length === 0 && <p className="empty-state">No restaurants matched that search. Try another restaurant or cuisine.</p>}
    </main>
  )
}
