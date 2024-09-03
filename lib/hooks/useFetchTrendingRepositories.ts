import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export interface HistogramTopRepo {
  repo_name: string;
  bucket: string;
  star_count: number;
}

export default function useFetchTrendingRepositories() {
  const { data, error } = useSWR<HistogramTopRepo[], Error>(
    `histogram/top/stars`,
    publicApiFetcher as Fetcher<HistogramTopRepo[], Error>
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  };
}
