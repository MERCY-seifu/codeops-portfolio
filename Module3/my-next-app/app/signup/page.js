import Link from 'next/link'
import { signUp } from '../auth/actions.js'
import { isSupabaseConfigured } from '../../lib/supabase/config.js'

export const metadata = {
  title: 'Create account',
  description: 'Create an Addis Eats account to manage your profile and orders.',
  robots: { index: false, follow: false },
}

export default async function SignUpPage({ searchParams }) {
  const params = await searchParams
  const configured = isSupabaseConfigured()
  return (
    <main className="page-shell">
      <section className="content-card">
        <p className="eyebrow">Join Addis Eats</p>
        <h1>Create your account</h1>
        <p>Sign up with your email to manage your profile and orders.</p>
        {!configured && <p className="error" role="alert">Sign-up is unavailable until Supabase is configured by the site owner.</p>}
        {params?.error === 'configuration' && <p className="error" role="alert">Authentication is not configured. Please contact the site owner.</p>}
        {params?.error === 'validation' && <p className="error" role="alert">Enter a name, valid email, and password with at least 12 characters.</p>}
        {params?.error === 'registration' && <p className="error" role="alert">We could not create your account. Check your details and try again.</p>}
        {configured && <form action={signUp} className="signin-form">
          <label className="checkout-label">Full name<input type="text" name="name" autoComplete="name" maxLength={80} required /></label>
          <label className="checkout-label">Email<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
          <label className="checkout-label">Password<input type="password" name="password" autoComplete="new-password" minLength={12} maxLength={128} required /></label>
          <button className="button button--primary button--full" type="submit">Create account</button>
        </form>}
        <p className="demo-note">Already registered? <Link className="text-link" href="/signin">Sign in</Link></p>
        <Link className="text-link" href="/menu">Continue browsing without an account</Link>
      </section>
    </main>
  )
}
