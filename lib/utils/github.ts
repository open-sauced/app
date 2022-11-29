const getAvatarLink = (username: string | null, size=460) =>
  `https://github.com/${username ?? "github"}.png?size=${size}`;

const getProfileLink = (username: string | null) =>
  `https://github.com/${username ?? ""}`;

const getRepoIssuesLink = (repoName: string | null) =>
  `https://github.com/${repoName && `${repoName}/issues` || ""}`;

export {
  getAvatarLink,
  getProfileLink,
  getRepoIssuesLink
};