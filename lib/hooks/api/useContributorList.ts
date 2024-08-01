import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export function convertToContributors({
  rawContributors = [],
  username,
  oscrEnabled,
}: {
  rawContributors: DBListContributor[];
  username: string;
  oscrEnabled: boolean;
}): DBListContributor[] {
  const contributors = rawContributors
    ? rawContributors.map((contributor) => {
        const returnOscr = oscrEnabled || contributor.username === username;
        return {
          ...contributor,
          oscr: returnOscr ? contributor.oscr : undefined,
          login: contributor.login ?? contributor.username,
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
  showOscr = false,
  username,
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
  showOscr?: boolean;
  username: string;
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

  const contributors = convertToContributors({ rawContributors: data?.data, username, oscrEnabled: showOscr });

  return {
    setPage,
    data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
