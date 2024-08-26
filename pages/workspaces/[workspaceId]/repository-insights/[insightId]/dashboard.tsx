import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import dynamic from "next/dynamic";
import SEO from "layouts/SEO/SEO";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import HubPageLayout from "layouts/hub-page";
import { fetchApiData } from "helpers/fetchApiData";
import { useIsWorkspaceUpgraded } from "lib/hooks/api/useIsWorkspaceUpgraded";
import WorkspaceBanner from "components/Workspaces/WorkspaceBanner";
import useSession from "lib/hooks/useSession";
import Repositories from "components/organisms/Repositories/repositories";

const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

interface InsightPageProps {
  insight: DbUserInsight;
  isOwner: boolean;
  ogImage?: string;
  workspaceId: string;
  owners: string[];
}

const HubPage = ({ insight, isOwner, ogImage, workspaceId, owners }: InsightPageProps) => {
  const repositories = insight.repos.map((repo) => repo.repo_id);
  const [hydrated, setHydrated] = useState(false);
  const { session } = useSession(true);

  const { data: isWorkspaceUpgraded } = useIsWorkspaceUpgraded({ workspaceId });
  const showBanner = isOwner && !isWorkspaceUpgraded;
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);

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
      <WorkspaceLayout
        workspaceId={workspaceId}
        banner={
          showBanner ? (
            <WorkspaceBanner workspaceId={workspaceId} openModal={() => setIsInsightUpgradeModalOpen(true)} />
          ) : null
        }
      >
        <div className="px-4 py-8 lg:px-16 lg:py-12">
          <HubPageLayout page="dashboard" owners={owners} overLimit={showBanner}>
            <Repositories
              repositories={repositories}
              personalWorkspaceId={isOwner ? undefined : (session as DbUser)?.personal_workspace_id}
            />
          </HubPageLayout>
          <InsightUpgradeModal
            workspaceId={workspaceId}
            variant="all"
            isOpen={isInsightUpgradeModalOpen}
            onClose={() => setIsInsightUpgradeModalOpen(false)}
            overLimit={repositories.length}
          />
        </div>
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

  const { data: insight } = await fetchApiData<DbUserInsight>({
    path: `workspaces/${workspaceId}/insights/${insightId}`,
    bearerToken,
  });

  // workspace team member access is handled by API: 404 if the workspace insight
  // is not accessible by user
  if (!insight) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  // Keeping this here so we are sure the page is not private before we fetch the social card.
  const ogImage = `${new URL(
    `/og-images/insight/${insightId}/30`,
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  )}`;

  const { data: workspaceMembers } = await fetchApiData<{ data?: WorkspaceMember[] }>({
    path: `workspaces/${workspaceId}/members`,
    bearerToken,
    pathValidator: () => true,
  });

  const userId = Number(session?.user.user_metadata.sub);

  const owners: string[] = Array.from(
    workspaceMembers?.data || [],
    (member: { role: string; member: Record<string, any> }) => {
      if (member.role === "owner") {
        return member.member.login;
      }
    }
  ).filter(Boolean);

  const isOwner = !!(workspaceMembers?.data || []).find(
    (member) => member.role === "owner" && member.user_id === userId
  );

  return {
    props: {
      insight,
      workspaceId,
      ogImage,
      owners,
      isOwner,
    },
  };
};

export default HubPage;
