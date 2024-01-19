import useSWR, { Fetcher, useSWRConfig } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

export const useGetWorkspaceRepositories = (workspaceId: string) => {
  const { mutate } = useSWRConfig();
  const endpoint = `workspaces/${workspaceId}/repos`;

  const { data, error, isLoading } = useSWR<any[], Error>(endpoint, publicApiFetcher as Fetcher<any[], Error>);

  return {
    data,
    error,
    revalidate() {
      mutate(endpoint);
    },
    isLoading,
  };
};
