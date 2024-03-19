import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import Tool from "components/organisms/ToolsDisplay/tools-display";
import changeCapitalization from "lib/utils/change-capitalization";
import FilterLayout from "../../../../layouts/filter";
import { WithPageLayout } from "../../../../interfaces/with-page-layout";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const pageId = ctx.params!["pageId"] as string;
  const toolName = ctx.params!["toolName"] as string;
  const selectedFilter = ctx.params!["selectedFilter"] as string;

  if (toolName === "repositories") {
    return {
      redirect: {
        destination: `/${pageId}/dashboard/${selectedFilter}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      pageId,
      toolName,
    },
  };
};
const Filter: WithPageLayout = () => {
  const router = useRouter();

  const { pageId, toolName } = router.query;

  const title = `OpenSauced Insights ${pageId ? ` - ${changeCapitalization(pageId!.toString(), true)}` : ""} ${
    toolName ? ` / ${changeCapitalization(toolName.toString(), true)}` : ""
  }`;

  useEffect(() => {
    Filter.updateSEO!({
      title: title,
    });
  }, [title]);

  return <Tool tool={toolName ? changeCapitalization(toolName.toString(), true) : undefined} />;
};

Filter.PageLayout = FilterLayout;

export default Filter;
