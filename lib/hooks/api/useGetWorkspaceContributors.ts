import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

type DbWorkspaceContributor = {
  id: string;
  contributor_id: number;
  workspace_id: string;
  contributor: {
    login: string;
    username: string;
    updated_at: string;
    devstats_updated_at: string;
  };
};

type UseGetWorkspaceContributorsProps = {
  workspaceId: string;
  range?: number;
  page?: number;
  limit?: number;
};

export const useGetWorkspaceContributors = ({
  workspaceId,
  range = 30,
  page = 1,
  limit = 10,
}: UseGetWorkspaceContributorsProps) => {
  const searchParams = new URLSearchParams({
    range: range.toString(),
    page: page.toString(),
    limit: limit.toString(),
  });
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
