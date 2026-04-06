import { NextRequest, NextResponse } from "next/server";

// No auth required — white-glove model, no client login
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
