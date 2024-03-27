import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export function useGetUserWorkspaces() {
  const { data, error, isLoading, mutate } = useSWR<{ data?: Workspace[] }, Error>(
    `workspaces`,
    publicApiFetcher as Fetcher<{ data: Workspace[] }, Error>
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
