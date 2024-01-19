import useSWR, { Fetcher } from "swr";
import githubApiFetcher from "lib/utils/github-api-fetcher";

const baseUrl = "https://api.github.com/search/repositories";
export const useSearchRepos = (
  searchTerm: string | undefined,
  providerToken?: string | null | undefined,
  limit = 100
) => {
  const query = new URLSearchParams();
  query.set("q", searchTerm ?? "");
  query.set("per_page", `${limit}`);

  const endpointString = `search/repositories?${query}`;

  const { data, error, mutate } = useSWR<{ items: GhRepo[] }, Error>(
    !searchTerm ? null : endpointString,
    githubApiFetcher as Fetcher<{ items: GhRepo[] }, Error>
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
