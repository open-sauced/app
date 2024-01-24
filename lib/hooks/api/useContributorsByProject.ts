import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export const useContributorsByProject = (listId: string, range = 30) => {
  const [repoName, setRepoName] = useState<string | null>(null);

  const query = new URLSearchParams();

  if (repoName) {
    query.set("repo_name", `${repoName}`);
  }
  query.set("range", `${range}`);

  const baseEndpoint = `lists/${listId}/stats/top-project-contributions-by-contributor`;

  const endpointString = `${baseEndpoint}?${query.toString()}`;
  const { data, error, isLoading } = useSWR<DBProjectContributor[]>(
    listId && repoName ? endpointString : null,
    publicApiFetcher as Fetcher<DBProjectContributor[], Error>
  );

  return {
    data,
    error,
    setRepoName,
    repoName,
    isLoading,
  };
};
