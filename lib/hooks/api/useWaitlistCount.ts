import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface WaitlistCountResponse {
  waitlisted_users: number;
}

export const useWaitlistCount = (initialWaitlistCount: number) => {
  const { data, error, isLoading } = useSWR<WaitlistCountResponse>(
    "auth/waitlisted",
    publicApiFetcher as Fetcher<WaitlistCountResponse, Error>,
    {
      fallbackData: { waitlisted_users: initialWaitlistCount },
    }
  );

  return {
    data: data?.waitlisted_users,
    error,
    isLoading,
  };
};
