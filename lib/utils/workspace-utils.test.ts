import { randomUUID } from "crypto";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { WORKSPACE_ID_COOKIE_NAME, getWorkspaceUrl } from "./workspace-utils";

describe("[lib/utils] getWorkspaceUrl()", () => {
  const baseUrl = "http://localhost:3000";
  const personalWorkspaceId = randomUUID();

  it("should return a workspace URL if a workspace was previously visited", () => {
    const workspaceId = randomUUID();
    const cookies = new RequestCookies(new Headers());
    cookies.set(WORKSPACE_ID_COOKIE_NAME, workspaceId);

    expect(getWorkspaceUrl(cookies, baseUrl, personalWorkspaceId)).toEqual(
      new URL(`/workspaces/${workspaceId}/repositories`, baseUrl)
    );
  });

  it("should return a personal workspace URL if a workspace was not previously visited", () => {
    const cookies = new RequestCookies(new Headers());

    expect(getWorkspaceUrl(cookies, baseUrl, personalWorkspaceId)).toEqual(
      new URL(`/workspaces/${personalWorkspaceId}/repositories`, baseUrl)
    );
  });
});
