import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface UserConnectionResponse {
  data?: DbUserOrganization[];
  meta: Meta;
}

const useUserOrganizations = (username: string | null) => {
  const { data, error } = useSWR<UserConnectionResponse, Error>(
    username ? `users/${username}/organizations` : null,
    publicApiFetcher as Fetcher<UserConnectionResponse, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
  };
};

export { useUserOrganizations };
