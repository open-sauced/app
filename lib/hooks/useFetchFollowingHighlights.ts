import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface UseFetchUserHighlightsResponse {
  data: DbHighlight[];
  meta: Meta;
}

interface FollowingHighlightQuery extends Query {
  repo?: string;
}
const useFetchFollowingHighlights = ({ page = 1, limit = 10, repo = "" }: FollowingHighlightQuery) => {
  const query = new URLSearchParams();

  query.append("page", `${page}`);
  query.append("limit", `${limit}`);

  if (repo) {
    query.append("repo", repo);
  }

  const { data, error, mutate } = useSWR<UseFetchUserHighlightsResponse, Error>(
    `user/highlights/following?${query}`,
    publicApiFetcher as Fetcher<UseFetchUserHighlightsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useFetchFollowingHighlights };
