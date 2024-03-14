import { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import { getAvatarByUsername } from "lib/utils/github";
import useContributorPullRequests from "./api/useContributorPullRequests";

const useContributorPullRequestsChart = (
  contributor: string,
  topic: string,
  repoIds: number[] = [],
  range = "30",
  mostRecent = false
) => {
  const { data, meta } = useContributorPullRequests({ contributor, topic, repoIds, limit: 100, range, mostRecent });
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
