import FilterLayout from "../../layouts/filter";
import { WithPageLayout } from "../../interfaces/with-page-layout";
import { useRouter } from "next/router";
import Tool from "components/organisms/ToolsDisplay/tools-display";
import changeCapitalization from "lib/utils/changeCapitalization";

const Filter: WithPageLayout = () => {
  const router = useRouter();
  
  const { toolName } = router.query;

  return (
    <Tool tool={changeCapitalization(toolName as string, true)} />
  );
};

Filter.PageLayout = FilterLayout;

export default Filter;