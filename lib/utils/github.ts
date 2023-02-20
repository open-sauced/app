/**
 * This method replaces the `getAvatarLink` method
 * @todo Use `getAvatarById` instead of `getAvatarByUsername` whenever possible
 * @see {@link https://github.com/open-sauced/insights/issues/746}
 */
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
    console.log(pathname);
    const [, orgName, repoName, , issueId] = pathname.split("/");

    if (githubUrl.hostname !== "github.com") {
      return {
        isValidUrl: false,
        apiPaths: { orgName: null, repoName: null, issueId: null }
      };
    }

    return {
      isValidUrl: true,
      apiPaths: { orgName, repoName, issueId }
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

export { getAvatarById, getAvatarByUsername, getProfileLink, getRepoIssuesLink, generateApiPrUrl, generateGhOgImage };
