import { Fetcher } from "swr";

const baseUrl = "https://gs-api.opensauced.pizza/v1";

const apiFetcher: Fetcher = async (apiUrl: string) => {
  const res = await fetch(`${baseUrl}/${apiUrl}`, { headers: { accept: "application/json" } });

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());

    throw error;
  }

  return res.json();
};

export default apiFetcher;
