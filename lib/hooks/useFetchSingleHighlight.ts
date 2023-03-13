import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

interface useFetchUserHighlightsResponse {
  data: DbHighlight;
}
const useFetchSingleHighlight = (id: number | undefined) => {
  const { data, error } = useSWR<DbHighlight, Error>(
    id ? `user/highlights/${id}` : undefined,
    publicApiFetcher as Fetcher<DbHighlight, Error>
  );

  return {
    data: data ?? undefined,
    isLoading: !error && !data,
    isError: !!error
  };
};

export { useFetchSingleHighlight };
