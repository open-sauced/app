import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

interface useFetchUserHighlightsResponse {
  data: DbHighlight;
}
const useFetchSingleHighlight = (id: string) => {
  const { data, error } = useSWR<useFetchUserHighlightsResponse, Error>(
    `user/highlights/${id}`,
    publicApiFetcher as Fetcher<useFetchUserHighlightsResponse, Error>
  );

  return {
    data: data?.data ?? undefined,
    isLoading: !error && !data,
    isError: !!error
  };
};

export { useFetchSingleHighlight };
