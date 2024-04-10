import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import useDebounceTerm from "./useDebounceTerm";

export const useSearchRepos = (searchTerm: string | undefined, minimuChars = 3, limit = 100) => {
  const debouncedSearchTerm = useDebounceTerm(searchTerm ?? "", 300);
  const query = new URLSearchParams();
  query.set("fuzzy_repo_name", debouncedSearchTerm);
  query.set("limit", `${limit}`);

  const endpointString = `repos/search/fuzzy?${query}`;

  const { data, error, mutate } = useSWR<{ data: DbRepo[] }, Error>(
    debouncedSearchTerm.length >= minimuChars ? endpointString : null,
    publicApiFetcher as unknown as Fetcher<{ data: DbRepo[] }, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
