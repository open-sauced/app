import SEO from "layouts/SEO/SEO";

export function getWorkspaceOgImage(workspace: Workspace, range = 30) {
  const searchParams = new URLSearchParams();
  searchParams.append("wname", workspace.name);

  if (workspace.description.length > 0) {
    searchParams.append("description", workspace.description);
  }

  return `/og-images/workspace/${workspace.id}/${range}?${searchParams}`;
}

interface WorkspaceOgImageProps {
  workspace: Workspace;
  ogImage: string;
}

export const WorkspaceOgImage = ({ workspace, ogImage }: WorkspaceOgImageProps) => {
  return (
    <SEO
      title={`Workspaces | ${workspace.name}`}
      description={workspace.description ?? ""}
      image={ogImage}
      twitterCard="summary_large_image"
    />
  );
};
