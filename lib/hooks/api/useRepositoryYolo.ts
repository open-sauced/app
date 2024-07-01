import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { DayRange } from "components/shared/DayRangePicker";

export function useRepositoryYolo({ repository, range }: { repository: string; range: DayRange }) {
  const { data, error, isLoading, mutate } = useSWR<RepositoryYolo, Error>(
    `repos/${repository}/yolo?range=${range}`,
    publicApiFetcher as Fetcher<RepositoryYolo, Error>
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
