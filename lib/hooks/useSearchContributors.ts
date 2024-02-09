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

export const useSearchContributors = (searchTerm: string | undefined, minChars = 3, limit = 100) => {
  const debouncedSearchTerm = useDebounceTerm(searchTerm ?? "", 300);
  const query = new URLSearchParams();
  query.set("username", debouncedSearchTerm);
  query.set("limit", `${limit}`);

  const endpointString = `users/search?${query}`;

  const { data, error, mutate } = useSWR<{ data: GhUser[] }, Error>(
    debouncedSearchTerm.length >= minChars ? endpointString : null,
    apiFetcher as unknown as Fetcher<{ data: GhUser[] }, Error>
  );

  return {
    data: data?.data.map((item: GhUser) => item.login) ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
