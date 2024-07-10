import { supabase } from "./supabase";
import { isValidUrlNumber, isValidUrlSlug } from "./url-validators";

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

const getAvatarByUsername = (username: string, size = 460) => `https://www.github.com/${username}.png?size=${size}`;

const getAvatarById = (id: string, size = 460) => `https://avatars.githubusercontent.com/u/${id}?size=${size}&v=4`;

const getProfileLink = (username: string | null) => `https://github.com/${username ?? ""}`;

const getRepoIssuesLink = (repoName: string | null) => `https://github.com/${(repoName && `${repoName}/issues`) || ""}`;

const generateRepoParts = (
  url: string
): {
  isValidUrl: boolean;
  apiPaths: { orgName: string | null; repoName: string | null; repoFullName: string | null; issueId: string | null };
} => {
  try {
    const trimmedUrl = url.trim();

    if (
      !(trimmedUrl.includes("https://") || trimmedUrl.includes("http://") || trimmedUrl.includes("www.")) &&
      trimmedUrl.split("/").length === 2
    ) {
      const [orgName, repoName] = trimmedUrl.split("/");

      const repoFullName = `${orgName}/${repoName}`;

      return {
        isValidUrl: true,
        apiPaths: { orgName, repoName, repoFullName, issueId: null },
      };
    }

    const githubUrl = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
    const { pathname } = githubUrl;

    const [, orgName, repoName, , issueId] = pathname.split("/");

    const repoFullName = `${orgName}/${repoName}`;

    if (githubUrl.hostname !== "github.com" || !orgName || !repoName) {
      return {
        isValidUrl: false,
        apiPaths: { orgName: null, repoName: null, repoFullName: null, issueId: null },
      };
    }

    if (!issueId) {
      return {
        isValidUrl: true,
        apiPaths: { orgName, repoName, repoFullName, issueId: null },
      };
    }

    return {
      isValidUrl: true,
      apiPaths: { orgName, repoName, repoFullName, issueId },
    };
  } catch (err) {
    return { isValidUrl: false, apiPaths: { orgName: null, repoName: null, repoFullName: null, issueId: null } };
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

  if (!isValidUrlSlug(owner) || !isValidUrlSlug(repoName) || !isValidUrlNumber(pullRequestNumber)) {
    throw new Error("Invalid input");
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/pulls/${pullRequestNumber}/commits`;

  const response = await fetch(apiUrl, {
    headers: githubToken
      ? {
          Authorization: `Bearer ${githubToken}`,
        }
      : {},
  });
  const data = await response.json();

  if (Array.isArray(data?.commits)) {
    return (data.commits as Commit[]).map((commit: Commit): string => commit.commit.message);
  }

  return (data as Commit[]).map((commit: Commit): string => commit.commit.message);
};

const getGithubIssueDetails = async (url: string): Promise<any> => {
  const sessionResponse = await supabase.auth.getSession();
  const githubToken = sessionResponse?.data.session?.provider_token;
  const [, , , owner, repoName, , issueNumber] = url.split("/");

  if (!isValidUrlSlug(owner) || !isValidUrlSlug(repoName) || !isValidUrlNumber(issueNumber)) {
    throw new Error("Invalid input");
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/issues/${issueNumber}`;

  const response = await fetch(apiUrl, {
    headers: githubToken
      ? {
          Authorization: `Bearer ${githubToken}`,
        }
      : {},
  });
  const data = await response.json();

  return {
    title: data.title,
    body: data.body,
  };
};

const getGithubIssueComments = async (url: string): Promise<any> => {
  const sessionResponse = await supabase.auth.getSession();
  const githubToken = sessionResponse?.data.session?.provider_token;
  const [, , , owner, repoName, , issueNumber] = url.split("/");

  if (!isValidUrlSlug(owner) || !isValidUrlSlug(repoName) || !isValidUrlNumber(issueNumber)) {
    throw new Error("Invalid input");
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/issues/${issueNumber}/comments`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  const data = await response.json();
  const allComments = data.map((comment: any) => comment.body).join(" ");

  return allComments;
};

const isValidPullRequestUrl = (url: string): boolean => {
  return url.match(/((https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+\/pull\/[0-9]+)/) ? true : false;
};

const isValidIssueUrl = (url: string): boolean => {
  return url.match(/((https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+\/issues\/[0-9]+)/) ? true : false;
};

const getOwnerAndRepoNameFromUrl = (url: string): { owner: string; repoName: string } => {
  const [, , , owner, repoName] = url.split("/");

  return { owner, repoName };
};

export {
  getAvatarById,
  getOwnerAndRepoNameFromUrl,
  getAvatarByUsername,
  getProfileLink,
  getRepoIssuesLink,
  generateRepoParts,
  generateGhOgImage,
  isValidPullRequestUrl,
  isValidIssueUrl,
  getPullRequestCommitMessageFromUrl,
  getGithubIssueDetails,
  getGithubIssueComments,
};
