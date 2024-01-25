import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

type DbWorkspaceRepository = {
  id: string;
  repo_id: number;
  workspace_id: string;
  repo: {
    id: number;
    name: string;
    full_name: string;
  };
};

export const useGetWorkspaceRepositories = (workspaceId: string) => {
  const endpoint = `workspaces/${workspaceId}/repos`;

  const { data, error, isLoading, mutate } = useSWR<PagedData<DbWorkspaceRepository>, Error>(
    endpoint,
    publicApiFetcher as Fetcher<PagedData<DbWorkspaceRepository>, Error>
  );

  return {
    data,
    error,
    mutate,
    isLoading,
  };
};
