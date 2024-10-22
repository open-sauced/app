import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import { supabase } from "lib/utils/supabase";
import { calcDaysFromToday } from "lib/utils/date-utils";

const baseUrl = "https://api.github.com";

const githubApiRepoFetcher: Fetcher = async (apiUrl: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.provider_token;
  const headers = {
    accept: "application/json",
    ...(sessionToken
      ? {
          Authorization: `Bearer ${sessionToken}`,
        }
      : {}),
  };
  const res = await fetch(`${baseUrl}/${apiUrl}`, {
    headers,
  });

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());
    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }

  const linkHeader = res.headers.get("link");

  const responses = [res];

  if (linkHeader && linkHeader.includes('rel="last"')) {
    // @ts-expect-error the regex group will exist as the link header is present as per https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers
    const groups = /page=(?<lastPage>\d+)>;\s+rel="last"/.exec(linkHeader).groups as { lastPage: string };

    const lastPage = Number(groups.lastPage);
    // incrementing by two as we already have the first response for the first page of data
    const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 2);
    const pageUrls = pageNumbers.map((page) => {
      const url = new URL(`${baseUrl}/${apiUrl}`);
      url.searchParams.set("page", page.toString());
      return url.toString();
    });

    const resolvedResponses = await Promise.all(
      pageUrls.map((url) =>
        fetch(url, {
          headers,
        }).catch(() => new Response(JSON.stringify({})))
      )
    );

    // add the initial request's reponse to the start of the array of paged data responses
    responses.push(...resolvedResponses);

    const data = await Promise.all(responses.map((response) => response.json()));

    return data.flat();
  } else {
    return res.json();
  }
};

export const useGetOrgRepos = ({ organization, limit = 100 }: { organization: string | undefined; limit?: number }) => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;
  const range = router.query.range as string;
  const query = new URLSearchParams();
  query.set("per_page", `${limit}`);
  query.set("type", "public");
  query.set("sort", "pushed");
  query.set("direction", "desc");

  const endpointString = organization ? `orgs/${organization}/repos?${query}` : null;

  const { data, error, mutate } = useSWR<GhOrg[], Error>(
    endpointString,
    githubApiRepoFetcher as unknown as Fetcher<GhOrg[], Error>
  );

  return {
    data:
      data
        ?.filter((item) => calcDaysFromToday(new Date(item.pushed_at)) <= Number(range ?? 30))
        .map((item) => item.full_name) ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
