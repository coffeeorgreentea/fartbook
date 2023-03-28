import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });

  // check for session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && req.nextUrl.pathname.startsWith("/login")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/app";
    return NextResponse.redirect(redirectUrl);
  }

  // Check auth condition
  if (!session && !req.nextUrl.pathname.startsWith("/login")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    // redirectUrl.searchParams.set(`action`, `login`);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app/:path*",
    "/app/image-generation/:path*",
    "/app/audio-generation/:path*",
    "/app/explore/:path*",
    "/api/:path*",
    "/app/settings/:path*",
    "/app/storage/:path*",
    "/login/:path*",
  ],
};
