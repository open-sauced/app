import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

type DbWorkspaceContributor = {
  id: string;
  contributor_id: number;
  workspace_id: string;
  contributor: {
    author_login: string;
    user_id: number;
  };
};

export const useGetWorkspaceContributors = ({ workspaceId, range = 30 }: { workspaceId: string; range?: number }) => {
  const searchParams = new URLSearchParams({ range: range.toString() });
  const endpoint = `workspaces/${workspaceId}/contributors?${searchParams}`;

  const { data, error, isLoading, mutate } = useSWR<PagedData<DbWorkspaceContributor>, Error>(
    endpoint,
    publicApiFetcher as Fetcher<PagedData<DbWorkspaceContributor>, Error>
  );

  return {
    data,
    error,
    mutate,
    isLoading,
  };
};
