import { supabase } from "./supabase";

/**
 * This method replaces the `getAvatarLink` method
 * @todo Use `getAvatarById` instead of `getAvatarByUsername` whenever possible
 * @see {@link https://github.com/open-sauced/insights/issues/746}
 */
export interface Commit {
  commit: {
    message: string;
  };
}

const getAvatarByUsername = (username: string | null, size = 460) =>
  `https://www.github.com/${username ?? "github"}.png?size=${size}`;

const getAvatarById = (id: string | null, size = 460) =>
  `https://avatars.githubusercontent.com/u/${id ?? "9919"}?size=${size}&v=4`;

const getProfileLink = (username: string | null) => `https://github.com/${username ?? ""}`;

const getRepoIssuesLink = (repoName: string | null) => `https://github.com/${(repoName && `${repoName}/issues`) || ""}`;

const generateApiPrUrl = (
  url: string
): { isValidUrl: boolean; apiPaths: { orgName: string | null; repoName: string | null; issueId: string | null } } => {
  try {
    const trimmedUrl = url.trim();
    const githubUrl = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
    const { pathname } = githubUrl;

    const [, orgName, repoName, , issueId] = pathname.split("/");

    if (githubUrl.hostname !== "github.com") {
      return {
        isValidUrl: false,
        apiPaths: { orgName: null, repoName: null, issueId: null },
      };
    }

    return {
      isValidUrl: true,
      apiPaths: { orgName, repoName, issueId },
    };
  } catch (err) {
    return { isValidUrl: false, apiPaths: { orgName: null, repoName: null, issueId: null } };
  }
};

const generateGhOgImage = (githubUrl: string): { isValid: boolean; url: string } => {
  try {
    const trimmedUrl = githubUrl.trim();
    const url = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
    const { pathname } = url;

    if (url.hostname !== "github.com") {
      return { isValid: false, url: "" };
    }

    return { isValid: true, url: `https://opengraph.githubassets.com/1${pathname}` };
  } catch (err) {
    return { isValid: false, url: "" };
  }
};

const getPullRequestCommitMessageFromUrl = async (url: string): Promise<string[]> => {
  const sessionResponse = await supabase.auth.getSession();
  const githubToken = sessionResponse?.data.session?.provider_token;
  const [, , , owner, repoName, , pullRequestNumber] = url.split("/");

  const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/pulls/${pullRequestNumber}/commits`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  const data = await response.json();

  console.log(sessionResponse);

  if (Array.isArray(data?.commits)) {
    return (data.commits as Commit[]).map((commit: Commit): string => commit.commit.message);
  }

  return (data as Commit[]).map((commit: Commit): string => commit.commit.message);
};

const isValidPullRequestUrl = (url: string): boolean => {
  return url.match(/((https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+\/pull\/[0-9]+)/) ? true : false;
};

export {
  getAvatarById,
  getAvatarByUsername,
  getProfileLink,
  getRepoIssuesLink,
  generateApiPrUrl,
  generateGhOgImage,
  isValidPullRequestUrl,
  getPullRequestCommitMessageFromUrl,
};
