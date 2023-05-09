import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";
import useSupabaseAuth from "./useSupabaseAuth";

interface FollowUserResponse {
  data: DbFollowUser;
}
const useFollowUser = (username: string) => {
  const { sessionToken } = useSupabaseAuth();

  const { data, error, mutate } = useSWR<FollowUserResponse, Error>(
    `users/${username}/follow`,
    publicApiFetcher as Fetcher<FollowUserResponse, Error>
  );

  const follow = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/follow`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }).catch((err) => console.log(err));

    if (req && req.ok) {
      mutate();
    }
  };

  const unFollow = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/follow`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }).catch((err) => console.log(err));

    if (req && req.ok) {
      mutate();
    }
  };

  return {
    data: data || undefined,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    follow,
    unFollow
  };
};

export default useFollowUser;
