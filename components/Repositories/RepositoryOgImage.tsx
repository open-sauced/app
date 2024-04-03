import SEO from "layouts/SEO/SEO";

export function getWorkspaceOgImage(repository: DbRepo, range = 30) {
  const searchParams = new URLSearchParams();
  searchParams.append("wname", repository.name);

  if (repository.description.length > 0) {
    searchParams.append("description", repository.description);
  }

  return `/og-images/workspace/${repository.id}/${range}?${searchParams}`;
}

interface WorkspaceOgImageProps {
  repository: DbRepo;
  ogImageUrl: string;
}

export const RepositoryOgImage = ({ repository, ogImageUrl }: WorkspaceOgImageProps) => {
  return (
    <SEO
      title={`Repositories | ${repository.full_name}`}
      description={repository.description ?? ""}
      image={ogImageUrl}
      twitterCard="summary_large_image"
    />
  );
};
