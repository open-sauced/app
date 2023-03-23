import { useRouter } from "next/router";

import { useSingleContributor } from "lib/hooks/useSingleContributor";

import ContributorHoverCard, { ContributorsProfileType } from "../ContributorHoverCard/contributor-hover-card";

import roundedImage from "lib/utils/roundedImages";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface HoverCardWrapperProps {
  username: string;
  repositories?: number[];
}
const HoverCardWrapper = ({ username, repositories }: HoverCardWrapperProps) => {
  const router = useRouter();
  const { filterName } = router.query;
  const topic = filterName as string;
  const { data: contributor, isLoading: contributorLoading, isError } = useSingleContributor(username);

  const repoList = (contributor[0]?.recent_repo_list || "").split(",").map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName,
      repoIcon: `https://www.github.com/${repoOwner ?? "github"}.png?size=460`
    };
  });

  const profile: ContributorsProfileType = {
    githubAvatar: roundedImage(`https://www.github.com/${username}.png?size=60`, process.env.NEXT_PUBLIC_CLOUD_NAME),
    githubName: username,
    totalPR: contributor[0]?.recent_pr_total
  };

  return (
    <TooltipProvider>
      <ContributorHoverCard
        dateOfFirstPr={contributor[0]?.first_commit_time}
        totalPR={profile.totalPR}
        githubAvatar={profile.githubAvatar}
        githubName={profile.githubName}
        repoList={repoList}
        topic={topic}
        repositories={repositories}
      />
    </TooltipProvider>
  );
};

export default HoverCardWrapper;
