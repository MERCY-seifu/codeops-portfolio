import Link from 'next/link'
import { signIn } from '../auth/actions.js'
import { isSupabaseConfigured } from '../../lib/supabase/config.js'

export const metadata = {
  title: 'Sign in',
  description: 'Sign in to your Addis Eats demo account to see your orders and profile.',
  robots: { index: false, follow: false },
}

export default async function SignInPage({ searchParams }) {
  const params = await searchParams
  const next = typeof params?.next === 'string' ? params.next : '/profile'
  const configured = isSupabaseConfigured()
  return (
    <main className="page-shell">
      <section className="content-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in to Addis Eats</h1>
        <p>Sign in to manage your profile and orders.</p>
        {!configured && <p className="error" role="alert">Sign-in is unavailable until Supabase is configured by the site owner.</p>}
        {params?.error === 'credentials' && <p className="error" role="alert">Email or password is incorrect.</p>}
        {params?.error === 'configuration' && <p className="error" role="alert">Authentication is not configured. Please contact the site owner.</p>}
        {params?.error === 'confirmation' && <p className="error" role="alert">That confirmation link is invalid or expired. Please sign up again.</p>}
        {params?.notice === 'check-email' && <p role="status">Check your email to confirm your account, then sign in.</p>}
        {params?.confirmed === '1' && <p role="status">Your email is confirmed. You can now sign in.</p>}
        {configured && <form action={signIn} className="signin-form">
          <input type="hidden" name="next" value={next} />
          <label className="checkout-label">Email<input type="email" name="email" autoComplete="username" required /></label>
          <label className="checkout-label">Password<input type="password" name="password" autoComplete="current-password" maxLength={128} required /></label>
          <button className="button button--primary button--full" type="submit">Sign in</button>
        </form>}
        <p className="demo-note">New to Addis Eats? <Link className="text-link" href="/signup">Create an account</Link></p>
        <Link className="text-link" href="/menu">Continue browsing without an account</Link>
      </section>
    </main>
  )
}
