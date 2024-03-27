import useSWR, { Fetcher } from "swr";
import githubApiFetcher from "lib/utils/github-api-fetcher";

type UseFetchGithubFollowingProps = {
  username: string;
};

interface GhFollowing {
  id: number;
  login: string;
  type: string;
}

export const useFetchGithubFollowing = ({ username }: UseFetchGithubFollowingProps) => {
  const { data, error, isLoading, mutate } = useSWR<GhFollowing[], Error>(
    `users/${username}/following?per_page=30`,
    githubApiFetcher as Fetcher<GhFollowing[], Error>
  );

  return {
    data,
    error,
    mutate,
    isLoading,
  };
};
