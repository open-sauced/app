import { useSingleContributor } from "lib/hooks/useSingleContributor";
import { useTopicContributions } from "lib/hooks/useTopicContributions";
import { useRouter } from "next/router";
import ContributorHoverCard, { ContributorsProfileType } from "../ContributorHoverCard/contributor-hover-card";

interface HoverCardWrapperProps {
  username: string;
}
const HoverCardWrapper = ({ username }: HoverCardWrapperProps) => {
  const router = useRouter();
  const { filterName } = router.query;
  const topic = filterName as string;
  const {
    data: contributor,
    isLoading: contributorLoading,
    isError: contributorError
  } = useSingleContributor(username);
  // const { data, isLoading, isError } = useTopicContributions(10, []);

  console.log(username);

  const repoList = (contributor[0]?.recent_repo_list || "").split(",").map((repo) => {
    const [repoOwner, repoName] = repo.split("/");

    return {
      repoName,
      repoIcon: `https://www.github.com/${repoOwner ?? "github"}.png?size=460`
    };
  });

  const profile: ContributorsProfileType = {
    githubAvatar: `https://www.github.com/${contributor[0]?.host_login}.png?size=60`,
    githubName: contributor[0]?.host_login,
    totalPR: contributor[0]?.recent_pr_total
  };

  return (
    <>
      {contributorLoading ? (
        <>Loading....</>
      ) : (
        <ContributorHoverCard
          dateOfFirstPr={contributor[0].first_commit_time}
          totalPR={profile.totalPR}
          githubAvatar={profile.githubAvatar}
          githubName={profile.githubName}
          repoList={repoList}
          topic={topic}
        />
      )}
    </>
  );
};

export default HoverCardWrapper;
