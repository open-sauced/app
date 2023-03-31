import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Tool from "components/organisms/ToolsDisplay/tools-display";

import HubPageLayout from "layouts/hub-page";
import { WithPageLayout } from "interfaces/with-page-layout";
import changeCapitalization from "lib/utils/change-capitalization";
import useInsight from "lib/hooks/useInsight";
import { useEffect } from "react";
import SpinLoader from "components/atoms/SpinLoader/spin-loader";

const HubPage: WithPageLayout = () => {
  const router = useRouter();
  const { filterName, toolName } = router.query;
  const insightId = filterName as string;
  const { data: insight, isLoading, isError } = useInsight(insightId);
  const repositories = insight ? insight.repos.map((repo) => repo.repo_id) : [];

  const title = `${insight && insight.name} | Open Sauced Insights Hub`;

  useEffect(() => {
    HubPage.updateSEO!({
      title: title
    });
  }, [title]);

  return (
    <>
      {isLoading ? <SpinLoader /> : ""}
      {isError ? <div>Error...</div> : ""}
      {!isLoading && insight ? (
        <Tool
          tool={toolName ? changeCapitalization(toolName.toString(), true) : undefined}
          repositories={repositories}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session }
  } = await supabase.auth.getSession();
  const insightId = ctx.params!["filterName"] as string;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insights/${insightId}`);
  const insight = response.ok ? ((await response.json()) as DbUserInsight) : null;

  if (!insight) {
    return {
      redirect: {
        destination: "/"
      }
    };
  }

  const userId = session?.user?.user_metadata.sub as string;
  const isOwner = !!(userId && insight && `${userId}` === `${insight.user_id}`);

  if (insight && !insight.is_public && !isOwner) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

HubPage.PageLayout = HubPageLayout;

export default HubPage;
