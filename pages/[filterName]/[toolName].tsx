import FilterLayout from "../../layouts/filter";
import { WithPageLayout } from "../../interfaces/with-page-layout";
import { useRouter } from "next/router";
import Tool from "components/organisms/ToolsDisplay/tools-display";

const Filter: WithPageLayout = () => {
  return (
    <Tool tool="Reports" />
  );
};

Filter.PageLayout = FilterLayout;

export default Filter;