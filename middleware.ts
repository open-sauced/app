import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import store from "lib/store";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  debugger;
  console.log("GetState Is loading", store.getState().isLoading);
  if (store.getState().isLoading) {
    return NextResponse.next(); 
  }
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  debugger;
  // Check auth condition
  if (session?.user) {
    // set isLoading from store to false 
    store.setState({ isLoading: false });
    // set local storage to false
    (typeof window !== "undefined") && localStorage.setItem("OpenSauced_Login_isLoading", "false");
    // Authentication successful, forward request to protected route.
    return res;
  }

  
  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/javascript/dashboard/filter/recent";
  redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/hub/insights/:path*", "/user/:path"],
};