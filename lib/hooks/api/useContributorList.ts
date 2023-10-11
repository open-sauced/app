import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import publicApiFetcher from "lib/utils/public-api-fetcher";

export function convertToContributors(rawContributors: DBListContributor[] = []): DbPRContributor[] {
  const contributors = rawContributors
    ? rawContributors.map((contributor) => {
        return {
          author_login: contributor.login,
          username: contributor.username,
          updated_at: contributor.created_at,
          user_id: contributor.id,
        };
      })
    : [];

  return contributors;
}

export const useContributorsList = ({
  listId,
  initialData,
  initialPage = 1,
  defaultLimit = 10,
  defaultRange = 30,
}: {
  listId: string | undefined;
  initialData?: {
    data: DbPRContributor[];
    meta: Meta;
  };
  initialPage?: number;
  defaultLimit?: number;
  defaultRange?: number;
}) => {
  const [range, setRange] = useState(defaultRange); // [start, end
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(defaultLimit);
  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("limit", limit.toString());
  query.append("range", range.toString());

  const { data, error, mutate } = useSWR<any>(
    listId ? `lists/${listId}/contributors?${query}` : null,
    publicApiFetcher as Fetcher<PagedData<DBListContributor>, Error>,
    {
      fallbackData: initialData,
    }
  );
  const contributors = convertToContributors(data?.data);

  return {
    setPage,
    setLimit,
    setRange,
    range,
    data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
