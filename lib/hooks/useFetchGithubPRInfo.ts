import { Fetcher } from "swr";
import useSWR from "swr";

// Leaving this fetcher here as this solution will be changed in the future when the backend supports the github Pull information

const fetcher: Fetcher = async (githubUrl: string) => {
  const res = await fetch(`https://api.github.com/repos/${githubUrl}`);

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());

    throw error;
  }

  return res.json();
};

interface GithubPRInfoResponse {
  readonly head: { repo: { name: string; full_name: string }; user: { login: string; full_name: string } };
  readonly title: string;
  readonly number: number;
  readonly comments: number;
  readonly user: { login: string; avatar_url: string };
  readonly created_at: string;
}
const useFetchGithubPRInfo = (url: string) => {
  const { data, error } = useSWR<GithubPRInfoResponse, Error>(
    url,
    fetcher as unknown as Fetcher<GithubPRInfoResponse, Error>
  );

  return {
    data: data ?? undefined,
    isLoading: !error && !data,
    isError: !!error
  };
};

export { useFetchGithubPRInfo };
