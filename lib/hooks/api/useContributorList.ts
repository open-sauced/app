import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export function convertToContributors(
  rawContributors: DBListContributor[] = [],
  oscrEnabled: boolean
): DbPRContributor[] {
  const contributors = rawContributors
    ? rawContributors.map((contributor) => {
        return {
          author_login: contributor.login,
          username: contributor.username,
          updated_at: contributor.created_at,
          user_id: contributor.id,
          oscr: oscrEnabled ? contributor.oscr : undefined,
        };
      })
    : [];

  return contributors;
}

export const useContributorsList = ({
  workspaceId,
  listId,
  initialData,
  initialPage = 1,
  defaultLimit = 10,
  defaultRange = "30",
  featureFlags = {},
}: {
  workspaceId: string | undefined;
  listId: string | undefined;
  initialData?: {
    data: DbPRContributor[];
    meta: Meta;
  };
  initialPage?: number;
  defaultLimit?: number;
  defaultRange?: string;
  featureFlags?: Record<string, boolean>;
}) => {
  const [page, setPage] = useState(initialPage);

  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("limit", `${defaultLimit}`);
  query.append("range", defaultRange ?? "30");

  const { data, error, mutate } = useSWR<any>(
    listId ? (workspaceId ? `workspaces/${workspaceId}/userLists/${listId}/contributors?${query}` : null) : null,
    publicApiFetcher as Fetcher<PagedData<DBListContributor>, Error>,
    {
      fallbackData: initialData,
    }
  );

  const oscrEnabled = featureFlags["oscr-rating"];
  const contributors = convertToContributors(data?.data, oscrEnabled);

  return {
    setPage,
    data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
