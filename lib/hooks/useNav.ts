import { useRouter } from "next/router";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { useTopicContributions } from "./useTopicContributions";


const useNav = (repositories: number[] = []) => {

  const router = useRouter();
  // const { meta: repoMetaData, isError: repoIsError, isLoading: repoIsLoading } = useRepositoriesList(false, repositories);
  // const { meta: conMetaData, isError: conIsError, isLoading: conIsLoading } = useTopicContributions(10, repositories);


  const defaultTools = [
    {
      name: "Dashboard"
    },
    {
      name: "Reports"
    },
    {
      name: "Repositories",
      numOf: 0 // repoIsLoading || repoIsError ? undefined : repoMetaData.itemCount
    },
    {
      name: "Contributors",
      numOf: 0 // conIsError ? undefined : conMetaData.itemCount
    }
  ];

  const { filterName, toolName: selectedTool, selectedFilter, userOrg } = router.query;

  const toolList = defaultTools;

  return {
    toolList,
    selectedTool,
    selectedFilter,
    filterName,
    userOrg
  };
};

export default useNav;
