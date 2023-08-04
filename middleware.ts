import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/javascript/dashboard/filter/recent";
  redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

  // redirect user if they are trying to access a user's notifications page
  if (req.nextUrl.pathname.includes("/user/") && req.nextUrl.pathname.includes("/notifications")) {
    const username = req.nextUrl.pathname.split("/")[2];

    if (username && (!session || session.user?.user_metadata.user_name.toLowerCase() !== username.toLowerCase())) {
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  }

  // Check auth condition
  if (session?.user || req.nextUrl.searchParams.has("login")) {
    // Authentication successful, forward request to protected route.
    return res;
  }

  // Auth condition not met, redirect to home page.
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/hub/insights/:path*", "/user/:path", "/user/:username/notifications"],
};
