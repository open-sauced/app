import useSWR, { Fetcher, useSWRConfig } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

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
  const { mutate } = useSWRConfig();
  const endpoint = `workspaces/${workspaceId}/repos`;

  const { data, error, isLoading } = useSWR<PagedData<DbWorkspaceRepository>, Error>(
    endpoint,
    publicApiFetcher as Fetcher<PagedData<DbWorkspaceRepository>, Error>
  );

  return {
    data,
    error,
    revalidate() {
      mutate(endpoint);
    },
    isLoading,
  };
};
