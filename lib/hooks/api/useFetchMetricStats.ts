import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

type UseFetchMetricStatsParams = {
  repository: string;
  variant: "stars" | "forks"; // TODO: add other MetricCard types
  range: number;
};

export type StatsType = {
  bucket: string;
  star_count?: number;
  forks_count?: number;
};

export function useFetchMetricStats({ repository, variant, range }: UseFetchMetricStatsParams) {
  const query = new URLSearchParams();
  query.set("repo", repository);
  query.set("range", range.toString());

  const endpoint = () => {
    switch (variant) {
      case "stars":
        return `histogram/stars?${query}`;
      case "forks":
        return `histogram/forks?${query}`;
    }
  };

  const { data, error, isLoading, mutate } = useSWR<StatsType[], Error>(
    endpoint,
    publicApiFetcher as Fetcher<StatsType[], Error>
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
