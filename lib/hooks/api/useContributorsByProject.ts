import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export const useContributorsByProject = (listId: string, range = 30) => {
  const [repoId, setRepoId] = useState<number | null>(null);

  const query = new URLSearchParams();

  if (repoId) {
    query.set("repo_id", `${repoId}`);
  }
  query.set("range", `${range}`);

  const baseEndpoint = `lists/${listId}/stats/top-project-contributions-by-contributor`;

  const endpointString = `${baseEndpoint}?${query.toString()}`;
  const { data, error, isLoading } = useSWR<DBProjectContributor[]>(
    listId && repoId ? endpointString : null,
    publicApiFetcher as Fetcher<DBProjectContributor[], Error>
  );

  return {
    data,
    error,
    setRepoId,
    repoId,
    isLoading,
  };
};
