import { fetchApiData } from "helpers/fetchApiData";

// TODO: decide if user can add contributors on creation
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
    body: { name, description, members, repos },
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
  contributors,
}: {
  workspaceId: string;
  name: string;
  description?: string;
  sessionToken: string;
  repos: { full_name: string }[];
  contributors: { login: string }[];
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

  const updateWorkspaceContributors = await fetchApiData<any[]>({
    path: `workspaces/${workspaceId}/contributors`,
    method: "POST",
    body: { contributors },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  const [{ data, error }, { data: repoData, error: reposError }, { data: contributorsData, error: contributorsError }] =
    await Promise.all([updateWorkspace, updateWorkspaceRepos, updateWorkspaceContributors]);

  return { data: { workspace: data, repos: repoData, contributors: contributorsData }, error };
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
