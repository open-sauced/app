import { Fetcher } from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const publicApiFetcher: Fetcher = async (apiUrl: string) => {
  const data = localStorage ? JSON.parse(localStorage.getItem("supabase.auth.token") as string) : {};
  const sessionToken = data?.currentSession?.access_token;
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
