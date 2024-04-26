import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export const useRepoStats = ({ fullRepoName, range = 30 }: { fullRepoName: string; range: number }) => {
  const query = new URLSearchParams();
  query.set("range", `${range}`);

  const endpointString = typeof window === "undefined" ? null : `repos/${fullRepoName}?${query}`;

  const { data, error } = useSWR<DbRepo, Error>(endpointString, publicApiFetcher as Fetcher<DbRepo, Error>);

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  };
};
