import useSWR, { Fetcher } from "swr";
import { safeParse } from "valibot";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { UuidSchema } from "lib/validation-schemas";

export const useGetStarSearchThreadHistory = (threadId: string | null, workspaceId?: string) => {
  const safeThreadId = safeParse(UuidSchema, threadId);
  const safeWorkspaceId = workspaceId ? safeParse(UuidSchema, workspaceId) : undefined;

  if ((threadId && !safeThreadId.success) || (workspaceId && !safeWorkspaceId?.success)) {
    throw new Error("Invalid thread or workspace ID");
  }

  const { data, error, isLoading, mutate } = useSWR<StarSearchThread, Error>(
    !threadId
      ? null
      : safeWorkspaceId
      ? `workspaces/${safeWorkspaceId.output}/star-search/${safeThreadId.output}`
      : `star-search/${safeThreadId.output}`,
    publicApiFetcher as Fetcher<StarSearchThread, Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
