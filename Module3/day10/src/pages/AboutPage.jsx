import { Link } from 'react-router-dom'

const steps = [
  ['Browse', 'Explore dishes and find something that feels like home.'],
  ['Build your order', 'Add favorites and check your total before checkout.'],
  ['Enjoy', 'Share delivery details in the demo flow and view your receipt.'],
]

export function AboutPage() {
  return (
    <section className="page-section about-page">
      <p className="eyebrow">Rooted in community</p>
      <h1>Good food, closer to home.</h1>
      <p className="about-intro">
        Addis Eats is a concept for discovering the generous flavors of
        Ethiopia&apos;s home kitchens. We bring the neighborhood menu into one
        welcoming place, so it&apos;s easy to find a favorite or try something new.
      </p>
      <div className="steps-grid">
        {steps.map(([title, description], index) => (
          <article className="step-card" key={title}>
            <span className="step-number">0{index + 1}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <p className="prototype-note">
        This capstone is a front-end prototype. Orders are not sent to a kitchen,
        and payment is not processed.
      </p>
      <Link className="button button--primary" to="/">Explore the menu</Link>
    </section>
  )
}
