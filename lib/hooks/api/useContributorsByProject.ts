import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import publicApiFetcher from "lib/utils/public-api-fetcher";

export const useContributorsByProject = (listId: string, range: number) => {
  const [repoId, setRepoId] = useState<number | null>(null);
  const { data, error } = useSWR<DBProjectContributor[]>(
    `lists/${listId}/stats/top-project-contributions-by-contributor?repoId=${repoId}&range=${range}`,
    publicApiFetcher as Fetcher<DBProjectContributor[], Error>
  );

  return {
    data,
    error,
    setRepoId,
    repoId,
  };
};
