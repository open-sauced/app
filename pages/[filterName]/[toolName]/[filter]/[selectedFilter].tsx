import FilterLayout from "layouts/filter";
import { WithPageLayout } from "interfaces/with-page-layout";
import { useRouter } from "next/router";
import Tool from "components/organisms/ToolsDisplay/tools-display";
import changeCapitalization from "lib/utils/change-capitalization";

const SelectedFilter: WithPageLayout = () => {
  const router = useRouter();
  
  const { toolName } = router.query;

  return (
    <Tool tool={toolName && toolName != "dashboard" ? changeCapitalization(toolName.toString(), true) : undefined} />
  );
};

SelectedFilter.PageLayout = FilterLayout;

export default SelectedFilter;