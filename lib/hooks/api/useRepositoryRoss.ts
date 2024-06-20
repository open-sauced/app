import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { DayRange } from "components/shared/DayRangePicker";

export function useRepositoryRoss({ repository, range }: { repository: string; range: DayRange }) {
  const { data, error, isLoading, mutate } = useSWR<RepositoryRoss, Error>(
    `repos/${repository}/ross?range=${range}`,
    publicApiFetcher as Fetcher<RepositoryRoss, Error>
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
