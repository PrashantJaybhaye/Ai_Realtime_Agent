import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if user has a session cookie
  const sessionCookie = request.cookies.get('session')
  const isAuthenticated = !!sessionCookie?.value
  
  // Define public routes that don't require authentication
  const publicRoutes = ['/landing', '/sign-in', '/sign-up']
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/landing', request.url))
  }
  
  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // If user is authenticated and on landing page, redirect to dashboard
  if (isAuthenticated && pathname === '/landing') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // If user is not authenticated and on root, redirect to landing
  if (!isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/landing', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}