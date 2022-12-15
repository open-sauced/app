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

HubPage.PageLayout = HubPageLayout;

export default HubPage;
