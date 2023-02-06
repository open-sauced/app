import { useRouter } from "next/router";
import useRepoList from "lib/hooks/useRepoList";
import { useSingleContributor } from "lib/hooks/useSingleContributor";

import ContributorProfilePage from "components/organisms/ContributorProfilePage/contributor-profile-page";
import { ContributorsProfileType } from "components/molecules/ContributorHoverCard/contributor-hover-card";

import ProfileLayout from "layouts/profile";
import { useFetchUser } from "lib/hooks/useFetchUser";
import Head from "next/head";

const Contributor = (): JSX.Element => {
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

  return (
    <>
      <Head>
        <title key="title">{contributorLogin} | Open Source Contributors</title>
        <meta name="description" content={user?.bio || "I am an open source developer with a passion for music and video games. I strive to improve the open source community and am always looking for new ways to contribute."} key="description" />
        <meta name="keywords" content="open source, github, contributor, profile, portfolio, developer, software engineer, software developer, software engineer portfolio, software developer portfolio, open source portfolio, open source developer, developer portfolio" key="keywords" />

        <meta property="og:title" content={`${contributorLogin} | Open Source Contributors`} key="og:title" />
        <meta property="og:description" content={"Profile Bio: " + user?.bio || "I am an open source developer with a passion for music and video games. I strive to improve the open source community and am always looking for new ways to contribute."} key="og:description" />
        <meta property="og:image" content={profile.githubAvatar} key="og:image" />
        <meta property="og:url" content={window.location.href} key="og:url" />
        <meta property="og:site_name" content="OpenSauced Insights" key="og:site_name" />
        <meta property="og:type" content="website" key="og:type" />

        <meta name="twitter:title" content={`${contributorLogin} | Open Source Contributors`} key="twitter:title" />
        <meta name="twitter:description" content={user?.bio || "I am an open source developer with a passion for music and video games. I strive to improve the open source community and am always looking for new ways to contribute."} key="twitter:description" />
        <meta name="twitter:image" content={profile.githubAvatar} key="twitter:image" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:url" content={window.location.href} key="twitter:url" />
      </Head>
    
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
    </>
  );
};

Contributor.PageLayout = ProfileLayout;
export default Contributor;
