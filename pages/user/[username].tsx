import { useRouter } from "next/router";
import useRepoList from "lib/hooks/useRepoList";
import { useSingleContributor } from "lib/hooks/useSingleContributor";

import ContributorProfilePage from "components/organisms/ContributorProfilePage/contributor-profile-page";
import { ContributorsProfileType } from "components/molecules/ContributorHoverCard/contributor-hover-card";

import HubPageLayout from "layouts/hub-page";
import HubLayout from "layouts/hub";
import ProfileLayout from "layouts/profile";
import { useFetchUser } from "lib/hooks/useFetchUser";

const Contributor = () => {
  const router = useRouter();
  const { username } = router.query;
  const contributorLogin = username as string;

  const {
    data: contributor,
    isLoading: contributorLoading,
    isError: contributorError
  } = useSingleContributor(contributorLogin);
  const { data: user, isLoading: userLoading, isError: userError } = useFetchUser(contributorLogin);

  const isError = contributorError;
  const repoList = useRepoList(contributor[0]?.recent_repo_list || "");
  const contributorLanguageList = (contributor[0]?.langs || "").split(",");
  const profile: ContributorsProfileType = {
    githubAvatar: `https://www.github.com/${contributorLogin}.png?size=300`,
    githubName: contributor[0]?.host_login,
    totalPR: contributor[0]?.recent_pr_total
  };

  return (
    <div className="w-full">
      <ContributorProfilePage
        prMerged={contributor[0]?.recent_pr_merged}
        error={isError}
        loading={userLoading}
        user={user}
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
