import { useRouter } from "next/router";
import useRepoList from "lib/hooks/useRepoList";
import { useSingleContributor } from "lib/hooks/useSingleContributor";

import ContributorProfilePage from "components/organisms/ContributorProfilePage/contributor-profile-page";
import { ContributorsProfileType } from "components/molecules/ContributorHoverCard/contributor-hover-card";

import ProfileLayout from "layouts/profile";
import { useFetchUser } from "lib/hooks/useFetchUser";
import Head from "next/head";
import SEO from "layouts/SEO/SEO";
import { WithPageLayout } from "interfaces/with-page-layout";
import { useEffect } from "react";

const Contributor: WithPageLayout = () => {
  const router = useRouter();
  const { username } = router.query;
  const contributorLogin = username as string;

  const { data: contributor, isError: contributorError } = useSingleContributor(contributorLogin);
  const { data: user, isLoading: userLoading, isError: userError } = useFetchUser(contributorLogin);

  const isError = contributorError;
  const repoList = useRepoList(contributor[0]?.recent_repo_list || "");
  const contributorLanguageList = (contributor[0]?.langs || "").split(",");
  const profile: ContributorsProfileType = {
    githubAvatar: `https://www.github.com/${contributorLogin}.png?size=300`,
    githubName: contributorLogin,
    totalPR: contributor[0]?.recent_pr_total
  };

  useEffect( () => {
    Contributor.updateSEO!({
      title: `${contributorLogin} | OpenSauced`,
      description: `${user?.bio || "I am an open source developer with a passion for music and video games. I strive to improve the open source community and am always looking for new ways to contribute."}`,
      image: profile.githubAvatar,
      twitterCard: "summary_large_image"
    });
  }, [contributorLogin, user?.bio, profile.githubAvatar]);

  return (
    <div className="w-full">
      <ContributorProfilePage
        prMerged={contributor[0]?.recent_merged_prs}
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
