import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "rv_session";
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/checkout",
  "/welcome",
  "/pricing",
  "/contact",
  "/privacy",
  "/terms",
  "/demo",
  "/api/auth/login",
  "/api/checkout",
  "/api/leads",
  "/api/onboard",
  "/api/webhooks",
  "/api/create-agent",
  "/api/voice-preview",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const secret = new TextEncoder().encode(
    process.env.SESSION_SECRET || "allthecalls-change-this-in-production"
  );

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
