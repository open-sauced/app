import { Fetcher } from "swr";
import { supabase } from "./supabase";

export const githubFetcher: Fetcher = async (githubUrl: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  const res = await fetch(`https://api.github.com/repos/${githubUrl}`);

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());

    throw error;
  }

  return res.json();
};
