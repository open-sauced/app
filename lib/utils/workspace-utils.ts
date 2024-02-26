import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { fetchApiData } from "helpers/fetchApiData";

export async function createWorkspace({
  name,
  description = "",
  members = [],
  sessionToken,
  repos = [],
}: {
  name: string;
  description?: string;
  members: any[];
  sessionToken: string;
  repos: { full_name: string }[];
}) {
  const { data, error } = await fetchApiData<Workspace>({
    path: "workspaces",
    method: "POST",
    // We're not tracking contributors at the moment, but for the time
    // being, I'm leaving the API call as is and passing an empty array
    body: { name, description, members, repos, contributors: [] },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  if (error) {
    return { data: null, error };
  } else {
    return { data, error: null };
  }
}

export async function saveWorkspace({
  workspaceId,
  name,
  description = "",
  sessionToken,
  repos,
}: {
  workspaceId: string;
  name: string;
  description?: string;
  sessionToken: string;
  repos: { full_name: string }[];
}) {
  const updateWorkspace = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    method: "PATCH",
    body: { name, description },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  const updateWorkspaceRepos = await fetchApiData<any[]>({
    path: `workspaces/${workspaceId}/repos`,
    method: "POST",
    body: { repos },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  const [{ data, error }, { data: repoData, error: reposError }] = await Promise.all([
    updateWorkspace,
    updateWorkspaceRepos,
  ]);

  return { data: { workspace: data, repos: repoData }, error };
}

export async function upgradeWorkspace({ workspaceId, sessionToken }: { workspaceId: string; sessionToken: string }) {
  const { data, error } = await fetchApiData<{ sessionId: string }>({
    path: `auth/checkout/workspaces/${workspaceId}/session`,
    method: "POST",
    body: {},
    bearerToken: sessionToken,
  });

  return { data, error };
}

export async function changeWorkspaceVisibility({
  workspaceId,
  sessionToken,
  name,
  description,
  isPublic,
}: {
  workspaceId: string;
  sessionToken: string;
  name: string;
  description: string;
  isPublic: boolean;
}) {
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    method: "PATCH",
    body: { name, description, is_public: `${isPublic}` },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  return { data, error };
}

export async function deleteTrackedRepos({
  workspaceId,
  sessionToken,
  repos,
}: {
  workspaceId: string;
  sessionToken: string;
  repos: { full_name: string }[];
}) {
  const { data, error } = await fetchApiData<any[]>({
    path: `workspaces/${workspaceId}/repos`,
    method: "DELETE",
    body: { repos },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  return { data, error };
}

export async function deleteTrackedContributors({
  workspaceId,
  sessionToken,
  contributors,
}: {
  workspaceId: string;
  sessionToken: string;
  contributors: { login: string }[];
}) {
  const { data, error } = await fetchApiData<any[]>({
    path: `workspaces/${workspaceId}/contributors`,
    method: "DELETE",
    body: { contributors },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  return { data, error };
}

export async function deleteWorkspace({ workspaceId, sessionToken }: { workspaceId: string; sessionToken: string }) {
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    method: "DELETE",
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  return { data, error };
}

export const WORKSPACE_ID_COOKIE_NAME = "workspace-id";

export function getWorkspaceUrl(cookies: RequestCookies, baseUrl: string, personalWorkspaceId: string) {
  if (!cookies.has(WORKSPACE_ID_COOKIE_NAME)) {
    cookies.set(WORKSPACE_ID_COOKIE_NAME, personalWorkspaceId);
  }

  // @ts-expect-error the cookie value will be defined
  const workspaceId = cookies.get(WORKSPACE_ID_COOKIE_NAME).value;

  return new URL(`/workspaces/${workspaceId}/repositories`, baseUrl);
}

export async function getInsightWithWorkspace({ insightId }: { insightId: number }) {
  const { data, error } = await fetchApiData<DbUserInsight>({
    path: `insights/${insightId}`,
    method: "GET",
    bearerToken: "",
    pathValidator: () => true,
  });

  return { data, error };
}

export async function getListWithWorkspace({ listId }: { listId: string }) {
  const { data, error } = await fetchApiData<DbUserList>({
    path: `lists/${listId}`,
    method: "GET",
    bearerToken: "",
    pathValidator: () => true,
  });

  return { data, error };
}
