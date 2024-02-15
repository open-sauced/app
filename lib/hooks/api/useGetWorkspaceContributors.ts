import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

type DbWorkspaceContributor = {
  id: number;
  contributor_id: number;
  workspace_id: string;
  contributor: {
    login: string;
  };
};

type UseGetWorkspaceContributorsProps = {
  workspaceId: string;
  range?: number;
  page?: number;
  orderDirection?: string;
};

export const useGetWorkspaceContributors = ({
  workspaceId,
  range = 30,
  page = 1,
  orderDirection = "ASC",
}: UseGetWorkspaceContributorsProps) => {
  const searchParams = new URLSearchParams({
    range: range.toString(),
    page: page.toString(),
    orderDirection,
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
