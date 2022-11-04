import { Fetcher } from "swr";
import { supabase } from "./supabase";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const publicApiFetcher: Fetcher = async (apiUrl: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;

  const res = await fetch(`${baseUrl}/${apiUrl}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${sessionToken}`
    }
  });

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());
    console.error(error);

    throw error;
  }

  return res.json();
};

export default publicApiFetcher;
