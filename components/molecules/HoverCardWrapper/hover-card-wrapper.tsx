import { useRouter } from "next/router";

import { useSingleContributor } from "lib/hooks/useSingleContributor";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ContributorHoverCard, { ContributorsProfileType } from "../ContributorHoverCard/contributor-hover-card";

interface HoverCardWrapperProps {
  username: string;
  repositories?: number[]
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
    githubAvatar: `https://www.github.com/${username}.png?size=60`,
    githubName: username,
    totalPR: contributor[0]?.recent_pr_total
  };

  return (
    <>
      {contributorLoading ? (
        <div className="p-3 flex flex-col gap-3 bg-white rounded-xl">
          <SkeletonWrapper height={50} width={350} radius={6} />
          <div>
            <SkeletonWrapper height={150} width={350} radius={6} />
          </div>
        </div>
      ) : (
        <ContributorHoverCard
          dateOfFirstPr={contributor[0]?.first_commit_time}
          totalPR={profile.totalPR}
          githubAvatar={profile.githubAvatar}
          githubName={profile.githubName}
          repoList={repoList}
          topic={topic}
          repositories={repositories}
        />
      )}
    </>
  );
};

export default HoverCardWrapper;
