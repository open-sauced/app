import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

type UseFetchMetricStatsProps = {
  repository: string;
  variant: "stars" | "forks"; // TODO: add other MetricCard types
  range: number;
};

type DbHistogram = { bucket: string };
type DbStarsHistogram = DbHistogram & { stars: number };
type DbForksHistogram = DbHistogram & { forks_count: number };
type StatsType = DbStarsHistogram | DbForksHistogram;

export function useFetchMetricStats({ repository, variant, range }: UseFetchMetricStatsProps) {
  const query = new URLSearchParams();
  query.set("repo", repository);
  query.set("range", range.toString());

  const endpoint = () => {
    switch (variant) {
      case "stars":
        return `histogram/stars?${query.toString()}`;
      case "forks":
        return `histogram/forks?${query.toString()}`;
    }
  };

  const { data, error, isLoading, mutate } = useSWR<{ data: StatsType[] }, Error>(
    endpoint,
    publicApiFetcher as Fetcher<{ data: StatsType[] }, Error>
  );

  return {
    data: data as StatsType[] | undefined,
    error,
    isLoading,
    mutate,
  };
}
