import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";
import { Person } from "schema-dts";

import { useRouter } from "next/router";
import SEO from "layouts/SEO/SEO";

import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";
import useRepoList from "lib/hooks/useRepoList";
import { getAvatarByUsername } from "lib/utils/github";
import useContributorLanguages from "lib/hooks/api/useContributorLanguages";
import getContributorPullRequestVelocity from "lib/utils/get-contributor-pr-velocity";
import { useHasMounted } from "lib/hooks/useHasMounted";
import ContributorProfilePage from "components/organisms/ContributorProfilePage/contributor-profile-page";
import { isValidUrlSlug } from "lib/utils/url-validators";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import useSession from "lib/hooks/useSession";
import { siteUrl } from "lib/utils/urls";

// A quick fix to the hydration issue. Should be replaced with a real solution.
// Slows down the page's initial client rendering as the component won't be loaded on the server.
export type ContributorSSRProps = {
  username: string;
  user?: DbUser;
  ogImage: string;
};

export default function Contributor({ username, user, ogImage }: ContributorSSRProps) {
  const router = useRouter();
  const range = (router.query.range as string) ?? "30";
  const hasMounted = useHasMounted();
  const { session } = useSession(true);

  const { data: contributorPRData, meta: contributorPRMeta } = useContributorPullRequests({
    contributor: username,
    topic: "*",
    repoIds: [],
    limit: 50,
    range: range,
  });
  const isError = !user;
  const repoList = useRepoList(Array.from(new Set(contributorPRData.map((prData) => prData.repo_name))).join(","));
  const mergedPrs = contributorPRData.filter((prData) => prData.pr_is_merged);
  const contributorLanguageList = useContributorLanguages(username);
  const githubAvatar = getAvatarByUsername(username, 300);
  const prVelocity = getContributorPullRequestVelocity(contributorPRData);

  if (!hasMounted) {
    return (
      <SEO
        title={`${username} | OpenSauced`}
        description={`${user?.bio || `${username} has connected their GitHub but has not added a bio.`}`}
        image={ogImage}
        twitterCard="summary_large_image"
      />
    );
  }

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
      <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
        <ContributorProfilePage
          prMerged={mergedPrs.length}
          error={isError}
          loading={false}
          user={user}
          langList={contributorLanguageList}
          githubName={username}
          githubAvatar={githubAvatar}
          prTotal={contributorPRMeta.itemCount}
          recentContributionCount={repoList.length}
          prFirstOpenedDate={user?.first_opened_pr_at}
          prVelocity={prVelocity}
          range={range}
        />
      </WorkspaceLayout>
    </>
  );
}

export const getServerSideProps = async (context: UserSSRPropsContext) => {
  const { username } = context.params ?? { username: "" };

  if (!isValidUrlSlug(username)) {
    return { notFound: true };
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, {
    headers: {
      accept: "application/json",
    },
  });

  if (!req.ok) {
    return { notFound: true };
  }

  const userData = (await req.json()) as DbUser;
  const ogImage = siteUrl(`og-images/dev-card`, { username });

  // Cache page for 60 seconds
  context.res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  context.res.setHeader("Netlify-CDN-Cache-Control", "public, max-age=0, stale-while-revalidate=60");
  context.res.setHeader("Cache-Tag", `user-profiles,user-profile-${username}`);

  return {
    props: { username, user: userData, ogImage },
  };
};

export type UserSSRPropsContext = GetServerSidePropsContext<{ username: string }>;
