import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseConfig } from './lib/supabase/config.js'

const protectedPaths = ['/checkout', '/confirmation', '/profile', '/tracking']

export async function middleware(request) {
  const { pathname, search } = request.nextUrl
  const config = getSupabaseConfig()
  if (!config) return NextResponse.next()

  let response = NextResponse.next({ request })
  const supabase = createServerClient(config.url, config.anonKey, {
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    },
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })
  const { data: { user } } = await supabase.auth.getUser()

  if (protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`)) && !user) {
    const signInUrl = new URL('/signin', request.url)
    signInUrl.searchParams.set('next', `${pathname}${search}`)
    const redirectResponse = NextResponse.redirect(signInUrl)
    response.cookies.getAll().forEach(({ name, value, ...options }) => redirectResponse.cookies.set(name, value, options))
    return redirectResponse
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
}
