import Link from 'next/link'

export default function AboutPage() {
  return (
    <section className="content-card">
      <p className="eyebrow">Rooted in community</p>
      <h1>Good food, closer to home.</h1>
      <p>
        Addis Eats is a concept for discovering the generous flavors of
        Ethiopia&apos;s home kitchens. Browse local dishes, build an order, and
        review delivery details in one welcoming place.
      </p>
      <h2>How it works</h2>
      <ol>
        <li>Browse Ethiopian favorites and filter the menu by category.</li>
        <li>Add dishes to your shared cart and review the total.</li>
        <li>Complete the demo checkout and view a confirmation receipt.</li>
      </ol>
      <p>Prototype only: orders are not sent to kitchens and payment is not processed.</p>
      <Link className="button button--primary" href="/menu">Explore the menu</Link>
    </section>
  )
}
