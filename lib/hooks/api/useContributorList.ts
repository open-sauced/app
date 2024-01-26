import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

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

interface ContributorsQuery extends Query {
  listId?: string;
  initialData?: {
    data: DbPRContributor[];
    meta: Meta;
  };
}

export const useContributorsList = ({ listId, initialData, page = 1, limit = 10, range = 30 }: ContributorsQuery) => {
  const query = new URLSearchParams();
  query.append("page", `${page}`);
  query.append("limit", `${limit}`);
  query.append("range", `${range}`);

  const { data, error, mutate } = useSWR<any>(
    listId ? `lists/${listId}/contributors?${query}` : null,
    publicApiFetcher as Fetcher<PagedData<DBListContributor>, Error>,
    {
      fallbackData: initialData,
    }
  );
  const contributors = convertToContributors(data?.data);

  return {
    data: data ? { data: contributors, meta: data.meta } : { data: [], meta: {} },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
