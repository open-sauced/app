import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import SEO from "layouts/SEO/SEO";
import fetchSocialCard from "lib/utils/fetch-social-card";
import getInsightTeamMemberAccess from "lib/utils/get-insight-team-member";
import { MemberAccess } from "components/molecules/TeamMembersConfig/team-members-config";
import useInsightRepositories from "lib/hooks/useInsightRepositories";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import HubPageLayout from "layouts/hub-page";
import Activity from "components/organisms/Activity/activity";
import { useHasMounted } from "lib/hooks/useHasMounted";

interface InsightPageProps {
  insight: DbUserInsight;
  ogImage?: string;
  workspaceId: string;
}

const HubPage = ({ insight, ogImage, workspaceId }: InsightPageProps) => {
  const { data: insightRepos } = useInsightRepositories(insight.id);
  const repositories = insightRepos.map((repo) => repo.repo_id);
  const [hydrated, setHydrated] = useState(false);

  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <SEO
        title={`${insight.name} | Open Sauced Insights `}
        description={`${insight.name} Insights on OpenSauced`}
        image={ogImage}
        twitterCard="summary_large_image"
      />
    );
  }

  return (
    <>
      <SEO
        title={`${insight.name} | Open Sauced Insights`}
        description={`${insight.name} Insights on OpenSauced`}
        image={ogImage}
        twitterCard="summary_large_image"
      />
      <WorkspaceLayout workspaceId={workspaceId}>
        <HubPageLayout page="activity">
          <Activity repositories={repositories} />
        </HubPageLayout>
      </WorkspaceLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = ctx.params!["workspaceId"] as string;
  const insightId = ctx.params!["insightId"] as string;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insights/${insightId}?include=none`);
  const insight = response.ok ? ((await response.json()) as DbUserInsight) : null;

  if (!insight) {
    return {
      redirect: {
        destination: "/",
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
      workspaceId,
      ogImage,
    },
  };
};

export default HubPage;
