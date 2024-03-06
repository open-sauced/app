import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

const useWorkspaceRepositoryInsight = ({
  insightId,
  workspaceId,
}: {
  insightId: number | null;
  workspaceId: string | null;
}) => {
  const baseEndpoint = `workspaces/${workspaceId}/insights/${insightId}`;
  const endpointString = `${baseEndpoint}`;

  const { data, error, mutate } = useSWR<DbUserInsight, Error>(
    insightId ? endpointString : null,
    publicApiFetcher as Fetcher<DbUserInsight, Error>
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: !!error && Object.keys(error).length > 0,
    mutate,
  };
};

export default useWorkspaceRepositoryInsight;
