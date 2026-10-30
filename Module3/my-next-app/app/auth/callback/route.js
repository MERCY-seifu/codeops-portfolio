import { redirect } from 'next/navigation'
import { createClient } from '../../../lib/supabase/server.js'

export async function GET(request) {
  const code = new URL(request.url).searchParams.get('code')
  if (!code) redirect('/signin?error=confirmation')

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) redirect('/signin?error=confirmation')

  redirect('/profile')
}
