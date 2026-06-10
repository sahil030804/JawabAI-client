import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = new Set([
  '/',
  '/login',
  '/signup',
  '/pricing',
  '/privacy',
  '/terms',
  '/checkout',
  '/payment-success',
]);

const apiPrefix = '/api';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow API routes, static assets, public pages, and backend API paths
  if (
    pathname.startsWith(apiPrefix) ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/meta') ||
    pathname.startsWith('/knowledge-base') ||
    pathname.startsWith('/health-check') ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/favicon') ||
    publicRoutes.has(pathname)
  ) {
    return NextResponse.next();
  }

  // Protect dashboard routes — check session by calling auth profile
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding') || pathname.startsWith('/profile')) {
    try {
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:3120';
      const response = await fetch(`${backendUrl}/auth/profile`, {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      });

      if (response.ok) {
        return NextResponse.next();
      }
    } catch {
      // If the server is unavailable, still redirect to login
    }

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
