import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Tool from "components/organisms/ToolsDisplay/tools-display";

import HubPageLayout from "layouts/hub-page";
import { WithPageLayout } from "interfaces/with-page-layout";
import changeCapitalization from "lib/utils/change-capitalization";
import getInsightTeamMemberAccess from "lib/utils/get-insight-team-member";
import { MemberAccess } from "components/molecules/TeamMembersConfig/team-members-config";
import useInsightRepositories from "lib/hooks/useInsightRepositories";

interface InsightFilterPageProps {
  insight: DbUserInsight;
  pageName: string;
}

const HubPage: WithPageLayout<InsightFilterPageProps> = ({ insight, pageName }: InsightFilterPageProps) => {
  const { data: insightRepos } = useInsightRepositories(insight.id);
  const repositories = insightRepos.map((repo) => repo.repo_id);

  const title = `${insight.name} | OpenSauced Insights Hub`;

  useEffect(() => {
    HubPage.updateSEO!({
      title: title,
    });
  }, [title]);

  return <Tool tool={changeCapitalization(pageName, true)} repositories={repositories} />;
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

  return {
    props: {
      insight,
      pageName,
    },
  };
};

HubPage.PageLayout = HubPageLayout;

export default HubPage;
