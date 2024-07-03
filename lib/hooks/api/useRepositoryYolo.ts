import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { DayRange } from "components/shared/DayRangePicker";

export function useRepositoryYolo({
  repository,
  range,
  includeBots,
}: {
  repository: string;
  range: DayRange;
  includeBots: boolean;
}) {
  const { data, error, isLoading, mutate } = useSWR<RepositoryYolo, Error>(
    `repos/${repository}/yolo?range=${range}&include_bots=${includeBots}`,
    publicApiFetcher as Fetcher<RepositoryYolo, Error>
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
