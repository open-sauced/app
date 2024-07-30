import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import githubApiFetcher from "lib/utils/github-api-fetcher";
import useDebounceTerm from "./useDebounceTerm";

const repoSearchWithFallbackFetcher: Fetcher = async (apiUrl: string) => {
  try {
    const response = (await publicApiFetcher(apiUrl as any)) as { data: DbRepo[] };

    if (response.data.length > 0) {
      return response;
    }

    const url = new URL(apiUrl, "https://api.github.com");
    const fallbackResponse = (await githubApiFetcher(
      `search/repositories?q=${encodeURIComponent(url.searchParams.get("fuzzy_repo_name") as string)}` as any
    )) as {
      items: GhRepo[];
    };

    return {
      data: fallbackResponse.items.map((repo) => ({ full_name: repo.full_name, id: repo.id })),
    };
  } catch (e) {
    throw e;
  }
};

export const useSearchRepos = (searchTerm: string | undefined, minimuChars = 3, limit = 100) => {
  const debouncedSearchTerm = useDebounceTerm(searchTerm ?? "", 300);
  const query = new URLSearchParams();
  query.set("fuzzy_repo_name", debouncedSearchTerm);
  query.set("limit", `${limit}`);

  const endpointString = `repos/search/fuzzy?${query}`;

  const { data, error, mutate } = useSWR<{ data: DbRepo[] }, Error>(
    debouncedSearchTerm.length >= minimuChars ? endpointString : null,
    repoSearchWithFallbackFetcher as unknown as Fetcher<{ data: DbRepo[] }, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
