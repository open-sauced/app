import SEO from "layouts/SEO/SEO";

function getWorkspaceOgImage(workspace: Workspace, range = 30) {
  const searchParams = new URLSearchParams({
    wname: workspace.name,
    description: workspace.description ?? "",
  });

  return `/og-images/workspace/${workspace.id}/${range}?${searchParams}`;
}

interface WorkspaceOgImageProps {
  workspace: Workspace;
  range: number;
}

export const WorkspaceOgImage = ({ workspace, range }: WorkspaceOgImageProps) => {
  const ogImage = getWorkspaceOgImage(workspace, range);
  return (
    <SEO
      title={`Workspaces | ${workspace.name}`}
      description={workspace.description ?? ""}
      image={ogImage}
      twitterCard="summary_large_image"
    />
  );
};
