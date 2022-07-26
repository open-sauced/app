import FilterLayout from "../../layouts/filter";
import { WithPageLayout } from "../../interfaces/with-page-layout";
import Tool from "../../components/organisms/ToolsDisplay/tools-display";

const Filter: WithPageLayout = () => {
  return (
    <Tool />
  );
};

Filter.PageLayout = FilterLayout;

export default Filter;