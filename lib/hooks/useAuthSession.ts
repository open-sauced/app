import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

export interface UserResponse extends DbUser {}
const useAuthSession = () => {
  const { data, error } = useSWR<UserResponse, Error>("auth/session", publicApiFetcher as Fetcher<UserResponse, Error>);

  return {
    data: data || undefined,
    isLoading: !error && !data,
    isError: !!error
  };
};

export { useAuthSession };
