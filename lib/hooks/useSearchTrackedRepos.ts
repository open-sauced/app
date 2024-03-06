import useSWR, { Fetcher } from "swr";
import useDebounceTerm from "./useDebounceTerm";

const apiFetcher: Fetcher = async (endpointString: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpointString}`, {
    headers: { accept: "application/json" },
  });

  if (res.status === 404) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());
    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }

  return res.json();
};

export const useSearchTrackedRepos = (
  workspaceId: string,
  searchTerm: string | undefined,
  minChars = 3,
  limit = 100
) => {
  const debouncedSearchTerm = useDebounceTerm(searchTerm ?? "", 300);
  const query = new URLSearchParams();
  query.set("q", debouncedSearchTerm);
  query.set("per_page", `${limit}`);

  const endpointString = `workspaces/${workspaceId}/repos/search?${query}`;

  const { data, error, mutate } = useSWR<{ items: GhRepo[] }, Error>(
    debouncedSearchTerm.length >= minChars ? endpointString : null,
    apiFetcher as unknown as Fetcher<{ items: GhRepo[] }, Error>
  );

  return {
    data: data?.items.map((item) => item.full_name) ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
