import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import SEO from "layouts/SEO/SEO";
import fetchSocialCard from "lib/utils/fetch-social-card";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import HubPageLayout from "layouts/hub-page";
import Activity from "components/organisms/Activity/activity";
import { useHasMounted } from "lib/hooks/useHasMounted";
import { fetchApiData } from "helpers/fetchApiData";

interface InsightPageProps {
  insight: DbUserInsight;
  ogImage?: string;
  workspaceId: string;
}

const HubPage = ({ insight, ogImage, workspaceId }: InsightPageProps) => {
  const repositories = insight.repos.map((repo) => repo.repo_id);

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

  // workspace team member access is handled by API: 404 if the workspace insight
  // is not accessible by user
  const { data: insight } = await fetchApiData<DbUserInsight>({
    path: `workspaces/${workspaceId}/insights/${insightId}`,
    bearerToken,
  });

  if (!insight) {
    return {
      redirect: {
        destination: "/",
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
