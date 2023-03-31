import publicApiFetcher from "lib/utils/public-api-fetcher";
import { supabase } from "lib/utils/supabase";
import useSWR, { Fetcher } from "swr";

interface FollowUserResponse {
  data: DbFollowUser;
}
const useFollowUser = (username: string, token: string) => {
  const { data, error, mutate } = useSWR<FollowUserResponse, Error>(
    `users/${username}/follow`,
    publicApiFetcher as Fetcher<FollowUserResponse, Error>
  );

  const follow = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/follow`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
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
        Authorization: `Bearer ${token}`
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
