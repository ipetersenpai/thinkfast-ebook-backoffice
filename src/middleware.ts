// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRoleFromToken } from '@/lib/auth';  // ← pull in your shared helper

export const config = {
  matcher: '/(.*)',  // run on all routes
};

export function middleware(request: NextRequest) {
  console.log('Middleware HIT:', request.nextUrl.pathname);

  // 1️⃣ Grab the token from cookies
  const cookie = request.cookies.get('xyz_token');
  if (!cookie) {
    // no token → if not on "/", redirect to login
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const token = cookie.value;

  // 2️⃣ Use your lib helper to extract the role
  const userRole = getRoleFromToken(token);
  console.log('Decoded role:', userRole);

  if (!userRole) {
    // invalid token or no role claim → redirect to login
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3️⃣ If we're on "/" (login), redirect away based on role
  if (request.nextUrl.pathname === '/') {
    if (userRole === 'superadmin') {
      return NextResponse.redirect(new URL('/superadmin', request.url));
    }
    if (userRole === 'teacher') {
      return NextResponse.redirect(new URL('/faculty', request.url));
    }
    // default for registrar/principal
    return NextResponse.redirect(new URL('/administrative', request.url));
  }

  // 4️⃣ Otherwise, allow the request through
  return NextResponse.next();
}
