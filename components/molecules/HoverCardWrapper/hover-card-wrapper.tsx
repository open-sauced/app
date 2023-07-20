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
  const { filterName } = router.query;
  const topic = filterName as string;
  const { data: contributor } = useFetchUser(username);
  const { repoList } = useContributorPullRequestsChart(username, "*", repositories);

  const profile: ContributorsProfileType = {
    githubAvatar: getAvatarByUsername(username, 40),
    githubName: username,
    totalPR: repoList.length,
  };

  return (
    <>
      <ContributorHoverCard
        dateOfFirstPr={contributor?.first_opened_pr_at}
        totalPR={profile.totalPR}
        githubAvatar={profile.githubAvatar}
        githubName={profile.githubName}
        repoList={repoList}
        topic={topic}
        repositories={repositories}
      />
    </>
  );
};

export default HoverCardWrapper;
