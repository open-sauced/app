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

const generateApiPrUrl = (url: string | null) => {
  const newUrl = url ? url.toLowerCase().trim() : "";
  const apiUrl = newUrl?.substring(0, 8) + "api." + newUrl.substring(8, 19) + "repos" + newUrl.substring(18);
  return apiUrl;
};

export { getAvatarById, getAvatarByUsername, getProfileLink, getRepoIssuesLink, generateApiPrUrl };
