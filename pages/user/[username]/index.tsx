import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";
import { Person } from "schema-dts";

import ProfileLayout from "layouts/profile";
import SEO from "layouts/SEO/SEO";

import { WithPageLayout } from "interfaces/with-page-layout";

import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";
import { useFetchUser } from "lib/hooks/useFetchUser";
import useRepoList from "lib/hooks/useRepoList";
import { getAvatarByUsername } from "lib/utils/github";
import useContributorLanguages from "lib/hooks/api/useContributorLanguages";
import getContributorPullRequestVelocity from "lib/utils/get-contributor-pr-velocity";
import fetchSocialCard from "lib/utils/fetch-social-card";

// A quick fix to the hydration issue. Should be replaced with a real solution.
// Slows down the page's initial client rendering as the component won't be loaded on the server.
const ClientOnlyContributorProfilePage = dynamic(
  () => import("components/organisms/ContributorProfilePage/contributor-profile-page"),
  { ssr: false }
);

export type ContributorSSRProps = {
  username: string;
  user?: DbUser;
  ogImage: string;
};

const Contributor: WithPageLayout<ContributorSSRProps> = ({ username, user, ogImage }) => {
  const { data: contributor, isError: contributorError } = useFetchUser(username);

  const { data: contributorPRData, meta: contributorPRMeta } = useContributorPullRequests(username, "*", [], 100);
  const isError = contributorError;
  const repoList = useRepoList(Array.from(new Set(contributorPRData.map((prData) => prData.full_name))).join(","));
  const mergedPrs = contributorPRData.filter((prData) => prData.merged);
  const contributorLanguageList = useContributorLanguages(username);
  const githubAvatar = getAvatarByUsername(username, 300);
  const prVelocity = getContributorPullRequestVelocity(contributorPRData);

  return (
    <>
      <SEO
        title={`${username} | OpenSauced`}
        description={`${user?.bio || `${username} has connected their GitHub but has not added a bio.`}`}
        image={ogImage}
        twitterCard="summary_large_image"
      />

      <Head>
        {user && (
          <script
            {...jsonLdScriptProps<Person>({
              "@context": "https://schema.org",
              "@type": "Person",
              name: username,
              url: `https://www.github.com/${user.login}`,
              image: githubAvatar,
              sameAs: user.twitter_username ? `https://twitter.com/${user.twitter_username}` : undefined,
              description: user.bio ?? undefined,
              email: user.display_email ? user.email : undefined,
              knowsAbout: contributorLanguageList.map((cll) => cll.languageName),
              worksFor: user.company ?? undefined,
            })}
          />
        )}
      </Head>
      <div className="w-full">
        <ClientOnlyContributorProfilePage
          prMerged={mergedPrs.length}
          error={isError}
          loading={false}
          user={user}
          langList={contributorLanguageList}
          githubName={username}
          githubAvatar={githubAvatar}
          prTotal={contributorPRMeta.itemCount}
          openPrs={contributorPRData.length}
          recentContributionCount={repoList.length}
          prFirstOpenedDate={contributor?.first_opened_pr_at}
          prVelocity={prVelocity}
        />
      </div>
    </>
  );
};

Contributor.PageLayout = ProfileLayout;
export default Contributor;

export const getServerSideProps = async (context: UserSSRPropsContext) => {
  return await handleUserSSR(context);
};

export type UserSSRPropsContext = GetServerSidePropsContext<{ username: string }>;

export async function handleUserSSR({ params }: GetServerSidePropsContext<{ username: string }>) {
  const { username } = params!;
  let user;
  let ogImage;

  async function fetchUserData() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, {
      headers: {
        accept: "application/json",
      },
    });

    user = (await req.json()) as DbUser;
  }

  // Runs the data fetching in parallel. Decreases the loading time by 50%.
  const [, ogData] = await Promise.allSettled([fetchUserData(), fetchSocialCard(`users/${username}`)]);

  ogImage = ogData.status === "fulfilled" ? ogData.value : "";

  return {
    props: { username, user, ogImage },
  };
}
