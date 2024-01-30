import { Fetcher } from "swr";
import { supabase } from "./supabase";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// this is the experimental API url for API endpoints that have not yet been
// cut into the public API or are in the "next" version of the API.
const expBaseUrl = process.env.NEXT_PUBLIC_EXP_API_URL;

const publicApiFetcher: Fetcher = async (apiUrl: string) => {
  return await apiFetcher(baseUrl, apiUrl);
};

const expPublicApiFetcher: Fetcher = async (apiUrl: string) => {
  return await apiFetcher(expBaseUrl, apiUrl);
};

const apiFetcher = async (baseUrl: string | undefined, apiUrl: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;

  const res = await fetch(`${baseUrl}/${apiUrl}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${sessionToken}`,
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

export { publicApiFetcher, expPublicApiFetcher };
