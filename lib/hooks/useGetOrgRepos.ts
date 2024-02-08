import useSWR, { Fetcher } from "swr";
import { supabase } from "lib/utils/supabase";

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

export const useGetOrgRepos = ({
  organization,
  limit,
  archived = false,
}: {
  organization: string;
  limit: number;
  archived?: boolean;
}) => {
  // TODO: get private repos appearing in the list
  // See https://docs.github.com/en/rest/repos/repos for more information
  const query = new URLSearchParams();
  query.set("per_page", `${limit}`);
  query.set("type", "all");
  query.set("sort", "full_name");
  query.set("direction", "asc");

  const endpointString = `orgs/${organization}/repos?${query}`;

  const { data, error, mutate } = useSWR<GhOrg[], Error>(
    endpointString,
    githubApiRepoFetcher as unknown as Fetcher<GhOrg[], Error>
  );

  return {
    data: data?.map((item) => item.full_name) ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
