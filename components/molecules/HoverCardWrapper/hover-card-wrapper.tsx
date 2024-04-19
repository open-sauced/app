import { useRouter } from "next/router";

import { useFetchUser } from "lib/hooks/useFetchUser";
import { useContributorPullRequestsChart } from "lib/hooks/useContributorPullRequestsChart";
import { getAvatarByUsername } from "lib/utils/github";
import ContributorHoverCard, { ContributorsProfileType } from "../ContributorHoverCard/contributor-hover-card";

interface HoverCardWrapperProps {
  username: string;
  repositories?: number[];
}
const HoverCardWrapper = ({ username, repositories }: HoverCardWrapperProps) => {
  const router = useRouter();
  const topic = router.query.pageId as string;
  const { data: contributor } = useFetchUser(username);
  const { repoList } = useContributorPullRequestsChart(username, "*", repositories, "30");

  const profile: ContributorsProfileType = {
    githubAvatar: getAvatarByUsername(username, 40),
    githubName: username,
    totalPR: repoList.length,
  };

  const { is_maintainer, first_opened_pr_at } = contributor ?? {};

  return (
    <>
      <ContributorHoverCard
        dateOfFirstPr={first_opened_pr_at}
        totalPR={profile.totalPR}
        githubAvatar={profile.githubAvatar}
        githubName={profile.githubName}
        repoList={repoList}
        topic={topic}
        repositories={repositories}
        isMaintainer={!!is_maintainer}
      />
    </>
  );
};

export default HoverCardWrapper;
