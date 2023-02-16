import { githubFetcher } from "lib/utils/github-fetcher";
import { Fetcher } from "swr";
import useSWR from "swr";


const useFetchGithubPRInfo = (url: string) => {
  const { data, error } = useSWR<GhPRInfoResponse, Error>(
    url,
    githubFetcher as unknown as Fetcher<GhPRInfoResponse, Error>
  );

  return {
    data: data ?? undefined,
    isLoading: !error && !data,
    isError: !!error
  };
};

export { useFetchGithubPRInfo };
