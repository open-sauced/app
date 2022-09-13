import { useRouter } from "next/router";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { useContributionsList } from "./useContributionsList";

const useNav = () => {
  const router = useRouter();
  const { meta: repoMetaData, isError: repoIsError, isLoading: repoIsLoading } = useRepositoriesList();
  const { meta: conMetaData, isError: conIsError, isLoading: conIsLoading } = useContributionsList();

  const defaultTools = [
    {
      name: "Dashboard"
    },
    {
      name: "Reports"
    },
    {
      name: "Repositories",
      numOf: repoIsLoading || repoIsError ? undefined : repoMetaData.itemCount
    },
    {
      name: "Contributors",
      numOf: conIsLoading || conIsError ? undefined : conMetaData.itemCount
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
