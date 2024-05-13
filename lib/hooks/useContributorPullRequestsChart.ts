import { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import { getAvatarByUsername } from "lib/utils/github";
import useContributorPullRequests from "./api/useContributorPullRequests";

const useContributorPullRequestsChart = (
  contributor: string,
  topic: string,
  repositories: string[] = [],
  range = "30"
) => {
  const { data, meta } = useContributorPullRequests({ contributor, topic, repositories, limit: 100, range });
  const repoList: RepoList[] = Array.from(new Set(data.map((prData) => prData.repo_name))).map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName: repoName,
      repoOwner,
      repoIcon: getAvatarByUsername(repoOwner),
    };
  });

  return {
    data,
    meta,
    repoList,
  };
};

export { useContributorPullRequestsChart };
