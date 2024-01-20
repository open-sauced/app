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
  members?: any[];
  sessionToken: string;
  repos: { full_name: string }[];
}) {
  // TODO: check if the workspace ID already exists in case the repos part doesn't work
  const { data: workspace, error: workspaceError } = await fetchApiData<Workspace>({
    path: "workspaces",
    method: "POST",
    body: { name, description, members },
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  if (workspace) {
    const { data: repoData, error: reposError } = await fetchApiData<any[]>({
      path: `workspaces/${workspace.id}/repos`,
      method: "POST",
      body: { repos },
      bearerToken: sessionToken,
      pathValidator: () => true,
    });

    if (workspaceError || reposError) {
      return { data: null, error: workspaceError ?? reposError };
    }

    return { data: { workspace, repos: repoData }, error: null };
  } else {
    return { data: null, error: workspaceError };
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

export async function deleteWorkspace({ workspaceId, sessionToken }: { workspaceId: string; sessionToken: string }) {
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    method: "DELETE",
    bearerToken: sessionToken,
    pathValidator: () => true,
  });

  return { data, error };
}
