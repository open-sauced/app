import { useRouter } from "next/router";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { useTopicContributions } from "./useTopicContributions";
import { useGlobalStateContext } from "context/global-state";
import { useEffect } from "react";

const useNav = (repositories: number[] = []) => {

  const {setAppState,appState}= useGlobalStateContext();
  const router = useRouter();
  const { meta: repoMetaData, isError: repoIsError, isLoading: repoIsLoading } = useRepositoriesList(false, repositories);
  const { meta: conMetaData, isError: conIsError, isLoading: conIsLoading } = useTopicContributions(10, repositories);

  useEffect(()=>{
    setAppState(prev =>( {...prev, repoMetaCount: repoMetaData.itemCount, contributorsMetaCount: conMetaData.itemCount}));
  },[repoMetaData.itemCount, setAppState, conMetaData.itemCount]);

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
