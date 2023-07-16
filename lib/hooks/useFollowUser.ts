import useSWR, { Fetcher, useSWRConfig } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSupabaseAuth from "./useSupabaseAuth";

interface FollowUserResponse {
  data: DbFollowUser;
}
const useFollowUser = (username: string) => {
  const { sessionToken, user } = useSupabaseAuth();
  const { mutate: GlobalMutate } = useSWRConfig(); // adding this to mutate the global user data to update the users card status on follow/unfollow

  const { data, error, mutate } = useSWR<FollowUserResponse, Error>(
    username ? `users/${username}/follow` : null,
    publicApiFetcher as Fetcher<FollowUserResponse, Error>
  );

  const follow = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/follow`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }).catch((err) => console.log(err));

    if (req && req.ok) {
      mutate();
      GlobalMutate(`user/${user?.user_metadata?.username}`);
    }
  };

  const unFollow = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/follow`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }).catch((err) => console.log(err));

    if (req && req.ok) {
      mutate();
      GlobalMutate(`user/${user?.user_metadata?.username}`);
    }
  };

  return {
    data: data || undefined,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    follow,
    unFollow,
  };
};

export default useFollowUser;
