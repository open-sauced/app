import { useRouter } from "next/router";

import Tool from "components/organisms/ToolsDisplay/tools-display";

import HubPageLayout from "layouts/hub-page";
import { WithPageLayout } from "interfaces/with-page-layout";
import changeCapitalization from "lib/utils/change-capitalization";
import { useUserInsights } from "lib/hooks/useUserInsights";

const SelectedFilter: WithPageLayout = () => {
  const router = useRouter();
  const { filterName } = router.query;
  const insightId = filterName as string;
  const { data, isLoading } = useUserInsights();
  const insight = data.find(insight => `${insight.id}` === insightId);
  const repoIds = insight ? insight.repos.map(repo => repo.repo_id) : [];
  const { toolName } = router.query;

  return (
    <>
    { !isLoading && repoIds.length > 0
      ?
      <Tool
        tool={toolName ? changeCapitalization(toolName.toString(), true) : undefined}
        repoIds={repoIds}
      /> : <>No Repositories Found</>}
    </>
  );
};

SelectedFilter.PageLayout = HubPageLayout;

export default SelectedFilter;