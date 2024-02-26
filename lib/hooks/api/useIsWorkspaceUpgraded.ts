import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export function useIsWorkspaceUpgraded({ workspaceId }: { workspaceId: string }) {
  const { data, error, mutate } = useSWR<Workspace, Error>(
    `workspaces/${workspaceId}`,
    publicApiFetcher as Fetcher<Workspace, Error>
  );

  return { data: data?.payee_user_id !== null, error };
}
