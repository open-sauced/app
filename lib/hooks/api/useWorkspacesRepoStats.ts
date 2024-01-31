import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
export const useWorkspacesRepoStats = (workspaceId: string, range = 30) => {
  const searchParams = new URLSearchParams({
    range: range.toString(),
  });
  const endpointString = `workspaces/${workspaceId}/stats?${searchParams}`;

  const { data, error, mutate } = useSWR<DbWorkspacesReposStats, Error>(
    endpointString,
    publicApiFetcher as Fetcher<DbWorkspacesReposStats, Error>
  );

  return {
    data: { data },
    isLoading: !error && !data,
    isError: !!error,
  };
};
