import useRepoList from "lib/hooks/useRepoList";
import { useSingleContributor } from "lib/hooks/useSingleContributor";
import ProfileLayout from "layouts/profile";
import Head from "next/head";
import { WithPageLayout } from "interfaces/with-page-layout";
import { Person } from "schema-dts";
import { jsonLdScriptProps } from "react-schemaorg";
import { GetServerSidePropsContext } from "next";
import SEO from "layouts/SEO/SEO";
import { supabase } from "lib/utils/supabase";
import dynamic from "next/dynamic";
import { getAvatarByUsername } from "lib/utils/github";
import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";

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
}

const Contributor: WithPageLayout<ContributorSSRProps> = ({ username, user, ogImage }) => {

  const { data: contributor, isError: contributorError } = useSingleContributor(username);

  const { data: contributorPRData, meta: contributorPRMeta } = useContributorPullRequests(username, "*", [], 100);
  const isError = contributorError;
  const repoList = useRepoList(Array.from(new Set(contributorPRData.map(prData => prData.full_name))).join(","));
  const mergedPrs = contributorPRData.filter(prData => prData.merged);
  const contributorLanguageList = (contributor[0]?.langs || "").split(",");
  const githubAvatar = getAvatarByUsername(username, 300);

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
              knowsAbout: contributorLanguageList.concat(user.interests?.split(",")),
              worksFor: user.company ?? undefined
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
          prReviews={contributor[0]?.recent_pr_reviews}
          prVelocity={contributor[0]?.recent_pr_velocity}
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
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  let user;
  let ogImage;

  async function fetchUserData() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${sessionToken}`
      }
    });

    user = await req.json() as DbUser;
  }

  async function fetchSocialCardURL() {
    const socialCardUrl = `${String(process.env.NEXT_PUBLIC_OPENGRAPH_URL ?? "")}/users/${username}`;
    const ogReq = await fetch(`${socialCardUrl}/metadata`); //status returned: 204 or 304 or 404
    if(ogReq.status !== 204) {
      fetch(socialCardUrl, {
        method: "HEAD"
      }); // trigger the generation of the social card
    }

    ogImage = ogReq.headers.get("x-amz-meta-location");
  }

  // Runs the data fetching in parallel. Decreases the loading time by 50%.
  await Promise.allSettled([fetchUserData(), fetchSocialCardURL()]);

  return {
    props: { username, user, ogImage }
  };
}
