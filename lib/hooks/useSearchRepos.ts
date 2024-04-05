import useSWR, { Fetcher } from "swr";
import { supabase } from "lib/utils/supabase";
import useDebounceTerm from "./useDebounceTerm";

const baseUrl = "https://api.github.com";

const githubApiRepoFetcher: Fetcher = async (apiUrl: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.provider_token;
  const defaultHeaders = {
    accept: "application/json",
  };
  const res = await fetch(`${baseUrl}/${apiUrl}`, {
    headers: {
      ...defaultHeaders,
      ...(sessionToken
        ? {
            Authorization: `Bearer ${sessionToken}`,
          }
        : {}),
    },
  });

  if (res.status === 403) {
    // Use our API as a fallback
    const searchTerm = new URL(`${baseUrl}/${apiUrl}`).searchParams.get("q") ?? "";
    const fallbackResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/repos/search?limit=5&repo=${encodeURIComponent(searchTerm)}`
    );

    if (fallbackResponse.status === 200) {
      const data = ((await fallbackResponse.json()).data as DbRepo[]).map((repo) => ({
        id: repo.id,
        name: repo.full_name,
        full_name: repo.full_name,
        private: false,
      })) as unknown as GhRepo[];
      return { items: data } as unknown as Promise<any>;
    }

    if (!fallbackResponse.ok) {
      const error = new Error("HttpError");

      error.message = `${fallbackResponse.status} ${fallbackResponse.statusText}`;
      error.stack = JSON.stringify(await fallbackResponse.json());
      // eslint-disable-next-line no-console
      console.error(error);

      throw error;
    }
  }

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());
    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }

  return res.json();
};

export const useSearchRepos = (searchTerm: string | undefined, minimuChars = 3, limit = 100) => {
  const debouncedSearchTerm = useDebounceTerm(searchTerm ?? "", 300);
  const query = new URLSearchParams();
  query.set("q", debouncedSearchTerm);
  query.set("per_page", `${limit}`);

  const endpointString = `search/repositories?${query}`;

  const { data, error, mutate } = useSWR<{ items: GhRepo[] }, Error>(
    debouncedSearchTerm.length >= minimuChars ? endpointString : null,
    githubApiRepoFetcher as unknown as Fetcher<{ items: GhRepo[] }, Error>
  );

  return {
    data: data?.items ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
