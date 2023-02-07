import { useRouter } from "next/router";

import FilterLayout from "layouts/filter";
import { WithPageLayout } from "interfaces/with-page-layout";
import Tool from "components/organisms/ToolsDisplay/tools-display";
import changeCapitalization from "lib/utils/change-capitalization";
import { useEffect } from "react";

const SelectedFilter: WithPageLayout = () => {
  const router = useRouter();

  const { toolName, filterName } = router.query;

  const title = `Open Sauced Insights ${filterName ? ` - ${changeCapitalization(filterName!.toString(), true)}` : ""} ${
    toolName ? ` / ${changeCapitalization(toolName.toString(), true)}` : ""
  }`;

  useEffect( () => {
    SelectedFilter.updateSEO!({
      title: title
    })
  }, [title])

  return <Tool tool={toolName ? changeCapitalization(toolName.toString(), true) : undefined} />;
};

SelectedFilter.PageLayout = FilterLayout;

export default SelectedFilter;
