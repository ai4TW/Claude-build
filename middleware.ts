import { NextRequest, NextResponse } from "next/server";

// No auth required — white-glove model, no client login
const COOKIE = "atc_variant";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days — long enough to span the whole test window

// Known crawlers always get Variant A (the control) so search engines never
// index two different homepages under the same URL. Keep this list ahead of
// the random split below.
const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|googlebot|bingbot|duckduckbot|baiduspider|yandex|ahrefsbot|semrushbot|mj12bot/i;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") || "";
  if (BOT_UA.test(userAgent)) {
    return NextResponse.next();
  }

  const existing = request.cookies.get(COOKIE)?.value;
  const variant: "a" | "b" = existing === "a" || existing === "b" ? existing : Math.random() < 0.5 ? "a" : "b";

  const response =
    variant === "b" ? NextResponse.rewrite(new URL("/variant-b", request.url)) : NextResponse.next();

  if (!existing) {
    response.cookies.set(COOKIE, variant, { maxAge: COOKIE_MAX_AGE, path: "/", sameSite: "lax" });
    // Brand A/B assignment log — the denominator for conversion rate.
    // Read it with: vercel logs <deployment-url> | grep '"evt":"ab_assign"'
    // then count occurrences of "variant":"a" vs "variant":"b". The
    // numerator is the matching `source` on each row in the Supabase
    // video_leads table ("homepage-hero" = A, "homepage-hero-b" = B).
    console.log(JSON.stringify({ evt: "ab_assign", test: "brand-midnight-vs-headroom", variant, ts: Date.now() }));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
