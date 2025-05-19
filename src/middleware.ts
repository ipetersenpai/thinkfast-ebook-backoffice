import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenInfo, getTokenFromCookies } from "@/lib/auth";
import { get } from "http";

export const config = {
  matcher: [
    "/administrative/:path*",
    "/faculty/:path*",
    "/superadmin/:path*",
    "/",
  ],
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookie = request.cookies.get("xyz_token");

  // 🚫 Not logged in
  if (!cookie) {
    if (path !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const token = cookie.value;
  const { role: userRole, exp } = getTokenInfo(token);

  // 🚫 Expired or invalid token
  if (!userRole || !exp || exp * 1000 < Date.now()) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("xyz_token", "", { maxAge: 0 });
    return response;
  }

  // ✅ Superadmin has access to all routes
  if (userRole === "superadmin") {
    if (path === "/") {
      return NextResponse.redirect(new URL("/superadmin", request.url));
    }
    return NextResponse.next();
  }

  // 🔐 Role-based access
  if (path.startsWith("/faculty") && userRole !== "teacher") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    path.startsWith("/administrative") &&
    userRole !== "registrar" &&
    userRole !== "principal"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path.startsWith("/superadmin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔄 Redirect from login page based on role
  if (path === '/') {
    if (userRole === 'teacher') {
      return NextResponse.redirect(new URL('/faculty', request.url))
    }
    return NextResponse.redirect(new URL('/administrative', request.url))
  }


  return NextResponse.next();
}
