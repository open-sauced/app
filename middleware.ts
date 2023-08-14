// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// import { pathToRegexp } from "path-to-regexp";

// HACK: this is to get around the fact that the normal next.js middleware is not always functioning
// correctly.
// see https://github.com/open-sauced/insights/pull/1549
// prettier-ignore
const pathsToMatch = [
  "/hub/insights/:path*",
  "/feed/",
  "/user/notifications",
  "/user/settings",
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;

  // if (!pathsToMatch.some((matcher) => pathToRegexp(matcher).test(req.nextUrl.pathname))) {
  //   return res;
  // }

  // // Create authenticated Supabase Client.
  // const supabase = createMiddlewareClient({ req, res });
  // // Check if we have a session
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // // Check auth condition
  // if (session?.user || req.nextUrl.searchParams.has("login")) {
  //   // Authentication successful, forward request to protected route.
  //   return res;
  // }

  // // Auth condition not met, redirect to home page.
  // const redirectUrl = req.nextUrl.clone();
  // redirectUrl.pathname = "/feed";
  // if (req.nextUrl.pathname === "/feed" && req.nextUrl.searchParams.has("new")) {
  //   redirectUrl.searchParams.set("signIn", "true");
  // }
  // redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

  // if (!req.nextUrl.searchParams.has("redirectedFrom")) {
  //   return NextResponse.redirect(redirectUrl);
  // }
}
