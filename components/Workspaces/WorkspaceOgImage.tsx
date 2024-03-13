import SEO from "layouts/SEO/SEO";

function getWorkspaceOgImage(workspace: Workspace, repositoryStats: DbWorkspacesReposStats) {
  const searchParams = new URLSearchParams({
    wname: workspace.name,
    description: workspace.description ?? "",
    repositoryStats: JSON.stringify(repositoryStats),
  });

  return `/og-images/workspace?${searchParams}`;
}

interface WorkspaceOgImageProps {
  workspace: Workspace;
  repositoryStats: DbWorkspacesReposStats;
}

export const WorkspaceOgImage = ({ workspace, repositoryStats }: WorkspaceOgImageProps) => {
  const ogImage = getWorkspaceOgImage(workspace, repositoryStats);
  return (
    <SEO
      title={`Workspaces | ${workspace.name}`}
      description={workspace.description ?? ""}
      image={ogImage}
      twitterCard="summary_large_image"
    />
  );
};
