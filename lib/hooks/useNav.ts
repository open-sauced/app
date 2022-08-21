import { useRouter } from "next/router";
import {useRepositoriesList} from "lib/hooks/useRepositoriesList";
import humanizeNumber from "../utils/humanizeNumber";

const useNav = () => {
  const router = useRouter();
  const { repoList, isLoading } = useRepositoriesList();
  const meta = repoList.meta || {};

  const defaultTools = [
    {
      name: "Dashboard"
    },
    {
      name: "Reports"
    },
    {
      name: "Activity"
    },
    {
      name: "Repositories",
      numOf: meta.itemCount
    },
    {
      name: "Contributors",
      numOf: 54
    }
  ];

  const { filterName, toolName: selectedTool, selectedFilter } = router.query;

  const toolList = defaultTools;

  return {
    toolList,
    selectedTool,
    selectedFilter,
    filterName
  };
};

export default useNav;
