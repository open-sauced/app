import { useRouter } from "next/router";

import { useEffect } from "react";
import FilterLayout from "layouts/filter";
import { WithPageLayout } from "interfaces/with-page-layout";
import Tool from "components/organisms/ToolsDisplay/tools-display";
import changeCapitalization from "lib/utils/change-capitalization";

const SelectedFilter: WithPageLayout = () => {
  const router = useRouter();

  const { toolName, pageId } = router.query;

  const title = `OpenSauced Insights ${pageId ? ` - ${changeCapitalization(pageId!.toString(), true)}` : ""} ${
    toolName ? ` / ${changeCapitalization(toolName.toString(), true)}` : ""
  }`;

  useEffect(() => {
    SelectedFilter.updateSEO!({
      title: title,
    });
  }, [title]);

  return <Tool tool={toolName ? changeCapitalization(toolName.toString(), true) : undefined} />;
};

SelectedFilter.PageLayout = FilterLayout;

export default SelectedFilter;
