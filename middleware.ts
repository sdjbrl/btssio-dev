import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

function redirectToLogin(nextUrl: URL) {
  const loginUrl = new URL("/login", nextUrl);
  const callbackTarget = nextUrl.search
    ? `${nextUrl.pathname}${nextUrl.search}`
    : nextUrl.pathname;
  loginUrl.searchParams.set("callbackUrl", callbackTarget);
  return NextResponse.redirect(loginUrl);
}

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";

  // Allow NextAuth API routes
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // /login: redirect to / if already logged in
  if (nextUrl.pathname === "/login") {
    if (isLoggedIn) return NextResponse.redirect(new URL("/", nextUrl));
    return NextResponse.next();
  }

  // /admin: require admin role
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) return redirectToLogin(nextUrl);
    if (!isAdmin) return NextResponse.redirect(new URL("/", nextUrl));
    return NextResponse.next();
  }

  // All other routes: require authentication
  if (!isLoggedIn) return redirectToLogin(nextUrl);

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
