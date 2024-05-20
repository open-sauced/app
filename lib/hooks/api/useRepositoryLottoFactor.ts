import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { DayRange } from "components/shared/DayRangePicker";

export function useRepositoryLottoFactor({ repository, range }: { repository: string; range: DayRange }) {
  const { data, error, isLoading, mutate } = useSWR<RepositoryLottoFactor, Error>(
    `repos/lotto?repos=${repository}&range=${range}`,
    publicApiFetcher as Fetcher<RepositoryLottoFactor, Error>
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
