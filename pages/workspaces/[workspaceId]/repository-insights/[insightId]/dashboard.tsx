import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import SEO from "layouts/SEO/SEO";
import fetchSocialCard from "lib/utils/fetch-social-card";
import getInsightTeamMemberAccess from "lib/utils/get-insight-team-member";
import { MemberAccess } from "components/molecules/TeamMembersConfig/team-members-config";
import useInsightRepositories from "lib/hooks/useInsightRepositories";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import HubPageLayout from "layouts/hub-page";
import Dashboard from "components/organisms/Dashboard/dashboard";
import { useIsWorkspaceUpgraded } from "lib/hooks/api/useIsWorkspaceUpgraded";

const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

interface InsightPageProps {
  insight: DbUserInsight;
  ogImage?: string;
  workspaceId: string;
}

const HubPage = ({ insight, ogImage, workspaceId }: InsightPageProps) => {
  const { data: insightRepos } = useInsightRepositories(insight.id);
  const repositories = insightRepos.map((repo) => repo.repo_id);
  const [hydrated, setHydrated] = useState(false);

  const { data: isWorkspaceUpgraded } = useIsWorkspaceUpgraded({ workspaceId });
  const showNudgeBanner = !isWorkspaceUpgraded && repositories.length > 100;
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <>
        <SEO
          title={`${insight.name} | Open Sauced Insights `}
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
        title={`${insight.name} | Open Sauced Insights`}
        description={`${insight.name} Insights on OpenSauced`}
        image={ogImage}
        twitterCard="summary_large_image"
      />
      <WorkspaceLayout workspaceId={workspaceId}>
        {showNudgeBanner && (
          <button
            onClick={() => setIsInsightUpgradeModalOpen(true)}
            className="w-full h-fit py-2 text-center bg-light-orange-10 text-white"
          >
            This insight page is past the free limit.{" "}
            <span className="font-semibold underline">Upgrade to a PRO Workspace!</span>
          </button>
        )}
        <HubPageLayout page="dashboard">
          <Dashboard repositories={repositories} />
        </HubPageLayout>

        <InsightUpgradeModal
          workspaceId={workspaceId}
          overLimit={repositories.length}
          isOpen={isInsightUpgradeModalOpen}
          onClose={() => setIsInsightUpgradeModalOpen(false)}
          variant="repositories"
        />
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
