import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { pathToRegexp } from "path-to-regexp";
import { getInsightWithWorkspace, getListWithWorkspace, getWorkspaceUrl } from "lib/utils/workspace-utils";

// HACK: this is to get around the fact that the normal next.js middleware is not always functioning
// correctly.
// see https://github.com/open-sauced/insights/pull/1549
// prettier-ignore
const pathsToMatch = [
  "/",
  "/feed/",
  "/user/notifications",
  "/user/settings",
  "/account-deleted",
  "/workspaces/:path*",
  "/lists/:path*",
  "/pages/:path*",
];

const NO_ONBOARDING_PAYLOAD = {
  is_onboarded: false,
};

const loadSession = async (request: NextRequest, sessionToken?: string) => {
  if (!sessionToken) {
    return NO_ONBOARDING_PAYLOAD;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return NO_ONBOARDING_PAYLOAD;
  }
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (!pathsToMatch.some((matcher) => pathToRegexp(matcher).test(req.nextUrl.pathname))) {
    return res;
  }

  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user && req.nextUrl.pathname === "/workspaces") {
    const data = await loadSession(req, session?.access_token);
    const workspaceUrl = getWorkspaceUrl(req.cookies, req.url, data.personal_workspace_id);

    return NextResponse.redirect(`${workspaceUrl}`);
  }

  if (req.nextUrl.pathname.startsWith("/workspaces")) {
    // Forward requests to workspace URLs
    return res;
  }

  if (session?.user && req.nextUrl.pathname === "/account-deleted") {
    // Delete the account from Supabase and log the user out.
    await supabase.auth.admin.deleteUser(session.user.id);
    await supabase.auth.signOut();

    return res;
  }

  if (req.nextUrl.pathname.startsWith("/lists")) {
    // lists/{id}/(activity/highlights/overview)
    const [, , listId, ...rest] = req.nextUrl.pathname.split("/");
    const list = await getListWithWorkspace({ listId: listId });

    if (list && list.data) {
      return NextResponse.redirect(
        new URL(
          `/workspaces/${list.data.workspaces?.workspace_id}/contributor-insights/${listId}/${rest.join("/")}`,
          req.url
        )
      );
    }
  } else if (req.nextUrl.pathname.startsWith("/pages")) {
    // pages/{username}/{insightId}/(dashboard/contributors/activity/reports)
    const [, , _username, insightId, ...rest] = req.nextUrl.pathname.split("/");
    const insight = await getInsightWithWorkspace({ insightId: Number(insightId) });

    if (insight && insight.data) {
      return NextResponse.redirect(
        new URL(
          `/workspaces/${insight.data.workspaces?.workspace_id}/repository-insights/${insightId}/${rest.join("/")}`,
          req.url
        )
      );
    }
  }

  // Check auth condition
  if (session?.user || req.nextUrl.searchParams.has("login")) {
    // Authentication successful, forward request to protected route.
    if (req.nextUrl.pathname === "/") {
      const data = await loadSession(req, session?.access_token);
      const workspaceUrl = getWorkspaceUrl(req.cookies, req.url, data.personal_workspace_id);

      return NextResponse.redirect(`${workspaceUrl}`);
    } else {
      return res;
    }
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/feed";
  if (req.nextUrl.pathname === "/feed" && req.nextUrl.searchParams.has("new")) {
    redirectUrl.searchParams.set("signIn", "true");
  }
  redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

  redirectUrl.pathname = "/explore";
  if (!req.nextUrl.searchParams.has("redirectedFrom")) {
    return NextResponse.redirect(redirectUrl);
  }
}
