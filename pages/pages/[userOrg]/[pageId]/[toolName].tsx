import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Tool from "components/organisms/ToolsDisplay/tools-display";

import HubPageLayout from "layouts/hub-page";
import { WithPageLayout } from "interfaces/with-page-layout";
import changeCapitalization from "lib/utils/change-capitalization";
import SEO from "layouts/SEO/SEO";
import fetchSocialCard from "lib/utils/fetch-social-card";
import getInsightTeamMemberAccess from "lib/utils/get-insight-team-member";
import { MemberAccess } from "components/molecules/TeamMembersConfig/team-members-config";
import useInsightRepositories from "lib/hooks/useInsightRepositories";

interface InsightPageProps {
  insight: DbUserInsight;
  pageName: string;
  ogImage?: string;
}

const HubPage: WithPageLayout<InsightPageProps> = ({ insight, pageName, ogImage }: InsightPageProps) => {
  const { data: insightRepos } = useInsightRepositories(insight.id);
  const repositories = insightRepos.map((repo) => repo.repo_id);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <>
        <SEO
          title={`${insight.name} | OpenSauced Insights `}
          description={`${insight.name} Insights on OpenSauced`}
          image={ogImage}
          twitterCard="summary_large_image"
        />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${insight.name} | OpenSauced Insights`}
        description={`${insight.name} Insights on OpenSauced`}
        image={ogImage}
        twitterCard="summary_large_image"
      />
      <Tool tool={changeCapitalization(pageName, true)} repositories={repositories} />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const insightId = ctx.params!["pageId"] as string;
  const pageName = ctx.params!["toolName"] as string;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insights/${insightId}?include=none`);
  const insight = response.ok ? ((await response.json()) as DbUserInsight) : null;

  if (!insight) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  if (pageName === "repositories") {
    const userOrg = ctx.params!["userOrg"] as string;
    return {
      redirect: {
        destination: `/pages/${userOrg}/${insightId}/dashboard`,
        permanent: false,
      },
    };
  }
  const userId = session?.user?.user_metadata.sub as string;
  let teamMemberAccess: MemberAccess | null = null;

  if (!insight.is_public) {
    // check if user is insight page team member
    teamMemberAccess = await getInsightTeamMemberAccess(Number(insightId), bearerToken, userId);
  }

  if (!insight.is_public && (!teamMemberAccess || teamMemberAccess === "pending")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Keeping this here so we are sure the page is not private before we fetch the social card.
  const ogImage = await fetchSocialCard(`insights/${insightId}`);

  return {
    props: {
      insight,
      pageName,
      ogImage,
    },
  };
};

HubPage.PageLayout = HubPageLayout;

export default HubPage;
