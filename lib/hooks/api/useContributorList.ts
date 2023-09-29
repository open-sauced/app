import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import publicApiFetcher from "lib/utils/public-api-fetcher";

export function convertToContributors(rawContributors: DBListContributor[] = []): DbPRContributor[] {
  const contributors = rawContributors
    ? rawContributors.map((contributor) => {
        return {
          author_login: contributor.login,
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
}: {
  listId: string | undefined;
  initialData?: {
    data: DbPRContributor[];
    meta: Meta;
  };
  initialPage?: number;
  defaultLimit?: number;
}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(defaultLimit);
  const { data, error, mutate } = useSWR<any>(
    `lists/${listId}/contributors?page=${page}&limit=${limit}`,
    publicApiFetcher as Fetcher<PagedData<DBListContributor>, Error>,
    {
      fallbackData: initialData,
    }
  );
  const contributors = convertToContributors(data?.data);

  return {
    setPage,
    setLimit,
    data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
