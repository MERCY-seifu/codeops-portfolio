import Link from 'next/link'
import { signIn } from '../auth/actions.js'

export const metadata = {
  title: 'Sign in',
  description: 'Sign in to your Addis Eats demo account to see your orders and profile.',
  robots: { index: false, follow: false },
}

export default async function SignInPage({ searchParams }) {
  const params = await searchParams
  const next = typeof params?.next === 'string' ? params.next : '/profile'
  return (
    <main className="page-shell">
      <section className="content-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in to Addis Eats</h1>
        <p>Use either sample account. Both accounts use the same demo password.</p>
        {params?.error === 'credentials' && <p className="error" role="alert">Email or password is incorrect.</p>}
        <form action={signIn} className="signin-form">
          <input type="hidden" name="next" value={next} />
          <label className="checkout-label">Email<input type="email" name="email" autoComplete="username" required /></label>
          <label className="checkout-label">Password<input type="password" name="password" autoComplete="current-password" required /></label>
          <button className="button button--primary button--full" type="submit">Sign in</button>
        </form>
        <p className="demo-note">Demo: selam@example.com or dawit@example.com · Password: EatsDemo123!</p>
        <Link className="text-link" href="/menu">Continue browsing without an account</Link>
      </section>
    </main>
  )
}
