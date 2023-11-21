import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Dashboard from "components/organisms/Dashboard/dashboard";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { WithPageLayout } from "interfaces/with-page-layout";

import HubPageLayout from "layouts/hub-page";
import getInsightTeamMember from "lib/utils/get-insight-team-member";

interface InsightFilterPageProps {
  insight: DbUserInsight;
}

const HubPage: WithPageLayout<InsightFilterPageProps> = ({ insight }: InsightFilterPageProps) => {
  const repositories = insight.repos.map((repo) => repo.repo_id);

  const title = `${insight.name} | Open Sauced Insights Hub`;

  useEffect(() => {
    HubPage.updateSEO!({
      title: title,
    });
  }, [title]);

  return (
    <>
      <ClientOnly>
        <Dashboard repositories={repositories} />
      </ClientOnly>
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insights/${insightId}`);
  const insight = response.ok ? ((await response.json()) as DbUserInsight) : null;

  if (!insight) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const userId = session?.user?.user_metadata.sub as string;
  const isOwner = userId && insight && `${userId}` === `${insight.user?.id}` ? true : false;
  let isTeamMember = false;

  if (!insight.is_public && !isOwner) {
    // check if user is insight page team member
    isTeamMember = await getInsightTeamMember(Number(insightId), bearerToken, userId);
  }

  if (!insight.is_public && !isOwner && !isTeamMember) {
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
    },
  };
};

HubPage.PageLayout = HubPageLayout;

export default HubPage;
