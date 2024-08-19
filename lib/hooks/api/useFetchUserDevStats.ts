import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { DayRange } from "components/shared/DayRangePicker";
import { UserDevStats } from "pages/u/[username]/card";

export function useFetchUserDevStats({ username, range }: { username: string; range?: DayRange }) {
  const query = new URLSearchParams();
  if (range) {
    query.set("range", range.toString());
  }
  const { data, error, isLoading, mutate } = useSWR<UserDevStats, Error>(
    `users/${username}/devstats?${query}`,
    publicApiFetcher as Fetcher<UserDevStats, Error>
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
