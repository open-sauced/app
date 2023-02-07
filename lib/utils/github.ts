/**
 * This method replaces the `getAvatarLink` method
 * @todo Use `getAvatarById` instead of `getAvatarByUsername` whenever possible
 * @see {@link https://github.com/open-sauced/insights/issues/746}
 */
const getAvatarByUsername = (username: string | null, size=460) =>
  `https://www.github.com/${username ?? "github"}.png?size=${size}`;

const getAvatarById = (id: string | null, size=460) =>
  `https://avatars.githubusercontent.com/u/${id ?? "9919"}?size=${size}&v=4`;

const getProfileLink = (username: string | null) =>
  `https://github.com/${username ?? ""}`;

const getRepoIssuesLink = (repoName: string | null) =>
  `https://github.com/${repoName && `${repoName}/issues` || ""}`;

export {
  getAvatarById,
  getAvatarByUsername,
  getProfileLink,
  getRepoIssuesLink
};
