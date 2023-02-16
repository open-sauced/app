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

const generateApiPrUrl = (url: string): { isValidUrl: boolean; apiUrl: string } => {
  try {
    const trimmedUrl = url.trim();
    const githubUrl = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
    const { pathname } = githubUrl;

    const [, orgName, repoName, , issueId] = pathname.split("/");

    if (githubUrl.hostname !== "github.com") {
      return {
        isValidUrl: false,
        apiUrl: "Invalid host URL"
      };
    }

    return {
      isValidUrl: true,
      apiUrl: `${orgName}/${repoName}/pulls/${issueId}`
    };
  } catch (err) {
    return { isValidUrl: false, apiUrl: "Failed to construct URL" };
  }
};

export { getAvatarById, getAvatarByUsername, getProfileLink, getRepoIssuesLink, generateApiPrUrl };
