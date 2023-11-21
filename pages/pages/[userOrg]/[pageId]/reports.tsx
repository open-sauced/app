import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Reports from "components/organisms/Reports/reports";
import HubPageLayout from "layouts/hub-page";

import { WithPageLayout } from "interfaces/with-page-layout";
import SEO from "layouts/SEO/SEO";
import getInsightTeamMember from "lib/utils/get-insight-team-member";
import useSession from "lib/hooks/useSession";
import { useFetchUser } from "lib/hooks/useFetchUser";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { captureAnalytics } from "lib/utils/analytics";
import ClientOnly from "components/atoms/ClientOnly/client-only";

interface ReportsPageProps {
  insight: DbUserInsight;
  ogImage?: string;
}

const ReportsPage: WithPageLayout<ReportsPageProps> = ({ insight, ogImage }: ReportsPageProps) => {
  const { hasReports, waitlisted } = useSession();
  const repositories = insight.repos.map((repo) => repo.repo_id);
  const { user } = useSupabaseAuth();
  const { data: userInfo, isLoading } = useFetchUser(user?.user_metadata.user_name);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    captureAnalytics({ title: "Insights Display", property: "tools", value: `Reports selected`, userInfo });
  }, [userInfo, isLoading]);

  return (
    <>
      <SEO
        title={`${insight.name} | Open Sauced Insights`}
        description={`${insight.name} Insights on OpenSauced`}
        image={ogImage}
        twitterCard="summary_large_image"
      />

      <ClientOnly>
        <Reports hasReports={hasReports} waitlisted={waitlisted} repositories={repositories} />
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
  const isOwner = !!(userId && insight && `${userId}` === `${insight.user?.id}`);
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

ReportsPage.PageLayout = HubPageLayout;

export default ReportsPage;
