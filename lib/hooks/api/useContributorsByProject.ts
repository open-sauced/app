import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import publicApiFetcher from "lib/utils/public-api-fetcher";

export const useContributorsByProject = (listId: string, range: number) => {
  const [repoId, setRepoId] = useState<number | null>(null);
  const { data, error } = useSWR<DBProjectContributor[]>(
    listId ? `lists/${listId}/stats/top-project-contributions-by-contributor?repo_id=${repoId}&range=${range}` : null,
    publicApiFetcher as Fetcher<DBProjectContributor[], Error>
  );

  return {
    data,
    error,
    setRepoId,
    repoId,
  };
};
