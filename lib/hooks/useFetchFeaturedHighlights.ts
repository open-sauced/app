import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface FeaturedHighlightsResponse {
  data: DbHighlight[];
  meta: Meta;
}

const useFetchFeaturedHighlights = () => {
  const { data, error, mutate } = useSWR<FeaturedHighlightsResponse>(
    "highlights/featured",
    publicApiFetcher as Fetcher<FeaturedHighlightsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useFetchFeaturedHighlights };
