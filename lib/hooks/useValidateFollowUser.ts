import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

interface FollowUserResponse {
  data: DbFollowUser;
}
const useValidateFollowUser = (username: string) => {
  const { data, error, mutate } = useSWR<FollowUserResponse, Error>(
    `users/${username}/follow`,
    publicApiFetcher as Fetcher<FollowUserResponse, Error>
  );

  return {
    data: data || undefined,
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export default useValidateFollowUser;
