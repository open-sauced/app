import { useRouter } from "next/router";

import Tool from "components/organisms/ToolsDisplay/tools-display";

import HubPageLayout from "layouts/hub-page";
import { WithPageLayout } from "interfaces/with-page-layout";
import changeCapitalization from "lib/utils/change-capitalization";
import { useUserInsights } from "lib/hooks/useUserInsights";

const HubPage: WithPageLayout = () => {
  const router = useRouter();
  const { filterName, toolName } = router.query;
  const insightId = filterName as string;
  const { data, isLoading, isError } = useUserInsights();
  const insight = data.find(insight => `${insight.id}` === insightId);
  const repositories = insight ? insight.repos.map(repo => repo.repo_id) : [];

  return (
    <>
      { isLoading ? <div>Loading...</div>: "" }
      { isError ? <div>Error...</div>: "" }
      { !isLoading && data.length > 0
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