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
  let pulls: string[];

  if (newUrl.substring(0, 8) === "https://") {
    pulls = newUrl.substring(19).split("/");
  } else if (newUrl.substring(0, 7) === "http://") {
    pulls = newUrl.substring(18).split("/");
  } else {
    pulls = newUrl.substring(11).split("/");
  }
  const [orgName, repoName, , IssueId] = pulls;

  const apiUrl = `${orgName}/${repoName}/pulls/${IssueId}`;
  return apiUrl;
};

export { getAvatarById, getAvatarByUsername, getProfileLink, getRepoIssuesLink, generateApiPrUrl };
