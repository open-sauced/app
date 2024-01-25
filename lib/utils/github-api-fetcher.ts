import { Fetcher } from "swr";
import { supabase } from "./supabase";

const baseUrl = "https://api.github.com";

const githubApiFetcher: Fetcher = async (apiUrl: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.provider_token;

  const res = await fetch(`${baseUrl}/${apiUrl}`, {
    headers: {
      accept: "application/json",
      // Authorization: `Bearer ${sessionToken}`,
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

export default githubApiFetcher;
