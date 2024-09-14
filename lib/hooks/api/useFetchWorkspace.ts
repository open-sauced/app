import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export default function useFetchWorkspace({ workspaceId }: { workspaceId: string }) {
  const { data, error, isLoading, mutate } = useSWR<Workspace, Error>(
    `workspaces/${workspaceId}`,
    publicApiFetcher as Fetcher<Workspace, Error>
  );

  return {
    data,
    isError: error,
    isLoading,
    mutate,
  };
}
