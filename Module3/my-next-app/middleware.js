import { NextResponse } from 'next/server'
import { SESSION_COOKIE } from './lib/auth.js'

const protectedPaths = ['/checkout', '/confirmation', '/profile', '/tracking']

export function middleware(request) {
  const { pathname, search } = request.nextUrl
  if (!protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next()
  }
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next()

  const signInUrl = new URL('/signin', request.url)
  signInUrl.searchParams.set('next', `${pathname}${search}`)
  return NextResponse.redirect(signInUrl)
}

export const config = {
  matcher: ['/checkout/:path*', '/confirmation/:path*', '/profile/:path*', '/tracking/:path*'],
}
