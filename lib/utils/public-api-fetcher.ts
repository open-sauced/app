import { Fetcher } from "swr";
import { supabase } from "./supabase";

const v1BaseUrl = process.env.NEXT_PUBLIC_API_URL;
const v2BaseUrl = process.env.NEXT_PUBLIC_V2_API_URL;

const publicApiFetcher: Fetcher = async (apiUrl: string) => {
  return await apiFetcher(v1BaseUrl, apiUrl);
};

const v2PublicApiFetcher: Fetcher = async (apiUrl: string) => {
  return await apiFetcher(v2BaseUrl, apiUrl);
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

export { publicApiFetcher, v2PublicApiFetcher };
