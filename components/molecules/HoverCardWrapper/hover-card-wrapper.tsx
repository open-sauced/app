import { useRouter } from "next/router";

import ContributorHoverCard, { ContributorsProfileType } from "../ContributorHoverCard/contributor-hover-card";

import roundedImage from "lib/utils/roundedImages";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { useContributorPullRequestsChart } from "lib/hooks/useContributorPullRequestsChart";

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
    githubAvatar: roundedImage(`https://www.github.com/${username}.png?size=60`, process.env.NEXT_PUBLIC_CLOUD_NAME),
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
