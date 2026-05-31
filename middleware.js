import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/dashboard']
  const authRoutes = ['/login', '/register']

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
}