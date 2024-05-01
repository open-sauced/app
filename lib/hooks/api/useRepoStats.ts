import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export const useRepoStats = ({ repoFullName, range }: { repoFullName: string; range: number }) => {
  const query = new URLSearchParams();
  query.set("range", range.toString());

  const { data, error, isLoading, mutate } = useSWR<DbRepo, Error>(
    typeof window === "undefined" ? null : `repos/${repoFullName}?${query}`,
    publicApiFetcher as Fetcher<DbRepo, Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
