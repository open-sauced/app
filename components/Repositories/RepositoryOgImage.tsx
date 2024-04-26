import SEO from "layouts/SEO/SEO";

export function getRepositoryOgImage({
  description,
  fullRepoName,
  range = 30,
}: {
  description: string;
  fullRepoName: string;
  range: number;
}) {
  const searchParams = new URLSearchParams();

  if (description?.length > 0) {
    searchParams.append("description", description);
  }

  return `/og-images/repository/${fullRepoName}/${range}?${searchParams}`;
}

interface WorkspaceOgImageProps {
  repository: DbRepoInfo;
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
