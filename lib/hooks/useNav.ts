import { useRouter } from "next/router";
import {useRepositoriesList} from "lib/hooks/useRepositoriesList";

const useNav = () => {
  const router = useRouter();
  const { meta, isError, isLoading } = useRepositoriesList();
  const { itemCount } = meta;

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
      numOf: isLoading || isError ? 0 : itemCount
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
