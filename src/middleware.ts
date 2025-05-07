// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRoleFromToken, getTokenInfo } from '@/lib/auth';

export const config = {
  matcher: [
    '/administrative/:path*',
    '/faculty/:path*',
    '/superadmin/:path*',
    '/'
    // you can add more protected paths here
  ],
};


export function middleware(request: NextRequest) {
  console.log('Middleware HIT:', request.nextUrl.pathname);

  const cookie = request.cookies.get('xyz_token');
  if (!cookie) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const token = cookie.value;
  const { role: userRole, exp } = getTokenInfo(token);
  console.log('Decoded role:', userRole, ' Exp:', exp);

  // 🚨 Check if token expired
  if (!userRole || !exp || exp * 1000 < Date.now()) {
    console.log('Token expired or invalid, clearing cookie and redirecting.');
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('xyz_token', '', { maxAge: 0 });
    return response;
  }

  const path = request.nextUrl.pathname;

  // 🚫 Block roles from accessing unauthorized routes
  if (path.startsWith('/superadmin') && userRole !== 'superadmin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (path.startsWith('/faculty') && userRole !== 'teacher') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (path.startsWith('/administrative') && !(userRole === 'registrar' || userRole === 'principal')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 🔄 Redirect logged-in users away from login page
  if (path === '/') {
    if (userRole === 'superadmin') {
      return NextResponse.redirect(new URL('/superadmin', request.url));
    }
    if (userRole === 'teacher') {
      return NextResponse.redirect(new URL('/faculty', request.url));
    }
    return NextResponse.redirect(new URL('/administrative', request.url));
  }

  return NextResponse.next();
}
