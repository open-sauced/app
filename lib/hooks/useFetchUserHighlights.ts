import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

interface useFetchUserHighlightsResponse {
  data: DbHighlight[];
  meta: Meta;
}
const useFetchUserHighlights = (username: string) => {
  const { data, error } = useSWR<useFetchUserHighlightsResponse, Error>(
    `users/${username}/highlights`,
    publicApiFetcher as Fetcher<useFetchUserHighlightsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error
  };
};

export { useFetchUserHighlights };
