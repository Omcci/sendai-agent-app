import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isWalletConnected = request.cookies.get("wallet");
  const path = request.nextUrl.pathname;

  if (path === "/dashboard" || path === "/market-data") {
    return NextResponse.next();
  }

  if (!isWalletConnected && path.startsWith("/dashboard/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/market-data/:path*"],
};
