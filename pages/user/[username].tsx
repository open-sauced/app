import { useRouter } from "next/router";
import useRepoList from "lib/hooks/useRepoList";
import { useSingleContributor } from "lib/hooks/useSingleContributor";

import ContributorProfilePage from "components/organisms/ContributorProfilePage/contributor-profile-page";
import { ContributorsProfileType } from "components/molecules/ContributorHoverCard/contributor-hover-card";

import HubPageLayout from "layouts/hub-page";
import HubLayout from "layouts/hub";
import ProfileLayout from "layouts/profile";

const Contributor = () => {
  const router = useRouter();
  const { username } = router.query;
  const contributorLogin = username as string;

  const { data: contributor, isLoading: contributorLoading, isError } = useSingleContributor(contributorLogin);
  console.log(contributor);
  const repoList = useRepoList(contributor[0]?.recent_repo_list || "");
  const contributorLanguageList = (contributor[0]?.langs || "").split(",");
  const profile: ContributorsProfileType = {
    githubAvatar: `https://www.github.com/${contributorLogin}.png?size=300`,
    githubName: contributorLogin,
    totalPR: contributor[0]?.recent_pr_total
  };

  return (
    <div className="w-full">
      <ContributorProfilePage
        repoList={repoList}
        langList={contributorLanguageList}
        githubName={profile.githubName}
        githubAvatar={profile.githubAvatar}
        prTotal={contributor[0]?.recent_pr_total}
        openPrs={contributor[0]?.recent_opened_prs}
        recentContributionCount={contributor[0]?.recent_contribution_count}
        prReviews={contributor[0]?.recent_pr_reviews}
        prVelocity={contributor[0]?.recent_pr_velocity}
      />
    </div>
  );
};

Contributor.PageLayout = ProfileLayout;
export default Contributor;
