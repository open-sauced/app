import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Tool from "components/organisms/ToolsDisplay/tools-display";

import HubPageLayout from "layouts/hub-page";
import { WithPageLayout } from "interfaces/with-page-layout";
import changeCapitalization from "lib/utils/change-capitalization";
import useInsight from "lib/hooks/useInsight";

const HubPage: WithPageLayout = () => {
  const router = useRouter();
  const { filterName, toolName } = router.query;
  const insightId = filterName as string;
  const { data: insight, isLoading, isError } = useInsight(insightId);
  const repositories = insight ? insight.repos.map(repo => repo.repo_id) : [];

  return (
    <>
      { isLoading ? <div>Loading...</div>: "" }
      { isError ? <div>Error...</div>: "" }
      { !isLoading && insight
        ?
        <Tool
          tool={toolName ? changeCapitalization(toolName.toString(), true) : undefined}
          repositories={repositories}
        /> : <></>}
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const insightId = ctx.params!["filterName"] as string;
  const { data: insights }: { data: DbUserInsight[] | null } = await supabase
    .from("insights")
    .select("*")
    .eq("id", insightId)
    .limit(1);

  if (!insights || insights.length !== 1) {
    return {
      redirect: {
        destination: "/"
      }
    };
  }

  const userId = session?.user?.user_metadata.sub as string;
  const insight = insights[0];
  const isOwner = userId && insight && `${userId}` === `${insight.user_id}` ? true : false;

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