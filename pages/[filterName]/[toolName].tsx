import FilterLayout from "../../layouts/filter";
import { WithPageLayout } from "../../interfaces/with-page-layout";
import { useRouter } from "next/router";
import Tool from "components/organisms/ToolsDisplay/tools-display";
import changeCapitalization from "lib/utils/change-capitalization";
import { useEffect } from "react";

const Filter: WithPageLayout = () => {
  const router = useRouter();

  const { filterName, toolName } = router.query;

  const title = `Open Sauced Insights ${filterName ? ` - ${changeCapitalization(filterName!.toString(), true)}` : ""} ${
    toolName ? ` / ${changeCapitalization(toolName.toString(), true)}` : ""
  }`;

  useEffect( () => {
    Filter.updateSEO!({
      title: title
    });
  }, [title]);

  return (
    <Tool tool={toolName ? changeCapitalization(toolName.toString(), true) : undefined} />
  );
};

Filter.PageLayout = FilterLayout;

export default Filter;
